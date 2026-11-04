/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MeasurementUnit } from '../types';

export interface OkalaPriceResult {
  hasPrice: boolean;
  priceToman: number | null;
  baseBenchmarkText: string;
  sourceLabel: string;
  okalaSearchUrl: string;
}

interface OkalaBenchmark {
  id: string;
  keywords: string[];
  excludeKeywords?: string[];
  benchmarkPriceToman: number;
  baseUnit: 'g' | 'pcs' | 'ml';
  baseQuantity: number;
  labelFa: string;
  approxGramPerPiece?: number;
}

// Items that should never have a retail grocery cost (free tap water, ice, homemade broth)
const HOME_FREE_ITEMS = [
  'آب', 'آب جوش', 'آب ولرم', 'آب سرد', 'آب یخ', 'آب لوله‌کشی', 'آب جوشیده',
  'یخ', 'قالب یخ', 'تکه یخ', 'یخ خردشده', 'تکه‌های یخ',
  'آب مرغ', 'آب مرغ خانگی', 'آب قلم', 'آب گوشت', 'آب قلم یا آب جوش'
];

/**
 * Authentic daily grocery prices benchmarked from Okala (اکالا / افق کوروش)
 * Priority is strictly evaluated top-to-bottom. Specific items (like eggs or ghormeh greens)
 * MUST be listed before general items (like chicken or meat).
 */
