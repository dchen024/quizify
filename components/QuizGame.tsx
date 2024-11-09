'use client';
import { useState } from 'react';
import LoginButton from '@/components/LoginLogoutButton';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import { ChevronLeft, X } from 'lucide-react';
import ResultCard from '@/components/ResultCard';
import QuizzSubmission from '@/components/QuizzSubmission';
import confetti from 'canvas-confetti';

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

export default function QuizGame({ quiz }: { quiz: Quiz }) {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [confettiTriggered, setConfettiTriggered] = useState<boolean>(false);

  // Log the quiz data client-side
  console.log('Quiz data in component:', quiz);

  const triggerConfetti = () => {
    if (!confettiTriggered) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setConfettiTriggered(true);
    }
  };

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setConfettiTriggered(false);
    } else {
      setSubmitted(true);
      return;
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answerOption: any, index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCurrentCorrect = answerOption.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
      triggerConfetti();
    }
    setIsCorrect(isCurrentCorrect);
  };

  const scorePercentage: number = Math.round(
    (score / quiz.questions.length) * 100
  );

  if (submitted) {
    return (
      <QuizzSubmission
        score={score}
        totalQuestions={quiz.questions.length}
        scorePercentage={scorePercentage}
      />
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className='flex flex-col flex-1'>
      <div className='position-sticky top-0 z-10 py-4 w-full'>
        <header className='grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2'>
          <Button size='icon' variant='outline'>
            <ChevronLeft />
          </Button>
          <ProgressBar value={progress} />
          <Button size='icon' variant='outline'>
            <X />
          </Button>
        </header>
      </div>
      <main className='flex justify-center flex-1'>
        {!started ? (
          <div className='text-center'>
            <h1 className='text-3xl font-bold mb-4'>{quiz.name}</h1>
            <p className='text-gray-600'>{quiz.description}</p>
          </div>
        ) : (
          <div>
            <h2 className='text-3xl font-bold mb-6 px-4'>
              {quiz.questions[currentQuestion].questionText}
            </h2>
            <div className='grid grid-cols-1 gap-4 mx-4'>
              {quiz.questions[currentQuestion].answers.map((answer, index) => {
                const variant =
                  selectedAnswer === index
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : 'default';

                return (
                  <Button
                    onClick={() => handleAnswer(answer, index)}
                    key={index}
                    size='lg'
                    variant={variant}
                    className='h-auto min-h-[3rem] whitespace-normal text-left px-6 py-4 leading-normal'
                  >
                    {answer.answerText}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none'>
          <LoginButton />
        </div>
      </main>
      <footer className='footer pb-9 px-6 relative mb-0'>
        <ResultCard
          isCorrect={isCorrect}
          correctAnswer={
            quiz.questions[currentQuestion].answers.find(
              (answer) => answer.isCorrect === true
            )?.answerText || ''
          }
        />
        <Button variant='neo' size='lg' onClick={handleNext}>
          {!started
            ? 'Start'
            : currentQuestion === quiz.questions.length - 1
            ? 'Submit'
            : 'Next'}
        </Button>
      </footer>
    </div>
  );
}
