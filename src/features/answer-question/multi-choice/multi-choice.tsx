'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MultiChoiceQuestion } from '@/src/entities/quiz/types';
import { Button } from '@/src/shared/ui/button';
import { Checkbox } from '@/src/shared/ui/checkbox';
import { cn } from '@/src/shared/lib/cn';

export interface MultiChoiceProps {
  question: MultiChoiceQuestion;
  initialValue?: string[];
  onSubmit: (value: string[]) => void;
}

export function MultiChoice({ question, initialValue, onSubmit }: MultiChoiceProps) {
  const [selected, setSelected] = useState<string[]>(initialValue ?? []);

  const toggle = (value: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...new Set([...prev, value])] : prev.filter((v) => v !== value)
    );
  };

  const disabled = selected.length === 0;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
        {question.text}
      </h2>
      <p className="mb-4 text-center text-sm font-semibold text-gray-400">Select all that apply.</p>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => {
          const isChecked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                'flex w-full cursor-pointer items-center justify-between rounded-2xl border bg-white px-4 py-3 transition-colors',
                isChecked
                  ? 'border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <span className="flex items-center gap-3 text-sm font-medium text-gray-800">
                {option.icon ? (
                  <Image
                    src={option.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                ) : (
                  <span className="inline-block h-6 w-6" aria-hidden />
                )}
                {option.label}
              </span>
              <Checkbox
                checked={isChecked}
                onCheckedChange={(c) => toggle(option.value, c)}
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                  isChecked
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white'
                    : 'border-gray-300 bg-white'
                )}
              />
            </label>
          );
        })}
      </div>
      <Button
        variant="primary"
        fullWidth
        disabled={disabled}
        onClick={() => onSubmit(selected)}
        className="mt-3"
      >
        Continue
      </Button>
    </div>
  );
}
