'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { SERVICES_DATA } from '@/lib/constants';
import { BrainCircuit, ShieldCheck, LayoutDashboard, Check, ArrowRight } from 'lucide-react';

export const ServicesOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);

  const iconMap: Record<string, React.ReactNode> = {
    'ai-workflow-optimization': <BrainCircuit className="w-6 h-6" />,
    'digital-security-risk-assessment': <ShieldCheck className="w-6 h-6" />,
    'business-process-digitization': <LayoutDashboard className="w-6 h-6" />,
  };

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/50 relative border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Our Core Solutions"
          badgeVariant="blue"
          title="Enterprise Practice Areas"
          subtitle="We deliver end-to-end digital capabilities designed for high scalability, compliance, and zero-downtime integration."
        />

        {/* Practice Area Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          {SERVICES_DATA.map((service) => {
            const isSelected = service.id === activeTab;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 border ${
                  isSelected
                    ? 'bg-synvora-blue-900 text-white border-synvora-blue-800 shadow-card'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={isSelected ? 'text-synvora-emerald-400' : 'text-slate-500 dark:text-slate-400'}>
                  {iconMap[service.id]}
                </span>
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Display */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 lg:p-12 shadow-card border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex p-3 rounded-xl bg-synvora-blue-50 dark:bg-slate-800 text-synvora-blue-900 dark:text-synvora-blue-400">
              {iconMap[activeService.id]}
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold font-heading text-slate-900 dark:text-white">
              {activeService.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {activeService.tagline}
            </p>

            <div className="pt-4">
              <Button href={`/services/${activeService.slug}`} variant="emerald">
                <span>Detailed Practice Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeService.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 hover:border-synvora-blue-300 dark:hover:border-synvora-blue-600 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-synvora-emerald-500/20 text-synvora-emerald-600 dark:text-synvora-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
