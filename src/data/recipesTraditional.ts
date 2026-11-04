import { Recipe } from '../types';

export const TRADITIONAL_RECIPES: Recipe[] = [
  // 1. خورش کرفس مجلسی
  {
    id: 'khoresht-karafs',
    title: 'خورش کرفس مجلسی با نعنا، جعفری و گوشت گوسفندی',
    persianSubtitle: 'ساقه‌های ترد کرفس با عطر سبزی سرخ‌شده، آبغوره و لیمو عمانی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    description: 'خورش کرفس جاافتاده با ساقه کرفس لطیف، سبزی نعناع و جعفری معطر سرخ‌شده، گوشت ران گوسفندی و ترشی ملایم آبغوره.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 150,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 430,
    proteinGrams: 34,
    carbsGrams: 16,
    fatGrams: 26,
    dietaryTags: ['low_calorie', 'high_protein', 'keto'],
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'kr-1', name: 'ساقه کرفس جوان خردشده ۲ سانتی', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'kr-2', name: 'سبزی نعنا و جعفری (جعفری ۳ برابر نعنا)', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'kr-3', name: 'گوشت ران یا سردست گوسفندی', amount: 450, unit: 'g', category: 'protein' },
      { id: 'kr-4', name: 'پیاز متوسط نگینی', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'kr-5', name: 'آبغوره طبیعی یا لیمو عمانی', amount: 4, unit: 'tbsp', category: 'liquid' },
      { id: 'kr-6a', name: 'زعفران دم‌کرده', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kr-6b', name: 'روغن پخت‌وپز', amount: 2, unit: 'tbsp', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت کرفس و سبزی', instruction: 'کرفس‌ها را با کمی روغن ملایم تفت دهید تا بافت آن هنگام پخت حفظ شود. نعنا و جعفری را نیز جداگانه تفت دهید (نعنا نباید تلخ شود).', durationMinutes: 15 },
      { stepNumber: 2, title: 'پخت گوشت با پیاز', instruction: 'پیاز را طلایی کرده، گوشت و زردچوبه را تفت دهید و با آب جوش بگذارید ۱.۵ ساعت بپزد.', durationMinutes: 90, hasTimer: true },
      { stepNumber: 3, title: 'ترکیب و جاافتادن', instruction: 'کرفس و سبزی را به همراه آبغوره و زعفران اضافه کرده و ۴۵ دقیقه ریزجوش دهید تا روغن بیندازد.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'میزان نعنا نباید زیاد باشد چون خورش تلخ می‌شود؛ نسبت استاندارد ۳ قسمت جعفری به ۱ قسمت نعنا است.'
    ]
  },

  // 2. لوبیاپلو اصیل با گوشت تکه‌ای
  {
    id: 'loobia-polo',
    title: 'لوبیاپلو اصیل با گوشت تکه‌ای، دارچین و ته‌دیگ نان',
    persianSubtitle: 'عطر گلاب و دارچین فراوان با لوبیای سبز خردشده ریز و زعفران',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80',
    description: 'لوبیاپلوی مجلسی با گوشت فیله یا مغز ران نگینی، لوبیا سبز نوبرانه، ادویه مخصوص پلویی و زعفران قائنات.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 70,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 560,
    proteinGrams: 28,
    carbsGrams: 75,
    fatGrams: 16,
    dietaryTags: ['high_protein'],
    allergens: ['gluten'],
    originRegion: 'تهران و قزوین',
    ingredients: [
      { id: 'lp-1', name: 'برنج ایرانی طارم یا هاشمی', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'lp-2', name: 'لوبیا سبز خردشده بندانگشتی', amount: 350, unit: 'g', category: 'vegetable' },
      { id: 'lp-3', name: 'گوشت گوساله یا گوسفندی ریز خردشده', amount: 300, unit: 'g', category: 'protein' },
      { id: 'lp-4', name: 'رب گوجه‌فرنگی غلیظ تفت‌داده', amount: 3, unit: 'tbsp', category: 'vegetable' },
      { id: 'lp-5a', name: 'پودر دارچین', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'lp-5b', name: 'ادویه پلویی', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'lp-6a', name: 'زعفران دم‌کرده', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'lp-6b', name: 'گلاب اعلا', amount: 1, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه لوبیاپلو', instruction: 'پیاز را تفت داده، گوشت را اضافه کرده و بپزید. لوبیا سبز تفت‌داده، رب گوجه و ادویه‌ها را بیفزایید تا به روغن بیفتد.', durationMinutes: 40 },
      { stepNumber: 2, title: 'لایه‌چینی با برنج', instruction: 'برنج را زنده‌تر آبکش کنید. کف دیگ نان لواش چیده و برنج و مایه گوشتی را لایه لایه بریزید و دارچین بپاشید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'دم انداختن', instruction: 'زعفران و کمی کره روی برنج داده و با شعله ملایم ۴۵ دقیقه دم بگذارید.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'برنج لوبیاپلو باید کمی زنده‌تر از پلوی ساده آبکش شود تا با سس رب شفته نشود.',
      'دارچین را حتماً لابه‌لای برنج بپاشید، نه در رب؛ تا رنگ سس کدر نشود.'
    ]
  },

  // 3. عدس‌پلو مجلسی
  {
    id: 'adas-polo',
    title: 'عدس‌پلو مجلسی با گوشت قلقلی، کشمش و خرما',
    persianSubtitle: 'پلو اعلا با پیازداغ چیپسی، زعفران فراوان و خلال پسته',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    description: 'غذای شاهانه ایرانی با عدس ریز خوش‌پخت، برنج دانه کشیده، گوشت چرخ‌کرده قلقلی، کشمش پلویی تفت‌داده با کره و خرمای براق.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 60,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 540,
    proteinGrams: 26,
    carbsGrams: 82,
    fatGrams: 14,
    fiberGrams: 7,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ap-1', name: 'برنج اعلا ایرانی', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'ap-2', name: 'عدس ریز ارگانیک پخته‌شده', amount: 200, unit: 'g', category: 'flour_grain' },
      { id: 'ap-3', name: 'گوشت چرخ‌کرده گوسفند و گوساله', amount: 250, unit: 'g', category: 'protein' },
      { id: 'ap-4', name: 'کشمش پلویی پاک‌شده', amount: 100, unit: 'g', category: 'sweetener' },
      { id: 'ap-5', name: 'خرمای هسته‌گرفته براق', amount: 8, unit: 'pcs', category: 'sweetener' },
      { id: 'ap-6a', name: 'پیازداغ عسلی', amount: 3, unit: 'tbsp', category: 'vegetable' },
      { id: 'ap-6b', name: 'خلال بادام و پسته', amount: 20, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'کوفته قلقلی و کشمش', instruction: 'گوشت را با پیاز رنده و ادویه قلقلی کرده و در کره تفت دهید. کشمش و خرما را نیز جداگانه چند ثانیه در کره بغلتانید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'آبکش و دم دادن', instruction: 'عدس پخته را در لحظه آخر به برنج جوشان اضافه و آبکش کنید. لایه لایه دارچین پاشیده و دم بگذارید.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'کشمش را زیاد روی حرارت نگذارید؛ حرارت بالا باعث پف کردن و بد فرم شدن کشمش می‌شود.'
    ]
  },

  // 4. خورش قیمه بادمجان مجلسی
  {
    id: 'gheimeh-bademjan',
    title: 'خورش قیمه بادمجان با گوشت گوسفندی و لیمو عمانی',
    persianSubtitle: 'بادمجان قلمی طلایی با لپه زعفرانی و سس غلیظ دارچینی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=800&auto=format&fit=crop&q=80',
    description: 'ترکیب بی‌نظیر بادمجان سرخ‌شده بدون روغن اضافی با خورش قیمه سنتی زعفرانی، لپه پخته نرم و عطر هل و گلاب.',
    prepTimeMinutes: 35,
    cookTimeMinutes: 130,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 510,
    proteinGrams: 32,
    carbsGrams: 35,
    fatGrams: 24,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'مرکز و جنوب ایران',
    ingredients: [
      { id: 'gb-1', name: 'گوشت قیمه‌ای گوسفندی', amount: 450, unit: 'g', category: 'protein' },
      { id: 'gb-2', name: 'لپه خیس‌خورده و نیم‌پز', amount: 120, unit: 'g', category: 'flour_grain' },
      { id: 'gb-3', name: 'بادمجان قلمی تلخی‌گرفته', amount: 4, unit: 'pcs', category: 'vegetable' },
      { id: 'gb-4', name: 'رب گوجه‌فرنگی تفت‌داده با کره', amount: 2.5, unit: 'tbsp', category: 'vegetable' },
      { id: 'gb-5a', name: 'لیمو عمانی', amount: 2, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'gb-5b', name: 'چوب دارچین', amount: 1, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'gb-6', name: 'غوره بدون هسته تازه یا فریزری', amount: 3, unit: 'tbsp', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی بادمجان', instruction: 'بادمجان‌ها را پوست کنده، نمک زده و در آفتاب بگذارید تا عرق کند، سپس شسته، خشک کرده و سرخ کنید.', durationMinutes: 30 },
      { stepNumber: 2, title: 'پخت خورش قیمه', instruction: 'پیاز را تفت داده، گوشت و زردچوبه را بیفزایید. لپه تفت‌خورده و رب را اضافه کرده و بگذارید آرام بپزد.', durationMinutes: 90, hasTimer: true },
      { stepNumber: 3, title: 'افزودن بادمجان و غوره', instruction: 'در ۲۰ دقیقه پایانی بادمجان‌های سرخ‌شده و غوره را روی خورش بچینید تا طعم بگیرند اما له نشوند.', durationMinutes: 20 }
    ],
    goldenTips: [
      'تفت دادن لپه با گوشت مانع از وا رفتن و له شدن آن هنگام پخت طولانی می‌شود.'
    ]
  },

  // 5. قیمه نثار زعفرانی اصیل قزوین
  {
    id: 'gheimeh-nesar',
    title: 'قیمه نثار مجلسی اعلای قزوین با گوشت گوسفندی',
    persianSubtitle: 'شاهکار مهمانی‌ها با خلال پسته، خلال بادام، پوست پرتقال و زرشک',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    description: 'غذای فاخر سنتی قزوین با گوشت مغز ران گوسفندی پخته در عطر هل و گلاب و دارچین، چیده شده در لایه‌های برنج زعفرانی با آجیل معطر.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 120,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'سخت',
    caloriesPerServing: 620,
    proteinGrams: 36,
    carbsGrams: 70,
    fatGrams: 22,
    dietaryTags: ['high_protein'],
    allergens: ['nuts'],
    originRegion: 'قزوین',
    ingredients: [
      { id: 'gn-1', name: 'گوشت قیمه‌ای درشت گوسفندی', amount: 500, unit: 'g', category: 'protein' },
      { id: 'gn-2', name: 'برنج ایرانی دانه بلند', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'gn-3a', name: 'خلال پسته', amount: 30, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'gn-3b', name: 'خلال بادام', amount: 30, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'gn-4', name: 'خلال پوست پرتقال شیرین‌شده', amount: 30, unit: 'g', category: 'vegetable' },
      { id: 'gn-5', name: 'زرشک پفکی تفت‌داده با شکر و کره', amount: 50, unit: 'g', category: 'sweetener' },
      { id: 'gn-6', name: 'ادویه مخصوص قیمه نثار (هل، دارچین، زیره، گل سرخ)', amount: 10, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت گوشت معطر', instruction: 'گوشت را با پیازداغ فراوان، زردچوبه و ادویه مخصوص قیمه نثار تفت دهید، با آب قلم بپزید تا غلیظ و سس‌دار شود.', durationMinutes: 90, hasTimer: true },
      { stepNumber: 2, title: 'تفت آجیل‌ها', instruction: 'خلال بادام، پسته، خلال پرتقال و زرشک را در کره و زعفران به تفکیک چند ثانیه تفت دهید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'سرو لایه‌ای مجلسی', instruction: 'نیمی از برنج را در دیس کشیده، گوشت و سس را در مرکز داده و با برنج زعفرانی و مخلوط خلال‌ها تزئین کنید.', durationMinutes: 15 }
    ],
    goldenTips: [
      'خلال بادام را در گلاب اعلا بخیسانید تا طعم بی‌نظیر سنتی قزوین حاصل شود.'
    ]
  },

  // 6. خورش آلو اسفناج مجلسی
  {
    id: 'khoresht-aloo-esfenaj',
    title: 'خورش آلو اسفناج مجلسی با گوشت یا مرغ زعفرانی',
    persianSubtitle: 'سبزی اسفناج مخملی با آلوی بخارا، ترشی آب نارنج و روغن انداختن طبیعی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80',
    description: 'یکی از سالم‌ترین و لذیذترین خورش‌های مجلسی با اسفناج تازه تفت‌خورده، آلوی خورشتی طلایی و طعم ملس آب نارنج یا لیمو.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 110,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 440,
    proteinGrams: 32,
    carbsGrams: 28,
    fatGrams: 20,
    dietaryTags: ['high_protein', 'low_calorie'],
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ae-1', name: 'اسفناج تازه خردشده', amount: 800, unit: 'g', category: 'vegetable' },
      { id: 'ae-2', name: 'تره ساطوری‌شده (برای قوام بهتر)', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'ae-3', name: 'گوشت گوسفندی یا سینه مرغ زعفرانی', amount: 450, unit: 'g', category: 'protein' },
      { id: 'ae-4', name: 'آلو بخارا طلایی خیسانده', amount: 12, unit: 'pcs', category: 'sweetener' },
      { id: 'ae-5a', name: 'پیازداغ عسلی', amount: 2, unit: 'tbsp', category: 'vegetable' },
      { id: 'ae-5b', name: 'زعفران دم‌کرده', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'ae-6', name: 'آب نارنج تازه یا آبغوره', amount: 3, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت اسفناج', instruction: 'اسفناج و تره را بدون روغن تفت دهید تا آب آن کشیده شود، سپس با کمی کره چند دقیقه تفت ملایم دهید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'پخت گوشت', instruction: 'پیاز را با زردچوبه تفت داده، گوشت را افزوده و با دو لیوان آب جوش بگذارید نرم شود.', durationMinutes: 60, hasTimer: true },
      { stepNumber: 3, title: 'ترکیب و افزودن آلو', instruction: 'اسفناج، آلوهای شسته و زعفران را بیفزایید. ۳۰ دقیقه آرام بجوشد تا آلوها پف کنند و خورش به روغن بیفتد.', durationMinutes: 30, hasTimer: true }
    ],
    goldenTips: [
      'افزودن کمی تره خردشده به اسفناج مانع از شل شدن و لزج شدن بافت خورش می‌شود.'
    ]
  },

  // 7. خورش بامیه اصیل جنوبی با تمبر هندی
  {
    id: 'khoresht-bamieh',
    title: 'خورش بامیه اصیل جنوبی با سیر، تمبر هندی و گوشت',
    persianSubtitle: 'بامیه سبز مخملی بدون لیز شدن با سس تند گوجه‌فرنگی و عطر سیر تازه',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80',
    description: 'خورش بامیه خوزستانی با سس غلیظ گوجه و سیر تازه رنده شده، تمبر هندی ترش و گوشت گوسفندی نرم.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 90,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 420,
    proteinGrams: 30,
    carbsGrams: 20,
    fatGrams: 22,
    dietaryTags: ['high_protein', 'low_calorie', 'keto'],
    allergens: [],
    originRegion: 'خوزستان و بوشهر',
    ingredients: [
      { id: 'bm-1', name: 'بامیه ریز بندانگشتی تازه یا منجمد', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'bm-2', name: 'گوشت ران یا سردست گوسفندی', amount: 400, unit: 'g', category: 'protein' },
      { id: 'bm-3', name: 'سیر تازه رنده‌شده', amount: 5, unit: 'pcs', category: 'vegetable' },
      { id: 'bm-4', name: 'عصاره تمبر هندی صاف‌شده', amount: 4, unit: 'tbsp', category: 'liquid' },
      { id: 'bm-5a', name: 'رب گوجه‌فرنگی', amount: 2, unit: 'tbsp', category: 'condiment' },
      { id: 'bm-5b', name: 'پوره گوجه فرنگی', amount: 2, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی بامیه', instruction: 'دم بامیه را با دقت طوری ببرید که سوراخ نشود و مایع لزج خارج نگردد. در روغن داغ ۳ دقیقه تفت سریع دهید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پخت گوشت با سیر و رب', instruction: 'پیاز و سیر را تفت داده، گوشت و ادویه فلفل قرمز را بیفزایید. رب را سرخ کرده و با آب بگذارید گوشت بپزد.', durationMinutes: 60, hasTimer: true },
      { stepNumber: 3, title: 'جاافتادن با بامیه', instruction: 'بامیه و عصاره تمبر هندی را اضافه کنید. خورش را هم نزنید و بگذارید ۲۰ دقیقه ریزجوش بزند تا جا بیفتد.', durationMinutes: 20 }
    ],
    goldenTips: [
      'هرگز دم بامیه را از ته جدا نکنید تا بافت خورش لزج نشود؛ خورش بامیه را نباید با قاشق تند هم زد.'
    ]
  },

  // 8. سبزی‌پلو با ماهی اصیل شب عید
  {
    id: 'sabzi-polo-mahi',
    title: 'سبزی‌پلو با ماهی سفید شمال و کوکو سبزی شب عید',
    persianSubtitle: 'عطر سیر تازه و سبزی پلویی با برنج دودی و ماهی سرخ‌شده زعفرانی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    description: 'نماد سال نو ایرانی با سبزی پلویی تازه (شوید، گشنیز، جعفری، تره، سیر تازه)، برنج عطری و فیله ماهی قزل‌آلا یا سفید خوابانده در زعفران و لیمو.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 50,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 580,
    proteinGrams: 42,
    carbsGrams: 64,
    fatGrams: 18,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'شمال ایران و سرتاسر کشور',
    ingredients: [
      { id: 'sp-1', name: 'برنج ایرانی دودی یا طارم', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'sp-2', name: 'سبزی پلویی (تره، جعفری، شوید، گشنیز و سیر تازه)', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'sp-3', name: 'فیله ماهی تازه (سفید یا قزل‌آلا)', amount: 600, unit: 'g', category: 'protein' },
      { id: 'sp-4a', name: 'زعفران دم‌کرده غلیظ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'sp-4b', name: 'آبلیمو تازه', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'sp-5a', name: 'کره حیوانی', amount: 30, unit: 'g', category: 'oil_fat' },
      { id: 'sp-5b', name: 'روغن سرخ‌کردنی', amount: 2, unit: 'tbsp', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'مرینیت ماهی', instruction: 'ماهی را با نمک، فلفل سیاه، زردچوبه، آب پیاز، لیمو ترش و زعفران به مدت ۱ ساعت طعم‌دار کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'دم انداختن سبزی‌پلو', instruction: 'برنج را جوشانده، سبزی خردشده را در ثانیه‌های آخر به دیگ اضافه و آبکش کنید. با ته‌دیگ نان یا سیب‌زمینی دم بگذارید.', durationMinutes: 45, hasTimer: true },
      { stepNumber: 3, title: 'سرخ کردن برشته ماهی', instruction: 'ماهی را در تابه داغ با کره و روغن با حرارت متوسط سرخ کنید تا پوست آن طلایی و کرانچی شود.', durationMinutes: 15 }
    ],
    goldenTips: [
      'ساقه سبز سیر تازه عطر سبزی‌پلو را چندین برابر می‌کند؛ حتماً از سیر تازه در فصل بهار بهره ببرید.'
    ]
  },

  // 9. کلم‌پلو شیرازی اصیل با کوفته قلقلی
  {
    id: 'kalam-polo-shirazi',
    title: 'کلم‌پلو شیرازی اصیل با کوفته‌ریزه و سبزی معطر',
    persianSubtitle: 'کلم قمری رشته‌ای تفت‌خورده در آبغوره با ترخون و ریحان و زعفران',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    description: 'شاهکار شهر شیراز با کلم قمری خلالی سرخ‌شده، گوشت قلقلی برشته، سبزیجات معطر شامل ترخون، ریحان، تره و شوید و چاشنی آبغوره شیرازی.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 70,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 520,
    proteinGrams: 27,
    carbsGrams: 72,
    fatGrams: 15,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'شیراز',
    ingredients: [
      { id: 'kp-1', name: 'برنج اعلا ایرانی', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'kp-2', name: 'کلم قمری یا کلم پیچ خلالی باریک', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'kp-3', name: 'گوشت چرخ‌کرده برای کوفته‌ریزه', amount: 300, unit: 'g', category: 'protein' },
      { id: 'kp-4', name: 'سبزی کلم‌پلو (ترخون، ریحان، شوید، تره)', amount: 250, unit: 'g', category: 'vegetable' },
      { id: 'kp-5a', name: 'آبغوره طبیعی شیراز', amount: 3, unit: 'tbsp', category: 'liquid' },
      { id: 'kp-5b', name: 'زعفران دم‌کرده', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت کلم با آبغوره', instruction: 'کلم را خلالی خرد کرده و در تابه تفت دهید تا سبک شود، سپس آبغوره و زردچوبه بیفزایید تا بوی کلم گرفته شود.', durationMinutes: 20 },
      { stepNumber: 2, title: 'درست کردن کوفته قلقلی', instruction: 'گوشت را با پیاز رنده شده و آرد نخودچی ورز داده، قلقلی فندقی کنید و در روغن سرخ کنید.', durationMinutes: 20 },
      { stepNumber: 3, title: 'لایه لایه چیدن و دم', instruction: 'برنج را آبکش کرده، کلم تفت‌داده، سبزی معطر و کوفته‌ها را لایه لایه بریزید و دم بگذارید.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'استفاده از ترخون خشک یا تازه راز اصلی عطر مست‌کننده کلم‌پلو شیرازی است.'
    ]
  },

  // 10. استانبولی‌پلو خانگی با سیب‌زمینی و گوجه
  {
    id: 'estanboli-polo',
    title: 'استانبولی‌پلو دمی با سیب‌زمینی نگینی و گوشت چرخ‌کرده',
    persianSubtitle: 'غذای نوستالژیک پرطرفدار با ته‌دیگ سیب‌زمینی برشته و ماست چکیده',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    description: 'پلوی دمی سریع و خوش‌طعم با پوره گوجه‌فرنگی رنده‌شده، سیب‌زمینی نگینی طلایی، گوشت چرخ‌کرده و زعفران.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 490,
    proteinGrams: 22,
    carbsGrams: 76,
    fatGrams: 12,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ep-1', name: 'برنج ایرانی', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'ep-2', name: 'سیب‌زمینی نگینی مکعبی', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'ep-3', name: 'گوشت چرخ‌کرده یا تکه‌ای', amount: 200, unit: 'g', category: 'protein' },
      { id: 'ep-4a', name: 'پوره گوجه فرنگی تازه', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'ep-4b', name: 'رب گوجه‌فرنگی', amount: 2, unit: 'tbsp', category: 'condiment' },
      { id: 'ep-5a', name: 'پیاز داغ', amount: 2, unit: 'tbsp', category: 'vegetable' },
      { id: 'ep-5b', name: 'کره حیوانی', amount: 20, unit: 'g', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت مایه گوشت و سیب‌زمینی', instruction: 'پیاز را تفت داده، گوشت و ادویه را اضافه کنید. سیب‌زمینی نگینی را جداگانه سرخ کرده و به مایه بیفزایید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'دمی کردن برنج با گوجه', instruction: 'پوره گوجه و رب را تفت دهید تا روغن بیندازد. برنج کته را با مایه مخلوط کرده و بگذارید دم بکشد.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'سرخ کردن جداگانه سیب‌زمینی قبل از اضافه کردن به برنج مانع از خمیر شدن آن می‌شود.'
    ]
  },

  // 11. آلبالوپلو مجلسی با فیله مرغ حلزونی
  {
    id: 'albaloo-polo',
    title: 'آلبالوپلو مجلسی با فیله مرغ حلزونی زعفرانی',
    persianSubtitle: 'رنگ یاقوتی آلبالوی تازه با برنج عطری، خلال پسته و شربت آلبالو',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80',
    description: 'غذای شاهانه و تابستانی ایرانی با آلبالوی هسته‌گرفته شکرپز، فیله مرغ رول‌شده زعفرانی و خلال پسته سبز.',
    prepTimeMinutes: 35,
    cookTimeMinutes: 60,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 540,
    proteinGrams: 35,
    carbsGrams: 78,
    fatGrams: 11,
    dietaryTags: ['high_protein'],
    allergens: ['nuts'],
    originRegion: 'تهران و شیراز',
    ingredients: [
      { id: 'alp-1', name: 'برنج ایرانی اعلا', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'alp-2', name: 'آلبالو هسته‌گرفته تازه یا فریزری', amount: 350, unit: 'g', category: 'sweetener' },
      { id: 'alp-3', name: 'شکر سفید دانه‌ریز', amount: 120, unit: 'g', category: 'sweetener' },
      { id: 'alp-4', name: 'فیله مرغ زعفرانی رول‌شده', amount: 450, unit: 'g', category: 'protein' },
      { id: 'alp-5a', name: 'خلال پسته', amount: 20, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'alp-5b', name: 'خلال بادام', amount: 20, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت آلبالو با شکر', instruction: 'آلبالو را با شکر مخلوط کرده و بگذارید ۱۰ دقیقه بجوشد تا شربت بیندازد، سپس آلبالوها را صاف کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'آماده‌سازی فیله مرغ', instruction: 'فیله‌های مرغ را زعفرانی کرده، رول کنید و در تابه با کره تفت دهید تا مغزپخت و طلایی شوند.', durationMinutes: 15 },
      { stepNumber: 3, title: 'لایه‌چینی و دم', instruction: 'برنج را آبکش کرده و لایه لایه با آلبالو و خلال پسته دم بگذارید. هنگام کشیدن با مرغ حلزونی تزئین نمایید.', durationMinutes: 45, hasTimer: true }
    ],
    goldenTips: [
      'آلبالو را بیش از حد نجوشانید تا رنگ قرمز یاقوتی آن کدر و تیره نشود.'
    ]
  },

  // 12. خورش خلال بادام مجلسی کرمانشاهی
  {
    id: 'khoresht-khelal',
    title: 'خورش خلال بادام کرمانشاهی با زرشک سیاه و گوشت گوسفندی',
    persianSubtitle: 'شاهکار اصیل غرب ایران با عطر گلاب، هل، زعفران فراوان و روغن کرمانشاهی',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
    description: 'خورش بسیار لوکس و مجلسی کرمانشاه با خلال بادام سفید درختی، گوشت ریز قیمه‌ای گوسفندی، لیمو عمانی، زرشک سیاه کوهی و عطر روغن حیوانی اعلا.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 180,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 560,
    proteinGrams: 36,
    carbsGrams: 22,
    fatGrams: 38,
    dietaryTags: ['high_protein', 'keto'],
    allergens: ['nuts'],
    originRegion: 'کرمانشاه',
    ingredients: [
      { id: 'kh-1', name: 'گوشت ران گوسفندی خردشده قیمه‌ای ریز', amount: 450, unit: 'g', category: 'protein' },
      { id: 'kh-2', name: 'خلال بادام سفید درختی خیسانده در زعفران', amount: 200, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'kh-3', name: 'زرشک سیاه کوهی کرمانشاهی', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'kh-4', name: 'رب گوجه‌فرنگی تفت‌خورده در روغن حیوانی', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kh-5a', name: 'گلاب اصل', amount: 2, unit: 'tbsp', category: 'liquid' },
      { id: 'kh-5b', name: 'پودر هل', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'kh-5c', name: 'چوب دارچین', amount: 1, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'kh-5d', name: 'لیمو عمانی', amount: 2, unit: 'pcs', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'خیساندن خلال بادام در زعفران', instruction: 'خلال بادام را در گلاب و زعفران دم‌کرده بخیسانید تا نرم و خوش‌رنگ شود.', durationMinutes: 30 },
      { stepNumber: 2, title: 'پخت گوشت با ادویه', instruction: 'پیاز و گوشت را با زردچوبه و فلفل تفت دهید، رب گوجه را سرخ کرده و آب جوش بریزید تا ۲ ساعت ریزجوش بپزد.', durationMinutes: 120, hasTimer: true },
      { stepNumber: 3, title: 'افزودن خلال و جاافتادن', instruction: 'خلال بادام، چوب دارچین و لیمو عمانی را اضافه کنید. در ۱۵ دقیقه پایانی زرشک سیاه شسته‌شده و روغن حیوانی را بیفزایید.', durationMinutes: 30 }
    ],
    goldenTips: [
      'زرشک سیاه را نباید زیاد بجوشانید چون رنگ خورش را تیره می‌کند؛ در اواخر پخت اضافه کنید.'
    ]
  },

  // 13. مرصع‌پلو اشرافی مجلسی
  {
    id: 'morassa-polo',
    title: 'مرصع‌پلو اشرافی مجلسی با فیله مرغ زعفرانی',
    persianSubtitle: 'جواهرپلو ایرانی با خلال پسته، خلال بادام، خلال پوست پرتقال شیرین‌شده و زرشک',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    description: 'نگین سفره‌های اصیل ایرانی با برنج قدکشیده دودی، تکه‌های مرغ زعفرانی نرم، و تزیین هنرمندانه پنج رنگ با مغزیجات اعلا و خلال پرتقال معطر.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 60,
    baseServings: 6,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 580,
    proteinGrams: 38,
    carbsGrams: 64,
    fatGrams: 20,
    dietaryTags: ['high_protein'],
    allergens: ['nuts'],
    originRegion: 'قزوین، فارس و خراسان',
    ingredients: [
      { id: 'mp-1', name: 'برنج طارم هاشمی مرغوب', amount: 500, unit: 'g', category: 'flour_grain' },
      { id: 'mp-2', name: 'سینه و فیله مرغ خردشده نواری', amount: 500, unit: 'g', category: 'protein' },
      { id: 'mp-3', name: 'خلال پوست پرتقال تلخی‌گرفته با شکر', amount: 50, unit: 'g', category: 'sweetener' },
      { id: 'mp-4a', name: 'خلال پسته سبز', amount: 40, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'mp-4b', name: 'خلال بادام درختی', amount: 40, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'mp-5a', name: 'زرشک قرمز پفکی', amount: 40, unit: 'g', category: 'flour_grain' },
      { id: 'mp-5b', name: 'کشمش پلویی', amount: 40, unit: 'g', category: 'flour_grain' }
    ],
    steps: [
      { stepNumber: 1, title: 'شیرین کردن خلال پوست پرتقال', instruction: 'خلال پوست پرتقال را ۳ بار بجوشانید و آب آن را خالی کنید، سپس با ۲ قاشق شکر و گلاب تفت ملایم دهید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'تفت مرغ با زعفران', instruction: 'تکه‌های فیله را با پیازداغ، زعفران غلیظ، نمک و کره تفت داده تا طلایی و مغزپخت شوند.', durationMinutes: 20 },
      { stepNumber: 3, title: 'تزیین مجلل مرصع‌پلو', instruction: 'برنج را دم کنید. هنگام دیس کشیدن، روی برنج را به صورت راه‌راه یا خطوط هندسی با خلال پسته، خلال بادام، خلال پرتقال، زرشک و کشمش تزیین نمایید.', durationMinutes: 20 }
    ],
    goldenTips: [
      'خلال پسته را هرگز در روغن داغ تفت ندهید، فقط چند ثانیه با کمی گلاب گرم کنید تا رنگ سبز زمردی آن نسوزد.'
    ]
  },

  // 14. رشته‌پلو مجلسی با گوشت قلقلی
  {
    id: 'reshteh-polo',
    title: 'رشته‌پلو اصیل مجلسی با گوشت قلقلی زعفرانی و کشمش',
    persianSubtitle: 'غذای سنتی سر رشته کارها با رشته پلویی برشته، قیسی و دارچین',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    description: 'غذای عیدانه و سنتی ایرانی با رشته پلویی برشته‌شده، برنج زعفرانی، کوفته ریزه‌های لذیذ چرخ‌کرده، کشمش پلویی، قیسی و پیازداغ چیپسی.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 50,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 520,
    proteinGrams: 28,
    carbsGrams: 68,
    fatGrams: 16,
    dietaryTags: ['high_protein'],
    allergens: ['gluten'],
    originRegion: 'آذربایجان و سراسر ایران',
    ingredients: [
      { id: 'rp-1', name: 'برنج ایرانی اعلا', amount: 350, unit: 'g', category: 'flour_grain' },
      { id: 'rp-2', name: 'رشته پلویی بو داده و خردشده', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'rp-3', name: 'گوشت چرخ‌کرده برای قلقلی', amount: 300, unit: 'g', category: 'protein' },
      { id: 'rp-4', name: 'کشمش پلویی تفت‌داده با کره', amount: 80, unit: 'g', category: 'sweetener' },
      { id: 'rp-5a', name: 'پودر دارچین اعلا', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'rp-5b', name: 'زعفران دم‌کرده', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی کوفته قلقلی', instruction: 'گوشت را با پیاز رنده‌شده آب‌گرفته و ادویه ورز داده، به اندازه فندق گرد کرده و در کره سرخ کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'آبکش برنج و رشته', instruction: 'برنج را جوشانده، در ۱ دقیقه آخر آبکش کردن رشته پلویی را بیفزایید تا نرم شود و سریع آبکش کنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'لایه‌چینی با دارچین و دم', instruction: 'کف دیگ ته‌دیگ نان بگذارید، لایه لایه برنج و پودر دارچین ریخته و ۴۰ دقیقه دم بگذارید. با قلقلی و کشمش سرو کنید.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'رشته پلویی خیلی سریع در آب جوش له می‌شود؛ دقیقاً یک دقیقه قبل از آبکش کردن به قابلمه برنج اضافه کنید.'
    ]
  },

  // 15. چلوکباب برگ ممتاز گوسفندی
  {
    id: 'kebab-barg',
    title: 'چلوکباب برگ ممتاز گوسفندی با برنج زعفرانی و کره محلی',
    persianSubtitle: 'گوشت راسته گوسفندی لطیف بیات‌شده با مرینیت پیاز و زعفران',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    description: 'کباب برگ شاهانه ایرانی تهیه شده از بهترین راسته گوسفندی کاردی با ضربات پشت کارد، آب پیاز، زعفران دم‌کرده، برنج دم‌کشیده ایرانی و سماق تازه.',
    prepTimeMinutes: 35,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 590,
    proteinGrams: 48,
    carbsGrams: 42,
    fatGrams: 24,
    dietaryTags: ['high_protein'],
    allergens: ['lactose'],
    originRegion: 'تهران و تبریز',
    ingredients: [
      { id: 'kb-1', name: 'راسته یا فیله گوسفندی تازه', amount: 400, unit: 'g', category: 'protein' },
      { id: 'kb-2', name: 'آب پیاز سفید صاف‌شده بدون تفاله', amount: 100, unit: 'ml', category: 'vegetable' },
      { id: 'kb-3a', name: 'زعفران دم‌کرده غلیظ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kb-3b', name: 'کره محلی', amount: 25, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'kb-4a', name: 'گوجه‌فرنگی کبابی', amount: 4, unit: 'pcs', category: 'vegetable' },
      { id: 'kb-4b', name: 'فلفل سبز کبابی', amount: 4, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'کارد زدن گوشت (کاردکشی)', instruction: 'راسته را روی تخته پهن کرده و با پشت کارد ضربات متوالی بزنید تا بافت فیبرها باز و پهن شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'مرینیت گوشت', instruction: 'گوشت را در آب پیاز و فلفل سیاه تازه به مدت حداقل ۱۲ ساعت بخوابانید تا کاملاً بیات و ترد شود.', durationMinutes: 20 },
      { stepNumber: 3, title: 'سیخ‌گیری و کباب روی زغال', instruction: 'گوشت را به سیخ پهن کباب برگ کشیده و روی زغال ملایم چند دقیقه هر طرف کباب کنید، در پایان کره و زعفران بمالید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'نمک را حتماً در آخرین ثانیه‌های کباب کردن بپاشید؛ نمک زدن زودهنگام آب گوشت را بیرون کشیده و کباب را سفت می‌کند.'
    ]
  }
];
