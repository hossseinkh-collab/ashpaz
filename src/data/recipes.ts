import { Recipe } from '../types';
import { TRADITIONAL_RECIPES } from './recipesTraditional';
import { LOCAL_AND_EVERYDAY_RECIPES } from './recipesLocalAndEveryday';
import { FAST_FOOD_RECIPES } from './recipesFastFood';
import { PASTRY_RECIPES } from './recipesPastry';
import { CAKES_DESSERTS_DRINKS_RECIPES } from './recipesCakesDessertsDrinks';
import { MORE_IRANIAN_HERITAGE_RECIPES } from './recipesMoreIranianHeritage';
import { EXPANDED_ENCYCLOPEDIA_RECIPES } from './recipesExpandedEncyclopedia';
import { BREAKFAST_RECIPES } from './recipesBreakfast';
import { USER_DOC_RECIPES } from './recipesUserDoc';
import { enrichRecipeWithVerifiedImage } from './verifiedDishImagesMap';

const BASE_RECIPES: Recipe[] = [
  // 1. خورش قورمه سبزی اصیل ایرانی
  {
    id: 'ghormeh-sabzi',
    title: 'خورش قورمه سبزی جاافتاده مجلسی',
    persianSubtitle: 'شاهکار سنتی با سبزی سرخ‌شده اصیل، لیمو عمانی و روغن انداختن طبیعی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800&auto=format&fit=crop&q=80',
    description: 'خورش قورمه‌سبزی با گوشت گوسفندی مغز ران، سبزی معطر سرخ‌شده با حرارت ملایم، لوبیای قرمز یا چیتی و لیمو عمانی دست‌چین.',
    prepTimeMinutes: 45,
    cookTimeMinutes: 210,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 520,
    proteinGrams: 38,
    carbsGrams: 28,
    fatGrams: 26,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ing-1', name: 'گوشت ران یا سردست گوسفندی با استخوان', amount: 500, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'ing-2', name: 'سبزی قورمه (تره، جعفری، گشنیز، اسفناج، شنبلیله)', amount: 600, unit: 'g', approxCostPer100g: 12000, category: 'vegetable' },
      { id: 'ing-3', name: 'لوبیا قرمز یا چیتی مرغوب', amount: 150, unit: 'g', approxCostPer100g: 18000, category: 'flour_grain' },
      { id: 'ing-4', name: 'پیاز متوسط نگینی ریز', amount: 2, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'ing-5', name: 'لیمو عمانی سوراخ‌شده و تلخی‌گرفته', amount: 4, unit: 'pcs', unitWeightInGrams: 8, category: 'spice_seasoning' },
      { id: 'ing-6', name: 'زعفران دم‌کرده غلیظ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'ing-7', name: 'روغن دنبه یا حیوانی برای سرخ کردن', amount: 60, unit: 'ml', category: 'oil_fat' },
      { id: 'ing-8a', name: 'زردچوبه', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ing-8b', name: 'فلفل سیاه تازه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ing-8c', name: 'نمک', amount: 1.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ing-9', name: 'آب قلم یا آب جوش', amount: 1200, unit: 'ml', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'خیساندن لوبیا', instruction: 'لوبیا قرمز را از شب قبل خیسانده و ۲ بار آب آن را تعویض کنید تا نفخ آن گرفته شود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'سرخ کردن سبزی', instruction: 'سبزی خردشده را ابتدا بدون روغن تفت دهید تا آب میان‌بافتی تبخیر شود، سپس روغن ریخته و با شعله ملایم به رنگ یشمی تیره برسانید.', durationMinutes: 40, proTip: 'شنبلیله خشک تفت‌داده در انتهای پخت عطر را چند برابر می‌کند.' },
      { stepNumber: 3, title: 'تفت پیاز و تفت گوشت', instruction: 'پیاز را با زردچوبه تفت داده تا سبک و طلایی شود، سپس گوشت را اضافه کرده و تا تغییر رنگ کامل تفت دهید.', durationMinutes: 15 },
      { stepNumber: 4, title: 'پخت خورش و افزودن سبزی', instruction: 'لوبیا و آب جوش را افزوده، درب قابلمه را گذاشته و بگذارید ۲ ساعت با حرارت ملایم ریزجوش بزند، سپس سبزی سرخ‌شده را اضافه کنید.', durationMinutes: 120, hasTimer: true },
      { stepNumber: 5, title: 'جاافتادن و روغن انداختن', instruction: 'در ۴۰ دقیقه پایانی لیمو عمانی‌های خیس‌خورده بدون دانه و نمک را اضافه کنید. در ۱۰ دقیقه آخر یک تکه یخ بیاندازید تا شوک حرارتی روغن را بالا بیاورد.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'میزان شنبلیله نباید بیش از یک‌پنجم کل سبزی باشد چون خورش تلخ می‌شود.',
      'لیمو عمانی‌ها را حتماً نیم‌ساعت در آب ولرم بخیسانید و با خلال سوراخ کنید تا تلخی پوست خارج شود.',
      'انداختن یک تکه یخ در اواخر پخت باعث وارد شدن شوک روغنی و سیاهی چشم‌نواز روغن خورش می‌شود.'
    ]
  },

  // 2. خورش قیمه سیب‌زمینی و بادمجان نذری
  {
    id: 'gheimeh-sibzamini',
    title: 'خورش قیمه سیب‌زمینی نذری با گلاب و دارچین',
    persianSubtitle: 'لپه پخته نرم بدون وا رفتن، گوشت مغز گوسفندی و سیب‌زمینی ترد چیپسی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
    description: 'قیمه اصیل مجلسی و نذری با عطر چوب دارچین، هل سبز، گلاب اعلا و رب گوجه‌فرنگی تفت‌خورده در روغن حیوانی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 150,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 480,
    proteinGrams: 35,
    carbsGrams: 36,
    fatGrams: 22,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'تهران و یزد',
    ingredients: [
      { id: 'gh-1', name: 'گوشت ران گوسفندی خردشده قورمه‌ای', amount: 400, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'gh-2', name: 'لپه تبریزی خیسانده و نیم‌پز', amount: 160, unit: 'g', approxCostPer100g: 16000, category: 'flour_grain' },
      { id: 'gh-3', name: 'پیاز درشت نگینی ریز', amount: 2, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' },
      { id: 'gh-4', name: 'رب گوجه‌فرنگی غلیظ خانگی', amount: 3, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'gh-5', name: 'لیمو عمانی سوراخ‌شده', amount: 4, unit: 'pcs', unitWeightInGrams: 8, category: 'spice_seasoning' },
      { id: 'gh-6a', name: 'چوب دارچین', amount: 1, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'gh-6b', name: 'پودر هل سبز', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'gh-7a', name: 'گلاب اصل کاشان', amount: 2, unit: 'tbsp', category: 'liquid' },
      { id: 'gh-7b', name: 'زعفران دم‌کرده', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'gh-8', name: 'سیب‌زمینی خلال ریز سرخ‌شده', amount: 2, unit: 'pcs', unitWeightInGrams: 150, category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت دادن لپه', instruction: 'لپه را بعد از خیساندن با کمی روغن چند دقیقه تفت دهید تا هنگام پخت وا نرود و بو نگیرد.', durationMinutes: 10 },
      { stepNumber: 2, title: 'تفت پیاز و گوشت با رب', instruction: 'پیاز را طلایی کرده، گوشت و زردچوبه را تفت دهید. رب گوجه را جداگانه سرخ کنید تا بوی خامی آن گرفته و خوش‌رنگ شود.', durationMinutes: 20 },
      { stepNumber: 3, title: 'پخت آرام خورش', instruction: 'آب جوش و لپه را به گوشت افزوده و اجازه دهید ۲ ساعت با حرارت ملایم مغزپخت شود.', durationMinutes: 100, hasTimer: true },
      { stepNumber: 4, title: 'چاشنی‌های پایانی', instruction: 'لیمو عمانی، چوب دارچین، گلاب و زعفران را در نیم‌ساعت پایانی بیفزایید تا عطر آن حفظ شود.', durationMinutes: 30, hasTimer: true }
    ],
    goldenTips: [
      'از پودر دارچین در کل خورش استفاده نکنید چون رنگ قیمه را کدر و سیاه می‌کند؛ از چوب دارچین استفاده کنید.',
      'تفت دادن لپه در روغن مانع از له شدن و شل شدن خورش می‌شود.'
    ]
  },

  // 3. خورش فسنجان ملس اصیل با مغز گردو
  {
    id: 'fesenjan',
    title: 'خورش فسنجان مجلسی ملس با مغز گردو',
    persianSubtitle: 'روغن انداختن طبیعی گردو، رب انار ملس گیلان و مرغ زعفرانی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    description: 'فسنجان اعلا و غلیظ با مغز گردوی ایرانی آسیاب‌شده، شوک حرارتی با یخ، رب انار طبیعی تیره و فیله مرغ یا اردک محلی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 240,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 620,
    proteinGrams: 32,
    carbsGrams: 24,
    fatGrams: 46,
    dietaryTags: ['keto', 'high_protein'],
    allergens: ['nuts'],
    originRegion: 'گیلان و مازندران',
    ingredients: [
      { id: 'fs-1', name: 'مغز گردوی روغنی ایرانی کاملاً چرخ‌شده', amount: 350, unit: 'g', approxCostPer100g: 65000, category: 'flour_grain', allergens: ['nuts'] },
      { id: 'fs-2', name: 'فیله سینه یا ران مرغ سرخ‌شده با زعفران', amount: 450, unit: 'g', approxCostPer100g: 45000, category: 'protein' },
      { id: 'fs-3', name: 'رب انار ملس غلیظ سنتی', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'fs-4', name: 'پیاز رنده‌شده ریز و آب‌گرفته', amount: 1, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'fs-5', name: 'شکر قهوه‌ای یا شیره انگور (اختیاری)', amount: 1, unit: 'tbsp', category: 'sweetener' },
      { id: 'fs-6', name: 'قالب یخ کوچک برای شوک روغنی', amount: 4, unit: 'pcs', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت ملایم گردو', instruction: 'گردوی چرخ‌شده را با پیاز رنده‌شده بدون روغن روی شعله بسیار کم تفت دهید تا عطر گردو بلند شود (مراقب باشید نسوزد).', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن آب سرد و ریزجوش', instruction: 'آب کاملاً سرد یا یخ اضافه کرده و بگذارید ۲ ساعت با ملایم‌ترین شعله ریزجوش بزند تا روغن گردو آزاد شود.', durationMinutes: 120, hasTimer: true },
      { stepNumber: 3, title: 'افزودن رب انار و مرغ', instruction: 'رب انار، نمک و مرغ‌های زعفرانی تفت‌داده را اضافه کرده و ۱ ساعت دیگر بپزید.', durationMinutes: 60, hasTimer: true },
      { stepNumber: 4, title: 'شوک یخ نهایی', instruction: 'در انتهای پخت چند قالب یخ کوچک بیفزایید تا خورش غلیظ و براق روی سطح جمع شود.', durationMinutes: 20 }
    ],
    goldenTips: [
      'استفاده از آب یخ به جای آب گرم باعث وارد شدن شوک به بافت گردو و خروج حداکثری روغن طبیعی می‌شود.',
      'گردوی ایرانی چرب و تیره بهترین نتیجه را در رنگ و غلظت فسنجان دارد.'
    ]
  },

  // 4. زرشک‌پلو با مرغ مجلسی زعفرانی
  {
    id: 'zereshk-polo-morgh',
    title: 'زرشک‌پلو با مرغ مجلسی با سس غلیظ پرتقالی',
    persianSubtitle: 'ران و سینه طلایی سرخ‌شده با عطر کره، هل، گلاب و برنج زعفرانی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    description: 'زرشک‌پلو به سبک تالارهای عروسی با مرغ کاملاً طعم‌دارشده، سس غلیظ زعفرانی با عصاره فلفل دلمه‌ای و زرشک پفکی براق.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 75,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 510,
    proteinGrams: 42,
    carbsGrams: 52,
    fatGrams: 16,
    dietaryTags: ['high_protein'],
    allergens: ['nuts'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'zp-1', name: 'ساق یا سینه مرغ پوست‌گرفته', amount: 600, unit: 'g', approxCostPer100g: 45000, category: 'protein' },
      { id: 'zp-2', name: 'برنج ایرانی طارم یا دم‌سیاه', amount: 400, unit: 'g', approxCostPer100g: 15000, category: 'flour_grain' },
      { id: 'zp-3', name: 'زرشک پفکی اعلا', amount: 80, unit: 'g', approxCostPer100g: 22000, category: 'vegetable' },
      { id: 'zp-4', name: 'شکر سفید برای تعادل ترشی زرشک', amount: 2, unit: 'tbsp', category: 'sweetener' },
      { id: 'zp-5', name: 'زعفران دم‌کرده غلیظ با یخ', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'zp-6', name: 'کره حیوانی آب‌شده', amount: 40, unit: 'g', category: 'oil_fat' },
      { id: 'zp-7a', name: 'فلفل دلمه‌ای ورقه‌ای', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'zp-7b', name: 'هویج ورقه‌ای', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'zp-8a', name: 'خلال پسته', amount: 15, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'zp-8b', name: 'خلال بادام', amount: 15, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن اولیه مرغ', instruction: 'تکه‌های مرغ را با نمک، فلفل سیاه و زردچوبه در روغن داغ خوب سرخ کنید تا دو طرف آن کاملاً طلایی شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'تهیه سس غلیظ مرغ', instruction: 'پیاز را تفت داده، رب گوجه، فلفل دلمه‌ای، هویج، کمی زعفران و آب جوش را افزوده و مرغ‌ها را در سس بچینید و با درب بسته بپزید.', durationMinutes: 50, hasTimer: true },
      { stepNumber: 3, title: 'تفت اصولی زرشک', instruction: 'زرشک را شسته و با کره، شکر و یک قاشق گلاب روی شعله بسیار کم فقط ۳۰ ثانیه تفت دهید تا پف کند و نسوزد.', durationMinutes: 3 },
      { stepNumber: 4, title: 'دم دادن برنج و سرو', instruction: 'برنج را آبکش کرده و دم بگذارید. هنگام کشیدن با برنج زعفرانی، زرشک و خلال پسته تزئین کنید.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'زرشک خیلی سریع می‌سوزد؛ بعد از آب شدن شکر فوراً شعله را خاموش کرده و زعفران بزنید.',
      'فلفل دلمه‌ای و هویج در سس مرغ بوی زهم را کاملاً می‌گیرد.'
    ]
  },

  // 5. باقالی‌پلو با ماهیچه زعفرانی مجلسی
  {
    id: 'baghali-polo-mahiche',
    title: 'باقالی‌پلو با ماهیچه گوسفندی مجلسی',
    persianSubtitle: 'گوشت پنبه‌ای پخته در پیاز فراوان بدون آب، باقالی سبز و شوید معطر',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    description: 'باقالی‌پلو به سبک سرآشپزهای نامدار بازار تهران با ماهیچه گوسفندی لطیف، پیاز کاراملی شده و کره زعفرانی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 210,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 680,
    proteinGrams: 48,
    carbsGrams: 55,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'تهران و اصفهان',
    ingredients: [
      { id: 'bm-1', name: 'ماهیچه گوسفندی تازه', amount: 800, unit: 'g', approxCostPer100g: 85000, category: 'protein' },
      { id: 'bm-2', name: 'پیاز سفید درشت خلال‌شده فراوان', amount: 4, unit: 'pcs', unitWeightInGrams: 150, category: 'vegetable' },
      { id: 'bm-3', name: 'برنج ایرانی طارم', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'bm-4', name: 'باقالی سبز کشاورزی بدون پوست', amount: 200, unit: 'g', category: 'vegetable' },
      { id: 'bm-5', name: 'شوید تازه یا خشک معطر', amount: 70, unit: 'g', category: 'vegetable' },
      { id: 'bm-6a', name: 'سیر تازه حبه‌شده', amount: 3, unit: 'pcs', category: 'vegetable' },
      { id: 'bm-6b', name: 'چوب دارچین', amount: 1, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'bm-6c', name: 'برگ بو', amount: 2, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'bm-7a', name: 'کره حیوانی', amount: 50, unit: 'g', category: 'oil_fat' },
      { id: 'bm-7b', name: 'زعفران دم‌کرده اعلا', amount: 2, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'چیدن لایه‌های ماهیچه در پیاز', instruction: 'کف قابلمه را با پیاز فراوان بپوشانید، ماهیچه‌ها را قرار دهید، حبه‌های سیر و برگ بو و دارچین را گذاشته و روی آن دوباره پیاز بپوشانید (بدون افزودن یک قطره آب!).', durationMinutes: 15 },
      { stepNumber: 2, title: 'پخت کند ماهیچه در آب پیاز', instruction: 'درب قابلمه را محکم بسته و روی ملایم‌ترین شعله ۳.۵ ساعت بپزید تا گوشت با آب پیاز نرم و پنبه‌ای شود.', durationMinutes: 200, hasTimer: true },
      { stepNumber: 3, title: 'پخت باقالی با برنج', instruction: 'باقالی را در آب جوش ریخته، پس از چند دقیقه برنج را اضافه و آبکش کرده و لابه‌لا شوید و دارچین بپاشید و دم بگذارید.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'راز ماهیچه درباری پختن بدون اضافه کردن آب است؛ آب طبیعی پیاز لذیذترین سس ژلاتینی را ایجاد می‌کند.'
    ]
  },

  // 6. ته‌چین مرغ و بادمجان طلایی قالبی (Existing)
  {
    id: 'tahchin-morgh',
    title: 'ته‌چین مرغ و بادمجان طلایی قالبی',
    persianSubtitle: 'بافت کره‌ای اسفنجی با ته‌دیگ ترد یاقوتی و ماست چکیده ترش',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
    description: 'ته‌چین اعلای زعفرانی با برنج ایرانی دانه بلند، ماست چکیده و تخم‌مرغ رسمی، فیله مرغ ریش‌شده و بادمجان سرخ‌شده ورقی.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 80,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 640,
    proteinGrams: 36,
    carbsGrams: 62,
    fatGrams: 26,
    dietaryTags: ['high_protein'],
    allergens: ['egg', 'lactose'],
    originRegion: 'تهران و اصفهان',
    ingredients: [
      { id: 'tc-1', name: 'برنج ایرانی طارم یا هاشمی', amount: 400, unit: 'g', approxCostPer100g: 15000, category: 'flour_grain' },
      { id: 'tc-2', name: 'سینه یا فیله مرغ پخته و ریش‌شده', amount: 350, unit: 'g', approxCostPer100g: 45000, category: 'protein' },
      { id: 'tc-3', name: 'ماست چکیده پرچرب', amount: 250, unit: 'g', approxCostPer100g: 12000, category: 'dairy', allergens: ['lactose'] },
      { id: 'tc-4', name: 'زرده تخم‌مرغ تازه', amount: 3, unit: 'pcs', unitWeightInGrams: 20, category: 'dairy', allergens: ['egg'] },
      { id: 'tc-5', name: 'زعفران سابیده‌شده دم‌کرده با یخ', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'tc-6', name: 'کره حیوانی آب‌شده', amount: 70, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'tc-7', name: 'روغن مایع کانولا یا کنجد', amount: 50, unit: 'ml', category: 'oil_fat' },
      { id: 'tc-8a', name: 'زرشک پلویی', amount: 40, unit: 'g', category: 'flour_grain' },
      { id: 'tc-8b', name: 'شکر', amount: 1, unit: 'tbsp', category: 'sweetener' },
      { id: 'tc-8c', name: 'خلال پسته', amount: 15, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'tc-9', name: 'بادمجان ورقه‌ای سرخ‌شده', amount: 2, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'آبکش کردن برنج زنده', instruction: 'برنج را در آب جوش ریخته و کمی دان‌تر از معمول آبکش کنید.', durationMinutes: 12 },
      { stepNumber: 2, title: 'آماده‌سازی مایه ته‌چین', instruction: 'زرده‌ها، ماست چکیده، زعفران غلیظ، نمک، دارچین و کره را خوب مخلوط کنید.', durationMinutes: 8 },
      { stepNumber: 3, title: 'لایه‌چینی و پخت', instruction: 'کف ظرف را روغن ریخته، نصف برنج، سپس مرغ و بادمجان و زرشک و بقیه برنج را فشرده کنید و ۸۰ دقیقه دم دهید.', durationMinutes: 80, hasTimer: true }
    ],
    goldenTips: [
      'فقط زرده تخم‌مرغ استفاده کنید؛ سفیده بوی نامطبوع ایجاد می‌کند.',
      'ماست باید کاملاً چکیده و بدون آب باشد.'
    ]
  },

  // 7. آبگوشت و دیزی سنتی با دنبه
  {
    id: 'abgoosht-dizi',
    title: 'دیزی سنگی سنتی با دنبه و ترشی لیته',
    persianSubtitle: 'گوشت با استخوان، نخود و لوبیا سفید، سیب‌زمینی و کوبیده لذیذ',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800&auto=format&fit=crop&q=80',
    description: 'آبگوشت اصیل ایرانی پخته در دیزی با دنبه گوسفندی، لیمو عمانی، سیب‌زمینی و گوجه‌فرنگی با لعاب نخود و لوبیای خیسانده.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 240,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 650,
    proteinGrams: 44,
    carbsGrams: 42,
    fatGrams: 32,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'همدان و تهران',
    ingredients: [
      { id: 'dz-1', name: 'گوشت سردست یا گردن با استخوان و چربی', amount: 500, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'dz-2', name: 'دنبه گوسفندی معطر', amount: 100, unit: 'g', category: 'oil_fat' },
      { id: 'dz-3a', name: 'نخود آبگوشتی', amount: 80, unit: 'g', category: 'flour_grain' },
      { id: 'dz-3b', name: 'لوبیا سفید', amount: 80, unit: 'g', category: 'flour_grain' },
      { id: 'dz-4a', name: 'پیاز متوسط', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'dz-4b', name: 'سیب‌زمینی متوسط', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'dz-5a', name: 'گوجه‌فرنگی', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'dz-5b', name: 'رب گوجه‌فرنگی', amount: 2, unit: 'tbsp', category: 'condiment' },
      { id: 'dz-6a', name: 'لیمو عمانی', amount: 2, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'dz-6b', name: 'زردچوبه', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'dz-6c', name: 'مرزه خشک', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت آرام اولیه', instruction: 'گوشت، دنبه، پیاز و حبوبات را با آب سرد در ظرف سفالی یا دیزی ریخته و بگذارید ۳ ساعت ریزجوش بزند.', durationMinutes: 180, hasTimer: true },
      { stepNumber: 2, title: 'کوبیدن دنبه و چاشنی', instruction: 'دنبه را خارج کرده و با رب و مرزه خشک خوب بکوبید و به خورش بازگردانید تا لعاب عالی بیندازد.', durationMinutes: 15 },
      { stepNumber: 3, title: 'افزودن سیب‌زمینی و لیمو', instruction: 'سیب‌زمینی و لیمو عمانی را افزوده و ۴۵ دقیقه دیگر دم بدهید.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'کوبیدن دنبه با رب گوجه راز ایجاد لعاب قرمز و روغن بی‌نظیر آبگوشت بازاری است.'
    ]
  },

  // 8. خوراک عدسی لعاب‌دار رژیمی (سلامتی و کالری)
  {
    id: 'khorak-adasi',
    title: 'خوراک عدسی لعاب‌دار با قارچ و لیموترش (رژیمی/پروتئینی)',
    persianSubtitle: 'غذای فوق‌العاده سالم، سرشار از فیبر و آهن، بدون چربی اشباع',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای رژیمی و سریع',
    image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&auto=format&fit=crop&q=80',
    description: 'خوراک عدسی خوش‌طعم و کم‌کالری با عدس قهوه‌ای محلی، قارچ اسلایس، سیب‌زمینی نگینی لعاب‌دهنده، روغن زیتون فرابکر و پودر گلپر.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 50,
    baseServings: 3,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 260,
    proteinGrams: 18,
    carbsGrams: 42,
    fatGrams: 4,
    fiberGrams: 12,
    dietaryTags: ['low_calorie', 'high_protein', 'diabetic', 'vegetarian'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ad-1', name: 'عدس قهوه‌ای ریز ایرانی خیسانده', amount: 250, unit: 'g', approxCostPer100g: 12000, category: 'flour_grain' },
      { id: 'ad-2', name: 'قارچ تازه خردشده اسلایسی', amount: 150, unit: 'g', approxCostPer100g: 14000, category: 'vegetable' },
      { id: 'ad-3', name: 'سیب‌زمینی کوچک رنده‌شده برای لعاب طبیعی', amount: 1, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'ad-4', name: 'پیاز تفت‌داده با کمی روغن زیتون', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'ad-5a', name: 'پودر گلپر اعلا', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ad-5b', name: 'زردچوبه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ad-5c', name: 'فلفل سیاه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ad-6', name: 'آبلیموترش تازه طبیعی', amount: 3, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت عدس و سیب‌زمینی', instruction: 'عدس و سیب‌زمینی رنده‌شده را با آب گذاشته تا ۴۰ دقیقه با شعله ملایم بپزد و لعاب دهد.', durationMinutes: 40, hasTimer: true },
      { stepNumber: 2, title: 'تفت قارچ و پیاز', instruction: 'قارچ‌ها را با پیاز و زردچوبه تفت سریع داده و به عدسی اضافه کنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'چاشنی گلپر و سرو', instruction: 'در انتها گلپر و آبلیمو را افزوده و با روغن زیتون سرو نمایید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'سیب‌زمینی رنده‌شده لعاب طبیعی فوق‌العاده‌ای می‌دهد بدون اینکه نیاز به اضافه کردن آرد گندم باشد.'
    ]
  },

  // 9. کشک بادمجان برشته مجلسی
  {
    id: 'kashk-bademjan',
    title: 'کشک بادمجان برشته با نعناداغ و گردو',
    persianSubtitle: 'بادمجان کبابی یا سرخ‌شده لطیف، کشک زعفرانی غلیظ و گردوی خردشده',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'کشک بادمجان لذیذ با عطر نعناداغ اصیل، سیرداغ چیپسی، پیاز کاراملی و گردوی نگینی.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 340,
    proteinGrams: 14,
    carbsGrams: 20,
    fatGrams: 24,
    dietaryTags: ['keto', 'vegetarian'],
    isVegetarian: true,
    allergens: ['lactose', 'nuts'],
    originRegion: 'اصفهان و کاشان',
    ingredients: [
      { id: 'kb-1', name: 'بادمجان قلمی تلخی‌گرفته', amount: 800, unit: 'g', approxCostPer100g: 8000, category: 'vegetable' },
      { id: 'kb-2', name: 'کشک پاستوریزه غلیظ سنتی', amount: 150, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'kb-3', name: 'گردوی خردشده دندانی', amount: 60, unit: 'g', category: 'flour_grain', allergens: ['nuts'] },
      { id: 'kb-4', name: 'نعناع خشک برای نعناداغ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kb-5a', name: 'سیر رنده‌شده', amount: 1, unit: 'tbsp', category: 'vegetable' },
      { id: 'kb-5b', name: 'پیازداغ چیپسی', amount: 3, unit: 'tbsp', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن یا کباب بادمجان', instruction: 'بادمجان‌ها را بپزید یا کباب کرده و کاملاً با گوشت‌کوب بکوبید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'ترکیب با سیر و کشک', instruction: 'سیرداغ، پیازداغ و کشک را با بادمجان ترکیب کرده و ۱۰ دقیقه تفت دهید تا مزه‌ها به خورد هم بروند.', durationMinutes: 10 },
      { stepNumber: 3, title: 'تزئین با نعناداغ و گردو', instruction: 'نعناع را چند ثانیه در روغن گرم تفت داده و روی کشک بادمجان همراه گردو بریزید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'نعناع خشک در روغن خیلی سریع می‌سوزد و سیاه می‌شود؛ روغن که داغ شد گاز را خاموش کرده و نعناع را اضافه کنید.'
    ]
  },

  // 10. برگر گورمه دست‌ساز (Existing)
  {
    id: 'smash-burger-artisan',
    title: 'برگر گورمه دست‌ساز با سس قارچ و پیاز کاراملی',
    persianSubtitle: 'گوشت ۸۰/۲۰ رنده‌شده با نان بریوش کره‌ای و پنیر چدار ذوب‌شده',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    description: 'برگر حرفه‌ای به سبک داینرهای نیویورک با گوشت قلوه‌گاه و گردن گوساله، نسبت چربی ۲۰٪، سس مخصوص و پنیر دوبل چدار.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 780,
    proteinGrams: 46,
    carbsGrams: 48,
    fatGrams: 44,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose', 'egg'],
    originRegion: 'مدرن و بین‌المللی',
    ingredients: [
      { id: 'bg-1', name: 'گوشت چرخ‌کرده قلوه‌گاه و گردن (چربی ۲۰٪)', amount: 360, unit: 'g', approxCostPer100g: 65000, category: 'protein' },
      { id: 'bg-2', name: 'نان همبرگر بریوش نرم کره‌ای', amount: 2, unit: 'pcs', unitWeightInGrams: 80, category: 'flour_grain', allergens: ['gluten', 'lactose', 'egg'] },
      { id: 'bg-3', name: 'ورقه پنیر چدار طبیعی اعلا', amount: 4, unit: 'pcs', unitWeightInGrams: 25, category: 'dairy', allergens: ['lactose'] },
      { id: 'bg-4', name: 'پیاز بنفش خلال‌شده برای کارامل', amount: 2, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'bg-5', name: 'کره برای تست نان', amount: 30, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'bg-6a', name: 'خیارشور نواری', amount: 40, unit: 'g', category: 'vegetable' },
      { id: 'bg-6b', name: 'کاهو فرانسوی', amount: 40, unit: 'g', category: 'vegetable' },
      { id: 'bg-7', name: 'سس مخصوص دودی', amount: 60, unit: 'g', category: 'spice_seasoning', allergens: ['egg'] }
    ],
    steps: [
      { stepNumber: 1, title: 'فرم‌دهی پتی', instruction: 'گوشت سرد را به دو گلوله ۱۸۰ گرمی تقسیم کنید بدون ورز دادن زیاد.', durationMinutes: 5 },
      { stepNumber: 2, title: 'گریل و اسمش', instruction: 'در تابه چدنی بسیار داغ گوشت را فشرده کرده و نمک و فلفل بزنید و با پنیر سرو کنید.', durationMinutes: 10, hasTimer: true }
    ],
    goldenTips: [
      'نمک را پیش از پخت به گوشت نزنید تا گوشت سفت نشود.'
    ]
  },

  // 11. پیتزا مخلوط با خمیر تخمیری دست‌ساز (Existing)
  {
    id: 'pizza-artisan-dough',
    title: 'پیتزا مخصوص با خمیر تخمیری دست‌ساز',
    persianSubtitle: 'خمیر هیدراتاسیون ۶۵٪ با مخمر طبیعی، پنیر موزارلا کش‌سانی بالا',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و پیتزا',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80',
    description: 'پیتزا لذیذ با سس مارینارای ریحان ایتالیایی، ژامبون بوقلمون، قارچ اسلایس، فلفل دلمه‌ای و پنیر موزارلا.',
    prepTimeMinutes: 50,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 690,
    proteinGrams: 36,
    carbsGrams: 72,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    pastryDetails: {
      bakersPercentageFlour: 100,
      doughType: 'yeast',
      doughRestTimeMinutes: 120,
      bakingTempC: 240
    },
    ingredients: [
      { id: 'pz-1', name: 'آرد گندم قوی پیتزا (پروتئین ۱۲٪ به بالا)', amount: 280, unit: 'g', approxCostPer100g: 8000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'pz-2', name: 'آب ولرم (دمای ۳۲ درجه)', amount: 180, unit: 'ml', category: 'liquid' },
      { id: 'pz-3', name: 'خمیرمایه فوری خشک', amount: 5, unit: 'g', category: 'sweetener' },
      { id: 'pz-4', name: 'روغن زیتون فرابکر', amount: 20, unit: 'ml', category: 'oil_fat' },
      { id: 'pz-5', name: 'پنیر موزارلا قالبی رنده‌شده پرچرب', amount: 250, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'pz-6', name: 'ژامبون دودی یا فیله مرغ', amount: 150, unit: 'g', category: 'protein' },
      { id: 'pz-7', name: 'قارچ تازه ورقه‌ای نازک', amount: 120, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'ورز و تخمیر خمیر', instruction: 'خمیر را ورز داده و بگذارید حجم آن ۲ برابر شود.', durationMinutes: 90, hasTimer: true },
      { stepNumber: 2, title: 'پخت در فر داغ', instruction: 'پیتزا را در فر داغ ۲۴۰ درجه به مدت ۱۲ تا ۱۵ دقیقه بپزید.', durationMinutes: 15, hasTimer: true, temperatureC: 240 }
    ],
    goldenTips: [
      'قارچ‌ها را قبل از چیدن روی پیتزا تفت دهید تا آب نیندازند.'
    ]
  },

  // 12. استریپس مرغ سوخاری کریسپی
  {
    id: 'chicken-strips-crispy',
    title: 'استریپس فیله مرغ سوخاری پولکی با دیپ سس',
    persianSubtitle: 'روکش پولکی کرانچی بدون نیاز به سرخ‌کن صنعتی، ترد و آبدار',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و سوخاری',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80',
    description: 'فیله سوخاری پولکی با مرینیت باترمیلک، سیر، پاپریکا دودی و آرد سوخاری ادویه‌دار مخصوص.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 3,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 520,
    proteinGrams: 45,
    carbsGrams: 32,
    fatGrams: 22,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'egg'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'cs-1', name: 'فیله مرغ تازه بدون چربی', amount: 500, unit: 'g', approxCostPer100g: 45000, category: 'protein' },
      { id: 'cs-2', name: 'آرد سفید نول برای پولکی کردن', amount: 300, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cs-3a', name: 'شیر یا باترمیلک', amount: 150, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'cs-3b', name: 'تخم‌مرغ', amount: 1, unit: 'pcs', category: 'dairy', allergens: ['egg'] },
      { id: 'cs-4a', name: 'پاپریکا', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cs-4b', name: 'پودر سیر', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cs-4c', name: 'پودر پیاز', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cs-4d', name: 'آویشن', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cs-4e', name: 'فلفل قرمز', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cs-5', name: 'روغن سرخ‌کردنی عمیق', amount: 400, unit: 'ml', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'مرینیت فیله‌ها', instruction: 'فیله‌ها را با شیر، تخم‌مرغ و ادویه‌ها نیم‌ساعت استراحت دهید.', durationMinutes: 30 },
      { stepNumber: 2, title: 'تکنیک پولکی کردن', instruction: 'فیله را در آرد ادویه‌دار چرخانده، در کاسه آب یخ فرو ببرید و دوباره در آرد بغلتانید و با دست چنگ بزنید تا پولکی شود.', durationMinutes: 10 },
      { stepNumber: 3, title: 'سرخ کردن', instruction: 'در روغن داغ ۱۷۰ درجه ۷ الی ۹ دقیقه سرخ کنید تا طلایی و ترد شود.', durationMinutes: 10, hasTimer: true, temperatureC: 170 }
    ],
    goldenTips: [
      'فرو بردن فیله در آب بسیار سرد راز تشکیل بافت پولکی ترد است.'
    ]
  },

  // 13. پاستا پنه آلفردو با مرغ گریل
  {
    id: 'pasta-penne-alfredo',
    title: 'پاستا پنه آلفردو با سینه مرغ گریل و سس قارچ',
    persianSubtitle: 'سس کرمی غلیظ با سیر رنده‌شده، پنیر پارمزان اصیل و خامه',
    category: 'international',
    categoryNameFa: 'غذاهای بین‌المللی',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=800&auto=format&fit=crop&q=80',
    description: 'پاستا پنه آل دندان ایتالیایی با سس خامه و سیر، قارچ ورقه‌ای تفت‌خورده، فیله مرغ مرینیت‌شده و پنیر پارمیجانو.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    baseServings: 3,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 590,
    proteinGrams: 38,
    carbsGrams: 58,
    fatGrams: 24,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'ایتالیا',
    ingredients: [
      { id: 'pa-1', name: 'پاستا پنه مرغوب', amount: 300, unit: 'g', approxCostPer100g: 10000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'pa-2', name: 'سینه مرغ خلال‌شده گریل', amount: 350, unit: 'g', category: 'protein' },
      { id: 'pa-3', name: 'قارچ تازه ورقه‌ای', amount: 200, unit: 'g', category: 'vegetable' },
      { id: 'pa-4a', name: 'خامه صبحانه پرچرب', amount: 150, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'pa-4b', name: 'شیر ولرم', amount: 50, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'pa-5', name: 'پنیر پارمزان رنده‌شده', amount: 60, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'pa-6a', name: 'سیر تازه له‌شده', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'pa-6b', name: 'کره پاستوریزه', amount: 25, unit: 'g', category: 'oil_fat' },
      { id: 'pa-6c', name: 'فلفل سیاه تازه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت پاستا آل دندان', instruction: 'پاستا را در آب جوش شور ۹ دقیقه بپزید و نیمی از آب پاستا را نگه دارید.', durationMinutes: 10, hasTimer: true },
      { stepNumber: 2, title: 'گریل مرغ و قارچ', instruction: 'مرغ و قارچ را با کره و سیر تفت دهید تا برشته شوند.', durationMinutes: 10 },
      { stepNumber: 3, title: 'ترکیب سس و سرو', instruction: 'خامه، پارمزان و پاستا را با کمی آب پاستا مخلوط کرده و ۲ دقیقه هم بزنید تا لعاب‌دار شود.', durationMinutes: 5 }
    ],
    goldenTips: [
      'آب نشاسته‌ای پاستا بهترین پیونددهنده خامه و پنیر است؛ آن را دور نریزید.'
    ]
  },

  // 14. شیرینی دانمارکی قنادی بازاری (Existing)
  {
    id: 'shirini-danmarki',
    title: 'شیرینی دانمارکی قنادی بازاری با کرم مخصوص',
    persianSubtitle: 'خمیر تخمیری لایه‌ای کره‌ای، براق با شربت بار و کنجد بوداده',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های خشک و سنتی',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description: 'رسپی دقیق شیرینی دانمارکی با تکنیک تورنه‌کردن کره، بافت نرم و اسفنجی، کرم وانیلی نسوز مغزی و شربت بار معطر.',
    prepTimeMinutes: 60,
    cookTimeMinutes: 25,
    baseServings: 12,
    difficulty: 'master',
    difficultyFa: 'حرفه‌ای / قنادی',
    caloriesPerServing: 280,
    proteinGrams: 5,
    carbsGrams: 36,
    fatGrams: 14,
    allergens: ['gluten', 'lactose', 'egg', 'sesame'],
    pastryDetails: {
      bakersPercentageFlour: 100,
      doughType: 'laminated',
      layerCount: 27,
      doughRestTimeMinutes: 60,
      bakingTempC: 190,
      weightLossRatio: 0.08
    },
    ingredients: [
      { id: 'dm-1', name: 'آرد نول سه صفر الک‌شده', amount: 500, unit: 'g', approxCostPer100g: 7000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'dm-2', name: 'شیر ولرم پرچرب', amount: 160, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'dm-3', name: 'تخم‌مرغ درشت به دمای محیط', amount: 2, unit: 'pcs', category: 'dairy', allergens: ['egg'] },
      { id: 'dm-4', name: 'کره لایه‌ای مارگارین', amount: 200, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'dm-5', name: 'کرم میانی مخصوص وانیلی', amount: 220, unit: 'g', category: 'sweetener' },
      { id: 'dm-6', name: 'شربت بار قنادی با زعفران و گلاب', amount: 100, unit: 'ml', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'خمیر و استراحت', instruction: 'خمیر را ورز داده و در یخچال استراحت دهید.', durationMinutes: 30 },
      { stepNumber: 2, title: 'لایه‌گذاری کره و پخت', instruction: 'کره را لایه‌گذاری کرده، فرم داده و در فر ۱۹۰ درجه بپزید و شربت بار بزنید.', durationMinutes: 25, hasTimer: true, temperatureC: 190 }
    ],
    goldenTips: [
      'شربت بار را روی شیرینی داغ خارج‌شده از فر بمالید.'
    ]
  },

  // 15. شیرینی نخودچی عید سنتی (Existing)
  {
    id: 'shirini-nokhodchi',
    title: 'شیرینی نخودچی عید سنتی با روغن صاف',
    persianSubtitle: 'بافت حل‌شونده در دهان، زعفرانی با پودر پسته و هل سبز',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های خشک و سنتی',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی اصیل نوروز ایرانی با آرد نخودچی دو آتیشه مرغوب، روغن قنادی، هل ساییده و خلال پسته.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 24,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 85,
    proteinGrams: 2,
    carbsGrams: 9,
    fatGrams: 5,
    dietaryTags: ['vegetarian'],
    allergens: ['nuts'],
    ingredients: [
      { id: 'nk-1', name: 'آرد نخودچی دو آتیشه حریر', amount: 350, unit: 'g', category: 'flour_grain' },
      { id: 'nk-2', name: 'پودر قند الک‌شده', amount: 175, unit: 'g', category: 'sweetener' },
      { id: 'nk-3', name: 'روغن صاف قنادی', amount: 175, unit: 'g', category: 'oil_fat' },
      { id: 'nk-4', name: 'پودر هل سبز ساییده', amount: 5, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن روغن و قند', instruction: 'روغن و قند را بزنید تا کرمی شود، آرد را افزوده، چرخ کنید، قالب زده و در فر ۱۶۰ درجه بپزید.', durationMinutes: 18, hasTimer: true, temperatureC: 160 }
    ],
    goldenTips: [
      'تا خنک شدن کامل شیرینی به آن دست نزنید.'
    ]
  },

  // 16. شیرینی برنجی زعفرانی کرمانشاهی
  {
    id: 'shirini-berenji',
    title: 'شیرینی برنجی زعفرانی اعلای کرمانشاه',
    persianSubtitle: 'عطر روغن حیوانی اعلا، گلاب ناب و بافت ترد ماسه‌ای سنتی',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های خشک و سنتی',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی سنتی اصیل با آرد برنج خالص خانگی، روغن حیوانی کرمانشاهی، گلاب و تخم خرفه برای تزئین.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 20,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 90,
    proteinGrams: 1.5,
    carbsGrams: 12,
    fatGrams: 4.5,
    dietaryTags: ['gluten_free', 'vegetarian'],
    isGlutenFree: true,
    allergens: ['egg'],
    originRegion: 'کرمانشاه',
    ingredients: [
      { id: 'br-1', name: 'آرد برنج نرم حریر اعلا', amount: 400, unit: 'g', approxCostPer100g: 14000, category: 'flour_grain' },
      { id: 'br-2', name: 'روغن حیوانی کرمانشاهی یا کره', amount: 180, unit: 'g', category: 'oil_fat' },
      { id: 'br-3', name: 'پودر قند الک‌شده', amount: 130, unit: 'g', category: 'sweetener' },
      { id: 'br-4', name: 'زرده تخم‌مرغ تازه', amount: 2, unit: 'pcs', category: 'dairy', allergens: ['egg'] },
      { id: 'br-5a', name: 'گلاب اصل', amount: 2, unit: 'tbsp', category: 'liquid' },
      { id: 'br-5b', name: 'زعفران دم‌کرده غلیظ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'br-6', name: 'تخم خرفه برای مهر زدن', amount: 10, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی خمیر برنجی', instruction: 'روغن و پودر قند را زده تا سفید شود. زرده‌ها، زعفران و گلاب را افزوده، آرد برنج را کم‌کم اضافه کرده و ورز دهید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'استراحت ۱۲ ساعته', instruction: 'خمیر را در نایلون به مدت ۱۲ تا ۲۴ ساعت در محیط خنک استراحت دهید تا آرد برنج رطوبت را جذب کند.', durationMinutes: 60 },
      { stepNumber: 3, title: 'مهر زدن و پخت', instruction: 'گلوله‌های ۲۰ گرمی برداشته، مهر سنتی زده، تخم خرفه پاشیده و در فر ۱۶۰ درجه ۱۵ الی ۱۸ دقیقه بپزید.', durationMinutes: 18, hasTimer: true, temperatureC: 160 }
    ],
    goldenTips: [
      'استراحت خمیر برنجی برای از بین رفتن زبری دانه‌های آرد برنج الزامی است.'
    ]
  },

  // 17. کیک اسفنجی پایه قنادی (Existing)
  {
    id: 'sponge-cake-base',
    title: 'کیک اسفنجی پایه قنادی بدون بکینگ‌پودر',
    persianSubtitle: 'فرمولاسیون اصیل با سفیده مرنگ، مناسب خامه‌کشی و کیک تولد',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و قنادی تخصصی',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    description: 'کیک اسفنجی استاندارد قنادی با نسبت‌های دقیق تخم‌مرغ، شکر و آرد قنادی. پف تنها با هوادهی مرنگ.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 40,
    baseServings: 8,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 210,
    proteinGrams: 6,
    carbsGrams: 38,
    fatGrams: 4,
    allergens: ['gluten', 'egg'],
    pastryDetails: {
      bakersPercentageFlour: 100,
      doughType: 'sponge',
      bakingTempC: 175,
      weightLossRatio: 0.11,
      targetFinishedUnitWeightGrams: 520
    },
    ingredients: [
      { id: 'sp-1', name: 'تخم‌مرغ درشت سرد جداشده', amount: 6, unit: 'pcs', category: 'dairy', allergens: ['egg'] },
      { id: 'sp-2', name: 'شکر دانه ریز سفید', amount: 150, unit: 'g', category: 'sweetener' },
      { id: 'sp-3', name: 'آرد نول سه صفر الک شده ۳ بار', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sp-4', name: 'آب جوش و وانیل خالص', amount: 30, unit: 'ml', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن سفیده و زرده', instruction: 'سفیده را فرم داده، زرده را با آب جوش و شکر زده، آرد را به آرامی فولد کرده و در فر ۱۷۵ درجه بپزید.', durationMinutes: 40, hasTimer: true, temperatureC: 175 }
    ],
    goldenTips: [
      'دیواره قالب کیک اسفنجی را هرگز چرب نکنید.'
    ]
  },

  // 18. کیک هویج و گردو کافی‌شاپی
  {
    id: 'carrot-walnut-cake',
    title: 'کیک هویج و گردو کافی‌شاپی با کرم‌پنیر',
    persianSubtitle: 'بافت مرطوب و ابریشمی با عطر دارچین، جوز هندی و تکه‌های گردو',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و قنادی تخصصی',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    description: 'کیک هویج اصیل کافی‌شاپی با روغن مایع، تخم‌مرغ، هویج رنده‌شده ریز آبدار، گردو و فراستینگ کرم‌چیز لذیذ.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    baseServings: 10,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 360,
    proteinGrams: 6,
    carbsGrams: 42,
    fatGrams: 20,
    allergens: ['gluten', 'egg', 'lactose', 'nuts'],
    ingredients: [
      { id: 'cw-1', name: 'آرد قنادی الک‌شده', amount: 250, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cw-2', name: 'هویج تازه رنده‌شده ریز', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'cw-3', name: 'تخم‌مرغ درشت', amount: 4, unit: 'pcs', category: 'dairy', allergens: ['egg'] },
      { id: 'cw-4', name: 'شکر قهوه‌ای یا سفید', amount: 180, unit: 'g', category: 'sweetener' },
      { id: 'cw-5', name: 'روغن مایع پخت‌وپز', amount: 160, unit: 'ml', category: 'oil_fat' },
      { id: 'cw-6', name: 'مغز گردوی خردشده', amount: 80, unit: 'g', category: 'flour_grain', allergens: ['nuts'] },
      { id: 'cw-7a', name: 'پودر دارچین', amount: 2, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cw-7b', name: 'جوز هندی رنده‌شده', amount: 0.25, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'cw-7c', name: 'بکینگ‌پودر', amount: 1.5, unit: 'tsp', category: 'flour_grain' },
      { id: 'cw-8', name: 'فراستینگ کرم‌چیز (پنیر ماسکارپونه، خامه و پودر قند)', amount: 200, unit: 'g', category: 'dairy', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن تخم‌مرغ و شکر', instruction: 'تخم‌مرغ‌ها و شکر را ۵ دقیقه بزنید تا حجیم شود. روغن را اضافه کنید.', durationMinutes: 8 },
      { stepNumber: 2, title: 'افزودن مواد خشک و هویج', instruction: 'آرد و دارچین را الک کرده، همراه هویج و گردو با لیسک مخلوط نمایید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'پخت در فر', instruction: 'در قالب ۲۴ سانت در فر ۱۷۵ درجه به مدت ۴۵ الی ۵۰ دقیقه بپزید و پس از خنک شدن با کرم‌پنیر روکش کنید.', durationMinutes: 48, hasTimer: true, temperatureC: 175 }
    ],
    goldenTips: [
      'آب هویج را نباید بگیرید؛ رطوبت هویج بافت نرم کیک را تامین می‌کند.'
    ]
  },

  // 19. شله‌زرد مجلسی زعفرانی اعلا (Existing)
  {
    id: 'sholeh-zard',
    title: 'شله‌زرد مجلسی نذری بدون آب‌انداختن',
    persianSubtitle: 'عطر گلاب کاشان، هل و زعفران قائنات با خلال بادام خیس‌خورده',
    category: 'halva_traditional',
    categoryNameFa: 'حلوا و دسرهای سنتی',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    description: 'شله‌زرد فوق‌العاده خوش‌رنگ و شفاف با تکنیک دم‌کردن که مانع از آب‌انداختن آن پس از سرد شدن می‌شود.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 120,
    baseServings: 6,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 310,
    proteinGrams: 4,
    carbsGrams: 64,
    fatGrams: 4,
    allergens: ['nuts'],
    ingredients: [
      { id: 'sz-1', name: 'برنج نیم‌دانه مرغوب ایرانی', amount: 200, unit: 'g', category: 'flour_grain' },
      { id: 'sz-2', name: 'شکر سفید', amount: 400, unit: 'g', category: 'sweetener' },
      { id: 'sz-3', name: 'زعفران قائنات دم‌کرده', amount: 5, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'sz-4a', name: 'گلاب اصل کاشان', amount: 100, unit: 'ml', category: 'liquid' },
      { id: 'sz-4b', name: 'خلال بادام درختی', amount: 50, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'sz-5', name: 'کره برای شفافیت', amount: 40, unit: 'g', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت کامل برنج', instruction: 'برنج را با آب پخته، زعفران را قبل از شکر بیفزایید، سپس شکر و خلال را اضافه کرده و دم بدهید.', durationMinutes: 100, hasTimer: true }
    ],
    goldenTips: [
      'دم کردن شله‌زرد مانع آب انداختن آن در یخچال می‌شود.'
    ]
  },

  // 20. بستنی سنتی زعفرانی اعلا با خامه خشک
  {
    id: 'bastani-sonnati',
    title: 'بستنی سنتی زعفرانی اعلا با تکه‌های خامه خشک و پسته',
    persianSubtitle: 'بافت کشدار با ثعلب اصل قنادی، گلاب دوآتشه و سرشیر خشک',
    category: 'icecream',
    categoryNameFa: 'بستنی و فالوده سنتی',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80',
    description: 'بستنی سنتی ایرانی به سبک اکبرمشتی با شیر پرچرب محلی، ثعلب اعلا، زعفران خالص، گلاب و تکه‌های یخ‌زده خامه غلیظ.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 20,
    baseServings: 6,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 280,
    proteinGrams: 6,
    carbsGrams: 35,
    fatGrams: 14,
    allergens: ['lactose', 'nuts'],
    ingredients: [
      { id: 'bs-1', name: 'شیر پرچرب محلی جوشیده', amount: 800, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'bs-2', name: 'شکر سفید دانه‌ریز', amount: 220, unit: 'g', category: 'sweetener' },
      { id: 'bs-3', name: 'ثعلب قنادی مرغوب', amount: 8, unit: 'g', category: 'spice_seasoning' },
      { id: 'bs-4', name: 'زعفران دم‌کرده غلیظ با یخ', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'bs-5', name: 'گلاب اصل کاشان', amount: 50, unit: 'ml', category: 'liquid' },
      { id: 'bs-6', name: 'خامه صبحانه پرچرب برای تکه‌های خامه خشک', amount: 150, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'bs-7', name: 'خلال پسته بو داده', amount: 40, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'یخ زدن خامه خشک', instruction: 'خامه را در سینی روی کیسه فریزر به ضخامت ۲ میلی‌متر پهن کرده و در فریزر بگذارید تا کاملاً منجمد و شکننده شود.', durationMinutes: 60 },
      { stepNumber: 2, title: 'آماده‌سازی مایه بستنی', instruction: 'شیر را گرم کرده، شکر و ثعلب را مخلوط و کم‌کم به شیر بیفزایید و هم بزنید تا غلیظ و کش‌دار شود. زعفران و گلاب را اضافه کرده و بگذارید خنک شود.', durationMinutes: 20 },
      { stepNumber: 3, title: 'هم زدن در فریزر', instruction: 'مایه را در فریزر گذاشته و هر ۴۵ دقیقه با همزن بزنید (۴ تا ۵ بار تکرار) تا یخ‌بلوری نشود. در مرحله آخر تکه‌های خامه خشک و پسته را بیفزایید.', durationMinutes: 180, hasTimer: true }
    ],
    goldenTips: [
      'ثعلب را ابتدا با شکر کاملاً مخلوط کنید تا داخل شیر داغ گلوله نشود.'
    ]
  },

  // 21. شیک پروتئینی جو دوسر و کره بادام‌زمینی (ورزشی / سلامتی)
  {
    id: 'protein-shake-peanut',
    title: 'شیک پروتئینی جو دوسر، موز و کره بادام‌زمینی (ورزشی)',
    persianSubtitle: 'انرژی پایدار، پروتئین بالا، بدون شکر مصنوعی، مناسب رژیم و فیتنس',
    category: 'drinks_beverages',
    categoryNameFa: 'شیک و نوشیدنی‌های سلامتی',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80',
    description: 'اسموتی و شیک سالم و پرانرژی با شیر کم‌چرب، پودر جو دوسر پرک، موز یخ‌زده، کره بادام‌زمینی طبیعی و دارچین.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    baseServings: 1,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 380,
    proteinGrams: 24,
    carbsGrams: 46,
    fatGrams: 12,
    fiberGrams: 8,
    dietaryTags: ['high_protein', 'vegetarian'],
    isVegetarian: true,
    allergens: ['lactose', 'nuts'],
    ingredients: [
      { id: 'ps-1', name: 'شیر کم‌چرب یا شیر بادام', amount: 250, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'ps-2', name: 'جو دوسر پرک فوری آسیاب‌شده', amount: 40, unit: 'g', category: 'flour_grain' },
      { id: 'ps-3', name: 'موز رسیده یخ‌زده', amount: 1, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' },
      { id: 'ps-4', name: 'کره بادام‌زمینی طبیعی بدون شکر', amount: 1, unit: 'tbsp', unitWeightInGrams: 25, category: 'oil_fat', allergens: ['nuts'] },
      { id: 'ps-5a', name: 'پودر دارچین', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ps-5b', name: 'پودر کاکائو تلخ', amount: 1, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'میکس در بلندر', instruction: 'تمام مواد را در مخلوط‌کن ریخته و به مدت ۶۰ ثانیه با دور تند میکس کنید تا کاملاً یکدست و کف‌دار شود.', durationMinutes: 2 }
    ],
    goldenTips: [
      'استفاده از موز یخ‌زده باعث می‌شود بافت شیک بدون نیاز به بستنی فوق‌العاده کرمی و سرد شود.'
    ]
  }
];

// Combine all modules into a master catalog and deduplicate by unique id
const combinedList: Recipe[] = [
  ...USER_DOC_RECIPES,
  ...BREAKFAST_RECIPES,
  ...EXPANDED_ENCYCLOPEDIA_RECIPES,
  ...BASE_RECIPES,
  ...TRADITIONAL_RECIPES,
  ...LOCAL_AND_EVERYDAY_RECIPES,
  ...FAST_FOOD_RECIPES,
  ...PASTRY_RECIPES,
  ...CAKES_DESSERTS_DRINKS_RECIPES,
  ...MORE_IRANIAN_HERITAGE_RECIPES
];

const seenIds = new Set<string>();
export const RECIPES_DATA: Recipe[] = combinedList
  .filter(recipe => {
    if (seenIds.has(recipe.id)) {
      return false;
    }
    seenIds.add(recipe.id);
    return true;
  })
  .map(recipe => enrichRecipeWithVerifiedImage(recipe));


