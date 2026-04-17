import { getQuiz } from '@/src/shared/api/quiz.actions';
import { QuizResult } from '@/src/widgets/quiz-result';

export default async function QuizResultPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await getQuiz(quizId);
  return <QuizResult quiz={quiz} />;
}
