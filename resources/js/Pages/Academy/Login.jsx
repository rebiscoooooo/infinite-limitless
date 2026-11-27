import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { resetAnnouncementPopup } from '../../Layouts/AcademyLayout';
import {
    GraduationCap,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    ArrowLeft,
    Clock,
    Award,
    Shield,
    ArrowRight,
} from 'lucide-react';

export default function Login() {
    const page = usePage();
    const flash = page.props?.flash || {};

    const [showPassword, setShowPassword] = useState(false);
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Manila',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            const dateString = now.toLocaleDateString('en-US', {
                timeZone: 'Asia/Manila',
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }).toUpperCase();
            setCurrentTime({ time: timeString, date: dateString });
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        resetAnnouncementPopup();
        post('/academy-login', {
            preserveScroll: true,
        });
    };

    return (
        <div
            className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#24dbc3] selection:text-[#031927] antialiased relative overflow-hidden"
            style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <Head title="Legacy Club Academy - Member Login | INFINITE" />

            {/* Top Dual-Color Accent Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Clean Light Top Navigation with Live Clock */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 no-underline group">
                        <img
                            src="/assets/image/academy/logo-black-trimmed.png?v=2"
                            alt="Legacy Club PH"
                            className="h-9 sm:h-11 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div>
                            <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 flex items-center gap-1.5 font-mono">
                                LEGACY CLUB <span className="text-[#0f766e]">ACADEMY</span>
                            </span>
                            <span className="block text-[10px] tracking-[0.2em] text-slate-500 font-semibold uppercase">
                                Member Authentication Portal
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* Live PHT Clock Pill (Reference Style) */}
                        <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
                            <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#0f766e]">
                                <Clock className="w-3.5 h-3.5 animate-pulse" />
                            </div>
                            <div className="text-left font-mono">
                                <div className="text-xs font-black text-slate-900 tracking-tight leading-none">
                                    {currentTime.time || '12:00:00 PM'} <span className="text-[10px] font-bold text-[#0f766e]">PHT</span>
                                </div>
                                <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                                    {currentTime.date || 'MANILA, PH'}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/academy-register"
                            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0f766e] bg-slate-100 hover:bg-slate-200/80 py-2 px-3 sm:px-4 rounded-xl transition-all border-0 no-underline whitespace-nowrap"
                        >
                            <span className="sm:hidden">Apply &rarr;</span>
                            <span className="hidden sm:inline">Apply for Membership &rarr;</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-md w-full mx-auto px-4 py-10 sm:py-16 flex flex-col justify-center relative z-10">
                {/* Hero Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Member Portal Login</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Sign In to Academy
                    </h1>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                        Access your official member credentials, dashboard, and rank privileges.
                    </p>
                </div>

                {/* Clean White Login Card */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    {/* Status Alerts */}
                    {flash.success && (
                        <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {flash.error && (
                        <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                            <span>{flash.error}</span>
                        </div>
                    )}

                    {errors.email && (
                        <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                            <div className="flex-1">
                                <p className="font-bold">{errors.email}</p>
                                {errors.email.toLowerCase().includes('pending') && (
                                    <Link
                                        href="/academy-verify"
                                        className="inline-flex items-center gap-1 mt-2 text-[#0f766e] hover:underline font-bold"
                                    >
                                        <span>View Application Status Page</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Member Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="member@example.com"
                                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                    required
                                    autoFocus
                                />
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your account password"
                                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                    required
                                />
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute inset-y-0 right-1.5 w-9 flex items-center justify-center text-slate-400 hover:text-[#0f766e] cursor-pointer border-0 bg-transparent p-0 outline-none shadow-none transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                />
                                <span>Remember my login</span>
                            </label>
                            <Link href="/academy-verify" className="text-slate-500 hover:text-[#0f766e] font-semibold no-underline">
                                Verification pending?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-6 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold uppercase text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4 cursor-pointer border-0 outline-none"
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Authenticating Member...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    <span>Sign In to Member Portal</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Official Tier Preview Badges */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3 flex items-center justify-center gap-1">
                            <Award className="w-3 h-3 text-[#f59e0b]" /> Official Academy Rank Tiers
                        </div>
                        <div className="grid grid-cols-5 gap-2 text-center">
                            <div className="flex flex-col items-center">
                                <img src="/assets/image/academy/badge-rookie.png" alt="Rookie" className="w-10 h-auto object-contain filter drop-shadow-xs" />
                                <span className="text-[9px] font-bold text-slate-600 mt-1 font-mono">Rookie</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="/assets/image/academy/badge-elite.png" alt="Elite" className="w-10 h-auto object-contain filter drop-shadow-xs" />
                                <span className="text-[9px] font-bold text-[#0f766e] mt-1 font-mono">Elite</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="/assets/image/academy/badge-master.png" alt="Master" className="w-10 h-auto object-contain filter drop-shadow-xs" />
                                <span className="text-[9px] font-bold text-amber-700 mt-1 font-mono">Master</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="/assets/image/academy/badge-grand-master.png" alt="Grand Master" className="w-10 h-auto object-contain filter drop-shadow-xs" />
                                <span className="text-[9px] font-bold text-purple-700 mt-1 font-mono">Grand</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="/assets/image/academy/badge-legend.png" alt="Legend" className="w-10 h-auto object-contain filter drop-shadow-xs" />
                                <span className="text-[9px] font-bold text-red-700 mt-1 font-mono">Legend</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
                        <div>
                            Don't have an academy account yet?{' '}
                            <Link href="/academy-register" className="text-[#0f766e] font-bold no-underline hover:text-[#115e59]">
                                Register here &rarr;
                            </Link>
                        </div>
                        <div>
                            <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 no-underline">
                                <ArrowLeft className="w-3 h-3" /> Return to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
