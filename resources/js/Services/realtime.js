/**
 * INFINITE Realtime Sync Engine & Web Audio Notification Synthesizer
 *
 * Provides instant real-time synchronization across Admin and Public views
 * without reloading the browser tab or disrupting active user input.
 */

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

        if (type === 'world_plan') {
            // Celebratory triple-tone chord: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz)
            const freqs = [523.25, 659.25, 783.99, 1046.50];
            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.1);

                gain.gain.setValueAtTime(0.001, now + idx * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.1 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.1);
                osc.stop(now + idx * 0.1 + 0.45);
            });
        } else if (type === 'inquiry') {
            // Ascending dual chime: D5 (587.33Hz) -> A5 (880Hz)
            [587.33, 880].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.12);

                gain.gain.setValueAtTime(0.001, now + idx * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.12 + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.12);
                osc.stop(now + idx * 0.12 + 0.4);
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

