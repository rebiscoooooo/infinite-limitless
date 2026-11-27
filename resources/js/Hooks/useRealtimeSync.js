import { useState, useEffect, useRef, useCallback } from 'react';
import { router } from '@inertiajs/react';
import {
    playNotificationChime,
    broadcastRealtimePing,
    subscribeRealtimeBroadcast,
} from '../Services/realtime';

export default function useRealtimeSync({
    isAdmin = false,
    isAcademy = false,
    intervalMs = 2500,
    enableSoundByDefault = true,
} = {}) {
    const [connected, setConnected] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState(new Date());
    const [soundEnabled, setSoundEnabled] = useState(() => {
        if (typeof window === 'undefined') return enableSoundByDefault;
        const stored = localStorage.getItem('infinite_realtime_sound');
        return stored !== null ? stored === 'true' : enableSoundByDefault;
    });
    const [notifications, setNotifications] = useState([]);

    const prevSnapshotRef = useRef(null);
    const isInitialRef = useRef(true);
    const sseRef = useRef(null);
    const timerRef = useRef(null);
    const isReloadingRef = useRef(false);
    const pendingReloadRef = useRef(false);
    const soundEnabledRef = useRef(soundEnabled);

    useEffect(() => {
        soundEnabledRef.current = soundEnabled;
        if (typeof window !== 'undefined') {
            localStorage.setItem('infinite_realtime_sound', soundEnabled ? 'true' : 'false');
        }
    }, [soundEnabled]);

    const toggleSound = useCallback(() => {
        setSoundEnabled((prev) => !prev);
    }, []);

    const dismissNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const addNotification = useCallback((item) => {
        const id = Date.now() + Math.random().toString(36).substring(2, 6);
        const notification = {
            id,
            ...item,
            time: new Date(),
        };

        setNotifications((prev) => [notification, ...prev.slice(0, 4)]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 6500);
    }, []);

    // Coalesced Inertia reload so rapid updates never overlap or reset user input/scroll
    const triggerSeamlessReload = useCallback(() => {
        if (isReloadingRef.current) {
            pendingReloadRef.current = true;
            return;
        }
        isReloadingRef.current = true;
        router.reload({
            preserveScroll: true,
            preserveState: true,
            onFinish: () => {
                isReloadingRef.current = false;
                if (pendingReloadRef.current) {
                    pendingReloadRef.current = false;
                    triggerSeamlessReload();
                }
            },
        });
    }, []);

    // Evaluate snapshot deltas across Admin, Legacy Academy Portal, and Public pages
    const handleSnapshot = useCallback((newSnap) => {
        if (!newSnap) return;

        setConnected(true);
        setLastSynced(new Date());

        const oldSnap = prevSnapshotRef.current;
        prevSnapshotRef.current = newSnap;

        // First snapshot establishes baseline without reloading
        if (isInitialRef.current || !oldSnap) {
            isInitialRef.current = false;
            return;
        }

        let needsReload = false;
        let playSoundType = null;

        if (isAdmin) {
            // 1. Inquiries
            const hasNewInquiry =
                (newSnap.inquiries?.latest_id &&
                    (!oldSnap.inquiries?.latest_id || newSnap.inquiries.latest_id > oldSnap.inquiries.latest_id)) ||
                newSnap.inquiries?.count > oldSnap.inquiries?.count;

            const inquiryStatusChanged =
                newSnap.inquiries?.unread_count !== oldSnap.inquiries?.unread_count ||
                newSnap.inquiries?.count !== oldSnap.inquiries?.count;

            if (hasNewInquiry) {
                needsReload = true;
                playSoundType = 'inquiry';
                addNotification({
                    type: 'inquiry',
                    title: 'New Customer Inquiry',
                    message: `${newSnap.inquiries.latest_name || 'Visitor'}: "${newSnap.inquiries.latest_subject || 'New message'}"`,
                });
            } else if (inquiryStatusChanged) {
                needsReload = true;
            }

            // 2. World Plan Registrations
            const hasNewWorldPlan =
                (newSnap.world_plan?.latest_id &&
                    (!oldSnap.world_plan?.latest_id || newSnap.world_plan.latest_id > oldSnap.world_plan.latest_id)) ||
                newSnap.world_plan?.count > oldSnap.world_plan?.count;

            const worldPlanStatusChanged =
                newSnap.world_plan?.pending_count !== oldSnap.world_plan?.pending_count ||
                newSnap.world_plan?.count !== oldSnap.world_plan?.count;

            if (hasNewWorldPlan) {
                needsReload = true;
                playSoundType = 'world_plan';
                addNotification({
                    type: 'world_plan',
                    title: 'New World Plan Registration!',
                    message: `${newSnap.world_plan.latest_name || 'Applicant'} applied for ${newSnap.world_plan.latest_package || 'World Plan'}`,
                });
            } else if (worldPlanStatusChanged) {
                needsReload = true;
            }

            // 3. Legacy Club Academy (Registrations, Reflections, Requirements, Trainings, Announcements, Certificates)
            const newAcad = newSnap.academy;
            const oldAcad = oldSnap.academy;
            if (newAcad && oldAcad && newAcad.hash !== oldAcad.hash) {
                needsReload = true;

                const hasNewMember =
                    (newAcad.members?.latest_id &&
                        (!oldAcad.members?.latest_id || newAcad.members.latest_id > oldAcad.members.latest_id)) ||
                    (newAcad.members?.count ?? 0) > (oldAcad.members?.count ?? 0);

                const hasNewReflection =
                    (newAcad.reflections?.pending_count ?? 0) > (oldAcad.reflections?.pending_count ?? 0) ||
                    (newAcad.reflections?.latest_id &&
                        newAcad.reflections.latest_id !== oldAcad.reflections?.latest_id &&
                        (newAcad.reflections?.pending_count ?? 0) > 0);

                if (hasNewMember) {
                    playSoundType = 'academy';
                    addNotification({
                        type: 'academy',
                        title: 'New Academy Registration',
                        message: `${newAcad.members?.latest_name || 'New Applicant'} registered for Legacy Club Academy.`,
                    });
                } else if (hasNewReflection) {
                    playSoundType = 'academy';
                    addNotification({
                        type: 'academy',
                        title: 'New Training Reflection Submitted',
                        message: `${newAcad.reflections?.latest_member_name || 'A member'} submitted Module #${newAcad.reflections?.latest_training_order || ''} reflection for review.`,
                    });
                }
            }

            // 4. Products
            if (newSnap.products?.hash && oldSnap.products?.hash && newSnap.products.hash !== oldSnap.products.hash) {
                needsReload = true;
                if (!playSoundType) playSoundType = 'default';
                addNotification({
                    type: 'product',
                    title: 'Products Updated',
                    message: 'Product catalog was updated by an administrator.',
                });
            }

            // 5. Admin accounts or Activity logs
            if (
                (newSnap.admins?.hash && newSnap.admins.hash !== oldSnap.admins?.hash) ||
                (newSnap.logs?.latest_id && newSnap.logs.latest_id !== oldSnap.logs?.latest_id)
            ) {
                needsReload = true;
            }
        } else if (isAcademy) {
            const newMe = newSnap.academy_member;
            const oldMe = oldSnap.academy_member;
            const newAcad = newSnap.academy;
            const oldAcad = oldSnap.academy;

            // Member-specific live changes (rank promotion, approval, trainings, requirements, certificates)
            if (newMe && oldMe && newMe.hash !== oldMe.hash) {
                needsReload = true;

                if (newMe.rank_tier && oldMe.rank_tier && newMe.rank_tier !== oldMe.rank_tier) {
                    playSoundType = 'celebration';
                    addNotification({
                        type: 'celebration',
                        title: `Promoted to ${newMe.rank_tier}!`,
                        message: `Congratulations! Your official rank tier has been elevated to ${newMe.rank_tier}.`,
                    });
                } else if (newMe.status !== oldMe.status && newMe.status === 'Approved') {
                    playSoundType = 'celebration';
                    addNotification({
                        type: 'celebration',
                        title: 'Membership Approved!',
                        message: 'Your Legacy Club Academy application has been approved.',
                    });
                } else if (
                    newMe.certificates_hash !== oldMe.certificates_hash &&
                    (newMe.certificates_count ?? 0) >= (oldMe.certificates_count ?? 0) &&
                    (newMe.certificates_count ?? 0) > 0
                ) {
                    playSoundType = 'celebration';
                    addNotification({
                        type: 'certificate',
                        title: 'Certificate Updated / Conferred!',
                        message: 'Your official training completion certificate is ready to download.',
                    });
                } else if ((newMe.training_approved ?? 0) > (oldMe.training_approved ?? 0)) {
                    playSoundType = 'academy';
                    addNotification({
                        type: 'academy',
                        title: 'Training Module Approved!',
                        message: 'An administrator approved your training. Your next module is now unlocked!',
                    });
                } else if ((newMe.training_rejected ?? 0) > (oldMe.training_rejected ?? 0)) {
                    playSoundType = 'warning';
                    addNotification({
                        type: 'warning',
                        title: 'Training Revision Requested',
                        message: 'Admin left feedback on your reflection. Please review and resubmit.',
                    });
                } else if (newMe.req_hash !== oldMe.req_hash) {
                    playSoundType = 'academy';
                    addNotification({
                        type: 'academy',
                        title: 'Requirements Progress Updated',
                        message: 'Your verified rank requirements progress was just updated by Admin.',
                    });
                }
            }

            // Global Academy changes (new announcements, curriculum updates, leaderboard updates)
            if (newAcad && oldAcad && newAcad.hash !== oldAcad.hash) {
                needsReload = true;

                const hasNewAnnouncement =
                    newAcad.announcements?.latest_id &&
                    newAcad.announcements.latest_id !== oldAcad.announcements?.latest_id &&
                    (newAcad.announcements?.active_count ?? 0) >= (oldAcad.announcements?.active_count ?? 0);

                if (hasNewAnnouncement && !playSoundType) {
                    playSoundType = 'academy';
                    addNotification({
                        type: 'announcement',
                        title: 'New Academy Announcement',
                        message: newAcad.announcements?.latest_title || 'A new academy update has been posted.',
                    });
                } else if (newAcad.trainings_hash !== oldAcad.trainings_hash && !playSoundType) {
                    playSoundType = 'default';
                    addNotification({
                        type: 'academy',
                        title: 'Curriculum Updated',
                        message: 'New or updated training modules are now available in your portal.',
                    });
                }
            }
        } else {
            // Public website: check if product catalog changed
            if (newSnap.products?.hash && oldSnap.products?.hash && newSnap.products.hash !== oldSnap.products.hash) {
                needsReload = true;
            }
        }

        if (playSoundType && soundEnabledRef.current) {
            playNotificationChime(playSoundType);
        }

        if (needsReload) {
            triggerSeamlessReload();
        }
    }, [isAdmin, isAcademy, addNotification, triggerSeamlessReload]);

    // Fetch snapshot via AJAX pulse
    const fetchPulse = useCallback(async () => {
        try {
            setIsSyncing(true);
            const res = await fetch('/realtime/pulse', {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                cache: 'no-store',
                credentials: 'same-origin',
            });

            if (res.ok) {
                const data = await res.json();
                handleSnapshot(data);
            } else {
                setConnected(false);
            }
        } catch (err) {
            setConnected(false);
        } finally {
            setIsSyncing(false);
        }
    }, [handleSnapshot]);

    // Manual sync trigger button
    const syncNow = useCallback(() => {
        fetchPulse().then(() => {
            triggerSeamlessReload();
        });
    }, [fetchPulse, triggerSeamlessReload]);

    // Broadcast to other open browser tabs whenever a mutation (POST/PUT/PATCH/DELETE) finishes
    useEffect(() => {
        if (!isAdmin && !isAcademy) return;
        const removeListener = router.on('finish', (event) => {
            const method = (event?.detail?.visit?.method || '').toLowerCase();
            if (method && method !== 'get') {
                broadcastRealtimePing(isAdmin ? 'admin' : 'academy');
            }
        });
        return () => {
            if (typeof removeListener === 'function') removeListener();
        };
    }, [isAdmin, isAcademy]);

    // Setup SSE, BroadcastChannel instant cross-tab sync, and polling fallback
    useEffect(() => {
        fetchPulse();

        const unsubscribeBroadcast = subscribeRealtimeBroadcast(() => {
            if (document.visibilityState === 'visible') {
                fetchPulse();
            }
        });

        const closeSse = () => {
            if (sseRef.current) {
                sseRef.current.close();
                sseRef.current = null;
            }
        };

        const openSse = () => {
            if (sseRef.current) return;
            try {
                if (typeof window !== 'undefined' && window.EventSource) {
                    const es = new EventSource('/realtime/stream');
                    sseRef.current = es;

                    es.addEventListener('update', (e) => {
                        try {
                            handleSnapshot(JSON.parse(e.data));
                        } catch (err) {
                            // ignore malformed event
                        }
                    });

                    es.onopen = () => setConnected(true);
                    es.onerror = () => {
                        // SSE closed/reconnecting; polling heartbeat keeps data fresh seamlessly
                    };
                }
            } catch (e) {
                // SSE unavailable; polling runs smoothly
            }
        };

        if (typeof document === 'undefined' || document.visibilityState === 'visible') {
            openSse();
        }

        const pollTime = isAdmin || isAcademy ? intervalMs : Math.max(intervalMs, 10000);
        timerRef.current = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchPulse();
            }
        }, pollTime);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                openSse();
                fetchPulse();
            } else {
                closeSse();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const handleFocus = () => {
            fetchPulse();
        };
        window.addEventListener('focus', handleFocus);

        const handleOnline = () => {
            setConnected(true);
            openSse();
            fetchPulse();
        };
        const handleOffline = () => {
            setConnected(false);
            closeSse();
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            unsubscribeBroadcast();
            if (timerRef.current) clearInterval(timerRef.current);
            closeSse();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [fetchPulse, handleSnapshot, intervalMs, isAdmin, isAcademy]);

    return {
        connected,
        isSyncing,
        lastSynced,
        soundEnabled,
        toggleSound,
        notifications,
        dismissNotification,
        syncNow,
    };
}
