import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    ShieldCheck,
    Flame,
    HeartPulse,
    Sparkles,
    Sun,
    Moon,
    ChevronDown,
    CheckCircle2,
    ArrowRight,
    ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Barley({ variations = [], bioActiveIngredients = [], barleyCategories = [] }) {
    // Active variation index: 0 = Robustus, 1 = Barley, 2 = White Plus Gluta
    const [activeVarIndex, setActiveVarIndex] = useState(1);
    const activeVar = variations[activeVarIndex] || variations[0];

    // FAQ open index state
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            q: 'How does Infinite Barley differ from regular grocery-store barley grass?',
            a: 'Infinite Barley is harvested strictly at the peak nutritional vegetative phase (day 10-14) from pristine certified Australian farmland. It is cold-milled into a fine bio-active powder without heat denaturation, preserving live Superoxide Dismutase (S.O.D.) enzymes, chlorophyll, and trace minerals.'
        },
        {
            q: 'Is Infinite Robustus safe for people with acid reflux or hyperacidity?',
            a: 'Yes! Unlike commercial black coffees which carry high acidity levels (pH 4.8-5.2), Infinite Robustus is infused with alkaline organic barley powder. The natural alkaline minerals buffer stomach acid while Stevia leaves eliminate sugar-induced gut fermentation.'
        },
        {
            q: 'Is Glutathione only for skin whitening?',
            a: 'This is a widespread consumer myth. Glutathione is the body\'s master antioxidant synthesized inside every living cell. Its primary biological function is cellular detoxification, mitochondrial protection, and liver defense. Radiant, brighter skin is simply a visible biomarker of low systemic oxidation.'
        },
        {
            q: 'Can I consume Infinite Barley together with Infinite Robustus coffee?',
            a: 'Absolutely. Many global leaders follow our Morning Activation Protocol: One sachet of Infinite Barley taken with room-temperature water upon waking, followed 30-45 minutes later by a warm mug of Infinite Robustus Black Coffee for sustained mental stamina.'
        },
        {
            q: 'How are orders dispatched to West Africa, Papua New Guinea, and global hubs?',
            a: 'All international orders through the World Plan are dispatched directly via insured DHL Global Express air cargo. Local collection is also available at our central hubs in Ouagadougou, Abidjan, Douala, and Port Moresby.'
        }
    ];

    const getIngredientIcon = (name) => {
        if (name.includes('S.O.D.')) return ShieldCheck;
        if (name.includes('Robusta') || name.includes('Chlorogenic')) return Flame;
        if (name.includes('NAC')) return HeartPulse;
        return Sparkles;
    };

    return (
        <AppLayout>
            <Head title="INFINITE WELLNESS | Pure Organic Barley, Robustus & White Plus Gluta" />

            {/* PRODUCT HERO WITH DYNAMIC VARIATION SWITCHER */}
            <section className="py-12 md:py-20 relative overflow-hidden bg-dot-matrix">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Eyebrow */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs uppercase font-bold tracking-[0.25em] text-ch-teal">
                            CLINICAL WELLNESS MATRIX
                        </span>
                        <h1 className="font-bebas text-5xl sm:text-7xl tracking-wide text-white mt-1">
                            PURE. ORGANIC. POWERFUL.
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base mt-2">
                            Select a formulation thumbnail below to inspect its cellular jobs and active ingredient architecture.
                        </p>
                    </div>

                    {/* Interactive Modern Product Card with Smooth Color Shift */}
                    <motion.div
                        animate={{ backgroundColor: activeVar.bg_color }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="rounded-3xl p-6 sm:p-10 md:p-12 border border-white/15 shadow-2xl relative overflow-hidden text-slate-100"
                    >
                        {/* Ambient Card Backlight */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left: Product Image & Thumbnail Selector */}
                            <div className="lg:col-span-5 flex flex-col items-center">
                                {/* Pouch Hero Image with Keyed Animation */}
                                <div className="w-64 h-72 sm:w-80 sm:h-96 relative flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeVar.product_title}
                                            src={activeVar.main_image}
                                            alt={activeVar.product_title}
                                            initial={{ opacity: 0, scale: 0.85, y: 15 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.85, y: -15 }}
                                            transition={{ duration: 0.4 }}
                                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
                                            onError={(e) => {
                                                e.target.src = '/assets/image/Barley.png';
                                            }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Thumbnail Switcher Buttons */}
                                <div className="flex gap-4 mt-8 bg-black/40 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                                    {variations.map((v, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveVarIndex(idx)}
                                            className={`relative p-2 rounded-xl border transition-all duration-300 flex flex-col items-center gap-1 w-24 ${
                                                activeVarIndex === idx
                                                    ? 'border-ch-teal bg-white/10 scale-105 shadow-glow-teal'
                                                    : 'border-transparent hover:border-white/20 opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <img
                                                    src={v.main_image}
                                                    alt={v.product_title}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-center line-clamp-1">
                                                {v.product_title.replace('INFINITE ', '')}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Formulation Details & 3 Jobs Breakdown */}
                            <div className="lg:col-span-7 space-y-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeVar.product_title}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-widest text-ch-teal-light mb-2">
                                                {activeVar.sub_label}
                                            </div>
                                            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider leading-none">
                                                {activeVar.product_title}
                                            </h2>
                                            <p className="text-xs uppercase tracking-widest font-semibold text-slate-300 mt-1">
                                                {activeVar.sub_title}
                                            </p>
                                        </div>

                                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                                            {activeVar.description}
                                        </p>

                                        {/* Dynamic 3 Jobs Bullet Breakdown */}
                                        <div className="space-y-3 pt-2">
                                            {activeVar.jobs.map((job, jIdx) => (
                                                <div
                                                    key={jIdx}
                                                    className="rounded-2xl p-4 bg-black/30 border border-white/10 backdrop-blur-sm"
                                                >
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-ch-teal-light mb-1">
                                                        {job.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-200 leading-normal">
                                                        {job.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Replaces 3 Harmful Habits Callout */}
                                        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs">
                                            <span className="font-bold uppercase tracking-wider block mb-1">
                                                Replaces Harmful Routines:
                                            </span>
                                            <p className="text-slate-200">{activeVar.replaces}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="pt-2 flex flex-wrap gap-4">
                                            <Link
                                                href="/world-plan"
                                                className="px-6 py-3.5 rounded-xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all duration-200"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                <span>Order via World Plan</span>
                                            </Link>
                                            <Link
                                                href="/select-country"
                                                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-colors"
                                            >
                                                View Local Currency
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* BIO-ACTIVE INGREDIENTS 4-COLUMN GRID */}
            <section className="py-24 bg-slate-950 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">
                            CELLULAR BIO-CHEMISTRY
                        </span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            HERO BIO-ACTIVE INGREDIENTS
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Engineered for high bioavailability, intracellular uptake, and antioxidant synergy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bioActiveIngredients.map((item, idx) => {
                            const IconComponent = getIngredientIcon(item.name);
                            return (
                                <div
                                    key={idx}
                                    className="rounded-3xl p-6 bg-slate-900 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-ch-teal/15 text-ch-teal flex items-center justify-center mb-6">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-bebas text-2xl tracking-wide text-white">{item.name}</h3>
                                        <div className="text-[11px] font-bold text-ch-teal uppercase tracking-wider mt-1">
                                            Source: {item.source}
                                        </div>
                                        <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-ch-teal" />
                                        <span>Laboratory Verified Potency</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CONDITIONS RESPONSIVE TO BARLEY */}
            <section className="py-24 bg-ch-dark-slate border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">
                            HOLISTIC WELLNESS SUPPORT
                        </span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            CONDITIONS RESPONSIVE TO BARLEY
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Documented nutritional support categories utilizing pure organic young green barley.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {barleyCategories.map((cat, idx) => (
                            <div
                                key={idx}
                                className="rounded-3xl p-6 bg-slate-900/90 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
                            >
                                <div>
                                    <div
                                        className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
                                        style={{ backgroundColor: cat.bg, color: cat.color, borderColor: cat.color }}
                                    >
                                        {cat.title}
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {cat.items.map((it, iIdx) => (
                                            <span
                                                key={iIdx}
                                                className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs border border-white/5"
                                            >
                                                {it}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400">
                                    Complementary nutritional superfood
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONSUMER MISCONCEPTIONS & DAILY REGIMEN */}
            <section className="py-24 bg-slate-950 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">
                            MAXIMIZE YOUR BIOLOGICAL RESULTS
                        </span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            DAILY PROTOCOL ARCHITECTURE
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Align your daily intake with your natural circadian and metabolic rhythms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Morning Protocol */}
                        <div className="rounded-3xl p-8 bg-slate-900 border border-ch-teal/30 shadow-glow-teal relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                                    <Sun className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">PHASE 1 (06:00 - 09:00)</span>
                                    <h3 className="font-bebas text-3xl text-white tracking-wide">MORNING ACTIVATION</h3>
                                </div>
                            </div>

                            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-ch-teal shrink-0 mt-0.5" />
                                    <span><strong>Empty Stomach:</strong> Drink 1 glass of cold/room-temperature water with 1 sachet of Infinite Pure Organic Barley. Never use boiling water to avoid destroying live enzymes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-ch-teal shrink-0 mt-0.5" />
                                    <span><strong>Sustained Focus:</strong> 30 minutes later, enjoy 1 cup of Infinite Robustus Black Coffee for clean chlorogenic energy and appetite balance.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Evening Protocol */}
                        <div className="rounded-3xl p-8 bg-slate-900 border border-sky-500/30 shadow-xl relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                                    <Moon className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">PHASE 2 (20:00 - 22:00)</span>
                                    <h3 className="font-bebas text-3xl text-white tracking-wide">EVENING CELLULAR REPAIR</h3>
                                </div>
                            </div>

                            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                                    <span><strong>Master Antioxidant Shield:</strong> Take 1 capsule of White Plus Glutathione with water prior to bedtime to assist hepatic phase II detoxification.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                                    <span><strong>Neuro-Calm:</strong> The NAC and Alpha Lipoic Acid components help down-regulate evening neuro-excitation for deeper restorative REM sleep cycles.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACCORDION FAQ SECTION */}
            <section className="py-24 bg-ch-dark-slate border-t border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">CLARITY & COMPLIANCE</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            FREQUENTLY ASKED QUESTIONS
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                                    >
                                        <span className="font-semibold text-sm sm:text-base text-white">{faq.q}</span>
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
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
