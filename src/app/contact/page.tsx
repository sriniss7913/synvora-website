'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SITE_CONFIG } from '@/lib/constants';
import { Mail, MapPin, Phone, Linkedin, CheckCircle2, ShieldCheck, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    serviceInterest: 'AI Workflow Optimization',
    projectScope: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-16 border-b border-slate-200/80 dark:border-slate-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            badgeText="Executive Inquiry"
            badgeVariant="blue"
            title="Connect with Synvora Technologies"
            subtitle="Schedule a confidential strategic session with our enterprise solution architects or submit a formal business inquiry."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Information & Locations */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Badge variant="emerald">Direct Channels</Badge>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Global Practice Advisory
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our senior solution architects are available for NDA-bound executive briefings, architectural reviews, and technical scoping.
              </p>
            </div>

            <div className="space-y-4">
              <Card hoverEffect={false} className="p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-synvora-blue-50 dark:bg-slate-800 text-synvora-blue-900 dark:text-synvora-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Email</h4>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-base font-bold text-slate-900 dark:text-white hover:text-synvora-blue-600">
                    {SITE_CONFIG.email}
                  </a>
                  <p className="text-xs text-slate-500">24-hour response SLA</p>
                </div>
              </Card>

              <Card hoverEffect={false} className="p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-synvora-emerald-50 dark:bg-slate-800 text-synvora-emerald-600 dark:text-synvora-emerald-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise Network</h4>
                  <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-slate-900 dark:text-white hover:text-synvora-emerald-600">
                    Synvora Technologies on LinkedIn
                  </a>
                  <p className="text-xs text-slate-500">Corporate announcements & insights</p>
                </div>
              </Card>

              <Card hoverEffect={false} className="p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Headquarters</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {SITE_CONFIG.address}
                  </p>
                  <p className="text-xs text-slate-500">Regional offices: Americas & EMEA</p>
                </div>
              </Card>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-synvora-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Privacy Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All communications and project documents submitted to Synvora Technologies are protected under strict confidentiality protocols. Mutual NDAs available upon request.
              </p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 md:p-10 shadow-card border-t-4 border-t-synvora-blue-900">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-synvora-emerald-100 dark:bg-synvora-emerald-950 text-synvora-emerald-600 dark:text-synvora-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    Inquiry Successfully Received
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. A Synvora solution architect will review your project requirements and respond within 24 business hours.
                  </p>
                  <div className="pt-4">
                    <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                      Submit Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                      Business Inquiry Form
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Fill out the details below to initiate a strategic consultation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g., Sarah Jenkins"
                        className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-synvora-blue-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Corporate Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="s.jenkins@enterprise.com"
                        className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-synvora-blue-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Company Inc."
                        className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-synvora-blue-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Primary Practice Area *
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-synvora-blue-600 outline-none"
                      >
                        <option value="AI Workflow Optimization">AI Workflow Optimization</option>
                        <option value="Digital Security & Risk Assessment">Digital Security & Risk Assessment</option>
                        <option value="Business Process Digitization">Business Process Digitization</option>
                        <option value="Full Digital Transformation">Full Digital Transformation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Requirements & Scope
                    </label>
                    <textarea
                      rows={4}
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      placeholder="Describe your current infrastructure, pain points, timeline, or security goals..."
                      className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-synvora-blue-600 outline-none"
                    />
                  </div>

                  <Button type="submit" variant="emerald" size="lg" className="w-full">
                    <span>Submit Business Inquiry</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
