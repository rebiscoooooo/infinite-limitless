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
            // Exclude current logged in admin from selection for safety
            const safeIds = adminList.filter((a) => a.id !== currentAdminId).map((a) => a.id);
            setSelectedIds(safeIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleToggleSelect = (id) => {
        if (id === currentAdminId) return; // Prevent selecting self
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
        editForm.post(`/admin/admins/${editingAdmin.id}`, {
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

    const getRoleBadge = (roleName) => {
        switch (roleName) {
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
                    bg: 'bg-teal-950/70 text-teal-300 border-teal-500/40',
                    dot: 'bg-teal-400',
                    icon: ShieldCheck,
                };
        }
    };

    const selectableAdmins = adminList.filter((a) => a.id !== currentAdminId);

    return (
        <AdminLayout title="Administrator Users & RBAC Permissions">
            <Head title="Admin Users & Access Control | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Top Header Card */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-teal-950/30 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                RBAC &amp; Access Control
                            </span>
                            <span className="text-xs text-slate-500">&bull;</span>
                            <span className="text-xs text-slate-400 font-medium">System Operator Registry</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            <Users className="w-6 h-6 text-teal-400" />
                            Administrator Accounts
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Manage executive console credentials, assign permission levels, and govern portal access.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="btn bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider border-0 shrink-0 transition-transform active:scale-95"
                    >
                        <UserPlus className="w-4 h-4 stroke-[2.5]" />
                        <span>Create New Admin</span>
                    </button>
                </div>

                {/* 4 Header KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* KPI 1: Total Admins */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-teal-500/50 hover:shadow-teal-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-teal-400 before:to-emerald-400">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Total Administrators
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {stats.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                                RBAC Team
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Console Accounts</span>
                            <span className="text-teal-400 font-mono text-[11px]">{stats.active || 0} active</span>
                        </div>
                    </div>

                    {/* KPI 2: Active Accounts */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Active Accounts
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-emerald-400 tracking-wide">
                                {stats.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                Operational
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Authorized Operators</span>
                            <span className="text-slate-500 text-[11px]">{stats.inactive || 0} suspended</span>
                        </div>
                    </div>

                    {/* KPI 3: Super Admins */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Super Administrators
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-inner">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-purple-400 tracking-wide">
                                {stats.super_admins || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                Full Authority
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Root Permissions</span>
                            <span className="text-purple-400 font-bold text-[11px]">Primary Tier</span>
                        </div>
                    </div>

                    {/* KPI 4: Archived Accounts */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Archived Accounts
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-amber-400 tracking-wide">
                                {stats.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                Archived
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Preserved in Database</span>
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
                                <span>Active Admins</span>
                                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900/40 text-inherit">
                                    {stats.active || 0}
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
                                    {stats.archived || 0}
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
                                <Users className="w-3.5 h-3.5" />
                                <span>All Accounts</span>
                                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-inherit">
                                    {stats.total || 0}
                                </span>
                            </button>
                        </div>

                        <div className="text-xs text-slate-400 font-medium">
                            Displaying <strong className="text-white">{adminList.length}</strong> operator(s)
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search administrators by username, name, email address..."
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

                        <div className="flex items-center gap-2">
                            <select
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    applyFilters({ role: e.target.value });
                                }}
                                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-400 font-medium"
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
                                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-400 font-medium"
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active Only</option>
                                <option value="Inactive">Inactive Only</option>
                            </select>
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
                                            checked={
                                                selectableAdmins.length > 0 &&
                                                selectedIds.length === selectableAdmins.length
                                            }
                                            onChange={handleSelectAll}
                                            className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400"
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
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                {adminList.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-slate-500">
                                            <Users className="w-10 h-10 mx-auto mb-2 text-slate-600 opacity-60" />
                                            <p className="text-sm font-bold text-slate-300">No administrator accounts found</p>
                                            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords</p>
                                        </td>
                                    </tr>
                                ) : (
                                    adminList.map((a) => {
                                        const isSelf = a.id === currentAdminId;
                                        const isSelected = selectedIds.includes(a.id);
                                        const initial = (a.name || a.username || 'A').charAt(0).toUpperCase();
                                        const roleConfig = getRoleBadge(a.role);
                                        const RoleIcon = roleConfig.icon;

                                        return (
                                            <tr
                                                key={a.id}
                                                className={`transition-colors ${
                                                    isSelected
                                                        ? 'bg-teal-950/30'
                                                        : 'hover:bg-slate-800/30'
                                                }`}
                                            >
                                                <td className="p-3.5 text-center">
                                                    <input
                                                        type="checkbox"
                                                        disabled={isSelf}
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(a.id)}
                                                        className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    />
                                                </td>

                                                <td className="p-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 border border-teal-500/30 flex items-center justify-center font-black text-white text-sm shrink-0">
                                                                {initial}
                                                            </div>
                                                            <span
                                                                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                                                                    a.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-500'
                                                                }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white flex items-center gap-2">
                                                                <span>{a.name || a.username}</span>
                                                                {isSelf && (
                                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-400 text-slate-950 uppercase tracking-wider">
                                                                        YOU
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                                                @{a.username} &bull; {a.email || 'No email set'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-3.5">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${roleConfig.bg}`}
                                                    >
                                                        <RoleIcon className="w-3.5 h-3.5" />
                                                        <span>{a.role || 'Admin'}</span>
                                                    </span>
                                                </td>

                                                <td className="p-3.5 text-center">
                                                    {a.is_archived ? (
                                                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 font-semibold inline-flex items-center gap-1">
                                                            <Archive className="w-3 h-3" />
                                                            <span>Archived</span>
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            disabled={isSelf}
                                                            onClick={() => handleToggleStatus(a)}
                                                            className={`text-[11px] px-3 py-1 rounded-full font-semibold border transition-all inline-flex items-center gap-1.5 ${
                                                                a.status === 'Active'
                                                                    ? 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/80 border-emerald-500/30'
                                                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border-slate-700'
                                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                            title={isSelf ? 'Cannot deactivate self' : 'Click to toggle status'}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    a.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-500'
                                                                }`}
                                                            />
                                                            <span>{a.status || 'Active'}</span>
                                                        </button>
                                                    )}
                                                </td>

                                                <td className="p-3.5 text-slate-400">
                                                    {a.last_login ? (
                                                        <div>
                                                            <div className="text-slate-200 font-medium">
                                                                {new Date(a.last_login).toLocaleDateString('en-PH', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                })}{' '}
                                                                {new Date(a.last_login).toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </div>
                                                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                                                IP: {a.last_ip || '127.0.0.1'}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-600 italic">Never logged in</span>
                                                    )}
                                                </td>

                                                <td className="p-3.5 text-slate-400">
                                                    {new Date(a.created_at).toLocaleDateString('en-PH', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </td>

                                                <td className="p-3.5 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(a)}
                                                            className="p-2 rounded-xl text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 border border-transparent hover:border-teal-500/20 transition-all"
                                                            title="Edit Administrator"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>

                                                        {!isSelf && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteModalAdmin(a)}
                                                                className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                                                                title="Delete Account"
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

                    {/* MOBILE TOUCH-FRIENDLY CARD VIEW (md:hidden) */}
                    <div className="md:hidden space-y-3">
                        {adminList.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-bold text-white">No administrators found</p>
                            </div>
                        ) : (
                            adminList.map((a) => {
                                const isSelf = a.id === currentAdminId;
                                const isSelected = selectedIds.includes(a.id);
                                const initial = (a.name || a.username || 'A').charAt(0).toUpperCase();
                                const roleConfig = getRoleBadge(a.role);
                                const RoleIcon = roleConfig.icon;

                                return (
                                    <div
                                        key={a.id}
                                        className={`p-4 rounded-xl border transition-all ${
                                            isSelected
                                                ? 'bg-teal-950/30 border-teal-500/40'
                                                : 'bg-slate-950/60 border-slate-800'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                {!isSelf && (
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => handleToggleSelect(a.id)}
                                                        className="rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400 shrink-0"
                                                    />
                                                )}

                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 border border-teal-500/30 flex items-center justify-center font-black text-white text-sm shrink-0">
                                                    {initial}
                                                </div>

                                                <div>
                                                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                                        <span>{a.name || a.username}</span>
                                                        {isSelf && (
                                                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-teal-400 text-slate-950 uppercase">
                                                                YOU
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-slate-400 font-mono">@{a.username}</div>
                                                </div>
                                            </div>

                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${roleConfig.bg}`}
                                            >
                                                <RoleIcon className="w-3 h-3" />
                                                <span>{a.role || 'Admin'}</span>
                                            </span>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email</div>
                                                <div className="truncate text-slate-300 font-medium">{a.email || 'None'}</div>
                                            </div>

                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Status</div>
                                                <div className="mt-0.5">
                                                    {a.is_archived ? (
                                                        <span className="text-[10px] font-bold text-amber-400">Archived</span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                                                                a.status === 'Active' ? 'text-emerald-400' : 'text-slate-500'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    a.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-500'
                                                                }`}
                                                            />
                                                            {a.status || 'Active'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                                            <div className="text-[10px] text-slate-500">
                                                Created {new Date(a.created_at).toLocaleDateString()}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {!a.is_archived && !isSelf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(a)}
                                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
                                                    >
                                                        {a.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(a)}
                                                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
                                                >
                                                    Edit
                                                </button>

                                                {!isSelf && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteModalAdmin(a)}
                                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20"
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
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
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
                            Administrator(s) Selected
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

            {/* ========================================================
                MODAL 1: CREATE ADMIN
            ======================================================== */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white tracking-tight">Create New Administrator</h3>
                                    <p className="text-xs text-slate-400">Provision authorized portal operator credentials</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border-0 transition-colors"
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
                                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="e.g. Johnathan Doe"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
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
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
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
                                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={createForm.data.email}
                                            onChange={(e) => createForm.setData('email', e.target.value)}
                                            placeholder="admin@example.com"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
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
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
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
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
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
                                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showCreatePass ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreatePass(!showCreatePass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 bg-transparent border-0"
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
                                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showCreateConfirmPass ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password_confirmation}
                                            onChange={(e) => createForm.setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateConfirmPass(!showCreateConfirmPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 bg-transparent border-0"
                                        >
                                            {showCreateConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border-0"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 border-0 shadow-lg shadow-teal-500/20 disabled:opacity-60"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                                    <Edit2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white tracking-tight">
                                        Edit Administrator: @{editingAdmin.username}
                                    </h3>
                                    <p className="text-xs text-slate-400">Update operator account details and security</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingAdmin(null)}
                                className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border-0 transition-colors"
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
                                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
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
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
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
                                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={editForm.data.email}
                                            onChange={(e) => editForm.setData('email', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
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
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
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
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400 disabled:opacity-40"
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

                            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2.5">
                                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <Key className="w-3.5 h-3.5 text-teal-400" />
                                    <span>Reset Password (Leave blank to keep current)</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type={showEditPass ? 'text' : 'password'}
                                            value={editForm.data.password}
                                            onChange={(e) => editForm.setData('password', e.target.value)}
                                            placeholder="New Password"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowEditPass(!showEditPass)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 bg-transparent border-0"
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
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowEditConfirmPass(!showEditConfirmPass)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 bg-transparent border-0"
                                        >
                                            {showEditConfirmPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setEditingAdmin(null)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border-0"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 border-0 shadow-lg shadow-teal-500/20 disabled:opacity-60"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl text-center">
                        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Delete Administrator Account?</h4>
                        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                            Are you sure you want to permanently delete account{' '}
                            <strong className="text-white">@{deleteModalAdmin.username}</strong> ({deleteModalAdmin.name})?
                            This administrator will immediately lose all portal access.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteModalAdmin(null)}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 border-0"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 border-0 shadow-lg shadow-rose-500/20"
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
