import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

// Official World Plan pricing and inclusions transcribed from the three supplied screenshots.
// These are fixed market prices, not exchange-rate conversions.
const WORLD_PACKAGES = [
    {
        name: 'World Starter', prices: { PHP: 3000, USD: 60, PGK: 299 }, worth: { PHP: 3200, USD: 75, PGK: 360 },
        inclusions: {
            PHP: ['2 Infinite Glow Up Soap', '2 Infinite Deowhite Soap', '1 Infinite Botox Serum', '2 Infinite Brightening Serum', '1 Infinite White Body Lotion'],
            USD: ['2 Infinite Glow Up Soap', '2 Infinite Deowhite Soap', '1 Infinite Botox Serum', '2 Infinite Brightening Serum', '1 Infinite White Body Lotion'],
            PGK: ['3 Robustus Coffee', '1 Infinite Barley']
        }
    },
    {
        name: 'World Basic', prices: { PHP: 8880, USD: 189, PGK: 880 }, worth: { PHP: 9400, USD: 210, PGK: 1150 },
        inclusions: {
            PHP: ['2 Whiteplus Glutathione', '3 Infinite Glow Up Soap', '3 Infinite Deowhite Soap', '2 Infinite Botox Serum', '3 Infinite Brightening Serum', '2 Infinite White Body Lotion'],
            USD: ['2 Whiteplus Glutathione', '3 Infinite Glow Up Soap', '3 Infinite Deowhite Soap', '2 Infinite Botox Serum', '3 Infinite Brightening Serum', '2 Infinite White Body Lotion'],
            PGK: ['5 Robustus Coffee', '2 Whiteplus Glutathione', '2 Infinite Barley']
        }
    },
    {
        name: 'World Advance', prices: { PHP: 18880, USD: 359, PGK: 1599 }, worth: { PHP: 20400, USD: 410, PGK: 2550 }, rank: 'Executive Rank Status',
        inclusions: {
            PHP: ["2 O’Lamour Facial Essence", "1 O’Lamour CoreLaCreme", "2 O’Lamour Quintessence Ampoule", "2 O’Lamour PrimeRenew BB Cream"],
            USD: ["2 O’Lamour Facial Essence", "1 O’Lamour CoreLaCreme", "2 O’Lamour Quintessence Ampoule", "2 O’Lamour PrimeRenew BB Cream"],
            PGK: ['15 Robustus Coffee', '10 Infinite Barley']
        }
    },
    {
        name: 'World Pro', prices: { PHP: 49800, USD: 929, PGK: 5199 }, worth: { PHP: 58500, USD: 1080, PGK: 7140 }, rank: '1 Star Executive Rank Status',
        inclusions: {
            PHP: ["4 O’Lamour Facial Essence", "4 O’Lamour CoreLaCreme", "4 O’Lamour Quintessence Ampoule", "9 O’Lamour PrimeRenew BB Cream"],
            USD: ["4 O’Lamour Facial Essence", "4 O’Lamour CoreLaCreme", "4 O’Lamour Quintessence Ampoule", "9 O’Lamour PrimeRenew BB Cream"],
            PGK: ['22 INFINITE Robustus', '14 INFINITE Barley', '14 WHITEPLUS Glutathione']
        }
    },
    {
        name: 'World Supreme', prices: { PHP: 125000, USD: 2229, PGK: 12599 }, worth: { PHP: 150900, USD: 2750, PGK: 18700 }, rank: '2 Star Executive Rank Status',
        inclusions: {
            PHP: ["11 O’Lamour Facial Essence", "11 O’Lamour CoreLaCreme", "11 O’Lamour Quintessence Ampoule", "20 O’Lamour PrimeRenew BB Cream"],
            USD: ["11 O’Lamour Facial Essence", "11 O’Lamour CoreLaCreme", "11 O’Lamour Quintessence Ampoule", "20 O’Lamour PrimeRenew BB Cream"],
            PGK: ['60 INFINITE Robustus', '40 INFINITE Barley', '34 WHITEPLUS Glutathione']
        }
    },
];
const CURRENCY_SYMBOLS = { PHP: '₱', USD: '$', PGK: 'PGK ' };
const formatWorldPrice = (amount, currency) => `${CURRENCY_SYMBOLS[currency]}${amount.toLocaleString('en-US')}`;
const productSetFor = (packageName, currency) => {
    const pkg = WORLD_PACKAGES.find((item) => item.name === packageName);
    return pkg ? `${pkg.name} (${currency}) — ${pkg.inclusions[currency].join(', ')}` : '';
};

