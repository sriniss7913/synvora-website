'use client';

import React from 'react';
import Link from 'next/link';
import { SynvoraLogo } from '@/components/ui/SynvoraLogo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileText, CreditCard, Sparkles, ArrowRight, ShieldCheck, Download, Share2 } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="emerald" className="mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> Direct Collateral Hub
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white">
            Synvora Corporate Collateral & Documents
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Direct access to official enterprise brochures, digital flyers, posters, and executive business card templates.
          </p>
        </div>

        {/* Collateral Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Asset 1: 12-Page Brochure */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-synvora-blue-600 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-synvora-blue-950 text-synvora-blue-400 w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <Badge variant="blue">12-Page PDF Document</Badge>
              <h3 className="text-xl font-bold text-white">Corporate Capabilities Brochure</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprehensive 12-page executive profile covering practice areas, zero-trust frameworks, methodology, & client verticals.
              </p>
            </div>
            <Button href="/brochure" variant="blue" size="md" className="w-full">
              <span>View / Export Brochure</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Asset 2: Single-Page Poster */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-synvora-emerald-600 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-synvora-emerald-950 text-synvora-emerald-400 w-fit">
                <Sparkles className="w-6 h-6" />
              </div>
              <Badge variant="emerald">Single-Page WhatsApp Flyer</Badge>
              <h3 className="text-xl font-bold text-white">Digital Corporate Poster</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Single-page summary flyer formatted for WhatsApp sharing, digital distribution, and quick client overviews.
              </p>
            </div>
            <Button href="/poster" variant="emerald" size="md" className="w-full">
              <span>View / Share Poster</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Asset 3: Visiting Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-600 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-800 text-slate-200 w-fit">
                <CreditCard className="w-6 h-6 text-synvora-blue-400" />
              </div>
              <Badge variant="outline" className="border-slate-700 text-slate-300">Print Template (3.5&quot; x 2&quot;)</Badge>
              <h3 className="text-xl font-bold text-white">Executive Business Card</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-resolution 300 DPI business card template with front and back executive layouts.
              </p>
            </div>
            <Button href="/card" variant="outline" size="md" className="w-full border-slate-700 text-white">
              <span>View / Print Card</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
