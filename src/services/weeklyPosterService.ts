import { getWeeklyMealPlan, DAYS_OF_WEEK_FA } from './mealPlannerService';
import { RECIPES_DATA } from '../data/recipes';
import { FamilyMemberProfile, PersonalizedDietReport } from '../types';

export interface PosterGenerationOptions {
  member?: FamilyMemberProfile;
  dietReport?: PersonalizedDietReport;
}

/**
 * Generates a unified high-resolution PNG poster of the entire 7-day meal plan
 * (Breakfast, Lunch, Dinner) combined with the member's personalized calorie and portion goals.
 */
export async function generateWeeklyPlanImage(options?: PosterGenerationOptions): Promise<string> {
  const plan = getWeeklyMealPlan();
  const recipesMap = new Map(RECIPES_DATA.map(r => [r.id, r]));

  // Canvas setup (High-res 2x Retina: 1200 x 1820)
  const width = 1200;
  const height = 1860;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context could not be initialized.');
  }

  // 1. Dark Luxury Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#0f172a');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // Header Bismillah
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fef08a';
  ctx.font = '24px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', width / 2, 70);

  // Main Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText('برنامه جامع غذایی و رژیم هفتگی خانواده', width / 2, 125);

  // Subtitle / Brand
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 20px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText('سرآشپز هوشمند | Smart Chef Iran • صبحانه، ناهار، شام و تنظیم کالری', width / 2, 160);

  // User & Diet Info Banner Box
  const memberName = options?.dietReport?.memberName || options?.member?.name || 'کاربر گرامی';
  const targetCalories = options?.dietReport?.targetDailyCalories || 2000;
  const currentWeight = options?.member?.weightKg || 75;
  const targetWeight = options?.member?.targetWeightKg || 70;
  const goalMapFa: Record<string, string> = {
    weight_loss: 'کاهش وزن و لاغری سالم',
    maintenance: 'تثبیت وزن و تناسب اندام',
    muscle_gain: 'افزایش وزن و حجم عضلانی'
  };
  const goalFa = options?.member?.goal ? goalMapFa[options.member.goal] : (options?.dietReport?.isLoss ? 'کاهش وزن' : 'رژیم سلامت');

  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  roundRect(ctx, 50, 185, width - 100, 75, 16, true, true);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 18px "Vazirmatn", "Tahoma", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`عضو خانواده: ${memberName} (${goalFa})`, width - 80, 222);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText(`وزن فعلی: ${currentWeight} kg  |  وزن هدف: ${targetWeight} kg`, 80, 222);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 17px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText(`کالری هدف روزانه: ${targetCalories} کیلوکالری  •  تاریخ صدور: ${new Date().toLocaleDateString('fa-IR')}`, width / 2, 248);

  // 7 Days Grid Cards
  const startY = 280;
  const dayCardHeight = 200;
  const cardSpacing = 16;

  plan.days.forEach((day, index) => {
    const cardY = startY + index * (dayCardHeight + cardSpacing);
    const dayName = DAYS_OF_WEEK_FA[day.dayIndex] || `روز ${index + 1}`;

    const bRecipe = day.breakfastRecipeId ? recipesMap.get(day.breakfastRecipeId) : undefined;
    const lRecipe = day.lunchRecipeId ? recipesMap.get(day.lunchRecipeId) : undefined;
    const dRecipe = day.dinnerRecipeId ? recipesMap.get(day.dinnerRecipeId) : undefined;

    const bCal = bRecipe?.caloriesPerServing || 320;
    const lCal = lRecipe?.caloriesPerServing || 680;
    const dCal = dRecipe?.caloriesPerServing || 550;
    const totalDayCal = bCal + lCal + dCal;

    // Card background
    ctx.fillStyle = index % 2 === 0 ? 'rgba(15, 23, 42, 0.95)' : 'rgba(30, 41, 59, 0.75)';
    ctx.strokeStyle = index % 2 === 0 ? '#334155' : '#475569';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 50, cardY, width - 100, dayCardHeight, 18, true, true);

    // Day Header Strip
    ctx.fillStyle = index % 2 === 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)';
    roundRect(ctx, 50, cardY, width - 100, 44, 18, true, false);

    // Day Name
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 22px "Vazirmatn", "Tahoma", sans-serif';
    ctx.fillText(`🗓️ ${dayName}`, width - 80, cardY + 31);

    // Day Total Calories Badge
    ctx.textAlign = 'left';
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 18px "Vazirmatn", "Tahoma", sans-serif';
    ctx.fillText(`مجموع کالری: ${totalDayCal} kcal`, 80, cardY + 31);

    // 3 Columns: Breakfast, Lunch, Dinner
    const colWidth = (width - 140) / 3;

    // Col 1: Breakfast
    drawMealBlock(ctx, {
      x: width - 70 - colWidth,
      y: cardY + 54,
      width: colWidth - 10,
      height: 130,
      typeFa: '🍳 صبحانه',
      typeColor: '#fef08a',
      title: bRecipe?.title || 'صبحانه انتخابی',
      calories: bCal,
      servings: day.servings || 4,
      category: bRecipe?.categoryNameFa || 'صبحانه مقوی'
    });

    // Col 2: Lunch
    drawMealBlock(ctx, {
      x: width - 70 - colWidth * 2,
      y: cardY + 54,
      width: colWidth - 10,
      height: 130,
      typeFa: '🍲 ناهار',
      typeColor: '#fb923c',
      title: lRecipe?.title || 'ناهار انتخابی',
      calories: lCal,
      servings: day.servings || 4,
      category: lRecipe?.categoryNameFa || 'غذای اصلی'
    });

    // Col 3: Dinner
    drawMealBlock(ctx, {
      x: 70,
      y: cardY + 54,
      width: colWidth - 10,
      height: 130,
      typeFa: '🌙 شام',
      typeColor: '#a78bfa',
      title: dRecipe?.title || 'شام انتخابی',
      calories: dCal,
      servings: day.servings || 4,
      category: dRecipe?.categoryNameFa || 'شام سبک'
    });
  });

  // Footer Banner
  const footerY = height - 60;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText('✨ برای مشاهده دستور پخت کامل هر غذا و سهم‌های قاشقی دقیق، اپلیکیشن «سرآشپز هوشمند» را باز کنید.', width / 2, footerY);

  return canvas.toDataURL('image/png');
}

