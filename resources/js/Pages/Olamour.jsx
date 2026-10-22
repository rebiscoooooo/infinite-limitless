import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Olamour() {
    return (
        <AppLayout>
            <Head>
                <title>O'LAMOUR | Infinite Live Limitless</title>
                <link rel="stylesheet" href="/assets/css/olamour.css" />
            </Head>

            {/* HERO SECTION */}
            <section id="hero" style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px', paddingBottom: '100px' }}>
                <div
                    className="hero-bg"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: "linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('/assets/image/banner(1).png') center center / cover no-repeat",
                        zIndex: 0
                    }}
                >
                    <div className="hero-grid-lines"></div>
                </div>

                <div className="container-fluid px-3 px-lg-5 hero-content reveal visible" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-11 col-xl-10 text-center">
                            <div className="hero-eyebrow justify-content-center mx-auto mb-3">
                                <span className="dot"></span>NEXT GENERATION SKIN CARE SCIENCE BY INFINITE
                            </div>

                            <p className="ola-script mt-2">/oh-la-moor/</p>
                            <h1 className="ola-hero-title">O'LAMOUR</h1>

                            <p className="hero-desc mx-auto text-white mt-4 px-2" style={{ maxWidth: '800px', opacity: 0.9, lineHeight: 1.8, fontSize: '1.15rem' }}>
                                Korea's clinical biotechnology meets botanical prestige. Discover the next generation of skincare designed to deliver long-lasting, medical-grade glass skin results.
                            </p>

                            <a href="#collection" className="btn btn-outline-light mt-4 fw-bold px-4 py-3" style={{ borderRadius: '50px', borderWidth: '2px', letterSpacing: '1px' }}>
                                Explore The Collection <i className="bi bi-arrow-down ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* AFFORDABLE LUXURY */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="row justify-content-center text-center px-3">
                        <div className="col-12 col-lg-10">
                            <span className="section-tag">Affordable Luxury</span>
                            <h2 className="section-title mb-4">The O'LAMOUR <span style={{ color: 'var(--ch-teal)' }}>Standard</span></h2>
                            <p className="fs-5 text-muted" style={{ lineHeight: 1.8 }}>
                                We believe true luxury isn't defined by a price tag, but by the integrity of the formula. Every O'LAMOUR product utilizes a <strong>Triple-Solution Formula</strong>. By performing three distinct roles, a single bottle replaces your entire traditional routine—giving you 70% less clutter and 100% more potency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT COLLECTION SHOWCASE */}
            <section id="collection" className="section-pad" style={{ backgroundColor: 'var(--ch-white)' }}>
                <div className="container-fluid px-3 px-lg-5">

                    {/* Step 1: Facial Essence */}
                    <div className="row product-row align-items-center product-showcase reveal visible">
                        <div className="col-12 col-lg-6 order-1 order-lg-1 text-center">
                            <div className="product-img-wrapper">
                                <img src="/assets/image/product/O_LAMOUR_Facial_Essence.png" alt="O'Lamour Facial Essence" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 order-2 order-lg-2 px-lg-5 mt-4 mt-lg-0">
                            <div>
                                <span className="section-tag">Step 1: The Preparation</span>
                                <div className="fda-tag"><i className="bi bi-shield-check me-2"></i> FDA: NN-1000016137456</div>

                                <h2 className="section-title mb-2">Facial <span style={{ color: 'var(--ch-teal)' }}>Essence</span></h2>
                                <h5 className="text-muted mb-4 fs-5" style={{ letterSpacing: '1px' }}>Triple-Solution Hybrid Toner (135ml)</h5>

                                <p className="fs-5 text-muted mb-4">A powerhouse 3-in-1 hybrid toner formulated to tone the skin and give it a healthy plump glow using medical-grade peptides and volume-boosting lipids.</p>

                                <ul className="job-list">
                                    <li><span className="job-title">Job 1: Advanced Toner</span> Balances pH and refines skin texture using Damask Rose Water and Witch Hazel.</li>
                                    <li><span className="job-title">Job 2: Renewal Serum</span> Features Plant-based Epidermal Growth Factor (EGF) to signal rapid cell turnover.</li>
                                    <li><span className="job-title">Job 3: Collagen &amp; Volume Booster</span> Infuses Hydrolyzed Collagen and Volufiline™ for an immediate "liquid filler" plumping effect.</li>
                                </ul>

                                <div className="replaces-box">
                                    <span className="section-tag text-dark mb-2"><i className="bi bi-arrow-left-right me-2" style={{ color: 'var(--ch-teal)' }}></i>Replaces 3 Clinical Steps</span>
                                    <p className="mb-0 fs-5 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>Hydrating Toner + EGF Renewal Serum + Collagen Plumper</p>
                                    <p className="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $240.00</p>
                                </div>
                                <div className="price-tag">PHP 3,000 <span>(USD $50)</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Quintessence Ampoule */}
                    <div className="row product-row align-items-center product-showcase reveal visible">
                        <div className="col-12 col-lg-6 order-1 order-lg-2 text-center">
                            <div className="product-img-wrapper">
                                <img src="/assets/image/product/O’LAMOUR_Quintessence_Ampoule.png" alt="O'Lamour Quintessence Ampoule" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 order-2 order-lg-1 px-lg-5 mt-4 mt-lg-0">
                            <div>
                                <span className="section-tag">Step 2: The Repair</span>
                                <div className="fda-tag"><i className="bi bi-shield-check me-2"></i> FDA: NN-1000015767759</div>

                                <h2 className="section-title mb-2">Quintessence <span style={{ color: 'var(--ch-teal)' }}>Ampoule</span></h2>
                                <h5 className="text-muted mb-4 fs-5" style={{ letterSpacing: '1px' }}>High-Potency Recovery Booster</h5>

                                <p className="fs-5 text-muted mb-4">
                                    A premium "recovery booster" acting as a bridge between scientific regenerative medicine &amp; luxury skincare.{' '}
                                    <strong className="text-danger bg-danger-subtle px-2 py-1 rounded d-inline-block mt-2 mt-md-0">
                                        <i className="bi bi-snow2 me-1"></i>Requires Refrigeration
                                    </strong>.
                                </p>

                                <ul className="job-list">
                                    <li><span className="job-title">Job 1: Intensive DNA Repair</span> Powered by 10,000 ppm PDRN (Sodium DNA) from Japan to heal micro-damage and thicken the dermal layer.</li>
                                    <li><span className="job-title">Job 2: Clinical Brightening</span> Utilizes Niacinamide and 12X Plant Extracts to target hyperpigmentation.</li>
                                    <li><span className="job-title">Job 3: Longevity Booster</span> Acts as a cellular Sirtuin activator, slowing biological aging for youthful bounce.</li>
                                </ul>

                                <div className="replaces-box">
                                    <span className="section-tag text-dark mb-2"><i className="bi bi-arrow-left-right me-2" style={{ color: 'var(--ch-teal)' }}></i>Replaces 3 Clinical Steps</span>
                                    <p className="mb-0 fs-5 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>10k ppm PDRN Repair + DNA Recovery + Brightening Serum</p>
                                    <p className="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $365.00</p>
                                </div>
                                <div className="price-tag">PHP 3,300 <span>(USD $55)</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: CoreLaCrème */}
                    <div className="row product-row align-items-center product-showcase reveal visible">
                        <div className="col-12 col-lg-6 order-1 order-lg-1 text-center">
                            <div className="product-img-wrapper">
                                <img src="/assets/image/product/O’LAMOUR_CoreLaCrème.png" alt="O'Lamour CoreLaCrème" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 order-2 order-lg-2 px-lg-5 mt-4 mt-lg-0">
                            <div>
                                <span className="section-tag">Step 3: The Structure</span>
                                <div className="fda-tag"><i className="bi bi-shield-check me-2"></i> FDA: NN-1000015998559</div>

                                <h2 className="section-title mb-2">CoreLa<span style={{ color: 'var(--ch-teal)' }}>Crème</span></h2>
                                <h5 className="text-muted mb-4 fs-5" style={{ letterSpacing: '1px' }}>Ultimate Skin Architecture Solution (50g)</h5>

                                <p className="fs-5 text-muted mb-4">A medical-grade luxury moisturizer that integrates regenerative biotechnology to address deep cellular aging and loss of skin density.</p>

                                <ul className="job-list">
                                    <li><span className="job-title">Job 1: Barrier Moisturizer</span> Uses Ceramide NP and Shea Butter to seal in moisture for 24-hour hydration.</li>
                                    <li><span className="job-title">Job 2: Topical Lipid-Filler</span> Combines Volufiline™ and Copper Tripeptide-1 to physically plump hollow areas.</li>
                                    <li><span className="job-title">Job 3: Antioxidant Shield</span> Infused with Alpine Edelweiss Stem Cells as a biological filter against pollution.</li>
                                </ul>

                                <div className="replaces-box">
                                    <span className="section-tag text-dark mb-2"><i className="bi bi-arrow-left-right me-2" style={{ color: 'var(--ch-teal)' }}></i>Replaces 3 Clinical Steps</span>
                                    <p className="mb-0 fs-5 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>24H Barrier Cream + Volufiline™ Filler + Antioxidant Shield</p>
                                    <p className="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $280.00</p>
                                </div>
                                <div className="price-tag">PHP 3,600 <span>(USD $60)</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: PrimeRenew BB Cream */}
                    <div className="row product-row align-items-center product-showcase reveal visible">
                        <div className="col-12 col-lg-6 order-1 order-lg-2 text-center">
                            <div className="product-img-wrapper">
                                <img src="/assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png" alt="O'Lamour PrimeRenew BB Cream" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 order-2 order-lg-1 px-lg-5 mt-4 mt-lg-0">
                            <div>
                                <span className="section-tag">Step 4: The Shield</span>
                                <div className="fda-tag"><i className="bi bi-shield-check me-2"></i> FDA: NN-1000016078043</div>

                                <h2 className="section-title mb-2">PrimeRenew <span style={{ color: 'var(--ch-teal)' }}>BB Cream</span></h2>
                                <h5 className="text-muted mb-4 fs-5" style={{ letterSpacing: '1px' }}>SPF 50/PA++++ Tinted Sunscreen Serum</h5>

                                <p className="fs-5 text-muted mb-4">
                                    A hybrid anti-aging serum bridging the gap between high-performance sun protection and clinical anti-aging therapy.{' '}
                                    <strong className="text-danger bg-danger-subtle px-2 py-1 rounded d-inline-block mt-2 mt-md-0">
                                        <i className="bi bi-snow2 me-1"></i>Requires Refrigeration
                                    </strong>.
                                </p>

                                <ul className="job-list">
                                    <li><span className="job-title">Job 1: Broad-Spectrum Protector</span> Physical mineral defense (Titanium Dioxide, Zinc Oxide) against UVA/UVB rays.</li>
                                    <li><span className="job-title">Job 2: Breathable Foundation</span> Full, lightweight "Cloud Skin" coverage that adapts to skin tones and blurs blemishes.</li>
                                    <li><span className="job-title">Job 3: Peptide Therapy Serum</span> Actively treats wrinkles and repairs DNA damage while you wear it.</li>
                                </ul>

                                <div className="replaces-box">
                                    <span className="section-tag text-dark mb-2"><i className="bi bi-arrow-left-right me-2" style={{ color: 'var(--ch-teal)' }}></i>Replaces 3 Clinical Steps</span>
                                    <p className="mb-0 fs-5 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>SPF 50+ Protector + Full-Coverage Foundation + Peptide Therapy</p>
                                    <p className="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $205.00</p>
                                </div>
                                <div className="price-tag">PHP 2,100 <span>(USD $35)</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Complementary Step: Essence Bar */}
                    <div className="row product-row align-items-center product-showcase reveal visible" style={{ borderBottom: 'none' }}>
                        <div className="col-12 col-lg-6 order-1 order-lg-1 text-center">
                            <div className="product-img-wrapper position-relative">
                                <div className="position-absolute top-0 end-0 m-3 m-md-4 z-3">
                                    <span className="badge rounded-pill" style={{ backgroundColor: 'var(--ch-teal)', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 800, letterSpacing: '1.5px', padding: '0.6em 1.2em', fontSize: '0.85rem', boxShadow: '0 4px 15px rgba(20, 184, 166, 0.4)' }}>COMING SOON</span>
                                </div>
                                <img src="/assets/image/product/O’LAMOUR_Essence_Bar.png" alt="O'Lamour Essence Bar" style={{ maxHeight: '450px' }} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 order-2 order-lg-2 px-lg-5 mt-4 mt-lg-0">
                            <div>
                                <span className="section-tag" style={{ color: 'var(--ch-yellow-dk)' }}>Complementary Step</span>

                                <h2 className="section-title mb-2">Essence <span style={{ color: 'var(--ch-teal)' }}>Bar</span></h2>
                                <h5 className="text-muted mb-4 fs-5" style={{ letterSpacing: '1px' }}>Crafted Cleansing Bar Soap</h5>

                                <p className="fs-5 text-muted mb-4">An exquisitely crafted cleansing bar infused with a 2X AHA + BHA complex to gently cleanse and brighten the skin, creating the perfect canvas for your O'LAMOUR routine.</p>

                                <ul className="job-list">
                                    <li><span className="job-title">Refined Texture</span> Glycolic and Lactic Acids actively refine texture and enhance luminosity.</li>
                                    <li><span className="job-title">Pore Purification</span> Salicylic Acid purifies deep pores for a smoother, clearer appearance.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* VALUE PROPOSITION ROI */}
            <section className="section-pad" style={{ background: 'var(--ch-dark-slate)', color: 'white' }}>
                <div className="container reveal visible text-center px-3">
                    <span className="section-tag" style={{ color: 'var(--ch-yellow)' }}>Value Proposition</span>
                    <h2 className="section-title1 mb-5">The Ultimate <span style={{ color: 'var(--ch-teal)' }}>ROI</span> For Your Skin</h2>
                    <div className="row justify-content-center align-items-stretch g-4 mt-3">
                        <div className="col-12 col-lg-5">
                            <div className="roi-card-ola d-flex flex-column justify-content-center">
                                <h4 className="mb-3 fw-bold fs-3" style={{ color: 'var(--ch-teal)' }}>O'LAMOUR Line</h4>
                                <p className="text-muted mb-3 fs-5">4 High-Potency Products</p>
                                <h2 className="fw-bold" style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontFamily: "'Bebas Neue', sans-serif", color: 'var(--ch-dark-slate)' }}>$200</h2>
                                <p className="fs-5 mt-3 fw-bold mb-0" style={{ color: 'var(--ch-teal)' }}><i className="bi bi-clock-history me-2"></i>3-Minute Routine</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center fw-bold py-4 py-lg-0" style={{ fontSize: '3rem', fontFamily: "'Bebas Neue', sans-serif", color: 'var(--ch-yellow)' }}>
                            VS
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="roi-card-standard d-flex flex-column justify-content-center">
                                <h4 className="text-white-50 mb-3 fw-bold fs-3">Standard Luxury</h4>
                                <p className="text-white-50 mb-3 fs-5">12 Individual Products</p>
                                <h2 className="fw-bold text-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', fontFamily: "'Bebas Neue', sans-serif", opacity: 0.5 }}>$1,090</h2>
                                <p className="fs-5 mt-3 text-white-50 mb-0"><i className="bi bi-hourglass-split me-2"></i>45-Minute Routine</p>
                            </div>
                        </div>
                    </div>
                    <p className="fs-5 mt-5 mx-auto text-white-50 px-3" style={{ maxWidth: '900px', lineHeight: 1.6 }}>
                        By consolidating ingredients, we eliminate filler additives. You get pure 10,000 ppm PDRN &amp; Bio-EGF without the chemical buildup of 12 different products. You aren't just paying for the name, you're paying for the concentration that makes 8 other products redundant.
                    </p>
                </div>
            </section>

            {/* HERO INGREDIENTS */}
            <section className="section-pad" style={{ backgroundColor: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 pb-3 px-3">
                        <span className="section-tag">Hero Ingredients</span>
                        <h2 className="section-title mb-3">Clinical Bio-Tech <span style={{ color: 'var(--ch-teal)' }}>Meets</span> Botanical Prestige</h2>
                        <p className="fs-5 text-muted">The core science powering the O'LAMOUR standard.</p>
                    </div>
                    <div className="row g-4 justify-content-center px-3">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-dna mb-4" style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>PDRN <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Sodium DNA)</span></h4>
                                <p className="fs-6 text-muted mb-0">Sourced from Japan, this bio-active compound mimics human DNA to trigger deep cellular regeneration, visibly boosting collagen and elastin synthesis.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-leaf mb-4" style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>Plant-EGF <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Youth Protein)</span></h4>
                                <p className="fs-6 text-muted mb-0">A polypeptide that acts as a molecular switch, signaling the skin to speed up cell turnover and repair the barrier with ultimate biocompatibility.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-droplet mb-4" style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>Volufiline™ <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Topical Filler)</span></h4>
                                <p className="fs-6 text-muted mb-0">Known as topical lipofilling. It promotes lipid storage in adipocytes (fat cells), leading to a visible plumping effect in areas prone to sagging.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-mountain mb-4" style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>Alpine Edelweiss <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Plant Stem Cell)</span></h4>
                                <p className="fs-6 text-muted mb-0">A survivalist plant stem cell offering 2x the antioxidant power of Vitamin C, clinically improving skin density and providing a visible lifting effect.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRY OVERVIEW / MARKET INSIGHTS */}
            <section className="section-pad" style={{ background: 'var(--ch-white)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Industry Overview</span>
                        <h2 className="section-title mb-3">Skincare Market <span style={{ color: 'var(--ch-teal)' }}>Insights</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            We arm our partners with social currency: the kind of facts, trends, and data that make a product naturally authoritative.
                        </p>
                    </div>
                    <div className="row g-4 px-3">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Salmon DNA / PDRN Craze</div>
                                <p className="text-muted mb-3"><strong>The Fact:</strong> PDRN is often called "The Secret of the Stars" in Korea. It was originally used in medicine to heal scars and regenerate tendons before it became a skincare gold standard.</p>
                                <p className="text-muted mb-0"><strong>The Angle:</strong> The Quintessence Ampoule uses PDRN from Japan, known for the highest purity standards in the world. It's essentially "liquid gold" for skin healing.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Medicalization of Beauty</div>
                                <p className="text-muted mb-3"><strong>The Trend:</strong> Consumers are moving away from fluff skincare toward Dermocosmetics. They want products that look like they belong in a doctor's office.</p>
                                <p className="text-muted mb-0"><strong>The Angle:</strong> O'LAMOUR fits the Clinical-Chic aesthetic. The requirement for refrigeration proves the ingredients are active and potent, not just shelf-stable chemicals.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> Glass Skin vs. Cloud Skin</div>
                                <p className="text-muted mb-3"><strong>The Trend:</strong> While Glass Skin (dewy) was the old goal, the new trend is about Cloud Skin—skin that looks bouncy, blurred, and lit from within.</p>
                                <p className="text-muted mb-0"><strong>The Angle:</strong> The PrimeRenew BB Cream is the perfect tool for this. It provides the blur of a filter while Copper Tripeptides work underneath to create actual biological bounce.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Survivalist Flower</div>
                                <p className="text-muted mb-3"><strong>The Fact:</strong> The Alpine Edelweiss (in CoreLaCrème) grows in extreme altitudes under intense UV radiation and freezing temperatures. It produces its own leontopodic acid to survive.</p>
                                <p className="text-muted mb-0"><strong>The Angle:</strong> This is a "Resilience in a Jar." If this plant can survive the Swiss Alps, its stem cells can protect your skin from harsh city pollution &amp; UV rays.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> Non-Invasive Lipofilling</div>
                                <p className="text-muted mb-3"><strong>The Fact:</strong> There is a growing anti-filler movement where people want volume without needles or injections.</p>
                                <p className="text-muted mb-0"><strong>The Angle:</strong> Volufiline™ is a topical lipid-filler. Highlight that it's clinically studied to increase the volume of fatty tissue in the skin, naturally filling hollow areas.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Blue Light Defense</div>
                                <p className="text-muted mb-3"><strong>The Trend:</strong> Most people don't realize that screen aging (HEV light from phones/laptops) penetrates deeper into the skin than UV rays.</p>
                                <p className="text-muted mb-0"><strong>The Angle:</strong> The Quintessence Ampoule and BB Cream are Digital Shields. The PDRN and SPF 50 specifically combat the oxidative stress caused by 8+ hours of screen time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOP 3 CONSUMER OBJECTIONS */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Sales Enablement</span>
                        <h2 className="section-title mb-3">Top 3 Consumer <span style={{ color: 'var(--ch-teal)' }}>Objections</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            Data-backed answers to the most common questions from skincare skeptics.
                        </p>
                    </div>
                    <div className="row g-4 px-3 mb-5">
                        <div className="col-12 col-lg-4">
                            <div className="objection-card">
                                <h5 className="fw-bold mb-4 text-center">Price vs. Value</h5>
                                <div className="skeptic-bubble">
                                    <strong>The Skeptic's View:</strong><br />
                                    "It's too expensive compared to standard pharmacy brands."
                                </div>
                                <div className="reality-bubble">
                                    <strong className="text-dark">The O'LAMOUR Reality:</strong><br />
                                    <span className="text-dark fw-bold d-block mt-2 mb-1">Value Over Price:</span>
                                    Standard products often use "marketing levels" (trace amounts) of actives. O'LAMOUR provides 10,000 ppm PDRN, a clinical-grade concentration typically reserved for medical injectables, delivering professional results in a daily bottle.
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="objection-card">
                                <h5 className="fw-bold mb-4 text-center">Efficacy of Topicals</h5>
                                <div className="skeptic-bubble">
                                    <strong>The Skeptic's View:</strong><br />
                                    "PDRN and EGF are too large to penetrate the skin, they only work when injected."
                                </div>
                                <div className="reality-bubble">
                                    <strong className="text-dark">The O'LAMOUR Reality:</strong><br />
                                    <span className="text-dark fw-bold d-block mt-2 mb-1">Bio-Available Engineering:</span>
                                    O'LAMOUR uses Sodium DNA &amp; sh-Oligopeptide-1 (EGF) formulated with advanced delivery systems to penetrate the dermal layers. The refrigeration policy further ensures these delicate proteins remain stable and potent.
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="objection-card">
                                <h5 className="fw-bold mb-4 text-center">"Hype" Ingredients</h5>
                                <div className="skeptic-bubble">
                                    <strong>The Skeptic's View:</strong><br />
                                    "Plant stem cells are just a buzzword, they aren't 'live' cells."
                                </div>
                                <div className="reality-bubble">
                                    <strong className="text-dark">The O'LAMOUR Reality:</strong><br />
                                    <span className="text-dark fw-bold d-block mt-2 mb-1">Scientific Resilience:</span>
                                    We use Alpine Edelweiss Callus Culture Extract, which contains high concentrations of leontopodic acids. Clinical data shows these botanical extracts provide 2x the antioxidant power of Vitamin C and effectively inhibit collagen-degrading enzymes.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row px-3">
                        <div className="col-12">
                            <div className="advantage-bar">
                                <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-dark-slate)' }}>Summary of Advantage over Competition</h5>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <p className="text-muted mb-0 border-end pe-3 h-100"><strong>Concentration:</strong> 10,000 ppm PDRN vs. trace industry averages.</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-muted mb-0 border-end pe-3 h-100"><strong>Dual-Action:</strong> Products function as both high-end cosmetics and clinical treatments (EGF + Volufiline).</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-muted mb-0 h-100"><strong>Freshness:</strong> Mandatory refrigeration for the Ampoule and BB Cream ensures medical-grade stability.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE O'LAMOUR REGIMEN */}
            <section className="section-pad" style={{ background: 'var(--ch-white)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Application Guide</span>
                        <h2 className="section-title mb-3">The O'LAMOUR <span style={{ color: 'var(--ch-teal)' }}>Regimen</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            Maximize your results with our targeted morning and evening protocols.
                        </p>
                    </div>

                    <div className="row g-4 px-3 mb-5">
                        <div className="col-12 col-lg-6">
                            <div className="bg-white rounded-4 p-4 p-lg-5 border shadow-sm h-100">
                                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                                    <i className="bi bi-sun-fill fs-1 me-3" style={{ color: 'var(--ch-yellow)' }}></i>
                                    <div>
                                        <h4 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>Morning Routine: The Luminous Shield</h4>
                                        <p className="text-muted mb-0 small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Goal: Hydration, Instant Plumping, and UV Protection</p>
                                    </div>
                                </div>
                                <ul className="job-list">
                                    <li><span className="job-title">Prep with Facial Essence:</span> After cleansing, apply to a cotton pad and wipe across the face. This removes overnight debris and provides the first hit of Hydrolyzed Collagen.</li>
                                    <li><span className="job-title">Treat with Quintessence Ampoule:</span> Apply 2-3 drops. The PDRN strengthens the skin barrier against daily environmental pollutants and blue light.</li>
                                    <li><span className="job-title">Firm with CoreLaCrème:</span> Apply a thin, even layer. The Edelweiss Stem Cells act as a high-potency antioxidant shield for the day.</li>
                                    <li><span className="job-title">Protect with PrimeRenew BB Cream:</span> Spread evenly. The Copper Tripeptides work to firm your skin while the SPF 50 / PA++++ prevents photo-aging. Tip: Pat extra on blemishes instead of using heavy concealer.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="rounded-4 p-4 p-lg-5 border shadow-sm h-100 text-white" style={{ backgroundColor: 'var(--ch-dark-slate)', borderColor: '#334155' }}>
                                <div className="d-flex align-items-center mb-4 pb-3 border-bottom" style={{ borderColor: '#334155' }}>
                                    <i className="bi bi-moon-stars-fill fs-1 me-3" style={{ color: '#cbd5e1' }}></i>
                                    <div>
                                        <h4 className="fw-bold mb-1 text-white">Evening Routine: The Deep Regenerative Cycle</h4>
                                        <p className="text-white-50 mb-0 small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Goal: Intensive DNA Repair, Muscle Relaxation, and Lipid Restoration.</p>
                                    </div>
                                </div>
                                <ul className="job-list">
                                    <li style={{ color: '#cbd5e1' }}><span className="job-title text-white">Double Prep with Facial Essence:</span> After a thorough cleanse, pat the essence directly into the skin with your palms (skip the cotton pad). This allows the Idebenone and Propolis to deeply nourish the skin.</li>
                                    <li style={{ color: '#cbd5e1' }}><span className="job-title text-white">Boost with Quintessence Ampoule:</span> Use a more generous amount (4-5 drops). Since skin repair peaks at night, the PDRN works at maximum efficiency to heal micro-damage. Note: Take this cold from the fridge for a soothing, anti-inflammatory effect.</li>
                                    <li style={{ color: '#cbd5e1' }}><span className="job-title text-white">Rebuild with CoreLaCrème:</span> Massage in upward, circular motions. The Bakuchiol and Ceramides work overnight to refine texture and "architecturally" lift the facial contours.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row px-3">
                        <div className="col-12">
                            <div className="advantage-bar bg-white">
                                <h5 className="fw-bold mb-4 text-center" style={{ color: 'var(--ch-dark-slate)' }}><i className="bi bi-lightbulb text-warning me-2"></i>Expert Usage Tips</h5>
                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <h6 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)', fontSize: '0.95rem' }}>The Freshness Rule</h6>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Keep your Quintessence Ampoule and PrimeRenew BB Cream in the refrigerator after opening. This stabilizes the bio-active PDRN and Ferments.</p>
                                    </div>
                                    <div className="col-md-4 border-start border-end d-none d-md-block">
                                        <div className="px-3">
                                            <h6 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)', fontSize: '0.95rem' }}>Wait for the "Set"</h6>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Give the CoreLaCrème 60 seconds to "set" before applying the BB Cream in the morning to prevent pilling &amp; ensure a smooth, "glass skin" finish.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-md-none">
                                        <h6 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)', fontSize: '0.95rem' }}>Wait for the "Set"</h6>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Give the CoreLaCrème 60 seconds to "set" before applying the BB Cream in the morning to prevent pilling &amp; ensure a smooth, "glass skin" finish.</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)', fontSize: '0.95rem' }}>Neck Care</h6>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Apply all four products down to the décolleté. The Volufiline in the Essence and Cream is excellent for smoothing "tech-neck" lines.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DIRECT COMPARISON CHART */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Direct Comparison</span>
                        <h2 className="section-title mb-3">Value Comparison <span style={{ color: 'var(--ch-teal)' }}>Chart</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            See how our Triple-Solution Formulas stack up against traditional luxury regimens.
                        </p>
                    </div>

                    <div className="row g-4 px-3 align-items-stretch">
                        <div className="col-12 col-xl-8">
                            <div className="val-comp-grid">
                                <div className="val-comp-card">
                                    <div className="val-comp-row">
                                        <div className="val-comp-img-col">
                                            <img src="/assets/image/product/O_LAMOUR_Facial_Essence.png" alt="O'LAMOUR Facial Essence" className="img-fluid" style={{ maxHeight: '140px', width: 'auto', objectFit: 'contain' }} />
                                            <div className="val-comp-pill">USD 50 | PHP 3000</div>
                                        </div>
                                        <div className="val-comp-text-col">
                                            <div className="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                            <div className="val-comp-step">Hydrating Toner</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">EGF Renewal Serum</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">Collagen Plumper</div>
                                            <div className="val-comp-est">Estimated Luxury Retail Value</div>
                                            <div className="val-comp-price">$240.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="val-comp-card">
                                    <div className="val-comp-row">
                                        <div className="val-comp-img-col">
                                            <img src="/assets/image/product/O’LAMOUR_Quintessence_Ampoule.png" alt="O'LAMOUR Quintessence Ampoule" className="img-fluid" style={{ maxHeight: '140px', width: 'auto', objectFit: 'contain' }} />
                                            <div className="val-comp-pill">USD 55 | PHP 3300</div>
                                        </div>
                                        <div className="val-comp-text-col">
                                            <div className="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                            <div className="val-comp-step">10k ppm PDRN Repair</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">DNA Recovery</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">Brightening Serum</div>
                                            <div className="val-comp-est">Estimated Luxury Retail Value</div>
                                            <div className="val-comp-price">$365.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="val-comp-card">
                                    <div className="val-comp-row">
                                        <div className="val-comp-img-col">
                                            <img src="/assets/image/product/O’LAMOUR_CoreLaCrème.png" alt="O'LAMOUR CoreLaCrème" className="img-fluid" style={{ maxHeight: '140px', width: 'auto', objectFit: 'contain' }} />
                                            <div className="val-comp-pill">USD 60 | PHP 3600</div>
                                        </div>
                                        <div className="val-comp-text-col">
                                            <div className="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                            <div className="val-comp-step">24H Barrier Cream</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">Volufiline™ Filler</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">Antioxidant Shield</div>
                                            <div className="val-comp-est">Estimated Luxury Retail Value</div>
                                            <div className="val-comp-price">$280.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="val-comp-card">
                                    <div className="val-comp-row">
                                        <div className="val-comp-img-col">
                                            <img src="/assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png" alt="O'LAMOUR PrimeRenew BB Cream" className="img-fluid" style={{ maxHeight: '140px', width: 'auto', objectFit: 'contain' }} />
                                            <div className="val-comp-pill">USD 35 | PHP 2100</div>
                                        </div>
                                        <div className="val-comp-text-col">
                                            <div className="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                            <div className="val-comp-step">SPF 50+ Protector</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">Full-Coverage Foundation</div>
                                            <div className="val-comp-plus">+</div>
                                            <div className="val-comp-step">Peptide Therapy</div>
                                            <div className="val-comp-est">Estimated Luxury Retail Value</div>
                                            <div className="val-comp-price">$205.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-4">
                            <div className="val-data-points h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="text-center mb-3">
                                        <h6 className="fw-bold text-uppercase" style={{ color: 'var(--ch-slate-muted)', letterSpacing: '1px' }}>Total Cost Comparison</h6>
                                    </div>

                                    <div className="val-cost-box shadow-sm">
                                        <div className="val-cost-half olamour-side">
                                            <div className="best-value-badge"><i className="bi bi-star-fill me-1"></i> Best Value</div>
                                            <div className="val-cost-title">O'LAMOUR Line<br /><span>(4 Products)</span></div>
                                            <div className="val-cost-amount highlight-price">$200</div>
                                        </div>
                                        <div className="val-cost-half luxury-side">
                                            <div className="val-cost-title">Luxury Products<br /><span>(12 Products)</span></div>
                                            <div className="d-flex align-items-center justify-content-center gap-3 mt-1">
                                                <span className="luxury-vs-text">VS</span>
                                                <div className="val-cost-amount" style={{ color: '#cbd5e1' }}>$1,090.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mt-2">Additional O'LAMOUR Winning Data Points</h5>
                                    <p><strong>70% Less Clutter, 100% More Potency:</strong> By consolidating ingredients, we eliminate filler additives. You get pure 10,000 ppm PDRN &amp; Bio-EGF without the chemical buildup of 12 different products.</p>
                                    <p><strong>The Cold-Chain Freshness:</strong> Unlike mass-market brands, our mandatory refrigeration for the Ampoule and BB Cream ensures medical-grade bio-actives stay alive and effective until the last drop.</p>
                                    <p><strong>Time is Luxury:</strong> An O'LAMOUR routine takes 3 minutes, delivering the same results as a 45-minute 12-step regimen.</p>
                                    <p className="mb-0">Taking Quintessence Ampoule as example, we do not just sell a skincare solution, we offer a financial optimization too. One bottle of O'LAMOUR Quintessence contains the same Repair Load as 10 bottles of a standard pharmacy serum. When you buy O'LAMOUR, you aren't just paying for the name, you're paying for the concentration that makes 8 other products redundant. It's the ultimate ROI for your skin and your wallet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GLOBAL BUSINESS OPPORTUNITY CTA */}
            <section className="section-pad position-relative" style={{ background: 'linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%)', overflow: 'hidden' }}>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)', zIndex: 0, pointerEvents: 'none' }}></div>
                <div className="position-absolute top-0 end-0 w-100 h-100" style={{ backgroundImage: 'radial-gradient(circle at 80% -50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)', zIndex: 0, pointerEvents: 'none' }}></div>

                <div className="container reveal visible position-relative" style={{ zIndex: 1 }}>
                    <div className="row justify-content-center text-center px-3">
                        <div className="col-12 col-lg-8 col-xl-7">
                            <span className="section-tag mb-3" style={{ color: 'var(--ch-yellow)', letterSpacing: '3px' }}>Global Business Opportunity</span>

                            <h2 className="section-title1 mb-4" style={{ color: 'var(--ch-white)', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                Ready to Build Your <br /><span style={{ color: 'var(--ch-teal)' }}>Global Empire?</span>
                            </h2>

                            <p className="fs-5 mb-5 text-white-50 mx-auto" style={{ lineHeight: 1.8 }}>
                                Join a network of visionary leaders and redefine the standard of luxury skincare in your market. Step into the future of clinical biotechnology and build a limitless business.
                            </p>

                            <Link
                                href="/select-country"
                                className="btn btn-lg shadow-lg text-decoration-none"
                                style={{
                                    background: 'var(--ch-teal)',
                                    color: 'var(--ch-white)',
                                    borderRadius: '50px',
                                    fontFamily: "'Barlow', sans-serif",
                                    fontWeight: 700,
                                    padding: '1.1rem 2.5rem',
                                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                                    letterSpacing: '1px',
                                    transition: 'all 0.3s ease',
                                    border: '2px solid transparent'
                                }}
                            >
                                See How To Join <i className="bi bi-arrow-right-circle ms-2 fs-5 align-middle"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="section-pad" style={{ background: 'var(--ch-white)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Help Center</span>
                        <h2 className="section-title">Frequently Asked <span style={{ color: 'var(--ch-teal)' }}>Questions</span></h2>
                        <p className="fs-5 text-muted mt-2">Everything you need to know about the O'LAMOUR standard.</p>
                    </div>
                    <div className="row justify-content-center px-3">
                        <div className="col-12 col-lg-9">
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                                            Can O'LAMOUR products be used during the day and at night?
                                        </button>
                                    </h2>
                                    <div id="q1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, except for the PrimeRenew BB Cream, which is specifically formulated with SPF 50 for daytime protection. The Facial Essence, Quintessence Ampoule, and CoreLaCrème are designed for both morning and evening use.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                                            Do O'LAMOUR products expire?
                                        </button>
                                    </h2>
                                    <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, all O'LAMOUR products have a shelf life of 2-3 years unopened. Once opened, we recommend using them within 6-12 months for maximum efficacy.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                                            Is O'LAMOUR safe for all skin types, including sensitive skin?
                                        </button>
                                    </h2>
                                    <div id="q3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, O'LAMOUR is formulated with clean, skin-loving ingredients. However, as with any active skincare, we recommend a patch test first.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
                                            How soon will I see results?
                                        </button>
                                    </h2>
                                    <div id="q4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            While many users notice an immediate "glass skin" glow and plumping effect after the first application, clinical changes—like deep wrinkle reduction and pigmentation fading—typically become visible after 28 days of consistent use (one full skin turnover cycle).
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
