"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  questionText: string;
  answers: {
    answerText: string;
    isCorrect: boolean;
  }[];
}

const UploadDoc = () => {
  const [document, setDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      setError("Please upload a document first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Prepare form data
    const formData = new FormData();
    formData.append("pdf", document as Blob);

    try {
      // Send the document to the API
      const res = await fetch("/api/quizz/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to generate quiz. Please try again.");
      }

      const data = await res.json();
      setQuiz(data); // Store the generated quiz data
      console.log("Quiz generated successfully");
    } catch (error) {
      console.error("Error generating quiz:", error);
      setError("Failed to generate quiz.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <label 
          htmlFor="document" 
          className="mb-4 bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative"
        >
          <div className="absolute inset-0 m-auto flex justify-center items-center">
            {document ? document.name : "Drag and drop your document here"}
          </div>
          <input
            type="file"
            id="document"
            accept=".pdf"
            className="relative block w-full h-full z-50 opacity-0"
            onChange={(e) => setDocument(e.target.files?.[0] || null)}
          />
        </label>
        {error && <p className="text-red-600">{error}</p>}
        <Button type="submit" size="lg" className="mt-2" disabled={isLoading}>
          {isLoading ? "Generating Quiz..." : "Generate Quiz"}
        </Button>
      </form>

      {quiz && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Generated Quiz</h2>
          {quiz.map((question, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium mb-2">{index + 1}. {question.questionText}</p>
              {question.answers.map((answer, idx) => (
                <p
                  key={idx}
                  className={`ml-4 ${answer.isCorrect ? 'text-green-600' : ''}`}
                >
                  {String.fromCharCode(97 + idx)}. {answer.answerText}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadDoc;