import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    Monitor,
    Smartphone,
    Tablet,
    ShieldAlert,
    CheckCircle2,
    Shield,
} from 'lucide-react';

export default function ActivityLogs({ logs = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [device, setDevice] = useState(filters.device || '');

    const logList = logs.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/activity-logs', { search, device }, { preserveState: true, replace: true });
    };

    const getDeviceIcon = (dev) => {
        if (!dev) return Monitor;
        const d = dev.toLowerCase();
        if (d.includes('mobile') || d.includes('phone')) return Smartphone;
        if (d.includes('tablet') || d.includes('ipad')) return Tablet;
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
                            className="px-4 py-2.5 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider border-0"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                        <button
                            onClick={() => {
                                setDevice('');
                                router.get('/admin/activity-logs', { search, device: '' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                !device ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            All Devices
                        </button>
                        <button
                            onClick={() => {
                                setDevice('Desktop PC');
                                router.get('/admin/activity-logs', { search, device: 'Desktop PC' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                device === 'Desktop PC' ? 'bg-ch-teal/20 text-ch-teal' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Desktop
                        </button>
                        <button
                            onClick={() => {
                                setDevice('Mobile Phone');
                                router.get('/admin/activity-logs', { search, device: 'Mobile Phone' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                device === 'Mobile Phone' ? 'bg-ch-teal/20 text-ch-teal' : 'text-slate-400 hover:text-white bg-transparent'
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
                                {logList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-slate-500">
                                            <ShieldAlert className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                            <span>No system audit activities recorded.</span>
                                        </td>
                                    </tr>
                                ) : (
                                    logList.map((log) => {
                                        const DeviceIcon = getDeviceIcon(log.device_type);
                                        const dateStr = new Date(log.created_at).toLocaleDateString('en-PH', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });

                                        return (
                                            <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 px-6 whitespace-nowrap text-slate-400">
                                                    {dateStr}
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className="font-bold text-white text-xs">
                                                        {log.admin_user}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-ch-teal border border-teal-500/20 font-semibold inline-block">
                                                        {log.action_type}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        <DeviceIcon className="w-4 h-4 text-slate-400" />
                                                        <span>{log.device_type || 'Desktop PC'}</span>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-6 max-w-xs truncate text-slate-400">
                                                    {log.os_browser || 'Unknown Client'}
                                                </td>

                                                <td className="py-4 px-6 font-mono text-slate-400">
                                                    {log.ip_address}
                                                </td>

                                                <td className="py-4 px-6 text-right whitespace-nowrap">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                                        <span>{log.status || 'Success'}</span>
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
                    {logs.links && logs.links.length > 3 && (
                        <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between text-xs">
                            <span className="text-slate-400">
                                Showing {logs.from || 0} to {logs.to || 0} of {logs.total || 0} entries
                            </span>
                            <div className="flex gap-1">
                                {logs.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                        className={`px-3 py-1.5 rounded-lg border-0 ${
                                            link.active
                                                ? 'bg-ch-teal text-ch-dark-slate font-bold'
                                                : 'bg-white/5 text-slate-400 hover:text-white'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
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
