import React, { useState } from 'react';

/**
 * Renders a crisp colorful country flag across all OSes/browsers (including Windows Chrome/Edge
 * where emoji flags otherwise render as monochrome 2-letter codes), with instant emoji fallback.
 */
export default function CountryFlag({ code, flag = '🌐', country = 'International', className = 'w-5 h-3.5' }) {
    const [imgFailed, setImgFailed] = useState(false);
    const iso = (code || '').toLowerCase().trim();
    const isValidIso = /^[a-z]{2}$/.test(iso);

    if (!isValidIso || imgFailed) {
        return (
            <span className="text-sm leading-none inline-block" title={country} aria-label={country}>
                {flag || '🌐'}
            </span>
        );
    }

    return (
        <img
            src={`https://flagcdn.com/w40/${iso}.png`}
            srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
            alt={country}
            title={country}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className={`${className} rounded-[3px] object-cover shrink-0 inline-block shadow-xs`}
        />
    );
}
