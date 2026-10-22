import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function FlashToast({ flash }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.message) {
            setMessage(flash.success || flash.message);
            setIsError(false);
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 6000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setMessage(flash.error);
            setIsError(true);
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20, x: 20 }}
                    className={`fixed top-24 right-4 sm:right-8 z-50 max-w-md p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-start gap-3 ${
                        isError
                            ? 'bg-rose-950/90 text-rose-100 border-rose-500/30'
                            : 'bg-slate-900/95 text-slate-100 border-ch-teal/40 shadow-glow-teal'
                    }`}
                >
                    {isError ? (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    ) : (
                        <CheckCircle2 className="w-5 h-5 text-ch-teal shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1 text-sm leading-snug">
                        {message}
                    </div>

                    <button
                        onClick={() => setVisible(false)}
                        className="text-slate-400 hover:text-white p-1 rounded-lg"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
