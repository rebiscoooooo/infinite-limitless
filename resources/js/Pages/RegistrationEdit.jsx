import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RegistrationEdit({
    registration = {},
    packageOptions = [],
    productSets = [],
    paymentMethods = []
}) {
    const [previewUrl, setPreviewUrl] = useState(registration.payment_proof_url || null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        firstName: registration.first_name || '',
        middleName: registration.middle_name || '',
        lastName: registration.last_name || '',
        birthdate: registration.birthdate ? registration.birthdate.split('T')[0] : '',
        contact: registration.contact_no || '',
        country: registration.country || 'Philippines',
        address: registration.address || '',
        sponsor: registration.sponsor || '',
        packageType: registration.package_type || packageOptions[0] || 'Ruby Executive Global Plan',
        productSet: registration.product_set || productSets[0] || '',
        paymentMethod: registration.payment_method || paymentMethods[0] || '',
        amountPaid: registration.amount_paid || '',
        paymentDate: registration.payment_date ? registration.payment_date.split('T')[0] : '',
        paymentProof: null,
    });

    const isPending = registration.status === 'Pending';
    const isApproved = registration.status === 'Approved';
    const isRejected = registration.status === 'Rejected';

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
            setPreviewUrl(registration.payment_proof_url || null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/registration/edit/${registration.edit_token}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div style={{ backgroundColor: 'var(--ch-dark-slate, #0f172a)', minHeight: '100vh', color: '#ffffff', fontFamily: "'Barlow', sans-serif" }}>
            <Head>
                <title>{`Edit Registration - ${registration.full_name || 'Member'} | Infinite`}</title>
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

            {/* HEADER */}
            <section className="position-relative pt-4 pb-4" style={{ background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 118, 110, 0.2) 100%)' }}>
                <div className="container pt-4 text-center">
                    <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: 'rgba(20, 184, 166, 0.15)', color: '#5eead4', border: '1px solid rgba(20, 184, 166, 0.3)', letterSpacing: '2px', fontSize: '0.8rem' }}>
                        <i className="bi bi-pencil-square me-2"></i> REGISTRATION MANAGEMENT PORTAL
                    </span>
                    <h1 className="fw-bold display-6 text-white mb-2" style={{ fontFamily: "'Bebas Neue', 'Barlow', sans-serif", letterSpacing: '1.5px' }}>
                        UPDATE YOUR <span style={{ color: 'var(--ch-teal)' }}>REGISTRATION DETAILS</span>
                    </h1>
                    <p className="text-white-50 mx-auto" style={{ maxWidth: '640px', fontSize: '0.95rem' }}>
                        Modify your contact details, shipping address, or product set selection before final administrator verification.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-5" style={{ background: '#f8fafc', color: '#0f172a' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-9">

                            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 border" style={{ borderColor: '#e2e8f0' }}>

                                {/* APPLICATION STATUS BAR */}
                                <div className="d-flex flex-wrap align-items-center justify-content-between p-3 rounded-4 mb-4" style={{ backgroundColor: isApproved ? '#f0fdf4' : (isRejected ? '#fef2f2' : '#fefce8'), border: `1px solid ${isApproved ? '#bbf7d0' : (isRejected ? '#fecaca' : '#fef08a')}` }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="p-2.5 rounded-circle bg-white shadow-sm">
                                            {isApproved && <i className="bi bi-check-circle-fill text-success fs-4"></i>}
                                            {isRejected && <i className="bi bi-x-circle-fill text-danger fs-4"></i>}
                                            {isPending && <i className="bi bi-hourglass-split text-warning fs-4"></i>}
                                        </div>
                                        <div>
                                            <div className="small text-muted text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Current Application Status</div>
                                            <div className="fw-bold fs-6" style={{ color: isApproved ? '#166534' : (isRejected ? '#991b1b' : '#854d0e') }}>
                                                {registration.status?.toUpperCase()} &bull; Username: @{registration.username}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge rounded-pill px-3 py-2 mt-2 mt-sm-0" style={{ backgroundColor: isApproved ? '#16a34a' : (isRejected ? '#dc2626' : '#d97706'), color: '#fff' }}>
                                        Registered on {new Date(registration.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {recentlySuccessful && (
                                    <div className="alert alert-success d-flex align-items-center rounded-3 shadow-sm mb-4">
                                        <i className="bi bi-check-circle-fill fs-4 me-3 text-success"></i>
                                        <div><strong>Changes Saved Successfully!</strong><br />Your updated registration information has been recorded and an updated confirmation has been emailed to you.</div>
                                    </div>
                                )}

                                {!isPending && (
                                    <div className="alert alert-info rounded-3 p-4 mb-4">
                                        <h6 className="fw-bold mb-1"><i className="bi bi-info-circle-fill me-2"></i> Application Already Processed</h6>
                                        <p className="mb-0 small" style={{ lineHeight: 1.6 }}>
                                            This registration has already been marked as <strong>{registration.status}</strong> by our administration team. To request further adjustments, please contact our support desk directly at <strong>admin@infinite-limitless.com</strong>.
                                        </p>
                                    </div>
                                )}

                                {isPending ? (
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        {/* PERSONAL IDENTITY */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-user me-2"></i> Personal Information
                                        </h5>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className={`form-control bg-light ${errors.firstName ? 'is-invalid' : ''}`}
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
                                                    value={data.contact}
                                                    onChange={(e) => setData('contact', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="contact" className="ms-2">Contact / WhatsApp Number *</label>
                                                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                            </div>

                                            <div className="col-md-5 form-floating">
                                                <input
                                                    type="text"
                                                    id="country"
                                                    className="form-control bg-light"
                                                    value={data.country}
                                                    onChange={(e) => setData('country', e.target.value)}
                                                />
                                                <label htmlFor="country" className="ms-2">Country / Region</label>
                                            </div>

                                            <div className="col-md-7 form-floating">
                                                <input
                                                    type="text"
                                                    id="address"
                                                    className={`form-control bg-light ${errors.address ? 'is-invalid' : ''}`}
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="address" className="ms-2">Complete Shipping Address *</label>
                                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                            </div>

                                            <div className="col-12 form-floating">
                                                <input
                                                    type="text"
                                                    id="sponsor"
                                                    className="form-control bg-light"
                                                    value={data.sponsor}
                                                    onChange={(e) => setData('sponsor', e.target.value)}
                                                />
                                                <label htmlFor="sponsor" className="ms-2">Enroller / Sponsor Username (Optional)</label>
                                            </div>
                                        </div>

                                        {/* PACKAGE & PRODUCT SET */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-gem me-2"></i> Package &amp; Product Selection
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
                                                    {packageOptions.map((pkg, i) => (
                                                        <option key={i} value={pkg}>{pkg}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="packageType" className="ms-2">Package Level *</label>
                                            </div>

                                            <div className="col-md-6 form-floating">
                                                <select
                                                    id="productSet"
                                                    className="form-select bg-light"
                                                    value={data.productSet}
                                                    onChange={(e) => setData('productSet', e.target.value)}
                                                    required
                                                >
                                                    {productSets.map((ps, i) => (
                                                        <option key={i} value={ps}>{ps}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="productSet" className="ms-2">Product Set Inclusions *</label>
                                            </div>
                                        </div>

                                        {/* PAYMENT & RECEIPT */}
                                        <h5 className="fw-bold mb-3" style={{ color: 'var(--ch-teal)' }}>
                                            <i className="fa-solid fa-receipt me-2"></i> Payment Details &amp; Receipt Proof
                                        </h5>
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-4 form-floating">
                                                <select
                                                    id="paymentMethod"
                                                    className="form-select bg-light"
                                                    value={data.paymentMethod}
                                                    onChange={(e) => setData('paymentMethod', e.target.value)}
                                                >
                                                    {paymentMethods.map((pm, i) => (
                                                        <option key={i} value={pm}>{pm}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="paymentMethod" className="ms-2">Payment Method</label>
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="text"
                                                    id="amountPaid"
                                                    className="form-control bg-light"
                                                    value={data.amountPaid}
                                                    onChange={(e) => setData('amountPaid', e.target.value)}
                                                />
                                                <label htmlFor="amountPaid" className="ms-2">Amount Paid &amp; Currency</label>
                                            </div>

                                            <div className="col-md-4 form-floating">
                                                <input
                                                    type="date"
                                                    id="paymentDate"
                                                    className="form-control bg-light"
                                                    value={data.paymentDate}
                                                    onChange={(e) => setData('paymentDate', e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="paymentDate" className="ms-2">Payment Date *</label>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-bold text-dark mb-1">
                                                    Update Payment Proof (Leave empty to keep existing receipt)
                                                </label>
                                                <input
                                                    type="file"
                                                    id="paymentProof"
                                                    className={`form-control bg-light ${errors.paymentProof ? 'is-invalid' : ''}`}
                                                    accept="image/jpeg,image/png,image/webp,application/pdf"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="form-text small text-muted">
                                                    Upload a new JPG, PNG, or PDF if you need to submit a clearer payment receipt.
                                                </div>
                                                {errors.paymentProof && <div className="invalid-feedback d-block">{errors.paymentProof}</div>}

                                                {/* Newly Selected File Preview */}
                                                {selectedFileInfo && (
                                                    <div className="mt-3 p-3 bg-light text-dark rounded-3 border">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <span className="small fw-bold text-success">✓ New Receipt Selected</span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                                                                onClick={() => {
                                                                    setData('paymentProof', null);
                                                                    setSelectedFileInfo(null);
                                                                    setPreviewUrl(registration.payment_proof_url || null);
                                                                    const el = document.getElementById('paymentProof');
                                                                    if (el) el.value = '';
                                                                }}
                                                            >
                                                                ✕ Clear Selection
                                                            </button>
                                                        </div>
                                                        {selectedFileInfo.isImage && previewUrl && (
                                                            <div className="text-center p-2 bg-white rounded border my-2">
                                                                <img
                                                                    src={previewUrl}
                                                                    alt="New Payment proof preview"
                                                                    style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                                                                />
                                                            </div>
                                                        )}
                                                        {selectedFileInfo.isPdf && (
                                                            <div className="d-flex align-items-center gap-2 p-2 bg-white rounded border my-2">
                                                                <span style={{ fontSize: '24px' }}>📄</span>
                                                                <div className="small">
                                                                    <strong>{selectedFileInfo.name}</strong> ({selectedFileInfo.size})
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Existing Uploaded Receipt */}
                                                {!selectedFileInfo && registration.payment_proof && (
                                                    <div className="mt-3 p-3 bg-light text-dark rounded-3 border">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <span className="small fw-bold text-muted">Currently Uploaded Receipt:</span>
                                                            <a
                                                                href={registration.payment_proof_url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="small fw-bold text-teal text-decoration-none"
                                                            >
                                                                Open in New Tab &rarr;
                                                            </a>
                                                        </div>
                                                        {registration.is_pdf_receipt || registration.payment_proof?.toLowerCase().endsWith('.pdf') ? (
                                                            <div className="d-flex align-items-center gap-3 p-3 bg-white rounded border text-start">
                                                                <div style={{ fontSize: '28px', color: '#dc2626' }}>📄</div>
                                                                <div>
                                                                    <div className="fw-bold small">{registration.payment_proof}</div>
                                                                    <div className="text-muted" style={{ fontSize: '11px' }}>PDF Document Receipt</div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-center p-2 bg-white rounded border">
                                                                <img
                                                                    src={registration.payment_proof_url}
                                                                    alt="Current Payment Proof"
                                                                    style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center pt-3 border-top">
                                            <Link href="/" className="btn btn-outline-secondary px-4 py-2.5 rounded-pill">
                                                Cancel
                                            </Link>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
                                                style={{ backgroundColor: 'var(--ch-teal)', borderRadius: '50px' }}
                                            >
                                                {processing ? 'Saving Updates...' : 'Save & Update Details'}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-4">
                                        <Link href="/" className="btn btn-dark px-4 py-2.5 rounded-pill fw-semibold">
                                            Return to Homepage
                                        </Link>
                                    </div>
                                )}
                            </div>

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

