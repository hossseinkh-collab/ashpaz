import { Recipe } from '../types';

export const BREAKFAST_RECIPES: Recipe[] = [
  // 1. نان، پنیر لیقوان و گردو با خیار، گوجه و چای شیرین
  {
    id: 'noon-panir-gerdoo',
    title: 'صبحانه اصیل نان، پنیر لیقوان و گردو با خیار، گوجه و چای شیرین',
    persianSubtitle: 'صبحانه سنتی پرطرفدار ایرانی با پنیر گوسفندی اعلا، سبزی خوردن و چای دارچینی',
    canonical_name: 'نان پنیر گردو',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    description: 'نوستالژیک‌ترین و اصیل‌ترین سفره صبحانه ایرانی که از ترکیب نان سنگک برشته داغ، پنir لیقوان گوسفندی سوراخ‌دار و شور، مغز گردوی تازه، خیار و گوجه خردشده همراه با استکان چای تازه‌دم شیرین شده با نبات یا شکر تشکیل شده است.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'ساده و فوری',
    caloriesPerServing: 320,
    proteinGrams: 14,
    carbsGrams: 36,
    fatGrams: 16,
    fiberGrams: 4,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'nuts'],
    originRegion: 'آذربایجان شرقی (تبریز / لیقوان) و سراسر ایران',
    originProvince: 'آذربایجان شرقی',
    ingredients: [
      { id: 'b1-1', name: 'نان سنگک یا بربری کنجدی داغ', amount: 4, unit: 'pcs', unitWeightInGrams: 60, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b1-2', name: 'پنیر لیقوان اصیل تبریز', amount: 80, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b1-3', name: 'مغز گردوی تازه تویسرکان', amount: 4, unit: 'pcs', unitWeightInGrams: 8, category: 'protein', allergens: ['nuts'] },
      { id: 'b1-4', name: 'خیار بوته‌ای قلمی', amount: 2, unit: 'pcs', unitWeightInGrams: 80, category: 'vegetable' },
      { id: 'b1-5', name: 'گوجه‌فرنگی رسیده', amount: 2, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'b1-6', name: 'سبزی خوردن تازه (نعنا، ترخان، ریحان)', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'b1-7', name: 'چای تازه‌دم لاهیجان با هل و دارچین', amount: 2, unit: 'cup', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'خرد کردن خیار و گوجه', instruction: 'خیارهای قلمی و گوجه‌های رسیده را شسته و به شکل ورقه‌ای یا نگینی خرد کنید. در صورت تمایل کمی نمک و نعنای خشک روی آن‌ها بپاشید.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 2, title: 'آماده‌سازی نان و چیدمان سفره', instruction: 'نان سنگک تازه را برش زده و پنیر لیقوان و مغز گردوهای نصف‌شده را در کنار بشقاب سبزی خوردن معطر بچینید.', durationMinutes: 2, hasTimer: false },
      { stepNumber: 3, title: 'سرو چای گرم', instruction: 'چای سیاه معطر را در استکان‌های کمرباریک ریخته و همراه با لقمه‌های دلچسب نان و پنیر و گردو نوش جان کنید.', durationMinutes: 1, hasTimer: false }
    ],
    goldenTips: [
      'خیساندن چند دقیقه‌ای مغز گردو در آب ولرم یا آب‌نمک رقیق طعم تلخی پوست آن را گرفته و هضم آن را بسیار سبک‌تر می‌کند.',
      'طبع سرد پنیر با گرمی گردو، نعنا و چای هل‌دار به بهترین شکل ممکن تعدیل و متعادل می‌شود.'
    ]
  },

  // 2. نان، کره سنتی و انواع مربا
  {
    id: 'noon-kareh-morabba',
    title: 'صبحانه شاهانه نان، کره سنتی و انواع مربای خانگی',
    persianSubtitle: 'ترکیب کره حیوانی لذیذ با مربای آلبالو، هویج، گل محمدی و به با نان سنگک',
    canonical_name: 'نان کره مربا',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&auto=format&fit=crop&q=80',
    description: 'یکی از سنتی‌ترین گزینه‌های صبحانه ایرانی که عطر خوش کره محلی ذوب‌شده روی تکه‌های نان سنگک داغ، با شیرینی و طعم نوستالژیک مرباهای خانگی آلبالوی ملس، هویج زعفرانی، گل سرخ کاشان و به گردویی تکمیل می‌شود.',
    prepTimeMinutes: 3,
    cookTimeMinutes: 0,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'بسیار آسان',
    caloriesPerServing: 360,
    proteinGrams: 6,
    carbsGrams: 52,
    fatGrams: 16,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose'],
    originRegion: 'سراسر ایران (آذربایجان، اصفهان، کاشان)',
    ingredients: [
      { id: 'b2-1', name: 'نان سنگک یا تافتون داغ', amount: 4, unit: 'pcs', unitWeightInGrams: 60, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b2-2', name: 'کره پاستوریزه یا محلی تازه', amount: 40, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b2-3', name: 'مربای آلبالو خانگی ملس', amount: 2, unit: 'tbsp', category: 'sweetener' },
      { id: 'b2-4', name: 'مربای هویج زعفرانی معطر', amount: 2, unit: 'tbsp', category: 'sweetener' },
      { id: 'b2-5', name: 'مربای گل سرخ تبریز یا کاشان', amount: 2, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی نان داغ', instruction: 'نان سنگک یا بربری را در فر یا تابه تست کنید تا کاملاً داغ و ترد شود تا کره روی آن به آرامی نرم و ذوب شود.', durationMinutes: 2, hasTimer: true },
      { stepNumber: 2, title: 'سرو مرباها', instruction: 'مرباها را در پیاله‌های سفالی زیبا ریخته و کره خنک را کنار نان گرم و یک لیوان شیر یا چای خوش‌عطر میل کنید.', durationMinutes: 1, hasTimer: false }
    ],
    goldenTips: [
      'کره حیوانی را حدود ۱۰ دقیقه قبل از سرو از یخچال خارج کنید تا بافت کرمی و پخش‌پذیری مطلوبی داشته باشد.',
      'افزودن چند قطره گلاب به مربای هویج یا مربای به، عطر سفره صبحانه را دوچندان می‌کند.'
    ]
  },

  // 3. املت گوجه‌فرنگی قهوه‌خانه‌ای
  {
    id: 'omelette-ghahveh-khanehi',
    title: 'املت گوجه‌فرنگی قهوه‌خانه‌ای نوستالژیک ربی و تازه',
    persianSubtitle: 'املت بازاری اصیل با گوجه پوره، رب تفت‌خورده، فلفل سیاه و روغن حیوانی',
    canonical_name: 'املت قهوه خانه‌ای',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین املت ایرانی که با گوجه‌های رنده‌شده تفت‌خورده، رب گوجه‌فرنگی سرخ‌شده در کره یا روغن حیوانی، تخم‌مرغ‌های نیم‌بند و فلفل سیاه فراوان تهیه شده و با نان بربری داغ و پیاز سفید سرو می‌شود.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان و بازاری',
    caloriesPerServing: 280,
    proteinGrams: 15,
    carbsGrams: 10,
    fatGrams: 20,
    fiberGrams: 3,
    dietaryTags: ['vegetarian', 'high_protein'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'تهران و سراسر قهوه‌خانه‌های سنتی ایران',
    ingredients: [
      { id: 'b3-1', name: 'گوجه‌فرنگی رسیده قرمز رنده‌شده', amount: 4, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' },
      { id: 'b3-2', name: 'رب گوجه‌فرنگی غلیظ', amount: 1.5, unit: 'tbsp', category: 'vegetable' },
      { id: 'b3-3', name: 'تخم‌مرغ تازه', amount: 4, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b3-4', name: 'کره یا روغن حیوانی اعلا', amount: 2, unit: 'tbsp', category: 'oil_fat' },
      { id: 'b3-5a', name: 'نمک تصفیه‌شده', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b3-5b', name: 'فلفل سیاه تازه سابیده‌شده', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'کشیدن آب گوجه‌فرنگی', instruction: 'گوجه‌های رنده‌شده را در تابه بدون روغن بریزید و با حرارت متوسط تفت دهید تا آب اضافی آن‌ها کاملاً تبخیر شود.', durationMinutes: 6, hasTimer: true },
      { stepNumber: 2, title: 'تفت دادن رب در روغن', instruction: 'کره یا روغن را به تابه اضافه کنید. رب گوجه‌فرنگی را به مدت ۲ دقیقه خوب در روغن تفت دهید تا رنگ آن کاملاً باز و براق شود.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 3, title: 'افزودن تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را روی مایه بشکنید. ابتدا سفیده را به آرامی با لایه زیرین ترکیب کنید و اجازه دهید خودش را بگیرد، سپس زرده‌ها را باز کرده و با شعله ملایم به غلظت دلخواه برسانید.', durationMinutes: 4, hasTimer: true }
    ],
    goldenTips: [
      'راز طعم قهوه‌خانه‌ای در تفت دادن کافی رب در روغن داغ و هم نزدن بیش از حد تخم‌مرغ‌هاست تا تکه‌های سفیده مشخص باشد.',
      'سرو این املت همراه با پیاز سفید تازه چهارقاچ و ترشی فلفل لذت آن را کامل می‌کند.'
    ]
  },

  // 4. املت شاپوری رشتی
  {
    id: 'omelette-shapouri',
    title: 'املت شاپوری اصیل رشتی با باقالی پخته و سیر محلی',
    persianSubtitle: 'املت سنتی مشهور گیلان با ترکیب خوراک باقلا، رب گوجه تفت‌خورده و تخم‌مرغ',
    canonical_name: 'املت شاپوری',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&auto=format&fit=crop&q=80',
    description: 'یکی از شاهکارهای صبحانه استان گیلان که در میدان شهرداری رشت متولد شد؛ ترکیبی لذیذ از باقالی پخته‌شده نرم یا خوراک لوبیاچیتی، سس رب گوجه داغ سیردار و تخم‌مرغ نیمرو با فلفل سیاه فراوان.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان و محلی',
    caloriesPerServing: 340,
    proteinGrams: 18,
    carbsGrams: 28,
    fatGrams: 17,
    fiberGrams: 6,
    dietaryTags: ['high_protein', 'vegetarian'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'رشت، استان گیلان',
    originProvince: 'گیلان',
    ingredients: [
      { id: 'b4-1', name: 'باقالی کشاورزی یا لوبیاچیتی پخته نرم', amount: 150, unit: 'g', category: 'protein' },
      { id: 'b4-2', name: 'رب گوجه‌فرنگی اعلا', amount: 2, unit: 'tbsp', category: 'vegetable' },
      { id: 'b4-3', name: 'سیر رنده‌شده محلی', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'b4-4', name: 'تخم‌مرغ', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b4-5', name: 'کره محلی یا روغن', amount: 25, unit: 'g', category: 'oil_fat' },
      { id: 'b4-6', name: 'آب نارنج تازه و فلفل سیاه', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت دادن سیر و رب', instruction: 'سیر رنده‌شده را همراه با رب گوجه در کره داغ تفت دهید تا عطر سیر بلند شده و خامی رب گرفته شود.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 2, title: 'افزودن باقلا و ادویه‌ها', instruction: 'باقالی‌های پخته نرم را اضافه کرده و با پشت قاشق کمی له کنید تا به سس رب غلیظ آغشته شوند.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 3, title: 'اضافه کردن تخم‌مرغ‌ها و آب نارنج', instruction: 'تخم‌مرغ‌ها را روی مواد بشکنید و فلفل سیاه و نمک بپاشید. اجازه دهید سفیده‌ها ببندند، سپس چند قطره آب نارنج تازه اضافه کرده و با نان بربری داغ سرو کنید.', durationMinutes: 4, hasTimer: true }
    ],
    goldenTips: [
      'چاشنی آب نارنج تازه در آخرین لحظه پخت، امضای اصلی طعم اصیل املت شاپوری رشت است.'
    ]
  },

  // 5. املت خرما و گردو
  {
    id: 'omelette-khorma-gerdoo',
    title: 'املت مقوی خرما و گردو سنتی (صبحانه پرانرژی زمستانی)',
    persianSubtitle: 'غذای گرم و انرژی‌بخش تبریزی و جنوبی با خرمای کاراملی، مغز گردو و دارچین',
    canonical_name: 'املت خرما و گردو',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=800&auto=format&fit=crop&q=80',
    description: 'صبحانه‌ای سنتی، گرم و بی‌نهایت مقوی که در شهرهای آذربایجان و مناطق جنوبی ایران در فصل سرما طبخ می‌شود؛ خرمای هسته‌گرفته در کره حیوانی تفت خورده و با گردو، تخم‌مرغ و عطر دارچین تکمیل می‌گردد.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'ساده و فوری',
    caloriesPerServing: 380,
    proteinGrams: 14,
    carbsGrams: 42,
    fatGrams: 19,
    fiberGrams: 5,
    dietaryTags: ['vegetarian', 'high_protein'],
    isVegetarian: true,
    allergens: ['egg', 'nuts'],
    originRegion: 'تبریز (آذربایجان شرقی) و خوزستان',
    originProvince: 'آذربایجان شرقی',
    ingredients: [
      { id: 'b5-1', name: 'خرمای پیارم یا کبکاب هسته‌گرفته', amount: 10, unit: 'pcs', category: 'sweetener' },
      { id: 'b5-2', name: 'تخم‌مرغ', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b5-3', name: 'مغز گردوی خردشده دندان‌گیر', amount: 40, unit: 'g', category: 'protein', allergens: ['nuts'] },
      { id: 'b5-4', name: 'کره حیوانی یا روغن زرد', amount: 25, unit: 'g', category: 'oil_fat' },
      { id: 'b5-5a', name: 'پودر دارچین', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b5-5b', name: 'پودر هل سبز آسیاب‌شده', amount: 0.25, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت دادن خرما و گردو', instruction: 'کره را در تابه آب کنید. خرمای خردشده و گردوها را اضافه کرده و با حرارت ملایم تفت دهید تا خرما نرم و کمی کاراملی شود.', durationMinutes: 4, hasTimer: true },
      { stepNumber: 2, title: 'زدن تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را در کاسه‌ای با دارچین و کمی نمک با چنگال بزنید تا از لختگی درآید.', durationMinutes: 1, hasTimer: false },
      { stepNumber: 3, title: 'پخت نهایی', instruction: 'تخم‌مرغ‌های زده‌شده را روی مخلوط خرما و گردو بریزید و با درب بسته ۲ دقیقه فرصت دهید تا مغزپخت و لطیف شود.', durationMinutes: 3, hasTimer: true }
    ],
    goldenTips: [
      'تفت دادن خرمای با پوست نازک در کره، قند طبیعی آن را آزاد کرده و بافت خامه‌ای فوق‌العاده‌ای به املت می‌دهد.'
    ]
  },

  // 6. نرگسی اسفناج صبحانه
  {
    id: 'nargesi-esfenaj',
    title: 'نرگسی اسفناج اصیل صبحانه با پیازداغ و تخم‌مرغ عسلی',
    persianSubtitle: 'خوراک گیاهی مقوی سرشار از آهن و پروتئین با تخم‌مرغ‌های چشم‌نواز مانند گل نرگس',
    canonical_name: 'نرگسی اسفناج',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=800&auto=format&fit=crop&q=80',
    description: 'غذای گیاهی اصیل و چشم‌نواز با برگ‌های سبز اسفناج تازه تفت‌خورده در پیازداغ و سیر، که با نشستن زرده‌های طلایی تخم‌مرغ بر روی برگ‌های سبز شبیه به گل نرگس جلوه می‌کند.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان و رژیمی',
    caloriesPerServing: 240,
    proteinGrams: 15,
    carbsGrams: 8,
    fatGrams: 16,
    fiberGrams: 4,
    dietaryTags: ['vegetarian', 'low_calorie', 'high_protein'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'اصفهان و شیراز',
    originProvince: 'اصفهان',
    ingredients: [
      { id: 'b6-1', name: 'اسفناج تازه شسته‌شده و خردشده', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'b6-2', name: 'تخم‌مرغ', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b6-3', name: 'پیازداغ عسلی و چیپسی', amount: 2, unit: 'tbsp', category: 'vegetable' },
      { id: 'b6-4', name: 'سیر رنده‌شده', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'b6-5', name: 'روغن زیتون یا کره', amount: 1.5, unit: 'tbsp', category: 'oil_fat' },
      { id: 'b6-6a', name: 'زردچوبه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b6-6b', name: 'نمک', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b6-6c', name: 'فلفل سیاه', amount: 0.25, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پختن اسفناج', instruction: 'اسفناج را در تابه بدون آب روی حرارت بگذارید تا پلاسیده شده و آب آن تبخیر شود.', durationMinutes: 6, hasTimer: true },
      { stepNumber: 2, title: 'تفت با پیازداغ و سیر', instruction: 'روغن، پیازداغ، سیر و زردچوبه را اضافه کرده و اسفناج را ۲ دقیقه تفت دهید.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 3, title: 'شکستن تخم‌مرغ‌ها', instruction: 'در میان اسفناج حفره‌هایی باز کرده و تخم‌مرغ‌ها را درسته بشکنید. درب تابه را بگذارید تا سفیده‌ها پخته اما زرده‌ها نیم‌بند و عسلی بمانند.', durationMinutes: 4, hasTimer: true }
    ],
    goldenTips: [
      'اسفناج را بیش از حد سرخ نکنید تا رنگ سبز درخشان و املاح معدنی آن حفظ شود.'
    ]
  },

  // 7. نیمرو زعفرانی عسلی با روغن زرد
  {
    id: 'nimroo-zaferani',
    title: 'نیمرو زعفرانی عسلی مجلسی با روغن زرد کرمانشاهی',
    persianSubtitle: 'نیمرو با لبه‌های برشته و طلایی، زرده عسلی و عطر زعفران سابیده‌شده قائنات',
    canonical_name: 'نیمرو زعفرانی',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=800&auto=format&fit=crop&q=80',
    description: 'ساده‌ترین و در عین حال شاهانه‌ترین صبحانه گرم؛ تخم‌مرغ‌های محلی سرخ‌شده در روغن حیوانی کرمانشاهی داغ با کناره‌های ترد و طلایی و لایه‌ای از زعفران دم‌کرده روی زرده‌های روان و لذیذ.',
    prepTimeMinutes: 3,
    cookTimeMinutes: 5,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'فوری (۵ دقیقه)',
    caloriesPerServing: 230,
    proteinGrams: 13,
    carbsGrams: 1,
    fatGrams: 19,
    dietaryTags: ['keto', 'high_protein', 'vegetarian'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'کرمانشاه و خراسان',
    originProvince: 'کرمانشاه',
    ingredients: [
      { id: 'b7-1', name: 'تخم‌مرغ زرده‌طلایی تازه', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b7-2', name: 'روغن حیوانی اعلای کرمانشاهی', amount: 20, unit: 'g', category: 'oil_fat' },
      { id: 'b7-3', name: 'زعفران دم‌کرده غلیظ', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'b7-4', name: 'نمک دریا و فلفل سیاه نیم‌کوب', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'داغ کردن روغن', instruction: 'روغن حیوانی را در تابه داغ کنید تا کاملاً ذوب و گرم شود اما دود نکند.', durationMinutes: 1, hasTimer: false },
      { stepNumber: 2, title: 'شکستن تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را به آرامی در روغن بشکنید تا لبه‌های سفیده پف کرده و برشته شود.', durationMinutes: 2, hasTimer: true },
      { stepNumber: 3, title: 'افزودن زعفران', instruction: 'زعفران دم‌کرده را با قاشق روی سفیده و زرده بدهید و با نمک و فلفل سیاه از روی شعله بردارید.', durationMinutes: 1, hasTimer: false }
    ],
    goldenTips: [
      'روغن داغ را با قاشق روی سفیده بریزید تا بدون سفت شدن زرده، سفیده کاملاً ببندد.'
    ]
  },

  // 8. سرشیر محلی و عسل طبیعی سبلان
  {
    id: 'sarshir-asal-sabalan',
    title: 'سرشیر محلی تازه با عسل کوهستان سبلان و نان بربری داغ',
    persianSubtitle: 'صبحانه اصیل و لوکس آذربایجان و اردبیل با چربی طبیعی خامه و عسل موم‌دار',
    canonical_name: 'سرشیر و عسل',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
    description: 'معروف‌ترین صبحانه کوهستان‌های سرسبز سبلان و اردبیل؛ سرشیر گاومیش یا سرشیر پرچرب سنتی همراه با عسل خالص طبیعی و نان سنتی بربری کنجدی داغ.',
    prepTimeMinutes: 2,
    cookTimeMinutes: 0,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'بسیار آسان',
    caloriesPerServing: 390,
    proteinGrams: 5,
    carbsGrams: 48,
    fatGrams: 22,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['lactose', 'gluten'],
    originRegion: 'اردبیل و دامنه سبلان',
    originProvince: 'اردبیل',
    ingredients: [
      { id: 'b8-1', name: 'سرشیر تازه سنتی یا خامه غلیظ', amount: 80, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b8-2', name: 'عسل طبیعی کوهستان سبلان', amount: 3, unit: 'tbsp', category: 'sweetener' },
      { id: 'b8-3', name: 'نان بربری سنتی تازه کنجدی', amount: 3, unit: 'pcs', unitWeightInGrams: 70, category: 'flour_grain', allergens: ['gluten'] }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی نان بربری', instruction: 'نان بربری تازه و برشته را خرد کنید.', durationMinutes: 1, hasTimer: false },
      { stepNumber: 2, title: 'چیدمان سرشیر و عسل', instruction: 'سرشیر خنک را در ظرف ریخته و عسل روان را بر روی آن جاری کنید و بلافاصله با نان داغ میل نمایید.', durationMinutes: 1, hasTimer: false }
    ],
    goldenTips: [
      'تضاد دمای نان بربری داغ و سرشیر خنک، حس طعم خامه طبیعی را شگفت‌انگیز می‌کند.'
    ]
  },

  // 9. ارده و شیره سنتی
  {
    id: 'ardeh-shireh-sonnati',
    title: 'ارده سنتی اعلا با شیره انگور ملایر و کنجد برشته',
    persianSubtitle: 'صبحانه فوق‌العاده گرم و مقوی سرشار از کلسیم، آهن و انرژی طبیعی پایدار',
    canonical_name: 'ارده و شیره',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80',
    description: 'ترکیب اعجازانگیز ارده کنجد خالص با شیره انگور ملایر یا شیره خرما؛ منبع غنی از آهن، کلسیم و فسفر که بدون هیچ‌گونه شکر مصنوعی انرژی روز را به اوج می‌رساند.',
    prepTimeMinutes: 2,
    cookTimeMinutes: 0,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'بسیار آسان',
    caloriesPerServing: 350,
    proteinGrams: 9,
    carbsGrams: 42,
    fatGrams: 18,
    fiberGrams: 4,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['sesame', 'gluten'],
    originRegion: 'همدان (ملایر)، یزد و دزفول',
    originProvince: 'همدان',
    ingredients: [
      { id: 'b9-1', name: 'ارده کنجد خالص و مرغوب', amount: 4, unit: 'tbsp', category: 'oil_fat', allergens: ['sesame'] },
      { id: 'b9-2', name: 'شیره انگور طبیعی ملایر یا شیره خرما', amount: 3, unit: 'tbsp', category: 'sweetener' },
      { id: 'b9-3', name: 'نان سنگک تازه کنجدی', amount: 3, unit: 'pcs', unitWeightInGrams: 60, category: 'flour_grain', allergens: ['gluten'] }
    ],
    steps: [
      { stepNumber: 1, title: 'ترکیب ارده و شیره', instruction: 'ارده کنجد را در کاسه ریخته و شیره انگور را به نسبت ۲ به ۱ به آن افزوده و به شکل مارپیچی هم بزنید.', durationMinutes: 1, hasTimer: false },
      { stepNumber: 2, title: 'سرو با نان سنگک', instruction: 'با تکه‌های نان سنگک ترد و داغ لقمه گرفته و نوش جان فرمایید.', durationMinutes: 1, hasTimer: false }
    ],
    goldenTips: [
      'ارده و شیره را پیشاپیش مخلوط نکنید، بلکه موقع سرو ترکیب کنید تا بافت کرمی و شفاف آن حفظ شود.'
    ]
  },

  // 10. سوسیس تخم‌مرغ نوستالژیک بازاری
  {
    id: 'soosis-tokhm-morgh',
    title: 'سوسیس تخم‌مرغ نوستالژیک بازاری با پیازداغ و ادویه کاری',
    persianSubtitle: 'صبحانه پرطرفدار اغذیه‌فروشی‌های ایران با سوسیس برشته، رب و تخم‌مرغ',
    canonical_name: 'سوسیس تخم‌مرغ',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80',
    description: 'صبحانه خاطره‌انگیز بازاری با ورقه‌های سوسیس تفت‌خورده در پیازداغ و روغن داغ، با چاشنی رب گوجه‌فرنگی، فلفل سیاه و تخم‌مرغ‌های نیمرو با نان باگت یا سنگک.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان و فوری',
    caloriesPerServing: 390,
    proteinGrams: 20,
    carbsGrams: 12,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    isVegetarian: false,
    allergens: ['egg'],
    originRegion: 'تهران و اغذیه‌فروشی‌های بازارهای ایران',
    ingredients: [
      { id: 'b10-1', name: 'سوسیس کوکتل یا هات‌داگ ورقه‌شده', amount: 200, unit: 'g', category: 'protein' },
      { id: 'b10-2', name: 'تخم‌مرغ', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b10-3', name: 'پیاز نگینی تفت‌خورده', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'b10-4', name: 'رب گوجه‌فرنگی', amount: 1, unit: 'tbsp', category: 'vegetable' },
      { id: 'b10-5', name: 'کره یا روغن', amount: 2, unit: 'tbsp', category: 'oil_fat' },
      { id: 'b10-6', name: 'ادویه کاری، فلفل سیاه و آویشن', amount: 1, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن سوسیس و پیاز', instruction: 'پیاز را با کمی روغن تفت داده، سپس سوسیس‌های حلقه‌شده را اضافه کنید تا دو طرف آن‌ها برشته و طلایی شود.', durationMinutes: 5, hasTimer: true },
      { stepNumber: 2, title: 'افزودن رب و ادویه', instruction: 'رب گوجه‌فرنگی و ادویه کاری را به سوسیس‌ها اضافه کرده و یک دقیقه تفت دهید تا خوش‌رنگ شود.', durationMinutes: 2, hasTimer: true },
      { stepNumber: 3, title: 'پخت تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را روی سوسیس‌ها بشکنید، فلفل سیاه و آویشن بپاشید و اجازه دهید با حرارت ملایم پخته شوند.', durationMinutes: 3, hasTimer: true }
    ],
    goldenTips: [
      'برش‌های شیاردار روی ورقه‌های سوسیس باعث می‌شود روغن به داخل بافت نفوذ کرده و تردی بی‌نظیری پیدا کند.'
    ]
  },

  // 11. کله‌پاچه معطر خانگی
  {
    id: 'kaleh-pacheh-khanegi',
    title: 'کله‌پاچه لذیذ و معطر خانگی با زبان، مغز، بناگوش و لیموترش',
    persianSubtitle: 'صبحانه شاهانه و اصیل زمستانی طبخ‌شده با پیاز فراوان، دارچین و زعفران',
    canonical_name: 'کله‌پاچه',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1497888329096-51c27beff665?w=800&auto=format&fit=crop&q=80',
    description: 'کهن‌ترین و پرانرژی‌ترین صبحانه اصیل ایرانی که از پخت آرام چند ساعته کله و پاچه تازه گوسفندی با پیاز فراوان، سیر، چوب دارچین، زردچوبه و زعفران به دست آمده و با آب نارنج و نان سنگک میل می‌شود.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 300,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'زمان‌بر اما مجلسی',
    caloriesPerServing: 520,
    proteinGrams: 38,
    carbsGrams: 6,
    fatGrams: 36,
    dietaryTags: ['keto', 'high_protein'],
    isVegetarian: false,
    allergens: [],
    originRegion: 'تهران، تبریز و سراسر ایران',
    ingredients: [
      { id: 'b11-1', name: 'کله و پاچه گوسفندی تازه کاملاً پاک‌شده', amount: 1, unit: 'pcs', category: 'protein' },
      { id: 'b11-2', name: 'پیاز بزرگ چهارقاچ', amount: 3, unit: 'pcs', category: 'vegetable' },
      { id: 'b11-3', name: 'سیر حبه‌شده', amount: 5, unit: 'pcs', category: 'vegetable' },
      { id: 'b11-4', name: 'چوب دارچین و برگ بو', amount: 2, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'b11-5', name: 'زردچوبه، زنجبیل و فلفل سیاه', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'b11-6', name: 'لیموترش یا آب نارنج تازه برای سرو', amount: 2, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'جوشاندن اولیه و تخلیه کف', instruction: 'کله و پاچه شسته‌شده را در آب جوش قرار دهید، پس از ۱۰ دقیقه جوشیدن و کف کردن، آب آن را خالی کنید.', durationMinutes: 15, hasTimer: true },
      { stepNumber: 2, title: 'بار گذاشتن با ادویه‌ها', instruction: 'گوشت‌ها را با پیازهای چهارقاچ، سیر، چوب دارچین، برگ بو و زردچوبه در قابلمه با آب گرم روی شعله ملایم قرار دهید.', durationMinutes: 240, hasTimer: true },
      { stepNumber: 3, title: 'افزودن نمک و سرو', instruction: 'در نیم‌ساعت پایانی نمک و کمی زعفران اضافه کنید. آب کله‌پاچه را تیلیت کرده و همراه مغز، زبان و بناگوش با لیمو سرو نمایید.', durationMinutes: 30, hasTimer: true }
    ],
    goldenTips: [
      'نمک را حتماً در انتهای پخت اضافه کنید تا بافت گوشت بناگوش و پاچه سفت نشود.',
      'افزودن چوب دارچین و برگ بو بوی زهم کله‌پاچه را کاملاً از بین می‌برد.'
    ]
  },

  // 12. پنکیک کلاسیک کره‌ای صبحانه
  {
    id: 'pancake-classic-breakfast',
    title: 'پنکیک کلاسیک پفکی صبحانه با عسل، کره و توت‌فرنگی',
    persianSubtitle: 'پنکیک‌های پفکی و پنبه‌ای محبوب کافی‌شاپی با بافت ابریشمی و طلایی',
    canonical_name: 'پنکیک کلاسیک',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین صبحانه بین‌المللی شناخته‌شده در ایران با بافت اسفنجی سبک، رویه طلایی خوش‌رنگ که همراه با تکه‌ای کره آب‌شده، عسل یا نوتلا و میوه‌های تازه سرو می‌شود.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    baseServings: 3,
    difficulty: 'easy',
    difficultyFa: 'آسان و پرطرفدار',
    caloriesPerServing: 260,
    proteinGrams: 8,
    carbsGrams: 38,
    fatGrams: 9,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg'],
    ingredients: [
      { id: 'b12-1', name: 'آرد قنادی الک‌شده', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b12-2', name: 'شیر ولرم', amount: 1, unit: 'cup', category: 'dairy', allergens: ['lactose'] },
      { id: 'b12-3', name: 'تخم‌مرغ', amount: 1, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b12-4', name: 'کره ذوب‌شده', amount: 25, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b12-5a', name: 'بکینگ‌پودر', amount: 1, unit: 'tsp', category: 'flour_grain' },
      { id: 'b12-5b', name: 'وانیل خالص', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b12-6', name: 'شکر', amount: 2, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه پنکیک', instruction: 'تخم‌مرغ، شکر و وانیل را با همزن دستی بزنید. شیر و کره ذوب‌شده را اضافه کرده، سپس آرد و بکینگ‌پودر الک‌شده را به آرامی مخلوط کنید.', durationMinutes: 5, hasTimer: true },
      { stepNumber: 2, title: 'پخت در تابه نچسب', instruction: 'یک ملاقه کوچک از مایه را در تابه داغ بدون روغن بریزید. وقتی روی سطح پنکیک حباب زد (حدود ۲ دقیقه)، آن را برگردانید.', durationMinutes: 4, hasTimer: true },
      { stepNumber: 3, title: 'برشته کردن طرف دوم و سرو', instruction: 'طرف دیگر را نیز به مدت ۱ دقیقه تفت دهید تا طلایی شود، سپس روی هم چیده و با عسل و توت‌فرنگی تزیین کنید.', durationMinutes: 2, hasTimer: true }
    ],
    goldenTips: [
      'مایه پنکیک را بیش از حد هم نزنید؛ وجود چند گلوله ریز آرد باعث پف بیشتر پنکیک می‌شود.'
    ]
  },

  // 13. وافل بلژیکی ترد صبحانه
  {
    id: 'waffle-belgian-crispy',
    title: 'وافل بلژیکی ترد و طلایی با توت‌فرنگی و شکلات صبحانه',
    persianSubtitle: 'وافل لانه‌زنبوری با بافت بیرونی کرانچی و مغز پنبه‌ای و لطیف',
    canonical_name: 'وافل بلژیکی',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80',
    description: 'وافل‌های چهارگوش لانه‌زنبوری که با دستگاه وافل‌ساز یا قالب فر پخته می‌شوند و به خاطر کرانچی بودن پوسته و نرمی بافت داخلی با خامه قنادی، نوتلا و اسلایس‌های توت‌فرنگی انتخابی بی‌رقیب هستند.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان و شیک',
    caloriesPerServing: 310,
    proteinGrams: 8,
    carbsGrams: 42,
    fatGrams: 12,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg'],
    ingredients: [
      { id: 'b13-1', name: 'آرد سفید قنادی', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b13-2', name: 'شیر', amount: 180, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'b13-3', name: 'تخم‌مرغ (سفیده و زرده جدا)', amount: 2, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b13-4', name: 'کره ذوب‌شده', amount: 30, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b13-5', name: 'شکر، بکینگ‌پودر و وانیل', amount: 1, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'فرم دادن سفیده', instruction: 'سفیده‌های تخم‌مرغ را جداگانه هم بزنید تا کاملاً پفکی و سفت شوند.', durationMinutes: 4, hasTimer: true },
      { stepNumber: 2, title: 'مخلوط کردن مواد', instruction: 'زرده، شیر، کره و آرد را مخلوط کرده و سپس سفیده پفکی را با لیسک فولد کنید.', durationMinutes: 3, hasTimer: false },
      { stepNumber: 3, title: 'پخت در وافل‌ساز', instruction: 'مایه را در دستگاه وافل‌ساز داغ و چرب‌شده ریخته و ۴ تا ۵ دقیقه بپزید تا ترد و برشته شود.', durationMinutes: 5, hasTimer: true }
    ],
    goldenTips: [
      'جدا کردن سفیده و هم زدن آن تا مرحله فوم سفت، راز اصلی تردی بیرونی و سبکی درونی وافل است.'
    ]
  },

  // 14. فرنچ تست (تست فرانسوی)
  {
    id: 'french-toast-cinnamon',
    title: 'فرنچ تست فرانسوی طلایی با دارچین، شیر و وانیل',
    persianSubtitle: 'نان تست کاراملی آغشته به مایه تخم‌مرغی و شیرین با عطر وانیل و کره',
    canonical_name: 'فرنچ تست',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80',
    description: 'صبحانه جذاب اروپایی که با غوطه‌ور کردن نان‌های تست ضخیم بریوش در مایه شیر، تخم‌مرغ، دارچین و وانیل، و تفت دادن در کره حیوانی تهیه شده و عطر اشتهابرانگیزی ایجاد می‌کند.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'فوری و خوش‌عطر',
    caloriesPerServing: 270,
    proteinGrams: 10,
    carbsGrams: 32,
    fatGrams: 11,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg'],
    ingredients: [
      { id: 'b14-1', name: 'نان تست سبوس‌دار یا تست فرانسوی', amount: 4, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b14-2', name: 'تخم‌مرغ', amount: 2, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b14-3', name: 'شیر ولرم', amount: 100, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'b14-4', name: 'کره برای سرخ کردن', amount: 20, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b14-5', name: 'پودر دارچین، وانیل و شکر قهوه‌ای', amount: 1, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه تخم‌مرغی', instruction: 'تخم‌مرغ، شیر، دارچین، شکر و وانیل را در بشقابی گود با چنگال هم بزنید.', durationMinutes: 2, hasTimer: false },
      { stepNumber: 2, title: 'آغشته کردن نان‌ها', instruction: 'نان‌های تست را ۱۰ ثانیه در مایه قرار دهید تا مایع را به خود جذب کنند.', durationMinutes: 1, hasTimer: false },
      { stepNumber: 3, title: 'تفت دادن در کره', instruction: 'کره را در تابه آب کرده و هر طرف نان‌ها را ۲ تا ۳ دقیقه روی حرارت ملایم برشته و طلایی کنید.', durationMinutes: 5, hasTimer: true }
    ],
    goldenTips: [
      'استفاده از نان تست بیات‌تر باعث می‌شود نان خمیر نشود و مایه دارچینی را بهتر در خود نگه دارد.'
    ]
  },

  // 15. تست آووکادو با تخم‌مرغ پوچد عسلی
  {
    id: 'avocado-poached-egg-toast',
    title: 'تست آووکادو با تخم‌مرغ پوچد عسلی و کنجد سیاه',
    persianSubtitle: 'صبحانه مدرن و سالم کافی‌شاپی سرشار از امگا ۳، چربی‌های مفید و پروتئین',
    canonical_name: 'تست آووکادو و تخم‌مرغ',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80',
    description: 'یکی از شیک‌ترین و مغذی‌ترین گزینه‌های صبحانه سالم در کافه‌های امروزی ایران؛ پوره آووکادوی کرمی با لیموترش و فلفل روی نان چاودار تست‌شده، همراه با تخم‌مرغ پوچد عسلی آب‌پز.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 5,
    baseServings: 1,
    difficulty: 'medium',
    difficultyFa: 'متوسط و رژیمی',
    caloriesPerServing: 290,
    proteinGrams: 14,
    carbsGrams: 22,
    fatGrams: 17,
    fiberGrams: 6,
    dietaryTags: ['vegetarian', 'high_protein', 'low_calorie'],
    isVegetarian: true,
    allergens: ['gluten', 'egg', 'sesame'],
    ingredients: [
      { id: 'b15-1', name: 'نان تست جو یا هفت‌غله برشته', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b15-2', name: 'آووکادو رسیده نرم', amount: 0.5, unit: 'pcs', category: 'vegetable' },
      { id: 'b15-3', name: 'تخم‌مرغ تازه', amount: 1, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b15-4', name: 'آبلیمو تازه و روغن زیتون فرابکر', amount: 1, unit: 'tsp', category: 'vegetable' },
      { id: 'b15-5', name: 'پرک فلفل قرمز و کنجد سیاه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning', allergens: ['sesame'] }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه پوره آووکادو', instruction: 'گوشت آووکادو را با چنگال له کرده و با آبلیمو، روغن زیتون، نمک و فلفل سیاه مخلوط کنید.', durationMinutes: 2, hasTimer: false },
      { stepNumber: 2, title: 'پخت تخم‌مرغ پوچد', instruction: 'در قابلمه آب جوش ملایم با ۱ قاشق سرکه گرداب ایجاد کنید و تخم‌مرغ را ۳ دقیقه بپزید تا سفیده ببندد و زرده روان بماند.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 3, title: 'مونتاژ روی تست', instruction: 'پوره آووکادو را روی نان تست برشته مالیده، تخم‌مرغ پوچد را رویش بگذارید و با فلفل قرمز و کنجد تزیین نمایید.', durationMinutes: 1, hasTimer: false }
    ],
    goldenTips: [
      'یک قاشق سرکه سفید در آب جوش پوچد، سفیده تخم‌مرغ را کاملاً جمع کرده و شکل توپی زیبایی به آن می‌دهد.'
    ]
  },

  // 16. املت فرانسوی رول‌شده با پنیر چدار
  {
    id: 'omelette-french-cheddar',
    title: 'املت فرانسوی رول‌شده با پنیر چدار و جعفری تازه',
    persianSubtitle: 'املت ابریشمی کلاسیک بین‌المللی با بافت نرم داخلی و پنیر کشدار ذوب‌شده',
    canonical_name: 'املت فرانسوی',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=80',
    description: 'املت تکنیکی و شیک فرانسوی بدون ذره‌ای تغییر رنگ و برشتگی، با بافتی لطیف و خامه مانند و رول‌شده که مغز آن با پنیر چدار آب‌شده و جعفری ساطوری پر می‌شود.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 6,
    baseServings: 2,
    difficulty: 'medium',
    difficultyFa: 'تکنیکی و لطیف',
    caloriesPerServing: 310,
    proteinGrams: 19,
    carbsGrams: 2,
    fatGrams: 25,
    dietaryTags: ['keto', 'high_protein', 'vegetarian'],
    isVegetarian: true,
    allergens: ['egg', 'lactose'],
    ingredients: [
      { id: 'b16-1', name: 'تخم‌مرغ تازه', amount: 4, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b16-2', name: 'کره پاستوریزه', amount: 25, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b16-3', name: 'پنیر چدار یا گودا رنده‌شده', amount: 50, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b16-4', name: 'جعفری تازه ساطوری‌شده', amount: 1, unit: 'tbsp', category: 'vegetable' },
      { id: 'b16-5a', name: 'نمک', amount: 0.25, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b16-5b', name: 'فلفل سفید', amount: 0.25, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن یکدست تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را با نمک و فلفل خوب هم بزنید تا کاملاً روان و یکدست شوند.', durationMinutes: 2, hasTimer: false },
      { stepNumber: 2, title: 'پخت سریع در تابه نچسب', instruction: 'کره را آب کرده، تخم‌مرغ‌ها را ریخته و با لیسک سریع هم بزنید تا دانه‌های ریز ایجاد شود و زیر آن ببندد.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 3, title: 'پنیر و رول کردن', instruction: 'پنیر چدار را وسط مایه ریخته و املت را با لیسک به سمت جلو رول کنید و در بشقاب برگردانید.', durationMinutes: 2, hasTimer: false }
    ],
    goldenTips: [
      'حرارت تابه نباید خیلی زیاد باشد تا املت به هیچ عنوان قهوه‌ای نشود و بافت خامه مانند پیدا کند.'
    ]
  },

  // 17. صبحانه کامل انگلیسی
  {
    id: 'english-breakfast-platter',
    title: 'دیس صبحانه کامل انگلیسی (English Breakfast Platter)',
    persianSubtitle: 'بشقاب پرملات کافه‌ای با نیمرو، خوراک لوبیا گرم، سوسیس، قارچ و گوجه کبابی',
    canonical_name: 'صبحانه انگلیسی',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&auto=format&fit=crop&q=80',
    description: 'کامل‌ترین و مفصل‌ترین بشقاب صبحانه بین‌المللی که در کافه‌های بزرگ تهران و شهرهای ایران سرو می‌شود؛ شامل نیمرو دو تخم‌مرغه، خوراک لوبیاچیتی سس‌دار، سوسیس گریل، قارچ کره‌ای، گوجه کبابی و نان تست برشته.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'medium',
    difficultyFa: 'متوسط و مفصل',
    caloriesPerServing: 480,
    proteinGrams: 28,
    carbsGrams: 45,
    fatGrams: 22,
    dietaryTags: ['high_protein'],
    isVegetarian: false,
    allergens: ['gluten', 'egg'],
    ingredients: [
      { id: 'b17-1', name: 'تخم‌مرغ نیمرو', amount: 2, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b17-2', name: 'خوراک لوبیاچیتی گرم در سس گوجه', amount: 150, unit: 'g', category: 'protein' },
      { id: 'b17-3', name: 'سوسیس گریل‌شده یا بیکن بوقلمون', amount: 120, unit: 'g', category: 'protein' },
      { id: 'b17-4', name: 'قارچ ورقه تفت‌خورده در کره', amount: 100, unit: 'g', category: 'vegetable' },
      { id: 'b17-5', name: 'گوجه گیلاسی کبابی', amount: 4, unit: 'pcs', category: 'vegetable' },
      { id: 'b17-6', name: 'نان تست مثلثی برشته', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] }
    ],
    steps: [
      { stepNumber: 1, title: 'گریل سوسیس و قارچ', instruction: 'سوسیس‌ها، قارچ‌ها و گوجه‌ها را با کمی کره در تابه چدنی گریل کنید تا خطوط برشتگی روی آن‌ها بیفتد.', durationMinutes: 7, hasTimer: true },
      { stepNumber: 2, title: 'گرم کردن لوبیا و نیمرو', instruction: 'خوراک لوبیا را گرم کنید و همزمان تخم‌مرغ‌ها را نیمرو نمایید.', durationMinutes: 4, hasTimer: true },
      { stepNumber: 3, title: 'چیدمان دیس صبحانه', instruction: 'تمام اجزا را تفکیک‌شده در دیس بزرگ چیده و با نان تست برشته سرو کنید.', durationMinutes: 2, hasTimer: false }
    ],
    goldenTips: [
      'تفت دادن قارچ‌ها در حرارت بالا بدون نمک مانع آب انداختن آن‌ها شده و بافت گوشتی به آن‌ها می‌بخشد.'
    ]
  },

  // 18. کرواسان کره‌ای تازه با پنیر خامه‌ای و گردو
  {
    id: 'croissant-cream-cheese',
    title: 'کرواسان کره‌ای تازه با پنیر خامه‌ای و گردو',
    persianSubtitle: 'شیرینی لایه‌ای ترد فرانسوی با طعم کره طبیعی و مغز پنیر خامه‌ای و گردو',
    canonical_name: 'کرواسان پنیر و گردو',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی هزارلای کره‌ای فرانسوی با صدها لایه ترد و پوک که در فر گرم شده و با لایه‌ای از پنیر خامه‌ای لطیف، مغز گردوی خردشده و کمی عسل پر می‌شود.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 5,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان و لوکس',
    caloriesPerServing: 340,
    proteinGrams: 8,
    carbsGrams: 34,
    fatGrams: 20,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'nuts'],
    ingredients: [
      { id: 'b18-1', name: 'کرواسان کره‌ای آماده باکیفیت', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'b18-2', name: 'پنیر خامه‌ای ویلی یا لبنه', amount: 60, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'b18-3', name: 'مغز گردوی دندان‌گیر', amount: 30, unit: 'g', category: 'protein', allergens: ['nuts'] },
      { id: 'b18-4', name: 'عسل طبیعی برای تزیین', amount: 1, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'گرم کردن کرواسان', instruction: 'کرواسان‌ها را ۳ دقیقه در فر یا توستر با دمای ۱۶۰ درجه بگذارید تا پوسته آن‌ها ترد و کره‌ای شود.', durationMinutes: 3, hasTimer: true },
      { stepNumber: 2, title: 'برش و پر کردن', instruction: 'کرواسان را از عرض برش زده، لایه ضخیمی از پنیر خامه‌ای مالیده و گردوی خردشده و قطره‌ای عسل روی آن بریزید.', durationMinutes: 2, hasTimer: false }
    ],
    goldenTips: [
      'گرم کردن مختصر کرواسان عطر کره را آزاد کرده و باعث تردی حیرت‌انگیز لایه‌ها می‌شود.'
    ]
  },

  // 19. املت اسپانیایی تورتیا
  {
    id: 'tortilla-omelette-spanish',
    title: 'املت اسپانیایی تورتیا با سیب‌زمینی نگینی و پیاز کاراملی',
    persianSubtitle: 'املت کیکی ضخیم و سیرکننده سنتی با بافت لطیف سیب‌زمینی و پیاز شیرین',
    canonical_name: 'تورتیا اسپانیایی',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=800&auto=format&fit=crop&q=80',
    description: 'املت معروف و سیرکننده که شبیه به کوکوی سیب‌زمینی نگینی پخته می‌شود؛ سیب‌زمینی‌های پخته نرم با پیازهای آرام کاراملی‌شده در روغن زیتون و تخم‌مرغ‌های زده‌شده با برشی شبیه به کیک.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    baseServings: 3,
    difficulty: 'medium',
    difficultyFa: 'متوسط و پرملات',
    caloriesPerServing: 290,
    proteinGrams: 12,
    carbsGrams: 26,
    fatGrams: 16,
    fiberGrams: 4,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['egg'],
    ingredients: [
      { id: 'b19-1', name: 'سیب‌زمینی نگینی ریز خردشده', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'b19-2', name: 'پیاز خلال نازک', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'b19-3', name: 'تخم‌مرغ', amount: 4, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'b19-4', name: 'روغن زیتون یا روغن پخت‌وپز', amount: 3, unit: 'tbsp', category: 'oil_fat' },
      { id: 'b19-5a', name: 'نمک', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'b19-5b', name: 'فلفل سیاه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت سیب‌زمینی و پیاز', instruction: 'سیب‌زمینی و پیاز را در روغن زیتون با حرارت ملایم تفت دهید تا نرم و شفاف شوند ولی خیلی برشته نشوند.', durationMinutes: 10, hasTimer: true },
      { stepNumber: 2, title: 'مخلوط کردن با تخم‌مرغ', instruction: 'تخم‌مرغ‌ها را زده و سیب‌زمینی گرم را به آن اضافه کنید و ۵ دقیقه استراحت دهید تا نشاسته جذب شود.', durationMinutes: 5, hasTimer: true },
      { stepNumber: 3, title: 'پخت و برگرداندن تورتیا', instruction: 'مایه را در تابه چرب‌شده ریخته و پس از ۵ دقیقه با یک بشقاب برگردانید تا طرف دوم هم بپزد.', durationMinutes: 6, hasTimer: true }
    ],
    goldenTips: [
      'استراحت ۵ دقیقه‌ای مخلوط سیب‌زمینی گرم با تخم‌مرغ خامه‌ای‌ترین بافت ممکن را ایجاد می‌کند.'
    ]
  },

  // 20. اوتمیل گرم جو دوسر با شیر و موز
  {
    id: 'oatmeal-warm-chia-banana',
    title: 'اوتمیل گرم جو دوسر صبحانه با شیر، موز، دانه چیا و کره بادام‌زمینی',
    persianSubtitle: 'صبحانه رژیمی و ورزشی پرانرژی با فیبر بتاگلوکان، دارچین و عسل طبیعی',
    canonical_name: 'اوتمیل گرم جو دوسر',
    category: 'breakfast',
    categoryNameFa: 'صبحانه‌های سنتی و فرنگی محبوب',
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین صبحانه رژیمی و تناسب اندام در بین ورزشکاران ایران؛ جو دوسر پرک پخته‌شده در شیر کم‌چرب با عطر دارچین، تکه‌های موز رسیده، دانه چیا و یک قاشق کره بادام‌زمینی طبیعی.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 7,
    baseServings: 1,
    difficulty: 'easy',
    difficultyFa: 'فوری و رژیمی',
    caloriesPerServing: 320,
    proteinGrams: 14,
    carbsGrams: 48,
    fatGrams: 9,
    fiberGrams: 8,
    dietaryTags: ['vegetarian', 'high_protein', 'low_calorie'],
    isVegetarian: true,
    allergens: ['lactose', 'nuts'],
    ingredients: [
      { id: 'b20-1', name: 'جو دوسر پرک فوری', amount: 50, unit: 'g', category: 'flour_grain' },
      { id: 'b20-2', name: 'شیر کم‌چرب یا شیر بادام', amount: 200, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'b20-3', name: 'موز رسیده حلقه‌شده', amount: 0.5, unit: 'pcs', category: 'vegetable' },
      { id: 'b20-4', name: 'دانه چیا', amount: 1, unit: 'tsp', category: 'flour_grain' },
      { id: 'b20-5', name: 'کره بادام‌زمینی بدون شکر', amount: 1, unit: 'tbsp', category: 'oil_fat', allergens: ['nuts'] },
      { id: 'b20-6', name: 'پودر دارچین و عسل طبیعی', amount: 1, unit: 'tsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت جو دوسر با شیر', instruction: 'جو دوسر را با شیر و دارچین در قابلمه کوچک ریخته و روی حرارت ملایم ۵ دقیقه هم بزنید تا غلیظ و کرمی شود.', durationMinutes: 5, hasTimer: true },
      { stepNumber: 2, title: 'سرو و تزیین با میوه', instruction: 'اوتمیل غلیظ را در کاسه ریخته، حلقه‌های موز، دانه چیا، کره بادام‌زمینی و یک قاشق عسل رویش بگذارید.', durationMinutes: 2, hasTimer: false }
    ],
    goldenTips: [
      'فیبر بتاگلوکان موجود در جو دوسر تا ظهر احساس سیری کامل به شما می‌دهد و قند خون را تنظیم نگه می‌دارد.'
    ]
  }
];
