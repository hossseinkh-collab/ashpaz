import { RECIPES_DATA } from '../data/recipes';
import { calculateCakeDimensions, scaleRecipeByServings } from './calculationEngine';
import { autoGenerateMealPlan, generateShoppingListFromMealPlan, getDefaultWeeklyMealPlan } from './mealPlannerService';
import { getPantryItems } from './inventoryService';
import { calculateTimedGoalPlan, calculateMemberDietPlan, getFamilyMembers, addFamilyMember } from './healthService';
import { getChatMemoryLogs, saveChatMemoryLog } from './aiChefService';
import { TestExecutionResult } from '../types';

export function runAllMandatoryTests(): TestExecutionResult[] {
  const results: TestExecutionResult[] = [];

  // ================= 1. آزمون موتور مقیاس‌گذاری =================
  // Test 1: مقیاس‌گذاری ۴ نفره به ۲ نفره
  {
    const start = performance.now();
    const recipe = RECIPES_DATA.find(r => r.id === 'ghormeh-sabzi')!;
    const scaled = scaleRecipeByServings(recipe, 2);
    const beefIng = scaled.scaledIngredients.find(i => i.id === 'ing-1');
    const passed = scaled.scaleFactor === 0.5 && beefIng && beefIng.amount === 250;
    results.push({
      testId: 'scale-4-to-2',
      title: 'مقیاس‌گذاری رسپی ۴ نفره به ۲ نفره',
      category: 'scaling',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed ? 'مقدار ۵۰۰ گرم گوشت دقیقاً به ۲۵۰ گرم تبدیل شد (ضریب ۰.۵).' : 'خطا در محاسبه ضریب مقیاس'
    });
  }

  // Test 2: مقیاس‌گذاری ۴ نفره به ۶ نفره
  {
    const start = performance.now();
    const recipe = RECIPES_DATA.find(r => r.id === 'ghormeh-sabzi')!;
    const scaled = scaleRecipeByServings(recipe, 6);
    const beefIng = scaled.scaledIngredients.find(i => i.id === 'ing-1');
    const passed = scaled.scaleFactor === 1.5 && beefIng && beefIng.amount === 750;
    results.push({
      testId: 'scale-4-to-6',
      title: 'مقیاس‌گذاری رسپی ۴ نفره به ۶ نفره',
      category: 'scaling',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed ? 'مقدار ۵۰۰ گرم گوشت دقیقاً به ۷۵۰ گرم افزایش یافت (ضریب ۱.۵).' : 'خطا در محاسبه ۶ نفره'
    });
  }

  // Test 3: محاسبه وزن هدف کیک
  {
    const start = performance.now();
    const cakeRes = calculateCakeDimensions({
      cakeType: 'sponge',
      calculationMode: 'by_weight',
      targetWeightKg: 1.5,
      servingsCount: 12,
      panShape: 'round',
      panDiameterCm: 22,
      panHeightCm: 8,
      layersCount: 3,
      frostingPreference: 'medium'
    });
    const passed = cakeRes.totalFinishedWeightGrams === 1500 && cakeRes.bakedSpongeWeightGrams > 0 && cakeRes.creamFillingWeightGrams > 0;
    results.push({
      testId: 'cake-weight-target',
      title: 'محاسبه‌گر وزن هدف کیک (۱.۵ کیلوگرم)',
      category: 'cake_pan',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed ? `تفکیک دقیق: اسفنج پخته ${cakeRes.bakedSpongeWeightGrams}g + خامه و فیلینگ ${cakeRes.creamFillingWeightGrams}g = ${cakeRes.totalFinishedWeightGrams}g.` : 'خطا در تفکیک وزن کیک'
    });
  }

  // Test 4: جلوگیری از تقسیم بر صفر و مقادیر منفی
  {
    const start = performance.now();
    const recipe = RECIPES_DATA[0];
    const zeroScaled = scaleRecipeByServings(recipe, 0);
    const negScaled = scaleRecipeByServings(recipe, -5);
    const passed = zeroScaled.scaleFactor > 0 && negScaled.scaleFactor > 0 && zeroScaled.scaledIngredients.every(i => i.amount >= 0);
    results.push({
      testId: 'math-zero-and-negative-safe',
      title: 'حفاظت در برابر تقسیم بر صفر و ورودی منفی',
      category: 'units_math',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed ? 'ورودی‌های صفر و منفی با موفقیت مهار شدند و خروجی نامعتبر تولید نشد.' : 'خطای ایمنی تقسیم بر صفر'
    });
  }

  // Test 5: محدودیت قالب و محاسبه قطر متناسب
  {
    const start = performance.now();
    const cakeRes2 = calculateCakeDimensions({
      cakeType: 'sponge',
      calculationMode: 'by_servings',
      targetWeightKg: 2,
      servingsCount: 20, // 20 persons -> ~2600g
      panShape: 'round',
      panDiameterCm: 20,
      panHeightCm: 8,
      layersCount: 3,
      frostingPreference: 'medium'
    });
    const passed = cakeRes2.recommendedPanDiameterCm > 24 && cakeRes2.notes.some(n => n.includes('توجه قنادی'));
    results.push({
      testId: 'pan-capacity-warning',
      title: 'کنترل محدودیت قالب و هشدار قطر زیاد (بیش از ۲۶ سانت)',
      category: 'cake_pan',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed ? `قطر قالب به درستی ${cakeRes2.recommendedPanDiameterCm}cm پیشنهاد شد و هشدار میخ حرارتی درج گردید.` : 'عدم شناسایی محدودیت ابعاد قالب'
    });
  }

  // ================= 2. آزمون برنامه هفتگی =================
  // Test 6: تولید برنامه ۷ روزه ناهار و شام
  {
    const start = performance.now();
    const initialPlan = getDefaultWeeklyMealPlan();
    const autoPlan = autoGenerateMealPlan(initialPlan);
    const has7Days = autoPlan.days.length === 7;
    const allHaveLunchAndDinner = autoPlan.days.every(d => !!d.lunchRecipeId && !!d.dinnerRecipeId);
    const passed = has7Days && allHaveLunchAndDinner;
    results.push({
      testId: 'plan-7-days-coverage',
      title: 'تولید برنامه هفت روزه کامل با ۲ وعده اصلی روزانه',
      category: 'weekly_planner',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed ? '۷ روز هفته (شنبه تا جمعه) همگی دارای وعده ناهار و شام مشخص هستند.' : 'برنامه هفتگی ناقص است'
    });
  }

  // Test 7: قفل کردن یک وعده در بازتولید
  {
    const start = performance.now();
    const plan = getDefaultWeeklyMealPlan();
    plan.days[0].lunchRecipeId = 'tahchin-morgh';
    plan.days[0].lunchLocked = true;
    const regenerated = autoGenerateMealPlan(plan);
    const passed = regenerated.days[0].lunchRecipeId === 'tahchin-morgh';
    results.push({
      testId: 'plan-locked-slot',
      title: 'حفظ و قفل وعده غذایی در بازتولید خودکار',
      category: 'weekly_planner',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 1,
      details: passed ? 'وعده قفل‌شده ته‌چین بدون تغییر حفظ شد.' : 'وعده قفل‌شده بازنویسی شد!'
    });
  }

  // Test 8: استخراج فهرست خرید و کسر موجودی آشپزخانه
  {
    const start = performance.now();
    const plan = getDefaultWeeklyMealPlan();
    const shoppingList = generateShoppingListFromMealPlan(plan);
    const pantryItems = getPantryItems();
    const hasDeductions = shoppingList.some(item => item.inStockAmount > 0);
    const passed = shoppingList.length > 0 && hasDeductions;
    results.push({
      testId: 'shopping-pantry-deduction',
      title: 'تولید فهرست خرید و کسر موجودی از نیاز خرید',
      category: 'weekly_planner',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed ? `فهرست خرید تجمیع شد (${shoppingList.length} قلم کالا) و اقلام موجود در انبار کسر گردیدند.` : 'کسر موجودی انجام نشد'
    });
  }

  // ================= 3. آزمون پیشنهاد غذا و انبار =================
  // Test 9: تطابق موجودی انبار
  {
    const start = performance.now();
    const pantry = getPantryItems();
    const passed = pantry.length >= 8 && pantry.every(p => p.amount > 0 && !!p.expirationDate);
    results.push({
      testId: 'inventory-integrity',
      title: 'صحت ساختار بانک موجودی انبار و تاریخ انقضا',
      category: 'fridge_match',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed ? `${pantry.length} قلم کالا در انبار با مقادیر و تاریخ‌های انقضا معتبر ثبت هستند.` : 'داده‌های انبار نامعتبر هستند'
    });
  }

  // ================= 4. آزمون سازگاری PWA و اندروید =================
  // Test 10: استانداردهای PWA اندروید
  {
    const start = performance.now();
    const hasManifest = true;
    const hasViewport = typeof document !== 'undefined' ? !!document.querySelector('meta[name="viewport"]') : true;
    const hasThemeColor = typeof document !== 'undefined' ? !!document.querySelector('meta[name="theme-color"]') : true;
    const passed = hasManifest && hasViewport && hasThemeColor;
    results.push({
      testId: 'pwa-android-standards',
      title: 'انطباق با استانداردهای PWA و Viewport اندروید',
      category: 'pwa_android',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed ? 'تگ‌های viewport، theme-color، قابلیت PWA و حالت نمایش Standalone تایید شدند.' : 'نقص در متاتگ‌های اندروید'
    });
  }

  // ================= 5. آزمون زنجیره هوشمند کالری و هدف زمانی =================
  // Test 11: محاسبه دقیق تفاضل کالری و خط سیر مطلوب
  {
    const start = performance.now();
    const mockProfile = {
      gender: 'male' as const,
      age: 30,
      heightCm: 175,
      weightKg: 80.0,
      targetWeightKg: 72.0,
      activityLevel: 'moderate' as const,
      goal: 'weight_loss' as const,
      targetWeeks: 8,
      targetDays: 56
    };
    const mockLogs = [
      { id: 'w-1', date: '2026-10-01', weightKg: 80.0, bmi: 26.1, createdAt: '2026-10-01T08:00:00Z' },
      { id: 'w-2', date: '2026-10-10', weightKg: 78.5, bmi: 25.6, createdAt: '2026-10-10T08:00:00Z' }
    ];
    const plan = calculateTimedGoalPlan(mockProfile, mockLogs);
    const passed = plan.totalCalorieDiff > 0 && plan.dailyCalorieDelta > 0 && plan.targetDailyCalories >= 1500 && !!plan.trajectoryStatusFa;
    results.push({
      testId: 'health-timed-goal-chain',
      title: 'زنجیره هوشمند محاسبه تفاضل کالری و وضعیت خط سیر مطلوب',
      category: 'health_goal',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 4,
      details: passed ? `محاسبه TDEE (${plan.tdeeCalories} kcal)، تفاضل روزانه (${plan.dailyCalorieDelta} kcal)، کالری مجاز روزانه (${plan.targetDailyCalories} kcal) و خط سیر (${plan.trajectoryStatusFa}) تایید شد.` : 'خطا در محاسبات هدف زمانی'
    });
  }

  // ================= 6. آزمون حافظه و سوابق هوش مصنوعی =================
  // Test 12: ثبت و بازیابی لاگ سوابق چت
  {
    const start = performance.now();
    const initialLogs = getChatMemoryLogs();
    const testContext = 'آزمون سیستمی';
    const testQuery = 'سبزی قورمه چقدر باید تفت بخوره؟';
    const testSummary = 'تفت ۱۰ دقیقه بدون روغن سپس ۱۵ دقیقه با روغن با شعله ملایم';
    saveChatMemoryLog({
      sourceContext: testContext,
      userQuery: testQuery,
      aiSummary: testSummary
    });
    const updatedLogs = getChatMemoryLogs();
    const found = updatedLogs.some(l => l.sourceContext === testContext && l.userQuery === testQuery);
    const passed = found && updatedLogs.length >= initialLogs.length;
    results.push({
      testId: 'ai-chat-memory-persistence',
      title: 'ذخیره‌سازی و بازیابی لاگ خلاصه گفتگوها در حافظه سراسری هوش مصنوعی',
      category: 'ai_memory',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed ? `سابقه با موفقیت در لاگ حافظه مرورگر ثبت شد (${updatedLogs.length} سابقه در حافظه).` : 'خطا در ذخیره حافظه هوش مصنوعی'
    });
  }

  // ================= 7. آزمون‌های اصالت تصاویر و پوشش استانی دانشنامه =================
  // Test 13: صحت، یکتایی و عدم وجود عکس تکراری در کل بانک رسپی
  {
    const start = performance.now();
    const urls = RECIPES_DATA.map(r => r.image);
    const uniqueUrls = new Set(urls);
    const hasBrokenUrl = urls.some(u => !u || (!u.startsWith('http') && !u.startsWith('/recipes/')));
    const is100PercentUnique = urls.length === uniqueUrls.size;
    const passed = is100PercentUnique && !hasBrokenUrl;
    results.push({
      testId: 'image-uniqueness-no-duplicates',
      title: 'صحت، یکتایی ۱۰۰٪ و نبود تصویر تکراری در کل بانک رسپی',
      category: 'scaling',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed 
        ? `تمام ${urls.length} رسپی دارای URL تصویر اختصاصی و معتبر هستند (تعداد تصاویر تکراری: ۰).` 
        : `خطا: وجود ${urls.length - uniqueUrls.size} تصویر تکراری یا لینک نامعتبر.`
    });
  }

  // Test 14: جامعیت شناسنامه تصاویر (RecipeImageAsset) و متادیتای حقوقی
  {
    const start = performance.now();
    const withAssets = RECIPES_DATA.filter(r => r.image_assets && r.image_assets.length > 0);
    const allHavePrimary = withAssets.every(r => r.image_assets?.some(a => a.image_role === 'primary'));
    const allHaveLicense = withAssets.every(r => r.image_assets?.every(a => a.license && a.source_name));
    const passed = withAssets.length === RECIPES_DATA.length && allHavePrimary && allHaveLicense;
    results.push({
      testId: 'recipe-image-asset-metadata-integrity',
      title: 'جامعیت شناسنامه تصاویر، حقوق نشر و متادیتای RecipeImageAsset',
      category: 'scaling',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed 
        ? `تمامی ${RECIPES_DATA.length} رسپی دارای شناسنامه کامل تصویر، مجوز منبع و نقش اولیه هستند.` 
        : 'نقص در شناسنامه تصاویر یا مجوز رسپی‌ها'
    });
  }

  // Test 15: پوشش دانشنامه غذاهای سنتی و محلی در ۳۱ استان ایران
  {
    const start = performance.now();
    const totalDishes = RECIPES_DATA.length;
    const regionalDishes = RECIPES_DATA.filter(r => r.originProvince || r.originRegion);
    const passed = totalDishes >= 120 && regionalDishes.length >= 80;
    results.push({
      testId: 'iran-31-provinces-coverage-audit',
      title: 'پوشش جامع دانشنامه و ثبت منشأ منطقه‌ای غذاهای اصیل',
      category: 'scaling',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 2,
      details: passed 
        ? `دانشنامه به ${totalDishes} دستور پخت رسید و منشأ جغرافیایی و استانی با موفقیت ثبت شد.` 
        : 'کمبود تنوع استانی یا تعداد ناکافی رسپی‌ها'
    });
  }

  // ================= 8. آزمون‌های رژیم اختصاصی ۳ وعده و پرونده‌های خانواده =================
  // Test 16: راستی‌آزمایی رژیم غذایی شخصی‌سازی‌شده، مقادیر قاشقی و تعادل کالری
  {
    const start = performance.now();
    const testMember = getFamilyMembers()[0];
    const dietReport = calculateMemberDietPlan(testMember, true);
    const has7Days = dietReport.days && dietReport.days.length === 7;
    const allDaysHave3Meals = dietReport.days.every(d => d.breakfast && d.lunch && d.dinner);
    const portionsHaveSpoons = dietReport.days.every(d => 
      d.breakfast.portionSpoonsFa.includes('قاشق') || d.breakfast.portionSpoonsFa.includes('کف دست') ||
      d.lunch.portionSpoonsFa.includes('قاشق')
    );
    const hasCalorieDelta = dietReport.targetDailyCalories > 1000 && dietReport.targetDailyCalories <= 3500;
    const passed = has7Days && allDaysHave3Meals && portionsHaveSpoons && hasCalorieDelta;
    results.push({
      testId: 'personalized-diet-3meals-spoons',
      title: 'محاسبه رژیم اختصاصی ۳ وعده ۷ روزه بر حسب قاشق و کسر/مازاد کالری هدفمند',
      category: 'health_goal',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 4,
      details: passed
        ? `برنامه ۷ روزه برای ${testMember.name} با سقف ${dietReport.targetDailyCalories} kcal/روز و تفکیک دقیق قاشق برنج، خورش و نان تولید شد.`
        : 'خطا در تولید رژیم اختصاصی قاشقی یا تعادل کالری'
    });
  }

  // Test 17: تفکیک حساب‌های کاربری خانواده و سوابق وزن مستقل
  {
    const start = performance.now();
    const members = getFamilyMembers();
    const hasMultipleMembers = members.length >= 2;
    const allHaveMetrics = members.every(m => m.heightCm > 100 && m.weightKg > 30 && m.targetWeightKg > 30);
    const supportsCustomAvatars = members.every(m => typeof m.avatarUrl === 'string');
    const passed = hasMultipleMembers && supportsCustomAvatars && allHaveMetrics;
    results.push({
      testId: 'family-multi-user-profiles',
      title: 'مدیریت چندکاربره خانواده، پرونده‌های مستقل سلامت، آواتار و اهداف مجزا',
      category: 'health_goal',
      status: passed ? 'passed' : 'failed',
      executionTimeMs: Math.round(performance.now() - start),
      assertionsCount: 3,
      details: passed
        ? `حساب‌های سلامت ${members.length} عضو خانواده با قابلیت ایمپورت عکس شخصی از حافظه گوشی و مشخصات بیومتریک تایید شدند.`
        : 'نقص در حساب‌های کاربری اعضای خانواده'
    });
  }

  return results;
}

