import type { AnswerValue, Question, QuizAnswers, VisibleIfCondition } from '../types';

function toStringArray(value: unknown): string[] | null {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value;
  return null;
}

function matchesEquals(answer: AnswerValue | undefined, expected: string | string[]): boolean {
  if (answer === undefined) return false;
  const answerStrings = toStringArray(answer);
  if (answerStrings === null) return false;
  const expectedList = Array.isArray(expected) ? expected : [expected];
  return expectedList.some((exp) => answerStrings.includes(exp));
}

function evaluateCondition(condition: VisibleIfCondition, answers: QuizAnswers): boolean {
  const answer = answers[condition.questionId];
  if (condition.equals !== undefined) {
    return matchesEquals(answer, condition.equals);
  }
  if (condition.notEquals !== undefined) {
    return !matchesEquals(answer, condition.notEquals);
  }
  return true;
}

export function visibleIf(question: Question, answers: QuizAnswers): boolean {
  const conditions = question.visibleIf;
  if (!conditions || conditions.length === 0) return true;
  return conditions.every((c) => evaluateCondition(c, answers));
}
