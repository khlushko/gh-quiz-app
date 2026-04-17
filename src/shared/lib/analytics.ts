declare global {
  interface Window {
    dataLayer: object[];
  }
}

interface QuizViewPayload {
  quizId: string;
  questionId: string;
  questionType: string;
}

interface QuizAnswerPayload {
  quizId: string;
  questionId: string;
  value: unknown;
}

interface QuizSubmitPayload {
  quizId: string;
  answers: Record<string, unknown>;
}

type EventPayloadMap = {
  quiz_view: QuizViewPayload;
  quiz_answer: QuizAnswerPayload;
  quiz_submit: QuizSubmitPayload;
};

export type AnalyticsEventName = keyof EventPayloadMap;

export function pushEvent<T extends AnalyticsEventName>(
  event: T,
  payload: EventPayloadMap[T]
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
