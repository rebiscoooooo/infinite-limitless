import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Shield, Lock, User, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div
            className="min-h-screen min-h-[100dvh] w-full relative overflow-x-hidden overflow-y-auto flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 text-slate-100"
            style={{
                background: 'radial-gradient(ellipse at 50% 44%, #071c2c 0%, #031323 49%, #020d1b 100%)',
                fontFamily: "'Barlow', 'Inter', sans-serif"
            }}
        >
            <Head title="Admin Executive Portal Sign In | INFINITE" />

            {/* Decorative corner ribbons — purely visual with responsive containment */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
                <div
                    className="absolute -top-52 -left-56 h-[340px] sm:h-[420px] w-[500px] sm:w-[650px] rotate-[-31deg] rounded-[48%] border-b border-teal-400/70"
                    style={{ background: 'linear-gradient(155deg, #073b42 10%, #008c89 51%, #012532 72%, transparent 90%)', boxShadow: '0 0 75px rgba(15,217,195,.18)' }}
                />
                <div
                    className="absolute -top-60 -left-28 h-[280px] sm:h-[340px] w-[460px] sm:w-[570px] rotate-[-33deg] rounded-[48%] border-b border-teal-300/25"
                    style={{ background: 'linear-gradient(165deg, #02232e, #07525a 52%, #032536 83%)' }}
                />
                <div
                    className="absolute -bottom-56 -right-56 h-[350px] sm:h-[430px] w-[540px] sm:w-[720px] rotate-[-30deg] rounded-[48%] border-t border-teal-400/80"
                    style={{ background: 'linear-gradient(155deg, transparent 8%, #033e48 38%, #006b6c 65%, #01202c 95%)', boxShadow: '0 0 90px rgba(15,217,195,.13)' }}
                />
                <div
                    className="absolute -bottom-64 -right-32 h-[300px] sm:h-[370px] w-[480px] sm:w-[650px] rotate-[-31deg] rounded-[48%] border-t border-teal-300/20"
                    style={{ background: 'linear-gradient(150deg, transparent, #053c48 52%, #04202d)' }}
                />
            </div>

            <div className="relative z-10 w-full max-w-[640px] mx-auto my-auto">
                {/* Brand header */}
                <div className="mb-7 sm:mb-9 text-center">
                    <Link href="/" className="group inline-flex flex-col items-center no-underline">
                        <svg aria-hidden="true" viewBox="0 0 120 55" className="mb-2 h-9 w-20 sm:h-[48px] sm:w-[105px] drop-shadow-[0_0_12px_rgba(39,220,192,.2)]">
                            <defs>
                                <linearGradient id="infiniteMark" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#42efce" />
                                    <stop offset="55%" stopColor="#15cbb7" />
                                    <stop offset="100%" stopColor="#068b9e" />
                                </linearGradient>
                            </defs>
                            <path d="M60 27 C43 7 28 4 16 13 C1 24 11 44 27 43 C40 42 49 29 60 27 C72 24 81 12 94 12 C113 12 116 43 95 43 C82 43 72 31 60 27" fill="none" stroke="url(#infiniteMark)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[clamp(36px,8vw,62px)] font-black tracking-[.045em] leading-none text-white" style={{ fontFamily: "'Barlow', 'Arial', sans-serif" }}>
                            INFINITE<span className="text-[#25dec0]">.</span>
                        </span>
                        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-5 px-2">
                            <span className="h-px w-8 sm:w-16 bg-[#18cdbb]/70" />
                            <span className="text-[10px] sm:text-[13px] md:text-[15px] tracking-[.25em] sm:tracking-[.42em] font-bold text-[#27dec9] uppercase text-center">
                                EXECUTIVE PORTAL
                            </span>
                            <span className="h-px w-8 sm:w-16 bg-[#18cdbb]/70" />
                        </div>
                    </Link>
                </div>

                {/* Sign-in card */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-[#2c6973]/75 bg-[#061726]/90 px-5 py-6 sm:px-10 sm:py-8 md:px-12 shadow-[0_22px_75px_rgba(0,0,0,.45)] backdrop-blur-xl">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                    
                    <div className="mb-6 sm:mb-7 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-3.5 sm:gap-5">
                        <div className="flex h-14 w-14 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl border border-[#1b7079]/75 bg-[#082334] text-[#2ce3ce] shadow-[inset_0_0_18px_rgba(16,212,196,.08)]">
                            <Shield className="h-7 w-7 sm:h-9 sm:w-9 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-2xl md:text-[28px] font-extrabold leading-tight tracking-tight text-white">System Sign In</h2>
                            <p className="mt-1 text-xs sm:text-sm md:text-[15px] leading-snug text-slate-300">Authorized personnel credentials required.</p>
                        </div>
                    </div>

                    {errors.username && (
                        <div className="mb-5 flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-950/80 p-3.5 text-xs sm:text-sm text-rose-200">
                            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                            <span>{errors.username}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold uppercase tracking-[.04em] text-slate-300">Username</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5 text-slate-300">
                                    <User className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.7]" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="Enter username"
                                    className="w-full rounded-xl sm:rounded-2xl border border-[#597587] bg-[#10293a]/80 py-3 sm:py-[15px] pl-12 sm:pl-[64px] pr-4 text-base sm:text-[17px] text-white placeholder-slate-400 outline-none transition-all focus:border-[#29e3cb] focus:ring-2 focus:ring-[#29e3cb]/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold uppercase tracking-[.04em] text-slate-300">Password</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5 text-slate-300">
                                    <Lock className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.7]" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl sm:rounded-2xl border border-[#597587] bg-[#10293a]/80 py-3 sm:py-[15px] pl-12 sm:pl-[64px] pr-12 sm:pr-14 text-base sm:text-[17px] text-white placeholder-slate-400 outline-none transition-all focus:border-[#29e3cb] focus:ring-2 focus:ring-[#29e3cb]/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute inset-y-0 right-0 flex items-center border-0 bg-transparent pr-4 sm:pr-5 text-slate-300 transition-colors hover:text-[#2ce3ce] cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" /> : <Eye className="h-5 w-5 sm:h-6 sm:w-6" />}
                                </button>
                            </div>
                        </div>

                        <label className="flex cursor-pointer items-center gap-3 pt-1 text-sm sm:text-[15px] text-slate-100">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer rounded border-slate-500 bg-[#10293a] accent-[#2ce3c5] focus:ring-[#2ce3c5]"
                            />
                            <span>Remember session</span>
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-2 flex w-full items-center justify-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-[17px] border-0 bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] px-5 sm:px-6 py-3.5 sm:py-[17px] text-sm sm:text-base md:text-[18px] font-extrabold uppercase text-[#031927] shadow-[0_10px_30px_rgba(23,210,183,.2)] transition-all hover:brightness-110 active:scale-[.99] disabled:cursor-wait disabled:opacity-60 cursor-pointer"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Enter Console</span>
                                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4">
                        <span className="h-px flex-1 bg-[#307381]/80" />
                        <Link href="/" className="inline-flex shrink-0 items-center gap-2 text-xs sm:text-[14px] md:text-[15px] text-slate-200 no-underline transition-colors hover:text-[#27e0c7]">
                            <span className="text-[#27e0c7]">←</span> Return to Public Website
                        </Link>
                        <span className="h-px flex-1 bg-[#307381]/80" />
                    </div>
                </div>
            </div>
        </div>
    );
}
