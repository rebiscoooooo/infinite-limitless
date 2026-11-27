import React, { useState } from 'react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import CountryFlag from '../../Components/CountryFlag';
import { getCountryInfo, getTierDetails } from '../../Utils/academyBadges';
import { Trophy, Medal, Flame, BookOpen, CheckSquare, Users, Sparkles } from 'lucide-react';

const TIER_ORDER = ['Rookie', 'Elite', 'Master', 'Grand Master', 'Legend'];

export default function Leaderboards({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    leaderboards = {},
}) {
    const [category, setCategory] = useState('overall');

    const rankTier = leaderboards.current_member_rank || member?.rank_tier || 'Rookie';
    const isTierView = category.startsWith('tier:');
    const activeTierName = isTierView ? category.slice(5) : null;
    const activeTierDetails = activeTierName ? getTierDetails(activeTierName) : null;
    const tierCounts = leaderboards.tier_counts || {};

    const rawRows = isTierView
        ? leaderboards.tiers?.[activeTierName]
        : leaderboards[category];
    const currentRows = Array.isArray(rawRows) ? rawRows : [];
    const topThree = currentRows.slice(0, 3);

    const podiumThemes = [
        {
            badgeBg: 'bg-amber-100 text-amber-800',
            cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-white',
            accent: 'shadow-[inset_0_3px_0_#f59e0b]',
            label: '1st Place',
        },
        {
            badgeBg: 'bg-slate-200/80 text-slate-700',
            cardBg: 'bg-gradient-to-br from-slate-50 via-white to-white',
            accent: 'shadow-[inset_0_3px_0_#94a3b8]',
            label: '2nd Place',
        },
        {
            badgeBg: 'bg-orange-100/90 text-orange-800',
            cardBg: 'bg-gradient-to-br from-orange-50/70 via-white to-white',
            accent: 'shadow-[inset_0_3px_0_#ea580c]',
            label: '3rd Place',
        },
    ];

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Academy Leaderboards"
            headTitle={`Academy Leaderboards - ${member.full_name} | Legacy Club Academy`}
        >
            {({ t }) => {
                const categories = [
                    { key: 'overall', label: `${t('leaderboard_overall')} (All Tiers)`, icon: Trophy },
                    { key: 'training', label: t('leaderboard_training'), icon: BookOpen },
                    { key: 'requirements', label: t('leaderboard_requirements'), icon: CheckSquare },
                ];

                return (
                    <div className="space-y-6">
                        {/* Header & Category Tabs Card */}
                        <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-mono inline-flex items-center gap-1.5">
                                        <Flame className="w-3.5 h-3.5" />
                                        Verified Academy Standings
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                        {t('leaderboard')}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed mb-0">
                                        Rankings are computed from cumulative lifetime points earned across all your completed tiers. Points carry over automatically when you get promoted and continue growing with every new milestone.
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 shrink-0">
                                    <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold">
                                        Total Score: {member?.total_points ?? 0} pts
                                    </span>
                                    <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0f766e] text-xs font-mono font-bold">
                                        Your Tier: {rankTier}
                                    </span>
                                </div>
                            </div>

                            {/* Category Switcher Pills */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    const active = category === cat.key;
                                    return (
                                        <button
                                            key={cat.key}
                                            type="button"
                                            onClick={() => setCategory(cat.key)}
                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                active
                                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                                    : 'bg-slate-100/90 text-slate-600 hover:bg-teal-50 hover:text-[#0f766e]'
                                            }`}
                                        >
                                            <Icon className="w-3.5 h-3.5 shrink-0" />
                                            <span>{cat.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Browse the full ranking of EVERY tier — visible to all members regardless of own rank */}
                            <div className="pt-2 space-y-2.5">
                                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>Browse Ranking by Tier</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                                    {TIER_ORDER.map((tierName) => {
                                        const details = getTierDetails(tierName);
                                        const key = `tier:${tierName}`;
                                        const active = category === key;
                                        const isMine = rankTier.toLowerCase() === tierName.toLowerCase();
                                        const count = tierCounts[tierName] ?? 0;
                                        return (
                                            <button
                                                key={tierName}
                                                type="button"
                                                onClick={() => setCategory(key)}
                                                className={`relative p-3 rounded-2xl flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                                                    active
                                                        ? 'bg-[#0f766e] text-white shadow-md'
                                                        : 'bg-slate-50 hover:bg-teal-50 text-slate-700'
                                                }`}
                                            >
                                                <img
                                                    src={details.badge_image}
                                                    alt={tierName}
                                                    className="w-9 h-9 object-contain shrink-0 drop-shadow-sm"
                                                />
                                                <div className="min-w-0">
                                                    <div className="text-xs font-black uppercase font-mono truncate">
                                                        {details.name}
                                                    </div>
                                                    <div className={`text-[10px] font-semibold ${active ? 'text-white/80' : 'text-slate-400'}`}>
                                                        {count} {count === 1 ? 'member' : 'members'}
                                                    </div>
                                                </div>
                                                {isMine && (
                                                    <span className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-mono font-black uppercase ${
                                                        active ? 'bg-white/25 text-white' : 'bg-teal-100 text-[#0f766e]'
                                                    }`}>
                                                        You
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Top 3 Podium Spotlight */}
                        {topThree.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {topThree.map((entry, idx) => {
                                    const theme = podiumThemes[idx] || podiumThemes[2];
                                    const cInfo = entry.country_info || getCountryInfo('+63');
                                    const tierDetails = getTierDetails(entry.rank_tier);
                                    const isMe = entry.id === member.id;

                                    return (
                                        <div
                                            key={entry.id}
                                            className={`rounded-3xl p-5 sm:p-6 ${theme.cardBg} ${theme.accent} flex flex-col justify-between gap-4`}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase font-mono inline-flex items-center gap-1.5 ${theme.badgeBg}`}>
                                                    <Medal className="w-3.5 h-3.5" />
                                                    #{entry.rank_position} &bull; {theme.label}
                                                </span>
                                                {isMe && (
                                                    <span className="px-2.5 py-0.5 rounded-full bg-[#0f766e] text-white text-[10px] font-bold uppercase font-mono">
                                                        You
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3.5 min-w-0">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
                                                    {entry.avatar_url ? (
                                                        <img src={entry.avatar_url} alt={entry.full_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-base font-black text-slate-500">
                                                            {(entry.full_name || 'M').charAt(0)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-sm font-black text-slate-900 uppercase truncate mb-0">
                                                        {entry.full_name}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                        <CountryFlag
                                                            code={cInfo.code}
                                                            flag={cInfo.flag}
                                                            country={cInfo.country}
                                                            className="w-4 h-3"
                                                        />
                                                        <span className="text-[11px] font-semibold text-slate-600 truncate">
                                                            {cInfo.country}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-slate-400">
                                                            {entry.member_id}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 mt-1.5">
                                                        <img src={tierDetails.badge_image} alt={entry.rank_tier} className="w-4 h-4 object-contain" />
                                                        <span className="text-[10px] font-mono font-bold uppercase text-[#0f766e]">
                                                            {entry.rank_tier}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                                                <div className="p-2 rounded-xl bg-slate-50">
                                                    <div className="text-[10px] uppercase font-bold text-slate-400">Trainings</div>
                                                    <div className="text-xs font-black font-mono text-[#0f766e] mt-0.5">
                                                        {entry.training_completed}/{entry.training_total}
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-xl bg-slate-50">
                                                    <div className="text-[10px] uppercase font-bold text-slate-400">Reqs</div>
                                                    <div className="text-xs font-black font-mono text-amber-700 mt-0.5">
                                                        {entry.requirements_pct}%
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-xl bg-teal-50/70">
                                                    <div className="text-[10px] uppercase font-bold text-[#0f766e]">Score</div>
                                                    <div className="text-xs font-black font-mono text-slate-900 mt-0.5">
                                                        {entry.score}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Full Standings Table */}
                        <div className="rounded-3xl bg-white overflow-hidden">
                            <div className="p-5 sm:p-6 flex items-center justify-between gap-3 flex-wrap">
                                <div className="flex items-center gap-2">
                                    {isTierView && activeTierDetails ? (
                                        <img src={activeTierDetails.badge_image} alt="" className="w-6 h-6 object-contain" />
                                    ) : (
                                        <Sparkles className="w-4 h-4 text-[#0f766e]" />
                                    )}
                                    <h3 className="text-sm font-black text-slate-900 uppercase font-mono mb-0">
                                        {isTierView
                                            ? `${activeTierDetails?.name} Tier — Top ${currentRows.length}`
                                            : `Top ${currentRows.length} Performers`}
                                    </h3>
                                </div>
                                <span className="text-[11px] font-mono text-slate-400">
                                    Updated in real time
                                </span>
                            </div>

                            {currentRows.length === 0 ? (
                                <div className="p-12 text-center space-y-3">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                                        <Trophy className="w-7 h-7" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 mb-0">
                                        {isTierView ? `No ${activeTierDetails?.name} Members Ranked Yet` : 'No Leaderboard Entries Yet'}
                                    </p>
                                    <p className="text-xs text-slate-500 max-w-md mx-auto mb-0">
                                        Approved members with verified trainings and rank requirements will appear here automatically.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[640px]">
                                        <thead>
                                            <tr className="bg-slate-50/90 text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                                                <th className="py-3.5 px-5 font-bold">Rank</th>
                                                <th className="py-3.5 px-4 font-bold">Member</th>
                                                <th className="py-3.5 px-4 font-bold">Tier</th>
                                                <th className="py-3.5 px-4 font-bold">Trainings</th>
                                                <th className="py-3.5 px-4 font-bold">Requirements</th>
                                                <th className="py-3.5 px-5 font-bold text-right">Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRows.map((row) => {
                                                const isMe = row.id === member.id;
                                                const cInfo = row.country_info || getCountryInfo('+63');
                                                const tierDetails = getTierDetails(row.rank_tier);

                                                return (
                                                    <tr
                                                        key={row.id}
                                                        className={`transition-colors ${
                                                            isMe
                                                                ? 'bg-teal-50/60'
                                                                : 'hover:bg-slate-50/80'
                                                        }`}
                                                    >
                                                        <td className="py-3.5 px-5">
                                                            <span
                                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black font-mono ${
                                                                    row.rank_position === 1
                                                                        ? 'bg-amber-100 text-amber-800'
                                                                        : row.rank_position === 2
                                                                            ? 'bg-slate-200 text-slate-700'
                                                                            : row.rank_position === 3
                                                                                ? 'bg-orange-100 text-orange-800'
                                                                                : 'bg-slate-100 text-slate-600'
                                                                }`}
                                                            >
                                                                #{row.rank_position}
                                                            </span>
                                                        </td>
                                                        <td className="py-3.5 px-4">
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
                                                                    {row.avatar_url ? (
                                                                        <img src={row.avatar_url} alt={row.full_name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <span className="text-xs font-black text-slate-500">
                                                                            {(row.full_name || 'M').charAt(0)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                                        <span className="text-xs font-extrabold text-slate-900 uppercase truncate">
                                                                            {row.full_name}
                                                                        </span>
                                                                        {isMe && (
                                                                            <span className="px-2 py-0.5 rounded-full bg-[#0f766e] text-white text-[9px] font-bold uppercase font-mono">
                                                                                You
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                                        <CountryFlag
                                                                            code={cInfo.code}
                                                                            flag={cInfo.flag}
                                                                            country={cInfo.country}
                                                                            className="w-3.5 h-2.5"
                                                                        />
                                                                        <span className="text-[11px] text-slate-500">{cInfo.country}</span>
                                                                        <span className="text-[10px] font-mono text-slate-400">&bull; {row.member_id}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3.5 px-4">
                                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50">
                                                                <img src={tierDetails.badge_image} alt={row.rank_tier} className="w-5 h-5 object-contain" />
                                                                <span className="text-[11px] font-mono font-bold uppercase text-slate-700">
                                                                    {row.rank_tier}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3.5 px-4">
                                                            <div className="text-xs font-mono font-bold text-slate-800">
                                                                {row.training_completed}/{row.training_total}
                                                                <span className="text-slate-400 font-normal ml-1.5">({row.training_pct}%)</span>
                                                            </div>
                                                            <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                                                                <div
                                                                    className="h-full rounded-full bg-[#0f766e]"
                                                                    style={{ width: `${row.training_pct}%` }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="py-3.5 px-4">
                                                            <div className="text-xs font-mono font-bold text-slate-800">
                                                                {row.requirements_completed}/{row.requirements_total}
                                                                <span className="text-slate-400 font-normal ml-1.5">({row.requirements_pct}%)</span>
                                                            </div>
                                                            <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                                                                <div
                                                                    className="h-full rounded-full bg-amber-500"
                                                                    style={{ width: `${row.requirements_pct}%` }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="py-3.5 px-5 text-right">
                                                            <div className="inline-flex flex-col items-end">
                                                                <span className="inline-flex items-center px-3 py-1 rounded-xl bg-teal-50 text-[#0f766e] text-xs font-black font-mono">
                                                                    {row.score} pts
                                                                </span>
                                                                {row.previous_tiers_points > 0 && (
                                                                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                                                                        {row.previous_tiers_points} carried + {row.current_tier_points} tier
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </AcademyLayout>
    );
}
