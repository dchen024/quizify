import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from '@langchain/core/messages';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

import saveQuizz from './saveToDb';

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

    try {
        const pdfLoader = new PDFLoader(document as Blob, {
            parsedItemSeparator: " "
        });
        const docs = await pdfLoader.load();
        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);

        const prompt = `
    Based on the provided text, generate a quiz as JSON with the following structure:
    {
        "quizz": {
            "name": "Quiz Title",
            "description": "Quiz Description",
            "questions": [
                {
                    "questionText": "Question here",
                    "answers": [
                        { "answerText": "Answer 1", "isCorrect": true },
                        { "answerText": "Answer 2", "isCorrect": false }
                    ]
                }
            ]
        }
    }
    Text to use:
    ${texts.join("\n")}
`;
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
            {error: "OpenAI API key is not set"},
            {status: 500}
        )
    }

        const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-3.5-turbo",
        });
 
        const parser = new JsonOutputFunctionsParser();
        const extractionFunctionSchema = {
            name: "extractor",
            description: "Extracts fields from the output",
            parameters: {
                type: "object",
                properties: {
                    quizz: {
                        type: "object",
                        properties: {
                            name: {type: "string"},
                            description: {type: "string"},
                            questions: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionText: {type: "string"},
                                        answers: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    answerText: {type: "string"},
                                                    isCorrect: {type: "boolean"},
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
        
                                    

            }
        };

        const runnable = model
        .bind({
            functions: [extractionFunctionSchema],
            function_call: { name: "extractor" }
        })
        .pipe(parser);



        const message = new HumanMessage({
            content: [
                {
                    type: "text",
                    text: prompt + "\n" + texts.join("\n")
                }
            ]
        })
        const result = await runnable.invoke([message]);
        console.log(result);
        
        const { quizzId } = await saveQuizz(result.quizz);
        console.log("Full Quiz Data:", JSON.stringify(result.quizz, null, 2));

        return NextResponse.json({ quizzId }, {status: 200});
    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 500});
    }
}
