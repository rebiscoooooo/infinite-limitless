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
    KeyRound,
    Lock,
    Mail,
    EyeOff,
    Send,
    Loader2,
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

    // Credentials Modal States
    const [credentialsModalItem, setCredentialsModalItem] = useState(null);
    const [credUsername, setCredUsername] = useState('');
    const [credPassword, setCredPassword] = useState('');
    const [showCredPassword, setShowCredPassword] = useState(false);
    const [sendingCredentials, setSendingCredentials] = useState(false);

    const openCredentialsModal = (item) => {
        setCredentialsModalItem(item);
        setCredUsername(item.username || '');
        setCredPassword('');
        setShowCredPassword(false);
    };

    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
        let pass = 'Inf#';
        for (let i = 0; i < 8; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCredPassword(pass);
    };

    const handleSendCredentialsSubmit = (e) => {
        e.preventDefault();
        if (!credentialsModalItem) return;
        if (!credUsername.trim()) {
            alert('Please enter a username.');
            return;
        }
        if (!credPassword.trim()) {
            alert('Please enter a password.');
            return;
        }

        setSendingCredentials(true);
        router.post(
            `/admin/world-plan/${credentialsModalItem.id}/send-credentials`,
            {
                username: credUsername.trim(),
                password: credPassword.trim(),
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSendingCredentials(false);
                    setCredentialsModalItem(null);
                    setCredPassword('');
                },
                onError: (errors) => {
                    setSendingCredentials(false);
                    alert(Object.values(errors).flat().join('\n') || 'Failed to dispatch credentials.');
                },
            }
        );
    };

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

    // Bulk Actions
    const handleBulkArchive = () => {
        if (!selectedIds.length) return;
        if (confirm(`Archive ${selectedIds.length} selected registration(s)?`)) {
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
        if (confirm(`WARNING: Are you sure you want to PERMANENTLY delete ${selectedIds.length} registration(s)? This will also erase associated receipt attachments.`)) {
            router.post('/admin/world-plan/bulk-delete', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete the registration of "${name}"?`)) {
            router.delete(`/admin/world-plan/${id}`, {
                preserveScroll: true,
            });
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
                {/* 4 HIGH-IMPACT KPI STATS (Clean White Cards with System Palette Accents) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* KPI 1: Pending Applications */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-amber-400/80 transition-all duration-300 border-l-4 border-l-[#f59e0b]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-mono truncate">
                                Pending Verification
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
                                <FileText className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-600 font-mono tracking-tight">
                                {counts.pending || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                                Needs Action
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Payment Proof Submissions</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('Pending');
                                    applyFilters({ status: 'Pending' });
                                }}
                                className="text-[#0f766e] hover:text-[#115e59] font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>Filter Pending</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 2: Approved Members */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-emerald-400/80 transition-all duration-300 border-l-4 border-l-[#10b981]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono truncate">
                                Approved Members
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-emerald-600 font-mono tracking-tight">
                                {counts.approved || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                                Verified
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Onboarded Global Partners</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatus('Approved');
                                    applyFilters({ status: 'Approved' });
                                }}
                                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Verified</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* KPI 3: Total Registrations */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-teal-400/80 transition-all duration-300 border-l-4 border-l-[#0f766e]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono truncate">
                                Total Registrations
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                <Globe className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                                {counts.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200 shrink-0">
                                Lifetime Total
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">All Portal Submissions</span>
                            <span className="text-[#0f766e] font-mono font-bold text-[11px]">{counts.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Applications */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-purple-400/80 transition-all duration-300 border-l-4 border-l-purple-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider font-mono truncate">
                                Archived Records
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
                            <span className="text-slate-500 text-[11px]">Archived Pipeline</span>
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

                {/* View Tabs Header */}
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
                            Active Applications ({counts.active || 0})
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
                        Showing <strong className="text-slate-900">{regList.length}</strong> of <strong className="text-slate-900">{registrations.total || 0}</strong> records
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by applicant name, username, email, package, or country..."
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

                    {/* Status Filters */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto shrink-0 flex-wrap">
                        <button
                            type="button"
                            onClick={() => {
                                setStatus('');
                                applyFilters({ status: '' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 transition-all cursor-pointer ${
                                !status ? 'bg-white text-slate-900 font-bold border border-slate-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                status === 'Pending' ? 'bg-amber-100 text-amber-800 font-bold border border-amber-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                status === 'Approved' ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                status === 'Rejected' ? 'bg-rose-100 text-rose-800 font-bold border border-rose-300 shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                            }`}
                        >
                            Rejected ({counts.rejected || 0})
                        </button>
                    </div>
                </div>

                {/* Floating Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-white/95 backdrop-blur-xl border border-teal-300 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0f766e]">
                            <span className="w-6 h-6 rounded-lg bg-[#0f766e] text-white font-black flex items-center justify-center text-xs shadow-xs">
                                {selectedIds.length}
                            </span>
                            <span>registration(s) selected</span>
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
                        <table className="w-full text-left text-xs min-w-[950px]">
                            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold text-[11px] border-b border-slate-200">
                                <tr>
                                    <th className="py-4 px-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={regList.length > 0 && selectedIds.length === regList.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-slate-300 bg-white text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
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
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {regList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-slate-400">
                                            <Globe className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-400" />
                                            <span className="text-sm font-semibold block text-slate-700">No applications matching criteria found.</span>
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
                                                    isSelected ? 'bg-teal-50/50' : 'hover:bg-slate-50/80'
                                                }`}
                                            >
                                                <td className="py-4 px-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(reg.id)}
                                                        className="w-4 h-4 rounded border-slate-300 bg-white text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                                    />
                                                </td>

                                                {/* Applicant Info */}
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                                                            {applicantInitial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-slate-900 text-xs block truncate">
                                                                {reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`.trim()}
                                                            </div>
                                                            <div className="text-slate-500 text-[11px] font-mono truncate">
                                                                @{reg.username} &bull; {reg.email}
                                                            </div>
                                                            <div className="text-slate-400 text-[11px] flex items-center gap-1.5 mt-0.5">
                                                                <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold text-[10px] border border-slate-200">
                                                                    {reg.country || 'Global'}
                                                                </span>
                                                                <span>&bull;</span>
                                                                <span>{reg.contact_no}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Package & Product Set */}
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0f766e] border border-teal-200 font-bold block w-fit mb-1">
                                                        {reg.package_type}
                                                    </span>
                                                    {reg.product_set && (
                                                        <div className="text-[11px] text-slate-500 max-w-[200px] truncate" title={reg.product_set}>
                                                            Set: {reg.product_set}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Remittance & Proof */}
                                                <td className="py-4 px-4">
                                                    <div className="font-semibold text-slate-900 text-xs">
                                                        {reg.amount_paid || 'Official Remittance'}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500">
                                                        {reg.payment_method} &bull; {reg.payment_date}
                                                    </div>
                                                    <div className="mt-1.5 flex items-center gap-1.5">
                                                        {(reg.payment_proof_url || reg.payment_proof || reg.payment_receipt) ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => openProofModal(reg)}
                                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-[11px] font-bold text-[#0f766e] border border-teal-200 transition-colors cursor-pointer"
                                                            >
                                                                {reg.is_pdf_receipt || reg.payment_proof?.toLowerCase().endsWith('.pdf') ? (
                                                                    <FileText className="w-3 h-3 text-rose-500" />
                                                                ) : (
                                                                    <Eye className="w-3 h-3 text-[#0f766e]" />
                                                                )}
                                                                <span>{reg.is_pdf_receipt || reg.payment_proof?.toLowerCase().endsWith('.pdf') ? 'View PDF' : 'View Proof'}</span>
                                                            </button>
                                                        ) : (
                                                            <span className="text-slate-400 italic text-[11px]">No receipt file</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Consent */}
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                                        <span>Agreed: {reg.agreed_terms || 'Yes'}</span>
                                                    </span>
                                                    <div className="text-[10px] text-slate-400 mt-1">
                                                        Non-refundable
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {reg.is_archived ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-300">
                                                            <Archive className="w-3 h-3 text-slate-500" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                                reg.status === 'Approved'
                                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                    : reg.status === 'Rejected'
                                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
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
                                                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
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
                                                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors border border-emerald-200 cursor-pointer"
                                                                title="Approve & Send Congratulations Welcome"
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
                                                                className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors border border-amber-200 cursor-pointer"
                                                                title="Reject & Send Notice"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        )}

                                                        <a
                                                            href={`/admin/world-plan/${reg.id}/invoice`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0f766e] transition-colors border border-teal-200 cursor-pointer inline-flex items-center justify-center"
                                                            title="Download Official Invoice (PDF)"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </a>

                                                        <button
                                                            type="button"
                                                            onClick={() => openCredentialsModal(reg)}
                                                            className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0f766e] transition-colors border border-teal-200 cursor-pointer"
                                                            title="Send Portal Login Credentials"
                                                        >
                                                            <KeyRound className="w-4 h-4" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(reg.id, reg.full_name || reg.username)}
                                                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200 cursor-pointer"
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
                        <div className="py-4 px-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 bg-slate-50/70">
                            <div>
                                Showing <strong className="text-slate-900">{registrations.from || 0}</strong> to <strong className="text-slate-900">{registrations.to || 0}</strong> of <strong className="text-slate-900">{registrations.total || 0}</strong> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {registrations.links.map((link, idx) => (
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
                    {regList.length === 0 ? (
                        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500 text-xs shadow-xs">
                            <Globe className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
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
                                            ? 'bg-teal-50/50 border-teal-300 shadow-sm'
                                            : 'bg-white border-slate-200/90 shadow-xs'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(reg.id)}
                                                className="w-4 h-4 rounded border-slate-300 bg-white text-[#0f766e] focus:ring-[#0f766e]"
                                            />
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm mb-0">
                                                    {reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`.trim()}
                                                </h4>
                                                <span className="text-[11px] text-slate-500 font-mono">@{reg.username}</span>
                                            </div>
                                        </div>

                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                reg.status === 'Approved'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : reg.status === 'Rejected'
                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}
                                        >
                                            {reg.status}
                                        </span>
                                    </div>

                                    <div className="py-3 space-y-2 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Package:</span>
                                            <span className="font-bold text-[#0f766e]">{reg.package_type}</span>
                                        </div>
                                        {reg.product_set && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500">Set:</span>
                                                <span className="text-slate-800 font-medium truncate max-w-[200px]">{reg.product_set}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Remittance:</span>
                                            <span className="text-slate-800 font-medium">{reg.amount_paid} ({reg.payment_method})</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Country:</span>
                                            <span className="text-slate-700">{reg.country || 'Philippines'}</span>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {(reg.payment_proof_url || reg.payment_proof) && (
                                                <button
                                                    onClick={() => setProofModalItem(reg)}
                                                    className="px-2.5 py-1.5 rounded-lg bg-teal-50 text-[#0f766e] text-xs font-semibold flex items-center gap-1 border border-teal-200"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Proof</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setDetailsModalItem(reg)}
                                                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200"
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
                                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1 border border-emerald-200"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    <span>Approve</span>
                                                </button>
                                            )}
                                            <a
                                                href={`/admin/world-plan/${reg.id}/invoice`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-2.5 py-1.5 rounded-lg bg-teal-50 text-[#0f766e] text-xs font-semibold flex items-center gap-1 border border-teal-200 no-underline"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>Invoice</span>
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => openCredentialsModal(reg)}
                                                className="px-2.5 py-1.5 rounded-lg bg-teal-50 text-[#0f766e] text-xs font-semibold flex items-center gap-1 border border-teal-200 cursor-pointer"
                                            >
                                                <KeyRound className="w-3.5 h-3.5" />
                                                <span>Credentials</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(reg.id, reg.full_name || reg.username)}
                                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 cursor-pointer"
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

            {/* MODAL 1: VIEW DETAILS (Clean White Modal) */}
            {detailsModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl relative space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-0">World Plan Registration Details</h3>
                                <span className="text-[11px] text-slate-500 mt-0.5 block">Record #{detailsModalItem.id} &bull; Registered via infinite-limitless.com</span>
                            </div>
                            <button
                                onClick={() => setDetailsModalItem(null)}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Username</div>
                                    <div className="text-slate-900 font-bold text-sm mt-0.5">@{detailsModalItem.username}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Full Name</div>
                                    <div className="text-slate-900 font-bold text-sm mt-0.5">{detailsModalItem.full_name}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Email</div>
                                    <div className="text-[#0f766e] font-mono font-medium mt-0.5">{detailsModalItem.email}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Contact No</div>
                                    <div className="text-slate-900 font-medium mt-0.5">{detailsModalItem.contact_no}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Country</div>
                                    <div className="text-slate-900 font-medium mt-0.5">{detailsModalItem.country || 'Philippines'}</div>
                                </div>
                                <div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Sponsor / Referral</div>
                                    <div className="text-[#0f766e] font-bold mt-0.5">@{detailsModalItem.sponsor || 'None'}</div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Delivery / Shipping Address</div>
                                    <div className="text-slate-700 mt-1 leading-relaxed">{detailsModalItem.address}</div>
                                </div>
                            </div>

                            <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200 space-y-2">
                                <div className="text-[#0f766e] font-bold uppercase tracking-wider text-[10px]">Selected Package &amp; Payment</div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-900 font-bold">{detailsModalItem.package_type}</span>
                                    <span className="text-[#0f766e] font-bold">{detailsModalItem.amount_paid}</span>
                                </div>
                                {detailsModalItem.product_set && (
                                    <div className="text-slate-700 text-[11px]">Selected Set: <strong>{detailsModalItem.product_set}</strong></div>
                                )}
                                <div className="text-slate-500 text-[11px]">
                                    Paid via <strong>{detailsModalItem.payment_method}</strong> on {detailsModalItem.payment_date}
                                </div>
                            </div>

                            {/* Agreed Terms Badge */}
                            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px]">
                                <div className="font-bold flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Non-Refundable Policy &amp; Data Privacy Accepted</span>
                                </div>
                                <div className="text-slate-500 text-[10px] mt-1">
                                    Consent Timestamp: {detailsModalItem.agreed_terms_at ? new Date(detailsModalItem.agreed_terms_at).toLocaleString() : 'Recorded upon registration'}
                                </div>
                            </div>

                            {/* Payment Receipt Preview */}
                            {(detailsModalItem.payment_proof_url || detailsModalItem.payment_proof) && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                                            Uploaded Bank Remittance Receipt
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => openProofModal(detailsModalItem)}
                                            className="text-[#0f766e] hover:text-[#115e59] text-xs font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                                        >
                                            <Eye className="w-3.5 h-3.5" /> Expand &amp; Inspect
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => openProofModal(detailsModalItem)}
                                        className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-center cursor-pointer group hover:border-[#0f766e] transition-all relative overflow-hidden"
                                    >
                                        {detailsModalItem.is_pdf_receipt || detailsModalItem.payment_proof?.toLowerCase().endsWith('.pdf') ? (
                                            <div className="p-6 flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-800">PDF Remittance Document</span>
                                                <span className="text-[11px] text-slate-500 font-mono">{detailsModalItem.payment_proof}</span>
                                                <span className="text-[11px] text-[#0f766e] font-semibold group-hover:text-[#115e59] mt-1">
                                                    Click to view / open PDF in viewer &rarr;
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <img
                                                    src={detailsModalItem.payment_proof_url}
                                                    alt="Proof of Payment"
                                                    className="max-h-60 mx-auto rounded-lg object-contain group-hover:opacity-90 transition-opacity"
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                                        <span>File: {detailsModalItem.payment_proof}</span>
                                        <a
                                            href={`/storage/payment_proofs/${detailsModalItem.payment_proof}/download`}
                                            download
                                            className="text-[#0f766e] hover:text-[#115e59] font-medium inline-flex items-center gap-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download className="w-3 h-3" /> Download File
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Actions in details modal */}
                            <div className="flex justify-end items-center gap-2.5 pt-3 border-t border-slate-200 flex-wrap">
                                <a
                                    href={`/admin/world-plan/${detailsModalItem.id}/invoice`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-slate-50 hover:bg-slate-100 text-[#0f766e] font-bold px-4 py-2 rounded-xl text-xs border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-xs no-underline"
                                >
                                    <Download className="w-4 h-4" /> Download Invoice (PDF)
                                </a>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const target = detailsModalItem;
                                        setDetailsModalItem(null);
                                        openCredentialsModal(target);
                                    }}
                                    className="bg-[#0f766e] hover:bg-[#115e59] text-white font-bold px-4 py-2 rounded-xl text-xs border-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                    <KeyRound className="w-4 h-4" /> Send Credentials
                                </button>
                                {detailsModalItem.status !== 'Approved' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setApproveModalItem(detailsModalItem);
                                            setAdminNotes('');
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs border-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs border-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-0">Approve World Plan Registration</h3>
                                <span className="text-[11px] text-slate-500 mt-0.5 block">Applicant: {approveModalItem.full_name}</span>
                            </div>
                            <button
                                onClick={() => setApproveModalItem(null)}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleApproveSubmit} className="space-y-4 text-xs">
                            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-slate-700">
                                <div className="font-bold text-emerald-800 mb-1">Built-in Confirmation Response:</div>
                                <p className="mb-0 text-slate-600 leading-relaxed">
                                    "Your registration for World Plan containing package <strong>{approveModalItem.package_type}</strong> {approveModalItem.product_set ? `and product set: ${approveModalItem.product_set}` : ''} has been officially approved! Online 24/7 account setup and product dispatch allocation are now initiated."
                                </p>
                            </div>

                            <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200 text-[#0f766e] text-[11px] space-y-1.5">
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-[#0f766e]" />
                                    <span>Automated Attachments Included in Approval Email:</span>
                                </div>
                                <div className="text-emerald-700 pl-4">
                                    &bull; <strong>Official Package Invoice &amp; Receipt (PDF):</strong> Complete itemized package breakdown, inclusions, and paid verification.
                                </div>
                                <div className="text-slate-600 pl-4">
                                    &bull; <strong>Welcome Certificate (image.png):</strong> Official INFINITE Congratulations flyer graphic.
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Optional Administrator Note (Included in approval email)
                                </label>
                                <textarea
                                    rows="3"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="e.g. Welcome to the Infinite Family! Your tracking number will be provided shortly."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setApproveModalItem(null)}
                                    className="px-4 py-2.5 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-semibold border border-slate-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingAction}
                                    className="px-5 py-2.5 bg-[#0f766e] hover:bg-[#115e59] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-xs disabled:opacity-50"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-0">Reject Registration</h3>
                                <span className="text-[11px] text-slate-500 mt-0.5 block">Applicant: {rejectModalItem.full_name}</span>
                            </div>
                            <button
                                onClick={() => setRejectModalItem(null)}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleRejectSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Reason for Disapproval *
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="e.g. The remittance slip was blurry or the payment amount could not be verified with our bank deposit records. Please re-upload a clear receipt."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setRejectModalItem(null)}
                                    className="px-4 py-2.5 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-semibold border border-slate-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processingAction}
                                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-xs disabled:opacity-50"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>{processingAction ? 'Sending Rejection Notice...' : 'Confirm Rejection'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 5: SEND LOGIN CREDENTIALS */}
            {credentialsModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-7 text-left">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                    <KeyRound className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0">
                                        Send Login Credentials
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0">
                                        Dispatch official portal credentials to client email
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!sendingCredentials) {
                                        setCredentialsModalItem(null);
                                    }
                                }}
                                disabled={sendingCredentials}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSendCredentialsSubmit} className="mt-5 space-y-4">
                            {/* 1. Client Email (Viewable Only, Not Editable) */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                        <span>Client Email (Viewable Only)</span>
                                    </label>
                                    <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> Locked &bull; Non-editable
                                    </span>
                                </div>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={credentialsModalItem.email || ''}
                                        readOnly
                                        disabled
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-600 font-medium cursor-not-allowed select-all"
                                    />
                                </div>
                                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                                    <span>Recipient: <strong className="text-slate-900">{credentialsModalItem.full_name || `${credentialsModalItem.first_name || ''} ${credentialsModalItem.last_name || ''}`.trim()}</strong></span>
                                    <span className="text-[#0f766e] font-semibold">{credentialsModalItem.package_type}</span>
                                </div>
                            </div>

                            {/* 2. Username (Manually Editable) */}
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                                    Client Username <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={credUsername}
                                        onChange={(e) => setCredUsername(e.target.value)}
                                        required
                                        placeholder="Type client username..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* 3. Password (Manually Editable + Generator) */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                                        Client Password <span className="text-rose-500">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={generateRandomPassword}
                                        className="text-[11px] font-bold text-[#0f766e] hover:text-[#115e59] flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                                    >
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Generate Password</span>
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showCredPassword ? 'text' : 'password'}
                                        value={credPassword}
                                        onChange={(e) => setCredPassword(e.target.value)}
                                        required
                                        placeholder="Type or generate client portal password..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCredPassword(!showCredPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-transparent border-0 cursor-pointer p-0"
                                        title={showCredPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showCredPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Direct Portal Notice */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-[#0f766e] shrink-0" />
                                    <span className="text-slate-600 text-[11px]">Official Portal link in email:</span>
                                </div>
                                <span className="font-mono text-[11px] font-bold text-[#0f766e]">helloinfinity.net/iprosperity</span>
                            </div>

                            {/* Footer Buttons */}
                            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setCredentialsModalItem(null)}
                                    disabled={sendingCredentials}
                                    className="px-4 py-2.5 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-semibold border border-slate-300 cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sendingCredentials || !credUsername.trim() || !credPassword.trim()}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sendingCredentials ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Sending Email...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Send Credentials Email</span>
                                        </>
                                    )}
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
                        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-4xl p-4 sm:p-6 shadow-2xl relative space-y-4 max-h-[95vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs uppercase font-extrabold text-[#0f766e] tracking-wider">
                                            Remittance Receipt Inspector
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            isPdf ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-teal-50 text-[#0f766e] border border-teal-200'
                                        }`}>
                                            {isPdf ? 'PDF Document' : 'Image Photo'}
                                        </span>
                                    </div>
                                    <div className="text-[12px] text-slate-600">
                                        <span className="font-semibold text-slate-900">{proofModalItem.full_name}</span>
                                        <span className="text-slate-500"> (@{proofModalItem.username})</span>
                                        <span className="text-slate-300 mx-1.5">&bull;</span>
                                        <span className="text-[#0f766e] font-mono font-bold">{proofModalItem.amount_paid || 'Remittance'}</span>
                                        {proofModalItem.payment_method && (
                                            <>
                                                <span className="text-slate-300 mx-1.5">&bull;</span>
                                                <span className="text-slate-600">{proofModalItem.payment_method}</span>
                                            </>
                                        )}
                                        {proofModalItem.payment_date && (
                                            <>
                                                <span className="text-slate-300 mx-1.5">&bull;</span>
                                                <span className="text-slate-500 font-mono">{proofModalItem.payment_date}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setProofModalItem(null)}
                                    className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                                    title="Close viewer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Viewer Stage */}
                            <div className="bg-slate-50 p-2 sm:p-4 rounded-xl border border-slate-200 text-center relative overflow-hidden flex-1 min-h-[350px] max-h-[65vh] flex items-center justify-center">
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
                                        <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-800">Receipt Image Unavailable for Preview</p>
                                        <p className="text-xs text-slate-500 font-mono">File: {proofModalItem.payment_proof}</p>
                                        <div className="pt-2 flex justify-center gap-2">
                                            <a
                                                href={directViewUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-[#0f766e] text-xs font-bold hover:bg-teal-100 transition-colors no-underline"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" /> Try Direct Link
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => setProofImgError(false)}
                                                className="px-3 py-1.5 rounded-lg bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 border border-slate-200 cursor-pointer"
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
                                            className="max-h-[55vh] max-w-full rounded-lg object-contain shadow-sm cursor-zoom-in"
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
                                                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <ZoomIn className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-mono">{Math.round(proofZoom * 100)}%</span>
                                            </button>
                                            <button
                                                type="button"
                                                title="Zoom Out"
                                                onClick={() => setProofZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                                                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <ZoomOut className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                title="Rotate 90 degrees clockwise"
                                                onClick={() => setProofRotation((r) => (r + 90) % 360)}
                                                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                            >
                                                <RotateCw className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline text-[11px]">Rotate {proofRotation ? `(${proofRotation}°)` : ''}</span>
                                            </button>
                                            {(proofZoom !== 1 || proofRotation !== 0) && (
                                                <button
                                                    type="button"
                                                    title="Reset Zoom & Rotation"
                                                    onClick={() => { setProofZoom(1); setProofRotation(0); }}
                                                    className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-[11px] font-semibold cursor-pointer transition-colors"
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
                                        className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex items-center gap-1 cursor-pointer transition-colors no-underline"
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
                                        className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-1.5 no-underline shadow-xs transition-all cursor-pointer"
                                    >
                                        <Download className="w-4 h-4 stroke-[2.5]" />
                                        <span>Download Receipt</span>
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setProofModalItem(null)}
                                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 cursor-pointer transition-colors"
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
