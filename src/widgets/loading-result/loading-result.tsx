'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pushEvent } from '@/src/shared/lib/analytics';
import { EMPTY_ANSWERS, useQuizStore } from '@/src/shared/store/quiz-store';

export interface LoadingResultProps {
  quizId: string;
  redirectDelayMs?: number;
}

export function LoadingResult({ quizId, redirectDelayMs = 2500 }: LoadingResultProps) {
  const router = useRouter();
  const answers = useQuizStore((s) => s.answers[quizId] ?? EMPTY_ANSWERS);
  const submitted = useRef(false);

  useEffect(() => {
    if (!submitted.current) {
      submitted.current = true;
      pushEvent('quiz_submit', { quizId, answers });
    }

    const timer = setTimeout(() => {
      router.replace(`/${quizId}/result`);
    }, redirectDelayMs);

    return () => clearTimeout(timer);
  }, [quizId, answers, redirectDelayMs, router]);

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-(--brand-primary)" />
      <p className="text-sm text-(--brand-primary)">
        Analyzing your data...
      </p>
    </section>
  );
}
