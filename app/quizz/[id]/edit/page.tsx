import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import QuizEditForm from './QuizEditForm';

export default async function EditQuizPage({
  params,
}: {
  params: { id: string };
}) {
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
    .eq('id', params.id)
    .single();

  if (error || !quiz) {
    console.error('Error fetching quiz:', error);
    notFound();
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

  return <QuizEditForm quiz={quiz} />;
}
