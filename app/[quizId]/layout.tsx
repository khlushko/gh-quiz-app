import type { CSSProperties, ReactNode } from 'react';
import { getQuiz, getQuizList } from '@/src/shared/api/quiz.actions';
import { QuizHeader } from '@/src/widgets/quiz-header';

export async function generateStaticParams() {
  const quizzes = await getQuizList();
  return quizzes.map(({ quizId }) => ({ quizId }));
}

export default async function QuizLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await getQuiz(quizId);

  const brandStyle = {
    '--brand-primary': quiz.brand.primaryColor,
    '--brand-accent': quiz.brand.accentColor,
  } as CSSProperties;

  return (
    <div style={brandStyle} className="flex min-h-screen flex-col bg-white">
      <QuizHeader quiz={quiz} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
