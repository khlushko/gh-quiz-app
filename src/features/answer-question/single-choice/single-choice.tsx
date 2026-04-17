'use client';

import type { SingleChoiceQuestion } from '@/src/entities/quiz/types';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/cn';
import { ArrowRight } from 'lucide-react';

export interface SingleChoiceProps {
  question: SingleChoiceQuestion;
  initialValue?: string;
  onSubmit: (value: string) => void;
}

export function SingleChoice({ question, initialValue, onSubmit }: SingleChoiceProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
        {question.text}
      </h2>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => {
          const selected = initialValue === option.value;
          return (
            <Button
              key={option.value}
              variant="option"
              onClick={() => onSubmit(option.value)}
              className={cn(
                selected && 'border-(--brand-primary) ring-1 ring-(--brand-primary)'
              )}
            >
              <span>{option.label}</span>
              <ArrowRight className='h-4 w-4 text-(--brand-primary)'/>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
