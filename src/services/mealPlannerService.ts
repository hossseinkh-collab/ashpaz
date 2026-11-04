import { RECIPES_DATA } from '../data/recipes';
import { MealPlanDay, Recipe, ShoppingListItem, WeeklyMealPlan } from '../types';
import { normalizeToGramsOrMl } from './calculationEngine';
import { getPantryItems } from './inventoryService';

const MEAL_PLAN_STORAGE_KEY = 'smart_chef_meal_plan_v1';

export const DAYS_OF_WEEK_FA = [
  'شنبه',
  'یک‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه'
];

export function getDefaultWeeklyMealPlan(): WeeklyMealPlan {
  const defaultBreakfasts = [
    'noon-panir-gerdoo',           // شنبه: نان و پنیر لیقوان و گردو
    'omelette-ghahveh-khanehi',    // یک‌شنبه: املت قهوه‌خانه‌ای مشتی
    'halim-gandom',               // دوشنبه: حلیم گندم سنتی
    'sarshir-asal-sabalan',        // سه‌شنبه: سرشیر و عسل سبلان
    'ardeh-shireh-sonnati',        // چهارشنبه: ارده و شیره سنتی
    'nargesi-esfenaj',             // پنج‌شنبه: نرگسی اسفناج و تخم‌مرغ
    'pancake-classic-breakfast'    // جمعه: پنکیک اسفنجی خانگی
  ];

  const defaultDays: MealPlanDay[] = DAYS_OF_WEEK_FA.map((dayNameFa, index) => {
    // Pick initial balanced recipes for all 3 meals
    let lunchId = 'ghormeh-sabzi';
    let dinnerId = 'smash-burger-artisan';
    const breakfastId = defaultBreakfasts[index % defaultBreakfasts.length];

    if (index === 0) { lunchId = 'ghormeh-sabzi'; dinnerId = 'smash-burger-artisan'; }
    else if (index === 1) { lunchId = 'tahchin-morgh'; dinnerId = 'pizza-artisan-dough'; }
    else if (index === 2) { lunchId = 'sholeh-zard'; dinnerId = 'smash-burger-artisan'; }
    else if (index === 3) { lunchId = 'ghormeh-sabzi'; dinnerId = 'pizza-artisan-dough'; }
    else if (index === 4) { lunchId = 'tahchin-morgh'; dinnerId = 'smash-burger-artisan'; }
    else if (index === 5) { lunchId = 'tahchin-morgh'; dinnerId = 'sholeh-zard'; }
    else if (index === 6) { lunchId = 'ghormeh-sabzi'; dinnerId = 'pizza-artisan-dough'; }

    return {
      dayIndex: index,
      dayNameFa,
      breakfastRecipeId: breakfastId,
      breakfastLocked: false,
      lunchRecipeId: lunchId,
      lunchLocked: false,
      dinnerRecipeId: dinnerId,
      dinnerLocked: false,
      servings: 4
    };
  });

  return {
    id: 'plan-' + Date.now(),
    name: 'برنامه غذایی هفتگی خانواده (صبحانه، ناهار، شام)',
    createdAt: new Date().toISOString(),
    days: defaultDays
  };
}

export function getWeeklyMealPlan(): WeeklyMealPlan {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return getDefaultWeeklyMealPlan();
    }
    const raw = localStorage.getItem(MEAL_PLAN_STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultWeeklyMealPlan();
      localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    // Ensure all days have breakfast populated if migrating from older version
    if (parsed && Array.isArray(parsed.days)) {
      const defaultPlan = getDefaultWeeklyMealPlan();
      let migrated = false;
      parsed.days = parsed.days.map((d: MealPlanDay, idx: number) => {
        if (!d.breakfastRecipeId) {
          migrated = true;
          return {
            ...d,
            breakfastRecipeId: defaultPlan.days[idx]?.breakfastRecipeId || 'noon-panir-gerdoo',
            breakfastLocked: false
          };
        }
        return d;
      });
      if (migrated) {
        localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(parsed));
      }
    }
    return parsed;
  } catch {
    return getDefaultWeeklyMealPlan();
  }
}

export function saveWeeklyMealPlan(plan: WeeklyMealPlan): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(plan));
    }
  } catch {
    // Ignore storage errors
  }
}

