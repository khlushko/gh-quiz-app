import { describe, expect, it } from 'vitest';
import {
  getFirstQuestionId,
  getNextQuestionId,
  getVisibleQuestions,
} from '../lib/navigation';
import type { Question, QuizAnswers } from '../types';

function choice(id: string, visibleIf?: Question['visibleIf']): Question {
  return {
    id,
    type: 'single_choice',
    text: `Question ${id}`,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    visibleIf,
  };
}

describe('getVisibleQuestions', () => {
  it('keeps all questions when nothing is gated', () => {
    const questions = [choice('q1'), choice('q2'), choice('q3')];
    expect(getVisibleQuestions(questions, {}).map((q) => q.id)).toEqual([
      'q1',
      'q2',
      'q3',
    ]);
  });

  it('filters out questions whose visibleIf does not match', () => {
    const questions = [
      choice('q1'),
      choice('q2', [{ questionId: 'q1', equals: 'yes' }]),
      choice('q3'),
    ];
    const answers: QuizAnswers = { q1: 'no' };
    expect(getVisibleQuestions(questions, answers).map((q) => q.id)).toEqual([
      'q1',
      'q3',
    ]);
  });
});

describe('getNextQuestionId', () => {
  it('returns the next question when it has no condition', () => {
    const questions = [choice('q1'), choice('q2'), choice('q3')];
    expect(getNextQuestionId(questions, {}, 'q1')).toBe('q2');
  });

  it('skips a hidden next question via visibleIf', () => {
    const questions = [
      choice('q1'),
      choice('q2', [{ questionId: 'q1', equals: 'yes' }]),
      choice('q3'),
    ];
    const answers: QuizAnswers = { q1: 'no' };
    expect(getNextQuestionId(questions, answers, 'q1')).toBe('q3');
  });

  it('skips multiple consecutive hidden questions', () => {
    const questions = [
      choice('q1'),
      choice('q2', [{ questionId: 'q1', equals: 'yes' }]),
      choice('q3', [{ questionId: 'q1', equals: 'yes' }]),
      choice('q4'),
    ];
    const answers: QuizAnswers = { q1: 'no' };
    expect(getNextQuestionId(questions, answers, 'q1')).toBe('q4');
  });

  it('returns null when there are no visible questions after the current one', () => {
    const questions = [
      choice('q1'),
      choice('q2'),
      choice('q3', [{ questionId: 'q1', equals: 'yes' }]),
    ];
    const answers: QuizAnswers = { q1: 'no' };
    expect(getNextQuestionId(questions, answers, 'q2')).toBeNull();
  });

  it('returns null when current is the last question', () => {
    const questions = [choice('q1'), choice('q2')];
    expect(getNextQuestionId(questions, {}, 'q2')).toBeNull();
  });

  it('returns null when currentId is hidden (not in the visible list)', () => {
    const questions = [
      choice('q1'),
      choice('q2', [{ questionId: 'q1', equals: 'yes' }]),
      choice('q3'),
    ];
    const answers: QuizAnswers = { q1: 'no' };
    expect(getNextQuestionId(questions, answers, 'q2')).toBeNull();
  });

  it('returns null for an unknown currentId', () => {
    const questions = [choice('q1'), choice('q2')];
    expect(getNextQuestionId(questions, {}, 'does-not-exist')).toBeNull();
  });

  it('re-includes a previously hidden question when the gating answer changes', () => {
    const questions = [
      choice('q1'),
      choice('q2', [{ questionId: 'q1', equals: 'yes' }]),
      choice('q3'),
    ];
    expect(getNextQuestionId(questions, { q1: 'no' }, 'q1')).toBe('q3');
    expect(getNextQuestionId(questions, { q1: 'yes' }, 'q1')).toBe('q2');
  });
});

describe('getFirstQuestionId', () => {
  it('returns the first question when nothing is hidden', () => {
    const questions = [choice('q1'), choice('q2'), choice('q3')];
    expect(getFirstQuestionId(questions, {})).toBe('q1');
  });

  it('returns the first visible question when the first is hidden', () => {
    const questions = [
      choice('q1', [{ questionId: 'q0', equals: 'yes' }]),
      choice('q2'),
      choice('q3'),
    ];
    expect(getFirstQuestionId(questions, {})).toBe('q2');
  });

  it('skips a chain of hidden questions at the start', () => {
    const questions = [
      choice('q1', [{ questionId: 'q0', equals: 'yes' }]),
      choice('q2', [{ questionId: 'q0', equals: 'yes' }]),
      choice('q3'),
    ];
    expect(getFirstQuestionId(questions, {})).toBe('q3');
  });

  it('returns null when every question is hidden', () => {
    const questions = [
      choice('q1', [{ questionId: 'q0', equals: 'yes' }]),
      choice('q2', [{ questionId: 'q0', equals: 'yes' }]),
    ];
    expect(getFirstQuestionId(questions, {})).toBeNull();
  });

  it('returns null for an empty question list', () => {
    expect(getFirstQuestionId([], {})).toBeNull();
  });
});
