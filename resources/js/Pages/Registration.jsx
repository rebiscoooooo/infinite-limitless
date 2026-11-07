import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Registration({
    packageOptions = [],
    productSets = [],
    countries = [],
    paymentMethods = []
}) {
    // Current step in the registration wizard: 1 = Terms & Privacy, 2 = Application Form, 3 = Completed
    const [currentStep, setCurrentStep] = useState(1);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        sponsor: '',
        username: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        contact: '',
        country: 'Philippines',
        address: '',
        packageType: packageOptions[2]?.name || 'Ruby Executive Global Plan',
        productSet: productSets[0] || 'Set A - Complete O\'Lamour Luxury Skincare + Infinite Barley Pack',
        paymentMethod: paymentMethods[0] || 'Bank Deposit / Wire Transfer',
        amountPaid: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentProof: null,
        agreedTerms: false,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('paymentProof', file);
        if (file && file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleContinueToForm = () => {
        setCurrentStep(2);
        window.scrollTo({ top: 380, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/registration', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setCurrentStep(3);
                window.scrollTo({ top: 200, behavior: 'smooth' });
            },
        });
    };

    return (
        <div style={{ backgroundColor: 'var(--ch-dark-slate, #0f172a)', minHeight: '100vh', color: '#ffffff', fontFamily: "'Barlow', sans-serif" }}>
            <Head>
                <title>Official World Plan Registration | Infinite Live Limitless</title>
                <meta name="description" content="Register your official Infinite World Plan account. Complete international distributor onboarding, product set selection, and payment verification." />
            </Head>

            {/* BRAND HEADER BAR */}
            <header className="py-3 px-4 border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.98)' }}>
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
            <section className="position-relative pt-4 pb-4" style={{ background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 118, 110, 0.2) 100%)' }}>
                <div className="container pt-4 text-center">
                    <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: 'rgba(20, 184, 166, 0.15)', color: '#5eead4', border: '1px solid rgba(20, 184, 166, 0.3)', letterSpacing: '2px', fontSize: '0.8rem' }}>
                        <i className="bi bi-globe-americas me-2"></i> GLOBAL ONBOARDING PORTAL
                    </span>
                    <h1 className="fw-bold display-5 text-white mb-3" style={{ fontFamily: "'Bebas Neue', 'Barlow', sans-serif", letterSpacing: '1.5px' }}>
                        INFINITE WORLD PLAN <span style={{ color: 'var(--ch-teal)' }}>REGISTRATION</span>
                    </h1>
                    <p className="text-white-50 mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        Launch your international venture. Secure your global genealogy node, select your wholesale product sets, and enjoy 24/7 automated backoffice management.
                    </p>

                    {/* STEPPER PROGRESS */}
                    <div className="d-flex justify-content-center align-items-center gap-2 gap-md-4 mt-4 mx-auto" style={{ maxWidth: '580px' }}>
                        <div className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${currentStep === 1 ? 'bg-ch-teal text-slate-900 font-bold' : 'bg-slate-800 text-slate-300'}`} style={{ fontSize: '0.85rem' }}>
                            <span className="badge rounded-circle bg-dark text-white">1</span>
                            <span>Terms &amp; Privacy</span>
                        </div>
                        <i className="bi bi-chevron-right text-slate-500"></i>
                        <div className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${currentStep === 2 ? 'bg-ch-teal text-slate-900 font-bold' : 'bg-slate-800 text-slate-300'}`} style={{ fontSize: '0.85rem' }}>
                            <span className="badge rounded-circle bg-dark text-white">2</span>
                            <span>Application Form</span>
                        </div>
                        <i className="bi bi-chevron-right text-slate-500"></i>
                        <div className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${currentStep === 3 ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400'}`} style={{ fontSize: '0.85rem' }}>
                            <span className="badge rounded-circle bg-dark text-white">3</span>
                            <span>Confirmation</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="py-5" style={{ background: '#f8fafc', color: '#0f172a' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-9">

                            {/* ========================================================
                                STEP 1: TERMS & CONDITIONS & DATA PRIVACY
                            ======================================================== */}
                            {currentStep === 1 && (
                                <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 border" style={{ borderColor: '#e2e8f0' }}>
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
                                            <div className="p-4 rounded-4 h-100 border transition-all" style={{ backgroundColor: '#fff7ed', borderColor: '#fdba74' }}>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="p-3 rounded-3 bg-white text-warning shadow-sm">
                                                        <i className="fa-solid fa-file-invoice-dollar fs-4 text-warning"></i>
                                                    </div>
                                                    <h5 className="fw-bold mb-0 text-dark">Strict Non-Refundable Policy</h5>
                                                </div>
                                                <p className="mb-0" style={{ fontSize: '0.9rem', color: '#7c2d12', lineHeight: 1.6 }}>
                                                    As you have taken process this is strictly <strong>NON-REFUNDABLE</strong>. From now and your lifetime registration validity after we turn over your account, package allotments and system placement cannot be refunded or cancelled once processed.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2: Product Availability & Dispatch */}
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 h-100 border transition-all" style={{ backgroundColor: '#f0fdfa', borderColor: '#99f6e4' }}>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="p-3 rounded-3 bg-white text-teal shadow-sm">
                                                        <i className="fa-solid fa-box-open fs-4" style={{ color: 'var(--ch-teal)' }}></i>
                                                    </div>
                                                    <h5 className="fw-bold mb-0 text-dark">Product Availability &amp; Dispatch</h5>
                                                </div>
                                                <p className="mb-0" style={{ fontSize: '0.9rem', color: '#134e4a', lineHeight: 1.6 }}>
                                                    We will keep you posted with your <strong>products availability</strong> once it is available in your destination area. International shipments are coordinated with DHL and authorized country stockists with official air waybill tracking.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3: 24/7 Online Account Creation */}
                                        <div className="col-md-6">
                                            <div className="p-4 rounded-4 h-100 border transition-all" style={{ backgroundColor: '#f1f5f9', borderColor: '#cbd5e1' }}>
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
                                            <div className="p-4 rounded-4 h-100 border transition-all" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
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
                                    <div className="p-4 rounded-4 my-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
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
                                <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 border" style={{ borderColor: '#e2e8f0' }}>
                                    <div className="d-flex flex-wrap align-items-center justify-content-between pb-3 mb-4 border-bottom">
                                        <div>
                                            <h3 className="fw-bold mb-1" style={{ color: 'var(--ch-dark-slate)' }}>Official Application Form</h3>
                                            <p className="text-muted small mb-0">Fill in your official details to enroll into the World Plan network.</p>
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
                                                <label htmlFor="username" className="ms-2">Username (used for backoffice login) *</label>
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
                                                    onChange={(e) => setData('country', e.target.value)}
                                                    required
                                                >
                                                    {countries.map((c) => (
                                                        <option key={c.code} value={c.name}>{c.name}</option>
                                                    ))}
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
                                            <i className="fa-solid fa-gem me-2"></i> 3. Package &amp; Product Set Selection
                                        </h5>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6 form-floating">
                                                <select
                                                    id="packageType"
                                                    className="form-select bg-light"
                                                    value={data.packageType}
                                                    onChange={(e) => setData('packageType', e.target.value)}
                                                    required
                                                >
                                                    {packageOptions.map((pkg) => (
                                                        <option key={pkg.id} value={pkg.name}>
                                                            {pkg.name} — ({pkg.price})
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="packageType" className="ms-2">Select World Plan Package *</label>
                                            </div>

                                            <div className="col-md-6 form-floating">
                                                <select
                                                    id="productSet"
                                                    className="form-select bg-light"
                                                    value={data.productSet}
                                                    onChange={(e) => setData('productSet', e.target.value)}
                                                    required
                                                >
                                                    {productSets.map((set, idx) => (
                                                        <option key={idx} value={set}>{set}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="productSet" className="ms-2">Product Set Inclusions *</label>
                                            </div>
                                        </div>

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
                                                    {paymentMethods.map((pm, i) => (
                                                        <option key={i} value={pm}>{pm}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="paymentMethod" className="ms-2">Payment Channel *</label>
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="text"
                                                    id="amountPaid"
                                                    className="form-control bg-light"
                                                    placeholder="e.g. $1,750 USD or ₱72,888"
                                                    value={data.amountPaid}
                                                    onChange={(e) => setData('amountPaid', e.target.value)}
                                                />
                                                <label htmlFor="amountPaid" className="ms-2">Amount Paid &amp; Currency (e.g. $1,750 USD)</label>
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

                                                {/* Live Image Preview */}
                                                {previewUrl && (
                                                    <div className="mt-3 p-3 bg-light rounded-3 border text-center">
                                                        <p className="small text-muted mb-2">Receipt Preview:</p>
                                                        <img
                                                            src={previewUrl}
                                                            alt="Receipt preview"
                                                            style={{ maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* MANDATORY CONSENT CHECKBOX */}
                                        <div className="p-4 rounded-4 mb-4 border" style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
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
                                                <label htmlFor="agreedTerms" className="form-check-label" style={{ fontSize: '0.92rem', color: '#78350f', cursor: 'pointer', lineHeight: 1.6 }}>
                                                    <strong>I agree to the Privacy Policy and Terms of Conditions and consent to the processing of my information.</strong><br />
                                                    I acknowledge that all package payments, memberships, and product allotments are strictly <strong>NON-REFUNDABLE</strong> with lifetime account validity once turned over. I consent to receiving confirmation emails and backoffice notifications from Infinite Live Limitless.
                                                </label>
                                            </div>
                                            {errors.agreedTerms && <div className="text-danger small mt-2 ms-4">{errors.agreedTerms}</div>}
                                        </div>

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
                                <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 border text-center" style={{ borderColor: '#e2e8f0' }}>
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow" style={{ width: '90px', height: '90px', background: 'rgba(20, 184, 166, 0.15)', color: 'var(--ch-teal)' }}>
                                        <i className="bi bi-check-circle-fill display-4"></i>
                                    </div>

                                    <h2 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)' }}>Registration Successfully Submitted!</h2>
                                    <p className="text-muted fs-5 mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                        Thank you, <strong>{data.firstName} {data.lastName}</strong>! Your application for the <strong>{data.packageType}</strong> has been received and routed to our administration desk.
                                    </p>

                                    {/* Confirmation Details Card */}
                                    <div className="p-4 rounded-4 text-start mx-auto mb-4" style={{ maxWidth: '640px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                        <h6 className="fw-bold text-dark mb-3 border-bottom pb-2">
                                            <i className="bi bi-clipboard-check text-success me-2"></i> Submitted Application Summary
                                        </h6>
                                        <div className="row g-2" style={{ fontSize: '0.9rem' }}>
                                            <div className="col-sm-5 text-muted">Registered Username:</div>
                                            <div className="col-sm-7 fw-bold text-dark">{data.username}</div>
                                            <div className="col-sm-5 text-muted">Email Address:</div>
                                            <div className="col-sm-7 text-dark">{data.email}</div>
                                            <div className="col-sm-5 text-muted">Package Level:</div>
                                            <div className="col-sm-7 fw-bold" style={{ color: 'var(--ch-teal)' }}>{data.packageType}</div>
                                            <div className="col-sm-5 text-muted">Product Set:</div>
                                            <div className="col-sm-7 text-dark">{data.productSet}</div>
                                            <div className="col-sm-5 text-muted">Country / Territory:</div>
                                            <div className="col-sm-7 text-dark">{data.country}</div>
                                            <div className="col-sm-5 text-muted">Terms &amp; Non-Refundable:</div>
                                            <div className="col-sm-7 text-success fw-bold"><i className="bi bi-check-circle me-1"></i> Agreed &amp; Accepted</div>
                                            <div className="col-sm-5 text-muted">Application Status:</div>
                                            <div className="col-sm-7"><span className="badge bg-warning text-dark">PENDING ADMINISTRATOR REVIEW</span></div>
                                        </div>
                                    </div>

                                    {/* Next Steps Notification */}
                                    <div className="alert alert-info text-start mx-auto mb-4 shadow-sm" style={{ maxWidth: '640px', borderRadius: '12px' }}>
                                        <h6 className="fw-bold mb-1"><i className="bi bi-envelope-check me-2"></i> Confirmation Email Sent</h6>
                                        <p className="small mb-0" style={{ lineHeight: 1.6 }}>
                                            We have sent a detailed confirmation email to <strong>{data.email}</strong>. It contains your full application details, terms and privacy policy summary, plus a <strong>secure edit link</strong> allowing you to update your information if needed before admin approval.
                                        </p>
                                    </div>

                                    <div className="d-flex flex-wrap gap-3 justify-content-center pt-2">
                                        <Link
                                            href="/"
                                            className="btn btn-outline-dark px-4 py-2.5 rounded-pill fw-semibold"
                                        >
                                            <i className="bi bi-house me-1"></i> Return to Homepage
                                        </Link>
                                        <Link
                                            href="/"
                                            className="btn px-4 py-2.5 rounded-pill fw-bold text-white shadow-sm"
                                            style={{ backgroundColor: 'var(--ch-teal)' }}
                                        >
                                            🌐 Explore INFINITE Website <i className="bi bi-arrow-right ms-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            {/* MINIMAL FOOTER FOR REGISTRATION */}
            <footer className="py-4 text-center text-white-50 small border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'var(--ch-dark-slate, #0f172a)' }}>
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
