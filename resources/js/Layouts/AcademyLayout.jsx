import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { getCountryInfo } from '../Utils/academyBadges';
import { getLangText, getRankTheme } from '../Utils/academyLang';
import useRealtimeSync from '../Hooks/useRealtimeSync';
import CountryFlag from '../Components/CountryFlag';
import {
    Award,
    BookOpen,
    CheckSquare,
    FileText,
    Trophy,
    Bell,
    Shield,
    Edit3,
    LogOut,
    Menu,
    X,
    Clock,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Flame,
    RefreshCw,
    Volume2,
    VolumeX,
    Calendar,
} from 'lucide-react';

// In-memory dismissal flag: automatically resets on EVERY page open / browser reload (F5 / Ctrl+R)
// and on logout/re-login, while staying closed cleanly as the member clicks between sidebar pages.
let dismissedPopupAnnouncementId = null;

export function resetAnnouncementPopup() {
    dismissedPopupAnnouncementId = null;
}

const POPUP_TYPE_META = {
    announcement: { label: 'Announcement', pill: 'bg-teal-50 text-[#0f766e]' },
    weekly_achiever: { label: 'Weekly Achiever', pill: 'bg-amber-100 text-amber-800' },
    training_finisher: { label: 'Training Finisher', pill: 'bg-emerald-50 text-emerald-800' },
    recognition: { label: 'Recognition', pill: 'bg-purple-50 text-purple-800' },
};