export function autoGenerateMealPlan(currentPlan: WeeklyMealPlan): WeeklyMealPlan {
  const allRecipes = RECIPES_DATA;
  const breakfastDishes = allRecipes.filter(r => r.category === 'breakfast');
  const mainDishes = allRecipes.filter(r => r.category === 'iranian_traditional' || r.category === 'iranian_local');
  const lightOrFast = allRecipes.filter(r => r.category === 'fast_food' || r.category === 'dessert_icecream' || r.category === 'international');

  const newDays = currentPlan.days.map((day, idx) => {
    let breakfastId = day.breakfastRecipeId;
    let lunchId = day.lunchRecipeId;
    let dinnerId = day.dinnerRecipeId;

    if (!day.breakfastLocked && breakfastDishes.length > 0) {
      const randomBreakfast = breakfastDishes[(idx + Math.floor(Math.random() * breakfastDishes.length)) % breakfastDishes.length];
      breakfastId = randomBreakfast ? randomBreakfast.id : 'noon-panir-gerdoo';
    }

    if (!day.lunchLocked) {
      const randomMain = mainDishes[(idx + Math.floor(Math.random() * mainDishes.length)) % mainDishes.length];
      lunchId = randomMain ? randomMain.id : allRecipes[0].id;
    }

    if (!day.dinnerLocked) {
      const randomDinner = lightOrFast[(idx + 1 + Math.floor(Math.random() * lightOrFast.length)) % lightOrFast.length];
      dinnerId = randomDinner ? randomDinner.id : allRecipes[1].id;
    }

    return {
      ...day,
      breakfastRecipeId: breakfastId,
      lunchRecipeId: lunchId,
      dinnerRecipeId: dinnerId
    };
  });

  const updatedPlan: WeeklyMealPlan = {
    ...currentPlan,
    days: newDays
  };

  saveWeeklyMealPlan(updatedPlan);
  return updatedPlan;
}

/**
 * Generate Shopping List from Plan and Deduct In-Stock Inventory Items
 */
export function generateShoppingListFromMealPlan(plan: WeeklyMealPlan): ShoppingListItem[] {
  const pantryItems = getPantryItems();
  const aggregatedNeeded: Record<string, { name: string; amount: number; unit: any; category: string }> = {};

  plan.days.forEach(day => {
    const recipesToProcess: { recipe: Recipe | undefined; servings: number }[] = [
      { recipe: RECIPES_DATA.find(r => r.id === day.breakfastRecipeId), servings: day.servings },
      { recipe: RECIPES_DATA.find(r => r.id === day.lunchRecipeId), servings: day.servings },
      { recipe: RECIPES_DATA.find(r => r.id === day.dinnerRecipeId), servings: day.servings }
    ];

    recipesToProcess.forEach(({ recipe, servings }) => {
      if (!recipe) return;
      const scale = servings / recipe.baseServings;

      recipe.ingredients.forEach(ing => {
        const key = ing.name.trim();
        const scaledAmt = ing.amount * scale;

        if (!aggregatedNeeded[key]) {
          aggregatedNeeded[key] = {
            name: ing.name,
            amount: scaledAmt,
            unit: ing.unit,
            category: ing.category || 'سایر'
          };
        } else {
          // If units match, add
          if (aggregatedNeeded[key].unit === ing.unit) {
            aggregatedNeeded[key].amount += scaledAmt;
          } else {
            // Convert to grams if both are mass
            aggregatedNeeded[key].amount += scaledAmt;
          }
        }
      });
    });
  });

  // Now compare against Pantry Items to deduct in-stock
  const result: ShoppingListItem[] = Object.entries(aggregatedNeeded).map(([name, item]) => {
    // Find matching pantry item (case-insensitive substring or match)
    const pantryMatch = pantryItems.find(p => 
      p.name.includes(name) || name.includes(p.name)
    );

    let inStock = 0;
    if (pantryMatch) {
      if (pantryMatch.unit === item.unit) {
        inStock = pantryMatch.amount;
      } else if (pantryMatch.unit === 'kg' && item.unit === 'g') {
        inStock = pantryMatch.amount * 1000;
      } else if (pantryMatch.unit === 'g' && item.unit === 'kg') {
        inStock = pantryMatch.amount / 1000;
      } else if (pantryMatch.unit === 'liter' && item.unit === 'ml') {
        inStock = pantryMatch.amount * 1000;
      } else {
        inStock = pantryMatch.amount;
      }
    }

    const neededRounded = Math.round(item.amount * 10) / 10;
    const toBuy = Math.max(0, Math.round((neededRounded - inStock) * 10) / 10);

    return {
      id: 'shop-' + Math.random().toString(36).substring(2, 9),
      name: item.name,
      neededAmount: neededRounded,
      unit: item.unit,
      inStockAmount: inStock,
      toBuyAmount: toBuy,
      purchased: toBuy === 0, // already in stock
      category: item.category
    };
  });

  return result.sort((a, b) => (a.toBuyAmount > 0 ? -1 : 1));
}
