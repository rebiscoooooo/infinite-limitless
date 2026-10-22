import React from 'react';

const countries = [
    { name: "COTE D'IVOIRE", flag: '/assets/image/flags/cote.png' },
    { name: 'CAMEROON', flag: '/assets/image/flags/cameroon.png' },
    { name: 'DEMOCRATIC REPUBLIC OF CONGO', flag: '/assets/image/flags/dc.png' },
    { name: 'PAPUA NEW GUINEA', flag: '/assets/image/flags/pp.png' },
    { name: 'SOUTH AFRICA', flag: '/assets/image/flags/sa.png' },
    { name: 'TOGO', flag: '/assets/image/flags/tg.png' },
    { name: 'UGANDA', flag: '/assets/image/flags/ug.png' },
];

export default function CountryFlagMarquee() {
    // 2 sets for infinite loop scrolling
    const list = [...countries, ...countries];

    return (
        <div className="country-scroll-wrapper">
            <div className="country-scroll-track">
                {list.map((c, i) => (
                    <div key={i} className="country-card" data-country={c.name}>
                        <img src={c.flag} alt={c.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
