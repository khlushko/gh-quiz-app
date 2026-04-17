'use client';

import { NumberField } from '@base-ui/react/number-field';
import { useState } from 'react';
import type { NumberQuestion } from '@/src/entities/quiz/types';
import { Button } from '@/src/shared/ui/button';

export interface NumberInputProps {
  question: NumberQuestion;
  initialValue?: number;
  onSubmit: (value: number) => void;
}

export function NumberInput({ question, initialValue, onSubmit }: NumberInputProps) {
  const [value, setValue] = useState<number | null>(
    typeof initialValue === 'number' ? initialValue : null
  );

  const min = question.validation?.min;
  const max = question.validation?.max;

  const isValid =
    value !== null &&
    Number.isFinite(value) &&
    (min === undefined || value >= min) &&
    (max === undefined || value <= max);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
        {question.text}
      </h2>
      <NumberField.Root
        value={value}
        onValueChange={(next) => setValue(next)}
        min={min}
        max={max}
        className="mx-auto"
      >
        <NumberField.Group className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1">
          <NumberField.Decrement
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Decrement"
          >
            −
          </NumberField.Decrement>
          <NumberField.Input
            className="w-24 bg-transparent text-center text-lg font-semibold text-gray-900 outline-none"
            placeholder="—"
          />
          <NumberField.Increment
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Increment"
          >
            +
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
      <Button
        variant="primary"
        fullWidth
        disabled={!isValid}
        onClick={() => isValid && onSubmit(value as number)}
        className="mt-2"
      >
        Next
      </Button>
    </div>
  );
}
