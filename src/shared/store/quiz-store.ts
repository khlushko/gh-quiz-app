'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AnswerValue, AnswersByQuiz, QuizAnswers } from '@/src/entities/quiz/types';

export const EMPTY_ANSWERS: QuizAnswers = Object.freeze({}) as QuizAnswers;

interface QuizState {
  answers: AnswersByQuiz;
  setAnswer: (quizId: string, questionId: string, value: AnswerValue) => void;
  resetQuiz: (quizId: string) => void;
  getQuizAnswers: (quizId: string) => QuizAnswers;
  getAnswer: (quizId: string, questionId: string) => AnswerValue | undefined;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      answers: {},
      setAnswer: (quizId, questionId, value) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [quizId]: {
              ...(state.answers[quizId] ?? {}),
              [questionId]: value,
            },
          },
        })),
      resetQuiz: (quizId) =>
        set((state) => {
          const next = { ...state.answers };
          delete next[quizId];
          return { answers: next };
        }),
      getQuizAnswers: (quizId) => get().answers[quizId] ?? {},
      getAnswer: (quizId, questionId) => get().answers[quizId]?.[questionId],
    }),
    {
      name: 'quiz-answers',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ answers: state.answers }),
    }
  )
);
