'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import type { Quiz } from '@/src/entities/quiz/types';
import { getQuestionProgress } from '@/src/entities/quiz/lib/navigation';
import { EMPTY_ANSWERS, useQuizStore } from '@/src/shared/store/quiz-store';
import { Progress } from '@/src/shared/ui/progress';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/src/shared/ui/button';

export interface QuizHeaderProps {
  quiz: Quiz;
}

export function QuizHeader({ quiz }: QuizHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const answers = useQuizStore((s) => s.answers[quiz.quizId] ?? EMPTY_ANSWERS);

  const currentQuestionId = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) ?? [];
    if (segments.length < 2) return null;
    const [, candidate] = segments;
    if (!candidate) return null;
    const isQuestion = quiz.questions.some((q) => q.id === candidate);
    return isQuestion ? candidate : null;
  }, [pathname, quiz.questions]);

  const showProgress = currentQuestionId !== null;
  const progress = currentQuestionId
    ? getQuestionProgress(quiz.questions, answers, currentQuestionId)
    : null;

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 bg-white px-4 pb-3 pt-4">
      <div className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
          {showProgress ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="-ml-2 cursor-pointer gap-1 px-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5 text-(--brand-primary)" />
              Back
            </Button>
          ) : null}
        </div>
        <div className="justify-self-center rounded-full bg-(--brand-primary) px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
          {quiz.brand.name}
        </div>
        <div className="justify-self-end text-sm font-medium tabular-nums text-gray-500">
          {showProgress && progress ? (
            <>
              <span className="text-gray-900">{progress.index + 1}</span>
              <span>/{progress.total}</span>
            </>
          ) : null}
        </div>
      </div>
      {showProgress && progress ? (
        <Progress value={progress.percent} />
      ) : null}
    </header>
  );
}
