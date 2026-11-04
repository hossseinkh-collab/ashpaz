export type RecipeCategory = 
  | 'breakfast'             // صبحانه‌های سنتی ایرانی و فرنگی محبوب
  | 'iranian_traditional'   // خورش‌ها و غذاهای اصیل ایرانی
  | 'iranian_local'         // غذاهای محلی، کباب‌ها، پلوها
  | 'soup_ash'              // انواع سوپ و آش سنتی و اصیل
  | 'fast_food'             // برگر، پیتزا، سوخاری، ساندویچ
  | 'international'         // پاستا، لازانیا، استیک
  | 'pastry_dry'            // شیرینی خشک و عید (دانمارکی، زبان، نخودچی...)
  | 'pastry_wet'            // شیرینی تر، ناپلئونی، رولت، نان خامه‌ای
  | 'cake_bakery'           // کیک اسفنجی، شیفون، هویج، عصرانه
  | 'icecream'              // انواع بستنی سنتی، قیفی، میوه‌ای، فالوده و یخ در بهشت
  | 'halva_traditional'     // حلوا زعفرانی، حلوا لوز، شله‌زرد، رنگینک، مسقطی، فرنی، شیربرنج
  | 'dessert_modern'        // دسر مدرن، ژله، پاناکوتا، تیرامیسو، کرم بروله، موس
  | 'dessert_icecream'      // دسر و بستنی (سازگاری)
  | 'drinks_beverages';     // شیک، اسموتی، نوشیدنی‌های گرم و سرد

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'master';

export type AllergenType = 
  | 'gluten'       // گلوتن (گندم/آرد)
  | 'lactose'      // لاکتوز (شیر و لبنیات)
  | 'egg'          // تخم‌مرغ
  | 'nuts'         // مغزیجات (گردو، بادام، پسته)
  | 'soy'          // سویا
  | 'sesame';      // کنجد

export type MeasurementUnit = 
  | 'g'            // گرم
  | 'kg'           // کیلوگرم
  | 'ml'           // میلی‌لیتر
  | 'liter'        // لیتر
  | 'cup'          // پیمانه
  | 'tbsp'         // قاشق غذاخوری
  | 'tsp'          // قاشق چای‌خوری
  | 'pcs';         // عدد

export interface IngredientItem {
  id: string;
  name: string;
  amount: number;       // base amount
  unit: MeasurementUnit;
  unitWeightInGrams?: number; // approximate weight per 1 unit if count or spoon
  approxCostPer100g?: number; // Toman
  category?: 'protein' | 'dairy' | 'vegetable' | 'flour_grain' | 'spice_seasoning' | 'oil_fat' | 'sweetener' | 'liquid' | 'condiment';
  allergens?: AllergenType[];
  notes?: string;
}

export interface RecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  durationMinutes?: number;
  hasTimer?: boolean;
  temperatureC?: number;
  proTip?: string;
}

export interface PastryDetails {
  bakersPercentageFlour?: number; // flour is usually 100%
  doughType?: 'laminated' | 'yeast' | 'sponge' | 'shortcrust';
  layerCount?: number;
  doughRestTimeMinutes?: number;
  bakingTempC?: number;
  weightLossRatio?: number; // moisture loss % during baking (e.g. 0.10)
  targetFinishedUnitWeightGrams?: number;
}

export interface RecipeImageAsset {
  asset_id: string;
  recipe_id: string;
  image_role: 'primary' | 'close_up' | 'cut_cross_section' | 'ingredients' | 'step';
  source_url: string;
  local_asset_url?: string;
  source_page_url?: string;
  source_name: string;
  license: string;
  verification_status: 'verified' | 'provisional' | 'needs_review';
  verification_notes?: string;
  alt_text: string;
  last_verified_at?: string;
  is_active: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  persianSubtitle: string;
  canonical_name?: string;
  alternate_names?: string[];
  category: RecipeCategory;
  categoryNameFa: string;
  image: string;
  image_assets?: RecipeImageAsset[];
  image_verification_status?: 'verified' | 'provisional' | 'needs_review';
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  baseServings: number;
  difficulty: DifficultyLevel;
  difficultyFa: string;
  caloriesPerServing: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams?: number;
  dietaryTags?: ('low_calorie' | 'high_protein' | 'keto' | 'diabetic' | 'vegetarian' | 'gluten_free')[];
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  allergens: AllergenType[];
  ingredients: IngredientItem[];
  steps: RecipeStep[];
  goldenTips: string[];
  pastryDetails?: PastryDetails;
  shelfLifeDays?: number;
  storageInstructions?: string;
  originRegion?: string;
  originProvince?: string;
  source_references?: string[];
  recipe_quality_status?: 'culinary_approved' | 'standard' | 'in_review';
}

