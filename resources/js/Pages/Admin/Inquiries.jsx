import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Search,
    Mail,
    Trash2,
    CheckCircle2,
    Circle,
    ArrowLeft,
    ArrowRight,
    Reply,
    BookOpen,
    Send,
    X,
} from 'lucide-react';

export default function Inquiries({ inquiries = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [replyInquiry, setReplyInquiry] = useState(null);
    const [replySubject, setReplySubject] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    const inquiryList = inquiries.data || [];

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

    const openViewModal = (inq) => {
        setSelectedInquiry(inq);
        if (!inq.is_read) {
            router.patch(`/admin/inquiries/${inq.id}/toggle-read`, {}, { preserveScroll: true });
        }
    };

    const openReplyModal = (inq) => {
        setReplyInquiry(inq);
        setReplySubject(`Re: ${inq.subject}`);
        setReplyMessage('');
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyInquiry) return;
        setIsSubmittingReply(true);

        router.post(
            `/admin/inquiries/${replyInquiry.id}/reply`,
            {
                reply_subject: replySubject,
                reply_message: replyMessage,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmittingReply(false);
                    setReplyInquiry(null);
                },
                onError: () => {
                    setIsSubmittingReply(false);
                },
            }
        );
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
                            className="px-4 py-2.5 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider border-0"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                        <button
                            onClick={() => {
                                setStatus('');
                                router.get('/admin/inquiries', { search, status: '' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                !status ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            All ({inquiries.total || inquiryList.length})
                        </button>
                        <button
                            onClick={() => {
                                setStatus('unread');
                                router.get('/admin/inquiries', { search, status: 'unread' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                status === 'unread' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white bg-transparent'
                            }`}
                        >
                            Unread
                        </button>
                        <button
                            onClick={() => {
                                setStatus('read');
                                router.get('/admin/inquiries', { search, status: 'read' });
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border-0 ${
                                status === 'read' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white bg-transparent'
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
                                {inquiryList.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-slate-500">
                                            <Mail className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                            <span>No inquiries matching criteria found.</span>
                                        </td>
                                    </tr>
                                ) : (
                                    inquiryList.map((inq) => {
                                        const dateStr = new Date(inq.created_at).toLocaleDateString('en-PH', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });
                                        const snippet = inq.message && inq.message.length > 55 ? inq.message.substring(0, 55) + '...' : inq.message || '';

                                        return (
                                            <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 px-6">
                                                    {inq.is_read ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-slate-400">
                                                            <Circle className="w-2 h-2 text-slate-500 fill-slate-500" />
                                                            <span>Read</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                            <span>New</span>
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-4 px-6">
                                                    <div className="font-bold text-white text-sm">{inq.name}</div>
                                                    <div className="text-slate-400 text-xs">{inq.email}</div>
                                                </td>

                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 font-medium">
                                                        {inq.subject}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-6 max-w-xs truncate text-slate-400">
                                                    "{snippet}"
                                                </td>

                                                <td className="py-4 px-6 text-slate-400 whitespace-nowrap">
                                                    {dateStr}
                                                </td>

                                                <td className="py-4 px-6 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openViewModal(inq)}
                                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border-0"
                                                            title="Read message"
                                                        >
                                                            <BookOpen className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => openReplyModal(inq)}
                                                            className="p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-ch-teal transition-colors border-0"
                                                            title="Reply to message"
                                                        >
                                                            <Reply className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleRead(inq.id)}
                                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border-0"
                                                            title={inq.is_read ? 'Mark unread' : 'Mark read'}
                                                        >
                                                            <CheckCircle2 className={`w-3.5 h-3.5 ${inq.is_read ? 'text-ch-teal' : 'text-slate-500'}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(inq.id, inq.name)}
                                                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border-0"
                                                            title="Delete inquiry"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {inquiries.links && inquiries.links.length > 3 && (
                        <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between text-xs">
                            <span className="text-slate-400">
                                Showing {inquiries.from || 0} to {inquiries.to || 0} of {inquiries.total || 0} entries
                            </span>
                            <div className="flex gap-1">
                                {inquiries.links.map((link, idx) => (
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

            {/* Read Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <h3 className="font-bold text-white text-base">Inquiry Details</h3>
                            <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-white border-0 bg-transparent">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">From</label>
                                <div className="text-white font-bold text-base">{selectedInquiry.name}</div>
                                <a href={`mailto:${selectedInquiry.email}`} className="text-ch-teal text-xs hover:underline">
                                    {selectedInquiry.email}
                                </a>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Subject</label>
                                <div>
                                    <span className="px-2.5 py-1 rounded-lg bg-white/5 text-white text-xs font-semibold inline-block mt-1">
                                        {selectedInquiry.subject}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Message</label>
                                <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-slate-300 text-xs leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto mt-1">
                                    {selectedInquiry.message}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
                            <button
                                onClick={() => {
                                    const inq = selectedInquiry;
                                    setSelectedInquiry(null);
                                    openReplyModal(inq);
                                }}
                                className="px-4 py-2 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider border-0"
                            >
                                Reply
                            </button>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs border-0"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply Modal */}
            {replyInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <h3 className="font-bold text-white text-base flex items-center gap-2">
                                <Reply className="w-5 h-5 text-ch-teal" />
                                <span>Reply to {replyInquiry.name}</span>
                            </h3>
                            <button onClick={() => setReplyInquiry(null)} className="text-slate-400 hover:text-white border-0 bg-transparent">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSendReply} className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                                        Recipient Name
                                    </label>
                                    <input
                                        type="text"
                                        value={replyInquiry.name}
                                        readOnly
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-slate-400 text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                                        Recipient Email
                                    </label>
                                    <input
                                        type="email"
                                        value={replyInquiry.email}
                                        readOnly
                                        className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-slate-400 text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows="5"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your reply message here..."
                                    className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-ch-teal leading-relaxed"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setReplyInquiry(null)}
                                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs border-0"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingReply}
                                    className="px-5 py-2 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-0"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{isSubmittingReply ? 'Sending...' : 'Send Reply'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
