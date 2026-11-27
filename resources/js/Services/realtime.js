/**
 * INFINITE Realtime Sync Engine & Web Audio Notification Synthesizer
 *
 * Provides instant real-time synchronization across Admin, Academy Member,
 * and Public views without hard-refreshing or disrupting active user input.
 */

const BROADCAST_CHANNEL_NAME = 'infinite_realtime_sync_v1';

/**
 * Notify other open tabs in the same browser immediately after a mutation
 * so Admin <-> Legacy Portal tabs stay synchronized in < 50ms.
 */
export const broadcastRealtimePing = (source = 'app') => {
    try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            const ch = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
            ch.postMessage({ type: 'ping', source, ts: Date.now() });
            ch.close();
        }
    } catch (e) {
        // BroadcastChannel unsupported or restricted in private mode
    }
};

export const subscribeRealtimeBroadcast = (onPing) => {
    try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            const ch = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
            ch.onmessage = (event) => {
                if (event?.data?.type === 'ping') {
                    onPing(event.data);
                }
            };
            return () => ch.close();
        }
    } catch (e) {
        // Fallback silently to SSE / polling
    }
    return () => {};
};

// Synthesize pleasant, zero-asset audio chimes using browser Web Audio API
export const playNotificationChime = (type = 'default') => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const now = ctx.currentTime;

        if (type === 'world_plan' || type === 'celebration') {
            // Celebratory ascending arpeggio: C5 -> E5 -> G5 -> C6
            const freqs = [523.25, 659.25, 783.99, 1046.5];
            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.09);

                gain.gain.setValueAtTime(0.001, now + idx * 0.09);
                gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.38);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.09);
                osc.stop(now + idx * 0.09 + 0.42);
            });
        } else if (type === 'inquiry' || type === 'academy') {
            // Pleasant ascending dual chime: D5 -> A5
            [587.33, 880].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.11);

                gain.gain.setValueAtTime(0.001, now + idx * 0.11);
                gain.gain.exponentialRampToValueAtTime(0.16, now + idx * 0.11 + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.34);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.11);
                osc.stop(now + idx * 0.11 + 0.38);
            });
        } else {
            // Gentle blip for catalog or system sync
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(659.25, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.3);
        }
    } catch (e) {
        // Audio playback may be silenced if user has not interacted with document yet
    }
};
