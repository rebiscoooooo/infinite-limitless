import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Inbox,
    Globe,
    Users,
    Activity,
    TrendingUp,
    MousePointerClick,
    Eye,
    CheckCircle,
    Clock,
    ArrowUpRight,
    Trash2,
    Check
} from 'lucide-react';

export default function Dashboard({
    metrics = {},
    products = [],
    recentInquiries = [],
    recentLogs = [],
    recentRegistrations = [],
}) {
    const toggleInquiryRead = (id) => {
        router.patch(`/admin/inquiries/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    const deleteInquiry = (id) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(`/admin/inquiries/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="System Dashboard & Real-Time Metrics">
            <Head title="Admin Dashboard | INFINITE" />

            <div className="space-y-8">
                {/* METRICS COUNTER CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Inquiries */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
                        <div>
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Total Inquiries</span>
                            <div className="font-bebas text-4xl text-white mt-1">
                                {metrics.total_inquiries}
                            </div>
                            <span className="text-xs text-amber-400 font-medium">
                                {metrics.unread_inquiries} Unread Awaiting Reply
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                            <Inbox className="w-6 h-6" />
                        </div>
                    </div>

                    {/* World Plan Pending */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
                        <div>
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Pending Registrations</span>
                            <div className="font-bebas text-4xl text-ch-teal mt-1">
                                {metrics.pending_world_plan}
                            </div>
                            <span className="text-xs text-emerald-400 font-medium">
                                {metrics.approved_world_plan} Approved Active
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-ch-teal/15 text-ch-teal flex items-center justify-center">
                            <Globe className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Total Visits */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
                        <div>
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Platform Visits</span>
                            <div className="font-bebas text-4xl text-white mt-1">
                                {metrics.total_visits}
                            </div>
                            <span className="text-xs text-ch-teal font-medium">
                                {metrics.active_users} Live Active Now
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                            <Eye className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Product Orders & Bounce */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
                        <div>
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Product Click-Throughs</span>
                            <div className="font-bebas text-4xl text-emerald-400 mt-1">
                                {metrics.product_clicks}
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                                Bounce: {metrics.bounce_rate}
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                            <MousePointerClick className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* TWO-COLUMN LOWER SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Recent Inquiries Feed & World Plan Registrations */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Recent Inquiries */}
                        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-bebas text-2xl text-white">RECENT CUSTOMER INQUIRIES</h3>
                                    <span className="text-xs text-slate-400">Incoming inquiries from website contact forms</span>
                                </div>
                                <Link
                                    href="/admin/inquiries"
                                    className="text-xs font-semibold text-ch-teal hover:underline flex items-center gap-1"
                                >
                                    <span>View All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentInquiries.length === 0 ? (
                                    <p className="text-xs text-slate-500 py-6 text-center">No inquiries logged yet.</p>
                                ) : (
                                    recentInquiries.map((inq) => (
                                        <div
                                            key={inq.id}
                                            className={`p-4 rounded-2xl border transition-colors flex items-start justify-between gap-4 ${
                                                inq.is_read
                                                    ? 'bg-slate-950/60 border-white/5 text-slate-400'
                                                    : 'bg-slate-950 border-ch-teal/30 text-slate-200'
                                            }`}
                                        >
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm text-white truncate">{inq.name}</span>
                                                    {!inq.is_read && (
                                                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-ch-teal mt-0.5">{inq.subject}</div>
                                                <p className="text-xs text-slate-300 line-clamp-2 mt-1">{inq.message}</p>
                                                <span className="text-[10px] text-slate-500 mt-2 block">
                                                    {new Date(inq.created_at).toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    onClick={() => toggleInquiryRead(inq.id)}
                                                    className={`p-2 rounded-xl text-xs transition-colors ${
                                                        inq.is_read ? 'text-slate-500 hover:text-white' : 'text-ch-teal hover:bg-ch-teal/10'
                                                    }`}
                                                    title={inq.is_read ? 'Mark as Unread' : 'Mark as Read'}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteInquiry(inq.id)}
                                                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent World Plan Submissions */}
                        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-bebas text-2xl text-white">WORLD PLAN APPLICATIONS</h3>
                                    <span className="text-xs text-slate-400">Applications submitted with payment proof</span>
                                </div>
                                <Link
                                    href="/admin/world-plan"
                                    className="text-xs font-semibold text-ch-teal hover:underline flex items-center gap-1"
                                >
                                    <span>Review All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentRegistrations.length === 0 ? (
                                    <p className="text-xs text-slate-500 py-6 text-center">No applications pending.</p>
                                ) : (
                                    recentRegistrations.map((reg) => (
                                        <div
                                            key={reg.id}
                                            className="p-4 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between gap-4"
                                        >
                                            <div>
                                                <div className="font-bold text-sm text-white">{reg.full_name || `${reg.first_name} ${reg.last_name}`}</div>
                                                <div className="text-xs text-slate-400">
                                                    @{reg.username} &bull; <strong className="text-ch-teal">{reg.package_type}</strong>
                                                </div>
                                                <span className="text-[10px] text-slate-500">Submitted: {reg.payment_date}</span>
                                            </div>

                                            <div>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    reg.status === 'Approved'
                                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                        : reg.status === 'Rejected'
                                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                }`}>
                                                    {reg.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Stats Table & Recent Audit Logs */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Product Performance Table */}
                        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl">
                            <h3 className="font-bebas text-2xl text-white mb-4">PRODUCT POPULARITY RANKING</h3>
                            <div className="space-y-3">
                                {products.map((prod, idx) => (
                                    <div
                                        key={prod.id || idx}
                                        className="p-3 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-bebas text-lg text-ch-teal w-5">#{idx + 1}</span>
                                            <div>
                                                <span className="font-semibold text-xs text-white block">{prod.name}</span>
                                                <span className="text-[10px] text-slate-400">{prod.trend_text || 'Trending'}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold text-sm text-white">{Number(prod.clicks).toLocaleString()}</span>
                                            <span className="text-[10px] text-slate-400 block">clicks</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Audit */}
                        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                                <h3 className="font-bebas text-2xl text-white">AUDIT TRAIL</h3>
                                <Link
                                    href="/admin/activity-logs"
                                    className="text-xs font-semibold text-ch-teal hover:underline flex items-center gap-1"
                                >
                                    <span>Full Audit</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-2.5">
                                {recentLogs.map((log, i) => (
                                    <div key={log.id || i} className="text-xs p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-white block">{log.action_type}</span>
                                            <span className="text-[10px] text-slate-400">by {log.admin_user} &bull; {log.ip_address}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-500 shrink-0">
                                            {log.created_at ? new Date(log.created_at).toLocaleTimeString() : ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
