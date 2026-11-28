import React, { useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

/**
 * Flowbite-style Pop-up Confirmation & Alert Modal (Full English, Responsive, Border-Safe).
 * Matches the clean Flowbite confirmation pattern with circular icon, clear prompt,
 * primary "Yes, I'm sure" action button, and clean "No, cancel" button.
 */
export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = '',
    message = 'Are you sure you want to proceed with this action?',
    confirmLabel = "Yes, I'm sure",
    cancelLabel = 'No, cancel',
    variant = 'danger', // 'danger' | 'warning' | 'primary' | 'info'
    alertOnly = false,
    processing = false,
}) {
    useEffect(() => {
        if (!isOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e) => {
            if (e.key === 'Escape' && !processing) {
                onClose?.();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, processing, onClose]);

    if (!isOpen) return null;

    const confirmBtnStyle =
        variant === 'primary'
            ? 'bg-[#0f766e] hover:bg-[#115e59] focus:ring-4 focus:ring-teal-200 text-white'
            : variant === 'warning'
                ? 'bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 text-white'
                : variant === 'info'
                    ? 'bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:ring-slate-300 text-white'
                    : 'bg-[#c81e3a] hover:bg-[#a61830] focus:ring-4 focus:ring-rose-200 text-white';

    const iconColor =
        variant === 'primary'
            ? 'text-[#0f766e]'
            : variant === 'warning'
                ? 'text-amber-500'
                : variant === 'info'
                    ? 'text-sky-500'
                    : 'text-slate-400';

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Confirmation Dialog'}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-xs text-center"
            onClick={() => {
                if (!processing) onClose?.();
            }}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7 animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top-right Close Button */}
                <button
                    type="button"
                    onClick={() => !processing && onClose?.()}
                    disabled={processing}
                    aria-label="Close modal"
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 inline-flex items-center justify-center transition-colors bg-transparent border-0 cursor-pointer disabled:opacity-40"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="pt-2 pb-1 text-center">
                    {/* Flowbite Circular Exclamation Icon */}
                    <svg
                        className={`mx-auto mb-4 w-12 h-12 sm:w-14 sm:h-14 ${iconColor}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.75"
                            d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>

                    {title && (
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                            {title}
                        </h3>
                    )}

                    <p className="mb-6 text-sm sm:text-base font-normal text-slate-600 leading-relaxed max-w-sm mx-auto break-words">
                        {message}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            type="button"
                            disabled={processing}
                            onClick={() => {
                                if (alertOnly) {
                                    onClose?.();
                                } else {
                                    onConfirm?.();
                                }
                            }}
                            className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl text-sm px-5 py-2.5 transition-all cursor-pointer border-0 shadow-xs disabled:opacity-60 ${confirmBtnStyle}`}
                        >
                            {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>{processing ? 'Please wait...' : alertOnly ? (confirmLabel || 'OK, got it') : confirmLabel}</span>
                        </button>

                        {!alertOnly && (
                            <button
                                type="button"
                                disabled={processing}
                                onClick={() => onClose?.()}
                                className="py-2.5 px-5 text-sm font-semibold text-slate-700 bg-white rounded-xl hover:bg-slate-100 hover:text-slate-900 ring-1 ring-inset ring-slate-200 transition-colors cursor-pointer border-0 disabled:opacity-50"
                            >
                                {cancelLabel}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
