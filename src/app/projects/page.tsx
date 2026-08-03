'use client';

import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  CreditCard,
  Database,
  ExternalLink,
  Github,
  Layers,
  ArrowRight,
  Sparkles,
  Building2,
  Bell,
  UserCheck,
  FileSpreadsheet,
  Lock,
} from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-16 border-b border-slate-200/80 dark:border-slate-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            badgeText="Featured Delivered Case Study"
            badgeVariant="emerald"
            title="Projects & Client Success Stories"
            subtitle="Explore how Synvora Technologies delivers custom Android applications, AI engines, and enterprise solutions for real-world industry leaders."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* CASE STUDY: SURAS ELEVATORS */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-14 shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Subtle Glow Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-synvora-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-synvora-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-10">
            
            {/* Top Client Brand Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-lg border border-slate-700 flex-shrink-0">
                  <Image
                    src="/images/suras_elevators_logo.png"
                    alt="Suras Elevators Logo"
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="emerald" className="bg-synvora-emerald-950 text-synvora-emerald-300 border-synvora-emerald-800">
                      Engineering & Vertical Transportation
                    </Badge>
                    <Badge variant="blue" className="bg-synvora-blue-950 text-synvora-blue-300 border-synvora-blue-800">
                      Native Android App
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
                    Suras Elevators
                  </h2>
                  <p className="text-sm text-slate-300">
                    Enterprise Client & Service Maintenance Application
                  </p>
                </div>
              </div>

              {/* GitHub Link Button */}
              <a
                href="https://github.com/sriniss7913/SuraSElevators"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:border-synvora-blue-500 w-fit"
              >
                <Github className="w-4 h-4 text-synvora-emerald-400" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* Overview & Core Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold font-heading text-white">
                  Project Overview & Delivered Solution
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Synvora Technologies engineered and delivered a bespoke, native Android application for <strong>Suras Elevators</strong> to streamline elevator installation site tracking, customer relationship management, Annual Maintenance Contract (AMC) renewals, and structured payment installment tracking.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  By digitizing their entire field operations into a single Kotlin & Jetpack Compose application backed by Firebase Firestore, Suras Elevators eliminated manual paperwork, prevented missed service contract renewals, and gained real-time financial tracking across all client projects.
                </p>

                {/* Tech Stack Chips */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-synvora-blue-400 mb-3">
                    Architectural Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">Android Kotlin</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">Jetpack Compose</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">Kotlin Coroutines & Flow</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">Firebase Firestore</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">Material 3 Design</span>
                  </div>
                </div>
              </div>

              {/* Client Metrics & Impact Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-synvora-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Delivered Value & Operational Impact
                  </h4>
                  <div className="space-y-3 font-medium text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Contract Renewal Alerts</span>
                      <strong className="text-synvora-emerald-400">30 Days Proactive</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Payment Status Tracking</span>
                      <strong className="text-synvora-blue-400">Automated Installments</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Role Security</span>
                      <strong className="text-white">Admin & Employee Roles</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Cloud Data Backup</span>
                      <strong className="text-synvora-emerald-400">Firestore Sync + Export</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivered Features Grid */}
            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-xl font-bold font-heading text-white mb-6">
                Key Application Modules & Features Delivered
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Feature 1 */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-synvora-blue-600 transition-colors">
                  <div className="p-3 rounded-xl bg-synvora-blue-950 text-synvora-blue-400 w-fit">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Client & Site Directory</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Complete management of client records, site addresses, project scope descriptions, and installation timelines.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-synvora-emerald-600 transition-colors">
                  <div className="p-3 rounded-xl bg-synvora-emerald-950 text-synvora-emerald-400 w-fit">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">AMC Service Renewal Tracking</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automated tracking of annual service contract expiration dates with 30-day prior renewal alerts to prevent coverage lapses.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-synvora-blue-600 transition-colors">
                  <div className="p-3 rounded-xl bg-slate-800 text-white w-fit">
                    <CreditCard className="w-6 h-6 text-synvora-blue-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">Milestone Installment Engine</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Flexible payment installment tracking calculating paid balances, remaining amounts, and real-time status (PAID, PARTIAL, OVERDUE).
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-synvora-emerald-600 transition-colors">
                  <div className="p-3 rounded-xl bg-synvora-emerald-950 text-synvora-emerald-400 w-fit">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Multi-Role Access Security</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Role-based security enforcing distinct permissions between Admin supervisors and Field Employee technicians.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-synvora-blue-600 transition-colors">
                  <div className="p-3 rounded-xl bg-synvora-blue-950 text-synvora-blue-400 w-fit">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Cloud Sync & Data Export</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Real-time cloud database synchronization via Firebase Firestore with CSV/JSON export & import tools for administrative audits.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-synvora-emerald-600 transition-colors">
                  <div className="p-3 rounded-xl bg-slate-800 text-white w-fit">
                    <Smartphone className="w-6 h-6 text-synvora-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">Material 3 Modern UI</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Clean, high-performance Jetpack Compose interface tailored for rapid field input, touch target ergonomics, and offline resilience.
                  </p>
                </div>

              </div>
            </div>

            {/* CTA Banner */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
              <div>
                <h4 className="text-lg font-bold text-white">Have a Similar Mobile or Web Application Requirement?</h4>
                <p className="text-xs text-slate-400 mt-1">Our solution architects build secure, enterprise-grade applications tailored to your business operations.</p>
              </div>
              <Button href="/contact" variant="emerald" size="md" className="w-full md:w-auto">
                <span>Request Custom Scoping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
