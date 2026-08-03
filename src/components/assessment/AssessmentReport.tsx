'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AssessmentAnswers } from './AssessmentWizard';
import {
  BrainCircuit,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  ArrowRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

interface AssessmentReportProps {
  answers: AssessmentAnswers;
  onReset: () => void;
}

export const AssessmentReport: React.FC<AssessmentReportProps> = ({ answers, onReset }) => {
  // Score Calculations out of 100
  const aiScore = Math.round(((answers.aiAdoption + answers.dataCentralization) / 10) * 100);
  const securityScore = Math.round(((answers.securityAuditFrequency + answers.backupStrategy) / 10) * 100);
  const digitScore = Math.round(((answers.processAutomation + answers.customSoftwareUse) / 10) * 100);

  const overallScore = Math.round((aiScore + securityScore + digitScore) / 3);

  let statusBadge = 'Developing';
  let statusColor = 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
  if (overallScore >= 75) {
    statusBadge = 'Advanced Enterprise';
    statusColor = 'text-synvora-emerald-600 bg-synvora-emerald-50 dark:bg-synvora-emerald-950/60 border-synvora-emerald-200 dark:border-synvora-emerald-800';
  } else if (overallScore >= 50) {
    statusBadge = 'Moderate Digital Health';
    statusColor = 'text-synvora-blue-700 bg-synvora-blue-50 dark:bg-synvora-blue-950/60 border-synvora-blue-200 dark:border-synvora-blue-800';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Report Header */}
      <Card className="p-8 md:p-10 shadow-card border-t-4 border-t-synvora-emerald-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <Badge variant="emerald" className="mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synvora Executive Diagnostic</span>
            </Badge>
            <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
              Digital Health Assessment Scorecard
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Organization: <strong className="text-slate-900 dark:text-white">{answers.industry}</strong> ({answers.companySize} employees)
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
              {overallScore}<span className="text-xl text-slate-400">/100</span>
            </div>
            <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${statusColor}`}>
              {statusBadge}
            </div>
          </div>
        </div>

        {/* Pillar Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* AI Pillar */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-synvora-blue-900 text-white">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{aiScore}%</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">AI & Data Readiness</h4>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-synvora-blue-600 h-full transition-all duration-500" style={{ width: `${aiScore}%` }} />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {aiScore < 50
                ? 'Opportunity to deploy RAG knowledge assistants and document AI.'
                : 'Strong AI foundation. Focus on multi-agent workflow automation.'}
            </p>
          </div>

          {/* Security Pillar */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-synvora-emerald-600 text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{securityScore}%</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Security & Risk Posture</h4>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-synvora-emerald-500 h-full transition-all duration-500" style={{ width: `${securityScore}%` }} />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {securityScore < 50
                ? 'High risk vector. Immediate zero-trust security audit recommended.'
                : 'Solid security posture. Prepare for ISO 27001 / SOC 2 certification.'}
            </p>
          </div>

          {/* Digitization Pillar */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-slate-800 text-slate-200">
                <LayoutDashboard className="w-5 h-5 text-synvora-blue-400" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{digitScore}%</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Process Digitization</h4>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-slate-800 dark:bg-slate-200 h-full transition-all duration-500" style={{ width: `${digitScore}%` }} />
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {digitScore < 50
                ? 'Manual handoffs present. Recommend custom CRMs & internal portals.'
                : 'High digitization level. Optimize real-time executive dashboard telemetry.'}
            </p>
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="mt-8 space-y-4 pt-6 border-t border-slate-200/80 dark:border-slate-800">
          <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-synvora-emerald-500" />
            <span>Recommended Strategic Roadmap</span>
          </h4>

          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="p-3.5 rounded-lg bg-synvora-blue-50/60 dark:bg-slate-800/40 border border-synvora-blue-100 dark:border-slate-700 flex items-start gap-3">
              <span className="font-bold text-synvora-blue-900 dark:text-synvora-blue-400">Phase 1:</span>
              <span>Deploy a targeted Security & Risk Audit to eliminate vulnerabilities before scaling AI tools.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-synvora-emerald-50/60 dark:bg-slate-800/40 border border-synvora-emerald-100 dark:border-slate-700 flex items-start gap-3">
              <span className="font-bold text-synvora-emerald-600 dark:text-synvora-emerald-400">Phase 2:</span>
              <span>Implement Document AI and Knowledge Assistants to centralize enterprise search.</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <span className="font-bold text-slate-900 dark:text-white">Phase 3:</span>
              <span>Unify administrative workflows with custom executive telemetry dashboards.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button onClick={onReset} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button href="/contact" variant="emerald" size="md" className="w-full sm:w-auto">
              <span>Discuss Report with Enterprise Team</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
