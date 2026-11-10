import React, { useEffect, useState } from 'react';

export default function Preloader() {
    // If already preloaded during this browser session, skip completely for instant navigation
    const [hidden, setHidden] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                return !!sessionStorage.getItem('infinite_preloaded');
            } catch (e) {
                return false;
            }
        }
        return false;
    });
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (hidden) return;

        // Snappy initial cold-load intro: brief 250ms branded flash, then fade out smoothly
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 250);

        const removeTimer = setTimeout(() => {
            setHidden(true);
            try {
                sessionStorage.setItem('infinite_preloaded', 'true');
            } catch (e) {
                // ignore
            }
        }, 600);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [hidden]);

    if (hidden) return null;

    return (
        <div id="infinite-preloader" className={fadeOut ? 'fade-out' : ''}>
            <div className="preloader-content">
                <span className="preloader-brand">INFINITE</span>
                <span className="preloader-slogan">LIVE LIMITLESS</span>
                <div className="preloader-line"></div>
            </div>
        </div>
    );
}
