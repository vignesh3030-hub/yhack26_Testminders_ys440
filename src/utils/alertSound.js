/**
 * Web Audio API Emergency Siren & Alert Sound Synthesizer
 * Plays high-priority emergency siren and warning chimes without external audio asset dependencies.
 */

class AlertSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.sirenOscillator = null;
    this.sirenGain = null;
    this.isPlayingSiren = false;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingSiren) {
      this.stopSiren();
    }
    return this.isMuted;
  }

  // Play a short warning beep (for yellow/orange watch updates)
  playWarningBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(750, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.3);
    } catch (err) {
      console.warn("Audio warning beep error:", err);
    }
  }

  // Play continuous emergency siren (for RED ALERT / Level IV Critical warnings & broadcasts)
  playEmergencySiren(durationSeconds = 3) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Oscillators for dual-tone emergency siren
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = "sawtooth";
      osc2.type = "sine";

      // Modulate frequency up and down like a classic emergency siren
      osc1.frequency.setValueAtTime(500, now);
      osc2.frequency.setValueAtTime(800, now);

      // Siren sweep over duration
      for (let t = 0; t < durationSeconds; t += 0.6) {
        osc1.frequency.linearRampToValueAtTime(950, now + t + 0.3);
        osc1.frequency.linearRampToValueAtTime(500, now + t + 0.6);

        osc2.frequency.linearRampToValueAtTime(1200, now + t + 0.3);
        osc2.frequency.linearRampToValueAtTime(800, now + t + 0.6);
      }

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + durationSeconds);
      osc2.stop(now + durationSeconds);
    } catch (err) {
      console.warn("Emergency siren audio error:", err);
    }
  }
}

export const alertSound = new AlertSoundEngine();
