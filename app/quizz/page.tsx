'use client';
import LoginButton from '@/components/LoginLogoutButton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { ChevronLeft, X } from 'lucide-react';
import ResultCard from './ResultCard';
import QuizzSubmission from './QuizzSubmission';
import confetti from 'canvas-confetti';

const questions = [
  {
    questionText: 'What is React?',
    answerOptions: [
      { answerText: 'Front-end framework', isCorrect: false, id: 1 },
      { answerText: 'Back-end framework', isCorrect: false, id: 2 },
      { answerText: 'Library', isCorrect: true, id: 3 },
      { answerText: 'Language', isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: 'What is Next JS?',
    answerOptions: [
      { answerText: 'Front-end framework', isCorrect: false, id: 1 },
      { answerText: 'Back-end framework', isCorrect: false, id: 2 },
      { answerText: 'Library', isCorrect: false, id: 3 },
      { answerText: 'Framework', isCorrect: true, id: 4 },
    ],
  },
  {
    questionText: 'What is Tailwind CSS?',
    answerOptions: [
      { answerText: 'Front-end framework', isCorrect: false, id: 1 },
      { answerText: 'Back-end framework', isCorrect: false, id: 2 },
      { answerText: 'Library', isCorrect: false, id: 3 },
      { answerText: 'Framework', isCorrect: true, id: 4 },
    ],
  },
];

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [confettiTriggered, setConfettiTriggered] = useState<boolean>(false);

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

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setConfettiTriggered(false);
    } else {
      setSubmitted(true);
      return;
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answerOption: any) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerOption.id);
    const isCurrentCorrect = answerOption.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
      triggerConfetti();
    }
    setIsCorrect(isCurrentCorrect);
  };

  const scorePercentage: number = Math.round((score / questions.length) * 100);
  if (submitted) {
    return (
      <QuizzSubmission
        score={score}
        totalQuestions={questions.length}
        scorePercentage={scorePercentage}
      />
    );
  }

  // Calculate progress as a percentage
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
          <h1 className='text-3xl font-bold'>Welcome to Your AI Quiz 👋</h1>
        ) : (
          <div>
            <h2 className='text-3xl font-bold'>
              {questions[currentQuestion].questionText}
            </h2>
            <div className='grid grid-cols-1 gap-6 m-6'>
              {questions[currentQuestion].answerOptions.map((answerOption) => {
                // Determine the variant based on the answer's correctness and user's selection
                const variant =
                  selectedAnswer === answerOption.id
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : 'default'; // default variant for unselected options

                return (
                  <Button
                    onClick={() => handleAnswer(answerOption)}
                    key={answerOption.id}
                    size='lg'
                    variant={variant}
                  >
                    {answerOption.answerText}
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
            questions[currentQuestion].answerOptions.find(
              (answer) => answer.isCorrect === true
            )?.answerText || ''
          }
        />
        <Button variant='neo' size='lg' onClick={handleNext}>
          {!started
            ? 'Start'
            : currentQuestion === questions.length - 1
            ? 'Submit'
            : 'Next'}
        </Button>
      </footer>
    </div>
  );
}