export interface ProvinceCoverageItem {
  id: string;
  nameFa: string;
  centerFa: string;
  totalDishes: number;
  sampleDishes: string[];
  status: 'covered' | 'in_progress' | 'planned';
}

export interface CategoryCoverageItem {
  category: RecipeCategory;
  categoryNameFa: string;
  totalRecipes: number;
  verifiedImagesCount: number;
  coveragePercentage: number;
  status: 'complete' | 'in_progress' | 'planned';
}

export interface UserProfileHealth {
  gender: 'male' | 'female';
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg?: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'maintenance' | 'muscle_gain';
  targetWeeks?: number;
  targetDays?: number;
  targetDate?: string;
  startDate?: string;
  startWeightKg?: number;
}

export interface TimedGoalPlan {
  currentWeight: number;
  targetWeight: number;
  startWeight: number;
  weightDiff: number;
  isLoss: boolean;
  totalCalorieDiff: number;
  targetDays: number;
  dailyCalorieDelta: number;
  tdeeCalories: number;
  targetDailyCalories: number;
  isSafeRate: boolean;
  safeFloorCalories: number;
  safeRealisticDays: number;
  ratePerWeekKg: number;
  expectedTodayWeight: number;
  trajectoryDifference: number; // actual - expected
  trajectoryStatus: 'ahead' | 'on_track' | 'behind';
  trajectoryStatusFa: string;
  startDate: string;
  targetDate: string;
}

export interface ChatMemoryLogEntry {
  id: string;
  timestamp: string;
  dateShamsi?: string;
  sourceContext: string;
  userQuery: string;
  aiSummary: string;
}

export interface AIPageContext {
  pageName: string;
  pageTitleFa: string;
  activeRecipe?: {
    id: string;
    title: string;
    persianSubtitle?: string;
    category: string;
    categoryNameFa?: string;
    description?: string;
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    baseServings?: number;
    caloriesPerServing?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatGrams?: number;
    fiberGrams?: number;
    difficultyFa?: string;
    originRegion?: string;
    ingredients: string[]; // with exact amounts and units
    steps: string[]; // step descriptions with durations and tips
    goldenTips: string[];
    fullRecipeDetailsFa?: string; // formatted comprehensive details
  };
  healthData?: {
    weightKg: number;
    targetWeightKg: number;
    dailyCalories: number;
    trajectoryStatusFa: string;
    targetDaysRemaining: number;
  };
  extraContext?: string;
}

export interface WeightLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  dateShamsi?: string;
  weightKg: number;
  note?: string;
  bmi: number;
  createdAt: string;
}

export interface WaterLogData {
  date: string;
  glassesCount: number;
  targetGlasses: number;
}

export interface HealthCalculationResult {
  bmi: number;
  bmiCategoryFa: string;
  bmiColorClass: string;
  bmrCalories: number;
  tdeeCalories: number;
  targetDailyCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
}

export interface CakeCalculationInput {
  cakeType: 'sponge' | 'chiffon' | 'chocolate' | 'carrot' | 'red_velvet';
  calculationMode: 'by_weight' | 'by_servings' | 'by_pan_size';
  targetWeightKg: number;      // Finished target cake weight with frosting (e.g. 1.5 kg)
  servingsCount: number;       // e.g. 10 persons (each ~ 130g)
  panShape: 'round' | 'square' | 'rectangle';
  panDiameterCm: number;       // for round
  panWidthCm?: number;         // for rect
  panLengthCm?: number;
  panHeightCm: number;
  layersCount: number;         // 2 or 3 layers
  frostingPreference: 'light' | 'medium' | 'heavy'; // ratio of cream/filling
}

