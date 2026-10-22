import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppNavbar from '../Components/AppNavbar';
import AppFooter from '../Components/AppFooter';

export default function WorldPlan() {
    const [currency, setCurrency] = useState('KINA'); // 'PHP', 'USD', 'KINA'
    const [chartTier, setChartTier] = useState('STARTER'); // 'STARTER', 'BASIC', 'ADVANCE', 'PRO', 'SUPREME'
    const [lightboxImg, setLightboxImg] = useState('');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Registration Form (Inertia useForm)
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        username: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        contact: '',
        address: '',
        packageType: 'World Starter',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentProof: null,
    });

    const [formStatus, setFormStatus] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        post('/register-world-plan', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setFormStatus('success');
                reset();
            },
            onError: (errs) => {
                setFormStatus('error');
            }
        });
    };

    const currencyData = {
        PHP: {
            code: "PHP",
            symbol: "₱",
            name: "Philippine Peso",
            cashBonus: "+ 100,000 WBP (₱100,000)",
            packages: [
                { tier: "WORLD STARTER", price: "₱3,500", signup: "₱300", wbp: "250 WBP", m1: "₱150", m2: "₱300", m3: "₱500", cap: "₱500" },
                { tier: "WORLD BASIC", price: "₱13,500", signup: "₱500", wbp: "750 WBP", m1: "₱500", m2: "₱1,000", m3: "₱1,500", cap: "₱1,500" },
                { tier: "WORLD ADVANCE", price: "₱24,500", signup: "₱2,000", wbp: "1,500 WBP", m1: "₱1,000", m2: "₱2,000", m3: "₱3,000", cap: "₱3,000" },
                { tier: "WORLD PRO", price: "₱79,800", signup: "₱5,000", wbp: "3,000 WBP", m1: "₱2,000", m2: "₱4,000", m3: "₱6,000", cap: "₱6,000" },
                { tier: "WORLD SUPREME", price: "₱193,200", signup: "₱10,000", wbp: "6,000 WBP", m1: "₱4,000", m2: "₱8,000", m3: "₱12,000", cap: "₱12,000" }
            ],
            weeklyCaps: [
                { tier: "WORLD STARTER", std: "₱20,000", exec: "₱30,000", mexec: "₱40,000" },
                { tier: "WORLD BASIC", std: "₱30,000", exec: "₱50,000", mexec: "₱60,000" },
                { tier: "WORLD ADVANCE", std: "₱60,000", exec: "₱90,000", mexec: "₱120,000" },
                { tier: "WORLD PRO", std: "₱90,000", exec: "₱130,000", mexec: "₱180,000" },
                { tier: "WORLD SUPREME", std: "₱180,000", exec: "₱230,000", mexec: "₱360,000" }
            ]
        },
        USD: {
            code: "USD",
            symbol: "$",
            name: "US Dollar",
            cashBonus: "+ 100,000 WBP ($1,785.70)",
            packages: [
                { tier: "WORLD STARTER", price: "$60", signup: "$5.00", wbp: "250 pts", m1: "$2.50", m2: "$5.00", m3: "$8.00", cap: "$8.00" },
                { tier: "WORLD BASIC", price: "$189", signup: "$15.00", wbp: "500 pts", m1: "$8.00", m2: "$16.00", m3: "$25.00", cap: "$25.00" },
                { tier: "WORLD ADVANCE", price: "$359", signup: "$33.00", wbp: "1,500 pts", m1: "$16.00", m2: "$33.00", m3: "$50.00", cap: "$50.00" },
                { tier: "WORLD PRO", price: "$929", signup: "$89.00", wbp: "3,000 pts", m1: "$33.00", m2: "$66.00", m3: "$100.00", cap: "$100.00" },
                { tier: "WORLD SUPREME", price: "$2,229", signup: "$200.00", wbp: "6,000 pts", m1: "$66.00", m2: "$133.00", m3: "$200.00", cap: "$200.00" }
            ],
            weeklyCaps: [
                { tier: "WORLD STARTER", std: "$357.00", exec: "$535.00", mexec: "$714.00" },
                { tier: "WORLD BASIC", std: "$535.00", exec: "$892.00", mexec: "$1,071.00" },
                { tier: "WORLD ADVANCE", std: "$1,071.00", exec: "$1,607.00", mexec: "$2,142.00" },
                { tier: "WORLD PRO", std: "$1,607.00", exec: "$2,321.00", mexec: "$3,214.00" },
                { tier: "WORLD SUPREME", std: "$3,214.00", exec: "$4,107.00", mexec: "$6,428.00" }
            ]
        },
        KINA: {
            code: "KINA",
            symbol: "PGK",
            name: "Papua New Guinea Kina",
            cashBonus: "+ 100,000 WBP (PGK 8,330)",
            packages: [
                { tier: "WORLD STARTER", price: "PGK 299", signup: "PGK 25", wbp: "250 pts", m1: "PGK 12", m2: "PGK 25", m3: "PGK 60", cap: "PGK 60" },
                { tier: "WORLD BASIC", price: "PGK 880", signup: "PGK 60", wbp: "500 pts", m1: "PGK 30", m2: "PGK 82", m3: "PGK 123", cap: "PGK 123" },
                { tier: "WORLD ADVANCE", price: "PGK 1,599", signup: "PGK 160", wbp: "1,500 pts", m1: "PGK 82", m2: "PGK 160", m3: "PGK 245", cap: "PGK 245" },
                { tier: "WORLD PRO", price: "PGK 5,199", signup: "PGK 410", wbp: "3,000 pts", m1: "PGK 160", m2: "PGK 320", m3: "PGK 490", cap: "PGK 490" },
                { tier: "WORLD SUPREME", price: "PGK 12,599", signup: "PGK 820", wbp: "6,000 pts", m1: "PGK 320", m2: "PGK 640", m3: "PGK 985", cap: "PGK 985" }
            ],
            weeklyCaps: [
                { tier: "WORLD STARTER", std: "PGK 1,428", exec: "PGK 2,142", mexec: "PGK 2,857" },
                { tier: "WORLD BASIC", std: "PGK 2,142", exec: "PGK 3,571", mexec: "PGK 4,285" },
                { tier: "WORLD ADVANCE", std: "PGK 4,285", exec: "PGK 6,428", mexec: "PGK 8,571" },
                { tier: "WORLD PRO", std: "PGK 6,428", exec: "PGK 9,285", mexec: "PGK 12,857" },
                { tier: "WORLD SUPREME", std: "PGK 12,857", exec: "PGK 16,428", mexec: "PGK 25,714" }
            ]
        }
    };

    const tierIndices = { STARTER: 0, BASIC: 1, ADVANCE: 2, PRO: 3, SUPREME: 4 };
    const currentActiveData = currencyData[currency];
    const currentTierPkg = currentActiveData.packages[tierIndices[chartTier]];

    const openLightbox = (src) => {
        setLightboxImg(src);
        setLightboxOpen(true);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Barlow', sans-serif" }}>
            <Head>
                <title>Infinite World Plan | Build Globally. Earn Limitlessly.</title>
                <link rel="stylesheet" href="/assets/css/world-plan.css" />
            </Head>

            <AppNavbar />

            {/* HERO SECTION */}
            <section className="world-hero">
                <div className="container text-center position-relative z-1">
                    <span className="section-tag" style={{ color: '#5eead4' }}>Global Business Opportunity</span>
                    <p className="ola-script mt-2">/world-plan/</p>
                    <h1 className="ola-hero-title">BUILD GLOBALLY. EARN LIMITLESSLY.</h1>
                    <p className="fs-5 text-white-50 mx-auto mt-3" style={{ maxWidth: '780px', lineHeight: 1.8 }}>
                        ONE WORLD. ONE PLAN. ENDLESS POSSIBILITIES. Experience seamless cross-border multi-currency earnings powered by our binary matching platform.
                    </p>

                    {/* DYNAMIC CURRENCY SWITCHER TOOLBAR */}
                    <div className="mt-4 pt-2">
                        <div className="small fw-bold text-uppercase text-light mb-2" style={{ letterSpacing: '1.5px', opacity: 0.8 }}>Select Currency View:</div>
                        <div className="currency-switcher-wrapper">
                            <button
                                type="button"
                                className={`currency-btn ${currency === 'PHP' ? 'active' : ''}`}
                                id="btn-php"
                                onClick={() => setCurrency('PHP')}
                            >
                                <img src="https://flagcdn.com/w40/ph.png" alt="PHP" /> PHP (₱)
                            </button>
                            <button
                                type="button"
                                className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
                                id="btn-usd"
                                onClick={() => setCurrency('USD')}
                            >
                                <img src="https://flagcdn.com/w40/us.png" alt="USD" /> USD ($)
                            </button>
                            <button
                                type="button"
                                className={`currency-btn ${currency === 'KINA' ? 'active' : ''}`}
                                id="btn-kina"
                                onClick={() => setCurrency('KINA')}
                            >
                                <img src="https://flagcdn.com/w40/pg.png" alt="KINA" /> PGK
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO START WITH INFINITE */}
            <section className="section-pad world-info-band">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Your First Steps</span>
                        <h2 className="section-title">HOW TO START WITH <span style={{ color: 'var(--ch-teal)' }}>INFINITE</span></h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>Start with a package that fits your budget and goals, activate your account, receive your products, and begin building your business.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="how-start-card">
                                <div className="step-number">01</div>
                                <h5 className="fw-bold">Choose Your Package</h5>
                                <p className="text-muted small mb-0">Select the WorldPlan package that best fits your budget and business goals.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="how-start-card">
                                <div className="step-number">02</div>
                                <h5 className="fw-bold">Activate Your Account</h5>
                                <p className="text-muted small mb-0">Complete your registration after your payment is confirmed.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="how-start-card">
                                <div className="step-number">03</div>
                                <h5 className="fw-bold">Receive Your Products</h5>
                                <p className="text-muted small mb-0">Your package products are prepared and processed for shipment.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="how-start-card">
                                <div className="step-number">04</div>
                                <h5 className="fw-bold">Start &amp; Grow</h5>
                                <p className="text-muted small mb-0">Use, share, retail, and build your network with the INFINITE opportunity.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lifetime-strip mt-4 text-center">
                        <i className="fa-solid fa-infinity me-2" style={{ color: 'var(--ch-yellow)' }}></i>
                        <strong>ONE-TIME LIFETIME INVESTMENT</strong>
                        <span className="d-block d-md-inline ms-md-2 text-white-50">No monthly package purchases are required. Choose your package and take your first step with INFINITE.</span>
                    </div>
                </div>
            </section>

            {/* FUNDAMENTALS */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Fundamentals</span>
                        <h2 className="section-title">Terminology &amp; <span style={{ color: 'var(--ch-teal)' }}>Official Classifications</span></h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="p-4 bg-white rounded-4 h-100 border shadow-sm">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(20, 184, 166, 0.1)', color: 'var(--ch-teal)' }}>
                                        <i className="fa-solid fa-user-plus fs-3"></i>
                                    </div>
                                    <h5 className="fw-bold mb-0" style={{ color: 'var(--ch-dark-slate)' }}>Sign-Up Points</h5>
                                </div>
                                <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>The Enroller Bonus or Direct Referral Bonus equivalent awarded whenever a wholesaler signs up a new wholesaler under the World Plan.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="p-4 bg-white rounded-4 h-100 border shadow-sm">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--ch-yellow)' }}>
                                        <i className="fa-solid fa-coins fs-3"></i>
                                    </div>
                                    <h5 className="fw-bold mb-0" style={{ color: 'var(--ch-dark-slate)' }}>World Bonus Points</h5>
                                </div>
                                <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>(WBP) Package points used to compute matching bonuses. Serves as the base payout denomination subject to prevailing conversion rates.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="p-4 bg-white rounded-4 h-100 border shadow-sm">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                        <i className="fa-solid fa-network-wired fs-3"></i>
                                    </div>
                                    <h5 className="fw-bold mb-0" style={{ color: 'var(--ch-dark-slate)' }}>WBP Match</h5>
                                </div>
                                <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>The points-matching bonus earned whenever WBP from your Left and Right sales groups match under the step-up structure.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="p-4 bg-white rounded-4 h-100 border shadow-sm">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                                        <i className="fa-solid fa-calendar-check fs-3"></i>
                                    </div>
                                    <h5 className="fw-bold mb-0" style={{ color: 'var(--ch-dark-slate)' }}>World Subscription</h5>
                                </div>
                                <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>Monthly active subscription made 1 month in advance. FREE for the first two calendar months upon registration month.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KINA RETAILING SECTION */}
            {currency === 'KINA' && (
                <section className="section-pad" id="kina-retailing-section" style={{ background: '#ffffff' }}>
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">How To Earn</span>
                            <h2 className="section-title">Direct <span style={{ color: 'var(--ch-teal)' }}>Retailing</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Enjoy huge profit margins by purchasing products at a member discount and selling them at standard retail prices.</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {/* BARLEY */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="p-4 bg-white rounded-4 h-100 border shadow-sm text-center position-relative retail-card">
                                    <div className="product-img-container mx-auto mb-3" style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        <div style={{ position: 'absolute', width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', filter: 'blur(20px)', zIndex: 0 }}></div>
                                        <img src="/assets/image/Ley.png" alt="Infinite Barley" className="retail-product-img" style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }} />
                                    </div>
                                    <h4 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>INFINITE BARLEY</h4>
                                    <span className="badge bg-light text-muted border px-3 py-1 mb-3">10 Sachets / Box</span>
                                    <div className="d-flex flex-column align-items-center gap-2 mt-2">
                                        <div className="w-100 p-2 rounded bg-light border">
                                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Non Member Price</small>
                                            <div className="fs-5 text-danger">PGK 150</div>
                                        </div>
                                        <div className="w-100 p-2 rounded border" style={{ background: 'rgba(20, 184, 166, 0.05)', borderColor: 'rgba(20, 184, 166, 0.2)' }}>
                                            <small className="text-teal text-uppercase fw-bold" style={{ color: 'var(--ch-teal)', fontSize: '0.75rem' }}>Member Price</small>
                                            <div className="fs-3 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>PGK 85</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-top">
                                        <small className="fw-bold text-success"><i className="fa-solid fa-arrow-trend-up me-1"></i> Retail Profit: PGK 65</small>
                                    </div>
                                </div>
                            </div>
                            {/* ROBUSTUS */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="p-4 bg-white rounded-4 h-100 border shadow-sm text-center position-relative retail-card">
                                    <div className="product-img-container mx-auto mb-3" style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        <div style={{ position: 'absolute', width: '100px', height: '100px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '50%', filter: 'blur(20px)', zIndex: 0 }}></div>
                                        <img src="/assets/image/blackco.png" alt="Robustus Coffee" className="retail-product-img" style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }} />
                                    </div>
                                    <h4 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>ROBUSTUS COFFEE</h4>
                                    <span className="badge bg-light text-muted border px-3 py-1 mb-3">10 Sachets / Box</span>
                                    <div className="d-flex flex-column align-items-center gap-2 mt-2">
                                        <div className="w-100 p-2 rounded bg-light border">
                                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Non Member Price</small>
                                            <div className="fs-5 text-danger">PGK 70</div>
                                        </div>
                                        <div className="w-100 p-2 rounded border" style={{ background: 'rgba(20, 184, 166, 0.05)', borderColor: 'rgba(20, 184, 166, 0.2)' }}>
                                            <small className="text-teal text-uppercase fw-bold" style={{ color: 'var(--ch-teal)', fontSize: '0.75rem' }}>Member Price</small>
                                            <div className="fs-3 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>PGK 45</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-top">
                                        <small className="fw-bold text-success"><i className="fa-solid fa-arrow-trend-up me-1"></i> Retail Profit: PGK 25</small>
                                    </div>
                                </div>
                            </div>
                            {/* GLUTA */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="p-4 bg-white rounded-4 h-100 border shadow-sm text-center position-relative retail-card">
                                    <div className="product-img-container mx-auto mb-3" style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        <div style={{ position: 'absolute', width: '100px', height: '100px', background: 'rgba(236, 72, 153, 0.15)', borderRadius: '50%', filter: 'blur(20px)', zIndex: 0 }}></div>
                                        <img src="/assets/image/Plus.png" alt="Whiteplus Gluta" className="retail-product-img" style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }} />
                                    </div>
                                    <h4 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>WHITEPLUS GLUTA</h4>
                                    <span className="badge bg-light text-muted border px-3 py-1 mb-3">30 Capsules / Bottle</span>
                                    <div className="d-flex flex-column align-items-center gap-2 mt-2">
                                        <div className="w-100 p-2 rounded bg-light border">
                                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Non Member Price</small>
                                            <div className="fs-5 text-danger">PGK 250</div>
                                        </div>
                                        <div className="w-100 p-2 rounded border" style={{ background: 'rgba(20, 184, 166, 0.05)', borderColor: 'rgba(20, 184, 166, 0.2)' }}>
                                            <small className="text-teal text-uppercase fw-bold" style={{ color: 'var(--ch-teal)', fontSize: '0.75rem' }}>Member Price</small>
                                            <div className="fs-3 fw-bold" style={{ color: 'var(--ch-dark-slate)' }}>PGK 150</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-top">
                                        <small className="fw-bold text-success"><i className="fa-solid fa-arrow-trend-up me-1"></i> Retail Profit: PGK 100</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lifetime-strip mt-4 text-center mx-auto" style={{ maxWidth: '860px', background: 'linear-gradient(135deg, var(--ch-teal-dk), var(--ch-dark-slate))' }}>
                            <strong><i className="fa-solid fa-percent me-2" style={{ color: 'var(--ch-yellow)' }}></i>30% MEMBER DISCOUNT</strong>
                            <span className="d-block d-md-inline ms-md-2 text-white-50">As a member, you enjoy discounted product pricing. Example: every qualifying Barley sale can generate up to PGK 65 retail profit.</span>
                        </div>
                    </div>
                </section>
            )}

            {/* PHP PACKAGES SECTION */}
            {currency === 'PHP' && (
                <section className="section-pad bg-white" id="php-packages-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">World Plan Option</span>
                            <h2 className="section-title">Philippine <span style={{ color: 'var(--ch-teal)' }}>Packages</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Choose from our official Philippine wholesale package options to activate your business and maximize your earning potential.</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-starter">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-seedling"></i></div>
                                        <div className="text-center mb-3">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD STARTER</h4>
                                            <span className="badge bg-light text-muted border px-3 py-1 mb-2">ALL INFINITE OPTION 1</span>
                                            <div className="package-price">₱ 3,000</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm" style={{ fontSize: '0.9rem' }}>Product Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>₱ 3,200</span></div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Glow Up Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Deowhite Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 Infinite Botox Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Brightening Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 Infinite White Body Lotion</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-basic best-seller">
                                    <div className="best-seller-badge"><i className="fa-solid fa-star text-warning me-1"></i> BEST SELLER</div>
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-leaf"></i></div>
                                        <div className="text-center mb-3">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD BASIC</h4>
                                            <span className="badge bg-light text-muted border px-3 py-1 mb-2">ALL INFINITE OPTION 1</span>
                                            <div className="package-price">₱ 8,880</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm" style={{ fontSize: '0.9rem' }}>Product Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>₱ 9,400</span></div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Whiteplus Glutathione</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Infinite Glow Up Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Infinite Deowhite Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Botox Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Infinite Brightening Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite White Body Lotion</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-advance">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-fire"></i></div>
                                        <div className="text-center mb-3">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD ADVANCE</h4>
                                            <span className="badge bg-light text-muted border px-3 py-1 mb-2">PREMIUM SKIN CARE SET</span>
                                            <div className="package-price">₱ 18,880</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Product Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>₱ 20,400</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 O'Lamour Facial Essence</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 O'Lamour CoreLaCreme</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 O'Lamour Quintessence Ampoule</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 O'Lamour PrimeRenew BB Cream</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-pro">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-gem"></i></div>
                                        <div className="text-center mb-3">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD PRO</h4>
                                            <span className="badge bg-light text-muted border px-3 py-1 mb-2">PREMIUM SKIN CARE SET</span>
                                            <div className="package-price">₱ 49,800</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Product Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>₱ 58,500</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> 1 Star Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 4 O'Lamour Facial Essence</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 4 O'Lamour CoreLaCreme</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 4 O'Lamour Quintessence Ampoule</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 9 O'Lamour PrimeRenew BB Cream</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-supreme">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-crown"></i></div>
                                        <div className="text-center mb-3">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD SUPREME</h4>
                                            <span className="badge bg-light text-muted border px-3 py-1 mb-2">PREMIUM SKIN CARE SET</span>
                                            <div className="package-price">₱ 125,000</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Product Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>₱ 150,900</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> 2 Star Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 11 O'Lamour Facial Essence</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 11 O'Lamour CoreLaCreme</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 11 O'Lamour Quintessence Ampoule</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 20 O'Lamour PrimeRenew BB Cream</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lifetime-strip mt-4 text-center mx-auto" style={{ maxWidth: '900px' }}>
                            <i className="fa-solid fa-infinity me-2" style={{ color: 'var(--ch-yellow)' }}></i><strong>ONE-TIME LIFETIME INVESTMENT</strong>
                            <span className="d-block d-md-inline ms-md-2 text-white-50">Every package includes products you can use, share, or resell. There are no monthly package purchases required.</span>
                        </div>
                    </div>
                </section>
            )}

            {/* USD PACKAGES SECTION */}
            {currency === 'USD' && (
                <section className="section-pad bg-white" id="usd-packages-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">World Plan Option</span>
                            <h2 className="section-title">Global USD <span style={{ color: 'var(--ch-teal)' }}>Packages</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Choose the perfect starting package to launch your global business and maximize your earning potential.</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-starter best-seller">
                                    <div className="best-seller-badge"><i className="fa-solid fa-star text-warning me-1"></i> BEST SELLER</div>
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-seedling"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD STARTER</h4>
                                            <div className="package-price">$60</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>$75</span></div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Glow Up Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Deowhite Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 Infinite Botox Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Brightening Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 Infinite White Body Lotion</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-basic">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-leaf"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD BASIC</h4>
                                            <div className="package-price">$189</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>$210</span></div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Whiteplus Glutathione</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Infinite Glow Up Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Infinite Deowhite Soap</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Botox Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Infinite Brightening Serum</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite White Body Lotion</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-advance">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-fire"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD ADVANCE</h4>
                                            <div className="package-price">$359</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>$410</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 O'Lamour Facial Essence</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 O'Lamour CoreLaCreme</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 O'Lamour Quintessence Ampoule</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 O'Lamour PrimeRenew BB Cream</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-pro">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-gem"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD PRO</h4>
                                            <div className="package-price">$929</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>$1,080</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> 1 Star Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 4 O'Lamour Facial Essence</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 4 O'Lamour CoreLaCreme</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 4 O'Lamour Quintessence Ampoule</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 9 O'Lamour PrimeRenew BB Cream</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-supreme">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-crown"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD SUPREME</h4>
                                            <div className="package-price">$2,229</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>$2,750</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> 2 Star Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1 mt-3">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 11 O'Lamour Facial Essence</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 11 O'Lamour CoreLaCreme</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 11 O'Lamour Quintessence Ampoule</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 20 O'Lamour PrimeRenew BB Cream</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lifetime-strip mt-4 text-center mx-auto" style={{ maxWidth: '900px' }}>
                            <i className="fa-solid fa-infinity me-2" style={{ color: 'var(--ch-yellow)' }}></i><strong>ONE-TIME LIFETIME INVESTMENT</strong>
                            <span className="d-block d-md-inline ms-md-2 text-white-50">Every package includes products you can use, share, or resell. There are no monthly package purchases required.</span>
                        </div>
                    </div>
                </section>
            )}

            {/* PNG PACKAGES SECTION */}
            {currency === 'KINA' && (
                <section className="section-pad bg-white" id="png-packages-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">World Plan Option</span>
                            <h2 className="section-title">Papua New Guinea <span style={{ color: 'var(--ch-teal)' }}>Packages</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>Choose the perfect starting package to launch your global business and maximize your earning potential.</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-starter best-seller">
                                    <div className="best-seller-badge"><i className="fa-solid fa-star text-warning me-1"></i> BEST SELLER</div>
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-seedling"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD STARTER</h4>
                                            <div className="package-price">PGK 299</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>PGK 360</span></div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 3 Robustus Coffee</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 1 Infinite Barley</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-basic">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-leaf"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD BASIC</h4>
                                            <div className="package-price">PGK 880</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>PGK 1,150</span></div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 5 Robustus Coffee</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Whiteplus Glutathione</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 2 Infinite Barley</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-advance">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-fire"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD ADVANCE</h4>
                                            <div className="package-price">PGK 1,599</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>PGK 2,550</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 15 Robustus Coffee</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 10 Infinite Barley</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-pro">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-gem"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD PRO</h4>
                                            <div className="package-price">PGK 5,199</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>PGK 7,140</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> 1 Star Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 22 INFINITE Robustus</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 14 INFINITE Barley</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 14 WHITEPLUS Glutathione</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="pricing-card tier-supreme">
                                    <div className="pricing-content">
                                        <div className="package-icon-wrapper"><i className="fa-solid fa-crown"></i></div>
                                        <div className="text-center mb-4">
                                            <h4 className="fw-bold" style={{ color: 'var(--ch-dark-slate)', letterSpacing: '1px' }}>WORLD SUPREME</h4>
                                            <div className="package-price">PGK 12,599</div>
                                            <div className="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style={{ fontSize: '0.9rem' }}>Total Worth: <span style={{ color: 'var(--card-color)', fontWeight: 800 }}>PGK 18,700</span></div>
                                            <div className="rank-status-badge"><i className="fa-solid fa-crown me-1"></i> 2 Star Executive Rank Status</div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold mb-3" style={{ color: 'var(--ch-slate-muted)', textTransform: 'uppercase', fontSize: '0.85rem' }}>Package Inclusions:</h6>
                                            <ul className="list-unstyled mb-0" style={{ lineHeight: 1.9 }}>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 60 INFINITE Robustus</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 40 INFINITE Barley</li>
                                                <li><i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--card-color)' }}></i> 34 WHITEPLUS Glutathione</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lifetime-strip mt-4 text-center mx-auto" style={{ maxWidth: '900px' }}>
                            <i className="fa-solid fa-infinity me-2" style={{ color: 'var(--ch-yellow)' }}></i><strong>ONE-TIME LIFETIME INVESTMENT</strong>
                            <span className="d-block d-md-inline ms-md-2 text-white-50">Every package includes products you can use, share, or resell. There are no monthly package purchases required.</span>
                        </div>
                    </div>
                </section>
            )}

            {/* MEMBER BENEFITS & EXECUTIVE PROGRAM (PHP & USD) */}
            {(currency === 'PHP' || currency === 'USD') && (
                <section className="section-pad" id="php-usd-member-benefits-section" style={{ background: '#eef2f7' }}>
                    <div className="container">
                        <div className="member-benefits-card">
                            <div className="member-benefits-heading">
                                <i className="fa-solid fa-star benefit-star" aria-hidden="true"></i>
                                <h3>MEMBER BENEFITS</h3>
                            </div>
                            <ul className="member-benefits-list">
                                <li>
                                    <span className="benefit-check"><i className="fa-solid fa-check"></i></span>
                                    <span><strong>30% Discount</strong> on all INFINITE Products.</span>
                                </li>
                                <li>
                                    <span className="benefit-check"><i className="fa-solid fa-check"></i></span>
                                    <span><strong>Instant Value:</strong> Product package value is higher than your investment.</span>
                                </li>
                                <li>
                                    <span className="benefit-check"><i className="fa-solid fa-check"></i></span>
                                    <span><strong>Personal Online Dashboard:</strong> Monitor sales, team growth, and commissions in real time.</span>
                                </li>
                                <li>
                                    <span className="benefit-check"><i className="fa-solid fa-check"></i></span>
                                    <span><strong>Travel &amp; Rewards:</strong> Qualify for local/international travel and leadership incentives.</span>
                                </li>
                                <li>
                                    <span className="benefit-check"><i className="fa-solid fa-check"></i></span>
                                    <span><strong>Mentorship:</strong> Access online trainings, webinars, and coaching.</span>
                                </li>
                            </ul>
                            <div className="executive-program-card">
                                <div className="executive-program-icon" aria-hidden="true">
                                    <i className="fa-solid fa-plane-departure"></i>
                                </div>
                                <div>
                                    <h3>INFINITE Executive Program</h3>
                                    <p>
                                        The INFINITE Executive Program rewards your leadership and results with powerful incentives like{' '}
                                        <strong>FREE latest gadgets</strong>, a <strong>FREE Europe trip</strong> (all expenses paid),{' '}
                                        and even a <strong>FREE car</strong> — built for those ready to win bigger.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* DIRECT ENROLLER BONUS */}
            <section
                className="section-pad world-info-band"
                id={currency === 'PHP' ? 'php-enroller-section' : (currency === 'USD' ? 'usd-enroller-section' : 'kina-enroller-section')}
            >
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Direct Enrollment</span>
                        <h2 className="section-title">EARN YOUR <span style={{ color: 'var(--ch-teal)' }}>ENROLLER BONUS</span></h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>Earn an Enroller Bonus every time you personally enroll a new member. The bonus is based on the package your personally enrolled member chooses.</p>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {currentActiveData.packages.slice(0, 4).map((p, i) => (
                            <div key={i} className="col-6 col-md-3">
                                <div className="bonus-card text-center">
                                    <div className="small fw-bold text-uppercase text-muted">{p.tier}</div>
                                    <div className="bonus-amount">{p.signup}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="info-card mt-4 text-center mx-auto" style={{ maxWidth: '760px' }}>
                        <span className="section-tag">Simple Example</span>
                        <h5 className="fw-bold mt-2">Personally enroll 5 World Starter members</h5>
                        <div className="fs-4 fw-bold" style={{ color: 'var(--ch-teal-dk)' }}>
                            5 × {currentActiveData.packages[0].signup} = {currency === 'PHP' ? '₱1,500' : (currency === 'USD' ? '$25' : 'PGK 125')}
                        </div>
                        <p className="text-muted small mb-0 mt-2">Your Enroller Bonus is based on the package purchased by the member you personally enrolled.</p>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE VISUALIZER */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Interactive Visualizer</span>
                        <h2 className="section-title">Direct Referral &amp; <span style={{ color: 'var(--ch-teal)' }}>Binary Structure</span></h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>
                            Simulate how new team members on your Left and Right sales groups instantly generate sign-up and matching bonuses in your active currency.
                        </p>
                        <div className="btn-group mt-3 flex-wrap justify-content-center" role="group">
                            {['STARTER', 'BASIC', 'ADVANCE', 'PRO', 'SUPREME'].map((tier) => (
                                <button
                                    key={tier}
                                    type="button"
                                    className={`btn btn-outline-dark fw-bold btn-sm px-3 ${chartTier === tier ? 'active' : ''}`}
                                    onClick={() => setChartTier(tier)}
                                >
                                    {tier.charAt(0) + tier.slice(1).toLowerCase()} Tier
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="org-chart-card">
                        <div className="org-chart-container">
                            <div className="org-node mb-2">
                                <div className="avatar-box you">
                                    <i className="fa-solid fa-user-tie"></i>
                                </div>
                                <span className="node-tag you-tag"><i className="fa-solid fa-crown me-1"></i> YOU</span>
                            </div>

                            <div className="tree-line-v"></div>

                            <div className="tree-line-h-wrapper">
                                <div className="tree-line-h"></div>
                                <div className="tree-line-down-left"></div>
                                <div className="tree-line-down-right"></div>
                                <div className="match-badge-center">
                                    <div className="badge rounded-pill p-2 p-md-3 shadow-lg" style={{ background: 'rgba(245, 158, 11, 0.95)', border: '2px dashed #fff', color: '#fff' }}>
                                        <i className="fa-solid fa-bolt fs-5 fs-md-4 mb-1 d-block"></i>
                                        <span className="small fw-bold text-uppercase d-block" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.75rem)' }}>1st Match Earned</span>
                                        <strong className="text-white" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>{currentTierPkg.m1}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="branches-row">
                                <div className="org-node text-center position-relative z-2">
                                    <div className="small fw-bold text-uppercase mb-2" style={{ color: '#5eead4', letterSpacing: '1px', fontSize: 'clamp(0.6rem, 2vw, 0.85rem)' }}>Left Sales Group</div>
                                    <div className="avatar-box mx-auto">
                                        <i className="fa-solid fa-user-nurse"></i>
                                    </div>
                                    <span className="node-tag">PARTNER A</span>
                                    <div className="earn-badge text-center">
                                        Sign up Bonus <br />
                                        <span className="val-referral fw-bold" style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}>{currentTierPkg.signup}</span>
                                    </div>
                                </div>

                                <div className="org-node text-center position-relative z-2">
                                    <div className="small fw-bold text-uppercase mb-2" style={{ color: '#5eead4', letterSpacing: '1px', fontSize: 'clamp(0.6rem, 2vw, 0.85rem)' }}>Right Sales Group</div>
                                    <div className="avatar-box mx-auto">
                                        <i className="fa-solid fa-user-astronaut"></i>
                                    </div>
                                    <span className="node-tag">PARTNER B</span>
                                    <div className="earn-badge text-center">
                                        Sign up Bonus <br />
                                        <span className="val-referral fw-bold" style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}>{currentTierPkg.signup}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SALES MATCH BONUS EXPLANATION */}
            <section
                className="section-pad bg-white"
                id={currency === 'PHP' ? 'php-sales-match-section' : (currency === 'USD' ? 'usd-sales-match-section' : 'kina-sales-match-section')}
            >
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Simple Explanation</span>
                        <h2 className="section-title">SALES MATCH <span style={{ color: 'var(--ch-teal)' }}>BONUS</span></h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '760px' }}>Your package is your earning capacity. It determines the maximum points that can be credited to you per match and the Sales Match Bonus structure you can access.</p>
                    </div>
                    <div className="row g-3 justify-content-center mb-4">
                        <div className="col-6 col-md-3">
                            <div className="points-card"><span>STARTER</span><strong>250</strong><small className="text-muted">pts per match</small></div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="points-card"><span>BASIC</span><strong>500</strong><small className="text-muted">pts per match</small></div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="points-card"><span>ADVANCE</span><strong>1,500</strong><small className="text-muted">pts per match</small></div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="points-card"><span>PRO</span><strong>3,000</strong><small className="text-muted">pts per match</small></div>
                        </div>
                    </div>
                    <div className="row g-4 align-items-stretch">
                        <div className="col-12 col-lg-7">
                            <div className="info-card">
                                <span className="section-tag">Example</span>
                                <h4 className="fw-bold mt-2">Starter member enrolls a Basic package</h4>
                                <div className="d-flex flex-column gap-2 mt-3">
                                    <div><strong>You:</strong> World Starter → 250-point match capacity</div>
                                    <div className="flow-arrow text-center"><i className="fa-solid fa-arrow-down"></i></div>
                                    <div><strong>Your personally enrolled member:</strong> World Basic → 500 points purchased</div>
                                    <div className="flow-arrow text-center"><i className="fa-solid fa-arrow-down"></i></div>
                                    <div><strong>Sales Match credit:</strong> capped at your Starter level → only 250 points can be credited for matching volume</div>
                                    <div className="flow-arrow text-center"><i className="fa-solid fa-arrow-down"></i></div>
                                    <div><strong>Enroller Bonus:</strong> still based on the member's purchased package → {currency === 'PHP' ? '₱500' : (currency === 'USD' ? '$15' : 'PGK 60')} for a Basic enrollment</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="info-card h-100" style={{ background: 'linear-gradient(135deg,var(--ch-dark-slate),#1e293b)', color: '#fff' }}>
                                <i className="fa-solid fa-lightbulb fs-2 mb-3" style={{ color: 'var(--ch-yellow)' }}></i>
                                <h4 className="fw-bold">The key difference</h4>
                                <p className="text-white-50 mb-0">You can earn the Enroller Bonus based on the package your personally enrolled member buys. Your Sales Match Bonus and point capacity are based on your own package level. Upgrade your package to increase your points capacity and unlock higher match potential.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STEP-UP MATCHING TABLE */}
            <section className="section-pad bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag" id="table-curr-tag">Currency: {currentActiveData.name} ({currentActiveData.symbol})</span>
                        <h2 className="section-title">World Plan Packages &amp; <span style={{ color: 'var(--ch-teal)' }}>Step-Up Matching</span></h2>
                    </div>

                    <div className="glass-table-card mb-4">
                        <div className="table-responsive">
                            <table className="table table-custom text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Package Tier</th>
                                        <th>Package Price</th>
                                        <th>Sign-Up Bonus</th>
                                        <th>World Bonus Points</th>
                                        <th>1st - 5th Match</th>
                                        <th>6th - 10th Match</th>
                                        <th>11th Match Onwards</th>
                                        <th>Cap Per Match</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentActiveData.packages.map((pkg, i) => (
                                        <tr key={i} className={pkg.tier === 'WORLD SUPREME' ? 'bg-light fw-bold' : ''}>
                                            <td className="tier-highlight">{pkg.tier}</td>
                                            <td style={{ color: 'var(--ch-teal)', fontWeight: 700 }}>{pkg.price}</td>
                                            <td>{pkg.signup}</td>
                                            <td><span className="badge bg-secondary">{pkg.wbp}</span></td>
                                            <td>{pkg.m1}</td>
                                            <td>{pkg.m2}</td>
                                            <td>{pkg.m3}</td>
                                            <td className="fw-bold">{pkg.cap}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-dark text-white rounded-4 p-4 shadow-lg text-center mx-auto" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px' }}>
                        <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                            <i className="fa-solid fa-trophy mb-3" style={{ color: 'var(--ch-yellow)', fontSize: '3rem' }}></i>
                            <h4 className="fw-bold mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 6vw, 2.8rem)', letterSpacing: '1.5px' }}>CASH BONUS INCENTIVE</h4>
                            <p className="mb-0 text-white-50" style={{ maxWidth: '500px', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>
                                Directly sign-up <strong>5 World Supreme packages</strong> within the same calendar month.
                            </p>
                        </div>
                        <div className="badge rounded-pill bg-teal py-3 px-2 font-monospace fw-bold text-center d-block mx-auto text-wrap" style={{ background: 'var(--ch-teal)', color: '#fff', boxShadow: '0 4px 15px rgba(20, 184, 166, 0.4)', fontSize: 'clamp(1rem, 4vw, 1.5rem)', lineHeight: 1.4, width: '95%', maxWidth: '600px' }} id="cash-bonus-val">
                            {currentActiveData.cashBonus}
                        </div>
                    </div>
                </div>
            </section>

            {/* WEEKLY MATCHING CAP TABLE */}
            <section className="section-pad" style={{ background: 'var(--ch-bg-light)' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Earnings Ceiling</span>
                        <h2 className="section-title">Weekly Matching <span style={{ color: 'var(--ch-teal)' }}>Cap Structure</span></h2>
                    </div>

                    <div className="glass-table-card">
                        <div className="table-responsive">
                            <table className="table table-custom text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Package Tier</th>
                                        <th>Standard Cap</th>
                                        <th>Executive Status Cap</th>
                                        <th>Managing Executive Cap</th>
                                    </tr>
                                </thead>
                                <tbody id="cap-table-body">
                                    {currentActiveData.weeklyCaps.map((c, i) => (
                                        <tr key={i}>
                                            <td className="tier-highlight">{c.tier}</td>
                                            <td>{c.std}</td>
                                            <td style={{ color: 'var(--ch-teal)' }} className="fw-bold">{c.exec}</td>
                                            <td style={{ color: 'var(--ch-yellow-dk)' }} className="fw-bold">{c.mexec}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* GUIDELINES & PAYOUT SYSTEMS */}
            <section className="section-pad bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Guidelines</span>
                        <h2 className="section-title">Requirements &amp; <span style={{ color: 'var(--ch-teal)' }}>Payout Systems</span></h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="p-4 rounded-4 border bg-white shadow-sm h-100">
                                <i className="fa-solid fa-user-shield fs-1 mb-3" style={{ color: 'var(--ch-teal)' }}></i>
                                <h4 className="fw-bold mb-2">Infinite Ambassador</h4>
                                <p className="text-muted small" style={{ lineHeight: 1.7 }}>Direct 3 new World Plan sign-ups within 2 levels lower World Plan package class.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="p-4 rounded-4 border bg-white shadow-sm h-100">
                                <i className="fa-solid fa-wallet fs-1 mb-3" style={{ color: '#3b82f6' }}></i>
                                <h4 className="fw-bold mb-2">WISE Ecosystem Payout</h4>
                                <p className="text-muted small" style={{ lineHeight: 1.7 }}>Seamless multi-currency payout crediting via Wise Bank details. Payout follows real-time Wise exchange rates with 1 banking day crediting upon processing.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="p-4 rounded-4 border bg-white shadow-sm h-100">
                                <i className="fa-solid fa-building-columns fs-1 mb-3" style={{ color: 'var(--ch-yellow-dk)' }}></i>
                                <h4 className="fw-bold mb-2">Local Banking &amp; Cut-offs</h4>
                                <p className="text-muted small" style={{ lineHeight: 1.7 }}>
                                    Weekly Cap Cut-off: Sunday 23:59 PM Manila Time.<br />
                                    Daily Encashment: Mon-Thu. Weekend cut-offs credit on Tuesday Manila time.<br />
                                    Admin Processing Fee: 10% | Redemption Fee: 30 WBP.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DAILY ENCASHMENT */}
            <section
                className="section-pad world-info-band"
                id={currency === 'PHP' ? 'php-encashment-section' : (currency === 'USD' ? 'usd-encashment-section' : 'kina-encashment-section')}
            >
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Bonus Payout</span>
                        <h2 className="section-title">DAILY <span style={{ color: 'var(--ch-teal)' }}>ENCASHMENT</span></h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>Register your Wise bank details in your HelloInfinity World Plan profile to receive eligible Sales Bonus encashments with multi-currency support.</p>
                    </div>
                    <div className="row g-4 align-items-stretch">
                        <div className="col-12 col-lg-5">
                            <div className="encash-card h-100">
                                <h4 className="fw-bold"><i className="fa-solid fa-wallet me-2" style={{ color: 'var(--ch-teal)' }}></i>How it works</h4>
                                <ol className="text-muted mb-0 ps-3" style={{ lineHeight: 2 }}>
                                    <li>Register your Wise bank details in your HelloInfinity World Plan profile.</li>
                                    <li>Submit your eligible Sales Bonus encashment.</li>
                                    <li>Bonuses are credited based on the applicable Wise exchange rate.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="encash-card h-100">
                                <h4 className="fw-bold">Encashment cut-off: Monday–Thursday</h4>
                                <div className="table-responsive">
                                    <table className="table cutoff-table mb-2">
                                        <thead>
                                            <tr>
                                                <th>Encashment Day</th>
                                                <th>Expected Credit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>Monday</td><td>Tuesday</td></tr>
                                            <tr><td>Tuesday</td><td>Wednesday</td></tr>
                                            <tr><td>Wednesday</td><td>Thursday</td></tr>
                                            <tr><td>Thursday</td><td>Friday</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="small text-muted"><strong>Friday, Saturday &amp; Sunday:</strong> treated as the Monday cut-off and credited on Tuesday.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KINA SPECIFIC: PROCESS OF REGISTRATION */}
            {currency === 'KINA' && (
                <section className="section-pad bg-white" id="kina-registration-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">PNG Registration</span>
                            <h2 className="section-title">PROCESS OF <span style={{ color: 'var(--ch-teal)' }}>REGISTRATION</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '760px' }}>For package purchases, payment can be made through SMS Banking or Bank Deposit directly to an authorized Area Dealer in PNG for real-time payment confirmation and faster processing.</p>
                        </div>
                        <div className="row g-4">
                            {[
                                { step: '01', title: 'Payment to Area Dealer', desc: 'Send payment through the approved local process.' },
                                { step: '02', title: 'Confirmed in PNG', desc: 'Payment and member details are verified.' },
                                { step: '03', title: 'Forwarded to PH Team', desc: 'Confirmed details are sent for processing.' },
                                { step: '04', title: 'Registration Processed', desc: 'Your registration and package order are processed.' },
                                { step: '05', title: 'Products Prepared', desc: 'Products are prepared for shipment to PNG.' },
                            ].map((s, idx) => (
                                <div key={idx} className="col-12 col-sm-6 col-lg">
                                    <div className="how-start-card">
                                        <div className="step-number">{s.step}</div>
                                        <h6 className="fw-bold">{s.title}</h6>
                                        <p className="text-muted small mb-0">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* PAYMENT PROOF GALLERY (KINA) */}
            {currency === 'KINA' && (
                <section className="section-pad world-info-band media-gallery-section" id="payment-proof-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">Payment Verification</span>
                            <h2 className="section-title">PROOF OF <span style={{ color: 'var(--ch-teal)' }}>PAYMENT</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>Here are examples of payment confirmations and transactions processed with our team.</p>
                        </div>
                        <div className="row g-3 g-md-4 justify-content-center">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="col-6 col-md-3">
                                    <div className="product-received-card gallery-clickable" onClick={() => openLightbox(`/assets/image/proof${num}.jpg`)}>
                                        <img src={`/assets/image/proof${num}.jpg`} alt={`Payment Proof ${num}`} loading="lazy" />
                                        <div className="product-received-overlay"><i className="fa-solid fa-expand"></i></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center w-100 d-block mt-4 pt-4 pb-3" style={{ position: 'relative', zIndex: 10 }}>
                            <button type="button" className="product-received-see-more" data-bs-toggle="modal" data-bs-target="#paymentProofModal">
                                <span>SEE MORE</span><i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* LOGISTICS & SHIPPING TO PNG */}
            {currency === 'KINA' && (
                <section className="section-pad world-info-band" id="kina-shipping-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">Product Delivery</span>
                            <h2 className="section-title">LOGISTICS &amp; SHIPPING TO <span style={{ color: 'var(--ch-teal)' }}>PNG</span></h2>
                            <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>International logistics are coordinated through DHL, with products normally shipped weekly by air cargo depending on aircraft availability.</p>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="shipping-card">
                                    <i className="fa-solid fa-plane-departure fs-2 mb-3" style={{ color: 'var(--ch-teal)' }}></i>
                                    <h5 className="fw-bold">Shipping Schedule</h5>
                                    <p className="text-muted small mb-2"><strong>Cut-off:</strong><br />Friday — 12:00 PM Philippines Time<br />Friday — 2:00 PM PNG Time</p>
                                    <p className="text-muted small mb-0">Normally shipped every Sunday or Monday, depending on aircraft availability.</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="shipping-card">
                                    <i className="fa-solid fa-box fs-2 mb-3" style={{ color: 'var(--ch-yellow-dk)' }}></i>
                                    <h5 className="fw-bold">Shipping Fee</h5>
                                    <div className="bonus-amount">PGK 125</div>
                                    <p className="text-muted small mb-0">Minimum shipping fee for up to 3KG. Even if your order is only 1KG, the minimum 3KG shipping fee still applies. Ordering more products together can help maximize the shipping cost.</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="shipping-card">
                                    <i className="fa-solid fa-location-dot fs-2 mb-3" style={{ color: '#ef4444' }}></i>
                                    <h5 className="fw-bold">Outside Port Moresby</h5>
                                    <p className="text-muted small mb-2"><strong>Option 1:</strong> Arrange pickup in Port Moresby.</p>
                                    <p className="text-muted small mb-0"><strong>Option 2:</strong> Request delivery to your province through a domestic logistics partner. An additional domestic delivery fee applies.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lifetime-strip mt-4 text-center"><strong>ORDER BIGGER • SAVE ON SHIPPING • MAXIMIZE YOUR BUSINESS</strong></div>
                    </div>
                </section>
            )}

            {/* PRODUCT RECEIVED SECTION */}
            <section
                className="section-pad product-received-section"
                id={currency === 'KINA' ? 'kina-product-received-section' : 'product-received-section'}
            >
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Product Received</span>
                        <h2 className="section-title">PRODUCT <span style={{ color: 'var(--ch-teal)' }}>RECEIVED</span></h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>Real moments from our members receiving their INFINITE products. See products successfully delivered to our growing community.</p>
                    </div>
                    <div className="row g-3 g-md-4 justify-content-center">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="col-6 col-md-3">
                                <div className="product-received-card gallery-clickable" onClick={() => openLightbox(`/assets/image/product-received/product-received-${num}.jpg`)}>
                                    <img src={`/assets/image/product-received/product-received-${num}.jpg`} alt={`INFINITE Product Received ${num}`} loading="lazy" />
                                    <div className="product-received-overlay"><i className="fa-solid fa-expand"></i></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center w-100 d-block mt-4 pt-4 pb-3" style={{ position: 'relative', zIndex: 10 }}>
                        <button type="button" className="product-received-see-more" data-bs-toggle="modal" data-bs-target="#productReceivedModal">
                            <span>SEE MORE</span><i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* EXCLUSIVE DEALERS (KINA) */}
            {currency === 'KINA' && (
                <section className="section-pad" id="exclusive-dealer-section" style={{ background: 'var(--ch-bg-light)' }}>
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-tag">Papua New Guinea</span>
                            <h2 className="section-title">EXCLUSIVE AREA <span style={{ color: 'var(--ch-teal)' }}>DEALER</span></h2>
                            <h4 className="fw-bold mt-4 mb-3" style={{ color: 'var(--ch-dark-slate)' }}>
                                <i className="fa-solid fa-shop text-teal me-2"></i> Find Your Nearest INFINITE Area Dealer!
                            </h4>
                            <p className="text-muted mx-auto fs-6" style={{ maxWidth: '750px', lineHeight: 1.7 }}>
                                Connect with our Official Member Area Dealers and get INFINITE products conveniently available near you. <br />
                                <span className="d-inline-block mt-3 fw-semibold px-4 py-2 rounded-pill shadow-sm" style={{ background: 'var(--ch-white)', border: '1px solid var(--ch-border)', color: 'var(--ch-dark-slate)' }}>
                                    <i className="fa-solid fa-address-card text-teal me-1"></i> For Registrations &amp; <i className="fa-solid fa-box-open text-teal ms-2 me-1"></i> Product Orders, simply message your nearest Area Dealer.
                                </span>
                            </p>
                        </div>

                        <div className="row g-4 justify-content-center">
                            <div className="col-12 col-lg-6">
                                <div className="dealer-card-enhanced h-100">
                                    <div className="dealer-card-bg-shape"></div>
                                    <div className="dealer-photo-large">
                                        <img src="/assets/image/team/photo_2026-08-11_22-16-02.jpg" alt="Martina Pidi" />
                                    </div>
                                    <div className="badge rounded-pill mb-3 shadow-sm px-3 py-2" style={{ background: 'black', color: '#fff', position: 'relative', zIndex: 2, fontSize: '0.8rem', letterSpacing: '1px' }}>
                                        <i className="fa-solid fa-award me-1" style={{ color: 'var(--ch-yellow)' }}></i> INFINITE MEMBER AREA DEALER
                                    </div>
                                    <h3 className="text-dark mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', letterSpacing: '1.5px', position: 'relative', zIndex: 2 }}>MARTINA PIDI</h3>
                                    <p className="text-muted fw-medium mb-4 fs-5" style={{ position: 'relative', zIndex: 2 }}>
                                        <i className="fa-solid fa-location-dot me-1" style={{ color: 'var(--ch-teal)' }}></i> Kokopo, PNG
                                    </p>
                                    <a href="https://wa.me/67573396960" className="btn btn-lg btn-success w-100 fw-bold rounded-pill shadow-sm py-3 mt-auto" target="_blank" rel="noreferrer" style={{ position: 'relative', zIndex: 2, transition: 'all 0.3s ease' }}>
                                        <i className="bi bi-whatsapp me-2 fs-5"></i> +675 7339 6960
                                    </a>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="dealer-card-enhanced h-100">
                                    <div className="dealer-card-bg-shape"></div>
                                    <div className="dealer-photo-large d-flex align-items-center justify-content-center bg-light">
                                        <img src="/assets/image/team/photo_2026-08-11_22-19-04.jpg" alt="Daniel Tade" />
                                    </div>
                                    <div className="badge rounded-pill mb-3 shadow-sm px-3 py-2" style={{ background: 'black', color: '#fff', position: 'relative', zIndex: 2, fontSize: '0.8rem', letterSpacing: '1px' }}>
                                        <i className="fa-solid fa-award me-1" style={{ color: 'var(--ch-yellow)' }}></i> INFINITE MEMBER AREA DEALER
                                    </div>
                                    <h3 className="text-dark mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', letterSpacing: '1.5px', position: 'relative', zIndex: 2 }}>DANIEL TADE</h3>
                                    <p className="text-muted fw-medium mb-4 fs-5" style={{ position: 'relative', zIndex: 2 }}>
                                        <i className="fa-solid fa-location-dot me-1" style={{ color: 'var(--ch-teal)' }}></i> Kimbe, PNG
                                    </p>
                                    <a href="https://wa.me/67573644499" className="btn btn-lg btn-success w-100 fw-bold rounded-pill shadow-sm py-3 mt-auto" target="_blank" rel="noreferrer" style={{ position: 'relative', zIndex: 2, transition: 'all 0.3s ease' }}>
                                        <i className="bi bi-whatsapp me-2 fs-5"></i> +675 7364 4499
                                    </a>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="dealer-card-enhanced h-100">
                                    <div className="dealer-card-bg-shape"></div>
                                    <div className="dealer-photo-large d-flex align-items-center justify-content-center bg-light">
                                        <img src="/assets/image/team/Barosie.jpg" alt="Jeanette Barosie" />
                                    </div>
                                    <div className="badge rounded-pill mb-3 shadow-sm px-3 py-2" style={{ background: 'black', color: '#fff', position: 'relative', zIndex: 2, fontSize: '0.8rem', letterSpacing: '1px' }}>
                                        <i className="fa-solid fa-award me-1" style={{ color: 'var(--ch-yellow)' }}></i> INFINITE MEMBER AREA DEALER
                                    </div>
                                    <h3 className="text-dark mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.8rem', letterSpacing: '1.5px', position: 'relative', zIndex: 2 }}>JEANETTE BAROSIE</h3>
                                    <p className="text-muted fw-medium mb-4 fs-5" style={{ position: 'relative', zIndex: 2 }}>
                                        <i className="fa-solid fa-location-dot me-1" style={{ color: 'var(--ch-teal)' }}></i> Arawa, BOUGAINVILLE ISLAND
                                    </p>
                                    <a href="https://wa.me/67570422028" className="btn btn-lg btn-success w-100 fw-bold rounded-pill shadow-sm py-3 mt-auto" target="_blank" rel="noreferrer" style={{ position: 'relative', zIndex: 2, transition: 'all 0.3s ease' }}>
                                        <i className="bi bi-whatsapp me-2 fs-5"></i> +675 7042 2028
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-center px-3">
                            <div className="p-4 p-md-5 rounded-4 shadow-sm mx-auto bg-white" style={{ maxWidth: '750px', border: '1px solid #f1f5f9' }}>
                                <h4 className="fw-bolder text-uppercase mb-3" style={{ color: 'var(--ch-dark-slate)', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', letterSpacing: '0.5px' }}>
                                    <i className="fa-solid fa-handshake me-2" style={{ color: 'var(--ch-dark-slate)' }}></i> Want to become an exclusive area dealer?
                                </h4>
                                <p className="text-muted mb-4 mx-auto" style={{ lineHeight: 1.6, fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '650px' }}>
                                    Secure your region and become the primary distributor of INFINITE products in your area. For inquiries and exclusive application details, reach out directly to our founder.
                                </p>
                                <a href="https://wa.me/639167354749" className="dealer-cta-btn btn fw-bold rounded-pill px-4 py-2 d-inline-flex align-items-center" target="_blank" rel="noreferrer">
                                    <i className="bi bi-whatsapp me-2" style={{ color: '#25D366', fontSize: '1.2rem' }}></i> Message Primo Ecalne
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* PIONEERING OPPORTUNITY / WHY JOIN */}
            <section
                className="section-pad why-join-section"
                id={currency === 'PHP' ? 'php-why-join-section' : (currency === 'USD' ? 'usd-why-join-section' : 'kina-why-join-section')}
            >
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag" style={{ color: 'var(--ch-yellow)' }}>Pioneering Opportunity</span>
                        <h2 className="section-title text-white">🔥 THIS IS YOUR BEST TIME TO <span style={{ color: 'var(--ch-yellow)' }}>JOIN</span></h2>
                        <p className="text-white-50 mx-auto" style={{ maxWidth: '760px' }}>
                            {currency === 'PHP' && "We are still in the pioneering stage in the Philippines. The community is growing, the market remains open, and early members have the opportunity to build their foundation while the network continues to expand."}
                            {currency === 'USD' && "We are still in the pioneering stage in the global market. The community is growing, the market remains open, and early members have the opportunity to build their foundation while the network continues to expand."}
                            {currency === 'KINA' && "We are still in the pioneering stage in Papua New Guinea. The community is growing, the market remains open, and early members have the opportunity to build their foundation while the network continues to expand."}
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <div className="why-join-card">
                                <div className="why-join-number">01</div>
                                <h5 className="fw-bold">BUILD EARLY</h5>
                                <p className="text-white-50 small mb-0">Start building your network while the opportunity and community are still developing.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="why-join-card">
                                <div className="why-join-number">02</div>
                                <h5 className="fw-bold">POSITION EARLY</h5>
                                <p className="text-white-50 small mb-0">Establish your presence and develop your area while the market is still wide open.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="why-join-card">
                                <div className="why-join-number">03</div>
                                <h5 className="fw-bold">GROW WITH THE COMMUNITY</h5>
                                <p className="text-white-50 small mb-0">Build alongside the INFINITE community as more members take action and the network expands.</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5 text-white">
                        <p className="fs-5 mb-0">Don’t wait until everyone knows about INFINITE. <strong>Get in early, take action, and grow with us.</strong></p>
                    </div>
                </div>
            </section>

            {/* THE INFINITE GALLERY */}
            <section className="section-pad bg-white media-gallery-section" id="infinite-gallery-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-tag">Moments &amp; Highlights</span>
                        <h2 className="section-title">THE <span style={{ color: 'var(--ch-teal)' }}>INFINITE</span> GALLERY</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>Glimpses of our growing global community, events, and milestones.</p>
                    </div>
                    <div className="row g-3 g-md-4 justify-content-center">
                        {[
                            'photo_2026-09-05_21-53-58.jpg',
                            'photo_2026-09-05_21-54-01.jpg',
                            'photo_2026-09-05_21-54-02.jpg',
                            'photo_2026-09-05_21-54-03 (2).jpg'
                        ].map((imgName, i) => (
                            <div key={i} className="col-6 col-md-3">
                                <div className="product-received-card gallery-clickable" onClick={() => openLightbox(`/assets/image/gallery/${imgName}`)}>
                                    <img src={`/assets/image/gallery/${imgName}`} alt={`Gallery Image ${i + 1}`} loading="lazy" />
                                    <div className="product-received-overlay"><i className="fa-solid fa-expand"></i></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center w-100 d-block mt-4 pt-4 pb-3" style={{ position: 'relative', zIndex: 10 }}>
                        <button type="button" className="product-received-see-more" data-bs-toggle="modal" data-bs-target="#momentsHighlightsModal">
                            <span>SEE MORE</span><i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section id="register-world-account" className="section-pad text-white" style={{ background: 'linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%)' }}>
                <div className="container text-center">
                    <span className="section-tag" style={{ color: 'var(--ch-yellow)' }}>Get Started</span>
                    <h2 className="ola-hero-title mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>READY TO LAUNCH YOUR GLOBAL NETWORK?</h2>
                    <p className="fs-5 text-white-50 mx-auto mb-4" style={{ maxWidth: '650px' }}>
                        Secure your World Plan account today and capitalize on our global binary matrix, travel incentives, and multi-currency payout infrastructure.
                    </p>
                    <button data-bs-toggle="modal" data-bs-target="#worldAccountModal" className="btn btn-lg shadow-lg fw-bold px-5 py-3" style={{ background: 'var(--ch-teal)', color: '#fff', borderRadius: '50px', border: 'none' }}>
                        Register World Account <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                </div>
            </section>

            {/* PRODUCT RECEIVED MODAL (10 IMAGES) */}
            <div className="modal fade" id="productReceivedModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content product-received-modal">
                        <div className="product-received-modal-header">
                            <div>
                                <span className="product-modal-small-title">INFINITE COMMUNITY</span>
                                <h3>PRODUCT <span>RECEIVED</span></h3>
                            </div>
                            <button type="button" className="product-received-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="product-received-modal-body">
                            <div className="row g-3 g-md-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                    <div key={n} className="col-6 col-md-4 col-lg-3">
                                        <div className="product-modal-image gallery-clickable" onClick={() => openLightbox(`/assets/image/product-received/product-received-${n}.jpg`)}>
                                            <img src={`/assets/image/product-received/product-received-${n}.jpg`} alt={`Product Received ${n}`} loading="lazy" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAYMENT PROOF MODAL (10 IMAGES) */}
            <div className="modal fade" id="paymentProofModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content product-received-modal">
                        <div className="product-received-modal-header">
                            <div>
                                <span className="product-modal-small-title">INFINITE COMMUNITY</span>
                                <h3>PAYMENT <span>VERIFICATION</span></h3>
                            </div>
                            <button type="button" className="product-received-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="product-received-modal-body">
                            <div className="row g-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                    <div key={n} className="col-6 col-md-4 col-lg-3">
                                        <div className="media-gallery-modal-image gallery-clickable" onClick={() => openLightbox(`/assets/image/proof${n}.jpg`)}>
                                            <img src={`/assets/image/proof${n}.jpg`} alt={`Payment Proof ${n}`} loading="lazy" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOMENTS & HIGHLIGHTS MODAL (16 IMAGES) */}
            <div className="modal fade" id="momentsHighlightsModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content product-received-modal">
                        <div className="product-received-modal-header">
                            <div>
                                <span className="product-modal-small-title">INFINITE COMMUNITY</span>
                                <h3>MOMENTS <span>&amp; HIGHLIGHTS</span></h3>
                            </div>
                            <button type="button" className="product-received-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="product-received-modal-body">
                            <div className="row g-3">
                                {[
                                    'photo_2026-09-05_21-53-58.jpg',
                                    'photo_2026-09-05_21-54-01.jpg',
                                    'photo_2026-09-05_21-54-02.jpg',
                                    'photo_2026-09-05_21-54-03 (2).jpg',
                                    'photo_2026-09-05_21-54-03.jpg',
                                    'photo_2026-09-05_21-54-04.jpg',
                                    'photo_2026-09-05_21-54-05.jpg',
                                    'photo_2026-09-05_21-54-06 (2).jpg',
                                    'photo_2026-09-05_21-54-06.jpg',
                                    'photo_2026-09-05_21-54-07.jpg',
                                    'photo_2026-09-05_21-54-08.jpg',
                                    'photo_2026-09-05_21-54-22 (2).jpg',
                                    'photo_2026-09-05_21-54-22.jpg',
                                    'photo_2026-09-05_21-54-23.jpg',
                                    'photo_2026-09-05_21-54-24.jpg',
                                    'photo_2026-09-05_21-54-25.jpg'
                                ].map((img, i) => (
                                    <div key={i} className="col-6 col-md-4 col-lg-3">
                                        <div className="media-gallery-modal-image gallery-clickable" onClick={() => openLightbox(`/assets/image/gallery/${img}`)}>
                                            <img src={`/assets/image/gallery/${img}`} alt={`Gallery ${i + 1}`} loading="lazy" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            {lightboxOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '25px',
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '2rem',
                            cursor: 'pointer'
                        }}
                    >
                        &times;
                    </button>
                    <img
                        src={lightboxImg}
                        alt="Enlarged"
                        style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                    />
                </div>
            )}

            {/* WORLD ACCOUNT REGISTRATION MODAL */}
            <div className="modal fade" id="worldAccountModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1.5rem', backgroundColor: '#ffffff' }}>
                        <div className="modal-header border-0 pb-0 pt-4 px-4 px-md-5">
                            <h3 className="modal-title fw-bold" style={{ color: 'var(--ch-dark-slate)', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}>
                                <i className="bi bi-globe-americas me-2" style={{ color: 'var(--ch-teal)' }}></i> Register World Account
                            </h3>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 p-md-5 pt-3">
                            <p className="text-muted mb-4 small">Fill out the official application form with your details to register.</p>

                            {formStatus === 'success' && (
                                <div className="alert alert-success d-flex align-items-center rounded-3 shadow-sm mb-4">
                                    <i className="bi bi-check-circle-fill fs-4 me-3 text-success"></i>
                                    <div><strong>Success!</strong><br />Your World Account registration has been successfully submitted. Our team will review your payment receipt.</div>
                                </div>
                            )}

                            {formStatus === 'error' && (
                                <div className="alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4">
                                    <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i>
                                    <div><strong>Submission Failed</strong><br />Please review all required fields and upload your receipt proof.</div>
                                </div>
                            )}

                            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                                <div className="row g-3">
                                    <div className="col-md-6 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldUsername"
                                            placeholder="Username"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldUsername" className="text-black fw-medium ms-2">Username (used for login)</label>
                                        {errors.username && <div className="text-danger small mt-1">{errors.username}</div>}
                                    </div>
                                    <div className="col-md-6 form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldEmail"
                                            placeholder="Email Address"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldEmail" className="text-black fw-medium ms-2">Email Address</label>
                                        {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                                    </div>

                                    <div className="col-md-4 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldFirstName"
                                            placeholder="First Name"
                                            value={data.firstName}
                                            onChange={(e) => setData('firstName', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldFirstName" className="text-black fw-medium ms-2">First Name</label>
                                        {errors.firstName && <div className="text-danger small mt-1">{errors.firstName}</div>}
                                    </div>
                                    <div className="col-md-4 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldMiddleName"
                                            placeholder="Middle Name (Optional)"
                                            value={data.middleName}
                                            onChange={(e) => setData('middleName', e.target.value)}
                                        />
                                        <label htmlFor="worldMiddleName" className="text-black fw-medium ms-2">Middle Name (Optional)</label>
                                    </div>
                                    <div className="col-md-4 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldLastName"
                                            placeholder="Last Name"
                                            value={data.lastName}
                                            onChange={(e) => setData('lastName', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldLastName" className="text-black fw-medium ms-2">Last Name</label>
                                        {errors.lastName && <div className="text-danger small mt-1">{errors.lastName}</div>}
                                    </div>

                                    <div className="col-md-6 form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldBirthdate"
                                            value={data.birthdate}
                                            onChange={(e) => setData('birthdate', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldBirthdate" className="text-black fw-medium ms-2">Birthdate</label>
                                        {errors.birthdate && <div className="text-danger small mt-1">{errors.birthdate}</div>}
                                    </div>
                                    <div className="col-md-6 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldContact"
                                            placeholder="Contact #"
                                            value={data.contact}
                                            onChange={(e) => setData('contact', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldContact" className="text-black fw-medium ms-2">Contact #</label>
                                        {errors.contact && <div className="text-danger small mt-1">{errors.contact}</div>}
                                    </div>

                                    <div className="col-12 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldAddress"
                                            placeholder="Complete Address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldAddress" className="text-black fw-medium ms-2">Complete Address</label>
                                        {errors.address && <div className="text-danger small mt-1">{errors.address}</div>}
                                    </div>

                                    <div className="col-md-6 form-floating mb-3">
                                        <select
                                            id="worldPackageType"
                                            className="form-select bg-light border-0 shadow-none text-black fw-medium"
                                            value={data.packageType}
                                            onChange={(e) => setData('packageType', e.target.value)}
                                            required
                                        >
                                            <option value="World Starter">World Starter</option>
                                            <option value="World Basic">World Basic</option>
                                            <option value="World Advance">World Advance</option>
                                            <option value="World Pro">World Pro</option>
                                            <option value="World Supreme">World Supreme</option>
                                        </select>
                                        <label htmlFor="worldPackageType" className="text-black fw-medium">Package Type</label>
                                    </div>
                                    <div className="col-md-6 form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control bg-light border-0 shadow-none text-black fw-medium"
                                            id="worldPaymentDate"
                                            value={data.paymentDate}
                                            onChange={(e) => setData('paymentDate', e.target.value)}
                                            required
                                        />
                                        <label htmlFor="worldPaymentDate" className="text-black fw-medium ms-2">Date of Payment</label>
                                    </div>

                                    <div className="col-12 mb-4">
                                        <label htmlFor="worldPaymentProof" className="form-label text-black small fw-medium ms-1">Upload Payment Proof</label>
                                        <input
                                            type="file"
                                            id="worldPaymentProof"
                                            className="form-control bg-light border-0 shadow-none py-2 text-black fw-medium"
                                            accept="image/*,.pdf"
                                            onChange={(e) => setData('paymentProof', e.target.files[0])}
                                            required
                                        />
                                        {errors.paymentProof && <div className="text-danger small mt-1">{errors.paymentProof}</div>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn w-100 fw-bold py-3 text-white rounded-3 shadow-sm"
                                    style={{ backgroundColor: 'var(--ch-teal)' }}
                                >
                                    {processing ? (
                                        <span>Submitting...</span>
                                    ) : (
                                        <>
                                            <i className="bi bi-send me-2"></i> Submit Registration
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* BACK TO TOP BUTTON */}
            <button
                id="backToTop"
                className="btn border-0 shadow"
                aria-label="Back to top"
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '28px',
                    right: '28px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--ch-teal)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 500,
                    opacity: showBackToTop ? 1 : 0,
                    pointerEvents: showBackToTop ? 'auto' : 'none',
                    transition: 'all 0.3s ease',
                }}
            >
                <i className="bi bi-arrow-up fs-5"></i>
            </button>

            <AppFooter />
        </div>
    );
}
