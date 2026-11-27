import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    X,
    ZoomIn,
    ZoomOut,
    RotateCw,
    RotateCcw,
    FlipHorizontal2,
    Check,
    Move,
    AlertCircle,
    Upload,
} from 'lucide-react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const OUTPUT_SIZE = 800;
const CROP_RATIO = 0.8; // Crop window covers 80% of the square stage so overflow remains visible

export default function ProfilePhotoCropperModal({
    isOpen,
    imageFile,
    onClose,
    onApply,
    onReplacePhoto = null,
    title = 'Adjust Profile Picture',
    subtitle = 'Drag to reposition, zoom to resize, or rotate to frame your portrait.',
}) {
    const stageRef = useRef(null);
    const imgRef = useRef(null);
    const pointersRef = useRef(new Map());
    const dragOriginRef = useRef(null);
    const pinchOriginRef = useRef(null);

    const [sourceUrl, setSourceUrl] = useState(null);
    const [imgNatural, setImgNatural] = useState({ width: 0, height: 0 });
    const [stageSize, setStageSize] = useState(320);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [flipX, setFlipX] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [loadError, setLoadError] = useState(null);

    // Create & clean up object URL when imageFile changes
    useEffect(() => {
        if (!isOpen || !imageFile) {
            setSourceUrl(null);
            return;
        }
        setLoadError(null);
        setImgNatural({ width: 0, height: 0 });
        setZoom(1);
        setOffset({ x: 0, y: 0 });
        setRotation(0);
        setFlipX(false);

        const url = URL.createObjectURL(imageFile);
        setSourceUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [isOpen, imageFile]);

    // Observe crop stage dimensions for pixel-accurate responsiveness across all devices
    useEffect(() => {
        if (!isOpen || !stageRef.current) return;
        const el = stageRef.current;

        const measure = () => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0) {
                setStageSize(Math.round(rect.width));
            }
        };
        measure();

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(measure);
            observer.observe(el);
            return () => observer.disconnect();
        }
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [isOpen]);

    // Lock body scroll and close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e) => {
            if (e.key === 'Escape' && !isExporting) onClose?.();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, isExporting, onClose]);

    const cropSize = Math.max(120, Math.round(stageSize * CROP_RATIO));

    const getEffectiveDims = useCallback(
        (rot = rotation) => {
            const { width: nw, height: nh } = imgNatural;
            if (!nw || !nh) return { effW: 0, effH: 0 };
            return rot % 180 === 0 ? { effW: nw, effH: nh } : { effW: nh, effH: nw };
        },
        [imgNatural, rotation]
    );

    const getBaseScale = useCallback(
        (rot = rotation) => {
            const { effW, effH } = getEffectiveDims(rot);
            if (!effW || !effH) return 1;
            return Math.max(cropSize / effW, cropSize / effH);
        },
        [cropSize, getEffectiveDims, rotation]
    );

    const clampOffset = useCallback(
        (nextX, nextY, nextZoom = zoom, nextRot = rotation) => {
            const { effW, effH } = getEffectiveDims(nextRot);
            if (!effW || !effH) return { x: 0, y: 0 };
            const scale = getBaseScale(nextRot) * nextZoom;
            const dispW = effW * scale;
            const dispH = effH * scale;
            const maxX = Math.max(0, (dispW - cropSize) / 2);
            const maxY = Math.max(0, (dispH - cropSize) / 2);
            return {
                x: Math.min(maxX, Math.max(-maxX, nextX)),
                y: Math.min(maxY, Math.max(-maxY, nextY)),
            };
        },
        [cropSize, getBaseScale, getEffectiveDims, rotation, zoom]
    );

    // Re-clamp offset if window resizes or image loads
    useEffect(() => {
        if (!imgNatural.width) return;
        setOffset((prev) => clampOffset(prev.x, prev.y, zoom, rotation));
    }, [stageSize, imgNatural.width, imgNatural.height, clampOffset, zoom, rotation]);

    const applyZoom = useCallback(
        (targetZoom) => {
            const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(targetZoom) || MIN_ZOOM));
            setZoom((prevZoom) => {
                if (prevZoom === clampedZoom) return prevZoom;
                const zoomRatio = clampedZoom / prevZoom;
                setOffset((prev) => clampOffset(prev.x * zoomRatio, prev.y * zoomRatio, clampedZoom, rotation));
                return clampedZoom;
            });
        },
        [clampOffset, rotation]
    );

    const handleRotate = () => {
        const nextRot = (rotation + 90) % 360;
        setRotation(nextRot);
        setOffset((prev) => clampOffset(-prev.y, prev.x, zoom, nextRot));
    };

    const handleFlip = () => {
        setFlipX((prev) => !prev);
        setOffset((prev) => clampOffset(-prev.x, prev.y, zoom, rotation));
    };

    const handleReset = () => {
        setZoom(1);
        setRotation(0);
        setFlipX(false);
        setOffset({ x: 0, y: 0 });
    };

    // Pointer drag & two-finger mobile pinch-to-zoom
    const handlePointerDown = (e) => {
        if (!imgNatural.width || loadError) return;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointersRef.current.size === 1) {
            setIsDragging(true);
            dragOriginRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                offsetX: offset.x,
                offsetY: offset.y,
            };
            pinchOriginRef.current = null;
        } else if (pointersRef.current.size === 2) {
            const pts = Array.from(pointersRef.current.values());
            const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
            pinchOriginRef.current = {
                startDist: Math.max(1, dist),
                startZoom: zoom,
            };
            dragOriginRef.current = null;
        }
    };

    const handlePointerMove = (e) => {
        if (!pointersRef.current.has(e.pointerId)) return;
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointersRef.current.size === 2 && pinchOriginRef.current) {
            const pts = Array.from(pointersRef.current.values());
            const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
            const nextZoom = pinchOriginRef.current.startZoom * (dist / pinchOriginRef.current.startDist);
            applyZoom(nextZoom);
            return;
        }

        if (pointersRef.current.size === 1 && dragOriginRef.current) {
            const dx = e.clientX - dragOriginRef.current.startX;
            const dy = e.clientY - dragOriginRef.current.startY;
            setOffset(clampOffset(dragOriginRef.current.offsetX + dx, dragOriginRef.current.offsetY + dy));
        }
    };

    const handlePointerUpOrCancel = (e) => {
        pointersRef.current.delete(e.pointerId);
        if (pointersRef.current.size === 1) {
            const [remaining] = Array.from(pointersRef.current.values());
            dragOriginRef.current = {
                startX: remaining.x,
                startY: remaining.y,
                offsetX: offset.x,
                offsetY: offset.y,
            };
            pinchOriginRef.current = null;
        } else if (pointersRef.current.size === 0) {
            setIsDragging(false);
            dragOriginRef.current = null;
            pinchOriginRef.current = null;
        }
    };

    // Mouse wheel zoom (non-passive native listener so page doesn't scroll)
    useEffect(() => {
        if (!isOpen || !stageRef.current) return;
        const el = stageRef.current;
        const onWheel = (e) => {
            if (!imgNatural.width) return;
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.12 : -0.12;
            applyZoom(zoom + delta);
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [isOpen, imgNatural.width, zoom, applyZoom]);

    const handleApplyCrop = async () => {
        const img = imgRef.current;
        if (!img || !imgNatural.width || !imgNatural.height) return;

        setIsExporting(true);
        try {
            const canvas = document.createElement('canvas');
            canvas.width = OUTPUT_SIZE;
            canvas.height = OUTPUT_SIZE;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas 2D context unavailable.');

            const isPng = imageFile?.type === 'image/png';
            if (!isPng) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
            }

            const baseScale = getBaseScale(rotation);
            const displayScale = baseScale * zoom;
            const exportRatio = OUTPUT_SIZE / cropSize;
            const drawW = imgNatural.width * displayScale * exportRatio;
            const drawH = imgNatural.height * displayScale * exportRatio;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.save();
            ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);
            ctx.translate(offset.x * exportRatio, offset.y * exportRatio);
            ctx.rotate((rotation * Math.PI) / 180);
            if (flipX) {
                ctx.scale(-1, 1);
            }
            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            ctx.restore();

            const toBlobAsync = (mime, quality) =>
                new Promise((resolve) => canvas.toBlob(resolve, mime, quality));

            let mime = isPng ? 'image/png' : 'image/jpeg';
            let blob = await toBlobAsync(mime, isPng ? undefined : 0.92);

            // Guarantee cropped file stays comfortably under Laravel's 5 MB upload limit
            if (!blob || blob.size > 4.5 * 1024 * 1024) {
                mime = 'image/jpeg';
                blob = await toBlobAsync('image/jpeg', 0.88);
            }

            if (!blob) throw new Error('Failed to generate cropped image.');

            const rawName = (imageFile?.name || 'profile_picture').replace(/\.[^.]+$/, '');
            const safeBase = rawName.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40) || 'profile_picture';
            const ext = mime === 'image/png' ? 'png' : 'jpg';
            const croppedFile = new File([blob], `${safeBase}_cropped.${ext}`, {
                type: mime,
                lastModified: Date.now(),
            });

            onApply?.(croppedFile);
        } catch (err) {
            setLoadError(err?.message || 'Unable to crop this image. Please try another photo.');
        } finally {
            setIsExporting(false);
        }
    };

    if (!isOpen) return null;

    const baseScale = getBaseScale(rotation);
    const displayScale = baseScale * zoom;
    const renderW = imgNatural.width * displayScale;
    const renderH = imgNatural.height * displayScale;

    // Mini live avatar preview (84x84) matching exact crop window ratio
    const previewBoxSize = 84;
    const previewRatio = previewBoxSize / cropSize;
    const previewW = renderW * previewRatio;
    const previewH = renderH * previewRatio;
    const zoomPct = Math.round(zoom * 100);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/75 backdrop-blur-xs"
            onClick={() => {
                if (!isExporting) onClose?.();
            }}
        >
            <div
                className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[94vh] max-h-[94dvh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-teal-50/70 border-b border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
                    <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono block">
                            Portrait Framing Studio
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 truncate mb-0">
                            {title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 mb-0 hidden sm:block">
                            {subtitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => !isExporting && onClose?.()}
                        aria-label="Close photo editor"
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 bg-transparent border-0 cursor-pointer shrink-0 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">
                    {loadError ? (
                        <div className="p-5 rounded-2xl bg-rose-50 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold">Could not load photo</div>
                                <div className="mt-1">{loadError}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                            {/* Interactive Crop Stage */}
                            <div className="md:col-span-7 flex flex-col items-center">
                                <div
                                    ref={stageRef}
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUpOrCancel}
                                    onPointerCancel={handlePointerUpOrCancel}
                                    style={{ touchAction: 'none' }}
                                    className={`relative w-full max-w-[320px] sm:max-w-[340px] aspect-square rounded-2xl overflow-hidden bg-slate-900 select-none shadow-inner ${
                                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                                    }`}
                                >
                                    {/* Source Image */}
                                    {sourceUrl && (
                                        <img
                                            ref={imgRef}
                                            src={sourceUrl}
                                            alt="Crop source"
                                            draggable={false}
                                            onLoad={(e) => {
                                                const target = e.currentTarget;
                                                setImgNatural({
                                                    width: target.naturalWidth,
                                                    height: target.naturalHeight,
                                                });
                                            }}
                                            onError={() =>
                                                setLoadError(
                                                    'Unsupported or corrupted image file. Please select a valid JPG, PNG, WebP, or GIF image.'
                                                )
                                            }
                                            style={
                                                imgNatural.width
                                                    ? {
                                                          position: 'absolute',
                                                          left: '50%',
                                                          top: '50%',
                                                          width: `${renderW}px`,
                                                          height: `${renderH}px`,
                                                          marginLeft: `${-renderW / 2}px`,
                                                          marginTop: `${-renderH / 2}px`,
                                                          maxWidth: 'none',
                                                          maxHeight: 'none',
                                                          transformOrigin: 'center center',
                                                          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${rotation}deg) scaleX(${flipX ? -1 : 1})`,
                                                          willChange: 'transform',
                                                      }
                                                    : { opacity: 0 }
                                            }
                                            className="pointer-events-none select-none"
                                        />
                                    )}

                                    {/* Centered 1:1 Crop Window with Dark Surrounding Vignette */}
                                    <div
                                        style={{
                                            width: `${cropSize}px`,
                                            height: `${cropSize}px`,
                                            boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.58)',
                                        }}
                                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl ring-2 ring-white/95"
                                    >
                                        {/* Subtle Rule-of-Thirds Grid */}
                                        <div
                                            className={`absolute inset-0 transition-opacity duration-150 ${
                                                isDragging ? 'opacity-70' : 'opacity-30'
                                            }`}
                                        >
                                            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/70" />
                                            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/70" />
                                            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/70" />
                                            <div className="absolute top-2/3 left-0 right-0 h-px bg-white/70" />
                                        </div>

                                        {/* Crisp Corner Framing Brackets (SVG-based so borderless portal CSS never strips them) */}
                                        <svg className="absolute -top-0.5 -left-0.5 w-5 h-5 text-[#14b8a6]" viewBox="0 0 20 20" fill="none">
                                            <path d="M2 16V8C2 4.686 4.686 2 8 2H16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        <svg className="absolute -top-0.5 -right-0.5 w-5 h-5 text-[#14b8a6]" viewBox="0 0 20 20" fill="none">
                                            <path d="M18 16V8C18 4.686 15.314 2 12 2H4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        <svg className="absolute -bottom-0.5 -left-0.5 w-5 h-5 text-[#14b8a6]" viewBox="0 0 20 20" fill="none">
                                            <path d="M2 4V12C2 15.314 4.686 18 8 18H16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        <svg className="absolute -bottom-0.5 -right-0.5 w-5 h-5 text-[#14b8a6]" viewBox="0 0 20 20" fill="none">
                                            <path d="M18 4V12C18 15.314 15.314 18 12 18H4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </div>

                                    {/* Gesture Hint Pill */}
                                    <div className="pointer-events-none absolute top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-950/65 text-white/90 text-[10px] font-semibold whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xs">
                                        <Move className="w-3 h-3 text-[#24dbc3]" />
                                        <span>Drag to reposition</span>
                                    </div>
                                </div>
                            </div>

                            {/* Controls & Live ID Preview Column */}
                            <div className="md:col-span-5 space-y-5">
                                {/* Live Academy ID Avatar Preview */}
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                                    <div
                                        style={{ width: `${previewBoxSize}px`, height: `${previewBoxSize}px` }}
                                        className="relative rounded-2xl overflow-hidden bg-slate-200 shrink-0 shadow-sm ring-2 ring-white"
                                    >
                                        {sourceUrl && imgNatural.width > 0 && (
                                            <img
                                                src={sourceUrl}
                                                alt="Avatar preview"
                                                draggable={false}
                                                style={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    top: '50%',
                                                    width: `${previewW}px`,
                                                    height: `${previewH}px`,
                                                    marginLeft: `${-previewW / 2}px`,
                                                    marginTop: `${-previewH / 2}px`,
                                                    maxWidth: 'none',
                                                    maxHeight: 'none',
                                                    transformOrigin: 'center center',
                                                    transform: `translate3d(${offset.x * previewRatio}px, ${offset.y * previewRatio}px, 0) rotate(${rotation}deg) scaleX(${flipX ? -1 : 1})`,
                                                }}
                                                className="pointer-events-none select-none"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e] font-mono">
                                            Live ID Preview
                                        </div>
                                        <div className="text-xs font-bold text-slate-800 mt-0.5">
                                            800 &times; 800 px
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug mb-0">
                                            Shown on your official Academy badge &amp; profile.
                                        </p>
                                    </div>
                                </div>

                                {/* Zoom / Resize Slider */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                            Resize / Zoom
                                        </span>
                                        <span className="font-mono font-bold text-[#0f766e] text-xs">
                                            {zoomPct}%
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => applyZoom(zoom - 0.15)}
                                            disabled={zoom <= MIN_ZOOM}
                                            aria-label="Zoom out"
                                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 border-0 cursor-pointer transition-colors shrink-0"
                                        >
                                            <ZoomOut className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="range"
                                            min={MIN_ZOOM}
                                            max={MAX_ZOOM}
                                            step="0.01"
                                            value={zoom}
                                            onChange={(e) => applyZoom(parseFloat(e.target.value))}
                                            aria-label="Zoom level"
                                            className="flex-1 accent-[#0f766e] cursor-pointer h-2 bg-slate-200 rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => applyZoom(zoom + 0.15)}
                                            disabled={zoom >= MAX_ZOOM}
                                            aria-label="Zoom in"
                                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 border-0 cursor-pointer transition-colors shrink-0"
                                        >
                                            <ZoomIn className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Transform Controls */}
                                <div className="space-y-2">
                                    <span className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                        Orientation
                                    </span>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            type="button"
                                            onClick={handleRotate}
                                            className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 border-0 cursor-pointer transition-colors"
                                        >
                                            <RotateCw className="w-3.5 h-3.5 text-[#0f766e]" />
                                            <span>Rotate</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleFlip}
                                            className={`px-2.5 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 border-0 cursor-pointer transition-colors ${
                                                flipX
                                                    ? 'bg-teal-100 text-[#0f766e]'
                                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                            }`}
                                        >
                                            <FlipHorizontal2 className="w-3.5 h-3.5 text-[#0f766e]" />
                                            <span>Flip</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 border-0 cursor-pointer transition-colors"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                                            <span>Reset</span>
                                        </button>
                                    </div>
                                </div>

                                {onReplacePhoto && (
                                    <button
                                        type="button"
                                        onClick={onReplacePhoto}
                                        className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Upload className="w-3.5 h-3.5 text-[#0f766e]" />
                                        <span>Choose Different Image</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-slate-50/90 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                    <button
                        type="button"
                        onClick={() => !isExporting && onClose?.()}
                        disabled={isExporting}
                        className="px-4 py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-700 text-xs font-bold border-0 cursor-pointer transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleApplyCrop}
                        disabled={isExporting || !imgNatural.width || Boolean(loadError)}
                        className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-2 border-0 cursor-pointer transition-colors disabled:opacity-50"
                    >
                        <Check className="w-4 h-4" />
                        <span>{isExporting ? 'Saving Photo...' : 'Apply Profile Photo'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
