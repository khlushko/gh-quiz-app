import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/src/shared/lib/cn';

type Variant = 'primary' | 'ghost' | 'outline' | 'option';

interface ButtonProps extends ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-accent,var(--brand-primary))] active:opacity-90',
  ghost:
    'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold bg-transparent text-[var(--brand-primary)] hover:bg-black/5',
  outline:
    'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10',
  option:
    'flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-left text-sm font-medium text-gray-800 hover:border-gray-300',
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        'cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        variant !== 'option' && fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
}
