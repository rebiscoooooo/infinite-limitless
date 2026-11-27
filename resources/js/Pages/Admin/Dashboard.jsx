import React, { useState } from 'react';
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
    Mail,
    Send,
    Radio,
    Check,
    Loader2,
    Calendar,
    X,
} from 'lucide-react';

export default function Dashboard({
    metrics = {},
    products = [],
    recentInquiries = [],
    recentLogs = [],
    recentRegistrations = [],
    marketingStats = {},
}) {
    const { auth } = usePage().props || {};
    const adminUser = auth?.admin?.username || 'Administrator';

    // On-demand Marketing Dispatch Modal
    const [showMarketingModal, setShowMarketingModal] = useState(false);
    const [testEmailInput, setTestEmailInput] = useState('');
    const [isDispatching, setIsDispatching] = useState(false);

    const handleMarketingSubmit = (e) => {
        e.preventDefault();
        setIsDispatching(true);
        router.post('/admin/marketing/dispatch-daily', {
            test_email: testEmailInput.trim(),
        }, {
            preserveScroll: true,
            onFinish: () => {
                setIsDispatching(false);
                setShowMarketingModal(false);
                setTestEmailInput('');
            },
        });
    };

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
                {/* HERO WELCOME BANNER (Clean Light Institutional Card) */}
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 xl:p-8 bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-5 sm:gap-6">
                        <div className="space-y-2 min-w-0">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-xs font-semibold">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                <span>Infinite Global Executive Portal</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Welcome back, <span className="text-[#0f766e]">{adminUser}</span>!
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                                System operational. You have <strong className="text-amber-600 font-semibold">{metrics.unread_inquiries || 0} unread customer inquiries</strong> and <strong className="text-[#0f766e] font-semibold">{metrics.pending_world_plan || recentRegistrations.length || 0} pending World Plan registrations</strong> requiring verification.
                            </p>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full xl:w-auto">
                            <Link
                                href="/admin/products"
                                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all no-underline cursor-pointer"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span>Add Product</span>
                            </Link>

                            <Link
                                href="/admin/world-plan"
                                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-all no-underline shadow-xs"
                            >
                                <Globe className="w-4 h-4 text-[#0f766e]" />
                                <span>Review World Plan</span>
                            </Link>

                            <Link
                                href="/admin/inquiries"
                                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-all no-underline shadow-xs"
                            >
                                <Inbox className="w-4 h-4 text-[#0f766e]" />
                                <span>Inquiries</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4 HIGH-IMPACT KPI STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* KPI 1: Inquiries */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-teal-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono truncate">
                                Customer Inquiries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                <Inbox className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                                {metrics.total_inquiries || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                {metrics.unread_inquiries || 0} Unread
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-500 text-[11px] truncate">Direct Support Messages</span>
                            <Link href="/admin/inquiries" className="text-[#0f766e] hover:text-[#115e59] font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Manage</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 2: World Plan */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-amber-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#f59e0b,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-mono truncate">
                                World Plan Registrations
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
                                <Globe className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-600 font-mono tracking-tight">
                                {recentRegistrations.length || metrics.pending_world_plan || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                {metrics.approved_world_plan || 0} Approved
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-500 text-[11px] truncate">Payment Proof Pipeline</span>
                            <Link href="/admin/world-plan" className="text-[#0f766e] hover:text-[#115e59] font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Review</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 3: Products Catalog */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-purple-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#a855f7,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider font-mono truncate">
                                Active Catalog Products
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs shrink-0">
                                <Package className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                                {products.length || 18}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                                Live on Store
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-500 text-[11px] truncate">Barley &amp; Skincare</span>
                            <Link href="/admin/products" className="text-purple-700 hover:text-purple-800 font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Catalog</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 4: Platform Traffic & Activity */}
                    <div className="rounded-2xl p-5 xl:p-6 bg-white border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-emerald-400/80 transition-all duration-300 shadow-[inset_4px_0_0_#10b981,0_2px_12px_rgba(15,23,42,0.045)]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono truncate">
                                Global Traffic &amp; Reach
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-emerald-600 font-mono tracking-tight">
                                {metrics.total_visits || '12,540'}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                11 Countries
                            </span>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-500 text-[11px] truncate">System Activity History</span>
                            <Link href="/admin/activity-logs" className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 no-underline group-hover:translate-x-0.5 transition-transform shrink-0">
                                <span>Audit Trail</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* AUTOMATED DAILY EMAIL MARKETING BANNER CARD */}
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                <Mail className="w-5 h-5 stroke-[2.2]" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0">
                                        Automated Email Marketing Campaign
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Every Morning at 8:00 AM PHT</span>
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                    Dispatches daily rotating product spotlight to all World Plan registrants and Inquiries (Admin accounts strictly excluded).
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() => setShowMarketingModal(true)}
                                className="px-4 py-2 sm:py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer border-0"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Run Marketing Dispatch</span>
                            </button>
                        </div>
                    </div>

                    {/* Marketing Audience KPI Grid */}
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">
                                World Plan Audience
                            </span>
                            <span className="text-lg sm:text-xl font-mono font-bold text-slate-900 block">
                                {marketingStats.world_plan_count || 0}
                            </span>
                            <span className="text-[10px] text-[#0f766e] font-semibold">Registered Clients</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">
                                Customer Inquiries
                            </span>
                            <span className="text-lg sm:text-xl font-mono font-bold text-slate-900 block">
                                {marketingStats.inquiries_count || 0}
                            </span>
                            <span className="text-[10px] text-[#0f766e] font-semibold">Contact Submissions</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">
                                Total Verified Reach
                            </span>
                            <span className="text-lg sm:text-xl font-mono font-bold text-emerald-700 block">
                                {marketingStats.eligible_count || 0}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">Distinct Recipients</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-amber-200">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block mb-0.5 flex items-center gap-1">
                                <Shield className="w-3 h-3" /> Admin Exclusion
                            </span>
                            <span className="text-lg sm:text-xl font-mono font-bold text-amber-600 block">
                                0 Sent to Admins
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                                {marketingStats.admin_excluded_count || 0} accounts protected
                            </span>
                        </div>
                    </div>

                    {marketingStats.last_product_name && (
                        <div className="relative z-10 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-2">
                            <span>
                                Last Campaign: <strong className="text-slate-900">{marketingStats.last_product_name}</strong> on <strong className="text-slate-700">{marketingStats.last_sent_date}</strong>
                            </span>
                            <span className="text-[#0f766e] font-mono font-semibold">
                                ({marketingStats.last_recipients_count || 0} emails queued)
                            </span>
                        </div>
                    )}
                </div>

                {/* TWO-COLUMN OPERATIONAL DASHBOARD */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
                    {/* Left Column: Recent Inquiries & World Plan Applications */}
                    <div className="xl:col-span-7 space-y-6 sm:space-y-8 min-w-0">
                        {/* 1. Recent Inquiries Card */}
                        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 mb-0 flex items-center gap-2">
                                        <Inbox className="w-4 h-4 text-[#0f766e]" />
                                        <span>Recent Customer Inquiries</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Latest messages received through the public contact forms
                                    </p>
                                </div>
                                <Link
                                    href="/admin/inquiries"
                                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0f766e] text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-slate-200"
                                >
                                    <span>View All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentInquiries.length === 0 ? (
                                    <div className="py-10 text-center text-slate-400 text-xs">
                                        <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <span>No customer inquiries received yet.</span>
                                    </div>
                                ) : (
                                    recentInquiries.slice(0, 5).map((inq) => (
                                        <div
                                            key={inq.id}
                                            className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                                inq.is_read
                                                    ? 'bg-slate-50/80 border-slate-200'
                                                    : 'bg-teal-50/40 border-teal-200 shadow-xs'
                                            }`}
                                        >
                                            <div className="space-y-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                                                        {inq.name}
                                                    </span>
                                                    {!inq.is_read ? (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-[#0f766e] border border-teal-300">
                                                            NEW
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                                                            Read
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-xs text-slate-600 flex items-center gap-2 truncate">
                                                    <span className="text-[#0f766e] font-mono truncate">{inq.email}</span>
                                                    <span>&bull;</span>
                                                    <span className="text-slate-800 font-medium truncate">
                                                        {inq.subject || 'General Inquiry'}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-500 italic line-clamp-1 mb-0">
                                                    "{inq.message}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                                <button
                                                    onClick={() => toggleInquiryRead(inq.id)}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                                                    title={inq.is_read ? 'Mark Unread' : 'Mark Read'}
                                                >
                                                    <CheckCircle2
                                                        className={`w-4 h-4 ${inq.is_read ? 'text-[#0f766e]' : 'text-slate-300'}`}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => deleteInquiry(inq.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
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
                        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 mb-0 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-[#0f766e]" />
                                        <span>World Plan Onboarding Applications</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Submissions awaiting bank receipt / payment proof verification
                                    </p>
                                </div>
                                <Link
                                    href="/admin/world-plan"
                                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0f766e] text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-slate-200"
                                >
                                    <span>Review All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentRegistrations.length === 0 ? (
                                    <div className="py-10 text-center text-slate-400 text-xs">
                                        <Globe className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <span>No World Plan registrations currently pending.</span>
                                    </div>
                                ) : (
                                    recentRegistrations.slice(0, 5).map((reg) => {
                                        const statusColor =
                                            reg.status === 'Approved'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : reg.status === 'Rejected'
                                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                : 'bg-amber-50 text-amber-700 border-amber-200';

                                        return (
                                            <div
                                                key={reg.id}
                                                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-teal-300 transition-colors"
                                            >
                                                <div className="space-y-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                                                            {reg.first_name} {reg.last_name}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                                                            {reg.status || 'Pending'}
                                                        </span>
                                                    </div>

                                                    <div className="text-xs text-slate-600 flex items-center gap-2">
                                                        <span className="text-slate-900 font-medium">{reg.package_type || 'World Plan Package'}</span>
                                                        <span>&bull;</span>
                                                        <span>{reg.country || 'Global Partner'}</span>
                                                    </div>

                                                    <div className="text-[11px] text-slate-500 font-mono truncate">
                                                        {reg.email}
                                                    </div>
                                                </div>

                                                <Link
                                                    href="/admin/world-plan"
                                                    className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[#0f766e] text-xs font-semibold self-end sm:self-center no-underline transition-all flex items-center gap-1 shrink-0"
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
                        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 mb-0 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-[#0f766e]" />
                                        <span>Product Catalog Showcase</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Items displayed on public landing page
                                    </p>
                                </div>
                                <Link
                                    href="/admin/products"
                                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0f766e] text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-slate-200"
                                >
                                    <span>Manage</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {products.slice(0, 4).map((p, idx) => (
                                    <div
                                        key={p.id || idx}
                                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:border-teal-300 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white p-1.5 border border-slate-200 shadow-xs shrink-0 flex items-center justify-center">
                                            <img
                                                src={p.image_url || p.image || '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png'}
                                                alt={p.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="font-bold text-xs text-slate-900 block truncate">
                                                {p.name}
                                            </span>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] uppercase font-bold text-[#0f766e] tracking-wider">
                                                    {p.category}
                                                </span>
                                                {p.price > 0 && (
                                                    <span className="text-[11px] font-mono font-bold text-slate-600">
                                                        ${Number(p.price).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                            Active
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Recent Security Audit Log */}
                        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 mb-0 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        <span>Security &amp; Audit Logs</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Recent administrator actions &amp; IP locations
                                    </p>
                                </div>
                                <Link
                                    href="/admin/activity-logs"
                                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all no-underline border border-slate-200"
                                >
                                    <span>All Logs</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-2.5">
                                {recentLogs.length === 0 ? (
                                    <div className="py-8 text-center text-slate-400 text-xs">
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
                                                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <DeviceIcon className="w-4 h-4 text-slate-400 shrink-0" />
                                                    <div className="min-w-0">
                                                        <span className="font-bold text-slate-900 block truncate text-[11px]">
                                                            {log.admin_user}: {log.action_type}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-mono block">
                                                            {log.ip_address}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="text-[10px] text-slate-500 shrink-0 font-mono">
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

            {/* MANUAL MARKETING DISPATCH MODAL */}
            {showMarketingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-4 text-left">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                    <Send className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0 leading-tight">
                                        Run Daily Email Marketing
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Manual dispatch or targeted test delivery
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => !isDispatching && setShowMarketingModal(false)}
                                disabled={isDispatching}
                                className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-xl border border-slate-200 cursor-pointer disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Campaign Rules & Target Overview */}
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 font-semibold">Standard Schedule:</span>
                                <span className="font-mono text-[#0f766e] font-bold">Every Morning at 8:00 AM PHT</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 font-semibold">Target Audience:</span>
                                <span className="text-slate-900 font-medium">World Plan Registrations + Inquiries</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 font-semibold">Admin Account Protection:</span>
                                <span className="text-amber-700 font-bold flex items-center gap-1">
                                    <Shield className="w-3.5 h-3.5" /> Strictly Excluded (0 to Admins)
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                                <span className="text-slate-500">Total Live Recipients:</span>
                                <span className="text-emerald-700 font-bold font-mono">{marketingStats.eligible_count || 0} distinct emails</span>
                            </div>
                        </div>

                        <form onSubmit={handleMarketingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Optional Test Recipient Email
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={testEmailInput}
                                        onChange={(e) => setTestEmailInput(e.target.value)}
                                        placeholder="Leave blank to send to all eligible World Plan + Inquiries"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 transition-all"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1 mb-0">
                                    {testEmailInput.trim()
                                        ? `TEST MODE: Email will ONLY be sent to ${testEmailInput.trim()}`
                                        : `BROADCAST MODE: Will queue daily spotlight to all ${marketingStats.eligible_count || 0} eligible clients.`}
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setShowMarketingModal(false)}
                                    disabled={isDispatching}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-300 cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isDispatching}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border-0 shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isDispatching ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Queuing Marketing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{testEmailInput.trim() ? 'Send Test Email' : 'Dispatch to All Recipients'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
