import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { Sparkles, Check, ArrowRight, Shield, Droplets, Sun, Award, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Olamour({ products = [] }) {
    const steps = [
        {
            num: '01',
            title: 'HYDRATE & PREP',
            product: 'Cellular Renewal Facial Essence',
            desc: 'Quenches micro-cellular dehydration and balances skin mantle pH with active Galactomyces ferment.',
        },
        {
            num: '02',
            title: 'TARGET & ILLUMINATE',
            product: 'Quintessence Radiance Ampoule',
            desc: 'Clinical Niacinamide & Tranexamic acid inhibit melanin transfer and fade stubborn hyperpigmentation.',
        },
        {
            num: '03',
            title: 'LOCK & RESTORE',
            product: 'CoreLaCrème Barrier Cream',
            desc: 'Multi-ceramides and botanical squalane form a protective moisture seal that prevents trans-epidermal water loss.',
        },
        {
            num: '04',
            title: 'DEFEND & PERFECT',
            product: 'PrimeRenew BB Cream SPF 50+',
            desc: 'Broad spectrum mineral shields block UVA/UVB/Blue light with tone-adapting radiant coverage.',
        },
    ];

    return (
        <AppLayout>
            <Head title="O'LAMOUR - Luxury Korean Derma-Skincare | INFINITE" />

            {/* HERO SECTION */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-dot-matrix">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-ch-teal/15 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-ch-teal/30 mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-ch-teal" />
                        <span className="text-xs uppercase font-bold tracking-[0.25em] text-ch-teal">
                            FORMULATED IN SEOUL, SOUTH KOREA
                        </span>
                    </div>

                    <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider text-white text-glow-teal leading-none">
                        O'LAMOUR: GLASS SKIN RADIANCE
                    </h1>
                    <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
                        Clinical derma-science meets botanical refinement. Formulated specifically to reverse hyperpigmentation, soothe inflammation, and restore barrier integrity across diverse skin tones.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href="/world-plan"
                            className="px-8 py-3.5 rounded-2xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-glow-teal hover:scale-105"
                        >
                            Order Full 4-Step Set
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4-STEP RITUAL BANNER */}
            <section className="py-20 bg-slate-950 border-y border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">THE DAILY PROTOCOL</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            THE 4-STEP GLASS SKIN CEREMONY
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((st, i) => (
                            <div
                                key={i}
                                className="rounded-3xl p-6 bg-slate-900 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="font-bebas text-5xl text-ch-teal/40 group-hover:text-ch-teal transition-colors mb-2">
                                        {st.num}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-ch-teal block">
                                        {st.title}
                                    </span>
                                    <h3 className="font-bebas text-2xl tracking-wide text-white mt-1">
                                        {st.product}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                        {st.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCT CATALOG CARDS */}
            <section className="py-24 bg-ch-dark-slate">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">FORMULATION DOSSIER</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            INDIVIDUAL FORMULATION BREAKDOWN
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {products.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-3xl p-8 bg-slate-900/90 border border-white/10 shadow-2xl flex flex-col sm:flex-row gap-6 items-center"
                            >
                                <div className="w-40 h-48 shrink-0 rounded-2xl bg-slate-950 p-4 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-h-full max-w-full object-contain filter drop-shadow-lg"
                                        onError={(e) => { e.target.src = '/assets/image/product1.png'; }}
                                    />
                                </div>

                                <div className="flex-1 space-y-3 text-left">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-ch-teal">
                                        {item.category} &bull; {item.volume}
                                    </span>
                                    <h3 className="font-bebas text-2xl text-white tracking-wide">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                                        {item.description}
                                    </p>

                                    <div className="space-y-1.5 pt-1 text-xs text-slate-400">
                                        {item.keyBenefits?.map((b, bIdx) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                                <Check className="w-3.5 h-3.5 text-ch-teal shrink-0" />
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
