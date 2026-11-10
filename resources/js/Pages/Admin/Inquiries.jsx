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
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#24dbc3]/50 hover:shadow-[0_10px_35px_rgba(36,219,195,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#24dbc3] before:to-[#42f1ce]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Total Inquiries
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#25dec0] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Mail className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#24dbc3]/15 text-[#27dec9] border border-[#24dbc3]/30 shrink-0">
                                All Lifetime
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Contact Submissions</span>
                            <span className="text-slate-300 font-mono text-[11px]">{counts.active || 0} active inbox</span>
                        </div>
                    </div>

                    {/* KPI 2: Unread Messages */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-amber-500/50 hover:shadow-[0_10px_35px_rgba(245,158,11,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Unread Attention
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Sparkles className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-300 tracking-wide">
                                {counts.unread || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse shrink-0">
                                Needs Reply
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Direct Support Queue</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('unread');
                                    applyFilters({ status: 'unread' });
                                }}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>Filter Unread</span>
                                <MessageSquare className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 3: Active Inbox */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#38bdf8]/50 hover:shadow-[0_10px_35px_rgba(56,189,248,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#38bdf8] before:to-[#0284c7]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Active Inquiries
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {counts.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 shrink-0">
                                Main Inbox
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Standard Pipeline</span>
                            <span className="text-[#38bdf8] font-bold text-[11px]">Operational</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Inquiries */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(168,85,247,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Archived Inquiries
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Archive className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {counts.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
                                Archived
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Archived Records</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Tabs: Active | Archived | All */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#1b5361]/60">
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#082033]/90 border border-[#1e4e5b]/70 text-xs font-semibold shadow-inner">
                        <button
                            type="button"
                            onClick={() => handleViewChange('active')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'active'
                                    ? 'bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold shadow-[0_2px_12px_rgba(36,219,195,0.25)]'
                                    : 'text-slate-300 hover:text-white bg-transparent'
                            }`}
                        >
                            Active Messages ({counts.active || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleViewChange('archived')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'archived'
                                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                                    : 'text-slate-300 hover:text-white bg-transparent'
                            }`}
                        >
                            Archived ({counts.archived || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleViewChange('all')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'all'
                                    ? 'bg-[#0c2638] text-white font-extrabold border border-[#276472]/80 shadow-md'
                                    : 'text-slate-300 hover:text-white bg-transparent'
                            }`}
                        >
                            All ({counts.total || 0})
                        </button>
                    </div>

                    <div className="text-xs text-slate-400">
                        Showing <strong className="text-white">{inquiryList.length}</strong> of <strong className="text-white">{inquiries.total || 0}</strong> messages
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#061726]/90 p-4 rounded-2xl border border-[#1b5361]/60 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by sender name, email, subject, or message content..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30 transition-all"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    applyFilters({ search: '' });
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-0.5"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70 self-start sm:self-auto shrink-0">
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('');
                                applyFilters({ status: '' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === '' ? 'bg-[#0c2638] text-white font-bold border border-[#276472]/60 shadow-sm' : 'text-slate-400 hover:text-white bg-transparent'
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
                                status === 'unread' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-white bg-transparent'
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
                                status === 'read' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Read
                        </button>
                    </div>
                </div>

                {/* Floating Bottom Bulk Action Toolbar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-[#061726]/95 backdrop-blur-xl border border-[#24dbc3]/40 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#27dec9]">
                            <span className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-black flex items-center justify-center text-xs shadow-md">
                                {selectedIds.length}
                            </span>
                            <span>inquiry/inquiries selected</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {currentView === 'archived' ? (
                                <button
                                    type="button"
                                    onClick={handleBulkRestore}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all border-0 shadow cursor-pointer"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Restore</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleBulkArchive}
                                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all border-0 shadow cursor-pointer"
                                >
                                    <Archive className="w-3.5 h-3.5" />
                                    <span>Archive</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleBulkDelete}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all border-0 shadow cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedIds([])}
                                className="px-2.5 py-1.5 rounded-xl bg-[#082033] text-slate-300 hover:text-white text-xs border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                Deselect
                            </button>
                        </div>
                    </div>
                )}

                {/* 1. DESKTOP TABLE VIEW (Medium screens & above) */}
                <div className="hidden md:block rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden relative">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs min-w-[850px]">
                            <thead className="bg-[#082033]/95 text-slate-300 uppercase tracking-wider font-bold text-[11px] border-b border-[#1b5361]/70">
                                <tr>
                                    <th className="py-4 px-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={inquiryList.length > 0 && selectedIds.length === inquiryList.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
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
                            <tbody className="divide-y divide-[#1b5361]/40 text-slate-300">
                                {inquiryList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-slate-500">
                                            <Mail className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#25dec0]" />
                                            <span className="text-sm font-semibold block text-slate-300">No inquiries matching criteria found.</span>
                                            <span className="text-xs text-slate-400 mt-1 block">Try clearing search or switching between Active and Archived tabs.</span>
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
                                                        ? 'bg-[#15cbb7]/15'
                                                        : inq.is_read
                                                        ? 'hover:bg-[#0c2638]/70'
                                                        : 'bg-[#092b3a]/60 hover:bg-[#0c2638]/90'
                                                }`}
                                            >
                                                <td className="py-4 px-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(inq.id)}
                                                        className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
                                                    />
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {inq.is_archived ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">
                                                            <Archive className="w-3 h-3 text-amber-400" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : !inq.is_read ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#24dbc3]/20 text-[#27dec9] border border-[#24dbc3]/40">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#24dbc3] animate-pulse" />
                                                            <span>NEW</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#0c2436] text-slate-400 border border-[#1e4e5b]/40">
                                                            <Check className="w-3 h-3 text-emerald-400" />
                                                            <span>Read</span>
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#008c89] to-[#25dec0] text-[#031927] flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
                                                            {senderInitial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="font-bold text-white block truncate">
                                                                {inq.name}
                                                            </span>
                                                            <span className="text-[#25dec0] font-mono text-[11px] block truncate">
                                                                {inq.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4 font-semibold text-slate-200 max-w-[200px] truncate">
                                                    {inq.subject || <span className="text-slate-500 italic">General Inquiry</span>}
                                                </td>

                                                <td className="py-4 px-4 text-slate-300 max-w-[240px] truncate italic">
                                                    "{snippet}"
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                                                    {dateStr}
                                                </td>

                                                <td className="py-4 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => openViewModal(inq)}
                                                            className="p-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white transition-colors border border-[#1e4e5b]/70 cursor-pointer"
                                                            title="Read message"
                                                        >
                                                            <BookOpen className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => openReplyModal(inq)}
                                                            className="p-1.5 rounded-lg bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 text-[#27dec9] transition-colors border border-[#24dbc3]/30 cursor-pointer"
                                                            title="Reply via email"
                                                        >
                                                            <Reply className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleRead(inq.id)}
                                                            className="p-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-400 hover:text-white transition-colors border border-[#1e4e5b]/70 cursor-pointer"
                                                            title={inq.is_read ? 'Mark as Unread' : 'Mark as Read'}
                                                        >
                                                            <CheckCircle2 className={`w-3.5 h-3.5 ${inq.is_read ? 'text-[#25dec0]' : 'text-slate-500'}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(inq.id, inq.name)}
                                                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/30 cursor-pointer"
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
                        <div className="py-4 px-6 border-t border-[#1b5361]/60 flex items-center justify-between text-xs text-slate-400 bg-[#082033]/80">
                            <div>
                                Showing <strong className="text-white">{inquiries.from || 0}</strong> to <strong className="text-white">{inquiries.to || 0}</strong> of <strong className="text-white">{inquiries.total || 0}</strong> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {inquiries.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors border-0 cursor-pointer ${
                                            link.active
                                                ? 'bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-bold shadow'
                                                : 'bg-[#061726] text-slate-400 hover:text-white disabled:opacity-30'
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
                        <div className="rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 p-8 text-center text-slate-400 text-xs shadow-xl">
                            <Mail className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#25dec0]" />
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
                                            ? 'bg-[#15cbb7]/15 border-[#24dbc3]/60 shadow-lg'
                                            : inq.is_read
                                            ? 'bg-[#061726]/90 border-[#1b5361]/60'
                                            : 'bg-gradient-to-r from-[#092b3a]/90 to-[#061726]/90 border-[#24dbc3]/40'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1b5361]/60">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(inq.id)}
                                                className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <span className="font-bold text-white text-sm block truncate">
                                                    {inq.name}
                                                </span>
                                                <span className="text-[#25dec0] font-mono text-[11px] block truncate">
                                                    {inq.email}
                                                </span>
                                            </div>
                                        </div>

                                        {!inq.is_read ? (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#24dbc3]/20 text-[#27dec9] border border-[#24dbc3]/40 shrink-0">
                                                NEW
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0c2436] text-slate-400 border border-[#1e4e5b]/40 shrink-0">
                                                Read
                                            </span>
                                        )}
                                    </div>

                                    <div className="py-3 space-y-2">
                                        <div className="inline-block px-2.5 py-1 rounded-lg bg-[#082033] border border-[#1e4e5b]/70 text-xs font-semibold text-[#27dec9]">
                                            {inq.subject || 'General Inquiry'}
                                        </div>
                                        <p className="text-xs text-slate-300 line-clamp-2 italic mb-0">
                                            "{inq.message}"
                                        </p>
                                        <div className="text-[11px] text-slate-400 font-mono">
                                            {dateStr}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => openViewModal(inq)}
                                                className="px-3 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 text-xs font-semibold flex items-center gap-1 border border-[#1e4e5b]/70 cursor-pointer"
                                            >
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>Read</span>
                                            </button>
                                            <button
                                                onClick={() => openReplyModal(inq)}
                                                className="px-3 py-1.5 rounded-lg bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 text-[#27dec9] text-xs font-semibold flex items-center gap-1 border border-[#24dbc3]/30 cursor-pointer"
                                            >
                                                <Reply className="w-3.5 h-3.5" />
                                                <span>Reply</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(inq.id, inq.name)}
                                            className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                        
                        <div className="flex items-center justify-between pb-3 border-b border-[#1b5361]/60">
                            <span className="text-xs uppercase font-extrabold text-[#27dec9] tracking-wider flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4 text-[#25dec0]" />
                                Customer Inquiry Message
                            </span>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="text-slate-400 hover:text-white bg-[#082033] p-1.5 rounded-xl border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3.5 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Sender Info</span>
                                <div className="text-sm font-bold text-white mt-0.5">
                                    {selectedInquiry.name} • <span className="text-[#25dec0] font-mono font-normal">{selectedInquiry.email}</span>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Subject</span>
                                <div className="text-sm text-white font-semibold mt-0.5">
                                    {selectedInquiry.subject}
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1.5">Message Content</span>
                                <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed mb-0">
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
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 text-[#031927] font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-[0_4px_18px_rgba(36,219,195,0.25)]"
                            >
                                <Reply className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Reply to Sender</span>
                            </button>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="px-4 py-2.5 rounded-xl bg-[#082033] text-slate-300 hover:text-white text-xs font-semibold cursor-pointer border border-[#1e4e5b]/80"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: REPLY TO INQUIRY */}
            {replyInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-xl p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                        
                        <div className="flex items-center justify-between pb-3 border-b border-[#1b5361]/60">
                            <div>
                                <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                    <Reply className="w-4 h-4 text-[#25dec0]" />
                                    <span>Compose Official Email Reply</span>
                                </h3>
                                <p className="text-[11px] text-slate-400 mb-0 mt-0.5">
                                    Sent directly to <strong className="text-[#25dec0] font-mono">{replyInquiry.email}</strong> via INFINITE SMTP
                                </p>
                            </div>
                            <button
                                onClick={() => setReplyInquiry(null)}
                                className="text-slate-400 hover:text-white bg-[#082033] p-1.5 rounded-xl border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSendReply} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Email Subject
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Reply Body Message
                                </label>
                                <textarea
                                    required
                                    rows={8}
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30 transition-colors font-sans leading-relaxed"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setReplyInquiry(null)}
                                    className="px-4 py-2.5 rounded-xl bg-[#082033] text-slate-400 hover:text-white text-xs font-semibold border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingReply}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 text-[#031927] font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer border-0 shadow-[0_4px_20px_rgba(36,219,195,0.25)] disabled:opacity-50"
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
