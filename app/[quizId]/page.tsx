import Image from 'next/image';
import Link from 'next/link';

import { getQuiz } from '@/src/shared/api/quiz.actions';

export default async function QuizLandingPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await getQuiz(quizId);

  const firstQuestion = quiz.questions[0];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="relative order-1 mx-auto aspect-square w-full max-w-65 sm:max-w-80 md:order-2 md:max-w-none">
          <Image
            src={quiz.coverImage}
            alt={quiz.title}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 70vw"
            className="object-contain"
          />
        </div>
        <div className="order-2 flex flex-col gap-5 text-center md:order-1 md:gap-6 md:text-left">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl md:leading-[1.05]">
            {quiz.title}
          </h1>
          <div className="flex flex-col items-center gap-3 md:items-start">
            {quiz.actions.map((action, index) => (
              <Link
                key={index}
                href={`/${quiz.quizId}/${firstQuestion.id}`}
                className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-(--brand-primary) px-10 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-accent,var(--brand-primary)) md:w-auto"
              >
                {action}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
