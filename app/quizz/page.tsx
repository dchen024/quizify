'use client';
import LoginButton from "@/components/LoginLogoutButton";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";

const questions = [
    {
        questionText: "What is React?",
        answerOptions: [
            { answerText: "Front-end framework", isCorrect: false, id: 1 },
            { answerText: "Back-end framework", isCorrect: false, id: 2 },
            { answerText: "Library", isCorrect: true, id: 3 },
            { answerText: "Language", isCorrect: false, id: 4 },
        ],
    },
    {
        questionText: "What is Next JS?",
        answerOptions: [
            { answerText: "Front-end framework", isCorrect: false, id: 1 },
            { answerText: "Back-end framework", isCorrect: false, id: 2 },
            { answerText: "Library", isCorrect: false, id: 3 },
            { answerText: "Framework", isCorrect: true, id: 4 },
        ],
    },
    {
        questionText: "What is Tailwind CSS?",
        answerOptions: [
            { answerText: "Front-end framework", isCorrect: false, id: 1 },
            { answerText: "Back-end framework", isCorrect: false, id: 2 },
            { answerText: "Library", isCorrect: false, id: 3 },
            { answerText: "Framework", isCorrect: true, id: 4 },
        ],
    }

]

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);


  const handleNext = () => {
    if (!started) {
        setStarted(true);
        return;
    }

    if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
  }
  }
  return (
    <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 py-4 w-full">
            <header className="grid grid-cols-[auto,1fr,auto]
            grid-flow-col items-center justify-between py-2 gap-2">
                <Button size="icon" variant="outline"><ChevronLeft /></Button>
                <ProgressBar value={(currentQuestion/questions.length) * 100} />
                <Button size="icon" variant="outline"><X /></Button>
            </header>
        </div>
    <main className="flex justify-center flex-1">
        {!started? <h1 className="text-3xl font-bold">Welcome to Your AI Quiz 👋</h1> :
        <div>
            <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
            <div className="grid grid-cols-1 gap-6 m-6">
                {
                questions[currentQuestion].answerOptions.map(answerOption => {
                    return (
                        <Button key={answerOption.id} size={'lg'}>{answerOption.answerText}</Button>
                    )
                })
                }
            </div>
        </div>
        }
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <LoginButton />
        </div>
    </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
      </footer>
      </div>

  );
}
