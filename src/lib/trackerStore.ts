// Cloud-Only Tracker Store via Upstash Redis API Routes

export interface TrackerTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedHours: number;
  date: string; // YYYY-MM-DD
  status: 'pending' | 'in_progress' | 'on_break' | 'completed';
  startTime?: string;
  endTime?: string;
  actualDurationMins: number;
  notes?: string;
}

export interface BreakLog {
  id: string;
  employeeName: string;
  type: 'Lunch' | 'Tea' | 'Personal' | 'Other';
  startTime: string;
  endTime?: string;
  durationMins: number;
  date: string; // YYYY-MM-DD
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// ─── EMPLOYEES ────────────────────────────────────────────────────────────────

export async function fetchCloudEmployees(): Promise<EmployeeProfile[]> {
  const res = await fetch('/api/tracker/employees', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function createOrUpdateCloudEmployee(emp: EmployeeProfile): Promise<void> {
  await fetch('/api/tracker/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emp),
  });
}

export async function deleteCloudEmployee(id: string): Promise<void> {
  await fetch(`/api/tracker/employees?id=${id}`, { method: 'DELETE' });
}

// ─── TASKS ────────────────────────────────────────────────────────────────────

export async function fetchCloudTasks(): Promise<TrackerTask[]> {
  const res = await fetch('/api/tracker/tasks', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function createOrUpdateCloudTask(task: TrackerTask): Promise<void> {
  await fetch('/api/tracker/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
}

export async function deleteCloudTask(id: string): Promise<void> {
  await fetch(`/api/tracker/tasks?id=${id}`, { method: 'DELETE' });
}

// ─── BREAKS ───────────────────────────────────────────────────────────────────

export async function fetchCloudBreaks(): Promise<BreakLog[]> {
  const res = await fetch('/api/tracker/breaks', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function createOrUpdateCloudBreak(brk: BreakLog): Promise<void> {
  await fetch('/api/tracker/breaks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brk),
  });
}

export async function deleteCloudBreak(id: string): Promise<void> {
  await fetch(`/api/tracker/breaks?id=${id}`, { method: 'DELETE' });
}

// ─── LEGACY: Push any previously stored localStorage items to cloud ────────────

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
    const empRaw = localStorage.getItem('synvora_tracker_employees_v2');
    if (empRaw) {
      const emps: EmployeeProfile[] = JSON.parse(empRaw);
      for (const emp of emps) {
        await createOrUpdateCloudEmployee(emp);
        employeesPushed++;
      }
      localStorage.removeItem('synvora_tracker_employees_v2');
    }

    const tasksRaw = localStorage.getItem('synvora_tracker_tasks_v2');
    if (tasksRaw) {
      const tasks: TrackerTask[] = JSON.parse(tasksRaw);
      for (const task of tasks) {
        await createOrUpdateCloudTask(task);
        tasksPushed++;
      }
      localStorage.removeItem('synvora_tracker_tasks_v2');
    }

    const breaksRaw = localStorage.getItem('synvora_tracker_breaks_v2');
    if (breaksRaw) {
      const breaks: BreakLog[] = JSON.parse(breaksRaw);
      for (const brk of breaks) {
        await createOrUpdateCloudBreak(brk);
        breaksPushed++;
      }
      localStorage.removeItem('synvora_tracker_breaks_v2');
    }
  } catch (err) {
    console.error('Migration error:', err);
  }

  return { tasksPushed, employeesPushed, breaksPushed };
}
