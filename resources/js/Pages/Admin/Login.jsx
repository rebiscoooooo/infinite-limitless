import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Lock,
    User,
    ArrowRight,
    Loader2,
    AlertCircle,
    Eye,
    EyeOff,
    ArrowLeft,
    Clock,
    Sparkles,
    CheckCircle2,
    KeyRound,
} from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });

    const { data, setData, post, processing, errors } = useForm({
        username: '',
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
        post('/admin/login');
    };

    return (
        <div
            className="min-h-screen min-h-[100dvh] w-full bg-[#f8fafc] flex flex-col font-sans text-slate-800 antialiased selection:bg-[#24dbc3] selection:text-[#031927] relative overflow-hidden"
            style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <Head title="Admin Executive Portal Sign In | INFINITE" />

            {/* Top Dual-Color Accent Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* Subtle Institutional Background Shapes */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Navigation Bar with Live PHT Clock */}
            <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/90 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex flex-col items-start justify-center no-underline group shrink-0">
                        <img
                            src="/assets/image/logo.webp"
                            alt="INFINITE — Live Limitless"
                            className="h-7 sm:h-8 w-auto object-contain transition-opacity group-hover:opacity-85"
                        />
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-[#0f766e] uppercase leading-none mt-1">
                            Executive Console
                        </span>
                    </Link>

                    {/* Live PHT Clock Pill (Reference Style) */}
                    <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
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
                </div>
            </header>

            {/* Main Center Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 relative z-10">
                <div className="w-full max-w-[460px] mx-auto">
                    {/* Security Badge Pill */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-[11px] font-bold uppercase tracking-widest shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Executive Access Only</span>
                        </div>
                        <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Administrator Sign In
                        </h1>
                        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                            Authorized personnel only. Sessions are encrypted and audited.
                        </p>
                    </div>

                    {/* Institutional White Sign-in Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-lg">
                        {/* Top Accent Gradient Line */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        {/* Error Alert */}
                        {errors.username && (
                            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800">
                                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                                <div className="flex-1">
                                    <strong className="block font-bold">Authentication Failed</strong>
                                    <span>{errors.username}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Operator Username
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="e.g. admin"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 focus:bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-700 cursor-pointer border-0 bg-transparent outline-none shadow-none"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <label className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                    />
                                    <span>Remember this station</span>
                                </label>
                                <span className="text-[11px] font-bold text-slate-400">
                                    TLS 1.3 Secured
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm hover:shadow-md transition-all disabled:cursor-wait disabled:opacity-60 cursor-pointer border-0 outline-none"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Verifying Identity...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Access Executive Console</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[11px]">System Status: Operational</span>
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 no-underline transition-colors hover:text-[#0f766e]"
                            >
                                <ArrowLeft className="w-3 h-3" /> Public Website
                            </Link>
                        </div>
                    </div>

                    {/* Footer text */}
                    <div className="mt-6 text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} INFINITE Enterprise &bull; Live Limitless Global Ecosystem
                    </div>
                </div>
            </div>
        </div>
    );
}
