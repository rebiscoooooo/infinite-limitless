import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiryForm({ className = '' }) {
    const [submittedSuccess, setSubmittedSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: 'Order Product',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedSuccess(false);

        post('/inquiries', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmittedSuccess(true);
                setTimeout(() => setSubmittedSuccess(false), 8000);
            },
        });
    };

    return (
        <div className={`rounded-2xl p-6 md:p-8 bg-white/95 text-slate-800 shadow-xl border border-slate-200/80 backdrop-blur-md ${className}`}>
            <div className="mb-6">
                <span className="text-xs font-bold tracking-widest text-ch-teal uppercase">CONNECT WITH CONCIERGE</span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Send Us a Message</h3>
                <p className="text-xs text-slate-500 mt-1">We respond to global product and partnership requests within 2-3 business days.</p>
            </div>

            <AnimatePresence>
                {(submittedSuccess || recentlySuccessful) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-start gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm">Message Sent Successfully!</h4>
                            <p className="text-xs text-teal-700 mt-0.5">Thank you for your inquiry. A confirmation receipt has been dispatched to your email.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                        id="inquiry-name"
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="e.g. Alexandre Kaboré"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ch-teal focus:border-transparent text-sm transition-all"
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                        id="inquiry-email"
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ch-teal focus:border-transparent text-sm transition-all"
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                    <label htmlFor="inquiry-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Subject <span className="text-rose-500">*</span>
                    </label>
                    <select
                        id="inquiry-subject"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-ch-teal focus:border-transparent text-sm transition-all"
                    >
                        <option value="Order Product">Order Product (General)</option>
                        <option value="Order Barley">Order Infinite Organic Barley</option>
                        <option value="Order Coffee">Order Infinite Robustus Black Coffee</option>
                        <option value="Order Gluta">Order White Plus Glutathione</option>
                        <option value="Join Us">Join Us / Distributorship Opportunity</option>
                        <option value="Feedback">Customer Experience & Feedback</option>
                    </select>
                    {errors.subject && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-semibold text-slate-700 mb-1">
                        Message Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                        id="inquiry-message"
                        required
                        rows={4}
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder="Please tell us your inquiry details, delivery country, or desired quantities..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ch-teal focus:border-transparent text-sm transition-all resize-none"
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-2 py-3 px-6 rounded-xl bg-ch-dark-slate hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:shadow-teal-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin text-ch-teal" />
                            <span>Transmitting Inquiry...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4 text-ch-teal" />
                            <span>Submit Inquiry</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
