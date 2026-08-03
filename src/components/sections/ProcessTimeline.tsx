import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { PROCESS_STEPS } from '@/lib/constants';
import { Search, BarChart3, Rocket, RefreshCw, ArrowDown, CheckCircle2 } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const stepIcons = [
    <Search key="0" className="w-5 h-5" />,
    <BarChart3 key="1" className="w-5 h-5" />,
    <Rocket key="2" className="w-5 h-5" />,
    <RefreshCw key="3" className="w-5 h-5" />,
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Methodology"
          badgeVariant="emerald"
          title="Our Proven 4-Step Transformation Process"
          subtitle="From initial diagnostic assessment to continuous enterprise refinement—our process ensures zero operational risk and predictable results."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative">
          {PROCESS_STEPS.map((proc, idx) => (
            <div
              key={proc.step}
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between relative group hover:border-synvora-blue-500 dark:hover:border-synvora-blue-500 transition-all duration-300 shadow-soft"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-xl bg-synvora-blue-900 text-white dark:bg-synvora-blue-950 dark:text-synvora-blue-300 font-bold font-mono text-sm flex items-center justify-center shadow-card">
                    {proc.step}
                  </span>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-synvora-emerald-600 dark:text-synvora-emerald-400 border border-slate-200 dark:border-slate-700">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">
                  {proc.title}
                </h3>
                <p className="text-xs font-semibold text-synvora-blue-700 dark:text-synvora-blue-400 uppercase tracking-wider mb-3">
                  {proc.tagline}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {proc.desc}
                </p>
              </div>

              {/* Key Deliverables Bullet Points */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Deliverables:
                </p>
                <ul className="space-y-1.5">
                  {proc.details.map((item, dIdx) => (
                    <li key={dIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-synvora-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
