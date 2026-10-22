import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import CountryFlagMarquee from '../Components/CountryFlagMarquee';
import PartnerCarousel from '../Components/PartnerCarousel';
import TestimonialGrid from '../Components/TestimonialGrid';

export default function Home({ siteStats, products = [], partners = [], testimonials = [], reviews = [] }) {
    // Typewriter Animation for "Live Limitless"
    const textToType = "Live Limitless";
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = isDeleting ? 100 : 150;
        const timer = setTimeout(() => {
            if (!isDeleting) {
                setTypedText(textToType.substring(0, typedText.length + 1));
                if (typedText === textToType) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setTypedText(textToType.substring(0, typedText.length - 1));
                if (typedText === "") {
                    setIsDeleting(false);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [typedText, isDeleting]);

    // 12 Carousel product banners
    const carouselImages = [
        '/assets/image/product1.png',
        '/assets/image/product2.png',
        '/assets/image/product3.png',
        '/assets/image/product4.png',
        '/assets/image/product5.png',
        '/assets/image/product6.jpeg',
        '/assets/image/product7.jpeg',
        '/assets/image/product8.jpeg',
        '/assets/image/product9.jpeg',
        '/assets/image/product10.jpeg',
        '/assets/image/product11.jpeg',
        '/assets/image/product12.jpeg',
    ];
    const [activeBanner, setActiveBanner] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveBanner((prev) => (prev + 1) % carouselImages.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [carouselImages.length]);

    const prevBanner = () => {
        setActiveBanner((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
    };

    const nextBanner = () => {
        setActiveBanner((prev) => (prev + 1) % carouselImages.length);
    };

    // 18 Products matching legacy catalog exactly
    const originalProducts = [
        {
            category: 'skincare',
            title: 'Infinite Botox Serum',
            img: '/assets/image/product/INFINITE_BOTOX_SERUM.png',
            desc: 'INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract.',
            fullDesc: 'INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract, and Sakura Extract. This unique formula mimics Botox effects without the needles, smoothing fine lines, wrinkles, and blemishes while deeply hydrating your skin. Perfect for a non-invasive, age- defying solution, it delivers a youthful, radiant glow with every use.',
        },
        {
            category: 'skincare',
            title: 'INFINITE Brightening Serum',
            img: '/assets/image/product/INFINITE_Brightening_Serum.png',
            desc: 'Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract.',
            fullDesc: 'Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract. This lightweight, glow-boosting formula hydrates, evens out skin tone, and combats blemishes, leaving your complexion refreshed and radiant. Say goodbye to dullness and hello to a youthful, luminous glow.',
        },
        {
            category: 'skincare',
            title: 'INFINITE White Body Lotion',
            img: '/assets/image/product/INFINITE_White_Body_Lotion.png',
            desc: 'Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin.',
            fullDesc: 'Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin. Infused with AHA, Vitamin C, and Niacinamide, it fades dark spots, hyperpigmentation, and discoloration while promoting a radiant glow. This advanced lotion leaves your skin smoother, brighter, and more youthful, delivering visible results with every use.',
        },
        {
            category: 'skincare',
            title: 'INFINITE Glow-Up Soap',
            img: '/assets/image/product/INFINITE_Glow_Up_Soap.png',
            desc: 'Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide.',
            fullDesc: 'Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide. This powerful trio works together to brighten, even out your skin tone, and reduce dark spots and pigmentation. Perfect for tackling uneven skin tone and hyperpigmentation, it leaves your skin smoother, clearer, and radiant.',
        },
        {
            category: 'skincare',
            title: 'INFINITE Deowhite Soap',
            img: '/assets/image/product/INFINITE_Deowhite_Soap.png',
            desc: 'Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint.',
            fullDesc: 'Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint. This all-natural soap cleanses, fights odor, and cools the skin, leaving you feeling fresh and invigorated. Ideal for daily use, it combines antibacterial properties, soothing benefits, and a refreshing sensation to keep you energized all day.',
        },
        {
            category: 'skincare',
            title: 'Vida Lotus Soothing Toner',
            img: '/assets/image/product/Vida_Lotus_Soothing_Toner.png',
            desc: 'Vida Skin Lotus Soothing Toner rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin.',
            fullDesc: 'Rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin texture with its powerful moisturizing effect.',
        },
        {
            category: 'skincare',
            title: 'Vida Tone-Up Sun Serum',
            img: '/assets/image/product/Vida_Tone_Up_Sun Serum.png',
            desc: 'Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients.',
            fullDesc: 'Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients like niacinamide and glutathione. This serum helps even skin tone while delivering a radiant, glowing finish-perfect for daily wear.',
        },
        {
            category: 'skincare',
            title: 'Vida Doux Cleanser',
            img: '/assets/image/product/Vida_Doux_Cleanser.png',
            desc: 'Vida Skin Doux Cleanser\'s fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed.',
            fullDesc: 'Vida Skin Doux Cleanser\'s fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed and comfortable, yet not drying with powerful hydrating and calming properties.',
        },
        {
            category: 'skincare',
            title: 'Vida Skin Lotus Booster Ampoule',
            img: '/assets/image/product/Vida_Skin_Lotus_Booster_Ampoule.png',
            desc: 'Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening barrier.',
            fullDesc: 'Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening the skin barrier creating a firm and healthy skin.',
        },
        {
            category: 'skincare',
            title: 'Vida Skin Glow Vita Cream',
            img: '/assets/image/product/Vida_Skin_Glow_Vita_Cream.png',
            desc: 'Vida Skin Glow Vita Cream uses VIDA\'s special formula to balance healthy skin oil and moisture levels, creating healthy skin.',
            fullDesc: 'Vida Skin Glow Vita Cream uses VIDA\'s special formula to balance healthy skin oil and moisture levels, creating healthy moisturized and vitalized skin conditions.',
        },
        {
            category: 'wellness',
            title: 'Barley Pure Organic Powder',
            img: '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png',
            desc: 'A natural supplement made from 100% organic barley grass, rich in vitamins, minerals, and antioxidants.',
            fullDesc: 'A nutrient-rich superfood made from pure, organic young barley grass. Rich in antioxidants and fiber, INFINITE BARLEY supports immune health, aids digestion, promotes detoxification, and helps boost energy levels naturally.',
        },
        {
            category: 'wellness',
            title: 'INFINITE Black Coffee with Pure Organic Barley',
            img: '/assets/image/product/INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png',
            desc: 'INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with stevia.',
            fullDesc: 'INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with natural stevia for a guilt-free boost. Designed to energize between flavor and function. Enjoy a cup that satisfies your craving and elevates your daily routine.',
        },
        {
            category: 'wellness',
            title: 'White Plus Glutathione',
            img: '/assets/image/product/White_Plus_Glutathione.png',
            desc: 'Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, NAC, Vitamin C, Collagen.',
            fullDesc: 'Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, N-Acetylcysteine, Vitamin C, Collagen, and Alpha Lipoic Acid. This potent supplement detoxifies your system, neutralizes free radicals, and supports overall wellness. Boost your health and vitality with every dose for a brighter, more energized you.',
        },
        {
            category: 'o\'lamour',
            title: 'O\'Lamour Facial Essence',
            img: '/assets/image/product/O_LAMOUR_Facial_Essence.png',
            desc: 'A scientifically advanced multi-function Facial Essence designed to revitalize, and improve skin clarity.',
            fullDesc: 'Formulated with BIO E.G.F, it stimulates skin renewal. Hydrolyzed Collagen and Volufiline work in synergy and help to plump, firm and lift-the skin for a youthful complexion.',
        },
        {
            category: 'o\'lamour',
            title: 'O\'Lamour Aeterna BB Cream',
            img: '/assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png',
            desc: 'A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel.',
            fullDesc: 'A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel. Formulated with SPF 50 / PA+++ broad-spectrum protection, it shields the skin against UVA and UVB damage while preserving comfort and long-lasting wear throughtout the day.',
        },
        {
            category: 'o\'lamour',
            title: 'O\'Lamour Quintessence Ampoule',
            img: '/assets/image/product/O’LAMOUR_Quintessence_Ampoule.png',
            desc: 'A premium multi-function skincare innovation expertly formulated to help reduce the appearance of wrinkles and brighten skin.',
            fullDesc: 'A premium multi-function skincare innvation expertly formulated to help reduce the apperance of wrinkles and help brighten the skin. Powered by PDRN (Polydeoxyribonu-cleo-tide) Sodium DNA, a clinically recognized bioactive compound plus 12X plant-based essential extracts, this fast-acting ampoule works at the skin\'s foundational level to reveal a more radiant complexion.',
        },
        {
            category: 'o\'lamour',
            title: 'O\'Lamour Core La Crème',
            img: '/assets/image/product/O’LAMOUR_CoreLaCrème.png',
            desc: 'An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and EGF for youthful radiance.',
            fullDesc: 'An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and Epidermal Growth Factor (EGF) for a youthful radiance. Infused with PDRN Sodium DNA, Niacinamide, Euphorbia Cerifera, and Chamomilla Recutita, it deeply hydrates skin tone for a smoother, brighter complexion.',
        },
        {
            category: 'o\'lamour',
            title: 'O\'Lamour Essence Bar',
            isComingSoon: true,
            img: '/assets/image/product/O’LAMOUR_Essence_Bar.png',
            desc: 'An exquisitely crafted cleansing bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin.',
            fullDesc: 'An exquisitely crafted cleansin bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin. Glycolic and Lactic Acids refine texture and enhance luminosity, while Salicylic Acid puurifies pores for a smoother,cleaer apperance.',
        },
    ];

    const [activeFilter, setActiveFilter] = useState('all');
    const [modalData, setModalData] = useState(null);

    const filteredList = activeFilter === 'all'
        ? originalProducts
        : originalProducts.filter((p) => p.category === activeFilter);

    return (
        <AppLayout>
            <Head>
                <title>Infinite | Live Limitless</title>
                <link rel="stylesheet" href="/assets/css/index.css" />
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
                        background: "linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('/assets/image/bg/office.jpg') center center / cover no-repeat",
                        zIndex: 0,
                    }}
                >
                    <div className="hero-grid-lines"></div>
                </div>

                <div className="container-fluid px-3 px-lg-5 hero-content reveal visible" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-11 col-xl-10 text-center">
                            <div className="hero-eyebrow justify-content-center mx-auto mb-3">
                                <span className="dot"></span>WELCOME TO
                            </div>

                            <h1 className="hero-title">
                                <span className="bold">INFINITE</span>
                                <span className="elegant-cursive blinking-cursor" id="typewriter-text">
                                    {typedText || '\u00A0'}
                                </span>
                            </h1>

                            <p className="hero-desc mx-auto text-white mt-4" style={{ maxWidth: '800px', opacity: 0.9 }}>
                                Building limitless opportunities through leadership, premium products, and global expansion.
                            </p>
                            <Link href="/join-ph" className="btn btn-outline-light mt-4 fw-bold px-4 py-2" style={{ borderRadius: '50px' }}>
                                <i className="bi bi-play-circle me-2"></i>
                                <b>Learn More</b>
                            </Link>

                            <br /><br />
                            <br /><br />

                            <div className="container text-center mb-5 reveal visible">
                                <span className="section-tag">GLOBAL EXPANSION</span>

                                <h2 className="section-title1 fw-bold text-white">
                                    Growing Across The <span style={{ color: 'var(--ch-teal)' }}>World</span>
                                </h2>

                                <p className="hero-desc mx-auto text-white mt-4 px-3">
                                    Connecting opportunities and leaders worldwide.
                                </p>
                            </div>

                            <CountryFlagMarquee />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="section-pad">
                <div className="container-fluid px-3 px-lg-5">
                    <div className="row mb-5">
                        <div className="col-lg-6 reveal visible">
                            <span className="section-tag">Why Infinite?</span>
                            <h2 className="section-title">
                                "Build Your <span className="highlight">Future </span>Without Limits."
                            </h2>
                        </div>
                        <div className="col-lg-6 reveal visible">
                            <p className="text-muted mt-3 mt-lg-4" style={{ fontSize: '1rem', maxWidth: '600px' }}>
                                We are currently in our pioneering stage giving early partners a powerful advantage as the company prepares for international expansion. INFINITE is built for leaders, visionaries, and entrepreneurs who want to grow with a company from its foundation stage.
                            </p>
                        </div>
                    </div>

                    {/* 12 Image Carousel */}
                    <div
                        id="carouselExampleRide"
                        className="carousel slide position-relative"
                        style={{
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src={carouselImages[activeBanner]}
                                    className="d-block w-100"
                                    alt={`Product Banner ${activeBanner + 1}`}
                                    style={{
                                        width: '100%',
                                        maxHeight: '520px',
                                        objectFit: 'cover',
                                        transition: 'all 0.5s ease',
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            onClick={prevBanner}
                            aria-label="Previous"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: '15%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.8,
                            }}
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '1.5rem' }}
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            onClick={nextBanner}
                            aria-label="Next"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                width: '15%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.8,
                            }}
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '1.5rem' }}
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* 4 Mission Pillars */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-xl-10 reveal visible">
                            <div className="text-center mb-5">
                                <span className="section-tag">Why Leaders Choose INFINITE?</span>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-6 col-lg-3">
                                    <div className="mission-item flex-column text-center p-4">
                                        <div className="mission-icon mb-3 me-0">
                                            <i className="fa-solid fa-earth-americas"></i>
                                        </div>
                                        <div className="mission-text">Sustainable business opportunities</div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="mission-item flex-column text-center p-4">
                                        <div className="mission-icon mb-3 me-0">
                                            <i className="fa-solid fa-spa"></i>
                                        </div>
                                        <div className="mission-text">Premium skincare and wellness products</div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="mission-item flex-column text-center p-4">
                                        <div className="mission-icon mb-3 me-0">
                                            <i className="fa-solid fa-scale-balanced"></i>
                                        </div>
                                        <div className="mission-text">Ethical and transparent compensation programs</div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="mission-item flex-column text-center p-4">
                                        <div className="mission-icon mb-3 me-0">
                                            <i className="fa-solid fa-arrow-trend-up"></i>
                                        </div>
                                        <div className="mission-text">A platform for personal and financial growth</div>
                                    </div>
                                </div>
                                <div className="col-12 reveal visible text-center mx-auto mt-5">
                                    <Link
                                        href="/select-country"
                                        className="btn fw-bold px-5 py-3 shadow-sm text-decoration-none"
                                        style={{ backgroundColor: 'var(--ch-teal)', color: '#fff', borderRadius: '50px' }}
                                    >
                                        Join now<i className="bi bi-arrow-down ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DISCOVER OUR PRODUCTS (#menu) */}
            <section id="menu" className="section-pad bg-light">
                <div className="container-fluid px-3 px-lg-5">
                    <div className="row align-items-end mb-5">
                        <div className="col-md-6 reveal visible text-center text-md-start">
                            <span className="section-tag">Discover</span>
                            <h2 className="section-title">Our Products</h2>
                        </div>
                        <div className="col-md-6 reveal visible">
                            <div className="menu-filters justify-content-center justify-content-md-end mt-3 mt-md-0">
                                <button
                                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`filter-btn ${activeFilter === 'wellness' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('wellness')}
                                >
                                    Wellness
                                </button>
                                <button
                                    className={`filter-btn ${activeFilter === 'skincare' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('skincare')}
                                >
                                    Skincare
                                </button>
                                <button
                                    className={`filter-btn ${activeFilter === "o'lamour" ? 'active' : ''}`}
                                    onClick={() => setActiveFilter("o'lamour")}
                                >
                                    O'Lamour
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="row g-4" id="menuGrid">
                        {filteredList.map((p, idx) => (
                            <div key={idx} className="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal visible" data-category={p.category}>
                                <div className="product-card h-100 d-flex flex-column position-relative">
                                    {p.isComingSoon && (
                                        <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 3 }}>
                                            <span
                                                className="badge rounded-pill"
                                                style={{
                                                    backgroundColor: 'var(--ch-teal)',
                                                    color: '#fff',
                                                    fontFamily: "'Barlow', sans-serif",
                                                    fontWeight: 800,
                                                    letterSpacing: '1.5px',
                                                    padding: '0.6em 1.2em',
                                                    fontSize: '0.85rem',
                                                    boxShadow: '0 4px 15px rgba(20, 184, 166, 0.4)',
                                                }}
                                            >
                                                COMING SOON
                                            </span>
                                        </div>
                                    )}

                                    <div className="card-img-wrapper text-center">
                                        <img src={p.img} className="img-fluid" alt={p.title} />
                                    </div>
                                    <div className="card-body p-4 d-flex flex-column flex-grow-1">
                                        <h5 className="product-title">{p.title}</h5>
                                        <p className="product-desc flex-grow-1">{p.desc}</p>
                                        <div className="product-footer mt-3">
                                            <button
                                                type="button"
                                                className="read-more-link bg-transparent border-0 p-0"
                                                onClick={() => setModalData(p)}
                                            >
                                                Read More <i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* View Product Catalog Button */}
                        <div className="col-12 text-center mt-5 mb-3 reveal visible">
                            <a
                                href="https://t.me/+alDRLOJNgo1lZGY1"
                                target="_blank"
                                rel="noreferrer"
                                className="btn shadow-sm"
                                style={{
                                    backgroundColor: 'var(--ch-teal)',
                                    color: 'var(--ch-white)',
                                    borderRadius: '50px',
                                    padding: '8px 24px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                }}
                            >
                                <i className="bi bi-journal-text me-2"></i>View Product Catalog
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM SECTION (#team) */}
            <section id="team" className="section-pad">
                <div className="container-fluid px-3 px-lg-5">
                    <div className="row justify-content-center text-center mb-5 reveal visible">
                        <div className="col-lg-8 col-xl-6">
                            <h2 className="section-title mb-3">Meet Our Global Partners</h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem' }}>
                                A global community of passionate individuals building opportunities, inspiring growth, and living limitless together.
                            </p>
                        </div>
                    </div>

                    <PartnerCarousel partners={partners} />
                </div>
            </section>

            {/* CORPORATE HERO SECTION */}
            <section className="corporate-hero-section">
                <div className="corporate-container">
                    <div className="corporate-content">
                        <span className="corporate-badge">
                            <i className="fa-solid fa-building-shield me-2"></i>Company Profile
                        </span>
                        <h1 className="corporate-title">
                            Built on Trust.
                            <span className="gradient-text">Proven Excellence.</span>
                        </h1>
                        <h2 className="corporate-script">Infinite Possibilities</h2>
                        <p className="corporate-desc">
                            Discover the foundation of our success. Learn about our mission, explore our blogs, and verify our legitimacy as a globally recognized brand.
                        </p>
                        <Link href="/info" className="corporate-btn">
                            Read Our Story <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="corporate-image-wrapper">
                        <div className="corporate-glow-orb"></div>
                        <div className="corporate-glass-panel"></div>
                        <img
                            src="/assets/image/bg/office.jpg"
                            alt="Company Profile and Legitimacy"
                            className="corporate-img"
                            style={{ objectFit: 'cover', aspectRatio: '4/3' }}
                        />
                    </div>
                </div>
            </section>

            {/* O'LAMOUR HERO SECTION */}
            <section className="olamour-hero-section">
                <div className="olamour-container">
                    <div className="olamour-image-wrapper">
                        <div className="olamour-glow-orb"></div>
                        <div className="olamour-glass-panel"></div>
                        <img src="/assets/image/banner(1).png" alt="Olamour Premium Skincare" className="olamour-img" />
                    </div>
                    <div className="olamour-content">
                        <span className="olamour-badge">
                            <i className="fa-solid fa-sparkles me-2"></i>Premium Skincare
                        </span>
                        <h1 className="olamour-title">
                            Elevate Your Beauty with
                            <span className="gradient-text">O’LAMOUR Skincare</span>
                        </h1>
                        <h2 className="olamour-script">Glow Beyond Limits</h2>
                        <p className="olamour-desc">
                            Discover O’LAMOUR Premium Skincare — where science meets luxury for timeless beauty.
                        </p>
                        <Link href="/olamour" className="olamour-btn">
                            Explore O’LAMOUR <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* BARLEY HERO SECTION */}
            <section className="barley-hero-section">
                <div className="barley-container">
                    <div className="barley-content">
                        <span className="barley-badge">
                            <i className="fa-solid fa-leaf me-2"></i>INFINITE Wellness
                        </span>
                        <h1 className="barley-title">
                            Live Well.
                            <span className="gradient-text">Glow Naturally.</span>
                        </h1>
                        <h2 className="barley-script">Live With Strength</h2>
                        <p className="barley-desc">
                            Unlock your ultimate wellness journey with premium health &amp; beauty products designed for a better you.
                        </p>
                        <Link href="/barley" className="barley-btn">
                            Explore Infinite Barley <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="barley-image-wrapper">
                        <div className="barley-blob"></div>
                        <img src="/assets/image/Barley.png" alt="Infinite Wellness" className="barley-img" />
                    </div>
                </div>
            </section>

            {/* PRODUCTS TESTIMONY SECTION (#testimonials) */}
            <section id="testimonials" className="section-pad" style={{ backgroundColor: '#f8fafc' }}>
                <div className="container-fluid px-3 px-lg-5">
                    <div className="text-center mb-5 reveal visible">
                        <span className="section-tag">PRODUCTS TESTIMONY</span>
                        <h2 className="section-title fw-bold">
                            Real Stories.{' '}
                            <span className="highlight">Real Growth.</span>{' '}
                            Real Partnerships.
                        </h2>
                        <p className="text-muted mt-3">
                            <b>See how our solutions are making a measurable difference.</b>
                        </p>
                    </div>

                    <TestimonialGrid testimonials={testimonials} reviews={reviews} />
                </div>
            </section>

            {/* PRODUCT PREVIEW MODAL */}
            {modalData && (
                <div
                    className="modal fade show"
                    id="productModal"
                    style={{
                        display: 'block',
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        zIndex: 10050,
                    }}
                    tabIndex="-1"
                    onClick={() => setModalData(null)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
                            <button
                                type="button"
                                className="btn-close position-absolute top-0 end-0 m-3 bg-white"
                                onClick={() => setModalData(null)}
                                style={{
                                    zIndex: 10,
                                    padding: '0.6rem',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                }}
                            ></button>
                            <div className="row g-0">
                                <div className="col-md-5 bg-light d-flex align-items-center justify-content-center p-4">
                                    <img
                                        src={modalData.img}
                                        id="modalImg"
                                        className="img-fluid"
                                        style={{ maxHeight: '40vh', objectFit: 'contain' }}
                                        alt={modalData.title}
                                    />
                                </div>
                                <div className="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="fw-bold mb-3" id="productModalLabel" style={{ color: 'var(--ch-dark-slate)' }}>
                                        {modalData.title}
                                    </h3>
                                    <p id="modalDesc" className="text-muted mb-4" style={{ lineHeight: 1.6 }}>
                                        {modalData.fullDesc}
                                    </p>
                                    <button
                                        type="button"
                                        className="btn w-100 fw-bold py-2 mt-auto text-white"
                                        onClick={() => setModalData(null)}
                                        style={{ backgroundColor: 'var(--ch-dark-slate)', borderRadius: '50px' }}
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
