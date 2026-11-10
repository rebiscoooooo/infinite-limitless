import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    FileText,
    CheckCircle,
    XCircle,
    Download,
    Eye,
    ShieldAlert,
    Trash2,
    Calendar,
    DollarSign,
    User,
    Globe,
    X,
    ShieldCheck,
    Archive,
    RotateCcw,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
    ExternalLink,
    Image as ImageIcon,
    Sparkles,
    ArrowUpRight,
} from 'lucide-react';

export default function WorldPlanRegistrations({
    registrations = { data: [] },
    counts = {},
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [currentView, setCurrentView] = useState(filters.view || 'active');

    // Multi-select state
    const [selectedIds, setSelectedIds] = useState([]);

    // Modal States
    const [proofModalItem, setProofModalItem] = useState(null);
    const [proofZoom, setProofZoom] = useState(1);
    const [proofRotation, setProofRotation] = useState(0);
    const [proofImgError, setProofImgError] = useState(false);
    const [detailsModalItem, setDetailsModalItem] = useState(null);
    const [approveModalItem, setApproveModalItem] = useState(null);
    const [rejectModalItem, setRejectModalItem] = useState(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [processingAction, setProcessingAction] = useState(false);

    const openProofModal = (item) => {
        setProofZoom(1);
        setProofRotation(0);
        setProofImgError(false);
        setProofModalItem(item);
    };

    const regList = registrations.data || [];

    const applyFilters = (newParams = {}) => {
        const params = {
            search,
            status,
            view: currentView,
            ...newParams,
        };
        router.get('/admin/world-plan', params, { preserveState: true, replace: true });
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
            setSelectedIds(regList.map((r) => r.id));
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
        if (confirm(`Archive ${selectedIds.length} selected registration(s)? They will remain saved in the database.`)) {
            router.post('/admin/world-plan/bulk-archive', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleBulkRestore = () => {
        if (!selectedIds.length) return;
        router.post('/admin/world-plan/bulk-restore', { ids: selectedIds }, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleBulkDelete = () => {
        if (!selectedIds.length) return;
        if (confirm(`WARNING: Are you sure you want to PERMANENTLY delete ${selectedIds.length} selected registration(s) from the database? This action cannot be reversed.`)) {
            router.post('/admin/world-plan/bulk-delete', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    // Single item actions
    const handleDelete = (id, name) => {
        if (confirm(`Permanently delete the registration record for "${name}"?`)) {
            router.delete(`/admin/world-plan/${id}`, { preserveScroll: true });
        }
    };

    const handleApproveSubmit = (e) => {
        e.preventDefault();
        if (!approveModalItem) return;

        setProcessingAction(true);
        router.patch(
            `/admin/world-plan/${approveModalItem.id}/status`,
            {
                status: 'Approved',
                admin_notes: adminNotes,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setProcessingAction(false);
                    setApproveModalItem(null);
                    setAdminNotes('');
                },
                onError: () => setProcessingAction(false),
            }
        );
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        if (!rejectModalItem) return;

        setProcessingAction(true);
        router.patch(
            `/admin/world-plan/${rejectModalItem.id}/status`,
            {
                status: 'Rejected',
                rejection_reason: rejectionReason,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setProcessingAction(false);
                    setRejectModalItem(null);
                    setRejectionReason('');
                },
                onError: () => setProcessingAction(false),
            }
        );
    };

    return (
        <AdminLayout
            title="World Plan Registrations"
            subtitle="Verify applicant bank proofs, approve memberships with congratulations flyers, and manage onboarding records"
        >
            <Head title="World Plan Registrations | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* 4 HIGH-IMPACT KPI STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* KPI 1: Pending Applications */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-amber-500/50 hover:shadow-[0_10px_35px_rgba(245,158,11,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Pending Verification
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <FileText className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-300 tracking-wide">
                                {counts.pending || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse shrink-0">
                                Needs Action
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Payment Proof Submissions</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('Pending');
                                    applyFilters({ status: 'Pending' });
                                }}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>Filter Pending</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 2: Approved Members */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-[0_10px_35px_rgba(16,185,129,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Approved Members
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <CheckCircle className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-emerald-400 tracking-wide">
                                {counts.approved || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                                Verified
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Onboarded Global Partners</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('Approved');
                                    applyFilters({ status: 'Approved' });
                                }}
                                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Verified</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 3: Total Registrations */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#38bdf8]/50 hover:shadow-[0_10px_35px_rgba(56,189,248,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#38bdf8] before:to-[#0284c7]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Total Registrations
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 shrink-0">
                                Lifetime Total
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">All Portal Submissions</span>
                            <span className="text-[#38bdf8] font-mono text-[11px]">{counts.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Applications */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(168,85,247,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Archived Records
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
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Archived Pipeline</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Tabs Header */}
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
                            Active Applications ({counts.active || 0})
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
                        Showing <strong className="text-white">{regList.length}</strong> of <strong className="text-white">{registrations.total || 0}</strong> records
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#061726]/90 p-4 rounded-2xl border border-[#1b5361]/60 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by applicant name, username, email, package, or country..."
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

                    {/* Status Filters */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70 self-start sm:self-auto shrink-0 flex-wrap">
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('');
                                applyFilters({ status: '' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                !status ? 'bg-[#0c2638] text-white font-bold border border-[#276472]/60 shadow-sm' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            All Status
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('Pending');
                                applyFilters({ status: 'Pending' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === 'Pending' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Pending ({counts.pending || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('Approved');
                                applyFilters({ status: 'Approved' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Approved ({counts.approved || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('Rejected');
                                applyFilters({ status: 'Rejected' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Rejected ({counts.rejected || 0})
                        </button>
                    </div>
                </div>

                {/* Floating Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-[#061726]/95 backdrop-blur-xl border border-[#24dbc3]/40 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#27dec9]">
                            <span className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-black flex items-center justify-center text-xs shadow-md">
                                {selectedIds.length}
                            </span>
                            <span>registration(s) selected</span>
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
                        <table className="w-full text-left text-xs min-w-[950px]">
                            <thead className="bg-[#082033]/95 text-slate-300 uppercase tracking-wider font-bold text-[11px] border-b border-[#1b5361]/70">
                                <tr>
                                    <th className="py-4 px-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={regList.length > 0 && selectedIds.length === regList.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-4 px-4">Applicant</th>
                                    <th className="py-4 px-4">Package &amp; Set</th>
                                    <th className="py-4 px-4">Remittance / Receipt</th>
                                    <th className="py-4 px-4">Consent</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1b5361]/40 text-slate-300">
                                {regList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-slate-500">
                                            <Globe className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#38bdf8]" />
                                            <span className="text-sm font-semibold block text-slate-300">No applications matching criteria found.</span>
                                            <span className="text-xs text-slate-400 mt-1 block">Try clearing search or switching between Active and Archived views.</span>
                                        </td>
                                    </tr>
                                ) : (
                                    regList.map((reg) => {
                                        const isSelected = selectedIds.includes(reg.id);
                                        const applicantInitial = (reg.first_name || reg.full_name || 'U').charAt(0).toUpperCase();

                                        return (
                                            <tr
                                                key={reg.id}
                                                className={`transition-colors ${
                                                    isSelected ? 'bg-[#15cbb7]/15' : 'hover:bg-[#0c2638]/70'
                                                }`}
                                            >
                                                <td className="py-4 px-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(reg.id)}
                                                        className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
                                                    />
                                                </td>

                                                {/* Applicant Info */}
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#008c89] to-[#25dec0] text-[#031927] flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
                                                            {applicantInitial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-white text-xs block truncate">
                                                                {reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`.trim()}
                                                            </div>
                                                            <div className="text-slate-400 text-[11px] font-mono truncate">
                                                                @{reg.username} • {reg.email}
                                                            </div>
                                                            <div className="text-slate-400 text-[11px] flex items-center gap-1.5 mt-0.5">
                                                                <span className="px-1.5 py-0.2 rounded bg-[#082033] text-slate-300 font-semibold text-[10px] border border-[#1e4e5b]/60">
                                                                    {reg.country || 'Global'}
                                                                </span>
                                                                <span>•</span>
                                                                <span>{reg.contact_no}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Package & Product Set */}
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 rounded-lg bg-[#24dbc3]/10 text-[#27dec9] border border-[#24dbc3]/30 font-bold block w-fit mb-1">
                                                        {reg.package_type}
                                                    </span>
                                                    {reg.product_set && (
                                                        <div className="text-[11px] text-slate-400 max-w-[200px] truncate" title={reg.product_set}>
                                                            Set: {reg.product_set}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Remittance & Proof */}
                                                <td className="py-4 px-4">
                                                    <div className="font-semibold text-slate-200 text-xs">
                                                        {reg.amount_paid || 'Official Remittance'}
                                                    </div>
                                                    <div className="text-[11px] text-slate-400">
                                                        {reg.payment_method} • {reg.payment_date}
                                                    </div>
                                                    <div className="mt-1.5 flex items-center gap-1.5">
                                                        {(reg.payment_proof_url || reg.payment_proof || reg.payment_receipt) ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => openProofModal(reg)}
                                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 text-[11px] font-bold text-[#27dec9] border border-[#24dbc3]/30 transition-colors cursor-pointer"
                                                            >
                                                                {reg.is_pdf_receipt || reg.payment_proof?.toLowerCase().endsWith('.pdf') ? (
                                                                    <FileText className="w-3 h-3 text-rose-400" />
                                                                ) : (
                                                                    <Eye className="w-3 h-3 text-[#25dec0]" />
                                                                )}
                                                                <span>{reg.is_pdf_receipt || reg.payment_proof?.toLowerCase().endsWith('.pdf') ? 'View PDF' : 'View Proof'}</span>
                                                            </button>
                                                        ) : (
                                                            <span className="text-slate-500 italic text-[11px]">No receipt file</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Consent */}
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                        <span>Agreed: {reg.agreed_terms || 'Yes'}</span>
                                                    </span>
                                                    <div className="text-[10px] text-slate-500 mt-1">
                                                        Non-refundable
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {reg.is_archived ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-500/30">
                                                            <Archive className="w-3 h-3 text-amber-400" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                                                reg.status === 'Approved'
                                                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                                    : reg.status === 'Rejected'
                                                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                                                            }`}
                                                        >
                                                            {reg.status}
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-4 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => setDetailsModalItem(reg)}
                                                            className="p-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white transition-colors border border-[#1e4e5b]/70 cursor-pointer"
                                                            title="Inspect Application"
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                        </button>

                                                        {reg.status !== 'Approved' && (
                                                            <button
                                                                onClick={() => {
                                                                    setApproveModalItem(reg);
                                                                    setAdminNotes('');
                                                                }}
                                                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors border border-emerald-500/30 cursor-pointer"
                                                                title="Approve &amp; Send Congratulations Welcome"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </button>
                                                        )}

                                                        {reg.status !== 'Rejected' && (
                                                            <button
                                                                onClick={() => {
                                                                    setRejectModalItem(reg);
                                                                    setRejectionReason('');
                                                                }}
                                                                className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors border border-amber-500/30 cursor-pointer"
                                                                title="Reject &amp; Send Notice"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => handleDelete(reg.id, reg.full_name || reg.username)}
                                                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/30 cursor-pointer"
                                                            title="Delete Permanently"
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
                    {registrations.links && registrations.links.length > 3 && (
                        <div className="py-4 px-6 border-t border-[#1b5361]/60 flex items-center justify-between text-xs text-slate-400 bg-[#082033]/80">
                            <div>
                                Showing <strong className="text-white">{registrations.from || 0}</strong> to <strong className="text-white">{registrations.to || 0}</strong> of <strong className="text-white">{registrations.total || 0}</strong> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {registrations.links.map((link, idx) => (
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
                    {regList.length === 0 ? (
                        <div className="rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 p-8 text-center text-slate-400 text-xs shadow-xl">
                            <Globe className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#38bdf8]" />
                            <span>No registrations matching criteria found.</span>
                        </div>
                    ) : (
                        regList.map((reg) => {
                            const isSelected = selectedIds.includes(reg.id);

                            return (
                                <div
                                    key={reg.id}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        isSelected
                                            ? 'bg-[#15cbb7]/15 border-[#24dbc3]/60 shadow-lg'
                                            : 'bg-[#061726]/90 border-[#1b5361]/60'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1b5361]/60">
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(reg.id)}
                                                className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3]"
                                            />
                                            <div>
                                                <h4 className="font-bold text-white text-sm mb-0">
                                                    {reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`.trim()}
                                                </h4>
                                                <span className="text-[11px] text-slate-400 font-mono">@{reg.username}</span>
                                            </div>
                                        </div>

                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                reg.status === 'Approved'
                                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                    : reg.status === 'Rejected'
                                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                            }`}
                                        >
                                            {reg.status}
                                        </span>
                                    </div>

                                    <div className="py-3 space-y-2 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Package:</span>
                                            <span className="font-bold text-[#25dec0]">{reg.package_type}</span>
                                        </div>
                                        {reg.product_set && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-400">Set:</span>
                                                <span className="text-white truncate max-w-[200px]">{reg.product_set}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Remittance:</span>
                                            <span className="text-slate-200">{reg.amount_paid} ({reg.payment_method})</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Country:</span>
                                            <span className="text-slate-300">{reg.country || 'Philippines'}</span>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {(reg.payment_proof_url || reg.payment_proof) && (
                                                <button
                                                    onClick={() => setProofModalItem(reg)}
                                                    className="px-2.5 py-1.5 rounded-lg bg-[#24dbc3]/10 text-[#27dec9] text-xs font-semibold flex items-center gap-1 border border-[#24dbc3]/30"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Proof</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setDetailsModalItem(reg)}
                                                className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 text-xs font-semibold flex items-center gap-1 border border-[#1e4e5b]/70"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                <span>Details</span>
                                            </button>
                                            {reg.status !== 'Approved' && (
                                                <button
                                                    onClick={() => {
                                                        setApproveModalItem(reg);
                                                        setAdminNotes('');
                                                    }}
                                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    <span>Approve</span>
                                                </button>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleDelete(reg.id, reg.full_name || reg.username)}
                                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 cursor-pointer"
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

            {/* MODAL 1: VIEW DETAILS */}
            {detailsModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                        <div className="flex items-center justify-between pb-3 border-b border-[#1b5361]/60">
                            <div>
                                <h3 className="font-bold text-white text-base mb-0">World Plan Registration Details</h3>
                                <span className="text-[11px] text-slate-400 mt-0.5 block">Record #{detailsModalItem.id} • Registered via infinite-limitless.com</span>
                            </div>
                            <button
                                onClick={() => setDetailsModalItem(null)}
                                className="text-slate-400 hover:text-white bg-[#082033] p-1.5 rounded-xl border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#082033]/90 p-4 rounded-xl border border-[#1e4e5b]/70">
                                <div>
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Username</div>
                                    <div className="text-white font-bold text-sm mt-0.5">@{detailsModalItem.username}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Full Name</div>
                                    <div className="text-white font-bold text-sm mt-0.5">{detailsModalItem.full_name}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email</div>
                                    <div className="text-[#25dec0] font-mono font-medium mt-0.5">{detailsModalItem.email}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Contact No</div>
                                    <div className="text-white font-medium mt-0.5">{detailsModalItem.contact_no}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Country</div>
                                    <div className="text-white font-medium mt-0.5">{detailsModalItem.country || 'Philippines'}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Sponsor / Referral</div>
                                    <div className="text-[#25dec0] font-bold mt-0.5">@{detailsModalItem.sponsor || 'None'}</div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Delivery / Shipping Address</div>
                                    <div className="text-slate-300 mt-1 leading-relaxed">{detailsModalItem.address}</div>
                                </div>
                            </div>

                            <div className="p-4 bg-[#092b3a]/90 rounded-xl border border-[#24dbc3]/30 space-y-2">
                                <div className="text-[#25dec0] font-bold uppercase tracking-wider text-[10px]">Selected Package &amp; Payment</div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white font-bold">{detailsModalItem.package_type}</span>
                                    <span className="text-[#42f1ce] font-bold">{detailsModalItem.amount_paid}</span>
                                </div>
                                {detailsModalItem.product_set && (
                                    <div className="text-slate-300 text-[11px]">Selected Set: <strong>{detailsModalItem.product_set}</strong></div>
                                )}
                                <div className="text-slate-400 text-[11px]">
                                    Paid via <strong>{detailsModalItem.payment_method}</strong> on {detailsModalItem.payment_date}
                                </div>
                            </div>

                            {/* Agreed Terms Badge */}
                            <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-500/30 text-emerald-300 text-[11px]">
                                <div className="font-bold flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span>Non-Refundable Policy &amp; Data Privacy Accepted</span>
                                </div>
                                <div className="text-slate-400 text-[10px] mt-1">
                                    Consent Timestamp: {detailsModalItem.agreed_terms_at ? new Date(detailsModalItem.agreed_terms_at).toLocaleString() : 'Recorded upon registration'}
                                </div>
                            </div>

                            {/* Payment Receipt Preview */}
                            {(detailsModalItem.payment_proof_url || detailsModalItem.payment_proof) && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                                            Uploaded Bank Remittance Receipt
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => openProofModal(detailsModalItem)}
                                            className="text-[#25dec0] hover:text-[#42f1ce] text-xs font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                                        >
                                            <Eye className="w-3.5 h-3.5" /> Expand &amp; Inspect
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => openProofModal(detailsModalItem)}
                                        className="bg-[#082033]/90 p-2 rounded-xl border border-[#1e4e5b]/80 text-center cursor-pointer group hover:border-[#24dbc3]/50 transition-all relative overflow-hidden"
                                    >
                                        {detailsModalItem.is_pdf_receipt || detailsModalItem.payment_proof?.toLowerCase().endsWith('.pdf') ? (
                                            <div className="p-6 flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-200">PDF Remittance Document</span>
                                                <span className="text-[11px] text-slate-400 font-mono">{detailsModalItem.payment_proof}</span>
                                                <span className="text-[11px] text-[#25dec0] font-semibold group-hover:underline mt-1">
                                                    Click to view / open PDF in viewer &rarr;
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <img
                                                    src={detailsModalItem.payment_proof_url}
                                                    alt="Proof of Payment"
                                                    className="max-h-60 mx-auto rounded-lg object-contain group-hover:opacity-85 transition-opacity"
                                                />
                                                <div className="absolute inset-0 bg-[#061726]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                                                    <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold text-xs flex items-center gap-1.5 shadow-lg">
                                                        <Eye className="w-3.5 h-3.5 stroke-[2.5]" /> Click to Zoom &amp; Inspect
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                                        <span>File: {detailsModalItem.payment_proof}</span>
                                        <a
                                            href={`/storage/payment_proofs/${detailsModalItem.payment_proof}/download`}
                                            download
                                            className="text-[#25dec0] hover:text-[#42f1ce] font-medium inline-flex items-center gap-1 no-underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download className="w-3 h-3" /> Download File
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Actions in details modal */}
                            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1b5361]/60">
                                {detailsModalItem.status !== 'Approved' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setApproveModalItem(detailsModalItem);
                                            setAdminNotes('');
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs border-0 flex items-center gap-1.5 cursor-pointer shadow"
                                    >
                                        <CheckCircle className="w-4 h-4" /> Approve Registration
                                    </button>
                                )}
                                {detailsModalItem.status !== 'Rejected' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRejectModalItem(detailsModalItem);
                                            setRejectionReason('');
                                        }}
                                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl text-xs border-0 flex items-center gap-1.5 cursor-pointer shadow"
                                    >
                                        <XCircle className="w-4 h-4" /> Reject Registration
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: APPROVE REGISTRATION */}
            {approveModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-[#18d8c5]" />

                        <div className="flex items-center justify-between pb-3 border-b border-[#1b5361]/60">
                            <div>
                                <h3 className="font-bold text-white text-base mb-0">Approve World Plan Registration</h3>
                                <span className="text-[11px] text-slate-400 mt-0.5 block">Applicant: {approveModalItem.full_name}</span>
                            </div>
                            <button
                                onClick={() => setApproveModalItem(null)}
                                className="text-slate-400 hover:text-white bg-[#082033] p-1.5 rounded-xl border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleApproveSubmit} className="space-y-4 text-xs">
                            <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-500/25 text-slate-200">
                                <div className="font-bold text-emerald-400 mb-1">Built-in Confirmation Response:</div>
                                <p className="mb-0 text-slate-300 leading-relaxed">
                                    "Your registration for World Plan containing package <strong>{approveModalItem.package_type}</strong> {approveModalItem.product_set ? `and product set: ${approveModalItem.product_set}` : ''} has been officially approved! Online 24/7 account setup and product dispatch allocation are now initiated."
                                </p>
                            </div>

                            <div className="p-3 bg-[#092b3a]/90 rounded-xl border border-[#24dbc3]/30 text-[#27dec9] text-[11px] flex items-center gap-2">
                                <span className="font-bold">Flyer Attachment Included:</span> Official INFINITE Congratulations Welcome Graphic attached automatically as <strong>image.png</strong>.
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Optional Administrator Note (Included in approval email)
                                </label>
                                <textarea
                                    rows="3"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="e.g. Welcome to the Infinite Family! Your tracking number will be provided shortly."
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-2 border-t border-[#1b5361]/60">
                                <button
                                    type="button"
                                    onClick={() => setApproveModalItem(null)}
                                    className="px-4 py-2.5 bg-[#082033] text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingAction}
                                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>{processingAction ? 'Sending Approval Email & Attachment...' : 'Confirm Approval & Dispatch Email'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 3: REJECT REGISTRATION */}
            {rejectModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500" />

                        <div className="flex items-center justify-between pb-3 border-b border-[#1b5361]/60">
                            <div>
                                <h3 className="font-bold text-white text-base mb-0">Reject Registration</h3>
                                <span className="text-[11px] text-slate-400 mt-0.5 block">Applicant: {rejectModalItem.full_name}</span>
                            </div>
                            <button
                                onClick={() => setRejectModalItem(null)}
                                className="text-slate-400 hover:text-white bg-[#082033] p-1.5 rounded-xl border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleRejectSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Reason for Disapproval *
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="e.g. The remittance slip was blurry or the payment amount could not be verified with our bank deposit records. Please re-upload a clear receipt."
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-2 border-t border-[#1b5361]/60">
                                <button
                                    type="button"
                                    onClick={() => setRejectModalItem(null)}
                                    className="px-4 py-2.5 bg-[#082033] text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingAction}
                                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-lg shadow-rose-500/20 disabled:opacity-50"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>{processingAction ? 'Sending Rejection Notice...' : 'Confirm Rejection'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 4: INTERACTIVE FUNCTIONAL PROOF VIEWER */}
            {proofModalItem && (() => {
                const isPdf = proofModalItem.is_pdf_receipt || proofModalItem.payment_proof?.toLowerCase().endsWith('.pdf');
                const downloadUrl = `/storage/payment_proofs/${proofModalItem.payment_proof}/download`;
                const directViewUrl = proofModalItem.payment_proof_url;

                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in">
                        <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-4xl p-4 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4 max-h-[95vh] flex flex-col">
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                            {/* Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-[#1b5361]/60 shrink-0">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs uppercase font-extrabold text-[#27dec9] tracking-wider">
                                            Remittance Receipt Inspector
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            isPdf ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-[#24dbc3]/20 text-[#27dec9] border border-[#24dbc3]/30'
                                        }`}>
                                            {isPdf ? 'PDF Document' : 'Image Photo'}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-slate-300">
                                        <span className="font-semibold text-white">{proofModalItem.full_name}</span>
                                        <span className="text-slate-400"> (@{proofModalItem.username})</span>
                                        <span className="text-slate-500 mx-1.5">•</span>
                                        <span className="text-[#25dec0] font-mono font-bold">{proofModalItem.amount_paid || 'Remittance'}</span>
                                        {proofModalItem.payment_method && (
                                            <>
                                                <span className="text-slate-500 mx-1.5">•</span>
                                                <span className="text-slate-300">{proofModalItem.payment_method}</span>
                                            </>
                                        )}
                                        {proofModalItem.payment_date && (
                                            <>
                                                <span className="text-slate-500 mx-1.5">•</span>
                                                <span className="text-slate-400 font-mono">{proofModalItem.payment_date}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setProofModalItem(null)}
                                    className="text-slate-400 hover:text-white bg-[#082033] hover:bg-[#0c2638] p-2 rounded-xl border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                                    title="Close viewer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Viewer Stage */}
                            <div className="bg-[#082033]/90 p-2 sm:p-4 rounded-xl border border-[#1e4e5b]/70 text-center relative overflow-hidden flex-1 min-h-[350px] max-h-[65vh] flex items-center justify-center">
                                {isPdf ? (
                                    <div className="w-full h-full min-h-[500px] flex flex-col">
                                        <iframe
                                            src={directViewUrl}
                                            title="Receipt PDF"
                                            className="w-full h-full min-h-[480px] rounded-lg border-0 bg-white"
                                        />
                                    </div>
                                ) : proofImgError ? (
                                    <div className="p-8 text-center space-y-3">
                                        <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-300">Receipt Image Unavailable for Preview</p>
                                        <p className="text-xs text-slate-500 font-mono">File: {proofModalItem.payment_proof}</p>
                                        <div className="pt-2 flex justify-center gap-2">
                                            <a
                                                href={directViewUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24dbc3]/20 text-[#27dec9] text-xs font-bold hover:bg-[#24dbc3]/30 transition-colors no-underline"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" /> Try Direct Link
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => setProofImgError(false)}
                                                className="px-3 py-1.5 rounded-lg bg-[#082033] text-slate-300 text-xs font-semibold hover:bg-[#0c2638] border border-[#1e4e5b]/80 cursor-pointer"
                                            >
                                                Retry Load
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative overflow-auto w-full h-full flex items-center justify-center max-h-[60vh] select-none">
                                        <img
                                            src={directViewUrl}
                                            alt="Proof Preview"
                                            onError={() => setProofImgError(true)}
                                            style={{
                                                transform: `scale(${proofZoom}) rotate(${proofRotation}deg)`,
                                                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
                                            }}
                                            className="max-h-[55vh] max-w-full rounded-lg object-contain shadow-2xl cursor-zoom-in"
                                            onClick={() => setProofZoom((z) => (z >= 2.5 ? 1 : +(z + 0.5).toFixed(1)))}
                                            title="Click to zoom in / reset"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Functional Toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 shrink-0">
                                {/* Left Controls (Zoom, Rotate, Reset, New Tab) */}
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {!isPdf && !proofImgError && (
                                        <>
                                            <button
                                                type="button"
                                                title="Zoom In"
                                                onClick={() => setProofZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                                                className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white border border-[#1e4e5b]/80 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <ZoomIn className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-mono">{Math.round(proofZoom * 100)}%</span>
                                            </button>
                                            <button
                                                type="button"
                                                title="Zoom Out"
                                                onClick={() => setProofZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                                                className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white border border-[#1e4e5b]/80 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <ZoomOut className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                title="Rotate 90 degrees clockwise"
                                                onClick={() => setProofRotation((r) => (r + 90) % 360)}
                                                className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white border border-[#1e4e5b]/80 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <RotateCw className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline text-[11px]">Rotate {proofRotation ? `(${proofRotation}°)` : ''}</span>
                                            </button>
                                            {(proofZoom !== 1 || proofRotation !== 0) && (
                                                <button
                                                    type="button"
                                                    title="Reset Zoom & Rotation"
                                                    onClick={() => { setProofZoom(1); setProofRotation(0); }}
                                                    className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-amber-400 border border-[#1e4e5b]/80 text-[11px] font-semibold cursor-pointer transition-colors"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </>
                                    )}
                                    <a
                                        href={directViewUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        title="Open file in separate browser tab"
                                        className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white border border-[#1e4e5b]/80 text-xs flex items-center gap-1 cursor-pointer transition-colors no-underline"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span className="text-[11px]">Open New Tab</span>
                                    </a>
                                </div>

                                {/* Right Actions (Download & Close) */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={downloadUrl}
                                        download
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 text-[#031927] font-extrabold text-xs flex items-center gap-1.5 no-underline shadow-[0_4px_15px_rgba(36,219,195,0.25)] transition-all cursor-pointer"
                                    >
                                        <Download className="w-4 h-4 stroke-[2.5]" />
                                        <span>Download Receipt</span>
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setProofModalItem(null)}
                                        className="px-4 py-2 rounded-xl bg-[#082033] hover:bg-[#0c2638] text-slate-300 hover:text-white text-xs font-semibold border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </AdminLayout>
    );
}
