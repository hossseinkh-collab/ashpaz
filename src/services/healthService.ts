import { 
  HealthCalculationResult, 
  UserProfileHealth, 
  WeightLogEntry, 
  WaterLogData, 
  TimedGoalPlan,
  FamilyMemberProfile,
  DietMealItem,
  DietDayPlan,
  PersonalizedDietReport
} from '../types';

// Safe storage helper for browser & SSR/Node test environments
const memoryStorage: Record<string, string> = {};
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {}
    return memoryStorage[key] || null;
  },
  setItem: (key: string, val: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
        return;
      }
    } catch {}
    memoryStorage[key] = val;
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch {}
    delete memoryStorage[key];
  }
};

const HEALTH_PROFILE_STORAGE_KEY = 'smart_chef_health_profile_v1';
const DAILY_INTAKE_STORAGE_KEY = 'smart_chef_daily_intake_v1';
const WEIGHT_LOGS_STORAGE_KEY = 'smart_chef_weight_logs_v1';
const WATER_LOG_STORAGE_KEY = 'smart_chef_water_log_v1';

export const DEFAULT_HEALTH_PROFILE: UserProfileHealth = {
  gender: 'male',
  age: 30,
  heightCm: 175,
  weightKg: 78.5,
  targetWeightKg: 72.0,
  activityLevel: 'moderate',
  goal: 'weight_loss',
  targetWeeks: 8,
  targetDays: 56
};

