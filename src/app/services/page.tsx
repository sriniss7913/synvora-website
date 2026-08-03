import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SERVICES_DATA } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CTABanner } from '@/components/sections/CTABanner';
import { BrainCircuit, ShieldCheck, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Services & Practice Areas | Synvora Technologies',
  description: 'Discover Synvora practice areas: AI Workflow Optimization, Digital Security & Risk Assessment, and Business Process Digitization.',
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    'ai-workflow-optimization': <BrainCircuit className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />,
    'digital-security-risk-assessment': <ShieldCheck className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    'business-process-digitization': <LayoutDashboard className="w-8 h-8 text-slate-800 dark:text-slate-200" />,
  };

  return (
    <div className="pt-28 md:pt-36">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            badgeText="Enterprise Practice Areas"
            badgeVariant="blue"
            title="Comprehensive Technology & Security Services"
            subtitle="Engineered to elevate enterprise intelligence, guarantee zero-trust compliance, and modernize core operations."
          />
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES_DATA.map((service, idx) => (
            <Card key={service.id} borderAccent={idx === 0 ? 'blue' : idx === 1 ? 'emerald' : 'none'} className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 inline-block">
                    {iconMap[service.id]}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold font-heading text-slate-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    {service.tagline}
                  </p>
                  <div className="pt-2">
                    <Button href={`/services/${service.slug}`} variant={idx === 1 ? 'emerald' : 'primary'}>
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.items.map((item, iIdx) => (
                    <div key={iIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-synvora-emerald-500 flex-shrink-0" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
