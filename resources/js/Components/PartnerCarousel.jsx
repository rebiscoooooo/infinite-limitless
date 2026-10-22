import React, { useState, useEffect, useRef } from 'react';

export default function PartnerCarousel({ partners = [] }) {
    if (!partners || partners.length === 0) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);

    // Responsive items count matching OwlCarousel config: 0 -> 1, 768 -> 2, 992 -> 3
    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 992) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        updateItems();
        window.addEventListener('resize', updateItems);
        return () => window.removeEventListener('resize', updateItems);
    }, []);

    const maxIndex = Math.max(0, partners.length - itemsPerView);

    // Autoplay every 4000ms, pause on hover (matching OwlCarousel autoplay: true, autoplayTimeout: 4000, autoplayHoverPause: true)
    useEffect(() => {
        if (isPaused || maxIndex <= 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused, maxIndex]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
    };

    return (
        <div
            className="position-relative overflow-hidden py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Sliding Track */}
            <div
                className="d-flex transition-transform"
                style={{
                    transform: `translateX(-${(currentIndex * (100 / itemsPerView))}%)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            >
                {partners.map((member, index) => {
                    const flagSrc = `/assets/image/flags/${(member.country_code || 'ph').toLowerCase()}.png`;

                    return (
                        <div
                            key={index}
                            className="px-2 flex-shrink-0"
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            <div
                                className="card border-0 position-relative overflow-hidden shadow-sm h-100"
                                style={{
                                    height: '650px',
                                    borderRadius: '1.5rem',
                                    background: 'linear-gradient(135deg, #0f172a 0%, #14b8a6 100%)',
                                }}
                            >
                                <img
                                    src={member.image}
                                    className="team-img"
                                    alt={member.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />

                                <div
                                    className="position-absolute bottom-0 start-0 w-100 d-flex flex-column align-items-center justify-content-end pb-4"
                                    style={{
                                        height: '70%',
                                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 100%)',
                                        zIndex: 2,
                                    }}
                                >
                                    <h3
                                        className="text-white fw-medium mb-1 w-100 px-3"
                                        style={{
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: 'clamp(2rem, 2.5vw, 2.8rem)',
                                            letterSpacing: '1px',
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {member.name}
                                    </h3>

                                    <div className="d-flex align-items-center mb-3 text-white">
                                        <img
                                            src={flagSrc}
                                            alt="Flag"
                                            style={{
                                                width: '20px',
                                                height: '14px',
                                                marginRight: '8px',
                                                objectFit: 'cover',
                                                borderRadius: '2px',
                                            }}
                                        />
                                        <b style={{ fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                            {member.country}
                                        </b>
                                    </div>

                                    <div
                                        className="d-flex flex-column align-items-start justify-content-center px-4 py-3 shadow-sm hover-lift"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '1rem',
                                            width: '85%',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {member.whatsapp && (
                                            <p className="mb-2 w-100 text-truncate" style={{ color: 'var(--ch-white)', fontSize: '1rem' }}>
                                                <i className="bi bi-whatsapp me-2" style={{ color: '#25D366' }}></i>
                                                <a
                                                    href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {member.whatsapp}
                                                </a>
                                            </p>
                                        )}

                                        {member.email && (
                                            <p className="mb-0 w-100 text-truncate" style={{ color: 'var(--ch-white)', fontSize: '1rem' }}>
                                                <i className="bi bi-envelope-fill me-2" style={{ color: 'var(--ch-teal)' }}></i>
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {member.email}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Carousel Dots Matching Owl Carousel Dots */}
            {maxIndex > 0 && (
                <div className="d-flex justify-content-center gap-2 mt-4">
                    {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                        <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setCurrentIndex(dotIdx)}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                            style={{
                                width: currentIndex === dotIdx ? '28px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                backgroundColor: currentIndex === dotIdx ? 'var(--ch-teal, #14b8a6)' : '#cbd5e1',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
