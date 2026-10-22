import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import OwnerModal from './OwnerModal';

export default function AppFooter() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState('primo');
    const [statusMessage, setStatusMessage] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const openOwnerModal = (ownerKey) => {
        setSelectedOwner(ownerKey);
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/inquiries', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
                setTimeout(() => setStatusMessage(null), 5000);
            },
            onError: () => {
                setStatusMessage({ type: 'danger', text: 'Please check your inputs and try again.' });
            }
        });
    };

    return (
        <>
            <footer id="contact" style={{ background: 'var(--ch-dark-slate)', paddingTop: '80px', paddingBottom: '30px' }}>
                <div className="container-fluid px-3 px-lg-5">
                    <div className="row justify-content-center g-5 align-items-center">
                        <div className="col-lg-5 col-xl-4 text-center text-lg-start">
                            <div
                                className="mb-3"
                                style={{
                                    color: '#fff',
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: '50px',
                                    letterSpacing: '2px',
                                }}
                            >
                                INFINITE<span style={{ color: 'var(--ch-teal)' }}>.</span>
                            </div>
                            <p className="mb-4" style={{ color: 'var(--ch-slate-muted)', fontSize: '1.1rem' }}>
                                Empowering Global Entrepreneurs Through Premium Skincare &amp; Wellness
                            </p>
                            <div className="d-flex justify-content-center justify-content-lg-start gap-3 mb-5">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white fs-4" aria-label="Facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white fs-4" aria-label="Instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-white fs-4" aria-label="TikTok">
                                    <i className="bi bi-tiktok"></i>
                                </a>
                                <a href="https://x.com" target="_blank" rel="noreferrer" className="text-white fs-4" aria-label="Twitter">
                                    <i className="bi bi-twitter-x"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-6 col-xl-5 offset-xl-1">
                            <div className="bg-white rounded-4 p-4 p-md-5 shadow">
                                <h3 className="fw-bold mb-2" style={{ color: 'var(--ch-dark-slate)' }}>
                                    Send Us a Message
                                </h3>
                                <p className="text-muted mb-4 small">We respond within 2-3 business days.</p>

                                {statusMessage && (
                                    <div className={`alert alert-${statusMessage.type} rounded-3 shadow-sm mb-4`} role="alert">
                                        {statusMessage.text}
                                    </div>
                                )}

                                <form id="contactForm" onSubmit={handleSubmit} noValidate>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            id="nameInput"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={`form-control bg-light border-0 shadow-none ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Your Name"
                                            required
                                        />
                                        <label htmlFor="nameInput" className="text-muted">
                                            Your Name
                                        </label>
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            id="emailInput"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={`form-control bg-light border-0 shadow-none ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Email Address"
                                            required
                                        />
                                        <label htmlFor="emailInput" className="text-muted">
                                            Email Address
                                        </label>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <select
                                            name="subject"
                                            id="subjectInput"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className={`form-select bg-light border-0 shadow-none ${errors.subject ? 'is-invalid' : ''}`}
                                            required
                                        >
                                            <option value="" disabled>Select Subject</option>
                                            <option value="Order Product">Order Product</option>
                                            <option value="Join Us">Join Us</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>
                                        <label htmlFor="subjectInput" className="text-muted">
                                            Subject
                                        </label>
                                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                                    </div>

                                    <div className="form-floating mb-4">
                                        <textarea
                                            name="message"
                                            id="messageInput"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className={`form-control bg-light border-0 shadow-none ${errors.message ? 'is-invalid' : ''}`}
                                            placeholder="Your message..."
                                            style={{ height: '130px' }}
                                            required
                                        ></textarea>
                                        <label htmlFor="messageInput" className="text-muted">
                                            Your message...
                                        </label>
                                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                    </div>

                                    <button
                                        type="submit"
                                        id="contactSubmitBtn"
                                        disabled={processing}
                                        className="btn w-100 fw-bold py-3 text-white rounded-3 shadow-sm"
                                        style={{ backgroundColor: 'var(--ch-teal)', transition: 'all 0.3s ease' }}
                                    >
                                        <i className="bi bi-send me-2"></i> {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <hr className="mt-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <div
                        className="row align-items-center pb-4 text-center text-md-start"
                        style={{ color: 'var(--ch-slate-muted)', fontSize: '0.85rem' }}
                    >
                        <div className="col-md-6 mb-2 mb-md-0">
                            &copy; {new Date().getFullYear()} Infinite. All rights reserved.
                        </div>

                        <div className="col-md-6 text-md-end">
                            Properties of{' '}
                            <button
                                type="button"
                                className="owner-link bg-transparent border-0 p-0 text-decoration-none"
                                onClick={() => openOwnerModal('primo')}
                                style={{ color: 'var(--ch-teal)', fontWeight: 700 }}
                            >
                                Primo Ecalne Jr.
                            </button>{' '}
                            |{' '}
                            <button
                                type="button"
                                className="owner-link bg-transparent border-0 p-0 text-decoration-none"
                                onClick={() => openOwnerModal('aera')}
                                style={{ color: 'var(--ch-teal)', fontWeight: 700 }}
                            >
                                Aera Claridad
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Owner Modal */}
            <OwnerModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                ownerKey={selectedOwner}
            />
        </>
    );
}
