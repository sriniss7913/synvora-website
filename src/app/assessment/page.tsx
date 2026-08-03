import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AssessmentWizard } from '@/components/assessment/AssessmentWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Health Assessment Tool | Synvora Technologies',
  description: 'Evaluate your organization’s AI readiness, security risk posture, and process digitization score with instant executive recommendations.',
};

export default function AssessmentPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-16 border-b border-slate-200/80 dark:border-slate-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            badgeText="Interactive Enterprise Tool"
            badgeVariant="emerald"
            title="Digital Health Assessment"
            subtitle="Obtain an instant executive scorecard evaluating your AI maturity, zero-trust security posture, and business process digitization level."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AssessmentWizard />
      </div>
    </div>
  );
}
