/**
 * Prep Ahead Reminder & Mobile Notification Service
 * Analyzes Weekly Meal Plan to alert users in advance (e.g. soaking beans the night before for Ghormeh Sabzi).
 */

import { RECIPES_DATA } from '../data/recipes';
import { DAYS_OF_WEEK_FA, getWeeklyMealPlan } from './mealPlannerService';

export interface AdvancePrepTask {
  id: string;
  recipeId: string;
  recipeTitle: string;
  dishNameFa: string;
  mealType: 'lunch' | 'dinner';
  targetDayFa: string; // The day the dish will be eaten, e.g. 'یک‌شنبه'
  reminderDayFa: string; // The day the user must do the prep, e.g. 'شنبه'
  taskTitle: string;
  taskInstruction: string;
  timingLabelFa: string; // e.g. 'شب قبل (ساعت ۲۱:۰۰)'
  urgency: 'critical' | 'recommended';
  actionIcon: 'beans' | 'meat' | 'marinate' | 'rice' | 'dough' | 'general';
  isDone?: boolean;
}

const DISH_PREP_KNOWLEDGE_BASE: Record<string, {
  taskTitle: string;
  taskInstruction: string;
  timingLabelFa: string;
  actionIcon: 'beans' | 'meat' | 'marinate' | 'rice' | 'dough' | 'general';
  urgency: 'critical' | 'recommended';
}> = {
  'ghormeh-sabzi': {
    taskTitle: 'خیساندن لوبیا قرمز یا چیتی',
    taskInstruction: 'لوبیا قرمز یا چیتی قورمه‌سبزی را از امشب در آب ولرم خیسانده و ۲ بار آب آن را عوض کنید تا نفخ آن کامل گرفته شده و خورشتان عالی لعاب بیندازد. همچنین گوشت گوسفندی را برای یخ‌زدایی آماده کنید.',
    timingLabelFa: 'شب قبل (ساعت ۲۰:۰۰ الی ۲۲:۰۰)',
    actionIcon: 'beans',
    urgency: 'critical'
  },
  'gheimeh-sibzamini': {
    taskTitle: 'خیساندن لپه تبریزی و تلخی‌گیری لیمو عمانی',
    taskInstruction: 'لپه‌ها را از شب قبل در آب ولرم بخیسانید تا نرم شده و در خورش وا نرود. لیمو عمانی‌ها را نیز با چنگال سوراخ کرده و در آب ولرم بگذارید تا تلخی پوستشان گرفته شود.',
    timingLabelFa: 'شب قبل (ساعت ۲۱:۰۰)',
    actionIcon: 'beans',
    urgency: 'critical'
  },
  'fesenjan': {
    taskTitle: 'آسیاب کردن ریز مغز گردو و نگهداری در یخچال',
    taskInstruction: 'مغز گردو را بسیار ریز و پوره‌ای آسیاب کنید و بگذارید در یخچال خنک شود؛ گردوی سرد هنگام تفت در روغن سرد شوک دیده و بیشترین روغن ممکن را آزاد می‌کند.',
    timingLabelFa: 'شب قبل یا صبح اول وقت',
    actionIcon: 'general',
    urgency: 'recommended'
  },
  'chelo-kabab-koobideh': {
    taskTitle: 'آب‌گیری کامل پیاز و استراحت مایه کباب',
    taskInstruction: 'پیاز را رنده کرده و آب آن را کاملاً بگیرید، با گوشت چرخ‌کرده ورز داده و حداقل ۶ تا ۱۲ ساعت در یخچال قرار دهید تا کباب روی سیخ نریزد.',
    timingLabelFa: 'شب قبل (حداقل ۸ ساعت قبل سیخ زدن)',
    actionIcon: 'meat',
    urgency: 'critical'
  },
  'joojeh-kabab-zaferani': {
    taskTitle: 'مرینیت و خواباندن جوجه در زعفران و سس',
    taskInstruction: 'تکه‌های مرغ را با زعفران دم‌کرده غلیظ، پیاز خلال‌شده، ماست چکیده و آبلیمو ماساژ داده و در ظرف دربسته درون یخچال بگذارید تا طعم جادویی بگیرد.',
    timingLabelFa: 'شب قبل (۱۲ ساعت قبل از پخت)',
    actionIcon: 'marinate',
    urgency: 'critical'
  },
  'ash-reshteh': {
    taskTitle: 'خیساندن حبوبات (نخود، لوبیا چیتی و عدس)',
    taskInstruction: 'نخود و لوبیا چیتی را از ۲۴ ساعت قبل در آب خیسانده و آب آن را تعویض کنید. عدس را نیز از صبح خیس کنید تا آش رشته شما سبک و بی‌نفخ شود.',
    timingLabelFa: 'از ۲۴ ساعت قبل',
    actionIcon: 'beans',
    urgency: 'critical'
  },
  'ash-jo': {
    taskTitle: 'خیساندن جو پوست‌کنده و نخود',
    taskInstruction: 'جو پوست‌کنده را از شب قبل خیسانده تا در زمان پخت کاملاً شکفته شده و لعاب کرمی و مخملی به آش جو بدهد.',
    timingLabelFa: 'شب قبل (۱۲ تا ۲۴ ساعت قبل)',
    actionIcon: 'rice',
    urgency: 'critical'
  },
  'abgoosht-dizi': {
    taskTitle: 'خیساندن نخود و لوبیای دیزی سنگک',
    taskInstruction: 'نخود و لوبیا سفید دیزی را از شب قبل بخیسانید. قلم گوسفندی و دنبه تازه را از فریزر به بخش خنک یخچال منتقل کنید.',
    timingLabelFa: 'شب قبل (ساعت ۲۱:۰۰)',
    actionIcon: 'beans',
    urgency: 'critical'
  },
  'sholeh-zard': {
    taskTitle: 'خیساندن برنج نیم‌دانه و خلال بادام در گلاب',
    taskInstruction: 'برنج نیم‌دانه معطر ایرانی را از شب قبل بدون نمک بخیسانید تا با حرارت سریع له شود. خلال بادام را نیز در گلاب اعلا خیس دهید تا نرم و خوش‌عطر شود.',
    timingLabelFa: 'شب قبل (حداقل ۱۲ ساعت قبل)',
    actionIcon: 'rice',
    urgency: 'critical'
  },
  'kofteh-tabrizi': {
    taskTitle: 'خیساندن و نیم‌پز کردن لپه و برنج',
    taskInstruction: 'لپه را از شب قبل بخیسانید و سپس نیم‌پز و چرخ کنید. برنج را نیم‌پز کرده و آلو و گردوی مغز کوفته را در گلاب نم بزنید.',
    timingLabelFa: 'شب قبل یا صبح زود',
    actionIcon: 'beans',
    urgency: 'critical'
  },
  'halim-gandom': {
    taskTitle: 'خیساندن گندم پوست‌کنده از ۲۴ ساعت قبل',
    taskInstruction: 'گندم را حداقل ۲۴ ساعت خیسانده تا در پخت با آب قلم یا مرغ و گوسفند، به سرعت کش بیاید و طعم اصیل بازار را پیدا کند.',
    timingLabelFa: '۲۴ ساعت قبل از پخت',
    actionIcon: 'rice',
    urgency: 'critical'
  },
  'tahchin-morgh': {
    taskTitle: 'خواباندن تکه‌های مرغ در زعفران و ماست',
    taskInstruction: 'تکه‌های مرغ را پس از پخت ملایم یا گریل، در سس ماست چکیده ترش و زعفران غلیظ بخوابانید تا هنگام دم کشیدن ته‌چین، بوی زهم مرغ ندهد.',
    timingLabelFa: 'شب قبل یا ۵ ساعت قبل از دم گذاشتن',
    actionIcon: 'marinate',
    urgency: 'recommended'
  },
  'falafel-ahvazi': {
    taskTitle: 'خیساندن ۴۸ ساعته نخود خام فلافل',
    taskInstruction: 'نخود خام را بدون پختن، به مدت ۲۴ تا ۴۸ ساعت در آب خیس کنید و مکرر آب آن را عوض کنید تا کاملاً نرم شود (نخود نباید پخته شود).',
    timingLabelFa: 'از ۲ روز قبل تا شب قبل',
    actionIcon: 'beans',
    urgency: 'critical'
  },
  'kebab-chenjeh': {
    taskTitle: 'بیات کردن گوشت و مرینیت با ماست و پیاز',
    taskInstruction: 'گوشت فیله یا راسته گوسفندی را در ماست، پیاز رنده‌شده، روغن زیتون و فلفل سیاه ماساژ دهید تا بافت آن ترد و پنبه‌ای شود.',
    timingLabelFa: 'شب قبل (حداقل ۱۲ ساعت)',
    actionIcon: 'meat',
    urgency: 'critical'
  },
  'shirini-danmarki': {
    taskTitle: 'استراحت خمیر هزارلا در یخچال',
    taskInstruction: 'خمیر کره‌ای را ورز دهید و در سلفون پیچیده و حداقل ۶ ساعت در یخچال بگذارید تا کره فرم بگیرد و ورقه‌ورقه باز شود.',
    timingLabelFa: 'شب قبل از پخت شیرینی',
    actionIcon: 'dough',
    urgency: 'recommended'
  }
};

