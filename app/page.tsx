import { getQuizList } from '@/src/shared/api/quiz.actions';
import { QuizCard } from '@/src/widgets/quiz-card';

export default async function HomePage() {
  const quizzes = await getQuizList();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Choose your quiz</h1>
      <p className="mb-8 text-sm text-gray-500">
        Select the quiz that matches your personal health goal.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.quizId} quiz={quiz} />
        ))}
      </div>
    </main>
  );
}
