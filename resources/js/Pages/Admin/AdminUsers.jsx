import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Users,
    UserPlus,
    Search,
    Shield,
    ShieldAlert,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Edit2,
    Trash2,
    Archive,
    RotateCcw,
    Lock,
    Key,
    KeyRound,
    Mail,
    User,
    Clock,
    X,
    Eye,
    EyeOff,
    Check,
    Globe,
    AlertCircle,
    Calendar,
    ChevronRight,
    Sparkles,
    ArrowUpRight,
} from 'lucide-react';

export default function AdminUsers({ admins = { data: [] }, currentAdminId = null, stats = {}, filters = {} }) {
    const adminList = admins.data || [];
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || 'all');
    const [status, setStatus] = useState(filters.status || 'all');
    const [currentView, setCurrentView] = useState(filters.view || 'active');

    // Selection for bulk actions
    const [selectedIds, setSelectedIds] = useState([]);

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [deleteModalAdmin, setDeleteModalAdmin] = useState(null);

    // Password visibility toggles
    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showCreateConfirmPass, setShowCreateConfirmPass] = useState(false);
    const [showEditPass, setShowEditPass] = useState(false);
    const [showEditConfirmPass, setShowEditConfirmPass] = useState(false);

    // Dedicated Reset Password Modal State
    const [resetPassModalAdmin, setResetPassModalAdmin] = useState(null);
    const [showResetPass, setShowResetPass] = useState(false);
    const [showResetConfirmPass, setShowResetConfirmPass] = useState(false);

    const resetPassForm = useForm({
        password: '',
        password_confirmation: '',
    });

    const openResetPassModal = (admin) => {
        setResetPassModalAdmin(admin);
        resetPassForm.reset();
        resetPassForm.clearErrors();
        setShowResetPass(false);
        setShowResetConfirmPass(false);
    };

    const generateRandomAdminPassword = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
        let pass = '';
        for (let i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        resetPassForm.setData({
            password: pass,
            password_confirmation: pass,
        });
        setShowResetPass(true);
        setShowResetConfirmPass(true);
    };

    const handleResetPassSubmit = (e) => {
        e.preventDefault();
        if (!resetPassModalAdmin) return;
        resetPassForm.clearErrors();
        if (resetPassForm.data.password.length < 8) {
            resetPassForm.setError('password', 'New password must be at least 8 characters long.');
            return;
        }
        if (resetPassForm.data.password !== resetPassForm.data.password_confirmation) {
            resetPassForm.setError('password_confirmation', 'Passwords do not match. Please verify.');
            return;
        }
        resetPassForm.post(`/admin/admins/${resetPassModalAdmin.id}/change-password`, {
            preserveScroll: true,
            onSuccess: () => {
                setResetPassModalAdmin(null);
                resetPassForm.reset();
            },
        });
    };

    // Filter submit
    const applyFilters = (newParams = {}) => {
        const params = {
            search,
            role,
            status,
            view: currentView,
            ...newParams,
        };
        router.get('/admin/admins', params, { preserveState: true, replace: true });
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

    // Selection handlers
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const safeIds = adminList.filter((a) => a.id !== currentAdminId).map((a) => a.id);
            setSelectedIds(safeIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleToggleSelect = (id) => {
        if (id === currentAdminId) return;
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Bulk actions
    const handleBulkArchive = () => {
        if (!selectedIds.length) return;
        if (confirm(`Archive ${selectedIds.length} selected administrator(s)?`)) {
            router.post('/admin/admins/bulk-archive', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleBulkRestore = () => {
        if (!selectedIds.length) return;
        router.post('/admin/admins/bulk-restore', { ids: selectedIds }, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleBulkDelete = () => {
        if (!selectedIds.length) return;
        if (confirm(`WARNING: Permanently delete ${selectedIds.length} selected administrator(s) from database? This cannot be undone.`)) {
            router.post('/admin/admins/bulk-delete', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    // Single item toggle
    const handleToggleStatus = (admin) => {
        if (admin.id === currentAdminId) {
            alert('You cannot deactivate your own logged-in account.');
            return;
        }
        router.patch(`/admin/admins/${admin.id}/toggle-status`, {}, { preserveScroll: true });
    };

    // Create Form
    const createForm = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'Admin',
        status: 'Active',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/admins', {
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
            },
        });
    };

    // Edit Form
    const editForm = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'Admin',
        status: 'Active',
    });

    const openEditModal = (admin) => {
        setEditingAdmin(admin);
        editForm.setData({
            name: admin.name || '',
            username: admin.username || '',
            email: admin.email || '',
            password: '',
            password_confirmation: '',
            role: admin.role || 'Admin',
            status: admin.status || 'Active',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingAdmin) return;
        editForm.put(`/admin/admins/${editingAdmin.id}`, {
            onSuccess: () => {
                setEditingAdmin(null);
                editForm.reset();
            },
        });
    };

    const confirmDelete = () => {
        if (!deleteModalAdmin) return;
        router.delete(`/admin/admins/${deleteModalAdmin.id}`, {
            onSuccess: () => setDeleteModalAdmin(null),
        });
    };

    const getRoleBadge = (r) => {
        switch (r) {
            case 'Super Admin':
                return {
                    bg: 'bg-purple-50 text-purple-700 border-purple-200',
                    dot: 'bg-purple-500',
                    icon: ShieldAlert,
                };
            case 'Manager':
                return {
                    bg: 'bg-blue-50 text-blue-700 border-blue-200',
                    dot: 'bg-blue-500',
                    icon: Shield,
                };
            case 'Moderator':
                return {
                    bg: 'bg-amber-50 text-amber-700 border-amber-200',
                    dot: 'bg-amber-500',
                    icon: User,
                };
            case 'Admin':
            default:
                return {
                    bg: 'bg-teal-50 text-[#0f766e] border-teal-200',
                    dot: 'bg-[#0f766e]',
                    icon: ShieldCheck,
                };
        }
    };

    const selectableAdmins = adminList.filter((a) => a.id !== currentAdminId);

    return (
        <AdminLayout
            title="Administrator Accounts & Roles"
            subtitle="Manage executive console credentials, assign permission levels, and govern portal access"
        >
            <Head title="Admin Users & Access Control | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Top Header Card */}
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-white border border-slate-200/90 shadow-xs overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#0f766e] shrink-0" />
                            <span>RBAC &amp; Access Control</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Users className="w-6 h-6 text-[#0f766e]" />
                            <span>Administrator Accounts</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                            Manage executive console credentials, assign permission levels, and govern portal access.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all border-0 shrink-0 cursor-pointer"
                    >
                        <UserPlus className="w-4 h-4 stroke-[2.5]" />
                        <span>Create New Admin</span>
                    </button>
                </div>

                {/* 4 Header KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                    {/* KPI 1: Total Admins */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Total Administrators
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0f766e] shadow-xs">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                {stats.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200">
                                RBAC Team
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Console Accounts</span>
                            <span className="text-[#0f766e] font-mono text-[11px] font-semibold">{stats.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 2: Active Accounts */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#10b981,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Active Accounts
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                                {stats.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Operational
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Authorized Operators</span>
                            <span className="text-slate-500 text-[11px] font-semibold">{stats.inactive || 0} suspended</span>
                        </div>
                    </div>

                    {/* KPI 3: Super Admins */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#a855f7,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Super Administrators
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-purple-700 tracking-tight">
                                {stats.super_admins || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                Full Authority
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Root Permissions</span>
                            <span className="text-purple-700 font-bold text-[11px]">Primary Tier</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Accounts */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#f59e0b,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Archived Accounts
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#f59e0b] shadow-xs">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">
                                {stats.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                Archived
                            </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Preserved in Database</span>
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
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'active'
                                        ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active Admins ({stats.active || 0})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'archived'
                                        ? 'bg-[#f59e0b] text-slate-900 font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archived ({stats.archived || 0})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('all')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'all'
                                        ? 'bg-slate-800 text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <Users className="w-3.5 h-3.5" />
                                <span>All Accounts ({stats.total || 0})</span>
                            </button>
                        </div>

                        <div className="text-xs text-slate-500 font-medium">
                            Displaying <strong className="text-slate-900">{adminList.length}</strong> operator(s)
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search administrators by username, name, email address..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0.5"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </form>

                        <div className="flex items-center gap-2">
                            <select
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    applyFilters({ role: e.target.value });
                                }}
                                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#0f766e] focus:bg-white font-medium"
                            >
                                <option value="all">All Roles</option>
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Moderator">Moderator</option>
                            </select>

                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    applyFilters({ status: e.target.value });
                                }}
                                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#0f766e] focus:bg-white font-medium"
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active Only</option>
                                <option value="Inactive">Inactive Only</option>
                            </select>
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
                                            checked={
                                                selectableAdmins.length > 0 &&
                                                selectedIds.length === selectableAdmins.length
                                            }
                                            onChange={handleSelectAll}
                                            className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                            title="Select all administrators"
                                        />
                                    </th>
                                    <th className="p-3.5">Administrator</th>
                                    <th className="p-3.5">Permission Role</th>
                                    <th className="p-3.5 text-center">Account Status</th>
                                    <th className="p-3.5">Last Login Info</th>
                                    <th className="p-3.5">Created Date</th>
                                    <th className="p-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {adminList.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-slate-500">
                                            <Users className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#0f766e]" />
                                            <p className="text-sm font-bold text-slate-800">No administrator accounts found</p>
                                            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords</p>
                                        </td>
                                    </tr>
                                ) : (
                                    adminList.map((a) => {
                                        const roleMeta = getRoleBadge(a.role);
                                        const RoleIcon = roleMeta.icon;
                                        const isSelf = a.id === currentAdminId;
                                        const isSelected = selectedIds.includes(a.id);
                                        const initial = (a.name || a.username || 'A').charAt(0).toUpperCase();

                                        return (
                                            <tr
                                                key={a.id}
                                                className={`transition-colors ${
                                                    isSelected
                                                        ? 'bg-teal-50/70 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)]'
                                                        : isSelf
                                                        ? 'bg-slate-50/90'
                                                        : 'hover:bg-slate-50/70'
                                                }`}
                                            >
                                                <td className="p-3.5 text-center">
                                                    <input
                                                        type="checkbox"
                                                        disabled={isSelf}
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(a.id)}
                                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] disabled:opacity-30 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-200 flex items-center justify-center font-extrabold text-xs shadow-xs shrink-0">
                                                            {initial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-900 text-xs truncate">
                                                                    {a.name || a.username}
                                                                </span>
                                                                {isSelf && (
                                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-50 text-[#0f766e] border border-teal-200">
                                                                        YOU
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 font-mono truncate">
                                                                @{a.username} • {a.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3.5">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${roleMeta.bg}`}
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full ${roleMeta.dot}`} />
                                                        <RoleIcon className="w-3 h-3" />
                                                        <span>{a.role || 'Admin'}</span>
                                                    </span>
                                                </td>
                                                <td className="p-3.5 text-center">
                                                    {a.is_archived ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                            <Archive className="w-3 h-3 text-[#f59e0b]" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                                                a.status === 'Active'
                                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    a.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                                                                }`}
                                                            />
                                                            <span>{a.status || 'Active'}</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                                                    {a.last_login_at
                                                        ? new Date(a.last_login_at).toLocaleString('en-PH', {
                                                              month: 'short',
                                                              day: 'numeric',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                          })
                                                        : 'Never logged in'}
                                                </td>
                                                <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                                                    {new Date(a.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="p-3.5 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {!a.is_archived && !isSelf && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleStatus(a)}
                                                                className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                                                                    a.status === 'Active'
                                                                        ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                                }`}
                                                                title={a.status === 'Active' ? 'Deactivate account' : 'Activate account'}
                                                            >
                                                                {a.status === 'Active' ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() => openResetPassModal(a)}
                                                            className="p-1.5 rounded-lg bg-teal-50 text-[#0f766e] border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer"
                                                            title="Reset administrator password"
                                                        >
                                                            <KeyRound className="w-3.5 h-3.5" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(a)}
                                                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                                                            title="Edit credentials & role"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>

                                                        {!isSelf && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteModalAdmin(a)}
                                                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                                                                title="Delete administrator"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE CARD VIEW (md:hidden) */}
                    <div className="md:hidden space-y-3">
                        {adminList.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-200">
                                <Users className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#0f766e]" />
                                <span>No administrator accounts found.</span>
                            </div>
                        ) : (
                            adminList.map((a) => {
                                const roleMeta = getRoleBadge(a.role);
                                const RoleIcon = roleMeta.icon;
                                const isSelf = a.id === currentAdminId;
                                const isSelected = selectedIds.includes(a.id);
                                const initial = (a.name || a.username || 'A').charAt(0).toUpperCase();

                                return (
                                    <div
                                        key={a.id}
                                        className={`p-4 rounded-xl border transition-all ${
                                            isSelected
                                                ? 'bg-teal-50/70 border-[#0f766e] shadow-md'
                                                : isSelf
                                                ? 'bg-slate-50 border-slate-300'
                                                : 'bg-white border-slate-200/90 shadow-xs'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    disabled={isSelf}
                                                    checked={isSelected}
                                                    onChange={() => handleToggleSelect(a.id)}
                                                    className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] disabled:opacity-30"
                                                />
                                                <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-200 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs">
                                                    {initial}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="font-bold text-slate-900 text-xs mb-0">
                                                            {a.name || a.username}
                                                        </h4>
                                                        {isSelf && (
                                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200">
                                                                YOU
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] text-slate-500 font-mono">@{a.username}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${roleMeta.bg}`}>
                                                    <RoleIcon className="w-2.5 h-2.5" />
                                                    <span>{a.role}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                            <div className="text-[10px] text-slate-500 font-medium">
                                                Created {new Date(a.created_at).toLocaleDateString()}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {!a.is_archived && !isSelf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(a)}
                                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                                                    >
                                                        {a.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => openResetPassModal(a)}
                                                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-50 border border-teal-200 text-[#0f766e] flex items-center gap-1"
                                                >
                                                    <KeyRound className="w-3 h-3" />
                                                    <span>Password</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(a)}
                                                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                                                >
                                                    Edit
                                                </button>

                                                {!isSelf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteModalAdmin(a)}
                                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Pagination */}
                    {admins.links && admins.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs text-slate-500">
                            <div>
                                Showing <strong className="text-slate-900">{admins.from || 0}</strong> to{' '}
                                <strong className="text-slate-900">{admins.to || 0}</strong> of{' '}
                                <strong className="text-slate-900">{admins.total || 0}</strong> administrators
                            </div>
                            <div className="flex items-center gap-1">
                                {admins.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition-all border-0 cursor-pointer ${
                                            link.active
                                                ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 disabled:opacity-30'
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
                            Administrator(s) Selected
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {currentView === 'archived' ? (
                            <button
                                type="button"
                                onClick={handleBulkRestore}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBulkArchive}
                                className="bg-[#f59e0b] hover:bg-amber-600 text-slate-950 font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archive</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleBulkDelete}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="bg-slate-800 text-slate-300 hover:text-white rounded-xl px-2.5 py-1.5 text-xs border border-slate-700 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 1: CREATE ADMIN
            ======================================================== */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                                    <UserPlus className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight mb-0">Create New Administrator</h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">Provision authorized portal operator credentials</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center border border-slate-200 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="e.g. Johnathan Doe"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                    />
                                </div>
                                {createForm.errors.name && (
                                    <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {createForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Username <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.username}
                                        onChange={(e) => createForm.setData('username', e.target.value)}
                                        placeholder="e.g. jdoe_admin"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                    />
                                    {createForm.errors.username && (
                                        <p className="text-rose-600 text-xs mt-1">{createForm.errors.username}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={createForm.data.email}
                                            onChange={(e) => createForm.setData('email', e.target.value)}
                                            placeholder="admin@example.com"
                                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                        />
                                    </div>
                                    {createForm.errors.email && (
                                        <p className="text-rose-600 text-xs mt-1">{createForm.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Permission Role
                                    </label>
                                    <select
                                        value={createForm.data.role}
                                        onChange={(e) => createForm.setData('role', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    >
                                        <option value="Admin">Admin (Full Operational)</option>
                                        <option value="Super Admin">Super Admin (Root Access)</option>
                                        <option value="Manager">Manager (Operations Lead)</option>
                                        <option value="Moderator">Moderator (Read / Limited)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Account Status
                                    </label>
                                    <select
                                        value={createForm.data.status}
                                        onChange={(e) => createForm.setData('status', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    >
                                        <option value="Active">Active (Permit Login)</option>
                                        <option value="Inactive">Inactive (Suspend Login)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Password (Min 8 chars) <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showCreatePass ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-9 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreatePass(!showCreatePass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showCreatePass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                    {createForm.errors.password && (
                                        <p className="text-rose-600 text-xs mt-1">{createForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Confirm Password <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showCreateConfirmPass ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password_confirmation}
                                            onChange={(e) => createForm.setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-9 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateConfirmPass(!showCreateConfirmPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showCreateConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border-0 shadow-xs disabled:opacity-60 cursor-pointer"
                                >
                                    {createForm.processing ? 'Creating...' : 'Create Admin Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 2: EDIT ADMIN
            ======================================================== */}
            {editingAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                                    <Edit2 className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight mb-0">
                                        Edit Administrator: @{editingAdmin.username}
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">Update operator account details and security</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingAdmin(null)}
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center border border-slate-200 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    />
                                </div>
                                {editForm.errors.name && (
                                    <p className="text-rose-600 text-xs mt-1">{editForm.errors.name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Username <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.username}
                                        onChange={(e) => editForm.setData('username', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    />
                                    {editForm.errors.username && (
                                        <p className="text-rose-600 text-xs mt-1">{editForm.errors.username}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={editForm.data.email}
                                            onChange={(e) => editForm.setData('email', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                        />
                                    </div>
                                    {editForm.errors.email && (
                                        <p className="text-rose-600 text-xs mt-1">{editForm.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Permission Role
                                    </label>
                                    <select
                                        value={editForm.data.role}
                                        onChange={(e) => editForm.setData('role', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Moderator">Moderator</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Account Status
                                    </label>
                                    <select
                                        disabled={editingAdmin.id === currentAdminId}
                                        value={editForm.data.status}
                                        onChange={(e) => editForm.setData('status', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0f766e] focus:bg-white disabled:opacity-50"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {editingAdmin.id === currentAdminId && (
                                        <span className="text-[10px] text-amber-600 mt-1 block">
                                            Cannot deactivate your current session
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Key className="w-3.5 h-3.5 text-[#0f766e]" />
                                    <span>Reset Password (Leave blank to keep current)</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type={showEditPass ? 'text' : 'password'}
                                            value={editForm.data.password}
                                            onChange={(e) => editForm.setData('password', e.target.value)}
                                            placeholder="New Password"
                                            className="w-full bg-white border border-slate-300 rounded-xl pl-3 pr-8 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowEditPass(!showEditPass)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showEditPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showEditConfirmPass ? 'text' : 'password'}
                                            value={editForm.data.password_confirmation}
                                            onChange={(e) => editForm.setData('password_confirmation', e.target.value)}
                                            placeholder="Confirm Password"
                                            className="w-full bg-white border border-slate-300 rounded-xl pl-3 pr-8 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowEditConfirmPass(!showEditConfirmPass)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showEditConfirmPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </div>
                                {editForm.errors.password && (
                                    <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{editForm.errors.password}</span>
                                    </p>
                                )}
                                {editForm.errors.password_confirmation && (
                                    <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{editForm.errors.password_confirmation}</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingAdmin(null)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border-0 shadow-xs disabled:opacity-60 cursor-pointer"
                                >
                                    {editForm.processing ? 'Saving...' : 'Save Updates'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 3: DELETE CONFIRMATION
            ======================================================== */}
            {deleteModalAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-md max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl text-center relative">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-rose-500 via-rose-400 to-[#f59e0b]" />

                        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                            <Trash2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Delete Administrator Account?</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                            Are you sure you want to permanently delete account{' '}
                            <strong className="text-slate-900">@{deleteModalAdmin.username}</strong> ({deleteModalAdmin.name})?
                            This administrator will immediately lose all portal access.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteModalAdmin(null)}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 border-0 shadow-xs cursor-pointer"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 4: RESET ADMIN PASSWORD
            ======================================================== */}
            {resetPassModalAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-md max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-4 text-left">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                    <KeyRound className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 mb-0 leading-tight">
                                        Reset Admin Password
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Assign a new password for @{resetPassModalAdmin.username}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!resetPassForm.processing) {
                                        setResetPassModalAdmin(null);
                                    }
                                }}
                                disabled={resetPassForm.processing}
                                className="text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Administrator Info Pill */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#0f766e] shrink-0" />
                                <div>
                                    <span className="font-bold text-slate-900 block">{resetPassModalAdmin.name}</span>
                                    <span className="text-slate-500 font-mono text-[11px]">@{resetPassModalAdmin.username}</span>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200">
                                {resetPassModalAdmin.role || 'Admin'}
                            </span>
                        </div>

                        <form onSubmit={handleResetPassSubmit} className="space-y-4">
                            {/* New Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                                        New Password <span className="text-[#0f766e]">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={generateRandomAdminPassword}
                                        className="text-[11px] font-bold text-[#0f766e] hover:text-[#115e59] flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Generate Strong</span>
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showResetPass ? 'text' : 'password'}
                                        required
                                        minLength={8}
                                        value={resetPassForm.data.password}
                                        onChange={(e) => resetPassForm.setData('password', e.target.value)}
                                        placeholder="Enter or generate new password..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowResetPass(!showResetPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0"
                                        title={showResetPass ? 'Hide password' : 'Show password'}
                                    >
                                        {showResetPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {resetPassForm.errors.password && (
                                    <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{resetPassForm.errors.password}</span>
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Confirm Password <span className="text-[#0f766e]">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showResetConfirmPass ? 'text' : 'password'}
                                        required
                                        minLength={8}
                                        value={resetPassForm.data.password_confirmation}
                                        onChange={(e) => resetPassForm.setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm new password..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowResetConfirmPass(!showResetConfirmPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0"
                                        title={showResetConfirmPass ? 'Hide password' : 'Show password'}
                                    >
                                        {showResetConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {resetPassForm.errors.password_confirmation && (
                                    <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{resetPassForm.errors.password_confirmation}</span>
                                    </p>
                                )}
                            </div>

                            {/* Password Rules Checklist */}
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1 text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                        resetPassForm.data.password.length >= 8
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-300'
                                            : 'bg-slate-200 text-slate-400'
                                    }`}>
                                        ✓
                                    </span>
                                    <span className={resetPassForm.data.password.length >= 8 ? 'text-emerald-700 font-semibold' : ''}>
                                        Minimum 8 characters
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                        resetPassForm.data.password.length > 0 &&
                                        resetPassForm.data.password === resetPassForm.data.password_confirmation
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-300'
                                            : 'bg-slate-200 text-slate-400'
                                    }`}>
                                        ✓
                                    </span>
                                    <span className={
                                        resetPassForm.data.password.length > 0 &&
                                        resetPassForm.data.password === resetPassForm.data.password_confirmation
                                            ? 'text-emerald-700 font-semibold'
                                            : ''
                                    }>
                                        Passwords match
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setResetPassModalAdmin(null)}
                                    disabled={resetPassForm.processing}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={resetPassForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border-0 shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {resetPassForm.processing ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
