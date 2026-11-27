import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import CommandmentsPanel from '../../Components/CommandmentsPanel';
import { ACADEMY_TIERS, getTierDetails } from '../../Utils/academyBadges';
import { Shield, CheckCircle2, Sparkles, Lock, BookOpen, CheckSquare, ArrowRight, Crown } from 'lucide-react';

export default function RankMatrix({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    commandmentsByTier = null,
}) {
    const rankTier = member?.rank_tier || 'Rookie';
    const [commandmentTier, setCommandmentTier] = useState(rankTier);
    const currentDetails = getTierDetails(rankTier);
    const orderedTiers = Object.values(ACADEMY_TIERS);
    const currentIdx = Math.max(
        0,
        orderedTiers.findIndex((item) => item.tier.toLowerCase() === rankTier.toLowerCase())
    );

    const trainingStats = member?.training_stats || { completed: 0, total: 0, percentage: 0 };
    const reqStats = member?.requirements_stats || { completed: 0, total: 0, percentage: 0 };
    const eligibility = member?.promotion_eligibility || { is_eligible: false, next_rank: null };

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="5-Tier Rank Matrix"
            headTitle={`5-Tier Rank Matrix - ${member.full_name} | Legacy Club Academy`}
        >
            {({ lang, t }) => (
                <div className="space-y-6">
                    {/* Hero Current Rank & Progression Summary */}
                    <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-50 p-3 flex items-center justify-center shrink-0">
                                <img
                                    src={currentDetails.badge_image}
                                    alt={rankTier}
                                    className="w-full h-full object-contain drop-shadow-sm"
                                />
                            </div>
                            <div className="min-w-0 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono inline-flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" />
                                    Official Leadership Hierarchy
                                </span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mb-0">
                                    5-Tier Rank Matrix
                                </h2>
                                <p className="text-xs text-slate-500 max-w-xl leading-relaxed mb-0">
                                    You are currently accredited as <strong className="text-slate-800">{currentDetails.name} ({currentDetails.title})</strong>.{' '}
                                    {eligibility.next_rank ? (
                                        <>Complete 100% of both Trainings and Rank Requirements to unlock promotion to <strong className="text-[#0f766e]">{eligibility.next_rank}</strong>.</>
                                    ) : (
                                        <>You have reached the highest apex sovereignty tier of the Legacy Club Academy.</>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                            <Link
                                href="/academy-portal/trainings"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0f766e] text-xs font-bold no-underline"
                            >
                                <BookOpen className="w-4 h-4" />
                                <span>Trainings ({trainingStats.percentage}%)</span>
                            </Link>
                            <Link
                                href="/academy-portal/requirements"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold no-underline"
                            >
                                <CheckSquare className="w-4 h-4" />
                                <span>Requirements ({reqStats.percentage}%)</span>
                            </Link>
                        </div>
                    </div>

                    {/* Dual Progression Rules Strip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white p-5 space-y-1.5 shadow-[inset_4px_0_0_#0f766e]">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0f766e]">
                                Step 1 &bull; Curriculum
                            </div>
                            <div className="text-sm font-black text-slate-900">100% Sequential Trainings</div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-0">
                                Complete each training module in order and submit thoughtful reflections for Executive Admin approval.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-5 space-y-1.5 shadow-[inset_4px_0_0_#f59e0b]">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
                                Step 2 &bull; Milestones
                            </div>
                            <div className="text-sm font-black text-slate-900">100% Verified Requirements</div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-0">
                                Fulfill all target metrics strictly scoped to your current rank within the 60-day development cycle.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-5 space-y-1.5 shadow-[inset_4px_0_0_#10b981]">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                                Step 3 &bull; Advancement
                            </div>
                            <div className="text-sm font-black text-slate-900">Official Rank Promotion</div>
                            <p className="text-xs text-slate-500 leading-relaxed mb-0">
                                Once both criteria reach 100%, Administration promotes your tier, issues your certificate, and starts your next 60-day cycle.
                            </p>
                        </div>
                    </div>

                    {/* 5 Official Rank Tiers Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {orderedTiers.map((tier, idx) => {
                            const isCurrent = idx === currentIdx;
                            const isAchieved = idx < currentIdx;
                            const isNext = idx === currentIdx + 1;

                            return (
                                <div
                                    key={tier.name}
                                    className={`rounded-3xl bg-white p-6 flex flex-col justify-between gap-5 transition-all ${
                                        isCurrent
                                            ? 'shadow-[inset_0_0_0_2px_#0f766e,0_10px_28px_rgba(15,118,110,0.10)]'
                                            : ''
                                    }`}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[11px] font-mono font-black uppercase text-slate-400">
                                                Tier 0{idx + 1}
                                            </span>
                                            {isCurrent ? (
                                                <span className="px-3 py-1 rounded-full bg-[#0f766e] text-white text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    {t('current_rank')}
                                                </span>
                                            ) : isAchieved ? (
                                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Achieved
                                                </span>
                                            ) : isNext ? (
                                                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1">
                                                    <Crown className="w-3 h-3" />
                                                    {t('next_rank')}
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1">
                                                    <Lock className="w-3 h-3" />
                                                    Upcoming
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-20 h-20 rounded-2xl p-2.5 flex items-center justify-center shrink-0 ${
                                                    isCurrent ? 'bg-teal-50/70' : 'bg-slate-50'
                                                }`}
                                            >
                                                <img
                                                    src={tier.badge_image}
                                                    alt={tier.name}
                                                    className={`w-full h-full object-contain ${
                                                        !isCurrent && !isAchieved && !isNext ? 'opacity-75 grayscale-[25%]' : ''
                                                    }`}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-amber-500 text-sm tracking-widest leading-none mb-1">
                                                    {tier.stars_display}
                                                </div>
                                                <h3 className="text-lg font-black text-slate-900 uppercase font-mono leading-tight mb-0">
                                                    {tier.name}
                                                </h3>
                                                <div className="text-xs font-bold text-[#0f766e] mt-0.5">
                                                    {tier.title}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-600 leading-relaxed mb-0">
                                            {tier.description}
                                        </p>
                                    </div>

                                    <div className="pt-3">
                                        <div className="h-px bg-slate-100 w-full mb-3" />
                                        {isCurrent ? (
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold text-slate-500">Active 60-Day Cycle</span>
                                                <Link
                                                    href="/academy-portal/requirements"
                                                    className="inline-flex items-center gap-1 font-bold text-[#0f766e] hover:text-[#115e59] no-underline"
                                                >
                                                    <span>View Targets</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        ) : isAchieved ? (
                                            <div className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1.5">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>Successfully Completed &amp; Conferred</span>
                                            </div>
                                        ) : isNext ? (
                                            <div className="text-xs font-semibold text-amber-700">
                                                {eligibility.is_eligible
                                                    ? 'Eligible now — awaiting Executive Board promotion'
                                                    : 'Complete current rank Trainings & Requirements to qualify'}
                                            </div>
                                        ) : (
                                            <div className="text-xs text-slate-400 font-medium">
                                                Unlocks sequentially upon advancing through prior tiers
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Commandments per Tier */}
                    <div className="space-y-4">
                        <div className="rounded-3xl bg-white p-5 sm:p-6 space-y-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                    {lang === 'tl' ? 'Kodigo ng Bawat Antas' : 'Code of Conduct per Tier'}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                    {lang === 'tl' ? 'Mga Utos ng Bawat Antas' : 'Tier Commandments'}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {orderedTiers.map((tier) => {
                                    const active = commandmentTier.toLowerCase() === tier.tier.toLowerCase();
                                    const isMine = tier.tier.toLowerCase() === rankTier.toLowerCase();
                                    return (
                                        <button
                                            key={tier.tier}
                                            type="button"
                                            onClick={() => setCommandmentTier(tier.tier)}
                                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                active
                                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                                    : 'bg-slate-100/90 text-slate-600 hover:bg-teal-50 hover:text-[#0f766e]'
                                            }`}
                                        >
                                            <img src={tier.badge_image} alt="" className="w-5 h-5 object-contain" />
                                            <span>{tier.name}</span>
                                            {isMine && (
                                                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase ${active ? 'bg-white/25 text-white' : 'bg-teal-100 text-[#0f766e]'}`}>
                                                    {lang === 'tl' ? 'Ikaw' : 'You'}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <CommandmentsPanel
                            tier={commandmentTier}
                            lang={lang}
                            isCurrent={commandmentTier.toLowerCase() === rankTier.toLowerCase()}
                            items={commandmentsByTier?.[commandmentTier] ?? []}
                        />
                    </div>
                </div>
            )}
        </AcademyLayout>
    );
}
