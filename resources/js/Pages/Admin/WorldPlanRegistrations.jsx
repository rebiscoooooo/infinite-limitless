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
    const [detailsModalItem, setDetailsModalItem] = useState(null);
    const [approveModalItem, setApproveModalItem] = useState(null);
    const [rejectModalItem, setRejectModalItem] = useState(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [processingAction, setProcessingAction] = useState(false);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* KPI 1: Pending Applications */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Pending Verification
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                                <FileText className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-amber-300 tracking-wide">
                                {counts.pending || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
                                Needs Action
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Payment Proof Submissions</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('Pending');
                                    applyFilters({ status: 'Pending' });
                                }}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                            >
                                <span>Filter Pending</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 2: Approved Members */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Approved Members
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {counts.approved || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                Verified
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Onboarded Global Partners</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('Approved');
                                    applyFilters({ status: 'Approved' });
                                }}
                                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                            >
                                <span>View Verified</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 3: Total Registrations */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-sky-500/50 hover:shadow-sky-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-sky-400 before:to-blue-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Total Registrations
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Globe className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                                Lifetime Total
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">All Portal Submissions</span>
                            <span className="text-sky-400 font-mono text-[11px]">{counts.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Applications */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Archived Records
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {counts.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                Archived
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Archived Pipeline</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Tabs Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => handleViewChange('active')}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'active'
                                    ? 'bg-ch-teal text-slate-950 font-bold shadow-md shadow-teal-500/20'
                                    : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Active Applications ({counts.active || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleViewChange('archived')}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'archived'
                                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                                    : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Archived ({counts.archived || 0})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleViewChange('all')}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer border-0 ${
                                currentView === 'all'
                                    ? 'bg-slate-700 text-white font-bold shadow-md'
                                    : 'text-slate-400 hover:text-white bg-transparent'
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
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by applicant name, username, email, package, or country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ch-teal transition-colors"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    applyFilters({ search: '' });
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer p-0.5"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>

                    {/* Status Filters */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto shrink-0 flex-wrap">
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('');
                                applyFilters({ status: '' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                !status ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-transparent'
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
                                status === 'Pending' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white bg-transparent'
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
                                status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white bg-transparent'
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
                                status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Rejected ({counts.rejected || 0})
                        </button>
                    </div>
                </div>

                {/* Floating Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                            <span className="w-6 h-6 rounded-lg bg-ch-teal text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
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
                                className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-700 cursor-pointer"
                            >
                                Deselect
                            </button>
                        </div>
                    </div>
                )}

                {/* 1. DESKTOP TABLE VIEW (Medium screens & above) */}
                <div className="hidden md:block rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs min-w-[950px]">
                            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                                <tr>
                                    <th className="py-4 px-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={regList.length > 0 && selectedIds.length === regList.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-ch-teal focus:ring-ch-teal cursor-pointer"
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
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                {regList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-slate-500">
                                            <Globe className="w-10 h-10 mx-auto mb-3 opacity-30 text-sky-400" />
                                            <span className="text-sm font-semibold block text-slate-400">No applications matching criteria found.</span>
                                            <span className="text-xs text-slate-500 mt-1 block">Try clearing search or switching between Active and Archived views.</span>
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
                                                    isSelected ? 'bg-teal-950/30' : 'hover:bg-slate-800/40'
                                                }`}
                                            >
                                                <td className="py-4 px-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(reg.id)}
                                                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-ch-teal focus:ring-ch-teal cursor-pointer"
                                                    />
                                                </td>

                                                {/* Applicant Info */}
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-sky-400 shrink-0">
                                                            {applicantInitial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-white text-xs block truncate">
                                                                {reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`.trim()}
                                                            </div>
                                                            <div className="text-slate-400 text-[11px] font-mono truncate">
                                                                @{reg.username} • {reg.email}
                                                            </div>
                                                            <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                                                                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
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
                                                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-ch-teal border border-teal-500/20 font-bold block w-fit mb-1">
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
                                                    <div className="mt-1.5">
                                                        {(reg.payment_proof_url || reg.payment_proof || reg.payment_receipt) ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => setProofModalItem(reg)}
                                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-[11px] font-bold text-ch-teal border border-teal-500/30 transition-colors cursor-pointer"
                                                            >
                                                                <Eye className="w-3 h-3" />
                                                                <span>View Proof</span>
                                                            </button>
                                                        ) : (
                                                            <span className="text-slate-500 italic text-[11px]">No receipt file</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Consent */}
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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
                                                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
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
                                                            <Trash2 className="w-4 h-4" />
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
                        <div className="py-4 px-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-950/60">
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
                                                ? 'bg-ch-teal text-slate-950 font-bold shadow'
                                                : 'bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30'
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
                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center text-slate-500 text-xs">
                            <Globe className="w-8 h-8 mx-auto mb-2 opacity-30 text-sky-400" />
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
                                            ? 'bg-teal-950/30 border-teal-500/50 shadow-lg'
                                            : 'bg-slate-900 border-slate-800'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(reg.id)}
                                                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-ch-teal focus:ring-ch-teal"
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
                                            <span className="font-bold text-ch-teal">{reg.package_type}</span>
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

                                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {(reg.payment_proof_url || reg.payment_proof) && (
                                                <button
                                                    onClick={() => setProofModalItem(reg)}
                                                    className="px-2.5 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 text-xs font-semibold flex items-center gap-1 border border-teal-500/30"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Proof</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setDetailsModalItem(reg)}
                                                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700"
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
                                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                                <h3 className="font-bold text-white text-base mb-0">World Plan Registration Details</h3>
                                <span className="text-[11px] text-slate-400">Record #{detailsModalItem.id} • Registered via infinite-limitless.com</span>
                            </div>
                            <button
                                onClick={() => setDetailsModalItem(null)}
                                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg border border-slate-700 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Username</div>
                                    <div className="text-white font-bold text-sm">@{detailsModalItem.username}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Full Name</div>
                                    <div className="text-white font-bold text-sm">{detailsModalItem.full_name}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Email</div>
                                    <div className="text-teal-300 font-mono font-medium">{detailsModalItem.email}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Contact No</div>
                                    <div className="text-white font-medium">{detailsModalItem.contact_no}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Country</div>
                                    <div className="text-white font-medium">{detailsModalItem.country || 'Philippines'}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Sponsor / Referral</div>
                                    <div className="text-teal-300 font-bold">@{detailsModalItem.sponsor || 'None'}</div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Delivery / Shipping Address</div>
                                    <div className="text-slate-300 mt-0.5">{detailsModalItem.address}</div>
                                </div>
                            </div>

                            <div className="p-4 bg-teal-950/20 rounded-xl border border-teal-500/20 space-y-2">
                                <div className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Selected Package &amp; Payment</div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white font-bold">{detailsModalItem.package_type}</span>
                                    <span className="text-teal-300 font-bold">{detailsModalItem.amount_paid}</span>
                                </div>
                                {detailsModalItem.product_set && (
                                    <div className="text-slate-300 text-[11px]">Selected Set: <strong>{detailsModalItem.product_set}</strong></div>
                                )}
                                <div className="text-slate-400 text-[11px]">
                                    Paid via <strong>{detailsModalItem.payment_method}</strong> on {detailsModalItem.payment_date}
                                </div>
                            </div>

                            {/* Agreed Terms Badge */}
                            <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-emerald-300 text-[11px]">
                                <div className="font-bold flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span>Non-Refundable Policy &amp; Data Privacy Accepted</span>
                                </div>
                                <div className="text-slate-400 text-[10px] mt-0.5">
                                    Consent Timestamp: {detailsModalItem.agreed_terms_at ? new Date(detailsModalItem.agreed_terms_at).toLocaleString() : 'Recorded upon registration'}
                                </div>
                            </div>

                            {/* Payment Receipt Preview */}
                            {(detailsModalItem.payment_proof_url || detailsModalItem.payment_proof) && (
                                <div>
                                    <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-2">Uploaded Bank Remittance Receipt</div>
                                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                                        <img
                                            src={detailsModalItem.payment_proof_url}
                                            alt="Proof of Payment"
                                            className="max-h-60 mx-auto rounded-lg object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Actions in details modal */}
                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                                <h3 className="font-bold text-white text-base mb-0">Approve World Plan Registration</h3>
                                <span className="text-[11px] text-slate-400">Applicant: {approveModalItem.full_name}</span>
                            </div>
                            <button
                                onClick={() => setApproveModalItem(null)}
                                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg border border-slate-700 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleApproveSubmit} className="space-y-4 text-xs">
                            <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-slate-200">
                                <div className="font-bold text-emerald-400 mb-1">Built-in Confirmation Response:</div>
                                <p className="mb-0 text-slate-300 leading-relaxed">
                                    "Your registration for World Plan containing package <strong>{approveModalItem.package_type}</strong> {approveModalItem.product_set ? `and product set: ${approveModalItem.product_set}` : ''} has been officially approved! Online 24/7 account setup and product dispatch allocation are now initiated."
                                </p>
                            </div>

                            <div className="p-3 bg-teal-950/20 rounded-xl border border-teal-500/20 text-teal-300 text-[11px] flex items-center gap-2">
                                <span className="font-bold">Flyer Attachment Included:</span> Official INFINITE Congratulations Welcome Graphic attached automatically as <strong>image.png</strong>.
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Optional Administrator Note (Included in approval email)
                                </label>
                                <textarea
                                    rows="3"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="e.g. Welcome to the Infinite Family! Your tracking number will be provided shortly."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ch-teal"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setApproveModalItem(null)}
                                    className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingAction}
                                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                                <h3 className="font-bold text-white text-base mb-0">Reject Registration</h3>
                                <span className="text-[11px] text-slate-400">Applicant: {rejectModalItem.full_name}</span>
                            </div>
                            <button
                                onClick={() => setRejectModalItem(null)}
                                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg border border-slate-700 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleRejectSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Reason for Disapproval *
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="e.g. The remittance slip was blurry or the payment amount could not be verified with our bank deposit records. Please re-upload a clear receipt."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-ch-teal"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setRejectModalItem(null)}
                                    className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingAction}
                                    className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-lg shadow-rose-500/20 disabled:opacity-50"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>{processingAction ? 'Sending Rejection Notice...' : 'Confirm Rejection'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 4: PROOF VIEWER */}
            {proofModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                                <span className="text-xs uppercase font-extrabold text-ch-teal tracking-wider block">Remittance Proof Preview</span>
                                <span className="text-[11px] text-slate-400">Applicant: {proofModalItem.full_name} (@{proofModalItem.username})</span>
                            </div>
                            <button
                                onClick={() => setProofModalItem(null)}
                                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg border border-slate-700 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                            <img
                                src={proofModalItem.payment_proof_url}
                                alt="Proof Preview"
                                className="max-h-[60vh] mx-auto rounded-lg object-contain shadow-md"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <a
                                href={proofModalItem.payment_proof_url}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 rounded-xl bg-ch-teal text-slate-950 font-bold text-xs flex items-center gap-1.5 text-decoration-none shadow"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Original Receipt</span>
                            </a>
                            <button
                                onClick={() => setProofModalItem(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
