import React, { useState, useEffect, useMemo } from 'react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import { Bell, Search, Sparkles, Award, Calendar, X, ArrowRight, RotateCcw } from 'lucide-react';

const TYPE_META = {
    announcement: { label: 'Announcement', pill: 'bg-teal-50 text-[#0f766e]' },
    weekly_achiever: { label: 'Weekly Achiever', pill: 'bg-amber-50 text-amber-800' },
    training_finisher: { label: 'Training Finisher', pill: 'bg-emerald-50 text-emerald-800' },
    recognition: { label: 'Recognition', pill: 'bg-purple-50 text-purple-800' },
};

export default function Announcements({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    announcements = [],
}) {
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    // Close modal on Escape key
    useEffect(() => {
        if (!selectedAnnouncement) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedAnnouncement(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedAnnouncement]);

    const filteredAnnouncements = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return announcements.filter((item) => {
            const matchesType = typeFilter === 'all' || (item.type || 'announcement') === typeFilter;
            const matchesSearch =
                !q ||
                (item.title || '').toLowerCase().includes(q) ||
                (item.content || '').toLowerCase().includes(q) ||
                (item.badge_text || '').toLowerCase().includes(q) ||
                (item.featured_member?.full_name || '').toLowerCase().includes(q);
            return matchesType && matchesSearch;
        });
    }, [announcements, typeFilter, searchQuery]);

    const filterButtons = [
        { key: 'all', label: `All (${announcements.length})` },
        { key: 'announcement', label: 'Announcements' },
        { key: 'weekly_achiever', label: 'Weekly Achievers' },
        { key: 'training_finisher', label: 'Training Finishers' },
        { key: 'recognition', label: 'Recognitions' },
    ];

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Announcements & Recognitions"
            headTitle={`Announcements - ${member.full_name} | Legacy Club Academy`}
        >
            {({ t }) => (
                <div className="space-y-6">
                    {/* Header + Filters Card */}
                    <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-mono inline-flex items-center gap-1.5">
                                    <Bell className="w-3.5 h-3.5" />
                                    Official Academy Bulletin
                                </span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                    {t('announcements')}
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed mb-0">
                                    Stay updated with official executive announcements, weekly top achievers, training graduation spotlights, and member recognitions.
                                </p>
                            </div>
                            <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold shrink-0">
                                {announcements.length} Active {announcements.length === 1 ? 'Post' : 'Posts'}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
                            {/* Type Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {filterButtons.map((btn) => {
                                    const active = typeFilter === btn.key;
                                    return (
                                        <button
                                            key={btn.key}
                                            type="button"
                                            onClick={() => setTypeFilter(btn.key)}
                                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                active
                                                    ? 'bg-[#0f766e] text-white shadow-sm'
                                                    : 'bg-slate-100/90 text-slate-600 hover:bg-teal-50 hover:text-[#0f766e]'
                                            }`}
                                        >
                                            {btn.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Search Box */}
                            <div className="relative w-full md:w-64 shrink-0">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search posts or members..."
                                    className="w-full bg-slate-50 rounded-xl pl-10 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Clear search"
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 bg-transparent cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {filteredAnnouncements.length === 0 ? (
                        <div className="rounded-3xl bg-white p-10 sm:p-14 text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                                <Bell className="w-8 h-8" />
                            </div>
                            <h3 className="text-base font-black text-slate-900 uppercase font-mono mb-0">
                                {announcements.length === 0 ? 'No Announcements Posted Yet' : 'No Matching Announcements'}
                            </h3>
                            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-0">
                                {announcements.length === 0
                                    ? 'Official updates and member recognitions published by the Executive Board will appear here automatically.'
                                    : 'Try clearing your search term or switching back to all announcement categories.'}
                            </p>
                            {(typeFilter !== 'all' || searchQuery) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTypeFilter('all');
                                        setSearchQuery('');
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-[#0f766e] text-xs font-bold cursor-pointer"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Reset Filters</span>
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filteredAnnouncements.map((item) => {
                                const meta = TYPE_META[item.type] || TYPE_META.announcement;
                                return (
                                    <article
                                        key={item.id}
                                        className="rounded-3xl bg-white overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                                    >
                                        <div>
                                            {item.image_url && (
                                                <div className="w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div className="p-5 sm:p-6 space-y-3">
                                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${meta.pill}`}>
                                                            {meta.label}
                                                        </span>
                                                        {item.badge_text && (
                                                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1">
                                                                <Sparkles className="w-3 h-3" />
                                                                {item.badge_text}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] font-mono text-slate-400 inline-flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {item.created_at}
                                                    </span>
                                                </div>

                                                <h3 className="text-base font-black text-slate-900 leading-snug mb-0">
                                                    {item.title}
                                                </h3>

                                                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 whitespace-pre-line mb-0">
                                                    {item.content}
                                                </p>

                                                {item.featured_member && (
                                                    <div className="p-3 rounded-2xl bg-slate-50 flex items-center gap-3 mt-2">
                                                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-xs">
                                                            {item.featured_member.avatar_url ? (
                                                                <img
                                                                    src={item.featured_member.avatar_url}
                                                                    alt={item.featured_member.full_name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <Award className="w-5 h-5 text-amber-600" />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700 font-mono">
                                                                Featured Honoree
                                                            </div>
                                                            <div className="text-xs font-black text-slate-900 uppercase truncate">
                                                                {item.featured_member.full_name}
                                                            </div>
                                                            <div className="text-[10px] font-mono text-[#0f766e] font-bold uppercase">
                                                                {item.featured_member.rank_tier} Tier
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="px-5 sm:px-6 pb-5 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedAnnouncement(item)}
                                                className="w-full py-2.5 px-4 rounded-xl bg-slate-100/90 hover:bg-teal-50 text-slate-700 hover:text-[#0f766e] text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                            >
                                                <span>{t('view_details')}</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {/* Announcement Full Detail Modal */}
                    {selectedAnnouncement && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs"
                            onClick={() => setSelectedAnnouncement(null)}
                        >
                            <div
                                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-slate-50 shrink-0">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${(TYPE_META[selectedAnnouncement.type] || TYPE_META.announcement).pill}`}>
                                                {(TYPE_META[selectedAnnouncement.type] || TYPE_META.announcement).label}
                                            </span>
                                            {selectedAnnouncement.badge_text && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase">
                                                    {selectedAnnouncement.badge_text}
                                                </span>
                                            )}
                                            <span className="text-[11px] font-mono text-slate-400">
                                                {selectedAnnouncement.created_at}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 mb-0 leading-snug">
                                            {selectedAnnouncement.title}
                                        </h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedAnnouncement(null)}
                                        aria-label="Close announcement details"
                                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 bg-transparent cursor-pointer shrink-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                                    {selectedAnnouncement.image_url && (
                                        <div className="rounded-2xl overflow-hidden bg-slate-100">
                                            <img
                                                src={selectedAnnouncement.image_url}
                                                alt={selectedAnnouncement.title}
                                                className="w-full h-auto max-h-80 object-cover"
                                            />
                                        </div>
                                    )}

                                    {selectedAnnouncement.featured_member && (
                                        <div className="p-4 rounded-2xl bg-amber-50/70 flex items-center gap-3.5">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-xs">
                                                {selectedAnnouncement.featured_member.avatar_url ? (
                                                    <img
                                                        src={selectedAnnouncement.featured_member.avatar_url}
                                                        alt={selectedAnnouncement.featured_member.full_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Award className="w-6 h-6 text-amber-600" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700 font-mono">
                                                    Spotlight Recognition
                                                </div>
                                                <div className="text-sm font-black text-slate-900 uppercase truncate">
                                                    {selectedAnnouncement.featured_member.full_name}
                                                </div>
                                                <div className="text-[11px] font-mono text-[#0f766e] font-bold uppercase">
                                                    {selectedAnnouncement.featured_member.rank_tier} Tier
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed break-words mb-0">
                                        {selectedAnnouncement.content}
                                    </p>
                                </div>

                                <div className="p-4 sm:px-6 bg-slate-50 flex items-center justify-end shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedAnnouncement(null)}
                                        className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                                    >
                                        {t('close')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AcademyLayout>
    );
}
