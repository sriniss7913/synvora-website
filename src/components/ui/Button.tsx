import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'emerald' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none';

  const variantStyles = {
    primary: 'bg-synvora-blue-900 hover:bg-synvora-blue-950 text-white shadow-card hover:shadow-glow-blue border border-synvora-blue-800/40 focus:ring-synvora-blue-600',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-slate-400',
    emerald: 'bg-synvora-emerald-600 hover:bg-synvora-emerald-700 text-white shadow-card hover:shadow-glow-emerald border border-synvora-emerald-500/40 focus:ring-synvora-emerald-500',
    outline: 'bg-transparent border border-slate-300 hover:border-synvora-blue-600 dark:border-slate-700 dark:hover:border-synvora-blue-400 text-slate-800 dark:text-slate-200 focus:ring-synvora-blue-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-400',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs md:text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm md:text-base gap-2',
    lg: 'px-7 py-3.5 text-base md:text-lg gap-2.5 font-semibold',
  };

  const combinedClasses = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
