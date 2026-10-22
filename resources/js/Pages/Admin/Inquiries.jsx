import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Search, Mail, Trash2, CheckCircle2, Circle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Inquiries({ inquiries = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/inquiries', { search, status }, { preserveState: true, replace: true });
    };

    const toggleRead = (id) => {
        router.patch(`/admin/inquiries/${id}/toggle-read`, {}, { preserveScroll: true });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
            router.delete(`/admin/inquiries/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Inquiries & Customer Communications">
            <Head title="Inquiries Management | INFINITE Admin" />

            <div className="space-y-6">
                {/* Search & Filter Bar */}
                <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="w-full sm:w-96 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search sender, email, or message..."
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
                                setStatus('');
                                router.get('/admin/inquiries', { search, status: '' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                !status ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            All ({inquiries.total || 0})
                        </button>
                        <button
                            onClick={() => {
                                setStatus('unread');
                                router.get('/admin/inquiries', { search, status: 'unread' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                status === 'unread' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Unread
                        </button>
                        <button
                            onClick={() => {
                                setStatus('read');
                                router.get('/admin/inquiries', { search, status: 'read' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                status === 'read' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Read
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6">Sender Info</th>
                                    <th className="py-4 px-6">Subject</th>
                                    <th className="py-4 px-6">Message Preview</th>
                                    <th className="py-4 px-6">Date Received</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300">
                                {inquiries.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-slate-500">
                                            No inquiries found matching criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    inquiries.data.map((inq) => (
                                        <tr
                                            key={inq.id}
                                            className={`hover:bg-white/[0.02] transition-colors ${
                                                !inq.is_read ? 'bg-ch-teal/[0.03]' : ''
                                            }`}
                                        >
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => toggleRead(inq.id)}
                                                    className="flex items-center gap-1.5 focus:outline-none"
                                                    title="Click to toggle read state"
                                                >
                                                    {inq.is_read ? (
                                                        <span className="flex items-center gap-1 text-slate-500">
                                                            <CheckCircle2 className="w-4 h-4 text-slate-500" />
                                                            <span>Read</span>
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                                                            <Circle className="w-3.5 h-3.5 fill-amber-400" />
                                                            <span>Unread</span>
                                                        </span>
                                                    )}
                                                </button>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="font-bold text-white text-sm">{inq.name}</div>
                                                <a href={`mailto:${inq.email}`} className="text-ch-teal hover:underline text-[11px]">
                                                    {inq.email}
                                                </a>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-white/5 font-semibold text-slate-200">
                                                    {inq.subject}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 max-w-sm">
                                                <p className="line-clamp-2 text-slate-300">{inq.message}</p>
                                            </td>

                                            <td className="py-4 px-6 whitespace-nowrap text-slate-400">
                                                {new Date(inq.created_at).toLocaleString()}
                                            </td>

                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a
                                                        href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                                                        className="p-2 rounded-lg bg-white/5 hover:bg-ch-teal/20 text-slate-400 hover:text-ch-teal transition-colors"
                                                        title="Direct Email Reply"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(inq.id, inq.name)}
                                                        className="p-2 rounded-lg bg-white/5 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                                                        title="Delete Inquiry"
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
                    {inquiries.links?.length > 3 && (
                        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                            <div>
                                Showing {inquiries.from} to {inquiries.to} of {inquiries.total} records
                            </div>
                            <div className="flex gap-1">
                                {inquiries.links.map((link, i) => (
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
