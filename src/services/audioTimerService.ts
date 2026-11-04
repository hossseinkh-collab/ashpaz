/**
 * Audio Timer & Human Voice Speech Service for Smart Chef Cooking Mode
 * Synthesizes high-fidelity chimes with Web Audio API and human Persian speech announcements with Web Speech API.
 */

// Voice & Sound settings
export interface TimerAudioSettings {
  soundEnabled: boolean;
  speechEnabled: boolean;
  autoAdvanceEnabled: boolean; // Auto start next step when previous completes
  volume: number; // 0 to 1
  speechRate: number; // 0.8 to 1.2
}

const SETTINGS_KEY = 'smart_chef_timer_audio_settings_v1';

export function getTimerAudioSettings(): TimerAudioSettings {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return JSON.parse(raw);
    }
  } catch {}
  return {
    soundEnabled: true,
    speechEnabled: true,
    autoAdvanceEnabled: true,
    volume: 0.9,
    speechRate: 0.95
  };
}

export function saveTimerAudioSettings(settings: TimerAudioSettings): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  } catch {}
}

let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      sharedAudioContext = new AudioCtx();
    }
    if (sharedAudioContext.state === 'suspended') {
      sharedAudioContext.resume().catch(() => {});
    }
    return sharedAudioContext;
  } catch {
    return null;
  }
}

/**
 * Play warm pleasant start chime (C5 -> G5 gong)
 */
export function playStartSound(volume = 0.9): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(523.25, now); // C5
  osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.18); // G5

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(659.25, now + 0.05); // E5
  osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25); // C6

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now + 0.04);
  osc1.stop(now + 0.85);
  osc2.stop(now + 0.85);
}

/**
 * Play vibrant step completion chime (Alert ding E5 -> B5)
 */
export function playStepCompleteSound(volume = 0.9): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  [659.25, 987.77, 1318.51].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + idx * 0.12;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume * 0.4, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.7);
  });
}

/**
 * Play celebratory fanfare when entire cooking recipe completes
 */
export function playAllCompleteSound(volume = 0.9): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [
    { freq: 523.25, time: 0 },       // C5
    { freq: 659.25, time: 0.14 },    // E5
    { freq: 783.99, time: 0.28 },    // G5
    { freq: 1046.50, time: 0.42 },   // C6
    { freq: 1318.51, time: 0.65 }    // E6 sustained
  ];

  notes.forEach((n, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + n.time;
    const isLast = idx === notes.length - 1;
    const dur = isLast ? 1.6 : 0.35;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(n.freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume * (isLast ? 0.5 : 0.35), startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + dur);
  });
}

/**
 * Play tick in the final countdown seconds
 */
export function playTickSound(volume = 0.9): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);

  gain.gain.setValueAtTime(volume * 0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Persian Human Voice Speech Announcement
 */
export function speakPersianAnnouncement(
  text: string, 
  options?: { rate?: number; pitch?: number; volume?: number; onEnd?: () => void }
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterances

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fa-IR';
    utterance.rate = options?.rate ?? 0.92;
    utterance.pitch = options?.pitch ?? 1.0;
    utterance.volume = options?.volume ?? 1.0;

    // Pick Persian / Arabic / multilingual voice if available
    const voices = window.speechSynthesis.getVoices();
    const faVoice = voices.find(v => v.lang.startsWith('fa') || v.lang.includes('IR') || v.name.toLowerCase().includes('persian') || v.name.toLowerCase().includes('farsi'));
    if (faVoice) {
      utterance.voice = faVoice;
    }

    if (options?.onEnd) {
      utterance.onend = () => options.onEnd?.();
      utterance.onerror = () => options.onEnd?.();
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (options?.onEnd) options.onEnd();
  }
}

/**
 * Stop active speech
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Generate human speech text for Step Start
 */
export function generateStepStartSpeech(
  recipeTitle: string,
  stepNumber: number,
  stepTitle: string,
  durationMinutes: number
): string {
  const durationText = durationMinutes >= 60 
    ? `${Math.floor(durationMinutes / 60)} ساعت`
    : `${durationMinutes} دقیقه`;
  
  if (stepNumber === 1) {
    return `آشپزی آغاز شد! مرحله اول از پخت ${recipeTitle}: ${stepTitle}. زمان‌سنج برای ${durationText} فعال شد.`;
  }
  return `مرحله ${stepNumber}: ${stepTitle}. زمان‌سنج برای ${durationText} فعال گردید.`;
}

/**
 * Generate human speech text for Step Finished
 */
export function generateStepFinishedSpeech(
  stepNumber: number,
  nextStepTitle?: string
): string {
  if (nextStepTitle) {
    return `مرحله ${stepNumber} به پایان رسید! اکنون زمان مرحله بعدی است: ${nextStepTitle}.`;
  }
  return `مرحله ${stepNumber} با موفقیت به پایان رسید!`;
}

/**
 * Generate human speech text for All Steps Completed
 */
export function generateCookingCompleteSpeech(recipeTitle: string): string {
  return `تبریک! تمام مراحل پخت ${recipeTitle} با موفقیت به پایان رسید. غذای شما آماده سرو است، نوش جان!`;
}
