import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

// Define the type for our quiz structure
type Quiz = {
  quizz: {
    name: string;
    description: string;
    questions: {
      questionText: string;
      answers: {
        answerText: string;
        isCorrect: boolean;
      }[];
    }[];
  };
};

export async function POST(req: NextRequest) {
  const supabase = createClient();

  // Get current user from session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.formData();
  const pdfFile = body.get('pdf');

  if (!pdfFile || !(pdfFile instanceof Blob)) {
    return NextResponse.json(
      { error: 'No PDF file provided' },
      { status: 400 }
    );
  }

  try {
    // First, try to load the PDF and log the content
    console.log('Starting PDF processing...');
    const pdfLoader = new PDFLoader(pdfFile);
    const docs = await pdfLoader.load();

    if (!docs || docs.length === 0) {
      console.error('No content extracted from PDF');
      return NextResponse.json(
        { error: 'Could not extract content from PDF' },
        { status: 400 }
      );
    }

    const texts = docs.map((doc) => doc.pageContent).join('\n');
    console.log('PDF content extracted, length:', texts.length);

    // Verify OpenAI configuration
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI configuration is missing' },
        { status: 500 }
      );
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Generating quiz with OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      functions: [
        {
          name: 'generate_quiz',
          description: 'Generate a quiz based on the provided text',
          parameters: {
            type: 'object',
            properties: {
              quizz: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  questions: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        questionText: { type: 'string' },
                        answers: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              answerText: { type: 'string' },
                              isCorrect: { type: 'boolean' },
                            },
                            required: ['answerText', 'isCorrect'],
                          },
                          minItems: 4,
                          maxItems: 4,
                        },
                      },
                      required: ['questionText', 'answers'],
                    },
                    minItems: 5, // Minimum number of questions
                    maxItems: 10, // Maximum number of questions
                  },
                },
                required: ['name', 'description', 'questions'],
              },
            },
            required: ['quizz'],
          },
        },
      ],
      messages: [
        {
          role: 'system',
          content:
            'You are a quiz generator. Create engaging multiple-choice questions based on the provided text. Make sure questions test understanding, not just memorization. Include one correct answer and three plausible but incorrect answers for each question.',
        },
        {
          role: 'user',
          content: `Generate a quiz based on the following text. Make the questions challenging but fair:\n\n${texts}`,
        },
      ],
      function_call: { name: 'generate_quiz' },
    });

    if (!completion.choices[0].message.function_call?.arguments) {
      throw new Error('No quiz data generated');
    }

    const quizData = JSON.parse(
      completion.choices[0].message.function_call.arguments
    ) as Quiz;

    // Save to Supabase with creator_id from session
    const { data: savedQuiz, error: dbError } = await supabase
      .from('quizzes')
      .insert({
        name: quizData.quizz.name,
        description: quizData.quizz.description,
        questions: quizData.quizz.questions,
        creator_id: session.user.id, // Add creator_id from session
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save quiz to database');
    }

    console.log('Quiz generated and saved successfully');
    return NextResponse.json(
      {
        ...quizData,
        id: savedQuiz.id,
        created_at: savedQuiz.created_at,
        creator_id: session.user.id,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error('Detailed error:', e);
    return NextResponse.json(
      {
        error: e.message,
        details: e.stack,
      },
      { status: 500 }
    );
  }
}
