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
                    bg: 'bg-purple-950/70 text-purple-300 border-purple-500/40',
                    dot: 'bg-purple-400',
                    icon: ShieldAlert,
                };
            case 'Manager':
                return {
                    bg: 'bg-blue-950/70 text-blue-300 border-blue-500/40',
                    dot: 'bg-blue-400',
                    icon: Shield,
                };
            case 'Moderator':
                return {
                    bg: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
                    dot: 'bg-amber-400',
                    icon: User,
                };
            case 'Admin':
            default:
                return {
                    bg: 'bg-[#24dbc3]/15 text-[#27dec9] border border-[#24dbc3]/30',
                    dot: 'bg-[#25dec0]',
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
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 xl:p-8 bg-[#061726]/90 border border-[#2c6973]/75 shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#15cbb7]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24dbc3]/10 border border-[#24dbc3]/30 text-[#27dec9] text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#25dec0] shrink-0" />
                            <span>RBAC &amp; Access Control</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            <Users className="w-6 h-6 text-[#25dec0]" />
                            <span>Administrator Accounts</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                            Manage executive console credentials, assign permission levels, and govern portal access.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="relative z-10 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold text-xs flex items-center gap-2 shadow-[0_4px_20px_rgba(36,219,195,0.25)] hover:brightness-110 active:scale-[.99] transition-all border-0 shrink-0 cursor-pointer"
                    >
                        <UserPlus className="w-4 h-4 stroke-[2.5]" />
                        <span>Create New Admin</span>
                    </button>
                </div>

                {/* 4 Header KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* KPI 1: Total Admins */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#24dbc3]/50 hover:shadow-[0_10px_35px_rgba(36,219,195,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#24dbc3] before:to-[#42f1ce]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Total Administrators
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#25dec0] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {stats.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#24dbc3]/15 text-[#27dec9] border border-[#24dbc3]/30 shrink-0">
                                RBAC Team
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Console Accounts</span>
                            <span className="text-[#25dec0] font-mono text-[11px]">{stats.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 2: Active Accounts */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-[0_10px_35px_rgba(16,185,129,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Active Accounts
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-emerald-400 tracking-wide">
                                {stats.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                                Operational
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Authorized Operators</span>
                            <span className="text-slate-400 text-[11px]">{stats.inactive || 0} suspended</span>
                        </div>
                    </div>

                    {/* KPI 3: Super Admins */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(168,85,247,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Super Administrators
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <ShieldAlert className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-purple-300 tracking-wide">
                                {stats.super_admins || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
                                Full Authority
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Root Permissions</span>
                            <span className="text-purple-300 font-bold text-[11px]">Primary Tier</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Accounts */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-amber-500/50 hover:shadow-[0_10px_35px_rgba(245,158,11,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Archived Accounts
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Archive className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-300 tracking-wide">
                                {stats.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                                Archived
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Preserved in Database</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Filter and Controls Container */}
                <div className="bg-[#061726]/90 border border-[#1b5361]/60 rounded-2xl p-4 sm:p-6 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl space-y-4">
                    {/* View Switcher Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b5361]/60">
                        <div className="flex items-center gap-1.5 bg-[#082033]/90 p-1 rounded-xl border border-[#1e4e5b]/70 text-xs font-semibold shadow-inner">
                            <button
                                type="button"
                                onClick={() => handleViewChange('active')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'active'
                                        ? 'bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold shadow-[0_2px_12px_rgba(36,219,195,0.25)]'
                                        : 'text-slate-300 hover:text-white bg-transparent'
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
                                        ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                                        : 'text-slate-300 hover:text-white bg-transparent'
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
                                        ? 'bg-[#0c2638] text-white font-extrabold border border-[#276472]/80 shadow-md'
                                        : 'text-slate-300 hover:text-white bg-transparent'
                                }`}
                            >
                                <Users className="w-3.5 h-3.5" />
                                <span>All Accounts ({stats.total || 0})</span>
                            </button>
                        </div>

                        <div className="text-xs text-slate-400 font-medium">
                            Displaying <strong className="text-white">{adminList.length}</strong> operator(s)
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
                                className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30 transition-all"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-0.5"
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
                                className="bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#24dbc3] font-medium"
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
                                className="bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#24dbc3] font-medium"
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active Only</option>
                                <option value="Inactive">Inactive Only</option>
                            </select>
                        </div>
                    </div>

                    {/* DESKTOP DATA TABLE (md:block) */}
                    <div className="hidden md:block overflow-x-auto border border-[#1b5361]/60 rounded-xl bg-[#061726]/90">
                        <table className="w-full text-left border-collapse text-xs min-w-[760px]">
                            <thead>
                                <tr className="border-b border-[#1b5361]/70 bg-[#082033]/95 text-slate-300 uppercase tracking-wider font-bold text-[11px]">
                                    <th className="p-3.5 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectableAdmins.length > 0 &&
                                                selectedIds.length === selectableAdmins.length
                                            }
                                            onChange={handleSelectAll}
                                            className="rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
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
                            <tbody className="divide-y divide-[#1b5361]/40 text-slate-300">
                                {adminList.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-slate-400">
                                            <Users className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#25dec0]" />
                                            <p className="text-sm font-bold text-slate-300">No administrator accounts found</p>
                                            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search keywords</p>
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
                                                        ? 'bg-[#15cbb7]/15'
                                                        : isSelf
                                                        ? 'bg-[#092b3a]/50'
                                                        : 'hover:bg-[#0c2638]/70'
                                                }`}
                                            >
                                                <td className="p-3.5 text-center">
                                                    <input
                                                        type="checkbox"
                                                        disabled={isSelf}
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(a.id)}
                                                        className="rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] disabled:opacity-30 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#008c89] to-[#25dec0] text-[#031927] flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
                                                            {initial}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-white text-xs truncate">
                                                                    {a.name || a.username}
                                                                </span>
                                                                {isSelf && (
                                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#24dbc3]/20 text-[#27dec9] border border-[#24dbc3]/40">
                                                                        YOU
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-[11px] text-slate-400 font-mono truncate">
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
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">
                                                            <Archive className="w-3 h-3 text-amber-400" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                                                a.status === 'Active'
                                                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                                                    : 'bg-rose-950/50 text-rose-300 border-rose-500/30'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    a.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'
                                                                }`}
                                                            />
                                                            <span>{a.status || 'Active'}</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3.5 text-slate-300 font-mono text-[11px]">
                                                    {a.last_login_at
                                                        ? new Date(a.last_login_at).toLocaleString('en-PH', {
                                                              month: 'short',
                                                              day: 'numeric',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                          })
                                                        : 'Never logged in'}
                                                </td>
                                                <td className="p-3.5 text-slate-400 font-mono text-[11px]">
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
                                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                                                }`}
                                                                title={a.status === 'Active' ? 'Deactivate account' : 'Activate account'}
                                                            >
                                                                {a.status === 'Active' ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(a)}
                                                            className="p-1.5 rounded-lg bg-[#24dbc3]/10 text-[#27dec9] border border-[#24dbc3]/30 hover:bg-[#24dbc3]/20 transition-colors cursor-pointer"
                                                            title="Edit credentials & role"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>

                                                        {!isSelf && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteModalAdmin(a)}
                                                                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-colors cursor-pointer"
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
                            <div className="p-8 text-center text-slate-400 text-xs bg-[#082033]/60 rounded-xl border border-[#1e4e5b]/60">
                                <Users className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#25dec0]" />
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
                                                ? 'bg-[#15cbb7]/15 border-[#24dbc3]/60 shadow-lg'
                                                : isSelf
                                                ? 'bg-[#092b3a]/70 border-[#24dbc3]/40'
                                                : 'bg-[#082033]/70 border-[#1e4e5b]/60'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    disabled={isSelf}
                                                    checked={isSelected}
                                                    onChange={() => handleToggleSelect(a.id)}
                                                    className="rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] disabled:opacity-30"
                                                />
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#008c89] to-[#25dec0] text-[#031927] flex items-center justify-center font-extrabold text-xs shrink-0">
                                                    {initial}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="font-bold text-white text-xs mb-0">
                                                            {a.name || a.username}
                                                        </h4>
                                                        {isSelf && (
                                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#24dbc3]/20 text-[#27dec9]">
                                                                YOU
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] text-slate-400 font-mono">@{a.username}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${roleMeta.bg}`}>
                                                    <RoleIcon className="w-2.5 h-2.5" />
                                                    <span>{a.role}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2">
                                            <div className="text-[10px] text-slate-400">
                                                Created {new Date(a.created_at).toLocaleDateString()}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {!a.is_archived && !isSelf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(a)}
                                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#082033] border border-[#1e4e5b]/80 text-slate-300 hover:text-white"
                                                    >
                                                        {a.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(a)}
                                                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#24dbc3]/10 border border-[#24dbc3]/30 text-[#27dec9]"
                                                >
                                                    Edit
                                                </button>

                                                {!isSelf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteModalAdmin(a)}
                                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300"
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
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#1b5361]/60 text-xs text-slate-400">
                            <div>
                                Showing <strong className="text-white">{admins.from || 0}</strong> to{' '}
                                <strong className="text-white">{admins.to || 0}</strong> of{' '}
                                <strong className="text-white">{admins.total || 0}</strong> administrators
                            </div>
                            <div className="flex items-center gap-1">
                                {admins.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition-all border-0 cursor-pointer ${
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
            </div>

            {/* FIXED BOTTOM FLOATING BULK ACTIONS TOOLBAR */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-[#061726]/95 backdrop-blur-xl border border-[#24dbc3]/40 rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-black flex items-center justify-center text-xs shadow-md">
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
                                className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
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
                            className="bg-[#082033] text-slate-300 hover:text-white rounded-xl px-2.5 py-1.5 text-xs border border-[#1e4e5b]/80 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                        <div className="flex items-center justify-between pb-4 border-b border-[#1b5361]/60 mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#24dbc3]/10 border border-[#24dbc3]/30 flex items-center justify-center text-[#25dec0]">
                                    <UserPlus className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white tracking-tight mb-0">Create New Administrator</h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">Provision authorized portal operator credentials</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="w-8 h-8 rounded-xl bg-[#082033] hover:bg-[#0c2638] text-slate-400 hover:text-white flex items-center justify-center border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Full Name <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="e.g. Johnathan Doe"
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                    />
                                </div>
                                {createForm.errors.name && (
                                    <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {createForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Username <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.username}
                                        onChange={(e) => createForm.setData('username', e.target.value)}
                                        placeholder="e.g. jdoe_admin"
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                    />
                                    {createForm.errors.username && (
                                        <p className="text-rose-400 text-xs mt-1">{createForm.errors.username}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Email Address <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={createForm.data.email}
                                            onChange={(e) => createForm.setData('email', e.target.value)}
                                            placeholder="admin@example.com"
                                            className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                        />
                                    </div>
                                    {createForm.errors.email && (
                                        <p className="text-rose-400 text-xs mt-1">{createForm.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Permission Role
                                    </label>
                                    <select
                                        value={createForm.data.role}
                                        onChange={(e) => createForm.setData('role', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    >
                                        <option value="Admin">Admin (Full Operational)</option>
                                        <option value="Super Admin">Super Admin (Root Access)</option>
                                        <option value="Manager">Manager (Operations Lead)</option>
                                        <option value="Moderator">Moderator (Read / Limited)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Account Status
                                    </label>
                                    <select
                                        value={createForm.data.status}
                                        onChange={(e) => createForm.setData('status', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    >
                                        <option value="Active">Active (Permit Login)</option>
                                        <option value="Inactive">Inactive (Suspend Login)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Password (Min 8 chars) <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showCreatePass ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreatePass(!showCreatePass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showCreatePass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                    {createForm.errors.password && (
                                        <p className="text-rose-400 text-xs mt-1">{createForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Confirm Password <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showCreateConfirmPass ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password_confirmation}
                                            onChange={(e) => createForm.setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateConfirmPass(!showCreateConfirmPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showCreateConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1b5361]/60">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#082033] border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#031927] bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 border-0 shadow-[0_4px_20px_rgba(36,219,195,0.25)] disabled:opacity-60 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden space-y-4">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                        <div className="flex items-center justify-between pb-4 border-b border-[#1b5361]/60 mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#24dbc3]/10 border border-[#24dbc3]/30 flex items-center justify-center text-[#25dec0]">
                                    <Edit2 className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white tracking-tight mb-0">
                                        Edit Administrator: @{editingAdmin.username}
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">Update operator account details and security</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingAdmin(null)}
                                className="w-8 h-8 rounded-xl bg-[#082033] hover:bg-[#0c2638] text-slate-400 hover:text-white flex items-center justify-center border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Full Name <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                    />
                                </div>
                                {editForm.errors.name && (
                                    <p className="text-rose-400 text-xs mt-1">{editForm.errors.name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Username <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.username}
                                        onChange={(e) => editForm.setData('username', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                    />
                                    {editForm.errors.username && (
                                        <p className="text-rose-400 text-xs mt-1">{editForm.errors.username}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Email Address <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={editForm.data.email}
                                            onChange={(e) => editForm.setData('email', e.target.value)}
                                            className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                        />
                                    </div>
                                    {editForm.errors.email && (
                                        <p className="text-rose-400 text-xs mt-1">{editForm.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Permission Role
                                    </label>
                                    <select
                                        value={editForm.data.role}
                                        onChange={(e) => editForm.setData('role', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Moderator">Moderator</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Account Status
                                    </label>
                                    <select
                                        disabled={editingAdmin.id === currentAdminId}
                                        value={editForm.data.status}
                                        onChange={(e) => editForm.setData('status', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3] disabled:opacity-40"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {editingAdmin.id === currentAdminId && (
                                        <span className="text-[10px] text-amber-400 mt-1 block">
                                            Cannot deactivate your current session
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-3.5 bg-[#082033]/80 rounded-2xl border border-[#1e4e5b]/70 space-y-2.5">
                                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <Key className="w-3.5 h-3.5 text-[#25dec0]" />
                                    <span>Reset Password (Leave blank to keep current)</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type={showEditPass ? 'text' : 'password'}
                                            value={editForm.data.password}
                                            onChange={(e) => editForm.setData('password', e.target.value)}
                                            placeholder="New Password"
                                            className="w-full bg-[#061726] border border-[#1e4e5b]/80 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowEditPass(!showEditPass)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer"
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
                                            className="w-full bg-[#061726] border border-[#1e4e5b]/80 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowEditConfirmPass(!showEditConfirmPass)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer"
                                        >
                                            {showEditConfirmPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1b5361]/60">
                                <button
                                    type="button"
                                    onClick={() => setEditingAdmin(null)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#082033] border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#031927] bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 border-0 shadow-[0_4px_20px_rgba(36,219,195,0.25)] disabled:opacity-60 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl text-center relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500" />

                        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Delete Administrator Account?</h4>
                        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                            Are you sure you want to permanently delete account{' '}
                            <strong className="text-white">@{deleteModalAdmin.username}</strong> ({deleteModalAdmin.name})?
                            This administrator will immediately lose all portal access.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteModalAdmin(null)}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#082033] border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 border-0 shadow-lg shadow-rose-500/20 cursor-pointer"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
