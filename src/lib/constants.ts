export const SITE_CONFIG = {
  name: 'Synvora Technologies',
  tagline: 'Intelligence. Security. Transformation.',
  philosophy: 'Humans and Technology. Stronger Together.',
  vision: 'To become a globally trusted technology company that transforms businesses through intelligence, innovation, and digital trust.',
  mission: 'We help businesses become smarter, more secure, and future-ready by delivering AI-powered automation, cybersecurity, digital transformation, and innovative software solutions.',
  email: 'contact@synvoratech.in',
  phone: '+1 (800) 555-SYN VORA',
  address: 'Synvora Technologies, Bengaluru, KA',
  linkedin: 'https://linkedin.com/company/synvora-technologies',
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'AI Workflow Optimization', href: '/services/ai-workflow-optimization', desc: 'Enterprise AI agents, document AI, & intelligent automation' },
      { name: 'Digital Security & Risk Assessment', href: '/services/digital-security-risk-assessment', desc: 'Vulnerability audits, compliance readiness & threat prevention' },
      { name: 'Business Process Digitization', href: '/services/business-process-digitization', desc: 'Custom CRMs, executive dashboards, & mobile workflow apps' },
    ],
  },
  { name: 'Industries', href: '/industries' },
  { name: 'Projects', href: '/projects' },
  { name: 'Brochure', href: '/brochure', badge: 'PDF' },
  { name: 'Assessment', href: '/assessment', badge: 'Interactive' },
  { name: 'Contact', href: '/contact' },
];

export const SERVICES_DATA = [
  {
    id: 'ai-workflow-optimization',
    title: 'AI Workflow Optimization',
    slug: 'ai-workflow-optimization',
    tagline: 'Supercharge enterprise productivity with autonomous intelligence.',
    iconName: 'BrainCircuit',
    items: [
      { title: 'AI Readiness Assessment', desc: 'Evaluate organizational maturity, infrastructure capability, and data readiness for seamless AI adoption.' },
      { title: 'AI Opportunity Assessment', desc: 'Identify high-impact automation use cases to maximize operational ROI.' },
      { title: 'AI Chatbots & Agents', desc: 'Deploy contextual, enterprise-grade conversational AI and multi-agent workflows.' },
      { title: 'Knowledge Assistants', desc: 'Unify corporate knowledge bases with RAG (Retrieval-Augmented Generation) search.' },
      { title: 'Workflow Automation', desc: 'Eliminate repetitive manual bottlenecks with intelligent orchestration.' },
      { title: 'Document AI', desc: 'Extract structured insights from unstructured PDFs, contracts, and invoices.' },
      { title: 'AI Strategy & Governance', desc: 'Establish responsible AI guidelines, risk management, and compliance frameworks.' },
    ],
  },
  {
    id: 'digital-security-risk-assessment',
    title: 'Digital Security & Risk Assessment',
    slug: 'digital-security-risk-assessment',
    tagline: 'Fortify digital assets through proactive zero-trust defense.',
    iconName: 'ShieldCheck',
    items: [
      { title: 'Security Audit', desc: 'Comprehensive technical and procedural audit of infrastructure, APIs, and access controls.' },
      { title: 'Vulnerability Assessment', desc: 'Continuous threat identification, code scanning, and penetration testing.' },
      { title: 'Website & App Security', desc: 'Web Application Firewall (WAF) integration, DDoS protection, and SSL hardening.' },
      { title: 'Backup & Recovery Assessment', desc: 'Resilience testing, automated backup validation, and disaster recovery strategy.' },
      { title: 'Enterprise Risk Assessment', desc: 'Quantify operational risk vectors and establish mitigation protocols.' },
      { title: 'Compliance Readiness', desc: 'Align operations with ISO 27001, SOC 2 Type II, GDPR, and HIPAA mandates.' },
    ],
  },
  {
    id: 'business-process-digitization',
    title: 'Business Process Digitization',
    slug: 'business-process-digitization',
    tagline: 'Transform legacy operations into modern digital engines.',
    iconName: 'LayoutDashboard',
    items: [
      { title: 'Executive Dashboards', desc: 'Real-time telemetry, operational analytics, and predictive data visualization.' },
      { title: 'Custom CRM Solutions', desc: 'Tailored customer relationship platforms designed around unique business workflows.' },
      { title: 'Internal Enterprise Applications', desc: 'Bespoke administrative tools, inventory management, and portal systems.' },
      { title: 'Mobile Applications', desc: 'Secure iOS and Android mobile apps for remote workforce enablement.' },
      { title: 'Workflow Digitization', desc: 'Transition paper-based and siloed procedures to seamless cloud channels.' },
      { title: 'Automated Reporting', desc: 'Scheduled executive reports, audit logs, and compliance generation.' },
    ],
  },
];

