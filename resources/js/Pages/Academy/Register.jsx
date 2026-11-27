import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ProfilePhotoCropperModal from '../../Components/ProfilePhotoCropperModal';
import {
    GraduationCap,
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Eye,
    EyeOff,
    Upload,
    Sparkles,
    AlertCircle,
    ArrowRight,
    Camera,
    X,
    FileText,
    Clock,
    CheckCircle2,
    Shield,
    Award,
    Crop,
} from 'lucide-react';

export default function Register({ countryCodes = [] }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [rawPhotoFile, setRawPhotoFile] = useState(null);
    const [pendingCropFile, setPendingCropFile] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        middle_initial: '',
        last_name: '',
        phone_country_code: '+63',
        phone_number: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: '',
        profile_picture: null,
        preferred_language: 'en',
        terms: false,
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

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPendingCropFile(file);
            setShowCropModal(true);
        }
        // Reset input so re-selecting the same photo triggers onChange cleanly
        e.target.value = '';
    };

    const handleCropApply = (croppedFile) => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (pendingCropFile) {
            setRawPhotoFile(pendingCropFile);
        }
        setData('profile_picture', croppedFile);
        setPreviewUrl(URL.createObjectURL(croppedFile));
        setShowCropModal(false);
        setPendingCropFile(null);
    };

    const handleReopenCrop = () => {
        const source = rawPhotoFile || data.profile_picture;
        if (!source) return;
        setPendingCropFile(source);
        setShowCropModal(true);
    };

    const handleRemovePhoto = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setData('profile_picture', null);
        setRawPhotoFile(null);
        setPendingCropFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    useEffect(() => {
        if (!showTermsModal) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setShowTermsModal(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showTermsModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/academy-register', {
            forceFormData: true,
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
            <Head title="Legacy Club Academy - Member Registration | INFINITE" />

            {/* Top Dual-Color Accent Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b] shrink-0" />

            {/* Subtle Ambient Shapes */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Clean White Navigation Bar with Live Clock */}
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
                                Official Admission &bull; INFINITE
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* Live PHT Clock Pill */}
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
                            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0f766e] bg-slate-100 hover:bg-slate-200/80 py-2 px-3 sm:px-4 rounded-xl transition-all border-0 no-underline shadow-none whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">Already registered? </span>
                            <span className="text-[#0f766e] font-extrabold no-underline">Sign In</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
                {/* Hero Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-[11px] font-bold tracking-widest uppercase mb-3.5 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Member Application Pipeline</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Register for Legacy Club Academy
                    </h1>
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Fill out your profile details below. After submission, the Executive Board will verify your documentation and grant your official rank tier badge.
                    </p>

                    {/* 3-Step Process Flow Indicator */}
                    <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left">
                        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-teal-50 text-[#0f766e] font-black text-xs flex items-center justify-center shrink-0 border border-teal-200">
                                1
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[11px] font-bold text-slate-900 truncate">Register</span>
                                <span className="block text-[10px] text-slate-500 truncate">Submit Profile</span>
                            </div>
                        </div>

                        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 font-black text-xs flex items-center justify-center shrink-0 border border-amber-200">
                                2
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[11px] font-bold text-slate-900 truncate">Verification</span>
                                <span className="block text-[10px] text-slate-500 truncate">Admin Review</span>
                            </div>
                        </div>

                        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                                3
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[11px] font-bold text-slate-900 truncate">Portal Access</span>
                                <span className="block text-[10px] text-slate-500 truncate">Rank Placement</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clean White Registration Form Card */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Profile Picture Upload with Live Preview */}
                        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-7 text-center relative group">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
                                <div className="text-left">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f766e]">
                                        Member Profile Picture <span className="text-rose-500">*</span>
                                    </label>
                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                        Used for your official Academy ID badge and portal account.
                                    </p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200/60">
                                    WebP / PNG / JPG
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                {/* Preview Circle */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => (previewUrl ? handleReopenCrop() : fileInputRef.current?.click())}
                                        title={previewUrl ? 'Click to crop or reposition photo' : 'Click to upload profile picture'}
                                        className="w-28 h-28 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shadow-xs group-hover:border-[#0f766e] transition-all cursor-pointer p-0 relative"
                                    >
                                        {previewUrl ? (
                                            <>
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute inset-x-0 bottom-0 bg-slate-900/65 text-white text-[10px] font-bold py-1 flex items-center justify-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                                                    <Crop className="w-3 h-3" /> Adjust
                                                </span>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center text-slate-400">
                                                <Camera className="w-8 h-8 text-slate-300 mb-1" />
                                                <span className="text-[11px] font-medium">No photo yet</span>
                                            </div>
                                        )}
                                    </button>
                                    {previewUrl && (
                                        <button
                                            type="button"
                                            onClick={handleRemovePhoto}
                                            className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer border-0 outline-none"
                                            title="Remove photo"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Upload Controls */}
                                <div className="text-center sm:text-left space-y-2">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        id="profile_picture"
                                        accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs border-0"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {previewUrl ? 'Change Photo' : 'Upload Profile Picture'}
                                        </button>
                                        {previewUrl && (
                                            <button
                                                type="button"
                                                onClick={handleReopenCrop}
                                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 text-[#0f766e] border border-teal-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                                            >
                                                <Crop className="w-3.5 h-3.5" />
                                                <span>Crop &amp; Reposition</span>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-slate-500">
                                        Upload a clear portrait photo — you can crop, zoom, rotate, and reposition before submitting.
                                    </p>
                                    {errors.profile_picture && (
                                        <p className="text-xs text-rose-600 font-semibold flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                            {errors.profile_picture}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Personal Legal Identification */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                                <User className="w-4 h-4 text-[#0f766e]" /> Personal Identification
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                <div className="sm:col-span-5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        First Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        placeholder="e.g. Alexander"
                                        className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                        required
                                    />
                                    {errors.first_name && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.first_name}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        M.I. <span className="text-slate-400 font-normal lowercase">(opt)</span>
                                    </label>
                                    <input
                                        type="text"
                                        maxLength="2"
                                        value={data.middle_initial}
                                        onChange={(e) => setData('middle_initial', e.target.value)}
                                        placeholder="M"
                                        className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-3 py-2.5 text-sm text-center text-slate-900 placeholder-slate-400 transition-colors uppercase outline-none"
                                    />
                                    {errors.middle_initial && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.middle_initial}</p>}
                                </div>

                                <div className="sm:col-span-5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Last Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        placeholder="e.g. Mercer"
                                        className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                        required
                                    />
                                    {errors.last_name && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.last_name}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Contact Details */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                                <Phone className="w-4 h-4 text-[#0f766e]" /> Contact &amp; Communication
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Phone with Country Code Selector */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Contact / Phone Number <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={data.phone_country_code}
                                            onChange={(e) => setData('phone_country_code', e.target.value)}
                                            className="w-28 sm:w-32 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-2.5 py-2.5 text-sm text-slate-900 transition-colors shrink-0 outline-none font-medium"
                                        >
                                            {countryCodes.length > 0 ? (
                                                countryCodes.map((c) => (
                                                    <option key={c.code} value={c.code}>
                                                        {c.flag} {c.code}
                                                    </option>
                                                ))
                                            ) : (
                                                <>
                                                    <option value="+63">🇵🇭 +63 (PH)</option>
                                                    <option value="+1">🇺🇸 +1 (US)</option>
                                                    <option value="+44">🇬🇧 +44 (UK)</option>
                                                    <option value="+226">🇧🇫 +226 (BF)</option>
                                                    <option value="+675">🇵🇬 +675 (PG)</option>
                                                </>
                                            )}
                                        </select>
                                        <input
                                            type="tel"
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            placeholder="9123456789"
                                            className="flex-1 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                            required
                                        />
                                    </div>
                                    {errors.phone_number && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.phone_number}</p>}
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="your.email@example.com"
                                            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                            required
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                    {errors.email && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Complete Address */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#0f766e]" /> Complete Address <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows="3"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="House / Unit No., Street, Barangay / District, City / Municipality, Province / State, Postal Code, Country"
                                className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors resize-none outline-none"
                                required
                            />
                            {errors.address && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.address}</p>}
                        </div>

                        {/* Section 5: Portal Security / Password */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                                <Lock className="w-4 h-4 text-[#0f766e]" /> Member Account Credentials
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Create Password <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Minimum 8 characters"
                                            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 pr-11 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                            required
                                        />
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

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Confirm Password <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Re-enter password"
                                            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 pr-11 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                            className="absolute inset-y-0 right-1.5 w-9 flex items-center justify-center text-slate-400 hover:text-[#0f766e] cursor-pointer border-0 bg-transparent p-0 outline-none shadow-none transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 6: Bilingual Preference & 60-Day Rookie Program */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                                <Sparkles className="w-4 h-4 text-[#0f766e]" /> Preferred Learning Language &amp; Initial Placement
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label
                                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                                        data.preferred_language === 'en'
                                            ? 'bg-teal-50/70 text-[#0f766e] border-[#0f766e] shadow-xs'
                                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="preferred_language"
                                            value="en"
                                            checked={data.preferred_language === 'en'}
                                            onChange={() => setData('preferred_language', 'en')}
                                            className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
                                        />
                                        <div>
                                            <div className="text-sm font-black flex items-center gap-2">
                                                <span>🇺🇸 English</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                                Standard curriculum and training modules in English
                                            </div>
                                        </div>
                                    </div>
                                </label>

                                <label
                                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                                        data.preferred_language === 'tl'
                                            ? 'bg-teal-50/70 text-[#0f766e] border-[#0f766e] shadow-xs'
                                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="preferred_language"
                                            value="tl"
                                            checked={data.preferred_language === 'tl'}
                                            onChange={() => setData('preferred_language', 'tl')}
                                            className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
                                        />
                                        <div>
                                            <div className="text-sm font-black flex items-center gap-2">
                                                <span>🇵🇭 Filipino</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                                Modyul at pagsasanay sa wikang Filipino / Tagalog
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Rookie Placement & 60-Day Cycle Notice */}
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center gap-4">
                                <img
                                    src="/assets/image/academy/badge-rookie.png"
                                    alt="Rookie Rank"
                                    className="w-12 h-auto object-contain filter drop-shadow-xs shrink-0"
                                />
                                <div className="text-xs text-slate-600 leading-relaxed">
                                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider font-mono">
                                        Automatic Initial Placement: ROOKIE (1 Star)
                                    </span>
                                    Upon official admission, you automatically begin Day 1 of your personal <strong>60-Day Rank Development Program</strong>. Complete sequential trainings and fulfilled requirements to earn promotion.
                                </div>
                            </div>
                        </div>

                        {/* Section 7: Terms and Conditions Agreement */}
                        <div className="pt-2">
                            <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0f766e]/50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={data.terms}
                                    onChange={(e) => setData('terms', e.target.checked)}
                                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] shrink-0"
                                />
                                <span className="text-xs text-slate-600 leading-relaxed">
                                    I hereby confirm that all submitted personal details and official documentation are accurate and authentic. I agree to abide by the{' '}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowTermsModal(true);
                                        }}
                                        className="text-[#0f766e] hover:text-[#115e59] font-bold inline cursor-pointer border-0 bg-transparent p-0 no-underline outline-none shadow-none"
                                    >
                                        Terms and Conditions
                                    </button>{' '}
                                    and Code of Conduct of the INFINITE Legacy Club Academy.
                                </span>
                            </label>
                            {errors.terms && <p className="text-xs text-rose-600 font-semibold mt-1.5">{errors.terms}</p>}
                        </div>

                        {/* Submission Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 px-6 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold uppercase text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer border-0 outline-none"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Submitting Registration Application...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Academy Application</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Profile Picture Crop, Resize & Reposition Modal */}
            <ProfilePhotoCropperModal
                isOpen={showCropModal}
                imageFile={pendingCropFile}
                onClose={() => {
                    setShowCropModal(false);
                    setPendingCropFile(null);
                }}
                onApply={handleCropApply}
                onReplacePhoto={() => fileInputRef.current?.click()}
                title="Crop & Position Profile Picture"
                subtitle="Drag to center your face, zoom to resize, or rotate to fit your official Academy ID."
            />

            {/* Clean White Terms and Conditions Modal */}
            {showTermsModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
                    onClick={() => setShowTermsModal(false)}
                >
                    <div
                        className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
                            <h3 className="text-sm sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#0f766e] shrink-0" />
                                Terms &amp; Conditions &bull; Legacy Club Academy
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowTermsModal(false)}
                                aria-label="Close terms"
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer border-0 bg-transparent outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                            <p>
                                <strong className="text-slate-900">1. Membership Eligibility:</strong> Admission into the Legacy Club Academy is subject to executive review and authentication. Submission of an application does not guarantee automatic acceptance.
                            </p>
                            <p>
                                <strong className="text-slate-900">2. Official Tier Assignment:</strong> Upon approval, the Executive Board assigns the applicant to one of five official Academy Tiers (Rookie, Elite, Master, Grand Master, or Legend).
                            </p>
                            <p>
                                <strong className="text-slate-900">3. Account Confidentiality:</strong> Members are solely responsible for maintaining the confidentiality of their credentials and portal access.
                            </p>
                            <p>
                                <strong className="text-slate-900">4. Code of Conduct:</strong> Members agree to uphold the highest standards of integrity, professional excellence, and community mentorship.
                            </p>
                            <p>
                                <strong className="text-slate-900">5. Privacy &amp; Data Protection:</strong> Personal details provided are collected for identity verification and academy credentialing under strict security protocols.
                            </p>
                        </div>
                        <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50/70 shrink-0">
                            <button
                                type="button"
                                onClick={() => setShowTermsModal(false)}
                                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer border-0 outline-none"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setData('terms', true);
                                    setShowTermsModal(false);
                                }}
                                className="px-6 py-2.5 rounded-xl bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#115e59] transition-colors cursor-pointer border-0 outline-none"
                            >
                                I Accept Terms
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
