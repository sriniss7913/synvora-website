import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABanner } from '@/components/sections/CTABanner';
import { INDUSTRIES_DATA } from '@/lib/constants';
import {
  Activity,
  Compass,
  Factory,
  Zap,
  GraduationCap,
  Truck,
  ShoppingBag,
  Briefcase,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries We Serve | Synvora Technologies',
  description: 'Enterprise digital transformation for Healthcare, Engineering, Manufacturing, Renewable Energy, Education, Logistics, Retail, Professional Services, and SMEs.',
};

export default function IndustriesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Activity: <Activity className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />,
    Compass: <Compass className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    Factory: <Factory className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />,
    Zap: <Zap className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    GraduationCap: <GraduationCap className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />,
    Truck: <Truck className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    ShoppingBag: <ShoppingBag className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />,
    Briefcase: <Briefcase className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />,
  };

  const useCases: Record<string, string[]> = {
    healthcare: [
      'HIPAA-compliant document intelligence for patient records',
      'Zero-trust access control for clinical data systems',
      'Automated medical billing and insurance verification portals',
    ],
    engineering: [
      'CAD drawing metadata extraction and version management',
      'Real-time site inspection telemetry & mobile logging',
      'Project risk modeling and material procurement tracking',
    ],
    manufacturing: [
      'Predictive maintenance alerts based on IoT sensor data',
      'Supply chain bottleneck prediction with AI agents',
      'Custom ERP integration and inventory dashboards',
    ],
    'renewable-energy': [
      'Smart grid telemetry processing and outage prediction',
      'Environmental compliance reporting automation',
      'Clean energy yield analytics and asset management',
    ],
    education: [
      'Student record digitization and secure credential verification',
      'Adaptive learning analytics portals',
      'Automated administrative enrollment workflows',
    ],
    logistics: [
      'Dynamic fleet route optimization engines',
      'Automated bill-of-lading (BOL) document parsing',
      'Real-time consignment tracking dashboards',
    ],
    retail: [
      'Omnichannel inventory synchronization engines',
      'Predictive demand forecasting with AI models',
      'Custom customer loyalty and CRM platforms',
    ],
    'professional-services': [
      'RAG knowledge assistants for legal and accounting docs',
      'Automated time-tracking and billing portals',
      'Secure client document exchange environments',
    ],
    smes: [
      'Turnkey cloud process digitization roadmaps',
      'Affordable security audit & vulnerability scanning',
      'Custom CRM and workflow automation engines',
    ],
  };

  return (
    <div className="pt-28 md:pt-36">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Industry Vertical Solutions"
            badgeVariant="emerald"
            title="Tailored Transformation Across Global Sectors"
            subtitle="Every industry faces unique regulatory constraints and operational challenges. We engineer specialized solutions designed around your sector's exact standards."
          />
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES_DATA.map((ind) => (
              <Card key={ind.id} hoverEffect={true} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit mb-5">
                    {iconMap[ind.iconName]}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {ind.desc}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Enterprise Use Cases:
                    </p>
                    {useCases[ind.id]?.map((uc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-synvora-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-synvora-emerald-600 dark:text-synvora-emerald-400">
                    {ind.metrics}
                  </span>
                  <Badge variant="blue">Industry Ready</Badge>
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
