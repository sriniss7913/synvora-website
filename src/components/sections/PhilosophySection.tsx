import React from 'react';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { SITE_CONFIG } from '@/lib/constants';
import { HeartHandshake, Eye, Target, Award, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Our Core Philosophy"
          badgeVariant="emerald"
          title="Humans & Technology. Stronger Together."
          subtitle="At Synvora Technologies, we believe technology should not replace human capability, but elevate it. We build intelligent, secure systems that empower people to achieve extraordinary outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Vision Card */}
          <Card borderAccent="blue" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-synvora-blue-50 dark:bg-slate-800 text-synvora-blue-900 dark:text-synvora-blue-400 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                Our Vision
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.vision}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-synvora-blue-700 dark:text-synvora-blue-400 uppercase tracking-wider">
              Global Trust & Intelligence
            </div>
          </Card>

          {/* Mission Card */}
          <Card borderAccent="emerald" className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-synvora-emerald-50 dark:bg-slate-800 text-synvora-emerald-600 dark:text-synvora-emerald-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                Our Mission
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.mission}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-synvora-emerald-600 dark:text-synvora-emerald-400 uppercase tracking-wider">
              Future-Ready Transformation
            </div>
          </Card>

          {/* Philosophy Card */}
          <Card borderAccent="none" className="bg-slate-900 text-white dark:bg-slate-900 border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-synvora-blue-900 text-synvora-blue-300 flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-3">
                Human-Centered Synergy
              </h3>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                We combine artificial intelligence with deep domain human oversight. Every workflow we design prioritizes safety, intuitive usability, and ethical standards.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-semibold text-synvora-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Ethical Enterprise AI</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
