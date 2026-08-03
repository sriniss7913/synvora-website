import React from 'react';

interface SynvoraLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  showTagline?: boolean;
  className?: string;
}

export const SynvoraLogo: React.FC<SynvoraLogoProps> = ({
  variant = 'full',
  showTagline = false,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Synvora Logo Symbol */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Deep Blue Gradient */}
            <linearGradient id="synvoraBlueGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0B192C" />
              <stop offset="40%" stopColor="#0F4C81" />
              <stop offset="100%" stopColor="#0270C3" />
            </linearGradient>
            {/* Emerald Arc Gradient */}
            <linearGradient id="synvoraEmeraldGrad" x1="30" y1="10" x2="90" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F4C81" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Outer Orbital Ring */}
          <path
            d="M 50 8 A 42 42 0 1 1 8 50"
            stroke="url(#synvoraBlueGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 50 8 A 42 42 0 0 1 92 50 A 42 42 0 0 1 50 92"
            stroke="url(#synvoraEmeraldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Orbital Node Orb */}
          <circle cx="82" cy="22" r="5" fill="#10B981" />

          {/* Stylized 'S' Ribbon */}
          <path
            d="M 41 21 C 41 21, 60 25, 60 40 C 60 55, 34 50, 36 68 C 38 80, 56 80, 56 80 C 56 80, 34 82, 30 68 C 26 50, 52 52, 50 38 C 48 26, 41 21, 41 21 Z"
            fill="url(#synvoraBlueGrad)"
          />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-extrabold tracking-wider font-heading text-slate-900 dark:text-white leading-none">
              SYNVORA
            </span>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="h-[1.5px] w-4 bg-synvora-blue-600"></span>
            <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-slate-700 dark:text-slate-300 uppercase">
              TECHNOLOGIES
            </span>
            <span className="h-[1.5px] w-4 bg-synvora-emerald-500"></span>
          </div>

          {showTagline && (
            <p className="text-[9px] md:text-[10px] font-semibold tracking-wider text-slate-600 dark:text-slate-400 mt-1 uppercase">
              <span className="text-synvora-blue-600">HUMANS AND </span>
              <span className="text-synvora-emerald-600">TECHNOLOGY. </span>
              <span>STRONGER TOGETHER.</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
