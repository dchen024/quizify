import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '../../../utils/pdfParser';
import { generateQuiz } from '../../../utils/quizGenerator';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Save the uploaded file to a temporary location
  const filePath = path.join("/tmp", file.name);
  const fileStream = fs.createWriteStream(filePath);
  const reader = file.stream().getReader();

  let result;
  while (!(result = await reader.read()).done) {
    fileStream.write(result.value);
  }
  fileStream.end();

  try {
    // Extract text from the PDF file
    const text = await extractTextFromPDF(filePath);
    // Generate quiz based on extracted text
    const quiz = await generateQuiz(text);

    // Clean up the temporary file
    fs.unlinkSync(filePath);

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}