'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ShieldCheck, BrainCircuit, Sparkles, Server, Cpu, Database, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-synvora-blue-500/10 dark:bg-synvora-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-synvora-emerald-500/10 dark:bg-synvora-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <Badge variant="blue" className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-synvora-blue-600 dark:text-synvora-blue-400" />
              <span>Enterprise Intelligence & Digital Trust</span>
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Intelligence.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synvora-blue-900 via-synvora-blue-700 to-synvora-blue-600 dark:from-synvora-blue-400 dark:to-synvora-blue-200">
                Security.
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-synvora-emerald-600 to-synvora-emerald-500">
                Transformation.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              We help businesses become smarter, more secure, and future-ready by delivering AI-powered automation, zero-trust cybersecurity, and enterprise software solutions.
            </p>

            {/* Philosophy Pill */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-synvora-emerald-500 animate-pulse" />
                <span>Humans and Technology. Stronger Together.</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button href="/assessment" variant="emerald" size="lg" className="w-full sm:w-auto">
                <span>Run Digital Health Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/services" variant="primary" size="lg" className="w-full sm:w-auto">
                <span>Explore Solutions</span>
              </Button>
            </div>

            {/* Sub-trust indicators */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 text-synvora-emerald-500 flex-shrink-0" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 text-synvora-blue-600 flex-shrink-0" />
                <span>Enterprise AI Agents</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 text-synvora-emerald-500 flex-shrink-0" />
                <span>SOC 2 Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Hero Architecture Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-card border border-slate-200/90 dark:border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">SYN-ARCH-ENGINE-v1.0</span>
              </div>

              {/* Interactive Visual Blueprint Card */}
              <div className="mt-6 space-y-4">
                {/* AI Processing Node */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-synvora-blue-900 text-white">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">AI Automation Engine</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Autonomous workflow orchestration</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-synvora-emerald-100 dark:bg-synvora-emerald-950 text-synvora-emerald-700 dark:text-synvora-emerald-300 text-[10px] font-bold uppercase">
                    Active
                  </span>
                </div>

                {/* Security Enclosure Node */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-synvora-emerald-600 text-white">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Zero-Trust Security Barrier</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">End-to-end encrypted telemetry</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-synvora-blue-100 dark:bg-synvora-blue-950 text-synvora-blue-700 dark:text-synvora-blue-300 text-[10px] font-bold uppercase">
                    Protected
                  </span>
                </div>

                {/* Cloud Data Fabric Node */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200">
                      <Server className="w-5 h-5 text-synvora-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Enterprise Data Fabric</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Custom CRMs & Executive Dashboards</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold">
                    99.99% SLA
                  </span>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>System Health: <strong className="text-synvora-emerald-600 dark:text-synvora-emerald-400">Optimal</strong></span>
                <span>Response: <strong>14ms</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
