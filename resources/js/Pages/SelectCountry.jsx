import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { Globe, ArrowRight, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function SelectCountry({ countries = [] }) {
    const [selectedCode, setSelectedCode] = useState('');
    const [error, setError] = useState('');

    const handleContinue = (e) => {
        e.preventDefault();
        if (!selectedCode) {
            setError('Please select your region or country first.');
            return;
        }

        router.visit(`/join-community/${selectedCode}`);
    };

    return (
        <AppLayout>
            <Head title="Choose Your Region | INFINITE Global Network" />

            <section className="py-16 md:py-24 relative overflow-hidden bg-dot-matrix min-h-[75vh] flex items-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column: Form & Instructions */}
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <span className="text-xs uppercase font-bold tracking-[0.25em] text-ch-teal">
                                    OUR GLOBAL FOOTPRINT
                                </span>
                                <h1 className="font-bebas text-5xl sm:text-7xl tracking-wide text-white mt-1 leading-none">
                                    CHOOSE YOUR REGION
                                </h1>
                                <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                                    Access localized business presentations, native currencies (CFA, PGK, PHP, USD), shipping rates, and regional hub contacts.
                                </p>
                            </div>

                            <form onSubmit={handleContinue} className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label htmlFor="country-select" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Select Country or Operating Territory
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="country-select"
                                            value={selectedCode}
                                            onChange={(e) => {
                                                setSelectedCode(e.target.value);
                                                setError('');
                                            }}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/15 text-white text-base focus:outline-none focus:ring-2 focus:ring-ch-teal focus:border-transparent transition-all shadow-xl"
                                        >
                                            <option value="" disabled>-- Select Your Country / Region --</option>
                                            {countries.map((c) => (
                                                <option key={c.code} value={c.code}>
                                                    {c.name} ({c.currency})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-glow-teal hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <span>Continue to Presentation</span>
                                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Visual World Map Representation */}
                        <div className="lg:col-span-5">
                            <div className="rounded-3xl p-8 bg-slate-900/80 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                                <div className="flex items-center gap-2 mb-6">
                                    <Globe className="w-5 h-5 text-ch-teal" />
                                    <span className="text-xs uppercase font-bold tracking-widest text-slate-300">
                                        Active Distribution Reach
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {countries.slice(0, 6).map((c) => (
                                        <button
                                            key={c.code}
                                            onClick={() => setSelectedCode(c.code)}
                                            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                                                selectedCode === c.code
                                                    ? 'bg-ch-teal/20 border-ch-teal text-white font-bold'
                                                    : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={c.flag}
                                                    alt={c.name}
                                                    className="w-6 h-4 object-cover rounded"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <span>{c.name}</span>
                                            </div>
                                            <span className="text-[10px] text-ch-teal uppercase tracking-wider font-semibold">
                                                {c.currency}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span>DHL Insured Cargo to all destinations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