const OKALA_DAILY_BENCHMARKS: OkalaBenchmark[] = [
  // ۱. تخم‌مرغ (دانه‌ای) - باید حتماً قبل از مرغ بررسی شود
  {
    id: 'egg',
    keywords: ['تخم‌مرغ', 'تخم مرغ', 'زرده تخم‌مرغ', 'سفیده تخم‌مرغ', 'زرده تخم مرغ', 'سفیده تخم مرغ'],
    benchmarkPriceToman: 4500,
    baseUnit: 'pcs',
    baseQuantity: 1,
    labelFa: 'تخم‌مرغ تازه دانه‌ای (۴,۵۰۰ تومان در اکالا)'
  },

  // ۲. سبزیجات ترکیبی آماده و خردشده - قبل از گوشت و چاشنی
  {
    id: 'ghormeh-veg',
    keywords: ['سبزی قورمه', 'سبزی قورمه‌سبزی', 'سبزی قرمه'],
    benchmarkPriceToman: 48000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'سبزی قورمه خردشده تازه (کیلویی ۴۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'ash-veg',
    keywords: ['سبزی آش', 'سبزی آشی'],
    benchmarkPriceToman: 42000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'سبزی آش خردشده تازه (کیلویی ۴۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'polo-veg',
    keywords: ['سبزی پلو', 'سبزی پلویی'],
    benchmarkPriceToman: 45000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'سبزی پلو خردشده تازه (کیلویی ۴۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'koko-veg',
    keywords: ['سبزی کوکو'],
    benchmarkPriceToman: 42000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'سبزی کوکو خردشده تازه (کیلویی ۴۲,۰۰۰ تومان در اکالا)'
  },

  // ۳. گوشت و پروتئین
  {
    id: 'mutton',
    keywords: ['گوشت گوسفند', 'گوشت گوسفندی', 'ماهیچه گوسفندی', 'سردست گوسفندی', 'گوشت گردن', 'راسته گوسفند', 'گوشت قرمز'],
    excludeKeywords: ['سبزی', 'چرخ'],
    benchmarkPriceToman: 680000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'گوشت گوسفندی تازه بدون چربی (کیلویی ۶۸۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'ground-meat',
    keywords: ['چرخ‌کرده', 'چرخ کرده', 'گوشت چرخ'],
    benchmarkPriceToman: 540000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'گوشت چرخ‌کرده مخلوط (کیلویی ۵۴۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'beef',
    keywords: ['راسته گوساله', 'فیله گوساله', 'گوشت گوساله'],
    benchmarkPriceToman: 580000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'گوشت راسته گوساله (کیلویی ۵۸۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'chicken-breast',
    keywords: ['سینه مرغ', 'فیله مرغ'],
    excludeKeywords: ['تخم', 'عصاره', 'آب مرغ'],
    benchmarkPriceToman: 175000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'سینه و فیله مرغ پاک‌شده (کیلویی ۱۷۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'chicken-leg',
    keywords: ['ران مرغ', 'ساق مرغ'],
    excludeKeywords: ['تخم'],
    benchmarkPriceToman: 135000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'ران مرغ پاک‌شده (کیلویی ۱۳۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'chicken-general',
    keywords: ['مرغ'],
    excludeKeywords: ['تخم‌مرغ', 'تخم مرغ', 'تخم', 'آب مرغ', 'عصاره'],
    benchmarkPriceToman: 115000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'مرغ کامل پاک‌شده تازه (کیلویی ۱۱۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'fish',
    keywords: ['ماهی', 'قزل‌آلا', 'فیله ماهی'],
    benchmarkPriceToman: 220000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'ماهی قزل‌آلا تازه (کیلویی ۲۲۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'sausage',
    keywords: ['سوسیس', 'کالباس', 'ژامبون', 'هات‌داگ'],
    benchmarkPriceToman: 240000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'ژامبون و پروتئین فرآوری‌شده (کیلویی ۲۴۰,۰۰۰ تومان در اکالا)'
  },

  // ۴. روغن و چربی
  {
    id: 'frying-oil',
    keywords: ['روغن سرخ', 'سرخ‌کردنی'],
    benchmarkPriceToman: 68000,
    baseUnit: 'ml',
    baseQuantity: 810,
    labelFa: 'روغن سرخ‌کردنی ۸۱۰ گرمی (۶۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cooking-oil',
    keywords: ['روغن مایع', 'روغن پخت', 'روغن کنجد', 'روغن آفتابگردان'],
    benchmarkPriceToman: 72000,
    baseUnit: 'ml',
    baseQuantity: 810,
    labelFa: 'روغن مایع پخت‌وپز ۸۱۰ گرمی (۷۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'olive-oil',
    keywords: ['روغن زیتون'],
    benchmarkPriceToman: 340000,
    baseUnit: 'ml',
    baseQuantity: 500,
    labelFa: 'روغن زیتون فرابکر ۵۰۰ میلی‌لیتر (۳۴۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'butter',
    keywords: ['کره پاستوریزه', 'کره حیوانی', 'کره'],
    benchmarkPriceToman: 38000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'کره پاستوریزه ۱۰۰ گرمی (۳۸,۰۰۰ تومان در اکالا)'
  },

  // ۵. برنج، نان و غلات
  {
    id: 'rice',
    keywords: ['برنج', 'برنج ایرانی', 'طارم', 'هاشمی', 'برنج دمسیاه'],
    benchmarkPriceToman: 135000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'برنج درجه یک ایرانی (کیلویی ۱۳۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'flour',
    keywords: ['آرد سفید', 'آرد گندم', 'آرد نول', 'آرد قنادی', 'آرد'],
    benchmarkPriceToman: 35000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'آرد سفید گندم بسته‌بندی ۱ کیلوگرم (۳۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'pasta',
    keywords: ['ماکارونی', 'اسپاگتی', 'پاستا', 'لازانیا', 'رشته آشی', 'رشته پلویی'],
    benchmarkPriceToman: 32000,
    baseUnit: 'g',
    baseQuantity: 700,
    labelFa: 'ماکارونی و پاستا ۷۰۰ گرمی (۳۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'oats',
    keywords: ['جو پرک', 'جو دوسر', 'بلغور جو', 'جو پوست‌کنده'],
    benchmarkPriceToman: 42000,
    baseUnit: 'g',
    baseQuantity: 500,
    labelFa: 'جو پرک و غلات ۵۰۰ گرمی (۴۲,۰۰۰ تومان در اکالا)'
  },

  // ۶. حبوبات
  {
    id: 'lentils',
    keywords: ['عدس'],
    benchmarkPriceToman: 95000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'عدس سبز سورت‌شده ۹۰۰ گرمی (۹۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'split-peas',
    keywords: ['لپه'],
    benchmarkPriceToman: 85000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'لپه آذرشهر ۹۰۰ گرمی (۸۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'chickpeas',
    keywords: ['نخود'],
    benchmarkPriceToman: 85000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'نخود درشت ۹۰۰ گرمی (۸۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'pinto-beans',
    keywords: ['لوبیا چیتی'],
    benchmarkPriceToman: 120000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'لوبیا چیتی ۹۰۰ گرمی (۱۲۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'red-beans',
    keywords: ['لوبیا قرمز'],
    benchmarkPriceToman: 110000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'لوبیا قرمز ۹۰۰ گرمی (۱۱۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'white-beans',
    keywords: ['لوبیا سفید'],
    benchmarkPriceToman: 115000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'لوبیا سفید ۹۰۰ گرمی (۱۱۵,۰۰۰ تومان در اکالا)'
  },

  // ۷. لبنیات
  {
    id: 'milk',
    keywords: ['شیر'],
    excludeKeywords: ['شیره'],
    benchmarkPriceToman: 38000,
    baseUnit: 'ml',
    baseQuantity: 1000,
    labelFa: 'شیر بطری ۱ لیتری پاستوریزه (۳۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'yogurt',
    keywords: ['ماست', 'ماست چکیده', 'ماست پرچرب', 'ماست کم‌چرب'],
    benchmarkPriceToman: 65000,
    baseUnit: 'g',
    baseQuantity: 900,
    labelFa: 'ماست پاستوریزه ۹۰۰ گرمی (۶۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cream',
    keywords: ['خامه صبحانه', 'خامه قنادی', 'خامه'],
    benchmarkPriceToman: 34000,
    baseUnit: 'g',
    baseQuantity: 200,
    labelFa: 'خامه صبحانه ۲۰۰ گرمی (۳۴,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cheese-white',
    keywords: ['پنیر فتا', 'پنیر صبحانه', 'پنیر سفید'],
    benchmarkPriceToman: 55000,
    baseUnit: 'g',
    baseQuantity: 400,
    labelFa: 'پنیر سفید پاستوریزه ۴۰۰ گرمی (۵۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cheese-pizza',
    keywords: ['پنیر پیتزا', 'پنیر موزارلا', 'موزارلا', 'پنیر چدار'],
    benchmarkPriceToman: 125000,
    baseUnit: 'g',
    baseQuantity: 500,
    labelFa: 'پنیر پیتزا ۵۰۰ گرمی مطهر/کاله (۱۲۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'kashk',
    keywords: ['کشک'],
    benchmarkPriceToman: 48000,
    baseUnit: 'g',
    baseQuantity: 500,
    labelFa: 'کشک شیشه‌ای پاستوریزه ۵۰۰ گرمی (۴۸,۰۰۰ تومان در اکالا)'
  },

  // ۸. صیفی‌جات (با محاسبه دقیق اوزان دانه‌ای)
  {
    id: 'potato',
    keywords: ['سیب‌زمینی', 'سیب زمینی'],
    benchmarkPriceToman: 25000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 120, // 1 عدد متوسط ۱۲۰ گرم
    labelFa: 'سیب‌زمینی دستچین (کیلویی ۲۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'onion',
    keywords: ['پیاز', 'پیازداغ'],
    benchmarkPriceToman: 22000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 100, // 1 عدد متوسط ۱۰۰ گرم
    labelFa: 'پیاز زرد یا سفید (کیلویی ۲۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'tomato',
    keywords: ['گوجه‌فرنگی', 'گوجه فرنگی', 'گوجه'],
    excludeKeywords: ['رب'],
    benchmarkPriceToman: 28000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 100,
    labelFa: 'گوجه‌فرنگی تازه (کیلویی ۲۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'garlic',
    keywords: ['سیر'],
    excludeKeywords: ['سیرابی'],
    benchmarkPriceToman: 95000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 6, // 1 حبه سیر حدود ۵ تا ۶ گرم است
    labelFa: 'سیر خشک تازه (کیلویی ۹۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'carrot',
    keywords: ['هویج'],
    benchmarkPriceToman: 18000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 80,
    labelFa: 'هویج تازه (کیلویی ۱۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'eggplant',
    keywords: ['بادمجان'],
    benchmarkPriceToman: 28000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 150,
    labelFa: 'بادمجان قلمی (کیلویی ۲۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'zucchini',
    keywords: ['کدو سبز', 'کدو'],
    excludeKeywords: ['کدو حلوایی'],
    benchmarkPriceToman: 25000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 120,
    labelFa: 'کدو سبز تازه (کیلویی ۲۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'bell-pepper',
    keywords: ['فلفل دلمه‌ای', 'فلفل دلمه'],
    benchmarkPriceToman: 42000,
    baseUnit: 'g',
    baseQuantity: 1000,
    approxGramPerPiece: 80,
    labelFa: 'فلفل دلمه‌ای رنگی یا سبز (کیلویی ۴۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'mushroom',
    keywords: ['قارچ'],
    benchmarkPriceToman: 55000,
    baseUnit: 'g',
    baseQuantity: 400,
    labelFa: 'قارچ تازه اسلایس/بسته‌بندی ۴۰۰ گرمی (۵۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'pickles',
    keywords: ['خیارشور'],
    benchmarkPriceToman: 65000,
    baseUnit: 'g',
    baseQuantity: 650,
    labelFa: 'خیارشور ویژه شیشه‌ای ۶۵۰ گرمی (۶۵,۰۰۰ تومان در اکالا)'
  },

  // ۹. رب، سس و چاشنی‌ها
  {
    id: 'tomato-paste',
    keywords: ['رب گوجه', 'رب گوجه‌فرنگی', 'رب گوجه فرنگی'],
    benchmarkPriceToman: 62000,
    baseUnit: 'g',
    baseQuantity: 800,
    labelFa: 'رب گوجه‌فرنگی قوطی ۸۰۰ گرمی تبرک/روژین (۶۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'mayo',
    keywords: ['سس مایونز', 'مایونز'],
    benchmarkPriceToman: 45000,
    baseUnit: 'g',
    baseQuantity: 430,
    labelFa: 'سس مایونز شیشه‌ای ۴۳۰ گرمی (۴۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'ketchup',
    keywords: ['سس کچاپ', 'کچاپ'],
    benchmarkPriceToman: 35000,
    baseUnit: 'g',
    baseQuantity: 400,
    labelFa: 'سس کچاپ ۴۰۰ گرمی (۳۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'lemon-juice',
    keywords: ['آبلیمو', 'آب لیمو'],
    benchmarkPriceToman: 38000,
    baseUnit: 'ml',
    baseQuantity: 400,
    labelFa: 'آبلیموی پاستوریزه ۴۰۰ میلی‌لیتر (۳۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'abghooreh',
    keywords: ['آبغوره', 'آب غوره'],
    benchmarkPriceToman: 38000,
    baseUnit: 'ml',
    baseQuantity: 400,
    labelFa: 'آبغوره طبیعی ۴۰۰ میلی‌لیتر ۱و۱ (۳۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'rosewater',
    keywords: ['گلاب'],
    benchmarkPriceToman: 58000,
    baseUnit: 'ml',
    baseQuantity: 400,
    labelFa: 'گلاب ممتاز ربیع ۴۰۰ میلی‌لیتر (۵۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'vinegar',
    keywords: ['سرکه سفید', 'سرکه'],
    benchmarkPriceToman: 22000,
    baseUnit: 'ml',
    baseQuantity: 1000,
    labelFa: 'سرکه سفید تخمیری ۱ لیتری (۲۲,۰۰۰ تومان در اکالا)'
  },

  // ۱۰. قند، شکر، نمک و ادویه‌جات اساسی
  {
    id: 'sugar',
    keywords: ['شکر سفید', 'شکر', 'قند'],
    excludeKeywords: ['شکر قهوه‌ای'],
    benchmarkPriceToman: 45000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'شکر سفید بسته‌بندی ۱ کیلوگرم (۴۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'salt',
    keywords: ['نمک', 'نمک تصفیه', 'نمک یددار'],
    benchmarkPriceToman: 12000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'نمک یددار تصفیه‌شده ۱ کیلوگرم (۱۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'turmeric',
    keywords: ['زردچوبه'],
    benchmarkPriceToman: 35000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'زردچوبه سلفونی ۱۰۰ گرمی گلها (۳۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'black-pepper',
    keywords: ['فلفل سیاه'],
    benchmarkPriceToman: 65000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'فلفل سیاه پودری ۱۰۰ گرمی گلها (۶۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cinnamon',
    keywords: ['دارچین', 'چوب دارچین'],
    benchmarkPriceToman: 48000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'پودر دارچین ۱۰۰ گرمی گلها (۴۸,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cardamom',
    keywords: ['پودر هل', 'هل سبز', 'هل'],
    benchmarkPriceToman: 65000,
    baseUnit: 'g',
    baseQuantity: 20,
    labelFa: 'هل سبز سورت‌شده ۲۰ گرمی (۶۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'saffron',
    keywords: ['زعفران دم‌کرده', 'زعفران'],
    // 1 مثقال = 4.6 گرم = ~420,000 تومان. هر قاشق دم‌کرده حدود 0.1 گرم زعفران خالص دارد
    benchmarkPriceToman: 95000,
    baseUnit: 'g',
    baseQuantity: 1,
    labelFa: 'زعفران سرگل اعلا (گرمی ۹۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'limo-omani',
    keywords: ['لیمو عمانی', 'لیموامانی'],
    benchmarkPriceToman: 58000,
    baseUnit: 'g',
    baseQuantity: 200,
    approxGramPerPiece: 8,
    labelFa: 'لیمو عمانی مرغوب ۲۰۰ گرمی (۵۸,۰۰۰ تومان در اکالا)'
  },

  // ۱۱. مغزیجات و خشکبار
  {
    id: 'walnut',
    keywords: ['گردو', 'مغز گردو'],
    benchmarkPriceToman: 520000,
    baseUnit: 'g',
    baseQuantity: 1000,
    labelFa: 'مغز گردوی خورشتی ایرانی (کیلویی ۵۲۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'almond-slices',
    keywords: ['خلال بادام', 'بادام'],
    benchmarkPriceToman: 75000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'خلال بادام درختی ۱۰۰ گرمی (۷۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'pistachio-slices',
    keywords: ['خلال پسته', 'پسته'],
    benchmarkPriceToman: 140000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'خلال پسته سبز ۱۰۰ گرمی (۱۴۰,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'barberry',
    keywords: ['زرشک', 'زرشک پفکی'],
    benchmarkPriceToman: 75000,
    baseUnit: 'g',
    baseQuantity: 200,
    labelFa: 'زرشک قرمز پفکی ۲۰۰ گرمی (۷۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'raisins',
    keywords: ['کشمش', 'کشمش پلویی'],
    benchmarkPriceToman: 68000,
    baseUnit: 'g',
    baseQuantity: 350,
    labelFa: 'کشمش پلویی آفتابی ۳۵۰ گرمی (۶۸,۰۰۰ تومان در اکالا)'
  },

  // ۱۲. قنادی و شیرینی‌پزی
  {
    id: 'baking-powder',
    keywords: ['بکینگ‌پودر', 'بکینگ پودر', 'پیکینگ پودر'],
    benchmarkPriceToman: 15000,
    baseUnit: 'g',
    baseQuantity: 50,
    labelFa: 'بکینگ‌پودر ۵۰ گرمی قنادی (۱۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'vanilla',
    keywords: ['وانیل', 'پودر وانیل'],
    benchmarkPriceToman: 12000,
    baseUnit: 'g',
    baseQuantity: 10,
    labelFa: 'پودر وانیل ۱۰ گرمی قنادی (۱۲,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'powdered-sugar',
    keywords: ['پودر قند'],
    benchmarkPriceToman: 35000,
    baseUnit: 'g',
    baseQuantity: 500,
    labelFa: 'پودر قند ۵۰۰ گرمی (۳۵,۰۰۰ تومان در اکالا)'
  },
  {
    id: 'cocoa-powder',
    keywords: ['پودر کاکائو', 'کاکائو'],
    benchmarkPriceToman: 45000,
    baseUnit: 'g',
    baseQuantity: 100,
    labelFa: 'پودر کاکائو ۱۰۰ گرمی فرمند (۴۵,۰۰۰ تومان در اکالا)'
  }
];

