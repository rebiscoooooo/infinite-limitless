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
    Paperclip,
    FileText,
    FileSpreadsheet,
    Image as ImageIcon,
    File as FileIcon,
    Eye,
} from 'lucide-react';

const getAttachmentMeta = (ext = '') => {
    const clean = String(ext).toLowerCase();
    if (clean === 'pdf') return { badge: 'bg-rose-50 text-rose-700', tile: 'bg-rose-50 text-rose-600', icon: FileText, label: 'PDF' };
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(clean)) return { badge: 'bg-sky-50 text-sky-700', tile: 'bg-sky-50 text-sky-600', icon: ImageIcon, label: clean.toUpperCase() };
    if (['doc', 'docx', 'rtf', 'odt', 'txt'].includes(clean)) return { badge: 'bg-blue-50 text-blue-700', tile: 'bg-blue-50 text-blue-600', icon: FileText, label: clean.toUpperCase() };
    if (['xls', 'xlsx', 'csv', 'ods'].includes(clean)) return { badge: 'bg-emerald-50 text-emerald-700', tile: 'bg-emerald-50 text-emerald-600', icon: FileSpreadsheet, label: clean.toUpperCase() };
    if (['ppt', 'pptx', 'odp'].includes(clean)) return { badge: 'bg-amber-50 text-amber-700', tile: 'bg-amber-50 text-amber-600', icon: FileText, label: clean.toUpperCase() };
    if (clean === 'zip') return { badge: 'bg-violet-50 text-violet-700', tile: 'bg-violet-50 text-violet-600', icon: FileIcon, label: 'ZIP' };
    return { badge: 'bg-slate-100 text-slate-600', tile: 'bg-slate-100 text-slate-500', icon: FileIcon, label: (clean || 'FILE').toUpperCase() };
};

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
    const [previewAttachment, setPreviewAttachment] = useState(null);
    const reflectionForm = useForm({ reflection_submission: '' });

    const openTrainingModal = (training) => {
        if (!training.is_unlocked) return;
        reflectionForm.clearErrors();
        setPreviewAttachment(null);
        setSelectedTraining(training);
        reflectionForm.setData('reflection_submission', training.reflection_submission || '');
    };

    // Sync open modal live when Admin approves/rejects in real time
    useEffect(() => {
        if (!selectedTraining) return;
        const fresh = sequentialTrainings.find((item) => item.id === selectedTraining.id);
        if (fresh) setSelectedTraining(fresh);
    }, [sequentialTrainings]);

    // Close modal on Escape (close image lightbox first if open)
    useEffect(() => {
        if (!selectedTraining) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => {
            if (e.key === 'Escape') {
                if (previewAttachment) {
                    setPreviewAttachment(null);
                } else if (!reflectionForm.processing) {
                    setSelectedTraining(null);
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [selectedTraining, previewAttachment, reflectionForm.processing]);

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
                                                        {(tItem.attachments_count > 0 || (tItem.attachments && tItem.attachments.length > 0)) && (
                                                            <span
                                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                                                    tItem.is_unlocked
                                                                        ? 'bg-cyan-50 text-cyan-800'
                                                                        : 'bg-slate-200/80 text-slate-500'
                                                                }`}
                                                            >
                                                                <Paperclip className="w-3 h-3" />
                                                                {tItem.attachments_count || tItem.attachments.length}{' '}
                                                                {(tItem.attachments_count || tItem.attachments.length) === 1 ? 'Attachment' : 'Attachments'}
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
                                className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-slate-900/55 backdrop-blur-xs"
                                onClick={() => { if (!reflectionForm.processing) setSelectedTraining(null); }}
                            >
                                <div
                                    className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94vh] max-h-[94dvh] sm:max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="px-4 py-3.5 sm:px-7 sm:py-5 flex items-center justify-between gap-3 bg-teal-50/70 shrink-0">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                                    Module #{selectedTraining.order} &bull; {rankTier} Curriculum
                                                </span>
                                                {selectedTraining.duration_minutes && (
                                                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-slate-600 text-[10px] font-mono font-bold">
                                                        <Clock className="w-3 h-3 text-[#0f766e]" />
                                                        {selectedTraining.duration_minutes} mins
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2.5 truncate mt-0.5 mb-0">
                                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#0f766e] shrink-0" />
                                                <span className="truncate">{lang === 'tl' ? selectedTraining.title_tl : selectedTraining.title_en}</span>
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedTraining(null)}
                                            aria-label="Close training modal"
                                            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 bg-transparent border-0 cursor-pointer shrink-0 transition-colors"
                                        >
                                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </button>
                                    </div>

                                    <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain space-y-6 text-sm text-slate-700">
                                        {videoEmbed && (
                                            <div className="space-y-2.5">
                                                <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-video w-full shadow-md">
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
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f766e] hover:text-[#115e59] no-underline"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                        <span>Open video in new tab</span>
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {selectedTraining.status === 'approved' && (
                                            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-bold">Module Verified &amp; Approved</div>
                                                    <div className="text-xs mt-0.5 text-emerald-700">{selectedTraining.admin_feedback || 'Your reflection has been verified and approved by the Executive Admin.'}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selectedTraining.status === 'rejected' && (
                                            <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-bold">Revision Requested</div>
                                                    <div className="text-xs mt-0.5 text-rose-700">{selectedTraining.admin_feedback || 'Please review the material and expand on your reflection.'}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selectedTraining.status === 'submitted' && (
                                            <div className="p-4 rounded-2xl bg-amber-50 text-amber-800 text-xs sm:text-sm flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-bold">Reflection Submitted &amp; Pending Admin Review</div>
                                                    <div className="text-xs mt-0.5 text-amber-700">Your realizations have been received. Next module unlocks automatically upon approval.</div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl whitespace-pre-line leading-relaxed text-sm sm:text-[15px] text-slate-800 font-sans break-words">
                                            {lang === 'tl' ? selectedTraining.content_tl : selectedTraining.content_en}
                                        </div>

                                        {/* Downloadable Training Materials & Attachments */}
                                        {Array.isArray(selectedTraining.attachments) && selectedTraining.attachments.length > 0 && (
                                            <div className="rounded-2xl bg-cyan-50/50 p-4 sm:p-6 space-y-3.5">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-9 h-9 rounded-xl bg-white text-[#0f766e] flex items-center justify-center shadow-xs shrink-0">
                                                            <Paperclip className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 font-mono">
                                                                {lang === 'tl' ? 'Mga Materyales at Kalakip' : 'Training Materials & Attachments'}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                {lang === 'tl'
                                                                    ? 'I-download o tingnan ang mga gabay at dokumento para sa araling ito.'
                                                                    : 'Download or preview the study materials provided for this module.'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 rounded-full bg-white text-[#0f766e] text-xs font-mono font-bold shadow-xs">
                                                        {selectedTraining.attachments.length}{' '}
                                                        {selectedTraining.attachments.length === 1 ? 'File' : 'Files'}
                                                    </span>
                                                </div>

                                                <div className="space-y-2.5">
                                                    {selectedTraining.attachments.map((att) => {
                                                        const meta = getAttachmentMeta(att.extension);
                                                        const AttIcon = meta.icon;
                                                        return (
                                                            <div
                                                                key={att.id}
                                                                className="rounded-2xl bg-white p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                                            >
                                                                <div className="flex items-center gap-3.5 min-w-0">
                                                                    {att.is_image ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setPreviewAttachment(att)}
                                                                            className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer p-0 border-0 group relative"
                                                                            title="Preview image"
                                                                        >
                                                                            <img
                                                                                src={att.preview_url}
                                                                                alt={att.name}
                                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                                            />
                                                                        </button>
                                                                    ) : (
                                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.tile}`}>
                                                                            <AttIcon className="w-5 h-5" />
                                                                        </div>
                                                                    )}

                                                                    <div className="min-w-0 flex-1">
                                                                        <div className="font-bold text-slate-900 text-xs sm:text-sm truncate" title={att.name}>
                                                                            {att.name}
                                                                        </div>
                                                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${meta.badge}`}>
                                                                                {meta.label}
                                                                            </span>
                                                                            <span className="text-xs font-mono text-slate-400">
                                                                                {att.size_label}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-2 shrink-0 justify-end">
                                                                    {att.is_image && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setPreviewAttachment(att)}
                                                                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer border-0"
                                                                        >
                                                                            <Eye className="w-3.5 h-3.5" />
                                                                            <span>Preview</span>
                                                                        </button>
                                                                    )}
                                                                    {att.is_pdf && (
                                                                        <a
                                                                            href={att.preview_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 no-underline"
                                                                        >
                                                                            <Eye className="w-3.5 h-3.5" />
                                                                            <span>View</span>
                                                                        </a>
                                                                    )}
                                                                    <a
                                                                        href={att.download_url}
                                                                        download={att.name}
                                                                        className="px-4 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 no-underline shadow-xs"
                                                                    >
                                                                        <Download className="w-3.5 h-3.5" />
                                                                        <span>Download</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        <form onSubmit={handleReflectionSubmit} className="space-y-4 pt-2">
                                            <div className="h-px bg-slate-100 w-full" />
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                                    <label className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                                                        Mandatory Reflection Submission <span className="text-rose-500">*</span>
                                                    </label>
                                                    <span className={`text-[11px] font-mono font-bold ${reflectionLen >= 20 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                        {reflectionLen}/20 min chars
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-slate-500 mb-2.5">
                                                    {lang === 'tl' ? selectedTraining.reflection_prompt_tl : selectedTraining.reflection_prompt_en}
                                                </p>
                                                <textarea
                                                    rows="5"
                                                    value={reflectionForm.data.reflection_submission}
                                                    onChange={(e) => reflectionForm.setData('reflection_submission', e.target.value)}
                                                    placeholder="Write your key realizations, action plans, and commitments here (minimum 20 characters)..."
                                                    className="w-full bg-white rounded-2xl p-3.5 sm:p-4 text-base sm:text-sm text-slate-900 outline-none"
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
                                                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs sm:text-sm font-bold cursor-pointer border-0"
                                                >
                                                    {t('close')}
                                                </button>

                                                {selectedTraining.status !== 'approved' && (
                                                    <button
                                                        type="submit"
                                                        disabled={reflectionForm.processing}
                                                        className="px-6 py-2.5 sm:py-3 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center gap-2 border-0 disabled:opacity-50"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        <span>{reflectionForm.processing ? 'Submitting...' : t('submit_for_approval')}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* IMAGE ATTACHMENT LIGHTBOX PREVIEW */}
                        {previewAttachment && (
                            <div
                                className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-xs"
                                onClick={() => setPreviewAttachment(null)}
                            >
                                <div
                                    className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94vh] max-h-[94dvh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="px-4 sm:px-5 py-3.5 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
                                        <div className="min-w-0">
                                            <div className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={previewAttachment.name}>
                                                {previewAttachment.name}
                                            </div>
                                            <div className="text-[10px] font-mono text-slate-500">
                                                {(previewAttachment.extension || 'IMG').toUpperCase()} &bull; {previewAttachment.size_label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <a
                                                href={previewAttachment.preview_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold inline-flex items-center gap-1.5 no-underline shadow-xs"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline">Open Tab</span>
                                            </a>
                                            <a
                                                href={previewAttachment.download_url}
                                                download={previewAttachment.name}
                                                className="px-3.5 py-1.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-[11px] font-bold inline-flex items-center gap-1.5 no-underline shadow-xs"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>Download</span>
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => setPreviewAttachment(null)}
                                                aria-label="Close image preview"
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 bg-transparent border-0 cursor-pointer"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-6 bg-slate-900/95 flex items-center justify-center overflow-auto flex-1">
                                        <img
                                            src={previewAttachment.preview_url}
                                            alt={previewAttachment.name}
                                            className="max-w-full max-h-[74dvh] rounded-xl object-contain shadow-lg"
                                        />
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
