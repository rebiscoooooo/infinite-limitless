import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export const ownersData = {
    primo: {
        id: 'primo',
        name: 'PRIMO ECALNE JR.',
        role: 'Co-Founder & Chief Executive',
        img: '/assets/image/team/Sir_Primo.png',
        linkedin: 'https://www.linkedin.com/in/primo-ecalne-3a87221a2',
        bio: [
            'I’m Primo, a passionate entrepreneur driven by growth, purpose, and the desire to create meaningful opportunities through INFINITE.',
            'I believe success is built through consistency, vision, and the courage to dream beyond limits while continuously becoming a better version of yourself.',
            'I am passionate about building a strong and positive community where people can grow together, support one another, and create opportunities that lead to long-term personal and financial growth.'
        ]
    },
    aera: {
        id: 'aera',
        name: 'AERA CLARIDAD',
        role: 'Co-Founder & Operations Director',
        img: '/assets/image/team/ma_am(2.png',
        linkedin: 'https://www.linkedin.com/in/aera-claridad-68ba94179',
        bio: [
            'My name is Aera Claridad, and I am passionate about helping people create a better future for themselves through INFINITE. I started this journey with a simple goal: to grow not only financially, but also personally while inspiring others to do the same.',
            'I believe that everyone deserves the opportunity to achieve time and financial freedom. Through dedication, consistency, and the right environment, I want to help people unlock their potential and build a life they truly want for themselves and their families.',
            'For me, success is not just about income. It is about creating impact, building genuine connections, and growing together with the people around me.'
        ]
    }
};

export default function OwnerModal({ isOpen, onClose, ownerKey = 'primo' }) {
    const owner = ownersData[ownerKey] || ownersData.primo;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-ch-dark-slate/80 backdrop-blur-md"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl text-slate-100"
                    >
                        {/* Header bar */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-950/50">
                            <div>
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-semibold">LEADERSHIP PROFILE</span>
                                <h3 className="font-bebas text-2xl tracking-wider text-white">{owner.name}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="shrink-0 flex flex-col items-center">
                                <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-ch-teal/40 shadow-glow-teal bg-slate-800">
                                    <img
                                        src={owner.img}
                                        alt={owner.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <span className="mt-3 text-xs text-ch-teal font-medium tracking-wider text-center">{owner.role}</span>
                            </div>

                            <div className="flex-1 space-y-4 text-sm md:text-base text-slate-300 leading-relaxed">
                                {owner.bio.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}

                                {owner.linkedin && (
                                    <div className="pt-2">
                                        <a
                                            href={owner.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-glow-teal"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                            <span>Connect with me on LinkedIn</span>
                                            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer bar */}
                        <div className="border-t border-white/10 px-6 py-3 bg-slate-950/60 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
