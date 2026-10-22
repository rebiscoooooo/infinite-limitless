import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Globe, ArrowRight, ShieldCheck, Sparkles, Coffee } from 'lucide-react';

export default function AppNavbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Infinite Barley', href: '/barley', icon: Coffee },
        { name: 'O\'Lamour', href: '/olamour', icon: Sparkles },
        { name: 'World Plan', href: '/world-plan' },
        { name: 'Legitimacy', href: '/info', icon: ShieldCheck },
        { name: 'Region', href: '/select-country', icon: Globe },
    ];

    const isActive = (href) => {
        if (href === '/' && url === '/') return true;
        if (href !== '/' && url.startsWith(href)) return true;
        return false;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex flex-col items-center group">
                            <span className="font-bebas text-4xl sm:text-5xl font-black text-white tracking-widest leading-none group-hover:text-ch-teal transition-colors">
                                INFINITE
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-ch-teal tracking-[0.35em] uppercase -mt-1">
                                LIVE LIMITLESS
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                            active
                                                ? 'bg-ch-teal/15 text-ch-teal font-semibold'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {link.icon && <link.icon className="w-3.5 h-3.5 opacity-80" />}
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link
                                href="/admin/login"
                                className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Portal
                            </Link>
                            <Link
                                href="/join-community/ph"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-glow-teal hover:scale-[1.02]"
                            >
                                <span>Join Us</span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </Link>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <div className="flex lg:hidden items-center gap-2">
                            <Link
                                href="/join-community/ph"
                                className="px-3 py-1.5 rounded-lg bg-ch-teal text-ch-dark-slate font-bold text-xs uppercase tracking-wider"
                            >
                                Join
                            </Link>
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
                                aria-label="Toggle mobile menu"
                            >
                                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Drawer Content */}
                    <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
                        <div>
                            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                                <Link href="/" onClick={() => setMobileOpen(false)} className="flex flex-col">
                                    <span className="font-bebas text-3xl tracking-widest text-white">INFINITE</span>
                                    <span className="text-[9px] font-bold text-ch-teal tracking-[0.25em] uppercase">LIVE LIMITLESS</span>
                                </Link>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 rounded-lg text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="mt-6 flex flex-col gap-2">
                                {navLinks.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                                                active
                                                    ? 'bg-ch-teal text-ch-dark-slate font-bold'
                                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                {link.icon && <link.icon className="w-4 h-4 opacity-75" />}
                                                {link.name}
                                            </span>
                                            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                            <Link
                                href="/join-community/ph"
                                onClick={() => setMobileOpen(false)}
                                className="w-full py-3 rounded-xl bg-ch-teal text-ch-dark-slate font-bold text-center text-sm uppercase tracking-wider"
                            >
                                Join Community
                            </Link>
                            <Link
                                href="/admin/login"
                                onClick={() => setMobileOpen(false)}
                                className="w-full py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white font-medium text-center text-xs uppercase tracking-wider"
                            >
                                Administrator Portal
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
