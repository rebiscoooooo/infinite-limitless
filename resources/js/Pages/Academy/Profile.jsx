import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { getCountryInfo, getTierDetails, ACADEMY_TIERS } from '../../Utils/academyBadges';
import {
    GraduationCap,
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Award,
    Star,
    LogOut,
    Bell,
    CheckCircle2,
    Camera,
    Lock,
    Eye,
    EyeOff,
    X,
    Calendar,
    Sparkles,
    ChevronRight,
    Edit3,
    AlertCircle,
    Info,
    Clock,
    Menu,
    ExternalLink,
    FileText,
} from 'lucide-react';

export default function Profile({ member, announcements = [] }) {
    const page = usePage();
    const flash = page.props?.flash || {};

    // Live Clock (PHT) formatted exactly like reference portal image
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

    // Mobile sidebar toggle state
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Announcement Pop-up State
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showAnnouncementsList, setShowAnnouncementsList] = useState(false);
    const [showTiersModal, setShowTiersModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInputRef = useRef(null);

    // Auto-popup latest active announcement on initial page load if exists
    useEffect(() => {
        if (announcements && announcements.length > 0) {
            const latest = announcements[0];
            const dismissedId = sessionStorage.getItem('dismissed_announcement_' + latest.id);
            if (!dismissedId) {
                setSelectedAnnouncement(latest);
            }
        }
    }, [announcements]);

    const handleDismissAnnouncement = () => {
        if (selectedAnnouncement) {
            sessionStorage.setItem('dismissed_announcement_' + selectedAnnouncement.id, 'true');
            setSelectedAnnouncement(null);
        }
    };

    // Profile Edit Form
    const editForm = useForm({
        phone_country_code: member.phone_country_code || '+63',
        phone_number: member.phone_number || '',
        address: member.address || '',
        profile_picture: null,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            editForm.setData('profile_picture', file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.post('/academy-profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
                editForm.reset('current_password', 'new_password', 'new_password_confirmation');
            },
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/academy-logout');
    };

    const rank = member.rank_details || {
        name: member.rank_tier || 'Rookie',
        stars: 1,
        stars_display: '★',
        title: 'Academy Member',
        description: 'Verified member of the Legacy Club Academy.',
    };

    // Country info and tier details resolution
    const countryInfo = member.country_info || getCountryInfo(member.phone_country_code);
    const tierDetails = getTierDetails(member.rank_tier || rank.name);
    const badgeImage = member.badge_image || rank.badge_image || tierDetails.badge_image;

    // Rank styling mapping for high-end badge display
    const getRankStyle = (name) => {
        switch ((name || '').toLowerCase()) {
            case 'legend':
                return {
                    badgeBg: 'bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-amber-600/15',
                    border: 'border-amber-400',
                    text: 'text-amber-800',
                    pill: 'bg-amber-100 text-amber-900 border-amber-300',
                    starsColor: 'text-amber-500 fill-amber-500',
                };
            case 'grand master':
                return {
                    badgeBg: 'bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-purple-600/15',
                    border: 'border-purple-300',
                    text: 'text-purple-800',
                    pill: 'bg-purple-100 text-purple-900 border-purple-300',
                    starsColor: 'text-amber-500 fill-amber-500',
                };
            case 'master':
                return {
                    badgeBg: 'bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-600/10',
                    border: 'border-amber-300',
                    text: 'text-amber-800',
                    pill: 'bg-amber-100 text-amber-900 border-amber-300',
                    starsColor: 'text-amber-500 fill-amber-500',
                };
            case 'elite':
                return {
                    badgeBg: 'bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-emerald-600/10',
                    border: 'border-teal-300',
                    text: 'text-teal-800',
                    pill: 'bg-teal-100 text-[#0f766e] border-teal-300',
                    starsColor: 'text-amber-500 fill-amber-500',
                };
            default: // Rookie
                return {
                    badgeBg: 'bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/50',
                    border: 'border-slate-300',
                    text: 'text-slate-800',
                    pill: 'bg-slate-100 text-slate-800 border-slate-300',
                    starsColor: 'text-amber-500 fill-amber-500',
                };
        }
    };

    const rankStyle = getRankStyle(rank.name);

    return (
        <div
            className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#24dbc3] selection:text-[#031927]"
            style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <Head title={`Member Portal - ${member.full_name} | Legacy Club Academy`} />

            {/* TOP DUAL-COLOR ACCENT STRIPE (System Palette: Dark Teal & Warm Gold Accent like in reference image) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* TOP HEADER BAR (Clean, Elegant Light Header matching reference image) */}
            <header className="h-16 sm:h-20 shrink-0 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                {/* Left: Mobile Toggle & Brand / Title */}
                <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-0 shrink-0 cursor-pointer outline-none"
                        aria-label="Toggle Navigation"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2.5 no-underline group">
                            <img
                                src="/assets/image/academy/logo-black-trimmed.png"
                                alt="Legacy Club PH"
                                className="h-9 sm:h-11 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="hidden sm:block">
                                <span className="text-sm font-black tracking-wider text-slate-900 block leading-tight font-mono">
                                    LEGACY CLUB
                                </span>
                                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#0f766e] block">
                                    ACADEMY
                                </span>
                            </div>
                        </Link>

                        <div className="hidden md:block h-7 w-[1px] bg-slate-200 mx-2" />

                        {/* Title matching reference screenshot ("STUDENT PORTAL" -> "ACADEMY PORTAL") */}
                        <div className="min-w-0">
                            <h1 className="text-base sm:text-xl font-extrabold text-[#0f766e] tracking-tight truncate uppercase font-sans">
                                ACADEMY PORTAL
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right: Announcements Trigger, Live Clock Pill & Sign Out */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Announcements Trigger */}
                    {announcements.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowAnnouncementsList(true)}
                            className="relative px-3 py-1.5 sm:py-2 rounded-xl border-0 bg-teal-50/70 hover:bg-teal-100/70 text-[#0f766e] transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs outline-none"
                            title="View Announcements Bulletin"
                        >
                            <Bell className="w-4 h-4 text-[#0f766e]" />
                            <span className="hidden sm:inline">Bulletin</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-[#0f766e] text-white text-[10px] font-black">
                                {announcements.length}
                            </span>
                        </button>
                    )}

                    {/* CLOCK PILL (MATCHING EXACT AMBER/GOLD THEME IN REFERENCE IMAGE) */}
                    {currentTime.time && (
                        <div className="flex items-center gap-2.5 px-3.5 py-1.5 sm:py-2 rounded-2xl bg-amber-50/70 border border-amber-300/80 text-amber-900 shadow-sm">
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

                    {/* Sign Out Button */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="p-2 sm:px-3.5 sm:py-2 rounded-xl border-0 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs outline-none"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline uppercase text-[11px] tracking-wider">Logout</span>
                    </button>
                </div>
            </header>

            {/* MAIN SHELL: SIDEBAR + CONTENT CANVAS */}
            <div className="flex-1 flex min-w-0">
                {/* Desktop Left Sidebar (Matching Reference Image) */}
                <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200 p-4 xl:p-5 justify-between shrink-0 min-h-[calc(100vh-5rem)] sticky top-20 z-20">
                    <div className="space-y-6">
                        {/* USER PROFILE BOX (MATCHING EXACT HIGHLIGHT BOX IN REFERENCE SCREENSHOT) */}
                        <div className="rounded-2xl p-3.5 bg-gradient-to-r from-teal-50/50 via-white to-slate-50 border border-slate-200/90 border-l-4 border-l-[#f59e0b] shadow-sm space-y-2">
                            <div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight truncate">
                                    {member.full_name}
                                </h3>
                                {/* Country Flag based on phone dialing code right below name */}
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                    <span className="text-sm leading-none" title={countryInfo.country}>{countryInfo.flag}</span>
                                    <span className="text-[11px] font-bold text-slate-700 truncate">{countryInfo.country}</span>
                                    <span className="text-[10px] font-mono text-slate-400">({member.phone_country_code || '+63'})</span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium capitalize mt-1">
                                    Verified Member account
                                </p>
                            </div>

                            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                                    MEMBER ID
                                </span>
                                <span className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 font-mono font-bold text-xs text-[#0f766e] shadow-xs">
                                    {member.member_id}
                                </span>
                            </div>
                        </div>

                        {/* Sidebar Category 1: ACADEMY PORTAL */}
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 px-2.5 mb-2.5">
                                ACADEMY PORTAL
                            </div>
                            <nav className="space-y-1">
                                {/* Active Link: Dashboard / Profile */}
                                <a
                                    href="#profile"
                                    className="group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#f0fdfa] text-[#0f766e] font-bold border-l-4 border-l-[#0f766e] shadow-xs no-underline"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Award className="w-4 h-4 text-[#0f766e] shrink-0" />
                                        <span className="truncate text-xs font-bold leading-tight">
                                            Dashboard &amp; Profile
                                        </span>
                                    </div>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e] shrink-0 ml-1.5" />
                                </a>

                                {/* Announcements */}
                                <button
                                    type="button"
                                    onClick={() => setShowAnnouncementsList(true)}
                                    className="w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0f766e] hover:bg-slate-50 transition-colors text-left cursor-pointer border-0 bg-transparent outline-none"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Bell className="w-4 h-4 text-slate-400 group-hover:text-[#0f766e] shrink-0" />
                                        <span className="truncate">Announcements</span>
                                    </div>
                                    {announcements.length > 0 && (
                                        <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                                            {announcements.length}
                                        </span>
                                    )}
                                </button>

                                {/* 5-Tier Matrix */}
                                <button
                                    type="button"
                                    onClick={() => setShowTiersModal(true)}
                                    className="w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0f766e] hover:bg-slate-50 transition-colors text-left cursor-pointer border-0 bg-transparent outline-none"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Shield className="w-4 h-4 text-slate-400 group-hover:text-[#0f766e] shrink-0" />
                                        <span className="truncate">5-Tier Rank Matrix</span>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                            </nav>
                        </div>

                        {/* Sidebar Category 2: ACCOUNT (Matching Reference) */}
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 px-2.5 mb-2.5">
                                ACCOUNT
                            </div>
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(true)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0f766e] hover:bg-slate-50 transition-colors text-left cursor-pointer border-0 bg-transparent outline-none"
                                >
                                    <Edit3 className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>Update Profile</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer border-0 bg-transparent outline-none"
                                >
                                    <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-600 shrink-0" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Status Card */}
                    <div className="pt-4 border-t border-slate-200">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-800">
                                <span>Academy Status</span>
                                <span className="inline-flex items-center gap-1 text-emerald-600">
                                    <CheckCircle2 className="w-3 h-3" /> Active
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-500">
                                Approved member with verified privileges.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Mobile Slide-Over Sidebar Drawer */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-slate-200 p-5 z-10 shadow-2xl justify-between">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/assets/image/academy/logo-black-trimmed.png"
                                            alt="Legacy Club PH"
                                            className="h-8 w-auto object-contain shrink-0"
                                        />
                                        <span className="font-mono font-bold text-xs text-slate-900 uppercase">
                                            MEMBER PORTAL
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 border-0 outline-none cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* User Profile Box on Mobile with Country Flag */}
                                <div className="rounded-2xl p-3 bg-slate-50 border border-slate-200 border-l-4 border-l-[#f59e0b] space-y-1.5">
                                    <div className="text-xs font-bold text-slate-900 truncate">{member.full_name}</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-base leading-none">{countryInfo.flag}</span>
                                        <span className="text-[11px] font-bold text-slate-700">{countryInfo.country}</span>
                                        <span className="text-[10px] font-mono text-slate-400">({member.phone_country_code || '+63'})</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">Verified Member account</div>
                                    <div className="text-[10px] font-mono text-[#0f766e] font-bold">
                                        ID: {member.member_id}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <button
                                        onClick={() => {
                                            setShowAnnouncementsList(true);
                                            setSidebarOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Bell className="w-4 h-4 text-slate-400" />
                                            <span>Announcements</span>
                                        </div>
                                        <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                                            {announcements.length}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowTiersModal(true);
                                            setSidebarOpen(false);
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        <Shield className="w-4 h-4 text-slate-400" />
                                        <span>5-Tier Rank Matrix</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowEditModal(true);
                                            setSidebarOpen(false);
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        <Edit3 className="w-4 h-4 text-slate-400" />
                                        <span>Update Profile</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT CANVAS (Clean Light Design matching reference) */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
                    {/* Flash Feedback Toast */}
                    {flash.success && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="font-medium">{flash.success}</span>
                        </div>
                    )}

                    {/* TOP HERO PROFILE BANNER (Clean White Institutional Card) */}
                    <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                            {/* Avatar & Main Identity */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                {/* Profile Photo with Camera Trigger */}
                                <div className="relative group">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shadow-sm">
                                        {member.avatar_url ? (
                                            <img
                                                src={member.avatar_url}
                                                alt={member.full_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-slate-400" />
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(true)}
                                        className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-[#0f766e] text-white hover:bg-[#115e59] transition-transform hover:scale-105 shadow-md cursor-pointer"
                                        title="Change Profile Photo"
                                    >
                                        <Camera className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Identity Data */}
                                <div className="space-y-1.5">
                                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] font-mono text-[11px] font-bold uppercase tracking-wider">
                                        <Shield className="w-3 h-3" />
                                        <span>MEMBER ID: {member.member_id}</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
                                        {member.full_name}
                                    </h2>

                                    {/* Country Flag & Origin Badge right below Name */}
                                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap pt-0.5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors shadow-2xs border-0">
                                            <span className="text-lg leading-none filter drop-shadow-xs">{countryInfo.flag}</span>
                                            <span className="text-xs font-bold text-slate-800">{countryInfo.country}</span>
                                            <span className="text-[11px] font-mono font-bold text-[#0f766e]">({member.phone_country_code || '+63'})</span>
                                        </div>
                                        <span className="text-xs text-slate-400 hidden sm:inline">&bull;</span>
                                        <span className="text-xs text-slate-500 font-medium">Academy Member</span>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="font-mono">{member.email}</span>
                                        </span>
                                        <span>&bull;</span>
                                        <span className="flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="font-mono">{member.phone_country_code} {member.phone_number}</span>
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
                                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> ACTIVE &bull; APPROVED
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-mono">
                                            Joined {member.created_at}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action Button */}
                            <div className="shrink-0 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(true)}
                                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                                >
                                    <Edit3 className="w-4 h-4" /> Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2-COLUMN GRID: OFFICIAL RANK BADGE & ACCOUNT CREDENTIALS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* LEFT COLUMN: OFFICIAL RANK BADGE & ANNOUNCEMENTS */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Official Rank Badge Card */}
                            <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 text-center shadow-xs space-y-4">
                                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold">
                                    OFFICIAL ACADEMY DESIGNATION
                                </div>

                                {/* Emblem Box with Official Shield Badge Image */}
                                <div className="my-2 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border border-slate-200/90 shadow-2xs">
                                    <div className="relative group py-2">
                                        <img
                                            src={badgeImage}
                                            alt={`${rank.name} Tier Badge`}
                                            className="w-44 sm:w-52 h-auto object-contain filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wider font-mono mt-3">
                                        {rank.name}
                                    </div>

                                    {/* Gold Stars */}
                                    <div className="flex items-center gap-1.5 my-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < (rank.stars || 1)
                                                        ? 'text-amber-500 fill-amber-500'
                                                        : 'text-slate-200 fill-transparent'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <div className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${rankStyle.pill}`}>
                                        {rank.title}
                                    </div>
                                </div>

                                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                                    {rank.description}
                                </p>

                                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                                    <span className="text-slate-400 font-mono">RANK TIER</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowTiersModal(true)}
                                        className="text-[#0f766e] hover:text-[#115e59] font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                        <span>View All 5 Tiers Matrix</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Latest Active Announcement Mini-Card */}
                            {announcements.length > 0 && (
                                <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-3 shadow-xs">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f766e] flex items-center gap-2">
                                            <Bell className="w-4 h-4 text-[#0f766e]" />
                                            Latest Announcement
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            {announcements[0].created_at ? new Date(announcements[0].created_at).toLocaleDateString() : 'Active'}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                                        {announcements[0].title}
                                    </h3>

                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                        {announcements[0].content}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedAnnouncement(announcements[0])}
                                        className="w-full py-2.5 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100/70 text-xs font-bold text-[#0f766e] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                                    >
                                        <span>Read Full Announcement</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: MEMBER CREDENTIALS & RECORD */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Profile Info Sheet */}
                            <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-4 h-4 text-[#0f766e]" />
                                        Member Profile Details
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(true)}
                                        className="text-xs text-[#0f766e] hover:text-[#115e59] underline font-bold cursor-pointer"
                                    >
                                        Update Details
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Member ID
                                        </span>
                                        <div className="text-sm font-mono font-bold text-[#0f766e]">
                                            {member.member_id}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Membership Status
                                        </span>
                                        <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            Approved &bull; Verified
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Full Legal Name
                                        </span>
                                        <div className="text-sm font-bold text-slate-900">
                                            {member.full_name}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Assigned Rank
                                        </span>
                                        <div className="text-sm font-mono font-bold text-slate-900">
                                            {rank.name} ({rank.stars_display})
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Email Address
                                        </span>
                                        <div className="text-sm text-slate-700 font-mono break-all">
                                            {member.email}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Contact Number
                                        </span>
                                        <div className="text-sm text-slate-700 font-mono">
                                            {member.phone_country_code} {member.phone_number}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Registered Complete Address
                                        </span>
                                        <div className="text-xs text-slate-700 leading-relaxed font-sans">
                                            {member.address}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Approved Date
                                        </span>
                                        <div className="text-xs text-slate-700 font-mono">
                                            {member.approved_at || 'Verified'}
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                                        <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                                            Terms Agreement
                                        </span>
                                        <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                            Accepted &bull; Active
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Guidelines Box */}
                            <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-[#0f766e]" /> Security &amp; Portal Privileges
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    As an authenticated Legacy Club Academy member, your account grants access to proprietary curriculum, executive leadership streams, and private mastermind circles. Keep your access key and password strictly confidential.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(true)}
                                        className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowTiersModal(true)}
                                        className="px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-xs"
                                    >
                                        Tier Privilege Matrix
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ========================================================= */}
            {/* ANNOUNCEMENT POPUP MODAL (SHOWS AUTOMATICALLY ON LOAD) */}
            {/* ========================================================= */}
            {selectedAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden">
                        {/* Header */}
                        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#0f766e] text-white flex items-center justify-center font-bold shadow-xs">
                                    <Bell className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#0f766e] font-bold">
                                        ACADEMY EXECUTIVE ANNOUNCEMENT
                                    </div>
                                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                                        {selectedAnnouncement.title}
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={handleDismissAnnouncement}
                                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-slate-700">
                            {/* Announcement Image if provided */}
                            {selectedAnnouncement.image_url && (
                                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 max-h-72">
                                    <img
                                        src={selectedAnnouncement.image_url}
                                        alt={selectedAnnouncement.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}

                            {/* Text Content */}
                            <div className="whitespace-pre-line leading-relaxed text-slate-700 font-sans text-xs sm:text-sm">
                                {selectedAnnouncement.content}
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                <span>Author: {selectedAnnouncement.created_by || 'Executive Board'}</span>
                                <span>
                                    {selectedAnnouncement.created_at
                                        ? new Date(selectedAnnouncement.created_at).toLocaleDateString('en-US', {
                                              month: 'short',
                                              day: 'numeric',
                                              year: 'numeric',
                                          })
                                        : 'Active'}
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 flex justify-end gap-3">
                            <button
                                onClick={handleDismissAnnouncement}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#115e59] transition-all shadow-sm cursor-pointer"
                            >
                                Dismiss Announcement
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* ALL ANNOUNCEMENTS BULLETIN MODAL */}
            {/* ========================================================= */}
            {showAnnouncementsList && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <Bell className="w-5 h-5 text-[#0f766e]" />
                                Academy Announcements Bulletin ({announcements.length})
                            </h3>
                            <button
                                onClick={() => setShowAnnouncementsList(false)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            {announcements.length === 0 ? (
                                <p className="text-xs text-slate-500 text-center py-8">
                                    No announcements at this time.
                                </p>
                            ) : (
                                announcements.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedAnnouncement(item);
                                            setShowAnnouncementsList(false);
                                        }}
                                        className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/40 cursor-pointer transition-all space-y-2 group shadow-xs"
                                    >
                                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                            <span className="font-bold text-slate-900 group-hover:text-[#0f766e]">
                                                {item.title}
                                            </span>
                                            <span>
                                                {item.created_at
                                                    ? new Date(item.created_at).toLocaleDateString()
                                                    : ''}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50/70">
                            <button
                                onClick={() => setShowAnnouncementsList(false)}
                                className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-900 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* 5 ACADEMY TIERS EXPLANATION MODAL */}
            {/* ========================================================= */}
            {showTiersModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <Award className="w-5 h-5 text-[#0f766e]" />
                                Legacy Club Academy &bull; 5 Official Rank Tiers
                            </h3>
                            <button
                                onClick={() => setShowTiersModal(false)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            {/* Tier 1: Rookie */}
                            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-4 hover:bg-slate-100/70 transition-colors">
                                <img
                                    src="/assets/image/academy/badge-rookie.png"
                                    alt="Rookie Badge"
                                    className="w-14 sm:w-16 h-auto object-contain shrink-0 filter drop-shadow-md"
                                />
                                <div className="space-y-1 flex-1">
                                    <div className="text-sm font-bold text-slate-900 font-mono">ROOKIE (★)</div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Mountain Ascent: Foundational member rank embarking on the path of leadership and skill mastery.
                                    </p>
                                </div>
                            </div>

                            {/* Tier 2: Elite */}
                            <div className="p-4 rounded-2xl border border-teal-200 bg-teal-50/40 flex items-center gap-4 hover:bg-teal-50/70 transition-colors">
                                <img
                                    src="/assets/image/academy/badge-elite.png"
                                    alt="Elite Badge"
                                    className="w-14 sm:w-16 h-auto object-contain shrink-0 filter drop-shadow-md"
                                />
                                <div className="space-y-1 flex-1">
                                    <div className="text-sm font-bold text-[#0f766e] font-mono">ELITE (★★)</div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Ascending Trend: High-performance pioneer demonstrating rapid momentum and strategic capability.
                                    </p>
                                </div>
                            </div>

                            {/* Tier 3: Master */}
                            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 flex items-center gap-4 hover:bg-amber-50/70 transition-colors">
                                <img
                                    src="/assets/image/academy/badge-master.png"
                                    alt="Master Badge"
                                    className="w-14 sm:w-16 h-auto object-contain shrink-0 filter drop-shadow-md"
                                />
                                <div className="space-y-1 flex-1">
                                    <div className="text-sm font-bold text-amber-800 font-mono">MASTER (★★★)</div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Lionheart Sovereign: Exemplifying fearless leadership, tactical excellence, and team mentorship.
                                    </p>
                                </div>
                            </div>

                            {/* Tier 4: Grand Master */}
                            <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/40 flex items-center gap-4 hover:bg-purple-50/70 transition-colors">
                                <img
                                    src="/assets/image/academy/badge-grand-master.png"
                                    alt="Grand Master Badge"
                                    className="w-14 sm:w-16 h-auto object-contain shrink-0 filter drop-shadow-md"
                                />
                                <div className="space-y-1 flex-1">
                                    <div className="text-sm font-bold text-purple-800 font-mono">GRAND MASTER (★★★★)</div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Imperial Eagle: Distinguished champion with visionary foresight and multi-tier organizational impact.
                                    </p>
                                </div>
                            </div>

                            {/* Tier 5: Legend */}
                            <div className="p-4 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 flex items-center gap-4 shadow-sm">
                                <img
                                    src="/assets/image/academy/badge-legend.png"
                                    alt="Legend Badge"
                                    className="w-14 sm:w-16 h-auto object-contain shrink-0 filter drop-shadow-md"
                                />
                                <div className="space-y-1 flex-1">
                                    <div className="text-sm font-black text-slate-900 font-mono">LEGEND (★★★★★)</div>
                                    <p className="text-xs text-slate-700 leading-relaxed">
                                        Crown of Sovereign Prestige: The highest apex tier of distinction, honor, and enduring legacy in the Academy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50/70">
                            <button
                                onClick={() => setShowTiersModal(false)}
                                className="px-5 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* EDIT PROFILE & PASSWORD MODAL */}
            {/* ========================================================= */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <Edit3 className="w-4 h-4 text-[#0f766e]" />
                                Edit Academy Profile Information
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-6">
                            {/* Photo Upload */}
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0 shadow-xs">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : member.avatar_url ? (
                                        <img src={member.avatar_url} alt="Current" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-slate-400" />
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        ref={photoInputRef}
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        onChange={handlePhotoSelect}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => photoInputRef.current?.click()}
                                        className="px-4 py-2 rounded-xl border border-slate-300 hover:border-[#0f766e] hover:bg-teal-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                                    >
                                        Change Profile Photo
                                    </button>
                                    <p className="text-[11px] text-slate-400 mt-1">WebP, PNG, JPG (Max 5MB)</p>
                                </div>
                            </div>

                            {/* Contact Number */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700">Phone / Mobile Number</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editForm.data.phone_country_code}
                                        onChange={(e) => editForm.setData('phone_country_code', e.target.value)}
                                        className="w-24 bg-white border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900"
                                    />
                                    <input
                                        type="tel"
                                        value={editForm.data.phone_number}
                                        onChange={(e) => editForm.setData('phone_number', e.target.value)}
                                        className="flex-1 bg-white border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900"
                                    />
                                </div>
                            </div>

                            {/* Complete Address */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-700">Complete Address</label>
                                <textarea
                                    rows="2"
                                    value={editForm.data.address}
                                    onChange={(e) => editForm.setData('address', e.target.value)}
                                    className="w-full bg-white border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 resize-none"
                                />
                            </div>

                            {/* Optional Password Update */}
                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-[#0f766e]" /> Change Password (Optional)
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[11px] text-slate-500 font-semibold">Current Password</label>
                                        <input
                                            type="password"
                                            value={editForm.data.current_password}
                                            onChange={(e) => editForm.setData('current_password', e.target.value)}
                                            placeholder="Leave blank to keep unchanged"
                                            className="w-full bg-white border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[11px] text-slate-500 font-semibold">New Password</label>
                                            <input
                                                type="password"
                                                value={editForm.data.new_password}
                                                onChange={(e) => editForm.setData('new_password', e.target.value)}
                                                placeholder="Min. 8 chars"
                                                className="w-full bg-white border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] text-slate-500 font-semibold">Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={editForm.data.new_password_confirmation}
                                                onChange={(e) => editForm.setData('new_password_confirmation', e.target.value)}
                                                placeholder="Re-enter password"
                                                className="w-full bg-white border border-slate-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-xs text-slate-900 mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50/70 p-4 -mx-6 -mb-6">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-6 py-2 rounded-xl bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#115e59] disabled:opacity-50 cursor-pointer shadow-xs"
                                >
                                    {editForm.processing ? 'Saving...' : 'Save Profile Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
