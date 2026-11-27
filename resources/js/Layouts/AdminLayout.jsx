import React, { useState, useEffect } from 'react';
import { Link, usePage, router, useForm } from '@inertiajs/react';
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
    Volume2,
    VolumeX,
    RefreshCw,
    Radio,
    KeyRound,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    Check,
    GraduationCap,
    Maximize2,
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Executive Console', subtitle }) {
    const page = usePage();
    const { auth, flash } = page.props || {};
    const currentUrl = page.url || '';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });

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
        intervalMs: 2500,
    });

    // Live Clock (PHT) formatted exactly like reference portal
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

    // Change Password Modal State
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const openPasswordModal = () => {
        passwordForm.reset();
        passwordForm.clearErrors();
        setShowCurrentPass(false);
        setShowNewPass(false);
        setShowConfirmPass(false);
        setShowPasswordModal(true);
    };

    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
        let pass = '';
        for (let i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        passwordForm.setData({
            ...passwordForm.data,
            password: pass,
            password_confirmation: pass,
        });
        setShowNewPass(true);
        setShowConfirmPass(true);
    };

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.clearErrors();

        if (!passwordForm.data.current_password) {
            passwordForm.setError('current_password', 'Please enter your current password.');
            return;
        }
        if (passwordForm.data.password.length < 8) {
            passwordForm.setError('password', 'New password must be at least 8 characters long.');
            return;
        }
        if (passwordForm.data.password !== passwordForm.data.password_confirmation) {
            passwordForm.setError('password_confirmation', 'Passwords do not match. Please verify.');
            return;
        }

        passwordForm.post('/admin/change-password', {
            preserveScroll: true,
            onSuccess: () => {
                setShowPasswordModal(false);
                passwordForm.reset();
            },
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/admin/logout');
    };

    useEffect(() => {
        if (!showPasswordModal && !sidebarOpen) return;
        const onKeyDown = (e) => {
            if (e.key !== 'Escape') return;
            if (showPasswordModal && !passwordForm.processing) setShowPasswordModal(false);
            else if (sidebarOpen) setSidebarOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showPasswordModal, sidebarOpen, passwordForm.processing]);

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
            name: 'Academy Verification',
            href: '/admin/verify-academy',
            icon: (props) => (
                <img
                    src="/assets/image/academy/logo-black-trimmed.png?v=2"
                    alt="Academy"
                    className={`${props?.className || 'w-4 h-4'} object-contain`}
                />
            ),
            description: 'Verify Members & Assign Ranks',
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
    const adminFullName = auth?.admin?.name || 'Administrator';
    const adminRole = auth?.admin?.role || 'Administrator';

    return (
        <div
            className="admin-console min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#24dbc3] selection:text-[#031927]"
            style={{
                backgroundColor: '#f8fafc',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <FlashToast flash={flash} />

            {/* TOP DUAL-COLOR ACCENT STRIPE (System Palette: Dark Teal & Warm Gold Accent like in reference image) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* TOP HEADER BAR (Clean, Elegant Light Header matching reference image) */}
            <header className="h-16 sm:h-20 shrink-0 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                {/* Left: Mobile Menu Toggle & Brand / Title */}
                <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                        aria-label="Toggle Navigation"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Logo & Portal Name */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex flex-col items-start justify-center no-underline shrink-0 group">
                            <img
                                src="/assets/image/logo.webp"
                                alt="INFINITE — Live Limitless"
                                className="h-7 sm:h-8 w-auto object-contain transition-opacity group-hover:opacity-85"
                            />
                            <span className="hidden sm:block text-[9px] uppercase font-bold tracking-[0.22em] text-[#0f766e] leading-none mt-1">
                                EXECUTIVE PORTAL
                            </span>
                        </Link>

                        <div className="hidden md:block h-7 w-[1px] bg-slate-200 mx-2" />

                        {/* Large Title exactly like reference image ("STUDENT PORTAL" -> "ADMIN PORTAL") */}
                        <div className="min-w-0">
                            <h1 className="text-base sm:text-xl font-extrabold text-[#0f766e] tracking-tight truncate uppercase font-sans">
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right: Live Sync, Clock Pill (Reference Match) & Controls */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Live Sync Indicator Pill */}
                    <div
                        className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                            connected
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}
                        title={connected ? 'Realtime live sync active' : 'Reconnecting...'}
                    >
                        <span className="relative flex h-2 w-2 shrink-0">
                            {connected ? (
                                <>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </>
                            ) : (
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            )}
                        </span>
                        <span className="text-[11px] font-bold">
                            {connected ? 'Live Sync' : 'Offline'}
                        </span>
                    </div>

                    {/* Sound Notification Chime Toggle */}
                    <button
                        type="button"
                        onClick={toggleSound}
                        title={soundEnabled ? 'Chimes: ON (Click to Mute)' : 'Chimes: MUTED (Click to Enable)'}
                        className={`p-2 rounded-xl border-0 transition-all cursor-pointer ${
                            soundEnabled
                                ? 'text-[#0f766e] bg-teal-50'
                                : 'text-slate-400 bg-slate-100 hover:text-slate-700'
                        }`}
                    >
                        {soundEnabled ? <Volume2 className="w-4 h-4 text-[#0f766e]" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    {/* Manual Sync */}
                    <button
                        type="button"
                        onClick={syncNow}
                        disabled={isSyncing}
                        title="Force immediate refresh"
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border-0 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-[#0f766e]' : ''}`} />
                    </button>

                    {/* CLOCK PILL (MATCHING EXACT AMBER/GOLD THEME IN REFERENCE IMAGE) */}
                    {currentTime.time && (
                        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 sm:py-2 rounded-2xl bg-amber-50/70 border border-amber-300/80 text-amber-900 shadow-sm">
                            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                            <div className="text-right leading-none">
                                <div className="text-xs font-black font-mono tracking-tight text-slate-900">
                                    {currentTime.time}
                                </div>
                                <div className="text-[9px] font-bold font-sans text-amber-700 tracking-wider mt-0.5 hidden sm:block">
                                    {currentTime.date}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* MAIN SHELL: SIDEBAR + CONTENT CANVAS */}
            <div className="flex-1 flex min-w-0">
                {/* Desktop Left Sidebar (Clean Borderless Soft Elevation) */}
                <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white p-4 xl:p-5 justify-between shrink-0 h-[calc(100dvh-5rem)] sticky top-20 z-20 overflow-y-auto shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
                    <div className="space-y-6">
                        {/* USER PROFILE BOX */}
                        <div className="rounded-2xl p-3.5 bg-gradient-to-r from-teal-50/60 via-slate-50/70 to-slate-50 shadow-[inset_4px_0_0_#f59e0b] space-y-2">
                            <div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight truncate">
                                    {adminFullName}
                                </h3>
                                <p className="text-[11px] text-slate-500 font-medium capitalize mt-0.5">
                                    {adminRole} account
                                </p>
                            </div>

                            <div className="h-px bg-slate-200/70 w-full" />

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                                    ADMIN ID
                                </span>
                                <span className="px-2 py-0.5 rounded-lg bg-white font-mono font-bold text-xs text-[#0f766e] shadow-xs">
                                    ADM-{auth?.admin?.id || '01'}
                                </span>
                            </div>
                        </div>

                        {/* Sidebar Category 1: PORTAL NAVIGATION */}
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 px-2.5 mb-2.5">
                                ADMIN PORTAL
                            </div>
                            <nav className="space-y-1">
                                {navItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-decoration-none ${
                                                active
                                                    ? 'bg-[#f0fdfa] text-[#0f766e] font-bold shadow-[inset_3px_0_0_#0f766e]'
                                                    : 'text-slate-600 hover:text-[#0f766e] hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Icon
                                                    className={`w-4 h-4 shrink-0 transition-colors ${
                                                        active ? 'text-[#0f766e]' : 'text-slate-400 group-hover:text-[#0f766e]'
                                                    }`}
                                                />
                                                <span className="truncate text-xs font-bold leading-tight">
                                                    {item.name}
                                                </span>
                                            </div>

                                            {active && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0 ml-1.5" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Sidebar Category 2: ACCOUNT & TOOLS (Matching Reference) */}
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 px-2.5 mb-2.5">
                                ACCOUNT
                            </div>
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    onClick={openPasswordModal}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0f766e] hover:bg-slate-50 transition-colors text-left cursor-pointer border-0 bg-transparent"
                                >
                                    <KeyRound className="w-4 h-4 text-slate-400" />
                                    <span>Update Password</span>
                                </button>

                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0f766e] hover:bg-slate-50 transition-colors no-underline border-0"
                                >
                                    <ExternalLink className="w-4 h-4 text-slate-400" />
                                    <span>Public Website</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors text-left cursor-pointer border-0 bg-transparent"
                                >
                                    <LogOut className="w-4 h-4 text-rose-500" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom System Brand Tag */}
                    <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
                        INFINITE &bull; Live Limitless
                    </div>
                </aside>

                {/* Mobile Drawer Sidebar */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                        />
                        <aside className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white border-r border-slate-200 p-5 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                                    <Link href="/" className="flex flex-col items-start justify-center no-underline">
                                        <img
                                            src="/assets/image/logo.webp"
                                            alt="INFINITE — Live Limitless"
                                            className="h-7 w-auto object-contain"
                                        />
                                        <span className="text-[9px] uppercase font-bold text-[#0f766e] block tracking-[0.2em] mt-1 leading-none">
                                            ADMIN PORTAL
                                        </span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        aria-label="Close navigation"
                                        className="p-2 rounded-xl text-slate-400 hover:text-slate-800 bg-slate-100 cursor-pointer border-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* User box */}
                                <div className="rounded-2xl p-3.5 bg-slate-50 shadow-[inset_4px_0_0_#f59e0b]">
                                    <h3 className="text-xs font-black text-slate-900 uppercase truncate">
                                        {adminFullName}
                                    </h3>
                                    <p className="text-[11px] text-slate-500 capitalize">{adminRole} account</p>
                                </div>

                                <nav className="space-y-1">
                                    {navItems.map((item) => {
                                        const active = isActive(item.href);
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-decoration-none ${
                                                    active
                                                        ? 'bg-[#f0fdfa] text-[#0f766e] shadow-[inset_3px_0_0_#0f766e]'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4 shrink-0" />
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="pt-4 border-t border-slate-200 space-y-2">
                                {currentTime.time && (
                                    <div className="px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-[11px] font-mono text-amber-900">
                                        <span className="font-bold">{currentTime.time}</span>
                                        <span className="text-[10px] text-amber-700">{currentTime.date}</span>
                                    </div>
                                )}
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-xs font-bold text-[#0f766e] no-underline"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Public Website</span>
                                </a>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSidebarOpen(false);
                                        openPasswordModal();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border-0 cursor-pointer"
                                >
                                    <KeyRound className="w-4 h-4" />
                                    <span>Change Password</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 border-0 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Main Content Area (Clean Canvas matching Reference Portal) */}
                <main className="flex-1 min-w-0 bg-[#f8fafc]">
                    {children}
                </main>
            </div>

            {/* ========================================================
                REALTIME LIVE NOTIFICATION TOASTS (INQUIRIES / WORLD PLAN / ACADEMY)
            ======================================================== */}
            {notifications.length > 0 && (
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={`pointer-events-auto rounded-2xl bg-white p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 ${
                                n.type === 'world_plan'
                                    ? 'shadow-[inset_4px_0_0_#f59e0b,0_14px_30px_rgba(15,23,42,0.14)]'
                                    : n.type === 'academy'
                                        ? 'shadow-[inset_4px_0_0_#9333ea,0_14px_30px_rgba(15,23,42,0.14)]'
                                        : 'shadow-[inset_4px_0_0_#0f766e,0_14px_30px_rgba(15,23,42,0.14)]'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                n.type === 'world_plan'
                                    ? 'bg-amber-50 text-amber-600'
                                    : n.type === 'academy'
                                        ? 'bg-purple-50 text-purple-600'
                                        : 'bg-teal-50 text-[#0f766e]'
                            }`}>
                                <Bell className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-black text-slate-900">{n.title}</div>
                                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => dismissNotification(n.id)}
                                aria-label="Dismiss notification"
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-transparent border-0 cursor-pointer shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* ========================================================
                CHANGE ADMIN PASSWORD MODAL (CLEAN LIGHT THEME)
            ======================================================== */}
            {showPasswordModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => { if (!passwordForm.processing) setShowPasswordModal(false); }}
                >
                    <div
                        className="bg-white border border-slate-200 rounded-3xl w-full max-w-md max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative space-y-4 text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Accent Stripe */}
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e] shadow-xs shrink-0">
                                    <KeyRound className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-0 leading-tight">
                                        Update Password
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-0 mt-0.5">
                                        Account Credentials &bull; @{adminUsername}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!passwordForm.processing) {
                                        setShowPasswordModal(false);
                                    }
                                }}
                                disabled={passwordForm.processing}
                                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                            {/* Server Errors */}
                            {Object.keys(passwordForm.errors).length > 0 && (
                                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="font-bold">Unable to update password:</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                                            {Object.entries(passwordForm.errors).map(([key, msg]) => (
                                                <li key={key}>{msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Current Password */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Current Password <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showCurrentPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        placeholder="Enter your current password..."
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0f766e] transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0"
                                    >
                                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        New Password <span className="text-[#0f766e]">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={generateRandomPassword}
                                        className="text-[11px] font-semibold text-[#0f766e] hover:text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        <span>Generate</span>
                                    </button>
                                </div>
                                <div className="relative">
                                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showNewPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        placeholder="At least 8 characters..."
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0f766e] transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPass(!showNewPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0"
                                    >
                                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Confirm New Password <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showConfirmPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        placeholder="Re-type new password..."
                                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#0f766e] rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0f766e] transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0"
                                    >
                                        {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    disabled={passwordForm.processing}
                                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {passwordForm.processing ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 stroke-[2.5]" />
                                            <span>Save New Password</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
