import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABanner } from '@/components/sections/CTABanner';
import { LayoutDashboard, Smartphone, Users, RefreshCw, BarChart2, Layers, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Process Digitization | Synvora Technologies',
  description: 'Custom executive dashboards, tailored CRMs, internal enterprise applications, mobile workforce apps, and workflow digitization.',
};

export default function BusinessProcessDigitizationPage() {
  const capabilities = [
    {
      title: 'Real-Time Executive Dashboards',
      icon: <LayoutDashboard className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Centralized operational command centers with real-time telemetry, predictive analytics, and customizable KPI widgets.',
    },
    {
      title: 'Custom Enterprise CRM Systems',
      icon: <Users className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Bespoke customer relationship management platforms tailored around your exact sales, service, and account management lifecycles.',
    },
    {
      title: 'Internal Enterprise Applications',
      icon: <Layers className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Custom administrative tools, inventory portals, vendor portals, and automated approval workflow managers.',
    },
    {
      title: 'Mobile Workforce Applications',
      icon: <Smartphone className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Native and cross-platform mobile apps enabling field workers, engineers, and executives to access critical systems securely on the go.',
    },
    {
      title: 'End-to-End Workflow Digitization',
      icon: <RefreshCw className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Transformation of legacy paper processes, siloed email threads, and manual handoffs into synchronized cloud channels.',
    },
    {
      title: 'Automated Reporting & Telemetry',
      icon: <BarChart2 className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Scheduled PDF report generation, audit trail logging, regulatory compliance exports, and automated stakeholder notifications.',
    },
  ];

  return (
    <div className="pt-28 md:pt-36">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Practice Area 03"
            badgeVariant="blue"
            title="Business Process Digitization"
            subtitle="Modernize core business operations with custom CRMs, real-time executive dashboards, mobile applications, and automated reporting."
          />
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="emerald">Practical Solutions</Badge>
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Replace Operational Bottlenecks with Custom Software Engines
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Generic off-the-shelf software often forces your organization to adapt its unique business processes to rigid vendor templates. Synvora Technologies builds custom internal applications, CRMs, and executive dashboards designed specifically around your operational model.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                We empower your leadership team with full visibility and control across every department.
              </p>
            </div>

            <div className="lg:col-span-5">
              <Card borderAccent="blue" className="p-8 space-y-4 bg-slate-900 text-white">
                <h3 className="text-xl font-bold font-heading text-white">Digitization Benefits</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400" />
                    <span>Real-time Operational Telemetry</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400" />
                    <span>Bespoke CRM & Internal Portals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400" />
                    <span>Cross-platform iOS & Android Access</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <Card key={idx} hoverEffect={true} className="flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit mb-4">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-synvora-emerald-600 dark:text-synvora-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Custom Engine</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
