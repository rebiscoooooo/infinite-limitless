import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    Sparkles,
    Check,
    ChevronDown,
    Shield,
    Globe,
    ArrowRight,
    TrendingUp,
    Gift,
    Award,
    Clock,
    ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JoinCommunity({ country = {}, packages = {}, earningWays = [] }) {
    // Package category switcher: 'executive' vs 'regular'
    const [packageType, setPackageType] = useState('executive');
    const [openAccordion, setOpenAccordion] = useState(0);

    const activeList = packages[packageType] || [];

    const steps = [
        { num: '01', title: 'Select Product Package', desc: 'Choose from Executive or Regular sets tailored to your regional market.' },
        { num: '02', title: 'Submit World Application', desc: 'Complete demographic information and securely upload payment proof.' },
        { num: '03', title: 'Account Verification', desc: 'Our administrative compliance team verifies payment and activates distributor portal.' },
        { num: '04', title: 'DHL Express Dispatch', desc: 'Your product package is dispatched directly to your address with air waybill tracking.' },
    ];

    return (
        <AppLayout>
            <Head title={`Join Community - ${country.name || 'Global'} | INFINITE Business Opportunity`} />

            {/* HERO SECTION */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-dot-matrix">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-ch-teal/40 shadow-glow-teal mb-6">
                        <Globe className="w-4 h-4 text-ch-teal" />
                        <span className="text-xs uppercase font-bold tracking-[0.25em] text-ch-teal">
                            REGIONAL BUSINESS HUB: {country.name?.toUpperCase() || 'GLOBAL NETWORK'}
                        </span>
                    </div>

                    <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider text-white leading-none">
                        START YOUR INFINITE ENTERPRISE
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                        Turnkey international distributorship featuring generous 30% retail margins, automated weekly team matching bonuses, and up to 19% executive overrides.
                    </p>

                    {/* Package Type Switcher Toggle */}
                    <div className="mt-10 inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md">
                        <button
                            onClick={() => setPackageType('executive')}
                            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 ${
                                packageType === 'executive'
                                    ? 'bg-ch-teal text-ch-dark-slate shadow-lg scale-105'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Executive Package (O'Lamour + Rebates)</span>
                        </button>
                        <button
                            onClick={() => setPackageType('regular')}
                            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 ${
                                packageType === 'regular'
                                    ? 'bg-ch-teal text-ch-dark-slate shadow-lg scale-105'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <span>Regular Health Staples</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* PACKAGE CARDS GRID */}
            <section className="py-20 bg-slate-950 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">
                            CURRENCY: {country.currency || 'USD'}
                        </span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            {packageType === 'executive' ? 'EXECUTIVE TIERS & REBATES' : 'REGULAR HEALTH PACKAGES'}
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                            {packageType === 'executive'
                                ? 'Unlocks 3% to 19% cascading unilevel team overrides and Korean O\'Lamour luxury skincare sets.'
                                : 'High volume wellness packages focusing on organic Australian barley, Robustus coffee, and glutathione.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {activeList.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative ${
                                    pkg.recommended
                                        ? 'bg-slate-900 border-ch-teal shadow-glow-teal lg:-translate-y-2'
                                        : 'bg-slate-900/80 border-white/10 hover:border-white/20'
                                }`}
                            >
                                {pkg.recommended && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ch-teal text-ch-dark-slate text-[10px] font-extrabold uppercase tracking-widest shadow">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div>
                                    <div className="w-16 h-16 mx-auto mb-4 p-2 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <img
                                            src={pkg.badge}
                                            alt={pkg.tier}
                                            className="max-h-full max-w-full object-contain"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <span className="text-xs uppercase font-bold text-ch-teal tracking-wider">
                                            {pkg.tier}
                                        </span>
                                        <h3 className="font-bebas text-2xl text-white tracking-wide mt-0.5">
                                            {pkg.name}
                                        </h3>
                                        <div className="font-bebas text-3xl text-white mt-3 text-glow-teal">
                                            {pkg.price}
                                        </div>
                                        <span className="text-[10px] text-emerald-400 block font-semibold">
                                            {pkg.worth}
                                        </span>
                                    </div>

                                    {/* Inclusions List */}
                                    <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-slate-300">
                                        {pkg.inclusions.map((inc, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <Check className="w-3.5 h-3.5 text-ch-teal shrink-0 mt-0.5" />
                                                <span className="leading-tight">{inc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/10">
                                    <Link
                                        href="/world-plan"
                                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                                            pkg.recommended
                                                ? 'bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white'
                                                : 'bg-white/10 hover:bg-white/20 text-white'
                                        }`}
                                    >
                                        <span>Select Tier</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DETAILED BUSINESS COMPENSATION PLAN ACCORDION */}
            <section className="py-24 bg-ch-dark-slate border-t border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">FINANCIAL FREEDOM ROADMAP</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            8 WAYS TO EARN WITH INFINITE
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Transparent algorithmic payouts, dual team pairing matrices, and leadership incentives.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {earningWays.map((item, idx) => {
                            const isOpen = openAccordion === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenAccordion(isOpen ? null : idx)}
                                        className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-7 h-7 rounded-lg bg-ch-teal/15 text-ch-teal flex items-center justify-center font-bold text-xs shrink-0">
                                                {idx + 1}
                                            </span>
                                            <span className="font-semibold text-sm sm:text-base text-white">{item.title}</span>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-ch-teal transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                                            >
                                                {item.desc}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* REGISTRATION STEPS & DHL LOGISTICS */}
            <section className="py-20 bg-slate-950 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">SIMPLE ONBOARDING</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            HOW TO ACTIVATE YOUR ACCOUNT
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((st, i) => (
                            <div key={i} className="rounded-3xl p-6 bg-slate-900 border border-white/10">
                                <div className="font-bebas text-4xl text-ch-teal mb-3">{st.num}</div>
                                <h3 className="font-bold text-white text-base">{st.title}</h3>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{st.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/world-plan"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-sm uppercase tracking-widest shadow-xl hover:shadow-glow-teal hover:scale-105 transition-all duration-300"
                        >
                            <span>Proceed to Official Registration</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
