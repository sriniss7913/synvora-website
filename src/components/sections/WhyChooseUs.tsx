import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { Users, Shield, Target, Building2, Handshake, Lightbulb } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-6 h-6 text-synvora-blue-600 dark:text-synvora-blue-400" />,
    Shield: <Shield className="w-6 h-6 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    Target: <Target className="w-6 h-6 text-synvora-blue-600 dark:text-synvora-blue-400" />,
    Building2: <Building2 className="w-6 h-6 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    Handshake: <Handshake className="w-6 h-6 text-synvora-blue-600 dark:text-synvora-blue-400" />,
    Lightbulb: <Lightbulb className="w-6 h-6 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="The Synvora Advantage"
          badgeVariant="blue"
          title="Why Leading Enterprises Choose Synvora"
          subtitle="Built on principles of trust, security, and human-centered design. We deliver long-term architectural stability over short-term trends."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {WHY_CHOOSE_US.map((pillar, idx) => (
            <Card key={idx} hoverEffect={true} className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-soft border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-5">
                  {iconMap[pillar.iconName]}
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-400">
                PILLAR 0{idx + 1}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
