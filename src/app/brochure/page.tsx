'use client';

import React from 'react';
import { SynvoraLogo } from '@/components/ui/SynvoraLogo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SITE_CONFIG, SERVICES_DATA, INDUSTRIES_DATA, WHY_CHOOSE_US, PROCESS_STEPS } from '@/lib/constants';
import {
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
  BrainCircuit,
  LayoutDashboard,
  Eye,
  Target,
  Users,
  Building2,
  Mail,
  Linkedin,
  MapPin,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';

export default function BrochurePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-slate-100 dark:bg-slate-950 min-h-screen">
      {/* Top Floating Control Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
        <div>
          <Badge variant="emerald" className="mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Digital Corporate Brochure</span>
          </Badge>
          <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            Synvora Technologies — Enterprise Capabilities & Profile
          </h1>
          <p className="text-xs text-slate-500">
            12-Page Executive Document • Click below to print or save as PDF
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button onClick={handlePrint} variant="emerald" size="md" className="w-full sm:w-auto">
            <Download className="w-4 h-4" />
            <span>Download / Save as PDF</span>
          </Button>
          <Button onClick={handlePrint} variant="outline" size="md" className="w-full sm:w-auto">
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </Button>
        </div>
      </div>

      {/* 12-Page Brochure Container */}
      <div className="max-w-5xl mx-auto space-y-12 print:space-y-0 print:max-w-none">
        
        {/* PAGE 1: COVER PAGE */}
        <section className="bg-slate-900 text-white rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px] border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-synvora-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-synvora-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <SynvoraLogo variant="full" />
            <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-synvora-emerald-400 font-bold border border-slate-700">
              OFFICIAL BROCHURE 2026
            </span>
          </div>

          <div className="relative z-10 space-y-6 my-auto py-12">
            <Badge variant="blue" className="bg-synvora-blue-950/80 text-synvora-blue-300 border-synvora-blue-800">
              <Sparkles className="w-3.5 h-3.5" /> Enterprise Digital Transformation
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-tight">
              Intelligence.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synvora-blue-300 to-synvora-blue-400">
                Security.
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synvora-emerald-400 to-synvora-emerald-300">
                Transformation.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Capabilities, Solutions, and Architectural Philosophy of Synvora Technologies Inc.
            </p>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/90 border border-slate-700 text-sm font-semibold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-synvora-emerald-400 animate-pulse" />
                <span>Humans and Technology. Stronger Together.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              <p className="font-bold text-white">Synvora Technologies Inc.</p>
              <p>Global Practice Advisory & Solutions</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-synvora-emerald-400">{SITE_CONFIG.email}</p>
              <p>www.synvoratech.in</p>
            </div>
          </div>
        </section>

        {/* PAGE 2: EXECUTIVE SUMMARY & TOC */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 02 • EXECUTIVE SUMMARY</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Executive Welcome & Table of Contents
              </h2>

              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Synvora Technologies delivers enterprise-grade AI automation, zero-trust cybersecurity, and custom process digitization for forward-thinking organizations worldwide. This brochure outlines our practice capabilities, security guarantees, industry solutions, and engagement methodology.
              </p>

              {/* Table of Contents Grid */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Document Structure:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>01. Cover & Corporate Identity</span>
                    <span className="text-synvora-blue-600">P. 01</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>02. Executive Summary & TOC</span>
                    <span className="text-synvora-blue-600">P. 02</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>03. Company Philosophy & Story</span>
                    <span className="text-synvora-blue-600">P. 03</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>04. Vision, Mission & Governance</span>
                    <span className="text-synvora-blue-600">P. 04</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>05. Practice 01: AI Workflow</span>
                    <span className="text-synvora-blue-600">P. 05</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>06. Practice 02: Digital Security</span>
                    <span className="text-synvora-blue-600">P. 06</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>07. Practice 03: Process Digitization</span>
                    <span className="text-synvora-blue-600">P. 07</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>08. Industry Verticals (Part 1)</span>
                    <span className="text-synvora-blue-600">P. 08</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>09. Industry Verticals (Part 2)</span>
                    <span className="text-synvora-blue-600">P. 09</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>10. Why Synvora: 6 Pillars</span>
                    <span className="text-synvora-blue-600">P. 10</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>11. 4-Step Transformation Process</span>
                    <span className="text-synvora-blue-600">P. 11</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span>12. Contact & Advisory Channels</span>
                    <span className="text-synvora-blue-600">P. 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Confidential & Proprietary</span>
          </div>
        </section>

        {/* PAGE 3: ABOUT & PHILOSOPHY */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 03 • PHILOSOPHY</span>
            </div>

            <div className="space-y-6">
              <Badge variant="emerald">Humans and Technology. Stronger Together.</Badge>
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Human-Centered Technology Philosophy
              </h2>

              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                At Synvora Technologies, we shun the hype of standalone, unguided automation. We believe artificial intelligence and digital systems produce their highest value when designed around human decision-makers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Users className="w-8 h-8 text-synvora-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Human Ingenuity Elevated</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our AI models and workflow engines eliminate repetitive administrative friction, freeing teams to focus on strategy, creative problem solving, and customer relationships.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <ShieldCheck className="w-8 h-8 text-synvora-emerald-600 mb-3" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Uncompromising Trust</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Every system we build incorporates zero-trust access controls, continuous auditing, and transparent data boundaries from line one of code.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 03</span>
          </div>
        </section>

        {/* PAGE 4: VISION & MISSION */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 04 • VISION & MISSION</span>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-synvora-blue-50/60 dark:bg-slate-800/60 border border-synvora-blue-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Our Vision</h3>
                </div>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {SITE_CONFIG.vision}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-synvora-emerald-50/60 dark:bg-slate-800/60 border border-synvora-emerald-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {SITE_CONFIG.mission}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 04</span>
          </div>
        </section>

        {/* PAGE 5: PRACTICE 01 - AI WORKFLOW */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 05 • PRACTICE AREA 01</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-8 h-8 text-synvora-blue-900 dark:text-synvora-blue-400" />
                <div>
                  <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                    AI Workflow Optimization
                  </h2>
                  <p className="text-xs text-slate-500">Autonomous intelligence, document AI, & knowledge assistants.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {SERVICES_DATA[0].items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 05</span>
          </div>
        </section>

        {/* PAGE 6: PRACTICE 02 - SECURITY */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 06 • PRACTICE AREA 02</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-synvora-emerald-600 dark:text-synvora-emerald-400" />
                <div>
                  <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                    Digital Security & Risk Assessment
                  </h2>
                  <p className="text-xs text-slate-500">Zero-trust architecture, penetration testing, & compliance readiness.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {SERVICES_DATA[1].items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 06</span>
          </div>
        </section>

        {/* PAGE 7: PRACTICE 03 - DIGITIZATION */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 07 • PRACTICE AREA 03</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-slate-800 dark:text-slate-200" />
                <div>
                  <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                    Business Process Digitization
                  </h2>
                  <p className="text-xs text-slate-500">Executive dashboards, custom CRMs, internal apps, & mobile portals.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {SERVICES_DATA[2].items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 07</span>
          </div>
        </section>

        {/* PAGE 8: INDUSTRIES PART 1 */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 08 • INDUSTRIES (PART 1)</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Industry Transformation Verticals
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {INDUSTRIES_DATA.slice(0, 4).map((ind, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{ind.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{ind.desc}</p>
                    <span className="text-[11px] font-bold text-synvora-emerald-600 dark:text-synvora-emerald-400">{ind.metrics}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 08</span>
          </div>
        </section>

        {/* PAGE 9: INDUSTRIES PART 2 */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 09 • INDUSTRIES (PART 2)</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Industry Transformation Verticals (Cont.)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {INDUSTRIES_DATA.slice(4).map((ind, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{ind.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{ind.desc}</p>
                    <span className="text-[11px] font-bold text-synvora-emerald-600 dark:text-synvora-emerald-400">{ind.metrics}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 09</span>
          </div>
        </section>

        {/* PAGE 10: WHY SYN VORA */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 10 • THE SYN VORA ADVANTAGE</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Why Leading Enterprises Partner with Synvora
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {WHY_CHOOSE_US.map((pillar, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-mono font-bold text-slate-400">PILLAR 0{idx + 1}</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-1">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 10</span>
          </div>
        </section>

        {/* PAGE 11: METHODOLOGY */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-14 shadow-card border border-slate-200 dark:border-slate-800 print:rounded-none print:shadow-none print:h-screen print:page-break-after-always flex flex-col justify-between min-h-[750px]">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
              <SynvoraLogo variant="compact" />
              <span className="text-xs font-mono text-slate-400">PAGE 11 • METHODOLOGY</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Our 4-Step Transformation Process
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {PROCESS_STEPS.map((proc) => (
                  <div key={proc.step} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-synvora-blue-900 text-white">{proc.step}</span>
                      <span className="text-xs font-semibold text-synvora-emerald-600 dark:text-synvora-emerald-400">{proc.tagline}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{proc.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{proc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Synvora Technologies Corporate Brochure</span>
            <span>Page 11</span>
          </div>
        </section>

        {/* PAGE 12: CONTACT & BACK COVER */}
        <section className="bg-slate-900 text-white rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden print:rounded-none print:shadow-none print:h-screen flex flex-col justify-between min-h-[750px] border border-slate-800">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <SynvoraLogo variant="full" />
            <span className="text-xs font-mono text-synvora-emerald-400">PAGE 12 • ENGAGEMENT & BACK COVER</span>
          </div>

          <div className="space-y-8 my-auto py-8">
            <div>
              <Badge variant="emerald" className="bg-synvora-emerald-950 text-synvora-emerald-300 border-synvora-emerald-800 mb-3">
                Strategic Consultation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
                Initiate Your Digital Transformation
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mt-2 leading-relaxed">
                Connect directly with our senior solution architects for a confidential architectural review and customized project roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-synvora-blue-400">
                  <Mail className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white">Official Email</h4>
                </div>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-base font-bold text-white hover:text-synvora-emerald-400 block">
                  {SITE_CONFIG.email}
                </a>
                <p className="text-xs text-slate-400">24-hour executive response SLA</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-synvora-emerald-400">
                  <Linkedin className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white">LinkedIn Network</h4>
                </div>
                <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-synvora-emerald-400 block">
                  linkedin.com/company/synvora-technologies
                </a>
                <p className="text-xs text-slate-400">Corporate announcements & whitepapers</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Synvora Technologies Inc. All rights reserved.</p>
            <p className="font-semibold text-white">Intelligence. Security. Transformation.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
