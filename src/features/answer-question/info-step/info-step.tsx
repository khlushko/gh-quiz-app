'use client';

import Image from 'next/image';
import type { InfoQuestion } from '@/src/entities/quiz/types';
import { Button } from '@/src/shared/ui/button';

export interface InfoStepProps {
  question: InfoQuestion;
  onSubmit: () => void;
}

export function InfoStep({ question, onSubmit }: InfoStepProps) {
  const paragraphs = [
    question['description-1'],
    question['description-2'],
    question['description-3'],
  ].filter((p): p is string => Boolean(p));

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-xl font-semibold text-gray-900">{question.title}</h2>
      {question.image ? (
        <Image
          src={question.image}
          alt=""
          width={320}
          height={180}
          className="h-auto w-full max-w-[320px] rounded-xl object-cover"
        />
      ) : null}
      <div className="flex flex-col gap-3 text-sm text-gray-600">
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <Button variant="primary" fullWidth onClick={onSubmit} className="mt-4">
        OK, lets do it!
      </Button>
    </div>
  );
}
