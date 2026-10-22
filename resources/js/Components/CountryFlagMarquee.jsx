import React from 'react';

const countries = [
    { name: 'Burkina Faso', code: 'bf', flag: '/assets/image/flags/bf.svg' },
    { name: 'Cameroon', code: 'cm', flag: '/assets/image/flags/cm.svg' },
    { name: 'Côte d\'Ivoire', code: 'ci', flag: '/assets/image/flags/ci.svg' },
    { name: 'Dem. Rep. Congo', code: 'drc', flag: '/assets/image/flags/cd.svg' },
    { name: 'Papua New Guinea', code: 'png', flag: '/assets/image/flags/pg.svg' },
    { name: 'Philippines', code: 'ph', flag: '/assets/image/flags/ph.svg' },
    { name: 'South Africa', code: 'sa', flag: '/assets/image/flags/za.svg' },
    { name: 'Togo', code: 'tg', flag: '/assets/image/flags/tg.svg' },
    { name: 'Uganda', code: 'ug', flag: '/assets/image/flags/ug.svg' },
    { name: 'Zimbabwe', code: 'zw', flag: '/assets/image/flags/zw.svg' },
];

export default function CountryFlagMarquee() {
    // Duplicate array for seamless infinite marquee loop
    const marqueeItems = [...countries, ...countries];

    return (
        <div className="w-full overflow-hidden py-4 border-y border-white/10 bg-slate-950/60 backdrop-blur-sm">
            <div className="flex animate-marquee gap-8 items-center">
                {marqueeItems.map((c, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/5 whitespace-nowrap shrink-0 group hover:border-ch-teal/50 transition-colors"
                    >
                        <img
                            src={c.flag}
                            alt={c.name}
                            className="w-6 h-4 object-cover rounded shadow-sm"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 group-hover:text-ch-teal transition-colors">
                            {c.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
