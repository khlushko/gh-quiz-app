import { describe, expect, it } from 'vitest';
import { visibleIf } from '../lib/visibility';
import type { Question, QuizAnswers } from '../types';

function makeQuestion(visibleIf?: Question['visibleIf']): Question {
  return {
    id: 'q-target',
    type: 'single_choice',
    text: 'test',
    options: [{ value: 'a', label: 'A' }],
    visibleIf,
  };
}

describe('visibleIf', () => {
  it('returns true when no visibleIf is defined', () => {
    const q = makeQuestion();
    expect(visibleIf(q, {})).toBe(true);
  });

  it('returns true when visibleIf is an empty array', () => {
    const q = makeQuestion([]);
    expect(visibleIf(q, {})).toBe(true);
  });

  describe('equals: string expected', () => {
    const q = makeQuestion([{ questionId: 'q1', equals: 'yes' }]);

    it('matches string answer', () => {
      expect(visibleIf(q, { q1: 'yes' })).toBe(true);
      expect(visibleIf(q, { q1: 'no' })).toBe(false);
    });

    it('matches array answer via includes', () => {
      expect(visibleIf(q, { q1: ['yes', 'maybe'] })).toBe(true);
      expect(visibleIf(q, { q1: ['no'] })).toBe(false);
    });

    it('is false when answer is missing', () => {
      expect(visibleIf(q, {})).toBe(false);
    });
  });

  describe('equals: array expected', () => {
    const q = makeQuestion([{ questionId: 'q1', equals: ['yes', 'maybe'] }]);

    it('matches string answer via includes', () => {
      expect(visibleIf(q, { q1: 'yes' })).toBe(true);
      expect(visibleIf(q, { q1: 'no' })).toBe(false);
    });

    it('matches array answer via intersection', () => {
      expect(visibleIf(q, { q1: ['maybe', 'other'] })).toBe(true);
      expect(visibleIf(q, { q1: ['other'] })).toBe(false);
    });
  });

  describe('notEquals', () => {
    it('is true when answer does not match', () => {
      const q = makeQuestion([{ questionId: 'q1', notEquals: 'yes' }]);
      expect(visibleIf(q, { q1: 'no' })).toBe(true);
      expect(visibleIf(q, { q1: 'yes' })).toBe(false);
    });

    it('is true when answer is missing', () => {
      const q = makeQuestion([{ questionId: 'q1', notEquals: 'yes' }]);
      expect(visibleIf(q, {})).toBe(true);
    });

    it('inverts array includes', () => {
      const q = makeQuestion([{ questionId: 'q1', notEquals: ['a', 'b'] }]);
      expect(visibleIf(q, { q1: 'c' })).toBe(true);
      expect(visibleIf(q, { q1: 'a' })).toBe(false);
      expect(visibleIf(q, { q1: ['c', 'd'] })).toBe(true);
      expect(visibleIf(q, { q1: ['a', 'c'] })).toBe(false);
    });
  });

  it('combines multiple conditions with AND', () => {
    const q = makeQuestion([
      { questionId: 'q1', equals: 'yes' },
      { questionId: 'q2', notEquals: 'skip' },
    ]);
    const answers: QuizAnswers = { q1: 'yes', q2: 'ok' };
    expect(visibleIf(q, answers)).toBe(true);

    expect(visibleIf(q, { q1: 'yes', q2: 'skip' })).toBe(false);
    expect(visibleIf(q, { q1: 'no', q2: 'ok' })).toBe(false);
  });
});
