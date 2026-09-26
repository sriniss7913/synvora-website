'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  TrackerTask,
  BreakLog,
  EmployeeProfile,
  fetchCloudEmployees,
  fetchCloudTasks,
  fetchCloudBreaks,
  createOrUpdateCloudEmployee,
  deleteCloudEmployee,
  createOrUpdateCloudTask,
  deleteCloudTask,
  createOrUpdateCloudBreak,
  deleteCloudBreak,
  pushLocalDataToFirebaseCloud,
} from '@/lib/trackerStore';
import {
  Clock, User, Users, CheckCircle2, Coffee, Plus, BarChart3,
  Download, Search, Check, ChevronLeft, ChevronRight, Briefcase,
  X, Trash2, Database, UserPlus, UploadCloud, RefreshCw, Edit3,
  AlertCircle, TrendingUp, Target, CalendarDays,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type EditTaskForm = {
  title: string;
  description: string;
  assignedTo: string;
  category: string;
  priority: TrackerTask['priority'];
  estimatedHours: number;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
};

const EMPTY_EDIT: EditTaskForm = {
  title: '', description: '', assignedTo: '', category: 'AI Workflow Optimization',
  priority: 'medium', estimatedHours: 2, date: '', startTime: '', endTime: '', notes: '',
};

const CATEGORIES = [
  'AI Workflow Optimization', 'Digital Security', 'Process Digitization', 'Administrative', 'Other',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseTimeToMins(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function formatMins(totalMins: number): string {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${h}h ${m}m`;
}

function priorityColor(p: string) {
  if (p === 'urgent') return 'border-l-red-500';
  if (p === 'high') return 'border-l-amber-500';
  if (p === 'medium') return 'border-l-blue-500';
  return 'border-l-slate-500';
}

function priorityBadgeClass(p: string) {
  if (p === 'urgent') return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
  if (p === 'high') return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
  return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TrackerPage() {
  const [role, setRole] = useState<'employer' | 'employee'>('employer');
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [activeEmployee, setActiveEmployee] = useState<string>('');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'analytics'>('day');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [tasks, setTasks] = useState<TrackerTask[]>([]);
  const [breaks, setBreaks] = useState<BreakLog[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  // Modals
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showLogTimeModal, setShowLogTimeModal] = useState(false);
  const [showAddBreakModal, setShowAddBreakModal] = useState(false);
  const [showManageTeamModal, setShowManageTeamModal] = useState(false);
  const [editingTask, setEditingTask] = useState<TrackerTask | null>(null);
  const [loggingTask, setLoggingTask] = useState<TrackerTask | null>(null);

  // Forms
  const [newEmp, setNewEmp] = useState({ name: '', role: '' });
  const [newTaskForm, setNewTaskForm] = useState<EditTaskForm>({ ...EMPTY_EDIT });
  const [editTaskForm, setEditTaskForm] = useState<EditTaskForm>({ ...EMPTY_EDIT });
  const [logTimeForm, setLogTimeForm] = useState({ startTime: '', endTime: '', notes: '' });
  const [newBreakForm, setNewBreakForm] = useState({ type: 'Lunch' as BreakLog['type'], startTime: '13:00', endTime: '13:45' });

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // ─── Cloud Data Loading ───────────────────────────────────────────────────

  const loadCloud = async () => {
    setIsSyncing(true);
    try {
      const [emps, tks, brks] = await Promise.all([
        fetchCloudEmployees(),
        fetchCloudTasks(),
        fetchCloudBreaks(),
      ]);
      setEmployees(emps);
      if (emps.length > 0) setActiveEmployee(prev => prev || emps[0].name);
      setTasks(tks);
      setBreaks(brks);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await pushLocalDataToFirebaseCloud();
      await loadCloud();
    };
    init();
    const interval = setInterval(loadCloud, 5000);
    return () => clearInterval(interval);
  }, []);

  // ─── Employee CRUD ────────────────────────────────────────────────────────

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name.trim()) return;
    const initials = newEmp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const created: EmployeeProfile = {
      id: `emp-${Date.now()}`,
      name: newEmp.name.trim(),
      role: newEmp.role.trim() || 'Team Member',
      avatar: initials || 'EM',
    };
    setEmployees(prev => [...prev, created]);
    if (!activeEmployee) setActiveEmployee(created.name);
    setNewEmp({ name: '', role: '' });
    await createOrUpdateCloudEmployee(created);
    await loadCloud();
  };

  const handleRemoveEmployee = async (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    await deleteCloudEmployee(id);
    await loadCloud();
  };

  // ─── Task CRUD ────────────────────────────────────────────────────────────

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const f = newTaskForm;
    if (!f.title.trim() || !f.assignedTo) return;
    const created: TrackerTask = {
      id: `task-${Date.now()}`,
      title: f.title, description: f.description,
      assignedTo: f.assignedTo, assignedBy: 'Employer',
      category: f.category, priority: f.priority,
      estimatedHours: Number(f.estimatedHours),
      date: f.date || selectedDate,
      status: 'pending', actualDurationMins: 0,
    };
    setTasks(prev => [created, ...prev]);
    setShowAddTaskModal(false);
    setNewTaskForm({ ...EMPTY_EDIT, date: selectedDate, assignedTo: employees[0]?.name || '' });
    await createOrUpdateCloudTask(created);
    await loadCloud();
  };

  const openEditTask = (task: TrackerTask) => {
    setEditingTask(task);
    setEditTaskForm({
      title: task.title,
      description: task.description || '',
      assignedTo: task.assignedTo,
      category: task.category,
      priority: task.priority,
      estimatedHours: task.estimatedHours,
      date: task.date,
      startTime: task.startTime || '',
      endTime: task.endTime || '',
      notes: task.notes || '',
    });
    setShowEditTaskModal(true);
  };

  const handleSaveEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    const f = editTaskForm;

    let durationMins = editingTask.actualDurationMins;
    if (f.startTime && f.endTime) {
      durationMins = Math.max(0, parseTimeToMins(f.endTime) - parseTimeToMins(f.startTime));
    }

    const updated: TrackerTask = {
      ...editingTask,
      title: f.title,
      description: f.description,
      assignedTo: f.assignedTo,
      category: f.category,
      priority: f.priority,
      estimatedHours: Number(f.estimatedHours),
      date: f.date,
      startTime: f.startTime || editingTask.startTime,
      endTime: f.endTime || editingTask.endTime,
      actualDurationMins: durationMins,
      notes: f.notes,
      status: durationMins > 0 ? 'completed' : editingTask.status,
    };

    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    setShowEditTaskModal(false);
    setEditingTask(null);
    await createOrUpdateCloudTask(updated);
    await loadCloud();
  };

  const openLogTime = (task: TrackerTask) => {
    setLoggingTask(task);
    setLogTimeForm({ startTime: task.startTime || '', endTime: task.endTime || '', notes: task.notes || '' });
    setShowLogTimeModal(true);
  };

  const handleSaveLogTime = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggingTask) return;
    const { startTime, endTime, notes } = logTimeForm;
    const durationMins = (startTime && endTime)
      ? Math.max(0, parseTimeToMins(endTime) - parseTimeToMins(startTime))
      : loggingTask.actualDurationMins;

    const updated: TrackerTask = {
      ...loggingTask,
      startTime,
      endTime,
      actualDurationMins: durationMins,
      notes,
      status: durationMins > 0 && endTime ? 'completed' : 'in_progress',
    };

    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    setShowLogTimeModal(false);
    setLoggingTask(null);
    await createOrUpdateCloudTask(updated);
    await loadCloud();
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    await deleteCloudTask(id);
    await loadCloud();
  };

  const handleMarkComplete = async (task: TrackerTask) => {
    const updated: TrackerTask = { ...task, status: 'completed', endTime: task.endTime || new Date().toTimeString().slice(0, 5) };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    await createOrUpdateCloudTask(updated);
    await loadCloud();
  };

  // ─── Employee Task Status Controls ────────────────────────────────────────
  // Update local state immediately (no flicker) then save to cloud in background

  const handleStartTask = (task: TrackerTask) => {
    const now = new Date().toTimeString().slice(0, 5);
    const updated: TrackerTask = { ...task, status: 'in_progress', startTime: task.startTime || now };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    createOrUpdateCloudTask(updated);
  };

  const handlePauseTask = (task: TrackerTask) => {
    const updated: TrackerTask = { ...task, status: 'on_break' };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    createOrUpdateCloudTask(updated);
  };

  const handleResumeTask = (task: TrackerTask) => {
    const updated: TrackerTask = { ...task, status: 'in_progress' };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    createOrUpdateCloudTask(updated);
  };

  const handleEndTask = (task: TrackerTask) => {
    const now = new Date().toTimeString().slice(0, 5);
    const endTime = now;
    const durationMins = task.startTime
      ? Math.max(0, parseTimeToMins(endTime) - parseTimeToMins(task.startTime))
      : task.actualDurationMins;
    const updated: TrackerTask = { ...task, status: 'completed', endTime, actualDurationMins: durationMins };
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    createOrUpdateCloudTask(updated);
  };

  const handleResetTask = (task: TrackerTask) => {
    const reset: TrackerTask = {
      ...task,
      status: 'pending',
      startTime: undefined,
      endTime: undefined,
      actualDurationMins: 0,
      notes: undefined,
    };
    setTasks(prev => prev.map(t => t.id === task.id ? reset : t));
    createOrUpdateCloudTask(reset);
  };


  // ─── Break CRUD ───────────────────────────────────────────────────────────

  const handleRegisterBreak = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, startTime, endTime } = newBreakForm;
    const durationMins = Math.max(0, parseTimeToMins(endTime) - parseTimeToMins(startTime));
    const created: BreakLog = {
      id: `break-${Date.now()}`,
      employeeName: activeEmployee,
      type, startTime, endTime, durationMins,
      date: selectedDate,
    };
    setBreaks(prev => [created, ...prev]);
    setShowAddBreakModal(false);
    await createOrUpdateCloudBreak(created);
    await loadCloud();
  };

  const handleDeleteBreak = async (id: string) => {
    setBreaks(prev => prev.filter(b => b.id !== id));
    await deleteCloudBreak(id);
    await loadCloud();
  };

  // ─── Migration ────────────────────────────────────────────────────────────

  const handlePushToCloud = async () => {
    setIsSyncing(true);
    setSyncMsg('Pushing local data to Upstash...');
    const r = await pushLocalDataToFirebaseCloud();
    await loadCloud();
    setSyncMsg(`Pushed ${r.tasksPushed} tasks, ${r.employeesPushed} staff to Cloud!`);
    setTimeout(() => setSyncMsg(''), 4000);
  };

  // ─── Computed Values ──────────────────────────────────────────────────────

  const filteredTasks = tasks.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || t.title.toLowerCase().includes(q) || t.assignedTo.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchEmployee = role === 'employer' || t.assignedTo === activeEmployee;
    return matchSearch && matchStatus && matchEmployee;
  });

  const myDailyTasks = tasks.filter(t => t.assignedTo === activeEmployee && t.date === selectedDate);
  const myDailyBreaks = breaks.filter(b => b.employeeName === activeEmployee && b.date === selectedDate);
  const totalProductiveMins = myDailyTasks.reduce((a, t) => a + t.actualDurationMins, 0);
  const totalBreakMins = myDailyBreaks.reduce((a, b) => a + b.durationMins, 0);
  const varianceMins = totalProductiveMins + totalBreakMins - 540;

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Assigned To', 'Category', 'Priority', 'Status', 'Est Hours', 'Actual Mins', 'Date', 'Start', 'End'];
    const rows = filteredTasks.map(t => [t.id, `"${t.title}"`, `"${t.assignedTo}"`, `"${t.category}"`, t.priority, t.status, t.estimatedHours, t.actualDurationMins, t.date, t.startTime || '', t.endTime || '']);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const a = document.createElement('a'); a.href = encodeURI(csv);
    a.download = `Synvora_Tracker_${selectedDate}.csv`; a.click();
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="pt-28 md:pt-36 pb-20 min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ── Top Header ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="emerald">
                {isSyncing ? <><RefreshCw className="w-3 h-3 animate-spin" /> Syncing...</> : <>Upstash Cloud Active</>}
              </Badge>
            </div>
            <h1 className="text-2xl font-extrabold font-heading text-white">Synvora Job & Time Tracker</h1>
            <p className="text-xs text-slate-400 mt-0.5">Multi-device live sync powered by Upstash Redis. All entries update in real-time.</p>
            {syncMsg && <p className="text-xs font-bold text-emerald-400 mt-1">{syncMsg}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Button onClick={handlePushToCloud} variant="emerald" size="sm">
              <UploadCloud className="w-4 h-4" />
              <span>Push Local to Cloud</span>
            </Button>

            {/* Role Toggle */}
            <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setRole('employer')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${role === 'employer' ? 'bg-blue-900 text-white border border-blue-700' : 'text-slate-400 hover:text-white'}`}
              >
                <Users className="w-3.5 h-3.5" /> Employer
              </button>
              <button
                onClick={() => setRole('employee')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${role === 'employee' ? 'bg-emerald-900 text-white border border-emerald-700' : 'text-slate-400 hover:text-white'}`}
              >
                <User className="w-3.5 h-3.5" /> Employee
              </button>
            </div>

            <Button onClick={() => setShowManageTeamModal(true)} variant="outline" size="sm" className="border-slate-700 text-white">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>Team ({employees.length})</span>
            </Button>
          </div>
        </div>

        {/* ── Sub Header: Staff Selector + View Mode + Date ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Active Staff:</span>
            {employees.length === 0 ? (
              <span className="text-xs text-rose-400 font-bold italic">No staff — add via Team button</span>
            ) : (
              <select value={activeEmployee} onChange={e => setActiveEmployee(e.target.value)}
                className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-800 outline-none focus:ring-2 focus:ring-blue-600">
                {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>)}
              </select>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['day', 'week', 'month', 'analytics'] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${viewMode === mode ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
                {mode === 'analytics' ? 'Report' : `${mode} View`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() - 1); setSelectedDate(d.toISOString().split('T')[0]); }}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
              className="bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-800 outline-none" />
            <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() + 1); setSelectedDate(d.toISOString().split('T')[0]); }}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ──────────────────── DAY VIEW ──────────────────── */}
        {viewMode === 'day' && (
          <div className="space-y-6">

            {/* EMPLOYER VIEW */}
            {role === 'employer' && (
              <>
                {/* Employer Scorecards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Tasks', value: tasks.filter(t => t.date === selectedDate).length, sub: 'Dispatched today', icon: <Briefcase className="w-4 h-4 text-blue-400" />, color: 'text-white' },
                    { label: 'Completed', value: tasks.filter(t => t.date === selectedDate && t.status === 'completed').length, sub: 'Tasks done today', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, color: 'text-emerald-400' },
                    { label: 'In Progress', value: tasks.filter(t => t.date === selectedDate && t.status === 'in_progress').length, sub: 'Currently active', icon: <Clock className="w-4 h-4 text-blue-400" />, color: 'text-blue-400' },
                    { label: 'Pending', value: tasks.filter(t => t.date === selectedDate && t.status === 'pending').length, sub: 'Not yet started', icon: <AlertCircle className="w-4 h-4 text-amber-400" />, color: 'text-amber-400' },
                  ].map(c => (
                    <div key={c.label} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs"><span>{c.label}</span>{c.icon}</div>
                      <p className={`text-2xl font-extrabold ${c.color}`}>{c.value}</p>
                      <p className="text-[11px] text-slate-500">{c.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Employer Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search tasks..." className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                      className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-800 outline-none">
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <Button onClick={() => employees.length === 0 ? setShowManageTeamModal(true) : setShowAddTaskModal(true)} variant="emerald" size="sm">
                    <Plus className="w-4 h-4" /> <span>Assign New Task</span>
                  </Button>
                </div>

                {/* Employer: Tasks + Team Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Task List */}
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" /> Team Workload — {selectedDate}
                      <span className="text-xs font-mono text-slate-500 ml-auto">{filteredTasks.length} tasks</span>
                    </h3>
                    {filteredTasks.length === 0 ? (
                      <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                        <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
                        <p className="text-sm font-bold text-white">No tasks dispatched yet</p>
                        <p className="text-xs text-slate-400">Click &quot;Assign New Task&quot; to dispatch work to your team.</p>
                      </div>
                    ) : filteredTasks.map(t => (
                      <div key={t.id} className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 ${priorityColor(t.priority)} space-y-3`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${priorityBadgeClass(t.priority)}`}>{t.priority}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{t.category}</span>
                              <span className="text-[10px] text-slate-500">Est: {t.estimatedHours}h</span>
                            </div>
                            <p className="text-sm font-bold text-white">{t.title}</p>
                            {t.description && <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>}
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            {t.status === 'completed' && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">✓ Done</span>}
                            {t.status === 'in_progress' && <span className="text-[10px] font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full animate-pulse">● Active</span>}
                            {t.status === 'pending' && <span className="text-[10px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">Pending</span>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-3">
                          <div className="flex items-center gap-4 text-slate-400">
                            <span>Assigned to: <strong className="text-white">{t.assignedTo}</strong></span>
                            {t.startTime && <span>Start: <strong className="text-slate-300">{t.startTime}</strong></span>}
                            {t.endTime && <span>End: <strong className="text-slate-300">{t.endTime}</strong></span>}
                            {t.actualDurationMins > 0 && <span className="text-emerald-400 font-bold">{formatMins(t.actualDurationMins)} logged</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditTask(t)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-900 text-slate-400 hover:text-blue-300 transition-colors" title="Edit Task">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteTask(t.id)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors" title="Delete Task">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team Status Panel */}
                  <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" /> Team Overview
                      <button onClick={() => setShowManageTeamModal(true)} className="ml-auto text-xs text-emerald-400 hover:underline">+ Add</button>
                    </h3>

                    {employees.length === 0 ? (
                      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500 italic">No employees yet.</div>
                    ) : employees.map(emp => {
                      const empTasks = tasks.filter(t => t.assignedTo === emp.name && t.date === selectedDate);
                      const done = empTasks.filter(t => t.status === 'completed').length;
                      const active = empTasks.find(t => t.status === 'in_progress');
                      const empMins = empTasks.reduce((a, t) => a + t.actualDurationMins, 0);

                      return (
                        <div key={emp.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-white text-xs font-bold flex items-center justify-center">{emp.avatar}</span>
                              <div>
                                <p className="text-xs font-bold text-white">{emp.name}</p>
                                <p className="text-[10px] text-slate-500">{emp.role}</p>
                              </div>
                            </div>
                            {active ? <span className="text-[10px] font-bold text-blue-400">● Working</span>
                              : <span className="text-[10px] text-slate-500">Available</span>}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                            <div className="bg-slate-950 rounded-lg p-2"><p className="font-bold text-white">{empTasks.length}</p><p className="text-slate-500">Tasks</p></div>
                            <div className="bg-slate-950 rounded-lg p-2"><p className="font-bold text-emerald-400">{done}</p><p className="text-slate-500">Done</p></div>
                            <div className="bg-slate-950 rounded-lg p-2"><p className="font-bold text-blue-400">{formatMins(empMins)}</p><p className="text-slate-500">Logged</p></div>
                          </div>
                          {active && <p className="text-[10px] text-blue-300 bg-blue-950 border border-blue-800 px-2 py-1 rounded-lg truncate">Working on: {active.title}</p>}
                        </div>
                      );
                    })}

                    {/* Today's break summary for team */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2"><Coffee className="w-3.5 h-3.5" /> Today's Break Summary</h4>
                      {employees.map(emp => {
                        const empBreaks = breaks.filter(b => b.employeeName === emp.name && b.date === selectedDate);
                        const total = empBreaks.reduce((a, b) => a + b.durationMins, 0);
                        return total > 0 ? (
                          <div key={emp.id} className="flex items-center justify-between text-[10px]">
                            <span className="text-slate-300">{emp.name}</span>
                            <span className="text-amber-400 font-bold">{formatMins(total)}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* EMPLOYEE VIEW */}
            {role === 'employee' && (
              <>
                {/* Employee Daily Scorecard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Gross Shift (9-6)', value: '9h 00m', sub: 'Standard workday', icon: <Clock className="w-4 h-4 text-blue-400" />, color: 'text-white' },
                    { label: 'Productive Work', value: formatMins(totalProductiveMins), sub: `${myDailyTasks.filter(t => t.actualDurationMins > 0).length} tasks logged`, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, color: 'text-emerald-400' },
                    { label: 'Break Time', value: formatMins(totalBreakMins), sub: `${myDailyBreaks.length} breaks registered`, icon: <Coffee className="w-4 h-4 text-amber-400" />, color: 'text-amber-400' },
                    { label: 'Variance vs Target', value: `${varianceMins >= 0 ? '+' : '-'}${formatMins(Math.abs(varianceMins))}`, sub: 'vs 9h baseline', icon: <TrendingUp className="w-4 h-4 text-blue-400" />, color: varianceMins >= 0 ? 'text-emerald-400' : 'text-slate-300' },
                  ].map(c => (
                    <div key={c.label} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-xs"><span>{c.label}</span>{c.icon}</div>
                      <p className={`text-2xl font-extrabold ${c.color}`}>{c.value}</p>
                      <p className="text-[11px] text-slate-500">{c.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Employee actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search my tasks..." className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:ring-2 focus:ring-emerald-600" />
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                      className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-800 outline-none">
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <button onClick={() => setShowAddBreakModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950 hover:bg-amber-900 border border-amber-800 text-amber-300 font-bold text-xs transition-colors w-full sm:w-auto justify-center">
                    <Coffee className="w-4 h-4" /> Register Break
                  </button>
                </div>

                {/* Employee: Tasks + Breaks panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* My Tasks */}
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" /> My Tasks — {activeEmployee || 'Select staff'}
                      <span className="text-xs font-mono text-slate-500 ml-auto">{filteredTasks.length} tasks</span>
                    </h3>

                    {filteredTasks.length === 0 ? (
                      <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto" />
                        <p className="text-sm font-bold text-white">No tasks assigned yet</p>
                        <p className="text-xs text-slate-400">Ask your employer to assign tasks to you.</p>
                      </div>
                    ) : filteredTasks.map(t => (
                      <div key={t.id} className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 ${priorityColor(t.priority)} space-y-3`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${priorityBadgeClass(t.priority)}`}>{t.priority}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{t.category}</span>
                              <span className="text-[10px] text-slate-500">Est: {t.estimatedHours}h</span>
                            </div>
                            <p className="text-sm font-bold text-white">{t.title}</p>
                            {t.description && <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>}
                          </div>
                          <div className="flex-shrink-0">
                            {t.status === 'completed' && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">✓ Done</span>}
                            {t.status === 'in_progress' && <span className="text-[10px] font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full">● Active</span>}
                            {t.status === 'pending' && <span className="text-[10px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">Pending</span>}
                          </div>
                        </div>

                        {/* Time logged summary */}
                        {(t.startTime || t.endTime || t.actualDurationMins > 0) && (
                          <div className="flex items-center gap-4 text-[11px] text-slate-400 bg-slate-950 rounded-xl px-3 py-2">
                            {t.startTime && <span>Start: <strong className="text-white">{t.startTime}</strong></span>}
                            {t.endTime && <span>End: <strong className="text-white">{t.endTime}</strong></span>}
                            {t.actualDurationMins > 0 && <span className="text-emerald-400 font-bold">{formatMins(t.actualDurationMins)} worked</span>}
                            {t.notes && <span className="text-slate-500 italic truncate max-w-xs">{t.notes}</span>}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          {/* Start — only when pending */}
                          {t.status === 'pending' && (
                            <button onClick={() => handleStartTask(t)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-bold text-xs flex items-center gap-1.5">
                              <span>▶</span> Start
                            </button>
                          )}
                          {/* Pause — only when active */}
                          {t.status === 'in_progress' && (
                            <button onClick={() => handlePauseTask(t)}
                              className="px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 font-bold text-xs flex items-center gap-1.5">
                              <span>⏸</span> Pause
                            </button>
                          )}
                          {/* Resume — only when paused */}
                          {t.status === 'on_break' && (
                            <button onClick={() => handleResumeTask(t)}
                              className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-bold text-xs flex items-center gap-1.5">
                              <span>▶</span> Resume
                            </button>
                          )}
                          {/* End Task — when active or paused */}
                          {(t.status === 'in_progress' || t.status === 'on_break') && (
                            <button onClick={() => handleEndTask(t)}
                              className="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-bold text-xs flex items-center gap-1.5">
                              <span>⏹</span> End Task
                            </button>
                          )}
                          {/* Completed state label */}
                          {t.status === 'completed' && (
                            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Completed {t.endTime && `at ${t.endTime}`}
                            </span>
                          )}
                          {/* Reset — visible on any non-pending task */}
                          {t.status !== 'pending' && (
                            <button onClick={() => handleResetTask(t)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                              title="Reset time logs and revert to Pending">
                              <RefreshCw className="w-3 h-3" /> Reset
                            </button>
                          )}
                          {/* Edit — always visible, no delete for employees */}
                          <button onClick={() => openLogTime(t)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700">
                            <Clock className="w-3.5 h-3.5" /> Log Time
                          </button>
                          <button onClick={() => openEditTask(t)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700" title="Edit Task">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Breaks Panel */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-400" /> My Breaks
                      </h3>
                      <span className="text-xs font-mono text-amber-400 font-bold">{formatMins(totalBreakMins)}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      {myDailyBreaks.length === 0 ? (
                        <div className="text-center py-4 space-y-1">
                          <Coffee className="w-6 h-6 text-slate-600 mx-auto" />
                          <p className="text-xs text-slate-500">No breaks registered yet</p>
                          <button onClick={() => setShowAddBreakModal(true)} className="text-xs text-amber-400 hover:underline">+ Register a break</button>
                        </div>
                      ) : myDailyBreaks.map(b => (
                        <div key={b.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">{b.type} Break</p>
                            <p className="text-[10px] text-slate-400">{b.startTime} – {b.endTime || 'Active'}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-400">{b.durationMins}m</span>
                            <button onClick={() => handleDeleteBreak(b.id)} className="text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Today's task completion progress */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Today's Progress</h4>
                      {myDailyTasks.length === 0 ? (
                        <p className="text-xs text-slate-500 italic">No tasks for today.</p>
                      ) : myDailyTasks.map(t => (
                        <div key={t.id} className="space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-slate-300 truncate max-w-[120px]">{t.title}</span>
                            <span className={t.status === 'completed' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{t.status === 'completed' ? '✓' : t.actualDurationMins > 0 ? formatMins(t.actualDurationMins) : '—'}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1">
                            <div className={`h-1 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`}
                              style={{ width: `${Math.min(100, (t.actualDurationMins / (t.estimatedHours * 60)) * 100)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        )}

        {/* ──────────────────── WEEK VIEW ──────────────────── */}
        {viewMode === 'week' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">7-Day Team Work Grid</h3>
            <div className="grid grid-cols-7 gap-3 text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                const dayTasks = tasks.filter(t => t.date === selectedDate);
                return (
                  <div key={day} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-blue-400 uppercase">{day}</span>
                    <p className="text-[11px] text-slate-300">Tasks: <strong className="text-white">{dayTasks.length}</strong></p>
                    <p className="text-[11px] text-slate-300">Done: <strong className="text-emerald-400">{dayTasks.filter(t => t.status === 'completed').length}</strong></p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ──────────────────── MONTH VIEW ──────────────────── */}
        {viewMode === 'month' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Monthly Workload Matrix</h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d} className="text-xs font-bold text-slate-400 py-1">{d}</span>)}
              {Array.from({ length: 30 }).map((_, i) => {
                const d = `${selectedDate.slice(0, 7)}-${String(i + 1).padStart(2, '0')}`;
                const dayTasks = tasks.filter(t => t.date === d);
                const allDone = dayTasks.length > 0 && dayTasks.every(t => t.status === 'completed');
                return (
                  <div key={i} className={`p-2 rounded-xl border text-[10px] cursor-pointer transition-all ${d === selectedDate ? 'bg-blue-900 border-blue-600' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                    onClick={() => setSelectedDate(d)}>
                    <p className="font-bold text-white">{i + 1}</p>
                    {dayTasks.length > 0 && <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${allDone ? 'bg-emerald-400' : 'bg-amber-400'}`} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ──────────────────── ANALYTICS VIEW ──────────────────── */}
        {viewMode === 'analytics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Productivity Report</h3>
                <p className="text-xs text-slate-400">Team analytics across tasks, time logs, and breaks.</p>
              </div>
              <Button onClick={handleExportCSV} variant="emerald" size="sm">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500">Active Staff</span>
                <p className="text-4xl font-extrabold text-white">{employees.length}</p>
                <p className="text-xs text-slate-400">Registered in Upstash Cloud</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500">Total Tasks</span>
                <p className="text-4xl font-extrabold text-blue-400">{tasks.length}</p>
                <p className="text-xs text-slate-400">{tasks.filter(t => t.status === 'completed').length} completed</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500">Break Logs</span>
                <p className="text-4xl font-extrabold text-amber-400">{breaks.length}</p>
                <p className="text-xs text-slate-400">Total registered</p>
              </div>
            </div>

            {/* Per-employee summary table */}
            {employees.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Per-Employee Summary</h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-800">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-800">
                      <tr>
                        {['Employee', 'Role', 'Tasks Assigned', 'Completed', 'Time Logged', 'Break Time'].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-bold text-slate-300 uppercase tracking-wider text-[10px]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {employees.map(emp => {
                        const empTasks = tasks.filter(t => t.assignedTo === emp.name);
                        const empBreaks = breaks.filter(b => b.employeeName === emp.name);
                        return (
                          <tr key={emp.id} className="bg-slate-950 hover:bg-slate-900 transition-colors">
                            <td className="px-4 py-3 font-bold text-white">{emp.name}</td>
                            <td className="px-4 py-3 text-slate-400">{emp.role}</td>
                            <td className="px-4 py-3 text-white">{empTasks.length}</td>
                            <td className="px-4 py-3 text-emerald-400 font-bold">{empTasks.filter(t => t.status === 'completed').length}</td>
                            <td className="px-4 py-3 text-blue-400 font-bold">{formatMins(empTasks.reduce((a, t) => a + t.actualDurationMins, 0))}</td>
                            <td className="px-4 py-3 text-amber-400 font-bold">{formatMins(empBreaks.reduce((a, b) => a + b.durationMins, 0))}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ═══════════════════════════════ MODALS ══════════════════════════════ */}

      {/* Manage Team Modal */}
      {showManageTeamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><UserPlus className="w-5 h-5 text-emerald-400" /> Manage Team</h3>
              <button onClick={() => setShowManageTeamModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Add Staff Member</h4>
              <div className="grid grid-cols-2 gap-3">
                <input required value={newEmp.name} onChange={e => setNewEmp({ ...newEmp, name: e.target.value })} placeholder="Full Name" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-emerald-600" />
                <input value={newEmp.role} onChange={e => setNewEmp({ ...newEmp, role: e.target.value })} placeholder="Role / Title" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-emerald-600" />
              </div>
              <Button type="submit" variant="emerald" size="sm" className="w-full"><UserPlus className="w-4 h-4" /> Add Employee</Button>
            </form>
            <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
              {employees.map(emp => (
                <div key={emp.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center border border-slate-700">{emp.avatar}</span>
                    <div><p className="font-bold text-white">{emp.name}</p><p className="text-[10px] text-slate-400">{emp.role}</p></div>
                  </div>
                  <button onClick={() => handleRemoveEmployee(emp.id)} className="p-2 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="flex justify-end"><Button onClick={() => setShowManageTeamModal(false)} variant="outline" size="sm" className="border-slate-700 text-white">Done</Button></div>
          </div>
        </div>
      )}

      {/* Assign New Task Modal (Employer) */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Assign New Task</h3>
              <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Task Title *</label>
                <input required value={newTaskForm.title} onChange={e => setNewTaskForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g., Audit Security WAF Policies"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Description</label>
                <textarea rows={2} value={newTaskForm.description} onChange={e => setNewTaskForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Detailed task instructions..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Assign To *</label>
                  <select value={newTaskForm.assignedTo} onChange={e => setNewTaskForm(f => ({ ...f, assignedTo: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none">
                    <option value="">Select employee...</option>
                    {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Category</label>
                  <select value={newTaskForm.category} onChange={e => setNewTaskForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Priority</label>
                  <select value={newTaskForm.priority} onChange={e => setNewTaskForm(f => ({ ...f, priority: e.target.value as any }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none">
                    {['low', 'medium', 'high', 'urgent'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Est. Hours</label>
                  <input type="number" step="0.5" value={newTaskForm.estimatedHours} onChange={e => setNewTaskForm(f => ({ ...f, estimatedHours: Number(e.target.value) }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Target Date</label>
                  <input type="date" value={newTaskForm.date || selectedDate} onChange={e => setNewTaskForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button onClick={() => setShowAddTaskModal(false)} type="button" variant="outline" size="sm" className="border-slate-700 text-white">Cancel</Button>
                <Button type="submit" variant="emerald" size="sm" disabled={!newTaskForm.assignedTo}>Dispatch Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditTaskModal && editingTask && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Edit3 className="w-5 h-5 text-blue-400" /> Edit Task</h3>
              <button onClick={() => setShowEditTaskModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveEditTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Task Title *</label>
                <input required value={editTaskForm.title} onChange={e => setEditTaskForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Description</label>
                <textarea rows={2} value={editTaskForm.description} onChange={e => setEditTaskForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Assigned To</label>
                  <select value={editTaskForm.assignedTo} onChange={e => setEditTaskForm(f => ({ ...f, assignedTo: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none">
                    {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Priority</label>
                  <select value={editTaskForm.priority} onChange={e => setEditTaskForm(f => ({ ...f, priority: e.target.value as any }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none">
                    {['low', 'medium', 'high', 'urgent'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Est. Hours</label>
                  <input type="number" step="0.5" value={editTaskForm.estimatedHours} onChange={e => setEditTaskForm(f => ({ ...f, estimatedHours: Number(e.target.value) }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Target Date</label>
                  <input type="date" value={editTaskForm.date} onChange={e => setEditTaskForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Entry (optional)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Start Time</label>
                    <input type="time" value={editTaskForm.startTime} onChange={e => setEditTaskForm(f => ({ ...f, startTime: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">End Time</label>
                    <input type="time" value={editTaskForm.endTime} onChange={e => setEditTaskForm(f => ({ ...f, endTime: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Notes</label>
                  <input value={editTaskForm.notes} onChange={e => setEditTaskForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Work notes or completion remarks..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button onClick={() => setShowEditTaskModal(false)} type="button" variant="outline" size="sm" className="border-slate-700 text-white">Cancel</Button>
                <Button type="submit" variant="emerald" size="sm">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Time Modal (Employee only — Start/End time entry) */}
      {showLogTimeModal && loggingTask && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> Log Work Time</h3>
                <p className="text-xs text-slate-400 mt-0.5">{loggingTask.title}</p>
              </div>
              <button onClick={() => setShowLogTimeModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveLogTime} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Start Time *</label>
                  <input type="time" required value={logTimeForm.startTime} onChange={e => setLogTimeForm(f => ({ ...f, startTime: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">End Time *</label>
                  <input type="time" required value={logTimeForm.endTime} onChange={e => setLogTimeForm(f => ({ ...f, endTime: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
              {logTimeForm.startTime && logTimeForm.endTime && (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-center">
                  <p className="text-emerald-300 font-bold text-sm">
                    Duration: {formatMins(Math.max(0, parseTimeToMins(logTimeForm.endTime) - parseTimeToMins(logTimeForm.startTime)))}
                  </p>
                </div>
              )}
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Notes (optional)</label>
                <input value={logTimeForm.notes} onChange={e => setLogTimeForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Work notes, progress update..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
              </div>
              <p className="text-[10px] text-slate-500">Setting both start & end time will automatically mark this task as Completed.</p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button onClick={() => setShowLogTimeModal(false)} type="button" variant="outline" size="sm" className="border-slate-700 text-white">Cancel</Button>
                <Button type="submit" variant="emerald" size="sm">Save Time Log</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Break Modal */}
      {showAddBreakModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Coffee className="w-5 h-5 text-amber-400" /> Register Break</h3>
              <button onClick={() => setShowAddBreakModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleRegisterBreak} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Break Type</label>
                <select value={newBreakForm.type} onChange={e => setNewBreakForm(f => ({ ...f, type: e.target.value as any }))}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none">
                  {['Lunch', 'Tea', 'Personal', 'Other'].map(t => <option key={t} value={t}>{t} Break</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Start Time</label>
                  <input type="time" required value={newBreakForm.startTime} onChange={e => setNewBreakForm(f => ({ ...f, startTime: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">End Time</label>
                  <input type="time" required value={newBreakForm.endTime} onChange={e => setNewBreakForm(f => ({ ...f, endTime: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none" />
                </div>
              </div>
              {newBreakForm.startTime && newBreakForm.endTime && (
                <div className="p-3 rounded-xl bg-amber-950 border border-amber-800 text-center">
                  <p className="text-amber-300 font-bold text-sm">
                    Break Duration: {Math.max(0, parseTimeToMins(newBreakForm.endTime) - parseTimeToMins(newBreakForm.startTime))} minutes
                  </p>
                </div>
              )}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button onClick={() => setShowAddBreakModal(false)} type="button" variant="outline" size="sm" className="border-slate-700 text-white">Cancel</Button>
                <Button type="submit" variant="emerald" size="sm">Log Break</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
