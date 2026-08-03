'use client';

import React from 'react';
import { SynvoraLogo } from '@/components/ui/SynvoraLogo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SITE_CONFIG } from '@/lib/constants';
import {
  Printer,
  Download,
  Phone,
  Mail,
  Linkedin,
  MapPin,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Share2,
  MessageCircle,
} from 'lucide-react';

export default function PosterPage() {
  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=919094394114&text=Hello%20Synvora%20Technologies,%20I%20saw%20your%20digital%20poster%20and%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-slate-950 text-slate-100 min-h-screen">
      {/* Control Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-800">
        <div>
          <Badge variant="emerald" className="mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Corporate Poster</span>
          </Badge>
          <h1 className="text-xl font-bold font-heading text-white">
            Synvora Technologies — Promotional Flyer & Poster
          </h1>
          <p className="text-xs text-slate-400">
            Formatted for WhatsApp Sharing, Digital Distribution & Printing
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </a>
          <Button onClick={handlePrint} variant="emerald" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4" />
            <span>Save / Export PDF</span>
          </Button>
        </div>
      </div>

      {/* SINGLE PAGE POSTER (A4 / FLYER PROPORTIONS) */}
      <div className="max-w-4xl mx-auto print:max-w-none">
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-synvora-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800 space-y-8 print:rounded-none print:shadow-none print:p-8">
          
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-synvora-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-synvora-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Header Brand Banner */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 relative z-10">
            <SynvoraLogo variant="full" />
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900/90 text-synvora-emerald-400 font-bold border border-slate-700/80">
              OFFICIAL CAPABILITIES POSTER
            </span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-4 text-center py-4 relative z-10">
            <Badge variant="blue" className="mx-auto bg-synvora-blue-950 text-synvora-blue-300 border-synvora-blue-800">
              <Sparkles className="w-3.5 h-3.5" /> Enterprise Digital Transformation
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight text-white">
              Intelligence.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synvora-blue-400 to-synvora-blue-200">
                Security.
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synvora-emerald-400 to-synvora-emerald-300">
                Transformation.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              We empower forward-thinking organizations with enterprise AI workflow automation, zero-trust cybersecurity, and custom business digitization.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-white shadow-soft">
              <span className="w-2 h-2 rounded-full bg-synvora-emerald-400 animate-pulse" />
              <span>Humans and Technology. Stronger Together.</span>
            </div>
          </div>

          {/* Core 3 Practice Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-synvora-blue-950 text-synvora-blue-400 w-fit">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">AI Workflow Optimization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Autonomous AI agents, document AI parsing, RAG knowledge assistants, & workflow automation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-synvora-emerald-950 text-synvora-emerald-400 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Digital Security & Risk</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero-trust audits, vulnerability scans, WAF security, & ISO 27001 / SOC 2 Type II alignment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-800 text-white w-fit">
                <LayoutDashboard className="w-6 h-6 text-synvora-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white">Process Digitization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Real-time executive dashboards, custom enterprise CRMs, & native iOS / Android mobile apps.
              </p>
            </div>
          </div>

          {/* Featured Delivered Work Snapshot */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-synvora-emerald-400 uppercase tracking-wider">
                FEATURED DELIVERED PROJECT
              </span>
              <span className="text-[11px] font-mono text-slate-400">Android Application</span>
            </div>
            <h4 className="text-lg font-bold text-white">Suras Elevators — Maintenance & Client Application</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Delivered custom native Android application with 30-day AMC renewal notifications, milestone payment tracking, and real-time client site directory.
            </p>
          </div>

          {/* Contact & CTA Footer Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative z-10 space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold font-heading text-white">Connect with Synvora Technologies</h3>
              <p className="text-xs text-slate-400">Schedule a strategic consultation or start an instant inquiry on WhatsApp.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
              
              {/* Phone & WhatsApp Direct */}
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-white flex flex-col justify-center gap-1 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Phone & WhatsApp</span>
                </div>
                <span className="font-bold text-sm text-white">{SITE_CONFIG.phone}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Tap to chat on WhatsApp →</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white flex flex-col justify-center gap-1 hover:border-synvora-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2 text-synvora-blue-400 font-bold">
                  <Mail className="w-4 h-4" />
                  <span>Official Email</span>
                </div>
                <span className="font-bold text-sm text-white">{SITE_CONFIG.email}</span>
                <span className="text-[10px] text-slate-400">24-hour response SLA</span>
              </a>

              {/* Address */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white flex flex-col justify-center gap-1">
                <div className="flex items-center gap-2 text-synvora-emerald-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <span className="font-bold text-xs text-white">Bengaluru, KA</span>
                <span className="text-[10px] text-slate-400">India Operations</span>
              </div>

              {/* Website */}
              <a
                href="https://www.synvoratech.in"
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white flex flex-col justify-center gap-1 hover:border-synvora-emerald-500 transition-colors"
              >
                <div className="flex items-center gap-2 text-synvora-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Official Website</span>
                </div>
                <span className="font-bold text-xs text-white">www.synvoratech.in</span>
                <span className="text-[10px] text-slate-400">Explore practice areas</span>
              </a>

            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex justify-between relative z-10">
            <span>© {new Date().getFullYear()} Synvora Technologies Inc.</span>
            <span>Humans and Technology. Stronger Together.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
