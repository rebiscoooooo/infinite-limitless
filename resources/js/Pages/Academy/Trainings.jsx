import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AcademyLayout from '../../Layouts/AcademyLayout';
import {
    BookOpen,
    CheckCircle2,
    Clock,
    AlertCircle,
    Award,
    Download,
    Send,
    X,
    ExternalLink,
    Lock,
} from 'lucide-react';

const getVideoEmbedInfo = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== 'string') return null;
    const url = rawUrl.trim();
    if (!url) return null;

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
        return { type: 'video', src: url };
    }
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) {
        return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0` };
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
        return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
    }
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
        return { type: 'iframe', src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
    }
    return { type: 'iframe', src: url };
};

export default function Trainings({
    member,
    portalCounts = {},
    latestAnnouncement = null,
    sequentialTrainings = [],
    certificates = [],
}) {
    const rankTier = member.rank_tier || 'Rookie';
    const trainingStats = member.training_stats || {
        completed: 0,
        total: sequentialTrainings.length || 0,
        pending: 0,
        percentage: 0,
    };

    const [selectedTraining, setSelectedTraining] = useState(null);
    const reflectionForm = useForm({ reflection_submission: '' });

    const openTrainingModal = (training) => {
        if (!training.is_unlocked) return;
        reflectionForm.clearErrors();
        setSelectedTraining(training);
        reflectionForm.setData('reflection_submission', training.reflection_submission || '');
    };

    // Sync open modal live when Admin approves/rejects in real time
    useEffect(() => {
        if (!selectedTraining) return;
        const fresh = sequentialTrainings.find((item) => item.id === selectedTraining.id);
        if (fresh) setSelectedTraining(fresh);
    }, [sequentialTrainings]);

    // Close modal on Escape
    useEffect(() => {
        if (!selectedTraining) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {
            if (e.key === 'Escape' && !reflectionForm.processing) setSelectedTraining(null);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [selectedTraining, reflectionForm.processing]);

    const handleReflectionSubmit = (e) => {
        e.preventDefault();
        if (!selectedTraining) return;
        reflectionForm.post(`/academy-portal/trainings/${selectedTraining.id}/reflect`, {
            preserveScroll: true,
            onSuccess: () => setSelectedTraining(null),
        });
    };

    return (
        <AcademyLayout
            member={member}
            portalCounts={portalCounts}
            latestAnnouncement={latestAnnouncement}
            pageTitle="Sequential Trainings"
            headTitle={`Sequential Trainings - ${rankTier} | Legacy Club Academy`}
        >
            {({ lang, t }) => {
                const videoEmbed = selectedTraining ? getVideoEmbedInfo(selectedTraining.video_url) : null;
                const reflectionLen = (reflectionForm.data.reflection_submission || '').trim().length;

                return (
                    <div className="space-y-6">
                        {/* Focused Page Header + Progress Summary */}
                        <div className="rounded-3xl bg-white p-6 sm:p-8 space-y-5">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                        Curriculum &bull; {rankTier} Level
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-mono mt-0.5 mb-0">
                                        {t('trainings')}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed mb-0">
                                        Trainings follow an automated sequential unlocking mechanism. Complete each module and submit your reflection; once approved by Admin, the next module unlocks automatically in real time.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-50 text-[#0f766e]">
                                        {trainingStats.completed}/{trainingStats.total} {t('completed')}
                                    </span>
                                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-black bg-slate-100 text-slate-900">
                                        {trainingStats.percentage}%
                                    </span>
                                </div>
                            </div>

                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-teal-600 to-[#14b8a6] transition-all duration-500 rounded-full"
                                    style={{ width: `${trainingStats.percentage}%` }}
                                />
                            </div>

                            {(trainingStats.percentage === 100 || certificates.length > 0) && (
                                <div className="p-4 rounded-2xl bg-teal-50/80 text-teal-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Award className="w-6 h-6 text-[#0f766e] shrink-0" />
                                        <div className="min-w-0">
                                            <div className="font-black text-xs uppercase">Training Completion Certificate Ready</div>
                                            <div className="text-[11px] text-teal-800">
                                                {certificates[0]?.is_custom
                                                    ? 'Your official edited certificate from the Academy Admin is ready to download.'
                                                    : 'All required training modules for your tier are complete.'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href="/academy-portal/certificates"
                                            className="px-3.5 py-2 rounded-xl bg-white text-[#0f766e] hover:bg-teal-100 text-xs font-bold uppercase tracking-wider no-underline"
                                        >
                                            View Certificates
                                        </Link>
                                        {certificates.length > 0 && (
                                            <a
                                                href={certificates[0].download_url}
                                                className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider no-underline inline-flex items-center gap-1.5"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>Download</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sequential Training Module List */}
                        <div className="space-y-4">
                            {sequentialTrainings.length === 0 ? (
                                <div className="p-12 rounded-3xl bg-white text-center space-y-2">
                                    <BookOpen className="w-9 h-9 text-slate-300 mx-auto" />
                                    <div className="text-sm font-bold text-slate-700">No training modules published yet</div>
                                    <p className="text-xs text-slate-500 max-w-md mx-auto mb-0">
                                        Your Academy Administrator will publish training modules for your {rankTier} tier soon.
                                    </p>
                                </div>
                            ) : (
                                sequentialTrainings.map((tItem) => (
                                    <div
                                        key={tItem.id}
                                        className={`rounded-3xl p-5 sm:p-6 transition-all ${
                                            !tItem.is_unlocked ? 'bg-slate-100/80 opacity-75' : 'bg-white'
                                        }`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4 min-w-0">
                                                <div
                                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-base shrink-0 ${
                                                        !tItem.is_unlocked
                                                            ? 'bg-slate-200 text-slate-400'
                                                            : tItem.status === 'approved'
                                                                ? 'bg-emerald-100 text-emerald-800'
                                                                : 'bg-teal-50 text-[#0f766e]'
                                                    }`}
                                                >
                                                    #{tItem.order}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="text-sm sm:text-base font-black text-slate-900 mb-0">
                                                            {lang === 'tl' ? tItem.title_tl : tItem.title_en}
                                                        </h4>
                                                        <span className="text-[10px] text-slate-400 font-mono">
                                                            ({tItem.duration_minutes} mins)
                                                        </span>
                                                    </div>

                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed mb-0">
                                                        {lang === 'tl' ? tItem.description_tl : tItem.description_en}
                                                    </p>

                                                    <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                                                        {!tItem.is_unlocked && (
                                                            <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold inline-flex items-center gap-1">
                                                                <Lock className="w-3 h-3" /> Locked (Complete Previous Module First)
                                                            </span>
                                                        )}
                                                        {tItem.status === 'approved' && (
                                                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1">
                                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Approved by Admin
                                                            </span>
                                                        )}
                                                        {tItem.status === 'submitted' && (
                                                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold inline-flex items-center gap-1">
                                                                <Clock className="w-3 h-3 text-amber-600" /> Reflection Under Review
                                                            </span>
                                                        )}
                                                        {tItem.status === 'rejected' && (
                                                            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px] font-bold inline-flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3 text-rose-600" /> Revision Requested
                                                            </span>
                                                        )}
                                                    </div>

                                                    {tItem.admin_feedback && (
                                                        <div className="mt-3 p-3 rounded-2xl bg-slate-50 text-[11px] text-slate-700">
                                                            <span className="font-bold text-slate-900 block font-mono text-[10px] uppercase">
                                                                {t('admin_feedback')}:
                                                            </span>
                                                            <span className="italic">{tItem.admin_feedback}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="shrink-0 flex items-center justify-end">
                                                {tItem.is_unlocked && (
                                                    <button
                                                        type="button"
                                                        onClick={() => openTrainingModal(tItem)}
                                                        className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                                                            tItem.status === 'approved'
                                                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                                                : 'bg-[#0f766e] hover:bg-[#115e59] text-white shadow-sm'
                                                        }`}
                                                    >
                                                        <BookOpen className="w-3.5 h-3.5" />
                                                        <span>{tItem.status === 'approved' ? 'Review Content' : 'Study & Reflect'}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* TRAINING STUDY & REFLECTION MODAL */}
                        {selectedTraining && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs"
                                onClick={() => { if (!reflectionForm.processing) setSelectedTraining(null); }}
                            >
                                <div
                                    className="bg-white rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-teal-50/70 shrink-0">
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                                Module #{selectedTraining.order} &bull; {rankTier} Curriculum
                                            </span>
                                            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 truncate mb-0">
                                                <BookOpen className="w-5 h-5 text-[#0f766e] shrink-0" />
                                                <span className="truncate">{lang === 'tl' ? selectedTraining.title_tl : selectedTraining.title_en}</span>
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedTraining(null)}
                                            aria-label="Close training modal"
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/70 bg-transparent cursor-pointer shrink-0"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
                                        {videoEmbed && (
                                            <div className="space-y-2">
                                                <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-sm">
                                                    {videoEmbed.type === 'video' ? (
                                                        <video src={videoEmbed.src} controls playsInline className="w-full h-full object-contain" />
                                                    ) : (
                                                        <iframe
                                                            src={videoEmbed.src}
                                                            className="w-full h-full border-0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            title={selectedTraining.title_en}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex justify-end">
                                                    <a
                                                        href={selectedTraining.video_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f766e] hover:text-[#115e59]"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        <span>Open video in new tab</span>
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {selectedTraining.status === 'approved' && (
                                            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-start gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-bold">Module Verified &amp; Approved</div>
                                                    <div className="text-[11px] mt-0.5 text-emerald-700">{selectedTraining.admin_feedback || 'Your reflection has been verified and approved by the Executive Admin.'}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selectedTraining.status === 'rejected' && (
                                            <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-800 text-xs flex items-start gap-2.5">
                                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-bold">Revision Requested</div>
                                                    <div className="text-[11px] mt-0.5 text-rose-700">{selectedTraining.admin_feedback || 'Please review the material and expand on your reflection.'}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selectedTraining.status === 'submitted' && (
                                            <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 text-xs flex items-start gap-2.5">
                                                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-bold">Reflection Submitted &amp; Pending Admin Review</div>
                                                    <div className="text-[11px] mt-0.5 text-amber-700">Your realizations have been received. Next module unlocks automatically upon approval.</div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl whitespace-pre-line leading-relaxed text-slate-800 font-sans break-words">
                                            {lang === 'tl' ? selectedTraining.content_tl : selectedTraining.content_en}
                                        </div>

                                        <form onSubmit={handleReflectionSubmit} className="space-y-4 pt-2">
                                            <div className="h-px bg-slate-100 w-full" />
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                                                        Mandatory Reflection Submission <span className="text-rose-500">*</span>
                                                    </label>
                                                    <span className={`text-[10px] font-mono font-bold ${reflectionLen >= 20 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                        {reflectionLen}/20 min chars
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 mb-2">
                                                    {lang === 'tl' ? selectedTraining.reflection_prompt_tl : selectedTraining.reflection_prompt_en}
                                                </p>
                                                <textarea
                                                    rows="4"
                                                    value={reflectionForm.data.reflection_submission}
                                                    onChange={(e) => reflectionForm.setData('reflection_submission', e.target.value)}
                                                    placeholder="Write your key realizations, action plans, and commitments here (minimum 20 characters)..."
                                                    className="w-full bg-white rounded-xl p-3 text-sm sm:text-xs text-slate-900 outline-none"
                                                    disabled={selectedTraining.status === 'approved'}
                                                    required
                                                />
                                                {reflectionForm.errors.reflection_submission && (
                                                    <p className="text-xs text-rose-600 mt-1 font-semibold">{reflectionForm.errors.reflection_submission}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedTraining(null)}
                                                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                                                >
                                                    {t('close')}
                                                </button>

                                                {selectedTraining.status !== 'approved' && (
                                                    <button
                                                        type="submit"
                                                        disabled={reflectionForm.processing}
                                                        className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        <Send className="w-3.5 h-3.5" />
                                                        <span>{reflectionForm.processing ? 'Submitting...' : t('submit_for_approval')}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }}
        </AcademyLayout>
    );
}
