'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import { useCallback } from 'react';
import type { Quiz } from '@/src/entities/quiz/types';
import { Button } from '@/src/shared/ui/button';
import { EMPTY_ANSWERS, useQuizStore } from '@/src/shared/store/quiz-store';

export interface QuizResultProps {
  quiz: Quiz;
}

export function QuizResult({ quiz }: QuizResultProps) {
  const answers = useQuizStore((s) => s.answers[quiz.quizId] ?? EMPTY_ANSWERS);

  const handleDownload = useCallback(() => {
    const payload = {
      quizId: quiz.quizId,
      brand: quiz.brand.name,
      title: quiz.title,
      completedAt: new Date().toISOString(),
      answers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${quiz.quizId}-result.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [quiz.quizId, quiz.brand.name, quiz.title, answers]);

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <div
        aria-hidden
        className="flex h-16 w-16 items-center justify-center rounded-full bg-(--brand-primary) text-3xl text-white"
      >
        🎉
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          Congratulations!
        </h1>
        <p className="text-sm text-gray-500 md:text-base">
          Your personalized {quiz.brand.name} plan is ready. Download it to keep a copy for
          yourself.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={handleDownload}
          className="w-full gap-2"
        >
          <Download className="h-4 w-4" />
          Download my plan
        </Button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          Back to quizzes
        </Link>
      </div>
    </section>
  );
}
