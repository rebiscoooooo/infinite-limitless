import React from 'react';
import { Link } from '@inertiajs/react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import { getTierDetails } from '../../Utils/academyBadges';
import { Award, CheckCircle2, Download, BookOpen, Calendar, Hash } from 'lucide-react';

export default function Certificates({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    certificates = [],
}) {
    const rankTier = member.rank_tier || 'Rookie';

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Certificates"
            headTitle={`Certificates - ${member.full_name} | Legacy Club Academy`}
        >
            {({ t }) => (
                <div className="space-y-6">
                    {/* Header Card */}
                    <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                                Official Academy Credentials
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                {t('certificates')} ({certificates.length})
                            </h2>
                            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed mb-0">
                                Download your official Legacy Club Academy Training Completion certificates. When an Administrator uploads a customized certificate for you, it appears here instantly.
                            </p>
                        </div>
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 shrink-0">
                            Current Tier: {rankTier}
                        </span>
                    </div>

                    {certificates.length === 0 ? (
                        <div className="p-10 sm:p-14 rounded-3xl bg-white text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#0f766e] flex items-center justify-center mx-auto">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-base font-black text-slate-900 uppercase font-mono mb-0">
                                No Certificates Conferred Yet
                            </h3>
                            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-0">
                                Complete all sequential training modules for your <strong>{rankTier}</strong> tier and receive administrative approval to earn your official certificate.
                            </p>
                            <div className="pt-1">
                                <Link
                                    href="/academy-portal/trainings"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider no-underline"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>Go to Sequential Trainings</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {certificates.map((cert) => {
                                const certTier = getTierDetails(cert.rank_tier);
                                return (
                                    <div key={cert.id} className="rounded-3xl bg-white p-6 flex flex-col justify-between gap-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 p-2">
                                                <img src={certTier.badge_image} alt={cert.rank_tier} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="min-w-0 flex-1 space-y-1.5">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0f766e] text-[10px] font-mono font-bold uppercase">
                                                        {cert.rank_tier} Tier
                                                    </span>
                                                    {cert.is_custom && (
                                                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-mono font-bold uppercase">
                                                            ★ Official Admin Edition
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="text-sm sm:text-base font-black text-slate-900 mb-0">
                                                    Certificate of Training Completion
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-500 pt-1">
                                                    <span className="inline-flex items-center gap-1 break-all">
                                                        <Hash className="w-3 h-3 text-slate-400 shrink-0" />
                                                        <strong className="text-slate-800">{cert.certificate_number}</strong>
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                                        {cert.issued_at}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100 w-full" />

                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1.5">
                                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                Verified &amp; Recorded
                                            </span>
                                            <a
                                                href={cert.download_url}
                                                className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider no-underline inline-flex items-center gap-1.5 shrink-0 shadow-sm"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>{t('download_certificate')}</span>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </AcademyLayout>
    );
}
