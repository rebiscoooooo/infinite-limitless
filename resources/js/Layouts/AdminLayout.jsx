import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import FlashToast from '../Components/FlashToast';
import useRealtimeSync from '../Hooks/useRealtimeSync';
import {
    LayoutDashboard,
    Package,
    Inbox,
    Globe,
    Users,
    ShieldCheck,
    LogOut,
    Menu,
    X,
    ExternalLink,
    User,
    Clock,
    Sparkles,
    ChevronRight,
    Mail,
    Bell,
    CheckCircle2,
    Shield,
    Volume2,
    VolumeX,
    RefreshCw,
    Radio,
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Executive Console', subtitle }) {
    const page = usePage();
    const { auth, flash } = page.props || {};
    const currentUrl = page.url || '';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [isTestingEmail, setIsTestingEmail] = useState(false);

    // Realtime Synchronization Engine
    const {
        connected,
        isSyncing,
        lastSynced,
        soundEnabled,
        toggleSound,
        notifications,
        dismissNotification,
        syncNow,
    } = useRealtimeSync({
        isAdmin: true,
        intervalMs: 3500,
    });

    // Live Clock (PHT)
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
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
            setCurrentTime(`${dateString} • ${timeString}`);
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/admin/logout');
    };

    const handleTestEmail = async () => {
        setIsTestingEmail(true);
        try {
            const res = await fetch('/api/mail/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            });
            const data = await res.json();
            if (data.status === 'success') {
                alert(`✓ SMTP Connection Verified!\n\n${data.message}`);
            } else {
                alert(`✗ SMTP Ping Error:\n\n${data.message}`);
            }
        } catch (err) {
            alert(`SMTP Test Failed: ${err.message}`);
        } finally {
            setIsTestingEmail(false);
        }
    };

    const navItems = [
        {
            name: 'Analytics Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
            description: 'Platform KPIs & Activity',
        },
        {
            name: 'Products Catalog',
            href: '/admin/products',
            icon: Package,
            description: 'Manage Store Items & Pricing',
        },
        {
            name: 'Contact Inquiries',
            href: '/admin/inquiries',
            icon: Inbox,
            description: 'Customer Messages & Replies',
        },
        {
            name: 'World Plan Registrations',
            href: '/admin/world-plan',
            icon: Globe,
            description: 'Verify Payment & Onboard',
        },
        {
            name: 'Admin Accounts',
            href: '/admin/admins',
            icon: Users,
            description: 'Staff Roles & Permissions',
        },
        {
            name: 'Activity Audit Logs',
            href: '/admin/activity-logs',
            icon: ShieldCheck,
            description: 'Security & Action History',
        },
    ];

    const isActive = (href) => currentUrl === href || (href !== '/admin' && currentUrl.startsWith(href));

    const adminUsername = auth?.admin?.username || 'admin';
    const adminInitial = adminUsername.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex font-barlow selection:bg-ch-teal selection:text-slate-950 antialiased">
            <FlashToast flash={flash} />

            {/* FLOATING REAL-TIME NOTIFICATION POPUPS */}
            {notifications.length > 0 && (
                <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className="pointer-events-auto p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200"
                        >
                            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                                {n.type === 'world_plan' ? (
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                ) : n.type === 'inquiry' ? (
                                    <Inbox className="w-4 h-4 text-teal-400" />
                                ) : (
                                    <Sparkles className="w-4 h-4 text-teal-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-white flex items-center justify-between">
                                    <span>{n.title}</span>
                                    <span className="text-[10px] text-teal-400 font-mono">Live</span>
                                </div>
                                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                    {n.message}
                                </p>
                            </div>
                            <button
                                onClick={() => dismissNotification(n.id)}
                                className="text-slate-500 hover:text-white p-1 rounded-lg bg-transparent border-0 shrink-0 cursor-pointer"
                                title="Dismiss"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Desktop Fixed Sidebar (Increased width to w-80 so text never truncates) */}
            <aside className="hidden lg:flex flex-col w-80 bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-950 border-r border-slate-800/80 p-5 justify-between shrink-0 h-screen sticky top-0 z-40 shadow-2xl">
                <div className="space-y-6">
                    {/* Brand Header */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-inner flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-ch-teal to-emerald-400 flex items-center justify-center font-bebas text-2xl text-slate-950 shadow-lg shadow-teal-500/20 font-black shrink-0">
                                IN
                            </div>
                            <div>
                                <span className="font-bebas text-2xl tracking-wider text-white block leading-none">
                                    INFINITE<span className="text-ch-teal">.</span>
                                </span>
                                <span className="text-[9px] uppercase font-extrabold tracking-[0.25em] text-ch-teal block mt-1">
                                    EXECUTIVE CONSOLE
                                </span>
                            </div>
                        </div>

                        {/* Animated Online Pulse */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Online</span>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-500 px-3 mb-2 flex items-center justify-between">
                            <span>Main Navigation</span>
                            <span className="text-[9px] text-teal-400/80 font-mono font-semibold">PORTAL</span>
                        </div>
                        <nav className="space-y-1.5">
                            {navItems.map((item) => {
                                const active = isActive(item.href);
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-decoration-none ${
                                            active
                                                ? 'bg-gradient-to-r from-teal-500/20 via-teal-500/10 to-transparent border-l-4 border-l-teal-400 border-y border-r border-teal-500/25 text-white shadow-md'
                                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                                    active
                                                        ? 'bg-ch-teal text-slate-950 shadow-md shadow-teal-500/20'
                                                        : 'bg-slate-800 text-slate-400 group-hover:text-ch-teal group-hover:bg-slate-700/60'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className={`block font-bold leading-tight ${active ? 'text-white' : 'text-slate-200'}`}>
                                                    {item.name}
                                                </span>
                                                <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>

                                        {active && (
                                            <ChevronRight className="w-3.5 h-3.5 text-ch-teal shrink-0 ml-2 animate-pulse" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Bottom Profile & Actions */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    {/* Admin User Card */}
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-ch-teal font-extrabold text-sm shadow shrink-0">
                            {adminInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-white block truncate">
                                {adminUsername}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-400">
                                <Shield className="w-3 h-3 text-ch-teal" />
                                <span>Verified Admin</span>
                            </span>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href="/"
                            target="_blank"
                            className="px-3 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-decoration-none shadow-sm"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3.5 h-3.5 text-ch-teal" />
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Drawer Navigation */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
                    />
                    <aside className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-ch-teal text-slate-950 font-bebas text-xl font-black flex items-center justify-center shadow-lg shadow-teal-500/20">
                                        IN
                                    </div>
                                    <div>
                                        <span className="font-bebas text-xl text-white tracking-wide">INFINITE PORTAL</span>
                                        <span className="text-[9px] uppercase font-bold text-ch-teal block">EXECUTIVE CONSOLE</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <nav className="space-y-1.5">
                                {navItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-decoration-none ${
                                                active
                                                    ? 'bg-ch-teal text-slate-950 font-bold shadow-lg shadow-teal-500/20'
                                                    : 'text-slate-300 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="pt-4 border-t border-slate-800 space-y-2">
                            <Link
                                href="/"
                                target="_blank"
                                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 text-decoration-none"
                            >
                                <ExternalLink className="w-4 h-4 text-ch-teal" />
                                <span>Open Public Website</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full px-3 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 border border-rose-500/30"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-x-hidden">
                {/* Modern Glassmorphic Top Bar */}
                <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    {/* Left: Mobile Toggle & Page Title */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 shrink-0"
                            aria-label="Toggle Navigation"
                        >
                            <Menu className="w-4 h-4" />
                        </button>

                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate mb-0">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-[11px] text-slate-400 truncate hidden sm:block mb-0">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right: Realtime Status & Action Pills */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* REALTIME LIVE SYNC PILL */}
                        <div
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs border transition-all ${
                                connected
                                    ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                                    : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                            }`}
                            title={connected ? 'Realtime live sync active' : 'Reconnecting to realtime stream...'}
                        >
                            <span className="relative flex h-2 w-2">
                                {connected ? (
                                    <>
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </>
                                ) : (
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                )}
                            </span>
                            <span className="text-[11px] font-bold hidden sm:inline">
                                {connected ? (
                                    <span className="text-emerald-400">Live Sync</span>
                                ) : (
                                    <span className="text-rose-400">Reconnecting</span>
                                )}
                            </span>
                        </div>

                        {/* Sound Notification Chime Toggle */}
                        <button
                            type="button"
                            onClick={toggleSound}
                            title={soundEnabled ? 'Notification Chimes: ON (Click to Mute)' : 'Notification Chimes: MUTED (Click to Enable)'}
                            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                                soundEnabled
                                    ? 'text-teal-400 bg-teal-500/10 border-teal-500/30 hover:bg-teal-500/20'
                                    : 'text-slate-500 bg-slate-950 border-slate-800 hover:text-slate-300'
                            }`}
                        >
                            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        </button>

                        {/* Force Instant Manual Sync */}
                        <button
                            type="button"
                            onClick={syncNow}
                            disabled={isSyncing}
                            title="Force immediate refresh without page reload"
                            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-teal-400' : ''}`} />
                        </button>

                        {/* Live PHT Clock */}
                        {currentTime && (
                            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono shadow-inner">
                                <Clock className="w-3.5 h-3.5 text-ch-teal" />
                                <span>{currentTime}</span>
                            </div>
                        )}

                        {/* Test SMTP Ping Button */}
                        <button
                            onClick={handleTestEmail}
                            disabled={isTestingEmail}
                            title="Send quick SMTP diagnostic ping"
                            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 hover:text-teal-200 text-xs font-semibold transition-all cursor-pointer"
                        >
                            <Mail className="w-3.5 h-3.5 text-ch-teal" />
                            <span>{isTestingEmail ? 'Testing...' : 'Test SMTP'}</span>
                        </button>

                        {/* Public Site Quick Pill */}
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white items-center gap-1.5 transition-all text-decoration-none shadow-sm"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3 h-3 text-ch-teal" />
                        </Link>

                        {/* User Avatar Badge */}
                        <div
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-bold text-xs text-slate-950 shadow-md shadow-teal-500/20 shrink-0"
                            title={`Logged in as ${adminUsername}`}
                        >
                            {adminInitial}
                        </div>
                    </div>
                </header>

                {/* Page Content Body */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