const DISMISSED_PREP_KEY = 'smart_chef_dismissed_prep_tasks_v1';

export function getDismissedPrepTaskIds(): string[] {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(DISMISSED_PREP_KEY);
      if (raw) return JSON.parse(raw);
    }
  } catch {}
  return [];
}

export function markPrepTaskDone(taskId: string): void {
  try {
    const list = getDismissedPrepTaskIds();
    if (!list.includes(taskId)) {
      list.push(taskId);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(DISMISSED_PREP_KEY, JSON.stringify(list));
      }
    }
  } catch {}
}

export function resetPrepTaskDone(taskId: string): void {
  try {
    const list = getDismissedPrepTaskIds().filter(id => id !== taskId);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(DISMISSED_PREP_KEY, JSON.stringify(list));
    }
  } catch {}
}

/**
 * Determine Iranian day of the week from current date:
 * Saturday = 0 (شنبه), Sunday = 1 (یکشنبه), ... Friday = 6 (جمعه)
 */
export function getCurrentIranianDayIndex(): number {
  const day = new Date().getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  // Convert JS Day to Iranian index:
  // Saturday (6) -> 0
  // Sunday (0) -> 1
  // Monday (1) -> 2
  // Tuesday (2) -> 3
  // Wednesday (3) -> 4
  // Thursday (4) -> 5
  // Friday (5) -> 6
  return (day + 1) % 7;
}

