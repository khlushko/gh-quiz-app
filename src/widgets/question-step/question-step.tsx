'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { AnswerValue, Question, Quiz } from '@/src/entities/quiz/types';
import { getNextQuestionId } from '@/src/entities/quiz/lib/navigation';
import { pushEvent } from '@/src/shared/lib/analytics';
import { EMPTY_ANSWERS, useQuizStore } from '@/src/shared/store/quiz-store';
import { SingleChoice } from '@/src/features/answer-question/single-choice';
import { MultiChoice } from '@/src/features/answer-question/multi-choice';
import { NumberInput } from '@/src/features/answer-question/number-input';
import { InfoStep } from '@/src/features/answer-question/info-step';

export interface QuestionStepProps {
  quiz: Quiz;
  question: Question;
}

export function QuestionStep({ quiz, question }: QuestionStepProps) {
  const router = useRouter();
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const currentAnswers = useQuizStore((s) => s.answers[quiz.quizId] ?? EMPTY_ANSWERS);

  useEffect(() => {
    pushEvent('quiz_view', {
      quizId: quiz.quizId,
      questionId: question.id,
      questionType: question.type,
    });
  }, [quiz.quizId, question.id, question.type]);

  const goToNext = useCallback(
    (nextAnswers: Record<string, AnswerValue>) => {
      const nextId = getNextQuestionId(quiz.questions, nextAnswers, question.id);
      if (nextId) {
        router.push(`/${quiz.quizId}/${nextId}`);
      } else {
        router.push(`/${quiz.quizId}/loading-result`);
      }
    },
    [quiz.questions, quiz.quizId, question.id, router]
  );

  const handleAnswer = useCallback(
    (value: AnswerValue) => {
      setAnswer(quiz.quizId, question.id, value);
      pushEvent('quiz_answer', {
        quizId: quiz.quizId,
        questionId: question.id,
        value,
      });
      goToNext({ ...currentAnswers, [question.id]: value });
    },
    [setAnswer, quiz.quizId, question.id, currentAnswers, goToNext]
  );

  const handleInfoContinue = useCallback(() => {
    pushEvent('quiz_answer', {
      quizId: quiz.quizId,
      questionId: question.id,
      value: true,
    });
    goToNext(currentAnswers);
  }, [quiz.quizId, question.id, currentAnswers, goToNext]);

  const stored = currentAnswers[question.id];

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      {question.type === 'single_choice' && (
        <SingleChoice
          question={question}
          initialValue={typeof stored === 'string' ? stored : undefined}
          onSubmit={handleAnswer}
        />
      )}
      {question.type === 'multi_choice' && (
        <MultiChoice
          question={question}
          initialValue={Array.isArray(stored) ? stored : undefined}
          onSubmit={handleAnswer}
        />
      )}
      {question.type === 'number' && (
        <NumberInput
          question={question}
          initialValue={typeof stored === 'number' ? stored : undefined}
          onSubmit={handleAnswer}
        />
      )}
      {question.type === 'info' && (
        <InfoStep question={question} onSubmit={handleInfoContinue} />
      )}
    </section>
  );
}
