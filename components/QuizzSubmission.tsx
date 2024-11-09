import Bar from '@/components/Bar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
};

const QuizzSubmission = (props: {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
}) => {
  const { scorePercentage, score, totalQuestions } = props;
  const router = useRouter();
  return (
    <div className='flex flex-col flex-1'>
      <main className='py-11 flex flex-col gap-4 items-center flex-1 mt-24'>
        <h2 className='text-3xl font-bold'>Quiz Complete!</h2>
        <p>You scored: {scorePercentage}%</p>
        <>
          <div className='flex flex-row gap-8 mt-6'>
            <Bar percentage={scorePercentage} color='green' />
            <Bar percentage={100 - scorePercentage} color='red' />
          </div>
          <div className='flex flex-row gap-8'>
            <p>{score} Correct</p>
            <p>{totalQuestions - score} Incorrect</p>
          </div>
          <Button onClick={() => router.push('/quizz')} className='mt-8'>
            Back to Quizzes
          </Button>
        </>
      </main>
    </div>
  );
};

export default QuizzSubmission;
