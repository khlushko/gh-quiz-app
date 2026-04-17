import { z } from 'zod';

const StringOrStringArray = z.union([z.string(), z.array(z.string())]);

export const VisibleIfConditionSchema = z
  .object({
    questionId: z.string(),
    equals: StringOrStringArray.optional(),
    notEquals: StringOrStringArray.optional(),
  })
  .refine(
    (c) => (c.equals === undefined) !== (c.notEquals === undefined),
    { message: 'Condition must have exactly one of `equals` or `notEquals`' }
  );

export const VisibleIfSchema = z.array(VisibleIfConditionSchema);

export const OptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const OptionWithIconSchema = OptionSchema.extend({
  icon: z.string(),
});

const QuestionBase = {
  id: z.string(),
  visibleIf: VisibleIfSchema.optional(),
};

export const SingleChoiceQuestionSchema = z.object({
  ...QuestionBase,
  type: z.literal('single_choice'),
  text: z.string(),
  options: z.array(OptionSchema).min(1),
});

export const MultiChoiceQuestionSchema = z.object({
  ...QuestionBase,
  type: z.literal('multi_choice'),
  text: z.string(),
  options: z.array(OptionWithIconSchema).min(1),
});

export const NumberQuestionSchema = z.object({
  ...QuestionBase,
  type: z.literal('number'),
  text: z.string(),
  validation: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
});

export const InfoQuestionSchema = z.object({
  ...QuestionBase,
  type: z.literal('info'),
  title: z.string(),
  'description-1': z.string().optional(),
  'description-2': z.string().optional(),
  'description-3': z.string().optional(),
  image: z.string().optional(),
});

export const QuestionSchema = z.discriminatedUnion('type', [
  SingleChoiceQuestionSchema,
  MultiChoiceQuestionSchema,
  NumberQuestionSchema,
  InfoQuestionSchema,
]);

export const BrandSchema = z.object({
  name: z.string(),
  primaryColor: z.string(),
  accentColor: z.string(),
});

export const QuizSchema = z.object({
  quizId: z.string(),
  brand: BrandSchema,
  title: z.string(),
  description: z.string(),
  actions: z.array(z.string()).min(1),
  coverImage: z.string(),
  questions: z.array(QuestionSchema).min(1),
});

export const QuizMetaSchema = QuizSchema.omit({ questions: true });
