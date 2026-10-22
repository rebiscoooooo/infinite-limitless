import React, { useEffect, useState } from 'react';

export default function Preloader() {
    const [hidden, setHidden] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 1200);

        const removeTimer = setTimeout(() => {
            setHidden(true);
        }, 1800);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

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
