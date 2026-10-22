import React, { useEffect, useState } from 'react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!visible) return null;

    return (
        <button
            id="backToTop"
            onClick={scrollToTop}
            className="btn border-0 shadow"
            aria-label="Back to top"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                display: 'flex',
                backgroundColor: 'var(--ch-teal)',
                color: '#fff',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                zIndex: 999,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
        >
            <i className="bi bi-arrow-up fs-5"></i>
        </button>
    );
}
