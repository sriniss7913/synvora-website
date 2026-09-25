import {
  isFirebaseConfigured,
  saveFirestoreDoc,
  deleteFirestoreDoc,
  fetchFirestoreCollection,
} from './firebase';

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

// ─── ONE-TIME MIGRATION: Push Local Tasks/Employees/Breaks to Firebase ────────

export async function pushLocalDataToFirebaseCloud(): Promise<{
  tasksPushed: number;
  employeesPushed: number;
  breaksPushed: number;
}> {
  if (typeof window === 'undefined') return { tasksPushed: 0, employeesPushed: 0, breaksPushed: 0 };

  let tasksPushed = 0;
  let employeesPushed = 0;
  let breaksPushed = 0;

  try {
    // 1. Read local employees & push to Cloud
    const localEmpsRaw = localStorage.getItem(LOCAL_STORAGE_KEY_EMPLOYEES);
    if (localEmpsRaw) {
      const emps: EmployeeProfile[] = JSON.parse(localEmpsRaw);
      for (const emp of emps) {
        await saveFirestoreDoc('employees', emp.id, emp);
        employeesPushed++;
      }
    }

    // 2. Read local tasks & push to Cloud
    const localTasksRaw = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
    if (localTasksRaw) {
      const tasks: TrackerTask[] = JSON.parse(localTasksRaw);
      for (const task of tasks) {
        await saveFirestoreDoc('tasks', task.id, task);
        tasksPushed++;
      }
    }

    // 3. Read local breaks & push to Cloud
    const localBreaksRaw = localStorage.getItem(LOCAL_STORAGE_KEY_BREAKS);
    if (localBreaksRaw) {
      const breaks: BreakLog[] = JSON.parse(localBreaksRaw);
      for (const brk of breaks) {
        await saveFirestoreDoc('breaks', brk.id, brk);
        breaksPushed++;
      }
    }
  } catch (err) {
    console.error('Migration error pushing local data to Firebase:', err);
  }

  return { tasksPushed, employeesPushed, breaksPushed };
}

// ─── CLOUD-ONLY FETCHERS ───────────────────────────────────────────────────────

export async function fetchCloudEmployees(): Promise<EmployeeProfile[]> {
  return await fetchFirestoreCollection<EmployeeProfile>('employees');
}

export async function fetchCloudTasks(): Promise<TrackerTask[]> {
  return await fetchFirestoreCollection<TrackerTask>('tasks');
}

export async function fetchCloudBreaks(): Promise<BreakLog[]> {
  return await fetchFirestoreCollection<BreakLog>('breaks');
}

// ─── CLOUD-ONLY SAVERS & DELETERS ──────────────────────────────────────────────

export async function createOrUpdateCloudEmployee(emp: EmployeeProfile): Promise<void> {
  await saveFirestoreDoc('employees', emp.id, emp);
}

export async function deleteCloudEmployee(empId: string): Promise<void> {
  await deleteFirestoreDoc('employees', empId);
}

export async function createOrUpdateCloudTask(task: TrackerTask): Promise<void> {
  await saveFirestoreDoc('tasks', task.id, task);
}

export async function deleteCloudTask(taskId: string): Promise<void> {
  await deleteFirestoreDoc('tasks', taskId);
}

export async function createOrUpdateCloudBreak(brk: BreakLog): Promise<void> {
  await saveFirestoreDoc('breaks', brk.id, brk);
}

export async function deleteCloudBreak(breakId: string): Promise<void> {
  await deleteFirestoreDoc('breaks', breakId);
}
