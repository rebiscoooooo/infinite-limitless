import React from 'react';

export default function TestimonialGrid({ testimonials = [], reviews = [] }) {
    return (
        <div className="row justify-content-center g-4 align-items-stretch">
            {testimonials.map((t, idx) => (
                <div key={t.id || idx} className="col-md-6 col-lg-4 col-xl-4 reveal visible">
                    <div className="testimony-card text-center h-100">
                        {/* App Style Mock Header */}
                        <div className="app-style-header">
                            <div className="dots-wrapper">
                                <span className="header-dot bg-danger"></span>
                                <span className="header-dot bg-warning"></span>
                                <span className="header-dot bg-success"></span>
                            </div>
                            <div className="header-text">{t.brand}</div>
                        </div>

                        {/* Images Grid */}
                        <div className="testimony-images-grid">
                            <div className="before-after-wrapper">
                                <div className="img-block before position-relative">
                                    <img src={t.before_img} alt="Before" />
                                    <span className="badge bg-dark position-absolute top-0 start-0 m-2 shadow-sm">
                                        BEFORE
                                    </span>
                                </div>

                                <div className="testimony-arrow">
                                    <i
                                        className="fa-solid fa-arrow-right-long"
                                        style={{ color: 'var(--ch-dark-slate)', fontSize: '1.1rem' }}
                                    ></i>
                                </div>

                                <div className="img-block after position-relative">
                                    <img src={t.after_img} alt="After" />
                                    <span className="badge bg-success position-absolute top-0 start-0 m-2 shadow-sm">
                                        AFTER <i className="fa-solid fa-heart ms-1 text-white"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="testimony-product-info">
                            <div className="testimony-product-img-wrapper">
                                <img src={t.product_img} alt={t.product_name} />
                            </div>
                            <h4 className="product-name">{t.product_name}</h4>
                            <p className="product-desc">{t.product_desc}</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* LOWER REVIEW CARDS */}
            {reviews && reviews.length > 0 && (
                <div className="row g-4 mt-5 justify-content-center">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="col-12 col-md-6 col-xl-4 reveal visible">
                            <div className="review-card h-100">
                                <div className="stars mb-3">★★★★★</div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="review-user">
                                    <div className="review-avatar">
                                        <img src={review.image} alt={review.name} />
                                    </div>
                                    <div>
                                        <div className="review-name">{review.name}</div>
                                        <div className="review-location">
                                            <i className="bi bi-geo-alt-fill me-1"></i>
                                            {review.loc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Community Quote at Bottom */}
            <div className="col-12 text-center mt-5 reveal visible">
                <p className="text-muted mx-auto" style={{ maxWidth: '800px', fontSize: '1rem' }}>
                    <b>
                        <i>
                            "Transformation is a deeply personal experience, and here, we celebrate the milestones of our community.{' '}
                            <br className="d-none d-md-block" />
                            This gallery highlights the intersection of self-care and tangible change, showcasing how our solutions empower individuals to look and feel their best."
                        </i>
                    </b>
                </p>
            </div>
        </div>
    );
}
