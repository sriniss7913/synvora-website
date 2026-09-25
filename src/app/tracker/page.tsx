'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  TrackerTask,
  BreakLog,
  EmployeeProfile,
  getStoredEmployees,
  saveStoredEmployees,
  fetchCloudEmployees,
  getStoredTasks,
  saveStoredTasks,
  fetchCloudTasks,
  getStoredBreaks,
  saveStoredBreaks,
  fetchCloudBreaks,
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
  Trash2,
  Database,
  UserPlus,
  HelpCircle,
} from 'lucide-react';

export default function TrackerPage() {
  const [role, setRole] = useState<'employer' | 'employee'>('employer');
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [activeEmployee, setActiveEmployee] = useState<string>('');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'analytics'>('day');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [tasks, setTasks] = useState<TrackerTask[]>([]);
  const [breaks, setBreaks] = useState<BreakLog[]>([]);

  // Timer state for active task
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Modals state
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddBreakModal, setShowAddBreakModal] = useState(false);
  const [showManageTeamModal, setShowManageTeamModal] = useState(false);
  const [showDbGuideModal, setShowDbGuideModal] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form state for new employee
  const [newEmp, setNewEmp] = useState({ name: '', role: '' });

  // Form states for creating task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
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

  // Imports for cloud sync
  const loadCloudData = async () => {
    try {
      const [cloudEmps, cloudTasks, cloudBreaks] = await Promise.all([
        fetchCloudEmployees(),
        fetchCloudTasks(),
        fetchCloudBreaks(),
      ]);

      if (cloudEmps.length > 0) {
        setEmployees(cloudEmps);
        setActiveEmployee((prev) => prev || cloudEmps[0].name);
      }
      if (cloudTasks.length > 0) setTasks(cloudTasks);
      if (cloudBreaks.length > 0) setBreaks(cloudBreaks);
    } catch (err) {
      console.error('Error fetching cloud data:', err);
    }
  };

  // Load stored data on mount & start 5-second cloud sync interval
  useEffect(() => {
    // 1. Initial Local load
    const loadedEmps = getStoredEmployees();
    setEmployees(loadedEmps);
    if (loadedEmps.length > 0) {
      setActiveEmployee((prev) => prev || loadedEmps[0].name);
      setNewTask((prev) => ({ ...prev, assignedTo: loadedEmps[0].name }));
    }
    setTasks(getStoredTasks());
    setBreaks(getStoredBreaks());

    // 2. Fetch live Cloud data immediately
    loadCloudData();

    // 3. Set up periodic 5-second polling for live multi-device sync
    const interval = setInterval(() => {
      loadCloudData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sync state helpers
  const updateEmployees = (updated: EmployeeProfile[]) => {
    setEmployees(updated);
    saveStoredEmployees(updated);
    if (updated.length > 0 && !updated.some((e) => e.name === activeEmployee)) {
      setActiveEmployee(updated[0].name);
    }
  };

  const updateTasks = (updated: TrackerTask[]) => {
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const updateBreaks = (updated: BreakLog[]) => {
    setBreaks(updated);
    saveStoredBreaks(updated);
  };

  // Add Employee Handler
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name.trim()) return;

    const initials = newEmp.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const created: EmployeeProfile = {
      id: `emp-${Date.now()}`,
      name: newEmp.name.trim(),
      role: newEmp.role.trim() || 'Team Member',
      avatar: initials || 'EM',
    };

    const updated = [...employees, created];
    updateEmployees(updated);
    setNewEmp({ name: '', role: '' });
    if (!activeEmployee) setActiveEmployee(created.name);
  };

  // Remove Employee Handler
  const handleRemoveEmployee = (empId: string) => {
    const target = employees.find((e) => e.id === empId);
    if (!target) return;
    const updated = employees.filter((e) => e.id !== empId);
    updateEmployees(updated);
  };

  // Task creation handler
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.assignedTo) return;

    const created: TrackerTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedBy: 'Employer',
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
      assignedTo: employees[0]?.name || '',
      category: 'AI Workflow Optimization',
      priority: 'medium',
      estimatedHours: 2.0,
      targetDate: selectedDate,
    });
    setShowAddTaskModal(false);
  };

  // Delete Task Handler
  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    updateTasks(updated);
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

  // Delete Break Handler
  const handleDeleteBreak = (breakId: string) => {
    const updated = breaks.filter((b) => b.id !== breakId);
    updateBreaks(updated);
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
      
      {/* Top Header & Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="emerald">Workload & Time Module</Badge>
              <span className="text-xs font-mono text-slate-400">Clean Slate System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Synvora Job & Time Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Dynamic employee management, task dispatching, precision time logging, & break registration.
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
                <span>Employer View</span>
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
                <span>Employee View</span>
              </button>
            </div>

            {/* Manage Team Button */}
            <Button onClick={() => setShowManageTeamModal(true)} variant="outline" size="sm" className="border-slate-700 text-white">
              <UserPlus className="w-4 h-4 text-synvora-emerald-400" />
              <span>Manage Team ({employees.length})</span>
            </Button>

            {/* Cloud Database Guide Trigger */}
            <button
              onClick={() => setShowDbGuideModal(true)}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-synvora-blue-400 hover:text-white transition-colors"
              title="Cloud Database Connection Guide"
            >
              <Database className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-Header: Active Employee Selector & Date Controls */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Active Employee Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff:</span>
            {employees.length === 0 ? (
              <span className="text-xs text-rose-400 font-bold italic">No staff added yet. Click &quot;Manage Team&quot; to add employees.</span>
            ) : (
              <select
                value={activeEmployee}
                onChange={(e) => setActiveEmployee(e.target.value)}
                className="bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-800 focus:ring-2 focus:ring-synvora-blue-600 outline-none"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            )}
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
            
            {/* Daily Scorecard Summary Cards */}
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
                  <Button
                    onClick={() => {
                      if (employees.length === 0) {
                        setShowManageTeamModal(true);
                      } else {
                        setShowAddTaskModal(true);
                      }
                    }}
                    variant="emerald"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign New Task</span>
                  </Button>
                ) : (
                  <Button onClick={() => setShowAddBreakModal(true)} variant="outline" size="sm" className="border-amber-700 text-amber-400 w-full sm:w-auto">
                    <Coffee className="w-4 h-4" />
                    <span>Register Break</span>
                  </Button>
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
                    <span>{role === 'employer' ? 'Team Workload & Dispatched Tasks' : `Tasks Assigned to ${activeEmployee || 'Select Staff'}`}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{filteredTasks.length} tasks</span>
                </div>

                {filteredTasks.length === 0 ? (
                  <Card className="p-8 text-center text-slate-400 space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-synvora-emerald-400 mx-auto" />
                    <p className="text-base font-bold text-white">Clean Slate — No Active Tasks</p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {employees.length === 0
                        ? 'Click "Manage Team" above to add your employees, then assign your first daily task.'
                        : 'Click "Assign New Task" to dispatch work to your team members.'}
                    </p>
                    {role === 'employer' && (
                      <div className="pt-2">
                        <Button onClick={() => setShowAddTaskModal(true)} variant="emerald" size="sm">
                          <Plus className="w-4 h-4" />
                          <span>Dispatch First Task</span>
                        </Button>
                      </div>
                    )}
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

                        {/* Status Badge & Delete Button */}
                        <div className="text-right flex-shrink-0 space-y-2">
                          <div>
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

                          {role === 'employer' && (
                            <button
                              onClick={() => handleDeleteTask(t.id)}
                              className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                              title="Delete Task"
                            >
                              <Trash2 className="w-4 h-4 ml-auto" />
                            </button>
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
                    <span>Registered Breaks ({activeEmployee || 'None'})</span>
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
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">{b.durationMins} mins</span>
                          <button onClick={() => handleDeleteBreak(b.id)} className="text-slate-500 hover:text-rose-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Team Live Oversight Card for Employer */}
                {role === 'employer' && (
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 pt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-synvora-blue-400 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Live Team Members ({employees.length})
                      </h4>
                      <button onClick={() => setShowManageTeamModal(true)} className="text-xs text-synvora-emerald-400 font-bold hover:underline">
                        + Add Staff
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      {employees.length === 0 ? (
                        <p className="text-xs text-slate-500 italic">No employees added. Click &quot;+ Add Staff&quot; above.</p>
                      ) : (
                        employees.map((emp) => {
                          const empActiveTask = tasks.find((t) => t.assignedTo === emp.name && t.status === 'in_progress');
                          const empOnBreak = breaks.find((b) => b.employeeName === emp.name && !b.endTime);

                          return (
                            <div key={emp.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 text-[10px] font-bold flex items-center justify-center">
                                  {emp.avatar}
                                </span>
                                <div>
                                  <p className="font-semibold text-white">{emp.name}</p>
                                  <p className="text-[10px] text-slate-500">{emp.role}</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold">
                                {empActiveTask ? (
                                  <span className="text-synvora-blue-400">Working</span>
                                ) : empOnBreak ? (
                                  <span className="text-amber-400">On Break</span>
                                ) : (
                                  <span className="text-slate-500 font-normal">Available</span>
                                )}
                              </span>
                            </div>
                          );
                        })
                      )}
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
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-synvora-blue-400 uppercase">{day}</span>
                  <div className="pt-2 space-y-1">
                    <p className="text-[11px] text-slate-400">Tasks Logged: <strong className="text-white">{filteredTasks.length}</strong></p>
                    <p className="text-[11px] text-slate-400">Breaks: <strong className="text-amber-400">{formatMinsToHoursStr(totalBreakMinsLogged)}</strong></p>
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
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Active Employees</span>
                <h4 className="text-3xl font-extrabold text-white">{employees.length} Members</h4>
                <p className="text-slate-400">Registered staff profiles in system</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dispatched Tasks</span>
                <h4 className="text-3xl font-extrabold text-synvora-blue-400">{tasks.length} Tasks</h4>
                <p className="text-slate-400">Recorded across all project categories</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Break Logs</span>
                <h4 className="text-3xl font-extrabold text-amber-400">{breaks.length} Breaks</h4>
                <p className="text-slate-400">Custom registered break entries</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ─── MANAGE TEAM / ADD-REMOVE EMPLOYEES MODAL ─── */}
      {showManageTeamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-synvora-emerald-400" />
                  <span>Manage Team Members</span>
                </h3>
                <p className="text-xs text-slate-400">Add or remove employees from your workspace.</p>
              </div>
              <button onClick={() => setShowManageTeamModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Add Employee Form */}
            <form onSubmit={handleAddEmployee} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Add New Staff Member</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  placeholder="Full Name (e.g. Rahul Sharma)"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-synvora-emerald-600"
                />
                <input
                  type="text"
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  placeholder="Role / Title (e.g. AI Engineer)"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-synvora-emerald-600"
                />
              </div>
              <Button type="submit" variant="emerald" size="sm" className="w-full">
                <UserPlus className="w-4 h-4" />
                <span>Add Employee</span>
              </Button>
            </form>

            {/* Employee List with Remove Trigger */}
            <div className="space-y-2 text-xs max-h-64 overflow-y-auto pr-1">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider">Current Team ({employees.length})</h4>
              {employees.length === 0 ? (
                <p className="text-slate-500 italic py-2 text-center">No employees added yet.</p>
              ) : (
                employees.map((emp) => (
                  <div key={emp.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center border border-slate-700">
                        {emp.avatar}
                      </span>
                      <div>
                        <p className="font-bold text-white">{emp.name}</p>
                        <p className="text-[11px] text-slate-400">{emp.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveEmployee(emp.id)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors border border-slate-800"
                      title="Remove Employee"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button onClick={() => setShowManageTeamModal(false)} variant="outline" size="sm" className="border-slate-700 text-white">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CLOUD DATABASE CONNECTION GUIDE MODAL ─── */}
      {showDbGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-slate-800 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-synvora-blue-400">
                <Database className="w-6 h-6" />
                <h3 className="text-xl font-bold font-heading text-white">Cloud Database Integration Guide</h3>
              </div>
              <button onClick={() => setShowDbGuideModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Currently, your Job & Time Tracker records data in <strong>`localStorage`</strong> for instant zero-setup local storage. To synchronize data live across multiple devices/laptops/phones over the cloud, follow these step-by-step instructions:
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-synvora-emerald-400 text-sm">Option A: Firebase Firestore (Real-Time NoSQL)</h4>
                <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                  <li>Create a free Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-synvora-blue-400 underline">console.firebase.google.com</a>.</li>
                  <li>Enable <strong>Cloud Firestore</strong> database and copy your Firebase SDK config keys into <code className="text-white">.env.local</code>.</li>
                  <li>In <code className="text-white">src/lib/trackerStore.ts</code>, replace the <code className="text-white">localStorage</code> methods with <code className="text-white">onSnapshot()</code> for real-time live sync!</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-synvora-blue-400 text-sm">Option B: Supabase (PostgreSQL)</h4>
                <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                  <li>Create a free Supabase database at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-synvora-blue-400 underline">supabase.com</a>.</li>
                  <li>Create <code className="text-white">tasks</code>, <code className="text-white">breaks</code>, and <code className="text-white">employees</code> tables.</li>
                  <li>Use <code className="text-white">@supabase/supabase-js</code> client to query and persist records directly.</li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button onClick={() => setShowDbGuideModal(false)} variant="emerald" size="sm">
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}

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
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">Assigned Staff *</label>
                  {employees.length === 0 ? (
                    <p className="text-rose-400 text-[11px] font-bold pt-2">Please add employees first!</p>
                  ) : (
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                      ))}
                    </select>
                  )}
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
                <Button type="submit" variant="emerald" size="sm" disabled={employees.length === 0}>
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
