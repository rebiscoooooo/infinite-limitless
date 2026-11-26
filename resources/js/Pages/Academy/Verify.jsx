import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { getCountryInfo } from '../../Utils/academyBadges';
import {
    GraduationCap,
    Clock,
    ArrowRight,
    LogIn,
    Award,
    Mail,
    UserCheck,
    Sparkles,
    Shield,
    CheckCircle2,
    Calendar,
    Phone,
    MapPin,
    ArrowLeft,
} from 'lucide-react';

export default function Verify({ submittedMember }) {
    const country = submittedMember ? (submittedMember.country_info || getCountryInfo(submittedMember.phone_country_code)) : null;
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });

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

    return (
        <div
            className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#24dbc3] selection:text-[#031927] antialiased relative overflow-hidden"
            style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <Head title="Application Pending Verification - Legacy Club Academy | INFINITE" />

            {/* Top Dual-Color Accent Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Clean White Navigation with Live Clock */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 no-underline group">
                        <img
                            src="/assets/image/academy/logo-black-trimmed.png"
                            alt="Legacy Club PH"
                            className="h-9 sm:h-11 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div>
                            <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 flex items-center gap-1.5 font-mono">
                                LEGACY CLUB <span className="text-[#0f766e]">ACADEMY</span>
                            </span>
                            <span className="block text-[10px] tracking-[0.2em] text-slate-500 font-semibold uppercase">
                                Application Verification Status
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* Live Clock Pill */}
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
                            href="/academy-login"
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#0f766e] hover:text-[#115e59] py-2 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 border-0 transition-all no-underline"
                        >
                            <LogIn className="w-4 h-4" /> Go to Login
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center relative z-10">
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-lg text-center relative overflow-hidden">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    {/* Pending Animated Icon Badge */}
                    <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center mx-auto mb-6 text-amber-600 shadow-xs relative">
                        <Clock className="w-10 h-10 animate-pulse" />
                        <div className="absolute -bottom-2.5 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
                            Under Review
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Application Successfully Submitted
                    </h1>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                        Your registration for the <strong className="text-slate-900">Legacy Club Academy</strong> is now queued for verification. The Executive Board is reviewing your profile and will assign your official rank tier.
                    </p>

                    {/* Applicant Information Summary (Reference User Card Style) */}
                    {submittedMember && (
                        <div className="mt-8 bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 sm:p-6 text-left max-w-lg mx-auto border-l-4 border-l-[#f59e0b] shadow-2xs">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e] flex items-center gap-1.5">
                                    <UserCheck className="w-4 h-4" /> Official Application Receipt
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                    Pending Approval
                                </span>
                            </div>

                            <div className="space-y-2.5 text-xs">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-medium">Tracking Member ID:</span>
                                    <span className="text-[#0f766e] font-mono font-bold text-sm">{submittedMember.member_id}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-medium">Applicant Legal Name:</span>
                                    <span className="text-slate-900 font-bold">{submittedMember.full_name}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-medium">Notification Email:</span>
                                    <span className="text-slate-700 font-mono">{submittedMember.email}</span>
                                </div>
                                {country && (
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-medium">Applicant Country / Region:</span>
                                        <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                                            <span className="text-base leading-none">{country.flag}</span>
                                            <span>{country.country}</span>
                                            <span className="text-slate-400 font-mono text-[11px]">({submittedMember.phone_country_code})</span>
                                        </span>
                                    </div>
                                )}
                                {submittedMember.created_at && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 font-medium">Submitted At:</span>
                                        <span className="text-slate-600 font-mono text-[11px]">
                                            {new Date(submittedMember.created_at).toLocaleString('en-PH', {
                                                timeZone: 'Asia/Manila',
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Official Tier Preview Roadmap */}
                    <div className="mt-8 p-6 rounded-2xl bg-slate-50/80 border border-slate-200 text-left">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-center gap-2">
                            <Award className="w-4 h-4 text-[#0f766e]" /> What Happens Next?
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-lg mx-auto">
                            Upon review, our administrators will activate your portal login and designate your official rank tier:
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5 text-center">
                            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col items-center">
                                <img src="/assets/image/academy/badge-rookie.png" alt="Rookie Badge" className="w-14 h-auto object-contain filter drop-shadow-xs" />
                                <div className="text-[11px] font-bold text-slate-800 font-mono mt-2">ROOKIE</div>
                                <span className="text-[10px] text-amber-500 font-bold">★ Tier I</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white border border-teal-200 shadow-2xs flex flex-col items-center">
                                <img src="/assets/image/academy/badge-elite.png" alt="Elite Badge" className="w-14 h-auto object-contain filter drop-shadow-xs" />
                                <div className="text-[11px] font-bold text-[#0f766e] font-mono mt-2">ELITE</div>
                                <span className="text-[10px] text-amber-500 font-bold">★★ Tier II</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-2xs flex flex-col items-center">
                                <img src="/assets/image/academy/badge-master.png" alt="Master Badge" className="w-14 h-auto object-contain filter drop-shadow-xs" />
                                <div className="text-[11px] font-bold text-amber-800 font-mono mt-2">MASTER</div>
                                <span className="text-[10px] text-amber-500 font-bold">★★★ Tier III</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs flex flex-col items-center">
                                <img src="/assets/image/academy/badge-grand-master.png" alt="Grand Master Badge" className="w-14 h-auto object-contain filter drop-shadow-xs" />
                                <div className="text-[11px] font-bold text-purple-800 font-mono mt-2">GRAND MASTER</div>
                                <span className="text-[10px] text-amber-500 font-bold">★★★★ Tier IV</span>
                            </div>
                            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white border-2 border-amber-400 shadow-2xs flex flex-col items-center">
                                <img src="/assets/image/academy/badge-legend.png" alt="Legend Badge" className="w-14 h-auto object-contain filter drop-shadow-xs" />
                                <div className="text-[11px] font-black text-slate-900 font-mono mt-2">LEGEND</div>
                                <span className="text-[10px] text-amber-500 font-bold">★★★★★ Tier V</span>
                            </div>
                        </div>

                        <p className="text-[11px] text-slate-500 mt-5 text-center flex items-center justify-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#0f766e]" />
                            <span>You will receive an official approval email once your account is ready for sign in.</span>
                        </p>
                    </div>

                    {/* Action Links */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/academy-login"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md no-underline cursor-pointer border-0 outline-none"
                        >
                            <span>Proceed to Login Portal</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all no-underline border-0 outline-none"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
