import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CTABanner } from '@/components/sections/CTABanner';
import { ShieldCheck, Lock, AlertTriangle, Database, CheckCircle2, FileCheck, ShieldAlert } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Security & Risk Assessment | Synvora Technologies',
  description: 'Proactive zero-trust cybersecurity audits, vulnerability testing, ISO 27001 / SOC 2 compliance readiness, and backup resilience.',
};

export default function DigitalSecurityRiskAssessmentPage() {
  const capabilities = [
    {
      title: 'Comprehensive Security Audit',
      icon: <ShieldCheck className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Rigorous technical and procedural review of enterprise infrastructure, API gateways, identity management, and cloud configurations.',
    },
    {
      title: 'Vulnerability & Penetration Testing',
      icon: <ShieldAlert className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Continuous threat identification, static/dynamic application security testing (SAST/DAST), and simulated exploit scenarios.',
    },
    {
      title: 'Website & Web Application Security',
      icon: <Lock className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Web Application Firewall (WAF) deployment, DDoS mitigation, SSL/TLS hardening, and cross-site scripting (XSS) defense.',
    },
    {
      title: 'Backup & Disaster Recovery Assessment',
      icon: <Database className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Resilience testing of automated backup pipelines, multi-region failover procedures, and Recovery Time Objective (RTO) validation.',
    },
    {
      title: 'Enterprise Risk Assessment',
      icon: <AlertTriangle className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Quantification of operational, technical, and third-party vendor risk vectors with actionable mitigation roadmaps.',
    },
    {
      title: 'Compliance Readiness (ISO 27001 & SOC 2)',
      icon: <FileCheck className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Preparation of policies, evidence collection, and security controls for ISO 27001, SOC 2 Type II, HIPAA, and GDPR accreditation.',
    },
  ];

  return (
    <div className="pt-28 md:pt-36">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Practice Area 02"
            badgeVariant="emerald"
            title="Digital Security & Risk Assessment"
            subtitle="Protect enterprise digital assets through zero-trust defense architectures, continuous vulnerability scanning, and compliance readiness."
          />
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="blue">Security by Design</Badge>
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Proactive Threat Defense and Regulatory Alignment
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                In today&apos;s interconnected threat landscape, reactive cybersecurity is insufficient. Synvora Technologies delivers continuous risk assessment and zero-trust security frameworks built directly into your software and cloud infrastructure.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                We guide your leadership team through complete compliance readiness for SOC 2 Type II, ISO 27001, GDPR, and industry-specific regulations.
              </p>
            </div>

            <div className="lg:col-span-5">
              <Card borderAccent="emerald" className="p-8 space-y-4 bg-slate-900 text-white">
                <h3 className="text-xl font-bold font-heading text-white">Security Assurances</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400" />
                    <span>Zero-Trust Architecture Standard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400" />
                    <span>ISO 27001 & SOC 2 Evidence Readiness</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400" />
                    <span>Multi-region Encrypted Backups</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <Card key={idx} hoverEffect={true} className="flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit mb-4">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-synvora-blue-600 dark:text-synvora-blue-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audited Standard</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
