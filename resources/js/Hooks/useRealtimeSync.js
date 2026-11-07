import { useState, useEffect, useRef, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { playNotificationChime } from '../Services/realtime';

export default function useRealtimeSync({
    isAdmin = false,
    intervalMs = 4000,
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

    // Store previous snapshot to detect exact deltas
    const prevSnapshotRef = useRef(null);
    const isInitialRef = useRef(true);
    const sseRef = useRef(null);
    const timerRef = useRef(null);
    const soundEnabledRef = useRef(soundEnabled);

    // Keep ref updated for callbacks
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

        // Auto-dismiss after 6 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 6000);
    }, []);

    // Handle snapshot difference evaluation
    const handleSnapshot = useCallback((newSnap) => {
        if (!newSnap) return;

        setConnected(true);
        setLastSynced(new Date());

        const oldSnap = prevSnapshotRef.current;
        prevSnapshotRef.current = newSnap;

        // If this is the initial page load check, just record the baseline
        if (isInitialRef.current || !oldSnap) {
            isInitialRef.current = false;
            return;
        }

        let needsReload = false;
        let playSoundType = null;

        if (isAdmin) {
            // 1. Inquiries check
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

            // 2. World Plan Registrations check
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

            // 3. Products check
            if (newSnap.products?.hash && oldSnap.products?.hash && newSnap.products.hash !== oldSnap.products.hash) {
                needsReload = true;
                if (!playSoundType) playSoundType = 'default';
                addNotification({
                    type: 'product',
                    title: 'Products Updated',
                    message: 'Product catalog was updated by an administrator.',
                });
            }

            // 4. Admin accounts or Activity logs check
            if (
                (newSnap.admins?.hash && newSnap.admins.hash !== oldSnap.admins?.hash) ||
                (newSnap.logs?.latest_id && newSnap.logs.latest_id !== oldSnap.logs?.latest_id)
            ) {
                needsReload = true;
            }
        } else {
            // Public website: check if product catalog changed
            if (newSnap.products?.hash && oldSnap.products?.hash && newSnap.products.hash !== oldSnap.products.hash) {
                needsReload = true;
            }
        }

        // Play audio chime if enabled and sound triggered
        if (playSoundType && soundEnabledRef.current) {
            playNotificationChime(playSoundType);
        }

        // Trigger seamless Inertia reload without full page refresh or scroll reset
        if (needsReload) {
            router.reload({
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, [isAdmin, addNotification]);

    // Fetch snapshot via AJAX pulse
    const fetchPulse = useCallback(async () => {
        try {
            setIsSyncing(true);
            const res = await fetch('/realtime/pulse', {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                cache: 'no-store',
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
            router.reload({
                preserveScroll: true,
                preserveState: true,
            });
        });
    }, [fetchPulse]);

    // Setup Server-Sent Events (SSE) and interval fallback
    useEffect(() => {
        // Initial immediate fetch
        fetchPulse();

        // 1. Try Native Server-Sent Events stream for zero-latency instant updates
        let es = null;
        try {
            if (typeof window !== 'undefined' && window.EventSource) {
                es = new EventSource('/realtime/stream');
                sseRef.current = es;

                es.addEventListener('update', (e) => {
                    try {
                        const data = JSON.parse(e.data);
                        handleSnapshot(data);
                    } catch (err) {
                        // ignore malformed event
                    }
                });

                es.onopen = () => {
                    setConnected(true);
                };

                es.onerror = () => {
                    // SSE connection closed or reconnecting; fallback timer covers this
                    setConnected(false);
                };
            }
        } catch (e) {
            // SSE not supported or blocked, timer fallback runs smoothly
        }

        // 2. High-reliability Polling Timer (acts as heartbeat and fallback)
        const pollTime = isAdmin ? intervalMs : Math.max(intervalMs, 10000);
        timerRef.current = setInterval(fetchPulse, pollTime);

        // 3. Tab Visibility Handler: immediately check when user tabs back into the page
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchPulse();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // 4. Online/Offline network handlers
        const handleOnline = () => {
            setConnected(true);
            fetchPulse();
        };
        const handleOffline = () => setConnected(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (sseRef.current) {
                sseRef.current.close();
                sseRef.current = null;
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [fetchPulse, handleSnapshot, intervalMs, isAdmin]);

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

