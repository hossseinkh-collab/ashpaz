import React, { useState } from 'react';
import { 
  Users, Clock, Flame, AlertTriangle, CheckCircle, 
  ShoppingCart, Layers, Play, Pause, RotateCcw, 
  Lightbulb, ShieldAlert, Sparkles, Check
} from 'lucide-react';
import { Recipe } from '../../types';
import { formatMeasurement, scaleRecipeByServings } from '../../services/calculationEngine';
import { DishImage } from '../common/DishImage';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onAddToShoppingList: (recipe: Recipe, servings: number) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onBack,
  onAddToShoppingList
}) => {
  const [servings, setServings] = useState(recipe.baseServings);
  const [activeStepTab, setActiveStepTab] = useState<'all' | 'interactive'>('all');
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Scaled calculations
  const { scaledIngredients, scaleFactor, totalEstimatedCostToman, costPerServingToman } = 
    scaleRecipeByServings(recipe, servings);

  // Timer Effect
  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Play notification tone if available
            try {
              const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(880, audioCtx.currentTime);
              osc.connect(audioCtx.destination);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.6);
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeftSeconds]);

  const startStepTimer = (stepNumber: number, durationMinutes: number) => {
    setActiveTimerStep(stepNumber);
    setTimeLeftSeconds(durationMinutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddShopping = () => {
    onAddToShoppingList(recipe, servings);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-2 space-y-5">
      {/* Hero Banner with Authenticated Dish Photography */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md">
        <DishImage
          recipe={recipe}
          className="w-full h-56"
          imgClassName="w-full h-full object-cover"
          showBadge={true}
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-3 right-4 left-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
              {recipe.categoryNameFa}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700">
              {recipe.difficultyFa}
            </span>
            {recipe.originRegion && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300/90 border border-slate-700">
                {recipe.originRegion}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            {recipe.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
            {recipe.persianSubtitle}
          </p>
        </div>
      </div>

      {/* Quick Specs Badges */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
          <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <span className="text-[11px] text-slate-400 block">زمان پخت</span>
          <span className="text-xs font-bold text-slate-200">{recipe.cookTimeMinutes} دقیقه</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
          <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <span className="text-[11px] text-slate-400 block">انرژی هر پرس</span>
          <span className="text-xs font-bold text-slate-200">{recipe.caloriesPerServing} کالری</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
          <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <span className="text-[11px] text-slate-400 block">پایه رسپی</span>
          <span className="text-xs font-bold text-slate-200">{recipe.baseServings} نفر</span>
        </div>
      </div>

      {/* Health & Nutritional Macro Breakdown */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            ارزش غذایی و ماکروهای هر پرس:
          </span>
          <span className="font-mono text-amber-400 font-bold">
            {recipe.caloriesPerServing * servings / recipe.baseServings} کالری کل
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 block">پروتئین (Protein):</span>
            <span className="text-xs font-bold text-rose-300 font-mono">{recipe.proteinGrams} گرم</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 block">کربوهیدرات (Carbs):</span>
            <span className="text-xs font-bold text-amber-300 font-mono">{recipe.carbsGrams} گرم</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 block">چربی (Fat):</span>
            <span className="text-xs font-bold text-sky-300 font-mono">{recipe.fatGrams} گرم</span>
          </div>
        </div>
      </div>

      {/* Dynamic Serving Slider Section */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">تنظیم تعداد نفرات (سروینگ)</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
            <span className="text-xs font-bold text-amber-400">{servings} نفر</span>
            {scaleFactor !== 1 && (
              <span className="text-[10px] text-slate-400">
                ({scaleFactor > 1 ? '+' : ''}{((scaleFactor - 1) * 100).toFixed(0)}%)
              </span>
            )}
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={servings}
          onChange={e => setServings(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />

        <div className="flex justify-between text-[11px] text-slate-500">
          <span>۱ نفره</span>
          <span>۴ نفره (استاندارد)</span>
          <span>۱۰ نفره</span>
          <span>۲۰ نفره (مجلسی)</span>
        </div>

        {/* Cost Estimation */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>تخمین هزینه مواد اولیه:</span>
          <div className="text-left font-medium text-slate-200">
            <span>{totalEstimatedCostToman.toLocaleString('fa-IR')} تومان</span>
            <span className="text-[10px] text-slate-400 block">
              (~ {costPerServingToman.toLocaleString('fa-IR')} تومان هر پرس)
            </span>
          </div>
        </div>
      </div>

      {/* Allergens Warning */}
      {recipe.allergens.length > 0 && (
        <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">هشدارهای آلرژی و حساسیت غذایی:</span>
            <p className="text-[11px] text-amber-200/80 mt-0.5 leading-relaxed">
              این دستور شامل: {recipe.allergens.map(a => {
                if (a === 'gluten') return 'گلوتن (آرد گندم)';
                if (a === 'lactose') return 'لاکتوز (لبنیات و شیر)';
                if (a === 'egg') return 'تخم‌مرغ';
                if (a === 'nuts') return 'مغزیجات (گردو یا پسته)';
                if (a === 'sesame') return 'کنجد';
                return a;
              }).join('، ')} می‌باشد. در صورت حساسیت می‌توانید از بخش جایگزینی مواد استفاده نمایید.
            </p>
          </div>
        </div>
      )}

      {/* Pastry & Bakery Technical Box */}
      {recipe.pastryDetails && (
        <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>اطلاعات فنی قنادی و بیکری</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {recipe.pastryDetails.layerCount && (
              <div className="p-1.5 rounded-lg bg-indigo-900/30">
                <span className="text-slate-400 block">تعداد لایه‌های کره‌ای:</span>
                <span className="font-bold text-white">{recipe.pastryDetails.layerCount} لایه</span>
              </div>
            )}
            {recipe.pastryDetails.bakingTempC && (
              <div className="p-1.5 rounded-lg bg-indigo-900/30">
                <span className="text-slate-400 block">دمای فر استاندارد:</span>
                <span className="font-bold text-white">{recipe.pastryDetails.bakingTempC} درجه سانتی‌گراد</span>
              </div>
            )}
            {recipe.pastryDetails.doughRestTimeMinutes && (
              <div className="p-1.5 rounded-lg bg-indigo-900/30">
                <span className="text-slate-400 block">استراحت و تخمیر:</span>
                <span className="font-bold text-white">{recipe.pastryDetails.doughRestTimeMinutes} دقیقه</span>
              </div>
            )}
            {recipe.pastryDetails.weightLossRatio && (
              <div className="p-1.5 rounded-lg bg-indigo-900/30">
                <span className="text-slate-400 block">افت رطوبت در پخت:</span>
                <span className="font-bold text-white">{(recipe.pastryDetails.weightLossRatio * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ingredients List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            مواد اولیه دقیق ({scaledIngredients.length} قلم)
          </h3>
          <button
            onClick={handleAddShopping}
            disabled={addedSuccess}
            className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition active:scale-95 ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>به سبد خرید اضافه شد</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>افزودن به سبد خرید</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
          {scaledIngredients.map((ing, idx) => (
            <div key={ing.id || idx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-800/40 transition">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="text-slate-200 font-medium">{ing.name}</span>
                {ing.notes && <span className="text-[10px] text-slate-500">({ing.notes})</span>}
              </div>
              <div className="text-left font-bold text-amber-400 font-mono">
                {formatMeasurement(ing.amount, ing.unit)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Steps & Interactive Timers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            مراحل گام‌به‌گام پخت ({recipe.steps.length} مرحله)
          </h3>
        </div>

        {/* Active Timer Box if running */}
        {activeTimerStep !== null && (
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
              <div>
                <span className="text-[11px] text-slate-300 block">تایمر مرحله {activeTimerStep}:</span>
                <span className="text-lg font-bold font-mono text-amber-400">
                  {formatTimer(timeLeftSeconds)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-2 rounded-xl bg-amber-500 text-slate-950 active:scale-95 transition"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setActiveTimerStep(null);
                  setIsTimerRunning(false);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white active:scale-95 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {recipe.steps.map(step => (
            <div
              key={step.stepNumber}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center text-xs font-bold">
                    {step.stepNumber}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">
                    {step.title}
                  </h4>
                </div>

                {step.durationMinutes && (
                  <button
                    onClick={() => startStepTimer(step.stepNumber, step.durationMinutes!)}
                    className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 px-2 py-0.5 rounded-full transition"
                  >
                    <Play className="w-3 h-3" />
                    <span>تایمر {step.durationMinutes} دقیقه</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pr-8">
                {step.instruction}
              </p>

              {step.proTip && (
                <div className="mr-8 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{step.proTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Golden Chef Tips */}
      {recipe.goldenTips && recipe.goldenTips.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>نکات طلایی و فوت‌های کوزه‌گری سرآشپز</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 pr-3 list-disc">
            {recipe.goldenTips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
