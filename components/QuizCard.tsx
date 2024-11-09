'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Quiz = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  questions: any[];
};

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Delete quiz
    // await deleteQuiz(quiz.id);
    // Programmatically refresh the page
    router.refresh();
  };

  return (
    <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow'>
      <Link href={`/quizz/${quiz.id}`}>
        <h2 className='text-xl font-semibold mb-2'>{quiz.name}</h2>
        <p className='text-gray-600 mb-4 line-clamp-2'>{quiz.description}</p>
        <div className='flex justify-between items-center text-sm text-gray-500'>
          <span>{quiz.questions.length} questions</span>
          <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
        </div>
      </Link>

      <div className='mt-4 flex gap-2'>
        <Button onClick={() => router.push(`/quizz/${quiz.id}/edit`)}>
          Edit
        </Button>
        <Button variant='destructive' onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
