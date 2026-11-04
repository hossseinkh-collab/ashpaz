import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Play, Pause, RotateCcw, 
  Lightbulb, CheckCircle2, Clock, Volume2, VolumeX, Sparkles,
  Mic, MicOff, Plus, Minus, ArrowRight, Bell, Zap
} from 'lucide-react';
import { Recipe, RecipeStep } from '../../types';
import { 
  playStartSound, 
  playStepCompleteSound, 
  playAllCompleteSound, 
  playTickSound,
  speakPersianAnnouncement, 
  stopSpeech,
  generateStepStartSpeech, 
  generateStepFinishedSpeech, 
  generateCookingCompleteSpeech,
  getTimerAudioSettings,
  saveTimerAudioSettings,
  TimerAudioSettings
} from '../../services/audioTimerService';

interface CookingModeModalProps {
  recipe: Recipe;
  servings: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  servings,
  isOpen,
  onClose
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);
  const [audioSettings, setAudioSettings] = useState<TimerAudioSettings>(getTimerAudioSettings());
  const [activeSpeechCaption, setActiveSpeechCaption] = useState<string>('');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);

  const autoAdvanceTimerRef = useRef<any>(null);
  const targetEndTimestampRef = useRef<number | null>(null);
  const hasFiredCompletionRef = useRef<boolean>(false);
  const lastTickedSecondRef = useRef<number | null>(null);

  const step: RecipeStep | undefined = recipe.steps[currentStepIdx];

  // Helper: Extract or fallback duration in minutes for a step
  const getStepDurationMinutes = (s: RecipeStep): number => {
    if (s.durationMinutes && s.durationMinutes > 0) return s.durationMinutes;
    // Smart regex parser from instruction text (e.g. "۱۵ دقیقه", "20 دقیقه", "۱ ساعت")
    const matchMins = s.instruction.match(/(\d+|[۰-۹]+)\s*دقیقه/);
    if (matchMins) {
      const parsed = parseInt(matchMins[1].replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()), 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    const matchHours = s.instruction.match(/(\d+|[۰-۹]+)\s*ساعت/);
    if (matchHours) {
      const parsed = parseInt(matchHours[1].replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()), 10);
      if (!isNaN(parsed) && parsed > 0) return parsed * 60;
    }
    return 10; // sensible default 10 minutes for cooking steps
  };

  const stepDurationMinutes = step ? getStepDurationMinutes(step) : 10;

  // Initialize step timer when step changes
  useEffect(() => {
    if (!step) return;
    const durSec = stepDurationMinutes * 60;
    setTimeLeftSeconds(durSec);
    setIsTimerRunning(false);
    targetEndTimestampRef.current = null;
    hasFiredCompletionRef.current = false;
    lastTickedSecondRef.current = null;
    setAutoAdvanceCountdown(null);

    // Initial voice instruction preview for the step
    const caption = `مرحله ${step.stepNumber}: ${step.title} (${stepDurationMinutes} دقیقه)`;
    setActiveSpeechCaption(caption);

    return () => {
      stopSpeech();
      if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
    };
  }, [currentStepIdx, recipe]);

  // Main drift-free countdown timer effect using absolute target timestamp
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      if (!targetEndTimestampRef.current) return;
      const now = Date.now();
      const diffMs = targetEndTimestampRef.current - now;
      const remainingSec = Math.max(0, Math.ceil(diffMs / 1000));

      setTimeLeftSeconds(remainingSec);

      // Warning ticks in last 5 seconds (fired strictly once per integer second)
      if (remainingSec <= 5 && remainingSec > 0 && lastTickedSecondRef.current !== remainingSec) {
        lastTickedSecondRef.current = remainingSec;
        if (audioSettings.soundEnabled) {
          playTickSound(audioSettings.volume);
        }
      }

      if (remainingSec === 0) {
        if (!hasFiredCompletionRef.current) {
          hasFiredCompletionRef.current = true;
          targetEndTimestampRef.current = null;
          handleStepFinished();
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isTimerRunning, audioSettings, currentStepIdx, recipe]);

  // Screen sleep & background tab resume handler via visibilitychange
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isTimerRunning && targetEndTimestampRef.current) {
        const diffMs = targetEndTimestampRef.current - Date.now();
        const rem = Math.max(0, Math.ceil(diffMs / 1000));
        setTimeLeftSeconds(rem);
        if (rem === 0 && !hasFiredCompletionRef.current) {
          hasFiredCompletionRef.current = true;
          targetEndTimestampRef.current = null;
          handleStepFinished();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isTimerRunning, recipe, currentStepIdx, audioSettings]);

  // Trigger when current step countdown hits 0
  const handleStepFinished = () => {
    setIsTimerRunning(false);
    targetEndTimestampRef.current = null;
    const nextIdx = currentStepIdx + 1;
    const isLast = nextIdx >= recipe.steps.length;

    // Mark step completed
    setCompletedSteps(prev => Array.from(new Set([...prev, currentStepIdx])));

    if (isLast) {
      // Entire Recipe Finished!
      if (audioSettings.soundEnabled) {
        playAllCompleteSound(audioSettings.volume);
      }
      const finishSpeech = generateCookingCompleteSpeech(recipe.title);
      setActiveSpeechCaption(finishSpeech);
      if (audioSettings.speechEnabled) {
        speakPersianAnnouncement(finishSpeech, {
          rate: audioSettings.speechRate,
          volume: audioSettings.volume
        });
      }
    } else {
      // Step Completed!
      if (audioSettings.soundEnabled) {
        playStepCompleteSound(audioSettings.volume);
      }
      const nextStep = recipe.steps[nextIdx];
      const finishedSpeech = generateStepFinishedSpeech(step ? step.stepNumber : 1, nextStep?.title);
      setActiveSpeechCaption(finishedSpeech);

      if (audioSettings.speechEnabled) {
        speakPersianAnnouncement(finishedSpeech, {
          rate: audioSettings.speechRate,
          volume: audioSettings.volume
        });
      }

      // Auto-advance to next step if enabled
      if (audioSettings.autoAdvanceEnabled) {
        setAutoAdvanceCountdown(5); // 5 second countdown before auto-start
      }
    }
  };

  // Auto-advance countdown effect (5, 4, 3, 2, 1 -> next step!)
  useEffect(() => {
    if (autoAdvanceCountdown === null) return;
    if (autoAdvanceCountdown > 0) {
      const timer = setTimeout(() => {
        setAutoAdvanceCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoAdvanceCountdown === 0) {
      // Switch to next step and auto-start
      setAutoAdvanceCountdown(null);
      if (currentStepIdx < recipe.steps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);
        // Start next step timer automatically
        setTimeout(() => {
          handleStartTimer(nextIdx);
        }, 400);
      }
    }
  }, [autoAdvanceCountdown, currentStepIdx, recipe]);

  const handleStartTimer = (targetIdx = currentStepIdx) => {
    const targetStep = recipe.steps[targetIdx];
    if (!targetStep) return;

    hasFiredCompletionRef.current = false;
    lastTickedSecondRef.current = null;
    const remaining = timeLeftSeconds > 0 ? timeLeftSeconds : getStepDurationMinutes(targetStep) * 60;
    targetEndTimestampRef.current = Date.now() + remaining * 1000;

    setIsTimerRunning(true);
    setAutoAdvanceCountdown(null);

    // Play start sound
    if (audioSettings.soundEnabled) {
      playStartSound(audioSettings.volume);
    }

    // Persian human speech announcement
    const durMins = getStepDurationMinutes(targetStep);
    const startSpeech = generateStepStartSpeech(recipe.title, targetStep.stepNumber, targetStep.title, durMins);
    setActiveSpeechCaption(startSpeech);

    if (audioSettings.speechEnabled) {
      speakPersianAnnouncement(startSpeech, {
        rate: audioSettings.speechRate,
        volume: audioSettings.volume
      });
    }
  };

  const handlePauseTimer = () => {
    if (targetEndTimestampRef.current) {
      const remainingMs = Math.max(0, targetEndTimestampRef.current - Date.now());
      setTimeLeftSeconds(Math.ceil(remainingMs / 1000));
    }
    targetEndTimestampRef.current = null;
    setIsTimerRunning(false);
    stopSpeech();
    setActiveSpeechCaption('تایمر موقتاً متوقف شد.');
  };

  const handleResetTimer = () => {
    targetEndTimestampRef.current = null;
    hasFiredCompletionRef.current = false;
    lastTickedSecondRef.current = null;
    setIsTimerRunning(false);
    setAutoAdvanceCountdown(null);
    stopSpeech();
    setTimeLeftSeconds(stepDurationMinutes * 60);
    setActiveSpeechCaption(`زمان مرحله بازنشانی شد (${stepDurationMinutes} دقیقه).`);
  };

  const handleAdjustTime = (deltaSeconds: number) => {
    setTimeLeftSeconds(prev => {
      const updated = Math.max(10, prev + deltaSeconds);
      if (isTimerRunning) {
        targetEndTimestampRef.current = Date.now() + updated * 1000;
      }
      return updated;
    });
  };

  const handleReplaySpeech = () => {
    const textToSpeak = activeSpeechCaption || step.instruction;
    speakPersianAnnouncement(textToSpeak, {
      rate: audioSettings.speechRate,
      volume: audioSettings.volume
    });
  };

  const handleNext = () => {
    setAutoAdvanceCountdown(null);
    stopSpeech();
    if (!completedSteps.includes(currentStepIdx)) {
      setCompletedSteps(prev => [...prev, currentStepIdx]);
    }
    if (currentStepIdx < recipe.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setAutoAdvanceCountdown(null);
    stopSpeech();
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const toggleSound = () => {
    const updated = { ...audioSettings, soundEnabled: !audioSettings.soundEnabled };
    setAudioSettings(updated);
    saveTimerAudioSettings(updated);
  };

  const toggleSpeech = () => {
    const updated = { ...audioSettings, speechEnabled: !audioSettings.speechEnabled };
    if (!updated.speechEnabled) stopSpeech();
    setAudioSettings(updated);
    saveTimerAudioSettings(updated);
  };

  const toggleAutoAdvance = () => {
    const updated = { ...audioSettings, autoAdvanceEnabled: !audioSettings.autoAdvanceEnabled };
    setAudioSettings(updated);
    saveTimerAudioSettings(updated);
  };

  if (!isOpen || !step) return null;

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLastStep = currentStepIdx === recipe.steps.length - 1;
  const progressPercent = Math.round(((completedSteps.length) / recipe.steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 p-4 font-['Vazirmatn',sans-serif] overflow-y-auto">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center gap-1 shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            تایمر خودکار گام‌به‌گام
          </span>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[150px]">
            {recipe.title}
          </span>
        </div>

        {/* Quick Audio & Exit Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-xl transition ${
              audioSettings.speechEnabled 
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                : 'bg-slate-800 text-slate-500'
            }`}
            title={audioSettings.speechEnabled ? 'گفتار صوتی فعال است' : 'گفتار صوتی غیرفعال است'}
          >
            {audioSettings.speechEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl transition ${
              audioSettings.soundEnabled 
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                : 'bg-slate-800 text-slate-500'
            }`}
            title={audioSettings.soundEnabled ? 'افکت‌های صوتی فعال است' : 'افکت‌های صوتی بی‌صداست'}
          >
            {audioSettings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="خروج از حالت پخت"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress & Auto-advance Bar */}
      <div className="pt-3 pb-1 max-w-md mx-auto w-full space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>پیشرفت پخت: {progressPercent}٪</span>
          <button 
            onClick={toggleAutoAdvance}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition ${
              audioSettings.autoAdvanceEnabled 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <span>انتقال خودکار به مرحله بعد:</span>
            <span>{audioSettings.autoAdvanceEnabled ? 'فعال' : 'خاموش'}</span>
          </button>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          {recipe.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStepIdx
                  ? 'w-9 bg-amber-400 shadow-sm shadow-amber-400/50'
                  : completedSteps.includes(idx)
                  ? 'w-2 bg-emerald-400'
                  : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auto-Advance Notification Banner (if counting down) */}
      {autoAdvanceCountdown !== null && (
        <div className="max-w-md mx-auto w-full my-2 p-3 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-400/40 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>مرحله قبل تمام شد! انتقال خودکار به مرحله بعدی تا {autoAdvanceCountdown} ثانیه دیگر...</span>
          </div>
          <button
            onClick={() => setAutoAdvanceCountdown(null)}
            className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
          >
            توقف
          </button>
        </div>
      )}

      {/* Main Step Display */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-4 my-auto">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono font-bold text-amber-400 px-3 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 inline-block">
            مرحله {step.stepNumber} از {recipe.steps.length} • {stepDurationMinutes} دقیقه
          </span>
          <h2 className="text-lg font-bold text-white">{step.title}</h2>
        </div>

        {/* Human Voice Assistant Caption Card */}
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-400/30 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-xs text-amber-200/90 leading-relaxed">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[10px] text-amber-400">گفتار صوتی سرآشپز:</span>
              <button
                onClick={handleReplaySpeech}
                className="text-[10px] text-amber-300 underline hover:text-amber-100 flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" />
                <span>پخش دوباره</span>
              </button>
            </div>
            <p className="font-sans text-[11px]">{activeSpeechCaption || step.instruction}</p>
          </div>
        </div>

        {/* Instruction Card */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-sm leading-relaxed text-slate-200 shadow-xl space-y-3">
          <p>{step.instruction}</p>

          {step.proTip && (
            <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-2 text-xs text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>نکته طلایی سرآشپز:</strong> {step.proTip}</span>
            </div>
          )}
        </div>

        {/* Step Digital Timer Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>زمان‌سنج مرحله:</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              کل مرحله: {stepDurationMinutes} دقیقه
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Quick Adjust Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleAdjustTime(-60)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold transition"
                title="کاهش یک دقیقه"
              >
                -۱
              </button>
              <button
                onClick={() => handleAdjustTime(60)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold transition"
                title="افزایش یک دقیقه"
              >
                +۱
              </button>
              <button
                onClick={() => handleAdjustTime(300)}
                className="px-2 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center justify-center text-[11px] font-bold transition"
                title="افزایش ۵ دقیقه"
              >
                +۵دقیقه
              </button>
            </div>

            {/* Giant Countdown Clock */}
            <span className="font-mono text-3xl font-black text-amber-400 tracking-wider">
              {formatTimer(timeLeftSeconds)}
            </span>

            {/* Play/Pause & Reset Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={isTimerRunning ? handlePauseTimer : () => handleStartTimer()}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition ${
                  isTimerRunning 
                    ? 'bg-amber-400 text-slate-950 shadow-amber-400/20' 
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
                }`}
                title={isTimerRunning ? 'توقف زمان‌سنج' : 'شروع زمان‌سنج مرحله'}
              >
                {isTimerRunning ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleResetTimer}
                className="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition"
                title="شروع مجدد زمان این مرحله"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 max-w-md mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentStepIdx === 0}
          className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold transition ${
            currentStepIdx === 0
              ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>مرحله قبل</span>
        </button>

        <button
          onClick={isLastStep ? () => { stopSpeech(); onClose(); } : handleNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition"
        >
          {isLastStep ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>پایان پخت و بستن</span>
            </>
          ) : (
            <>
              <span>مرحله بعد</span>
              <ChevronLeft className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
