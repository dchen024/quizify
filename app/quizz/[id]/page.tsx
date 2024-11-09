import { createClient } from '@/utils/supabase/server';
import QuizGame from '@/components/QuizGame';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: quiz, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error fetching quiz:', error);
    return <div>Error loading quiz</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  console.log('Fetched quiz:', quiz); // This will log server-side

  return <QuizGame quiz={quiz} />;
}
