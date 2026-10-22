import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    CheckCircle,
    XCircle,
    FileText,
    Download,
    Eye,
    Trash2,
    X,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorldPlanRegistrations({ registrations = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [proofModalItem, setProofModalItem] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/world-plan', { search, status }, { preserveState: true, replace: true });
    };

    const updateStatus = (id, newStatus, name) => {
        if (confirm(`Set application for "${name}" to ${newStatus}? A queued notification email will be dispatched.`)) {
            router.patch(`/admin/world-plan/${id}/status`, { status: newStatus }, { preserveScroll: true });
        }
    };

    const handleDelete = (id, name) => {
        if (confirm(`Permanently remove world plan application for "${name}"?`)) {
            router.delete(`/admin/world-plan/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="World Plan Registrations & Payment Proof Verification">
            <Head title="World Plan Registrations | INFINITE Admin" />

            <div className="space-y-6">
                {/* Search & Filter Header */}
                <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="w-full sm:w-96 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search username, applicant, package..."
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
                                router.get('/admin/world-plan', { search, status: '' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                !status ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            All ({registrations.total || 0})
                        </button>
                        <button
                            onClick={() => {
                                setStatus('Pending');
                                router.get('/admin/world-plan', { search, status: 'Pending' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                status === 'Pending' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => {
                                setStatus('Approved');
                                router.get('/admin/world-plan', { search, status: 'Approved' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => {
                                setStatus('Rejected');
                                router.get('/admin/world-plan', { search, status: 'Rejected' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                                status === 'Rejected' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Rejected
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6">Applicant</th>
                                    <th className="py-4 px-6">Package</th>
                                    <th className="py-4 px-6">Payment Proof</th>
                                    <th className="py-4 px-6">Contact & Shipping</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Review Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300">
                                {registrations.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-slate-500">
                                            No world plan applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    registrations.data.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-white text-sm">
                                                    {reg.full_name || `${reg.first_name} ${reg.last_name}`}
                                                </div>
                                                <span className="text-ch-teal block text-[11px]">@{reg.username}</span>
                                                <span className="text-slate-500 text-[10px]">{reg.email}</span>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-white/5 font-bold text-slate-200">
                                                    {reg.package_type}
                                                </span>
                                                <span className="text-[10px] text-slate-500 block mt-1">Paid: {reg.payment_date}</span>
                                            </td>

                                            <td className="py-4 px-6">
                                                {reg.payment_proof ? (
                                                    <button
                                                        onClick={() => setProofModalItem(reg)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-ch-teal/10 border border-white/10 text-ch-teal text-xs font-semibold transition-colors"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span>View Receipt</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-slate-600 italic">No receipt attached</span>
                                                )}
                                            </td>

                                            <td className="py-4 px-6 max-w-xs">
                                                <div className="text-white font-medium">{reg.contact_no}</div>
                                                <div className="text-slate-400 line-clamp-1">{reg.address}</div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    reg.status === 'Approved'
                                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                        : reg.status === 'Rejected'
                                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                }`}>
                                                    {reg.status}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {reg.status !== 'Approved' && (
                                                        <button
                                                            onClick={() => updateStatus(reg.id, 'Approved', reg.full_name || reg.username)}
                                                            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-400 hover:text-white transition-colors"
                                                            title="Approve Member Application"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {reg.status !== 'Rejected' && (
                                                        <button
                                                            onClick={() => updateStatus(reg.id, 'Rejected', reg.full_name || reg.username)}
                                                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 hover:text-white transition-colors"
                                                            title="Reject Member Application"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(reg.id, reg.full_name || reg.username)}
                                                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition-colors"
                                                        title="Delete Application"
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
                    {registrations.links?.length > 3 && (
                        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                            <div>
                                Showing {registrations.from} to {registrations.to} of {registrations.total} applications
                            </div>
                            <div className="flex gap-1">
                                {registrations.links.map((link, i) => (
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

            {/* PAYMENT PROOF MODAL */}
            <AnimatePresence>
                {proofModalItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setProofModalItem(null)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative z-10 w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
                                <div>
                                    <span className="text-xs uppercase font-bold text-ch-teal">PAYMENT PROOF VERIFICATION</span>
                                    <h3 className="font-bebas text-2xl text-white">
                                        {proofModalItem.full_name || proofModalItem.username} ({proofModalItem.package_type})
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setProofModalItem(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[300px] max-h-[70vh] overflow-y-auto">
                                {proofModalItem.payment_proof.endsWith('.pdf') ? (
                                    <div className="text-center p-8">
                                        <FileText className="w-16 h-16 text-ch-teal mx-auto mb-3" />
                                        <p className="text-sm text-slate-300">PDF Document Proof of Payment</p>
                                        <a
                                            href={`/storage/payment_proofs/${proofModalItem.payment_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Open PDF Receipt</span>
                                        </a>
                                    </div>
                                ) : (
                                    <img
                                        src={`/storage/payment_proofs/${proofModalItem.payment_proof}`}
                                        alt="Payment Proof Receipt"
                                        className="max-h-[60vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
                                        onError={(e) => {
                                            e.target.src = '/assets/image/proof1.jpg';
                                        }}
                                    />
                                )}
                            </div>

                            <div className="px-6 py-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between">
                                <a
                                    href={`/storage/payment_proofs/${proofModalItem.payment_proof}`}
                                    download
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download File</span>
                                </a>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            updateStatus(proofModalItem.id, 'Approved', proofModalItem.full_name);
                                            setProofModalItem(null);
                                        }}
                                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => setProofModalItem(null)}
                                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
