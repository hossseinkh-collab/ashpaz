import { CakeCalculationInput, CakeCalculationResult, IngredientItem, MeasurementUnit, Recipe } from '../types';

/**
 * Universal Unit Conversion & Normalization
 */
export function normalizeToGramsOrMl(
  amount: number, 
  unit: MeasurementUnit, 
  unitWeightInGrams?: number,
  ingredientName?: string
): { value: number; type: 'mass' | 'volume' | 'count' } {
  const safeAmount = Math.max(0, amount);
  switch (unit) {
    case 'kg':
      return { value: safeAmount * 1000, type: 'mass' };
    case 'g':
      return { value: safeAmount, type: 'mass' };
    case 'liter':
      return { value: safeAmount * 1000, type: 'volume' };
    case 'ml':
      return { value: safeAmount, type: 'volume' };
    case 'cup': {
      const name = (ingredientName || '').toLowerCase();
      if (name.includes('آرد') || name.includes('پودر قند') || name.includes('نشاسته')) {
        return { value: safeAmount * 125, type: 'mass' };
      }
      if (name.includes('شکر') || name.includes('برنج') || name.includes('عدس') || name.includes('لوبیا') || name.includes('نخود')) {
        return { value: safeAmount * 200, type: 'mass' };
      }
      if (name.includes('سبزی')) {
        return { value: safeAmount * 70, type: 'mass' };
      }
      return { value: safeAmount * 240, type: 'volume' };
    }
    case 'tbsp':
      return { value: safeAmount * 15, type: 'volume' };
    case 'tsp':
      return { value: safeAmount * 5, type: 'volume' };
    case 'pcs': {
      if (unitWeightInGrams && unitWeightInGrams > 0) {
        return { value: safeAmount * unitWeightInGrams, type: 'count' };
      }
      const name = (ingredientName || '').toLowerCase();
      if (name.includes('سیر') || name.includes('حبه')) {
        return { value: safeAmount * 6, type: 'count' };
      }
      if (name.includes('تخم')) {
        return { value: safeAmount * 55, type: 'count' };
      }
      if (name.includes('پیاز')) {
        return { value: safeAmount * 100, type: 'count' };
      }
      if (name.includes('سیب‌زمینی') || name.includes('سیب زمینی')) {
        return { value: safeAmount * 120, type: 'count' };
      }
      if (name.includes('گوجه')) {
        return { value: safeAmount * 100, type: 'count' };
      }
      if (name.includes('بادمجان')) {
        return { value: safeAmount * 150, type: 'count' };
      }
      if (name.includes('هویج')) {
        return { value: safeAmount * 80, type: 'count' };
      }
      if (name.includes('لیمو عمانی')) {
        return { value: safeAmount * 8, type: 'count' };
      }
      if (name.includes('برگ بو')) {
        return { value: safeAmount * 1, type: 'count' };
      }
      if (name.includes('چوب دارچین')) {
        return { value: safeAmount * 4, type: 'count' };
      }
      return { value: safeAmount * 50, type: 'count' };
    }
    default:
      return { value: safeAmount, type: 'mass' };
  }
}

/**
 * Clean formatting for cooking measurements
 */
export function formatMeasurement(amount: number, unit: MeasurementUnit): string {
  // Prevent zero or negative
  const safeAmount = Math.max(0, amount);

  // If very large grams, display in kg
  if (unit === 'g' && safeAmount >= 1000) {
    const inKg = safeAmount / 1000;
    return `${inKg % 1 === 0 ? inKg : inKg.toFixed(2)} کیلوگرم`;
  }

  // If large ml, display in liter
  if (unit === 'ml' && safeAmount >= 1000) {
    const inL = safeAmount / 1000;
    return `${inL % 1 === 0 ? inL : inL.toFixed(2)} لیتر`;
  }

  const unitMapFa: Record<MeasurementUnit, string> = {
    g: 'گرم',
    kg: 'کیلوگرم',
    ml: 'میلی‌لیتر',
    liter: 'لیتر',
    cup: 'پیمانه',
    tbsp: 'قاشق غذاخوری',
    tsp: 'قاشق چای‌خوری',
    pcs: 'عدد'
  };

  const formattedNum = Number.isInteger(safeAmount)
    ? safeAmount.toString()
    : safeAmount >= 10
    ? safeAmount.toFixed(1)
    : safeAmount >= 1
    ? safeAmount.toFixed(1)
    : safeAmount.toFixed(2);

  return `${formattedNum} ${unitMapFa[unit] || unit}`;
}

