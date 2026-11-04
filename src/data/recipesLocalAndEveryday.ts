import { Recipe } from '../types';

export const LOCAL_AND_EVERYDAY_RECIPES: Recipe[] = [
  // 1. کوکو سبزی پفکی مجلسی
  {
    id: 'koko-sabzi',
    title: 'کوکو سبزی مجلسی پفکی با گردو و زرشک',
    persianSubtitle: 'سبزی معطر تازه با تخم‌مرغ، بافت پوک اسفنجی و بدون وا رفتن',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    description: 'کوکو سبزی لطیف و پفکی با تره، جعفری، شوید، گشنیز، کمی شنبلیله، گردوی خردشده و زرشک قرمز تفت‌خورده.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 280,
    proteinGrams: 16,
    carbsGrams: 14,
    fatGrams: 18,
    dietaryTags: ['vegetarian', 'keto', 'low_calorie', 'high_protein'],
    isVegetarian: true,
    allergens: ['egg', 'nuts'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ks-1', name: 'سبزی کوکو ساطوری خشک (تره، جعفری، شوید، گشنیز)', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'ks-2', name: 'تخم‌مرغ تازه درشت', amount: 4, unit: 'pcs', unitWeightInGrams: 60, category: 'protein', allergens: ['egg'] },
      { id: 'ks-3', name: 'مغز گردوی دندان‌گیر خردشده', amount: 50, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'ks-4', name: 'زرشک شسته و خشک‌شده', amount: 30, unit: 'g', category: 'sweetener' },
      { id: 'ks-5', name: 'آرد گندم یا نشاسته ذرت', amount: 1, unit: 'tbsp', category: 'flour_grain' },
      { id: 'ks-6a', name: 'سیر تازه رنده‌شده', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'ks-6b', name: 'زردچوبه', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ks-6c', name: 'نمک', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'ks-6d', name: 'فلفل سیاه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه کوکو', instruction: 'تخم‌مرغ‌ها را با چنگال خوب بزنید تا از لختگی درآید و کف کند. سبزی خشک، گردو، زرشک، سیر و آرد را اضافه و به آرامی فولد کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پخت در تابه داغ', instruction: 'روغن را در تابه داغ کنید. مایه کوکو را ریخته، سطح را صاف کنید. ۱۰ دقیقه با درب بسته بپزید سپس برگردانید تا طرف دیگر برشته شود.', durationMinutes: 20 }
    ],
    goldenTips: [
      'سبزی کوکو باید کاملاً بدون آب باشد؛ رطوبت سبزی باعث خمیر شدن و پف نکردن کوکو می‌شود.'
    ]
  },

  // 2. کوکو سیب‌زمینی برشته طلایی
  {
    id: 'koko-sibzamini',
    title: 'کوکو سیب‌زمینی پخته بازاری با بافت نرم و پوک',
    persianSubtitle: 'روکش برشته کرانچی با مغز لطیف پنبه‌ای و عطر زعفران و پیازچه',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    description: 'کوکو سیب‌زمینی سنتی با سیب‌زمینی آب‌پز خنک‌شده، تخم‌مرغ و زردچوبه اعلا که هرگز در روغن وا نمی‌رود.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 310,
    proteinGrams: 12,
    carbsGrams: 38,
    fatGrams: 14,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ksb-1', name: 'سیب‌زمینی متوسط آب‌پز و کاملاً سردشده', amount: 4, unit: 'pcs', unitWeightInGrams: 150, category: 'vegetable' },
      { id: 'ksb-2', name: 'تخم‌مرغ تازه', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'ksb-3', name: 'پیازچه ساطوری یا پیاز رنده آب‌گرفته', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'ksb-4', name: 'زعفران دم‌کرده و پودر آویشن', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'رنده سیب‌زمینی سرد', instruction: 'سیب‌زمینی پخته باید کاملاً سرد شود (ترجیحاً ۲ ساعت در یخچال)، سپس با رنده ریز رنده کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'ورز دادن و سرخ کردن', instruction: 'تخم‌مرغ‌ها و ادویه را اضافه کرده، فرم بیضی داده و در روغن داغ سرخ کنید تا هر دو طرف طلایی شود.', durationMinutes: 15 }
    ],
    goldenTips: [
      'اگر سیب‌زمینی داغ را رنده کنید، مایه کشدار و چسبناک شده و در تابه شل می‌شود.'
    ]
  },

  // 3. دلمه برگ مو تبریزی ملس
  {
    id: 'dolmeh-barg-mo',
    title: 'دلمه برگ مو تبریزی با سس سرکه‌شیره ملس',
    persianSubtitle: 'پیچیدن دقیق بقچه‌ای با لپه، برنج، سبزی دلمه و گوشت چرخ‌کرده',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
    description: 'شاهکار مهمانی‌های بهاری با برگ‌های لطیف انگور، مایه برنج و لپه خوش‌عطر، گوشت چرخ‌کرده و چاشنی سرکه و شیره طبیعی.',
    prepTimeMinutes: 50,
    cookTimeMinutes: 90,
    baseServings: 6,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 380,
    proteinGrams: 18,
    carbsGrams: 52,
    fatGrams: 12,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'آذربایجان و تبریز',
    ingredients: [
      { id: 'db-1', name: 'برگ مو تازه یا شور لطیف', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'db-2', name: 'برنج ایرانی نیم‌پز', amount: 200, unit: 'g', category: 'flour_grain' },
      { id: 'db-3', name: 'لپه خیس‌خورده و پخته‌شده', amount: 100, unit: 'g', category: 'flour_grain' },
      { id: 'db-4', name: 'گوشت چرخ‌کرده مخلوط', amount: 250, unit: 'g', category: 'protein' },
      { id: 'db-5', name: 'سبزی دلمه (ترخون، مرزه، پیازچه، نعنا، جعفری)', amount: 250, unit: 'g', category: 'vegetable' },
      { id: 'db-6', name: 'شیره انگور و سرکه طبیعی (سس ملس)', amount: 150, unit: 'ml', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه دلمه', instruction: 'پیاز را تفت داده، گوشت و سبزیجات ساطوری را بیفزایید. برنج نیم‌پز و لپه را مخلوط نمایید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'پیچیدن برگ‌ها', instruction: 'برگ مو را در آب جوش ۳ دقیقه نرم کرده، یک قاشق از مایه را وسط برگ گذاشته و محکم بقچه‌ای بپیچید.', durationMinutes: 30 },
      { stepNumber: 3, title: 'پخت با سس ملس', instruction: 'دلمه‌ها را در قابلمه فشرده چیده، یک بشقاب سنگین روی آن بگذارید و با آب قلم و سس سرکه‌شیره بپزید.', durationMinutes: 70, hasTimer: true }
    ],
    goldenTips: [
      'گذاشتن بشقاب سنگین روی دلمه‌ها مانع از باز شدن برگ‌ها در اثر جوشش آب می‌شود.'
    ]
  },

  // 4. باقلاقاتق اصیل گیلانی
  {
    id: 'baghala-ghatogh',
    title: 'باقلاقاتق اصیل گیلانی با پاچ‌باقلا و تخم‌مرغ محلی',
    persianSubtitle: 'غذای گیاهی سالم شمال با شوید تازه، سیر رنده و روغن زیتون',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=80',
    description: 'غذای فوق‌العاده سریع، لذیذ و سبک شمالی با باقلای کشاورزی پوست‌کنده (پاچ باقلا)، سیر تفت‌خورده، شوید فراوان و تخم‌مرغ عسلی.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    baseServings: 3,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 320,
    proteinGrams: 19,
    carbsGrams: 28,
    fatGrams: 14,
    dietaryTags: ['vegetarian', 'high_protein', 'low_calorie'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'گیلان',
    ingredients: [
      { id: 'bg-1', name: 'پاچ باقلا محلی کشاورزی دو پوست کنده', amount: 350, unit: 'g', category: 'flour_grain' },
      { id: 'bg-2', name: 'شوید تازه ساطوری یا خشک اعلا', amount: 4, unit: 'tbsp', category: 'vegetable' },
      { id: 'bg-3', name: 'سیر تازه رنده‌شده', amount: 5, unit: 'pcs', category: 'vegetable' },
      { id: 'bg-4', name: 'تخم‌مرغ محلی', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'bg-5', name: 'کره محلی یا روغن زیتون و زردچوبه', amount: 40, unit: 'g', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت باقلا با سیر و شوید', instruction: 'سیر را در کره تفت داده، باقلا و شوید و زردچوبه را اضافه کرده و چند دقیقه تفت ملایم دهید تا عطر شوید بلند شود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پخت آرام باقلا', instruction: 'یک و نیم لیوان آب جوش افزوده و بگذارید با شعله کم باقلا بپزد و نرم شود (پاچ باقلا خیلی زود می‌پزد).', durationMinutes: 15 },
      { stepNumber: 3, title: 'افزودن تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را روی خورش شکسته و بدون هم زدن درب قابلمه را بگذارید تا سفیده‌ها ببندند و زرده عسلی بماند.', durationMinutes: 5 }
    ],
    goldenTips: [
      'تخم‌مرغ را در خورش هم نزنید تا شکل درسته و سنتی خود را حفظ کند.'
    ]
  },

  // 5. قلیه‌ماهی اصیل جنوبی با تمبر هندی
  {
    id: 'ghelyeh-mahi',
    title: 'قلیه‌ماهی اصیل بوشهری با شنبلیله، گشنیز و تمبر هندی',
    persianSubtitle: 'سس تیره غلیظ با عطر سیر و فلفل قرمز تند و فیله ماهی شیر',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    description: 'خورش دریایی بی‌رقیب جنوب ایران با سبزی قلیه (گشنیز و شنبلیله تفت‌داده)، عصاره ترش تمبر هندی، سیر فراوان و فیله ماهی بدون تیغ.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 60,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 410,
    proteinGrams: 38,
    carbsGrams: 16,
    fatGrams: 20,
    dietaryTags: ['high_protein', 'low_calorie', 'keto'],
    allergens: [],
    originRegion: 'بوشهر و خوزستان',
    ingredients: [
      { id: 'qm-1', name: 'فیله ماهی جنوب (شیر، هامور، سنگسر)', amount: 600, unit: 'g', category: 'protein' },
      { id: 'qm-2', name: 'سبزی قلیه (۴۰۰ گرم گشنیز + ۱۰۰ گرم شنبلیله)', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'qm-3', name: 'تمبر هندی سیاه مرغوب صاف‌شده', amount: 150, unit: 'g', category: 'liquid' },
      { id: 'qm-4', name: 'سیر تازه کوبیده‌شده', amount: 1, unit: 'pcs', unitWeightInGrams: 40, category: 'vegetable' },
      { id: 'qm-5', name: 'فلفل قرمز تند، زردچوبه و پودر گشنیز', amount: 10, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن سبزی قلیه', instruction: 'گشنیز و شنبلیله را حسابی سرخ کنید تا تیره شوند اما نسوزند (شنبلیله زیاد قلیه را تلخ می‌کند).', durationMinutes: 20 },
      { stepNumber: 2, title: 'تهیه سس قلیه با تمبر', instruction: 'سیر کوبیده با فلفل قرمز را تفت داده، سبزی و عصاره تمبر هندی را اضافه کنید و بگذارید ۳۰ دقیقه ریزجوش بزند.', durationMinutes: 30, hasTimer: true },
      { stepNumber: 3, title: 'افزودن ماهی', instruction: 'تکه‌های ماهی را در سس چیده و با شعله ملایم ۲۰ دقیقه بپزید تا ماهی مغزپخت شده و خورش روغن سیاه بیندازد.', durationMinutes: 20 }
    ],
    goldenTips: [
      'ماهی را در خورش هم نزنید تا گوشت لطیف آن خرد و متلاشی نشود.'
    ]
  },

  // 6. خوراک لوبیا چیتی با قارچ و گلپر
  {
    id: 'khorak-loobia',
    title: 'خوراک لوبیا چیتی غلیظ با قارچ اسلایسی و گلپر',
    persianSubtitle: 'غذای اقتصادی گرم با لعاب طبیعی نشاسته و عطر روغن زیتون',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&auto=format&fit=crop&q=80',
    description: 'خوراک مقوی و سیرکننده برای وعده شام یا صبحانه با لوبیا چیتی لعاب‌دار، قارچ ورقه‌ای تفت‌داده با کره، پیازداغ و ادویه گلپر.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 120,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 340,
    proteinGrams: 20,
    carbsGrams: 54,
    fatGrams: 6,
    fiberGrams: 14,
    dietaryTags: ['vegetarian', 'high_protein', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'kl-1', name: 'لوبیا چیتی خیسانده ۱۲ ساعته', amount: 350, unit: 'g', category: 'flour_grain' },
      { id: 'kl-2', name: 'قارچ دکمه‌ای اسلایس‌شده', amount: 200, unit: 'g', category: 'vegetable' },
      { id: 'kl-3', name: 'پیاز بزرگ نگینی تفت‌داده', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'kl-4', name: 'رب گوجه‌فرنگی سرخ‌شده با کره', amount: 2, unit: 'tbsp', category: 'vegetable' },
      { id: 'kl-5', name: 'سیب‌زمینی کوچک پخته و له‌شده (برای لعاب)', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'kl-6', name: 'پودر گلپر، آبلیمو و روغن زیتون', amount: 15, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت لوبیا با سیب‌زمینی', instruction: 'لوبیا را با سیب‌زمینی و آب بپزید. پس از پخت، سیب‌زمینی را له کرده و دوباره به قابلمه برگردانید تا لعاب بی‌نظیر ایجاد کند.', durationMinutes: 90, hasTimer: true },
      { stepNumber: 2, title: 'تفت قارچ و رب', instruction: 'پیازداغ، قارچ اسلایس و رب را تفت داده و به خوراک بیفزایید. نیم ساعت بجوشد تا جا بیفتد و با گلپر سرو کنید.', durationMinutes: 30 }
    ],
    goldenTips: [
      'یک عدد سیب‌زمینی له‌شده درون لوبیا باعث می‌شود بدون نیاز به آرد، خوراک به غلظت کنسروی برسد.'
    ]
  },

  // 7. آش جو سنتی جاافتاده
  {
    id: 'ash-jo',
    title: 'آش جو سنتی لعاب‌دار با کشک و پیازداغ چیپسی',
    persianSubtitle: 'جو پوست‌کنده با گوشت قلم، حبوبات پخته و سبزی آش معطر',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    description: 'آش جو اصیل با بافت کشدار و نشاسته‌ای غلیظ، سبزی تازه، آب قلم استخوان و تزئین سنتی نعناداغ و کشک زعفرانی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 180,
    baseServings: 6,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 390,
    proteinGrams: 22,
    carbsGrams: 58,
    fatGrams: 10,
    fiberGrams: 11,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'مرکز و غرب ایران',
    ingredients: [
      { id: 'aj-1', name: 'جو پوست‌کنده خیسانده', amount: 300, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'aj-2', name: 'نخود و لوبیا چیتی پخته', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'aj-3', name: 'سبزی آش (تره، جعفری، گشنیز، اسفناج)', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'aj-4', name: 'آب قلم گوشت گوساله غلیظ', amount: 800, unit: 'ml', category: 'liquid' },
      { id: 'aj-5', name: 'کشک سنتی غلیظ جوشانده', amount: 200, unit: 'g', category: 'dairy', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'شکفتن جو با آب قلم', instruction: 'جو پوست‌کنده را با آب قلم بگذارید حداقل ۲ ساعت بپزد تا کاملاً لعاب بیندازد و دانه‌ها باز شوند.', durationMinutes: 120, hasTimer: true },
      { stepNumber: 2, title: 'افزودن حبوبات و سبزی', instruction: 'حبوبات پخته و سبزی آش را اضافه کنید و ۴۰ دقیقه دیگر اجازه دهید طعم‌ها یکدست شوند.', durationMinutes: 40 },
      { stepNumber: 3, title: 'ترکیب با کشک و پیازداغ', instruction: 'کشک جوشانده و نیمی از پیازداغ و نعناداغ را درون آش ریخته و برای ۱۰ دقیقه هم بزنید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'هم زدن مداوم در انتهای پخت باعث کشدار شدن و قوام عالی آش جو می‌شود.'
    ]
  },

  // 8. آش دوغ اصیل اردبیل
  {
    id: 'ash-doogh',
    title: 'آش دوغ اصیل اردبیل با سبزی‌های کوهی و سیر تازه',
    persianSubtitle: 'دوغ محلی ترش با برنج نیم‌دانه، نخود پخته و گوشت قلقلی ریز',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    description: 'آش خنک و محبوب سرعین و اردبیل تهیه شده با دوغ طبیعی ترش، سبزی معطر شامل برگ سیر و گشنیز، تخم‌مرغ برای نبریدن دوغ و کوفته‌ریزه‌های طعم‌دار.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    baseServings: 6,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 280,
    proteinGrams: 16,
    carbsGrams: 38,
    fatGrams: 8,
    fiberGrams: 6,
    dietaryTags: ['vegetarian', 'low_calorie'],
    allergens: ['lactose', 'egg'],
    originRegion: 'اردبیل و آذربایجان',
    ingredients: [
      { id: 'ad-1', name: 'دوغ محلی ترش بدون گاز', amount: 2000, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'ad-2', name: 'برنج نیم‌دانه ایرانی خیسانده', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'ad-3', name: 'نخود آبگوشتی پخته‌شده', amount: 200, unit: 'g', category: 'flour_grain' },
      { id: 'ad-4', name: 'سبزی آش دوغ (تره، گشنیز، برگ سیر تازه)', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'ad-5', name: 'تخم‌مرغ خام (راز نبریدن دوغ)', amount: 1, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'ad-6', name: 'سیر تازه کوبیده‌شده', amount: 5, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'هم زدن دوغ و تخم‌مرغ', instruction: 'دوغ، برنج نیم‌دانه و تخم‌مرغ را در قابلمه ریخته و با همزن دستی خوب بزنید تا یکدست شود.', durationMinutes: 5 },
      { stepNumber: 2, title: 'به جوش آوردن با هم زدن مداوم', instruction: 'روی شعله تند گذاشته و بدون وقفه در یک جهت هم بزنید تا دوغ جوش بیاید (اگر هم نزنید دوغ می‌بُرد).', durationMinutes: 20, proTip: 'هم زدن یک‌طرفه مانع از دلمه‌شدن دوغ می‌شود.' },
      { stepNumber: 3, title: 'افزودن سبزی و نخود', instruction: 'وقتی دوغ جوشید، شعله را ملایم کرده، سبزی و نخود پخته را اضافه کنید و درب قابلمه را نگذارید تا رنگ سبزی روشن بماند. در آخر سیر کوبیده را بیفزایید.', durationMinutes: 20 }
    ],
    goldenTips: [
      'راز نبریدن دوغ، هم زدن تخم‌مرغ در دوغ سرد و هم زدن مداوم تا زمان قل زدن است.'
    ]
  }
];