interface MealBlockOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  typeFa: string;
  typeColor: string;
  title: string;
  calories: number;
  servings: number;
  category: string;
}

function drawMealBlock(ctx: CanvasRenderingContext2D, opt: MealBlockOptions) {
  // Mini card background
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  roundRect(ctx, opt.x, opt.y, opt.width, opt.height, 12, true, true);

  // Type Pill
  ctx.textAlign = 'right';
  ctx.fillStyle = opt.typeColor;
  ctx.font = 'bold 16px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText(opt.typeFa, opt.x + opt.width - 14, opt.y + 26);

  // Calorie tag
  ctx.textAlign = 'left';
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 14px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText(`${opt.calories} kcal`, opt.x + 14, opt.y + 26);

  // Dish Title (wrap if too long)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px "Vazirmatn", "Tahoma", sans-serif';
  const displayTitle = opt.title.length > 24 ? opt.title.slice(0, 22) + '...' : opt.title;
  ctx.fillText(displayTitle, opt.x + opt.width - 14, opt.y + 62);

  // Category & Servings
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText(`${opt.category} • برای ${opt.servings} نفر`, opt.x + opt.width - 14, opt.y + 92);

  // Spoon hint
  ctx.fillStyle = '#f59e0b';
  ctx.font = '12px "Vazirmatn", "Tahoma", sans-serif';
  ctx.fillText('سهم بر حسب قاشق در اپلیکیشن', opt.x + opt.width - 14, opt.y + 114);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill = true,
  stroke = true
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
