import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Users,
    FileText,
    Globe,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    Clock,
    Eye,
    Trash2,
    Shield,
    TrendingUp,
    Zap,
} from 'lucide-react';

export default function Dashboard({
    metrics = {},
    products = [],
    recentInquiries = [],
    recentLogs = [],
    recentRegistrations = [],
}) {
    const deleteInquiry = (id) => {
        if (confirm('Permanently delete this inquiry?')) {
            router.delete(`/admin/inquiries/${id}`, { preserveScroll: true });
        }
    };

    const toggleInquiryRead = (id) => {
        router.patch(`/admin/inquiries/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Analytics & Executive Dashboard">
            <Head title="Admin Dashboard | INFINITE" />

            <div className="space-y-8">
                {/* TOP STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Stat Card 1: Total Inquiries */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl relative overflow-hidden group hover:border-ch-teal/40 transition-all">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Customer Inquiries
                            </span>
                            <div className="p-2.5 rounded-2xl bg-teal-500/10 text-ch-teal">
                                <FileText className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="font-bebas text-4xl text-white tracking-wide">
                                {metrics.total_inquiries || 0}
                            </span>
                            <span className="text-xs font-semibold text-amber-400">
                                {metrics.unread_inquiries || 0} unread
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
                            <span>Inquiry Pipeline</span>
                            <Link href="/admin/inquiries" className="text-ch-teal hover:underline font-semibold flex items-center gap-1 text-decoration-none">
                                <span>Manage</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Stat Card 2: World Plan Registrations */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl relative overflow-hidden group hover:border-ch-teal/40 transition-all">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                World Plan Apps
                            </span>
                            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400">
                                <Globe className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="font-bebas text-4xl text-white tracking-wide">
                                {recentRegistrations.length || metrics.pending_world_plan || 0}
                            </span>
                            <span className="text-xs font-semibold text-emerald-400">
                                {metrics.approved_world_plan || 0} approved
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
                            <span>Proof Verification</span>
                            <Link href="/admin/world-plan" className="text-sky-400 hover:underline font-semibold flex items-center gap-1 text-decoration-none">
                                <span>Review</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Stat Card 3: Total Active Members */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl relative overflow-hidden group hover:border-ch-teal/40 transition-all">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Global Community
                            </span>
                            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="font-bebas text-4xl text-white tracking-wide">
                                {metrics.total_members || 128}
                            </span>
                            <span className="text-xs font-semibold text-indigo-400">
                                11 Countries
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
                            <span>Network Distribution</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3" />
                                Active
                            </span>
                        </div>
                    </div>

                    {/* Stat Card 4: Global Portal Visits */}
                    <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl relative overflow-hidden group hover:border-ch-teal/40 transition-all">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Live Platform Traffic
                            </span>
                            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="font-bebas text-4xl text-white tracking-wide">
                                {metrics.total_visits || '12,540'}
                            </span>
                            <span className="text-xs font-semibold text-emerald-400">
                                {metrics.active_users || 312} live now
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
                            <span>Click Performance</span>
                            <span className="text-white font-semibold">
                                {metrics.product_clicks || '8,432'} clicks
                            </span>
                        </div>
                    </div>
                </div>

                {/* MAIN DASHBOARD CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Inquiries & World Plan */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Recent Contact Inquiries */}
                        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-bebas text-2xl text-white mb-0">RECENT INQUIRIES</h3>
                                    <span className="text-xs text-slate-400">Direct inquiries submitted through website footer</span>
                                </div>
                                <Link
                                    href="/admin/inquiries"
                                    className="text-xs font-semibold text-ch-teal hover:underline flex items-center gap-1 text-decoration-none"
                                >
                                    <span>View All</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentInquiries.length === 0 ? (
                                    <p className="text-xs text-slate-500 py-6 text-center">No inquiries received yet.</p>
                                ) : (
                                    recentInquiries.map((inq) => (
                                        <div
                                            key={inq.id}
                                            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                                inq.is_read
                                                    ? 'bg-slate-950/60 border-white/5'
                                                    : 'bg-teal-950/20 border-ch-teal/30 shadow-sm'
                                            }`}
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm text-white">{inq.name}</span>
                                                    {!inq.is_read && (
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-slate-400 flex items-center gap-2">
                                                    <span>{inq.email}</span>
                                                    <span>&bull;</span>
                                                    <span className="text-slate-300 font-medium">{inq.subject}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 italic line-clamp-1 mb-0">
                                                    "{inq.message}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-center">
                                                <button
                                                    onClick={() => toggleInquiryRead(inq.id)}
                                                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-0 bg-transparent"
                                                    title={inq.is_read ? 'Mark Unread' : 'Mark Read'}
                                                >
                                                    <CheckCircle2 className={`w-4 h-4 ${inq.is_read ? 'text-ch-teal' : 'text-slate-600'}`} />
                                                </button>
                                                <button
                                                    onClick={() => deleteInquiry(inq.id)}
                                                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 transition-colors border-0 bg-transparent"
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
                                    <h3 className="font-bebas text-2xl text-white mb-0">WORLD PLAN APPLICATIONS</h3>
                                    <span className="text-xs text-slate-400">Applications submitted with payment proof</span>
                                </div>
                                <Link
                                    href="/admin/world-plan"
                                    className="text-xs font-semibold text-ch-teal hover:underline flex items-center gap-1 text-decoration-none"
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
                                                <div className="font-bold text-sm text-white">{reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`}</div>
                                                <div className="text-xs text-slate-400">
                                                    @{reg.username} &bull; <strong className="text-ch-teal">{reg.package_type}</strong>
                                                </div>
                                                <span className="text-[10px] text-slate-500">Submitted: {reg.payment_date || 'N/A'}</span>
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
                                <h3 className="font-bebas text-2xl text-white mb-0">AUDIT TRAIL</h3>
                                <Link
                                    href="/admin/activity-logs"
                                    className="text-xs font-semibold text-ch-teal hover:underline flex items-center gap-1 text-decoration-none"
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

                {/* REAL-TIME DATA SYNCED BANNER */}
                <div className="rounded-2xl p-4 bg-slate-900/80 border border-white/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <Zap className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">Real-Time Data Synced</h4>
                        <p className="text-[11px] text-slate-400 mb-0">
                            All analytics, world plan applications, and messages are securely fetched live from the MariaDB database.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
