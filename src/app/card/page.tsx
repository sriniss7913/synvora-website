'use client';

import React from 'react';
import { SynvoraLogo } from '@/components/ui/SynvoraLogo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SITE_CONFIG } from '@/lib/constants';
import { Printer, Download, Mail, Linkedin, MapPin, Phone } from 'lucide-react';

export default function CardPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-800">
        <div>
          <Badge variant="emerald" className="mb-1">Direct Asset Access</Badge>
          <h1 className="text-xl font-bold font-heading text-white">Executive Business Visiting Card</h1>
          <p className="text-xs text-slate-400">High-Resolution 3.5&quot; x 2&quot; Print & Digital View</p>
        </div>

        <Button onClick={handlePrint} variant="emerald" size="sm">
          <Printer className="w-4 h-4" />
          <span>Print Business Card</span>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 print:gap-12 print:max-w-none">
        
        {/* FRONT SIDE */}
        <div className="w-[420px] h-[240px] rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-synvora-blue-950 p-6 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between print:rounded-none print:shadow-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-synvora-blue-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <SynvoraLogo variant="compact" />
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-synvora-emerald-400 font-bold border border-slate-700">
              EXECUTIVE
            </span>
          </div>

          <div className="relative z-10 space-y-1">
            <h3 className="text-xl font-bold font-heading text-white">Srinivasan S</h3>
            <p className="text-xs font-semibold text-synvora-emerald-400 uppercase tracking-wider">
              Founder & Managing Director
            </p>
            <p className="text-[11px] font-semibold text-slate-300">Synvora Technologies</p>
          </div>

          <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Humans & Technology. Stronger Together.</span>
            <span className="text-synvora-blue-400 font-mono font-bold">synvoratech.in</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="w-[420px] h-[240px] rounded-2xl bg-slate-900 p-6 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between print:rounded-none print:shadow-none">
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-synvora-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <SynvoraLogo variant="compact" />
          </div>

          <div className="relative z-10 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <Mail className="w-3.5 h-3.5 text-synvora-emerald-400 flex-shrink-0" />
              <span>{SITE_CONFIG.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-synvora-emerald-400 flex-shrink-0" />
              <span>{SITE_CONFIG.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Linkedin className="w-3.5 h-3.5 text-synvora-blue-400 flex-shrink-0" />
              <span>linkedin.com/company/synvora-technologies</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-synvora-emerald-400 flex-shrink-0" />
              <span className="font-semibold text-white">{SITE_CONFIG.address}</span>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
            <span>Intelligence • Security • Transformation</span>
            <span className="text-synvora-emerald-400 font-bold">www.synvoratech.in</span>
          </div>
        </div>

      </div>
    </div>
  );
}
