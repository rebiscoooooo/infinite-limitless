import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import InquiryForm from './InquiryForm';
import OwnerModal from './OwnerModal';
import { MapPin, Mail, Phone, Globe, Shield, Heart } from 'lucide-react';

export default function AppFooter() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState('primo');

    const openOwnerModal = (ownerKey) => {
        setSelectedOwner(ownerKey);
        setModalOpen(true);
    };

    return (
        <footer id="contact" className="relative bg-slate-950 text-slate-300 border-t border-white/10 pt-20 pb-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-ch-teal/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
                    {/* Brand & Global Mission Column */}
                    <div className="lg:col-span-6 space-y-6">
                        <div>
                            <span className="font-bebas text-5xl sm:text-6xl font-black text-white tracking-widest leading-none">
                                INFINITE<span className="text-ch-teal">.</span>
                            </span>
                            <p className="text-xs uppercase tracking-[0.3em] font-bold text-ch-teal mt-1">
                                LIVE LIMITLESS GLOBAL PLATFORM
                            </p>
                        </div>

                        <p className="text-slate-400 text-base max-w-lg leading-relaxed">
                            Empowering global entrepreneurs through clinical-grade organic wellness, luxury Korean skincare, and an unprecedented borderless compensation matrix.
                        </p>

                        <div className="space-y-3 pt-2 text-sm text-slate-300">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-ch-teal shrink-0" />
                                <span>Global Distribution Hubs: Manila &bull; Ouagadougou &bull; Douala &bull; Port Moresby</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-ch-teal shrink-0" />
                                <span>admin@infinite-limitless.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-ch-teal shrink-0" />
                                <span>DHL Global Express Insured Freight Delivery</span>
                            </div>
                        </div>

                        {/* Co-Founders & Ownership Links */}
                        <div className="pt-4 border-t border-white/10">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                Executive Co-Founders & Leadership
                            </span>
                            <div className="flex items-center gap-4 text-sm">
                                <button
                                    onClick={() => openOwnerModal('primo')}
                                    className="text-ch-teal hover:text-ch-teal-light font-medium underline underline-offset-4 transition-colors"
                                >
                                    Primo Ecalne Jr.
                                </button>
                                <span className="text-slate-600">&bull;</span>
                                <button
                                    onClick={() => openOwnerModal('aera')}
                                    className="text-ch-teal hover:text-ch-teal-light font-medium underline underline-offset-4 transition-colors"
                                >
                                    Aera Claridad
                                </button>
                            </div>
                        </div>

                        {/* Quick Page Links */}
                        <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
                            <Link href="/barley" className="hover:text-ch-teal transition-colors">Infinite Barley</Link>
                            <Link href="/olamour" className="hover:text-ch-teal transition-colors">O'Lamour Skincare</Link>
                            <Link href="/world-plan" className="hover:text-ch-teal transition-colors">World Plan</Link>
                            <Link href="/info" className="hover:text-ch-teal transition-colors">Proof of Legitimacy</Link>
                            <Link href="/select-country" className="hover:text-ch-teal transition-colors">Choose Region</Link>
                            <Link href="/admin/login" className="hover:text-ch-teal transition-colors">Admin Login</Link>
                        </div>
                    </div>

                    {/* Integrated Inquiry Form Column */}
                    <div className="lg:col-span-6">
                        <InquiryForm />
                    </div>
                </div>

                {/* Subfooter */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} INFINITE: Live Limitless. All Rights Reserved.</p>
                    <p className="flex items-center gap-1">
                        Crafted with modern Laravel 11 + React + Tailwind CSS
                    </p>
                </div>
            </div>

            {/* Owner Bio Modal */}
            <OwnerModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                ownerKey={selectedOwner}
            />
        </footer>
    );
}
