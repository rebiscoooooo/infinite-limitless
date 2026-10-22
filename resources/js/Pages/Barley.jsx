import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Barley() {
    const variations = [
        {
            product_title: "INFINITE ROBUSTUS",
            sub_label: "BLENDED WITH STEVIA LEAVES",
            sub_title: "BLACK COFFEE WITH PURE ORGANIC BARLEY",
            bg_color: "#2f1b02",
            main_image: "/assets/image/blackco.png",
            description: "Experience the bold taste of pure Robusta beans blended with our signature organic barley. This is a guilt-free wellness ritual designed for sustained physical energy and mental clarity.",
            jobs: [
                { title: "Job 1: Zero Sugar Spike", text: "Sweetened strictly with Stevia leaves. It provides a rich taste without triggering an insulin response, making it perfectly diabetic-friendly." },
                { title: "Job 2: Fat Burning Catalyst", text: "Robusta beans contain higher levels of Chlorogenic Acid than Arabica, scientifically proven to boost resting metabolism and aid in fat loss." },
                { title: "Job 3: Acid Buffer", text: "The addition of alkaline Organic Barley neutralizes the high acidity typical of black coffee, making it exceptionally gentle on the stomach." }
            ],
            replaces: "High-Sugar Cafe Drinks + Synthetic Pre-Workouts + Acidic Instant Coffees"
        },
        {
            product_title: "INFINITE BARLEY",
            sub_label: "100% ORGANIC & HALAL CERTIFIED",
            sub_title: "PURE ORGANIC BARLEY POWDER FROM AUSTRALIA",
            bg_color: "#2d4a22",
            main_image: "/assets/image/Ley.png",
            description: "A powerhouse daily superfood packed with 70+ organic trace minerals, vital chemical precursors, and live structural enzymes harvested directly from pristine Australian farmland.",
            jobs: [
                { title: "Job 1: Cellular Anti-Aging", text: "Contains Superoxide Dismutase (S.O.D.), a critical enzyme that scientifically dismantles oxygen free radicals, slowing down cellular breakdown." },
                { title: "Job 2: Deep Blood Purifier", text: "Rich in natural Chlorophyll which acts as an internal cleanser, pulling heavy metals and toxins from the liver and bloodstream." },
                { title: "Job 3: Gut Health & Weight Control", text: "High in soluble fiber to optimize digestion, naturally lower bad cholesterol, and prevent blood sugar spikes." }
            ],
            replaces: "Synthetic Multivitamin + Fiber Supplement + Detox Teas"
        },
        {
            product_title: "WHITE PLUS GLUTATHIONE",
            sub_label: "NO APPROVED THERAPEUTIC CLAIMS",
            sub_title: "ADVANCED FORMULA WITH NAC, VIT C, COLLAGEN & ALA (30 CAPSULES)",
            bg_color: "#1E3A5F",
            main_image: "/assets/image/Plus.png",
            description: "A powerful clinical blend that works deep inside your body. It is a myth that Glutathione is only for skin whitening; it is your body's master antioxidant.",
            jobs: [
                { title: "Job 1: Liver & Toxin Defense", text: "Uses N-Acetyl Cysteine (NAC), a crucial amino acid precursor that allows your liver to synthesize massive amounts of its own intracellular glutathione." },
                { title: "Job 2: Sleep & Insomnia Support", text: "By neutralizing neuro-inflammation and regulating glutamate levels in the brain (via NAC), it calms the nervous system for deeper, higher-quality sleep." },
                { title: "Job 3: Total Skin Transformation", text: "Vitamin C, Collagen, and Alpha Lipoic Acid (ALA) work synergistically to recycle antioxidants, improve skin elasticity, and promote a radiant, even glow from within." }
            ],
            replaces: "Basic Gluta Pills + Sleep Aids + Standalone Collagen"
        }
    ];

    const barleyCategories = [
        {
            title: "Cardiovascular & Blood",
            icon: "bi-heart-pulse-fill",
            color: "#ef4444",
            bg: "rgba(239, 68, 68, 0.1)",
            items: ["Anemia", "Blood Pressure", "Cholesterol", "High Blood", "Hypertension", "Leukemia", "Stroke"]
        },
        {
            title: "Reproductive & Hormonal",
            icon: "bi-person-heart",
            color: "#ec4899",
            bg: "rgba(236, 72, 153, 0.1)",
            items: ["Breast Cancer", "Cervical Cancer", "Dysmenorrhea", "Endometriosis", "Hormonal Imbalance", "Infertility", "Irregular Menstruation", "Low Sperm Count", "Myoma", "Prostate Cancer"]
        },
        {
            title: "Digestive & Internal Organs",
            icon: "bi-activity",
            color: "#f59e0b",
            bg: "rgba(245, 158, 11, 0.1)",
            items: ["Constipation", "Detox", "Diabetes", "Gallstone", "Goiter", "Hepatitis", "Hyperacidity", "Kidney Disease", "Kidney Stones", "Liver Problem", "Thyroid Problem", "Ulcer"]
        },
        {
            title: "Immunity, Pain & General",
            icon: "bi-shield-fill-plus",
            color: "var(--ch-teal)",
            bg: "rgba(20, 184, 166, 0.1)",
            items: ["Arthritis", "Asthma", "Bronchitis", "Cancer", "Cataract", "Cyst", "Gout", "Immune Deficiency", "Insomnia", "Mental Tiredness", "Migraine", "Muscle & Nerve Pain", "Overweight", "Psoriasis", "Skin Disease/Acne", "Slow Ageing Process", "Tuberculosis", "Tumor"]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = variations[currentIndex];

    const cycleProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % variations.length);
    };

    const goToProduct = (index) => {
        setCurrentIndex(index);
    };

    return (
        <AppLayout>
            <Head>
                <title>INFINITE WELLNESS | Pure. Organic. Powerful.</title>
                <link rel="stylesheet" href="/assets/css/barley.css" />
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
                        background: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(/assets/image/Barley.png) center center / cover no-repeat',
                        zIndex: 0
                    }}
                >
                    <div className="hero-grid-lines"></div>
                </div>

                <div className="container-fluid px-3 px-lg-5 hero-content reveal visible" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-11 col-xl-10 text-center">
                            <div className="hero-eyebrow justify-content-center mx-auto mb-3">
                                <span className="dot"></span>PURE. ORGANIC. POWERFUL.
                            </div>

                            <p className="ola-script mt-2">/well-ness/</p>
                            <h1 className="ola-hero-title">INFINITE WELLNESS</h1>

                            <p className="hero-desc mx-auto text-white mt-4 px-2" style={{ maxWidth: '800px', opacity: 0.9, lineHeight: 1.8, fontSize: '1.15rem' }}>
                                Nature’s most potent ingredients engineered for modern health. Discover the synergy of 100% Organic Australian Barley, Metabolic Robustus Coffee, and Cellular-repairing White Plus Glutathione.
                            </p>

                            <a href="#collection" className="btn btn-outline-light mt-4 fw-bold px-4 py-3" style={{ borderRadius: '50px', borderWidth: '2px', letterSpacing: '1px' }}>
                                Explore The Collection <i className="bi bi-arrow-down ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOTAL SYSTEM CARE */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="row justify-content-center text-center px-3">
                        <div className="col-12 col-lg-10">
                            <span className="section-tag">Total System Care</span>
                            <h2 className="section-title mb-4">The Infinite <span style={{ color: 'var(--ch-teal)' }}>Standard</span></h2>
                            <p className="fs-5 text-muted" style={{ lineHeight: 1.8 }}>
                                We believe true wellness isn't achieved by masking symptoms, but by repairing the body at a cellular level. Every product in the Infinite line is formulated with a <strong>Multi-Action Synergy</strong>. By addressing detox, energy, and cellular repair simultaneously, our simple 3-product system replaces your entire supplement cabinet—giving you less clutter and 100% more potency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT CATALOGUE INTERACTIVE SHOWCASE */}
            <section id="collection" className="section-pad" style={{ background: '#f8fafc' }}>
                <div className="container-fluid px-3 px-xl-5">
                    <div className="text-center mb-5">
                        <span className="section-tag" style={{ color: '#5eead4' }}>Product Catalogue</span>
                        <h2 className="section-title text-var(--ch-dark-slate)">Discover Our Formulations</h2>
                    </div>

                    <div
                        className="product-card-modern"
                        id="main-container"
                        style={{ backgroundColor: currentItem.bg_color, transition: 'background-color 0.5s ease' }}
                    >
                        <div className="card-body-modern">
                            {/* Left Column */}
                            <div className="left-column-modern">
                                <div className="badge-modern" id="badge-label">{currentItem.sub_label}</div>
                                <h1 id="main-title">{currentItem.product_title}</h1>
                                <div className="product-subtitle-modern" id="main-subtitle">{currentItem.sub_title}</div>

                                <p className="main-description-modern" id="main-desc">
                                    {currentItem.description}
                                </p>

                                <div className="thumb-section-title-modern">SELECT PRODUCT</div>
                                <div className="thumbnail-row-modern">
                                    {variations.map((variant, index) => (
                                        <div
                                            key={index}
                                            className={`thumb-box-modern ${index === currentIndex ? 'active' : ''}`}
                                            id={`thumb-${index}`}
                                            style={{ backgroundImage: `url('${variant.main_image}')` }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goToProduct(index);
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {/* Center Column */}
                            <div className="center-column-modern" onClick={cycleProduct} style={{ cursor: 'pointer' }}>
                                <img
                                    id="product-pouch"
                                    className="pouch-img-modern"
                                    src={currentItem.main_image}
                                    alt="Product Pouch"
                                    style={{ transition: 'all 0.3s ease' }}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="right-column-modern">
                                <div id="jobs-wrapper-modern">
                                    {currentItem.jobs.map((job, idx) => (
                                        <div key={idx} className="job-item-modern">
                                            <div className="job-title-modern">{job.title}</div>
                                            <div className="job-text-modern">{job.text}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="replaces-box-modern">
                                    <div className="replaces-title-modern">⚡ REPLACES 3 HARMFUL HABITS</div>
                                    <div className="replaces-content-modern" id="replaces-text-modern">
                                        {currentItem.replaces}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HERO INGREDIENTS */}
            <section id="ingredients" className="section-pad" style={{ backgroundColor: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 pb-3 px-3">
                        <span className="section-tag">Hero Ingredients</span>
                        <h2 className="section-title mb-3">Powered By <span style={{ color: 'var(--ch-teal)' }}>Science</span></h2>
                        <p className="fs-5 text-muted">The clinical bio-actives driving the Infinite Wellness standard.</p>
                    </div>
                    <div className="row g-4 justify-content-center px-3">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-leaf mb-4" style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>
                                    S.O.D. <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Superoxide Dismutase)</span>
                                </h4>
                                <p className="fs-6 text-muted mb-0">Found heavily in young Barley leaves, this powerful enzyme is the body’s first line of defense against the most dangerous free radicals, vastly outperforming basic vitamins.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-mug-hot mb-4" style={{ fontSize: '3rem', color: 'var(--ch-yellow-dk)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>
                                    Robusta <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Chlorogenic Acid)</span>
                                </h4>
                                <p className="fs-6 text-muted mb-0">Contains almost double the antioxidants and caffeine of Arabica. Its high Chlorogenic Acid content actively slows carbohydrate absorption and burns fat.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-capsules mb-4" style={{ fontSize: '3rem', color: '#db2777' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>
                                    NAC <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(N-Acetyl Cysteine)</span>
                                </h4>
                                <p className="fs-6 text-muted mb-0">Oral glutathione is poorly absorbed. NAC acts as the crucial building block that easily enters cells, instructing your liver to synthesize its own master antioxidants.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                                <i className="fa-solid fa-network-wired mb-4" style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '1px' }}>
                                    ALA <br /><span className="fs-6 text-muted font-monospace" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: 0 }}>(Alpha Lipoic Acid)</span>
                                </h4>
                                <p className="fs-6 text-muted mb-0">A unique antioxidant that is both fat and water-soluble, allowing it to enter all parts of the cell to protect DNA and effectively recycle used Vitamin C and Glutathione.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONDITIONS RESPONSIVE TO BARLEY */}
            <section id="conditions" className="section-pad" style={{ background: 'var(--ch-white)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Healing Potential</span>
                        <h2 className="section-title mb-3">Conditions Responsive to <span style={{ color: 'var(--ch-teal)' }}>Barley</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            Powered by <strong>68 micronutrients</strong> found in pure organic barley, supporting the body's natural ability to heal and restore balance.
                        </p>
                    </div>

                    <div className="row g-4 px-3">
                        {barleyCategories.map((category, idx) => (
                            <div key={idx} className="col-12 col-lg-6">
                                <div className="condition-card">
                                    <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                                        <div className="condition-icon-wrapper me-3 shadow-sm" style={{ color: category.color, background: category.bg }}>
                                            <i className={`bi ${category.icon}`}></i>
                                        </div>
                                        <h4 className="fw-bold mb-0" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Barlow', sans-serif", letterSpacing: '0.5px', fontSize: '1.3rem' }}>
                                            {category.title}
                                        </h4>
                                    </div>
                                    <ul className="condition-list">
                                        {category.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <i className="bi bi-check-circle-fill me-2" style={{ color: category.color }}></i>
                                                <span className="fw-medium">{item.toUpperCase()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badges */}
                    <div className="row justify-content-center px-3 mt-5 pt-3">
                        <div className="col-12">
                            <div
                                className="bg-white rounded-4 p-4 p-md-5 shadow-sm border border-light d-flex flex-wrap justify-content-around align-items-center gap-4 text-center"
                                style={{ backgroundImage: 'linear-gradient(to right, rgba(20, 184, 166, 0.02), rgba(20, 184, 166, 0.05))' }}
                            >
                                <div className="px-2">
                                    <i className="bi bi-shield-check fs-2 mb-2" style={{ color: 'var(--ch-teal)', filter: 'drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2))' }}></i>
                                    <div className="small fw-bolder mt-1" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Barlow', sans-serif", letterSpacing: '1px' }}>100% ORGANIC</div>
                                </div>
                                <div className="px-2">
                                    <i className="bi bi-patch-check fs-2 mb-2" style={{ color: 'var(--ch-teal)', filter: 'drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2))' }}></i>
                                    <div className="small fw-bolder mt-1" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Barlow', sans-serif", letterSpacing: '1px' }}>HALAL CERTIFIED</div>
                                </div>
                                <div className="px-2">
                                    <i className="bi bi-lightning-charge fs-2 mb-2" style={{ color: 'var(--ch-teal)', filter: 'drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2))' }}></i>
                                    <div className="small fw-bolder mt-1" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Barlow', sans-serif", letterSpacing: '1px' }}>NATURAL DETOXIFIER</div>
                                </div>
                                <div className="px-2">
                                    <i className="bi bi-heart-pulse fs-2 mb-2" style={{ color: 'var(--ch-teal)', filter: 'drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2))' }}></i>
                                    <div className="small fw-bolder mt-1" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Barlow', sans-serif", letterSpacing: '1px' }}>SUPPORTS IMMUNITY</div>
                                </div>
                                <div className="px-2">
                                    <i className="bi bi-droplet fs-2 mb-2" style={{ color: 'var(--ch-teal)', filter: 'drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2))' }}></i>
                                    <div className="small fw-bolder mt-1" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Barlow', sans-serif", letterSpacing: '1px' }}>RICH IN NUTRIENTS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WELLNESS EDUCATION / INSIGHTS */}
            <section id="insights" className="section-pad" style={{ background: 'var(--ch-white)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Wellness Education</span>
                        <h2 className="section-title mb-3">Understanding Your <span style={{ color: 'var(--ch-teal)' }}>Body</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            We arm our community with the biological facts that make our formulations naturally authoritative.
                        </p>
                    </div>
                    <div className="row g-4 px-3">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Sugar Spike Trap</div>
                                <p className="text-muted mb-3"><strong>The Problem:</strong> Most instant coffees use white sugar or artificial creamers, spiking insulin, storing fat, and causing severe afternoon energy crashes.</p>
                                <p className="text-muted mb-0"><strong>The Solution:</strong> Robustus uses Stevia. It provides zero glycemic impact. You retain steady physical energy and keep your body in a fat-burning state all day.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Acidic Coffee Dilemma</div>
                                <p className="text-muted mb-3"><strong>The Problem:</strong> Coffee drinkers often suffer from acid reflux, bloating, or stomach pain due to the high acidity of poorly processed beans.</p>
                                <p className="text-muted mb-0"><strong>The Solution:</strong> The pure organic barley in Robustus acts as an alkaline buffer. It neutralizes the stomach environment, giving you the focus of coffee with the comfort of tea.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="insight-card">
                                <div className="insight-badge"><i className="bi bi-search text-secondary"></i> The Whitening Myth</div>
                                <p className="text-muted mb-3"><strong>The Problem:</strong> The market treats Glutathione strictly as a cosmetic whitening pill, ignoring its primary biological function.</p>
                                <p className="text-muted mb-0"><strong>The Solution:</strong> White Plus respects Glutathione as a liver defender. Skin brightening is merely a side-effect of a deeply cleansed liver and reduced internal oxidative stress.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOP 3 HEALTH MISCONCEPTIONS */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Consumer Education</span>
                        <h2 className="section-title mb-3">Top 3 Health <span style={{ color: 'var(--ch-teal)' }}>Misconceptions</span></h2>
                        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
                            Data-backed answers to the most common questions regarding supplementation.
                        </p>
                    </div>
                    <div className="row g-4 px-3 mb-5">
                        <div className="col-12 col-lg-4">
                            <div className="objection-card">
                                <h5 className="fw-bold mb-4 text-center">"I eat vegetables, I don't need Barley."</h5>
                                <div className="skeptic-bubble">
                                    <strong>The Assumption:</strong><br />
                                    "My normal diet provides enough greens and fiber for my body to detox naturally."
                                </div>
                                <div className="reality-bubble">
                                    <strong className="text-dark">The Infinite Reality:</strong><br />
                                    <span className="text-dark fw-bold d-block mt-2 mb-1">Soil Depletion:</span>
                                    Modern agriculture has severely depleted soil minerals. Infinite Barley is grown in pristine Australian soil and harvested specifically at the "young leaf" stage—when trace minerals, chlorophyll, and amino acids are at their absolute peak concentration, far exceeding standard grocery vegetables.
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="objection-card">
                                <h5 className="fw-bold mb-4 text-center">"Coffee makes me palpitate."</h5>
                                <div className="skeptic-bubble">
                                    <strong>The Assumption:</strong><br />
                                    "I avoid strong coffee because it gives me jitters, anxiety, and an upset stomach."
                                </div>
                                <div className="reality-bubble">
                                    <strong className="text-dark">The Infinite Reality:</strong><br />
                                    <span className="text-dark fw-bold d-block mt-2 mb-1">The Clean Energy Matrix:</span>
                                    Palpitations are often caused by sugar spikes combined with synthetic caffeine. Robustus uses natural Robusta caffeine balanced with Stevia (no sugar spike) and alkaline Barley (soothes the stomach). This creates a steady, focused "clean energy" release without the harsh physiological crash.
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="objection-card">
                                <h5 className="fw-bold mb-4 text-center">"Glutathione pills don't work for me."</h5>
                                <div className="skeptic-bubble">
                                    <strong>The Assumption:</strong><br />
                                    "I've tried standard glutathione capsules before and didn't see any improvement in my skin or energy."
                                </div>
                                <div className="reality-bubble">
                                    <strong className="text-dark">The Infinite Reality:</strong><br />
                                    <span className="text-dark fw-bold d-block mt-2 mb-1">The Bio-Availability Problem:</span>
                                    Plain oral glutathione gets destroyed by stomach acid. White Plus solves this by including NAC (N-Acetyl Cysteine), which survives digestion and travels to the liver, providing the exact raw materials your body needs to manufacture its own highly-absorbable Glutathione internally.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE DAILY REGIMEN */}
            <section id="regimen" className="section-pad" style={{ background: 'var(--ch-white)' }}>
                <div className="container reveal visible">
                    <div className="text-center mb-5 px-3">
                        <span className="section-tag">Application Guide</span>
                        <h2 className="section-title mb-3">The Daily <span style={{ color: 'var(--ch-teal)' }}>Regimen</span></h2>
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
                                        <h4 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>Morning: The Activation Phase</h4>
                                        <p className="text-muted mb-0 small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Goal: Detoxification, Metabolism, and Focus</p>
                                    </div>
                                </div>
                                <ul className="job-list">
                                    <li><span className="job-title">Wake Up with Infinite Barley:</span> Mix 1 scoop (or sachet) in 150ml of cold or room-temperature water. Drink on an <strong>empty stomach</strong>. The chlorophyll instantly begins flushing out toxins accumulated overnight, while the alkaline nature balances your gut pH.</li>
                                    <li><span className="job-title">Fuel Up with Robustus:</span> Replace your morning cafe drink with 1 sachet of Robustus Black Coffee mixed in hot water. The Robusta caffeine sharpens your mind for work, while the Stevia keeps your body in a low-insulin, fat-burning state until lunch.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="rounded-4 p-4 p-lg-5 border shadow-sm h-100 text-white" style={{ backgroundColor: 'var(--ch-dark-slate)', borderColor: '#334155' }}>
                                <div className="d-flex align-items-center mb-4 pb-3 border-bottom" style={{ borderColor: '#334155' }}>
                                    <i className="bi bi-moon-stars-fill fs-1 me-3" style={{ color: '#cbd5e1' }}></i>
                                    <div>
                                        <h4 className="fw-bold mb-1 text-white">Evening: The Recovery Phase</h4>
                                        <p className="text-white-50 mb-0 small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Goal: Liver Repair, Deep Sleep, and Cellular Anti-Aging</p>
                                    </div>
                                </div>
                                <ul className="job-list">
                                    <li style={{ color: '#cbd5e1' }}><span className="job-title text-white">Repair with White Plus:</span> Take 1-2 capsules of White Plus Glutathione 30 minutes before bed. During the night, your liver does its heaviest detox work. The NAC and ALA provide the biological tools to repair cellular damage from daily pollution.</li>
                                    <li style={{ color: '#cbd5e1' }}><span className="job-title text-white">Sleep Optimization:</span> By reducing neuro-inflammation, the formulation actively calms the brain, promoting faster sleep onset and allowing you to wake up feeling refreshed and looking radiant.</li>
                                </ul>
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
                                Ready to Build Your <br /><span style={{ color: 'var(--ch-teal)' }}>Wellness Empire?</span>
                            </h2>

                            <p className="fs-5 mb-5 text-white-50 mx-auto" style={{ lineHeight: 1.8 }}>
                                Join a network of visionary leaders and redefine the standard of health in your market. Step into the future of biological nutrition and build a limitless business.
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
                        <p className="fs-5 text-muted mt-2">Everything you need to know about the Infinite Wellness standard.</p>
                    </div>
                    <div className="row justify-content-center px-3">
                        <div className="col-12 col-lg-9">
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                                            Can I drink Infinite Barley with hot water?
                                        </button>
                                    </h2>
                                    <div id="q1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            No, it is highly recommended to mix Infinite Barley with cold or room-temperature water. Hot water can destroy the delicate, live enzymes (like S.O.D.) and diminish the product's nutritional potency.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                                            Are these products safe for pregnant or nursing women?
                                        </button>
                                    </h2>
                                    <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            While Infinite Barley is 100% organic and generally safe as a whole food, we always advise pregnant or nursing women to consult their healthcare provider before adding any new supplement (including Robustus and White Plus) to their routine.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                                            Is Robustus coffee safe for people with acid reflux (GERD)?
                                        </button>
                                    </h2>
                                    <div id="q3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, many users with sensitive stomachs tolerate Robustus very well. The infusion of pure organic barley acts as a natural alkaline buffer, significantly reducing the acidity usually associated with black coffee.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
                                            How soon will I see results from White Plus Glutathione?
                                        </button>
                                    </h2>
                                    <div id="q4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Many users notice improved sleep quality and higher energy levels within the first week due to the liver detoxifying effects of NAC. Visible skin brightening and evening of tone typically require 4 to 8 weeks of consistent daily use, as skin cells take time to turn over.
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