/**
 * Scale Recipe by Servings
 */
export function scaleRecipeByServings(recipe: Recipe, targetServings: number): {
  scaledIngredients: (IngredientItem & { originalAmount: number })[];
  scaleFactor: number;
  totalEstimatedCostToman: number;
  costPerServingToman: number;
} {
  const safeBase = Math.max(1, recipe.baseServings);
  const safeTarget = Math.max(1, targetServings);
  const scaleFactor = safeTarget / safeBase;

  let totalCost = 0;

  const scaledIngredients = recipe.ingredients.map(ing => {
    const scaledAmount = Number((ing.amount * scaleFactor).toFixed(2));
    
    // Estimate cost
    if (ing.approxCostPer100g) {
      const norm = normalizeToGramsOrMl(scaledAmount, ing.unit, ing.unitWeightInGrams, ing.name);
      const costForIng = (norm.value / 100) * ing.approxCostPer100g;
      totalCost += costForIng;
    }

    return {
      ...ing,
      originalAmount: ing.amount,
      amount: scaledAmount
    };
  });

  return {
    scaledIngredients,
    scaleFactor,
    totalEstimatedCostToman: Math.round(totalCost),
    costPerServingToman: Math.round(totalCost / safeTarget)
  };
}

/**
 * Cake & Pastry Weight & Pan Sizing Engine
 * Base reference: 6 eggs, 150g sugar, 150g flour yields ~520g sponge cake.
 * Standard round pan: 20cm diameter (area ~ 314 cm²).
 */
