import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderAccent?: 'none' | 'blue' | 'emerald';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  borderAccent = 'none',
}) => {
  const accentStyles = {
    none: '',
    blue: 'border-t-4 border-t-synvora-blue-600',
    emerald: 'border-t-4 border-t-synvora-emerald-500',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft transition-all duration-300 relative overflow-hidden',
        hoverEffect && 'hover:shadow-card hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700',
        accentStyles[borderAccent],
        className
      )}
    >
      {children}
    </div>
  );
};
