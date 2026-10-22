import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    CheckCircle,
    XCircle,
    Download,
    Eye,
    Trash2,
    X,
    AlertCircle,
    FileText,
} from 'lucide-react';

export default function WorldPlanRegistrations({ registrations = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [proofModalItem, setProofModalItem] = useState(null);

    const regList = registrations.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/world-plan', { search, status }, { preserveState: true, replace: true });
    };

    const updateStatus = (id, newStatus, name) => {
        if (confirm(`Set application for "${name}" to ${newStatus}?`)) {
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
                            className="px-4 py-2.5 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider border-0"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                        <button
                            onClick={() => {
                                setStatus('');
                                router.get('/admin/world-plan', { search, status: '' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                !status ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            All ({registrations.total || regList.length})
                        </button>
                        <button
                            onClick={() => {
                                setStatus('Pending');
                                router.get('/admin/world-plan', { search, status: 'Pending' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                status === 'Pending' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => {
                                setStatus('Approved');
                                router.get('/admin/world-plan', { search, status: 'Approved' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => {
                                setStatus('Rejected');
                                router.get('/admin/world-plan', { search, status: 'Rejected' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                status === 'Rejected' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white bg-transparent'
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
                                    <th className="py-4 px-6">ID</th>
                                    <th className="py-4 px-6">Applicant Info</th>
                                    <th className="py-4 px-6">Package Type</th>
                                    <th className="py-4 px-6">Payment Proof</th>
                                    <th className="py-4 px-6">Payment Date</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300">
                                {regList.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-slate-500">
                                            <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                            <span>No applications matching criteria found.</span>
                                        </td>
                                    </tr>
                                ) : (
                                    regList.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-6 font-mono text-slate-500">#{reg.id}</td>

                                            <td className="py-4 px-6">
                                                <div className="font-bold text-white text-sm">
                                                    {reg.full_name || `${reg.first_name || ''} ${reg.last_name || ''}`.trim()}
                                                </div>
                                                <div className="text-slate-400 text-xs">
                                                    @{reg.username} &bull; {reg.email}
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-ch-teal border border-teal-500/20 font-semibold">
                                                    {reg.package_type}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6">
                                                {(reg.payment_proof_url || reg.payment_proof || reg.payment_receipt) ? (
                                                    <button
                                                        onClick={() => setProofModalItem(reg)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-ch-teal border border-white/10 transition-colors"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span>View Proof</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-slate-500 italic">No proof uploaded</span>
                                                )}
                                            </td>

                                            <td className="py-4 px-6 whitespace-nowrap text-slate-400">
                                                {reg.payment_date || 'N/A'}
                                            </td>

                                            <td className="py-4 px-6">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        reg.status === 'Approved'
                                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                            : reg.status === 'Rejected'
                                                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                    }`}
                                                >
                                                    {reg.status}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    {reg.status !== 'Approved' && (
                                                        <button
                                                            onClick={() => updateStatus(reg.id, 'Approved', reg.full_name)}
                                                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors border-0"
                                                            title="Approve Application"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {reg.status !== 'Rejected' && (
                                                        <button
                                                            onClick={() => updateStatus(reg.id, 'Rejected', reg.full_name)}
                                                            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors border-0"
                                                            title="Reject Application"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(reg.id, reg.full_name)}
                                                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border-0"
                                                        title="Delete Record"
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
                    {registrations.links && registrations.links.length > 3 && (
                        <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between text-xs">
                            <span className="text-slate-400">
                                Showing {registrations.from || 0} to {registrations.to || 0} of {registrations.total || 0} entries
                            </span>
                            <div className="flex gap-1">
                                {registrations.links.map((link, idx) => (
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

            {/* Payment Proof Modal */}
            {proofModalItem && (() => {
                const proofUrl = proofModalItem.payment_proof_url ||
                    (proofModalItem.payment_proof ? (
                        proofModalItem.payment_proof.startsWith('http') || proofModalItem.payment_proof.startsWith('/')
                            ? proofModalItem.payment_proof
                            : `/storage/payment_proofs/${proofModalItem.payment_proof}`
                    ) : (
                        proofModalItem.payment_receipt ? `/storage/${proofModalItem.payment_receipt}` : ''
                    ));
                const isPdf = proofUrl.toLowerCase().includes('.pdf');

                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                        <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-bold text-white text-base">Payment Receipt Proof</h3>
                                    <span className="text-xs text-slate-400">
                                        Applicant: {proofModalItem.full_name || proofModalItem.username}
                                    </span>
                                </div>
                                <button onClick={() => setProofModalItem(null)} className="text-slate-400 hover:text-white border-0 bg-transparent">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden">
                                {isPdf ? (
                                    <iframe
                                        src={proofUrl}
                                        className="w-full h-96 rounded-xl border-0"
                                        title="Payment Proof PDF"
                                    />
                                ) : (
                                    <img
                                        src={proofUrl}
                                        alt="Payment Receipt"
                                        className="max-h-[60vh] max-w-full object-contain rounded-xl"
                                        onError={(e) => {
                                            e.target.src = '/assets/image/testimony/100.png';
                                        }}
                                    />
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                                <a
                                    href={proofUrl}
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 hover:bg-emerald-500/30 transition-colors text-decoration-none"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download Proof</span>
                                </a>

                                <button
                                    onClick={() => setProofModalItem(null)}
                                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs border-0"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </AdminLayout>
    );
}
