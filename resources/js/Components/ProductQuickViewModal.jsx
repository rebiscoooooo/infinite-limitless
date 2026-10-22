import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ProductQuickViewModal({ product, isOpen, onClose }) {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative z-10 w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-slate-100"
                    >
                        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-slate-950/50">
                            <span className="text-xs uppercase tracking-widest font-bold text-ch-teal">Product Quick View</span>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center p-4">
                                <img
                                    src={product.image || '/assets/image/Barley.png'}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                                    onError={(e) => {
                                        e.target.src = '/assets/image/Barley.png';
                                    }}
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <span className="text-xs uppercase tracking-wider text-ch-teal font-semibold">
                                        {product.category || 'Clinical Superfood'}
                                    </span>
                                    <h3 className="font-bebas text-3xl tracking-wide text-white mt-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                                        {product.description || 'Premium formulations manufactured to the highest international quality standards for metabolic health and anti-aging.'}
                                    </p>
                                </div>

                                <div className="space-y-2 text-xs text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ch-teal" />
                                        <span>100% Certified Organic & Halal Accredited</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ch-teal" />
                                        <span>Active bio-enzymes & zero artificial fillers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ch-teal" />
                                        <span>Global DHL door-to-door express dispatch</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center gap-3">
                                    <Link
                                        href="/world-plan"
                                        onClick={onClose}
                                        className="flex-1 py-3 px-5 rounded-xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Order via World Plan</span>
                                    </Link>
                                    <Link
                                        href="/barley"
                                        onClick={onClose}
                                        className="py-3 px-4 rounded-xl border border-white/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white/5 transition-colors"
                                    >
                                        <span>Showcase</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
