import { Progress as BaseProgress } from '@base-ui/react/progress';
import { cn } from '@/src/shared/lib/cn';

interface ProgressProps {
  value: number; // 0-100
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <BaseProgress.Root
      value={value}
      className={cn('h-1 w-full overflow-hidden rounded-full bg-gray-200', className)}
    >
      <BaseProgress.Track className="h-full w-full">
        <BaseProgress.Indicator
          className="h-full rounded-full bg-[var(--brand-primary)] transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