export interface CakeCalculationResult {
  scaleFactor: number;
  rawBatterWeightGrams: number;
  bakedSpongeWeightGrams: number;
  creamFillingWeightGrams: number;
  totalFinishedWeightGrams: number;
  servingsCount: number;
  recommendedPanDiameterCm: number;
  recommendedPanCount: number;
  recommendedBakeTempC: number;
  recommendedBakeTimeMinutes: number;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    bakersPercentage?: number;
  }[];
  notes: string[];
}

export interface MealPlanDay {
  dayIndex: number; // 0 = Saturday (شنبه), 6 = Friday (جمعه)
  dayNameFa: string;
  breakfastRecipeId?: string;
  breakfastLocked?: boolean;
  lunchRecipeId?: string;
  lunchLocked?: boolean;
  dinnerRecipeId?: string;
  dinnerLocked?: boolean;
  servings: number;
}

export interface WeeklyMealPlan {
  id: string;
  name: string;
  createdAt: string;
  days: MealPlanDay[];
}

export interface InventoryItem {
  id: string;
  name: string;
  amount: number;
  unit: MeasurementUnit;
  category: string;
  storageLocation: 'refrigerator' | 'freezer' | 'pantry';
  storageLocationFa: string;
  expirationDate: string; // YYYY-MM-DD
  isLowStock?: boolean;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  neededAmount: number;
  amount?: number;
  unit: MeasurementUnit;
  inStockAmount: number;
  toBuyAmount: number;
  purchased: boolean;
  category: string;
  neededForRecipes?: string[];
  estimatedCostToman?: number;
  okalaPriceToman?: number | null;
  isRealOkalaPrice?: boolean;
  okalaSearchUrl?: string;
  okalaBenchmarkLabel?: string;
}

export interface IngredientSubstitution {
  originalIngredient: string;
  substituteIngredient: string;
  ratioDescription: string;
  ratioMultiplier: number;
  textureEffectFa: string;
  flavorEffectFa: string;
  bakingEffectFa: string;
  limitationsFa: string;
  confidenceRating: number; // 1 to 5 stars
  allergenAlertFa?: string;
}

export interface TestExecutionResult {
  testId: string;
  title: string;
  category: 'scaling' | 'cake_pan' | 'weekly_planner' | 'fridge_match' | 'units_math' | 'pwa_android' | 'health_goal' | 'ai_memory';
  status: 'passed' | 'failed' | 'running';
  executionTimeMs: number;
  details: string;
  assertionsCount: number;
}

// ==========================================
// 8. MULTI-USER & FAMILY PROFILES (حساب‌های کاربری خانواده)
// ==========================================
export interface FamilyMemberProfile {
  id: string;
  name: string;
  relation: 'self' | 'spouse' | 'child' | 'mother' | 'father' | 'sibling' | 'friend' | 'other';
  relationFa: string;
  avatarUrl: string;
  gender: 'male' | 'female';
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'maintenance' | 'muscle_gain';
  targetWeeks: number;
  targetDays?: number;
  createdAt: string;
}

// ==========================================
// 9. PERSONALIZED DIET PLAN (رژیم اختصاصی ۳ وعده بر حسب قاشق)
// ==========================================
export interface DietMealItem {
  id: string;
  dishTitle: string;
  portionSpoonsFa: string; // مقدار دقیق بر حسب قاشق، کف دست نان، پیاله
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  mealTypeFa: string;
  dietTagsFa: string[];
  goldenTipFa?: string;
}

export interface DietDayPlan {
  dayKey: string;           // sat, sun, mon, tue, wed, thu, fri
  dayTitleFa: string;       // شنبه، یکشنبه، دوشنبه...
  breakfast: DietMealItem;
  lunch: DietMealItem;
  dinner: DietMealItem;
  totalCalories: number;
  targetDailyCalories: number;
  diffCalories: number;
}

export interface PersonalizedDietReport {
  memberId: string;
  memberName: string;
  currentWeightKg: number;
  targetWeightKg: number;
  weightDiffKg: number;
  isLoss: boolean;
  isGain: boolean;
  isMaintenance: boolean;
  targetWeeks: number;
  weeklyRateKg: number;
  isSafeRate: boolean;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  activityLevelFa: string;
  bmrCalories: number;
  tdeeCalories: number;
  dailyCalorieDelta: number; // e.g. -500 or +350
  targetDailyCalories: number;
  safeFloorCalories: number;
  bmi: number;
  bmiCategoryFa: string;
  days: DietDayPlan[];
  generatedAt: string;
}

