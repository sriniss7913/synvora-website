import React from 'react';
import Link from 'next/link';
import { SynvoraLogo } from '../ui/SynvoraLogo';
import { SITE_CONFIG } from '@/lib/constants';
import { Shield, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-2 space-y-5">
            <SynvoraLogo variant="full" showTagline={true} />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-4">
              Synvora Technologies delivers enterprise-grade AI automation, zero-trust cybersecurity, and digital process transformation for forward-thinking global organizations.
            </p>

            {/* Security Compliance Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-synvora-emerald-400" /> SOC 2 Type II Aligned
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-synvora-blue-400" /> ISO 27001 Certified
              </span>
            </div>
          </div>

          {/* Solutions / Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/ai-workflow-optimization" className="hover:text-white transition-colors">
                  AI Workflow Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/digital-security-risk-assessment" className="hover:text-white transition-colors">
                  Digital Security & Risk Audit
                </Link>
              </li>
              <li>
                <Link href="/services/business-process-digitization" className="hover:text-white transition-colors">
                  Business Process Digitization
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="hover:text-synvora-emerald-400 transition-colors flex items-center gap-1">
                  <span>Digital Health Assessment</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-synvora-emerald-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Core */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Synvora
                </Link>
              </li>
              <li>
                <Link href="/about#vision-mission" className="hover:text-white transition-colors">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link href="/about#philosophy" className="hover:text-white transition-colors">
                  Human-Centered Philosophy
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise Assessment & Directives */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Diagnostic & Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/assessment" className="hover:text-synvora-emerald-400 transition-colors">
                  Digital Health Scorecard
                </Link>
              </li>
              <li>
                <Link href="/services/ai-workflow-optimization" className="hover:text-white transition-colors">
                  AI Readiness Audit
                </Link>
              </li>
              <li>
                <Link href="/services/digital-security-risk-assessment" className="hover:text-white transition-colors">
                  Zero-Trust Defense
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Executive Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Synvora Technologies Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Governance</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Statement</span>
            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-synvora-blue-400">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
