import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    ShieldCheck,
    FileCheck,
    Truck,
    Building2,
    Award,
    Image as ImageIcon,
    Users,
    CheckCircle2,
    Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Info({ executiveTiers = [], proofs = {} }) {
    const [activeTab, setActiveTab] = useState('executives');

    const tabs = [
        { id: 'executives', label: 'Executive Leadership Wall', icon: Users },
        { id: 'receipts', label: 'Customs & Waybills', icon: FileCheck },
        { id: 'logistics', label: 'Air Logistics & Freight', icon: Truck },
        { id: 'certifications', label: 'Accreditations', icon: Award },
        { id: 'gallery', label: 'Brand & Event Gallery', icon: ImageIcon },
    ];

    return (
        <AppLayout>
            <Head title="Proof of Legitimacy & Executive Leadership Roster | INFINITE" />

            {/* HERO SECTION */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-dot-matrix">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-ch-teal/40 shadow-glow-teal mb-6">
                        <ShieldCheck className="w-4 h-4 text-ch-teal" />
                        <span className="text-xs uppercase font-bold tracking-[0.25em] text-ch-teal">
                            TRANSPARENCY & VERIFICATION DOSSIER
                        </span>
                    </div>

                    <h1 className="font-bebas text-5xl sm:text-7xl tracking-wide text-white leading-none">
                        PROOF OF LEGITIMACY & LEADERSHIP
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                        Explore our audited customs documentation, air freight waybills, global certification credentials, and dynamic council of approved international leaders.
                    </p>

                    {/* Tab Navigation Pill Bar */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 max-w-4xl mx-auto backdrop-blur-md">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 ${
                                        isActive
                                            ? 'bg-ch-teal text-ch-dark-slate shadow-md'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* TAB CONTENTS */}
            <section className="py-16 bg-slate-950 border-t border-white/10 min-h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* TAB 1: EXECUTIVE LEADERSHIP WALL */}
                    {activeTab === 'executives' && (
                        <div className="space-y-16">
                            <div className="text-center max-w-2xl mx-auto">
                                <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">
                                    COUNCIL OF APPROVED GLOBAL LEADERS
                                </span>
                                <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide mt-1">
                                    EXECUTIVE LEADERSHIP TIERS
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">
                                    Approved members from world plan registrations automatically qualify into executive council tiers.
                                </p>
                            </div>

                            {/* Tiers List */}
                            <div className="space-y-16">
                                {executiveTiers.map((tier) => (
                                    <div
                                        key={tier.id}
                                        className="rounded-3xl p-8 bg-slate-900/80 border border-white/10 shadow-2xl relative overflow-hidden"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 p-2 border border-white/10 flex items-center justify-center">
                                                    <img
                                                        src={tier.gem_img}
                                                        alt={tier.rank_name}
                                                        className="max-h-full max-w-full object-contain filter drop-shadow"
                                                        onError={(e) => { e.target.style.display = 'none'; }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bebas text-3xl text-white tracking-wide">
                                                        {tier.rank_name}
                                                    </h3>
                                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-ch-teal">
                                                        {tier.rank_sub || 'INTERNATIONAL LEADERSHIP TIER'}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                                                {tier.leaders.filter(l => !l.coming_soon).length} Active Leader(s)
                                            </span>
                                        </div>

                                        {/* Leaders Grid */}
                                        <div className={`grid gap-6 ${
                                            tier.is_diamond_layout
                                                ? 'grid-cols-1 md:grid-cols-3'
                                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                                        }`}>
                                            {tier.leaders.map((leader, lIdx) => (
                                                <div
                                                    key={lIdx}
                                                    className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col items-center text-center ${
                                                        leader.coming_soon
                                                            ? 'border-dashed border-white/15 bg-slate-950/40 text-slate-500'
                                                            : 'border-white/10 bg-slate-950/80 hover:border-ch-teal/40 text-slate-200 hover:-translate-y-1 shadow-lg'
                                                    }`}
                                                >
                                                    <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden flex items-center justify-center mb-4">
                                                        {leader.coming_soon ? (
                                                            <Lock className="w-6 h-6 text-slate-600" />
                                                        ) : (
                                                            <img
                                                                src={leader.img || '/assets/image/placeholder-user.jpg'}
                                                                alt={leader.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = '/assets/image/logo-infinite.webp';
                                                                }}
                                                            />
                                                        )}
                                                    </div>

                                                    <h4 className="font-bold text-sm tracking-wide text-white">
                                                        {leader.name}
                                                    </h4>
                                                    <p className="text-xs text-ch-teal mt-0.5 uppercase tracking-wider">
                                                        {leader.country}
                                                    </p>

                                                    {leader.coming_soon ? (
                                                        <span className="mt-3 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider bg-white/5 text-slate-500 border border-white/5">
                                                            Available Slot
                                                        </span>
                                                    ) : (
                                                        <span className="mt-3 px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                            Verified Leader
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 2: RECEIPTS & CUSTOMS WAYBILLS */}
                    {activeTab === 'receipts' && (
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto mb-10">
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-bold">AUTHENTIC AUDIT TRAIL</span>
                                <h3 className="font-bebas text-4xl text-white mt-1">CUSTOMS DECLARATIONS & WAYBILLS</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {proofs.receipts?.map((r, i) => (
                                    <div key={i} className="rounded-2xl p-4 bg-slate-900 border border-white/10 overflow-hidden shadow-xl">
                                        <div className="h-52 rounded-xl bg-slate-950 overflow-hidden mb-3">
                                            <img
                                                src={r.img}
                                                alt={r.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                onError={(e) => { e.target.src = '/assets/image/proof1.jpg'; }}
                                            />
                                        </div>
                                        <h4 className="font-bold text-sm text-white">{r.title}</h4>
                                        <span className="text-xs text-slate-400 mt-1 block">Batch Clearance: {r.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 3: LOGISTICS & FREIGHT */}
                    {activeTab === 'logistics' && (
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto mb-10">
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-bold">COLD CHAIN LOGISTICS</span>
                                <h3 className="font-bebas text-4xl text-white mt-1">GLOBAL AIR FREIGHT INFRASTRUCTURE</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {proofs.logistics?.map((l, i) => (
                                    <div key={i} className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-6 items-center">
                                        <div className="w-full sm:w-48 h-48 rounded-2xl bg-slate-950 overflow-hidden shrink-0">
                                            <img
                                                src={l.img}
                                                alt={l.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = '/assets/image/proof5.jpg'; }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bebas text-2xl text-white">{l.title}</h4>
                                            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{l.desc}</p>
                                            <div className="mt-4 flex items-center gap-1.5 text-xs text-ch-teal">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>Insured International Air Cargo</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: CERTIFICATIONS */}
                    {activeTab === 'certifications' && (
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto mb-10">
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-bold">ACCREDITED STANDARDS</span>
                                <h3 className="font-bebas text-4xl text-white mt-1">OFFICIAL CERTIFICATION PORTFOLIO</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {proofs.certifications?.map((c, i) => (
                                    <div key={i} className="rounded-2xl p-6 bg-slate-900 border border-white/10 flex flex-col items-center text-center shadow-xl">
                                        <div className="w-24 h-24 rounded-2xl bg-white/5 p-3 mb-4 flex items-center justify-center">
                                            <img
                                                src={c.img}
                                                alt={c.title}
                                                className="max-h-full max-w-full object-contain"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                        <h4 className="font-bold text-sm text-white">{c.title}</h4>
                                        <span className="text-xs text-ch-teal font-semibold mt-1">Credential: {c.code}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 5: GALLERY */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-8">
                            <div className="text-center max-w-xl mx-auto mb-10">
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-bold">EVENTS & MILESTONES</span>
                                <h3 className="font-bebas text-4xl text-white mt-1">BRAND GALLERY</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {proofs.gallery?.map((img, i) => (
                                    <div key={i} className="h-60 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-lg">
                                        <img
                                            src={img}
                                            alt={`Gallery ${i + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            onError={(e) => { e.target.src = '/assets/image/proof8.jpg'; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
