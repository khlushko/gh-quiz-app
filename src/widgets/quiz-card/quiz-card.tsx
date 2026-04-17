import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { QuizMeta } from '@/src/entities/quiz/types';

export interface QuizCardProps {
  quiz: QuizMeta;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const style = {
    '--brand-primary': quiz.brand.primaryColor,
    '--brand-accent': quiz.brand.accentColor,
  } as CSSProperties;

  return (
    <div
      style={style}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="relative aspect-4/3 w-full bg-gray-50">
        <Image
          src={quiz.coverImage}
          alt={quiz.title}
          fill
          sizes="(min-width: 640px) 320px, 100vw"
          className="object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-(--brand-primary)">
            {quiz.brand.name}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-gray-900">{quiz.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{quiz.description}</p>
        </div>
        <Link
          href={`/${quiz.quizId}`}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-(--brand-primary) px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--brand-accent,var(--brand-primary))"
        >
          Start quiz
        </Link>
      </div>
    </div>
  );
}