export default function AcademyLayout({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    pageTitle,
    headTitle,
    children,
}) {
    const page = usePage();
    const flash = page.props?.flash || {};
    const currentPath = (page.url || '').split('?')[0];

    // Language state synced with member preference
    const [lang, setLang] = useState(member?.preferred_language || 'en');
    useEffect(() => {
        if (member?.preferred_language) setLang(member.preferred_language);
    }, [member?.preferred_language]);

    const t = (key) => getLangText(lang, key);

    const handleToggleLanguage = () => {
        const nextLang = lang === 'en' ? 'tl' : 'en';
        setLang(nextLang);
        router.post('/academy-portal/language', { language: nextLang }, { preserveScroll: true });
    };

    // Realtime live sync (instant automatic updates without hard refresh)
    const {
        connected,
        isSyncing,
        soundEnabled,
        toggleSound,
        notifications,
        dismissNotification,
        syncNow,
    } = useRealtimeSync({
        isAcademy: true,
        intervalMs: 2500,
    });

    // Mobile drawer
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Active announcements list for automatic popup on portal open, browser reload, login, or new realtime post
    const pagePopupAnnouncements = page.props?.popupAnnouncements;
    const popupList = Array.isArray(pagePopupAnnouncements) && pagePopupAnnouncements.length > 0
        ? pagePopupAnnouncements
        : latestAnnouncement
            ? [latestAnnouncement]
            : [];
    const latestPopupId = popupList[0]?.id ?? latestAnnouncement?.id ?? null;

    const [popupOpen, setPopupOpen] = useState(() => Boolean(latestPopupId && dismissedPopupAnnouncementId !== latestPopupId));
    const [popupIndex, setPopupIndex] = useState(0);

    useEffect(() => {
        if (latestPopupId && dismissedPopupAnnouncementId !== latestPopupId) {
            setPopupIndex(0);
            setPopupOpen(true);
        } else if (!latestPopupId) {
            setPopupOpen(false);
        }
    }, [latestPopupId]);

    // Clamp index if active announcements list shrinks dynamically via realtime sync
    const safePopupIndex = popupList.length > 0 ? Math.min(popupIndex, popupList.length - 1) : 0;
    const activePopup = popupOpen && popupList.length > 0 ? popupList[safePopupIndex] : null;

    const handleDismissPopup = () => {
        dismissedPopupAnnouncementId = latestPopupId;
        setPopupOpen(false);
    };

    const handlePrevPopup = () => {
        if (popupList.length <= 1) return;
        setPopupIndex((prev) => (prev - 1 + popupList.length) % popupList.length);
    };

    const handleNextPopup = () => {
        if (popupList.length <= 1) return;
        setPopupIndex((prev) => (prev + 1) % popupList.length);
    };

    // Close drawer / announcement popup on Escape key, and allow Left/Right arrows inside multi-announcement popup
    useEffect(() => {
        if (!sidebarOpen && !activePopup) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (activePopup) handleDismissPopup();
                else if (sidebarOpen) setSidebarOpen(false);
            } else if (activePopup && popupList.length > 1) {
                if (e.key === 'ArrowRight') handleNextPopup();
                else if (e.key === 'ArrowLeft') handlePrevPopup();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [sidebarOpen, activePopup, popupList.length]);

    // Live PHT Clock
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime({
                time: now.toLocaleTimeString('en-US', {
                    timeZone: 'Asia/Manila',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                }),
                date: now.toLocaleDateString('en-US', {
                    timeZone: 'Asia/Manila',
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }).toUpperCase(),
            });
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        dismissedPopupAnnouncementId = null;
        router.post('/academy-logout');
    };

    const rankTier = member?.rank_tier || 'Rookie';
    const rankTheme = getRankTheme(rankTier);
    const countryInfo = member?.country_info || getCountryInfo(member?.phone_country_code);
    const programProgress = member?.program_progress || { current_day: 1, days_remaining: 60 };

    const trainingsCompleted = portalCounts.trainings_completed ?? member?.training_stats?.completed ?? 0;
    const trainingsTotal = portalCounts.trainings_total ?? member?.training_stats?.total ?? 0;
    const reqsCompleted = portalCounts.requirements_completed ?? member?.requirements_stats?.completed ?? 0;
    const reqsTotal = portalCounts.requirements_total ?? member?.requirements_stats?.total ?? 0;
    const certsCount = portalCounts.certificates ?? 0;
    const announcementsCount = portalCounts.announcements ?? 0;

    const navItems = [
        {
            key: 'dashboard',
            label: t('dashboard'),
            href: '/academy-portal',
            icon: Award,
            match: (p) => p === '/academy-portal' || p === '/academy-profile',
        },
        {
            key: 'trainings',
            label: t('trainings'),
            href: '/academy-portal/trainings',
            icon: BookOpen,
            badge: `${trainingsCompleted}/${trainingsTotal}`,
            badgeClass: 'bg-teal-100/90 text-[#0f766e]',
            match: (p) => p.startsWith('/academy-portal/trainings'),
        },
        {
            key: 'requirements',
            label: t('requirements'),
            href: '/academy-portal/requirements',
            icon: CheckSquare,
            badge: `${reqsCompleted}/${reqsTotal}`,
            badgeClass: 'bg-amber-100/90 text-amber-800',
            match: (p) => p.startsWith('/academy-portal/requirements'),
        },
        {
            key: 'certificates',
            label: t('certificates'),
            href: '/academy-portal/certificates',
            icon: FileText,
            badge: String(certsCount),
            badgeClass: 'bg-emerald-100/90 text-emerald-800',
            match: (p) => p.startsWith('/academy-portal/certificates'),
        },
        {
            key: 'leaderboards',
            label: t('leaderboard'),
            href: '/academy-portal/leaderboards',
            icon: Trophy,
            trailingIcon: Flame,
            trailingClass: 'text-amber-500',
            match: (p) => p.startsWith('/academy-portal/leaderboards'),
        },
        {
            key: 'announcements',
            label: t('announcements'),
            href: '/academy-portal/announcements',
            icon: Bell,
            badge: announcementsCount > 0 ? String(announcementsCount) : null,
            badgeClass: 'bg-amber-100/90 text-amber-800',
            match: (p) => p.startsWith('/academy-portal/announcements'),
        },
        {
            key: 'rank-matrix',
            label: '5-Tier Rank Matrix',
            href: '/academy-portal/rank-matrix',
            icon: Shield,
            trailingIcon: ChevronRight,
            trailingClass: 'text-slate-400',
            match: (p) => p.startsWith('/academy-portal/rank-matrix'),
        },
    ];

    const isSettingsActive = currentPath.startsWith('/academy-portal/settings');

    return (
        <div
            className="academy-console min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#24dbc3] selection:text-[#031927]"
            style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <Head title={headTitle || `${pageTitle || t('portal_title')} - ${member?.full_name || 'Member'} | Legacy Club Academy`} />

            {/* TOP DUAL-COLOR ACCENT STRIPE */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* TOP HEADER BAR (Clean borderless soft shadow) */}
            <header className="h-16 sm:h-20 shrink-0 bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-[0_2px_14px_rgba(15,23,42,0.05)]">
                {/* Left: Mobile Menu + Brand + Page Title */}
                <div className="flex items-center gap-2.5 sm:gap-5 min-w-0">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-transparent shrink-0 cursor-pointer"
                        aria-label="Toggle Navigation"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <Link href="/" onClick={resetAnnouncementPopup} className="flex items-center gap-2.5 no-underline group shrink-0">
                            <img
                                src="/assets/image/academy/logo-black-trimmed.png?v=2"
                                alt="Legacy Club PH"
                                className="h-10 sm:h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="hidden sm:block">
                                <span className="text-sm font-black tracking-[0.25em] text-[#0f766e] block leading-tight font-mono">
                                    ACADEMY
                                </span>
                            </div>
                        </Link>

                        <div className="hidden md:block h-7 w-px bg-slate-200/80 mx-1 shrink-0" />

                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-[#0f766e] tracking-tight truncate uppercase font-sans mb-0">
                                {pageTitle || t('portal_title')}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right Controls (Borderless clean pills) */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    {/* Live Sync Pill */}
                    <div
                        className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                            connected ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}
                        title={connected ? 'Realtime live sync active — updates automatically' : 'Reconnecting...'}
                    >
                        <span className="relative flex h-2 w-2 shrink-0">
                            {connected ? (
                                <>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </>
                            ) : (
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                            )}
                        </span>
                        <span className="text-[11px] font-bold">{connected ? 'Live' : 'Offline'}</span>
                    </div>

                    {/* Sound Chime Toggle */}
                    <button
                        type="button"
                        onClick={toggleSound}
                        title={soundEnabled ? 'Notification chimes: ON' : 'Notification chimes: MUTED'}
                        aria-label={soundEnabled ? 'Mute notification chimes' : 'Enable notification chimes'}
                        className={`hidden sm:inline-flex p-2 rounded-xl transition-colors cursor-pointer ${
                            soundEnabled ? 'text-[#0f766e] bg-teal-50 hover:bg-teal-100' : 'text-slate-400 bg-slate-100 hover:text-slate-700'
                        }`}
                    >
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>

                    {/* Manual Instant Sync */}
                    <button
                        type="button"
                        onClick={syncNow}
                        disabled={isSyncing}
                        title="Sync latest updates now"
                        aria-label="Sync latest updates"
                        className="p-2 rounded-xl text-slate-500 hover:text-[#0f766e] bg-slate-100 hover:bg-teal-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-[#0f766e]' : ''}`} />
                    </button>

                    {/* Bilingual Language Toggle */}
                    <button
                        type="button"
                        onClick={handleToggleLanguage}
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-[#0f766e] text-slate-700 transition-colors cursor-pointer text-xs font-bold"
                        title={lang === 'en' ? 'Lumipat sa Filipino' : 'Switch to English'}
                    >
                        <CountryFlag
                            code={lang === 'tl' ? 'PH' : 'US'}
                            flag={lang === 'tl' ? '🇵🇭' : '🇺🇸'}
                            country={lang === 'tl' ? 'Filipino' : 'English'}
                            className="w-4 h-3"
                        />
                        <span className="font-mono text-[11px] font-black uppercase">
                            {lang === 'tl' ? 'FIL' : 'ENG'}
                        </span>
                    </button>

                    {/* Announcements Page Shortcut */}
                    <Link
                        href="/academy-portal/announcements"
                        className="relative p-2 rounded-xl text-slate-600 hover:text-[#0f766e] hover:bg-slate-100 transition-colors"
                        title={t('announcements')}
                        aria-label={t('announcements')}
                    >
                        <Bell className="w-5 h-5" />
                        {announcementsCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                    </Link>

                    {/* Live Clock Pill */}
                    {currentTime.time && (
                        <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-amber-50/90 text-amber-900">
                            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                            <div className="text-right leading-none">
                                <div className="text-xs font-black font-mono tracking-tight text-slate-900">
                                    {currentTime.time}
                                </div>
                                <div className="text-[9px] font-bold font-sans text-amber-700 tracking-wider mt-0.5">
                                    {currentTime.date}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sign Out */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        title={t('sign_out')}
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline uppercase text-[11px] tracking-wider">{t('sign_out')}</span>
                    </button>
                </div>
            </header>

            {/* MAIN SHELL: SIDEBAR + DEDICATED PAGE CANVAS */}
            <div className="flex-1 flex min-w-0">
                {/* Desktop Left Sidebar (Clean Borderless Elevation) */}
                <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white p-4 xl:p-5 justify-between shrink-0 h-[calc(100dvh-5rem)] sticky top-20 z-20 overflow-y-auto shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
                    <div className="space-y-6">
                        {/* Clean Borderless Member Identity Card */}
                        <div className={`rounded-2xl p-4 bg-gradient-to-br ${rankTheme.softGradient} space-y-3`}>
                            <div className="space-y-1.5">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight truncate mb-0">
                                    {member?.full_name}
                                </h3>
                                {/* Colorful Country Flag right below Name */}
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <CountryFlag
                                        code={countryInfo.code}
                                        flag={countryInfo.flag}
                                        country={countryInfo.country}
                                        className="w-4 h-3"
                                    />
                                    <span className="text-[11px] font-bold text-slate-700 truncate">{countryInfo.country}</span>
                                    <span className="text-[10px] font-mono text-slate-400">({member?.phone_country_code || '+63'})</span>
                                </div>
                                <div className="flex items-center gap-2 pt-0.5">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono bg-white text-[#0f766e] shadow-xs">
                                        {rankTier}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-semibold">
                                        Day {programProgress.current_day}/60
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200/70 w-full" />

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                                    {t('member_id')}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-lg bg-white font-mono font-bold text-xs text-[#0f766e] shadow-xs">
                                    {member?.member_id}
                                </span>
                            </div>
                        </div>

                        {/* Separate Pages Navigation */}
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 px-3 mb-2">
                                {t('portal_title')}
                            </div>
                            <nav className="space-y-1">
                                {navItems.map((item) => {
                                    const active = item.match(currentPath);
                                    const Icon = item.icon;
                                    const TrailingIcon = item.trailingIcon;
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href}
                                            className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all no-underline ${
                                                active
                                                    ? 'bg-[#f0fdfa] text-[#0f766e] font-bold shadow-[inset_3px_0_0_#0f766e]'
                                                    : 'text-slate-600 hover:text-[#0f766e] hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#0f766e]' : 'text-slate-400 group-hover:text-[#0f766e]'}`} />
                                                <span className="truncate">{item.label}</span>
                                            </div>
                                            {item.badge ? (
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0 ${item.badgeClass}`}>
                                                    {item.badge}
                                                </span>
                                            ) : TrailingIcon ? (
                                                <TrailingIcon className={`w-3.5 h-3.5 shrink-0 ${item.trailingClass}`} />
                                            ) : active ? (
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0" />
                                            ) : null}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Bottom Profile Settings Link (Dedicated Page) */}
                    <div className="pt-4 mt-4 space-y-2">
                        <div className="h-px bg-slate-100 w-full mb-3" />
                        <Link
                            href="/academy-portal/settings"
                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors no-underline ${
                                isSettingsActive
                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                    : 'bg-slate-100/90 hover:bg-teal-50 text-slate-700 hover:text-[#0f766e]'
                            }`}
                        >
                            <Edit3 className="w-4 h-4" />
                            <span>{t('profile_settings')}</span>
                        </Link>
                    </div>
                </aside>

                {/* Mobile Slide-Over Drawer */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex lg:hidden">
                        <div
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative w-72 max-w-[85vw] bg-white h-full max-h-[100dvh] p-5 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between pb-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <img
                                            src="/assets/image/academy/logo-black-trimmed.png?v=2"
                                            alt="Legacy Club PH"
                                            className="h-10 w-auto object-contain shrink-0"
                                        />
                                        <span className="font-mono font-bold text-xs text-slate-900 uppercase truncate">
                                            {t('portal_title')}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        aria-label="Close navigation"
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 bg-transparent cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className={`rounded-2xl p-3.5 bg-gradient-to-br ${rankTheme.softGradient} space-y-1.5`}>
                                    <div className="text-xs font-bold text-slate-900 truncate">{member?.full_name}</div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <CountryFlag
                                            code={countryInfo.code}
                                            flag={countryInfo.flag}
                                            country={countryInfo.country}
                                            className="w-4 h-3"
                                        />
                                        <span className="text-[11px] font-bold text-slate-700">{countryInfo.country}</span>
                                        <span className="text-[10px] font-mono text-slate-400">({member?.phone_country_code || '+63'})</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-[#0f766e] font-bold">
                                        ID: {member?.member_id} &bull; {rankTier} &bull; Day {programProgress.current_day}/60
                                    </div>
                                </div>

                                <nav className="space-y-1">
                                    {navItems.map((item) => {
                                        const active = item.match(currentPath);
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold no-underline ${
                                                    active
                                                        ? 'bg-[#f0fdfa] text-[#0f766e] font-bold shadow-[inset_3px_0_0_#0f766e]'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#0f766e]' : 'text-slate-400'}`} />
                                                    <span className="truncate">{item.label}</span>
                                                </div>
                                                {item.badge && (
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0 ${item.badgeClass}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="pt-4 mt-4 space-y-2">
                                <div className="h-px bg-slate-100 w-full mb-2" />
                                {currentTime.time && (
                                    <div className="px-3 py-2 rounded-xl bg-amber-50/90 flex items-center justify-between text-[11px] font-mono text-amber-900">
                                        <span className="font-bold">{currentTime.time}</span>
                                        <span className="text-[10px] text-amber-700">{currentTime.date}</span>
                                    </div>
                                )}
                                <Link
                                    href="/academy-portal/settings"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 no-underline ${
                                        isSettingsActive ? 'bg-[#0f766e] text-white' : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-[#0f766e]'
                                    }`}
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>{t('profile_settings')}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>{t('sign_out')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* DEDICATED PAGE CONTENT CANVAS */}
                <main className="flex-1 min-w-0 w-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                    {/* Flash Feedback */}
                    {flash.success && (
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-3 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="font-semibold">{flash.success}</span>
                        </div>
                    )}
                    {flash.error && (
                        <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 text-xs flex items-center gap-3 shadow-xs">
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span className="font-semibold">{flash.error}</span>
                        </div>
                    )}

                    {typeof children === 'function' ? children({ lang, t }) : children}
                </main>
            </div>

            {/* AUTO-POPUP FOR ACTIVE ANNOUNCEMENTS ON PORTAL OPEN & RELOAD */}
            {activePopup && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 lg:p-8 bg-slate-900/60 backdrop-blur-xs"
                    onClick={handleDismissPopup}
                >
                    <div
                        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-[96vw] sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[94dvh] sm:max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Accent Gradient Bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

                        {/* Header */}
                        <div className="p-4 sm:p-6 lg:p-7 flex items-start justify-between gap-3 bg-gradient-to-r from-amber-50/80 via-white to-teal-50/50 shrink-0">
                            <div className="flex items-start gap-3 min-w-0">
                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                    <Bell className="w-5 h-5 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                                        Official Academy Announcement
                                        {popupList.length > 1 ? ` • ${safePopupIndex + 1} of ${popupList.length}` : ''}
                                    </div>
                                    <h3 className="text-base sm:text-xl lg:text-2xl font-black text-slate-900 leading-snug mt-0.5 mb-0 break-words">
                                        {activePopup.title}
                                    </h3>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleDismissPopup}
                                aria-label="Close announcement"
                                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 bg-transparent cursor-pointer shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4 sm:space-y-5 flex-1 min-h-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap text-[11px] sm:text-xs font-mono">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${(POPUP_TYPE_META[activePopup.type] || POPUP_TYPE_META.announcement).pill}`}>
                                        {(POPUP_TYPE_META[activePopup.type] || POPUP_TYPE_META.announcement).label}
                                    </span>
                                    {activePopup.badge_text && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase inline-flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            {activePopup.badge_text}
                                        </span>
                                    )}
                                </div>
                                {activePopup.created_at && (
                                    <span className="text-slate-400 inline-flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {activePopup.created_at}
                                    </span>
                                )}
                            </div>

                            {activePopup.image_url && (
                                <div className="rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                    <img
                                        src={activePopup.image_url}
                                        alt={activePopup.title}
                                        className="w-full h-auto object-contain max-h-[38dvh] sm:max-h-[46dvh]"
                                    />
                                </div>
                            )}

                            {activePopup.featured_member && (
                                <div className="p-3.5 rounded-2xl bg-amber-50/70 flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-xs">
                                        {activePopup.featured_member.avatar_url ? (
                                            <img
                                                src={activePopup.featured_member.avatar_url}
                                                alt={activePopup.featured_member.full_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Award className="w-5 h-5 text-amber-600" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
                                            Featured Honoree
                                        </div>
                                        <div className="text-xs font-black text-slate-900 uppercase truncate">
                                            {activePopup.featured_member.full_name}
                                        </div>
                                        <div className="text-[10px] font-mono font-bold uppercase text-[#0f766e]">
                                            {activePopup.featured_member.rank_tier} Tier
                                        </div>
                                    </div>
                                </div>
                            )}

                            <p className="text-sm sm:text-base lg:text-lg text-slate-700 whitespace-pre-line leading-relaxed break-words mb-0">
                                {activePopup.content}
                            </p>

                            {/* Multi-Announcement Carousel Pager */}
                            {popupList.length > 1 && (
                                <div className="pt-2 flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={handlePrevPopup}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-[#0f766e] text-xs font-bold cursor-pointer"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Prev</span>
                                    </button>
                                    <div className="flex items-center gap-1.5">
                                        {popupList.map((item, idx) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setPopupIndex(idx)}
                                                aria-label={`View announcement ${idx + 1}`}
                                                className={`h-2 rounded-full transition-all cursor-pointer ${
                                                    idx === safePopupIndex
                                                        ? 'w-6 bg-[#0f766e]'
                                                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleNextPopup}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-[#0f766e] text-xs font-bold cursor-pointer"
                                    >
                                        <span>Next</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 sm:p-5 lg:px-8 flex flex-wrap items-center justify-between gap-3 bg-slate-50 shrink-0">
                            <Link
                                href="/academy-portal/announcements"
                                onClick={handleDismissPopup}
                                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold shadow-xs no-underline"
                            >
                                View All Announcements
                            </Link>
                            <button
                                type="button"
                                onClick={handleDismissPopup}
                                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-sm"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REALTIME LIVE NOTIFICATION TOASTS */}
            {notifications.length > 0 && (
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className="pointer-events-auto rounded-2xl bg-white p-4 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3"
                        >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                n.type === 'celebration' || n.type === 'certificate'
                                    ? 'bg-amber-50 text-amber-600'
                                    : n.type === 'warning'
                                        ? 'bg-rose-50 text-rose-600'
                                        : 'bg-teal-50 text-[#0f766e]'
                            }`}>
                                {n.type === 'celebration' || n.type === 'certificate' ? (
                                    <Award className="w-4 h-4" />
                                ) : n.type === 'warning' ? (
                                    <AlertCircle className="w-4 h-4" />
                                ) : (
                                    <Sparkles className="w-4 h-4" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-black text-slate-900">{n.title}</div>
                                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug mb-0">{n.message}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => dismissNotification(n.id)}
                                aria-label="Dismiss notification"
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-transparent cursor-pointer shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
