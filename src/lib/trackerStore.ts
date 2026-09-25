export interface TrackerTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // Employee Name
  assignedBy: string; // Employer Name
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedHours: number;
  date: string; // YYYY-MM-DD
  status: 'pending' | 'in_progress' | 'on_break' | 'completed';
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  actualDurationMins: number;
  notes?: string;
}

export interface BreakLog {
  id: string;
  employeeName: string;
  type: 'Lunch' | 'Tea' | 'Personal' | 'Other';
  startTime: string; // HH:mm
  endTime?: string; // HH:mm
  durationMins: number;
  date: string; // YYYY-MM-DD
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export const INITIAL_EMPLOYEES: EmployeeProfile[] = [
  { id: 'emp-1', name: 'Srinivasan S', role: 'Managing Director & Lead Architect', avatar: 'SS' },
  { id: 'emp-2', name: 'Sarah Chen', role: 'Senior AI Engineer', avatar: 'SC' },
  { id: 'emp-3', name: 'Alex Smith', role: 'Cybersecurity Analyst', avatar: 'AS' },
  { id: 'emp-4', name: 'Elena Rostova', role: 'Full Stack Developer', avatar: 'ER' },
];

export const INITIAL_TASKS: TrackerTask[] = [
  {
    id: 'task-101',
    title: 'AI Readiness & Governance Audit',
    description: 'Evaluate client data infrastructure and governance policy compliance.',
    assignedTo: 'Sarah Chen',
    assignedBy: 'Srinivasan S',
    category: 'AI Workflow Optimization',
    priority: 'high',
    estimatedHours: 4.5,
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    startTime: '09:15',
    endTime: '13:00',
    actualDurationMins: 225,
    notes: 'Audit completed. Data readiness score evaluated at 88%.',
  },
  {
    id: 'task-102',
    title: 'Suras Elevators Maintenance Engine Hardening',
    description: 'Implement automated 30-day AMC renewal notification pipeline in Kotlin.',
    assignedTo: 'Srinivasan S',
    assignedBy: 'Srinivasan S',
    category: 'Process Digitization',
    priority: 'urgent',
    estimatedHours: 3.0,
    date: new Date().toISOString().split('T')[0],
    status: 'in_progress',
    startTime: '14:00',
    actualDurationMins: 110,
    notes: 'Testing Coroutines Flow scheduler for AMC push alerts.',
  },
  {
    id: 'task-103',
    title: 'Zero-Trust WAF Security Audit',
    description: 'Perform web application firewall penetration testing and SSL certificate inspection.',
    assignedTo: 'Alex Smith',
    assignedBy: 'Srinivasan S',
    category: 'Digital Security',
    priority: 'medium',
    estimatedHours: 3.5,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    actualDurationMins: 0,
  },
  {
    id: 'task-104',
    title: 'Executive Telemetry Dashboard Optimization',
    description: 'Optimize real-time chart rendering and responsive layout bounds.',
    assignedTo: 'Elena Rostova',
    assignedBy: 'Srinivasan S',
    category: 'Process Digitization',
    priority: 'low',
    estimatedHours: 2.0,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    actualDurationMins: 0,
  },
];

export const INITIAL_BREAKS: BreakLog[] = [
  {
    id: 'break-201',
    employeeName: 'Sarah Chen',
    type: 'Lunch',
    startTime: '13:00',
    endTime: '13:45',
    durationMins: 45,
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'break-202',
    employeeName: 'Srinivasan S',
    type: 'Tea',
    startTime: '11:15',
    endTime: '11:30',
    durationMins: 15,
    date: new Date().toISOString().split('T')[0],
  },
];

const LOCAL_STORAGE_KEY_TASKS = 'synvora_tracker_tasks_v1';
const LOCAL_STORAGE_KEY_BREAKS = 'synvora_tracker_breaks_v1';

export function getStoredTasks(): TrackerTask[] {
  if (typeof window === 'undefined') return INITIAL_TASKS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_TASKS;
  }
}

export function saveStoredTasks(tasks: TrackerTask[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage', err);
  }
}

export function getStoredBreaks(): BreakLog[] {
  if (typeof window === 'undefined') return INITIAL_BREAKS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_BREAKS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY_BREAKS, JSON.stringify(INITIAL_BREAKS));
      return INITIAL_BREAKS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_BREAKS;
  }
}

export function saveStoredBreaks(breaks: BreakLog[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_BREAKS, JSON.stringify(breaks));
  } catch (err) {
    console.error('Failed to save breaks to localStorage', err);
  }
}
