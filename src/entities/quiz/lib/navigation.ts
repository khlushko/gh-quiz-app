import type { Question, QuizAnswers } from '../types';
import { visibleIf } from './visibility';

export function getVisibleQuestions(questions: Question[], answers: QuizAnswers): Question[] {
  return questions.filter((q) => visibleIf(q, answers));
}

export function getNextQuestionId(
  questions: Question[],
  answers: QuizAnswers,
  currentId: string
): string | null {
  const visible = getVisibleQuestions(questions, answers);
  const idx = visible.findIndex((q) => q.id === currentId);
  if (idx === -1) return null;
  const next = visible[idx + 1];
  return next ? next.id : null;
}

export function getFirstQuestionId(questions: Question[], answers: QuizAnswers): string | null {
  const visible = getVisibleQuestions(questions, answers);
  return visible[0]?.id ?? null;
}

export function getQuestionProgress(
  questions: Question[],
  answers: QuizAnswers,
  currentId: string
): { index: number; total: number; percent: number } {
  const visible = getVisibleQuestions(questions, answers);
  const total = visible.length;
  const idx = visible.findIndex((q) => q.id === currentId);
  const index = idx === -1 ? 0 : idx;
  const percent = total > 0 ? Math.round(((index + 1) / total) * 100) : 0;
  return { index, total, percent };
}