/**
 * Scan Weekly Meal Plan and return all active advance preparation reminders
 */
export function getActiveAdvancePrepReminders(): AdvancePrepTask[] {
  const mealPlan = getWeeklyMealPlan();
  const currentDayIdx = getCurrentIranianDayIndex();
  const tomorrowDayIdx = (currentDayIdx + 1) % 7;

  const currentDayName = DAYS_OF_WEEK_FA[currentDayIdx];
  const tomorrowDayName = DAYS_OF_WEEK_FA[tomorrowDayIdx];

  const dismissed = getDismissedPrepTaskIds();
  const reminders: AdvancePrepTask[] = [];

  // 1. Check Tomorrow's meals (Most important: prep done TONIGHT)
  const tomorrowPlan = mealPlan.days.find(d => d.dayIndex === tomorrowDayIdx);
  if (tomorrowPlan) {
    // Tomorrow Lunch
    if (tomorrowPlan.lunchRecipeId) {
      const task = resolvePrepTask(
        tomorrowPlan.lunchRecipeId, 
        'lunch', 
        tomorrowDayName, 
        currentDayName, 
        'شب قبل (ساعت ۲۱:۰۰)'
      );
      if (task) {
        task.isDone = dismissed.includes(task.id);
        reminders.push(task);
      }
    }
    // Tomorrow Dinner
    if (tomorrowPlan.dinnerRecipeId) {
      const task = resolvePrepTask(
        tomorrowPlan.dinnerRecipeId, 
        'dinner', 
        tomorrowDayName, 
        currentDayName, 
        'شب قبل یا صبح فردا'
      );
      if (task) {
        task.isDone = dismissed.includes(task.id);
        reminders.push(task);
      }
    }
  }

  // 2. Check Today's dinner (prep in the morning)
  const todayPlan = mealPlan.days.find(d => d.dayIndex === currentDayIdx);
  if (todayPlan && todayPlan.dinnerRecipeId) {
    const task = resolvePrepTask(
      todayPlan.dinnerRecipeId,
      'dinner',
      currentDayName,
      currentDayName,
      'صبح امروز (ساعت ۰۸:۰۰ الی ۱۰:۰۰)'
    );
    if (task) {
      task.isDone = dismissed.includes(task.id);
      reminders.push(task);
    }
  }

  // 3. If no reminders from today/tomorrow, look at any critical prep dish in the whole plan
  if (reminders.length === 0) {
    mealPlan.days.forEach(day => {
      [
        { id: day.lunchRecipeId, type: 'lunch' as const },
        { id: day.dinnerRecipeId, type: 'dinner' as const }
      ].forEach(({ id, type }) => {
        if (!id) return;
        const prevDayIdx = (day.dayIndex + 6) % 7;
        const task = resolvePrepTask(
          id, 
          type, 
          day.dayNameFa, 
          DAYS_OF_WEEK_FA[prevDayIdx], 
          `روز قبل از ${day.dayNameFa}`
        );
        if (task && !reminders.some(r => r.id === task.id)) {
          task.isDone = dismissed.includes(task.id);
          reminders.push(task);
        }
      });
    });
  }

  return reminders;
}

