import { notFound } from 'next/navigation';
import { getQuiz } from '@/src/shared/api/quiz.actions';
import { QuestionStep } from '@/src/widgets/question-step';

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ quizId: string; questionId: string }>;
}) {
  const { quizId, questionId } = await params;
  const quiz = await getQuiz(quizId);
  const question = quiz.questions.find((q) => q.id === questionId);

  if (!question) notFound();

  return <QuestionStep quiz={quiz} question={question} />;
}
