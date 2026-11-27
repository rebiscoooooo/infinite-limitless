import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { getCountryInfo, getTierDetails, ACADEMY_TIERS } from '../../Utils/academyBadges';
import {
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
    BookOpen,
    CheckSquare,
    Trophy,
    TrendingUp,
    Send,
    Download,
    Upload,
    ScrollText,
    Paperclip,
} from 'lucide-react';

const formatFileSize = (bytes = 0) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
};

const getAttachmentBadgeStyle = (ext = '') => {
    const clean = String(ext).toLowerCase();
    if (clean === 'pdf') return 'bg-rose-50 text-rose-700';
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(clean)) return 'bg-sky-50 text-sky-700';
    if (['doc', 'docx', 'rtf', 'odt', 'txt'].includes(clean)) return 'bg-blue-50 text-blue-700';
    if (['xls', 'xlsx', 'csv', 'ods'].includes(clean)) return 'bg-emerald-50 text-emerald-700';
    if (['ppt', 'pptx', 'odp'].includes(clean)) return 'bg-amber-50 text-amber-700';
    if (clean === 'zip') return 'bg-violet-50 text-violet-700';
    return 'bg-slate-100 text-slate-600';
};

export default function VerifyAcademy({
    members,
    counts,
    pendingReflections = [],
    rankRequirements = [],
    rankTrainings = [],
    rankCommandments = [],
    announcements = [],
    certificates = [],
    filters = {},
    availableTiers = [],
}) {
    const [activeTab, setActiveTab] = useState('members'); // 'members' | 'reflections' | 'requirements' | 'curriculum' | 'commandments' | 'announcements' | 'certificates'
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedTier, setSelectedTier] = useState(filters.rank_tier || '');
    const [eligibleOnly, setEligibleOnly] = useState(filters.eligible || '');

    // Modals state
    const [viewMember, setViewMember] = useState(null);
    const [approveMember, setApproveMember] = useState(null);
    const [rejectMember, setRejectMember] = useState(null);
    const [editMember, setEditMember] = useState(null);
    const [deleteMember, setDeleteMember] = useState(null);
    const [promoteMemberModal, setPromoteMemberModal] = useState(null);
    const [reviewReflectionModal, setReviewReflectionModal] = useState(null);
    const [requirementMemberModal, setRequirementMemberModal] = useState(null);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [trainingMemberModal, setTrainingMemberModal] = useState(null);
    const [uploadCertificateModal, setUploadCertificateModal] = useState(null);

    const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
    const [showCreateTraining, setShowCreateTraining] = useState(false);
    const [editingTraining, setEditingTraining] = useState(null);
    const [showCreateRequirement, setShowCreateRequirement] = useState(false);
    const [editingRequirement, setEditingRequirement] = useState(null);
    const [showCreateCommandment, setShowCreateCommandment] = useState(false);
    const [editingCommandment, setEditingCommandment] = useState(null);
    const [commandmentTierFilter, setCommandmentTierFilter] = useState('All');

    // Filter submit
    const handleFilterSubmit = (e) => {
        if (e) e.preventDefault();
        router.get(
            '/admin/verify-academy',
            {
                q: searchQuery,
                status: selectedStatus,
                rank_tier: selectedTier,
                eligible: eligibleOnly,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedStatus('');
        setSelectedTier('');
        setEligibleOnly('');
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

    const promoteForm = useForm({});

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

    const reviewForm = useForm({
        action: 'approve',
        admin_feedback: '',
        certificate_file: null,
    });

    const certificateUploadForm = useForm({
        certificate_file: null,
        rank_tier: 'Rookie',
    });

    const requirementProgressForm = useForm({
        current_value: 0,
        is_verified: true,
        admin_notes: '',
    });

    const announcementForm = useForm({
        title: '',
        content: '',
        type: 'announcement',
        badge_text: '',
        featured_member_id: '',
        image: null,
        is_active: true,
    });

    const trainingForm = useForm({
        rank_tier: 'Rookie',
        target_member_id: '',
        order: 1,
        title_en: '',
        title_tl: '',
        description_en: '',
        description_tl: '',
        content_en: '',
        content_tl: '',
        video_url: '',
        duration_minutes: 30,
        reflection_prompt_en: '',
        reflection_prompt_tl: '',
        is_published: true,
        attachments: [],
        remove_attachments: [],
    });

    const requirementDefForm = useForm({
        rank_tier: 'Rookie',
        code: '',
        title_en: '',
        title_tl: '',
        description_en: '',
        description_tl: '',
        target_value: 1,
        unit: 'Personal Sponsors',
        order: 1,
        is_active: true,
    });

    const commandmentForm = useForm({
        rank_tier: 'Rookie',
        order: 1,
        title_en: '',
        title_tl: '',
        description_en: '',
        description_tl: '',
        is_active: true,
    });

    // Handlers
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
            rejection_reason: '',
            admin_notes: '',
        });
    };

    const openEditModal = (m) => {
        setEditMember(m);
        editForm.setData({
            first_name: m.first_name || '',
            middle_initial: m.middle_initial || '',
            last_name: m.last_name || '',
            phone_country_code: m.phone_country_code || '+63',
            phone_number: m.phone_number || '',
            email: m.email || '',
            address: m.address || '',
            status: m.status || 'Pending',
            rank_tier: m.rank_tier || '',
            admin_notes: m.admin_notes || '',
        });
    };

    const openPromoteModal = (m) => {
        setPromoteMemberModal(m);
    };

    const openReviewModal = (reflection) => {
        setReviewReflectionModal(reflection);
        reviewForm.setData({
            action: 'approve',
            admin_feedback: '',
            certificate_file: null,
        });
    };

    const openUploadCertificateModal = (member) => {
        setUploadCertificateModal(member);
        certificateUploadForm.setData({
            certificate_file: null,
            rank_tier: member.rank_tier || 'Rookie',
        });
    };

    const openRequirementModal = (memberItem, reqItem = null) => {
        setRequirementMemberModal(memberItem);
        const req = reqItem || (memberItem.requirements_stats?.items?.[0] || null);
        setSelectedRequirement(req);
        if (req) {
            requirementProgressForm.setData({
                current_value: req.current_value || 0,
                is_verified: req.is_verified || false,
                admin_notes: req.admin_notes || '',
            });
        }
    };

    const handleGrantTraining = (member, training) => {
        router.post(
            `/admin/verify-academy/members/${member.id}/trainings/${training.id}/grant`,
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const updated = page?.props?.members?.data?.find((m) => m.id === member.id);
                    if (updated) setTrainingMemberModal(updated);
                },
            }
        );
    };

    const handleGrantAllMemberTrainings = (member) => {
        if (confirm(`Grant and approve ALL training modules for ${member.full_name}?`)) {
            router.post(
                `/admin/verify-academy/members/${member.id}/trainings/grant-all`,
                {},
                {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const updated = page?.props?.members?.data?.find((m) => m.id === member.id);
                        if (updated) setTrainingMemberModal(updated);
                    },
                }
            );
        }
    };

    const handleGrantTrainingToRank = (training) => {
        if (confirm(`Grant and complete training module #${training.order} "${training.title_en}" for ALL active ${training.rank_tier} members?`)) {
            router.post(
                `/admin/verify-academy/trainings/${training.id}/grant-all`,
                {},
                { preserveScroll: true }
            );
        }
    };

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

    const handlePromoteSubmit = (e) => {
        e.preventDefault();
        promoteForm.post(`/admin/verify-academy/members/${promoteMemberModal.id}/promote`, {
            preserveScroll: true,
            onSuccess: () => setPromoteMemberModal(null),
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
        if (!deleteMember) return;
        router.delete(`/admin/verify-academy/${deleteMember.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteMember(null),
        });
    };

    const submitReflectionDecision = (decision) => {
        if (!reviewReflectionModal || reviewForm.processing) return;
        reviewForm.transform((data) => ({
            ...data,
            action: decision,
        }));
        reviewForm.post(`/admin/verify-academy/trainings/${reviewReflectionModal.id}/review`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setReviewReflectionModal(null);
                reviewForm.reset();
            },
        });
    };

    const handleReviewSubmit = (e) => {
        if (e) e.preventDefault();
        submitReflectionDecision('approve');
    };

    // Quick KPI Filter Helper
    const applyQuickFilter = (overrides) => {
        const nextStatus = overrides.status ?? '';
        const nextTier = overrides.rank_tier ?? '';
        const nextEligible = overrides.eligible ?? '';
        setActiveTab('members');
        setSelectedStatus(nextStatus);
        setSelectedTier(nextTier);
        setEligibleOnly(nextEligible);
        if (overrides.clearSearch) setSearchQuery('');
        router.get(
            '/admin/verify-academy',
            {
                q: overrides.clearSearch ? '' : searchQuery,
                status: nextStatus,
                rank_tier: nextTier,
                eligible: nextEligible,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    // Keep open member modals live-synced when realtime background reloads refresh `members.data`
    useEffect(() => {
        if (!members?.data) return;
        if (viewMember) {
            const fresh = members.data.find((m) => m.id === viewMember.id);
            if (fresh) setViewMember(fresh);
        }
        if (trainingMemberModal) {
            const fresh = members.data.find((m) => m.id === trainingMemberModal.id);
            if (fresh) setTrainingMemberModal(fresh);
        }
        if (requirementMemberModal) {
            const fresh = members.data.find((m) => m.id === requirementMemberModal.id);
            if (fresh) {
                setRequirementMemberModal(fresh);
                if (selectedRequirement) {
                    const freshReq = fresh.requirements_stats?.items?.find((r) => r.id === selectedRequirement.id);
                    if (freshReq) setSelectedRequirement(freshReq);
                }
            }
        }
    }, [members?.data]);

    // Close active modal on Escape key
    useEffect(() => {
        const hasModal = Boolean(
            viewMember || approveMember || rejectMember || editMember || deleteMember ||
            promoteMemberModal || reviewReflectionModal || requirementMemberModal ||
            trainingMemberModal || uploadCertificateModal || showCreateAnnouncement ||
            showCreateTraining || showCreateRequirement || showCreateCommandment
        );
        if (!hasModal) return;
        const onKeyDown = (e) => {
            if (e.key !== 'Escape') return;
            if (uploadCertificateModal) setUploadCertificateModal(null);
            else if (showCreateCommandment) { setShowCreateCommandment(false); setEditingCommandment(null); }
            else if (showCreateTraining) { setShowCreateTraining(false); setEditingTraining(null); }
            else if (showCreateRequirement) { setShowCreateRequirement(false); setEditingRequirement(null); }
            else if (showCreateAnnouncement) setShowCreateAnnouncement(false);
            else if (trainingMemberModal) setTrainingMemberModal(null);
            else if (requirementMemberModal) { setRequirementMemberModal(null); setSelectedRequirement(null); }
            else if (reviewReflectionModal) setReviewReflectionModal(null);
            else if (promoteMemberModal) setPromoteMemberModal(null);
            else if (deleteMember) setDeleteMember(null);
            else if (editMember) setEditMember(null);
            else if (rejectMember) setRejectMember(null);
            else if (approveMember) setApproveMember(null);
            else if (viewMember) setViewMember(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [viewMember, approveMember, rejectMember, editMember, deleteMember, promoteMemberModal, reviewReflectionModal, requirementMemberModal, trainingMemberModal, uploadCertificateModal, showCreateAnnouncement, showCreateTraining, showCreateRequirement, showCreateCommandment]);

    const handleCertificateUploadSubmit = (e) => {
        e.preventDefault();
        if (!uploadCertificateModal) return;
        certificateUploadForm.post(`/admin/verify-academy/members/${uploadCertificateModal.id || uploadCertificateModal.member_id}/certificates/upload`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setUploadCertificateModal(null);
                certificateUploadForm.reset();
            },
        });
    };

    const handleRequirementProgressSubmit = (e) => {
        e.preventDefault();
        requirementProgressForm.post(
            `/admin/verify-academy/members/${requirementMemberModal.id}/requirements/${selectedRequirement.id}`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setRequirementMemberModal(null);
                    setSelectedRequirement(null);
                },
            }
        );
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

    const openCreateRequirement = () => {
        setEditingRequirement(null);
        requirementDefForm.setData({
            rank_tier: 'Rookie',
            code: '',
            title_en: '',
            title_tl: '',
            description_en: '',
            description_tl: '',
            target_value: 1,
            unit: 'Personal Sponsors',
            order: 1,
            is_active: true,
        });
        setShowCreateRequirement(true);
    };

    const openCreateTraining = (targetMember = null) => {
        setEditingTraining(null);
        trainingForm.clearErrors();
        trainingForm.setData({
            rank_tier: targetMember ? (targetMember.rank_tier || 'Rookie') : 'Rookie',
            target_member_id: targetMember ? targetMember.id : '',
            order: targetMember ? ((targetMember.training_stats?.items?.length || 0) + 1) : 1,
            title_en: '',
            title_tl: '',
            description_en: '',
            description_tl: '',
            content_en: '',
            content_tl: '',
            video_url: '',
            duration_minutes: 30,
            reflection_prompt_en: '',
            reflection_prompt_tl: '',
            is_published: true,
            attachments: [],
            remove_attachments: [],
        });
        setShowCreateTraining(true);
    };

    const openEditRequirement = (r) => {
        setEditingRequirement(r);
        requirementDefForm.setData({
            rank_tier: r.rank_tier || 'Rookie',
            code: r.code || '',
            title_en: r.title_en || '',
            title_tl: r.title_tl || '',
            description_en: r.description_en || '',
            description_tl: r.description_tl || '',
            target_value: r.target_value || 1,
            unit: r.unit || 'Personal Sponsors',
            order: r.order || 1,
            is_active: r.is_active ?? true,
        });
        setShowCreateRequirement(true);
    };

    const openEditTraining = (t) => {
        setEditingTraining(t);
        trainingForm.clearErrors();
        trainingForm.setData({
            rank_tier: t.rank_tier || 'Rookie',
            target_member_id: t.target_member_id || '',
            order: t.order || 1,
            title_en: t.title_en || '',
            title_tl: t.title_tl || '',
            description_en: t.description_en || '',
            description_tl: t.description_tl || '',
            content_en: t.content_en || '',
            content_tl: t.content_tl || '',
            video_url: t.video_url || '',
            duration_minutes: t.duration_minutes || 30,
            reflection_prompt_en: t.reflection_prompt_en || '',
            reflection_prompt_tl: t.reflection_prompt_tl || '',
            is_published: t.is_published ?? true,
            attachments: [],
            remove_attachments: [],
        });
        setShowCreateTraining(true);
    };

    const handleTrainingAttachmentsChange = (e) => {
        const picked = Array.from(e.target.files || []);
        if (!picked.length) return;
        const current = Array.isArray(trainingForm.data.attachments) ? trainingForm.data.attachments : [];
        const existingKeys = new Set(current.map((f) => `${f.name}_${f.size}_${f.lastModified}`));
        const merged = [...current];
        picked.forEach((file) => {
            const key = `${file.name}_${file.size}_${file.lastModified}`;
            if (!existingKeys.has(key)) {
                merged.push(file);
                existingKeys.add(key);
            }
        });
        trainingForm.setData('attachments', merged);
        e.target.value = '';
    };

    const removeStagedTrainingAttachment = (index) => {
        const next = (trainingForm.data.attachments || []).filter((_, i) => i !== index);
        trainingForm.setData('attachments', next);
    };

    const toggleRemoveExistingAttachment = (attachmentId) => {
        const current = trainingForm.data.remove_attachments || [];
        const exists = current.includes(attachmentId);
        trainingForm.setData(
            'remove_attachments',
            exists ? current.filter((id) => id !== attachmentId) : [...current, attachmentId]
        );
    };

    const handleTrainingSubmit = (e) => {
        e.preventDefault();
        if (editingTraining) {
            trainingForm.transform((data) => ({
                ...data,
                is_published: data.is_published ? 1 : 0,
                _method: 'PUT',
            }));
            trainingForm.post(`/admin/verify-academy/trainings/${editingTraining.id}`, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateTraining(false);
                    setEditingTraining(null);
                    trainingForm.reset();
                },
            });
        } else {
            trainingForm.transform((data) => ({
                ...data,
                is_published: data.is_published ? 1 : 0,
            }));
            trainingForm.post('/admin/verify-academy/trainings', {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateTraining(false);
                    trainingForm.reset();
                },
            });
        }
    };

    const handleRequirementDefSubmit = (e) => {
        e.preventDefault();
        if (editingRequirement) {
            requirementDefForm.put(`/admin/verify-academy/requirements/${editingRequirement.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateRequirement(false);
                    setEditingRequirement(null);
                    requirementDefForm.reset();
                },
            });
        } else {
            requirementDefForm.post('/admin/verify-academy/requirements', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateRequirement(false);
                    requirementDefForm.reset();
                },
            });
        }
    };

    const handleDeleteRequirement = (r) => {
        if (confirm(`Are you sure you want to delete requirement "${r.title_en}" (${r.code})?`)) {
            router.delete(`/admin/verify-academy/requirements/${r.id}`, { preserveScroll: true });
        }
    };

    const getNextCommandmentOrder = (tier) => {
        const tierItems = rankCommandments.filter((c) => c.rank_tier === tier);
        if (tierItems.length === 0) return 1;
        return Math.max(...tierItems.map((c) => Number(c.order) || 0)) + 1;
    };

    const openCreateCommandment = (defaultTier = 'Rookie') => {
        const tier = defaultTier === 'All' ? 'Rookie' : defaultTier;
        setEditingCommandment(null);
        commandmentForm.clearErrors();
        commandmentForm.setData({
            rank_tier: tier,
            order: getNextCommandmentOrder(tier),
            title_en: '',
            title_tl: '',
            description_en: '',
            description_tl: '',
            is_active: true,
        });
        setShowCreateCommandment(true);
    };

    const openEditCommandment = (cmd) => {
        setEditingCommandment(cmd);
        commandmentForm.clearErrors();
        commandmentForm.setData({
            rank_tier: cmd.rank_tier || 'Rookie',
            order: cmd.order || 1,
            title_en: cmd.title_en || '',
            title_tl: cmd.title_tl || '',
            description_en: cmd.description_en || '',
            description_tl: cmd.description_tl || '',
            is_active: cmd.is_active ?? true,
        });
        setShowCreateCommandment(true);
    };

    const handleCommandmentSubmit = (e) => {
        e.preventDefault();
        if (editingCommandment) {
            commandmentForm.put(`/admin/verify-academy/commandments/${editingCommandment.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateCommandment(false);
                    setEditingCommandment(null);
                    commandmentForm.reset();
                },
            });
        } else {
            commandmentForm.post('/admin/verify-academy/commandments', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateCommandment(false);
                    commandmentForm.reset();
                },
            });
        }
    };

    const handleToggleCommandment = (cmd) => {
        router.patch(`/admin/verify-academy/commandments/${cmd.id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDeleteCommandment = (cmd) => {
        if (confirm(`Delete commandment "${cmd.title_en}" from ${cmd.rank_tier} tier?`)) {
            router.delete(`/admin/verify-academy/commandments/${cmd.id}`, { preserveScroll: true });
        }
    };

    const handleDeleteTraining = (t) => {
        if (confirm(`Are you sure you want to delete training module "${t.title_en}"?`)) {
            router.delete(`/admin/verify-academy/trainings/${t.id}`, { preserveScroll: true });
        }
    };

    const handleToggleAnnouncement = (ann) => {
        router.patch(`/admin/verify-academy/announcements/${ann.id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDeleteAnnouncement = (ann) => {
        if (confirm(`Are you sure you want to delete announcement "${ann.title}"?`)) {
            router.delete(`/admin/verify-academy/announcements/${ann.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            title="Legacy Club Academy Management"
            subtitle="Centralized Member Progression, Requirements, Sequential Trainings & Approvals"
        >
            <Head title="Legacy Club Academy Management | Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* TOP KPI OVERVIEW CARDS (Clickable Quick Filters) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                    <button
                        type="button"
                        onClick={() => applyQuickFilter({ clearSearch: true })}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs text-left cursor-pointer transition-all"
                    >
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Total Members</div>
                        <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{counts.total}</div>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyQuickFilter({ status: 'Pending' })}
                        className="p-4 rounded-2xl bg-white shadow-[inset_4px_0_0_#f59e0b,0_2px_12px_rgba(15,23,42,0.045)] hover:shadow-[inset_4px_0_0_#f59e0b,0_6px_18px_rgba(15,23,42,0.08)] text-left cursor-pointer transition-all"
                    >
                        <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider font-mono">Pending Review</div>
                        <div className="text-2xl font-black text-amber-600 mt-1 font-mono">{counts.pending}</div>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyQuickFilter({ status: 'Approved' })}
                        className="p-4 rounded-2xl bg-white shadow-[inset_4px_0_0_#10b981,0_2px_12px_rgba(15,23,42,0.045)] hover:shadow-[inset_4px_0_0_#10b981,0_6px_18px_rgba(15,23,42,0.08)] text-left cursor-pointer transition-all"
                    >
                        <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider font-mono">Active Approved</div>
                        <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">{counts.approved}</div>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyQuickFilter({ status: 'Approved', eligible: '1' })}
                        className="p-4 rounded-2xl bg-white shadow-[inset_4px_0_0_#06b6d4,0_2px_12px_rgba(15,23,42,0.045)] hover:shadow-[inset_4px_0_0_#06b6d4,0_6px_18px_rgba(15,23,42,0.08)] text-left cursor-pointer transition-all"
                    >
                        <div className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider font-mono">Promotion Ready</div>
                        <div className="text-2xl font-black text-cyan-600 mt-1 font-mono">{counts.eligible}</div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('reflections')}
                        className="p-4 rounded-2xl bg-white shadow-[inset_4px_0_0_#a855f7,0_2px_12px_rgba(15,23,42,0.045)] hover:shadow-[inset_4px_0_0_#a855f7,0_6px_18px_rgba(15,23,42,0.08)] text-left cursor-pointer transition-all"
                    >
                        <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider font-mono">Pending Reflections</div>
                        <div className="text-2xl font-black text-purple-600 mt-1 font-mono">{counts.pending_reflections}</div>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyQuickFilter({ status: 'Rejected' })}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs text-left cursor-pointer transition-all"
                    >
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Rejected</div>
                        <div className="text-2xl font-black text-slate-600 mt-1 font-mono">{counts.rejected}</div>
                    </button>
                </div>

                {/* 5 RANK TIERS STATS STRIP */}
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

                {/* CONSOLIDATED ADMIN SUB-TABS */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/70 border border-slate-300/80 text-xs font-bold overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('members')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'members'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <Users className="w-4 h-4 text-[#0f766e]" />
                        <span>Members &amp; Verifications</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('reflections')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'reflections'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span>Training Reflections</span>
                        {counts.pending_reflections > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                                {counts.pending_reflections}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('requirements')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'requirements'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <CheckSquare className="w-4 h-4 text-amber-600" />
                        <span>Requirements Criteria</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('curriculum')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'curriculum'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <Sparkles className="w-4 h-4 text-cyan-600" />
                        <span>Bilingual Curriculum</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('commandments')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'commandments'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <ScrollText className="w-4 h-4 text-indigo-600" />
                        <span>Tier Commandments</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold">
                            {rankCommandments.length}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('announcements')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'announcements'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <Bell className="w-4 h-4 text-[#0f766e]" />
                        <span>Announcements &amp; Recognition</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('certificates')}
                        className={`px-4 py-2 rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                            activeTab === 'certificates'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 bg-transparent'
                        }`}
                    >
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span>Issued Certificates</span>
                    </button>
                </div>

                {/* ============================================================== */}
                {/* TAB 1: MEMBERS REGISTRY & ADVANCEMENT */}
                {/* ============================================================== */}
                {activeTab === 'members' && (
                    <div className="space-y-4">
                        {/* SEARCH & FILTERS BAR */}
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                            <form onSubmit={handleFilterSubmit} className="flex flex-1 flex-wrap items-center gap-3 w-full">
                                <div className="relative flex-1 min-w-[200px]">
                                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, ID, email, or phone..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none"
                                    />
                                </div>

                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none"
                                >
                                    <option value="">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>

                                <select
                                    value={selectedTier}
                                    onChange={(e) => setSelectedTier(e.target.value)}
                                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none"
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
                                    className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-0 outline-none flex items-center gap-1.5 shadow-xs"
                                >
                                    <Filter className="w-3.5 h-3.5" /> Filter
                                </button>

                                {(searchQuery || selectedStatus || selectedTier || eligibleOnly) && (
                                    <button
                                        type="button"
                                        onClick={handleClearFilters}
                                        className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold cursor-pointer border-0 outline-none"
                                    >
                                        Clear
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* MEMBERS TABLE */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[10px] uppercase text-slate-500 font-bold">
                                            <th className="px-4 py-3.5">Member</th>
                                            <th className="px-4 py-3.5">Rank &amp; Day</th>
                                            <th className="px-4 py-3.5">Training Progress</th>
                                            <th className="px-4 py-3.5">Requirements Progress</th>
                                            <th className="px-4 py-3.5">Status &amp; Promotion</th>
                                            <th className="px-4 py-3.5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {members.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-12 text-slate-400">
                                                    No academy members found matching filter criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            members.data.map((m) => {
                                                const country = getCountryInfo(m.phone_country_code);
                                                const tierInfo = getTierDetails(m.rank_tier || 'Rookie');
                                                const isEligible = m.promotion_eligibility?.is_eligible;

                                                return (
                                                    <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                                                        {/* Member Identity */}
                                                        <td className="px-4 py-3.5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                                                    {m.avatar_url ? (
                                                                        <img src={m.avatar_url} alt={m.full_name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <img src="/assets/image/academy/logo-black-trimmed.png?v=2" alt="LC" className="w-5 h-5 object-contain opacity-40" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-slate-900 text-sm">{m.full_name}</div>
                                                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                                                                        <span>{country.flag}</span>
                                                                        <span>{m.member_id}</span>
                                                                        <span>&bull;</span>
                                                                        <span>{m.email}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Rank Tier & 60-Day Program */}
                                                        <td className="px-4 py-3.5">
                                                            <div className="flex items-center gap-2">
                                                                <img src={tierInfo.badge_image} alt={m.rank_tier || 'Rookie'} className="w-7 h-auto object-contain" />
                                                                <div>
                                                                    <div className="font-black font-mono text-xs text-slate-900 uppercase">
                                                                        {m.rank_tier || 'Rookie'}
                                                                    </div>
                                                                    <div className="text-[10px] text-slate-500 font-mono">
                                                                        Day {m.program_progress?.current_day || 1}/60
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Training Progress */}
                                                        <td className="px-4 py-3.5">
                                                            <div className="w-32 space-y-1">
                                                                <div className="flex justify-between text-[11px] font-mono font-bold">
                                                                    <span className="text-[#0f766e]">
                                                                        {m.training_stats?.completed || 0}/{m.training_stats?.total || 5}
                                                                    </span>
                                                                    <span>{m.training_stats?.percentage || 0}%</span>
                                                                </div>
                                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                                    <div
                                                                        className="h-full bg-teal-600 rounded-full"
                                                                        style={{ width: `${m.training_stats?.percentage || 0}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Requirements Progress */}
                                                        <td className="px-4 py-3.5">
                                                            <div className="w-32 space-y-1">
                                                                <div className="flex justify-between text-[11px] font-mono font-bold">
                                                                    <span className="text-amber-700">
                                                                        {m.requirements_stats?.completed || 0}/{m.requirements_stats?.total || 3}
                                                                    </span>
                                                                    <span>{m.requirements_stats?.percentage || 0}%</span>
                                                                </div>
                                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                                    <div
                                                                        className="h-full bg-amber-500 rounded-full"
                                                                        style={{ width: `${m.requirements_stats?.percentage || 0}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Status & Promotion Flag */}
                                                        <td className="px-4 py-3.5">
                                                            <div className="space-y-1">
                                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                                                                    m.status === 'Approved'
                                                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                                                        : m.status === 'Rejected'
                                                                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                                                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                                                                }`}>
                                                                    {m.status}
                                                                </span>

                                                                {isEligible && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openPromoteModal(m)}
                                                                        className="block px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs hover:opacity-90 border-0 cursor-pointer animate-pulse"
                                                                    >
                                                                        ★ Promote to {m.next_rank}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-4 py-3.5 text-right">
                                                            <div className="flex items-center justify-end gap-1.5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setViewMember(m)}
                                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border-0 bg-transparent outline-none"
                                                                    title="View Full Profile"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </button>

                                                                {m.status === 'Pending' && (
                                                                    <>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => openApproveModal(m)}
                                                                            className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0f766e] hover:bg-[#0f766e] hover:text-white font-bold text-[11px] transition-colors cursor-pointer border-0 outline-none"
                                                                        >
                                                                            Approve
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => openRejectModal(m)}
                                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border-0 bg-transparent outline-none"
                                                                            title="Reject"
                                                                        >
                                                                            <X className="w-4 h-4" />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                {m.status === 'Approved' && (
                                                                    <>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setTrainingMemberModal(m)}
                                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer border-0 bg-transparent outline-none"
                                                                            title="Manage & Grant Trainings"
                                                                        >
                                                                            <BookOpen className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => openRequirementModal(m)}
                                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer border-0 bg-transparent outline-none"
                                                                            title="Update Requirement Progress"
                                                                        >
                                                                            <CheckSquare className="w-4 h-4" />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    onClick={() => openEditModal(m)}
                                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#0f766e] hover:bg-teal-50 transition-colors cursor-pointer border-0 bg-transparent outline-none"
                                                                    title="Edit Member"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDeleteMember(m)}
                                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border-0 bg-transparent outline-none"
                                                                    title="Delete Member"
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

                            {/* Pagination Controls */}
                            {members.links && members.links.length > 3 && (
                                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                                    <span className="text-slate-500 font-mono text-[11px]">
                                        Showing {members.from || 0}–{members.to || 0} of {members.total || 0} members
                                    </span>
                                    <div className="flex flex-wrap items-center gap-1">
                                        {members.links.map((link, idx) =>
                                            link.url ? (
                                                <Link
                                                    key={idx}
                                                    href={link.url}
                                                    preserveScroll
                                                    preserveState
                                                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors no-underline ${
                                                        link.active
                                                            ? 'bg-[#0f766e] text-white shadow-xs'
                                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 rounded-lg font-mono text-xs text-slate-300 bg-slate-50 border border-slate-100 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 2: TRAINING REFLECTIONS REVIEW QUEUE */}
                {/* ============================================================== */}
                {activeTab === 'reflections' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                                    Quality Assurance &bull; Reflection Auditing
                                </span>
                                <h3 className="text-xl font-black text-slate-900 uppercase font-mono mt-0.5">
                                    Pending Training Reflections ({pendingReflections.length})
                                </h3>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600">
                            Members submit their realizations before accessing the next sequential module. Approving a reflection unlocks the next training automatically and issues a certificate when all rank modules are fulfilled.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pendingReflections.length === 0 ? (
                                <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                                    No reflections currently awaiting review. All modules are audited!
                                </div>
                            ) : (
                                pendingReflections.map((ref) => (
                                    <div key={ref.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{ref.member_name}</h4>
                                                <div className="text-[10px] font-mono text-purple-700 font-bold">
                                                    {ref.member_code} &bull; {ref.member_rank} (Module #{ref.training_order})
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-400">{ref.submitted_at}</span>
                                        </div>

                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">Training Module</span>
                                            <div className="font-bold text-slate-800 text-xs mt-0.5">{ref.training_title}</div>
                                        </div>

                                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                                            <span className="text-[10px] uppercase font-bold text-slate-500 font-mono block mb-1">
                                                Member Realization &amp; Learnings:
                                            </span>
                                            <p className="whitespace-pre-line leading-relaxed italic">{ref.reflection_submission}</p>
                                        </div>

                                        <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                                            <button
                                                type="button"
                                                onClick={() => openReviewModal(ref)}
                                                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-0 outline-none shadow-xs"
                                            >
                                                Audit &amp; Decide
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 3: REQUIREMENTS CRITERIA & CONFIG */}
                {/* ============================================================== */}
                {activeTab === 'requirements' && (
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono">
                                    Configurable Advancement Criteria
                                </span>
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-mono mt-0.5">
                                    Rank Requirements Matrix ({rankRequirements.length} Definitions)
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={openCreateRequirement}
                                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer border-0 outline-none flex items-center gap-1.5 shrink-0"
                            >
                                <Plus className="w-4 h-4" /> Add Requirement
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {rankRequirements.map((r) => (
                                <div key={r.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold uppercase">
                                                {r.rank_tier} &bull; #{r.order}
                                            </span>
                                            <span className="text-xs font-mono font-bold text-slate-500">{r.code}</span>
                                        </div>

                                        <h4 className="text-sm font-black text-slate-900">{r.title_en}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{r.description_en}</p>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                                        <span>Target: {r.target_value} {r.unit}</span>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-md ${r.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {r.is_active ? 'Active' : 'Disabled'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => openEditRequirement(r)}
                                                className="p-1 rounded-lg text-slate-400 hover:text-amber-600 bg-transparent border-0 cursor-pointer"
                                                title="Edit Requirement"
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteRequirement(r)}
                                                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 bg-transparent border-0 cursor-pointer"
                                                title="Delete Requirement"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 4: BILINGUAL CURRICULUM MANAGEMENT */}
                {/* ============================================================== */}
                {activeTab === 'curriculum' && (
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 font-mono">
                                    Sequential Training Modules
                                </span>
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-mono mt-0.5">
                                    Curriculum Catalog ({rankTrainings.length} Modules)
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => openCreateTraining(null)}
                                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer border-0 outline-none flex items-center gap-1.5 shrink-0"
                            >
                                <Plus className="w-4 h-4" /> Add Training Module
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {rankTrainings.map((t) => (
                                <div key={t.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0f766e] border border-teal-200 text-[10px] font-mono font-bold uppercase">
                                                {t.rank_tier} &bull; Step #{t.order}
                                            </span>
                                            <span className="text-xs font-mono text-slate-400">{t.duration_minutes} mins</span>
                                        </div>

                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{t.title_en}</div>
                                            <div className="text-xs text-slate-500 font-medium italic mt-0.5">{t.title_tl}</div>
                                        </div>

                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 line-clamp-3">
                                            {t.description_en}
                                        </div>

                                        {Array.isArray(t.attachments) && t.attachments.length > 0 && (
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                                                    <Paperclip className="w-3 h-3 text-cyan-600" />
                                                    <span>{t.attachments.length} {t.attachments.length === 1 ? 'Attachment' : 'Attachments'}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {t.attachments.map((att) => (
                                                        <a
                                                            key={att.id}
                                                            href={att.download_url}
                                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 text-[11px] font-medium transition-colors no-underline max-w-full"
                                                            title={`Download ${att.name} (${att.size_label})`}
                                                        >
                                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase font-mono shrink-0 ${getAttachmentBadgeStyle(att.extension)}`}>
                                                                {att.extension || 'FILE'}
                                                            </span>
                                                            <span className="truncate max-w-[160px]">{att.name}</span>
                                                            <Download className="w-3 h-3 shrink-0 text-slate-400" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${t.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {t.is_published ? 'Published' : 'Draft'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleGrantTrainingToRank(t)}
                                                className="px-2 py-0.5 rounded-lg bg-teal-50 hover:bg-[#0f766e] text-[#0f766e] hover:text-white font-bold text-[10px] transition-all flex items-center gap-1 cursor-pointer border-0"
                                                title={`Grant module to all active ${t.rank_tier} members`}
                                            >
                                                <Users className="w-3 h-3" />
                                                <span>Grant to All {t.rank_tier}</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => openEditTraining(t)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 bg-transparent border-0 cursor-pointer"
                                                title="Edit Training Module"
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteTraining(t)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 bg-transparent border-0 cursor-pointer"
                                                title="Delete Training Module"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 4B: TIER COMMANDMENTS MANAGER */}
                {/* ============================================================== */}
                {activeTab === 'commandments' && (
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono">
                                    Code of Conduct per Rank Level
                                </span>
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-mono mt-0.5">
                                    Tier Commandments ({rankCommandments.length})
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 mb-0">
                                    Add, edit, hide, or delete commandments for each Academy rank tier. Changes sync to all member portals immediately.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => openCreateCommandment(commandmentTierFilter)}
                                className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                            >
                                <Plus className="w-4 h-4" /> Add Commandment
                            </button>
                        </div>

                        {/* Tier Filter Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {['All', 'Rookie', 'Elite', 'Master', 'Grand Master', 'Legend'].map((tierOption) => {
                                const active = commandmentTierFilter === tierOption;
                                const tierCount = tierOption === 'All'
                                    ? rankCommandments.length
                                    : rankCommandments.filter((c) => c.rank_tier === tierOption).length;
                                return (
                                    <button
                                        key={tierOption}
                                        type="button"
                                        onClick={() => setCommandmentTierFilter(tierOption)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                            active
                                                ? 'bg-[#0f766e] text-white shadow-sm'
                                                : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-[#0f766e]'
                                        }`}
                                    >
                                        <span>{tierOption === 'All' ? 'All Tiers' : tierOption}</span>
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                                            active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {tierCount}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Grouped Tier Lists */}
                        <div className="space-y-6">
                            {['Rookie', 'Elite', 'Master', 'Grand Master', 'Legend']
                                .filter((t) => commandmentTierFilter === 'All' || commandmentTierFilter === t)
                                .map((tierName) => {
                                    const tierDetails = getTierDetails(tierName);
                                    const items = rankCommandments
                                        .filter((c) => c.rank_tier === tierName)
                                        .sort((a, b) => (a.order - b.order) || (a.id - b.id));

                                    return (
                                        <div key={tierName} className="rounded-3xl bg-white p-5 sm:p-6 space-y-4">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-2xl bg-slate-50 p-1.5 flex items-center justify-center shrink-0">
                                                        <img
                                                            src={tierDetails.badge_image}
                                                            alt={tierName}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase font-mono mb-0">
                                                                {tierDetails.name} Tier Commandments
                                                            </h4>
                                                            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0f766e] text-[10px] font-mono font-bold">
                                                                {items.filter((i) => i.is_active).length} Active / {items.length} Total
                                                            </span>
                                                        </div>
                                                        <div className="text-[11px] text-slate-500">{tierDetails.title}</div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => openCreateCommandment(tierName)}
                                                    className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0f766e] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>Add for {tierName}</span>
                                                </button>
                                            </div>

                                            {items.length === 0 ? (
                                                <div className="p-8 rounded-2xl bg-slate-50 text-center space-y-2">
                                                    <ScrollText className="w-7 h-7 text-slate-300 mx-auto" />
                                                    <p className="text-xs font-bold text-slate-600 mb-0">
                                                        No commandments configured for {tierName} yet.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => openCreateCommandment(tierName)}
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0f766e] text-white text-xs font-bold cursor-pointer mt-1"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add First Commandment
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                                    {items.map((cmd) => (
                                                        <div
                                                            key={cmd.id}
                                                            className={`p-4 rounded-2xl flex flex-col justify-between gap-3 transition-all ${
                                                                cmd.is_active ? 'bg-slate-50/90' : 'bg-slate-100/70 opacity-70'
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <span className="w-8 h-8 rounded-xl bg-[#0f766e] text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                                                                    #{cmd.order}
                                                                </span>
                                                                <div className="min-w-0 flex-1 space-y-1">
                                                                    <div className="text-sm font-black text-slate-900 leading-snug break-words">
                                                                        {cmd.title_en}
                                                                    </div>
                                                                    {cmd.title_tl && cmd.title_tl !== cmd.title_en && (
                                                                        <div className="text-[11px] font-semibold text-[#0f766e] italic break-words">
                                                                            FIL: {cmd.title_tl}
                                                                        </div>
                                                                    )}
                                                                    {cmd.description_en && (
                                                                        <p className="text-xs text-slate-600 leading-relaxed mb-0 whitespace-pre-line break-words">
                                                                            {cmd.description_en}
                                                                        </p>
                                                                    )}
                                                                    {cmd.description_tl && cmd.description_tl !== cmd.description_en && (
                                                                        <p className="text-[11px] text-slate-500 leading-relaxed italic mb-0 whitespace-pre-line break-words">
                                                                            FIL: {cmd.description_tl}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between gap-2 pt-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleToggleCommandment(cmd)}
                                                                    className={`px-3 py-1 rounded-xl text-[11px] font-bold cursor-pointer ${
                                                                        cmd.is_active
                                                                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                                                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                                                    }`}
                                                                >
                                                                    {cmd.is_active ? 'Active' : 'Hidden'}
                                                                </button>
                                                                <div className="flex items-center gap-1.5">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openEditCommandment(cmd)}
                                                                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-teal-50 text-slate-600 hover:text-[#0f766e] text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                                                                        title="Edit commandment"
                                                                    >
                                                                        <Edit className="w-3.5 h-3.5" />
                                                                        <span>Edit</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteCommandment(cmd)}
                                                                        className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer shadow-xs"
                                                                        title="Delete commandment"
                                                                        aria-label="Delete commandment"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 5: ANNOUNCEMENTS & RECOGNITIONS */}
                {/* ============================================================== */}
                {activeTab === 'announcements' && (
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                    Communications &amp; Achievers
                                </span>
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase font-mono mt-0.5">
                                    Announcements &amp; Recognition Posts
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateAnnouncement(true)}
                                className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer border-0 outline-none flex items-center gap-1.5 shrink-0"
                            >
                                <Plus className="w-4 h-4" /> Publish Announcement
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {announcements.map((ann) => (
                                <div key={ann.id} className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                                    <div>
                                        {ann.image_url && (
                                            <img src={ann.image_url} alt={ann.title} className="w-full h-40 object-cover border-b border-slate-100" />
                                        )}
                                        <div className="p-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase">
                                                    {ann.type}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-mono">{ann.created_at}</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm">{ann.title}</h4>
                                            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ann.content}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleAnnouncement(ann)}
                                            className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                                                ann.is_active ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-200 text-slate-600'
                                            }`}
                                        >
                                            {ann.is_active ? 'Active' : 'Hidden'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteAnnouncement(ann)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 border-0 bg-transparent cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* TAB 6: ISSUED CERTIFICATES */}
                {/* ============================================================== */}
                {activeTab === 'certificates' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-700 font-mono">
                                    Official Credentials Registry
                                </span>
                                <h3 className="text-xl font-black text-slate-900 uppercase font-mono mt-0.5">
                                    Issued Training Completion Certificates ({certificates.length})
                                </h3>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[680px] text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[10px] uppercase text-slate-500 font-bold">
                                            <th className="px-4 py-3">Certificate Number</th>
                                            <th className="px-4 py-3">Member</th>
                                            <th className="px-4 py-3">Rank Tier</th>
                                            <th className="px-4 py-3">Format / Type</th>
                                            <th className="px-4 py-3">Issuance Date</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {certificates.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-12 text-slate-400">
                                                    No training completion certificates have been issued yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            certificates.map((cert) => (
                                                <tr key={cert.id} className="hover:bg-slate-50">
                                                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">{cert.certificate_number}</td>
                                                    <td className="px-4 py-3.5 font-semibold text-slate-800">{cert.member_name} ({cert.member_code})</td>
                                                    <td className="px-4 py-3.5 font-mono font-bold text-[#0f766e] whitespace-nowrap">{cert.rank_tier}</td>
                                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                                        {cert.is_custom ? (
                                                            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0f766e] border border-teal-200 text-[10px] font-bold font-mono">
                                                                ★ Custom Admin File
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium font-mono">
                                                                System Generated
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-slate-500 font-mono whitespace-nowrap">{cert.issued_at}</td>
                                                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <a
                                                                href={cert.download_url}
                                                                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold no-underline inline-flex items-center gap-1.5"
                                                            >
                                                                <Download className="w-3.5 h-3.5" /> Download
                                                            </a>
                                                            <button
                                                                type="button"
                                                                onClick={() => openUploadCertificateModal({ id: cert.member_id, full_name: cert.member_name, rank_tier: cert.rank_tier, member_id: cert.member_code })}
                                                                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border-0 cursor-pointer inline-flex items-center gap-1.5"
                                                                title="Upload or replace edited certificate"
                                                            >
                                                                <Upload className="w-3.5 h-3.5" /> Replace
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ============================================================== */}
            {/* MODAL: PROMOTE MEMBER CONFIRMATION */}
            {/* ============================================================== */}
            {promoteMemberModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => setPromoteMemberModal(null)}
                >
                    <div
                        className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-base font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                Official Rank Promotion
                            </h3>
                            <button type="button" onClick={() => setPromoteMemberModal(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs space-y-2">
                            <div className="font-bold text-slate-900 text-sm">{promoteMemberModal.full_name}</div>
                            <div className="text-slate-600">
                                Current Rank: <strong>{promoteMemberModal.rank_tier}</strong> &rarr; Target Promotion Rank: <strong className="text-[#0f766e] text-sm uppercase font-mono">{promoteMemberModal.next_rank}</strong>
                            </div>
                            <p className="text-slate-500 text-[11px] leading-relaxed pt-1 border-t border-teal-200/60">
                                Concurring this promotion will update the member's rank badge, automatically initialize their new 60-day development cycle at Day 1 for {promoteMemberModal.next_rank}, unlock new sequential training modules, and dispatch an official promotion congratulations email.
                            </p>
                        </div>

                        <form onSubmit={handlePromoteSubmit} className="pt-2 flex flex-wrap justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPromoteMemberModal(null)}
                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={promoteForm.processing}
                                className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer disabled:opacity-50"
                            >
                                {promoteForm.processing ? 'Conferring...' : `Promote to ${promoteMemberModal.next_rank}`}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: AUDIT TRAINING REFLECTION */}
            {/* ============================================================== */}
            {reviewReflectionModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => { if (!reviewForm.processing) setReviewReflectionModal(null); }}
                >
                    <div
                        className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-purple-700 font-mono">Sequential Unlocking Review</span>
                                <h3 className="text-base font-bold text-slate-900 uppercase font-mono">
                                    Audit Training Reflection
                                </h3>
                            </div>
                            <button type="button" onClick={() => setReviewReflectionModal(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {Object.keys(reviewForm.errors).length > 0 && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                                {Object.values(reviewForm.errors).join(' ')}
                            </div>
                        )}

                        <div className="space-y-3 text-xs">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="font-bold text-slate-900">{reviewReflectionModal.member_name} ({reviewReflectionModal.member_code})</div>
                                <div className="text-slate-500 font-mono mt-0.5 flex items-center gap-2 flex-wrap">
                                    <span>Module #{reviewReflectionModal.training_order}: {reviewReflectionModal.training_title}</span>
                                    {reviewReflectionModal.is_last_module && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                                            Final Module
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block mb-1">Submitted Realizations</span>
                                <p className="text-slate-800 whitespace-pre-line leading-relaxed italic break-words">{reviewReflectionModal.reflection_submission}</p>
                            </div>
                        </div>

                        <form onSubmit={handleReviewSubmit} className="space-y-3 pt-2">
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Admin Feedback / Commendation</label>
                                <textarea
                                    rows="2"
                                    value={reviewForm.data.admin_feedback}
                                    onChange={(e) => reviewForm.setData('admin_feedback', e.target.value)}
                                    placeholder="Write feedback for the member..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm sm:text-xs text-slate-900 outline-none"
                                />
                            </div>

                            {/* Show custom certificate upload ONLY when reviewing the final module of the level */}
                            {reviewReflectionModal.is_last_module && (
                                <div className="p-3.5 rounded-2xl bg-amber-50/70 space-y-2">
                                    <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                                        <Award className="w-4 h-4 text-amber-600 shrink-0" />
                                        <span>Provide Custom Certificate (Optional &mdash; PDF or Image)</span>
                                    </label>
                                    <p className="text-[11px] text-amber-800 leading-relaxed mb-0">
                                        Before approving this member&apos;s final training module for this level, you may attach your customized certificate here. Upon approval, it will be conferred immediately and emailed directly to the member.
                                    </p>
                                    <input
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg,.webp"
                                        onChange={(e) => reviewForm.setData('certificate_file', e.target.files?.[0] || null)}
                                        className="w-full text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0f766e] file:text-white file:cursor-pointer"
                                    />
                                    {reviewForm.data.certificate_file && (
                                        <div className="text-[11px] font-bold text-[#0f766e] flex items-center gap-1.5 pt-1">
                                            <Check className="w-3.5 h-3.5 shrink-0" />
                                            <span className="truncate">File attached: {reviewForm.data.certificate_file.name}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="pt-2 flex flex-wrap justify-end gap-2.5 border-t border-slate-100">
                                <button
                                    type="button"
                                    disabled={reviewForm.processing}
                                    onClick={() => submitReflectionDecision('reject')}
                                    className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold uppercase tracking-wider border-0 cursor-pointer disabled:opacity-50"
                                >
                                    {reviewForm.processing ? 'Processing...' : 'Reject (Request Revision)'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={reviewForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer disabled:opacity-50"
                                >
                                    {reviewForm.processing
                                        ? 'Approving...'
                                        : reviewReflectionModal.is_last_module
                                            ? 'Approve & Complete Level'
                                            : 'Approve & Unlock Next'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: VIEW DETAILS */}
            {/* ============================================================== */}
            {viewMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => setViewMember(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-xl w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                <img src="/assets/image/academy/logo-black-trimmed.png?v=2" alt="Legacy Club" className="w-5 h-5 object-contain" />
                                Member Details: {viewMember.full_name}
                            </h3>
                            <button onClick={() => setViewMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                    {viewMember.avatar_url ? (
                                        <img src={viewMember.avatar_url} alt={viewMember.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src="/assets/image/academy/logo-black-trimmed.png?v=2" alt="LC" className="w-8 h-8 object-contain opacity-40" />
                                    )}
                                </div>
                                <div>
                                    <div className="text-base font-bold text-slate-900">{viewMember.full_name}</div>
                                    <div className="text-xs font-mono text-[#0f766e] font-bold mt-0.5">{viewMember.member_id}</div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                                            Status: {viewMember.status}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[10px] font-bold text-[#0f766e] border border-teal-200">
                                            Rank: {viewMember.rank_tier || 'Rookie'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div className="min-w-0">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Email Address</span>
                                    <div className="text-slate-900 font-medium mt-0.5 font-mono break-all">{viewMember.email}</div>
                                </div>
                                <div className="min-w-0">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Contact Number</span>
                                    <div className="text-slate-900 font-medium mt-0.5 font-mono">{viewMember.phone_country_code} {viewMember.phone_number}</div>
                                </div>
                                <div className="sm:col-span-2 min-w-0">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Official Address</span>
                                    <div className="text-slate-800 mt-0.5 break-words">{viewMember.address}</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50">
                            <button onClick={() => setViewMember(null)} className="px-5 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold uppercase cursor-pointer border-0">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: APPROVE WITH RANK SELECTION */}
            {/* ============================================================== */}
            {approveMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => { if (!approveForm.processing) setApproveMember(null); }}
                >
                    <div
                        className="bg-white rounded-3xl max-w-xl w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-teal-50/50">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">Phase 2 Verification</span>
                                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase font-mono">
                                    <CheckCircle2 className="w-5 h-5 text-[#0f766e]" />
                                    Approve Membership: {approveMember.full_name}
                                </h3>
                            </div>
                            <button onClick={() => setApproveMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleApproveSubmit} className="p-6 overflow-y-auto space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                                    Select Member Official Rank / Tier <span className="text-rose-500">*</span>
                                </label>
                                <div className="space-y-2">
                                    {availableTiers.map((t) => (
                                        <label
                                            key={t.tier}
                                            className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
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
                                                    className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
                                                />
                                                <img src={t.badge_image} alt={t.tier} className="w-9 h-auto object-contain" />
                                                <div>
                                                    <div className="text-xs font-black font-mono">{t.tier.toUpperCase()} {t.stars_display}</div>
                                                    <div className="text-[11px] text-slate-500">{t.description}</div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setApproveMember(null)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer border-0"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={approveForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer border-0"
                                >
                                    {approveForm.processing ? 'Approving...' : 'Approve & Initialize 60-Day Cycle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: REJECT APPLICANT */}
            {/* ============================================================== */}
            {rejectMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs" onClick={() => setRejectMember(null)}>
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-base font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                Reject Application: {rejectMember.full_name}
                            </h3>
                            <button type="button" onClick={() => setRejectMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleRejectSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Reason for Rejection *</label>
                                <textarea
                                    rows="3"
                                    value={rejectForm.data.rejection_reason}
                                    onChange={(e) => rejectForm.setData('rejection_reason', e.target.value)}
                                    placeholder="Explain politely why this application cannot be approved..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm sm:text-xs text-slate-900 outline-none"
                                    required
                                />
                            </div>

                            <div className="pt-2 flex flex-wrap justify-end gap-3 border-t border-slate-100">
                                <button type="button" onClick={() => setRejectMember(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" disabled={rejectForm.processing} className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer disabled:opacity-50">
                                    {rejectForm.processing ? 'Rejecting...' : 'Reject Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: EDIT MEMBER */}
            {/* ============================================================== */}
            {editMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditMember(null)}>
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-base font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                                <Edit className="w-5 h-5 text-[#0f766e]" /> Edit Member Information
                            </h3>
                            <button type="button" onClick={() => setEditMember(null)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.first_name}
                                        onChange={(e) => editForm.setData('first_name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.last_name}
                                        onChange={(e) => editForm.setData('last_name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
                                    <select
                                        value={editForm.data.status}
                                        onChange={(e) => editForm.setData('status', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Rank Tier</label>
                                    <select
                                        value={editForm.data.rank_tier}
                                        onChange={(e) => editForm.setData('rank_tier', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm sm:text-xs text-slate-900 font-mono"
                                    >
                                        <option value="Rookie">Rookie</option>
                                        <option value="Elite">Elite</option>
                                        <option value="Master">Master</option>
                                        <option value="Grand Master">Grand Master</option>
                                        <option value="Legend">Legend</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-wrap justify-end gap-3 border-t border-slate-100">
                                <button type="button" onClick={() => setEditMember(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" disabled={editForm.processing} className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer disabled:opacity-50">
                                    {editForm.processing ? 'Saving...' : 'Save Updates'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: DELETE CONFIRMATION */}
            {/* ============================================================== */}
            {deleteMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs" onClick={() => setDeleteMember(null)}>
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full max-h-[90dvh] overflow-y-auto p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">Delete Academy Member?</h4>
                        <p className="text-xs text-slate-500">
                            Are you sure you want to remove <strong>{deleteMember.full_name}</strong>? This action cannot be undone.
                        </p>
                        <div className="pt-2 flex justify-center gap-3">
                            <button type="button" onClick={() => setDeleteMember(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer">
                                Cancel
                            </button>
                            <button type="button" onClick={handleDeleteSubmit} className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider border-0 cursor-pointer">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: CREATE ANNOUNCEMENT / RECOGNITION */}
            {/* ============================================================== */}
            {showCreateAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreateAnnouncement(false)}>
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                                <Bell className="w-5 h-5 text-[#0f766e] shrink-0" /> Publish Announcement or Recognition
                            </h3>
                            <button type="button" onClick={() => setShowCreateAnnouncement(false)} className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAnnouncementSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Type</label>
                                    <select
                                        value={announcementForm.data.type}
                                        onChange={(e) => announcementForm.setData('type', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                    >
                                        <option value="announcement">General Announcement</option>
                                        <option value="weekly_achiever">Weekly Achiever</option>
                                        <option value="training_finisher">Training Finisher</option>
                                        <option value="recognition">Special Recognition</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Badge Text (Optional)</label>
                                    <input
                                        type="text"
                                        value={announcementForm.data.badge_text}
                                        onChange={(e) => announcementForm.setData('badge_text', e.target.value)}
                                        placeholder="e.g. TOP PERFORMER"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={announcementForm.data.title}
                                    onChange={(e) => announcementForm.setData('title', e.target.value)}
                                    placeholder="Announcement title..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Content / Writeup *</label>
                                <textarea
                                    rows="4"
                                    value={announcementForm.data.content}
                                    onChange={(e) => announcementForm.setData('content', e.target.value)}
                                    placeholder="Write announcement details..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Banner Image (Optional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => announcementForm.setData('image', e.target.files[0])}
                                    accept="image/*"
                                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-teal-50 file:text-[#0f766e] file:font-bold"
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                                <button type="button" onClick={() => setShowCreateAnnouncement(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" disabled={announcementForm.processing} className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer">
                                    {announcementForm.processing ? 'Publishing...' : 'Publish'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: CREATE / EDIT REQUIREMENT CRITERIA */}
            {/* ============================================================== */}
            {showCreateRequirement && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => { if (!requirementDefForm.processing) { setShowCreateRequirement(false); setEditingRequirement(null); } }}
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="text-base font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                                <CheckSquare className="w-5 h-5 text-amber-600" />
                                {editingRequirement ? 'Edit Rank Requirement' : 'Define New Rank Requirement'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateRequirement(false);
                                    setEditingRequirement(null);
                                }}
                                className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleRequirementDefSubmit} className="p-6 overflow-y-auto space-y-3.5">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Rank Tier *</label>
                                    <select
                                        value={requirementDefForm.data.rank_tier}
                                        onChange={(e) => requirementDefForm.setData('rank_tier', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    >
                                        <option value="Rookie">Rookie</option>
                                        <option value="Elite">Elite</option>
                                        <option value="Master">Master</option>
                                        <option value="Grand Master">Grand Master</option>
                                        <option value="Legend">Legend</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Order / Sequence *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={requirementDefForm.data.order}
                                        onChange={(e) => requirementDefForm.setData('order', parseInt(e.target.value) || 1)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="col-span-1">
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Code *</label>
                                    <input
                                        type="text"
                                        value={requirementDefForm.data.code}
                                        onChange={(e) => requirementDefForm.setData('code', e.target.value.toUpperCase())}
                                        placeholder="ROOKIE-REQ-1"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Value *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={requirementDefForm.data.target_value}
                                        onChange={(e) => requirementDefForm.setData('target_value', parseInt(e.target.value) || 1)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Unit *</label>
                                    <input
                                        type="text"
                                        value={requirementDefForm.data.unit}
                                        onChange={(e) => requirementDefForm.setData('unit', e.target.value)}
                                        placeholder="Sponsors"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Title (English) *</label>
                                <input
                                    type="text"
                                    value={requirementDefForm.data.title_en}
                                    onChange={(e) => requirementDefForm.setData('title_en', e.target.value)}
                                    placeholder="e.g. Personal Sponsors Recruitment"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Title (Filipino) *</label>
                                <input
                                    type="text"
                                    value={requirementDefForm.data.title_tl}
                                    onChange={(e) => requirementDefForm.setData('title_tl', e.target.value)}
                                    placeholder="e.g. Personal na Sponsor"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Description (English)</label>
                                <textarea
                                    rows="2"
                                    value={requirementDefForm.data.description_en}
                                    onChange={(e) => requirementDefForm.setData('description_en', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Description (Filipino)</label>
                                <textarea
                                    rows="2"
                                    value={requirementDefForm.data.description_tl}
                                    onChange={(e) => requirementDefForm.setData('description_tl', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={requirementDefForm.data.is_active}
                                    onChange={(e) => requirementDefForm.setData('is_active', e.target.checked)}
                                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-xs font-bold text-slate-700">Active Criteria</span>
                            </label>

                            <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateRequirement(false);
                                        setEditingRequirement(null);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={requirementDefForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer"
                                >
                                    {requirementDefForm.processing ? 'Saving...' : editingRequirement ? 'Update Requirement' : 'Save Requirement'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: CREATE / EDIT TRAINING MODULE */}
            {/* ============================================================== */}
            {showCreateTraining && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => { if (!trainingForm.processing) { setShowCreateTraining(false); setEditingTraining(null); } }}
                >
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="text-base font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-cyan-600" />
                                {editingTraining ? 'Edit Training Module' : 'Add New Training Module'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateTraining(false);
                                    setEditingTraining(null);
                                }}
                                className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleTrainingSubmit} className="p-6 overflow-y-auto space-y-3.5">
                            {/* Member Assignment Selector */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                    Assign Training Module To:
                                </label>
                                <select
                                    value={trainingForm.data.target_member_id ? `member_${trainingForm.data.target_member_id}` : 'all_rank'}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === 'all_rank') {
                                            trainingForm.setData('target_member_id', '');
                                        } else {
                                            const memberId = val.replace('member_', '');
                                            trainingForm.setData('target_member_id', memberId);
                                            const mem = members.data.find((m) => m.id === parseInt(memberId));
                                            if (mem) {
                                                trainingForm.setData('rank_tier', mem.rank_tier || 'Rookie');
                                            }
                                        }
                                    }}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                >
                                    <option value="all_rank">👥 All Active Members in Tier ({trainingForm.data.rank_tier})</option>
                                    <optgroup label="Specific Member (Direct Assignment)">
                                        {members.data.map((m) => (
                                            <option key={m.id} value={`member_${m.id}`}>
                                                👤 {m.full_name} ({m.member_id} - {m.rank_tier})
                                            </option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Rank Tier *</label>
                                    <select
                                        value={trainingForm.data.rank_tier}
                                        onChange={(e) => trainingForm.setData('rank_tier', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    >
                                        <option value="Rookie">Rookie</option>
                                        <option value="Elite">Elite</option>
                                        <option value="Master">Master</option>
                                        <option value="Grand Master">Grand Master</option>
                                        <option value="Legend">Legend</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Step Order (1-5) *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={trainingForm.data.order}
                                        onChange={(e) => trainingForm.setData('order', parseInt(e.target.value) || 1)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Duration (Mins) *</label>
                                    <input
                                        type="number"
                                        min="5"
                                        value={trainingForm.data.duration_minutes}
                                        onChange={(e) => trainingForm.setData('duration_minutes', parseInt(e.target.value) || 30)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Title (English) *</label>
                                    <input
                                        type="text"
                                        value={trainingForm.data.title_en}
                                        onChange={(e) => trainingForm.setData('title_en', e.target.value)}
                                        placeholder="Module title in English..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Title (Filipino) *</label>
                                    <input
                                        type="text"
                                        value={trainingForm.data.title_tl}
                                        onChange={(e) => trainingForm.setData('title_tl', e.target.value)}
                                        placeholder="Pamagat sa Filipino..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Summary (English)</label>
                                    <textarea
                                        rows="2"
                                        value={trainingForm.data.description_en}
                                        onChange={(e) => trainingForm.setData('description_en', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Summary (Filipino)</label>
                                    <textarea
                                        rows="2"
                                        value={trainingForm.data.description_tl}
                                        onChange={(e) => trainingForm.setData('description_tl', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Curriculum Content &amp; Guide (English) *</label>
                                <textarea
                                    rows="4"
                                    value={trainingForm.data.content_en}
                                    onChange={(e) => trainingForm.setData('content_en', e.target.value)}
                                    placeholder="Detailed training syllabus, concepts, instructions..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Curriculum Content &amp; Guide (Filipino) *</label>
                                <textarea
                                    rows="4"
                                    value={trainingForm.data.content_tl}
                                    onChange={(e) => trainingForm.setData('content_tl', e.target.value)}
                                    placeholder="Detalyadong gabay at mga aralin sa Filipino..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                    Video URL <span className="font-normal text-slate-400">(Optional — YouTube, Vimeo, Google Drive, or MP4)</span>
                                </label>
                                <input
                                    type="url"
                                    value={trainingForm.data.video_url}
                                    onChange={(e) => trainingForm.setData('video_url', e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                                />
                            </div>

                            {/* Training Attachments Uploader & Manager */}
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                        <Paperclip className="w-3.5 h-3.5 text-cyan-600" />
                                        <span>Training Materials &amp; Attachments</span>
                                    </label>
                                    <span className="text-[10px] font-mono text-slate-400">
                                        PDF, Images, Docs, Slides, Sheets, ZIP &bull; Max 15 MB/file
                                    </span>
                                </div>

                                {/* Existing saved attachments (when editing) */}
                                {editingTraining && Array.isArray(editingTraining.attachments) && editingTraining.attachments.length > 0 && (
                                    <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                                            Current Attached Files ({editingTraining.attachments.length})
                                        </div>
                                        <div className="space-y-1.5">
                                            {editingTraining.attachments.map((att) => {
                                                const markedForRemoval = (trainingForm.data.remove_attachments || []).includes(att.id);
                                                return (
                                                    <div
                                                        key={att.id}
                                                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white transition-all ${
                                                            markedForRemoval ? 'opacity-55 bg-rose-50/70' : ''
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase font-mono shrink-0 ${getAttachmentBadgeStyle(att.extension)}`}>
                                                                {att.extension || 'FILE'}
                                                            </span>
                                                            <span className={`text-xs font-semibold truncate ${markedForRemoval ? 'line-through text-rose-700' : 'text-slate-800'}`} title={att.name}>
                                                                {att.name}
                                                            </span>
                                                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                                                ({att.size_label})
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 shrink-0">
                                                            {att.can_preview && !markedForRemoval && (
                                                                <a
                                                                    href={att.preview_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-700 hover:bg-cyan-50 transition-colors"
                                                                    title="Preview file"
                                                                >
                                                                    <Eye className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                            {!markedForRemoval && (
                                                                <a
                                                                    href={att.download_url}
                                                                    className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                                                                    title="Download file"
                                                                >
                                                                    <Download className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleRemoveExistingAttachment(att.id)}
                                                                className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border-0 cursor-pointer ${
                                                                    markedForRemoval
                                                                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                                                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                                                }`}
                                                            >
                                                                {markedForRemoval ? 'Undo' : 'Remove'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Dropzone / multi-file picker */}
                                <label
                                    htmlFor="training-attachments-input"
                                    className="portal-dropzone flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl bg-slate-50/80 hover:bg-cyan-50/40 text-center cursor-pointer transition-colors"
                                >
                                    <Upload className="w-5 h-5 text-cyan-600" />
                                    <span className="text-xs font-bold text-slate-700">
                                        Click to attach files (you can select multiple files)
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        Supported: PDF, JPG, PNG, WebP, GIF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, ZIP
                                    </span>
                                    <input
                                        id="training-attachments-input"
                                        type="file"
                                        multiple
                                        accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.odt,.ods,.odp,.zip"
                                        onChange={handleTrainingAttachmentsChange}
                                        className="hidden"
                                    />
                                </label>

                                {/* Newly staged files queued for upload */}
                                {Array.isArray(trainingForm.data.attachments) && trainingForm.data.attachments.length > 0 && (
                                    <div className="space-y-1.5 p-3 rounded-2xl bg-cyan-50/60">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 font-mono">
                                            Ready to Upload ({trainingForm.data.attachments.length} {trainingForm.data.attachments.length === 1 ? 'file' : 'files'})
                                        </div>
                                        <div className="space-y-1.5">
                                            {trainingForm.data.attachments.map((file, idx) => {
                                                const ext = file.name.includes('.') ? file.name.split('.').pop() : 'file';
                                                return (
                                                    <div key={`${file.name}-${idx}`} className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase font-mono shrink-0 ${getAttachmentBadgeStyle(ext)}`}>
                                                                {ext}
                                                            </span>
                                                            <span className="text-xs font-semibold text-slate-800 truncate" title={file.name}>
                                                                {file.name}
                                                            </span>
                                                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                                                ({formatFileSize(file.size)})
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeStagedTrainingAttachment(idx)}
                                                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 bg-transparent border-0 cursor-pointer shrink-0"
                                                            title="Remove file"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Display attachment validation errors if any */}
                                {Object.entries(trainingForm.errors)
                                    .filter(([key]) => key === 'attachments' || key.startsWith('attachments.'))
                                    .map(([key, message]) => (
                                        <p key={key} className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 m-0">
                                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                            <span>{message}</span>
                                        </p>
                                    ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Reflection Prompt (English)</label>
                                    <textarea
                                        rows="2"
                                        value={trainingForm.data.reflection_prompt_en}
                                        onChange={(e) => trainingForm.setData('reflection_prompt_en', e.target.value)}
                                        placeholder="Question for mandatory realization submission..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Reflection Prompt (Filipino)</label>
                                    <textarea
                                        rows="2"
                                        value={trainingForm.data.reflection_prompt_tl}
                                        onChange={(e) => trainingForm.setData('reflection_prompt_tl', e.target.value)}
                                        placeholder="Katanungan para sa pagbabalik-tanaw..."
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={trainingForm.data.is_published}
                                    onChange={(e) => trainingForm.setData('is_published', e.target.checked)}
                                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                                />
                                <span className="text-xs font-bold text-slate-700">Published Module</span>
                            </label>

                            <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateTraining(false);
                                        setEditingTraining(null);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={trainingForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer"
                                >
                                    {trainingForm.processing ? 'Saving...' : editingTraining ? 'Update Module' : 'Publish Module'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* ============================================================== */}
            {/* MODAL: UPDATE MEMBER REQUIREMENT PROGRESS */}
            {/* ============================================================== */}
            {requirementMemberModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => { if (!requirementProgressForm.processing) { setRequirementMemberModal(null); setSelectedRequirement(null); } }}
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-amber-700 font-mono">
                                    Requirements Management &bull; {requirementMemberModal.rank_tier}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 uppercase font-mono">
                                    Update Progress: {requirementMemberModal.full_name}
                                </h3>
                            </div>
                            <button
                                onClick={() => {
                                    setRequirementMemberModal(null);
                                    setSelectedRequirement(null);
                                }}
                                className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleRequirementProgressSubmit} className="p-6 overflow-y-auto space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Select Requirement Criteria *</label>
                                <select
                                    value={selectedRequirement?.id || ''}
                                    onChange={(e) => {
                                        const req = requirementMemberModal.requirements_stats?.items?.find((r) => r.id === parseInt(e.target.value));
                                        setSelectedRequirement(req);
                                        if (req) {
                                            requirementProgressForm.setData({
                                                current_value: req.current_value || 0,
                                                is_verified: req.is_verified || false,
                                                admin_notes: req.admin_notes || '',
                                            });
                                        }
                                    }}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                    required
                                >
                                    {requirementMemberModal.requirements_stats?.items?.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.code} - {r.title_en} (Target: {r.target_value} {r.unit})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedRequirement && (
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                                    <div className="font-bold text-slate-900">{selectedRequirement.title_en}</div>
                                    <div className="text-slate-500">{selectedRequirement.description_en}</div>
                                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-mono font-bold">
                                        <span className="text-[#0f766e]">Target: {selectedRequirement.target_value} {selectedRequirement.unit}</span>
                                        <span className="text-amber-700">
                                            Remaining: {Math.max(0, selectedRequirement.target_value - (requirementProgressForm.data.current_value || 0))} {selectedRequirement.unit}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Current Progress Value *</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="9999"
                                    value={requirementProgressForm.data.current_value}
                                    onChange={(e) => requirementProgressForm.setData('current_value', parseInt(e.target.value) || 0)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                    required
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={requirementProgressForm.data.is_verified}
                                    onChange={(e) => requirementProgressForm.setData('is_verified', e.target.checked)}
                                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-xs font-bold text-slate-700">Verified &amp; Approved by Administrator</span>
                            </label>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Admin Notes / Verification Memo</label>
                                <textarea
                                    rows="2"
                                    value={requirementProgressForm.data.admin_notes}
                                    onChange={(e) => requirementProgressForm.setData('admin_notes', e.target.value)}
                                    placeholder="e.g. Verified 2 active direct recruits on portal records..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
                                />
                            </div>

                            <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRequirementMemberModal(null);
                                        setSelectedRequirement(null);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={requirementProgressForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer"
                                >
                                    {requirementProgressForm.processing ? 'Saving...' : 'Save & Recalculate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: MEMBER TRAININGS ACCREDITATION & GRANT */}
            {/* ============================================================== */}
            {trainingMemberModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => setTrainingMemberModal(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-purple-50/50">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-purple-700 font-mono">
                                    Training Management &bull; {trainingMemberModal.rank_tier} Curriculum
                                </span>
                                <h3 className="text-base font-bold text-slate-900 uppercase font-mono">
                                    Trainings for {trainingMemberModal.full_name} ({trainingMemberModal.member_id})
                                </h3>
                            </div>
                            <button
                                onClick={() => setTrainingMemberModal(null)}
                                className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs">
                                <div>
                                    <div className="font-bold text-slate-900">
                                        Progress: {trainingMemberModal.training_stats?.completed || 0}/{trainingMemberModal.training_stats?.total || 5} Completed
                                    </div>
                                    <div className="text-[11px] text-purple-800 mt-0.5">
                                        Directly approve or grant training credits to fast-track or accredit member seminars.
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => openCreateTraining(trainingMemberModal)}
                                        className="px-3 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-[11px] uppercase tracking-wider shadow-xs border-0 cursor-pointer flex items-center gap-1.5 shrink-0"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Custom Module
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleGrantAllMemberTrainings(trainingMemberModal)}
                                        className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] uppercase tracking-wider shadow-xs border-0 cursor-pointer flex items-center gap-1.5 shrink-0"
                                    >
                                        <Award className="w-3.5 h-3.5" /> Grant All Modules
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openUploadCertificateModal(trainingMemberModal)}
                                        className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] uppercase tracking-wider shadow-xs border-0 cursor-pointer flex items-center gap-1.5 shrink-0"
                                        title="Upload and confer custom certificate for this member"
                                    >
                                        <Upload className="w-3.5 h-3.5" /> Issue Custom Certificate
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {trainingMemberModal.training_stats?.items?.map((t) => (
                                    <div
                                        key={t.id}
                                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                            t.status === 'approved'
                                                ? 'bg-emerald-50/60 border-emerald-200'
                                                : t.status === 'submitted'
                                                    ? 'bg-amber-50/60 border-amber-200'
                                                    : 'bg-white border-slate-200'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center">
                                                    #{t.order}
                                                </span>
                                                <span className="font-bold text-slate-900 text-xs">{t.title_en}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 italic">{t.title_tl}</div>
                                            {t.reviewed_by && (
                                                <div className="text-[10px] text-emerald-700 font-mono font-bold">
                                                    ✓ Approved by {t.reviewed_by} ({t.reviewed_at})
                                                </div>
                                            )}
                                        </div>

                                        <div className="shrink-0 flex items-center gap-2">
                                            {t.status === 'approved' ? (
                                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                                                    ✓ Approved
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleGrantTraining(trainingMemberModal, t)}
                                                    className="px-3 py-1.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider shadow-xs border-0 cursor-pointer flex items-center gap-1"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                    <span>Grant &amp; Approve</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
                            <button
                                type="button"
                                onClick={() => setTrainingMemberModal(null)}
                                className="px-5 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold uppercase cursor-pointer border-0"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ============================================================== */}
            {/* MODAL: CREATE / EDIT TIER COMMANDMENT */}
            {/* ============================================================== */}
            {showCreateCommandment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => {
                        if (!commandmentForm.processing) {
                            setShowCreateCommandment(false);
                            setEditingCommandment(null);
                        }
                    }}
                >
                    <div
                        className="bg-white rounded-3xl max-w-xl w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-3">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono">
                                    Tier Commandments Management
                                </span>
                                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                    {editingCommandment ? 'Edit Commandment' : 'Add New Commandment'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateCommandment(false);
                                    setEditingCommandment(null);
                                }}
                                aria-label="Close commandment modal"
                                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 bg-transparent cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {Object.keys(commandmentForm.errors).length > 0 && (
                            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs">
                                {Object.values(commandmentForm.errors).join(' ')}
                            </div>
                        )}

                        <form onSubmit={handleCommandmentSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Target Rank / Level *
                                    </label>
                                    <select
                                        value={commandmentForm.data.rank_tier}
                                        onChange={(e) => {
                                            const nextTier = e.target.value;
                                            commandmentForm.setData({
                                                ...commandmentForm.data,
                                                rank_tier: nextTier,
                                                order: editingCommandment ? commandmentForm.data.order : getNextCommandmentOrder(nextTier),
                                            });
                                        }}
                                        className="w-full bg-slate-50 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none"
                                    >
                                        <option value="Rookie">Rookie (★)</option>
                                        <option value="Elite">Elite (★★)</option>
                                        <option value="Master">Master (★★★)</option>
                                        <option value="Grand Master">Grand Master (★★★★)</option>
                                        <option value="Legend">Legend (★★★★★)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Display Order #
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="999"
                                        value={commandmentForm.data.order}
                                        onChange={(e) => commandmentForm.setData('order', Number(e.target.value) || 1)}
                                        className="w-full bg-slate-50 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                    Commandment Title (English) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={commandmentForm.data.title_en}
                                    onChange={(e) => commandmentForm.setData('title_en', e.target.value)}
                                    placeholder="e.g. Show Up, Every Time"
                                    className="w-full bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                    Description / Guidance (English)
                                </label>
                                <textarea
                                    rows="3"
                                    value={commandmentForm.data.description_en}
                                    onChange={(e) => commandmentForm.setData('description_en', e.target.value)}
                                    placeholder="Explain what this commandment expects from members at this rank..."
                                    className="w-full bg-slate-50 rounded-xl p-3 text-xs text-slate-900 outline-none resize-y"
                                />
                            </div>

                            <div className="p-3.5 rounded-2xl bg-slate-50/80 space-y-3">
                                <div className="text-[11px] font-bold text-slate-500">
                                    Filipino Translation <span className="font-normal text-slate-400">(Optional — uses English if left blank)</span>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Commandment Title (Filipino)
                                    </label>
                                    <input
                                        type="text"
                                        value={commandmentForm.data.title_tl}
                                        onChange={(e) => commandmentForm.setData('title_tl', e.target.value)}
                                        placeholder="e.g. Dumalo Palagi"
                                        className="w-full bg-white rounded-xl px-3 py-2 text-xs text-slate-900 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Description / Guidance (Filipino)
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={commandmentForm.data.description_tl}
                                        onChange={(e) => commandmentForm.setData('description_tl', e.target.value)}
                                        placeholder="Optional Filipino description..."
                                        className="w-full bg-white rounded-xl p-3 text-xs text-slate-900 outline-none resize-y"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(commandmentForm.data.is_active)}
                                    onChange={(e) => commandmentForm.setData('is_active', e.target.checked)}
                                    className="rounded text-[#0f766e]"
                                />
                                <span>Active (Visible immediately in the Legacy Member Portal)</span>
                            </label>

                            <div className="pt-2 flex justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateCommandment(false);
                                        setEditingCommandment(null);
                                    }}
                                    disabled={commandmentForm.processing}
                                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={commandmentForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer disabled:opacity-50"
                                >
                                    {commandmentForm.processing
                                        ? 'Saving...'
                                        : editingCommandment
                                            ? 'Save Changes'
                                            : 'Add Commandment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: UPLOAD CUSTOM CERTIFICATE */}
            {/* ============================================================== */}
            {uploadCertificateModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => { if (!certificateUploadForm.processing) setUploadCertificateModal(null); }}
                >
                    <div
                        className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[90dvh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-amber-700 font-mono">
                                    Certificate Management
                                </span>
                                <h3 className="text-base font-bold text-slate-900 uppercase font-mono">
                                    Issue Custom Certificate
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setUploadCertificateModal(null)}
                                className="text-slate-400 hover:text-slate-700 border-0 bg-transparent cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {Object.keys(certificateUploadForm.errors).length > 0 && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                                {Object.values(certificateUploadForm.errors).join(' ')}
                            </div>
                        )}

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                            <div className="font-bold text-slate-900">
                                Recipient: {uploadCertificateModal.full_name || uploadCertificateModal.member_name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                Member ID: {uploadCertificateModal.member_id || uploadCertificateModal.member_code} &bull; Tier: {uploadCertificateModal.rank_tier}
                            </div>
                        </div>

                        <form onSubmit={handleCertificateUploadSubmit} className="space-y-4 pt-1">
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Rank Tier *</label>
                                <select
                                    value={certificateUploadForm.data.rank_tier}
                                    onChange={(e) => certificateUploadForm.setData('rank_tier', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                                    required
                                >
                                    <option value="Rookie">Rookie (★)</option>
                                    <option value="Elite">Elite (★★)</option>
                                    <option value="Master">Master (★★★)</option>
                                    <option value="Grand Master">Grand Master (★★★★)</option>
                                    <option value="Legend">Legend (★★★★★)</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">
                                    Select Edited Certificate File * (PDF, PNG, JPG, JPEG)
                                </label>
                                <div className="portal-dropzone p-4 rounded-2xl bg-slate-50 text-center space-y-2">
                                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                                    <input
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg,.webp"
                                        onChange={(e) => certificateUploadForm.setData('certificate_file', e.target.files[0] || null)}
                                        className="w-full text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0f766e] file:text-white file:cursor-pointer"
                                        required
                                    />
                                    {certificateUploadForm.data.certificate_file && (
                                        <div className="text-xs font-bold text-[#0f766e]">
                                            Selected: {certificateUploadForm.data.certificate_file.name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Once uploaded, this certificate will be immediately saved to the member's profile for instant download and an email will be automatically sent to the member with the certificate attached.
                            </p>

                            <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setUploadCertificateModal(null)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border-0 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={certificateUploadForm.processing || !certificateUploadForm.data.certificate_file}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm border-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>{certificateUploadForm.processing ? 'Uploading & Sending...' : 'Upload, Confer & Email'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
