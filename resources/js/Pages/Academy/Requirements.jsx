import React from 'react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import { CheckSquare, CheckCircle2, Clock } from 'lucide-react';

export default function Requirements({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    currentRankRequirements = [],
}) {
    const rankTier = member.rank_tier || 'Rookie';
    const reqStats = member.requirements_stats || {
        completed: 0,
        total: currentRankRequirements.length || 0,
        remaining: currentRankRequirements.length || 0,
        percentage: 0,
        items: currentRankRequirements,
    };

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Rank Requirements"
            headTitle={`Rank Requirements - ${rankTier} | Legacy Club Academy`}
        >
            {({ lang, t }) => (
                <div className="space-y-6">
                    {/* Summary Header Card */}
                    <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono">
                                    Criteria Scoped Strictly to Your Current Rank
                                </span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                    {rankTier} Requirements Matrix
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed mb-0">
                                    The requirements below apply solely to your current rank of <strong>{rankTier}</strong>. Administrators update and verify your progress directly — updates reflect here automatically in real time.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800">
                                    {reqStats.completed}/{reqStats.total} Verified
                                </span>
                                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-black bg-slate-100 text-slate-900">
                                    {reqStats.percentage}%
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center sm:text-left">
                            <div className="p-3.5 rounded-2xl bg-slate-50/90">
                                <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Criteria</div>
                                <div className="text-xl font-black font-mono text-slate-900 mt-0.5">{reqStats.total}</div>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-emerald-50/70">
                                <div className="text-[10px] uppercase font-bold text-emerald-700 font-mono">Completed</div>
                                <div className="text-xl font-black font-mono text-emerald-700 mt-0.5">{reqStats.completed}</div>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-amber-50/70">
                                <div className="text-[10px] uppercase font-bold text-amber-700 font-mono">Remaining</div>
                                <div className="text-xl font-black font-mono text-amber-700 mt-0.5">{reqStats.remaining}</div>
                            </div>
                        </div>

                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
                                style={{ width: `${reqStats.percentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Requirements Checklist */}
                    <div className="space-y-4">
                        {reqStats.items.length === 0 ? (
                            <div className="p-12 rounded-3xl bg-white text-center space-y-2">
                                <CheckSquare className="w-9 h-9 text-slate-300 mx-auto" />
                                <div className="text-sm font-bold text-slate-700">No active requirements for {rankTier}</div>
                                <p className="text-xs text-slate-500 mb-0">Check back later or contact your Academy Administrator.</p>
                            </div>
                        ) : (
                            reqStats.items.map((req) => (
                                <div key={req.id} className="p-5 sm:p-6 rounded-3xl bg-white space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1.5 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono font-bold text-slate-600">
                                                    {req.code}
                                                </span>
                                                <h4 className="text-sm sm:text-base font-black text-slate-900 mb-0">
                                                    {lang === 'tl' ? req.title_tl : req.title_en}
                                                </h4>
                                            </div>

                                            <p className="text-xs text-slate-500 leading-relaxed mb-0">
                                                {lang === 'tl' ? req.description_tl : req.description_en}
                                            </p>

                                            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono font-bold">
                                                <span className="text-[#0f766e]">
                                                    Current: {req.current_value} / {req.target_value} {req.unit}
                                                </span>
                                                <span className="text-slate-300">&bull;</span>
                                                <span className={req.remaining > 0 ? 'text-amber-700' : 'text-emerald-700'}>
                                                    {req.remaining > 0 ? `${req.remaining} ${t('remaining')}` : 'Fulfillment Complete'}
                                                </span>
                                            </div>

                                            {req.admin_notes && (
                                                <div className="mt-2 p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 italic">
                                                    Admin note: {req.admin_notes}
                                                </div>
                                            )}
                                        </div>

                                        <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                                            {req.is_verified ? (
                                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold font-mono inline-flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold font-mono inline-flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                    Pending Verification
                                                </span>
                                            )}
                                            <span className="text-xs font-mono font-bold text-slate-500">
                                                {req.percentage}% Fulfilled
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 rounded-full ${
                                                req.is_completed ? 'bg-emerald-500' : 'bg-amber-500'
                                            }`}
                                            style={{ width: `${req.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </AcademyLayout>
    );
}
