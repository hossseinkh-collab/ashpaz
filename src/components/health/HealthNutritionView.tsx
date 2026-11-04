import React, { useState } from 'react';
import { 
  HeartPulse, Activity, Flame, Plus, Check, 
  Sparkles, Scale, Dumbbell, ShieldCheck, Apple, ChevronLeft,
  RefreshCw, AlertTriangle, Thermometer, ShieldAlert, Search, Star,
  Utensils, Users
} from 'lucide-react';
import { 
  calculateHealthMetrics, 
  getTodayIntakeLog, 
  getUserHealthProfile, 
  logMealIntake, 
  saveUserHealthProfile,
  getActiveFamilyMember,
  updateFamilyMember,
  addMemberWeightLog
} from '../../services/healthService';
import { RECIPES_DATA } from '../../data/recipes';
import { INGREDIENT_SUBSTITUTIONS_DATA } from '../../data/substitutions';
import { Recipe, UserProfileHealth, FamilyMemberProfile } from '../../types';
import { WeightTrackerView } from './WeightTrackerView';
import { FamilyMemberSwitcher } from './FamilyMemberSwitcher';
import { PersonalizedDietView } from './PersonalizedDietView';
import { BmiCalculatorCard } from './BmiCalculatorCard';

interface HealthNutritionViewProps {
  onOpenRecipe: (id: string) => void;
}

