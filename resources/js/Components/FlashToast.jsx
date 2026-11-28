import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const DURATION_MS = 5500;

export default function FlashToast({ flash }) {
    const [visible, setVisible] = useState(false);
    const [toast, setToast] = useState({ type: 'success', title: 'Success', message: '', id: 0 });
    const counterRef = useRef(0);

    useEffect(() => {
        let next = null;
        if (flash?.error) {
            next = { type: 'error', title: 'Action Failed', message: flash.error };
        } else if (flash?.warning) {
            next = { type: 'warning', title: 'Attention Required', message: flash.warning };
        } else if (flash?.success) {
            next = { type: 'success', title: 'Success', message: flash.success };
        } else if (flash?.message) {
            next = { type: 'info', title: 'Notification', message: flash.message };
        }

        if (!next) return;

        counterRef.current += 1;
        setToast({ ...next, id: counterRef.current });
        setVisible(true);

        const timer = setTimeout(() => setVisible(false), DURATION_MS);
        return () => clearTimeout(timer);
    }, [flash]);

    const styles = {
        success: {
            accent: 'bg-emerald-500',
            iconBg: 'bg-emerald-50 text-emerald-600',
            titleColor: 'text-emerald-900',
            ring: 'ring-emerald-200/80',
            Icon: CheckCircle2,
        },
        error: {
            accent: 'bg-rose-600',
            iconBg: 'bg-rose-50 text-rose-600',
            titleColor: 'text-rose-900',
            ring: 'ring-rose-200/80',
            Icon: AlertCircle,
        },
        warning: {
            accent: 'bg-amber-500',
            iconBg: 'bg-amber-50 text-amber-600',
            titleColor: 'text-amber-900',
            ring: 'ring-amber-200/80',
            Icon: AlertTriangle,
        },
        info: {
            accent: 'bg-[#0f766e]',
            iconBg: 'bg-teal-50 text-[#0f766e]',
            titleColor: 'text-slate-900',
            ring: 'ring-teal-200/80',
            Icon: Info,
        },
    };

    const current = styles[toast.type] || styles.success;
    const StatusIcon = current.Icon;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key={toast.id}
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`fixed top-5 right-4 sm:top-6 sm:right-6 z-[80] w-[calc(100vw-2rem)] max-w-md bg-white rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.16)] ring-1 ${current.ring} overflow-hidden text-left`}
                >
                    <div className="p-4 flex items-start gap-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${current.iconBg}`}>
                            <StatusIcon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className={`text-xs font-extrabold uppercase tracking-wider ${current.titleColor}`}>
                                {toast.title}
                            </div>
                            <p className="text-xs sm:text-[13px] font-medium text-slate-600 leading-relaxed mt-0.5 mb-0 break-words">
                                {toast.message}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setVisible(false)}
                            aria-label="Dismiss alert"
                            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 inline-flex items-center justify-center shrink-0 transition-colors bg-transparent border-0 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Smooth auto-dismiss progress bar */}
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: DURATION_MS / 1000, ease: 'linear' }}
                        style={{ transformOrigin: 'left center' }}
                        className={`h-1 w-full ${current.accent}`}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
