'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  TrackerTask,
  BreakLog,
  INITIAL_EMPLOYEES,
  getStoredTasks,
  saveStoredTasks,
  getStoredBreaks,
  saveStoredBreaks,
} from '@/lib/trackerStore';
import {
  Clock,
  Calendar as CalendarIcon,
  User,
  Users,
  Play,
  Pause,
  CheckCircle2,
  Coffee,
  Plus,
  BarChart3,
  Download,
  Filter,
  Search,
  Sparkles,
  AlertTriangle,
  FileSpreadsheet,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Layers,
  ArrowRight,
  X,
  Edit3,
} from 'lucide-react';

export default function TrackerPage() {
  const [role, setRole] = useState<'employer' | 'employee'>('employer');
  const [activeEmployee, setActiveEmployee] = useState<string>('Srinivasan S');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'analytics'>('day');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [tasks, setTasks] = useState<TrackerTask[]>([]);
  const [breaks, setBreaks] = useState<BreakLog[]>([]);

  // Timer state for active task
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [timerMins, setTimerMins] = useState<number>(0);

  // Modals state
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddBreakModal, setShowAddBreakModal] = useState(false);
  const [showManualTimeModal, setShowManualTimeModal] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form states for creating task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: 'Srinivasan S',
    category: 'AI Workflow Optimization',
    priority: 'medium' as TrackerTask['priority'],
    estimatedHours: 2.0,
    targetDate: new Date().toISOString().split('T')[0],
  });

  // Form states for registering break
  const [newBreak, setNewBreak] = useState({
    type: 'Lunch' as BreakLog['type'],
    startTime: '13:00',
    endTime: '13:45',
  });

  // Form state for manual task time entry
  const [manualTime, setManualTime] = useState({
    taskId: '',
    durationMins: 60,
    notes: '',
  });

  // Load stored tasks & breaks on mount
  useEffect(() => {
    setTasks(getStoredTasks());
    setBreaks(getStoredBreaks());
  }, []);

  // Sync tasks to localStorage whenever tasks change
  const updateTasks = (updated: TrackerTask[]) => {
    setTasks(updated);
    saveStoredTasks(updated);
  };

  // Sync breaks to localStorage whenever breaks change
  const updateBreaks = (updated: BreakLog[]) => {
    setBreaks(updated);
    saveStoredBreaks(updated);
  };

  // Task creation handler
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TrackerTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedBy: 'Srinivasan S (Employer)',
      category: newTask.category,
      priority: newTask.priority,
      estimatedHours: Number(newTask.estimatedHours),
      date: newTask.targetDate,
      status: 'pending',
      actualDurationMins: 0,
    };
    updateTasks([created, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      assignedTo: 'Srinivasan S',
      category: 'AI Workflow Optimization',
      priority: 'medium',
      estimatedHours: 2.0,
      targetDate: selectedDate,
    });
    setShowAddTaskModal(false);
  };

  // Break registration handler
  const handleRegisterBreak = (e: React.FormEvent) => {
    e.preventDefault();
    const startMins = parseTimeToMins(newBreak.startTime);
    const endMins = parseTimeToMins(newBreak.endTime);
    const durationMins = Math.max(0, endMins - startMins);

    const created: BreakLog = {
      id: `break-${Date.now()}`,
      employeeName: activeEmployee,
      type: newBreak.type,
      startTime: newBreak.startTime,
      endTime: newBreak.endTime,
      durationMins: durationMins,
      date: selectedDate,
    };

    updateBreaks([created, ...breaks]);
    setShowAddBreakModal(false);
  };

  // Task status transition triggers
  const handleStartTask = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'in_progress' as const,
          startTime: t.startTime || new Date().toTimeString().slice(0, 5),
        };
      }
      return t;
    });
    setActiveTaskId(taskId);
    updateTasks(updated);
  };

  const handlePauseTask = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: 'pending' as const };
      }
      return t;
    });
    setActiveTaskId(null);
    updateTasks(updated);
  };

  const handleCompleteTask = (taskId: string, notes?: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'completed' as const,
          endTime: new Date().toTimeString().slice(0, 5),
          notes: notes || t.notes || 'Completed successfully.',
        };
      }
      return t;
    });
    if (activeTaskId === taskId) setActiveTaskId(null);
    updateTasks(updated);
  };

  // Helper time functions
  function parseTimeToMins(timeStr: string): number {
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  function formatMinsToHoursStr(totalMins: number): string {
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hours}h ${mins}m`;
  }

  // Filtered lists
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesEmployee = role === 'employer' || t.assignedTo === activeEmployee;

    return matchesSearch && matchesStatus && matchesEmployee;
  });

  // Calculate daily time metrics for active employee
  const employeeDailyTasks = tasks.filter(
    (t) => t.assignedTo === activeEmployee && t.date === selectedDate
  );
  const employeeDailyBreaks = breaks.filter(
    (b) => b.employeeName === activeEmployee && b.date === selectedDate
  );

  const totalTaskMinsLogged = employeeDailyTasks.reduce((acc, t) => acc + t.actualDurationMins, 0);
  const totalBreakMinsLogged = employeeDailyBreaks.reduce((acc, b) => acc + b.durationMins, 0);
  const netProductiveMins = Math.max(0, totalTaskMinsLogged);

  // Baseline 9 AM - 6 PM (540 mins gross)
  const baselineGrossMins = 540;
  const varianceMins = netProductiveMins + totalBreakMinsLogged - baselineGrossMins;

  // Export CSV Work Summary
  const handleExportCSV = () => {
    const headers = ['Task ID', 'Title', 'Assigned To', 'Category', 'Priority', 'Status', 'Est. Hours', 'Actual (Mins)', 'Date'];
    const rows = filteredTasks.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.assignedTo}"`,
      `"${t.category}"`,
      t.priority,
      t.status,
      t.estimatedHours,
      t.actualDurationMins,
      t.date,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Synvora_Work_Summary_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Top Header & Role Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="emerald">Enterprise Workload & Time Module</Badge>
              <span className="text-xs font-mono text-slate-400">ROUTE: /tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Synvora Job & Time Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Precision task assignment, real-time time logging, custom break registration, & calendar analytics.
            </p>
          </div>

          {/* Role & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Role Toggle */}
            <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setRole('employer')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  role === 'employer'
                    ? 'bg-synvora-blue-900 text-white shadow-card border border-synvora-blue-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Employer (Manager)</span>
              </button>

              <button
                onClick={() => setRole('employee')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  role === 'employee'
                    ? 'bg-synvora-emerald-900 text-white shadow-card border border-synvora-emerald-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Employee (Staff)</span>
              </button>
            </div>

            {/* Export Report Button */}
            <Button onClick={handleExportCSV} variant="outline" size="sm" className="border-slate-700 text-white">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Sub-Header: Active Employee Selector & Date Controls */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Active Employee Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff:</span>
            <select
              value={activeEmployee}
              onChange={(e) => setActiveEmployee(e.target.value)}
              className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-800 focus:ring-2 focus:ring-synvora-blue-600 outline-none"
            >
              {INITIAL_EMPLOYEES.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name} ({emp.role})
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Tabs (Day, Week, Month, Analytics) */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['day', 'week', 'month', 'analytics'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-slate-800 text-white shadow-card'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'analytics' ? 'Summary Report' : `${mode} View`}
              </button>
            ))}
          </div>

          {/* Date Picker Jumps */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-800 outline-none"
            />
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ─── DAY VIEW CONTENT ─── */}
        {viewMode === 'day' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Daily Scorecard Summary Cards (Employee View / Manager Summary) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Gross Shift Hours (9 AM - 6 PM)</span>
                  <Clock className="w-4 h-4 text-synvora-blue-400" />
                </div>
                <p className="text-2xl font-extrabold text-white">9h 00m</p>
                <p className="text-[11px] text-slate-500">Standard Workday Window</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Net Productive Work</span>
                  <CheckCircle2 className="w-4 h-4 text-synvora-emerald-400" />
                </div>
                <p className="text-2xl font-extrabold text-synvora-emerald-400">
                  {formatMinsToHoursStr(netProductiveMins)}
                </p>
                <p className="text-[11px] text-slate-400">{employeeDailyTasks.length} tasks logged for today</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Registered Break Time</span>
                  <Coffee className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-extrabold text-amber-400">
                  {formatMinsToHoursStr(totalBreakMinsLogged)}
                </p>
                <p className="text-[11px] text-slate-400">{employeeDailyBreaks.length} custom breaks logged</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Target Hours Variance</span>
                  <BarChart3 className="w-4 h-4 text-synvora-blue-400" />
                </div>
                <p className={`text-2xl font-extrabold ${varianceMins >= 0 ? 'text-synvora-emerald-400' : 'text-slate-300'}`}>
                  {varianceMins >= 0 ? `+${formatMinsToHoursStr(varianceMins)}` : `-${formatMinsToHoursStr(Math.abs(varianceMins))}`}
                </p>
                <p className="text-[11px] text-slate-500">vs 9h gross shift baseline</p>
              </div>

            </div>

            {/* Action Bar based on Role */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks, category..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:ring-2 focus:ring-synvora-blue-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-800 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {role === 'employer' ? (
                  <Button onClick={() => setShowAddTaskModal(true)} variant="emerald" size="sm" className="w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    <span>Assign New Task</span>
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => setShowAddBreakModal(true)} variant="outline" size="sm" className="border-amber-700 text-amber-400 w-full sm:w-auto">
                      <Coffee className="w-4 h-4" />
                      <span>Register Break</span>
                    </Button>
                  </>
                )}
              </div>

            </div>

            {/* Main Task List & Daily Break Log Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Task Cards Column */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-synvora-blue-400" />
                    <span>{role === 'employer' ? 'Team Workload & Dispatched Tasks' : `Tasks Assigned to ${activeEmployee}`}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{filteredTasks.length} tasks</span>
                </div>

                {filteredTasks.length === 0 ? (
                  <Card className="p-8 text-center text-slate-400 space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-synvora-emerald-400 mx-auto" />
                    <p className="text-sm font-bold text-white">No tasks found for this view</p>
                    <p className="text-xs">Adjust search filters or use &quot;Assign New Task&quot; above.</p>
                  </Card>
                ) : (
                  filteredTasks.map((t) => (
                    <Card
                      key={t.id}
                      hoverEffect={false}
                      className={`p-5 space-y-4 border-l-4 ${
                        t.priority === 'urgent'
                          ? 'border-l-rose-500'
                          : t.priority === 'high'
                          ? 'border-l-amber-500'
                          : 'border-l-synvora-blue-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold uppercase">
                              {t.category}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              t.priority === 'urgent' ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {t.priority} priority
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">Est: {t.estimatedHours}h</span>
                          </div>

                          <h4 className="text-base font-bold text-white">{t.title}</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t.description}</p>
                        </div>

                        {/* Status Badge */}
                        <div className="text-right flex-shrink-0">
                          {t.status === 'completed' && (
                            <Badge variant="emerald" className="bg-synvora-emerald-950 text-synvora-emerald-300 border-synvora-emerald-800">
                              Completed ({formatMinsToHoursStr(t.actualDurationMins)})
                            </Badge>
                          )}
                          {t.status === 'in_progress' && (
                            <Badge variant="blue" className="bg-synvora-blue-950 text-synvora-blue-300 border-synvora-blue-800 animate-pulse">
                              In Progress
                            </Badge>
                          )}
                          {t.status === 'pending' && (
                            <Badge variant="outline" className="border-slate-700 text-slate-400">
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Employee Controls */}
                      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-4 text-slate-400">
                          <span>Assignee: <strong className="text-white">{t.assignedTo}</strong></span>
                          <span>Target: <strong className="text-slate-300">{t.date}</strong></span>
                        </div>

                        {/* Task Action Triggers */}
                        <div className="flex items-center gap-2">
                          {t.status !== 'completed' && (
                            <>
                              {t.status === 'in_progress' ? (
                                <button
                                  onClick={() => handlePauseTask(t.id)}
                                  className="px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-800"
                                >
                                  <Pause className="w-3.5 h-3.5" />
                                  <span>Pause</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStartTask(t.id)}
                                  className="px-3 py-1.5 rounded-lg bg-synvora-blue-900 hover:bg-synvora-blue-800 text-white font-bold text-xs flex items-center gap-1.5 border border-synvora-blue-700"
                                >
                                  <Play className="w-3.5 h-3.5 text-synvora-emerald-400" />
                                  <span>Start Timer</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleCompleteTask(t.id)}
                                className="px-3 py-1.5 rounded-lg bg-synvora-emerald-950 hover:bg-synvora-emerald-900 text-synvora-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-synvora-emerald-800"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Mark Complete</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {/* Daily Registered Break Log Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-amber-400" />
                    <span>Registered Breaks ({activeEmployee})</span>
                  </h3>
                  <span className="text-xs font-mono text-amber-400">{formatMinsToHoursStr(totalBreakMinsLogged)}</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  {employeeDailyBreaks.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">
                      No breaks registered for {selectedDate}. Use &quot;Register Break&quot; to log custom break times.
                    </p>
                  ) : (
                    employeeDailyBreaks.map((b) => (
                      <div key={b.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{b.type} Break</p>
                          <p className="text-[11px] text-slate-400">{b.startTime} - {b.endTime || 'Active'}</p>
                        </div>
                        <span className="font-mono font-bold text-amber-400">{b.durationMins} mins</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Team Live Oversight Card for Employer */}
                {role === 'employer' && (
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-synvora-blue-400 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Live Team Availability
                    </h4>

                    <div className="space-y-2 text-xs">
                      {INITIAL_EMPLOYEES.map((emp) => {
                        const empActiveTask = tasks.find((t) => t.assignedTo === emp.name && t.status === 'in_progress');
                        const empOnBreak = breaks.find((b) => b.employeeName === emp.name && !b.endTime);

                        return (
                          <div key={emp.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 text-[10px] font-bold flex items-center justify-center">
                                {emp.avatar}
                              </span>
                              <span className="font-semibold text-white">{emp.name}</span>
                            </div>
                            <span className="text-[10px] font-bold">
                              {empActiveTask ? (
                                <span className="text-synvora-blue-400">Working ({empActiveTask.category})</span>
                              ) : empOnBreak ? (
                                <span className="text-amber-400">On Break</span>
                              ) : (
                                <span className="text-slate-500">Available</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ─── WEEK VIEW CONTENT ─── */}
        {viewMode === 'week' && (
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold font-heading text-white">7-Day Work & Break Schedule Grid</h3>
              <span className="text-xs text-slate-400 font-mono">Weekly Time Logs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-synvora-blue-400 uppercase">{day}</span>
                  <div className="pt-2 space-y-1">
                    <p className="text-[11px] text-slate-400">Logged Work: <strong className="text-synvora-emerald-400">7.5h</strong></p>
                    <p className="text-[11px] text-slate-400">Breaks: <strong className="text-amber-400">45m</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MONTH VIEW CONTENT ─── */}
        {viewMode === 'month' && (
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold font-heading text-white">Monthly Workload Matrix</h3>
              <span className="text-xs text-slate-400 font-mono">Executive Monthly Summary</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <span key={d} className="font-bold text-slate-500 py-1">{d}</span>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                  <span className="text-xs font-bold text-white">{i + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-synvora-emerald-400 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── ANALYTICS SUMMARY REPORT VIEW ─── */}
        {viewMode === 'analytics' && (
          <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-2xl font-bold font-heading text-white">Productivity & Time Summary Report</h3>
                <p className="text-xs text-slate-400">Executive analytics across assigned tasks, registered breaks, and velocity metrics.</p>
              </div>
              <Button onClick={handleExportCSV} variant="emerald" size="sm">
                <Download className="w-4 h-4" />
                <span>Export CSV Report</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Work Velocity</span>
                <h4 className="text-3xl font-extrabold text-white">92%</h4>
                <p className="text-slate-400">Tasks completed within estimated hours</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Break Registration Rate</span>
                <h4 className="text-3xl font-extrabold text-amber-400">100% Compliance</h4>
                <p className="text-slate-400">All team breaks registered with exact times</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cloud Storage Sync</span>
                <h4 className="text-3xl font-extrabold text-synvora-emerald-400">LocalStorage + API Ready</h4>
                <p className="text-slate-400">Firebase / Supabase API repository ready</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ─── CREATE TASK MODAL (Employer) ─── */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold font-heading text-white">Assign New Task</h3>
              <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Audit Security WAF Policies"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-synvora-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Detailed task instructions..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-synvora-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Assigned Staff</label>
                  <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    {INITIAL_EMPLOYEES.map((emp) => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value="AI Workflow Optimization">AI Workflow Optimization</option>
                    <option value="Digital Security">Digital Security</option>
                    <option value="Process Digitization">Process Digitization</option>
                    <option value="Administrative">Administrative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Est. Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Target Date</label>
                  <input
                    type="date"
                    value={newTask.targetDate}
                    onChange={(e) => setNewTask({ ...newTask, targetDate: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button onClick={() => setShowAddTaskModal(false)} type="button" variant="outline" size="sm" className="border-slate-700 text-white">
                  Cancel
                </Button>
                <Button type="submit" variant="emerald" size="sm">
                  <span>Dispatch Task</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── REGISTER BREAK MODAL (Employee) ─── */}
      {showAddBreakModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold font-heading text-white">Register Break Times</h3>
              <button onClick={() => setShowAddBreakModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterBreak} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Break Type</label>
                <select
                  value={newBreak.type}
                  onChange={(e) => setNewBreak({ ...newBreak, type: e.target.value as any })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                >
                  <option value="Lunch">Lunch Break</option>
                  <option value="Tea">Tea / Coffee Break</option>
                  <option value="Personal">Personal Break</option>
                  <option value="Other">Other Break</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Start Time (HH:mm)</label>
                  <input
                    type="time"
                    required
                    value={newBreak.startTime}
                    onChange={(e) => setNewBreak({ ...newBreak, startTime: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">End Time (HH:mm)</label>
                  <input
                    type="time"
                    required
                    value={newBreak.endTime}
                    onChange={(e) => setNewBreak({ ...newBreak, endTime: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                Note: Break duration is registered based on your exact start & end times.
              </p>

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button onClick={() => setShowAddBreakModal(false)} type="button" variant="outline" size="sm" className="border-slate-700 text-white">
                  Cancel
                </Button>
                <Button type="submit" variant="emerald" size="sm">
                  <span>Log Break</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
