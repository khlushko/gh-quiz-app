import type { z } from 'zod';
import type {
  BrandSchema,
  InfoQuestionSchema,
  MultiChoiceQuestionSchema,
  NumberQuestionSchema,
  OptionSchema,
  OptionWithIconSchema,
  QuestionSchema,
  QuizMetaSchema,
  QuizSchema,
  SingleChoiceQuestionSchema,
  VisibleIfConditionSchema,
  VisibleIfSchema,
} from './schemas';

export type Brand = z.infer<typeof BrandSchema>;
export type Option = z.infer<typeof OptionSchema>;
export type OptionWithIcon = z.infer<typeof OptionWithIconSchema>;

export type VisibleIfCondition = z.infer<typeof VisibleIfConditionSchema>;
export type VisibleIf = z.infer<typeof VisibleIfSchema>;

export type SingleChoiceQuestion = z.infer<typeof SingleChoiceQuestionSchema>;
export type MultiChoiceQuestion = z.infer<typeof MultiChoiceQuestionSchema>;
export type NumberQuestion = z.infer<typeof NumberQuestionSchema>;
export type InfoQuestion = z.infer<typeof InfoQuestionSchema>;

export type Question = z.infer<typeof QuestionSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type QuizMeta = z.infer<typeof QuizMetaSchema>;

export type AnswerValue = string | string[] | number;
export type QuizAnswers = Record<string, AnswerValue>;
export type AnswersByQuiz = Record<string, QuizAnswers>;
