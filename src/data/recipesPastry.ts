import { Recipe } from '../types';

export const PASTRY_RECIPES: Recipe[] = [
  // 1. شیرینی بهشتی (کرکی) سنتی سه‌رنگ عید
  {
    id: 'shirini-beheshti',
    title: 'شیرینی بهشتی (کرکی) سنتی سه‌رنگ قنادی با عطر هل و زعفران',
    persianSubtitle: 'شیرینی مخملی عید با آرد برنج و گندم، شکل‌پذیری عالی با ماسوره و بافت آب‌شونده در دهان',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    originProvince: 'اصفهان',
    originRegion: 'اصفهان و نائین',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی بهشتی یا کرکی اصیل نوروزی با بافت مخملی و ذوب‌شونده در دهان، تهیه شده در سه رنگ سنتی سفید وانیلی، زرد زعفرانی و قهوه‌ای شکلاتی با پودر خرفه و پسته.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    baseServings: 15,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 110,
    proteinGrams: 2,
    carbsGrams: 14,
    fatGrams: 6,
    allergens: ['gluten'],
    pastryDetails: {
      bakersPercentageFlour: 100,
      doughType: 'shortcrust',
      layerCount: 1,
      doughRestTimeMinutes: 30,
      bakingTempC: 170,
      targetFinishedUnitWeightGrams: 25
    },
    ingredients: [
      { id: 'sb-1', name: 'روغن صاف قنادی یا کره بدون دوغ', amount: 200, unit: 'g', approxCostPer100g: 15000, category: 'oil_fat' },
      { id: 'sb-2', name: 'پودر قند الک‌شده مرغوب', amount: 180, unit: 'g', approxCostPer100g: 7000, category: 'sweetener' },
      { id: 'sb-3', name: 'آرد سفید قنادی الک‌شده سه باره', amount: 350, unit: 'g', approxCostPer100g: 5000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sb-4', name: 'پودر هل اعلا و زعفران غلیظ دم‌کرده', amount: 10, unit: 'g', category: 'spice_seasoning' },
      { id: 'sb-5', name: 'پودر کاکائو تیره و تخم خرفه برای تزیین', amount: 15, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن روغن و پودر قند', instruction: 'روغن و پودر قند را با همزن برقی دست‌کم ۷ دقیقه بزنید تا کاملاً سفید، پوک و حجیم شود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن آرد و تفکیک رنگ‌ها', instruction: 'آرد و هل را کم‌کم اضافه کرده و با نوک انگشتان یا چرخ‌گوشت نرم کنید. مایه را سه قسمت کرده؛ یک قسمت ساده، یکی با زعفران و دیگری با پودر کاکائو مخلوط کنید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'ماسوره‌زنی و پخت', instruction: 'مایه را در قیف با ماسوره شکوفه ریخته، روی سینی فر شکوفه بزنید، خرفه بپاشید و در فر ۱۷۰ درجه به مدت ۱۲ تا ۱۵ دقیقه بدون تغییر رنگ زیر شیرینی بپزید.', durationMinutes: 15, hasTimer: true, temperatureC: 170 }
    ],
    goldenTips: [
      'شیرینی بهشتی را داغ از سینی جدا نکنید چون پودر می‌شود؛ اجازه دهید کاملاً خنک شود.'
    ]
  },


  // 2. شیرینی زبان قنادی با خمیر هزارلا و عسل
  {
    id: 'shirini-zaban',
    title: 'شیرینی زبان قنادی بازاری با خمیر هزارلا و شربت عسلی',
    persianSubtitle: 'لایه‌های ترد ورقی بازشده با تیغ وسط، براق با عسل و پودر پسته',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی زبان سنتی قنادی با خمیر هزارلای ورقه‌ای فرانسوی، بدون تخم‌مرغ در خمیر، پف کرده با لایه‌های کرانچی و رومال عسل و گلاب.',
    prepTimeMinutes: 70,
    cookTimeMinutes: 25,
    baseServings: 15,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 210,
    proteinGrams: 3,
    carbsGrams: 26,
    fatGrams: 11,
    allergens: ['gluten', 'lactose'],
    originRegion: 'قنادی‌های ایران',
    pastryDetails: {
      doughType: 'laminated',
      layerCount: 144,
      bakingTempC: 200,
      targetFinishedUnitWeightGrams: 40
    },
    ingredients: [
      { id: 'sz-1', name: 'آرد سفید قنادی سه صفر', amount: 400, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sz-2', name: 'کره مخصوص هزارلا (مارگارین قنادی)', amount: 250, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'sz-3a', name: 'آب یخ بسیار سرد', amount: 180, unit: 'ml', category: 'liquid' },
      { id: 'sz-3b', name: 'نمک', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'sz-3c', name: 'سرکه سفید', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'sz-4', name: 'شربت بار عسلی با گلاب و هل', amount: 100, unit: 'ml', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه خمیر هزارلا (پفکی)', instruction: 'خمیر را آماده کرده، کره را در مرکز خمیر نهاده و ۶ بار تای سه لا بزنید با استراحت‌های ۲۰ دقیقه‌ای در یخچال.', durationMinutes: 90 },
      { stepNumber: 2, title: 'قالب زدن با کاتر بیضی زبان', instruction: 'خمیر را به ضخامت ۱ سانتی‌متر باز کرده، قالب زبان بزنید و با تیغ تیز در وسط آن شیار عمیق ایجاد کنید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'پخت در فر داغ ۲۰۰ درجه', instruction: 'در فر ۲۰۰ درجه بپزید تا لایه‌ها کاملاً شکفته و باز شوند، سپس بلافاصله از فر بیرون آورده و شربت عسلی ولرم بمالید.', durationMinutes: 25, hasTimer: true, temperatureC: 200 }
    ],
    goldenTips: [
      'هنگام قالب زدن کاتر را در آرد بزنید و هرگز کاتر را نچرخانید تا لایه‌ها به هم نچسبند و در فر باز شوند.'
    ]
  },

  // 3. شیرینی پاپیونی عسلی ترد
  {
    id: 'shirini-papioni',
    title: 'شیرینی پاپیونی قنادی هزارلا با شربت زعفرانی',
    persianSubtitle: 'پیچش زیبای پاپیونی با لایه‌های ورقی ترد و خلال پسته تازه',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی هزارلای پاپیونی با خمیر ورقه‌ای ترد، پیچش در مرکز، شربت بار معطر و ماندگاری عالی برای ایام عید.',
    prepTimeMinutes: 60,
    cookTimeMinutes: 22,
    baseServings: 15,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 205,
    proteinGrams: 3,
    carbsGrams: 27,
    fatGrams: 10,
    allergens: ['gluten', 'lactose', 'nuts'],
    originRegion: 'قنادی‌های ایران',
    ingredients: [
      { id: 'sp-1', name: 'خمیر هزارلای آماده قنادی یا دست‌ساز', amount: 500, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sp-2', name: 'شربت بار زعفرانی قوام‌آمده', amount: 150, unit: 'ml', category: 'sweetener' },
      { id: 'sp-3', name: 'پودر پسته برای تزئین', amount: 30, unit: 'g', category: 'sweetener', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'برش و فرم‌دهی پاپیون', instruction: 'خمیر را به صورت نوارهای مستطیلی ۳ در ۸ سانتی‌متر بریده و یک پیچ ۱۸۰ درجه در وسط آن ایجاد کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'پخت و شربت‌دهی', instruction: 'در فر ۱۹۵ درجه بپزید تا ورقه‌ای پف کند، پس از خروج بلافاصله در شربت بار غوطه‌ور و خارج نمایید.', durationMinutes: 22, hasTimer: true, temperatureC: 195 }
    ],
    goldenTips: [
      'شربت باید ولرم و شیرینی داغ باشد تا شیرینی خمیر نشود و شربت جذب گردد.'
    ]
  },

  // 4. شیرینی نخودچی عید سنتی با روغن صاف
  {
    id: 'shirini-nokhodchi',
    title: 'شیرینی نخودچی عید سنتی با روغن صاف',
    persianSubtitle: 'بافت حل‌شونده در دهان، زعفرانی با پودر پسته و هل سبز',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی نخودچی اصیل ایرانی با آرد نخودچی دو آتیشه خالص، پودر قند حریر و عطر هل سبز.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 20,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 110,
    proteinGrams: 3,
    carbsGrams: 14,
    fatGrams: 5,
    allergens: ['nuts'],
    originRegion: 'قزوین و اصفهان',
    ingredients: [
      { id: 'sn-1', name: 'آرد نخودچی مرغوب دو آتیشه نرم', amount: 300, unit: 'g', category: 'flour_grain' },
      { id: 'sn-2', name: 'روغن صاف قنادی یا روغن اصیل حیوانی نیمه‌جامد', amount: 150, unit: 'g', category: 'oil_fat' },
      { id: 'sn-3', name: 'پودر قند الک‌شده حریر', amount: 150, unit: 'g', category: 'sweetener' },
      { id: 'sn-4', name: 'پودر هل سبز اعلا', amount: 5, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن روغن و قند', instruction: 'روغن و پودر قند را با همزن برقی آنقدر بزنید تا سفید، لطیف و حجیم شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'ورز دادن با آرد نخودچی', instruction: 'آرد نخودچی و هل را اضافه کرده و از چرخ گوشت رد کنید تا خمیر یکدست و منسجم بدون ترک حاصل شود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'قالب زدن و پخت', instruction: 'خمیر را باز کرده، قالب نخودچی ۴ پر بزنید و در فر ۱۶۰ درجه به مدت ۱۸ دقیقه بپزید.', durationMinutes: 18, hasTimer: true, temperatureC: 160 }
    ],
    goldenTips: [
      'پس از پخت تا زمانی که شیرینی نخودچی کاملاً در دیس خنک نشده به آن دست نزنید چون پودر می‌شود.'
    ]
  },

  // 5. شیرینی برنجی زعفرانی اعلای کرمانشاه
  {
    id: 'shirini-berenji',
    title: 'شیرینی برنجی زعفرانی اعلای کرمانشاه',
    persianSubtitle: 'عطر روغن حیوانی اعلا، گلاب ناب و بافت ترد ماسه‌ای سنتی',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    description: 'نان برنجی سوغات کرمانشاه با آرد برنج مرغوب، روغن حیوانی دانه‌دار، گلاب و خرفه سیاه.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 20,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 125,
    proteinGrams: 2,
    carbsGrams: 16,
    fatGrams: 6,
    allergens: ['egg', 'lactose'],
    originRegion: 'کرمانشاه',
    ingredients: [
      { id: 'sb-1', name: 'آرد برنج مرغوب ابریشمی', amount: 350, unit: 'g', category: 'flour_grain' },
      { id: 'sb-2', name: 'روغن حیوانی کرمانشاهی', amount: 150, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'sb-3', name: 'پودر قند الک‌شده نرم', amount: 120, unit: 'g', category: 'sweetener' },
      { id: 'sb-4', name: 'زرده تخم‌مرغ و گلاب اعلا و زعفران', amount: 2, unit: 'pcs', category: 'protein', allergens: ['egg'] }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی خمیر برنجی', instruction: 'روغن و پودر قند را زده، زرده، زعفران و گلاب را افزوده و با آرد برنج مخلوط نمایید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'استراحت ۱۲ ساعته', instruction: 'خمیر برنجی باید حتماً ۱۲ تا ۲۴ ساعت در محیط خنک استراحت کند تا آرد برنج رطوبت جذب کند.', durationMinutes: 10 },
      { stepNumber: 3, title: 'مهر زدن و پخت', instruction: 'گلوله‌های فندقی گرفته، مهر سنتی زده و با خرفه تزئین کنید. در فر ۱۶۰ درجه بپزید.', durationMinutes: 20, hasTimer: true, temperatureC: 160 }
    ],
    goldenTips: [
      'استراحت دادن خمیر راز اصلی بافت ماسه‌ای نرم و ترک نخوردن نان برنجی است.'
    ]
  },

  // 6. شیرینی نارگیلی بازاری بدون آرد (داغ‌زدن اصیل)
  {
    id: 'shirini-nargili',
    title: 'شیرینی نارگیلی بازاری با تکنیک داغ‌زدن حرفه‌ای',
    persianSubtitle: 'روکش نازک براق شیشه‌ای با مغز تر و جویدنی (Chewy) بدون ذره‌ای آرد',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1597528662465-55ece5734101?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی نارگیلی استاندارد قنادی فقط با پودر نارگیل چرب، شکر، سفیده تخم‌مرغ و روغن مایع با رعایت دمای دقیق داغ‌زدن.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 18,
    baseServings: 18,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 145,
    proteinGrams: 3,
    carbsGrams: 18,
    fatGrams: 8,
    allergens: ['egg'],
    originRegion: 'قنادی‌های ایران',
    ingredients: [
      { id: 'snr-1', name: 'پودر نارگیل چرب مرغوب', amount: 250, unit: 'g', category: 'sweetener' },
      { id: 'snr-2', name: 'شکر سفید دانه‌ریز', amount: 300, unit: 'g', category: 'sweetener' },
      { id: 'snr-3', name: 'سفیده تخم‌مرغ تازه', amount: 150, unit: 'g', category: 'protein', allergens: ['egg'] },
      { id: 'snr-4', name: 'روغن مایع پخت‌وپز', amount: 75, unit: 'g', category: 'oil_fat' },
      { id: 'snr-5', name: 'آبلیمو ترش تازه و وانیل', amount: 1, unit: 'tsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'چرخ کردن مواد', instruction: 'پودر نارگیل، شکر و نیمی از سفیده را دو بار از چرخ گوشت رد کنید تا دانه‌های شکر خرد شوند.', durationMinutes: 10 },
      { stepNumber: 2, title: 'تکنیک داغ‌زدن روی بن‌ماری', instruction: 'مابقی سفیده و روغن را اضافه کرده، روی حرارت ملایم بن‌ماری مدام هم بزنید تا شکر آب شود و مایه داغ شود (تا جایی که دست را نسوزاند - حدود ۶۵ درجه).', durationMinutes: 15 },
      { stepNumber: 3, title: 'پایپ کردن و پخت', instruction: 'پس از خنک شدن در قیف ریخته، روی سینی پایپ کنید. با انگشت چرب نوک آن را صاف کرده و در فر ۱۷۵ درجه بپزید.', durationMinutes: 18, hasTimer: true, temperatureC: 175 }
    ],
    goldenTips: [
      'اگر مایه را بیش از حد داغ بزنید، روغن می‌اندازد و سفت می‌شود؛ اگر کم داغ بزنید در فر پهن می‌شود.'
    ]
  },

  // 7. شیرینی گردویی سنتی قنادی
  {
    id: 'shirini-gerdooyi',
    title: 'شیرینی گردویی سنتی قنادی با پوسته براق ترک‌دار',
    persianSubtitle: 'عطر گردوی ایرانی با کیک اسفنجی خردشده، دارچین و سرکه سفید',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی گردویی بازاری اصیل با بافت نرم داخلی و پوسته برشته شکسته بیرونی، با فرمول دقیق داغ‌زدن قنادی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    baseServings: 18,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 160,
    proteinGrams: 4,
    carbsGrams: 18,
    fatGrams: 9,
    allergens: ['egg', 'nuts'],
    originRegion: 'قنادی‌های ایران',
    ingredients: [
      { id: 'sgr-1', name: 'مغز گردوی دندان‌گیر آسیاب‌شده', amount: 200, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'sgr-2', name: 'شکر سفید', amount: 300, unit: 'g', category: 'sweetener' },
      { id: 'sgr-3', name: 'پودر کیک اسفنجی ساده', amount: 80, unit: 'g', category: 'flour_grain' },
      { id: 'sgr-4', name: 'سفیده تخم‌مرغ', amount: 140, unit: 'g', category: 'protein', allergens: ['egg'] },
      { id: 'sgr-5', name: 'سرکه سفید و دارچین و وانیل', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'چرخ کردن و داغ‌زدن', instruction: 'گردو، شکر، پودر کیک و سفیده را چرخ کرده و روی حرارت بن‌ماری داغ بزنید تا شکر آب شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'افزودن سرکه و استراحت', instruction: 'سرکه و دارچین را اضافه کرده، بگذارید مایه در دمای اتاق کاملاً خنک شود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'پایپ و پخت', instruction: 'روی کاغذ روغنی با قیف ساده پایپ کرده و در فر ۱۷۵ درجه ۱۵ دقیقه بپزید تا ترک‌های زیبا باز شود.', durationMinutes: 15, hasTimer: true, temperatureC: 175 }
    ],
    goldenTips: [
      'سرکه سفید راز اصلی ایجاد ترک‌های زیبا روی پوسته شیرینی گردویی است.'
    ]
  },

  // 8. شیرینی کشمشی ترد و نرم قنادی
  {
    id: 'shirini-keshmeshi',
    title: 'شیرینی کشمشی سنتی با لبه‌های برشته و مغز نرم',
    persianSubtitle: 'عطر کره حیوانی و وانیل با کشمش پلویی تمیز در لایه‌های نازک طلایی',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های قنادی',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی کشمشی نوستالژیک ایرانی که لبه‌های آن طلایی و کرانچی بوده و وسط آن مانند کیک نرم و پنبه‌ای می‌ماند.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 12,
    baseServings: 20,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 130,
    proteinGrams: 2,
    carbsGrams: 22,
    fatGrams: 5,
    allergens: ['gluten', 'egg', 'lactose'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'sk-1', name: 'آرد سفید قنادی', amount: 250, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sk-2', name: 'پودر قند الک‌شده', amount: 200, unit: 'g', category: 'sweetener' },
      { id: 'sk-3', name: 'کره نرم یا روغن نیمه‌جامد', amount: 150, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'sk-4', name: 'تخم‌مرغ هم‌دمای محیط', amount: 2, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'sk-5', name: 'کشمش پلویی شسته و خشک‌شده', amount: 100, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'کرم کردن روغن و قند', instruction: 'کره و پودر قند را ۶ دقیقه بزنید تا روشن شود، تخم‌مرغ‌ها را دانه‌دانه بیفزایید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن آرد و کشمش', instruction: 'آرد و کشمش را به آرامی با لیسک مخلوط کنید تا خمیر یکدست و روان شود.', durationMinutes: 5 },
      { stepNumber: 3, title: 'پایپ کردن و پخت سریع', instruction: 'با فاصله درون سینی پایپ کنید. در فر ۱۸۰ درجه ۱۲ دقیقه بپزید تا لبه‌ها طلایی شوند.', durationMinutes: 12, hasTimer: true, temperatureC: 180 }
    ],
    goldenTips: [
      'کشمش‌ها را قبل از افزودن با یک قاشق آرد آغشته کنید تا موقع پخت ته سینی ته نشین نشوند و نسوزند.'
    ]
  },

  // 9. شیرینی ناپلئونی قنادی با خمیر هزارلا و خامه
  {
    id: 'shirini-napoleoni',
    title: 'شیرینی ناپلئونی قنادی با لایه‌های خمیر هزارلا و خامه',
    persianSubtitle: 'تردی بی‌نظیر ورقه‌های هزارلا با خامه قنادی فرم‌گرفته و پودر پسته',
    category: 'pastry_wet',
    categoryNameFa: 'شیرینی‌های تر و خامه‌ای',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین شیرینی تر قنادی‌های ایران با ورقه‌های ترد خمیر هزارلای ورقه‌ای پخته‌شده، فیلینگ خامه سبک و تزئین خرده‌های طلایی.',
    prepTimeMinutes: 45,
    cookTimeMinutes: 25,
    baseServings: 12,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 280,
    proteinGrams: 4,
    carbsGrams: 30,
    fatGrams: 16,
    allergens: ['gluten', 'lactose', 'nuts'],
    originRegion: 'قنادی‌های ایران',
    ingredients: [
      { id: 'np-1', name: 'خمیر هزارلای آماده قنادی', amount: 500, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'np-2', name: 'خامه قنادی فرم‌گرفته شیرین', amount: 400, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'np-3', name: 'پودر قند و پودر پسته و پودر هل', amount: 50, unit: 'g', category: 'sweetener', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت ورقه‌های هزارلا', instruction: 'خمیر را باز کرده، چنگال بزنید و در فر داغ ۲۰۰ درجه بپزید تا کاملاً ورقه‌ای و برشته شود.', durationMinutes: 25, hasTimer: true, temperatureC: 200 },
      { stepNumber: 2, title: 'لایه‌چینی با خامه', instruction: 'ورقه‌ها را به ۳ لایه مساوی تقسیم کنید. لایه اول خمیر، خامه فرم‌گرفته، لایه دوم خمیر، خامه و لایه سوم خمیر را بچینید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'برش با چاقوی اره‌ای و پودر پسته', instruction: 'کناره‌ها را صاف کرده، خرده‌های خمیر را پودر کرده و روی سطح خامه بپاشید و با چاقوی اره‌ای تیز برش‌های مستطیلی بزنید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'برای برش دادن ناپلئونی حتماً از چاقوی دندانه‌دار اره‌ای تیز استفاده کنید تا لایه‌ها خرد نشوند.'
    ]
  },

  // 10. نان خامه‌ای (نارنجکی) پفکی با خمیر کلمی
  {
    id: 'noon-khamei',
    title: 'نان خامه‌ای قنادی (نارنجکی) با پوسته ترد و توخالی',
    persianSubtitle: 'خمیر کلمی (Choux) پفکی با فیلینگ خامه وانیلی سبک و شکلات',
    category: 'pastry_wet',
    categoryNameFa: 'شیرینی‌های تر و خامه‌ای',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&auto=format&fit=crop&q=80',
    description: 'نان خامه‌ای کلاسیک ایرانی با خمیر شوکس ترد و سبک که درون آن کاملاً توخالی است و با خامه فرم‌گرفته پر می‌شود.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 30,
    baseServings: 12,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 260,
    proteinGrams: 4,
    carbsGrams: 22,
    fatGrams: 16,
    allergens: ['gluten', 'egg', 'lactose'],
    originRegion: 'قنادی‌های ایران',
    ingredients: [
      { id: 'nk-1', name: 'آرد سفید قنادی', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'nk-2', name: 'کره حیوانی یا مارگارین', amount: 60, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'nk-3', name: 'آب جوش', amount: 200, unit: 'ml', category: 'liquid' },
      { id: 'nk-4', name: 'تخم‌مرغ درشت', amount: 4, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'nk-5', name: 'خامه قنادی فرم‌گرفته با گلاب و وانیل', amount: 350, unit: 'g', category: 'dairy', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'داغ‌زدن خمیر شوکس', instruction: 'آب و کره را به جوش آورده، آرد را یکباره ریخته و ۳ دقیقه مدام هم بزنید تا ته قابلمه لایه سفید نازک ببندد.', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن تخم‌مرغ‌ها', instruction: 'خمیر که ولرم شد، تخم‌مرغ‌ها را دانه‌دانه اضافه کنید و با همزن بزنید تا براق و چسبنده شود.', durationMinutes: 10 },
      { stepNumber: 3, title: 'پایپ ماسوره شکوفه و پخت', instruction: 'در سینی پایپ کنید. در فر ۲۰۰ درجه ۲۰ دقیقه و سپس ۱۷۰ درجه ۱۰ دقیقه بپزید تا طلایی و توخالی شود. پس از خنک شدن خامه تزریق کنید.', durationMinutes: 30, hasTimer: true, temperatureC: 200 }
    ],
    goldenTips: [
      'هرگز در ۲۰ دقیقه اول درب فر را باز نکنید تا پف نان خامه‌ای نخوابد.'
    ]
  },

  // 11. شیرینی لطیفه سنتی قنادی با خامه و پودر پسته
  {
    id: 'shirini-latifeh',
    title: 'شیرینی لطیفه مجلسی با خامه فرم‌گرفته و پودر پسته',
    persianSubtitle: 'نان اسفنجی ابری فوق‌العاده نرم با کرم خامه وانیلی سبک',
    category: 'pastry_wet',
    categoryNameFa: 'شیرینی‌های تر و خامه‌ای',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی محبوب جشن‌ها و مناسبت‌های ایرانی با دو لایه بیسکویت اسفنجی بسیار نرم و لطیف، مغز خامه قنادی و پودر پسته سبز قزوین.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 12,
    baseServings: 12,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 220,
    proteinGrams: 4,
    carbsGrams: 28,
    fatGrams: 10,
    allergens: ['gluten', 'egg', 'lactose', 'nuts'],
    originRegion: 'تبریز و قنادی‌های ایران',
    ingredients: [
      { id: 'lt-1', name: 'تخم‌مرغ زرده و سفیده جداشده', amount: 4, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'lt-2', name: 'شکر دانه‌ریز سفید', amount: 100, unit: 'g', category: 'sweetener' },
      { id: 'lt-3', name: 'آرد قنادی سه صفر با نشاسته ذرت', amount: 100, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'lt-4', name: 'بکینگ‌پودر و وانیل خالص', amount: 5, unit: 'g', category: 'flour_grain' },
      { id: 'lt-5', name: 'خامه قنادی فرم‌گرفته و پودر پسته', amount: 300, unit: 'g', category: 'dairy', allergens: ['lactose', 'nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'فرم دادن سفیده', instruction: 'سفیده‌ها را با نیمی از شکر هم بزنید تا کاملاً پفکی شود و از ظرف نریزد.', durationMinutes: 7 },
      { stepNumber: 2, title: 'زدن زرده و فولد کردن', instruction: 'زرده را با باقیمانده شکر و وانیل بزنید تا کش‌دار شود، سپس با سفیده و آرد الک‌شده به آرامی فولد کنید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'پایپ دایره‌ای و پخت سریع', instruction: 'روی کاغذ روغنی با ماسوره ساده دایره پایپ کرده، پودر قند بپاشید و در فر ۲۰۰ درجه فقط ۱۰ دقیقه بپزید. پس از خنک شدن بین هر دو لایه خامه گذاشته و در پودر پسته بغلتانید.', durationMinutes: 12, hasTimer: true, temperatureC: 200 }
    ],
    goldenTips: [
      'پاشیدن پودر قند قبل از ورود به فر باعث ایجاد رویه ترد و ترک‌خورده معروف شیرینی لطیفه می‌شود.'
    ]
  }
];
