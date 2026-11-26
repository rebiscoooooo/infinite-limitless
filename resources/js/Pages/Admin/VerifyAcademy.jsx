import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { getCountryInfo, getTierDetails, ACADEMY_TIERS } from '../../Utils/academyBadges';
import {
    GraduationCap,
    Users,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    Shield,
    Star,
    Award,
    Eye,
    Check,
    X,
    Trash2,
    Edit,
    Plus,
    Bell,
    Mail,
    Phone,
    MapPin,
    AlertCircle,
    ExternalLink,
    Image as ImageIcon,
    ToggleLeft,
    ToggleRight,
    Sparkles,
    Calendar,
} from 'lucide-react';

export default function VerifyAcademy({
    members,
    counts,
    announcements = [],
    filters = {},
    availableTiers = [],
}) {
    const [activeTab, setActiveTab] = useState('members'); // 'members' | 'announcements'
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedTier, setSelectedTier] = useState(filters.rank_tier || '');

    // Modals state
    const [viewMember, setViewMember] = useState(null);
    const [approveMember, setApproveMember] = useState(null);
    const [rejectMember, setRejectMember] = useState(null);
    const [editMember, setEditMember] = useState(null);
    const [deleteMember, setDeleteMember] = useState(null);
    const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);

    // Filter submit
    const handleFilterSubmit = (e) => {
        if (e) e.preventDefault();
        router.get(
            '/admin/verify-academy',
            {
                q: searchQuery,
                status: selectedStatus,
                rank_tier: selectedTier,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedStatus('');
        setSelectedTier('');
        router.get('/admin/verify-academy', {}, { preserveState: true, preserveScroll: true });
    };

    // Forms
    const approveForm = useForm({
        status: 'Approved',
        rank_tier: 'Rookie',
        admin_notes: '',
    });

    const rejectForm = useForm({
        status: 'Rejected',
        rejection_reason: '',
        admin_notes: '',
    });

    const editForm = useForm({
        first_name: '',
        middle_initial: '',
        last_name: '',
        phone_country_code: '+63',
        phone_number: '',
        email: '',
        address: '',
        status: 'Pending',
        rank_tier: '',
        admin_notes: '',
    });

    const announcementForm = useForm({
        title: '',
        content: '',
        image: null,
        is_active: true,
    });

    // Modal open handlers
    const openApproveModal = (m) => {
        setApproveMember(m);
        approveForm.setData({
            status: 'Approved',
            rank_tier: m.rank_tier || 'Rookie',
            admin_notes: m.admin_notes || '',
        });
    };

    const openRejectModal = (m) => {
        setRejectMember(m);
        rejectForm.setData({
            status: 'Rejected',
            rejection_reason: m.rejection_reason || '',
            admin_notes: m.admin_notes || '',
        });
    };

    const openEditModal = (m) => {
        setEditMember(m);
        editForm.setData({
            first_name: m.first_name,
            middle_initial: m.middle_initial || '',
            last_name: m.last_name,
            phone_country_code: m.phone_country_code || '+63',
            phone_number: m.phone_number,
            email: m.email,
            address: m.address,
            status: m.status,
            rank_tier: m.rank_tier || '',
            admin_notes: m.admin_notes || '',
        });
    };

    // Submissions
    const handleApproveSubmit = (e) => {
        e.preventDefault();
        approveForm.patch(`/admin/verify-academy/${approveMember.id}/status`, {
            preserveScroll: true,
            onSuccess: () => setApproveMember(null),
        });
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        rejectForm.patch(`/admin/verify-academy/${rejectMember.id}/status`, {
            preserveScroll: true,
            onSuccess: () => setRejectMember(null),
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(`/admin/verify-academy/${editMember.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditMember(null),
        });
    };

    const handleDeleteSubmit = () => {
        router.delete(`/admin/verify-academy/${deleteMember.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteMember(null),
        });
    };

    const handleAnnouncementSubmit = (e) => {
        e.preventDefault();
        announcementForm.post('/admin/verify-academy/announcements', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowCreateAnnouncement(false);
                announcementForm.reset();
            },
        });
    };

    const handleToggleAnnouncement = (announcement) => {
        router.patch(`/admin/verify-academy/announcements/${announcement.id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDeleteAnnouncement = (announcement) => {
        if (confirm(`Delete announcement "${announcement.title}"?`)) {
            router.delete(`/admin/verify-academy/announcements/${announcement.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            title="Legacy Club Academy Verification"
            subtitle="Authenticate Member Applications & Assign Official Rank Tiers"
        >
            <Head title="Legacy Club Academy Management | Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* TOP KPI OVERVIEW CARDS (System Palette on Light Canvas) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between shadow-xs">
                        <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">Total Members</div>
                            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">{counts.total}</div>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-[#0f766e] flex items-center justify-center font-bold shadow-xs p-2">
                            <img
                                src="/assets/image/academy/logo-black-trimmed.png"
                                alt="Legacy Club"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-amber-200/90 flex items-center justify-between shadow-xs border-l-4 border-l-[#f59e0b]">
                        <div>
                            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-mono">Pending Review</div>
                            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 font-mono">{counts.pending}</div>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-emerald-200/90 flex items-center justify-between shadow-xs border-l-4 border-l-[#10b981]">
                        <div>
                            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono">Approved Active</div>
                            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 font-mono">{counts.approved}</div>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between shadow-xs">
                        <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">Rejected</div>
                            <div className="text-2xl sm:text-3xl font-black text-slate-600 mt-1 font-mono">{counts.rejected}</div>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center shadow-xs">
                            <XCircle className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* 5 RANK TIERS STATS STRIP (Clean Light Design with Gold/Amber Accents) */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
                    <span className="text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-[11px]">
                        <Award className="w-4 h-4 text-[#0f766e]" /> Approved Tier Distribution:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 font-mono text-xs font-semibold flex items-center gap-1.5">
                            <img src="/assets/image/academy/badge-rookie.png" alt="Rookie" className="w-4 h-auto object-contain" />
                            <span>Rookie:</span> <strong className="text-slate-900 ml-0.5">{counts.tiers.Rookie}</strong>
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-200 font-mono text-xs font-semibold flex items-center gap-1.5">
                            <img src="/assets/image/academy/badge-elite.png" alt="Elite" className="w-4 h-auto object-contain" />
                            <span>Elite:</span> <strong className="text-[#0f766e] ml-0.5">{counts.tiers.Elite}</strong>
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-mono text-xs font-semibold flex items-center gap-1.5">
                            <img src="/assets/image/academy/badge-master.png" alt="Master" className="w-4 h-auto object-contain" />
                            <span>Master:</span> <strong className="text-amber-900 ml-0.5">{counts.tiers.Master}</strong>
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 font-mono text-xs font-semibold flex items-center gap-1.5">
                            <img src="/assets/image/academy/badge-grand-master.png" alt="Grand Master" className="w-4 h-auto object-contain" />
                            <span>Grand Master:</span> <strong className="text-purple-900 ml-0.5">{counts.tiers['Grand Master']}</strong>
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-mono text-xs font-black shadow-xs flex items-center gap-1.5">
                            <img src="/assets/image/academy/badge-legend.png" alt="Legend" className="w-4 h-auto object-contain" />
                            <span>Legend:</span> <strong className="ml-0.5">{counts.tiers.Legend}</strong>
                        </span>
                    </div>
                </div>

                {/* TABS BAR: MEMBERS VS ANNOUNCEMENTS */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('members')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 border-0 outline-none cursor-pointer ${
                                activeTab === 'members'
                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Academy Applications ({counts.total})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('announcements')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 border-0 outline-none cursor-pointer ${
                                activeTab === 'announcements'
                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            }`}
                        >
                            <Bell className="w-4 h-4" />
                            Portal Announcements ({announcements.length})
                        </button>
                    </div>

                    {activeTab === 'announcements' && (
                        <button
                            onClick={() => setShowCreateAnnouncement(true)}
                            className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm cursor-pointer border-0 outline-none"
                        >
                            <Plus className="w-4 h-4" /> New Announcement
                        </button>
                    )}
                </div>

                {/* ============================================================== */}
                {/* TAB 1: MEMBERS MANAGEMENT TABLE */}
                {/* ============================================================== */}
                {activeTab === 'members' && (
                    <div className="space-y-4">
                        {/* Filters and Search Bar */}
                        <form
                            onSubmit={handleFilterSubmit}
                            className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center gap-3 shadow-xs"
                        >
                            <div className="flex-1 min-w-[220px] relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, email, member ID, phone..."
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
                                />
                            </div>

                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-800"
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>

                            <select
                                value={selectedTier}
                                onChange={(e) => setSelectedTier(e.target.value)}
                                className="bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-800"
                            >
                                <option value="">All Tiers</option>
                                <option value="Rookie">Rookie (★)</option>
                                <option value="Elite">Elite (★★)</option>
                                <option value="Master">Master (★★★)</option>
                                <option value="Grand Master">Grand Master (★★★★)</option>
                                <option value="Legend">Legend (★★★★★)</option>
                            </select>

                            <button
                                type="submit"
                                className="px-5 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer border-0 outline-none"
                            >
                                Filter
                            </button>

                            {(searchQuery || selectedStatus || selectedTier) && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer border-0 outline-none"
                                >
                                    Clear
                                </button>
                            )}
                        </form>

                        {/* Members Table */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-700">
                                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-mono">
                                        <tr>
                                            <th className="px-4 py-3.5">Member / Photo</th>
                                            <th className="px-4 py-3.5">Member ID</th>
                                            <th className="px-4 py-3.5">Contact Details</th>
                                            <th className="px-4 py-3.5">Status</th>
                                            <th className="px-4 py-3.5">Assigned Tier</th>
                                            <th className="px-4 py-3.5">Date Registered</th>
                                            <th className="px-4 py-3.5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {members.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-4 py-12 text-center text-slate-400 font-mono text-xs">
                                                    No academy members found matching the specified criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            members.data.map((m) => (
                                                <tr key={m.id} className="hover:bg-teal-50/20 transition-colors">
                                                    {/* Member Photo & Name */}
                                                    <td className="px-4 py-3.5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                                                {m.avatar_url ? (
                                                                    <img
                                                                        src={m.avatar_url}
                                                                        alt={m.full_name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src="/assets/image/academy/logo-black-trimmed.png"
                                                                        alt="Legacy Club"
                                                                        className="w-5 h-5 object-contain opacity-40"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-900 text-sm">{m.full_name}</div>
                                                                <div className="text-[11px] text-slate-500 font-mono">{m.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Member ID */}
                                                    <td className="px-4 py-3.5 font-mono font-bold text-[#0f766e]">
                                                        {m.member_id}
                                                    </td>

                                                    {/* Contact */}
                                                    <td className="px-4 py-3.5 text-[11px]">
                                                        <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
                                                            <span className="text-sm leading-none" title={m.country_info?.country}>{m.country_info?.flag || getCountryInfo(m.phone_country_code).flag}</span>
                                                            <span>{m.phone_country_code} {m.phone_number}</span>
                                                        </div>
                                                        <div className="text-slate-500 line-clamp-1 max-w-[180px] mt-0.5">{m.address}</div>
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td className="px-4 py-3.5">
                                                        {m.status === 'Approved' ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] uppercase">
                                                                <Check className="w-3 h-3 stroke-[3]" /> Approved
                                                            </span>
                                                        ) : m.status === 'Rejected' ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px] uppercase">
                                                                <X className="w-3 h-3" /> Rejected
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px] uppercase">
                                                                <Clock className="w-3 h-3" /> Pending
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Assigned Tier */}
                                                    <td className="px-4 py-3.5">
                                                        {m.rank_tier ? (
                                                            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-teal-50 border border-teal-200 font-mono text-xs font-bold text-[#0f766e]">
                                                                <img
                                                                    src={`/assets/image/academy/badge-${m.rank_tier.toLowerCase().replace(/\s+/g, '-')}.png`}
                                                                    alt={m.rank_tier}
                                                                    className="w-5 h-auto object-contain filter drop-shadow-2xs"
                                                                />
                                                                <span>{m.rank_tier}</span>
                                                                <span className="text-amber-500 text-[10px]">{m.rank_details?.stars_display || '★'}</span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400 italic">Unassigned</span>
                                                        )}
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-4 py-3.5 text-slate-500 text-[11px] font-mono">
                                                        {new Date(m.created_at).toLocaleDateString()}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3.5 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            {/* View Details */}
                                                            <button
                                                                onClick={() => setViewMember(m)}
                                                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border-0 outline-none"
                                                                title="View Full Profile"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>

                                                            {/* Approve */}
                                                            <button
                                                                onClick={() => openApproveModal(m)}
                                                                className="p-1.5 rounded-lg bg-teal-50 hover:bg-[#0f766e] text-[#0f766e] hover:text-white transition-colors shadow-xs cursor-pointer border-0 outline-none"
                                                                title="Approve & Assign Tier"
                                                            >
                                                                <Check className="w-4 h-4 stroke-[2.5]" />
                                                            </button>

                                                            {/* Reject */}
                                                            <button
                                                                onClick={() => openRejectModal(m)}
                                                                className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                                                                title="Reject Application"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>

                                                            {/* Edit */}
                                                            <button
                                                                onClick={() => openEditModal(m)}
                                                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border-0 outline-none"
                                                                title="Edit Details"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>

                                                            {/* Delete */}
                                                            <button
                                                                onClick={() => setDeleteMember(m)}
                                                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white transition-colors cursor-pointer border-0 outline-none"
                                                                title="Delete Member"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {members.links && members.links.length > 3 && (
                                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                                    <div className="font-mono">
                                        Showing {members.from || 0} to {members.to || 0} of {members.total} members
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {members.links.map((link, idx) => (
                                            <button
                                                key={idx}
                                                disabled={!link.url}
                                                onClick={() => router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border-0 outline-none ${
                                                    link.active
                                                        ? 'bg-[#0f766e] text-white font-bold'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 2: ANNOUNCEMENTS MANAGEMENT */}
                {/* ============================================================== */}
                {activeTab === 'announcements' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {announcements.length === 0 ? (
                                <div className="col-span-full p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl font-mono text-xs">
                                    No announcements created yet. Click "New Announcement" above to publish one.
                                </div>
                            ) : (
                                announcements.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs"
                                    >
                                        <div className="space-y-3">
                                            {item.image_url && (
                                                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between text-[11px] font-mono">
                                                <span
                                                    className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                                                        item.is_active
                                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                    }`}
                                                >
                                                    {item.is_active ? 'Active' : 'Hidden'}
                                                </span>
                                                <span className="text-slate-400 font-mono">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                                            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed whitespace-pre-line">
                                                {item.content}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleAnnouncement(item)}
                                                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer border-0 bg-transparent outline-none shadow-none"
                                            >
                                                {item.is_active ? (
                                                    <ToggleRight className="w-5 h-5 text-[#0f766e]" />
                                                ) : (
                                                    <ToggleLeft className="w-5 h-5 text-slate-400" />
                                                )}
                                                <span>{item.is_active ? 'Active' : 'Inactive'}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteAnnouncement(item)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border-0 bg-transparent outline-none shadow-none"
                                                title="Delete Announcement"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ============================================================== */}
            {/* MODAL 1: VIEW DETAILS (LIGHT THEME) */}
            {/* ============================================================== */}
            {viewMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                <img
                                    src="/assets/image/academy/logo-black-trimmed.png"
                                    alt="Legacy Club"
                                    className="w-5 h-5 object-contain"
                                />
                                Member Details: {viewMember.full_name}
                            </h3>
                            <button onClick={() => setViewMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent outline-none cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
                            {/* Photo and Header */}
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                                    {viewMember.avatar_url ? (
                                        <img src={viewMember.avatar_url} alt={viewMember.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <img
                                            src="/assets/image/academy/logo-black-trimmed.png"
                                            alt="Legacy Club"
                                            className="w-10 h-10 object-contain opacity-40"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-base font-bold text-slate-900 truncate">{viewMember.full_name}</div>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                                        <span className="text-base leading-none">
                                            {getCountryInfo(viewMember.phone_country_code).flag}
                                        </span>
                                        <span>{getCountryInfo(viewMember.phone_country_code).name}</span>
                                        <span className="font-mono text-slate-400">({viewMember.phone_country_code})</span>
                                    </div>
                                    <div className="text-xs font-mono text-[#0f766e] font-bold mt-1">{viewMember.member_id}</div>
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-700">
                                            Status: {viewMember.status}
                                        </span>
                                        {viewMember.rank_tier && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] font-bold text-[#0f766e]">
                                                <img
                                                    src={getTierDetails(viewMember.rank_tier).badge_image}
                                                    alt={viewMember.rank_tier}
                                                    className="w-3.5 h-auto object-contain"
                                                />
                                                <span>Tier: {viewMember.rank_tier} ({viewMember.rank_details?.stars_display || getTierDetails(viewMember.rank_tier).stars_display})</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {viewMember.rank_tier && (
                                    <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200 shrink-0 shadow-xs">
                                        <img
                                            src={getTierDetails(viewMember.rank_tier).badge_image}
                                            alt={viewMember.rank_tier}
                                            className="w-14 h-auto object-contain filter drop-shadow-xs"
                                        />
                                        <span className="text-[10px] font-mono font-black text-slate-900 mt-1 uppercase">
                                            {viewMember.rank_tier}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div>
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Email Address</span>
                                    <div className="text-slate-900 font-medium mt-0.5 font-mono">{viewMember.email}</div>
                                </div>
                                <div>
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Contact Number</span>
                                    <div className="text-slate-900 font-medium mt-0.5 font-mono flex items-center gap-1.5">
                                        <span>{getCountryInfo(viewMember.phone_country_code).flag}</span>
                                        <span>{viewMember.phone_country_code} {viewMember.phone_number}</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Registered Address</span>
                                    <div className="text-slate-900 mt-0.5 leading-relaxed">{viewMember.address}</div>
                                </div>
                                <div>
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Application Date</span>
                                    <div className="text-slate-700 mt-0.5 font-mono">{new Date(viewMember.created_at).toLocaleString()}</div>
                                </div>
                                <div>
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Approved At</span>
                                    <div className="text-slate-700 mt-0.5 font-mono">{viewMember.approved_at || 'Not yet approved'}</div>
                                </div>
                            </div>

                            {viewMember.rejection_reason && (
                                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                                    <span className="text-rose-700 font-bold uppercase text-[10px] font-mono">Rejection Reason</span>
                                    <p className="text-rose-900 mt-1">{viewMember.rejection_reason}</p>
                                </div>
                            )}

                            {viewMember.admin_notes && (
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Internal Admin Notes</span>
                                    <p className="text-slate-700 mt-1">{viewMember.admin_notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50">
                            <button
                                onClick={() => setViewMember(null)}
                                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider cursor-pointer border-0 outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL 2: APPROVE MEMBER WITH RANK SELECTION (LIGHT THEME) */}
            {/* ============================================================== */}
            {approveMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-teal-50/50">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">Phase 2 Verification</span>
                                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                    <CheckCircle2 className="w-5 h-5 text-[#0f766e]" />
                                    Approve Membership: {approveMember.full_name}
                                </h3>
                            </div>
                            <button onClick={() => setApproveMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent outline-none cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleApproveSubmit} className="p-6 overflow-y-auto space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                                    Select Member Official Rank / Tier <span className="text-rose-500">*</span>
                                </label>
                                <p className="text-xs text-slate-500 mb-3">
                                    Choose the official rank designation to be awarded. This will be formatted in their official welcome email and member credential portal.
                                </p>

                                {/* 5-Tier Selector */}
                                <div className="space-y-2.5">
                                    {availableTiers.map((t) => {
                                        const tierInfo = getTierDetails(t.tier);
                                        return (
                                            <label
                                                key={t.tier}
                                                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                                                    approveForm.data.rank_tier === t.tier
                                                        ? 'bg-teal-50/70 text-[#0f766e] border-[#0f766e] shadow-xs'
                                                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="rank_tier"
                                                        value={t.tier}
                                                        checked={approveForm.data.rank_tier === t.tier}
                                                        onChange={(e) => approveForm.setData('rank_tier', e.target.value)}
                                                        className="w-4 h-4 text-[#0f766e] bg-white border-slate-300 focus:ring-[#0f766e]"
                                                    />
                                                    <img
                                                        src={tierInfo.badge_image}
                                                        alt={t.tier}
                                                        className="w-10 h-14 object-contain shrink-0 filter drop-shadow-xs"
                                                    />
                                                    <div>
                                                        <div className="text-xs font-black flex items-center gap-2 font-mono">
                                                            <span>{t.tier.toUpperCase()}</span>
                                                            <span className="text-amber-500 tracking-widest">{t.stars_display}</span>
                                                        </div>
                                                        <div className="text-[11px] mt-0.5 text-slate-500">
                                                            {t.description}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xs font-bold font-mono text-[#0f766e]">
                                                    {t.stars} {t.stars === 1 ? 'Star' : 'Stars'}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Admin Notes (Optional / Internal)
                                </label>
                                <textarea
                                    rows="2"
                                    value={approveForm.data.admin_notes}
                                    onChange={(e) => approveForm.setData('admin_notes', e.target.value)}
                                    placeholder="Internal notes regarding this approval decision..."
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900"
                                />
                            </div>

                            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 flex items-start gap-2">
                                <Mail className="w-4 h-4 text-[#0f766e] shrink-0 mt-0.5" />
                                <span>
                                    An automated congratulatory email will be dispatched to <strong>{approveMember.email}</strong> with their official rank badge and portal login link.
                                </span>
                            </div>

                            <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setApproveMember(null)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold cursor-pointer border-0 outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={approveForm.processing}
                                    className="px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shadow-xs cursor-pointer border-0 outline-none"
                                >
                                    {approveForm.processing ? 'Approving...' : 'Approve & Send Notification'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL 3: REJECT MEMBER (LIGHT THEME) */}
            {/* ============================================================== */}
            {rejectMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-rose-50/50">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 font-mono">Phase 2 Verification</span>
                                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                    <XCircle className="w-5 h-5 text-rose-600" />
                                    Reject Application: {rejectMember.full_name}
                                </h3>
                            </div>
                            <button onClick={() => setRejectMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent outline-none cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleRejectSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Reason for Rejection <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="3"
                                    value={rejectForm.data.rejection_reason}
                                    onChange={(e) => rejectForm.setData('rejection_reason', e.target.value)}
                                    placeholder="Explain politely why this application cannot be approved at this time (this will be sent to the applicant)..."
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Internal Admin Notes (Optional)
                                </label>
                                <textarea
                                    rows="2"
                                    value={rejectForm.data.admin_notes}
                                    onChange={(e) => rejectForm.setData('admin_notes', e.target.value)}
                                    placeholder="Internal notes..."
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-slate-500 rounded-xl px-3 py-2 text-xs text-slate-900"
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setRejectMember(null)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold cursor-pointer border-0 outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={rejectForm.processing}
                                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer border-0 outline-none"
                                >
                                    {rejectForm.processing ? 'Rejecting...' : 'Reject Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL 4: EDIT MEMBER (LIGHT THEME) */}
            {/* ============================================================== */}
            {editMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                <Edit className="w-5 h-5 text-[#0f766e]" />
                                Edit Member Information
                            </h3>
                            <button onClick={() => setEditMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent outline-none cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-4">
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-5">
                                    <label className="text-[11px] text-slate-600 font-semibold">First Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.first_name}
                                        onChange={(e) => editForm.setData('first_name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[11px] text-slate-600 font-semibold">M.I.</label>
                                    <input
                                        type="text"
                                        maxLength="2"
                                        value={editForm.data.middle_initial}
                                        onChange={(e) => editForm.setData('middle_initial', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-2 py-2 text-xs text-slate-900 text-center mt-1"
                                    />
                                </div>
                                <div className="col-span-5">
                                    <label className="text-[11px] text-slate-600 font-semibold">Last Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.last_name}
                                        onChange={(e) => editForm.setData('last_name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] text-slate-600 font-semibold">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.data.email}
                                        onChange={(e) => editForm.setData('email', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1 font-mono"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] text-slate-600 font-semibold">Phone</label>
                                    <input
                                        type="text"
                                        value={editForm.data.phone_number}
                                        onChange={(e) => editForm.setData('phone_number', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1 font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] text-slate-600 font-semibold">Complete Address</label>
                                <textarea
                                    rows="2"
                                    value={editForm.data.address}
                                    onChange={(e) => editForm.setData('address', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] text-slate-600 font-semibold">Status</label>
                                    <select
                                        value={editForm.data.status}
                                        onChange={(e) => editForm.setData('status', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] text-slate-600 font-semibold">Rank Tier</label>
                                    <select
                                        value={editForm.data.rank_tier}
                                        onChange={(e) => editForm.setData('rank_tier', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1 font-mono"
                                    >
                                        <option value="">Unassigned</option>
                                        <option value="Rookie">Rookie (★)</option>
                                        <option value="Elite">Elite (★★)</option>
                                        <option value="Master">Master (★★★)</option>
                                        <option value="Grand Master">Grand Master (★★★★)</option>
                                        <option value="Legend">Legend (★★★★★)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setEditMember(null)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold cursor-pointer border-0 outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer border-0 outline-none"
                                >
                                    {editForm.processing ? 'Saving...' : 'Update Details'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL 5: DELETE CONFIRMATION */}
            {/* ============================================================== */}
            {deleteMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 uppercase font-mono">Delete Member Record?</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Are you sure you want to delete member <strong>{deleteMember.full_name}</strong> ({deleteMember.member_id})? This action cannot be undone.
                        </p>
                        <div className="pt-2 flex justify-center gap-3">
                            <button
                                onClick={() => setDeleteMember(null)}
                                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer border-0 outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteSubmit}
                                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border-0 outline-none"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL 6: CREATE ANNOUNCEMENT */}
            {/* ============================================================== */}
            {showCreateAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                <Bell className="w-5 h-5 text-[#0f766e]" />
                                Publish New Academy Announcement
                            </h3>
                            <button onClick={() => setShowCreateAnnouncement(false)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent outline-none cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAnnouncementSubmit} className="p-6 overflow-y-auto space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Announcement Title <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={announcementForm.data.title}
                                    onChange={(e) => announcementForm.setData('title', e.target.value)}
                                    placeholder="e.g. Mastermind Leadership Summit 2026"
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2.5 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Announcement Body Content <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="5"
                                    value={announcementForm.data.content}
                                    onChange={(e) => announcementForm.setData('content', e.target.value)}
                                    placeholder="Detailed announcement text for members..."
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2.5 text-xs text-slate-900 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Announcement Banner / Image (Optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={(e) => announcementForm.setData('image', e.target.files[0])}
                                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-[#0f766e] hover:file:bg-teal-100 cursor-pointer"
                                />
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={announcementForm.data.is_active}
                                        onChange={(e) => announcementForm.setData('is_active', e.target.checked)}
                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                    />
                                    <span>Publish and activate announcement immediately</span>
                                </label>
                            </div>

                            <div className="pt-3 flex justify-end gap-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateAnnouncement(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold cursor-pointer border-0 outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={announcementForm.processing}
                                    className="px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-xs border-0 outline-none"
                                >
                                    {announcementForm.processing ? 'Publishing...' : 'Publish Announcement'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
