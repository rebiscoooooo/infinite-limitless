import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    Monitor,
    Smartphone,
    Tablet,
    ShieldAlert,
    CheckCircle2,
    Shield,
    Archive,
    RotateCcw,
    Trash2,
    X,
    Clock,
    User,
    Globe,
    Filter,
    HardDrive,
    Laptop,
} from 'lucide-react';

export default function ActivityLogs({ logs = { data: [] }, counts = {}, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [device, setDevice] = useState(filters.device || '');
    const [currentView, setCurrentView] = useState(filters.view || 'active');

    // Multi-select state
    const [selectedIds, setSelectedIds] = useState([]);

    const logList = logs.data || [];

    const applyFilters = (newParams = {}) => {
        const params = {
            search,
            device,
            view: currentView,
            ...newParams,
        };
        router.get('/admin/activity-logs', params, { preserveState: true, replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleClearSearch = () => {
        setSearch('');
        applyFilters({ search: '' });
    };

    const handleViewChange = (v) => {
        setCurrentView(v);
        setSelectedIds([]);
        applyFilters({ view: v });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(logList.map((l) => l.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleToggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Bulk actions
    const handleBulkArchive = () => {
        if (!selectedIds.length) return;
        if (confirm(`Archive ${selectedIds.length} selected activity log(s)?`)) {
            router.post('/admin/activity-logs/bulk-archive', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleBulkRestore = () => {
        if (!selectedIds.length) return;
        router.post('/admin/activity-logs/bulk-restore', { ids: selectedIds }, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleBulkDelete = () => {
        if (!selectedIds.length) return;
        if (confirm(`WARNING: Are you sure you want to PERMANENTLY delete ${selectedIds.length} selected activity log(s) from the database? This cannot be undone.`)) {
            router.delete('/admin/activity-logs/bulk-delete', {
                data: { ids: selectedIds },
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const getDeviceIcon = (dev) => {
        if (!dev) return Monitor;
        const d = dev.toLowerCase();
        if (d.includes('mobile') || d.includes('phone') || d.includes('android') || d.includes('iphone')) return Smartphone;
        if (d.includes('tablet') || d.includes('ipad')) return Tablet;
        return Monitor;
    };

    return (
        <AdminLayout title="Security Audit & Activity Logs">
            <Head title="Security & Activity Audit Logs | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Top Header Card */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-teal-950/30 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                System Security &amp; Compliance
                            </span>
                            <span className="text-xs text-slate-500">&bull;</span>
                            <span className="text-xs text-slate-400 font-medium">Immutable Audit Trail</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            <Shield className="w-6 h-6 text-teal-400" />
                            Activity &amp; Audit Logs
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Chronological history of administrator operations, status updates, security events, and IP addresses.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Logging Active
                        </span>
                    </div>
                </div>

                {/* 4 Top KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* KPI 1: Total Logs */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-teal-500/50 hover:shadow-teal-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-teal-400 before:to-emerald-400">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Total Audit Records
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform shadow-inner">
                                <HardDrive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                                System Audit
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Security Trail</span>
                            <span className="text-teal-400 font-mono text-[11px]">{counts.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 2: Active Logs */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Active Audit Logs
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-emerald-400 tracking-wide">
                                {counts.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                Live Logs
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Active Session Stream</span>
                            <span className="text-emerald-400 font-bold text-[11px]">Monitoring</span>
                        </div>
                    </div>

                    {/* KPI 3: Today's Events */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-sky-500/50 hover:shadow-sky-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-sky-400 before:to-blue-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Today's Actions
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-sky-400 tracking-wide">
                                {counts.today || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                                Past 24h
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Realtime Activity</span>
                            <span className="text-sky-400 font-bold text-[11px]">Recorded</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Entries */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Archived Entries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-amber-400 tracking-wide">
                                {counts.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                Archived
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Archived Records</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Filter and Controls Container */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
                    {/* View Switcher Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                            <button
                                type="button"
                                onClick={() => handleViewChange('active')}
                                className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                                    currentView === 'active'
                                        ? 'bg-teal-500 text-slate-950 font-bold shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active Logs</span>
                                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/40 text-inherit">
                                    {counts.active || 0}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                                    currentView === 'archived'
                                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archived</span>
                                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/40 text-inherit">
                                    {counts.archived || 0}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('all')}
                                className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                                    currentView === 'all'
                                        ? 'bg-white/20 text-white font-bold shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <HardDrive className="w-3.5 h-3.5" />
                                <span>All Logs</span>
                                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-inherit">
                                    {counts.total || 0}
                                </span>
                            </button>
                        </div>

                        <div className="text-xs text-slate-400 font-medium">
                            Displaying <strong className="text-white">{logList.length}</strong> log event(s)
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search action, administrator, IP address..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </form>

                        {/* Device Filter Buttons */}
                        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                            <button
                                type="button"
                                onClick={() => {
                                    setDevice('');
                                    applyFilters({ device: '' });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all ${
                                    !device ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white bg-transparent'
                                }`}
                            >
                                All Devices
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setDevice('Desktop PC');
                                    applyFilters({ device: 'Desktop PC' });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all flex items-center gap-1 ${
                                    device === 'Desktop PC'
                                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                                        : 'text-slate-400 hover:text-white bg-transparent'
                                }`}
                            >
                                <Monitor className="w-3.5 h-3.5" />
                                <span>Desktop</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setDevice('Mobile Phone');
                                    applyFilters({ device: 'Mobile Phone' });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all flex items-center gap-1 ${
                                    device === 'Mobile Phone'
                                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                                        : 'text-slate-400 hover:text-white bg-transparent'
                                }`}
                            >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>Mobile</span>
                            </button>
                        </div>
                    </div>

                    {/* DESKTOP DATA TABLE (md:block) */}
                    <div className="hidden md:block overflow-hidden border border-slate-800 rounded-xl bg-slate-950/40">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider font-bold">
                                    <th className="p-3.5 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={logList.length > 0 && selectedIds.length === logList.length}
                                            onChange={handleSelectAll}
                                            className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400"
                                            title="Select all logs"
                                        />
                                    </th>
                                    <th className="p-3.5 whitespace-nowrap">Timestamp</th>
                                    <th className="p-3.5">Administrator</th>
                                    <th className="p-3.5">Action Performed</th>
                                    <th className="p-3.5">Device Type</th>
                                    <th className="p-3.5">OS &amp; Browser</th>
                                    <th className="p-3.5">IP Address</th>
                                    <th className="p-3.5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                {logList.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="p-12 text-center text-slate-500">
                                            <ShieldAlert className="w-10 h-10 mx-auto mb-2 text-slate-600 opacity-60" />
                                            <p className="text-sm font-bold text-slate-300">No activity logs recorded</p>
                                            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords</p>
                                        </td>
                                    </tr>
                                ) : (
                                    logList.map((log) => {
                                        const DeviceIcon = getDeviceIcon(log.device_type);
                                        const isSelected = selectedIds.includes(log.id);
                                        const dateStr = new Date(log.created_at).toLocaleDateString('en-PH', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });

                                        return (
                                            <tr
                                                key={log.id}
                                                className={`transition-colors ${
                                                    isSelected ? 'bg-teal-950/30' : 'hover:bg-slate-800/30'
                                                }`}
                                            >
                                                <td className="p-3.5 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(log.id)}
                                                        className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400"
                                                    />
                                                </td>

                                                <td className="p-3.5 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                                                    {dateStr}
                                                </td>

                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                                                            {(log.admin_user || 'A').charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-bold text-white text-xs">
                                                            {log.admin_user}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="p-3.5">
                                                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold inline-block text-[11px]">
                                                        {log.action_type}
                                                    </span>
                                                </td>

                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        <DeviceIcon className="w-4 h-4 text-slate-400" />
                                                        <span>{log.device_type || 'Desktop PC'}</span>
                                                    </div>
                                                </td>

                                                <td className="p-3.5 max-w-xs truncate text-slate-400 text-[11px]">
                                                    {log.os_browser || 'Unknown Client'}
                                                </td>

                                                <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                                                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                                                        {log.ip_address}
                                                    </span>
                                                </td>

                                                <td className="p-3.5 text-right whitespace-nowrap">
                                                    {log.archived_at ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                                                            <Archive className="w-3 h-3" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                            <span>{log.status || 'Success'}</span>
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE TOUCH-FRIENDLY CARD VIEW (md:hidden) */}
                    <div className="md:hidden space-y-3">
                        {logList.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                                <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-bold text-white">No logs found</p>
                            </div>
                        ) : (
                            logList.map((log) => {
                                const DeviceIcon = getDeviceIcon(log.device_type);
                                const isSelected = selectedIds.includes(log.id);
                                const dateStr = new Date(log.created_at).toLocaleDateString('en-PH', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });

                                return (
                                    <div
                                        key={log.id}
                                        className={`p-4 rounded-xl border transition-all ${
                                            isSelected
                                                ? 'bg-teal-950/30 border-teal-500/40'
                                                : 'bg-slate-950/60 border-slate-800'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleToggleSelect(log.id)}
                                                    className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400 shrink-0"
                                                />
                                                <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-bold text-xs">
                                                    {log.action_type}
                                                </span>
                                            </div>

                                            {log.archived_at ? (
                                                <span className="text-[10px] font-bold text-amber-400">Archived</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    {log.status || 'Success'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Admin</div>
                                                <div className="text-white font-medium truncate">{log.admin_user}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Device</div>
                                                <div className="flex items-center gap-1 text-slate-300 font-medium">
                                                    <DeviceIcon className="w-3.5 h-3.5 text-slate-400" />
                                                    <span className="truncate">{log.device_type || 'Desktop PC'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-xs text-slate-400 truncate font-mono text-[11px]">
                                            {log.os_browser || 'Unknown Client'}
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                                            <span>IP: {log.ip_address}</span>
                                            <span>{dateStr}</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Pagination */}
                    {logs.links && logs.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
                            <div>
                                Showing <strong className="text-white">{logs.from || 0}</strong> to{' '}
                                <strong className="text-white">{logs.to || 0}</strong> of{' '}
                                <strong className="text-white">{logs.total || 0}</strong> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {logs.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition-all border-0 ${
                                            link.active
                                                ? 'bg-teal-500 text-slate-950 font-bold'
                                                : 'bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FIXED BOTTOM FLOATING BULK ACTIONS TOOLBAR */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-teal-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                            {selectedIds.length}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                            Activity Log(s) Selected
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {currentView === 'archived' ? (
                            <button
                                type="button"
                                onClick={handleBulkRestore}
                                className="btn btn-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBulkArchive}
                                className="btn btn-sm bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow"
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archive</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleBulkDelete}
                            className="btn btn-sm bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="btn btn-sm bg-slate-800 text-slate-400 hover:text-white rounded-xl px-2.5 py-1.5 text-xs border border-slate-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