export default function Registration({
    packageOptions = [],
    productSets = [],
    countries = [],
    paymentMethods = []
}) {
    // Current step in the registration wizard: 1 = Terms & Privacy, 2 = Application Form, 3 = Completed
    const [currentStep, setCurrentStep] = useState(1);
    const [previewUrl, setPreviewUrl] = useState(null);
    const countryCurrencies = { Philippines: 'PHP', 'United States': 'USD', 'Papua New Guinea': 'PGK' };

    const { data, setData, post, transform, processing, errors, reset, recentlySuccessful } = useForm({
        sponsor: '',
        username: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        contact: '',
        country: '',
        address: '',
        packageType: '',
        productSet: '',
        paymentMethod: '',
        amountPaid: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentProof: null,
        agreedTerms: false,
    });

    const selectedCurrency = countryCurrencies[data.country] || null;

    const selectedPackage = WORLD_PACKAGES.find((pkg) => pkg.name === data.packageType) || null;
    const selectedInclusions = selectedPackage && selectedCurrency ? selectedPackage.inclusions[selectedCurrency] : [];
    const handleCountryChange = (country) => {
        setData((previous) => ({
            ...previous,
            country,
            // Require an explicit package choice for the newly selected country.
            packageType: '',
            productSet: '',
            amountPaid: '',
        }));
    };
    const handlePackageChange = (packageName) => {
        setData((previous) => ({
            ...previous,
            packageType: packageName,
            productSet: packageName && countryCurrencies[previous.country] ? productSetFor(packageName, countryCurrencies[previous.country]) : '',
        }));
    };

    const [selectedFileInfo, setSelectedFileInfo] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('paymentProof', file);
        if (file) {
            setSelectedFileInfo({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                isImage: file.type.startsWith('image/'),
                isPdf: file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'),
            });
            if (file.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setPreviewUrl(null);
            }
        } else {
            setSelectedFileInfo(null);
            setPreviewUrl(null);
        }
    };

    const handleContinueToForm = () => {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // In this Inertia version, transform() does not return the form object.
        // Configure the payload first, then call post() separately.
        transform((formData) => ({
            ...formData,
            amountPaid: formData.amountPaid
                ? `${formData.amountPaid} ${countryCurrencies[formData.country] || ''}`
                : '',
        }));

        post('/registration', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            onError: (validationErrors) => {
                console.error('Registration validation errors:', validationErrors);
                const firstError = Object.values(validationErrors)[0];
                if (firstError) alert(firstError);
            },
        });
    };

    return (
        <div className="registration-portal" style={{ backgroundColor: 'var(--ch-dark-slate, #0f172a)', minHeight: '100vh', color: '#ffffff', fontFamily: "'Barlow', sans-serif" }}>
            <Head>
                <title>Official World Plan Registration | Infinite Live Limitless</title>
                <meta name="description" content="Register your official Infinite World Plan account. Complete international distributor onboarding, product set selection, and payment verification." />
            </Head>

            <style>{`
/* All registration styles live in this component. No separate CSS file is required. */
.registration-portal { --reg-navy:#0b2236; --reg-deep:#071c2d; --reg-teal:#079e9d; --reg-ink:#10233d; --reg-muted:#54657c; font-family:'Barlow',Arial,sans-serif; }
.registration-portal .registration-brandbar { position:relative; z-index:2; padding-top:12px!important; padding-bottom:12px!important; background:#081e30!important; border-bottom:1px solid rgba(184,223,229,.28)!important; }
.registration-portal .registration-hero { overflow:hidden; isolation:isolate; min-height:240px; padding:22px 0 25px!important; background:radial-gradient(ellipse at 81% 93%,rgba(0,165,169,.28),transparent 37%),linear-gradient(115deg,#0a2b40 0%,#071b2c 49%,#073b48 100%); }
.registration-portal .registration-hero::before { content:''; position:absolute; z-index:-1; left:-10%; bottom:-135px; width:55%; height:260px; border-radius:50%; background:linear-gradient(15deg,rgba(0,181,185,.46),rgba(0,97,117,.09)); transform:rotate(16deg); box-shadow:0 -24px 0 rgba(3,147,159,.08); }
.registration-portal .registration-orbit { position:absolute; z-index:-1; right:-115px; bottom:-235px; width:490px; height:490px; border-radius:50%; border:2px solid rgba(119,245,245,.48); background:radial-gradient(circle at 29% 23%,rgba(158,255,251,.35),transparent 20%),radial-gradient(circle at 43% 45%,rgba(17,132,151,.78),transparent 49%),repeating-radial-gradient(ellipse at 43% 43%,transparent 0 27px,rgba(120,224,228,.12) 28px 30px),linear-gradient(130deg,#178997,#04354d 70%); box-shadow:0 0 40px rgba(16,206,206,.33),inset 22px 28px 65px rgba(122,241,245,.28),inset -80px -55px 70px rgba(0,15,36,.9); opacity:.86; }
.registration-portal .registration-orbit::before {content:''; position:absolute; width:125%; height:55%; top:-16%; left:-17%; border-top:1px dashed rgba(36,217,223,.7); border-radius:50%; transform:rotate(-18deg);}
.registration-portal .registration-star { position:absolute; right:7%; top:10px; font-size:35px; color:#5af4eb; text-shadow:0 0 24px #4ef1e8; }
.registration-portal .registration-hero-inner {position:relative;z-index:1;}
.registration-portal .registration-hero h1 {font-size:clamp(31px,4.1vw,51px)!important; line-height:1.1; text-shadow:0 3px 10px rgba(0,0,0,.24);}
.registration-portal .registration-hero h1 span {color:#16c2c0!important;}
.registration-portal .registration-hero p {color:#c9d6e2!important;}
.registration-portal .registration-steps {display:flex; align-items:center; justify-content:center; gap:17px; margin:20px auto 0; flex-wrap:wrap;}
.registration-portal .registration-step {display:flex; align-items:center; gap:10px; color:#d6e4ec; padding:8px 14px; border-radius:100px; background:rgba(255,255,255,.055); font-size:13px; font-weight:600; white-space:nowrap;}
.registration-portal .registration-step-number {display:grid; place-items:center; width:23px; height:23px; border:1px solid #b3d5df; border-radius:50%; font-size:12px; font-weight:700;}
.registration-portal .registration-step.is-active {background:linear-gradient(100deg,#77f1e9,#1cbdbb);color:#06283b;box-shadow:0 5px 20px rgba(0,194,188,.16);}
.registration-portal .registration-step.is-active .registration-step-number {background:#08677a;border-color:transparent;color:#fff;}
.registration-portal .registration-step.is-complete {color:#a9f4ee;}
.registration-portal .registration-step-arrow {color:#a6c2cf;}
.registration-portal .registration-content {background:radial-gradient(ellipse at 50% 10%,#f9fcff,#edf3f8 78%)!important; min-height:58vh; padding:30px 0!important;}
.registration-portal .registration-content .col-xl-9 {width:100%;max-width:970px;}
.registration-portal .registration-card {border:1px solid #e1e9f2!important;border-radius:20px!important;box-shadow:0 12px 38px rgba(15,39,64,.10)!important;padding:30px!important;}
.registration-portal .registration-card h2,.registration-portal .registration-card h3 {color:var(--reg-ink)!important;}
.registration-portal .registration-card h5 {font-size:16px;color:#006b70!important;}
.registration-portal .registration-card p {color:#3c4e67;}
.registration-portal .registration-card .row.g-4.my-2 > div > div {background:linear-gradient(135deg,#fbfdff,#f4f8fc);border:1px solid #dce6f0!important;border-radius:15px!important;padding:20px!important;}
.registration-portal .registration-card .row.g-4.my-2 > div > div > .d-flex > .p-3 {width:58px;height:58px;display:grid;place-items:center;background:#d7f7f4!important;color:#008e91!important;border-radius:50%!important;box-shadow:none!important;flex-shrink:0;}
.registration-portal .registration-card .row.g-4.my-2 > div > div > .d-flex > .p-3 i {color:#008e91!important;}
.registration-portal .registration-card .row.g-4.my-2 h5 {color:#12213e!important;text-transform:uppercase;font-weight:800!important;}
.registration-portal .registration-card .row.g-4.my-2 p {color:#334660!important;}
.registration-portal .registration-card .row.g-4.my-2 + .p-4 {background:linear-gradient(100deg,#e2f7f7,#e9f8f7);border:1px solid #c4e9e9!important;border-radius:14px!important;}
.registration-portal .registration-card .row.g-4.my-2 + .p-4 i {color:#008b91!important;}
.registration-portal .registration-card .row.g-4.my-2 + .p-4 li {margin-bottom:5px;}
.registration-portal .registration-card .btn-lg.text-white,.registration-portal .confirmation-primary {background:linear-gradient(100deg,#12bcb9,#00656f)!important;border:0!important;border-radius:100px!important;color:white!important;box-shadow:0 8px 20px rgba(1,118,125,.15)!important;}
.registration-portal .registration-card .btn-outline-secondary {border:1px solid #0a858a!important;color:#006d75!important;background:#fff!important;}
.registration-portal .registration-card .btn-outline-secondary:hover {background:#e8f9f7!important;}
.registration-portal .registration-form-heading {display:flex;align-items:center;gap:17px;}
.registration-portal .registration-form-heading-icon {display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:#def6f4;color:#008f92;font-size:28px;flex-shrink:0;}
.registration-portal .registration-card .form-control,.registration-portal .registration-card .form-select {background-color:#f6f9fc!important;border:1px solid #d8e2ec!important;border-radius:9px!important;color:#172c46!important;min-height:54px;}
.registration-portal .registration-card .form-control:focus,.registration-portal .registration-card .form-select:focus {border-color:#14b8a6!important;box-shadow:0 0 0 3px rgba(20,184,166,.12)!important;}
.registration-portal .registration-card .form-floating>label {color:#51617a;font-size:13px;max-width:calc(100% - 16px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.registration-portal .registration-card form h5 {margin-top:12px;}
.registration-portal .registration-card form > .p-4.mb-4.border {background:linear-gradient(100deg,#e4f7f7,#ecfaf9);border:1px solid #b9e6e4!important;border-radius:11px!important;}
.registration-portal .registration-card form > .p-4.mb-4.border label {color:#24435a!important;}
.registration-portal .registration-card input[type=file] {border:1px dashed #addbdc!important;padding:13px!important;}
.registration-portal .registration-confirmation {max-width:970px;margin:auto;}
.registration-portal .confirmation-success-icon {display:grid;place-items:center;width:80px;height:80px;border-radius:50%;background:#d9f8f3;color:#008d90;font-size:46px;}
.registration-portal .confirmation-eyebrow {font-size:12px;font-weight:800;letter-spacing:2px;color:#008e91;}
.registration-portal .confirmation-intro {max-width:650px;line-height:1.7;}
.registration-portal .confirmation-status,.registration-portal .confirmation-summary,.registration-portal .confirmation-next {max-width:750px;border-radius:15px;padding:20px;border:1px solid #d9e6ef;background:#f8fbfd;}
.registration-portal .confirmation-status {display:flex;gap:16px;align-items:center;background:#e9f8f6;border-color:#c0e9e5;}
.registration-portal .confirmation-status > i {font-size:28px;color:#008e91;}
.registration-portal .confirmation-status strong,.registration-portal .confirmation-status span {display:block;color:#17354c;}
.registration-portal .confirmation-status span {font-size:14px;margin-top:4px;}
.registration-portal .confirmation-section-title {display:flex;align-items:center;gap:10px;margin-bottom:14px;color:#008c90;}
.registration-portal .confirmation-section-title h3 {font-size:18px;margin:0;}
.registration-portal .confirmation-details {margin:0;}
.registration-portal .confirmation-details > div {display:grid;grid-template-columns:40% 60%;gap:12px;padding:11px 0;border-bottom:1px solid #e2eaf1;}
.registration-portal .confirmation-details > div:last-child {border:0;}
.registration-portal .confirmation-details dt {color:#607088;font-weight:600;}
.registration-portal .confirmation-details dd {color:#142c43;font-weight:700;margin:0;overflow-wrap:anywhere;}
.registration-portal .confirmation-accepted {color:#008b80!important;}
.registration-portal .confirmation-next {display:flex;gap:16px;align-items:flex-start;background:#eaf8f8;border-color:#c8e9e8;}
.registration-portal .confirmation-next-icon {font-size:26px;color:#008b90;}
.registration-portal .confirmation-next h3 {font-size:18px;margin:0 0 7px;}
.registration-portal .confirmation-next p {margin:0;font-size:14px;}
.registration-portal .registration-footer {position:relative;overflow:hidden;background:linear-gradient(115deg,#09283a,#071c2d 60%,#0a3b47)!important;}
.registration-portal .registration-footer::before {content:'';position:absolute;left:-10%;bottom:-120px;width:48%;height:150px;border-radius:50%;background:rgba(3,176,177,.2);transform:rotate(12deg);}
@media(max-width:767px) { .registration-portal .registration-orbit {width:270px;height:270px;right:-135px;bottom:-145px;opacity:.55;} .registration-portal .registration-star {right:4%;} .registration-portal .registration-steps {gap:6px;} .registration-portal .registration-step {padding:7px 8px;font-size:11px;gap:5px;} .registration-portal .registration-step-number {width:19px;height:19px;font-size:10px;} .registration-portal .registration-step-arrow {font-size:10px;} .registration-portal .registration-card {padding:20px!important;} .registration-portal .registration-card .row.g-4.my-2 > div > div {padding:16px!important;} .registration-portal .confirmation-details > div {grid-template-columns:1fr;gap:3px;} }
@media(max-width:420px) { .registration-portal .registration-step {font-size:10px;padding:6px;} .registration-portal .registration-step-arrow {display:none;} .registration-portal .registration-hero h1 {font-size:29px!important;} }
`}</style>

            {/* BRAND HEADER BAR */}
            <header className="registration-brandbar py-3 px-4 border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.98)' }}>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="d-flex flex-column align-items-center">
                        <span
                            style={{
                                color: '#fff',
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontWeight: 900,
                                lineHeight: 0.85,
                                letterSpacing: '2px',
                                fontSize: 'clamp(28px, 4vw, 36px)',
                            }}
                        >
                            INFINITE
                        </span>
                        <span
                            style={{
                                color: 'var(--ch-teal, #14b8a6)',
                                fontFamily: "'Barlow', sans-serif",
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                fontSize: '10px',
                                marginTop: '2px',
                            }}
                        >
                            LIVE LIMITLESS
                        </span>
                    </div>
                </div>
            </header>

            {/* HERO BANNER */}
            <section className="registration-hero position-relative pt-4 pb-4" >
                <div className="registration-orbit" aria-hidden="true"></div>
                <div className="registration-star" aria-hidden="true">✦</div>
                <div className="container pt-4 text-center registration-hero-inner">
                    <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: 'rgba(20, 184, 166, 0.15)', color: '#5eead4', border: '1px solid rgba(20, 184, 166, 0.3)', letterSpacing: '2px', fontSize: '0.8rem' }}>
                        <i className="bi bi-globe-americas me-2"></i> GLOBAL ONBOARDING PORTAL
                    </span>
                    <h1 className="fw-bold display-5 text-white mb-3" style={{ fontFamily: "'Bebas Neue', 'Barlow', sans-serif", letterSpacing: '1.5px' }}>
                        INFINITE WORLD PLAN <span style={{ color: 'var(--ch-teal)' }}>REGISTRATION</span>
                    </h1>
                    <p className="text-white-50 mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        Launch your international venture. Secure your global genealogy node, select your wholesale product sets, and enjoy 24/7 automated backoffice management.
                    </p>

                    {/* SHARED PROGRESS HEADER: same on all three steps */}
                    <nav className="registration-steps" aria-label="Registration progress">
                        {[['Terms & Privacy', 1], ['Application Form', 2], ['Confirmation', 3]].map(([label, number], index) => (
                            <React.Fragment key={number}>
                                {index > 0 && <i className="bi bi-chevron-right registration-step-arrow" aria-hidden="true"></i>}
                                <div className={`registration-step ${currentStep === number ? 'is-active' : ''} ${currentStep > number ? 'is-complete' : ''}`} aria-current={currentStep === number ? 'step' : undefined}>
                                    <span className="registration-step-number">{currentStep > number ? '✓' : number}</span>
                                    <span>{label}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="registration-content py-5" style={{ color: '#0f172a' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-9">

                            {/* ========================================================
                                STEP 1: TERMS & CONDITIONS & DATA PRIVACY
                            ======================================================== */}
                            {currentStep === 1 && (
                                <div className="registration-card bg-white rounded-4 shadow-lg p-4 p-md-5 border" style={{ borderColor: '#e2e8f0' }}>
                                    <div className="text-center mb-4">
                                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-sm" style={{ width: '70px', height: '70px', background: 'rgba(20, 184, 166, 0.12)', color: 'var(--ch-teal)' }}>
                                            <i className="bi bi-shield-check fs-1"></i>
                                        </div>
                                        <h2 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)' }}>Terms, Conditions &amp; Privacy Policy</h2>
                                        <p className="text-muted" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem' }}>
                                            Please review the official operational policies, non-refundable agreement, and data privacy consent below before proceeding to your registration details.
                                        </p>
                                    </div>

                                    {/* POLICY CARDS WITH ICONS */}
                                    <div className="row g-4 my-2">
                                        {/* Card 1: Non-Refundable Policy */}
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 h-100 border transition-all" >
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="p-3 rounded-3 bg-white text-warning shadow-sm">
                                                        <i className="fa-solid fa-file-invoice-dollar fs-4 text-warning"></i>
                                                    </div>
                                                    <h5 className="fw-bold mb-0 text-dark">Strict Non-Refundable Policy</h5>
                                                </div>
                                                <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                    As you have taken process this is strictly <strong>NON-REFUNDABLE</strong>. From now and your lifetime registration validity after we turn over your account, package allotments and system placement cannot be refunded or cancelled once processed.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2: Product Availability & Dispatch */}
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 h-100 border transition-all" >
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="p-3 rounded-3 bg-white text-teal shadow-sm">
                                                        <i className="fa-solid fa-box-open fs-4" style={{ color: 'var(--ch-teal)' }}></i>
                                                    </div>
                                                    <h5 className="fw-bold mb-0 text-dark">Product Availability &amp; Dispatch</h5>
                                                </div>
                                                <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                    We will keep you posted with your <strong>products availability</strong> once it is available in your destination area. International shipments are coordinated with DHL and authorized country stockists with official air waybill tracking.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3: 24/7 Online Account Creation */}
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 h-100 border transition-all" >
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="p-3 rounded-3 bg-white text-primary shadow-sm">
                                                        <i className="fa-solid fa-laptop-code fs-4 text-primary"></i>
                                                    </div>
                                                    <h5 className="fw-bold mb-0 text-dark">24/7 Online Account Setup</h5>
                                                </div>
                                                <p className="mb-0" style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                                                    We will create your <strong>online account</strong> and it will be up soon to monitor your business 24/7. It comes with your personal username and secure password login credentials upon administrator verification.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 4: Data Privacy & Security */}
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 h-100 border transition-all" >
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="p-3 rounded-3 bg-white text-success shadow-sm">
                                                        <i className="fa-solid fa-user-shield fs-4 text-success"></i>
                                                    </div>
                                                    <h5 className="fw-bold mb-0 text-dark">Data Privacy &amp; Consent</h5>
                                                </div>
                                                <p className="mb-0" style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                                                    In compliance with Republic Act No. 10173 (Data Privacy Act) and international data privacy regulations, Infinite Live Limitless processes your personal identity, contact, shipping address, and payment receipts solely for account creation and delivery.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary Callout */}
                                    <div className="p-4 rounded-4 my-4" >
                                        <h6 className="fw-bold text-dark mb-2">
                                            <i className="bi bi-info-circle-fill text-primary me-2"></i> Key Registrant Commitments
                                        </h6>
                                        <ul className="mb-0 text-muted ps-3" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                                            <li>You confirm that all personal and payment information provided is accurate and authentic.</li>
                                            <li>You understand that product packages come with lifetime account benefits, wholesale discount rates (up to 30%), and compensation overrides.</li>
                                            <li>You will receive an official email confirmation containing your complete information and a secure edit link immediately after submission.</li>
                                        </ul>
                                    </div>

                                    {/* Action Button */}
                                    <div className="text-center pt-3">
                                        <button
                                            type="button"
                                            onClick={handleContinueToForm}
                                            className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
                                            style={{ backgroundColor: 'var(--ch-teal)', borderRadius: '50px', fontSize: '1.05rem' }}
                                        >
                                            Continue to Registration Form <i className="bi bi-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ========================================================
                                STEP 2: REGISTRATION FORM
                            ======================================================== */}
                            {currentStep === 2 && (
                                <div className="registration-card bg-white rounded-4 shadow-lg p-4 p-md-5 border" style={{ borderColor: '#e2e8f0' }}>
                                    <div className="d-flex flex-wrap align-items-center justify-content-between pb-3 mb-4 border-bottom">
                                        <div className="registration-form-heading">
                                            <span className="registration-form-heading-icon"><i className="bi bi-card-list"></i></span>
                                            <div><h3 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>Official Application Form</h3>
                                                <p className="text-muted small mb-0">Fill in your official details to enroll into the World Plan network.</p></div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(1)}
                                            className="btn btn-sm btn-outline-secondary rounded-pill px-3 mt-2 mt-sm-0"
                                        >
                                            <i className="bi bi-arrow-left me-1"></i> Review Terms &amp; Privacy
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                                        {/* SECTION 1: ACCOUNT & SPONSOR */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-user-gear me-2"></i> 1. Account Credentials &amp; Sponsor
                                        </h5>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6 form-floating">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    className={`form-control bg-light ${errors.username ? 'is-invalid' : ''}`}
                                                    placeholder="Username"
                                                    value={data.username}
                                                    onChange={(e) => setData('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                                    required
                                                />
                                                <label htmlFor="username" className="ms-2">Username (Required) *</label>
                                                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                            </div>

                                            <div className="col-md-6 form-floating">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className={`form-control bg-light ${errors.email ? 'is-invalid' : ''}`}
                                                    placeholder="Email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="email" className="ms-2">Official Email Address *</label>
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>

                                            <div className="col-md-12 form-floating">
                                                <input
                                                    type="text"
                                                    id="sponsor"
                                                    className="form-control bg-light"
                                                    placeholder="Sponsor"
                                                    value={data.sponsor}
                                                    onChange={(e) => setData('sponsor', e.target.value)}
                                                />
                                                <label htmlFor="sponsor" className="ms-2">Enroller / Sponsor Username (Optional / If referred by a leader)</label>
                                            </div>
                                        </div>

                                        {/* SECTION 2: PERSONAL IDENTITY */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-id-card me-2"></i> 2. Personal &amp; Contact Details
                                        </h5>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className={`form-control bg-light ${errors.firstName ? 'is-invalid' : ''}`}
                                                    placeholder="First Name"
                                                    value={data.firstName}
                                                    onChange={(e) => setData('firstName', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="firstName" className="ms-2">First Name *</label>
                                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="text"
                                                    id="middleName"
                                                    className="form-control bg-light"
                                                    placeholder="Middle Name"
                                                    value={data.middleName}
                                                    onChange={(e) => setData('middleName', e.target.value)}
                                                />
                                                <label htmlFor="middleName" className="ms-2">Middle Name (Optional)</label>
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    className={`form-control bg-light ${errors.lastName ? 'is-invalid' : ''}`}
                                                    placeholder="Last Name"
                                                    value={data.lastName}
                                                    onChange={(e) => setData('lastName', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="lastName" className="ms-2">Last Name *</label>
                                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                            </div>

                                            <div className="col-md-6 form-floating">
                                                <input
                                                    type="date"
                                                    id="birthdate"
                                                    className={`form-control bg-light ${errors.birthdate ? 'is-invalid' : ''}`}
                                                    value={data.birthdate}
                                                    onChange={(e) => setData('birthdate', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="birthdate" className="ms-2">Date of Birth *</label>
                                                {errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
                                            </div>

                                            <div className="col-md-6 form-floating">
                                                <input
                                                    type="text"
                                                    id="contact"
                                                    className={`form-control bg-light ${errors.contact ? 'is-invalid' : ''}`}
                                                    placeholder="Mobile #"
                                                    value={data.contact}
                                                    onChange={(e) => setData('contact', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="contact" className="ms-2">Mobile / WhatsApp Number (with country code) *</label>
                                                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                            </div>

                                            <div className="col-md-5 form-floating">
                                                <select
                                                    id="country"
                                                    className="form-select bg-light"
                                                    value={data.country}
                                                    onChange={(e) => handleCountryChange(e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Choose your country</option>
                                                    <option value="Philippines">Philippines (PHP ₱)</option>
                                                    <option value="United States">United States (USD $)</option>
                                                    <option value="Papua New Guinea">Papua New Guinea (PGK K)</option>
                                                </select>
                                                <label htmlFor="country" className="ms-2">Country / Region *</label>
                                            </div>

                                            <div className="col-md-7 form-floating">
                                                <input
                                                    type="text"
                                                    id="address"
                                                    className={`form-control bg-light ${errors.address ? 'is-invalid' : ''}`}
                                                    placeholder="Complete Address"
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="address" className="ms-2">Complete Delivery Address (Street, City, Postal Code) *</label>
                                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                            </div>
                                        </div>

                                        {/* SECTION 3: PACKAGE & PRODUCT SET */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-gem me-2"></i> 3. Package &amp; Product Set Selection (Price)
                                        </h5>
                                        <div className="row g-3 mb-3">
                                            <div className="col-12 form-floating">
                                                <select
                                                    id="packageType"
                                                    className={`form-select bg-light ${errors.packageType ? 'is-invalid' : ''}`}
                                                    value={data.packageType}
                                                    onChange={(e) => handlePackageChange(e.target.value)}
                                                    required
                                                    disabled={!selectedCurrency}
                                                >
                                                    <option value="" disabled>{selectedCurrency ? 'Choose your package' : 'Choose your country first'}</option>
                                                    {selectedCurrency && WORLD_PACKAGES.map((pkg) => (
                                                        <option key={pkg.name} value={pkg.name}>
                                                            {pkg.name.toUpperCase()} — {formatWorldPrice(pkg.prices[selectedCurrency], selectedCurrency)}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="packageType" className="ms-2">Select World Plan Package *</label>
                                                {errors.packageType && <div className="invalid-feedback">{errors.packageType}</div>}
                                            </div>
                                        </div>
                                        {selectedCurrency && selectedPackage && (
                                            <div className="rounded-4 border p-3 p-md-4 mb-4" style={{ background: '#f8fbfd', borderColor: '#dce6f0' }}>
                                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                                                    <div>
                                                        <div className="small text-muted fw-bold">{selectedCurrency} WORLD PLAN PACKAGE</div>
                                                        <h5 className="fw-bold mb-0" style={{ color: '#10233d' }}>{selectedPackage.name.toUpperCase()}</h5>
                                                    </div>
                                                    <div className="text-end">
                                                        <div className="fw-bold" style={{ color: '#10233d', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                                                            {formatWorldPrice(selectedPackage.prices[selectedCurrency], selectedCurrency)}
                                                        </div>
                                                        <div className="small text-muted">Product Worth: <strong style={{ color: '#079e9d' }}>{formatWorldPrice(selectedPackage.worth[selectedCurrency], selectedCurrency)}</strong></div>
                                                    </div>
                                                </div>
                                                {selectedPackage.rank && (
                                                    <div className="mb-3">
                                                        <span className="rounded-pill px-3 py-2 d-inline-block fw-bold" style={{ background: '#17243b', color: '#fbbf24', fontSize: 12 }}>
                                                            ★ {selectedPackage.rank.toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="small fw-bold mb-2" style={{ color: '#64748b' }}>PACKAGE INCLUSIONS:</div>
                                                <ul className="list-unstyled mb-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px 18px' }}>
                                                    {selectedInclusions.map((item, index) => (
                                                        <li key={`${selectedCurrency}-${selectedPackage.name}-${index}`} style={{ color: '#334155', fontSize: 14 }}>
                                                            <span style={{ color: '#10b981', marginRight: 8 }}>✓</span>{item}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="small text-muted mt-3">
                                                    Product set is automatically matched to your selected package and currency. These are fixed market prices, not currency conversions.
                                                </div>
                                                <input type="hidden" name="productSet" value={data.productSet} readOnly />
                                                {errors.productSet && <div className="text-danger small mt-2">{errors.productSet}</div>}
                                            </div>
                                        )}

                                        {/* SECTION 4: PAYMENT DETAILS & PROOF */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-credit-card me-2"></i> 4. Payment &amp; Remittance Verification
                                        </h5>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-4 form-floating">
                                                <select
                                                    id="paymentMethod"
                                                    className="form-select bg-light"
                                                    value={data.paymentMethod}
                                                    onChange={(e) => setData('paymentMethod', e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Choose your payment channel</option>
                                                    {paymentMethods.map((pm, i) => (
                                                        <option key={i} value={pm}>{pm}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="paymentMethod" className="ms-2">Payment Channel *</label>
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    id="amountPaid"
                                                    className="form-control bg-light"
                                                    placeholder="Enter amount"
                                                    value={data.amountPaid}
                                                    onChange={(e) => setData('amountPaid', e.target.value)}
                                                />
                                                <label htmlFor="amountPaid" className="ms-2">Amount Paid ({selectedCurrency || 'Select country'})</label>
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="date"
                                                    id="paymentDate"
                                                    className={`form-control bg-light ${errors.paymentDate ? 'is-invalid' : ''}`}
                                                    value={data.paymentDate}
                                                    onChange={(e) => setData('paymentDate', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="paymentDate" className="ms-2">Date of Remittance *</label>
                                                {errors.paymentDate && <div className="invalid-feedback">{errors.paymentDate}</div>}
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-bold text-dark mb-1">
                                                    Upload Payment Proof / Bank Slip / Transfer Screenshot *
                                                </label>
                                                <input
                                                    type="file"
                                                    id="paymentProof"
                                                    className={`form-control bg-light ${errors.paymentProof ? 'is-invalid' : ''}`}
                                                    accept="image/jpeg,image/png,image/webp,application/pdf"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                                <div className="form-text small text-muted">
                                                    Accepted formats: JPG, PNG, WEBP, PDF (Max file size: 10MB).
                                                </div>
                                                {errors.paymentProof && <div className="invalid-feedback d-block">{errors.paymentProof}</div>}

                                                {/* Live Receipt Preview */}
                                                {selectedFileInfo && (
                                                    <div className="mt-3 p-3 bg-light rounded-3 border">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <span className="small fw-bold text-muted">Receipt Document Attached:</span>
                                                            <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                                                ✓ Ready for upload
                                                            </span>
                                                        </div>

                                                        {selectedFileInfo.isImage && previewUrl && (
                                                            <div className="text-center my-2 p-2 bg-white rounded-3 border">
                                                                <img
                                                                    src={previewUrl}
                                                                    alt="Receipt preview"
                                                                    style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                                                                />
                                                            </div>
                                                        )}

                                                        {selectedFileInfo.isPdf && (
                                                            <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border my-2">
                                                                <div style={{ fontSize: '26px' }}>📄</div>
                                                                <div>
                                                                    <div className="fw-bold text-dark small">{selectedFileInfo.name}</div>
                                                                    <div className="text-muted" style={{ fontSize: '11px' }}>PDF Document • {selectedFileInfo.size}</div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top" style={{ fontSize: '11.5px', color: '#64748b' }}>
                                                            <span>{selectedFileInfo.name} ({selectedFileInfo.size})</span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                                                                onClick={() => {
                                                                    setData('paymentProof', null);
                                                                    setSelectedFileInfo(null);
                                                                    setPreviewUrl(null);
                                                                    const el = document.getElementById('paymentProof');
                                                                    if (el) el.value = '';
                                                                }}
                                                            >
                                                                ✕ Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* MANDATORY CONSENT CHECKBOX */}
                                        <div className="p-4 rounded-4 mb-4 border" >
                                            <div className="form-check d-flex align-items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="agreedTerms"
                                                    className="form-check-input mt-1"
                                                    style={{ width: '1.4rem', height: '1.4rem', cursor: 'pointer' }}
                                                    checked={data.agreedTerms}
                                                    onChange={(e) => setData('agreedTerms', e.target.checked)}
                                                    required
                                                />
                                                <label htmlFor="agreedTerms" className="form-check-label" style={{ fontSize: '0.92rem', cursor: 'pointer', lineHeight: 1.6 }}>
                                                    <strong>I agree to the Privacy Policy and Terms of Conditions and consent to the processing of my information.</strong><br />
                                                    I acknowledge that all package payments, memberships, and product allotments are strictly <strong>NON-REFUNDABLE</strong> with lifetime account validity once turned over. I consent to receiving confirmation emails and backoffice notifications from Infinite Live Limitless.
                                                </label>
                                            </div>
                                            {errors.agreedTerms && <div className="text-danger small mt-2 ms-4">{errors.agreedTerms}</div>}
                                        </div>

                                        {/* REGISTRATION VALIDATION ERRORS */}
                                        {Object.keys(errors).length > 0 && (
                                            <div className="alert alert-danger mb-4" role="alert">
                                                <strong>Please correct the following errors:</strong>
                                                <ul className="mb-0 mt-2">
                                                    {Object.entries(errors).map(([field, message]) => (
                                                        <li key={field}>{message}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* SUBMIT BUTTON */}
                                        <div className="d-flex flex-column flex-sm-row gap-3 align-items-center justify-content-between pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(1)}
                                                className="btn btn-outline-secondary px-4 py-3 rounded-pill fw-semibold"
                                            >
                                                <i className="bi bi-arrow-left me-2"></i> Back to Policies
                                            </button>

                                            <button
                                                type="submit"
                                                disabled={processing || !data.agreedTerms}
                                                className="btn btn-lg px-5 py-3 fw-bold text-white shadow"
                                                style={{
                                                    backgroundColor: data.agreedTerms ? 'var(--ch-teal)' : '#94a3b8',
                                                    borderRadius: '50px',
                                                    border: 'none',
                                                    cursor: data.agreedTerms ? 'pointer' : 'not-allowed',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {processing ? (
                                                    <span>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Submitting Application...
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <i className="bi bi-check2-circle me-2"></i> Submit Registration &amp; Payment Proof
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* ========================================================
                                STEP 3: SUCCESS / CONFIRMATION
                            ======================================================== */}
                            {currentStep === 3 && (
                                <div className="registration-card registration-confirmation bg-white rounded-4 shadow-lg p-4 p-md-5 border text-center">
                                    <div className="confirmation-success-icon mx-auto mb-3" aria-hidden="true">
                                        <i className="bi bi-check2-circle"></i>
                                    </div>
                                    <span className="confirmation-eyebrow">APPLICATION RECEIVED</span>
                                    <h2 className="fw-bold mt-2 mb-2">Registration Successfully Submitted!</h2>
                                    <p className="confirmation-intro mx-auto mb-4">
                                        Thank you, <strong>{data.firstName} {data.lastName}</strong>! Your registration for
                                        <strong> {data.packageType}</strong> has been received and is awaiting administrator review.
                                    </p>

                                    <div className="confirmation-status mx-auto mb-4" role="status">
                                        <i className="bi bi-clock-history" aria-hidden="true"></i>
                                        <div className="text-start">
                                            <strong>Pending Administrator Review</strong>
                                            <span>Your application has been submitted. We will notify you of any updates.</span>
                                        </div>
                                    </div>

                                    <div className="confirmation-summary mx-auto mb-4 text-start">
                                        <div className="confirmation-section-title">
                                            <i className="bi bi-card-checklist" aria-hidden="true"></i>
                                            <h3>Application Summary</h3>
                                        </div>
                                        <dl className="confirmation-details">
                                            <div><dt>Username</dt><dd>{data.username}</dd></div>
                                            <div><dt>Email Address</dt><dd>{data.email}</dd></div>
                                            <div><dt>World Plan Package</dt><dd>{selectedPackage && selectedCurrency ? `${data.packageType} — ${formatWorldPrice(selectedPackage.prices[selectedCurrency], selectedCurrency)}` : 'Not selected'}</dd></div>
                                            <div><dt>Product Set</dt><dd>{data.productSet}</dd></div>
                                            <div><dt>Country / Region</dt><dd>{data.country}</dd></div>
                                            <div><dt>Amount Paid</dt><dd>{data.amountPaid ? `${data.amountPaid} ${selectedCurrency}` : 'Not provided'}</dd></div>
                                            <div><dt>Terms &amp; Privacy</dt><dd className="confirmation-accepted"><i className="bi bi-check-circle-fill me-1" aria-hidden="true"></i> Agreed &amp; Accepted</dd></div>
                                        </dl>
                                    </div>

                                    <div className="confirmation-next mx-auto mb-4 text-start">
                                        <div className="confirmation-next-icon"><i className="bi bi-envelope-check" aria-hidden="true"></i></div>
                                        <div>
                                            <h3>What happens next?</h3>
                                            <p>Check <strong>{data.email}</strong> for your confirmation details and any available secure edit link. Your registration will remain pending until an administrator completes the review.</p>
                                        </div>
                                    </div>

                                    <div className="confirmation-actions d-flex flex-column flex-sm-row justify-content-center gap-3">
                                        <Link href="/" className="btn btn-outline-secondary rounded-pill px-4 py-3 fw-semibold">
                                            <i className="bi bi-house me-2" aria-hidden="true"></i> Return to Homepage
                                        </Link>
                                        <Link href="/" className="btn confirmation-primary rounded-pill px-4 py-3 fw-bold text-white">
                                            Explore INFINITE Website <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                                        </Link>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* MINIMAL FOOTER FOR REGISTRATION */}
            <footer className="registration-footer py-4 text-center text-white-50 small border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'var(--ch-dark-slate, #0f172a)' }}>
                <div className="container">
                    <p className="mb-1 text-slate-400">
                        &copy; {new Date().getFullYear()} INFINITE LIVE LIMITLESS. All rights reserved.
                    </p>
                    <p className="mb-0 text-slate-500" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-shield-lock-fill me-1" style={{ color: 'var(--ch-teal)' }}></i> Encrypted 256-bit SSL Secure Registration Portal
                    </p>
                </div>
            </footer>
        </div>
    );
}
