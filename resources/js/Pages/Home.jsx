import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import CountryFlagMarquee from '../Components/CountryFlagMarquee';
import PartnerCarousel from '../Components/PartnerCarousel';
import TestimonialGrid from '../Components/TestimonialGrid';
import ProductQuickViewModal from '../Components/ProductQuickViewModal';
import {
    Sparkles,
    ArrowRight,
    Shield,
    Leaf,
    Globe2,
    Award,
    TrendingUp,
    Users,
    CheckCircle2,
    Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home({ siteStats, products = [], partners = [], testimonials = [] }) {
    // Typewriter effect state
    const typewriterPhrases = ['LIVE LIMITLESS', 'PURE ORGANIC WELLNESS', 'KOREAN RADIANCE SKINCARE', 'GLOBAL WEALTH EMPOWERMENT'];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Filter tab state
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    useEffect(() => {
        const fullPhrase = typewriterPhrases[currentPhraseIndex];
        const typingSpeed = isDeleting ? 40 : 90;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayedText(fullPhrase.substring(0, displayedText.length + 1));
                if (displayedText === fullPhrase) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setDisplayedText(fullPhrase.substring(0, displayedText.length - 1));
                if (displayedText === '') {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentPhraseIndex]);

    // Comprehensive catalog list matching original site
    const catalogProducts = [
        {
            id: 'infinite-barley',
            name: 'Infinite Pure Organic Barley',
            category: 'wellness',
            image: '/assets/image/Ley.png',
            desc: '70+ organic trace minerals, Superoxide Dismutase (S.O.D.) & chlorophyll from pristine Australian soil.',
            badge: 'Top Seller',
            badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        },
        {
            id: 'infinite-robustus',
            name: 'Infinite Robustus Black Coffee',
            category: 'wellness',
            image: '/assets/image/blackco.png',
            desc: 'Stevia-sweetened Robusta coffee enriched with alkaline organic barley. Zero sugar spike.',
            badge: 'Metabolic Boost',
            badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        },
        {
            id: 'white-plus-gluta',
            name: 'White Plus Glutathione',
            category: 'wellness',
            image: '/assets/image/Plus.png',
            desc: 'Master antioxidant formulation with NAC precursor, Collagen, Vitamin C & Alpha Lipoic Acid.',
            badge: 'Clinical Grade',
            badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30'
        },
        {
            id: 'olamour-essence',
            name: 'O\'Lamour Facial Essence',
            category: 'olamour',
            image: '/assets/image/product1.png',
            desc: 'Galactomyces ferment filtrate & hyaluronic complexes for profound dermal barrier hydration.',
            badge: 'Luxury Korean',
            badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        },
        {
            id: 'olamour-ampoule',
            name: 'O\'Lamour Radiance Ampoule',
            category: 'olamour',
            image: '/assets/image/product2.png',
            desc: 'High-potency Niacinamide & Tranexamic acid targeting melasma and hyperpigmentation.',
            badge: 'Radiance Core',
            badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        },
        {
            id: 'olamour-cream',
            name: 'O\'Lamour CoreLaCrème',
            category: 'skincare',
            image: '/assets/image/product3.png',
            desc: 'Triple-ceramide complex with Centella Asiatica for lipid recovery and anti-redness protection.',
            badge: 'Intense Repair',
            badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        },
        {
            id: 'olamour-bb',
            name: 'O\'Lamour PrimeRenew BB Cream',
            category: 'skincare',
            image: '/assets/image/product4.png',
            desc: 'Broad spectrum SPF 50+ PA++++ with self-adjusting color adapt technology for all skin tones.',
            badge: 'SPF 50+ Shield',
            badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        },
        {
            id: 'olamour-set',
            name: 'O\'LAMOUR Premium 4-Step Set',
            category: 'olamour',
            image: '/assets/image/product5.png',
            desc: 'The complete luxury 4-step ritual for glass skin: Essence, Ampoule, CoreLaCrème & BB Cream.',
            badge: 'Complete Ritual',
            badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        }
    ];

    const filteredProducts = selectedCategory === 'all'
        ? catalogProducts
        : catalogProducts.filter((p) => p.category === selectedCategory);

    return (
        <AppLayout>
            <Head title="INFINITE - Live Limitless | Premium Wellness & Skincare Global Network" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32 bg-dot-matrix">
                {/* Ambient glow orbs */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-ch-teal/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    {/* Eyebrow badge with pulse */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-ch-teal/40 shadow-glow-teal mb-8"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ch-teal opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ch-teal" />
                        </span>
                        <span className="text-xs uppercase font-bold tracking-[0.2em] text-ch-teal-light">
                            GLOBAL BORDERLESS PLATFORM
                        </span>
                    </motion.div>

                    {/* Massive Bebas Neue Title with Typewriter */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-wider leading-[0.9] text-glow-teal"
                    >
                        <span>INFINITE: </span>
                        <span className="text-ch-teal block sm:inline">{displayedText}</span>
                        <span className="inline-block w-2 sm:w-3 h-10 sm:h-16 bg-ch-teal ml-1 animate-pulse align-middle" />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
                    >
                        Revolutionary Australian organic superfoods, clinical Korean skincare, and an empowering global compensation system designed for sustainable entrepreneurship.
                    </motion.p>

                    {/* CTA Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/world-plan"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-glow-teal hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <span>Explore World Plan</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                        </Link>
                        <Link
                            href="/barley"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-white/15 font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:border-ch-teal/50 flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 text-ch-teal" />
                            <span>Wellness Showcase</span>
                        </Link>
                    </motion.div>

                    {/* Hero Metric Pills */}
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <div className="rounded-2xl p-4 bg-slate-900/70 border border-white/10 backdrop-blur-md">
                            <div className="font-bebas text-3xl sm:text-4xl text-ch-teal font-black">
                                {siteStats ? numberFormat(siteStats.total_visits) : '12,540+'}
                            </div>
                            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Global Visits</div>
                        </div>
                        <div className="rounded-2xl p-4 bg-slate-900/70 border border-white/10 backdrop-blur-md">
                            <div className="font-bebas text-3xl sm:text-4xl text-amber-400 font-black">
                                {siteStats ? numberFormat(siteStats.product_clicks) : '8,430+'}
                            </div>
                            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Product Orders</div>
                        </div>
                        <div className="rounded-2xl p-4 bg-slate-900/70 border border-white/10 backdrop-blur-md">
                            <div className="font-bebas text-3xl sm:text-4xl text-white font-black">10+</div>
                            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Active Nations</div>
                        </div>
                        <div className="rounded-2xl p-4 bg-slate-900/70 border border-white/10 backdrop-blur-md">
                            <div className="font-bebas text-3xl sm:text-4xl text-emerald-400 font-black">100%</div>
                            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Certified Organic</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INFINITE FLAG MARQUEE */}
            <CountryFlagMarquee />

            {/* VALUE PILLARS & VISION */}
            <section className="py-24 bg-slate-950 border-b border-white/10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">OUR FOUNDATIONAL PILLARS</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-2">
                            WHY THE WORLD CHOOSES INFINITE
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            A synergy of purity, clinical potency, and authentic international leadership.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="rounded-3xl p-8 bg-slate-900/80 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 group hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-2xl bg-ch-teal/15 text-ch-teal flex items-center justify-center mb-6 group-hover:bg-ch-teal group-hover:text-ch-dark-slate transition-colors">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <h3 className="font-bebas text-2xl tracking-wider text-white">AUSTRALIAN ORGANIC</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Our young green barley shoots are harvested in Australia under strict ACO certified farming with live enzymes and intact Superoxide Dismutase.
                            </p>
                        </div>

                        <div className="rounded-3xl p-8 bg-slate-900/80 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 group hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-6 group-hover:bg-sky-400 group-hover:text-ch-dark-slate transition-colors">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-bebas text-2xl tracking-wider text-white">KOREAN DERMA-LABS</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                O'Lamour skincare line combines Galactomyces ferment, multi-ceramides, and SPF 50+ tone-adapt coverage formulated in Seoul.
                            </p>
                        </div>

                        <div className="rounded-3xl p-8 bg-slate-900/80 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 group hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:text-ch-dark-slate transition-colors">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="font-bebas text-2xl tracking-wider text-white">30% RETAIL MARGIN</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Direct retail earnings plus team pairing matrix, enroller bonuses, and 3% to 19% unilevel volume rebates across global hubs.
                            </p>
                        </div>

                        <div className="rounded-3xl p-8 bg-slate-900/80 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 group hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-400 group-hover:text-ch-dark-slate transition-colors">
                                <Globe2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bebas text-2xl tracking-wider text-white">DHL AIR LOGISTICS</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Seamless door-to-door delivery with customs tracking across Africa, Asia-Pacific, and South America with zero transit delays.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT FILTER CATALOG */}
            <section id="menu" className="py-24 bg-ch-dark-slate relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">SIGNATURE SELECTIONS</span>
                            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                                PRODUCT SHOWCASE
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">Explore our premium wellness and clinical skincare lines.</p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10">
                            {[
                                { id: 'all', label: 'All Formulations' },
                                { id: 'wellness', label: 'Wellness Staples' },
                                { id: 'skincare', label: 'Skincare' },
                                { id: 'olamour', label: 'O\'Lamour Rituals' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedCategory(tab.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                        selectedCategory === tab.id
                                            ? 'bg-ch-teal text-ch-dark-slate shadow-md'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((p) => (
                            <div
                                key={p.id}
                                className="rounded-3xl p-6 bg-slate-900/90 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between shadow-xl"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${p.badgeColor}`}>
                                            {p.badge}
                                        </span>
                                        <button
                                            onClick={() => setQuickViewProduct(p)}
                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-ch-teal/20 text-slate-400 hover:text-ch-teal transition-colors"
                                            title="Quick View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Product Image */}
                                    <div className="w-full h-48 rounded-2xl bg-slate-950/60 p-4 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="max-h-full max-w-full object-contain filter drop-shadow-md"
                                            onError={(e) => {
                                                e.target.src = '/assets/image/Barley.png';
                                            }}
                                        />
                                    </div>

                                    <h3 className="font-bebas text-2xl tracking-wide text-white group-hover:text-ch-teal transition-colors">
                                        {p.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                        {p.desc}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                                    <button
                                        onClick={() => setQuickViewProduct(p)}
                                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition-colors"
                                    >
                                        Details
                                    </button>
                                    <Link
                                        href="/world-plan"
                                        className="py-2.5 px-4 rounded-xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
                                    >
                                        Order
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GLOBAL AMBASSADORS / PARTNER CAROUSEL */}
            <section className="py-24 bg-slate-950 border-t border-white/10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">INTERNATIONAL LEADERSHIP</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            GLOBAL HUBS & AMBASSADORS
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Connect directly with our authorized regional country directors via WhatsApp.
                        </p>
                    </div>

                    <PartnerCarousel partners={partners} />
                </div>
            </section>

            {/* TESTIMONIALS & CLINICAL PROOF */}
            <section id="testimonials" className="py-24 bg-ch-dark-slate border-t border-white/10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-ch-teal">TRANSFORMATIONAL RESULTS</span>
                        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-1">
                            BEFORE & AFTER CLINICAL JOURNEYS
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Drag the interactive divider to observe authentic skin tone and wellness progressions.
                        </p>
                    </div>

                    <TestimonialGrid testimonials={testimonials} />
                </div>
            </section>

            {/* WORLD PLAN CALL TO ACTION */}
            <section className="py-20 bg-gradient-to-r from-ch-dark-slate via-slate-900 to-ch-dark-slate border-y border-ch-teal/30 relative">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] font-bold text-ch-teal">START YOUR GLOBAL BUSINESS</span>
                    <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider mt-2">
                        READY TO LIVE LIMITLESS?
                    </h2>
                    <p className="text-slate-300 text-base max-w-xl mx-auto mt-4">
                        Join an elite global fraternity of wellness leaders with up to 19% executive overrides and direct weekly compensation.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/world-plan"
                            className="px-8 py-4 rounded-2xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-glow-teal hover:scale-105"
                        >
                            Register for World Plan
                        </Link>
                        <Link
                            href="/select-country"
                            className="px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm uppercase tracking-wider border border-white/10"
                        >
                            Choose Your Country
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick View Modal */}
            <ProductQuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </AppLayout>
    );
}

function numberFormat(val) {
    if (!val) return '0';
    return Number(val).toLocaleString();
}
