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

            <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
                {/* HERO WELCOME BANNER */}
                <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-ch-teal/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
                                <Sparkles className="w-3.5 h-3.5 text-ch-teal" />
                                <span>Infinite Global Executive Portal</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">{adminUser}</span>!
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                                System operational. You have <strong className="text-amber-400 font-semibold">{metrics.unread_inquiries || 0} unread customer inquiries</strong> and <strong className="text-sky-400 font-semibold">{metrics.pending_world_plan || recentRegistrations.length || 0} pending World Plan registrations</strong> requiring verification.
                            </p>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
                            <Link
                                href="/admin/products"
                                className="px-4 py-2.5 rounded-xl bg-ch-teal hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all text-decoration-none"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Product</span>
                            </Link>

                            <Link
                                href="/admin/world-plan"
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-all text-decoration-none shadow-sm"
                            >
                                <Globe className="w-4 h-4 text-sky-400" />
                                <span>Review World Plan</span>
                            </Link>

                            <Link
                                href="/admin/inquiries"
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-all text-decoration-none shadow-sm"
                            >
                                <Inbox className="w-4 h-4 text-teal-400" />
                                <span>Inquiries</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4 HIGH-IMPACT KPI STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* KPI 1: Inquiries */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-teal-500/50 hover:shadow-teal-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-teal-400 before:to-emerald-400">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Customer Inquiries
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Inbox className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {metrics.total_inquiries || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                {metrics.unread_inquiries || 0} Unread
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Direct Support Messages</span>
                            <Link href="/admin/inquiries" className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 text-decoration-none group-hover:translate-x-0.5 transition-transform">
                                <span>Manage</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 2: World Plan */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-sky-500/50 hover:shadow-sky-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-sky-400 before:to-blue-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                World Plan Registrations
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Globe className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {recentRegistrations.length || metrics.pending_world_plan || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                {metrics.approved_world_plan || 0} Approved
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Payment Proof Pipeline</span>
                            <Link href="/admin/world-plan" className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 text-decoration-none group-hover:translate-x-0.5 transition-transform">
                                <span>Review</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 3: Products Catalog */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Active Catalog Products
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Package className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {products.length || 18}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                Live on Store
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">Barley, O'Lamour &amp; Skincare</span>
                            <Link href="/admin/products" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 text-decoration-none group-hover:translate-x-0.5 transition-transform">
                                <span>Catalog</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* KPI 4: Platform Traffic & Activity */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Global Community &amp; Traffic
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-baseline justify-between">
                            <div className="font-bebas text-4xl text-white tracking-wide">
                                {metrics.total_visits || '12,540'}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                11 Countries
                            </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[11px]">System Activity History</span>
                            <Link href="/admin/activity-logs" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-decoration-none group-hover:translate-x-0.5 transition-transform">
                                <span>Audit Trail</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* TWO-COLUMN OPERATIONAL DASHBOARD */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Recent Inquiries & World Plan Applications */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* 1. Recent Inquiries Card */}
                        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <Inbox className="w-4 h-4 text-ch-teal" />
                                        <span>Recent Customer Inquiries</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Latest messages received through the public contact forms
                                    </p>
                                </div>
                                <Link
                                    href="/admin/inquiries"
                                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-all text-decoration-none border border-slate-700"
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
                                                    ? 'bg-slate-950/60 border-slate-800/80'
                                                    : 'bg-teal-950/20 border-teal-500/30 shadow-sm'
                                            }`}
                                        >
                                            <div className="space-y-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-xs sm:text-sm text-white">
                                                        {inq.name}
                                                    </span>
                                                    {!inq.is_read ? (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                            NEW
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400">
                                                            Read
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-xs text-slate-400 flex items-center gap-2 truncate">
                                                    <span className="text-ch-teal font-mono">{inq.email}</span>
                                                    <span>•</span>
                                                    <span className="text-slate-300 font-medium truncate">
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
                                                    className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border-0 cursor-pointer"
                                                    title={inq.is_read ? 'Mark Unread' : 'Mark Read'}
                                                >
                                                    <CheckCircle2
                                                        className={`w-4 h-4 ${inq.is_read ? 'text-ch-teal' : 'text-slate-500'}`}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => deleteInquiry(inq.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-rose-950/40 transition-colors border-0 cursor-pointer"
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
                        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-sky-400" />
                                        <span>World Plan Onboarding Applications</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Submissions awaiting bank receipt / payment proof verification
                                    </p>
                                </div>
                                <Link
                                    href="/admin/world-plan"
                                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-all text-decoration-none border border-slate-700"
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
                                                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
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

                                                    <div className="text-xs text-slate-400 flex items-center gap-2">
                                                        <span className="text-slate-300 font-medium">{reg.package_type || 'World Plan Package'}</span>
                                                        <span>•</span>
                                                        <span>{reg.country || 'Global Partner'}</span>
                                                    </div>

                                                    <div className="text-[11px] text-slate-500 font-mono">
                                                        {reg.email}
                                                    </div>
                                                </div>

                                                <Link
                                                    href="/admin/world-plan"
                                                    className="px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold self-end sm:self-center text-decoration-none transition-all flex items-center gap-1 shrink-0"
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
                    <div className="lg:col-span-5 space-y-8">
                        {/* 3. Catalog Products Highlights */}
                        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                                <div>
                                    <h3 className="text-base font-bold text-white mb-0 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-ch-teal" />
                                        <span>Product Catalog Showcase</span>
                                    </h3>
                                    <p className="text-xs text-slate-400 mb-0 mt-0.5">
                                        Items displayed on public landing page
                                    </p>
                                </div>
                                <Link
                                    href="/admin/products"
                                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-all text-decoration-none border border-slate-700"
                                >
                                    <span>Manage</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {products.slice(0, 4).map((p, idx) => (
                                    <div
                                        key={p.id || idx}
                                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 hover:border-teal-500/30 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/95 p-1.5 border border-slate-700 shadow-sm shrink-0 flex items-center justify-center">
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
                                                <span className="text-[10px] uppercase font-bold text-ch-teal tracking-wider">
                                                    {p.category}
                                                </span>
                                                {p.price > 0 && (
                                                    <span className="text-[11px] font-mono font-bold text-slate-300">
                                                        ${Number(p.price).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                            Active
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Recent Security Audit Log */}
                        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl p-5 sm:p-6">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
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
                                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all text-decoration-none border border-slate-700"
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
                                                className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <DeviceIcon className="w-4 h-4 text-slate-500 shrink-0" />
                                                    <div className="min-w-0">
                                                        <span className="font-bold text-white block truncate text-[11px]">
                                                            {log.admin_user}: {log.action_type}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500 font-mono block">
                                                            {log.ip_address}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
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
