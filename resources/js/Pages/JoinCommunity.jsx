import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppNavbar from '../Components/AppNavbar';
import AppFooter from '../Components/AppFooter';

// Helper to ensure country names render in clean Title Case for Great Vibes cursive
const toTitleCase = (str = '') =>
    str
        .toLowerCase()
        .split(' ')
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
        .join(' ');

export default function JoinCommunity({ country = {}, packages = {}, earningWays = [] }) {
    const [selectedPackageType, setSelectedPackageType] = useState('executive'); // 'executive' or 'regular'
    const [selectedLeader, setSelectedLeader] = useState(null);
    const [activePkgModal, setActivePkgModal] = useState(null);

    const countryName = country?.name || 'Philippines';
    const countryCurrency = country?.currency || 'PHP';

    // Typewriter effect using Title Case to match Home.jsx ("Live Limitless") cursive script
    const [typewriterIndex, setTypewriterIndex] = useState(0);
    const [currentPhrase, setCurrentPhrase] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const formattedCountry = toTitleCase(countryName);
        const phrases = [
            formattedCountry,
            'Global Enterprise',
            'Infinite Community',
            'Live Limitless',
        ];
        const fullPhrase = phrases[typewriterIndex % phrases.length];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
                if (currentPhrase.length + 1 === fullPhrase.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
                if (currentPhrase.length === 0) {
                    setIsDeleting(false);
                    setTypewriterIndex((prev) => prev + 1);
                }
            }
        }, isDeleting ? 75 : 140);

        return () => clearTimeout(timer);
    }, [currentPhrase, isDeleting, typewriterIndex, countryName]);

    const leaderData = {
        willy: {
            name: 'Willy Q. Tee Ten',
            role: 'Chairman WQT',
            text: "Mr. Tee Ten, also known as WQT, is a respected Filipino business leader and President of AUTOHUB GROUP. With over 40 years of experience, he built one of the country's leading automotive empires, managing 22 multinational brands, more than 85 dealer branches, and over 2,000 employees nationwide. He also plays a major role in the automotive industry as President of the Philippine Automotive Dealers Association and the Electric Vehicle Association of the Philippines. Known for his achievements and leadership, he earned Top 2 in the 1985 Chemical Engineering Board Exams and received several prestigious awards and recognitions in the motoring and business industries.",
            image: '/assets/image/Willy.png',
        },
        owee: {
            name: 'Norwejann “Owee” Cruz',
            role: 'President',
            text: "Ms. Cruz is a skilled business leader and creative executive known for driving the success of INFINITE Group through her strong leadership and extensive industry experience. She currently serves as the Chief Marketing Officer and Head of Fleet Sales of AUTOHUB GROUP, General Manager of GAC's flagship store in BGC, Managing Director of ODV Creative Media Inc., and President of Two Scents International Corporation. With over 20 years of experience in marketing and public relations, she is recognized for her innovation, strategic leadership, and business growth expertise. She is also an alumna of the University of the Philippines, an internationally certified Color Analyst, and a respected BNI Elite Network Leader and Gold Club Member.",
            image: '/assets/image/owee.png',
        },
        anne: {
            name: 'Joanne Reyes',
            role: 'Founder and Director',
            text: 'Ms. Reyes is the youngest partner of INFINITE Group, recognized for her creative mindset, people-centered leadership, and passion for collaboration and innovation. She currently serves as the Treasurer of Cimplex Solutions, Inc. while pursuing her entrepreneurial and creative interests. With more than ten years of experience in network marketing and five years as a professional performer under the Viva Artist Agency, she has developed strong communication and leadership skills. She is also an alumna of the Philippine School of Interior Design and Mapúa University.',
            image: '/assets/image/anne.png',
        },
    };

    const currentPackageList = packages[selectedPackageType] || [];

    const flags = [
        { name: "COTE D'IVOIRE", img: '/assets/image/flags/cote.png' },
        { name: 'CAMEROON', img: '/assets/image/flags/cameroon.png' },
        { name: 'DEMOCRATIC REPUBLIC OF CONGO', img: '/assets/image/flags/dc.png' },
        { name: 'PAPUA NEW GUINEA', img: '/assets/image/flags/pp.png' },
        { name: 'SOUTH AFRICA', img: '/assets/image/flags/sa.png' },
        { name: 'TOGO', img: '/assets/image/flags/tg.png' },
        { name: 'UGANDA', img: '/assets/image/flags/ug.png' },
        { name: "COTE D'IVOIRE", img: '/assets/image/flags/cote.png' },
        { name: 'CAMEROON', img: '/assets/image/flags/cameroon.png' },
        { name: 'DEMOCRATIC REPUBLIC OF CONGO', img: '/assets/image/flags/dc.png' },
        { name: 'PAPUA NEW GUINEA', img: '/assets/image/flags/pp.png' },
        { name: 'SOUTH AFRICA', img: '/assets/image/flags/sa.png' },
        { name: 'TOGO', img: '/assets/image/flags/tg.png' },
        { name: 'UGANDA', img: '/assets/image/flags/ug.png' },
    ];

    return (
        <div
            className="join-community-page"
            style={{
                backgroundColor: 'var(--ch-dark-slate, #0f172a)',
                color: '#ffffff',
                minHeight: '100vh',
                fontFamily: "'Barlow', sans-serif",
                overflowX: 'hidden',
                width: '100%',
            }}
        >
            <Head>
                <title>{`Join Community - ${countryName} | Infinite Live Limitless`}</title>
                <link rel="stylesheet" href="/assets/css/index.css" />
                <link rel="stylesheet" href="/assets/css/join-ph.css" />
                <link rel="stylesheet" href="/assets/css/join-community.css" />
            </Head>

            {/* Cross-Browser & Full-Device Responsive Styles + Identical Landing Page Cursive Font */}
            <style>{`
                .join-community-page *,
                .join-community-page *::before,
                .join-community-page *::after {
                    box-sizing: border-box;
                }

                /* Hero Section Responsive Spacing */
                .join-community-page #hero {
                    position: relative;
                    overflow: hidden;
                    padding-top: clamp(105px, 13vw, 150px) !important;
                    padding-bottom: clamp(60px, 8vw, 100px) !important;
                }

                /* Country Alert Pill */
                .join-community-page .country-join-banner {
                    border-radius: 1rem;
                    background: rgba(20, 184, 166, 0.14);
                    border: 1px solid rgba(20, 184, 166, 0.35);
                    color: #5eead4;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    font-size: clamp(0.875rem, 2vw, 1rem);
                    padding: 0.85rem 1.25rem;
                    margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
                }

                /* Hero Title & Identical Landing Page Cursive Styling */
                .join-community-page .hero-title {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    margin: 0 auto;
                    line-height: 1.15;
                }

                .join-community-page .hero-title .hero-subtitle {
                    display: block;
                    font-family: 'Bebas Neue', 'Barlow', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: clamp(1px, 0.4vw, 3px);
                    font-size: clamp(1.75rem, 4.8vw, 3.6rem);
                    line-height: 1.15;
                    color: #ffffff;
                    margin-bottom: 0.15rem;
                    padding: 0 0.5rem;
                }

                /* Exact match to Home.jsx / index.css .elegant-cursive */
                .join-community-page .hero-title .elegant-cursive {
                    display: inline-block !important;
                    font-family: 'Great Vibes', cursive !important;
                    font-weight: 400 !important;
                    font-style: normal !important;
                    text-transform: none !important;
                    letter-spacing: 1px !important;
                    font-size: clamp(2.8rem, 7.5vw, 5.5rem) !important;
                    line-height: 1.25 !important;
                    color: var(--ch-teal, #14b8a6) !important;
                    text-shadow: 0 4px 24px rgba(20, 184, 166, 0.35);
                    margin-top: 0.05em;
                    padding: 0.08em 0.15em;
                    min-height: 1.3em;
                    word-break: keep-all;
                }

                .join-community-page .blinking-cursor::after {
                    content: '|';
                    display: inline-block;
                    margin-left: 4px;
                    font-family: 'Barlow', sans-serif;
                    font-weight: 300;
                    color: var(--ch-teal, #14b8a6);
                    animation: jcCursorBlink 0.9s infinite;
                }

                @keyframes jcCursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                /* Country Scroll Marquee Responsiveness */
                .join-community-page .country-scroll-wrapper {
                    width: 100%;
                    max-width: 100%;
                    overflow: hidden;
                    position: relative;
                    padding: 0.75rem 0;
                }

                /* Leadership Section & Grid */
                .join-community-page .leadership-section {
                    padding: clamp(3.5rem, 7vw, 6rem) 1rem;
                }

                .join-community-page .leadership-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .join-community-page .leader-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)) !important;
                    gap: clamp(1.25rem, 3vw, 2rem) !important;
                    width: 100%;
                }

                /* Leader Modal Cross-Device Responsiveness */
                .join-community-page .custom-leader-modal {
                    padding: 1rem;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                }

                .join-community-page .custom-leader-modal .modal-box {
                    width: 100%;
                    max-width: 900px;
                    max-height: 88dvh;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: row;
                    border-radius: 1.25rem;
                }

                /* Starter Package Tiers Responsive Grid */
                .join-community-page .starter-tiers-grid {
                    display: grid;
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                    gap: 1.25rem;
                    width: 100%;
                    max-width: 1140px;
                    margin: 0 auto;
                }

                .join-community-page .package-card {
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }

                .join-community-page .package-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12) !important;
                }

                /* Accordion Button Wrapping on Small Devices */
                .join-community-page .accordion-button {
                    white-space: normal;
                    word-break: break-word;
                    line-height: 1.4;
                    font-size: clamp(0.92rem, 2vw, 1.05rem);
                }

                /* Tablet Breakpoint */
                @media (max-width: 991.98px) {
                    .join-community-page .starter-tiers-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }

                    .join-community-page .custom-leader-modal .modal-box {
                        flex-direction: column-reverse;
                        max-width: 580px;
                    }

                    .join-community-page .custom-leader-modal .modal-right img {
                        max-height: 280px;
                        width: 100%;
                        object-fit: contain;
                    }
                }

                /* Mobile Landscape & Large Phone Breakpoint */
                @media (max-width: 767.98px) {
                    .join-community-page .starter-tiers-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 1rem;
                    }

                    .join-community-page .section-pad {
                        padding-top: 3.5rem !important;
                        padding-bottom: 3.5rem !important;
                    }
                }

                /* Small Mobile Breakpoint (320px - 420px) */
                @media (max-width: 420px) {
                    .join-community-page .starter-tiers-grid {
                        grid-template-columns: 1fr;
                        max-width: 280px;
                    }

                    .join-community-page .hero-title .elegant-cursive {
                        font-size: clamp(2.35rem, 11vw, 3.1rem) !important;
                    }
                }
            `}</style>

            <AppNavbar />

            {/* HERO SECTION */}
            <section id="hero">
                <div
                    className="hero-bg"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background:
                            "linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('/assets/image/bg/11.jpeg') center center / cover no-repeat",
                        zIndex: 0,
                    }}
                >
                    <div className="hero-grid-lines"></div>
                </div>

                <div className="container-fluid px-3 px-lg-5 hero-content" style={{ position: 'relative', zIndex: 1 }}>
                    {/* ALERT BANNER */}
                    <div className="container px-0">
                        <div className="country-join-banner text-center shadow-sm mx-auto" style={{ maxWidth: '960px' }}>
                            <i className="fas fa-globe-asia me-2"></i> You are joining from:{' '}
                            <strong>
                                {countryName} ({countryCurrency})
                            </strong>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10 text-center">
                            <div className="hero-eyebrow justify-content-center mx-auto mb-3">
                                <span className="dot"></span>BECOME A PARTNER
                            </div>

                            <h1 className="hero-title">
                                <span className="hero-subtitle">BUILD A GLOBAL DIGITAL BUSINESS WITH</span>
                                <span className="elegant-cursive blinking-cursor" id="typewriter-text">
                                    {currentPhrase || '\u00A0'}
                                </span>
                            </h1>

                            <p
                                className="hero-desc mx-auto text-white mt-3 mt-md-4 px-2 px-sm-3"
                                style={{ maxWidth: '800px', opacity: 0.9, fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.7 }}
                            >
                                Unlock your potential and build a sustainable business through trusted leadership and premium products.
                            </p>

                            <div className="container text-center mt-5 mb-4 px-2">
                                <span className="section-tag d-block mb-2">GLOBAL EXPANSION</span>
                                <h2 className="fw-bold text-white" style={{ fontSize: 'clamp(1.85rem, 5vw, 3.5rem)', lineHeight: 1.2 }}>
                                    Growing Across The <span style={{ color: 'var(--ch-teal)' }}>World</span>
                                </h2>
                                <p className="hero-desc mx-auto text-white mt-3 px-2" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
                                    Connecting opportunities and leaders worldwide.
                                </p>
                            </div>

                            <div className="country-scroll-wrapper">
                                <div className="country-scroll-track">
                                    {flags.map((f, i) => (
                                        <div key={i} className="country-card" data-country={f.name}>
                                            <img src={f.img} alt={f.name} loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PILLARS OF LEADERSHIP */}
            <section className="leadership-section">
                <div className="leadership-wrapper">
                    <div className="section-tag">LEADERSHIP</div>
                    <h2 className="section-name" style={{ fontSize: 'clamp(1.85rem, 4.5vw, 3rem)' }}>
                        OUR PILLARS OF LEADERSHIP.
                    </h2>
                    <p className="section-desc">
                        INFINITE Group is guided by a formidable management team, blending decades of corporate executive expertise,
                        entrepreneurial excellence, and long-term business vision.
                    </p>

                    <div className="leader-grid">
                        <div className="leader-card">
                            <div className="leader-image">
                                <img src="/assets/image/Willy.png" alt="Willy Q. Tee Ten" loading="lazy" />
                            </div>
                            <div className="leader-content">
                                <h3 className="leader-name">Willy Q. Tee Ten</h3>
                                <div className="leader-role">Chairman WQT</div>
                                <button type="button" className="learn-btn" onClick={() => setSelectedLeader('willy')}>
                                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>

                        <div className="leader-card">
                            <div className="leader-image">
                                <img src="/assets/image/owee.png" alt="Norwejann Owee Cruz" loading="lazy" />
                            </div>
                            <div className="leader-content">
                                <h3 className="leader-name">Norwejann “Owee” Cruz</h3>
                                <div className="leader-role">President</div>
                                <button type="button" className="learn-btn" onClick={() => setSelectedLeader('owee')}>
                                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>

                        <div className="leader-card">
                            <div className="leader-image">
                                <img src="/assets/image/anne.png" alt="Joanne Reyes" loading="lazy" />
                            </div>
                            <div className="leader-content">
                                <h3 className="leader-name">Joanne Reyes</h3>
                                <div className="leader-role">Founder and Director</div>
                                <button type="button" className="learn-btn" onClick={() => setSelectedLeader('anne')}>
                                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEADER MODAL */}
            {selectedLeader && (
                <div
                    className="custom-leader-modal active"
                    id="leaderModal"
                    onClick={(e) => {
                        if (e.target.id === 'leaderModal') setSelectedLeader(null);
                    }}
                >
                    <button type="button" className="close-btn" onClick={() => setSelectedLeader(null)} aria-label="Close modal">
                        &times;
                    </button>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-left">
                            <h2>{leaderData[selectedLeader].name}</h2>
                            <h4>{leaderData[selectedLeader].role}</h4>
                            <p>{leaderData[selectedLeader].text}</p>
                        </div>
                        <div className="modal-right">
                            <img src={leaderData[selectedLeader].image} alt={leaderData[selectedLeader].name} />
                        </div>
                    </div>
                </div>
            )}

            {/* LEGAL & GOVERNMENT REGISTRATIONS */}
            <section
                className="section-pad bg-light"
                id="registrations"
                style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--ch-bg-light)' }}
            >
                <div className="container">
                    <div className="row justify-content-center mb-4 text-center px-2 px-sm-3">
                        <div className="col-12 col-lg-8">
                            <span className="section-tag" style={{ color: 'var(--ch-teal)' }}>
                                REGISTRATIONS
                            </span>
                            <h2 className="section-title mb-3" style={{ color: 'var(--ch-dark-slate)' }}>
                                Our Legal and Government{' '}
                                <span className="highlight" style={{ color: 'var(--ch-teal)' }}>
                                    Registrations
                                </span>
                            </h2>
                            <p className="text-muted mt-3 mb-0" style={{ color: 'var(--ch-slate-muted)' }}>
                                <i className="fas fa-shield-alt me-2" style={{ color: 'var(--ch-teal)' }}></i> Streamline taxes and legal
                                readiness — Forward-thinking founders staying ahead of government regulations.
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center mb-4 mb-md-5 px-2 px-sm-3">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="position-relative">
                                <img
                                    src="/assets/image/30.png"
                                    alt="Legal and Government Registrations"
                                    className="img-fluid rounded-4 shadow-lg w-100"
                                    style={{ objectFit: 'cover', maxHeight: '450px', border: '4px solid #fff' }}
                                />
                                <div
                                    className="position-absolute top-0 start-0 translate-middle p-3 rounded-circle shadow-sm d-none d-md-flex align-items-center justify-content-center"
                                    style={{ background: '#fff', border: '2px solid var(--ch-bg-light)', width: '60px', height: '60px' }}
                                >
                                    <i className="fas fa-certificate fs-3" style={{ color: 'var(--ch-teal)' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO BECOME A MEMBER */}
            <section id="how-to-join" className="section-pad" style={{ backgroundColor: 'var(--ch-bg-light)' }}>
                <div className="container">
                    <div className="text-center mb-5 px-2">
                        <span className="section-tag">Join The Community</span>
                        <h2 className="section-title" style={{ color: 'var(--ch-dark-slate)' }}>
                            How to Become a <span className="highlight">Member</span>
                        </h2>
                        <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '600px', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
                            Follow these simple steps to kickstart your journey with us.
                        </p>
                    </div>

                    <div className="row g-3 g-md-4 position-relative justify-content-center">
                        {[
                            {
                                num: '01',
                                title: 'Choose Your Package',
                                desc: 'Select the package that fits your budget and business vision.',
                                icon: 'fa-solid fa-box-open',
                            },
                            {
                                num: '02',
                                title: 'Submit Information',
                                desc: 'Register your official demographic and account details.',
                                icon: 'fa-solid fa-id-card',
                            },
                            {
                                num: '03',
                                title: 'Make Your Payment',
                                desc: 'Send your payment through approved national/international gateways.',
                                icon: 'fa-solid fa-credit-card',
                            },
                            {
                                num: '04',
                                title: 'Receive Products',
                                desc: 'Products are dispatched directly to your doorstep with tracking.',
                                icon: 'fa-solid fa-truck-fast',
                            },
                        ].map((step, idx) => (
                            <div key={idx} className="col-12 col-sm-6 col-lg-3 position-relative z-1">
                                <div
                                    className="card step-card h-100 text-center shadow-sm"
                                    style={{
                                        background: '#fff',
                                        borderRadius: '1.5rem',
                                        padding: '1.75rem 1.25rem',
                                        border: '1px solid #e2e8f0',
                                    }}
                                >
                                    <div
                                        className="mx-auto mb-4 position-relative"
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'var(--ch-bg-light)',
                                            border: '2px solid var(--ch-teal)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <i className={step.icon} style={{ fontSize: '1.8rem', color: 'var(--ch-dark-slate)' }}></i>
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill shadow-sm"
                                            style={{ backgroundColor: 'var(--ch-dark-slate)', fontSize: '0.75rem', padding: '0.4em 0.6em' }}
                                        >
                                            {step.num}
                                        </span>
                                    </div>
                                    <h4 className="fw-bold mb-3" style={{ color: 'var(--ch-dark-slate)', fontSize: '1.2rem' }}>
                                        {step.title}
                                    </h4>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SELECT PACKAGE OPTION (EXECUTIVE VS REGULAR) */}
            <section id="package-options" className="section-pad bg-white">
                <div className="container">
                    <div className="text-center mb-5 px-2">
                        <span className="section-tag">Step 1</span>
                        <h2 className="section-title" style={{ color: 'var(--ch-dark-slate)' }}>
                            Select Package <span className="highlight">Option</span>
                        </h2>
                        <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '600px', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
                            Before selecting your specific product sets, choose the business path that best suits your goals. Click on the
                            card to select.
                        </p>
                    </div>

                    <div className="row justify-content-center align-items-stretch g-4 mb-4">
                        {/* EXECUTIVE CARD */}
                        <div className="col-12 col-md-6 col-lg-5">
                            <div
                                className={`card h-100 shadow-sm option-card ${selectedPackageType === 'executive' ? 'active-exec' : ''}`}
                                id="btn-exec"
                                onClick={() => setSelectedPackageType('executive')}
                                style={{
                                    cursor: 'pointer',
                                    border: selectedPackageType === 'executive' ? '2px solid var(--ch-teal)' : '1px solid #e2e8f0',
                                }}
                            >
                                <span
                                    className="position-absolute top-0 start-50 translate-middle badge rounded-pill shadow"
                                    style={{
                                        backgroundColor: 'var(--ch-teal)',
                                        zIndex: 10,
                                        padding: '0.5em 1.25em',
                                        fontSize: '0.8rem',
                                        letterSpacing: '1px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <i className="fa-solid fa-crown text-warning me-1"></i> RECOMMENDED
                                </span>
                                {selectedPackageType === 'executive' && <i className="fa-solid fa-circle-check active-check"></i>}
                                <div className="card-body p-3 p-sm-4 p-lg-5 text-center d-flex flex-column">
                                    <div className="mb-3 mb-sm-4 mt-2">
                                        <i className="fa-solid fa-gem mb-3" style={{ fontSize: '2.5rem', color: 'var(--ch-teal)' }}></i>
                                        <h3 className="fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>
                                            Executive Package
                                        </h3>
                                    </div>
                                    <ul
                                        className="list-unstyled text-start mb-0 flex-grow-1"
                                        style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#334155' }}
                                    >
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                Automatically receive an <strong style={{ color: '#0f172a' }}>EXECUTIVE BADGE</strong>.
                                            </span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                <strong style={{ color: '#0f172a' }}>O&apos;LAMOUR Premium Skincare Set</strong> Options.
                                            </span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                <strong style={{ color: '#0f172a' }}>The Big Advantage:</strong> You can earn{' '}
                                                <strong style={{ color: '#0f172a' }}>3%–19% rebates</strong> from all product and package
                                                purchases made by your entire team.
                                            </span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                <strong style={{ color: '#0f172a' }}>Additional income</strong> opportunity.
                                            </span>
                                        </li>
                                        <li className="mb-2 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                <strong style={{ color: '#0f172a' }}>Full business</strong> benefits.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* REGULAR CARD */}
                        <div className="col-12 col-md-6 col-lg-5">
                            <div
                                className={`card h-100 shadow-sm option-card ${selectedPackageType === 'regular' ? 'active-reg' : ''}`}
                                id="btn-reg"
                                onClick={() => setSelectedPackageType('regular')}
                                style={{
                                    cursor: 'pointer',
                                    border: selectedPackageType === 'regular' ? '2px solid var(--ch-dark-slate)' : '1px solid #e2e8f0',
                                }}
                            >
                                {selectedPackageType === 'regular' && <i className="fa-solid fa-circle-check active-check"></i>}
                                <div className="card-body p-3 p-sm-4 p-lg-5 text-center d-flex flex-column">
                                    <div className="mb-3 mb-sm-4 mt-2">
                                        <i
                                            className="fa-solid fa-box mb-3"
                                            style={{ fontSize: '2.5rem', color: 'var(--ch-slate-muted)' }}
                                        ></i>
                                        <h3 className="fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>
                                            Regular Package
                                        </h3>
                                    </div>
                                    <ul
                                        className="list-unstyled text-start mb-0 flex-grow-1"
                                        style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#334155' }}
                                    >
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>The price is lower and comes with standard products.</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>Same core earning opportunities.</span>
                                        </li>
                                        <li className="mb-3 d-flex align-items-start">
                                            <i className="bi bi-x-circle-fill text-danger me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                Does <strong style={{ color: '#0f172a' }}>not</strong> include the PREMIUM SKINCARE set.
                                            </span>
                                        </li>
                                        <li className="mb-2 d-flex align-items-start">
                                            <i className="bi bi-info-circle-fill text-primary me-3 mt-1 fs-5 flex-shrink-0"></i>
                                            <span>
                                                All other earnings are the same, but you will{' '}
                                                <strong style={{ color: '#0f172a' }}>not be eligible</strong> to earn the 3%–19% rebates
                                                from your team&apos;s purchases unless you upgrade.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div
                                className="alert shadow-sm border-0 d-flex flex-column flex-sm-row align-items-center text-center text-sm-start p-3 p-sm-4"
                                style={{
                                    backgroundColor: 'var(--ch-bg-light)',
                                    borderLeft: '5px solid var(--ch-teal)',
                                    borderRadius: '1rem',
                                }}
                            >
                                <i
                                    className="fa-solid fa-circle-exclamation mb-2 mb-sm-0 me-sm-4 flex-shrink-0"
                                    style={{ fontSize: '2rem', color: 'var(--ch-teal)' }}
                                ></i>
                                <div style={{ fontSize: '0.95rem', color: 'var(--ch-dark-slate)', lineHeight: 1.5 }}>
                                    <strong>Please Note:</strong> Once you upgrade from a Regular to an Executive package, the rebates are{' '}
                                    <strong>not retroactive</strong> for previous purchases and points already generated by your Executive
                                    members. It serves as an additional way for you to earn more income moving forward.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STEP 2: CHOOSE YOUR STARTER PACKAGE TIERS */}
            <section id="tier-selection" className="section-pad pt-0 bg-white">
                <div className="container border-top pt-5">
                    <div className="text-center mb-5 px-2">
                        <span className="section-tag" id="dynamic-tier-tag">
                            Step 2: {selectedPackageType === 'executive' ? 'Executive Package' : 'Regular Package'}
                        </span>
                        <h2 className="section-title" style={{ color: 'var(--ch-dark-slate)' }}>
                            Choose Your <span className="highlight">Starter Package</span>
                        </h2>
                        <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '600px', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
                            Click on a package to view full details.
                        </p>
                    </div>

                    <div className="starter-tiers-grid tiers-container active">
                        {currentPackageList.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="card h-100 text-center border shadow-sm package-card"
                                onClick={() => setActivePkgModal(pkg)}
                                style={{
                                    borderRadius: '1.2rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    border: pkg.recommended ? '2px solid var(--ch-teal)' : '1px solid #e2e8f0',
                                    background: '#fff',
                                }}
                            >
                                {pkg.recommended && (
                                    <span
                                        className="position-absolute top-0 start-50 translate-middle badge rounded-pill shadow-sm"
                                        style={{
                                            backgroundColor: 'var(--ch-teal)',
                                            zIndex: 10,
                                            padding: '0.4em 1em',
                                            fontSize: '0.75rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Top Pick
                                    </span>
                                )}
                                <div className="card-body d-flex flex-column align-items-center justify-content-between p-3">
                                    <img
                                        src={pkg.badge}
                                        alt={pkg.tier}
                                        className="mb-3 mt-2"
                                        style={{ height: '60px', objectFit: 'contain' }}
                                    />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '1.05rem' }}>
                                            {pkg.tier}
                                        </h6>
                                        <div className="fw-bold mb-2" style={{ color: 'var(--ch-teal)', fontSize: '0.95rem' }}>
                                            {pkg.price}
                                        </div>
                                    </div>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                                        Click for details <i className="bi bi-arrow-up-right"></i>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BUSINESS PLAN / WAYS TO EARN */}
            <section
                id="png-earnings"
                className="section-pad position-relative"
                style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    color: '#0f172a',
                    overflow: 'hidden',
                }}
            >
                <div className="container position-relative z-1">
                    <div className="text-center mb-5 px-2">
                        <span className="section-tag">A Business Platform for Aspiring Global Entrepreneurs</span>
                        <h2 className="section-title" style={{ color: 'var(--ch-dark-slate)' }}>
                            {countryName} <span className="highlight">Business Plan</span>
                        </h2>
                        <p className="mt-3 mx-auto" style={{ maxWidth: '600px', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#475569' }}>
                            Discover tailored strategies, local compensation structures, and how you can establish a limitless business
                            within {countryName}.
                        </p>
                    </div>

                    <div className="row g-4 g-lg-5 align-items-start">
                        {/* LEFT: 7 ACCORDIONS */}
                        <div className="col-12 col-lg-6">
                            <div
                                className="glass-panel p-3 p-sm-4 p-md-5 h-100 bg-white rounded-4 shadow-sm border"
                                style={{ color: '#0f172a' }}
                            >
                                <h4 className="fw-bold mb-4" style={{ color: 'var(--ch-dark-slate)' }}>
                                    <i className="fa-solid fa-chart-pie me-2" style={{ color: 'var(--ch-teal)' }}></i> Ways To Earn
                                </h4>
                                <div className="accordion glass-accordion" id="accordionBusinessPlan">
                                    <div className="accordion-item mb-2 border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cOne"
                                            >
                                                <i className="fa-solid fa-cart-shopping me-3" style={{ color: 'var(--ch-teal)' }}></i> 1.
                                                Product Sales (30% Profit)
                                            </button>
                                        </h2>
                                        <div id="cOne" className="accordion-collapse collapse show" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                You earn a <strong>30% retail profit</strong> on every product you sell. There are no
                                                requirements and no monthly quotas.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-2 border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cTwo"
                                            >
                                                <i className="fa-solid fa-users-rays me-3" style={{ color: 'var(--ch-teal)' }}></i> 2.
                                                Enroller Bonus
                                            </button>
                                        </h2>
                                        <div id="cTwo" className="accordion-collapse collapse" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                You earn an Enroller Commission every time someone you personally introduce purchases a
                                                Wholesale Package. When they register, the company provides them with a FREE INFINITE Online
                                                Account.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-2 border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cThree"
                                            >
                                                <i className="fa-solid fa-layer-group me-3" style={{ color: 'var(--ch-teal)' }}></i> 3.
                                                Sales Match Bonus
                                            </button>
                                        </h2>
                                        <div id="cThree" className="accordion-collapse collapse" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                You will build two sales teams — a Left Team and a Right Team. Whenever points match on both
                                                sides, the company rewards you with an additional Sales Match Bonus on top of your direct
                                                commissions.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-2 border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cFour"
                                            >
                                                <i className="fa-solid fa-calendar-week me-3" style={{ color: 'var(--ch-teal)' }}></i> 4.
                                                Potential Weekly Income
                                            </button>
                                        </h2>
                                        <div id="cFour" className="accordion-collapse collapse" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                Your potential weekly income depends on the package level you choose and the growth of your
                                                sales organization. As you continue guiding your members, your earning potential increases
                                                weekly.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-2 border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cFive"
                                            >
                                                <i className="fa-solid fa-money-bill-wave me-3" style={{ color: 'var(--ch-teal)' }}></i> 5.
                                                Cash Bonus Incentives
                                            </button>
                                        </h2>
                                        <div id="cFive" className="accordion-collapse collapse" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                Earn extra cash bonuses with INFINITE twice a month (1st–15th and 16th–31st cut-offs) based
                                                on verified production milestones.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-2 border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cSix"
                                            >
                                                <i className="fa-solid fa-crown me-3" style={{ color: 'var(--ch-teal)' }}></i> 6. INFINITE
                                                Bonus
                                            </button>
                                        </h2>
                                        <div id="cSix" className="accordion-collapse collapse" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                Earn every time your direct leaders earn. The INFINITE Bonus rewards you with 10% to 30% of
                                                your direct leaders&apos; monthly matching check!
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item border rounded-3 overflow-hidden shadow-sm">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#cSeven"
                                            >
                                                <i className="fa-solid fa-calendar-week me-3" style={{ color: 'var(--ch-teal)' }}></i> 7.
                                                Executive Level Bonus
                                            </button>
                                        </h2>
                                        <div id="cSeven" className="accordion-collapse collapse" data-bs-parent="#accordionBusinessPlan">
                                            <div className="accordion-body">
                                                Earn rebates ranging from 3% to 19% based on your Executive Rank. This bonus is generated
                                                through your team&apos;s combined product and package sales.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: REGISTRATION PROCESS & BENEFITS */}
                        <div className="col-12 col-lg-6">
                            <div
                                className="glass-panel p-3 p-sm-4 p-md-5 mb-4 shadow-sm bg-white rounded-4 border"
                                style={{ color: '#0f172a' }}
                            >
                                <h4 className="fw-bold mb-3" style={{ color: 'var(--ch-dark-slate)' }}>
                                    <i className="fa-solid fa-list-check me-2" style={{ color: 'var(--ch-teal)' }}></i> Process of
                                    Registration
                                </h4>
                                <ol className="mb-0 ps-3" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#334155' }}>
                                    <li className="mb-2">
                                        <strong style={{ color: '#0f172a' }}>Choose Your Package:</strong> Select the option that fits your
                                        budget. Includes products and a free lifetime INFINITE account.
                                    </li>
                                    <li className="mb-2">
                                        <strong style={{ color: '#0f172a' }}>Submit Your Information:</strong> Register your official
                                        details.
                                    </li>
                                    <li className="mb-2">
                                        <strong style={{ color: '#0f172a' }}>Make Your Payment:</strong> Pay through our gateway using Bank
                                        Deposit, Wise, Debit/Credit Card, or Authorized Dealer.
                                    </li>
                                    <li className="mb-0">
                                        <strong style={{ color: '#0f172a' }}>Receive Products via DHL:</strong> Delivery typically takes 3
                                        to 7 business days with air waybill tracking.
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-white p-3 p-sm-4 rounded-4 shadow-sm border mb-4" style={{ color: '#0f172a' }}>
                                <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-dark-slate)' }}>
                                    Member Benefits
                                </h5>
                                <ul className="list-unstyled mb-0" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#334155' }}>
                                    <li className="mb-2 d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-success me-3 mt-1 flex-shrink-0"></i>
                                        <span>
                                            <strong style={{ color: '#0f172a' }}>30% Discount</strong> on all INFINITE Products.
                                        </span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-success me-3 mt-1 flex-shrink-0"></i>
                                        <span>
                                            <strong style={{ color: '#0f172a' }}>Instant Value:</strong> Product package value is higher
                                            than your investment.
                                        </span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-success me-3 mt-1 flex-shrink-0"></i>
                                        <span>
                                            <strong style={{ color: '#0f172a' }}>Personal Online Dashboard:</strong> Monitor sales, team
                                            growth, and commissions in real time.
                                        </span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-success me-3 mt-1 flex-shrink-0"></i>
                                        <span>
                                            <strong style={{ color: '#0f172a' }}>Travel &amp; Rewards:</strong> Qualify for
                                            local/international travel and leadership incentives.
                                        </span>
                                    </li>
                                    <li className="mb-0 d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-success me-3 mt-1 flex-shrink-0"></i>
                                        <span>
                                            <strong style={{ color: '#0f172a' }}>Mentorship:</strong> Access online trainings, webinars, and
                                            coaching.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <div className="bg-white p-3 p-sm-4 rounded-4 shadow-sm border h-100" style={{ color: '#0f172a' }}>
                                        <h6 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)' }}>
                                            <i className="fa-solid fa-graduation-cap text-primary me-2"></i> Training &amp; Support
                                        </h6>
                                        <p className="mb-0" style={{ fontSize: '0.85rem', color: '#475569' }}>
                                            Access WhatsApp groups, books, and modules for personal development and product info.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="bg-white p-3 p-sm-4 rounded-4 shadow-sm border h-100" style={{ color: '#0f172a' }}>
                                        <h6 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)' }}>
                                            <i className="fa-solid fa-building-columns text-success me-2"></i> Encashment &amp; Policy
                                        </h6>
                                        <p className="mb-0" style={{ fontSize: '0.85rem', color: '#475569' }}>
                                            Encashment can be done through{' '}
                                            <strong style={{ color: '#0f172a' }}>Telegraphic Transfer (TT) or Wise</strong> directly into
                                            your personal bank account.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXECUTIVE PROGRAM BANNER */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-lg-10">
                            <div
                                className="alert shadow-sm border-0 d-flex flex-column flex-md-row align-items-center p-3 p-sm-4 text-center text-md-start"
                                style={{
                                    background: 'linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%)',
                                    borderRadius: '1.5rem',
                                }}
                            >
                                <i
                                    className="fa-solid fa-plane-departure mb-3 mb-md-0 me-md-4 flex-shrink-0"
                                    style={{ fontSize: '3rem', color: 'var(--ch-teal)' }}
                                ></i>
                                <div>
                                    <h4 className="fw-bold text-white mb-2">INFINITE Executive Program</h4>
                                    <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                        The INFINITE Executive Program rewards your leadership and results with powerful incentives like{' '}
                                        <strong style={{ color: 'var(--ch-teal)' }}>FREE latest gadgets</strong>, a{' '}
                                        <strong style={{ color: 'var(--ch-teal)' }}>FREE Europe trip</strong> (all expenses paid), and even
                                        a <strong style={{ color: 'var(--ch-teal)' }}>FREE car</strong> — built for those ready to win
                                        bigger.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA TO START PRE-REGISTRATION */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-lg-8 text-center px-3">
                            <h3 className="fw-bold mb-3" style={{ color: 'var(--ch-dark-slate)' }}>
                                Ready to Start Your Journey?
                            </h3>
                            <p className="text-muted mb-4" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
                                Fill out our registration form to secure your package and position in our growing global community.
                            </p>
                            <Link
                                href="/#contact"
                                className="btn text-white px-4 px-sm-5 py-3 shadow-sm fw-bold d-inline-block"
                                style={{
                                    backgroundColor: 'var(--ch-teal)',
                                    borderRadius: '2rem',
                                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                    textDecoration: 'none',
                                }}
                            >
                                <i className="fa-solid fa-paper-plane me-2"></i> Connect With An Enroller
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* PACKAGE DETAIL MODAL */}
            {activePkgModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        overflowY: 'auto',
                    }}
                    onClick={() => setActivePkgModal(null)}
                >
                    <div
                        className="modal-content text-center p-3 p-sm-4 p-md-5 bg-white rounded-4 shadow-lg"
                        style={{
                            maxWidth: '500px',
                            width: '100%',
                            maxHeight: '90dvh',
                            overflowY: 'auto',
                            position: 'relative',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-3 m-sm-4"
                            onClick={() => setActivePkgModal(null)}
                            aria-label="Close package details"
                        ></button>
                        <img
                            src={activePkgModal.badge}
                            alt={activePkgModal.tier}
                            style={{ height: '85px', objectFit: 'contain', margin: '0 auto 1rem' }}
                        />
                        <h4 className="fw-bold mb-0 text-dark">{activePkgModal.name}</h4>
                        <h5 className="mb-3" style={{ color: '#64748b' }}>
                            ({activePkgModal.tier})
                        </h5>
                        <h2 className="fw-bold mb-2" style={{ color: 'var(--ch-teal)' }}>
                            {activePkgModal.price}
                        </h2>
                        <div
                            className="badge mb-4 p-2 px-3 shadow-sm"
                            style={{ backgroundColor: 'var(--ch-dark-slate)', color: '#fff', fontSize: '0.9rem', borderRadius: '0.5rem' }}
                        >
                            Total Product Worth: <span style={{ color: 'var(--ch-teal)' }}>{activePkgModal.worth}</span>
                        </div>
                        <div
                            className="modal-package-details text-start p-3 p-sm-4 mb-4 shadow-sm bg-light rounded-3"
                            style={{ color: '#0f172a' }}
                        >
                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-dark-slate)' }}>
                                <i className="bi bi-box-seam me-2" style={{ color: 'var(--ch-teal)' }}></i>Package Inclusions:
                            </h6>
                            <ul className="list-unstyled mb-0" style={{ fontSize: '0.92rem', color: '#334155' }}>
                                {activePkgModal.inclusions?.map((inc, i) => (
                                    <li key={i} className="mb-2 d-flex align-items-start" style={{ color: '#334155' }}>
                                        <i className="bi bi-check-circle-fill text-success me-2 mt-1 flex-shrink-0"></i>
                                        <span>{inc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="button"
                            className="btn text-white w-100 py-3 fw-bold shadow-sm"
                            style={{ backgroundColor: 'var(--ch-teal)', borderRadius: '0.75rem', fontSize: '1.05rem' }}
                            onClick={() => setActivePkgModal(null)}
                        >
                            Ok, Got It!
                        </button>
                    </div>
                </div>
            )}

            <AppFooter />
        </div>
    );
}