export const INDUSTRIES_DATA = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    iconName: 'Activity',
    desc: 'HIPAA-aligned digital workflows, medical document AI parsing, and predictive clinical asset management.',
    metrics: '99.9% Data Security Rating',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    iconName: 'Compass',
    desc: 'Automated CAD document processing, project milestone tracking, and IoT data aggregation.',
    metrics: '45% Faster Project Cycles',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    iconName: 'Factory',
    desc: 'Supply chain intelligence, predictive equipment maintenance alerts, and ERP integration.',
    metrics: '30% Downtime Reduction',
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy',
    iconName: 'Zap',
    desc: 'Smart grid reporting, sensor telemetry ingestion, and clean energy production forecasting.',
    metrics: 'Real-time Telemetry',
  },
  {
    id: 'education',
    name: 'Education',
    iconName: 'GraduationCap',
    desc: 'Student analytics portals, secure digital credential verification, and administrative automation.',
    metrics: 'Zero-trust Access Control',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    iconName: 'Truck',
    desc: 'Dynamic route optimization, automated customs documentation, and inventory tracking.',
    metrics: '25% Operational Savings',
  },
  {
    id: 'retail',
    name: 'Retail',
    iconName: 'ShoppingBag',
    desc: 'Omnichannel inventory synchronization, customer insight engines, and secure payment processing.',
    metrics: 'Instant Data Sync',
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    iconName: 'Briefcase',
    desc: 'Automated billing, document management, enterprise knowledge assistants, and client portals.',
    metrics: '3.5x ROI Achieved',
  },
  {
    id: 'smes',
    name: 'SMEs & Growing Enterprises',
    iconName: 'TrendingUp',
    desc: 'Scalable cloud digitization, cost-effective security audits, and streamlined CRM systems.',
    metrics: 'Turnkey Implementation',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Human-Centered AI',
    desc: 'We build technology that augments human ingenuity rather than replacing it—prioritizing clarity, usability, and ethics.',
    iconName: 'Users',
  },
  {
    title: 'Security by Design',
    desc: 'Cybersecurity and compliance are baked into every architecture from line one of code, preserving enterprise trust.',
    iconName: 'Shield',
  },
  {
    title: 'Practical Solutions',
    desc: 'We shun hype and focus strictly on delivering tangible, quantifiable business value and workflow efficiency.',
    iconName: 'Target',
  },
  {
    title: 'Enterprise Thinking',
    desc: 'Our architecture standard is built to scale reliably across global operations, high concurrency, and strict SLAs.',
    iconName: 'Building2',
  },
  {
    title: 'Long-term Partnership',
    desc: 'We operate as an extension of your leadership team, guiding your digital strategy through every growth phase.',
    iconName: 'Handshake',
  },
  {
    title: 'Innovation with Purpose',
    desc: 'We evaluate cutting-edge tools through a practical enterprise lens to solve real-world operational challenges.',
    iconName: 'Lightbulb',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Assess',
    tagline: 'Deep Diagnostic Evaluation',
    desc: 'We examine your current technological infrastructure, workflow bottlenecks, security posture, and business objectives to establish an accurate baseline.',
    details: ['Architecture Review', 'Data & AI Readiness', 'Security Scan', 'Stakeholder Alignment'],
  },
  {
    step: '02',
    title: 'Analyze',
    tagline: 'Strategic Blueprinting',
    desc: 'Our enterprise architects translate diagnostic findings into prioritized transformation roadmaps, ROI projections, and security frameworks.',
    details: ['Risk Vector Mapping', 'ROI Quantification', 'Solution Engineering', 'Compliance Roadmap'],
  },
  {
    step: '03',
    title: 'Implement',
    tagline: 'Agile & Secure Execution',
    desc: 'We deploy robust AI agents, digitized workflows, and zero-trust security controls with zero downtime for existing operations.',
    details: ['Modular Deployment', 'API Integration', 'Data Security Enclosure', 'Team Onboarding'],
  },
  {
    step: '04',
    title: 'Improve',
    tagline: 'Continuous Optimization',
    desc: 'We continuously monitor system performance, threat landscapes, and user adoption metrics to refine and scale your digital capabilities.',
    details: ['Telemetry Monitoring', 'Model Tuning', 'Threat Auditing', 'Quarterly Growth Reviews'],
  },
];
