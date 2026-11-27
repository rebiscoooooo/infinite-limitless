import React from 'react';
import { ScrollText } from 'lucide-react';
import { getCommandments } from '../Utils/academyCommandments';
import { getRankTheme } from '../Utils/academyLang';
import { getTierDetails } from '../Utils/academyBadges';

/**
 * Rank-themed commandments card (bilingual, database-driven with fallback).
 * Used on the member profile and the 5-Tier Rank Matrix page.
 */
export default function CommandmentsPanel({ tier = 'Rookie', lang = 'en', isCurrent = false, items = [] }) {
    const theme = getRankTheme(tier);
    const details = getTierDetails(tier);
    const meta = getCommandments(tier);
    const isTl = lang === 'tl';

    // Strictly display only commandments entered by Admin
    const list = Array.isArray(items) ? items : [];

    return (
        <div className="rounded-3xl bg-white overflow-hidden">
            {/* Rank-colored header with blended badge */}
            <div className={`bg-gradient-to-r ${theme.heroGradient} px-5 py-5 sm:px-8 sm:py-6 text-white relative overflow-hidden`}>
                <div className="absolute -right-10 -top-12 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute right-16 -bottom-14 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                <img
                    src={details.badge_image}
                    alt={details.name}
                    className="absolute -right-3 -bottom-3 sm:right-2 sm:-bottom-6 md:right-4 md:-bottom-8 w-24 sm:w-32 md:w-36 h-auto object-contain opacity-20 sm:opacity-25 md:opacity-30 pointer-events-none select-none"
                    style={{
                        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0) 100%)',
                    }}
                />
                <div className="relative z-10 flex items-center gap-3.5 min-w-0 sm:pr-24">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <ScrollText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/80">
                            {isTl ? 'Mga Utos ng Antas' : 'Commandments of the Tier'} &bull; {details.name}
                            {isCurrent ? (isTl ? ' • IYONG ANTAS' : ' • YOUR TIER') : ''}
                        </div>
                        <h3 className="text-lg sm:text-xl font-black leading-tight mt-0.5 mb-0 break-words">
                            {isTl ? meta.heading_tl : meta.heading_en}
                        </h3>
                        <p className="text-xs text-white/85 mt-1 mb-0 italic">
                            &ldquo;{isTl ? meta.tagline_tl : meta.tagline_en}&rdquo;
                        </p>
                    </div>
                </div>
            </div>

            {/* Numbered commandments */}
            <div className={`bg-gradient-to-b ${theme.softGradient} p-4 sm:p-6`}>
                {list.length === 0 ? (
                    <div className="rounded-2xl bg-white/85 p-6 text-center space-y-1.5">
                        <div className="text-sm font-bold text-slate-700">
                            {isTl ? 'Wala pang nakatakdang utos para sa antas na ito.' : 'No commandments assigned for this tier yet.'}
                        </div>
                        <p className="text-xs text-slate-500 mb-0">
                            {isTl
                                ? 'Kapag nagdagdag ang Admin ng mga utos para sa antas na ito, awtomatiko itong lalabas dito.'
                                : 'Commandments published by the Academy Administration for this tier will appear here automatically.'}
                        </p>
                    </div>
                ) : (
                    <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 list-none p-0 m-0">
                        {list.map((item, idx) => {
                            const title = isTl
                                ? (item.title_tl || item.title_en)
                                : (item.title_en || item.title_tl);
                            const body = isTl
                                ? (item.text_tl || item.description_tl || item.text_en || item.description_en || '')
                                : (item.text_en || item.description_en || item.text_tl || item.description_tl || '');

                            return (
                                <li
                                    key={item.id ?? idx}
                                    className={`flex items-start gap-3.5 rounded-2xl bg-white/90 p-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)] ${
                                        idx === list.length - 1 && list.length % 2 === 1 ? 'md:col-span-2' : ''
                                    }`}
                                >
                                    <span
                                        className={`w-9 h-9 rounded-xl ${theme.solid} text-white flex items-center justify-center font-mono font-black text-sm shrink-0 shadow-sm`}
                                    >
                                        {idx + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-sm font-black text-slate-900 leading-snug break-words">
                                            {title}
                                        </div>
                                        {body && (
                                            <p className="text-xs text-slate-600 leading-relaxed mt-1 mb-0 break-words whitespace-pre-line">
                                                {body}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </div>
    );
}
