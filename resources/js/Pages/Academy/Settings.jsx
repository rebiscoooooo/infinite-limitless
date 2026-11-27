import React, { useState, useEffect, useRef } from 'react';
import { router, useForm } from '@inertiajs/react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import CountryFlag from '../../Components/CountryFlag';
import ProfilePhotoCropperModal from '../../Components/ProfilePhotoCropperModal';
import { COUNTRY_DIAL_MAP, getCountryInfo } from '../../Utils/academyBadges';
import {
    Camera,
    Save,
    RotateCcw,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    Phone,
    MapPin,
    Globe,
    ShieldCheck,
    X,
    Crop,
} from 'lucide-react';

export default function Settings({
    member,
    portalCounts = {},
    latestAnnouncement = null,
}) {
    const fileInputRef = useRef(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
    const [rawPhotoFile, setRawPhotoFile] = useState(null);
    const [pendingCropFile, setPendingCropFile] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const form = useForm({
        phone_country_code: member?.phone_country_code || '+63',
        phone_number: member?.phone_number || '',
        address: member?.address || '',
        profile_picture: null,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    // Keep base contact fields aligned when realtime sync refreshes member props
    useEffect(() => {
        if (!form.isDirty) {
            form.setData({
                phone_country_code: member?.phone_country_code || '+63',
                phone_number: member?.phone_number || '',
                address: member?.address || '',
                profile_picture: null,
                current_password: '',
                new_password: '',
                new_password_confirmation: '',
            });
        }
    }, [member?.phone_country_code, member?.phone_number, member?.address]);

    // Revoke blob preview URL on change or unmount
    useEffect(() => {
        if (!form.data.profile_picture) {
            setPhotoPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(form.data.profile_picture);
        setPhotoPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [form.data.profile_picture]);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPendingCropFile(file);
            setShowCropModal(true);
        }
        e.target.value = '';
    };

    const handleCropApply = (croppedFile) => {
        if (pendingCropFile) {
            setRawPhotoFile(pendingCropFile);
        }
        form.setData('profile_picture', croppedFile);
        setShowCropModal(false);
        setPendingCropFile(null);
    };

    const handleReopenCrop = () => {
        const source = rawPhotoFile || form.data.profile_picture;
        if (!source) return;
        setPendingCropFile(source);
        setShowCropModal(true);
    };

    const handleClearSelectedPhoto = () => {
        form.setData('profile_picture', null);
        setRawPhotoFile(null);
        setPendingCropFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.clearErrors();

        if (form.data.new_password || form.data.new_password_confirmation) {
            if (!form.data.current_password) {
                form.setError('current_password', 'Please enter your current password to change your password.');
                return;
            }
            if (form.data.new_password.length < 8) {
                form.setError('new_password', 'New password must be at least 8 characters long.');
                return;
            }
            if (form.data.new_password !== form.data.new_password_confirmation) {
                form.setError('new_password_confirmation', 'New password confirmation does not match.');
                return;
            }
        }

        form.post('/academy-profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.setData((prev) => ({
                    ...prev,
                    profile_picture: null,
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                }));
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const handleReset = () => {
        form.clearErrors();
        form.setData({
            phone_country_code: member?.phone_country_code || '+63',
            phone_number: member?.phone_number || '',
            address: member?.address || '',
            profile_picture: null,
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const selectedCountry = getCountryInfo(form.data.phone_country_code);
    const dialEntries = Object.entries(COUNTRY_DIAL_MAP);

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Profile Settings"
            headTitle={`Profile Settings - ${member.full_name} | Legacy Club Academy`}
        >
            {({ lang, t }) => {
                const handleSetLanguage = (nextLang) => {
                    if (nextLang === lang) return;
                    router.post('/academy-portal/language', { language: nextLang }, { preserveScroll: true });
                };

                return (
                    <div className="space-y-6">
                        {/* Header Banner */}
                        <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                    Member Account Configuration
                                </span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                    {t('profile_settings')}
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed mb-0">
                                    Update your formal portrait photo, international contact details, address, preferred portal language, or account password.
                                </p>
                            </div>
                            <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0f766e] text-xs font-mono font-bold shrink-0">
                                ID: {member.member_id}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* LEFT COLUMN: Portrait & Language */}
                            <div className="space-y-6">
                                {/* Portrait Photo Card */}
                                <div className="rounded-3xl bg-white p-6 space-y-5">
                                    <div className="flex flex-col items-center text-center space-y-3">
                                        <div className="relative">
                                            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm">
                                                {photoPreviewUrl || member.avatar_url ? (
                                                    <img
                                                        src={photoPreviewUrl || member.avatar_url}
                                                        alt={member.full_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-3xl font-black text-slate-400">
                                                        {(member.full_name || 'M').charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                            {photoPreviewUrl && (
                                                <button
                                                    type="button"
                                                    onClick={handleClearSelectedPhoto}
                                                    title="Remove staged photo"
                                                    aria-label="Remove staged photo"
                                                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md cursor-pointer"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase mb-0">
                                                {member.full_name}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5 mb-0 break-all">
                                                {member.email}
                                            </p>
                                        </div>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0f766e] text-xs font-bold cursor-pointer border-0"
                                            >
                                                <Camera className="w-4 h-4" />
                                                <span>{photoPreviewUrl ? 'Choose Different Photo' : 'Change Profile Photo'}</span>
                                            </button>
                                            {photoPreviewUrl && (
                                                <button
                                                    type="button"
                                                    onClick={handleReopenCrop}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer border-0"
                                                >
                                                    <Crop className="w-3.5 h-3.5 text-[#0f766e]" />
                                                    <span>Crop / Reposition</span>
                                                </button>
                                            )}
                                        </div>

                                        <ProfilePhotoCropperModal
                                            isOpen={showCropModal}
                                            imageFile={pendingCropFile}
                                            onClose={() => {
                                                setShowCropModal(false);
                                                setPendingCropFile(null);
                                            }}
                                            onApply={handleCropApply}
                                            onReplacePhoto={() => fileInputRef.current?.click()}
                                            title="Crop & Position Profile Photo"
                                            subtitle="Drag to reposition, zoom to resize, or rotate your portrait."
                                        />

                                        {photoPreviewUrl && (
                                            <p className="text-[11px] font-semibold text-amber-700 mb-0">
                                                New photo selected — click &ldquo;{t('save_changes')}&rdquo; to apply.
                                            </p>
                                        )}
                                        {form.errors.profile_picture && (
                                            <p className="text-[11px] font-semibold text-rose-600 mb-0">
                                                {form.errors.profile_picture}
                                            </p>
                                        )}
                                    </div>

                                    <div className="h-px bg-slate-100 w-full" />

                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-slate-400 font-semibold">Official Rank</span>
                                            <span className="font-mono font-bold text-[#0f766e] uppercase">{member.rank_tier}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-slate-400 font-semibold">Account Status</span>
                                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                {member.status || 'Approved'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-relaxed pt-2 mb-0">
                                            Official name and registered email are linked to your Academy credentials. Contact administration for formal name updates.
                                        </p>
                                    </div>
                                </div>

                                {/* Language Preference Card */}
                                <div className="rounded-3xl bg-white p-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-[#0f766e]" />
                                        <h3 className="text-sm font-black text-slate-900 uppercase font-mono mb-0">
                                            {t('preferred_language')}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-0">
                                        Choose your preferred display language for portal labels, trainings, and rank requirements.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <button
                                            type="button"
                                            onClick={() => handleSetLanguage('en')}
                                            className={`p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                                                lang === 'en'
                                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-[#0f766e]'
                                            }`}
                                        >
                                            <CountryFlag code="US" flag="🇺🇸" country="English" className="w-4 h-3" />
                                            <span>English</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSetLanguage('tl')}
                                            className={`p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                                                lang === 'tl'
                                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-[#0f766e]'
                                            }`}
                                        >
                                            <CountryFlag code="PH" flag="🇵🇭" country="Filipino" className="w-4 h-3" />
                                            <span>Filipino</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Unified Contact & Security Form */}
                            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                                {/* Validation Errors Summary */}
                                {Object.keys(form.errors).length > 0 && (
                                    <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 text-xs flex items-start gap-3">
                                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <div className="font-bold">Please fix the following before saving:</div>
                                            <ul className="list-disc list-inside space-y-0.5 text-[11px] mb-0">
                                                {Object.entries(form.errors).map(([key, msg]) => (
                                                    <li key={key}>{msg}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Contact Information Card */}
                                <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0f766e] flex items-center justify-center shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase font-mono mb-0">
                                                Contact &amp; Location Details
                                            </h3>
                                            <p className="text-[11px] text-slate-500 mb-0">
                                                Your country code automatically sets the flag shown on your profile &amp; leaderboards.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Country / Dial Code
                                            </label>
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-10 px-3 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                                    <CountryFlag
                                                        code={selectedCountry.code}
                                                        flag={selectedCountry.flag}
                                                        country={selectedCountry.country}
                                                        className="w-5 h-3.5"
                                                    />
                                                </div>
                                                <select
                                                    value={form.data.phone_country_code}
                                                    onChange={(e) => form.setData('phone_country_code', e.target.value)}
                                                    className="w-full h-10 bg-slate-50 rounded-xl px-3 text-xs font-semibold text-slate-800 focus:outline-none"
                                                >
                                                    {dialEntries.map(([dial, info]) => (
                                                        <option key={dial} value={dial}>
                                                            {info.country} ({dial})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Mobile / Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={form.data.phone_number}
                                                onChange={(e) => form.setData('phone_number', e.target.value)}
                                                placeholder="912 345 6789"
                                                className="w-full h-10 bg-slate-50 rounded-xl px-3.5 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                Complete Address
                                            </span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            required
                                            value={form.data.address}
                                            onChange={(e) => form.setData('address', e.target.value)}
                                            placeholder="Enter your complete residential or delivery address..."
                                            className="w-full bg-slate-50 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-y"
                                        />
                                    </div>
                                </div>

                                {/* Optional Change Password Card */}
                                <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase font-mono mb-0">
                                                Change Password (Optional)
                                            </h3>
                                            <p className="text-[11px] text-slate-500 mb-0">
                                                Leave these fields blank if you do not wish to change your current password.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showCurrentPass ? 'text' : 'password'}
                                                    value={form.data.current_password}
                                                    onChange={(e) => form.setData('current_password', e.target.value)}
                                                    placeholder="Enter current password..."
                                                    autoComplete="current-password"
                                                    className="w-full h-10 bg-slate-50 rounded-xl pl-3.5 pr-11 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                                    aria-label={showCurrentPass ? 'Hide current password' : 'Show current password'}
                                                    className="absolute inset-y-0 right-1.5 w-9 flex items-center justify-center text-slate-400 hover:text-[#0f766e] bg-transparent border-0 p-0 cursor-pointer transition-colors"
                                                >
                                                    {showCurrentPass ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showNewPass ? 'text' : 'password'}
                                                        value={form.data.new_password}
                                                        onChange={(e) => form.setData('new_password', e.target.value)}
                                                        placeholder="At least 8 characters..."
                                                        autoComplete="new-password"
                                                        className="w-full h-10 bg-slate-50 rounded-xl pl-3.5 pr-11 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPass(!showNewPass)}
                                                        aria-label={showNewPass ? 'Hide new password' : 'Show new password'}
                                                        className="absolute inset-y-0 right-1.5 w-9 flex items-center justify-center text-slate-400 hover:text-[#0f766e] bg-transparent border-0 p-0 cursor-pointer transition-colors"
                                                    >
                                                        {showNewPass ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                    Confirm New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showConfirmPass ? 'text' : 'password'}
                                                        value={form.data.new_password_confirmation}
                                                        onChange={(e) => form.setData('new_password_confirmation', e.target.value)}
                                                        placeholder="Re-enter new password..."
                                                        autoComplete="new-password"
                                                        className="w-full h-10 bg-slate-50 rounded-xl pl-3.5 pr-11 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                                        aria-label={showConfirmPass ? 'Hide password confirmation' : 'Show password confirmation'}
                                                        className="absolute inset-y-0 right-1.5 w-9 flex items-center justify-center text-slate-400 hover:text-[#0f766e] bg-transparent border-0 p-0 cursor-pointer transition-colors"
                                                    >
                                                        {showConfirmPass ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Bar */}
                                <div className="flex flex-wrap items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={form.processing}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Reset</span>
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer disabled:opacity-50"
                                    >
                                        {form.processing ? (
                                            <>
                                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>{t('save_changes')}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }}
        </AcademyLayout>
    );
}
