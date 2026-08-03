'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { AssessmentReport } from './AssessmentReport';
import { BrainCircuit, ShieldCheck, LayoutDashboard, ArrowRight, ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react';

export interface AssessmentAnswers {
  companySize: string;
  industry: string;
  aiAdoption: number;
  dataCentralization: number;
  securityAuditFrequency: number;
  backupStrategy: number;
  processAutomation: number;
  customSoftwareUse: number;
}

export const AssessmentWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    companySize: '50-250',
    industry: 'Engineering',
    aiAdoption: 2,
    dataCentralization: 3,
    securityAuditFrequency: 2,
    backupStrategy: 3,
    processAutomation: 2,
    customSoftwareUse: 3,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetAssessment = () => {
    setStep(1);
    setCompleted(false);
  };

  if (completed) {
    return <AssessmentReport answers={answers} onReset={resetAssessment} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span className="uppercase tracking-wider">
            {step === 1 && 'Organization Profile'}
            {step === 2 && 'AI & Data Readiness'}
            {step === 3 && 'Security & Risk Defense'}
            {step === 4 && 'Process Digitization'}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-synvora-blue-900 via-synvora-blue-600 to-synvora-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Card className="p-6 md:p-10 shadow-card">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Organization Profile
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Tell us about your business scale and primary operational sector.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Organization Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['1-49', '50-250', '250-1000', '1000+'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setAnswers({ ...answers, companySize: size })}
                      className={`p-3 rounded-lg text-sm font-semibold border transition-all ${
                        answers.companySize === size
                          ? 'bg-synvora-blue-900 text-white border-synvora-blue-800 shadow-soft'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {size} employees
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Primary Industry
                </label>
                <select
                  value={answers.industry}
                  onChange={(e) => setAnswers({ ...answers, industry: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-synvora-blue-600 outline-none"
                >
                  <option value="Healthcare">Healthcare & Life Sciences</option>
                  <option value="Engineering">Engineering & Construction</option>
                  <option value="Manufacturing">Manufacturing & Supply Chain</option>
                  <option value="Renewable Energy">Renewable Energy & Utilities</option>
                  <option value="Education">Education & Academic</option>
                  <option value="Logistics">Logistics & Transportation</option>
                  <option value="Retail">Retail & E-commerce</option>
                  <option value="Professional Services">Professional Services & Consulting</option>
                  <option value="SMEs">SMEs & Growth Enterprise</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-synvora-blue-50 dark:bg-slate-800 text-synvora-blue-900 dark:text-synvora-blue-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  AI & Data Readiness
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Assess how effectively your organization leverages AI tools and structured data.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Current AI Tool Adoption
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-synvora-blue-100 dark:bg-synvora-blue-950 text-synvora-blue-800 dark:text-synvora-blue-300">
                    Level {answers.aiAdoption} of 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.aiAdoption}
                  onChange={(e) => setAnswers({ ...answers, aiAdoption: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-synvora-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1: No AI tools used</span>
                  <span>3: Ad-hoc ChatGPT/assistants</span>
                  <span>5: Fully integrated enterprise AI agents</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Enterprise Data Centralization
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-synvora-blue-100 dark:bg-synvora-blue-950 text-synvora-blue-800 dark:text-synvora-blue-300">
                    Level {answers.dataCentralization} of 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.dataCentralization}
                  onChange={(e) => setAnswers({ ...answers, dataCentralization: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-synvora-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1: Scattered spreadsheets</span>
                  <span>3: Cloud storage & basic DB</span>
                  <span>5: Unified Data Lakehouse / RAG ready</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-synvora-emerald-50 dark:bg-slate-800 text-synvora-emerald-600 dark:text-synvora-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Security & Risk Defense
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Evaluate cybersecurity audits, disaster resilience, and compliance readiness.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Security Audit & Penetration Testing Frequency
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-synvora-emerald-100 dark:bg-synvora-emerald-950 text-synvora-emerald-800 dark:text-synvora-emerald-300">
                    Level {answers.securityAuditFrequency} of 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.securityAuditFrequency}
                  onChange={(e) => setAnswers({ ...answers, securityAuditFrequency: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-synvora-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1: Never audited</span>
                  <span>3: Annual basic scan</span>
                  <span>5: Continuous SOC2 / ISO 27001 auditing</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Backup & Disaster Recovery Strategy
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-synvora-emerald-100 dark:bg-synvora-emerald-950 text-synvora-emerald-800 dark:text-synvora-emerald-300">
                    Level {answers.backupStrategy} of 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.backupStrategy}
                  onChange={(e) => setAnswers({ ...answers, backupStrategy: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-synvora-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1: Manual / irregular backups</span>
                  <span>3: Automated daily backups</span>
                  <span>5: Multi-region failover & tested RTO/RPO</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                <LayoutDashboard className="w-6 h-6 text-synvora-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Process Digitization & Custom Software
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Measure internal workflow automation, CRM customization, and portal capabilities.
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Operational Workflow Digitization
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    Level {answers.processAutomation} of 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.processAutomation}
                  onChange={(e) => setAnswers({ ...answers, processAutomation: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-synvora-blue-900"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1: Paper / manual entry dominant</span>
                  <span>3: Mixed SaaS & manual handoffs</span>
                  <span>5: Fully digitized cloud pipelines</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    Custom Apps & Real-time Dashboards
                  </label>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    Level {answers.customSoftwareUse} of 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.customSoftwareUse}
                  onChange={(e) => setAnswers({ ...answers, customSoftwareUse: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-synvora-blue-900"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1: Generic off-the-shelf spreadsheets</span>
                  <span>3: Standard CRM & basic metrics</span>
                  <span>5: Custom executive portals & telemetry</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <Button
            onClick={handlePrev}
            disabled={step === 1}
            variant="ghost"
            size="md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button onClick={handleNext} variant="emerald" size="md">
            <span>{step === totalSteps ? 'Generate Executive Report' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
