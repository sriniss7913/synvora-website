import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTABanner } from '@/components/sections/CTABanner';
import { SITE_CONFIG } from '@/lib/constants';
import { Eye, Target, HeartHandshake, ShieldCheck, Award, Sparkles, Building2, Users, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Synvora Technologies | Company Story, Vision & Leadership',
  description: 'Learn about Synvora Technologies: our human-centered philosophy, enterprise vision, mission, and commitment to digital trust.',
};

export default function AboutPage() {
  const leadership = [
    {
      role: 'Chief Executive Officer',
      name: 'Enterprise Executive Board',
      bio: 'Decades of global technology leadership across enterprise software, strategic risk, and digital transformation.',
    },
    {
      role: 'Head of AI Architecture',
      name: 'Dr. Autonomous Systems',
      bio: 'Leading research in Retrieval-Augmented Generation (RAG), multi-agent systems, and responsible governance.',
    },
    {
      role: 'Chief Information Security Officer',
      name: 'Zero-Trust Operations',
      bio: 'Overseeing global compliance, vulnerability assessments, and ISO 27001 / SOC 2 Type II risk posture.',
    },
  ];

  const milestones = [
    { year: 'Phase 1', title: 'Foundation & Core Architecture', desc: 'Established zero-trust enterprise frameworks and human-centered AI design standards.' },
    { year: 'Phase 2', title: 'Enterprise Practice Expansion', desc: 'Launched dedicated practice areas across AI Workflow Optimization, Security Auditing, and Process Digitization.' },
    { year: 'Phase 3', title: 'Global Multi-Industry Delivery', desc: 'Expanded transformation solutions across Healthcare, Engineering, Manufacturing, and Energy sectors.' },
    { year: 'Future Vision', title: 'Autonomous Platform Ecosystem', desc: 'Deploying unified SaaS assessment tools, client telemetry portals, and automated threat monitoring.' },
  ];

  return (
    <div className="pt-28 md:pt-36">
      {/* Hero Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="About Synvora Technologies"
            badgeVariant="blue"
            title="Humans and Technology. Stronger Together."
            subtitle="We were founded on a singular conviction: technology achieves its greatest potential when it amplifies human decision-making, protects business assets, and operates with absolute integrity."
          />
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="emerald">The Company Story</Badge>
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Engineered for Enterprise Trust & Global Scale
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                In an era dominated by superficial tech hype, Synvora Technologies stands out as an enterprise-grade digital partner. We engineer systems designed for stability, compliance, and multi-year longevity.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                Whether deploying autonomous AI workflow agents or conducting zero-trust cybersecurity audits, our teams ensure that every line of code serves a clear, measurable business objective.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-2xl font-bold text-synvora-blue-900 dark:text-synvora-blue-400">100%</p>
                  <p className="text-xs text-slate-500">Human-in-the-Loop AI Standards</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-2xl font-bold text-synvora-emerald-600 dark:text-synvora-emerald-400">Zero-Trust</p>
                  <p className="text-xs text-slate-500">Architecture Security Guarantee</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card borderAccent="blue" className="p-8 space-y-6 bg-slate-900 text-white dark:bg-slate-900">
                <h3 className="text-xl font-bold font-heading text-white">Our Strategic Directives</h3>
                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Deliver AI systems that are transparent, explainable, and ethically governed.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Eliminate operational friction through seamless process digitization.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-synvora-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Maintain zero compromise on data privacy, ISO 27001, and SOC 2 standards.</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card borderAccent="blue" className="p-8">
              <Eye className="w-10 h-10 text-synvora-blue-900 dark:text-synvora-blue-400 mb-4" />
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                Vision Statement
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.vision}
              </p>
            </Card>

            <Card borderAccent="emerald" className="p-8">
              <Target className="w-10 h-10 text-synvora-emerald-600 dark:text-synvora-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                Mission Statement
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.mission}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Placeholders */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Governance & Talent"
            badgeVariant="blue"
            title="Enterprise Leadership & Advisory"
            subtitle="Guided by seasoned technology architects, cybersecurity veterans, and strategic operational advisors."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {leadership.map((member, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-4 flex items-center justify-center text-slate-400 font-bold font-mono text-xl">
                  SYN
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-synvora-blue-700 dark:text-synvora-blue-400 uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / Future Roadmap */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Growth Vector"
            badgeVariant="emerald"
            title="Strategic Milestones & Horizon"
            subtitle="Our structured roadmap for long-term technological excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {milestones.map((ms, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-synvora-emerald-100 dark:bg-synvora-emerald-950 text-synvora-emerald-800 dark:text-synvora-emerald-300">
                  {ms.year}
                </span>
                <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white mt-4 mb-2">
                  {ms.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ms.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
