import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fast, smooth initial entrance animation
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ch-dark-slate"
                >
                    <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-ch-teal/20 border-t-ch-teal animate-spin" />
                        <div className="mt-4 flex flex-col items-center">
                            <span className="font-bebas text-3xl tracking-widest text-white">INFINITE</span>
                            <span className="text-[10px] tracking-[0.3em] font-bold text-ch-teal uppercase">LIVE LIMITLESS</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
