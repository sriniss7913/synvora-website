import React from 'react';
import { Shield, Cpu, Lock, CheckCircle2, TrendingUp } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    { label: 'System Reliability SLA', value: '99.99%', sub: 'High-availability infrastructure' },
    { label: 'Security & Compliance', value: 'Zero-Trust', sub: 'ISO 27001 & SOC 2 aligned' },
    { label: 'Workflow Efficiency', value: '3.5x - 5x', sub: 'Measurable enterprise ROI' },
    { label: 'Deployment Speed', value: '< 30 Days', sub: 'Turnkey integration roadmap' },
  ];

  return (
    <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className={`space-y-1 ${idx !== 0 ? 'pt-4 md:pt-0 md:pl-8' : ''}`}>
              <p className="text-3xl lg:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-synvora-blue-300">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
