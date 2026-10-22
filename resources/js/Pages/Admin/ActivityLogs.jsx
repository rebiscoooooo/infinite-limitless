import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Search, Monitor, Smartphone, Tablet, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ActivityLogs({ logs = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [device, setDevice] = useState(filters.device || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/activity-logs', { search, device }, { preserveState: true, replace: true });
    };

    const getDeviceIcon = (dev) => {
        if (!dev) return Monitor;
        if (dev.includes('Mobile')) return Smartphone;
        if (dev.includes('Tablet')) return Tablet;
        return Monitor;
    };

    return (
        <AdminLayout title="Security & Activity Audit Logs">
            <Head title="Activity Audit Logs | INFINITE Admin" />

            <div className="space-y-6">
                {/* Search Bar */}
                <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="w-full sm:w-96 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search action, administrator, IP address..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-ch-teal"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2.5 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => {
                                setDevice('');
                                router.get('/admin/activity-logs', { search, device: '' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                !device ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            All Devices
                        </button>
                        <button
                            onClick={() => {
                                setDevice('Desktop PC');
                                router.get('/admin/activity-logs', { search, device: 'Desktop PC' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                device === 'Desktop PC' ? 'bg-ch-teal/20 text-ch-teal' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Desktop
                        </button>
                        <button
                            onClick={() => {
                                setDevice('Mobile Phone');
                                router.get('/admin/activity-logs', { search, device: 'Mobile Phone' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                device === 'Mobile Phone' ? 'bg-ch-teal/20 text-ch-teal' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Mobile
                        </button>
                    </div>
                </div>

                {/* Audit Table */}
                <div className="rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6">Timestamp</th>
                                    <th className="py-4 px-6">Administrator</th>
                                    <th className="py-4 px-6">Action Performed</th>
                                    <th className="py-4 px-6">Device / Hardware</th>
                                    <th className="py-4 px-6">Operating System & Browser</th>
                                    <th className="py-4 px-6">IP Address</th>
                                    <th className="py-4 px-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300">
                                {logs.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-slate-500">
                                            No audit logs found.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.data.map((log) => {
                                        const DevIcon = getDeviceIcon(log.device_type);
                                        return (
                                            <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 px-6 whitespace-nowrap text-slate-400 font-mono">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className="font-bold text-white">
                                                        {log.admin_user}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className="font-semibold text-slate-200">
                                                        {log.action_type}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <DevIcon className="w-4 h-4 text-slate-400" />
                                                        <span>{log.device_type}</span>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-6 max-w-xs truncate text-slate-400">
                                                    {log.os_browser}
                                                </td>

                                                <td className="py-4 px-6 font-mono text-ch-teal">
                                                    {log.ip_address}
                                                </td>

                                                <td className="py-4 px-6 text-right">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                        log.status === 'Success'
                                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                    }`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {logs.links?.length > 3 && (
                        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                            <div>
                                Showing {logs.from} to {logs.to} of {logs.total} audit entries
                            </div>
                            <div className="flex gap-1">
                                {logs.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                                            link.active
                                                ? 'bg-ch-teal border-ch-teal text-ch-dark-slate font-bold'
                                                : link.url
                                                ? 'border-white/10 hover:bg-white/5 text-slate-300'
                                                : 'border-transparent text-slate-600 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
