import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

export default function TestimonialGrid({ testimonials = [] }) {
    const [sliderPositions, setSliderPositions] = useState({});

    const handleSlide = (id, pos) => {
        setSliderPositions((prev) => ({
            ...prev,
            [id]: pos,
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => {
                const position = sliderPositions[t.id] ?? 50;

                return (
                    <div
                        key={t.id}
                        className="rounded-3xl p-6 bg-slate-900/90 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
                    >
                        {/* Interactive Split Card Comparison */}
                        <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden select-none bg-slate-950 border border-white/5 mb-6 group">
                            {/* After Image (Full background) */}
                            <img
                                src={t.afterImg}
                                alt={`${t.name} After`}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/assets/image/proof1.jpg';
                                }}
                            />
                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold tracking-wider text-ch-teal uppercase border border-ch-teal/30">
                                Result / After
                            </div>

                            {/* Before Image (Clipped overlay) */}
                            <div
                                className="absolute inset-y-0 left-0 overflow-hidden"
                                style={{ width: `${position}%` }}
                            >
                                <img
                                    src={t.beforeImg}
                                    alt={`${t.name} Before`}
                                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                                    style={{ width: '100%' }}
                                    onError={(e) => {
                                        e.target.src = '/assets/image/proof2.jpg';
                                    }}
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold tracking-wider text-slate-300 uppercase border border-white/10">
                                    Baseline / Before
                                </div>
                            </div>

                            {/* Divider line & handle */}
                            <div
                                className="absolute inset-y-0 w-0.5 bg-ch-teal pointer-events-none"
                                style={{ left: `${position}%` }}
                            >
                                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-ch-teal text-ch-dark-slate flex items-center justify-center font-bold text-xs shadow-lg">
                                    &#8644;
                                </div>
                            </div>

                            {/* Range Input slider overlay */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={position}
                                onChange={(e) => handleSlide(t.id, e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                                aria-label="Compare Before and After"
                            />
                        </div>

                        {/* Testimonial Quote & Info */}
                        <div>
                            <div className="flex items-center gap-1 text-amber-400 mb-3">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                                ))}
                            </div>

                            <p className="text-slate-300 text-sm italic leading-relaxed mb-4">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                                <div>
                                    <div className="font-bold text-white flex items-center gap-1">
                                        <span>{t.name}</span>
                                        <CheckCircle className="w-3.5 h-3.5 text-ch-teal" />
                                    </div>
                                    <div className="text-slate-400">{t.location}</div>
                                </div>
                                <span className="px-3 py-1 rounded-lg bg-ch-teal/10 text-ch-teal font-medium border border-ch-teal/20">
                                    {t.product}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