export const HealthNutritionView: React.FC<HealthNutritionViewProps> = ({ onOpenRecipe }) => {
  const [activeSubTab, setActiveSubTab] = useState<'diet' | 'weight' | 'tracker' | 'substitutions' | 'safety'>('diet');
  const [activeMember, setActiveMember] = useState<FamilyMemberProfile>(() => getActiveFamilyMember());
  const [dailyLog, setDailyLog] = useState(getTodayIntakeLog());
  const [dietFilter, setDietFilter] = useState<'all' | 'low_cal' | 'high_prot' | 'keto' | 'veg'>('all');
  const [loggedSuccessMsg, setLoggedSuccessMsg] = useState<string | null>(null);

  // Substitution search state
  const [subSearchQuery, setSubSearchQuery] = useState('');

  const metrics = calculateHealthMetrics({
    gender: activeMember.gender,
    age: activeMember.age,
    heightCm: activeMember.heightCm,
    weightKg: activeMember.weightKg,
    targetWeightKg: activeMember.targetWeightKg,
    activityLevel: activeMember.activityLevel,
    goal: activeMember.goal,
    targetWeeks: activeMember.targetWeeks
  });

  const handleBmiHeightChange = (newHeight: number) => {
    const updated = updateFamilyMember(activeMember.id, { heightCm: newHeight });
    setActiveMember(updated);
  };

  const handleBmiWeightChange = (newWeight: number) => {
    const updated = updateFamilyMember(activeMember.id, { weightKg: newWeight });
    addMemberWeightLog(activeMember.id, newWeight, new Date().toISOString().split('T')[0], 'به‌روزرسانی در سنجش BMI');
    setActiveMember(updated);
  };

  const handleLogRecipe = (recipe: Recipe) => {
    const updated = logMealIntake(
      recipe.title,
      recipe.caloriesPerServing,
      recipe.proteinGrams,
      recipe.carbsGrams,
      recipe.fatGrams
    );
    setDailyLog(updated);
    setLoggedSuccessMsg(`«${recipe.title}» به کالری‌شمار امروز اضافه شد`);
    setTimeout(() => setLoggedSuccessMsg(null), 2500);
  };

  const filteredDietRecipes = RECIPES_DATA.filter(r => {
    if (dietFilter === 'low_cal') return r.caloriesPerServing < 400;
    if (dietFilter === 'high_prot') return r.proteinGrams >= 30;
    if (dietFilter === 'keto') return r.dietaryTags?.includes('keto');
    if (dietFilter === 'veg') return r.isVegetarian || r.dietaryTags?.includes('vegetarian');
    return true;
  });

  const filteredSubstitutions = INGREDIENT_SUBSTITUTIONS_DATA.filter(sub => {
    if (!subSearchQuery.trim()) return true;
    const q = subSearchQuery.toLowerCase().trim();
    return (
      sub.originalIngredient.toLowerCase().includes(q) ||
      sub.substituteIngredient.toLowerCase().includes(q) ||
      sub.textureEffectFa.toLowerCase().includes(q) ||
      sub.flavorEffectFa.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* 1. Multi-User Family Members Switcher Bar */}
      <FamilyMemberSwitcher
        onMemberChanged={m => {
          setActiveMember(m);
        }}
      />

      {/* 2. Top 5-Way Sub-Nav Switcher */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-bold">
        <button
          onClick={() => setActiveSubTab('diet')}
          className={`py-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
            activeSubTab === 'diet'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>رژیم غذایی</span>
        </button>

        <button
          onClick={() => setActiveSubTab('weight')}
          className={`py-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
            activeSubTab === 'weight'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>سنجش و BMI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tracker')}
          className={`py-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
            activeSubTab === 'tracker'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>کالری‌شمار</span>
        </button>

        <button
          onClick={() => setActiveSubTab('substitutions')}
          className={`py-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
            activeSubTab === 'substitutions'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>جایگزین‌ها</span>
        </button>

        <button
          onClick={() => setActiveSubTab('safety')}
          className={`py-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${
            activeSubTab === 'safety'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ایمنی غذا</span>
        </button>
      </div>

      {/* SUB-TAB 1: PERSONALIZED SINGLE-USER DIET PLAN */}
      {activeSubTab === 'diet' && (
        <PersonalizedDietView
          key={activeMember.id}
          member={activeMember}
          onOpenRecipe={onOpenRecipe}
        />
      )}

      {/* SUB-TAB 2: BMI MEASUREMENT & WEIGHT TRACKER CHART */}
      {activeSubTab === 'weight' && (
        <div className="space-y-4">
          {/* Prominent BMI Card with Height & Weight Inputs */}
          <BmiCalculatorCard
            heightCm={activeMember.heightCm}
            weightKg={activeMember.weightKg}
            onHeightChange={handleBmiHeightChange}
            onWeightChange={handleBmiWeightChange}
          />

          {/* Interactive Weight Trend Chart & History Logs for Active Member */}
          <WeightTrackerView
            key={activeMember.id}
            activeMember={activeMember}
            onWeightUpdated={() => {
              const updated = getActiveFamilyMember();
              setActiveMember(updated);
            }}
          />
        </div>
      )}

      {/* SUB-TAB 3: CALORIE & NUTRITION CLINIC */}
      {activeSubTab === 'tracker' && (
        <div className="space-y-4">
          {/* Hero Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-500/20 via-slate-900 to-slate-900 border border-rose-500/30 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                  <span>کالری‌شمار روزانه {activeMember.name}</span>
                </h2>
                <p className="text-[11px] text-slate-400">ثبت خوراک و تطابق با هدف کالری مجاز روزانه</p>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">شاخص (BMI)</span>
                <span className={`text-base font-black ${metrics.bmiColorClass}`}>{metrics.bmi}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">{metrics.bmiCategoryFa}</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">سوخت پایه (BMR)</span>
                <span className="text-base font-black text-amber-400">{metrics.bmrCalories}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">کیلوکالری</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">هدف کالری روز</span>
                <span className="text-base font-black text-rose-400">{metrics.targetDailyCalories}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">کیلوکالری</span>
              </div>
            </div>

            {/* Calorie Gauge Bar */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold">مصرف کالری امروز:</span>
                <span className="text-amber-400 font-black">
                  {dailyLog.consumedCalories} / {metrics.targetDailyCalories} kcal
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    dailyLog.consumedCalories > metrics.targetDailyCalories ? 'bg-red-500' : 'bg-gradient-to-r from-amber-400 to-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((dailyLog.consumedCalories / metrics.targetDailyCalories) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Macro Targets */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">پروتئین هدف</span>
              <span className="text-sm font-bold text-slate-100">{metrics.targetProteinGrams} گرم</span>
              <span className="text-[9px] text-slate-500 block mt-0.5">ثبت شده: {dailyLog.consumedProtein}g</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">کربوهیدرات هدف</span>
              <span className="text-sm font-bold text-slate-100">{metrics.targetCarbsGrams} گرم</span>
              <span className="text-[9px] text-slate-500 block mt-0.5">ثبت شده: {dailyLog.consumedCarbs}g</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">چربی مفید هدف</span>
              <span className="text-sm font-bold text-slate-100">{metrics.targetFatGrams} گرم</span>
              <span className="text-[9px] text-slate-500 block mt-0.5">ثبت شده: {dailyLog.consumedFat}g</span>
            </div>
          </div>

          {/* Logged Meals List */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-slate-200">وعده‌های ثبت‌شده امروز:</h4>
            {dailyLog.loggedMeals.length === 0 ? (
              <p className="text-[11px] text-slate-500 text-center py-2">هنوز وعده‌ای برای امروز ثبت نشده است.</p>
            ) : (
              <div className="space-y-1.5">
                {dailyLog.loggedMeals.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 text-xs">
                    <span className="text-slate-200 font-medium">{m.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">{m.calories} kcal</span>
                      <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Diet Recipes Picker */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span>افزودن سریع غذاهای رژیمی به کالری‌شمار:</span>
            </div>

            {loggedSuccessMsg && (
              <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{loggedSuccessMsg}</span>
              </div>
            )}

            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1 rounded-xl whitespace-nowrap ${dietFilter === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-850 text-slate-300'}`}
              >
                همه
              </button>
              <button
                onClick={() => setDietFilter('low_cal')}
                className={`px-3 py-1 rounded-xl whitespace-nowrap ${dietFilter === 'low_cal' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-850 text-slate-300'}`}
              >
                کم‌کالری (&lt;400)
              </button>
              <button
                onClick={() => setDietFilter('high_prot')}
                className={`px-3 py-1 rounded-xl whitespace-nowrap ${dietFilter === 'high_prot' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-850 text-slate-300'}`}
              >
                پروتئین بالا (&ge;30g)
              </button>
              <button
                onClick={() => setDietFilter('keto')}
                className={`px-3 py-1 rounded-xl whitespace-nowrap ${dietFilter === 'keto' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-850 text-slate-300'}`}
              >
                کتوژنیک
              </button>
            </div>

            <div className="space-y-2">
              {filteredDietRecipes.slice(0, 6).map(recipe => (
                <div key={recipe.id} className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-100 truncate">{recipe.title}</h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="text-amber-400 font-semibold">{recipe.caloriesPerServing} kcal</span>
                      <span>•</span>
                      <span>پروتئین: {recipe.proteinGrams}g</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onOpenRecipe(recipe.id)}
                      className="px-2 py-1 rounded-lg bg-slate-800 text-[10px] text-slate-300 hover:text-white"
                    >
                      دستور
                    </button>
                    <button
                      onClick={() => handleLogRecipe(recipe)}
                      className="p-1 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition"
                      title="ثبت در کالری‌شمار"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: INGREDIENT SUBSTITUTIONS */}
      {activeSubTab === 'substitutions' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>جایگزین‌های هوشمند مواد اولیه در آشپزی و قنادی</span>
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              اگر ماده‌ای در خانه ندارید یا رژیم بدون گلوتن/لاکتوز دارید، جایگزین استاندارد آن را بیابید.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={subSearchQuery}
              onChange={e => setSubSearchQuery(e.target.value)}
              placeholder="جست‌وجوی ماده اصلی (مثلاً: تخم‌مرغ، شکر، خامه...)"
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-2.5">
            {filteredSubstitutions.map((sub, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{sub.originalIngredient}</span>
                    <span className="text-slate-500">&larr;</span>
                    <span className="font-bold text-amber-400">{sub.substituteIngredient}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: sub.confidenceRating }).map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-slate-300">
                  <strong className="text-slate-400">نسبت جایگزینی: </strong>
                  {sub.ratioDescription}
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5 bg-slate-950 p-2 rounded-xl">
                  <div><strong>اثر بر بافت: </strong>{sub.textureEffectFa}</div>
                  <div><strong>اثر بر طعم: </strong>{sub.flavorEffectFa}</div>
                  {sub.allergenAlertFa && (
                    <div className="text-amber-400"><strong>هشدار آلرژی: </strong>{sub.allergenAlertFa}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FOOD SAFETY & HYGIENE */}
      {activeSubTab === 'safety' && (
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ایمنی، دمای پخت و ماندگاری بهداشتی غذاها</span>
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              راهنمای استاندارد دماهای بهداشتی طبخ گوشت و زمان ماندگاری مواد غذایی در یخچال و فریزر.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <Thermometer className="w-4 h-4 text-rose-400" />
                <span>دمای استاندارد پخت در مرکز گوشت (Food Safety):</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside pr-1">
                <li>مرغ و ماکیان: حداقل ۷۴ درجه سانتی‌گراد (۱۶۵°F)</li>
                <li>گوشت چرخ‌کرده (کوبیده و همبرگر): حداقل ۷۱ درجه سانتی‌گراد (۱۶۰°F)</li>
                <li>گوشت تکه‌ای گوسفند و گوساله: حداقل ۶۳ درجه سانتی‌گراد (۱۴۵°F)</li>
                <li>ماهی و میگو: حداقل ۶۳ درجه سانتی‌گراد (۱۴۵°F)</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>محدوده دمای خطر باکتریایی (Danger Zone):</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                دمای بین ۴ تا ۶۰ درجه سانتی‌گراد محدوده خطر رشد سریع باکتری‌هاست. غذای پخته‌شده نباید بیش از ۲ ساعت در دمای اتاق بماند.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