export function getOkalaPriceDetails(
  name: string,
  amount: number,
  unit: MeasurementUnit
): OkalaPriceResult {
  const cleanName = name.trim().toLowerCase();
  const searchUrl = 'https://okala.com/search?q=' + encodeURIComponent(name.trim());

  // Check if item is free tap water / homemade item
  const isFree = HOME_FREE_ITEMS.some(item => {
    if (cleanName === item) return true;
    if (cleanName.startsWith(item + ' ') || cleanName.endsWith(' ' + item)) return true;
    return false;
  });

  if (isFree) {
    return {
      hasPrice: false,
      priceToman: null,
      baseBenchmarkText: 'آب / مواد در دسترس خانگی (بدون هزینه خرید)',
      sourceLabel: 'مصرفی خانگی',
      okalaSearchUrl: searchUrl
    };
  }

  // Find matching benchmark with exclusions
  const matched = OKALA_DAILY_BENCHMARKS.find(b => {
    // Check exclusions first
    if (b.excludeKeywords && b.excludeKeywords.some(ex => cleanName.includes(ex))) {
      return false;
    }
    return b.keywords.some(kw => cleanName.includes(kw));
  });

  if (!matched) {
    return {
      hasPrice: false,
      priceToman: null,
      baseBenchmarkText: 'نیازمند استعلام روز از اکالا',
      sourceLabel: 'اکالا',
      okalaSearchUrl: searchUrl
    };
  }

  // Convert amount and unit into base benchmark units
  let requestedQuantityInBase = 0;

  if (matched.id === 'saffron') {
    // Special authentic calculation for saffron:
    // 1 tbsp brewed saffron = ~0.15g dried saffron; 1 tsp = ~0.05g
    if (unit === 'g') requestedQuantityInBase = amount;
    else if (unit === 'tbsp') requestedQuantityInBase = amount * 0.15;
    else if (unit === 'tsp') requestedQuantityInBase = amount * 0.05;
    else requestedQuantityInBase = amount * 0.1;
  } else if (matched.baseUnit === 'pcs') {
    if (unit === 'pcs') requestedQuantityInBase = amount;
    else requestedQuantityInBase = Math.max(1, Math.round(amount));
  } else if (matched.baseUnit === 'g') {
    if (unit === 'g') requestedQuantityInBase = amount;
    else if (unit === 'kg') requestedQuantityInBase = amount * 1000;
    else if (unit === 'tbsp') requestedQuantityInBase = amount * 15;
    else if (unit === 'tsp') requestedQuantityInBase = amount * 5;
    else if (unit === 'cup') requestedQuantityInBase = amount * 150;
    else if (unit === 'pcs') {
      // Use specific approx weight per piece
      const gramPerPiece = matched.approxGramPerPiece || 100;
      requestedQuantityInBase = amount * gramPerPiece;
    } else {
      requestedQuantityInBase = amount;
    }
  } else if (matched.baseUnit === 'ml') {
    if (unit === 'ml') requestedQuantityInBase = amount;
    else if (unit === 'liter') requestedQuantityInBase = amount * 1000;
    else if (unit === 'cup') requestedQuantityInBase = amount * 240;
    else if (unit === 'tbsp') requestedQuantityInBase = amount * 15;
    else if (unit === 'tsp') requestedQuantityInBase = amount * 5;
    else requestedQuantityInBase = amount;
  }

  const calculatedPrice = Math.round(
    (requestedQuantityInBase / matched.baseQuantity) * matched.benchmarkPriceToman
  );

  // Round to nearest 500 Toman for clean Persian consumer pricing
  const finalPrice = Math.max(1000, Math.round(calculatedPrice / 500) * 500);

  return {
    hasPrice: true,
    priceToman: finalPrice,
    baseBenchmarkText: matched.labelFa,
    sourceLabel: 'قیمت روز اکالا',
    okalaSearchUrl: searchUrl
  };
}
