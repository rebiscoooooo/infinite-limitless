import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Shield, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
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
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-dot-matrix font-barlow">
            <Head title="Admin Portal Authentication | INFINITE" />

            {/* Ambient Backlight */}
            <div className="absolute w-[500px] h-[500px] bg-ch-teal/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex flex-col items-center text-decoration-none">
                        <span className="font-bebas text-5xl font-black text-white tracking-widest leading-none">
                            INFINITE<span className="text-ch-teal">.</span>
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-ch-teal mt-1">
                            EXECUTIVE PORTAL ACCESS
                        </span>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="rounded-3xl p-8 bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white tracking-tight">System Sign In</h2>
                        <p className="text-xs text-slate-400 mt-1">Authorized personnel and system administrator credentials required.</p>
                    </div>

                    {errors.username && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-3">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>{errors.username}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <User className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="Username (e.g. admin)"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300 mb-0">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-white/20 bg-slate-950 text-ch-teal focus:ring-ch-teal"
                                />
                                <span>Remember session</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all duration-200 disabled:opacity-60 border-0"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Enter Console</span>
                                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-slate-500">
                    <Link href="/" className="hover:text-ch-teal transition-colors text-decoration-none text-slate-400">
                        &larr; Return to Public Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
