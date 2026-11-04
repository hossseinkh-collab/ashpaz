import React, { useState } from 'react';
import { 
  CalendarDays, Lock, Unlock, RefreshCw, ShoppingCart, 
  ChevronDown, Check, AlertCircle, Sparkles, X, Plus, Target,
  Coffee, Sun, Moon
} from 'lucide-react';
import { RECIPES_DATA } from '../../data/recipes';
import { 
  autoGenerateMealPlan, 
  generateShoppingListFromMealPlan, 
  getWeeklyMealPlan, 
  saveWeeklyMealPlan 
} from '../../services/mealPlannerService';
import { Recipe, ShoppingListItem, WeeklyMealPlan } from '../../types';
import { formatMeasurement } from '../../services/calculationEngine';
import { getUserHealthProfile, getWeightLogs, calculateTimedGoalPlan } from '../../services/healthService';

import { AdvancePrepAlertBanner } from '../common/AdvancePrepAlertBanner';

export const WeeklyPlanner: React.FC<{ onOpenRecipe: (id: string) => void }> = ({ onOpenRecipe }) => {
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan>(getWeeklyMealPlan());
  const [showShoppingModal, setShowShoppingModal] = useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [selectorTarget, setSelectorTarget] = useState<{ dayIndex: number; mealType: 'breakfast' | 'lunch' | 'dinner' } | null>(null);

  const handleToggleLock = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const updated = { ...mealPlan };
    const day = updated.days[dayIndex];
    if (mealType === 'breakfast') day.breakfastLocked = !day.breakfastLocked;
    if (mealType === 'lunch') day.lunchLocked = !day.lunchLocked;
    if (mealType === 'dinner') day.dinnerLocked = !day.dinnerLocked;
    setMealPlan(updated);
    saveWeeklyMealPlan(updated);
  };

  const handleAutoGenerate = () => {
    const newPlan = autoGenerateMealPlan(mealPlan);
    setMealPlan(newPlan);
  };

  const handleOpenShoppingList = () => {
    const list = generateShoppingListFromMealPlan(mealPlan);
    setShoppingList(list);
    setShowShoppingModal(true);
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (!selectorTarget) return;
    const updated = { ...mealPlan };
    const day = updated.days[selectorTarget.dayIndex];
    if (selectorTarget.mealType === 'breakfast') day.breakfastRecipeId = recipeId;
    if (selectorTarget.mealType === 'lunch') day.lunchRecipeId = recipeId;
    if (selectorTarget.mealType === 'dinner') day.dinnerRecipeId = recipeId;
    setMealPlan(updated);
    saveWeeklyMealPlan(updated);
    setSelectorTarget(null);
  };

  const toggleItemPurchased = (id: string) => {
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const getRecipe = (id?: string): Recipe | undefined => {
    return RECIPES_DATA.find(r => r.id === id);
  };

  const profile = getUserHealthProfile();
  const logs = getWeightLogs();
  const timedGoal = calculateTimedGoalPlan(profile, logs);

  // Filter recipes for selector modal: when picking breakfast, put breakfast recipes first
  const getSortedSelectorRecipes = () => {
    if (!selectorTarget) return RECIPES_DATA;
    if (selectorTarget.mealType === 'breakfast') {
      const breakfasts = RECIPES_DATA.filter(r => r.category === 'breakfast');
      const others = RECIPES_DATA.filter(r => r.category !== 'breakfast');
      return [...breakfasts, ...others];
    }
    return RECIPES_DATA;
  };

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* Planner Top Controls */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-amber-400" />
              برنامه هفتگی ۳ وعده (صبحانه، ناهار، شام)
            </h2>
            <p className="text-[11px] text-slate-400">۷ روز کامل، ۳ وعده روزانه همراه با کسر موجودی انبار</p>
          </div>
          <button
            onClick={handleAutoGenerate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm active:scale-95 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>چینش هوشمند</span>
          </button>
        </div>

        {/* Action Button: Generate Shopping List */}
        <button
          onClick={handleOpenShoppingList}
          className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-98"
        >
          <ShoppingCart className="w-4 h-4 text-amber-400" />
          <span>استخراج فهرست خرید ۳ وعده با کسر موجودی انبار</span>
        </button>
      </div>

      {/* Advance Prep Tasks & Phone Notifications */}
      <AdvancePrepAlertBanner onOpenRecipe={onOpenRecipe} />

      {/* Calorie Goal Chain Integration Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <Target className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>تنظیم هوشمند کالری بر اساس رژیم زمانی</span>
          </div>
          <p className="text-[10px] text-slate-400">
            نیاز پایه: {timedGoal.tdeeCalories} | تفاضل: {timedGoal.isLoss ? '-' : '+'}{timedGoal.dailyCalorieDelta} kcal ({timedGoal.targetDays} روز تا هدف)
          </p>
        </div>
        <div className="text-left font-mono shrink-0">
          <span className="text-sm font-black text-emerald-400 block">{timedGoal.targetDailyCalories}</span>
          <span className="text-[9px] text-slate-500 font-sans block">kcal مجاز/روز</span>
        </div>
      </div>

      {/* 7 Days Cards */}
      <div className="space-y-3">
        {mealPlan.days.map((day, idx) => {
          const breakfast = getRecipe(day.breakfastRecipeId);
          const lunch = getRecipe(day.lunchRecipeId);
          const dinner = getRecipe(day.dinnerRecipeId);
          const totalDayCalories = 
            (breakfast?.caloriesPerServing || 0) + 
            (lunch?.caloriesPerServing || 0) + 
            (dinner?.caloriesPerServing || 0);

          return (
            <div
              key={day.dayIndex}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 hover:border-slate-700 transition"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800/80">
                <span className="font-bold text-amber-400">
                  {day.dayNameFa}
                </span>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold">مجموع ۳ وعده: {totalDayCalories} kcal</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{day.servings} پرس</span>
                </div>
              </div>

              {/* Meals Grid (Breakfast, Lunch & Dinner) */}
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {/* 1. Breakfast Box */}
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col justify-between space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <Coffee className="w-3 h-3 text-amber-400" />
                      <span>صبحانه:</span>
                    </span>
                    <button
                      onClick={() => handleToggleLock(idx, 'breakfast')}
                      className={`p-1 rounded-md transition ${
                        day.breakfastLocked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={day.breakfastLocked ? 'قفل شده' : 'باز برای بازتولید'}
                    >
                      {day.breakfastLocked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
                    </button>
                  </div>

                  {breakfast ? (
                    <div
                      onClick={() => onOpenRecipe(breakfast.id)}
                      className="cursor-pointer group flex-1"
                    >
                      <h4 className="text-[10px] font-bold text-slate-200 group-hover:text-amber-400 line-clamp-2 leading-tight">
                        {breakfast.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 block mt-0.5">
                        {breakfast.caloriesPerServing} kcal
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500">انتخاب نشده</span>
                  )}

                  <button
                    onClick={() => setSelectorTarget({ dayIndex: idx, mealType: 'breakfast' })}
                    className="text-[9px] font-semibold text-slate-400 hover:text-amber-300 text-right pt-1 border-t border-slate-700/50"
                  >
                    تغییر...
                  </button>
                </div>

                {/* 2. Lunch Box */}
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col justify-between space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-orange-300 flex items-center gap-1">
                      <Sun className="w-3 h-3 text-orange-400" />
                      <span>ناهار:</span>
                    </span>
                    <button
                      onClick={() => handleToggleLock(idx, 'lunch')}
                      className={`p-1 rounded-md transition ${
                        day.lunchLocked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={day.lunchLocked ? 'قفل شده' : 'باز برای بازتولید'}
                    >
                      {day.lunchLocked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
                    </button>
                  </div>

                  {lunch ? (
                    <div
                      onClick={() => onOpenRecipe(lunch.id)}
                      className="cursor-pointer group flex-1"
                    >
                      <h4 className="text-[10px] font-bold text-slate-200 group-hover:text-amber-400 line-clamp-2 leading-tight">
                        {lunch.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 block mt-0.5">
                        {lunch.caloriesPerServing} kcal
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500">انتخاب نشده</span>
                  )}

                  <button
                    onClick={() => setSelectorTarget({ dayIndex: idx, mealType: 'lunch' })}
                    className="text-[9px] font-semibold text-slate-400 hover:text-amber-300 text-right pt-1 border-t border-slate-700/50"
                  >
                    تغییر...
                  </button>
                </div>

                {/* 3. Dinner Box */}
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col justify-between space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-300 flex items-center gap-1">
                      <Moon className="w-3 h-3 text-indigo-400" />
                      <span>شام:</span>
                    </span>
                    <button
                      onClick={() => handleToggleLock(idx, 'dinner')}
                      className={`p-1 rounded-md transition ${
                        day.dinnerLocked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={day.dinnerLocked ? 'قفل شده' : 'باز برای بازتولید'}
                    >
                      {day.dinnerLocked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
                    </button>
                  </div>

                  {dinner ? (
                    <div
                      onClick={() => onOpenRecipe(dinner.id)}
                      className="cursor-pointer group flex-1"
                    >
                      <h4 className="text-[10px] font-bold text-slate-200 group-hover:text-amber-400 line-clamp-2 leading-tight">
                        {dinner.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 block mt-0.5">
                        {dinner.caloriesPerServing} kcal
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500">انتخاب نشده</span>
                  )}

                  <button
                    onClick={() => setSelectorTarget({ dayIndex: idx, mealType: 'dinner' })}
                    className="text-[9px] font-semibold text-slate-400 hover:text-amber-300 text-right pt-1 border-t border-slate-700/50"
                  >
                    تغییر...
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Selection Modal */}
      {selectorTarget !== null && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-800 max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  انتخاب {selectorTarget.mealType === 'breakfast' ? 'صبحانه' : (selectorTarget.mealType === 'lunch' ? 'ناهار' : 'شام')} برای {mealPlan.days[selectorTarget.dayIndex].dayNameFa}
                </h3>
                {selectorTarget.mealType === 'breakfast' && (
                  <span className="text-[10px] text-amber-400 block mt-0.5">
                    صبحانه‌های سنتی و فرنگی در ابتدای فهرست اولویت دارند
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectorTarget(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto space-y-2">
              {getSortedSelectorRecipes().map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition active:scale-98 ${
                    recipe.category === 'breakfast' && selectorTarget.mealType === 'breakfast'
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                      : 'bg-slate-800/70 border-slate-700/60 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        {recipe.category === 'breakfast' && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                            صبحانه
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-slate-200">{recipe.title}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400">{recipe.categoryNameFa} • {recipe.caloriesPerServing} کالری</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">انتخاب</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shopping List Modal */}
      {showShoppingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-800 max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  فهرست خرید هوشمند ۳ وعده برنامه هفتگی
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  شامل اقلام صبحانه، ناهار و شام همراه با کسر موجودی انبار
                </p>
              </div>
              <button
                onClick={() => setShowShoppingModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto space-y-2 divide-y divide-slate-800/80">
              {shoppingList.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleItemPurchased(item.id)}
                  className={`pt-2 flex items-center justify-between text-xs cursor-pointer select-none transition ${
                    item.purchased ? 'opacity-40 line-through' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        item.purchased
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {item.purchased && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <span className="font-medium text-slate-200">{item.name}</span>
                      {item.inStockAmount > 0 && (
                        <span className="text-[10px] text-emerald-400 block">
                          موجود در انبار: {formatMeasurement(item.inStockAmount, item.unit)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left font-mono">
                    {item.toBuyAmount > 0 ? (
                      <span className="font-bold text-amber-400">
                        خرید: {formatMeasurement(item.toBuyAmount, item.unit)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-400 font-bold">
                        موجود در خانه ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <button
                onClick={() => setShowShoppingModal(false)}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
              >
                تایید و بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
