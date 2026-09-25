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

const LOCAL_STORAGE_KEY_EMPLOYEES = 'synvora_tracker_employees_v2';
const LOCAL_STORAGE_KEY_TASKS = 'synvora_tracker_tasks_v2';
const LOCAL_STORAGE_KEY_BREAKS = 'synvora_tracker_breaks_v2';

export function getStoredEmployees(): EmployeeProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_EMPLOYEES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function saveStoredEmployees(employees: EmployeeProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  } catch (err) {
    console.error('Failed to save employees to localStorage', err);
  }
}

export function getStoredTasks(): TrackerTask[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
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
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_BREAKS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
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