export function calculateHealthMetrics(profile: UserProfileHealth): HealthCalculationResult {
  const heightM = profile.heightCm / 100;
  const bmi = Number((profile.weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategoryFa = 'وزن طبیعی و ایده‌آل';
  let bmiColorClass = 'text-emerald-400';

  if (bmi < 18.5) {
    bmiCategoryFa = 'کمبود وزن (لاغر)';
    bmiColorClass = 'text-amber-400';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategoryFa = 'اضافه وزن ملایم';
    bmiColorClass = 'text-amber-400';
  } else if (bmi >= 30) {
    bmiCategoryFa = 'چاقی (نیازمند اصلاح برنامه غذایی)';
    bmiColorClass = 'text-red-400';
  }

  // Mifflin-St Jeor Formula
  let bmr = 0;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age - 161;
  }
  bmr = Math.round(bmr);

  // Activity Multipliers
  const activityMap = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  const tdee = Math.round(bmr * activityMap[profile.activityLevel]);

  // Adjust for Goal
  let targetDailyCalories = tdee;
  if (profile.goal === 'weight_loss') {
    targetDailyCalories = Math.max(1200, Math.round(tdee - 500));
  } else if (profile.goal === 'muscle_gain') {
    targetDailyCalories = Math.round(tdee + 350);
  }

  // Macro Target Formulation
  let proteinPerKg = 1.6;
  if (profile.goal === 'weight_loss') proteinPerKg = 1.9;
  if (profile.goal === 'muscle_gain') proteinPerKg = 2.2;

  const targetProteinGrams = Math.round(profile.weightKg * proteinPerKg);
  const fatCalories = targetDailyCalories * 0.28;
  const targetFatGrams = Math.round(fatCalories / 9);

  const remainingCalories = targetDailyCalories - (targetProteinGrams * 4 + targetFatGrams * 9);
  const targetCarbsGrams = Math.max(50, Math.round(remainingCalories / 4));

  return {
    bmi,
    bmiCategoryFa,
    bmiColorClass,
    bmrCalories: bmr,
    tdeeCalories: tdee,
    targetDailyCalories,
    targetProteinGrams,
    targetCarbsGrams,
    targetFatGrams
  };
}

export function getUserHealthProfile(): UserProfileHealth {
  try {
    const raw = safeStorage.getItem(HEALTH_PROFILE_STORAGE_KEY);
    return raw ? { ...DEFAULT_HEALTH_PROFILE, ...JSON.parse(raw) } : DEFAULT_HEALTH_PROFILE;
  } catch {
    return DEFAULT_HEALTH_PROFILE;
  }
}

export function saveUserHealthProfile(profile: UserProfileHealth): void {
  safeStorage.setItem(HEALTH_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

// -------------------------------------------------------------
// TIMED GOAL ENGINE & CALORIE CHAIN (استعلام زمان و زنجیره کالری)
// -------------------------------------------------------------

export function calculateTimedGoalPlan(profile: UserProfileHealth, logs: WeightLogEntry[]): TimedGoalPlan {
  const currentWeight = logs.length > 0 ? logs[logs.length - 1].weightKg : profile.weightKg;
  const startWeight = logs.length > 0 ? logs[0].weightKg : (profile.startWeightKg || profile.weightKg);
  const targetWeight = profile.targetWeightKg || (profile.gender === 'female' ? 60 : 72);

  const weightDiff = Number((targetWeight - currentWeight).toFixed(1));
  const isLoss = weightDiff <= 0;
  const absWeightDiff = Math.abs(weightDiff);

  // 1 kg body mass difference ≈ 7,700 kcal
  const totalCalorieDiff = Math.round(absWeightDiff * 7700);

  // Time frame
  const targetDays = Math.max(7, profile.targetDays || (profile.targetWeeks ? profile.targetWeeks * 7 : 56));
  const dailyCalorieDelta = Math.round(totalCalorieDiff / targetDays);

  // Health Metrics & TDEE
  const metrics = calculateHealthMetrics({ ...profile, weightKg: currentWeight });
  const tdeeCalories = metrics.tdeeCalories;

  // Safe bounds
  const safeFloorCalories = profile.gender === 'female' ? 1200 : 1500;
  const maxSafeDeficit = 1000; // max ~ 1 kg/week loss
  const maxSafeSurplus = 500;  // max ~ 0.5 kg/week gain

  const isSafeRate = isLoss ? (dailyCalorieDelta <= maxSafeDeficit) : (dailyCalorieDelta <= maxSafeSurplus);
  const ratePerWeekKg = Number(((absWeightDiff / targetDays) * 7).toFixed(2));
  const safeRealisticDays = Math.max(14, Math.ceil(totalCalorieDiff / (isLoss ? 600 : 400)));

  // Daily target calorie formulation
  let targetDailyCalories = isLoss ? (tdeeCalories - dailyCalorieDelta) : (tdeeCalories + dailyCalorieDelta);
  if (isLoss) {
    targetDailyCalories = Math.max(safeFloorCalories, targetDailyCalories);
  }

  // Trajectory start & target dates
  const startDateStr = logs.length > 0 ? logs[0].date : (profile.startDate || new Date().toISOString().split('T')[0]);
  const startD = new Date(startDateStr);
  const targetD = new Date(startD);
  targetD.setDate(targetD.getDate() + targetDays);
  const targetDateStr = targetD.toISOString().split('T')[0];

  // Calculate where the user should be today on the ideal trajectory line
  const today = new Date();
  const elapsedDays = Math.max(0, Math.min(targetDays, Math.floor((today.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24))));
  const progressRatio = targetDays > 0 ? (elapsedDays / targetDays) : 1;
  const expectedTodayWeight = Number((startWeight + (targetWeight - startWeight) * progressRatio).toFixed(1));

  const trajectoryDifference = Number((currentWeight - expectedTodayWeight).toFixed(1));

  let trajectoryStatus: 'ahead' | 'on_track' | 'behind' = 'on_track';
  let trajectoryStatusFa = 'مطابق خط سیر مطلوب ✓';

  if (isLoss) {
    if (trajectoryDifference <= -0.4) {
      trajectoryStatus = 'ahead';
      trajectoryStatusFa = `جلوتر از خط سیر مطلوب (${Math.abs(trajectoryDifference)} کیلوگرم سبقت)`;
    } else if (trajectoryDifference >= 0.4) {
      trajectoryStatus = 'behind';
      trajectoryStatusFa = `عقب‌تر از خط سیر مطلوب (${trajectoryDifference} کیلوگرم تا مسیر)`;
    } else {
      trajectoryStatus = 'on_track';
      trajectoryStatusFa = 'دقیقاً روی خط سیر مطلوب رژیم ✓';
    }
  } else {
    if (trajectoryDifference >= 0.4) {
      trajectoryStatus = 'ahead';
      trajectoryStatusFa = `جلوتر از خط سیر مطلوب (${trajectoryDifference} کیلوگرم پیشرفت)`;
    } else if (trajectoryDifference <= -0.4) {
      trajectoryStatus = 'behind';
      trajectoryStatusFa = `عقب‌تر از خط سیر مطلوب (${Math.abs(trajectoryDifference)} کیلوگرم فاصله)`;
    } else {
      trajectoryStatus = 'on_track';
      trajectoryStatusFa = 'دقیقاً روی خط سیر افزایش وزن مطلوب ✓';
    }
  }

  return {
    currentWeight,
    targetWeight,
    startWeight,
    weightDiff,
    isLoss,
    totalCalorieDiff,
    targetDays,
    dailyCalorieDelta,
    tdeeCalories,
    targetDailyCalories,
    isSafeRate,
    safeFloorCalories,
    safeRealisticDays,
    ratePerWeekKg,
    expectedTodayWeight,
    trajectoryDifference,
    trajectoryStatus,
    trajectoryStatusFa,
    startDate: startDateStr,
    targetDate: targetDateStr
  };
}

// -------------------------------------------------------------
// DIET JOKES, WITTY PROVERBS & PRACTICAL TIPS
// -------------------------------------------------------------

export function getDietJokesAndProverbs(status: 'ahead' | 'on_track' | 'behind', isLoss: boolean, indexOffset: number = 0): {
  joke: string;
  proverb: string;
  tag: string;
} {
  const successJokes = [
    {
      joke: 'ترازو امروز بهت لبخند زد و گفت: بالاخره یکی پیدا شد نذاره دیگ قورمه‌سبزی رو تا قطره آخر نون‌مالی کنه! ماشاالله به این اراده آهنین!',
      proverb: 'خواستن توانستن است؛ مخصوصاً وقتی تونستی از کنار ویترین قنادی بی‌تفاوت رد بشی!',
      tag: 'تشویق و پیروزی 🏆'
    },
    {
      joke: 'دانشمندان کشف کردن کسایی که وزنشون روی خط سیر پیش میره، شب‌ها خواب پیتزا می‌بینن ولی صبح املت رژیمی می‌خورن!',
      proverb: 'گر صبر کنی ز غوره حلوا سازی، با رژیم هوشمند وزن ایده‌آل سازی!',
      tag: 'اراده فولادی ✨'
    },
    {
      joke: 'ترازو ازت راضیه، آینه ازت سپاسگزاره، کمربند شلوارت هم یه نفس راحت کشید و گفت: آخیش رها شدم!',
      proverb: 'قطره قطره جمع گردد وانگهی دریا شود؛ قاشق قاشق کم گردد وانگهی باریک شود!',
      tag: 'لبخند ترازو 😊'
    },
    {
      joke: 'فلفل نبین چه ریزه، اراده رو ببین چقدر تر و تمیزه! خط سیر مطلوب داره زیر قدم‌هات تعظیم می‌کنه!',
      proverb: 'کار نیکو کردن از پر کردن است؛ یعنی بشقاب سالاد رو پر کن نه دیس چلوکباب رو!',
      tag: 'تداوم طلایی 🌟'
    }
  ];

  const offTrackJokes = [
    {
      joke: 'دیشب یخچال بهت چی کار کرده بود که نصف شب رفتی سراغش؟! نترس، دیگ دست‌نخورده قورمه‌سبزی تا فردا صبح فرار نمی‌کرد!',
      proverb: 'شتر در خواب بیند پنبه‌دانه، آدم رژیمی در خواب بیند دیزی سنگی با سنگک داغ!',
      tag: 'شوخی و تلنگر 😅'
    },
    {
      joke: 'رژیمت مثل اینترنت همراه شد؛ وسط دانلود قطع شد! ولی اشکال نداره، همین الان دکمه Resume رو بزن و برگرد روی خط سیر!',
      proverb: 'ماهی را هر وقت از آب بگیری تازه است؛ رژیم را هر وقت سفت بگیری خوش‌تیپی!',
      tag: 'بازگشت به مسیر 🎯'
    },
    {
      joke: 'کالری‌ها موجودات نامرئی کوچولویی هستن که شب‌ها میان توی کمد و لباست رو نیم‌سایز تنگ می‌کنن! نباید بهشون میدون داد!',
      proverb: 'آب رفته به جوی برنمی‌گردد، ولی چربی رفته با پیاده‌روی به باد می‌رود!',
      tag: 'راز کالری‌ها 🔍'
    },
    {
      joke: 'ترازو با تعجب نگاهت کرد و گفت: مگه قرار نبود با هم لاغر شیم؟! اشکال نداره، از ناهار امروز دوباره مچش رو می‌خوابونیم!',
      proverb: 'جلوی ضرر را از هر جا بگیری منفعت است؛ مخصوصاً جلوی قاشق سوم ته‌دیگ رو!',
      tag: 'انرژی مثبت 💪'
    }
  ];

  const pool = (status === 'ahead' || status === 'on_track') ? successJokes : offTrackJokes;
  const picked = pool[Math.abs(indexOffset) % pool.length];
  return picked;
}

export function getDietFoodSuggestions(isLoss: boolean): string[] {
  if (isLoss) {
    return [
      'یک پیش‌دستی سالاد کاهو، خیار و جوانه ۱۵ دقیقه قبل از ناهار و شام برای پر کردن حجم معده با کالری نزدیک به صفر.',
      'نوشیدن یک لیوان آب ولرم با چند قطره لیموترش تازه نیم ساعت پیش از وعده اصلی غذا.',
      'استفاده از سبزیجات بخارپز (کدو، بروکلی، هویج) به جای بخش اعظم نان یا برنج.',
      'جایگزین کردن سس مایونز با ماست یونانی کم‌چرب، آبغوره طبیعی و نعناع خشک.',
      'آرام جویدن غذا؛ هر لقمه را حداقل ۲۰ بار بجوید تا مغز پیام سیری را به موقع دریافت کند.'
    ];
  } else {
    return [
      'افزودن ۲ قاشق روغن زیتون فرابکر یا روغن کنجد روی برنج و سوپ بعد از خاموش کردن شعله.',
      'میل کردن معجون پرکالری و مقوی شامل شیر پرچرب، موز، کره بادام‌زمینی، عسل و پودر پسته بین وعده‌ها.',
      'مصرف روزانه یک مشت مغزیجات خام (گردو، بادام درختی، پسته) به عنوان میان‌وعده سالم.',
      'اضافه کردن تخم‌مرغ آبپز و سیب‌زمینی پخته با کره محلی به برنامه عصرانه.',
      'پرهیز از نوشیدن آب بلافاصله قبل از وعده غذا تا معده فضای کافی برای غذای اصلی داشته باشد.'
    ];
  }
}

// -------------------------------------------------------------
// WEIGHT TRACKING OVER TIME (ثبت وزن روزانه و نمودار زمانی)
// -------------------------------------------------------------

function generateInitialWeightHistory(baseWeight: number, heightCm: number): WeightLogEntry[] {
  const heightM = heightCm / 100;
  const entries: WeightLogEntry[] = [];
  const today = new Date();

  // Create a realistic 10-day progressive log showing gentle progress
  // Days ago: 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
  const weightOffsets = [1.8, 1.5, 1.3, 1.0, 0.8, 0.7, 0.5, 0.3, 0.1, 0];
  const notes = [
    'شروع ثبت وزن و رژیم',
    'بعد از پیاده‌روی صبحگاهی',
    'ناشتا اول صبح',
    'ثبت عادی',
    'بعد از وعده ناهار سالم',
    'ناشتا',
    'بعد از تمرین ورزشی',
    'ناشتا',
    'ناشتا',
    'امروز ناشتا'
  ];

  for (let i = 9; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const w = Number((baseWeight + weightOffsets[9 - i]).toFixed(1));
    const bmiVal = Number((w / (heightM * heightM)).toFixed(1));

    entries.push({
      id: 'wlog-' + dateStr,
      date: dateStr,
      weightKg: w,
      note: notes[9 - i],
      bmi: bmiVal,
      createdAt: d.toISOString()
    });
  }

  return entries;
}

export function resetSampleWeightLogs(): WeightLogEntry[] {
  const profile = getUserHealthProfile();
  const seeded = generateInitialWeightHistory(profile.weightKg || 74.0, profile.heightCm || 175);
  safeStorage.setItem(WEIGHT_LOGS_STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

export function getWeightLogs(): WeightLogEntry[] {
  try {
    const raw = safeStorage.getItem(WEIGHT_LOGS_STORAGE_KEY);
    if (raw) {
      const parsed: WeightLogEntry[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => a.date.localeCompare(b.date));
      }
    }
  } catch {}

  const profile = getUserHealthProfile();
  const seeded = generateInitialWeightHistory(profile.weightKg, profile.heightCm);
  safeStorage.setItem(WEIGHT_LOGS_STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

export function addWeightLog(weightKg: number, dateStr?: string, note?: string): WeightLogEntry[] {
  const profile = getUserHealthProfile();
  const heightM = profile.heightCm / 100;
  const targetDate = dateStr || new Date().toISOString().split('T')[0];
  const bmiVal = Number((weightKg / (heightM * heightM)).toFixed(1));

  const currentLogs = getWeightLogs();
  // If an entry for this exact date already exists, update it, otherwise append
  const existingIdx = currentLogs.findIndex(l => l.date === targetDate);
  const newEntry: WeightLogEntry = {
    id: existingIdx >= 0 ? currentLogs[existingIdx].id : 'wlog-' + Date.now(),
    date: targetDate,
    weightKg: Number(weightKg.toFixed(1)),
    note: note?.trim() || 'ثبت روزانه',
    bmi: bmiVal,
    createdAt: new Date().toISOString()
  };

  let updatedLogs: WeightLogEntry[];
  if (existingIdx >= 0) {
    updatedLogs = [...currentLogs];
    updatedLogs[existingIdx] = newEntry;
  } else {
    updatedLogs = [...currentLogs, newEntry];
  }

  updatedLogs.sort((a, b) => a.date.localeCompare(b.date));
  safeStorage.setItem(WEIGHT_LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));

  // Sync profile weight with latest recorded weight
  const latest = updatedLogs[updatedLogs.length - 1];
  if (latest) {
    const updatedProfile = { ...profile, weightKg: latest.weightKg };
    saveUserHealthProfile(updatedProfile);
  }

  return updatedLogs;
}

export function deleteWeightLog(id: string): WeightLogEntry[] {
  const currentLogs = getWeightLogs();
  const filtered = currentLogs.filter(l => l.id !== id);
  safeStorage.setItem(WEIGHT_LOGS_STORAGE_KEY, JSON.stringify(filtered));

  if (filtered.length > 0) {
    const latest = filtered[filtered.length - 1];
    const profile = getUserHealthProfile();
    saveUserHealthProfile({ ...profile, weightKg: latest.weightKg });
  }

  return filtered;
}

export function getWeightStats(logs: WeightLogEntry[], targetWeight?: number) {
  if (logs.length === 0) {
    return {
      currentWeight: 0,
      startWeight: 0,
      totalChange: 0,
      minWeight: 0,
      maxWeight: 0,
      avgWeight: 0,
      diffFromTarget: 0
    };
  }

  const startWeight = logs[0].weightKg;
  const currentWeight = logs[logs.length - 1].weightKg;
  const totalChange = Number((currentWeight - startWeight).toFixed(1));
  const weights = logs.map(l => l.weightKg);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const avgWeight = Number((weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1));
  const diffFromTarget = targetWeight ? Number((currentWeight - targetWeight).toFixed(1)) : 0;

  return {
    currentWeight,
    startWeight,
    totalChange,
    minWeight,
    maxWeight,
    avgWeight,
    diffFromTarget
  };
}

// -------------------------------------------------------------
// WATER INTAKE TRACKER (هیدراتاسیون و مصرف آب)
// -------------------------------------------------------------

export function getTodayWaterLog(): WaterLogData {
  const today = new Date().toISOString().split('T')[0];
  try {
    const raw = safeStorage.getItem(WATER_LOG_STORAGE_KEY + '_' + today);
    if (raw) return JSON.parse(raw);
  } catch {}

  return {
    date: today,
    glassesCount: 4, // 4 out of 8 glasses
    targetGlasses: 8
  };
}

export function updateTodayWaterLog(glasses: number): WaterLogData {
  const today = new Date().toISOString().split('T')[0];
  const safeGlasses = Math.max(0, Math.min(16, glasses));
  const updated: WaterLogData = {
    date: today,
    glassesCount: safeGlasses,
    targetGlasses: 8
  };
  safeStorage.setItem(WATER_LOG_STORAGE_KEY + '_' + today, JSON.stringify(updated));
  return updated;
}

// -------------------------------------------------------------
// DAILY CALORIE / MEAL INTAKE
// -------------------------------------------------------------

export interface DailyIntakeLog {
  date: string;
  consumedCalories: number;
  consumedProtein: number;
  consumedCarbs: number;
  consumedFat: number;
  loggedMeals: { id: string; title: string; calories: number; timestamp: string }[];
}

export function getTodayIntakeLog(): DailyIntakeLog {
  const today = new Date().toISOString().split('T')[0];
  try {
    const raw = safeStorage.getItem(DAILY_INTAKE_STORAGE_KEY + '_' + today);
    if (raw) return JSON.parse(raw);
  } catch {}

  return {
    date: today,
    consumedCalories: 640,
    consumedProtein: 42,
    consumedCarbs: 65,
    consumedFat: 24,
    loggedMeals: [
      { id: 'm-1', title: 'ته‌چین مرغ و بادمجان', calories: 640, timestamp: '۱۳:۳۰' }
    ]
  };
}

export function logMealIntake(mealTitle: string, calories: number, protein: number, carbs: number, fat: number): DailyIntakeLog {
  const today = new Date().toISOString().split('T')[0];
  const current = getTodayIntakeLog();
  const updated: DailyIntakeLog = {
    ...current,
    consumedCalories: current.consumedCalories + calories,
    consumedProtein: current.consumedProtein + protein,
    consumedCarbs: current.consumedCarbs + carbs,
    consumedFat: current.consumedFat + fat,
    loggedMeals: [
      ...current.loggedMeals,
      {
        id: 'log-' + Date.now(),
        title: mealTitle,
        calories,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  safeStorage.setItem(DAILY_INTAKE_STORAGE_KEY + '_' + today, JSON.stringify(updated));
  return updated;
}

// =============================================================
// MULTI-USER & FAMILY PROFILES (سیستم مدیریت چند کاربره خانواده)
// =============================================================

const FAMILY_MEMBERS_STORAGE_KEY = 'smart_chef_family_members_v2';
const ACTIVE_MEMBER_ID_STORAGE_KEY = 'smart_chef_active_member_id_v2';
const MEMBER_WEIGHT_LOGS_PREFIX = 'smart_chef_member_weight_';
const MEMBER_DIET_PLAN_PREFIX = 'smart_chef_member_diet_plan_';

// Default family members have blank avatars by default (no stock photos),
// allowing users to import photos directly from their phone/device.
export const INITIAL_DEFAULT_MEMBERS: FamilyMemberProfile[] = [
  {
    id: 'member-self',
    name: 'حسین (مدیر حساب)',
    relation: 'self',
    relationFa: 'خودم',
    avatarUrl: '', // بدون عکس پیش‌فرض؛ کاربر از داخل گوشی عکس مورد نظر را بارگذاری می‌کند
    gender: 'male',
    age: 32,
    heightCm: 178,
    weightKg: 82.5,
    targetWeightKg: 75.0,
    activityLevel: 'moderate',
    goal: 'weight_loss',
    targetWeeks: 8,
    targetDays: 56,
    createdAt: '2026-01-01'
  },
  {
    id: 'member-spouse',
    name: 'مریم',
    relation: 'spouse',
    relationFa: 'همسر',
    avatarUrl: '', // بدون عکس پیش‌فرض؛ کاربر از داخل گوشی عکس مورد نظر را بارگذاری می‌کند
    gender: 'female',
    age: 30,
    heightCm: 165,
    weightKg: 64.0,
    targetWeightKg: 58.0,
    activityLevel: 'light',
    goal: 'weight_loss',
    targetWeeks: 8,
    targetDays: 56,
    createdAt: '2026-01-05'
  }
];

/**
 * Compresses and center-crops a user photo from their phone into an optimized 300x300 JPEG data URL
 */
export function processDeviceImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('فایل انتخاب‌شده باید یک تصویر باشد.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const size = 300; // Optimal square size for mobile retina displays
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          // Square center-crop
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } catch {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('بارگذاری فایل عکس ناموفق بود.'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('خواندن فایل عکس ناموفق بود.'));
    reader.readAsDataURL(file);
  });
}

export function getFamilyMembers(): FamilyMemberProfile[] {
  try {
    const raw = safeStorage.getItem(FAMILY_MEMBERS_STORAGE_KEY);
    if (raw) {
      let parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Strip out old default Unsplash stock portraits if present in stored localStorage
        let hadOldStock = false;
        parsed = parsed.map((m: FamilyMemberProfile) => {
          if (m.avatarUrl && (m.avatarUrl.includes('unsplash.com') || m.avatarUrl.startsWith('av-'))) {
            hadOldStock = true;
            return { ...m, avatarUrl: '' };
          }
          return m;
        });
        if (hadOldStock) {
          safeStorage.setItem(FAMILY_MEMBERS_STORAGE_KEY, JSON.stringify(parsed));
        }
        return parsed;
      }
    }
  } catch {}
  safeStorage.setItem(FAMILY_MEMBERS_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_MEMBERS));
  return INITIAL_DEFAULT_MEMBERS;
}

export function saveFamilyMembers(members: FamilyMemberProfile[]): void {
  safeStorage.setItem(FAMILY_MEMBERS_STORAGE_KEY, JSON.stringify(members));
}

export function getActiveMemberId(): string {
  try {
    const activeId = safeStorage.getItem(ACTIVE_MEMBER_ID_STORAGE_KEY);
    const members = getFamilyMembers();
    if (activeId && members.some(m => m.id === activeId)) {
      return activeId;
    }
    return members[0]?.id || 'member-self';
  } catch {
    return 'member-self';
  }
}

export function setActiveMemberId(id: string): void {
  safeStorage.setItem(ACTIVE_MEMBER_ID_STORAGE_KEY, id);
}

export function getActiveFamilyMember(): FamilyMemberProfile {
  const activeId = getActiveMemberId();
  const members = getFamilyMembers();
  const found = members.find(m => m.id === activeId);
  return found || members[0] || INITIAL_DEFAULT_MEMBERS[0];
}

export function addFamilyMember(memberData: Omit<FamilyMemberProfile, 'id' | 'createdAt'>): FamilyMemberProfile {
  const members = getFamilyMembers();
  const newMember: FamilyMemberProfile = {
    ...memberData,
    id: 'member-' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [...members, newMember];
  saveFamilyMembers(updated);
  setActiveMemberId(newMember.id);
  // Seed initial weight log
  addMemberWeightLog(newMember.id, newMember.weightKg, new Date().toISOString().split('T')[0], 'ثبت اولیه مشخصات');
  return newMember;
}

export function updateFamilyMember(id: string, updates: Partial<FamilyMemberProfile>): FamilyMemberProfile {
  const members = getFamilyMembers();
  const updated = members.map(m => (m.id === id ? { ...m, ...updates } : m));
  saveFamilyMembers(updated);
  return updated.find(m => m.id === id)!;
}

export function deleteFamilyMember(id: string): boolean {
  const members = getFamilyMembers();
  if (members.length <= 1) return false; // keep at least 1 member
  const filtered = members.filter(m => m.id !== id);
  saveFamilyMembers(filtered);
  if (getActiveMemberId() === id) {
    setActiveMemberId(filtered[0].id);
  }
  return true;
}

// -------------------------------------------------------------
// MEMBER-SPECIFIC WEIGHT LOGS (سوابق و نمودار وزن اختصاصی هر عضو)
// -------------------------------------------------------------

export function getMemberWeightLogs(memberId: string): WeightLogEntry[] {
  try {
    const raw = safeStorage.getItem(MEMBER_WEIGHT_LOGS_PREFIX + memberId);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}

  // If member is self and legacy logs exist, migrate
  if (memberId === 'member-self') {
    const legacy = getWeightLogs();
    if (legacy && legacy.length > 0) {
      safeStorage.setItem(MEMBER_WEIGHT_LOGS_PREFIX + memberId, JSON.stringify(legacy));
      return legacy;
    }
  }

  // Seed sample progression
  const member = getFamilyMembers().find(m => m.id === memberId) || INITIAL_DEFAULT_MEMBERS[0];
  const seeded = generateSampleMemberLogs(member);
  safeStorage.setItem(MEMBER_WEIGHT_LOGS_PREFIX + memberId, JSON.stringify(seeded));
  return seeded;
}

function generateSampleMemberLogs(member: FamilyMemberProfile): WeightLogEntry[] {
  const logs: WeightLogEntry[] = [];
  const count = 7;
  const heightM = member.heightCm / 100;
  const isLoss = member.goal === 'weight_loss';
  const startWeight = isLoss ? member.weightKg + 2.5 : (member.goal === 'muscle_gain' ? member.weightKg - 1.8 : member.weightKg);

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * 5);
    const dateStr = d.toISOString().split('T')[0];
    const progressFactor = (count - 1 - i) / (count - 1);
    const currentW = Number((startWeight + (member.weightKg - startWeight) * progressFactor + (Math.sin(i) * 0.2)).toFixed(1));
    const bmi = Number((currentW / (heightM * heightM)).toFixed(1));

    logs.push({
      id: `m-log-${member.id}-${i}`,
      date: dateStr,
      dateShamsi: new Intl.DateTimeFormat('fa-IR').format(d),
      weightKg: currentW,
      note: i === count - 1 ? 'وزن‌کشی اخیر ناشتا' : `ثبت دوره‌ای هفته ${count - i}`,
      bmi,
      createdAt: d.toISOString()
    });
  }
  return logs;
}

export function addMemberWeightLog(memberId: string, weightKg: number, date: string, note?: string): WeightLogEntry[] {
  const currentLogs = getMemberWeightLogs(memberId);
  const member = getFamilyMembers().find(m => m.id === memberId) || INITIAL_DEFAULT_MEMBERS[0];
  const heightM = member.heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  const d = new Date(date);
  const dateShamsi = isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat('fa-IR').format(d);

  const newEntry: WeightLogEntry = {
    id: `log-${Date.now()}`,
    date,
    dateShamsi,
    weightKg: Number(weightKg.toFixed(1)),
    note: note?.trim() || 'ثبت وزن دوره‌ای',
    bmi,
    createdAt: new Date().toISOString()
  };

  const updated = [...currentLogs.filter(l => l.date !== date), newEntry].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  safeStorage.setItem(MEMBER_WEIGHT_LOGS_PREFIX + memberId, JSON.stringify(updated));
  // Also update member's current weight
  updateFamilyMember(memberId, { weightKg });
  return updated;
}

export function deleteMemberWeightLog(memberId: string, logId: string): WeightLogEntry[] {
  const currentLogs = getMemberWeightLogs(memberId);
  const updated = currentLogs.filter(l => l.id !== logId);
  safeStorage.setItem(MEMBER_WEIGHT_LOGS_PREFIX + memberId, JSON.stringify(updated));
  if (updated.length > 0) {
    updateFamilyMember(memberId, { weightKg: updated[updated.length - 1].weightKg });
  }
  return updated;
}

// =============================================================
// PERSONALIZED SINGLE-USER DIET PLAN ENGINE
// محاسبه اختلاف وزن، هدف‌گذاری، TDEE، کسری/مازاد و ۳ وعده بر حسب قاشق
// =============================================================

interface MealOptionTemplate {
  dishTitle: string;
  basePortionSpoons: string;
  baseCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  mealTypeFa: string;
  dietTagsFa: string[];
  goldenTipFa: string;
}

const BREAKFAST_TEMPLATES: MealOptionTemplate[] = [
  {
    dishTitle: 'نان سنگک برشته، پنیر لیقوان و گردوی تویسرکان',
    basePortionSpoons: '۲ کف دست نان سنگک + ۳۰ گرم پنیر لیقوان (به اندازه یک قوطی کبریت) + ۲ عدد گردو درسته + خیار و گوجه آزاد',
    baseCalories: 310,
    proteinGrams: 14,
    carbsGrams: 36,
    fatGrams: 15,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['سنتی اصیل', 'پروتئین بالا'],
    goldenTipFa: 'همراه با یک استکان چای سیاه کمرنگ با نصف قاشق چای‌خوری عسل یا دارچین میل کنید.'
  },
  {
    dishTitle: 'املت قهوه‌خانه‌ای رژیمی با گوجه فراوان و پیازداغ کم‌روغن',
    basePortionSpoons: '۱ پیاله املت (۱ تخم‌مرغ کامل + ۲ گوجه رنده‌شده و فلفل سیاه) + ۲ کف دست نان بربری داغ',
    baseCalories: 290,
    proteinGrams: 16,
    carbsGrams: 28,
    fatGrams: 12,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['نوستالژیک', 'سیرکننده'],
    goldenTipFa: 'گوجه‌فرنگی سرشار از لیکوپن است و تفت دادن آن با حداقل روغن باعث جذب چندبرابری آنتی‌اکسیدان‌ها می‌شود.'
  },
  {
    dishTitle: 'خوراک عدسی لعاب‌دار پروتئینی با قارچ و لیموترش',
    basePortionSpoons: '۷ قاشق غذاخوری سرپر عدسی پخته + ۱ قاشق چای‌خوری روغن زیتون فرابکر + ۱ کف دست نان سنگک + گلپر',
    baseCalories: 330,
    proteinGrams: 18,
    carbsGrams: 46,
    fatGrams: 6,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['سرشار از آهن', 'فیبر بالا'],
    goldenTipFa: 'افزودن آب لیموترش تازه جذب آهن غیرهِم عدس را تا ۳ برابر افزایش می‌دهد.'
  },
  {
    dishTitle: 'اوتمیل گرم جو دوسر با شیر کم‌چرب، موز و دارچین',
    basePortionSpoons: '۴ قاشق غذاخوری جو دوسر پرک پخته‌شده در ۱ لیوان شیر کم‌چرب + نصف موز حلقه‌شده + ۱ قاشق چای‌خوری دانه چیا',
    baseCalories: 300,
    proteinGrams: 13,
    carbsGrams: 45,
    fatGrams: 7,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['ورزشی و فیتنس', 'تنظیم قند'],
    goldenTipFa: 'فیبر بتاگلوکان جو دوسر احساس سیری طولانی‌مدت تا هنگام ناهار فراهم می‌کند.'
  },
  {
    dishTitle: 'تخم‌مرغ آب‌پز عسلی با نان تافتون و سبزی خوردن',
    basePortionSpoons: '۲ عدد تخم‌مرغ آب‌پز متوسط + ۲ کف دست نان تافتون یا سنگک + ۱ پیاله سبزی خوردن معطر تازه',
    baseCalories: 280,
    proteinGrams: 17,
    carbsGrams: 24,
    fatGrams: 11,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['پروتئین خالص', 'کم‌چرب'],
    goldenTipFa: 'زرده عسلی تخم‌مرغ آب‌پز هضم بسیار آسان‌تری نسبت به تخم‌مرغ کاملاً سفت دارد.'
  },
  {
    dishTitle: 'ارده کنجد خالص با شیره انگور ملایر و نان سنگک',
    basePortionSpoons: '۲ قاشق غذاخوری ارده خالص + ۱ قاشق مرباخوری شیره انگور طبیعی + ۲ کف دست نان سنگک کنجدی',
    baseCalories: 340,
    proteinGrams: 9,
    carbsGrams: 42,
    fatGrams: 17,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['طبع گرم و مقوی', 'کلسیم و فسفر'],
    goldenTipFa: 'یک بمب انرژی طبیعی بدون شکر مصنوعی که استقامت بدنی را در طول روز بالا نگه می‌دارد.'
  },
  {
    dishTitle: 'نرگسی اسفناج صبحانه با تخم‌مرغ و پیازداغ',
    basePortionSpoons: '۱ بشقاب اسفناج تفت‌داده با پیازداغ عسلی + ۱ عدد تخم‌مرغ + ۱ کف دست نان سنگک داغ',
    baseCalories: 260,
    proteinGrams: 15,
    carbsGrams: 20,
    fatGrams: 12,
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: ['کم‌کالری', 'سرشار از آهن'],
    goldenTipFa: 'غذای محبوب اصیل ایرانی که کالری پایینی دارد و برای چربی‌سوزی صبحگاهی فوق‌العاده است.'
  }
];

const LUNCH_TEMPLATES: MealOptionTemplate[] = [
  {
    dishTitle: 'چلو خورش قورمه‌سبزی جاافتاده کم‌روغن با سالاد شیرازی',
    basePortionSpoons: '۸ قاشق غذاخوری برنج کته زعفرانی + ۶ قاشق غذاخوری خورش قورمه‌سبزی با ۲ تکه گوشت لخم + ۱ پیاله سالاد شیرازی با آبغوره',
    baseCalories: 540,
    proteinGrams: 32,
    carbsGrams: 64,
    fatGrams: 16,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['اصیل ایرانی', 'پروتئین کامل'],
    goldenTipFa: 'روغن سیاه روی خورش را جدا کنید و برنج را بدون روغن افزوده به صورت کته دم کنید.'
  },
  {
    dishTitle: 'زرشک‌پلو مجلسی با سینه مرغ زعفرانی و ماست کم‌چرب',
    basePortionSpoons: '۸ قاشق غذاخوری برنج زعفرانی زرشک‌دار + ۱ تکه سینه مرغ پخته (۱۲۰ گرم) در سس زعفران + ۱ پیاله ماست کم‌چرب',
    baseCalories: 510,
    proteinGrams: 38,
    carbsGrams: 62,
    fatGrams: 10,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['پروتئین بالا', 'عضله‌ساز'],
    goldenTipFa: 'سینه مرغ بدون پوست غنی‌ترین منبع پروتئین با کمترین میزان چربی اشباع است.'
  },
  {
    dishTitle: 'چلو کباب تابه‌ای خانگی با گوجه کبابی و سماق فراوان',
    basePortionSpoons: '۸ قاشق غذاخوری برنج کته + ۱ تکه کباب تابه‌ای گوشت گوسفند و گوساله کم‌چرب (۱۰۰ گرم) + ۱ عدد گوجه کبابی',
    baseCalories: 530,
    proteinGrams: 30,
    carbsGrams: 60,
    fatGrams: 17,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['نوستالژیک', 'آهن بالا'],
    goldenTipFa: 'سماق فراوان روی کباب علاوه بر طعم عالی، از افت ناگهانی حساسیت به انسولین جلوگیری می‌کند.'
  },
  {
    dishTitle: 'عدس‌پلو مجلسی با گوشت چرخ‌کرده، کشمش و خرما',
    basePortionSpoons: '۹ قاشق غذاخوری عدس‌پلو + ۳ قاشق غذاخوری مایه گوشت چرخ‌کرده و کشمش + ۱ پیاله ماست و خیار نعنایی',
    baseCalories: 560,
    proteinGrams: 28,
    carbsGrams: 75,
    fatGrams: 14,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['پروتئین گیاهی و حیوانی', 'انرژی پایدار'],
    goldenTipFa: 'ترکیب برنج و عدس پروتئین با ارزش بیولوژیکی کامل (شامل تمام اسیدهای آمینه ضروری) می‌سازد.'
  },
  {
    dishTitle: 'چلو خورش قیمه سیب‌زمینی با لیموعمانی و سبزی خوردن',
    basePortionSpoons: '۸ قاشق غذاخوری برنج کته + ۶ قاشق غذاخوری خورش قیمه با لپه پخته و گوشت + ۵ عدد خلال سیب‌زمینی تنوری + سبزی خوردن',
    baseCalories: 520,
    proteinGrams: 29,
    carbsGrams: 68,
    fatGrams: 14,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['سنتی محبوب', 'فیبر و آهن'],
    goldenTipFa: 'سیب‌زمینی‌ها را در فر یا سرخ‌کن بدون روغن برشته کنید تا کالری اضافی سرخ‌کردنی حذف شود.'
  },
  {
    dishTitle: 'لوبیاپلو شیرازی با گوشت تکه‌ای و دارچین',
    basePortionSpoons: '۹ قاشق غذاخوری لوبیاپلو با گوشت تکه‌ای لخم و لوبیاسبز تازه + ۱ پیاله سالاد کاهو و کلم با سرکه بالزامیک',
    baseCalories: 520,
    proteinGrams: 31,
    carbsGrams: 67,
    fatGrams: 13,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['فیبر بالا', 'خوش‌طعم'],
    goldenTipFa: 'عطر دارچین در لوبیاپلو به تثبیت قند خون بعد از صرف غذا کمک شایانی می‌کند.'
  },
  {
    dishTitle: 'کلم‌پلو شیرازی با کوفته‌ریزه و سبزی معطر',
    basePortionSpoons: '۸ قاشق غذاخوری کلم‌پلو شیرازی + ۴ عدد کوفته‌ریزه گوشت + ۱ پیاله ترشی کلم خانگی یا سالاد شیرازی',
    baseCalories: 490,
    proteinGrams: 27,
    carbsGrams: 62,
    fatGrams: 13,
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: ['غذای محلی شیراز', 'سبک و معطر'],
    goldenTipFa: 'کلم قمری تفت‌خورده در آبغوره کالری ناچیزی دارد و حجم غذای شما را بدون کالری بالا پر می‌کند.'
  }
];

const DINNER_TEMPLATES: MealOptionTemplate[] = [
  {
    dishTitle: 'خوراک فیله مرغ گریل با سبزیجات بخارپز و نان سنگک',
    basePortionSpoons: '۱ تکه فیله مرغ گریل‌شده (۱۵۰ گرم) با زعفران و آبلیمو + ۱ پیاله کلم بروکلی و هویج بخارپز + ۱ کف دست نان سنگک',
    baseCalories: 360,
    proteinGrams: 35,
    carbsGrams: 26,
    fatGrams: 8,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['شام رژیمی عالی', 'چربی‌سوز'],
    goldenTipFa: 'شام سرشار از پروتئین و فیبر بدون برنج سنگین، خوابی راحت و ترمیم بافت‌های عضلانی را به همراه دارد.'
  },
  {
    dishTitle: 'کوکو سبزی تبریزی تنوری با سالاد و نان سنگک',
    basePortionSpoons: '۲ برش متوسط کوکو سبزی پخته در فر یا تابه نچسب + ۱ کف دست نان سنگک داغ + گوجه‌فرنگی و خیارشور',
    baseCalories: 320,
    proteinGrams: 16,
    carbsGrams: 25,
    fatGrams: 15,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['گیاهی و سبک', 'آنتی‌اکسیدان'],
    goldenTipFa: 'پخت کوکو سبزی در فر با اسپری روغن زیتون، طعم بی‌نظیر آن را با یک‌سوم روغن حفظ می‌کند.'
  },
  {
    dishTitle: 'خوراک لوبیاچیتی با قارچ و لیموترش تازه',
    basePortionSpoons: '۷ قاشق غذاخوری خوراک لوبیاچیتی غلیظ با قارچ ورقه + ۱ کف دست نان لواش یا بربری + ۱ قاشق چای‌خوری روغن زیتون',
    baseCalories: 340,
    proteinGrams: 17,
    carbsGrams: 48,
    fatGrams: 7,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['پروتئین گیاهی', 'سیرکننده'],
    goldenTipFa: 'لوبیاچیتی دارای شاخص گلیسمی پایینی است و از گرسنگی شبانه جلوگیری می‌کند.'
  },
  {
    dishTitle: 'میرزا قاسمی اصیل گیلان با نان سنگک داغ',
    basePortionSpoons: '۶ قاشق غذاخوری میرزاقاسمی بادمجان کبابی دودی با ۱ تخم‌مرغ و سیر فراوان + ۲ کف دست نان سنگک',
    baseCalories: 310,
    proteinGrams: 13,
    carbsGrams: 32,
    fatGrams: 13,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['دودی و لذیذ', 'سبک'],
    goldenTipFa: 'کباب کردن بادمجان روی شعله مستقیم بوی دودی اصیل به غذا داده و نیازی به روغن زیاد ندارد.'
  },
  {
    dishTitle: 'سوپ جو و مرغ غلیظ با سبزیجات تازه و لیمو',
    basePortionSpoons: '۲ ملاقه بزرگ سوپ جو با سینه مرغ ریش‌شده، قارچ و هویج + ۱ پیاله سالاد فصل با سرکه بالزامیک',
    baseCalories: 280,
    proteinGrams: 22,
    carbsGrams: 35,
    fatGrams: 6,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['بسیار کم‌کالری', 'مغذی و گرم'],
    goldenTipFa: 'بهترین گزینه شام برای شب‌هایی که ناهار سنگین‌تری خورده‌اید و به کسری کالری نیاز دارید.'
  },
  {
    dishTitle: 'سالاد تن ماهی رژیمی با کاهو، خیارشور و ذرت',
    basePortionSpoons: '۱ قوطی تن ماهی بدون روغن (تخلیه‌شده و شسته‌شده با آب گرم) + ۱ کاسه بزرگ کاهو و سبزیجات + ۱ قاشق ماست و آبلیمو',
    baseCalories: 330,
    proteinGrams: 32,
    carbsGrams: 16,
    fatGrams: 12,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['امگا ۳ بالا', 'کم‌کربوهیدرات'],
    goldenTipFa: 'تخلیه کامل روغن کنسرو تن ماهی بیش از ۱۵۰ کیلوکالری چربی اضافی را حذف می‌کند.'
  },
  {
    dishTitle: 'کتلت خانگی کم‌روغن با گوجه‌فرنگی و سبزی تازه',
    basePortionSpoons: '۲ عدد کتلت متوسط گوشت و سیب‌زمینی (پخته با حداقل روغن) + ۱ کف دست نان سنگک + گوجه و ریحان تازه',
    baseCalories: 350,
    proteinGrams: 22,
    carbsGrams: 30,
    fatGrams: 14,
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: ['نوستالژیک خانگی', 'پروتئین متعادل'],
    goldenTipFa: 'گرفتن آب پیاز و افزودن کمی جعفری ساطوری، بوی زهم گوشت را رفع کرده و کتلت را ترد و خوش‌طعم می‌کند.'
  }
];

const DAYS_KEYS_AND_TITLES = [
  { key: 'sat', titleFa: 'شنبه' },
  { key: 'sun', titleFa: 'یکشنبه' },
  { key: 'mon', titleFa: 'دوشنبه' },
  { key: 'tue', titleFa: 'سه‌شنبه' },
  { key: 'wed', titleFa: 'چهارشنبه' },
  { key: 'thu', titleFa: 'پنج‌شنبه' },
  { key: 'fri', titleFa: 'جمعه' }
];

export function calculateMemberDietPlan(member: FamilyMemberProfile, forceRegenerate = false): PersonalizedDietReport {
  const cacheKey = MEMBER_DIET_PLAN_PREFIX + member.id;
  if (!forceRegenerate) {
    try {
      const cached = safeStorage.getItem(cacheKey);
      if (cached) {
        const parsed: PersonalizedDietReport = JSON.parse(cached);
        // If current weight or target matches approximately, return cached
        if (Math.abs(parsed.currentWeightKg - member.weightKg) < 0.2 && Math.abs(parsed.targetWeightKg - member.targetWeightKg) < 0.2) {
          return parsed;
        }
      }
    } catch {}
  }

  // 1. اختلاف وزن
  const currentWeightKg = member.weightKg;
  const targetWeightKg = member.targetWeightKg || (member.gender === 'female' ? 58 : 72);
  const weightDiffKg = Number(Math.abs(currentWeightKg - targetWeightKg).toFixed(1));
  const isLoss = currentWeightKg > targetWeightKg;
  const isGain = currentWeightKg < targetWeightKg;
  const isMaintenance = weightDiffKg < 0.5;

  // 2. هدف‌گذاری زمانی
  const targetWeeks = member.targetWeeks && member.targetWeeks >= 2 ? member.targetWeeks : 8;
  const totalDays = targetWeeks * 7;
  const weeklyRateKg = Number((weightDiffKg / targetWeeks).toFixed(2));
  const isSafeRate = isMaintenance || (weeklyRateKg >= 0.2 && weeklyRateKg <= 1.1);

  // 3. میزان فعالیت و کالری مورد نیاز (BMR + TDEE)
  let bmr = 0;
  if (member.gender === 'male') {
    bmr = 10 * currentWeightKg + 6.25 * member.heightCm - 5 * member.age + 5;
  } else {
    bmr = 10 * currentWeightKg + 6.25 * member.heightCm - 5 * member.age - 161;
  }
  bmr = Math.round(bmr);

  const activityMap: Record<FamilyMemberProfile['activityLevel'], { factor: number; labelFa: string }> = {
    sedentary: { factor: 1.2, labelFa: 'کم‌تحرک (کارمندی و بدون ورزش)' },
    light: { factor: 1.375, labelFa: 'فعالیت سبک (۱ تا ۲ روز پیاده‌روی در هفته)' },
    moderate: { factor: 1.55, labelFa: 'فعالیت متوسط (۳ تا ۴ روز ورزش منظم در هفته)' },
    active: { factor: 1.725, labelFa: 'پرتحرک (۵ تا ۶ روز تمرین سنگین در هفته)' },
    very_active: { factor: 1.9, labelFa: 'ورزشکار حرفه‌ای (تمرین سخت روزانه)' }
  };

  const activityInfo = activityMap[member.activityLevel] || activityMap.moderate;
  const tdeeCalories = Math.round(bmr * activityInfo.factor);

  // 4. اختلاف کالری (کسری یا مازاد)
  const safeFloorCalories = member.gender === 'female' ? 1200 : 1500;
  const totalCalorieDiff = weightDiffKg * 7700;
  let dailyCalorieDelta = isMaintenance ? 0 : Math.round(totalCalorieDiff / totalDays);

  let targetDailyCalories = tdeeCalories;
  if (isLoss) {
    dailyCalorieDelta = Math.min(800, Math.max(300, dailyCalorieDelta));
    targetDailyCalories = Math.max(safeFloorCalories, Math.round(tdeeCalories - dailyCalorieDelta));
  } else if (isGain) {
    dailyCalorieDelta = Math.min(700, Math.max(250, dailyCalorieDelta));
    targetDailyCalories = Math.round(tdeeCalories + dailyCalorieDelta);
  }

  // BMI
  const heightM = member.heightCm / 100;
  const bmi = Number((currentWeightKg / (heightM * heightM)).toFixed(1));
  let bmiCategoryFa = 'وزن طبیعی و ایده‌آل';
  if (bmi < 18.5) bmiCategoryFa = 'کمبود وزن (نیازمند افزایش وزن)';
  else if (bmi >= 25 && bmi < 30) bmiCategoryFa = 'اضافه وزن ملایم';
  else if (bmi >= 30) bmiCategoryFa = 'چاقی (نیازمند رژیم چربی‌سوزی)';

  // 5. تولید برنامه ۷ روزه برای سه وعده بر حسب قاشق
  const days: DietDayPlan[] = DAYS_KEYS_AND_TITLES.map((day, idx) => {
    return generateSingleDayPlan(day.key, day.titleFa, targetDailyCalories, idx);
  });

  const report: PersonalizedDietReport = {
    memberId: member.id,
    memberName: member.name,
    currentWeightKg,
    targetWeightKg,
    weightDiffKg,
    isLoss,
    isGain,
    isMaintenance,
    targetWeeks,
    weeklyRateKg,
    isSafeRate,
    activityLevel: member.activityLevel,
    activityLevelFa: activityInfo.labelFa,
    bmrCalories: bmr,
    tdeeCalories,
    dailyCalorieDelta: isLoss ? -dailyCalorieDelta : (isGain ? dailyCalorieDelta : 0),
    targetDailyCalories,
    safeFloorCalories,
    bmi,
    bmiCategoryFa,
    days,
    generatedAt: new Date().toISOString()
  };

  safeStorage.setItem(cacheKey, JSON.stringify(report));
  return report;
}

function scalePortionString(portionStr: string, scaleFactor: number): string {
  // Scale Persian numbers or digits representing spoons
  return portionStr.replace(/(\d+)\s*(قاشق|کف دست|عدد)/g, (match, num, unit) => {
    const original = parseInt(num, 10);
    const scaled = Math.max(1, Math.round(original * scaleFactor));
    return `${scaled} ${unit}`;
  });
}

function generateSingleDayPlan(dayKey: string, dayTitleFa: string, targetDailyCalories: number, seedOffset = 0): DietDayPlan {
  // Target distribution: Breakfast 25%, Lunch 45%, Dinner 30%
  const targetBreakfastCal = Math.round(targetDailyCalories * 0.25);
  const targetLunchCal = Math.round(targetDailyCalories * 0.45);
  const targetDinnerCal = Math.round(targetDailyCalories * 0.30);

  // Pick templates
  const bTemplate = BREAKFAST_TEMPLATES[(seedOffset) % BREAKFAST_TEMPLATES.length];
  const lTemplate = LUNCH_TEMPLATES[(seedOffset) % LUNCH_TEMPLATES.length];
  const dTemplate = DINNER_TEMPLATES[(seedOffset) % DINNER_TEMPLATES.length];

  // Scale breakfast
  const bScale = targetBreakfastCal / bTemplate.baseCalories;
  const bCal = targetBreakfastCal;
  const bPortion = scalePortionString(bTemplate.basePortionSpoons, bScale);

  // Scale lunch
  const lScale = targetLunchCal / lTemplate.baseCalories;
  const lCal = targetLunchCal;
  const lPortion = scalePortionString(lTemplate.basePortionSpoons, lScale);

  // Scale dinner
  const dScale = targetDinnerCal / dTemplate.baseCalories;
  const dCal = targetDinnerCal;
  const dPortion = scalePortionString(dTemplate.basePortionSpoons, dScale);

  const totalCalories = bCal + lCal + dCal;

  const breakfast: DietMealItem = {
    id: `meal-${dayKey}-b-${Date.now()}`,
    dishTitle: bTemplate.dishTitle,
    portionSpoonsFa: bPortion,
    calories: bCal,
    proteinGrams: Math.round(bTemplate.proteinGrams * bScale),
    carbsGrams: Math.round(bTemplate.carbsGrams * bScale),
    fatGrams: Math.round(bTemplate.fatGrams * bScale),
    mealType: 'breakfast',
    mealTypeFa: 'صبحانه',
    dietTagsFa: bTemplate.dietTagsFa,
    goldenTipFa: bTemplate.goldenTipFa
  };

  const lunch: DietMealItem = {
    id: `meal-${dayKey}-l-${Date.now()}`,
    dishTitle: lTemplate.dishTitle,
    portionSpoonsFa: lPortion,
    calories: lCal,
    proteinGrams: Math.round(lTemplate.proteinGrams * lScale),
    carbsGrams: Math.round(lTemplate.carbsGrams * lScale),
    fatGrams: Math.round(lTemplate.fatGrams * lScale),
    mealType: 'lunch',
    mealTypeFa: 'ناهار',
    dietTagsFa: lTemplate.dietTagsFa,
    goldenTipFa: lTemplate.goldenTipFa
  };

  const dinner: DietMealItem = {
    id: `meal-${dayKey}-d-${Date.now()}`,
    dishTitle: dTemplate.dishTitle,
    portionSpoonsFa: dPortion,
    calories: dCal,
    proteinGrams: Math.round(dTemplate.proteinGrams * dScale),
    carbsGrams: Math.round(dTemplate.carbsGrams * dScale),
    fatGrams: Math.round(dTemplate.fatGrams * dScale),
    mealType: 'dinner',
    mealTypeFa: 'شام',
    dietTagsFa: dTemplate.dietTagsFa,
    goldenTipFa: dTemplate.goldenTipFa
  };

  return {
    dayKey,
    dayTitleFa,
    breakfast,
    lunch,
    dinner,
    totalCalories,
    targetDailyCalories,
    diffCalories: totalCalories - targetDailyCalories
  };
}

export function regenerateSingleDietDay(memberId: string, dayKey: string, targetCalories: number): DietDayPlan {
  const cacheKey = MEMBER_DIET_PLAN_PREFIX + memberId;
  const dayInfo = DAYS_KEYS_AND_TITLES.find(d => d.key === dayKey) || { key: dayKey, titleFa: 'امروز' };
  
  // Pick random seed different from current
  const randomOffset = Math.floor(Math.random() * 20) + 1;
  const newDay = generateSingleDayPlan(dayKey, dayInfo.titleFa, targetCalories, randomOffset);

  try {
    const raw = safeStorage.getItem(cacheKey);
    if (raw) {
      const report: PersonalizedDietReport = JSON.parse(raw);
      report.days = report.days.map(d => (d.dayKey === dayKey ? newDay : d));
      safeStorage.setItem(cacheKey, JSON.stringify(report));
    }
  } catch {}

  return newDay;
}

