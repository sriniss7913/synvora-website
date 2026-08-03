import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTABanner } from '@/components/sections/CTABanner';
import { BrainCircuit, Bot, FileText, Search, Cpu, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Workflow Optimization | Synvora Technologies',
  description: 'Enterprise AI agents, Document AI, RAG knowledge assistants, AI readiness assessments, and ethical AI strategy governance.',
};

export default function AIWorkflowOptimizationPage() {
  const capabilities = [
    {
      title: 'AI Readiness Assessment',
      icon: <BrainCircuit className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Thorough evaluation of your enterprise data architecture, security posture, and team readiness for seamless AI adoption.',
    },
    {
      title: 'AI Opportunity Assessment',
      icon: <Zap className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Identification of high-impact bottleneck processes where intelligent automation yields maximum quantifiable ROI.',
    },
    {
      title: 'AI Chatbots & Conversational Interfaces',
      icon: <Bot className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Secure, contextual conversational agents for enterprise customer support, internal IT helpdesks, and HR support.',
    },
    {
      title: 'Autonomous AI Agents',
      icon: <Cpu className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Multi-agent system orchestration capable of multi-step task execution, data cross-referencing, and workflow scheduling.',
    },
    {
      title: 'Knowledge Assistants (RAG)',
      icon: <Search className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Retrieval-Augmented Generation assistants that allow team members to query internal policy manuals, contracts, and technical docs in natural language.',
    },
    {
      title: 'Workflow Automation',
      icon: <Zap className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Elimination of manual data entry, approval delays, and cross-platform sync friction through automated cloud pipelines.',
    },
    {
      title: 'Document AI',
      icon: <FileText className="w-6 h-6 text-synvora-blue-600" />,
      desc: 'Automated extraction of structured tables, entities, and data points from unstructured PDFs, invoices, and legal filings.',
    },
    {
      title: 'AI Strategy & Governance',
      icon: <BrainCircuit className="w-6 h-6 text-synvora-emerald-600" />,
      desc: 'Establishment of corporate AI policies, data privacy boundaries, bias mitigation, and compliance frameworks.',
    },
  ];

  return (
    <div className="pt-28 md:pt-36">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Practice Area 01"
            badgeVariant="blue"
            title="AI Workflow Optimization"
            subtitle="Supercharge enterprise productivity with ethical, human-centered artificial intelligence, autonomous agents, and document intelligence."
          />
        </div>
      </section>

      {/* Overview & Value Prop */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="emerald">Human-Centered AI</Badge>
              <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
                Intelligent Automation Built for Enterprise Stability
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Synvora Technologies designs AI solutions that integrate cleanly with your existing enterprise software stack—ensuring zero disruption, strict data governance, and complete data privacy.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Our AI Workflow Optimization practice transforms complex manual workflows into automated engines while keeping human judgment at the center of critical decisions.
              </p>
            </div>

            <div className="lg:col-span-5">
              <Card borderAccent="blue" className="p-8 space-y-4 bg-slate-900 text-white">
                <h3 className="text-xl font-bold font-heading text-white">Key Impact Metrics</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span>Document Processing Speed</span>
                    <strong className="text-synvora-emerald-400">10x Faster</strong>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span>Manual Data Entry Reduction</span>
                    <strong className="text-synvora-blue-400">85% Lower</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Data Privacy Guarantee</span>
                    <strong className="text-synvora-emerald-400">100% Private Models</strong>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-synvora-emerald-600 dark:text-synvora-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enterprise Ready</span>
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
