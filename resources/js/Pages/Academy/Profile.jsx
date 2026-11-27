import React from 'react';
import { Link } from '@inertiajs/react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import CountryFlag from '../../Components/CountryFlag';
import { getCountryInfo, getTierDetails } from '../../Utils/academyBadges';
import { getRankTheme } from '../../Utils/academyLang';
import {
    User,
    Mail,
    Phone,
    Shield,
    Award,
    Camera,
    Clock,
    Sparkles,
    ChevronRight,
    BookOpen,
    CheckSquare,
    Trophy,
    Download,
    Edit3,
} from 'lucide-react';

export default function Profile({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    currentRankRequirements = [],
    sequentialTrainings = [],
    certificates = [],
}) {
    const rankTier = member.rank_tier || 'Rookie';
    const rankTheme = getRankTheme(rankTier);
    const countryInfo = member.country_info || getCountryInfo(member.phone_country_code);
    const tierDetails = getTierDetails(rankTier);
    const badgeImage = member.badge_image || rankTheme.badge || tierDetails.badge_image;

    const programProgress = member.program_progress || {
        current_day: 1,
        days_remaining: 60,
        start_date: 'N/A',
        target_date: 'N/A',
        status: 'Active',
        is_ahead: false,
        progress_percentage: 2,
    };

    const trainingStats = member.training_stats || {
        completed: 0,
        total: sequentialTrainings.length || 0,
        pending: 0,
        percentage: 0,
        has_certificate: false,
    };

    const currentActiveTraining =
        sequentialTrainings.find((item) => item.is_unlocked && item.status !== 'approved') || sequentialTrainings[0];

    const reqStats = member.requirements_stats || {
        completed: 0,
        total: currentRankRequirements.length || 0,
        remaining: currentRankRequirements.length || 0,
        percentage: 0,
        items: currentRankRequirements,
    };

    const promotionEligibility = member.promotion_eligibility || {
        is_eligible: false,
        next_rank: member.next_rank,
    };

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Dashboard & Profile"
            headTitle={`Dashboard & Profile - ${member.full_name} | Legacy Club Academy`}
        >
            {({ lang, t }) => (
                <div className="space-y-6">
                    {/* PROMOTION ELIGIBILITY BANNER */}
                    {promotionEligibility.is_eligible && (
                        <div className="rounded-3xl p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                                    <Trophy className="w-8 h-8 text-yellow-300 animate-bounce" />
                                </div>
                                <div>
                                    <div className="text-[11px] font-black uppercase tracking-widest text-emerald-200 font-mono">
                                        {t('eligible_for_promotion')}
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5 mb-0">
                                        Target: {promotionEligibility.next_rank}
                                    </h2>
                                    <p className="text-xs text-white/90 mt-1 max-w-xl leading-relaxed mb-0">
                                        {promotionEligibility.message}
                                    </p>
                                </div>
                            </div>
                            <span className="inline-block px-4 py-2 rounded-xl bg-white text-emerald-900 font-black text-xs uppercase tracking-wider shadow-md shrink-0">
                                Conferral in Progress
                            </span>
                        </div>
                    )}

                    {/* HERO PROFILE BANNER */}
                    <div className="rounded-3xl bg-white p-6 sm:p-8 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left min-w-0">
                                <div className="relative group shrink-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center shadow-sm">
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
                                    <Link
                                        href="/academy-portal/settings"
                                        className="absolute -bottom-1.5 -right-1.5 p-2 rounded-xl bg-[#0f766e] text-white hover:bg-[#115e59] transition-transform hover:scale-105 shadow-md"
                                        title="Update Profile Photo & Settings"
                                        aria-label="Update Profile Photo"
                                    >
                                        <Camera className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                <div className="space-y-2 min-w-0">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0f766e] font-mono text-[11px] font-bold uppercase tracking-wider">
                                        <Shield className="w-3 h-3" />
                                        <span>{t('member_id')}: {member.member_id}</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mb-0 break-words">
                                        {member.full_name}
                                    </h2>

                                    {/* Colorful Country Flag directly below Name */}
                                    <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap pt-0.5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100/90">
                                            <CountryFlag
                                                code={countryInfo.code}
                                                flag={countryInfo.flag}
                                                country={countryInfo.country}
                                                className="w-5 h-3.5"
                                            />
                                            <span className="text-xs font-bold text-slate-800">{countryInfo.country}</span>
                                            <span className="text-[11px] font-mono font-bold text-[#0f766e]">({member.phone_country_code || '+63'})</span>
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium">{t('verified_member')}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                                        <span className="flex items-center gap-1.5 break-all">
                                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span className="font-mono">{member.email}</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span className="font-mono">{member.phone_country_code} {member.phone_number}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Rank Shield Thumbnail -> Links to 5-Tier Rank Matrix page */}
                            <Link
                                href="/academy-portal/rank-matrix"
                                title="View 5-Tier Rank Matrix"
                                className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/90 hover:bg-teal-50/70 transition-all no-underline group"
                            >
                                <img
                                    src={badgeImage}
                                    alt={rankTier}
                                    className="w-16 h-auto object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                                />
                                <span className="font-mono font-black text-xs text-slate-900 uppercase mt-1.5">
                                    {rankTier}
                                </span>
                                <span className="text-amber-500 text-[10px] tracking-widest mt-0.5">
                                    {member.rank_details?.stars_display || '★'}
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* 60-DAY RANK DEVELOPMENT PROGRAM */}
                    <div className="rounded-3xl bg-white p-6 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                    Cycle Management
                                </span>
                                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 uppercase font-mono mt-0.5 mb-0">
                                    <Clock className="w-4 h-4 text-[#0f766e]" />
                                    {t('program_60day')} ({rankTier} Stage)
                                </h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase font-mono ${
                                    programProgress.status === 'Completed'
                                        ? 'bg-emerald-50 text-emerald-800'
                                        : programProgress.status === 'Extended'
                                            ? 'bg-amber-50 text-amber-800'
                                            : 'bg-teal-50 text-[#0f766e]'
                                }`}>
                                    Status: {programProgress.status}
                                </span>
                                {programProgress.is_ahead && (
                                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase font-mono bg-emerald-100 text-emerald-900 flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                                        {t('ahead_of_schedule')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                            <div className="p-4 rounded-2xl bg-slate-50/90">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                    {t('current_day')}
                                </div>
                                <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                                    Day {programProgress.current_day} <span className="text-xs text-slate-500 font-normal">/ 60</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50/90">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                    {t('days_remaining')}
                                </div>
                                <div className="text-2xl font-black text-amber-600 font-mono mt-1">
                                    {programProgress.days_remaining} <span className="text-xs text-slate-500 font-normal">{t('days_label')}</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50/90">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                    {t('start_date')}
                                </div>
                                <div className="text-sm font-bold text-slate-800 font-mono mt-2">
                                    {programProgress.start_date}
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50/90">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                    {t('target_date')}
                                </div>
                                <div className="text-sm font-bold text-slate-800 font-mono mt-2">
                                    {programProgress.target_date}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-mono font-bold text-slate-600 mb-1.5">
                                <span>60-Day Timeline Completion</span>
                                <span>{programProgress.progress_percentage}%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${rankTheme.progressBar} transition-all duration-500 rounded-full`}
                                    style={{ width: `${programProgress.progress_percentage}%` }}
                                />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-2 italic mb-0">
                                Note: The 60-day program runs independently per member. Advancement requires completing both training modules and verified rank requirements.
                            </p>
                        </div>
                    </div>

                    {/* DUAL PROGRESS OVERVIEW (SEPARATE TRAINING & REQUIREMENTS SUMMARY CARDS) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* CARD A: TRAINING PROGRESS */}
                        <div className="p-6 rounded-3xl bg-white space-y-4 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">Section A</span>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2 mt-0.5 mb-0">
                                            <BookOpen className="w-4 h-4 text-[#0f766e]" />
                                            {t('training_progress')}
                                        </h4>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                                        trainingStats.percentage === 100
                                            ? 'bg-emerald-50 text-emerald-800'
                                            : 'bg-teal-50 text-[#0f766e]'
                                    }`}>
                                        {trainingStats.completed}/{trainingStats.total} {t('completed')}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                                        <span>Curriculum Mastery</span>
                                        <span className="text-lg font-black text-[#0f766e]">{trainingStats.percentage}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-teal-600 to-[#14b8a6] transition-all duration-500 rounded-full"
                                            style={{ width: `${trainingStats.percentage}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                                        <span>Approved Modules: {trainingStats.completed}</span>
                                        <span>Pending Review: {trainingStats.pending}</span>
                                    </div>
                                </div>

                                {currentActiveTraining && (
                                    <div className="p-3.5 rounded-2xl bg-slate-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="space-y-0.5 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className="px-2 py-0.5 rounded-md bg-teal-100 text-[#0f766e] text-[10px] font-mono font-bold shrink-0">
                                                    Step #{currentActiveTraining.order}
                                                </span>
                                                <span className="text-xs font-bold text-slate-900 truncate">
                                                    {lang === 'tl' ? currentActiveTraining.title_tl : currentActiveTraining.title_en}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 truncate mb-0">
                                                {lang === 'tl' ? currentActiveTraining.description_tl : currentActiveTraining.description_en}
                                            </p>
                                        </div>
                                        <Link
                                            href="/academy-portal/trainings"
                                            className="px-3.5 py-1.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors flex items-center justify-center gap-1.5 no-underline"
                                        >
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span>{currentActiveTraining.status === 'approved' ? 'Review' : 'Open'}</span>
                                        </Link>
                                    </div>
                                )}

                                {(trainingStats.percentage === 100 || certificates.length > 0) && (
                                    <div className="p-3.5 rounded-2xl bg-teal-50/80 text-teal-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <Award className="w-5 h-5 text-[#0f766e] shrink-0" />
                                            <div className="min-w-0">
                                                <div className="font-black text-xs uppercase">{t('certificates')}</div>
                                                <div className="text-[11px] text-teal-800 truncate">
                                                    {certificates[0]?.is_custom ? 'Official Certificate from Academy Admin' : 'Training Completion Certificate Conferred'}
                                                </div>
                                            </div>
                                        </div>
                                        {certificates.length > 0 && (
                                            <div className="flex items-center gap-2 shrink-0">
                                                <Link
                                                    href="/academy-portal/certificates"
                                                    className="px-2.5 py-1.5 rounded-xl bg-white text-[#0f766e] hover:bg-teal-100 text-[11px] font-bold uppercase tracking-wider no-underline"
                                                >
                                                    View ({certificates.length})
                                                </Link>
                                                <a
                                                    href={certificates[0].download_url}
                                                    className="px-3 py-1.5 rounded-xl bg-[#0f766e] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#115e59] no-underline flex items-center gap-1.5"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                    <span>Download</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/academy-portal/trainings"
                                className="w-full py-2.5 rounded-xl bg-slate-100/90 hover:bg-teal-50 text-[#0f766e] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 no-underline"
                            >
                                <span>Open Sequential Trainings ({sequentialTrainings.length})</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* CARD B: REQUIREMENTS PROGRESS */}
                        <div className="p-6 rounded-3xl bg-white space-y-4 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono">Section B</span>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2 mt-0.5 mb-0">
                                            <CheckSquare className="w-4 h-4 text-amber-600" />
                                            {t('requirements_progress')}
                                        </h4>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                                        reqStats.percentage === 100
                                            ? 'bg-emerald-50 text-emerald-800'
                                            : 'bg-amber-50 text-amber-800'
                                    }`}>
                                        {reqStats.completed}/{reqStats.total} {t('completed')}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                                        <span>Requirements Verified</span>
                                        <span className="text-lg font-black text-amber-600">{reqStats.percentage}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
                                            style={{ width: `${reqStats.percentage}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                                        <span>Fulfilled &amp; Verified: {reqStats.completed}</span>
                                        <span>Remaining: {reqStats.remaining}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-1">
                                    {reqStats.items.slice(0, 3).map((r) => (
                                        <div key={r.id} className="p-3 rounded-xl bg-slate-50/90 flex items-center justify-between gap-2 text-xs">
                                            <span className="font-bold text-slate-800 truncate">
                                                {lang === 'tl' ? r.title_tl : r.title_en}
                                            </span>
                                            <span className="font-mono font-bold text-[11px] text-[#0f766e] shrink-0">
                                                {r.current_value}/{r.target_value} ({r.remaining} {t('remaining')})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/academy-portal/requirements"
                                className="w-full py-2.5 rounded-xl bg-slate-100/90 hover:bg-amber-50 text-amber-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 no-underline"
                            >
                                <span>Open Requirements Checklist</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* OFFICIAL RANK DESIGNATION & IDENTITY MATRIX */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-5">
                            <div className="rounded-3xl bg-white p-6 sm:p-8 text-center space-y-4 h-full flex flex-col justify-between">
                                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold">
                                    OFFICIAL ACADEMY DESIGNATION
                                </div>

                                <div className="my-2 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50/80">
                                    <img
                                        src={badgeImage}
                                        alt={`${rankTier} Tier Badge`}
                                        className="w-40 sm:w-48 h-auto object-contain filter drop-shadow-xl transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wider font-mono mt-3">
                                        {rankTier}
                                    </div>
                                    <div className="text-amber-500 text-lg tracking-widest my-1">
                                        {member.rank_details?.stars_display || '★'}
                                    </div>
                                    <div className="px-3.5 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-white text-slate-700 mt-1 shadow-xs">
                                        {member.rank_details?.title || 'Verified Member'}
                                    </div>
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto mb-0">
                                    {member.rank_details?.description || 'Verified member of the Legacy Club Academy.'}
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5 h-full flex flex-col justify-between">
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                                                VERIFICATION REGISTRY
                                            </span>
                                            <h3 className="text-base font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                                Member Identity Credentials
                                            </h3>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase bg-emerald-50 text-emerald-800">
                                            Active Verified
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                                        <div className="p-4 rounded-2xl bg-slate-50/90 min-w-0">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Full Legal Name</span>
                                            <div className="text-slate-900 font-bold text-sm mt-1 break-words">{member.full_name}</div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-50/90 min-w-0">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Member ID</span>
                                            <div className="text-[#0f766e] font-mono font-bold text-sm mt-1">{member.member_id}</div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-50/90 min-w-0">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Email Address</span>
                                            <div className="text-slate-900 font-mono font-medium mt-1 break-all">{member.email}</div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-50/90 min-w-0">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Contact Number</span>
                                            <div className="text-slate-900 font-mono font-medium mt-1 flex items-center gap-2 flex-wrap">
                                                <CountryFlag
                                                    code={countryInfo.code}
                                                    flag={countryInfo.flag}
                                                    country={countryInfo.country}
                                                    className="w-4 h-3"
                                                />
                                                <span className="break-all">{member.phone_country_code} {member.phone_number}</span>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50/90 min-w-0">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Official Address</span>
                                            <div className="text-slate-800 mt-1 leading-relaxed break-words">{member.address}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <Link
                                        href="/academy-portal/settings"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-[#0f766e] text-xs font-bold transition-colors no-underline"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                        <span>Edit Profile &amp; Security</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AcademyLayout>
    );
}
