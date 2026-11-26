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
    Sparkles,
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
        <AdminLayout
            title="Security Audit & Activity Logs"
            subtitle="Chronological history of administrator operations, status updates, security events, and IP addresses"
        >
            <Head title="Security & Activity Audit Logs | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Top Header Card */}
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-white border border-slate-200/90 shadow-xs overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#0f766e] shrink-0" />
                            <span>System Security &amp; Compliance</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Shield className="w-6 h-6 text-[#0f766e]" />
                            <span>Activity &amp; Audit Logs</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                            Chronological history of administrator operations, status updates, security events, and IP addresses.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
                            <span>Logging Active</span>
                        </span>
                    </div>
                </div>

                {/* 4 Top KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                    {/* KPI 1: Total Logs */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs border-l-4 border-l-[#0f766e] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Total Audit Records
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0f766e] shadow-xs">
                                <HardDrive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200">
                                System Audit
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Security Trail</span>
                            <span className="text-[#0f766e] font-mono text-[11px] font-semibold">{counts.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 2: Active Logs */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs border-l-4 border-l-emerald-500 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Active Audit Logs
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                                {counts.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Live Logs
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Active Session Stream</span>
                            <span className="text-emerald-700 font-bold text-[11px]">Monitoring</span>
                        </div>
                    </div>

                    {/* KPI 3: Today's Events */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs border-l-4 border-l-sky-500 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Today's Actions
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-sky-700 tracking-tight">
                                {counts.today || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                                Past 24h
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Realtime Activity</span>
                            <span className="text-sky-700 font-bold text-[11px]">Recorded</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Entries */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs border-l-4 border-l-[#f59e0b] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Archived Entries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#f59e0b] shadow-xs">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">
                                {counts.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                Archived
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Archived Records</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Filter and Controls Container */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
                    {/* View Switcher Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
                            <button
                                type="button"
                                onClick={() => handleViewChange('active')}
                                className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'active'
                                        ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active Logs</span>
                                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                                    currentView === 'active' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                    {counts.active || 0}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'archived'
                                        ? 'bg-[#f59e0b] text-slate-900 font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archived</span>
                                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                                    currentView === 'archived' ? 'bg-slate-900/10 text-slate-950 font-bold' : 'bg-slate-200 text-slate-700'
                                }`}>
                                    {counts.archived || 0}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('all')}
                                className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'all'
                                        ? 'bg-slate-800 text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <HardDrive className="w-3.5 h-3.5" />
                                <span>All Logs</span>
                                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                                    currentView === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                    {counts.total || 0}
                                </span>
                            </button>
                        </div>

                        <div className="text-xs text-slate-500 font-medium">
                            Displaying <strong className="text-slate-900">{logList.length}</strong> log event(s)
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search action, administrator, IP address..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </form>

                        {/* Device Filter Buttons */}
                        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shrink-0">
                            <button
                                type="button"
                                onClick={() => {
                                    setDevice('');
                                    applyFilters({ device: '' });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                    !device ? 'bg-[#0f766e] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all flex items-center gap-1 cursor-pointer ${
                                    device === 'Desktop PC'
                                        ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all flex items-center gap-1 cursor-pointer ${
                                    device === 'Mobile Phone'
                                        ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>Mobile</span>
                            </button>
                        </div>
                    </div>

                    {/* DESKTOP DATA TABLE (md:block) */}
                    <div className="hidden md:block overflow-x-auto border border-slate-200/90 rounded-xl bg-white">
                        <table className="w-full text-left border-collapse text-xs min-w-[760px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase tracking-wider font-bold text-[11px]">
                                    <th className="p-3.5 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={logList.length > 0 && selectedIds.length === logList.length}
                                            onChange={handleSelectAll}
                                            className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
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
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {logList.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="p-12 text-center text-slate-500">
                                            <ShieldAlert className="w-10 h-10 mx-auto mb-2 text-slate-400 opacity-60" />
                                            <p className="text-sm font-bold text-slate-800">No activity logs recorded</p>
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
                                                    isSelected ? 'bg-teal-50/70 border-l-4 border-l-[#0f766e]' : 'hover:bg-slate-50/70'
                                                }`}
                                            >
                                                <td className="p-3.5 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(log.id)}
                                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                                    />
                                                </td>

                                                <td className="p-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                                                    {dateStr}
                                                </td>

                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 text-[#0f766e] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                                            {(log.admin_user || 'A').charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-bold text-slate-900 text-xs">
                                                            {log.admin_user}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="p-3.5">
                                                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0f766e] border border-teal-200 font-semibold inline-block text-[11px]">
                                                        {log.action_type}
                                                    </span>
                                                </td>

                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-2 text-slate-700">
                                                        <DeviceIcon className="w-4 h-4 text-slate-400 shrink-0" />
                                                        <span>{log.device_type || 'Desktop PC'}</span>
                                                    </div>
                                                </td>

                                                <td className="p-3.5 max-w-xs truncate text-slate-500 text-[11px]">
                                                    {log.os_browser || 'Unknown Client'}
                                                </td>

                                                <td className="p-3.5 font-mono text-slate-700 text-[11px]">
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                                                        {log.ip_address}
                                                    </span>
                                                </td>

                                                <td className="p-3.5 text-right whitespace-nowrap">
                                                    {log.archived_at ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                                                            <Archive className="w-3 h-3 text-[#f59e0b]" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
                            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                                <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-bold text-slate-800">No logs found</p>
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
                                                ? 'bg-teal-50/70 border-[#0f766e] shadow-md'
                                                : 'bg-white border-slate-200/90 shadow-xs'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleToggleSelect(log.id)}
                                                    className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] shrink-0"
                                                />
                                                <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0f766e] border border-teal-200 font-bold text-xs">
                                                    {log.action_type}
                                                </span>
                                            </div>

                                            {log.archived_at ? (
                                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Archived</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    {log.status || 'Success'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Admin</div>
                                                <div className="text-slate-900 font-medium truncate">{log.admin_user}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Device</div>
                                                <div className="flex items-center gap-1 text-slate-700 font-medium">
                                                    <DeviceIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span className="truncate">{log.device_type || 'Desktop PC'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-xs text-slate-500 truncate font-mono text-[11px]">
                                            {log.os_browser || 'Unknown Client'}
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
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
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs text-slate-500">
                            <div>
                                Showing <strong className="text-slate-900">{logs.from || 0}</strong> to{' '}
                                <strong className="text-slate-900">{logs.to || 0}</strong> of{' '}
                                <strong className="text-slate-900">{logs.total || 0}</strong> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {logs.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition-all border-0 cursor-pointer ${
                                            link.active
                                                ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                                : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 disabled:opacity-30'
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
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-[#14b8a6] text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
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
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer transition-all"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBulkArchive}
                                className="bg-[#f59e0b] hover:bg-amber-600 text-slate-950 font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer transition-all"
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archive</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleBulkDelete}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer transition-all"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="bg-slate-800 text-slate-300 hover:text-white rounded-xl px-2.5 py-1.5 text-xs border border-slate-700 cursor-pointer transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
