'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Quiz = {
  id: number;
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

export default function QuizEditForm({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [name, setName] = useState(quiz.name);
  const [description, setDescription] = useState(quiz.description);
  const [questions, setQuestions] = useState(quiz.questions);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      questionText: value,
    };
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = {
      ...newQuestions[questionIndex].answers[answerIndex],
      answerText: value,
    };
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = newQuestions[
      questionIndex
    ].answers.map((answer, idx) => ({
      ...answer,
      isCorrect: idx === answerIndex,
    }));
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createClient();

    // Get current user from session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <h1 className='text-2xl font-bold mb-4'>
            Please login to edit quizzes
          </h1>
        </div>
      );
    }

    // Fetch quiz data
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quiz.id)
      .single();

    if (error || !quiz) {
      console.error('Error fetching quiz:', error);
      return;
    }

    // Check if user owns this quiz
    if (quiz.creator_id !== session.user.id) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <h1 className='text-2xl font-bold mb-4'>
            Not authorized to edit this quiz
          </h1>
        </div>
      );
    }

    // Update quiz data
    const updatedQuiz = {
      name,
      description,
      questions,
    };

    const { data: updatedQuizData, error: updateError } = await supabase
      .from('quizzes')
      .update(updatedQuiz)
      .eq('id', quiz.id);

    if (updateError) {
      console.error('Error updating quiz:', updateError);
      return;
    }

    router.push('/quizz');
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-3xl'>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Edit Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Quiz Title</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter quiz title'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter quiz description'
              className='min-h-[100px]'
            />
          </div>
        </CardContent>
      </Card>

      <Accordion type='single' collapsible className='w-full space-y-4'>
        {questions.map((question, qIndex) => (
          <AccordionItem
            value={`question-${qIndex}`}
            key={qIndex}
            className='border rounded-lg p-4'
          >
            <AccordionTrigger className='hover:no-underline'>
              <div className='flex gap-4 w-full pr-4'>
                <span className='bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-0.5'>
                  {qIndex + 1}
                </span>
                <span className='text-left font-normal break-words'>
                  {question.questionText || 'New Question'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='pt-4 space-y-4'>
              <div className='space-y-2'>
                <Label>Question Text</Label>
                <Input
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  placeholder='Enter your question'
                />
              </div>

              <div className='space-y-4'>
                <Label>Answers</Label>
                <RadioGroup
                  value={question.answers
                    .findIndex((a) => a.isCorrect)
                    .toString()}
                  onValueChange={(value) =>
                    handleCorrectAnswerChange(qIndex, parseInt(value))
                  }
                >
                  {question.answers.map((answer, aIndex) => (
                    <div
                      key={aIndex}
                      className='flex items-center gap-4 p-2 rounded-lg border'
                    >
                      <RadioGroupItem
                        value={aIndex.toString()}
                        id={`q${qIndex}-a${aIndex}`}
                      />
                      <div className='flex-1'>
                        <Input
                          value={answer.answerText}
                          onChange={(e) =>
                            handleAnswerChange(qIndex, aIndex, e.target.value)
                          }
                          placeholder={`Answer ${aIndex + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className='flex justify-end gap-4 mt-8'>
        <Button
          variant='outline'
          onClick={() => router.push('/quizz')}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
