import { LoadingResult } from '@/src/widgets/loading-result';

export default async function LoadingResultPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <LoadingResult quizId={quizId} />;
}