export function calculateCakeDimensions(input: CakeCalculationInput): CakeCalculationResult {
  const BASE_PAN_DIAMETER_CM = 20;
  const BASE_PAN_AREA = Math.PI * Math.pow(BASE_PAN_DIAMETER_CM / 2, 2); // ~314.16 cm²
  const BASE_SPONGE_WEIGHT_G = 520; // 6-egg base baked sponge weight
  const BAKING_MOISTURE_LOSS_RATIO = 0.11; // 11% weight loss during baking

  // Determine Target Finished Weight (Grams)
  let targetFinishedWeightGrams = 1000; // default 1 kg

  if (input.calculationMode === 'by_weight') {
    targetFinishedWeightGrams = Math.max(300, input.targetWeightKg * 1000);
  } else if (input.calculationMode === 'by_servings') {
    // 1 portion of decorated cake is typically 120-140 grams
    const gramsPerPerson = 130;
    targetFinishedWeightGrams = Math.max(300, input.servingsCount * gramsPerPerson);
  } else if (input.calculationMode === 'by_pan_size') {
    // Calculate area of target pan
    let targetArea = BASE_PAN_AREA;
    if (input.panShape === 'round') {
      const radius = input.panDiameterCm / 2;
      targetArea = Math.PI * radius * radius;
    } else if (input.panShape === 'square') {
      targetArea = input.panDiameterCm * input.panDiameterCm;
    } else if (input.panShape === 'rectangle') {
      const w = input.panWidthCm || 20;
      const l = input.panLengthCm || 30;
      targetArea = w * l;
    }
    const areaRatio = targetArea / BASE_PAN_AREA;
    const baseTotalFinished = 1200; // 520g sponge + 680g cream/filling for 20cm pan
    targetFinishedWeightGrams = Math.round(baseTotalFinished * areaRatio);
  }

  // Split target weight between Baked Sponge and Cream/Filling
  // Frosting ratios:
  // Light: 60% sponge, 40% cream
  // Medium: 48% sponge, 52% cream
  // Heavy: 38% sponge, 62% cream
  let spongeRatio = 0.50;
  let creamRatio = 0.50;

  if (input.frostingPreference === 'light') {
    spongeRatio = 0.62;
    creamRatio = 0.38;
  } else if (input.frostingPreference === 'heavy') {
    spongeRatio = 0.40;
    creamRatio = 0.60;
  }

  const bakedSpongeWeightGrams = Math.round(targetFinishedWeightGrams * spongeRatio);
  const creamFillingWeightGrams = Math.round(targetFinishedWeightGrams * creamRatio);
  
  // Calculate Raw Batter needed:
  // Baked = Raw * (1 - loss) => Raw = Baked / (1 - loss)
  const rawBatterWeightGrams = Math.round(bakedSpongeWeightGrams / (1 - BAKING_MOISTURE_LOSS_RATIO));

  // Scale factor relative to 6-egg base (base baked sponge = 520g)
  const scaleFactor = bakedSpongeWeightGrams / BASE_SPONGE_WEIGHT_G;

  // Servings estimation (125g finished cake per serving)
  const servingsCount = Math.max(1, Math.round(targetFinishedWeightGrams / 125));

  // Determine Recommended Pan Diameter for Round Cakes
  // Volume scaling: Area should scale proportionately with batter
  const recommendedArea = BASE_PAN_AREA * scaleFactor;
  const recommendedPanDiameterCm = Math.round(2 * Math.sqrt(recommendedArea / Math.PI));

  // Baking Temperature and Time adjustments:
  // Larger cakes need slightly lower temperature and longer baking time to bake center without burning exterior
  let recommendedBakeTempC = 175;
  let recommendedBakeTimeMinutes = 40;

  if (recommendedPanDiameterCm > 24) {
    recommendedBakeTempC = 165;
    recommendedBakeTimeMinutes = Math.round(45 + (recommendedPanDiameterCm - 24) * 3);
  } else if (recommendedPanDiameterCm < 18) {
    recommendedBakeTempC = 180;
    recommendedBakeTimeMinutes = Math.max(25, Math.round(30 - (18 - recommendedPanDiameterCm) * 2));
  }

  // Dynamic ingredient formula based on cake type:
  let ingredients: { name: string; amount: number; unit: string; bakersPercentage?: number }[] = [];

  if (input.cakeType === 'chiffon') {
    const scaledEggs = Number((6 * scaleFactor).toFixed(1));
    const scaledFlour = Math.round(160 * scaleFactor);
    const scaledSugar = Math.round(140 * scaleFactor);
    const scaledOil = Math.round(70 * scaleFactor);
    const scaledMilk = Math.round(70 * scaleFactor);
    ingredients = [
      { name: 'تخم‌مرغ خنک (زرده و سفیده جدا)', amount: scaledEggs, unit: 'عدد (~' + Math.round(scaledEggs * 55) + ' گرم)', bakersPercentage: 206 },
      { name: 'آرد نول قنادی الک‌شده ۳ بار', amount: scaledFlour, unit: 'گرم', bakersPercentage: 100 },
      { name: 'شکر سفید دانه‌ریز', amount: scaledSugar, unit: 'گرم', bakersPercentage: 88 },
      { name: 'روغن مایع پخت‌وپز', amount: scaledOil, unit: 'میلی‌لیتر', bakersPercentage: 44 },
      { name: 'شیر ولرم', amount: scaledMilk, unit: 'میلی‌لیتر', bakersPercentage: 44 },
      { name: 'وانیل و کرم تارتار', amount: Number((3 * scaleFactor).toFixed(1)), unit: 'گرم', bakersPercentage: 2 },
      { name: 'خامه قنادی برای فیلینگ', amount: creamFillingWeightGrams, unit: 'گرم', bakersPercentage: undefined }
    ];
  } else if (input.cakeType === 'chocolate') {
    const scaledEggs = Number((4 * scaleFactor).toFixed(1));
    const scaledFlour = Math.round(150 * scaleFactor);
    const scaledCocoa = Math.round(45 * scaleFactor);
    const scaledSugar = Math.round(160 * scaleFactor);
    const scaledMilk = Math.round(120 * scaleFactor);
    const scaledOil = Math.round(80 * scaleFactor);
    ingredients = [
      { name: 'آرد قنادی', amount: scaledFlour, unit: 'گرم', bakersPercentage: 100 },
      { name: 'پودر کاکائو تلخ هلندی', amount: scaledCocoa, unit: 'گرم', bakersPercentage: 30 },
      { name: 'شکر سفید', amount: scaledSugar, unit: 'گرم', bakersPercentage: 106 },
      { name: 'تخم‌مرغ کامل', amount: scaledEggs, unit: 'عدد', bakersPercentage: 140 },
      { name: 'شیر پرچرب', amount: scaledMilk, unit: 'میلی‌لیتر', bakersPercentage: 80 },
      { name: 'روغن مایع', amount: scaledOil, unit: 'میلی‌لیتر', bakersPercentage: 53 },
      { name: 'گاناش و خامه شکلاتی', amount: creamFillingWeightGrams, unit: 'گرم', bakersPercentage: undefined }
    ];
  } else if (input.cakeType === 'carrot') {
    const scaledFlour = Math.round(180 * scaleFactor);
    const scaledSugar = Math.round(140 * scaleFactor);
    const scaledCarrot = Math.round(200 * scaleFactor);
    const scaledWalnut = Math.round(70 * scaleFactor);
    const scaledOil = Math.round(100 * scaleFactor);
    ingredients = [
      { name: 'آرد گندم قنادی', amount: scaledFlour, unit: 'گرم', bakersPercentage: 100 },
      { name: 'هویج تازه ریز رنده‌شده', amount: scaledCarrot, unit: 'گرم', bakersPercentage: 111 },
      { name: 'شکر قهوه‌ای یا سفید', amount: scaledSugar, unit: 'گرم', bakersPercentage: 78 },
      { name: 'مغز گردوی خردشده', amount: scaledWalnut, unit: 'گرم', bakersPercentage: 39 },
      { name: 'روغن مایع و تخم‌مرغ', amount: scaledOil, unit: 'میلی‌لیتر', bakersPercentage: 55 },
      { name: 'پودر دارچین و جوز هندی', amount: Number((4 * scaleFactor).toFixed(1)), unit: 'گرم', bakersPercentage: 2 },
      { name: 'کرم چیز خامه‌ای', amount: creamFillingWeightGrams, unit: 'گرم', bakersPercentage: undefined }
    ];
  } else if (input.cakeType === 'red_velvet') {
    const scaledFlour = Math.round(180 * scaleFactor);
    const scaledSugar = Math.round(160 * scaleFactor);
    const scaledButtermilk = Math.round(170 * scaleFactor);
    const scaledButter = Math.round(90 * scaleFactor);
    ingredients = [
      { name: 'آرد قنادی سه بار الک‌شده', amount: scaledFlour, unit: 'گرم', bakersPercentage: 100 },
      { name: 'باترمیلک (شیر + سرکه)', amount: scaledButtermilk, unit: 'میلی‌لیتر', bakersPercentage: 94 },
      { name: 'شکر دانه‌ریز', amount: scaledSugar, unit: 'گرم', bakersPercentage: 88 },
      { name: 'کره نرم حیوانی', amount: scaledButter, unit: 'گرم', bakersPercentage: 50 },
      { name: 'پودر کاکائو و رنگ خوراکی قرمز', amount: Math.round(15 * scaleFactor), unit: 'گرم', bakersPercentage: 8 },
      { name: 'سرکه سفید و جوش‌شیرین (فوران)', amount: Number((6 * scaleFactor).toFixed(1)), unit: 'گرم', bakersPercentage: 3 },
      { name: 'فیلینگ پنیر ماسکارپونه و خامه', amount: creamFillingWeightGrams, unit: 'گرم', bakersPercentage: undefined }
    ];
  } else {
    // Default 6-Egg Sponge
    const scaledEggs = Number((6 * scaleFactor).toFixed(1));
    const scaledSugar = Math.round(150 * scaleFactor);
    const scaledFlour = Math.round(150 * scaleFactor);
    const scaledWater = Math.round(30 * scaleFactor);
    const scaledVanilla = Number((3 * scaleFactor).toFixed(1));

    ingredients = [
      { name: 'تخم‌مرغ سرد درشت (جداشده زرده و سفیده)', amount: scaledEggs, unit: 'عدد (~' + Math.round(scaledEggs * 55) + ' گرم)', bakersPercentage: 220 },
      { name: 'آرد نول سه صفر قنادی الک‌شده ۳ بار', amount: scaledFlour, unit: 'گرم', bakersPercentage: 100 },
      { name: 'شکر سفید دانه‌ریز', amount: scaledSugar, unit: 'گرم', bakersPercentage: 100 },
      { name: 'آب جوش', amount: scaledWater, unit: 'میلی‌لیتر', bakersPercentage: 20 },
      { name: 'وانیل خالص مرغوب', amount: scaledVanilla, unit: 'گرم', bakersPercentage: 2 },
      { name: 'خامه قنادی فرم‌گرفته برای فیلینگ و روکش', amount: creamFillingWeightGrams, unit: 'گرم', bakersPercentage: undefined }
    ];
  }

  const notes = [
    `ضریب مقیاس نسبت به رسپی استاندارد ۶ تخم‌مرغی: ${scaleFactor.toFixed(2)} برابر`,
    `قالب پیشنهادی برای پخت یکدست: قالب گرد قطر ${recommendedPanDiameterCm} سانتی‌متر با ارتفاع حداقل ۷ تا ۱۰ سانتی‌متر`,
    `دیواره قالب را هرگز چرب نکنید تا کیک به‌خوبی از دیواره‌ها بالا بکشد.`,
    `میزان افت رطوبت استاندارد حین پخت فر: ۱۱٪ محاسبه شده است.`
  ];

  if (recommendedPanDiameterCm > 26) {
    notes.push('توجه قنادی: قطر کیک بیش از ۲۶ سانتی‌متر است؛ برای پخت مغز کیک بدون فرورفتگی، استفاده از میخ هدایت حرارت (Heating Core) در مرکز قالب توصیه می‌شود.');
  }

  return {
    scaleFactor,
    rawBatterWeightGrams,
    bakedSpongeWeightGrams,
    creamFillingWeightGrams,
    totalFinishedWeightGrams: targetFinishedWeightGrams,
    servingsCount,
    recommendedPanDiameterCm,
    recommendedPanCount: 1,
    recommendedBakeTempC,
    recommendedBakeTimeMinutes,
    ingredients,
    notes
  };
}

