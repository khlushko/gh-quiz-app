import { describe, expect, it } from 'vitest';
import { QuizSchema } from '../schemas';
import heycys from '@/src/mock-data/quizzes/heycys.json';
import fitmom from '@/src/mock-data/quizzes/fitmom.json';
import diabeat from '@/src/mock-data/quizzes/diabeat.json';
import msclr from '@/src/mock-data/quizzes/msclr.json';

describe('QuizSchema', () => {
  it.each([
    ['heycys', heycys],
    ['fitmom', fitmom],
    ['diabeat', diabeat],
    ['msclr', msclr],
  ])('parses the %s quiz fixture', (quizId, fixture) => {
    const parsed = QuizSchema.parse(fixture);
    expect(parsed.quizId).toBe(quizId);
    expect(parsed.questions.length).toBeGreaterThan(0);
  });
});
