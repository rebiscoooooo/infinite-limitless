import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Users,
    FileText,
    Globe,
    Activity,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Trash2,
    Shield,
    TrendingUp,
    Zap,
    Package,
    Inbox,
    ShieldCheck,
    Plus,
    ExternalLink,
    AlertCircle,
    Monitor,
    Smartphone,
    Tablet,
    Sparkles,
} from 'lucide-react';

export default function Dashboard({
    metrics = {},
    products = [],
    recentInquiries = [],
    recentLogs = [],
    recentRegistrations = [],
}) {
    const { auth } = usePage().props || {};
    const adminUser = auth?.admin?.username || 'Administrator';

    const deleteInquiry = (id) => {
        if (confirm('Permanently delete this inquiry from the database?')) {
            router.delete(`/admin/inquiries/${id}`, { preserveScroll: true });
        }
    };

    const toggleInquiryRead = (id) => {
        router.patch(`/admin/inquiries/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    const getDeviceIcon = (dev) => {
        if (!dev) return Monitor;
        const d = dev.toLowerCase();
        if (d.includes('mobile') || d.includes('phone')) return Smartphone;
        if (d.includes('tablet') || d.includes('ipad')) return Tablet;
        return Monitor;
    };

    return (
        <AdminLayout
            title="Analytics & Executive Overview"
            subtitle="Real-time monitoring of customer inquiries, registrations, products, and activity"
        >
            <Head title="Admin Dashboard | INFINITE" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
                {/* HERO WELCOME BANNER */}
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 xl:p-8 bg-[#061726]/90 border border-[#2c6973]/75 shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#15cbb7]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-5 sm:gap-6">
                        <div className="space-y-2 min-w-0">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24dbc3]/10 border border-[#24dbc3]/30 text-[#27dec9] text-xs font-semibold">
                                <Sparkles className="w-3.5 h-3.5 text-[#25dec0] shrink-0" />
                                <span>Infinite Global Executive Portal</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white tracking-tight">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42f1ce] via-[#24dbc3] to-[#15cbb7]">{adminUser}</span>!
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                                System operational. You have <strong className="text-amber-400 font-semibold">{metrics.unread_inquiries || 0} unread customer inquiries</strong> and <strong className="text-[#38bdf8] font-semibold">{metrics.pending_world_plan || recentRegistrations.length || 0} pending World Plan registrations</strong> requiring verification.
                            </p>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full xl:w-auto">
                            <Link
                                href="/admin/products"
                                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold text-xs flex items-center gap-2 shadow-[0_4px_20px_rgba(36,219,195,0.25)] hover:brightness-110 active:scale-[.99] transition-all no-underline cursor-pointer"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span>Add Product</span>
                            </Link>

                            <Link
                                href="/admin/world-plan"
                                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#082033] hover:bg-[#0c2638] border border-[#1e4e5b]/80 text-white font-semibold text-xs flex items-center gap-2 transition-all no-underline shadow-sm"
                            >
                                <Globe className="w-4 h-4 text-[#38bdf8]" />
                                <span>Review World Plan</span>
                            </Link>

                            <Link
                                href="/admin/inquiries"
                                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#082033] hover:bg-[#0c2638] border border-[#1e4e5b]/80 text-white font-semibold text-xs flex items-center gap-2 transition-all no-underline shadow-sm"
                            >
                                <Inbox className="w-4 h-4 text-[#25dec0]" />
                                <span>Inquiries</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4 HIGH-IMPACT KPI STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* KPI 1: Inquiries */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#24dbc3]/50 hover:shadow-[0_10px_35px_rgba(36,219,195,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#24dbc3] before:to-[#42f1ce]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Customer Inquiries
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#25dec0] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Inbox className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {metrics.total_inquiries || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                                {metrics.unread_inquiries || 0} Unread
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px] truncate">Direct Support Messages</span>
                            <Link href="/admin/inquiries" className="text-[#25dec0] hover:text-[#42f1ce] font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Manage</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 2: World Plan */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#38bdf8]/50 hover:shadow-[0_10px_35px_rgba(56,189,248,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#38bdf8] before:to-[#0284c7]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                World Plan Registrations
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Globe className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {recentRegistrations.length || metrics.pending_world_plan || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                                {metrics.approved_world_plan || 0} Approved
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px] truncate">Payment Proof Pipeline</span>
                            <Link href="/admin/world-plan" className="text-[#38bdf8] hover:text-sky-300 font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Review</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 3: Products Catalog */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#a855f7]/50 hover:shadow-[0_10px_35px_rgba(168,85,247,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#a855f7] before:to-[#6366f1]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Active Catalog Products
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Package className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {products.length || 18}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
                                Live on Store
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px] truncate">Barley &amp; Skincare</span>
                            <Link href="/admin/products" className="text-[#c084fc] hover:text-purple-300 font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Catalog</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 4: Platform Traffic & Activity */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#f59e0b]/50 hover:shadow-[0_10px_35px_rgba(245,158,11,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#f59e0b] before:to-[#10b981]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Global Community &amp; Traffic
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#f59e0b] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Activity className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {metrics.total_visits || '12,540'}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                                11 Countries
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px] truncate">System Activity History</span>
                            <Link href="/admin/activity-logs" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Audit Trail</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* TWO-COLUMN OPERATIONAL DASHBOARD */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
                    {/* Left Column: Recent Inquiries & World Plan Applications */}
                    <div className="xl:col-span-7 space-y-6 sm:space-y-8 min-w-0">
                        {/* 1. Recent Inquiries Card */}
                        <div className="rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-5 sm:p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1b5361]/60">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <Inbox className="w-4 h-4 text-[#25dec0]" />
                                        <span>Recent Customer Inquiries</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Latest messages received through the public contact forms
                                    </p>
                                </div>
                                <Link
                                    href="/admin/inquiries"
                                    className="px-3 py-1.5 rounded-xl bg-[#0c2638] hover:bg-[#12364e] text-[#27dec9] text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-[#276472]/60"
                                >
                                    <span>View All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentInquiries.length === 0 ? (
                                    <div className="py-10 text-center text-slate-500 text-xs">
                                        <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <span>No customer inquiries received yet.</span>
                                    </div>
                                ) : (
                                    recentInquiries.slice(0, 5).map((inq) => (
                                        <div
                                            key={inq.id}
                                            className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                                inq.is_read
                                                    ? 'bg-[#082033]/70 border-[#1e4e5b]/60'
                                                    : 'bg-[#092b3a]/90 border-[#24dbc3]/40 shadow-sm'
                                            }`}
                                        >
                                            <div className="space-y-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-xs sm:text-sm text-white">
                                                        {inq.name}
                                                    </span>
                                                    {!inq.is_read ? (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#24dbc3]/20 text-[#27dec9] border border-[#24dbc3]/40">
                                                            NEW
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0c2436] text-slate-400 border border-[#1e4e5b]/40">
                                                            Read
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-xs text-slate-300 flex items-center gap-2 truncate">
                                                    <span className="text-[#25dec0] font-mono truncate">{inq.email}</span>
                                                    <span>•</span>
                                                    <span className="text-slate-200 font-medium truncate">
                                                        {inq.subject || 'General Inquiry'}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-400 italic line-clamp-1 mb-0">
                                                    "{inq.message}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                                <button
                                                    onClick={() => toggleInquiryRead(inq.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-white bg-[#0c2638] hover:bg-[#12364e] border border-[#276472]/60 transition-colors cursor-pointer"
                                                    title={inq.is_read ? 'Mark Unread' : 'Mark Read'}
                                                >
                                                    <CheckCircle2
                                                        className={`w-4 h-4 ${inq.is_read ? 'text-[#25dec0]' : 'text-slate-500'}`}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => deleteInquiry(inq.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 bg-[#0c2638] hover:bg-rose-950/40 border border-[#276472]/60 transition-colors cursor-pointer"
                                                    title="Delete permanently"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* 2. Recent World Plan Registrations */}
                        <div className="rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-5 sm:p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1b5361]/60">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-[#38bdf8]" />
                                        <span>World Plan Onboarding Applications</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Submissions awaiting bank receipt / payment proof verification
                                    </p>
                                </div>
                                <Link
                                    href="/admin/world-plan"
                                    className="px-3 py-1.5 rounded-xl bg-[#0c2638] hover:bg-[#12364e] text-[#38bdf8] text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-[#276472]/60"
                                >
                                    <span>Review All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentRegistrations.length === 0 ? (
                                    <div className="py-10 text-center text-slate-500 text-xs">
                                        <Globe className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <span>No World Plan registrations currently pending.</span>
                                    </div>
                                ) : (
                                    recentRegistrations.slice(0, 5).map((reg) => {
                                        const statusColor =
                                            reg.status === 'Approved'
                                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                                : reg.status === 'Rejected'
                                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                                : 'bg-amber-500/20 text-amber-300 border-amber-500/30';

                                        return (
                                            <div
                                                key={reg.id}
                                                className="p-3.5 rounded-xl bg-[#082033]/70 border border-[#1e4e5b]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#24dbc3]/40 transition-colors"
                                            >
                                                <div className="space-y-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-xs sm:text-sm text-white">
                                                            {reg.first_name} {reg.last_name}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                                                            {reg.status || 'Pending'}
                                                        </span>
                                                    </div>

                                                    <div className="text-xs text-slate-300 flex items-center gap-2">
                                                        <span className="text-white font-medium">{reg.package_type || 'World Plan Package'}</span>
                                                        <span>•</span>
                                                        <span>{reg.country || 'Global Partner'}</span>
                                                    </div>

                                                    <div className="text-[11px] text-slate-400 font-mono truncate">
                                                        {reg.email}
                                                    </div>
                                                </div>

                                                <Link
                                                    href="/admin/world-plan"
                                                    className="px-3 py-1.5 rounded-lg bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 border border-[#24dbc3]/30 text-[#27dec9] text-xs font-semibold self-end sm:self-center no-underline transition-all flex items-center gap-1 shrink-0"
                                                >
                                                    <span>Review Proof</span>
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Catalog Highlights & Security Audit */}
                    <div className="xl:col-span-5 space-y-6 sm:space-y-8 min-w-0">
                        {/* 3. Catalog Products Highlights */}
                        <div className="rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-5 sm:p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1b5361]/60">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-[#25dec0]" />
                                        <span>Product Catalog Showcase</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Items displayed on public landing page
                                    </p>
                                </div>
                                <Link
                                    href="/admin/products"
                                    className="px-3 py-1.5 rounded-xl bg-[#0c2638] hover:bg-[#12364e] text-[#27dec9] text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-[#276472]/60"
                                >
                                    <span>Manage</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {products.slice(0, 4).map((p, idx) => (
                                    <div
                                        key={p.id || idx}
                                        className="p-3 rounded-xl bg-[#082033]/70 border border-[#1e4e5b]/60 flex items-center gap-3 hover:border-[#24dbc3]/40 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/95 p-1.5 border border-[#1e4e5b]/60 shadow-sm shrink-0 flex items-center justify-center">
                                            <img
                                                src={p.image_url || p.image || '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png'}
                                                alt={p.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="font-bold text-xs text-white block truncate">
                                                {p.name}
                                            </span>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] uppercase font-bold text-[#25dec0] tracking-wider">
                                                    {p.category}
                                                </span>
                                                {p.price > 0 && (
                                                    <span className="text-[11px] font-mono font-bold text-slate-300">
                                                        ${Number(p.price).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                                            Active
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Recent Security Audit Log */}
                        <div className="rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-5 sm:p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1b5361]/60">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>Security &amp; Audit Logs</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Recent administrator actions &amp; IP locations
                                    </p>
                                </div>
                                <Link
                                    href="/admin/activity-logs"
                                    className="px-3 py-1.5 rounded-xl bg-[#0c2638] hover:bg-[#12364e] text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-[#276472]/60"
                                >
                                    <span>All Logs</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-2.5">
                                {recentLogs.length === 0 ? (
                                    <div className="py-8 text-center text-slate-500 text-xs">
                                        No recent audit entries.
                                    </div>
                                ) : (
                                    recentLogs.slice(0, 5).map((log) => {
                                        const DeviceIcon = getDeviceIcon(log.device_type);
                                        const dateStr = new Date(log.created_at).toLocaleTimeString('en-PH', {
                                             hour: '2-digit',
                                             minute: '2-digit',
                                        });

                                        return (
                                            <div
                                                key={log.id}
                                                className="p-2.5 rounded-xl bg-[#082033]/70 border border-[#1e4e5b]/60 flex items-center justify-between text-xs"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <DeviceIcon className="w-4 h-4 text-slate-400 shrink-0" />
                                                    <div className="min-w-0">
                                                        <span className="font-bold text-white block truncate text-[11px]">
                                                            {log.admin_user}: {log.action_type}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-mono block">
                                                            {log.ip_address}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="text-[10px] text-slate-300 shrink-0 font-mono">
                                                    {dateStr}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
