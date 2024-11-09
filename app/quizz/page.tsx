import { createClient } from '@/utils/supabase/server';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function QuizzesPage() {
  const supabase = createClient();

  // Get current user from session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-2xl font-bold mb-4'>
          Please login to view your quizzes
        </h1>
        <Link href='/login'>
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  // Fetch quizzes for the current user
  const { data: quizzes, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('creator_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quizzes:', error);
    return <div>Error loading quizzes</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>My Quizzes</h1>
        <Link href='/quizz/new'>
          <Button>Create New Quiz</Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-xl text-gray-600 mb-4'>
            You haven't created any quizzes yet
          </p>
          <Link href='/quizz/new'>
            <Button>Create Your First Quiz</Button>
          </Link>
        </div>
      ) : (
        <div className='flex flex-col gap-6 max-w-2xl mx-auto'>
          {quizzes.map((quiz) => (
            <div key={quiz.id}>
              <QuizCard quiz={quiz} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
