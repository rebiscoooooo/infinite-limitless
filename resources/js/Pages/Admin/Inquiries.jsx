import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    Mail,
    Trash2,
    CheckCircle2,
    Circle,
    Reply,
    BookOpen,
    Send,
    X,
    Archive,
    RotateCcw,
    Sparkles,
    User,
    Calendar,
    MessageSquare,
    Check,
    Inbox,
    Clock,
    ArrowUpRight,
    Shield,
} from 'lucide-react';

export default function Inquiries({ inquiries = { data: [] }, counts = {}, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [currentView, setCurrentView] = useState(filters.view || 'active');

    // Selection
    const [selectedIds, setSelectedIds] = useState([]);

    // Modals
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [replyInquiry, setReplyInquiry] = useState(null);
    const [replySubject, setReplySubject] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    const inquiryList = inquiries.data || [];

    const applyFilters = (newParams = {}) => {
        const params = {
            search,
            status,
            view: currentView,
            ...newParams,
        };
        router.get('/admin/inquiries', params, { preserveState: true, replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleViewChange = (v) => {
        setCurrentView(v);
        setSelectedIds([]);
        applyFilters({ view: v });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(inquiryList.map((i) => i.id));
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
        if (confirm(`Archive ${selectedIds.length} selected customer inquiry/inquiries?`)) {
            router.post('/admin/inquiries/bulk-archive', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleBulkRestore = () => {
        if (!selectedIds.length) return;
        router.post('/admin/inquiries/bulk-restore', { ids: selectedIds }, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleBulkDelete = () => {
        if (!selectedIds.length) return;
        if (confirm(`WARNING: Are you sure you want to PERMANENTLY delete ${selectedIds.length} selected inquiry/inquiries from the database? This cannot be undone.`)) {
            router.post('/admin/inquiries/bulk-delete', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    // Single item actions
    const toggleRead = (id) => {
        router.patch(`/admin/inquiries/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Permanently delete inquiry from "${name}"?`)) {
            router.delete(`/admin/inquiries/${id}`, { preserveScroll: true });
        }
    };

    const openViewModal = (inq) => {
        setSelectedInquiry(inq);
        if (!inq.is_read) {
            router.patch(`/admin/inquiries/${inq.id}/toggle-read`, {}, { preserveScroll: true });
        }
    };

    const openReplyModal = (inq) => {
        setReplyInquiry(inq);
        setReplySubject(`Re: ${inq.subject || 'Your Inquiry to Infinite Live Limitless'}`);
        setReplyMessage(`Dear ${inq.name},\n\nThank you for contacting Infinite Live Limitless regarding "${inq.subject || 'your inquiry'}".\n\n\n\nWarm regards,\nINFINITE Executive Support Team\ninfinitelimitless123@gmail.com`);
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyInquiry) return;

        setIsSubmittingReply(true);
        router.post(
            `/admin/inquiries/${replyInquiry.id}/reply`,
            {
                reply_subject: replySubject,
                reply_message: replyMessage,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmittingReply(false);
                    setReplyInquiry(null);
                    setReplySubject('');
                    setReplyMessage('');
                },
                onError: () => {
                    setIsSubmittingReply(false);
                },
            }
        );
    };

    return (
        <AdminLayout
            title="Customer Inquiries & Messages"
            subtitle="Review incoming inquiries, send direct email replies, and archive or manage records"
        >
            <Head title="Contact Inquiries | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* 4 HIGH-IMPACT KPI STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* KPI 1: Total Messages */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-teal-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono truncate">
                                Total Inquiries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200 shrink-0">
                                All Lifetime
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Contact Submissions</span>
                            <span className="text-slate-700 font-mono text-[11px] font-bold">{counts.active || 0} active inbox</span>
                        </div>
                    </div>

                    {/* KPI 2: Unread Messages */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-amber-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#f59e0b,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-mono truncate">
                                Unread Attention
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-600 font-mono tracking-tight">
                                {counts.unread || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                                Needs Reply
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Direct Support Queue</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('unread');
                                    applyFilters({ status: 'unread' });
                                }}
                                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>Filter Unread</span>
                                <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 3: Active Inbox */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-teal-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono truncate">
                                Active Inquiries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                                {counts.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200 shrink-0">
                                Main Inbox
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Standard Pipeline</span>
                            <span className="text-[#0f766e] font-bold text-[11px]">Operational</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Inquiries */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-purple-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#a855f7,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider font-mono truncate">
                                Archived Inquiries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs shrink-0">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-purple-700 font-mono tracking-tight">
                                {counts.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200 shrink-0">
                                Archived
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Archived Records</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-purple-700 hover:text-purple-800 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Tabs: Active | Archived | All */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200 text-xs font-semibold shadow-inner">
                        <button
                            type="button"
                            onClick={() => handleViewChange('active')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'active'
                                    ? 'bg-[#0f766e] text-white font-extrabold shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            Active Messages ({counts.active || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleViewChange('archived')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'archived'
                                    ? 'bg-amber-500 text-white font-extrabold shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            Archived ({counts.archived || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleViewChange('all')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'all'
                                    ? 'bg-slate-800 text-white font-extrabold shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            All ({counts.total || 0})
                        </button>
                    </div>

                    <div className="text-xs text-slate-500">
                        Showing <strong className="text-slate-900">{inquiryList.length}</strong> of <strong className="text-slate-900">{inquiries.total || 0}</strong> messages
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by sender name, email, subject, or message content..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 transition-all"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    applyFilters({ search: '' });
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-transparent border-0 cursor-pointer p-0.5"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto shrink-0">
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('');
                                applyFilters({ status: '' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === '' ? 'bg-white text-slate-900 font-bold border border-slate-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            All Status
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('unread');
                                applyFilters({ status: 'unread' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === 'unread' ? 'bg-amber-100 text-amber-800 font-bold border border-amber-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            Unread ({counts.unread || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('read');
                                applyFilters({ status: 'read' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === 'read' ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            Read
                        </button>
                    </div>
                </div>

                {/* Floating Bottom Bulk Action Toolbar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-white/95 backdrop-blur-xl border border-teal-300 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0f766e]">
                            <span className="w-6 h-6 rounded-lg bg-[#0f766e] text-white font-black flex items-center justify-center text-xs shadow-xs">
                                {selectedIds.length}
                            </span>
                            <span>inquiry/inquiries selected</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {currentView === 'archived' ? (
                                <button
                                    type="button"
                                    onClick={handleBulkRestore}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all border-0 shadow-xs cursor-pointer"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Restore</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleBulkArchive}
                                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all border-0 shadow-xs cursor-pointer"
                                >
                                    <Archive className="w-3.5 h-3.5" />
                                    <span>Archive</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleBulkDelete}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all border-0 shadow-xs cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedIds([])}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs border border-slate-300 cursor-pointer"
                            >
                                Deselect
                            </button>
                        </div>
                    </div>
                )}

                {/* 1. DESKTOP TABLE VIEW (Clean White Table) */}
                <div className="hidden md:block rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs min-w-[850px]">
                            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold text-[11px] border-b border-slate-200">
                                <tr>
                                    <th className="py-4 px-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={inquiryList.length > 0 && selectedIds.length === inquiryList.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-slate-300 bg-white text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4">Sender Info</th>
                                    <th className="py-4 px-4">Subject</th>
                                    <th className="py-4 px-4">Message Snippet</th>
                                    <th className="py-4 px-4">Date</th>
                                    <th className="py-4 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {inquiryList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-slate-400">
                                            <Mail className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-400" />
                                            <span className="text-sm font-semibold block text-slate-700">No inquiries matching criteria found.</span>
                                            <span className="text-xs text-slate-500 mt-1 block">Try clearing search or switching between Active and Archived tabs.</span>
                                        </td>
                                    </tr>
                                ) : (
                                    inquiryList.map((inq) => {
                                        const isSelected = selectedIds.includes(inq.id);
                                        const dateStr = new Date(inq.created_at).toLocaleDateString('en-PH', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });
                                        const snippet = inq.message && inq.message.length > 60 ? inq.message.substring(0, 60) + '...' : inq.message || '';
                                        const senderInitial = inq.name ? inq.name.charAt(0).toUpperCase() : 'U';

                                        return (
                                            <tr
                                                key={inq.id}
                                                className={`transition-colors ${
                                                    isSelected
                                                        ? 'bg-teal-50/50'
                                                        : inq.is_read
                                                        ? 'hover:bg-slate-50/70'
                                                        : 'bg-teal-50/30 hover:bg-teal-50/60'
                                                }`}
                                            >
                                                <td className="py-4 px-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(inq.id)}
                                                        className="w-4 h-4 rounded border-slate-300 bg-white text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                                    />
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {inq.is_archived ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300">
                                                            <Archive className="w-3 h-3 text-slate-500" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : !inq.is_read ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-teal-50 text-[#0f766e] border border-teal-200">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e] animate-pulse" />
                                                            <span>NEW</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                                                            <Check className="w-3 h-3 text-emerald-600" />
                                                            <span>Read</span>
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                                                            {senderInitial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="font-bold text-slate-900 block truncate text-xs">
                                                                {inq.name}
                                                            </span>
                                                            <span className="text-[#0f766e] font-mono text-[11px] block truncate">
                                                                {inq.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4 font-semibold text-slate-800 max-w-[200px] truncate text-xs">
                                                    {inq.subject || <span className="text-slate-400 italic">General Inquiry</span>}
                                                </td>

                                                <td className="py-4 px-4 text-slate-500 max-w-[240px] truncate italic text-xs">
                                                    "{snippet}"
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                                                    {dateStr}
                                                </td>

                                                <td className="py-4 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => openViewModal(inq)}
                                                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
                                                            title="Read message"
                                                        >
                                                            <BookOpen className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => openReplyModal(inq)}
                                                            className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0f766e] transition-colors border border-teal-200 cursor-pointer"
                                                            title="Reply via email"
                                                        >
                                                            <Reply className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleRead(inq.id)}
                                                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
                                                            title={inq.is_read ? 'Mark as Unread' : 'Mark as Read'}
                                                        >
                                                            <CheckCircle2 className={`w-3.5 h-3.5 ${inq.is_read ? 'text-[#0f766e]' : 'text-slate-300'}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(inq.id, inq.name)}
                                                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200 cursor-pointer"
                                                            title="Delete permanently"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {inquiries.links && inquiries.links.length > 3 && (
                        <div className="py-4 px-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 bg-slate-50/70">
                            <div>
                                Showing <strong className="text-slate-900">{inquiries.from || 0}</strong> to <strong className="text-slate-900">{inquiries.to || 0}</strong> of <strong className="text-slate-900">{inquiries.total || 0}</strong> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {inquiries.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors border cursor-pointer ${
                                            link.active
                                                ? 'bg-[#0f766e] text-white font-bold border-[#0f766e] shadow-xs'
                                                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 disabled:opacity-40'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. MOBILE CARD VIEW (Small screens < 768px) */}
                <div className="md:hidden space-y-3">
                    {inquiryList.length === 0 ? (
                        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500 text-xs shadow-xs">
                            <Mail className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
                            <span>No inquiries matching criteria found.</span>
                        </div>
                    ) : (
                        inquiryList.map((inq) => {
                            const isSelected = selectedIds.includes(inq.id);
                            const dateStr = new Date(inq.created_at).toLocaleDateString('en-PH', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <div
                                    key={inq.id}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        isSelected
                                            ? 'bg-teal-50/50 border-teal-300 shadow-sm'
                                            : inq.is_read
                                            ? 'bg-white border-slate-200/90 shadow-xs'
                                            : 'bg-teal-50/30 border-teal-200 shadow-xs'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(inq.id)}
                                                className="w-4 h-4 rounded border-slate-300 bg-white text-[#0f766e] focus:ring-[#0f766e] cursor-pointer shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <span className="font-bold text-slate-900 text-sm block truncate">
                                                    {inq.name}
                                                </span>
                                                <span className="text-[#0f766e] font-mono text-[11px] block truncate">
                                                    {inq.email}
                                                </span>
                                            </div>
                                        </div>

                                        {!inq.is_read ? (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 text-[#0f766e] border border-teal-200 shrink-0">
                                                NEW
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                                                Read
                                            </span>
                                        )}
                                    </div>

                                    <div className="py-3 space-y-2">
                                        <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0f766e]">
                                            {inq.subject || 'General Inquiry'}
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2 italic mb-0">
                                            "{inq.message}"
                                        </p>
                                        <div className="text-[11px] text-slate-400 font-mono">
                                            {dateStr}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => openViewModal(inq)}
                                                className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200 cursor-pointer"
                                            >
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>Read</span>
                                            </button>
                                            <button
                                                onClick={() => openReplyModal(inq)}
                                                className="px-3 py-1.5 rounded-lg bg-teal-50 text-[#0f766e] text-xs font-semibold flex items-center gap-1 border border-teal-200 cursor-pointer"
                                            >
                                                <Reply className="w-3.5 h-3.5" />
                                                <span>Reply</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(inq.id, inq.name)}
                                            className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* MODAL 1: VIEW INQUIRY */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90dvh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <span className="text-xs uppercase font-extrabold text-[#0f766e] tracking-wider flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4 text-[#0f766e]" />
                                Customer Inquiry Message
                            </span>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Sender Info</span>
                                <div className="text-sm font-bold text-slate-900 mt-0.5">
                                    {selectedInquiry.name} &bull; <span className="text-[#0f766e] font-mono font-normal">{selectedInquiry.email}</span>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Subject</span>
                                <div className="text-sm text-slate-900 font-semibold mt-0.5">
                                    {selectedInquiry.subject}
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider mb-1.5">Message Content</span>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mb-0">
                                    {selectedInquiry.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-2">
                            <button
                                onClick={() => {
                                    const inq = selectedInquiry;
                                    setSelectedInquiry(null);
                                    openReplyModal(inq);
                                }}
                                className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-xs"
                            >
                                <Reply className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Reply to Sender</span>
                            </button>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer border border-slate-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: REPLY TO INQUIRY */}
            {replyInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-0 flex items-center gap-2">
                                    <Reply className="w-4 h-4 text-[#0f766e]" />
                                    <span>Compose Official Email Reply</span>
                                </h3>
                                <p className="text-[11px] text-slate-500 mb-0 mt-0.5">
                                    Sent directly to <strong className="text-[#0f766e] font-mono">{replyInquiry.email}</strong> via INFINITE SMTP
                                </p>
                            </div>
                            <button
                                onClick={() => setReplyInquiry(null)}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSendReply} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Email Subject
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Reply Body Message
                                </label>
                                <textarea
                                    required
                                    rows={8}
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 transition-colors font-sans leading-relaxed"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setReplyInquiry(null)}
                                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingReply}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border-0 shadow-xs disabled:opacity-50"
                                >
                                    <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>{isSubmittingReply ? 'Dispatching Email...' : 'Send Reply'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