function resolvePrepTask(
  recipeId: string, 
  mealType: 'lunch' | 'dinner', 
  targetDayFa: string, 
  reminderDayFa: string,
  defaultTiming: string
): AdvancePrepTask | null {
  const recipe = RECIPES_DATA.find(r => r.id === recipeId);
  if (!recipe) return null;

  const kb = DISH_PREP_KNOWLEDGE_BASE[recipeId];
  const mealLabel = mealType === 'lunch' ? 'ناهار' : 'شام';
  const taskId = `prep-${recipeId}-${targetDayFa}-${mealType}`;

  if (kb) {
    return {
      id: taskId,
      recipeId,
      recipeTitle: recipe.title,
      dishNameFa: recipe.title.split(' ')[0] + ' ' + (recipe.title.split(' ')[1] || ''),
      mealType,
      targetDayFa,
      reminderDayFa,
      taskTitle: kb.taskTitle,
      taskInstruction: kb.taskInstruction,
      timingLabelFa: kb.timingLabelFa || defaultTiming,
      urgency: kb.urgency,
      actionIcon: kb.actionIcon
    };
  }

  // Dynamic detection for ingredients requiring soaking
  const hasBeans = recipe.ingredients.some(i => 
    i.name.includes('لوبیا') || i.name.includes('نخود') || i.name.includes('لپه')
  );
  if (hasBeans) {
    return {
      id: taskId,
      recipeId,
      recipeTitle: recipe.title,
      dishNameFa: recipe.title.split(' ')[0] + ' ' + (recipe.title.split(' ')[1] || ''),
      mealType,
      targetDayFa,
      reminderDayFa,
      taskTitle: `خیساندن حبوبات ${recipe.title} (${mealLabel} ${targetDayFa})`,
      taskInstruction: `حبوبات این غذا را از ${reminderDayFa} در آب ولرم بخیسانید تا نفخ آن‌ها گرفته شده و پخت سریع‌تر و خوشمزه‌تری داشته باشید.`,
      timingLabelFa: defaultTiming,
      urgency: 'critical',
      actionIcon: 'beans'
    };
  }

  return null;
}

/**
 * Mobile / Web Notification API Trigger
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  try {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  } catch {
    return false;
  }
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermissionState(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

/**
 * Send live push/system notification to user's phone or desktop
 */
export function sendMobilePushNotification(
  title: string, 
  body: string, 
  icon = '/pwa-192x192.png'
): boolean {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    const notif = new Notification(title, {
      body,
      icon,
      badge: icon,
      dir: 'rtl',
      lang: 'fa',
      tag: 'smart-chef-prep-alert'
    });

    notif.onclick = () => {
      window.focus();
      notif.close();
    };

    return true;
  } catch (err) {
    console.warn('Notification trigger error:', err);
    return false;
  }
}
