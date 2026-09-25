import { isFirebaseConfigured, saveFirestoreDoc, fetchFirestoreCollection } from './firebase';

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

// ─── EMPLOYEES ───────────────────────────────────────────────────────────────

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

export async function fetchCloudEmployees(): Promise<EmployeeProfile[]> {
  const local = getStoredEmployees();
  if (!isFirebaseConfigured) return local;

  const cloud = await fetchFirestoreCollection<EmployeeProfile>('employees');
  if (cloud.length > 0) {
    saveStoredEmployeesLocally(cloud);
    return cloud;
  }
  return local;
}

function saveStoredEmployeesLocally(employees: EmployeeProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  } catch (err) {}
}

export function saveStoredEmployees(employees: EmployeeProfile[]): void {
  saveStoredEmployeesLocally(employees);
  if (isFirebaseConfigured) {
    employees.forEach((emp) => {
      saveFirestoreDoc('employees', emp.id, emp);
    });
  }
}

// ─── TASKS ───────────────────────────────────────────────────────────────────

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

export async function fetchCloudTasks(): Promise<TrackerTask[]> {
  const local = getStoredTasks();
  if (!isFirebaseConfigured) return local;

  const cloud = await fetchFirestoreCollection<TrackerTask>('tasks');
  if (cloud.length > 0) {
    saveStoredTasksLocally(cloud);
    return cloud;
  }
  return local;
}

function saveStoredTasksLocally(tasks: TrackerTask[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(tasks));
  } catch (err) {}
}

export function saveStoredTasks(tasks: TrackerTask[]): void {
  saveStoredTasksLocally(tasks);
  if (isFirebaseConfigured) {
    tasks.forEach((t) => {
      saveFirestoreDoc('tasks', t.id, t);
    });
  }
}

// ─── BREAKS ──────────────────────────────────────────────────────────────────

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

export async function fetchCloudBreaks(): Promise<BreakLog[]> {
  const local = getStoredBreaks();
  if (!isFirebaseConfigured) return local;

  const cloud = await fetchFirestoreCollection<BreakLog>('breaks');
  if (cloud.length > 0) {
    saveStoredBreaksLocally(cloud);
    return cloud;
  }
  return local;
}

function saveStoredBreaksLocally(breaks: BreakLog[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_BREAKS, JSON.stringify(breaks));
  } catch (err) {}
}

export function saveStoredBreaks(breaks: BreakLog[]): void {
  saveStoredBreaksLocally(breaks);
  if (isFirebaseConfigured) {
    breaks.forEach((b) => {
      saveFirestoreDoc('breaks', b.id, b);
    });
  }
}
