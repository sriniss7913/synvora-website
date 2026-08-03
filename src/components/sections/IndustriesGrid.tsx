import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
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
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export const IndustriesGrid: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Activity: <Activity className="w-6 h-6" />,
    Compass: <Compass className="w-6 h-6" />,
    Factory: <Factory className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
    Truck: <Truck className="w-6 h-6" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Domain Expertise"
          badgeVariant="emerald"
          title="Industries We Transform"
          subtitle="Tailored digital strategies engineered to meet strict compliance mandates, operational scale, and competitive requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {INDUSTRIES_DATA.map((ind) => (
            <Card key={ind.id} className="flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-synvora-blue-900 dark:text-synvora-blue-400 flex items-center justify-center mb-5 group-hover:bg-synvora-blue-900 group-hover:text-white transition-colors duration-200">
                  {iconMap[ind.iconName]}
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                  {ind.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-synvora-emerald-600 dark:text-synvora-emerald-400">
                  {ind.metrics}
                </span>
                <Link
                  href="/industries"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-synvora-blue-900 dark:group-hover:text-synvora-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