/**
 * Density-aware conversion from volume (cup, tbsp, tsp, ml) to mass in grams
 */
export function convertVolumeToMassGrams(amount: number, unit: MeasurementUnit, ingredientName?: string): number {
  const norm = normalizeToGramsOrMl(amount, unit, undefined, ingredientName);
  if (norm.type === 'mass') return norm.value;
  // If volume in ml, apply specific density or default density
  const name = (ingredientName || '').toLowerCase();
  let density = 1.0; // g/ml
  if (name.includes('روغن')) density = 0.91;
  else if (name.includes('عسل')) density = 1.42;
  else if (name.includes('شیره')) density = 1.35;
  else if (name.includes('شیر')) density = 1.03;
  return Math.round(norm.value * density);
}

/**
 * Standard piece weight in grams for common discrete ingredients
 */
export function getUnitWeightForPieceItem(name: string): number {
  const clean = name.toLowerCase();
  if (clean.includes('سیر') || clean.includes('حبه')) return 5;
  if (clean.includes('تخم')) return 55;
  if (clean.includes('پیاز')) return 120;
  if (clean.includes('سیب‌زمینی') || clean.includes('سیب زمینی')) return 150;
  if (clean.includes('گوجه')) return 110;
  if (clean.includes('بادمجان')) return 160;
  if (clean.includes('هویج')) return 80;
  if (clean.includes('لیمو عمانی')) return 8;
  return 50;
}

/**
 * Scale Recipe helper returning an updated Recipe object
 */
export function calculateScaledRecipe(recipe: Recipe, targetServings: number): Recipe {
  const scaled = scaleRecipeByServings(recipe, targetServings);
  return {
    ...recipe,
    baseServings: targetServings,
    ingredients: scaled.scaledIngredients.map(i => ({
      id: i.id,
      name: i.name,
      amount: i.amount,
      unit: i.unit,
      unitWeightInGrams: i.unitWeightInGrams,
      approxCostPer100g: i.approxCostPer100g,
      category: i.category
    }))
  };
}

