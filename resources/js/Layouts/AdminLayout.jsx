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
        <div
            className="admin-console min-h-screen text-slate-100 flex font-barlow selection:bg-[#24dbc3] selection:text-[#031927] antialiased"
            style={{
                background: 'radial-gradient(ellipse at 50% 15%, #071c2c 0%, #031323 50%, #020d1b 100%)',
                fontFamily: "'Barlow', 'Inter', sans-serif",
            }}
        >
            <FlashToast flash={flash} />

            {/* FLOATING REAL-TIME NOTIFICATION POPUPS */}
            {notifications.length > 0 && (
                <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className="pointer-events-auto p-4 rounded-2xl bg-[#061726]/95 backdrop-blur-xl border border-[#24dbc3]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200"
                        >
                            <div className="w-8 h-8 rounded-xl bg-[#24dbc3]/10 border border-[#24dbc3]/25 flex items-center justify-center text-[#24dbc3] shrink-0 mt-0.5">
                                {n.type === 'world_plan' ? (
                                    <Globe className="w-4 h-4 text-emerald-400" />
                                ) : n.type === 'inquiry' ? (
                                    <Inbox className="w-4 h-4 text-[#24dbc3]" />
                                ) : (
                                    <Sparkles className="w-4 h-4 text-[#24dbc3]" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-white flex items-center justify-between">
                                    <span>{n.title}</span>
                                    <span className="text-[10px] text-[#24dbc3] font-mono">Live</span>
                                </div>
                                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                    {n.message}
                                </p>
                            </div>
                            <button
                                onClick={() => dismissNotification(n.id)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg bg-transparent border-0 shrink-0 cursor-pointer"
                                title="Dismiss"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Desktop Fixed Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#061726]/95 border-r border-[#1b5361]/60 p-4 xl:p-5 justify-between shrink-0 h-screen sticky top-0 z-40 shadow-[4px_0_30px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <div className="space-y-5">
                    {/* Brand Header */}
                    <div className="p-3 rounded-2xl bg-[#082033]/90 border border-[#1e4e5b]/70 shadow-[inset_0_0_15px_rgba(16,212,196,.05)] flex items-center justify-between gap-2">
                        <Link href="/" className="flex items-center gap-2.5 no-underline group min-w-0">
                            <svg aria-hidden="true" viewBox="0 0 120 55" className="h-6 w-11 drop-shadow-[0_0_8px_rgba(39,220,192,.3)] shrink-0">
                                <defs>
                                    <linearGradient id="sidebarInfiniteMark" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#42efce" />
                                        <stop offset="55%" stopColor="#15cbb7" />
                                        <stop offset="100%" stopColor="#068b9e" />
                                    </linearGradient>
                                </defs>
                                <path d="M60 27 C43 7 28 4 16 13 C1 24 11 44 27 43 C40 42 49 29 60 27 C72 24 81 12 94 12 C113 12 116 43 95 43 C82 43 72 31 60 27" fill="none" stroke="url(#sidebarInfiniteMark)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="min-w-0">
                                <span className="font-extrabold text-lg xl:text-xl tracking-wider text-white block leading-none truncate">
                                    INFINITE<span className="text-[#25dec0]">.</span>
                                </span>
                                <span className="text-[8px] xl:text-[9px] uppercase font-extrabold tracking-[0.2em] text-[#27dec9] block mt-1 truncate">
                                    EXECUTIVE CONSOLE
                                </span>
                            </div>
                        </Link>

                        {/* Animated Online Pulse */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider hidden xl:inline">Online</span>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <div className="text-[9px] xl:text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 px-2.5 mb-2 flex items-center justify-between">
                            <span>Main Navigation</span>
                            <span className="text-[9px] text-[#27dec9] font-mono font-semibold">PORTAL</span>
                        </div>
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const active = isActive(item.href);
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-decoration-none ${
                                            active
                                                ? 'bg-gradient-to-r from-[#15cbb7]/20 via-[#15cbb7]/10 to-transparent border-l-4 border-l-[#25dec0] border-y border-r border-[#24dbc3]/30 text-white shadow-[0_4px_20px_rgba(36,219,195,0.15)]'
                                                : 'text-slate-300 hover:text-white hover:bg-[#10293a]/70 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div
                                                className={`w-7 h-7 xl:w-8 xl:h-8 rounded-lg xl:rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                                    active
                                                        ? 'bg-[#24dbc3] text-[#031927] shadow-[0_0_15px_rgba(36,219,195,0.4)]'
                                                        : 'bg-[#0c2436] text-slate-400 group-hover:text-[#25dec0] group-hover:bg-[#12364e]'
                                                }`}
                                            >
                                                <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className={`block font-bold leading-tight truncate text-xs ${active ? 'text-white' : 'text-slate-200'}`}>
                                                    {item.name}
                                                </span>
                                                <span className="text-[9px] xl:text-[10px] text-slate-400 block leading-tight mt-0.5 truncate hidden xl:block">
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>

                                        {active && (
                                            <ChevronRight className="w-3.5 h-3.5 text-[#25dec0] shrink-0 ml-1.5 animate-pulse" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Bottom Profile & Actions */}
                <div className="pt-3 border-t border-[#1b5361]/60 space-y-2.5">
                    {/* Admin User Card */}
                    <div className="p-2.5 rounded-2xl bg-[#082033]/90 border border-[#1e4e5b]/70 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#008c89] to-[#25dec0] text-[#031927] flex items-center justify-center font-extrabold text-xs shadow-[0_0_12px_rgba(36,219,195,0.3)] shrink-0">
                            {adminInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-white block truncate">
                                {adminUsername}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] xl:text-[10px] font-semibold text-[#27dec9]">
                                <Shield className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-[#25dec0]" />
                                <span>Verified Admin</span>
                            </span>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href="/"
                            target="_blank"
                            className="px-2.5 py-1.5 rounded-xl bg-[#0c2638] hover:bg-[#12364e] border border-[#276472]/60 text-slate-200 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all text-decoration-none shadow-sm"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3 h-3 text-[#25dec0]" />
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                            <LogOut className="w-3 h-3" />
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
                        className="fixed inset-0 bg-[#020d1b]/85 backdrop-blur-md transition-opacity"
                    />
                    <aside className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#061726]/98 border-r border-[#1b5361]/80 p-5 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-[#1b5361]/60">
                                <div className="flex items-center gap-2.5">
                                    <svg aria-hidden="true" viewBox="0 0 120 55" className="h-6 w-11 drop-shadow-[0_0_8px_rgba(39,220,192,.3)]">
                                        <defs>
                                            <linearGradient id="mobileInfiniteMark" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#42efce" />
                                                <stop offset="55%" stopColor="#15cbb7" />
                                                <stop offset="100%" stopColor="#068b9e" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M60 27 C43 7 28 4 16 13 C1 24 11 44 27 43 C40 42 49 29 60 27 C72 24 81 12 94 12 C113 12 116 43 95 43 C82 43 72 31 60 27" fill="none" stroke="url(#mobileInfiniteMark)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <span className="font-bold text-lg text-white tracking-wide">INFINITE PORTAL</span>
                                        <span className="text-[9px] uppercase font-bold text-[#27dec9] block">EXECUTIVE CONSOLE</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0c2436] border border-[#276472]/60"
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
                                                    ? 'bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-bold shadow-lg shadow-teal-500/20'
                                                    : 'text-slate-300 hover:bg-[#0c2436]'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="pt-4 border-t border-[#1b5361]/60 space-y-2">
                            <Link
                                href="/"
                                target="_blank"
                                className="w-full px-3 py-2.5 rounded-xl bg-[#0c2436] text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 text-decoration-none border border-[#276472]/60"
                            >
                                <ExternalLink className="w-4 h-4 text-[#25dec0]" />
                                <span>Open Public Website</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full px-3 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 border border-rose-500/30 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Modern Glassmorphic Top Bar */}
                <header className="h-16 shrink-0 border-b border-[#1b5361]/60 bg-[#061726]/90 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    {/* Left: Mobile Toggle & Page Title */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-[#0c2436] border border-[#276472]/60 shrink-0 cursor-pointer"
                            aria-label="Toggle Navigation"
                        >
                            <Menu className="w-4 h-4" />
                        </button>

                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate mb-0">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-[11px] text-slate-400 truncate hidden md:block mb-0">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right: Realtime Status & Action Pills */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        {/* REALTIME LIVE SYNC PILL */}
                        <div
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs border transition-all ${
                                connected
                                    ? 'bg-[#082033]/90 border-[#1e4e5b]/70 text-slate-200'
                                    : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                            }`}
                            title={connected ? 'Realtime live sync active' : 'Reconnecting to realtime stream...'}
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                {connected ? (
                                    <>
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25dec0] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18cdbb]"></span>
                                    </>
                                ) : (
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                )}
                            </span>
                            <span className="text-[11px] font-bold hidden sm:inline">
                                {connected ? (
                                    <span className="text-[#25dec0]">Live Sync</span>
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
                                    ? 'text-[#25dec0] bg-[#25dec0]/10 border-[#25dec0]/30 hover:bg-[#25dec0]/20'
                                    : 'text-slate-400 bg-[#082033] border-[#1e4e5b]/60 hover:text-slate-200'
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
                            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-[#082033] hover:bg-[#0c2638] border border-[#1e4e5b]/60 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#25dec0]' : ''}`} />
                        </button>

                        {/* Live PHT Clock (visible on wide screens) */}
                        {currentTime && (
                            <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/60 text-xs text-slate-300 font-mono shadow-inner">
                                <Clock className="w-3.5 h-3.5 text-[#25dec0]" />
                                <span>{currentTime}</span>
                            </div>
                        )}

                        {/* Test SMTP Ping Button (visible on wide screens) */}
                        <button
                            onClick={handleTestEmail}
                            disabled={isTestingEmail}
                            title="Send quick SMTP diagnostic ping"
                            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 border border-[#24dbc3]/30 text-[#27dec9] hover:text-[#42f1ce] text-xs font-semibold transition-all cursor-pointer"
                        >
                            <Mail className="w-3.5 h-3.5 text-[#25dec0]" />
                            <span>{isTestingEmail ? 'Testing...' : 'Test SMTP'}</span>
                        </button>

                        {/* Public Site Quick Pill (visible on xl screens) */}
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden xl:inline-flex px-3 py-1.5 rounded-xl bg-[#0c2638] hover:bg-[#12364e] border border-[#276472]/60 text-xs font-semibold text-slate-200 hover:text-white items-center gap-1.5 transition-all text-decoration-none shadow-sm"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3 h-3 text-[#25dec0]" />
                        </Link>

                        {/* User Avatar Badge */}
                        <div
                            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#008c89] to-[#25dec0] flex items-center justify-center font-bold text-xs text-[#031927] shadow-[0_0_12px_rgba(36,219,195,0.3)] shrink-0"
                            title={`Logged in as ${adminUsername}`}
                        >
                            {adminInitial}
                        </div>
                    </div>
                </header>

                {/* Page Content Body */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
