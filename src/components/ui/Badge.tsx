import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'blue' | 'emerald' | 'slate' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  children,
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-synvora-blue-50 text-synvora-blue-700 dark:bg-synvora-blue-950/60 dark:text-synvora-blue-300 border border-synvora-blue-200 dark:border-synvora-blue-800/60',
    emerald: 'bg-synvora-emerald-50 text-synvora-emerald-700 dark:bg-synvora-emerald-950/60 dark:text-synvora-emerald-300 border border-synvora-emerald-200 dark:border-synvora-emerald-800/60',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full tracking-wide uppercase font-sans',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
