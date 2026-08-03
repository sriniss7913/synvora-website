import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CTABanner: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-synvora-blue-950 via-slate-900 to-synvora-blue-950 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-synvora-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-synvora-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-synvora-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Digital Readiness</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
            Ready to Build a Smarter, More Secure Enterprise?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Partner with Synvora Technologies to accelerate AI workflow optimization, solidify zero-trust cybersecurity, and digitize core operations with complete peace of mind.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/assessment" variant="emerald" size="lg" className="w-full sm:w-auto">
              <span>Run Digital Health Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto border-slate-600 hover:border-white text-white">
              <span>Schedule Executive Session</span>
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-synvora-emerald-400" /> Confidential & NDA Compliant
            </span>
            <span>•</span>
            <span>No Obligation Initial Consultation</span>
            <span>•</span>
            <span>Tailored Enterprise Blueprint</span>
          </div>
        </div>
      </div>
    </section>
  );
};
