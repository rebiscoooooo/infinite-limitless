import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, MapPin } from 'lucide-react';

export default function PartnerCarousel({ partners = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? partners.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === partners.length - 1 ? 0 : prev + 1));
    };

    if (!partners || partners.length === 0) return null;

    return (
        <div className="relative">
            {/* Desktop Grid / Mobile Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partners.slice(0, 8).map((partner, index) => {
                    const cleanPhone = partner.phone ? partner.phone.replace(/[^0-9]/g, '') : '';
                    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello ${partner.name}, I want to learn more about INFINITE in ${partner.country}.`
                    )}`;

                    return (
                        <div
                            key={index}
                            className="rounded-2xl p-6 bg-slate-900/80 border border-white/10 hover:border-ch-teal/40 transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={partner.flag}
                                            alt={partner.country}
                                            className="w-7 h-5 object-cover rounded shadow"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                        <span className="text-xs uppercase font-bold tracking-wider text-ch-teal">
                                            {partner.country}
                                        </span>
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                </div>

                                <h4 className="font-bebas text-2xl tracking-wide text-white group-hover:text-ch-teal transition-colors">
                                    {partner.name}
                                </h4>
                                <p className="text-xs text-slate-400 font-medium">{partner.role}</p>

                                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                                    <MapPin className="w-3.5 h-3.5 text-ch-teal shrink-0" />
                                    <span>{partner.city}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                                >
                                    <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
                                    <span>WhatsApp Direct</span>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
