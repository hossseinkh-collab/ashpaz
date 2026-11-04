import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RefreshCw, Flame, Scale, Clock, Activity, 
  CheckCircle2, ChevronRight, ChevronLeft, Utensils, 
  Calendar, Award, AlertTriangle, ArrowDown, ArrowUp, Info,
  Coffee, Sun, Moon, ChefHat, Heart, Download, Image as ImageIcon,
  Share2, Eye, X, Check, Loader2
} from 'lucide-react';
import { 
  FamilyMemberProfile, 
  PersonalizedDietReport, 
  DietDayPlan, 
  DietMealItem 
} from '../../types';
import { 
  calculateMemberDietPlan, 
  regenerateSingleDietDay 
} from '../../services/healthService';
import { generateWeeklyPlanImage } from '../../services/weeklyPosterService';

interface PersonalizedDietViewProps {
  member: FamilyMemberProfile;
  onOpenRecipe?: (id: string) => void;
}

export const PersonalizedDietView: React.FC<PersonalizedDietViewProps> = ({ member, onOpenRecipe }) => {
  const [report, setReport] = useState<PersonalizedDietReport>(() => calculateMemberDietPlan(member));
  const [selectedDayKey, setSelectedDayKey] = useState<string>('sat');
  const [regeneratingDayKey, setRegeneratingDayKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterImageUrl, setPosterImageUrl] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Recalculate if member props change
  useEffect(() => {
    const updated = calculateMemberDietPlan(member);
    setReport(updated);
  }, [member.weightKg, member.targetWeightKg, member.activityLevel, member.goal, member.targetWeeks, member.heightCm]);

  const activeDay = report.days.find(d => d.dayKey === selectedDayKey) || report.days[0];

  const handleRegenerateEntirePlan = () => {
    const refreshed = calculateMemberDietPlan(member, true);
    setReport(refreshed);
    setSuccessMsg('کل برنامه ۷ روزه با گزینه‌های جدید بازتولید شد.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleRegenerateDay = (dayKey: string) => {
    setRegeneratingDayKey(dayKey);
    setTimeout(() => {
      const newDay = regenerateSingleDietDay(member.id, dayKey, report.targetDailyCalories);
      setReport(prev => ({
        ...prev,
        days: prev.days.map(d => (d.dayKey === dayKey ? newDay : d))
      }));
      setRegeneratingDayKey(null);
      setSuccessMsg(`سه وعده جدید برای روز «${newDay.dayTitleFa}» با همان کالری هدف جایگزین شد.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 350);
  };

  const handleExportPoster = async () => {
    try {
      setIsGeneratingPoster(true);
      const dataUrl = await generateWeeklyPlanImage({
        member,
        dietReport: report
      });
      setPosterImageUrl(dataUrl);
    } catch (err: any) {
      alert('خطا در تولید تصویر برنامه هفتگی: ' + (err?.message || 'نامشخص'));
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  const handleDownloadPoster = () => {
    if (!posterImageUrl) return;
    const a = document.createElement('a');
    a.href = posterImageUrl;
    a.download = `barnameh-haftegi-${member.name || 'smart-chef'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setCopiedNotice('تصویر یکپارچه برنامه هفتگی با موفقیت ذخیره شد.');
    setTimeout(() => setCopiedNotice(null), 3500);
  };

  const handleSharePoster = async () => {
    if (!posterImageUrl) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        const res = await fetch(posterImageUrl);
        const blob = await res.blob();
        const file = new File([blob], `barnameh-haftegi-${member.name}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `برنامه غذایی هفتگی ${member.name}`,
            text: `برنامه جامع غذایی و رژیم ۷ روزه در سرآشپز هوشمند`,
            files: [file]
          });
          return;
        }
      }
      handleDownloadPoster();
    } catch {
      handleDownloadPoster();
    }
  };

  return (
    <div className="space-y-4">
      {/* 5-Step Logic Transparent Breakdown Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-100">
                رژیم اختصاصی ۳ وعده برای {report.memberName}
              </h3>
              <span className="text-[10px] text-slate-400">محاسبه دقیق بر حسب قاشق و پیمانه دستی</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegenerateEntirePlan}
            className="flex items-center gap-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-xl transition active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            <span>بازتولید کل رژیم</span>
          </button>
        </div>

        {/* 4 Calculation Steps Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Step 1: Weight Difference */}
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>۱. اختلاف وزن با هدف</span>
              <Scale className="w-3 h-3 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-base font-black ${report.isLoss ? 'text-amber-400' : (report.isGain ? 'text-emerald-400' : 'text-blue-400')}`}>
                {report.isLoss ? `+${report.weightDiffKg}` : (report.isGain ? `-${report.weightDiffKg}` : '۰')}
              </span>
              <span className="text-[10px] text-slate-400">کیلوگرم</span>
            </div>
            <span className="text-[9px] text-slate-400 block">
              وزن فعلی: {report.currentWeightKg} kg &larr; هدف: {report.targetWeightKg} kg
            </span>
          </div>

          {/* Step 2: Time Horizon */}
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>۲. هدف‌گذاری زمانی</span>
              <Clock className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-cyan-400">{report.targetWeeks}</span>
              <span className="text-[10px] text-slate-400">هفته ({report.targetWeeks * 7} روز)</span>
            </div>
            <span className="text-[9px] text-slate-400 block">
              سرعت سالم: {report.weeklyRateKg} kg در هفته {report.isSafeRate ? '✓ ایمن' : '⚠️ تند'}
            </span>
          </div>

          {/* Step 3: Activity & TDEE */}
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>۳. فعالیت و کالری پایه</span>
              <Activity className="w-3 h-3 text-rose-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-rose-400">{report.tdeeCalories}</span>
              <span className="text-[10px] text-slate-400">kcal (TDEE)</span>
            </div>
            <span className="text-[9px] text-slate-400 block truncate" title={report.activityLevelFa}>
              BMR سوخت پایه: {report.bmrCalories} kcal
            </span>
          </div>

          {/* Step 4: Calorie Delta & Target */}
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>۴. تعدیل کالری مجاز</span>
              <Flame className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-emerald-400">{report.targetDailyCalories}</span>
              <span className="text-[10px] text-slate-400">kcal روزانه</span>
            </div>
            <span className="text-[9px] text-slate-400 block">
              {report.dailyCalorieDelta < 0 
                ? `کسری: ${report.dailyCalorieDelta} kcal (لاغری)` 
                : (report.dailyCalorieDelta > 0 ? `مازاد: +${report.dailyCalorieDelta} kcal` : 'تثبیت')}
            </span>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Step 5: 7-Day Week Tabs & 3-Meal Spoon Plan */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>۵. برنامه ۷ روز هفته بر حسب قاشق:</span>
          </div>
          <span className="text-[10px] text-slate-400">روی هر روز برای مشاهده وعده‌ها بزنید</span>
        </div>

        {/* 7 Days Slider Pills */}
        <div className="grid grid-cols-7 gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-[11px]">
          {report.days.map(d => {
            const isSelected = d.dayKey === selectedDayKey;
            return (
              <button
                key={d.dayKey}
                type="button"
                onClick={() => setSelectedDayKey(d.dayKey)}
                className={`py-2 rounded-xl text-center font-bold transition flex flex-col items-center gap-0.5 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{d.dayTitleFa}</span>
                <span className="text-[9px] opacity-75">{d.totalCalories}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Card & 3 Meals */}
        {activeDay && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4 shadow-sm animate-fadeIn">
            {/* Active Day Header & Shuffle Day Button */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-100">
                    برنامه وعده‌های {activeDay.dayTitleFa}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    مجموع: {activeDay.totalCalories} kcal
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  تطابق با سقف مجاز روزانه ({activeDay.targetDailyCalories} kcal)
                </span>
              </div>

              {/* Regenerate This Day's Meals Button */}
              <button
                type="button"
                disabled={regeneratingDayKey === activeDay.dayKey}
                onClick={() => handleRegenerateDay(activeDay.dayKey)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-2xl transition active:scale-95 disabled:opacity-50"
                title="اگر این غذاها را نمی‌پسندید، ۳ وعده جدید با همین کالری تحویل بگیرید"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${regeneratingDayKey === activeDay.dayKey ? 'animate-spin' : ''}`} />
                <span>تغییر وعده‌های {activeDay.dayTitleFa}</span>
              </button>
            </div>

            {/* 3 Meals Cards */}
            <div className="space-y-3">
              {/* 1. صبحانه */}
              <MealCardItem
                meal={activeDay.breakfast}
                icon={<Coffee className="w-4 h-4 text-amber-400" />}
                badgeColor="bg-amber-400/10 text-amber-400 border-amber-400/20"
                percentFa="۲۵٪ کالری روز"
              />

              {/* 2. ناهار */}
              <MealCardItem
                meal={activeDay.lunch}
                icon={<Sun className="w-4 h-4 text-orange-400" />}
                badgeColor="bg-orange-500/10 text-orange-400 border-orange-500/20"
                percentFa="۴۵٪ کالری روز"
              />

              {/* 3. شام */}
              <MealCardItem
                meal={activeDay.dinner}
                icon={<Moon className="w-4 h-4 text-indigo-400" />}
                badgeColor="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                percentFa="۳۰٪ کالری روز"
              />
            </div>
          </div>
        )}
      </div>

      {/* UNIFIED WEEKLY PLAN POSTER EXPORT CARD & BUTTON (دکمه تحویل کل برنامه هفتگی در یک تصویر یکپارچه) */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/30 p-4 space-y-3 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-100 flex items-center gap-1.5">
                <span>تحویل کل برنامه هفتگی در یک عکس یکپارچه</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-sans">
                  پوستر باکیفیت PNG
                </span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                کل برنامه ۷ روزه چیده‌شده هفته (شنبه تا جمعه) شامل صبحانه، ناهار، شام، کالری هر وعده و رژیم سلامت در یک تصویر یکپارچه
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportPoster}
          disabled={isGeneratingPoster}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isGeneratingPoster ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>در حال ترسیم و طراحی تصویر یکپارچه هفته...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>دریافت و دانلود عکس یکپارچه کل برنامه هفتگی ({report.memberName})</span>
            </>
          )}
        </button>
      </div>

      {/* Poster Preview & Download Modal */}
      {posterImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-black text-slate-100">
                  تصویر یکپارچه برنامه غذایی ۷ روز هفته
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPosterImageUrl(null)}
                className="w-7 h-7 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Image Preview */}
            <div className="overflow-y-auto max-h-[60vh] rounded-2xl border border-slate-800 bg-slate-950/70 p-1 flex justify-center">
              <img
                src={posterImageUrl}
                alt="برنامه هفتگی یکپارچه"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {copiedNotice && (
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5 justify-center">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedNotice}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadPoster}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>دانلود و ذخیره عکس (PNG)</span>
              </button>
              <button
                type="button"
                onClick={handleSharePoster}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>اشتراک‌گذاری</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MealCardItemProps {
  meal: DietMealItem;
  icon: React.ReactNode;
  badgeColor: string;
  percentFa: string;
}

const MealCardItem: React.FC<MealCardItemProps> = ({ meal, icon, badgeColor, percentFa }) => {
  return (
    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5 transition hover:border-slate-700">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badgeColor}`}>
                {meal.mealTypeFa}
              </span>
              <span className="text-xs font-bold text-slate-100">{meal.dishTitle}</span>
            </div>
            <span className="text-[9px] text-slate-400">{percentFa}</span>
          </div>
        </div>

        <div className="text-left">
          <span className="text-sm font-black text-amber-400">{meal.calories}</span>
          <span className="text-[9px] text-slate-400 block -mt-1">کیلوکالری</span>
        </div>
      </div>

      {/* Exact Spoon / Handful Portions - Highlighted Banner */}
      <div className="bg-amber-400/10 border border-amber-400/25 rounded-xl p-2.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
          <Utensils className="w-3.5 h-3.5" />
          <span>مقدار دقیق سهم بر حسب قاشق و پیمانه:</span>
        </div>
        <p className="text-xs font-bold text-slate-100 leading-relaxed pr-5">
          {meal.portionSpoonsFa}
        </p>
      </div>

      {/* Macros & Golden Tip */}
      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-900">
        <div className="flex items-center gap-3">
          <span>پروتئین: <strong className="text-slate-200">{meal.proteinGrams}g</strong></span>
          <span>کربوهیدرات: <strong className="text-slate-200">{meal.carbsGrams}g</strong></span>
          <span>چربی: <strong className="text-slate-200">{meal.fatGrams}g</strong></span>
        </div>

        {meal.dietTagsFa && meal.dietTagsFa.length > 0 && (
          <div className="flex items-center gap-1">
            {meal.dietTagsFa.map((t, idx) => (
              <span key={idx} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[9px]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {meal.goldenTipFa && (
        <div className="text-[10px] text-slate-400 flex items-start gap-1.5 bg-slate-900/60 p-2 rounded-lg">
          <Info className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
          <span className="leading-tight">{meal.goldenTipFa}</span>
        </div>
      )}
    </div>
  );
};
