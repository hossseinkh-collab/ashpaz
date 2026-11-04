import React, { useState } from 'react';
import { 
  TrendingDown, TrendingUp, Plus, Trash2, Calendar, 
  Scale, Target, Award, Info, Sparkles, Droplets, ArrowDown, ArrowUp,
  Clock, AlertTriangle, CheckCircle2, Laugh, Lightbulb, RefreshCw
} from 'lucide-react';
import { 
  getWeightLogs, 
  addWeightLog, 
  deleteWeightLog, 
  getWeightStats, 
  getUserHealthProfile, 
  saveUserHealthProfile,
  getTodayWaterLog,
  updateTodayWaterLog,
  resetSampleWeightLogs,
  calculateTimedGoalPlan,
  getDietJokesAndProverbs,
  getDietFoodSuggestions,
  getMemberWeightLogs,
  addMemberWeightLog,
  deleteMemberWeightLog,
  updateFamilyMember
} from '../../services/healthService';
import { WeightLogEntry, WaterLogData, FamilyMemberProfile } from '../../types';

interface WeightTrackerViewProps {
  activeMember?: FamilyMemberProfile;
  onWeightUpdated?: () => void;
}

export const WeightTrackerView: React.FC<WeightTrackerViewProps> = ({ activeMember, onWeightUpdated }) => {
  const currentMember = activeMember;
  const [profile, setProfile] = useState(() => {
    if (currentMember) {
      return {
        gender: currentMember.gender,
        age: currentMember.age,
        heightCm: currentMember.heightCm,
        weightKg: currentMember.weightKg,
        targetWeightKg: currentMember.targetWeightKg,
        activityLevel: currentMember.activityLevel,
        goal: currentMember.goal,
        targetWeeks: currentMember.targetWeeks,
        targetDays: currentMember.targetDays || currentMember.targetWeeks * 7
      };
    }
    return getUserHealthProfile();
  });

  const [logs, setLogs] = useState<WeightLogEntry[]>(() => {
    return currentMember ? getMemberWeightLogs(currentMember.id) : getWeightLogs();
  });
  const [waterLog, setWaterLog] = useState<WaterLogData>(getTodayWaterLog());

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [inputWeight, setInputWeight] = useState<number>(() => currentMember ? currentMember.weightKg : profile.weightKg);
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [inputNote, setInputNote] = useState<string>('ناشتا اول صبح');
  const [targetWeight, setTargetWeight] = useState<number>(() => currentMember ? currentMember.targetWeightKg : (profile.targetWeightKg || 72.0));
  const [isEditingTarget, setIsEditingTarget] = useState(false);

  // Time-frame / Timed Goal Duration State
  const [targetWeeks, setTargetWeeks] = useState<number>(() => currentMember?.targetWeeks || profile.targetWeeks || 8);
  const [customDays, setCustomDays] = useState<number>(() => currentMember?.targetDays || profile.targetDays || 56);
  const [isCustomDays, setIsCustomDays] = useState<boolean>(false);

  // Sync when activeMember changes
  React.useEffect(() => {
    if (currentMember) {
      setProfile({
        gender: currentMember.gender,
        age: currentMember.age,
        heightCm: currentMember.heightCm,
        weightKg: currentMember.weightKg,
        targetWeightKg: currentMember.targetWeightKg,
        activityLevel: currentMember.activityLevel,
        goal: currentMember.goal,
        targetWeeks: currentMember.targetWeeks,
        targetDays: currentMember.targetDays || currentMember.targetWeeks * 7
      });
      const memberLogs = getMemberWeightLogs(currentMember.id);
      setLogs(memberLogs);
      setInputWeight(currentMember.weightKg);
      setTargetWeight(currentMember.targetWeightKg);
      setTargetWeeks(currentMember.targetWeeks);
      setCustomDays(currentMember.targetDays || currentMember.targetWeeks * 7);
      setSelectedPointIndex(memberLogs.length - 1);
    }
  }, [currentMember?.id, currentMember?.weightKg, currentMember?.targetWeightKg]);

  // Diet Joke Offset
  const [jokeOffset, setJokeOffset] = useState<number>(0);

  // Selected point for chart tooltip
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);

  const stats = getWeightStats(logs, targetWeight);
  const timedGoal = calculateTimedGoalPlan({
    ...profile,
    targetWeightKg: targetWeight,
    targetWeeks: isCustomDays ? undefined : targetWeeks,
    targetDays: isCustomDays ? customDays : targetWeeks * 7
  }, logs);

  const dietJoke = getDietJokesAndProverbs(timedGoal.trajectoryStatus, timedGoal.isLoss, jokeOffset);
  const foodTips = getDietFoodSuggestions(timedGoal.isLoss);

  const setDateOffset = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    setInputDate(d.toISOString().split('T')[0]);
  };

  const handleResetSample = () => {
    const seeded = resetSampleWeightLogs();
    setLogs(seeded);
    setProfile(getUserHealthProfile());
    setSelectedPointIndex(seeded.length - 1);
  };

  const totalDistance = Math.abs(stats.startWeight - targetWeight);
  const coveredDistance = Math.abs(stats.startWeight - stats.currentWeight);
  const progressPercent = totalDistance > 0 ? Math.min(100, Math.round((coveredDistance / totalDistance) * 100)) : 100;

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputWeight <= 20 || inputWeight >= 300) return;

    const updated = currentMember
      ? addMemberWeightLog(currentMember.id, inputWeight, inputDate, inputNote)
      : addWeightLog(inputWeight, inputDate, inputNote);
    setLogs(updated);
    if (currentMember) {
      setProfile(prev => ({ ...prev, weightKg: inputWeight }));
    } else {
      setProfile(getUserHealthProfile());
    }
    if (onWeightUpdated) onWeightUpdated();
    setShowAddForm(false);
    setSelectedPointIndex(updated.length - 1);
  };

  const handleDelete = (id: string) => {
    const updated = currentMember
      ? deleteMemberWeightLog(currentMember.id, id)
      : deleteWeightLog(id);
    setLogs(updated);
    if (currentMember && updated.length > 0) {
      setProfile(prev => ({ ...prev, weightKg: updated[updated.length - 1].weightKg }));
    } else {
      setProfile(getUserHealthProfile());
    }
    if (onWeightUpdated) onWeightUpdated();
    if (selectedPointIndex !== null && selectedPointIndex >= updated.length) {
      setSelectedPointIndex(null);
    }
  };

  const handleUpdateTarget = () => {
    const updated = { 
      ...profile, 
      targetWeightKg: targetWeight,
      targetWeeks: isCustomDays ? undefined : targetWeeks,
      targetDays: isCustomDays ? customDays : targetWeeks * 7
    };
    setProfile(updated);
    if (currentMember) {
      updateFamilyMember(currentMember.id, {
        targetWeightKg: targetWeight,
        targetWeeks: isCustomDays ? undefined : targetWeeks,
        targetDays: isCustomDays ? customDays : targetWeeks * 7
      });
    } else {
      saveUserHealthProfile(updated);
    }
    if (onWeightUpdated) onWeightUpdated();
    setIsEditingTarget(false);
  };

  const handleSelectDurationWeeks = (weeks: number) => {
    setIsCustomDays(false);
    setTargetWeeks(weeks);
    const updated = {
      ...profile,
      targetWeeks: weeks,
      targetDays: weeks * 7
    };
    setProfile(updated);
    saveUserHealthProfile(updated);
  };

  const handleCustomDaysChange = (days: number) => {
    setIsCustomDays(true);
    setCustomDays(days);
    const updated = {
      ...profile,
      targetWeeks: undefined,
      targetDays: days
    };
    setProfile(updated);
    saveUserHealthProfile(updated);
  };

  const handleWaterClick = (glassIndex: number) => {
    const newCount = glassIndex + 1 === waterLog.glassesCount ? glassIndex : glassIndex + 1;
    const updated = updateTodayWaterLog(newCount);
    setWaterLog(updated);
  };

  // -------------------------------------------------------------
  // SVG LINE CHART COORDINATE CALCULATIONS
  // -------------------------------------------------------------
  const chartWidth = 460;
  const chartHeight = 180;
  const paddingX = 35;
  const paddingY = 25;

  const allWeights = [
    ...logs.map(l => l.weightKg),
    targetWeight,
    timedGoal.startWeight,
    timedGoal.targetWeight
  ];
  const minW = Math.max(20, Math.floor(Math.min(...allWeights) - 1.5));
  const maxW = Math.min(250, Math.ceil(Math.max(...allWeights) + 1.5));
  const rangeW = Math.max(1, maxW - minW);

  const getX = (index: number) => {
    if (logs.length <= 1) return chartWidth / 2;
    return paddingX + (index / (logs.length - 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (weight: number) => {
    const clamped = Math.max(minW, Math.min(maxW, weight));
    const ratio = (clamped - minW) / rangeW;
    return chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
  };

  // -------------------------------------------------------------
  // MOVING-AVERAGE SMOOTHING & LINEAR REGRESSION TREND
  // -------------------------------------------------------------
  // 1. Rolling weighted moving average: mitigates day-to-day noise/water fluctuations
  const smoothWeights = logs.map((entry, i) => {
    if (logs.length <= 2) return entry.weightKg;
    const prev = i > 0 ? logs[i - 1].weightKg : entry.weightKg;
    const curr = entry.weightKg;
    const next = i < logs.length - 1 ? logs[i + 1].weightKg : entry.weightKg;
    return Number((0.25 * prev + 0.5 * curr + 0.25 * next).toFixed(2));
  });

  // 2. Linear regression trend line to compute true trajectory change
  let regressionSlope = 0;
  let regressionRatePerWeek = 0;
  if (logs.length >= 2) {
    const n = logs.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += logs[i].weightKg;
      sumXY += i * logs[i].weightKg;
      sumXX += i * i;
    }
    const denom = n * sumXX - sumX * sumX;
    if (denom !== 0) {
      regressionSlope = (n * sumXY - sumX * sumY) / denom;
      regressionRatePerWeek = Number((regressionSlope * 7).toFixed(2));
    }
  }

  // 3. Mathematical cubic Bezier path for silky smooth curve
  const createSmoothCurvePath = (pts: { x: number; y: number }[]): string => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
    if (pts.length === 2) return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y}`;

    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];

      const tension = 0.22;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  };

  // Raw data points (for interaction circles)
  const points = logs.map((l, idx) => ({
    x: getX(idx),
    y: getY(l.weightKg),
    entry: l
  }));

  // Smoothed trend points (for the smooth line)
  const smoothedTrendPoints = logs.map((l, idx) => ({
    x: getX(idx),
    y: getY(smoothWeights[idx])
  }));

  const smoothCurvePath = createSmoothCurvePath(smoothedTrendPoints);

  // Area path for gradient fill under the smooth trend curve
  const smoothAreaPath = smoothedTrendPoints.length > 0
    ? `${smoothCurvePath} L ${smoothedTrendPoints[smoothedTrendPoints.length - 1].x},${chartHeight - paddingY} L ${smoothedTrendPoints[0].x},${chartHeight - paddingY} Z`
    : '';

  const targetLineY = getY(targetWeight);

  // Trajectory start point & target point
  const trajectoryStartX = paddingX;
  const trajectoryStartY = getY(timedGoal.startWeight);
  const trajectoryEndX = chartWidth - paddingX;
  const trajectoryEndY = getY(timedGoal.targetWeight);

  const activeEntry = selectedPointIndex !== null && points[selectedPointIndex]
    ? points[selectedPointIndex].entry
    : points[points.length - 1]?.entry;

  return (
    <div className="space-y-4">
      {/* Weight Hero & Target Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>نمودار زمانی و خط سیر وزن مطلوب</span>
              </h2>
              <p className="text-[11px] text-slate-400">ثبت روزانه وزن و مقایسه با روند هدف</p>
            </div>
          </div>

          <button
            onClick={() => {
              setInputWeight(stats.currentWeight || profile.weightKg);
              setInputDate(new Date().toISOString().split('T')[0]);
              setShowAddForm(true);
            }}
            className="flex items-center gap-1 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-full shadow-md active:scale-95 transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>ثبت وزن امروز</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-mono">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">وزن فعلی</span>
            <span className="text-sm font-black text-amber-400">{stats.currentWeight}</span>
            <span className="text-[9px] text-slate-500 font-sans block">کیلوگرم</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">کل تغییر</span>
            <span className={`text-sm font-black flex items-center justify-center gap-0.5 ${
              stats.totalChange < 0 ? 'text-emerald-400' : stats.totalChange > 0 ? 'text-rose-400' : 'text-slate-300'
            }`}>
              {stats.totalChange > 0 ? '+' : ''}{stats.totalChange}
            </span>
            <span className="text-[9px] text-slate-500 font-sans block">کیلوگرم</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">وزن هدف</span>
            {isEditingTarget ? (
              <div className="flex items-center gap-1 justify-center mt-0.5">
                <input
                  type="number"
                  step="0.5"
                  value={targetWeight}
                  onChange={e => setTargetWeight(Number(e.target.value))}
                  className="w-12 text-center text-xs bg-slate-800 text-amber-400 rounded border border-amber-400/50 py-0.5"
                />
                <button
                  onClick={handleUpdateTarget}
                  className="text-[10px] bg-amber-400 text-slate-950 px-1 rounded font-bold"
                >
                  ✓
                </button>
              </div>
            ) : (
              <span
                onClick={() => setIsEditingTarget(true)}
                className="text-sm font-black text-emerald-400 cursor-pointer hover:underline block"
                title="کلیک برای ویرایش هدف"
              >
                {targetWeight}
              </span>
            )}
            <span className="text-[9px] text-slate-500 font-sans block">کیلوگرم</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-sans block">تا هدف</span>
            <span className="text-sm font-black text-sky-400">
              {stats.diffFromTarget > 0 ? `-${stats.diffFromTarget}` : `${Math.abs(stats.diffFromTarget)}+`}
            </span>
            <span className="text-[9px] text-slate-500 font-sans block">کیلوگرم</span>
          </div>
        </div>

        {/* Goal Progress Bar */}
        <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">میزان پیشرفت به سمت وزن هدف ({targetWeight} kg):</span>
            <span className="font-mono font-bold text-amber-400">{progressPercent}٪</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-l from-amber-400 via-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/20"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
            <span>شروع: {stats.startWeight} kg</span>
            <span>کمترین: {stats.minWeight} kg</span>
            <span>بیشترین: {stats.maxWeight} kg</span>
          </div>
        </div>
      </div>

      {/* TIMED GOAL ENQUIRY & CALORIE CHAIN CARD (استعلام زمان و زنجیره کالری) */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200">استعلام زمان رسیدن به وزن هدف و تنظیم کالری</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {timedGoal.targetDays} روز باقیمانده
          </span>
        </div>

        {/* Duration Selection Chips */}
        <div>
          <label className="text-[11px] text-slate-400 block mb-1.5">
            می‌خواهید در چه مدت به وزن هدف ({targetWeight} کیلوگرم) برسید؟
          </label>
          <div className="grid grid-cols-4 gap-1.5 text-[11px]">
            {[
              { weeks: 4, label: '۴ هفته' },
              { weeks: 8, label: '۸ هفته' },
              { weeks: 12, label: '۱۲ هفته' },
              { weeks: 24, label: '۶ ماه' }
            ].map(item => (
              <button
                key={item.weeks}
                type="button"
                onClick={() => handleSelectDurationWeeks(item.weeks)}
                className={`py-2 px-1.5 rounded-xl border text-center font-bold transition active:scale-95 ${
                  !isCustomDays && targetWeeks === item.weeks
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 text-[11px]">یا تعداد روز دلخواه:</span>
            <input
              type="number"
              min="14"
              max="365"
              value={customDays}
              onChange={e => handleCustomDaysChange(Math.max(14, Number(e.target.value)))}
              className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-center text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-400"
            />
            <span className="text-slate-400 text-[11px]">روز</span>
          </div>
        </div>

        {/* Calorie Chain Computation Box */}
        <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">نیاز روزانه (TDEE)</span>
              <span className="text-xs font-bold text-slate-200">{timedGoal.tdeeCalories}</span>
              <span className="text-[9px] text-slate-500 font-sans block">کیلوکالری</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">تفاضل روزانه</span>
              <span className={`text-xs font-bold ${timedGoal.isLoss ? 'text-emerald-400' : 'text-sky-400'}`}>
                {timedGoal.isLoss ? `-${timedGoal.dailyCalorieDelta}` : `+${timedGoal.dailyCalorieDelta}`}
              </span>
              <span className="text-[9px] text-slate-500 font-sans block">کیلوکالری/روز</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-900 border border-emerald-500/30 bg-emerald-500/5">
              <span className="text-[10px] text-emerald-400 font-sans block">کالری مجاز روزانه</span>
              <span className="text-sm font-black text-emerald-300">{timedGoal.targetDailyCalories}</span>
              <span className="text-[9px] text-slate-500 font-sans block">کیلوکالری</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
            <span>سرعت تخمینی تغییر:</span>
            <span className="font-mono font-bold text-amber-300">
              {timedGoal.ratePerWeekKg} کیلوگرم در هفته
            </span>
          </div>

          {!timedGoal.isSafeRate && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">هشدار ایمنی پزشکی و تغذیه:</span>
                کاهش وزن بیش از ۱ کیلوگرم در هفته ممکن است باعث تحلیل عضلانی و افت متابولیسم شود. کف کالری ایمن ({timedGoal.safeFloorCalories} کیلوکالری) لحاظ شد. مدت زمان واقع‌بینانه پیشنهادی: {timedGoal.safeRealisticDays} روز.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INTERACTIVE SVG LINE CHART WITH TRAJECTORY LINE */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-slate-200">نمودار زمانی و خط سیر مطلوب (Goal Trajectory)</h3>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            {regressionRatePerWeek !== 0 && (
              <span className={`px-2 py-0.5 rounded-full font-mono font-bold ${
                regressionRatePerWeek < 0 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                روند: {regressionRatePerWeek > 0 ? `+${regressionRatePerWeek}` : regressionRatePerWeek} kg/هفته
              </span>
            )}
            <span className="text-slate-400 font-mono">
              {logs.length} رکورد
            </span>
          </div>
        </div>

        {/* Smooth Trend Explanation Note */}
        <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-[10px] text-amber-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full bg-amber-400 inline-block" />
            <span>خط طلایی هموار: روند میانگین‌گیری متحرک وزن (حذف نوسانات موقت آب بدن)</span>
          </span>
          <span className="text-slate-400 text-[9px]">نقطه‌ها: ثبت‌های واقعی</span>
        </div>

        {/* Selected Data Point Highlight Banner */}
        {activeEntry && (
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 font-sans ml-1">تاریخ:</span>
              <span className="text-slate-200">{activeEntry.date}</span>
              {activeEntry.note && (
                <span className="text-[10px] text-amber-300 font-sans mr-2">({activeEntry.note})</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-sm">{activeEntry.weightKg} kg</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                BMI: {activeEntry.bmi}
              </span>
            </div>
          </div>
        )}

        {/* SVG Canvas */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800/80 pt-2 pb-1">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-48 select-none"
          >
            <defs>
              <linearGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
              <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#f59e0b" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Grid horizontal lines */}
            {[minW + rangeW * 0.25, minW + rangeW * 0.5, minW + rangeW * 0.75].map((gw, idx) => {
              const gy = getY(gw);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={gy}
                    x2={chartWidth - paddingX}
                    y2={gy}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 6}
                    y={gy + 3}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {gw.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* IDEAL TRAJECTORY GOAL LINE (خط سیر مطلوب از شروع تا هدف) */}
            <g>
              <line
                x1={trajectoryStartX}
                y1={trajectoryStartY}
                x2={trajectoryEndX}
                y2={trajectoryEndY}
                stroke="#10b981"
                strokeDasharray="5 4"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <text
                x={trajectoryEndX - 10}
                y={trajectoryEndY - 8}
                fill="#10b981"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
                textAnchor="end"
              >
                خط سیر مطلوب 🎯
              </text>
            </g>

            {/* Target Weight Horizontal Line (Dashed Slate) */}
            {targetWeight >= minW && targetWeight <= maxW && (
              <g>
                <line
                  x1={paddingX}
                  y1={targetLineY}
                  x2={chartWidth - paddingX}
                  y2={targetLineY}
                  stroke="#059669"
                  strokeDasharray="2 3"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </g>
            )}

            {/* Area Fill for smooth trend */}
            {smoothAreaPath && (
              <path
                d={smoothAreaPath}
                fill="url(#weightAreaGrad)"
              />
            )}

            {/* Smooth Trend Curve Line (خط پیوسته هموار بر اساس میانگین‌گیری و روند واقعی کاهش/افزایش وزن) */}
            {smoothCurvePath && (
              <path
                d={smoothCurvePath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#shadowGlow)"
              />
            )}

            {/* Data Points */}
            {points.map((p, idx) => {
              const isSelected = selectedPointIndex === idx || (selectedPointIndex === null && idx === points.length - 1);
              return (
                <g
                  key={p.entry.id}
                  onClick={() => setSelectedPointIndex(idx)}
                  className="cursor-pointer transition-all duration-150"
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected ? 6 : 3.5}
                    fill={isSelected ? '#f59e0b' : '#0f172a'}
                    stroke={isSelected ? '#ffffff' : '#f59e0b'}
                    strokeWidth={isSelected ? 2.5 : 2}
                  />
                  {isSelected && (
                    <text
                      x={p.x}
                      y={p.y - 10}
                      fill="#fef08a"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {p.entry.weightKg}
                    </text>
                  )}
                </g>
              );
            })}

            {/* X-Axis Dates Labels */}
            {points.map((p, idx) => {
              if (idx === 0 || idx === points.length - 1 || idx % Math.ceil(points.length / 5) === 0) {
                const shortDate = p.entry.date.split('-').slice(1).join('/');
                return (
                  <text
                    key={'lbl-' + p.entry.id}
                    x={p.x}
                    y={chartHeight - 6}
                    fill="#94a3b8"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {shortDate}
                  </text>
                );
              }
              return null;
            })}
          </svg>
        </div>

        {/* Trajectory Status Comparison Badge (مقایسه روند واقعی با مطلوب) */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
          timedGoal.trajectoryStatus === 'ahead'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : timedGoal.trajectoryStatus === 'on_track'
            ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <div>
              <span className="font-bold block">وضعیت در مقایسه با خط سیر مطلوب:</span>
              <span>{timedGoal.trajectoryStatusFa}</span>
            </div>
          </div>
          <div className="text-left font-mono text-[11px]">
            <span className="block text-slate-400">وزن واقعی: {stats.currentWeight} kg</span>
            <span className="block text-slate-300 font-bold">هدف امروز: {timedGoal.expectedTodayWeight} kg</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-400 inline-block rounded" />
            <span>روند واقعی وزن</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-400 inline-block border-t border-dashed border-emerald-400" />
            <span>خط سیر مطلوب هدف</span>
          </div>
        </div>
      </div>

      {/* DIET COMPANION: WITTY JOKES & PROVERBS (همراه طناز رژیم و پیام روزانه) */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Laugh className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200">همراه طناز رژیم و ضرب‌المثل روزانه</h3>
          </div>
          <button
            type="button"
            onClick={() => setJokeOffset(prev => prev + 1)}
            className="flex items-center gap-1 text-[10px] text-indigo-300 hover:text-indigo-200 bg-indigo-500/15 border border-indigo-500/30 px-2 py-1 rounded-full transition active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            <span>یه شوخی دیگه بگو 🎭</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {dietJoke.tag}
            </span>
            <span className="text-[10px] text-slate-500">طنز متناسب با وضعیت فعلی</span>
          </div>
          <p className="text-xs text-slate-100 leading-relaxed font-medium">
            «{dietJoke.joke}»
          </p>
          <div className="pt-1 border-t border-slate-800/80 text-[11px] text-amber-300/90 italic">
            📖 <span className="font-bold">ضرب‌المثل:</span> {dietJoke.proverb}
          </div>
        </div>
      </div>

      {/* PRACTICAL DIET FOOD SUGGESTIONS (پیشنهادات عملی کاهش یا افزایش وزن) */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-slate-200">
            {timedGoal.isLoss ? 'پیشنهادات طلایی سرآشپز برای کاهش وزن مؤثر' : 'پیشنهادات طلایی سرآشپز برای افزایش وزن و حجم سالم'}
          </h3>
        </div>

        <div className="space-y-2">
          {foodTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
            >
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DAILY WATER INTAKE TRACKER (هیدراتاسیون روزانه) */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-slate-200">میزان مصرف آب روزانه (هیدراتاسیون)</h3>
          </div>
          <span className="font-mono text-sky-400 font-bold">
            {waterLog.glassesCount * 250} / {waterLog.targetGlasses * 250} میلی‌لیتر
          </span>
        </div>

        {/* 8 Interactive Water Glasses */}
        <div className="grid grid-cols-8 gap-1.5 pt-1">
          {Array.from({ length: waterLog.targetGlasses }).map((_, i) => {
            const isFilled = i < waterLog.glassesCount;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleWaterClick(i)}
                className={`py-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
                  isFilled
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm shadow-sky-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                }`}
              >
                <Droplets className={`w-4 h-4 ${isFilled ? 'fill-sky-400 text-sky-400' : ''}`} />
                <span className="text-[9px] mt-1 font-mono">{i + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
          <span>هدف: ۸ لیوان (۲ لیتر در روز)</span>
          <span className="text-sky-300 font-medium">
            {waterLog.glassesCount >= waterLog.targetGlasses ? '🎉 هدف امروز تکمیل شد!' : `${waterLog.targetGlasses - waterLog.glassesCount} لیوان تا هدف`}
          </span>
        </div>
      </div>

      {/* Add Weight Entry Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>ثبت وزن جدید در تقویم</span>
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWeight} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">انتخاب سریع تاریخ:</label>
                <div className="grid grid-cols-3 gap-1 mb-2 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setDateOffset(0)}
                    className="py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-amber-400/50"
                  >
                    امروز
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateOffset(1)}
                    className="py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-amber-400/50"
                  >
                    دیروز
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateOffset(2)}
                    className="py-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-amber-400/50"
                  >
                    ۲ روز پیش
                  </button>
                </div>
                <input
                  type="date"
                  value={inputDate}
                  onChange={e => setInputDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">مقدار وزن (کیلوگرم):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="30"
                    max="250"
                    value={inputWeight}
                    onChange={e => setInputWeight(Number(e.target.value))}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-amber-400 font-mono font-bold text-base focus:border-amber-400 focus:outline-none"
                  />
                  <span className="text-slate-400 text-xs">kg</span>
                </div>

                <div className="grid grid-cols-5 gap-1 mt-2 text-[11px] font-mono">
                  {[-1.0, -0.5, 0, +0.5, +1.0].map(step => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setInputWeight(prev => Number((prev + step).toFixed(1)))}
                      className="py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      {step > 0 ? `+${step}` : step}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">یادداشت وضعیت (اختیاری):</label>
                <div className="grid grid-cols-3 gap-1 mb-2 text-[10px]">
                  {['ناشتا اول صبح', 'بعد از ورزش', 'قبل از خواب'].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setInputNote(n)}
                      className={`py-1 rounded-lg border text-center transition ${
                        inputNote === n ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold' : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={inputNote}
                  onChange={e => setInputNote(e.target.value)}
                  placeholder="مثلاً: ناشتا بعد از دویدن"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition shadow-md"
                >
                  ذخیره و ثبت در نمودار
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Log Table */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>تاریخچه اندازه‌گیری‌های وزن</span>
          </h3>
          <button
            type="button"
            onClick={handleResetSample}
            className="text-[10px] text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-400/50 px-2 py-1 rounded-lg transition"
            title="بارگذاری مجدد نمونه ۱۰ روزه برای تست نمودار"
          >
            بارگذاری داده‌های نمونه
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
          {[...logs].reverse().map((entry, idx) => {
            const nextInReverse = [...logs].reverse()[idx + 1];
            const diff = nextInReverse ? Number((entry.weightKg - nextInReverse.weightKg).toFixed(1)) : 0;

            return (
              <div
                key={entry.id}
                className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-mono font-bold text-amber-400 text-xs shrink-0">
                    {entry.date.split('-')[2]}
                  </div>
                  <div>
                    <span className="font-mono text-slate-300 font-bold block">{entry.date}</span>
                    <span className="text-[10px] text-slate-500 block">{entry.note || 'ثبت وزن'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left font-mono">
                    <span className="font-bold text-white text-sm">{entry.weightKg} kg</span>
                    {diff !== 0 && (
                      <span className={`text-[10px] block font-bold ${diff < 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {diff > 0 ? `+${diff}` : diff} kg
                      </span>
                    )}
                  </div>

                  {logs.length > 1 && (
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="حذف این رکورد"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
