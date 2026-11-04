import { Recipe } from '../types';

export const MORE_IRANIAN_HERITAGE_RECIPES: Recipe[] = [
  // 1. خورش به‌آلو مجلسی
  {
    id: 'khoresht-beh-aloo',
    title: 'خورش به‌آلو مجلسی ملس با گوشت گوسفندی و زعفران',
    persianSubtitle: 'عطر بی‌نظیر به تفت‌داده با آلوبخارا، لیمو ترش و دارچین',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    description: 'خورش پاییزی شاهانه با برش‌های طلایی به، آلوبخارای نرم، گوشت ماهیچه گوسفندی و سس ملس زعفرانی با شکر قهوه‌ای یا عسل.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 120,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 490,
    proteinGrams: 34,
    carbsGrams: 38,
    fatGrams: 20,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'اصفهان و شیراز',
    ingredients: [
      { id: 'ba-1', name: 'گوشت ران یا سردست گوسفندی', amount: 450, unit: 'g', category: 'protein' },
      { id: 'ba-2', name: 'به زرد اصفهان شسته‌شده و مکعبی', amount: 2, unit: 'pcs', unitWeightInGrams: 200, category: 'vegetable' },
      { id: 'ba-3', name: 'آلوبخارای اعلای نیشابور', amount: 150, unit: 'g', category: 'sweetener' },
      { id: 'ba-4a', name: 'پیاز درشت نگینی', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'ba-4b', name: 'رب گوجه‌فرنگی', amount: 2, unit: 'tbsp', category: 'condiment' },
      { id: 'ba-5a', name: 'زعفران دم‌کرده', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'ba-5b', name: 'چوب دارچین', amount: 1, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'ba-5c', name: 'آبلیموی تازه', amount: 2, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت گوشت با ادویه', instruction: 'پیاز را تفت داده، گوشت و زردچوبه را اضافه کنید و با آب جوش بگذارید ۱.۵ ساعت بپزد.', durationMinutes: 90, hasTimer: true },
      { stepNumber: 2, title: 'تفت دادن به در کره', instruction: 'تکه‌های به را در کمی کره تفت دهید تا هنگام پخت در خورش له نشوند.', durationMinutes: 15 },
      { stepNumber: 3, title: 'افزودن به و آلو و جاافتادن', instruction: 'به و آلوبخارای شسته‌شده را به همراه زعفران، رب و آبلیمو اضافه کرده و ۴۰ دقیقه با شعله ملایم بپزید تا خورش به روغن بیفتد.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'تفت دادن برش‌های به در کره باعث کاراملی شدن سطح و مانع از متلاشی شدن بافت میوه می‌شود.'
    ]
  },

  // 2. خورش هویج تبریزی با آلو
  {
    id: 'khoresht-havij-tabrizi',
    title: 'خورش هویج و آلو اصیل تبریزی با مرغ زعفرانی',
    persianSubtitle: 'هویج رشته‌ای باریک تفت‌خورده در زعفران با آلوبخارا و آبغوره ملس',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80',
    description: 'شاهکار مهمانی‌های تبریز با خلال‌های هویج بسیار نازک تفت‌داده با زعفران غلیظ، مرغ زعفرانی نرم، آلوبخارا و طعم ملس آبغوره.',
    prepTimeMinutes: 35,
    cookTimeMinutes: 75,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 460,
    proteinGrams: 36,
    carbsGrams: 34,
    fatGrams: 18,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'تبریز و آذربایجان',
    ingredients: [
      { id: 'ht-1', name: 'سینه یا ران مرغ پاک‌شده', amount: 500, unit: 'g', category: 'protein' },
      { id: 'ht-2', name: 'هویج نارنجی خلال کبریتی ریز', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'ht-3', name: 'آلوبخارای خیسانده', amount: 120, unit: 'g', category: 'sweetener' },
      { id: 'ht-4', name: 'زعفران دم‌کرده غلیظ', amount: 3, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'ht-5', name: 'آبغوره یا آبلیموی تازه برای چاشنی ملس', amount: 3, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن هویج با زعفران', instruction: 'خلال‌های هویج را در تابه با کره یا روغن و ۲ قاشق زعفران تفت ملایم دهید تا خوش‌رنگ و منعطف شوند.', durationMinutes: 20 },
      { stepNumber: 2, title: 'پخت مرغ با سس غلیظ', instruction: 'مرغ را با پیازداغ و ادویه تفت داده و با ۱ لیوان آب بپزید تا نیم‌پز شود.', durationMinutes: 30, hasTimer: true },
      { stepNumber: 3, title: 'چیدن هویج روی مرغ', instruction: 'هویج‌های تفت‌داده و آلوها را روی مرغ بچینید، آبغوره بیفزایید و درب ظرف را بگذارید تا با بخار جا بیفتد.', durationMinutes: 30, hasTimer: true }
    ],
    goldenTips: [
      'خلال‌های هویج را با چاقوی تیز کبریتی یکدست خرد کنید، استفاده از رنده بافت هویج را آب می‌اندازد.'
    ]
  },

  // 3. شیرین‌پلو اصیل مجلسی
  {
    id: 'shirin-polo',
    title: 'شیرین‌پلو اصیل مجلسی با فیله مرغ زعفرانی',
    persianSubtitle: 'پلو اعیانی با خلال بادام، پسته، خلال پوست پرتقال و عطر گلاب کاشان',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    description: 'غذای درباری و جشن‌های باشکوه ایرانی با عطر خلال پوست پرتقال شهددار، زعفران اعلا، برنج دودی قدکشیده و خلال پسته سبز قزوین.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 60,
    baseServings: 6,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 570,
    proteinGrams: 35,
    carbsGrams: 66,
    fatGrams: 18,
    dietaryTags: ['high_protein'],
    allergens: ['nuts'],
    originRegion: 'تهران و اصفهان',
    ingredients: [
      { id: 'sp-1', name: 'برنج طارم هاشمی درجه یک', amount: 500, unit: 'g', category: 'flour_grain' },
      { id: 'sp-2', name: 'فیله سینه مرغ زعفرانی خردشده', amount: 500, unit: 'g', category: 'protein' },
      { id: 'sp-3', name: 'خلال پوست پرتقال تلخی‌گرفته با شربت قند', amount: 80, unit: 'g', category: 'sweetener' },
      { id: 'sp-4a', name: 'خلال بادام', amount: 40, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'sp-4b', name: 'خلال پسته', amount: 40, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] },
      { id: 'sp-5a', name: 'زعفران دم‌کرده غلیظ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'sp-5b', name: 'کره حیوانی', amount: 30, unit: 'g', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی خلال پرتقال', instruction: 'خلال پوست پرتقال را ۳ بار جوشانده تا تلخی گرفته شود، سپس با شهد شکر و گلاب چند دقیقه بجوشانید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'پخت و تفت فیله مرغ', instruction: 'مرغ را با زعفران، پیازداغ و نمک تفت داده تا طلایی و مغزپخت شود.', durationMinutes: 20 },
      { stepNumber: 3, title: 'لایه‌چینی و دم کردن پلو', instruction: 'برنج را آبکش کرده و لایه لایه با مواد دم بگذارید. در انتها با خلال پسته و زعفران تزیین کنید.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'خلال پسته را در گلاب سرد بخیسانید و حرارت مستقیم ندهید تا سبزی یاقوتی آن تیره نشود.'
    ]
  },

  // 4. هویج‌پلو مجلسی با گوشت قلقلی
  {
    id: 'havij-polo',
    title: 'هویج‌پلو مجلسی زعفرانی با گوشت قلقلی و دارچین',
    persianSubtitle: 'هویج باریک تفت‌داده با زعفران، برنج دودی ایرانی و کوفته‌ریزه‌های خوش‌عطر',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    description: 'غذای دلپذیر سنتی با هویج‌های خوش‌رنگ تفت‌خورده در کره، گوشت چرخ‌کرده قلقلی، عطر هل و دارچین و برنج ایرانی زعفرانی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 50,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 520,
    proteinGrams: 28,
    carbsGrams: 62,
    fatGrams: 16,
    dietaryTags: ['high_protein'],
    allergens: [],
    originRegion: 'تبریز و شیراز',
    ingredients: [
      { id: 'hp-1', name: 'برنج ایرانی اعلا', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'hp-2', name: 'هویج خلال ریز رنده‌شده', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'hp-3', name: 'گوشت چرخ‌کرده برای قلقلی', amount: 300, unit: 'g', category: 'protein' },
      { id: 'hp-4', name: 'شکر سفید (اختیاری برای طعم ملس)', amount: 2, unit: 'tbsp', category: 'sweetener' },
      { id: 'hp-5a', name: 'زعفران دم‌کرده', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'hp-5b', name: 'پودر دارچین', amount: 1, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'قلقلی کردن گوشت', instruction: 'گوشت را با پیاز رنده و نمک و زردچوبه ورز داده، قلقلی کرده و در کره سرخ کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'تفت هویج با زعفران', instruction: 'هویج را با ۲ قاشق شکر و زعفران در تابه تفت دهید تا نرم و براق شود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'دم کردن برنج لایه‌ای', instruction: 'برنج را آبکش کرده، لایه‌لایه با هویج و قلقلی و دارچین دم بگذارید.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'یک قاشق آبلیمو به هویج هنگام تفت بیفزایید تا رنگ نارنجی درخشان آن حفظ شود.'
    ]
  },

  // 5. کباب چنجه اصیل گوسفندی
  {
    id: 'kebab-chenjeh',
    title: 'کباب چنجه اصیل گوسفندی با دنبه و کره محلی',
    persianSubtitle: 'گوشت فیله و راسته مکعبی نرم خوابانده در ماست ترش، روغن زیتون و زعفران',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    description: 'کباب محبوب ایرانی با تکه‌های مکعبی یکدست راسته گوسفندی بیات‌شده که یکی در میان با قطعات دنبه به سیخ کشیده شده و روی زغال ملایم آبدار کباب می‌شود.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 580,
    proteinGrams: 46,
    carbsGrams: 6,
    fatGrams: 42,
    dietaryTags: ['keto', 'high_protein'],
    allergens: ['lactose'],
    originRegion: 'فارس، آذربایجان و گیلان',
    ingredients: [
      { id: 'ch-1', name: 'فیله یا مغز ران گوسفندی خردشده ۲×۲', amount: 600, unit: 'g', category: 'protein' },
      { id: 'ch-2', name: 'دنبه گوسفندی خردشده', amount: 150, unit: 'g', category: 'oil_fat' },
      { id: 'ch-3a', name: 'ماست ترش چکیده', amount: 100, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'ch-3b', name: 'آب پیاز', amount: 50, unit: 'ml', category: 'vegetable' },
      { id: 'ch-4a', name: 'روغن زیتون فرابکر', amount: 2, unit: 'tbsp', category: 'oil_fat' },
      { id: 'ch-4b', name: 'فلفل سیاه تازه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'مرینیت گوشت چنجه', instruction: 'تکه‌های گوشت را با آب پیاز، ماست ترش، فلفل سیاه و روغن زیتون مخلوط کرده و ۱۲ ساعت در یخچال بخوابانید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'سیخ‌گیری یکی‌درمیان با دنبه', instruction: 'دو تکه گوشت و یک تکه دنبه به سیخ بکشید تا چربی دنبه گوشت را حین کباب کردن آبدار نگه دارد.', durationMinutes: 15 },
      { stepNumber: 3, title: 'کباب روی زغال قرمز', instruction: 'روی زغال یکدست با باد ملایم باد بزنید تا مغزپخت و آبدار شود. نمک را در پایان بپاشید.', durationMinutes: 12 }
    ],
    goldenTips: [
      'ماست ترش فیبرهای گوشت را نرم کرده و مانع از خشک و لاستیکی شدن چنجه می‌شود.'
    ]
  },

  // 6. آش شله‌قلمکار اصیل تهرانی
  {
    id: 'ash-sholeh-ghalamkar',
    title: 'آش شله‌قلمکار اصیل تهرانی با گوشت ریش‌شده و قلم',
    persianSubtitle: 'آش غلیظ کشدار نذری با حبوبات هفت‌گانه، ترخون و مرزه معطر',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    description: 'معروف‌ترین و سنگین‌ترین آش نذری تهران با گوشت گوسفندی کاملاً ریش‌شده، برنج نیم‌دانه، ترخون و مرزه، پیازداغ کاراملی و بافت فوق‌العاده کشدار.',
    prepTimeMinutes: 45,
    cookTimeMinutes: 240,
    baseServings: 8,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 420,
    proteinGrams: 28,
    carbsGrams: 48,
    fatGrams: 14,
    fiberGrams: 10,
    dietaryTags: ['high_protein'],
    allergens: ['gluten'],
    originRegion: 'تهران قدیم',
    ingredients: [
      { id: 'sh-1', name: 'گوشت سردست یا گردن گوسفندی با قلم', amount: 500, unit: 'g', category: 'protein' },
      { id: 'sh-2', name: 'حبوبات پخته (نخود، لوبیا چیتی، لوبیا چشم‌بلبلی، عدس)', amount: 300, unit: 'g', category: 'flour_grain' },
      { id: 'sh-3', name: 'برنج نیم‌دانه و گندم پوست‌کنده', amount: 200, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sh-4', name: 'سبزی آش همراه ترخون و مرزه تازه', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'sh-5', name: 'پیازداغ فراوان و فلفل سیاه', amount: 150, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت کامل و ریش‌کردن گوشت', instruction: 'گوشت و قلم را با پیاز خوب بپزید تا کاملاً نرم شود، سپس استخوان‌ها را خارج و گوشت را با گوشتکوب بکوبید تا کش بیاید.', durationMinutes: 180, hasTimer: true },
      { stepNumber: 2, title: 'پخت برنج و گندم', instruction: 'برنج و گندم را در آب قلم بپزید تا کاملاً له و حلیم‌مانند شود، سپس حبوبات و سبزی را اضافه کنید.', durationMinutes: 60 },
      { stepNumber: 3, title: 'کوبیدن و هم‌زدن پیوسته (شله‌کشی)', instruction: 'گوشت ریش‌شده و نیمی از پیازداغ را اضافه کرده و مدام هم بزنید تا آش کشدار و جاافتاده شود.', durationMinutes: 45 }
    ],
    goldenTips: [
      'کوبیدن گوشت با گوشتکوب و هم زدن پیوسته در جهت عقربه‌های ساعت راز کشسانی شگفت‌انگیز این آش است.'
    ]
  },

  // 7. سوپ ورمیشل (رشته‌فرنگی) مرغ
  {
    id: 'soup-vermicelli',
    title: 'سوپ ورمیشل (رشته‌فرنگی) نوستالژیک با آب مرغ تازه',
    persianSubtitle: 'سوپ سبک و معجزه‌بخش خانگی با هویج نگینی، جعفری و لیمو ترش',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    description: 'سوپ گرم و صمیمی ایرانی که یادآور محبت مادران است؛ تهیه شده با عصاره طبیعی مرغ، ورمیشل، هویج نگینی، ذرت و آبلیموی تازه.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 180,
    proteinGrams: 14,
    carbsGrams: 24,
    fatGrams: 4,
    dietaryTags: ['low_calorie'],
    allergens: ['gluten'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'sv-1', name: 'سینه مرغ خردشده و آب مرغ غلیظ', amount: 300, unit: 'g', category: 'protein' },
      { id: 'sv-2', name: 'رشته ورمیشل خردشده', amount: 100, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sv-3', name: 'هویج نگینی ریز و سیب‌زمینی', amount: 200, unit: 'g', category: 'vegetable' },
      { id: 'sv-4', name: 'جعفری تازه خردشده و رب گوجه', amount: 50, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت مرغ و سبزیجات', instruction: 'مرغ، هویج و سیب‌زمینی را با آب مرغ و کمی زردچوبه بگذارید ۳۰ دقیقه بپزد.', durationMinutes: 30 },
      { stepNumber: 2, title: 'افزودن ورمیشل', instruction: 'ورمیشل و رب گوجه‌فرنگی تفت‌داده را بیفزایید و فقط ۱۰ دقیقه بپزید تا رشته‌ها نرم شوند.', durationMinutes: 10 },
      { stepNumber: 3, title: 'سرو با جعفری و لیمو', instruction: 'جعفری تازه و آبلیموی طبیعی را در انتها اضافه و بلافاصله داغ سرو نمایید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'ورمیشل را در اواخر پخت اضافه کنید؛ پخت طولانی رشته‌ها باعث لعاب بیش از حد و سفت شدن سوپ می‌شود.'
    ]
  },

  // 8. کله‌جوش سنتی اصفهان
  {
    id: 'kalleh-joosh',
    title: 'کله‌جوش سنتی با کشک سابیده، مغز گردو و نعناداغ',
    persianSubtitle: 'غذای سرشار از کلسیم با طعم تند نعناع و بافت دندان‌گیر گردو',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    description: 'غذای سالم و بدون گوشت مناطق کویری ایران با کشک محلی ترش، گردوی تازه خردشده، پیازداغ چیپسی، نعناع داغ معطر و نان سنگک خردشده.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 320,
    proteinGrams: 18,
    carbsGrams: 16,
    fatGrams: 22,
    dietaryTags: ['vegetarian', 'keto', 'high_protein'],
    isVegetarian: true,
    allergens: ['lactose', 'nuts'],
    originRegion: 'اصفهان، یزد و کرمان',
    ingredients: [
      { id: 'kj-1', name: 'کشک سنتی غلیظ جوشانده', amount: 350, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'kj-2', name: 'مغز گردوی دندان‌گیر خردشده', amount: 120, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'kj-3', name: 'پیاز درشت خلالی و سیر کوبیده', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'kj-4', name: 'نعناع خشک و زردچوبه', amount: 20, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن پیازداغ و نعناداغ', instruction: 'پیاز را با زردچوبه طلایی کنید، گردوی خردشده را اضافه و ۱ دقیقه تفت دهید، سپس نعناع خشک را بیفزایید و سریع از روی شعله بردارید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن کشک رقیق‌شده', instruction: 'کشک را با ۱.۵ لیوان آب ولرم رقیق کرده، به تابه اضافه کنید و با شعله ملایم هم بزنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'خاموش کردن قبل از جوشیدن زیاد', instruction: 'همین که کله‌جوش به لبه جوش رسید و بخار کرد خاموش کنید (جوشیدن زیاد کشک را می‌بُرد). با نان خشک سرو کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'کشک نباید قل‌قل بجوشد، در غیر این صورت آب و دلمه آن از هم جدا می‌شود.'
    ]
  },

  // 9. اشکنه شنبلیله سنتی
  {
    id: 'eshkeneh-sonnati',
    title: 'اشکنه شنبلیله سنتی با تخم‌مرغ عسلی و سیب‌زمینی',
    persianSubtitle: 'غذای اقتصادی اصیل و فوری ایرانی با عطر سرمست‌کننده شنبلیله',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    description: 'غذای نوستالژیک و سریع ایرانی با شنبلیله خشک تفت‌داده در روغن، سیب‌زمینی نگینی، پیازداغ عسلی و تخم‌مرغ‌های درسته که در آب خوراک بسته می‌شوند.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 260,
    proteinGrams: 12,
    carbsGrams: 24,
    fatGrams: 14,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'خراسان و مرکز ایران',
    ingredients: [
      { id: 'esh-1', name: 'تخم‌مرغ درشت تازه', amount: 4, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'esh-2', name: 'شنبلیله خشک معطر', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'esh-3', name: 'سیب‌زمینی نگینی مکعبی', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'esh-4', name: 'پیاز درشت خلالی و آرد گندم', amount: 2, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'پیازداغ و تفت شنبلیله', instruction: 'پیاز را با زردچوبه سرخ کنید، آرد و شنبلیله خشک را افزوده و فقط چند ثانیه تفت دهید تا نسوزد.', durationMinutes: 8 },
      { stepNumber: 2, title: 'پخت سیب‌زمینی', instruction: '۳ لیوان آب جوش و سیب‌زمینی‌ها را اضافه کنید تا ۱۵ دقیقه بپزند و نرم شوند.', durationMinutes: 15 },
      { stepNumber: 3, title: 'شکستن تخم‌مرغ‌ها', instruction: 'تخم‌مرغ‌ها را یکی‌یکی درون اشکنه بشکنید و هم نزنید تا درسته سفت و بسته شوند.', durationMinutes: 7 }
    ],
    goldenTips: [
      'شنبلیله خیلی سریع می‌سوزد و تلخ می‌شود؛ حرارت تابه را کم نگه دارید.'
    ]
  },

  // 10. یتیمچه بادمجان و کدو اصیل
  {
    id: 'yatimcheh',
    title: 'یتیمچه بادمجان و کدو اصیل بدون گوشت با غوره',
    persianSubtitle: 'خوراک گیاهی رژیمی و لذیذ با گوجه‌فرنگی، سیر، پیاز و فلفل',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای سنتی و محلی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'خوراک کاملاً گیاهی و بسیار سالم ایرانی با لایه‌چینی بادمجان حلقه‌ای، کدوی سبز، گوجه‌فرنگی رنده‌شده، سیر و چاشنی ترش غوره تازه.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 160,
    proteinGrams: 4,
    carbsGrams: 22,
    fatGrams: 7,
    fiberGrams: 8,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'نیشابور، آذربایجان و شیراز',
    ingredients: [
      { id: 'yt-1', name: 'بادمجان قلمی ورقه‌شده تلخی‌گرفته', amount: 4, unit: 'pcs', category: 'vegetable' },
      { id: 'yt-2', name: 'کدوی سبز ورقه‌شده', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'yt-3', name: 'گوجه‌فرنگی پوره و سیر تازه', amount: 4, unit: 'pcs', category: 'vegetable' },
      { id: 'yt-4', name: 'غوره تازه یا آبغوره خانگی', amount: 50, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'لایه‌چینی مواد در قابلمه', instruction: 'پیاز، بادمجان، کدو و گوجه را لایه‌لایه در تابه بچینید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن پوره گوجه و سیر', instruction: 'پوره گوجه، سیر، زردچوبه، نمک و غوره را روی سبزیجات بریزید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'پخت آرام با بخار آب سبزیجات', instruction: 'درب قابلمه را گذاشته و با شعله ملایم نیم ساعت بپزید تا سس غلیظ شود.', durationMinutes: 30, hasTimer: true }
    ],
    goldenTips: [
      'آب اضافه به این خوراک نریزید؛ سبزیجات با آب خود پخته و فوق‌العاده لذیذ می‌شوند.'
    ]
  },

  // 11. زیتون پرورده اصیل رودبار و گیلان
  {
    id: 'zeytoon-parvardeh',
    title: 'زیتون پرورده اصیل گیلانی با چوچاق و رب انار ترش',
    persianSubtitle: 'مزه سلطنتی شمال با گردوی سابیده، گلپر، سیر و روغن زیتون بکر',
    category: 'iranian_local',
    categoryNameFa: 'پیش‌غذا و مزه‌های ایرانی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین چاشنی سفره‌های ایرانی با زیتون بدون هسته مرغوب رودبار، گردوی سابیده فراوان، رب انار ملس ترش محلی، سبزی‌های محلی شمال (چوچاق و نعناع) و گلپر.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 0,
    baseServings: 6,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 210,
    proteinGrams: 4,
    carbsGrams: 12,
    fatGrams: 18,
    dietaryTags: ['vegetarian', 'keto'],
    isVegetarian: true,
    allergens: ['nuts'],
    originRegion: 'رودبار و گیلان',
    ingredients: [
      { id: 'zp-1', name: 'زیتون بدون هسته شیرین‌شده مرغوب', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'zp-2', name: 'مغز گردوی کاملاً سابیده‌شده ریز', amount: 200, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'zp-3', name: 'رب انار ترش یا ملس طبیعی گیلان', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'zp-4', name: 'سیر تازه کوبیده و سبزی چوچاق یا نعنا', amount: 30, unit: 'g', category: 'vegetable' },
      { id: 'zp-5', name: 'گلپر و آب انار تازه', amount: 10, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی زیتون', instruction: 'زیتون را بشویید و کاملاً خشک کنید تا آب نداشته باشد.', durationMinutes: 5 },
      { stepNumber: 2, title: 'ترکیب گردو و رب انار', instruction: 'گردو، رب انار، سیر، چوچاق، گلپر و نمک را بسابید تا خمیر روغنی یکدستی شکل بگیرد.', durationMinutes: 10 },
      { stepNumber: 3, title: 'مخلوط کردن و استراحت در یخچال', instruction: 'زیتون را اضافه کرده و زیرورو کنید. ۲۴ ساعت در ظرف دربسته بگذارید تا طعم‌ها به عمق زیتون نفوذ کنند.', durationMinutes: 5 }
    ],
    goldenTips: [
      'استفاده از سبزی چوچاق اصل شمال راز عطر متمایز زیتون پرورده گیلانی است.'
    ]
  },

  // 12. سالاد شیرازی اصیل با آبغوره
  {
    id: 'salad-shirazi',
    title: 'سالاد شیرازی اصیل با آبغوره عسگری و نعناع خشک',
    persianSubtitle: 'خیار، گوجه و پیاز با خرد کردن نگینی فوق‌العاده ریز و یکدست',
    category: 'iranian_local',
    categoryNameFa: 'پیش‌غذا و مزه‌های ایرانی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'سالاد ملی و پرآوازه ایران که همراه همیشگی پلوها و خورش‌هاست؛ خیار قلمی، گوجه سفت و پیاز سفید ریز نگینی با آبغوره اصیل، نعنا خشک و نمک.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 45,
    proteinGrams: 1,
    carbsGrams: 8,
    fatGrams: 1,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'شیراز و سراسر ایران',
    ingredients: [
      { id: 'ss-1', name: 'خیار بوته‌ای قلمی با پوست نگینی ریز', amount: 4, unit: 'pcs', category: 'vegetable' },
      { id: 'ss-2', name: 'گوجه‌فرنگی سفت گوشتی نگینی ریز', amount: 3, unit: 'pcs', category: 'vegetable' },
      { id: 'ss-3', name: 'پیاز سفید ریز خردشده', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'ss-4', name: 'آبغوره طبیعی خانگی و نعناع خشک', amount: 4, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'برش نگینی ریز و هم‌اندازه', instruction: 'خیار، گوجه و پیاز را به قطعات ریز مربعی ۵ میلی‌متری برش دهید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'چاشنی‌زدن درست قبل از سرو', instruction: 'آبغوره، نمک، فلفل سیاه و نعنای خشک را ترکیب کرده و درست قبل از کشیدن سالاد مخلوط کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'آبغوره و نمک را زودتر اضافه نکنید تا سالاد آب نیندازد و سبزیجات ترد بمانند.'
    ]
  },

  // 13. بورانی اسفناج مجلسی
  {
    id: 'boorani-esfenaj',
    title: 'بورانی اسفناج مجلسی با ماست چکیده و سیر داغ',
    persianSubtitle: 'پیش‌غذای لطیف سرشار از آهن با گردو و گل سرخ محمدی',
    category: 'iranian_local',
    categoryNameFa: 'پیش‌غذا و مزه‌های ایرانی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'پیش‌غذای کهن و مجلل با اسفناج تازه بخارپزشده، سیر سابیده، ماست چکیده خامه‌ای، مغز گردو و گل سرخ خوش‌عطر.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 110,
    proteinGrams: 7,
    carbsGrams: 8,
    fatGrams: 6,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: ['lactose', 'nuts'],
    originRegion: 'مرکز و شمال ایران',
    ingredients: [
      { id: 'be-1', name: 'اسفناج تازه برگ‌ریز پخته و ساطوری', amount: 500, unit: 'g', category: 'vegetable' },
      { id: 'be-2', name: 'ماست چکیده موسیر یا پرچرب', amount: 300, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'be-3', name: 'سیر رنده‌شده و گردوی خردشده', amount: 40, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'be-4', name: 'پودر گل سرخ و فلفل سیاه', amount: 5, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت و چلاندن اسفناج', instruction: 'اسفناج را بخارپز کنید، سپس با فشار دست آب اضافی آن را کاملاً بگیرید و ریز ساطوری کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'ترکیب با ماست چکیده', instruction: 'اسفناج خنک‌شده را با ماست چکیده، سیر، نمک، گردو و گل سرخ مخلوط و در یخچال خنک کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'گرفتن کامل آب اسفناج پخته راز غلیظ و فرم‌گرفته ماندن بورانی است.'
    ]
  },

  // 14. ماست و خیار مجلسی پرملات
  {
    id: 'mast-o-khiar',
    title: 'ماست و خیار مجلسی با کشمش، گردو و گل سرخ',
    persianSubtitle: 'چاشنی خنک شاهانه با خیار رنده، نعنا و پونه کوهی',
    category: 'iranian_local',
    categoryNameFa: 'پیش‌غذا و مزه‌های ایرانی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'ماست و خیار مجلسی غلیظ با ماست چکیده سنتی، خیارهای قلمی ترد، کشمش پلویی شیرین، گردوی خردشده، گل محمدی و سبزی خشک معطر.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 130,
    proteinGrams: 6,
    carbsGrams: 14,
    fatGrams: 6,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['lactose', 'nuts'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'mk-1', name: 'ماست چکیده شیرین پرچرب', amount: 400, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'mk-2', name: 'خیار نگینی یا رنده درشت آب‌گرفته', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'mk-3', name: 'کشمش پلویی شسته و مغز گردو', amount: 60, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'mk-4', name: 'نعناع خشک، گل سرخ و نمک', amount: 15, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'ترکیب ماست و اقلام مغذی', instruction: 'خیار، گردو، کشمش و سبزی خشک را به ماست چکیده بیفزایید و هم بزنید.', durationMinutes: 5 },
      { stepNumber: 2, title: 'تزیین باشکوه روی ماست', instruction: 'با پودر گل سرخ، نعنا و مغز گردو تزیین نمایید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'استفاده از ماست چکیده سنتی قوام غلیظ و دسرگونه به ماست و خیار می‌دهد.'
    ]
  },

  // 15. فرنی قالبی زعفرانی سنتی
  {
    id: 'fereni-sonnati',
    title: 'فرنی قالبی سنتی با آرد برنج، هل و گلاب',
    persianSubtitle: 'دسر لطیف ابری با عطر گلاب کاشان و بافت کرمی یکدست',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و شیرینی سنتی',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    description: 'دسر کهن و گوارای ایرانی با آرد برنج مرغوب طارم، شیر تازه محلی، شکر، گلاب دوآتشه کاشان و پودر هل سبز ساییده.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 190,
    proteinGrams: 6,
    carbsGrams: 32,
    fatGrams: 4,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['lactose'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'fr-1', name: 'شیر گاو تازه پرچرب', amount: 800, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'fr-2', name: 'آرد برنج مرغوب خانگی الک‌شده', amount: 60, unit: 'g', category: 'flour_grain' },
      { id: 'fr-3', name: 'شکر سفید', amount: 80, unit: 'g', category: 'sweetener' },
      { id: 'fr-4', name: 'گلاب اعلا و پودر هل سبز', amount: 30, unit: 'ml', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'حل کردن آرد در شیر سرد', instruction: 'آرد برنج و شکر را در شیر کاملاً سرد حل کنید تا هیچ گلوله‌ای باقی نماند.', durationMinutes: 5 },
      { stepNumber: 2, title: 'پخت روی شعله ملایم با هم‌زدن مداوم', instruction: 'روی شعله ملایم قرار داده و با لیسک مدام هم بزنید تا غلیظ و قوام‌دار شود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'افزودن گلاب و هل در آخر', instruction: 'گلاب و هل را در دقیقه پایانی اضافه کرده و داغ در کاسه‌ها بریزید تا ببندد.', durationMinutes: 5 }
    ],
    goldenTips: [
      'هم زدن مداوم تا زمان قل زدن مانع از ته‌گرفتن و گلوله شدن فرنی می‌شود.'
    ]
  },

  // 16. شیربرنج مجلسی خامه‌ای
  {
    id: 'shir-berenej',
    title: 'شیربرنج مجلسی خامه‌ای با مربای گل محمدی',
    persianSubtitle: 'برنج نیم‌دانه معطر شکفته در شیر و خامه صبحانه با عطر هل',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و شیرینی سنتی',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80',
    description: 'شیربرنج اعیانی با دانه‌های برنج طارم که کاملاً در شیر باز شده و با خامه صبحانه بافتی مخملی پیدا کرده است؛ سرو شده با مربای گل سرخ یا دارچین و عسل.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 60,
    baseServings: 6,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 240,
    proteinGrams: 7,
    carbsGrams: 36,
    fatGrams: 8,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['lactose'],
    originRegion: 'آذربایجان و گیلان',
    ingredients: [
      { id: 'sb-1', name: 'برنج نیم‌دانه معطر ایرانی', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'sb-2', name: 'شیر محلی پرچرب', amount: 1200, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'sb-3', name: 'خامه صبحانه غلیظ', amount: 100, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'sb-4', name: 'گلاب و پودر هل ساییده', amount: 4, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'شکفتن برنج با آب', instruction: 'برنج را با ۲ لیوان آب بپزید تا آب آن کشیده و برنج کاملاً نرم و شکفته شود.', durationMinutes: 20 },
      { stepNumber: 2, title: 'افزودن شیر و پخت آرام', instruction: 'شیر را اضافه کرده و بگذارید با شعله ملایم بجوشد و لعاب بیندازد.', durationMinutes: 35 },
      { stepNumber: 3, title: 'افزودن خامه و گلاب', instruction: 'خامه و گلاب را اضافه کرده، هم بزنید و خاموش کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'برنج نیم‌دانه لعاب دوبرابر نسبت به برنج درسته پس می‌دهد و شیربرنج را غلیظ‌تر می‌کند.'
    ]
  },

  // 17. مسقطی زعفرانی اعلای لاری
  {
    id: 'masghati-lari',
    title: 'مسقطی زعفرانی اعلای لاری با خلال بادام و پسته',
    persianSubtitle: 'حلوای ژله‌ای شفاف و کشدار اصیل جنوب با نشاسته گل و گلاب',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و شیرینی سنتی',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop&q=80',
    description: 'سوغات مشهور شیراز و لار با نشاسته گندم مرغوب، زعفران دم‌کرده قائنات، شکر، گلاب کاشان، روغن مایع و مغزیجات خلال بادام بوداده.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 75,
    baseServings: 12,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 220,
    proteinGrams: 2,
    carbsGrams: 42,
    fatGrams: 6,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['nuts'],
    originRegion: 'لارستان، شیراز و فارس',
    ingredients: [
      { id: 'ml-1', name: 'نشاسته گل گندم مرغوب', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'ml-2', name: 'شکر سفید', amount: 350, unit: 'g', category: 'sweetener' },
      { id: 'ml-3', name: 'گلاب دوآتشه و زعفران غلیظ', amount: 150, unit: 'ml', category: 'spice_seasoning' },
      { id: 'ml-4', name: 'روغن مایع خوراکی بدون بو', amount: 60, unit: 'ml', category: 'oil_fat' },
      { id: 'ml-5', name: 'خلال بادام تفت‌خورده و پودر هل', amount: 60, unit: 'g', category: 'sweetener', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'حل کردن و صاف کردن نشاسته', instruction: 'نشاسته را در ۴ لیوان آب سرد حل کرده و از صافی رد کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پخت طولانی با شعله ملایم', instruction: 'شکر و نشاسته را روی شعله بسیار ملایم ۱ ساعت مداوم هم بزنید تا بوی خامی نشاسته برود و شیشه‌ای شود.', durationMinutes: 60, hasTimer: true },
      { stepNumber: 3, title: 'افزودن زعفران، روغن و برش', instruction: 'زعفران، گلاب، هل و روغن را بیفزایید تا به روغن بیفتد. در سینی ریخته و پس از سرد شدن لوزی برش دهید.', durationMinutes: 15 }
    ],
    goldenTips: [
      'شعله ملایم و هم‌زدن ممتد تنها راه رسیدن به شفافیت کریستالی و کشسانی مسقطی لاری است.'
    ]
  },

  // 18. فالوده شیرازی دست‌ساز بازاری
  {
    id: 'faloodeh-shirazi',
    title: 'فالوده شیرازی دست‌ساز با شربت آلبالو و لیمو ترش',
    persianSubtitle: 'رشته‌های ترد نشاسته‌ای یخی با آبلیموی ناب جهرم و شربت بار',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و شیرینی سنتی',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    description: 'دسر تابستانی خنک شیرازی با رشته‌های سفید و ترد نشاسته پخته‌شده که در ظرف یخ تگری خنک شده و با شهد شکر، آبلیموی تازه جهرم و شربت آلبالو سرو می‌شود.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 160,
    proteinGrams: 1,
    carbsGrams: 40,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'شیراز',
    ingredients: [
      { id: 'fl-1', name: 'نشاسته گندم مرغوب', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'fl-2', name: 'شربت بار خنک‌شده با گلاب', amount: 200, unit: 'ml', category: 'sweetener' },
      { id: 'fl-3', name: 'یخ خردشده و آبلیموی تازه جهرم', amount: 200, unit: 'g', category: 'liquid' },
      { id: 'fl-4', name: 'شربت آلبالوی غلیظ برای تاپینگ', amount: 4, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت نشاسته', instruction: 'نشاسته را با آب بپزید تا کاملاً شفاف و غلیظ و چسبنده شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'رد کردن از صافی روی آب یخ', instruction: 'مایه داغ را از صافی ریز روی ظرف آب و یخ فراوان پرس کنید تا رشته‌ها فریز و منجمد شوند.', durationMinutes: 10 },
      { stepNumber: 3, title: 'مخلوط با شربت و لیمو', instruction: 'رشته‌ها را با شهد شکر و یخ هم بزنید تا سفید و برفی شوند و با آبلیمو سرو کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'آب زیر صافی باید یخ‌زده با خرده‌یخ باشد تا رشته‌های نشاسته بلافاصله شوک بگیرند و به هم نچسبند.'
    ]
  },

  // 19. باقلوای سنتی یزد و تبریز
  {
    id: 'baklava-sonnati',
    title: 'باقلوای سنتی لایه‌ای با پودر پسته، هل و شهد عسلی',
    persianSubtitle: 'خمیر نازک لایه‌ای ترد با فیلینگ مغز پسته قزوین و زعفران',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های سنتی ایران',
    image: 'https://images.unsplash.com/photo-1597528662465-55ece5734101?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی اعیانی و پرطرفدار ایران با لایه‌های خمیر نازک کاغذی، مغز فراوان پسته سبز و بادام ساییده با هل، کره محلی ذوب‌شده و شربت بار گلاب.',
    prepTimeMinutes: 45,
    cookTimeMinutes: 30,
    baseServings: 20,
    difficulty: 'hard',
    difficultyFa: 'سخت / تخصصی',
    caloriesPerServing: 280,
    proteinGrams: 5,
    carbsGrams: 32,
    fatGrams: 16,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'nuts'],
    originRegion: 'یزد، تبریز و قزوین',
    ingredients: [
      { id: 'bk-1', name: 'خمیر باقلوا (یوفکا یا دست‌ساز خیلی نازک)', amount: 400, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'bk-2', name: 'مغز پسته و بادام پودرشده ریز با هل', amount: 300, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'bk-3', name: 'کره حیوانی ذوب‌شده برای براش لایه‌ها', amount: 150, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'bk-4', name: 'شهد زعفرانی قوام‌آمده با گلاب', amount: 250, unit: 'ml', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'لایه‌چینی و کره زدن', instruction: 'نیمی از لایه‌های خمیر را چیده و بین هر لایه کره بمالید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'ریختن مغز پسته و هل', instruction: 'پودر پسته مخلوط با پودر قند و هل را یکنواخت پخش کرده و لایه‌های بعدی خمیر را روی آن بگذارید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'برش لوزی و پخت', instruction: 'برش لوزی زده و در فر ۱۸۰ درجه ۳۰ دقیقه بپزید، سپس شهد ولرم را روی باقلوای داغ بریزید.', durationMinutes: 30, hasTimer: true }
    ],
    goldenTips: [
      'شهد باید ولرم و باقلوا کاملاً داغ باشد تا شیرینی ترد بماند و خمیر نشود.'
    ]
  },

  // 20. قطاب سنتی یزد
  {
    id: 'ghottab-yazd',
    title: 'قطاب سنتی اصیل یزد با مغز گردو و پودر قند',
    persianSubtitle: 'خمیر ترد ماستی و هل‌دار پیچیده با دست و سرخ‌شده در روغن',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های سنتی ایران',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی باستانی یزد با پوسته ترد شکوفا شده در روغن، مغز خوش‌عطر پودر بادام و گردو با عطر هل و گلاب، غلتانده‌شده در پودر قند برفی.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 20,
    baseServings: 15,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 180,
    proteinGrams: 3,
    carbsGrams: 22,
    fatGrams: 9,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'nuts'],
    originRegion: 'یزد و کرمان',
    ingredients: [
      { id: 'qt-1', name: 'آرد سفید قنادی الک‌شده', amount: 250, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'qt-2', name: 'ماست پرچرب و زرده تخم‌مرغ', amount: 100, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'qt-3', name: 'مغز گردو و بادام پودرشده با هل', amount: 150, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'qt-4', name: 'پودر قند مرغوب برای کاور', amount: 100, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه خمیر قطاب', instruction: 'ماست، زرده و روغن را مخلوط کرده، آرد را کم‌کم اضافه کنید تا خمیر نرم و نچسب حاصل شود و ۱ ساعت استراحت دهید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'پیچیدن و کنگره زدن', instruction: 'دایره‌های کوچک باز کرده، ۱ قاشق مغز گردو بگذارید و لبه‌ها را با انگشت پیچ دهید (کنگره زدن).', durationMinutes: 20 },
      { stepNumber: 3, title: 'سرخ کردن و غلتاندن در پودر قند', instruction: 'در روغن با حرارت ملایم شناور سرخ کنید تا پف کند، پس از خنک شدن در پودر قند بغلتانید.', durationMinutes: 15 }
    ],
    goldenTips: [
      'قطاب‌ها را تا کاملاً خنک نشده‌اند در پودر قند نزنید چون بخار باعث خمیری شدن پودر قند می‌شود.'
    ]
  },

  // 21. گوش‌فیل ترد اصفهان
  {
    id: 'goosh-fil',
    title: 'گوش‌فیل ترد اصفهان با شربت بار زعفرانی',
    persianSubtitle: 'شیرینی پفکی بسیار ترد سنتی که با دوغ ترش و محلی سرو می‌شود',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های سنتی ایران',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی اصیل اصفهان با بافت فوق‌العاده پفکی و شیشه‌ای ترد که در شربت زعفران غوطه‌ور شده و به صورت سنتی همراه با دوغ محلی نعنایی میل می‌شود.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 15,
    baseServings: 8,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 210,
    proteinGrams: 3,
    carbsGrams: 32,
    fatGrams: 8,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg'],
    originRegion: 'اصفهان',
    ingredients: [
      { id: 'gf-1', name: 'زرده تخم‌مرغ و شیر ولرم', amount: 100, unit: 'g', category: 'dairy', allergens: ['lactose', 'egg'] },
      { id: 'gf-2', name: 'آرد سفید قنادی', amount: 200, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'gf-3', name: 'شهد زعفرانی قوام‌آمده با گلاب', amount: 200, unit: 'ml', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'خمیر گوش‌فیل', instruction: 'مواد را مخلوط کرده تا خمیر لطیفی به دست آید و ۳۰ دقیقه استراحت دهید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'پهن کردن به نازکی کاغذ', instruction: 'خمیر را بسیار نازک باز کنید، به شکل لوزی یا پاپیونی برش بزنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'سرخ کردن و شهدزدن', instruction: 'در روغن داغ سرخ کنید تا پف کند و بلافاصله ۲ دقیقه در شهد ولرم بیندازید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'روغن باید کاملاً داغ باشد تا خمیر بلافاصله پف کرده و متخلخل شود.'
    ]
  },

  // 22. زولبیا و بامیه ترد بازاری
  {
    id: 'zoolbia-bamieh',
    title: 'زولبیا و بامیه ترد بازاری ماه رمضان با شربت بار زعفرانی',
    persianSubtitle: 'زولبیای مشبک ترد با ماست و بامیه شیاردار توخالی با گلوکز',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های سنتی ایران',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی محبوب ماه مبارک رمضان با زولبیای طلایی مشبک بر پایه نشاسته و ماست و بامیه شیاردار خوش‌فرم با شهد براق گلوکزدار.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 10,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 260,
    proteinGrams: 3,
    carbsGrams: 45,
    fatGrams: 8,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'zb-1', name: 'نشاسته گل و ماست ترش برای زولبیا', amount: 150, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'zb-2', name: 'آرد قنادی و کره برای بامیه', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'zb-3', name: 'شهد غلیظ زعفرانی با گلوکز و گلاب', amount: 300, unit: 'ml', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'داغ‌زدن خمیر بامیه', instruction: 'آب و کره را به جوش آورده، آرد را ریخته و ۵ دقیقه تفت دهید تا خمیر جمع شود، بعد از خنکی تخم‌مرغ را اضافه کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'قیف زدن در روغن سرد', instruction: 'بامیه را با قیف ماسوره‌دار در روغن ولرم برش داده و با حرارت ملایم سرخ کنید تا طلایی و سفت شود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'انداختن در شهد گرم', instruction: 'بامیه‌های داغ را بلافاصله ۳ دقیقه در شهد با گلوکز بیندازید تا مغز آن پر از شیره شود.', durationMinutes: 5 }
    ],
    goldenTips: [
      'گلوکز در شهد مانع از شکرک زدن و کدر شدن زولبیا و بامیه می‌شود و ماندگاری تردی را تا چند روز حفظ می‌کند.'
    ]
  },

  // 23. شیرینی مشهدی (مربایی / آلمانی)
  {
    id: 'shirini-mashhadi',
    title: 'شیرینی مشهدی (مربایی آلمانی) با مارمالاد آلبالو',
    persianSubtitle: 'بیسکویت کره‌ای فوق‌العاده نرم قنادی با روکش عسل و پودر پسته',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی‌های سنتی ایران',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی بسیار پرطرفدار عید نوروز با خمیر بیسکویتی کره‌ای نرم که بین دو لایه آن مارمالاد براق آلبالو یا زردآلو قرار گرفته و روی آن با شکلات و خلال پسته تزیین می‌شود.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 12,
    baseServings: 15,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 170,
    proteinGrams: 2,
    carbsGrams: 24,
    fatGrams: 8,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg', 'nuts'],
    originRegion: 'مشهد و قنادی‌های ایران',
    ingredients: [
      { id: 'sm-1', name: 'آرد قنادی سبوس‌گرفته الک‌شده', amount: 300, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sm-2', name: 'کره یا روغن صاف قنادی', amount: 150, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'sm-3', name: 'پودر قند و زرده تخم‌مرغ و عسل', amount: 80, unit: 'g', category: 'sweetener', allergens: ['egg'] },
      { id: 'sm-4', name: 'مارمالاد آلبالو یا توت فرنگی غلیظ', amount: 120, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه خمیر کره‌ای نرم', instruction: 'کره و پودر قند را ۵ دقیقه هم بزنید تا پوک شود، زرده و عسل و سپس آرد را اضافه کنید تا خمیر یکدست شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'کاتر زدن و سوراخ کردن لایه بالایی', instruction: 'خمیر را به قطر ۲ میلی‌متر باز کرده، کاتر بزنید و وسط نیمی از بیسکویت‌ها را سوراخ کنید و در فر ۱۷۰ درجه ۱۰ دقیقه بپزید.', durationMinutes: 15, hasTimer: true },
      { stepNumber: 3, title: 'فیلینگ با مارمالاد', instruction: 'پس از خنک شدن بین هر دو لایه مارمالاد گذاشته و روی آن عسل رقیق و پسته بمالید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'یک قاشق عسل در خمیر شیرینی مشهدی راز نرمی و ماندگاری طولانی بافت آن بدون بیات شدن است.'
    ]
  },

  // 24. کیک یزدی اصیل سنتی
  {
    id: 'cake-yazdi',
    title: 'کیک یزدی اصیل با دانه هل، گلاب کاشان و کنجد بوداده',
    persianSubtitle: 'کاپ‌کیک سنتی با گنبد قله‌ای ترک‌دار بازاری و بافت اسفنجی سبک',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و قنادی',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description: 'کیک سنتی اصیل قنادی‌های یزد با بافت اسفنجی سبک و عطر مست‌کننده گلاب و پودر هل سبز، رویه گنبدی برشته و کنجد فراوان.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    baseServings: 12,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 190,
    proteinGrams: 4,
    carbsGrams: 28,
    fatGrams: 8,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose', 'egg'],
    originRegion: 'یزد',
    ingredients: [
      { id: 'cy-1', name: 'آرد سفید قنادی الک‌شده', amount: 250, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cy-2', name: 'تخم‌مرغ درشت هم‌دمای محیط', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'cy-3', name: 'شکر، ماست پرچرب و روغن مایع', amount: 150, unit: 'g', category: 'sweetener', allergens: ['lactose'] },
      { id: 'cy-4', name: 'گلاب ناب، پودر هل سبز و بکینگ‌پودر', amount: 30, unit: 'g', category: 'spice_seasoning' },
      { id: 'cy-5', name: 'دانه کنجد سفید بوداده', amount: 2, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن تخم‌مرغ و شکر', instruction: 'تخم‌مرغ‌ها و شکر را ۵ دقیقه بزنید تا کرم‌رنگ و حجیم شود، سپس ماست، روغن، گلاب و هل را اضافه کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'فولد آرد و ریختن در کپسول', instruction: 'آرد و بکینگ‌پودر الک‌شده را به آرامی فولد کنید و در قالب‌های کیک یزدی دوسوم کپسول را پر کنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'علامت چاقو روغنی و پخت', instruction: 'چاقو را در روغن مایع زده و وسط مایه علامت بعلاوه بزنید (راز قله‌ای شدن) و در فر داغ ۲۰۰ درجه ۱۵ دقیقه بپزید.', durationMinutes: 20, hasTimer: true, temperatureC: 200 }
    ],
    goldenTips: [
      'فرو بردن چاقوی چرب در مرکز مایه کیک قبل از پخت باعث می‌شود گازها از مرکز خارج شده و کیک گنبدی شکفته شود.'
    ]
  },

  // 25. دوغ گازدار محلی نعنایی با کاکوتی
  {
    id: 'doogh-sonnati',
    title: 'دوغ گازدار محلی با کاکوتی، نعناع کوهی و گل سرخ',
    persianSubtitle: 'نوشیدنی پروبیوتیک طبیعی گوارا با ماست محلی و پونه کوهی',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80',
    description: 'نوشیدنی سنتی و هاضمه‌بخش سفره ایرانی با ماست ترش چکیده، آب گازدار خنک، کاکوتی کوهی، نعناع، پونه و گلبرگ‌های معطر گل محمدی.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 65,
    proteinGrams: 4,
    carbsGrams: 5,
    fatGrams: 3,
    dietaryTags: ['vegetarian', 'low_calorie', 'keto'],
    isVegetarian: true,
    allergens: ['lactose'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'dg-1', name: 'ماست ترش محلی پرچرب', amount: 300, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'dg-2', name: 'آب گازدار (سودا) یا آب بسیار خنک', amount: 700, unit: 'ml', category: 'liquid' },
      { id: 'dg-3', name: 'نعناع خشک، کاکوتی کوهی و گل محمدی', amount: 15, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'میکس ماست و سبزیجات خشک', instruction: 'ماست، نمک و سبزیجات معطر را با همزن دستی ۱ دقیقه بزنید تا یکدست شود.', durationMinutes: 3 },
      { stepNumber: 2, title: 'افزودن آب گازدار و یخ', instruction: 'آب گازدار خنک را اضافه کرده، هم بزنید و با قطعات یخ در پارچ شیشه‌ای سرو کنید.', durationMinutes: 2 }
    ],
    goldenTips: [
      'ماست گوسفندی یا ماست محلی با طعم ترش ملایم بهترین کیفیت و طعم دوغ سنتی را ایجاد می‌کند.'
    ]
  },

  // 26. شربت بهارنارنج شیراز
  {
    id: 'sharbat-baharnarenj',
    title: 'شربت بهارنارنج شیراز با عرق بیدمشک و تخم شربتی',
    persianSubtitle: 'اکسیر آرامش‌بخش و معطر با عرق بهارنارنج اصل، لیمو و زعفران',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    description: 'شربت آرامش‌بخش شیرازی با عرق شکوفه بهارنارنج تقطیرشده، عرق بیدمشک، تخم شربتی ژله‌ای، آبلیموی تازه و یخ بلوری.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 110,
    proteinGrams: 1,
    carbsGrams: 26,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'شیراز و مازندران',
    ingredients: [
      { id: 'bn-1', name: 'عرق بهارنارنج دوآتشه اصل', amount: 200, unit: 'ml', category: 'liquid' },
      { id: 'bn-2', name: 'عرق بیدمشک یا گلاب', amount: 50, unit: 'ml', category: 'liquid' },
      { id: 'bn-3', name: 'شکر سفید یا شهد زعفران', amount: 150, unit: 'g', category: 'sweetener' },
      { id: 'bn-4', name: 'تخم شربتی خیسانده و لیمو ترش تازه', amount: 3, unit: 'tbsp', category: 'flour_grain' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی شربت پایه', instruction: 'شکر را در کمی آب جوش حل کنید تا زلال شود و بگذارید خنک شود.', durationMinutes: 5 },
      { stepNumber: 2, title: 'ترکیب عرقیات و سرو با یخ', instruction: 'عرق بهارنارنج، بیدمشک، آبلیموی تازه، تخم شربتی و یخ فراوان را مخلوط نمایید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'عرقیات گیاهی را نباید بجوشانید چون عطر و اسانس فرار آن‌ها با جوشیدن از بین می‌رود.'
    ]
  },

  // 27. شربت خاکشیر و آبلیموی یخ‌مال
  {
    id: 'sharbat-khakeshir-ablimoo',
    title: 'شربت خاکشیر و آبلیموی یخ‌مال با گلاب',
    persianSubtitle: 'نوشیدنی ضد عطش اصیل ایرانی با دانه‌های معلق خاکشیر ریگ‌شور',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80',
    description: 'معروف‌ترین نوشیدنی ضد گرمازدگی تاریخ ایران با دانه‌های ریز خاکشیر شسته‌شده، لیمو ترش شیرازی، شکر، گلاب و یخ خردشده.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 95,
    proteinGrams: 0,
    carbsGrams: 24,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'khk-1', name: 'خاکشیر پاک‌شده و ریگ‌شورشده', amount: 50, unit: 'g', category: 'flour_grain' },
      { id: 'khk-2', name: 'شکر سفید یا عسل طبیعی', amount: 120, unit: 'g', category: 'sweetener' },
      { id: 'khk-3', name: 'آبلیموی تازه و گلاب کاشان', amount: 4, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'ریگ‌شور کردن خاکشیر', instruction: 'خاکشیر را در چند کاسه آب دست‌به‌دست کنید تا خاک و ریگ‌های ته‌نشین‌شده کاملاً جدا شوند.', durationMinutes: 10 },
      { stepNumber: 2, title: 'ترکیب و سرو خنک', instruction: 'شهد حل‌شده، خاکشیر، آبلیمو، گلاب و یخ خردشده را هم زده و خنک بنوشید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'چند قطره زعفران دم‌کرده عطر و رنگ شربت خاکشیر را بی‌نهایت جذاب‌تر می‌کند.'
    ]
  },

  // 28. میرزاقاسمی اصیل گیلانی با بادمجان کبابی و سیر
  {
    id: 'mirza-ghasemi',
    title: 'میرزا قاسمی اصیل گیلانی با بادمجان کبابی دودی و سیر تازه',
    persianSubtitle: 'عطر دود ناب زغال با سیر داغ، گوجه‌فرنگی پخته و تخم‌مرغ محلی',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای محلی و سنتی',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین پیش‌غذا و خوراک گیلان؛ بادمجان‌های کباب‌شده روی زغال با عطر دودی فوق‌العاده، سیر فراوان، پوره گوجه‌فرنگی و تخم‌مرغ لطیف.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 210,
    proteinGrams: 9,
    carbsGrams: 14,
    fatGrams: 13,
    dietaryTags: ['vegetarian', 'low_calorie'],
    isVegetarian: true,
    allergens: ['egg'],
    originRegion: 'گیلان',
    ingredients: [
      { id: 'mg-1', name: 'بادمجان قلمی کبابی دودی ساطوری‌شده', amount: 5, unit: 'pcs', unitWeightInGrams: 160, category: 'vegetable' },
      { id: 'mg-2', name: 'گوجه‌فرنگی رسیده رنده‌شده', amount: 4, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' },
      { id: 'mg-3', name: 'سیر تازه شمالی کوبیده‌شده', amount: 1, unit: 'pcs', unitWeightInGrams: 40, category: 'vegetable' },
      { id: 'mg-4', name: 'تخم‌مرغ محلی', amount: 3, unit: 'pcs', unitWeightInGrams: 55, category: 'protein' },
      { id: 'mg-5', name: 'روغن، زردچوبه، نمک و فلفل سیاه', amount: 35, unit: 'g', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'کباب کردن بادمجان', instruction: 'بادمجان‌ها را روی زغال یا شعله مستقیم گاز کباب کنید تا پوست آن‌ها بسوزد، سپس پوست را کنده و گوشت آن را ساطوری ریز نمایید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'تفت دادن سیر و گوجه', instruction: 'سیر کوبیده را با زردچوبه در روغن تفت دهید تا عطر آن آزاد شود، سپس پوره گوجه را افزوده و تفت دهید تا آب آن کاملاً کشیده شود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'ترکیب بادمجان و تخم‌مرغ', instruction: 'بادمجان ساطوری را به تابه اضافه کرده و ۱۰ دقیقه تفت دهید. سپس تخم‌مرغ‌ها را وسط تابه شکسته و بعد از نیم‌بند شدن با بادمجان مخلوط نمایید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'کباب کردن بادمجان روی شعله مستقیم یا زغال راز اصلی عطر دودی میرزاقاسمی اصیل است؛ در فر عطر دودی شکل نمی‌گیرد.'
    ]
  },

  // 29. سالاد الویه اصیل مجلسی
  {
    id: 'salad-olovieh',
    title: 'سالاد الویه اصیل مجلسی مهمانی با مرغ و سس مخصوص',
    persianSubtitle: 'نوستالژی تمام جشن‌ها و دورهمی‌های ایرانی با بافت کرمی یکدست',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای محلی و سنتی',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    description: 'کلاسیک‌ترین سالاد و غذای سرد مهمانی‌های ایرانی با سینه مرغ پخته ریش‌ریش، سیب‌زمینی و تخم‌مرغ آبپز، خیارشور ترد نگینی و نخودفرنگی با سس کرمی لذیذ.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 50,
    baseServings: 6,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 380,
    proteinGrams: 22,
    carbsGrams: 28,
    fatGrams: 20,
    dietaryTags: ['high_protein'],
    allergens: ['egg', 'lactose'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'ol-1', name: 'سینه مرغ پخته و ریش‌ریش‌شده', amount: 400, unit: 'g', category: 'protein' },
      { id: 'ol-2', name: 'سیب‌زمینی پخته و رنده‌شده', amount: 4, unit: 'pcs', unitWeightInGrams: 150, category: 'vegetable' },
      { id: 'ol-3', name: 'تخم‌مرغ آبپز سفت رنده‌شده', amount: 3, unit: 'pcs', unitWeightInGrams: 55, category: 'protein' },
      { id: 'ol-4', name: 'خیارشور ترد نگینی بسیار ریز', amount: 200, unit: 'g', category: 'vegetable' },
      { id: 'ol-5', name: 'نخودفرنگی پخته و سس مایونز خانگی با آبلیمو', amount: 250, unit: 'g', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت و آماده‌سازی مواد', instruction: 'سیب‌زمینی و تخم‌مرغ‌ها را آبپز کرده و بعد از خنک شدن رنده ریز کنید. سینه مرغ را با پیاز و ادویه پخته و بسیار ریز ریش‌ریش نمایید.', durationMinutes: 45 },
      { stepNumber: 2, title: 'آبکشی خیارشور', instruction: 'خیارشورهای نگینی را در سبد ریخته و آب اضافی آن‌ها را بگیرید تا الویه بعد از چند ساعت آب نیندازد.', durationMinutes: 10 },
      { stepNumber: 3, title: 'ترکیب و سس‌زدن', instruction: 'تمام مواد را در کاسه بزرگی مخلوط کرده، ۲ قاشق آب مرغ صاف‌شده، سس مایونز، کمی ماست خامه‌ای و آبلیموی تازه را اضافه کرده و خوب هم بزنید. حداقل ۲ ساعت در یخچال استراحت دهید.', durationMinutes: 15 }
    ],
    goldenTips: [
      'اضافه کردن ۲ تا ۳ قاشق آب مرغ پخته غلیظ به مایه الویه باعث بافت مرطوب و لذیذ بدون نیاز به استفاده بیش از حد از سس مایونز می‌شود.'
    ]
  },

  // 30. کوفته تبریزی اصیل مجلسی
  {
    id: 'kofteh-tabrizi',
    title: 'کوفته تبریزی اصیل مجلسی مغزدار با سس زعفرانی غلیظ',
    persianSubtitle: 'شاهکار آشپزی آذربایجان؛ بدون وا رفتن با مغز آلو، گردو و زرشک',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=80',
    description: 'شناخته‌شده‌ترین کوفته ایران با گوشت بدون چربی کوبیده‌شده، لپه و برنج نیم‌پز، تره و مرزه تازه و مغز وسوسه‌انگیز شامل تخم‌مرغ کامل، آلو بخارا، مغز گردو و پیازداغ.',
    prepTimeMinutes: 50,
    cookTimeMinutes: 90,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'دشوار / حرفه‌ای',
    caloriesPerServing: 520,
    proteinGrams: 38,
    carbsGrams: 36,
    fatGrams: 24,
    dietaryTags: ['high_protein'],
    allergens: ['egg', 'nuts'],
    originRegion: 'آذربایجان شرقی (تبریز)',
    ingredients: [
      { id: 'kt-1', name: 'گوشت ران گوساله بدون چربی ۲ بار چرخ‌شده', amount: 500, unit: 'g', category: 'protein' },
      { id: 'kt-2', name: 'لپه پخته و نیم‌کوب‌شده', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'kt-3', name: 'برنج نیم‌پز و آبکش‌شده', amount: 100, unit: 'g', category: 'flour_grain' },
      { id: 'kt-4', name: 'سبزی کوفته (تره، مرزه، ترخون، جعفری، شوید)', amount: 120, unit: 'g', category: 'vegetable' },
      { id: 'kt-5', name: 'مغز میانی (تخم‌مرغ آبپز، گردو، آلوبخارا، زرشک و پیازداغ)', amount: 200, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'ورز دادن حیاتی گوشت', instruction: 'گوشت را با نمک، فلفل، زردچوبه و زعفران حداقل ۱۵ دقیقه کامل ورز دهید تا چسبندگی بسیار بالا و بافت کشسانی پیدا کند.', durationMinutes: 15 },
      { stepNumber: 2, title: 'فرم دادن و پر کردن مغز', instruction: 'لپه نیم‌کوب، برنج و سبزی را اضافه کرده و مجدد ورز دهید. گلوله‌ای بزرگ بردارید، وسط آن را گود کرده و مغز (تخم‌مرغ، آلو، گردو و پیازداغ) را بگذارید و محکم ببندید تا درزی نماند.', durationMinutes: 20 },
      { stepNumber: 3, title: 'پخت در سس جوشان بدون درب', instruction: 'کوفته‌ها را دانه‌دانه درون سس گوجه و زعفران در حال جوش ملایم بگذارید. در ۲۰ دقیقه اول درب قابلمه را نگذارید تا کوفته‌ها ترک نخورند و وا نروند.', durationMinutes: 70, hasTimer: true }
    ],
    goldenTips: [
      'گوشت کوفته باید کاملاً بدون چربی باشد و ۲۰ دقیقه اول پخت نباید در قابلمه را بست؛ این دو نکته تضمین صددرصدی وا نرفتن کوفته تبریزی است.'
    ]
  },

  // 31. ساندویچ سوسیس بندری تند بازاری
  {
    id: 'sandwich-bandari',
    title: 'ساندویچ سوسیس بندری تند و نوستالژیک بازاری با پیاز فراوان',
    persianSubtitle: 'عطر تند ادویه کاری، فلفل قرمز، رب گوجه تفت‌خورده و نان باگت',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین ساندویچ خیابانی ایران؛ ترکیب سوسیس اسلایسی سرخ‌شده، پیاز خلالی کاراملی فراوان، رب گوجه تفت‌داده با عطر کاری تند، خیارشور و نان بولکی یا باگت فرانسوی.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 440,
    proteinGrams: 16,
    carbsGrams: 42,
    fatGrams: 22,
    allergens: ['gluten'],
    originRegion: 'جنوب ایران و تهران',
    ingredients: [
      { id: 'sb-1', name: 'سوسیس باکیفیت حلقه‌ای اوریب', amount: 400, unit: 'g', category: 'protein' },
      { id: 'sb-2', name: 'پیاز سفید خلالی نازک', amount: 4, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' },
      { id: 'sb-3', name: 'رب گوجه‌فرنگی غلیظ تفت‌داده', amount: 3, unit: 'tbsp', category: 'liquid' },
      { id: 'sb-4a', name: 'ادویه کاری', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'sb-4b', name: 'فلفل قرمز تند', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'sb-4c', name: 'زردچوبه', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'sb-4d', name: 'نمک', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'sb-5', name: 'نان باگت یا بولکی با خیارشور و جعفری', amount: 4, unit: 'pcs', category: 'flour_grain' }
    ],
    steps: [
      { stepNumber: 1, title: 'سرخ کردن سوسیس', instruction: 'سوسیس‌ها را به صورت اریب برش داده و در کمی روغن تفت دهید تا تغییر رنگ دهند سپس از تابه خارج کنید.', durationMinutes: 8 },
      { stepNumber: 2, title: 'کاراملی کردن پیاز', instruction: 'پیازهای خلالی را با زردچوبه تفت دهید تا نرم و شفاف شوند ولی نسوزند. سپس رب گوجه و ادویه کاری تند را افزوده و ۳ دقیقه تفت دهید تا بوی خامی رب گرفته شود.', durationMinutes: 12 },
      { stepNumber: 3, title: 'ترکیب و ساندویچ‌کردن', instruction: 'سوسیس‌ها را به سس پیاز اضافه کرده، نصف فنجان آب جوش بریزید و ۵ دقیقه درب تابه را بگذارید تا سس به خورد سوسیس برود. داغ با نان باگت و خیارشور سرو نمایید.', durationMinutes: 7 }
    ],
    goldenTips: [
      'مقدار پیاز در بندری اصیل باید برابر یا بیشتر از سوسیس باشد؛ پیاز با تفت خوردن در رب طعم شیرین ملایمی در کنار تندی فلفل ایجاد می‌کند.'
    ]
  },

  // 32. ماکارونی دمی ایرانی با ته‌دیگ سیب‌زمینی
  {
    id: 'macaroni-irani',
    title: 'ماکارونی نوستالژیک ایرانی با مایه گوشت و ته‌دیگ سیب‌زمینی کنجدی',
    persianSubtitle: 'عطر رب گوجه، آویشن، فلفل دلمه‌ای و ته‌دیگ برشته طلایی',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای محلی و سنتی',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=800&auto=format&fit=crop&q=80',
    description: 'شاهکار غذاهای خانگی ایران؛ اسپاگتی دم‌کشیده با مایه پرگوشت و رب خوش‌رنگ، قارچ، فلفل دلمه‌ای معطر و ته‌دیگ سیب‌زمینی برشته کنجدی که دل هر ایرانی را می‌برد.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 560,
    proteinGrams: 28,
    carbsGrams: 68,
    fatGrams: 18,
    allergens: ['gluten'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'mi-1', name: 'اسپاگتی قطر ۱.۴ یا ۱.۵', amount: 400, unit: 'g', category: 'flour_grain' },
      { id: 'mi-2', name: 'گوشت چرخ‌کرده مخلوط', amount: 300, unit: 'g', category: 'protein' },
      { id: 'mi-3', name: 'پیاز نگینی، قارچ اسلایس و فلفل دلمه‌ای', amount: 250, unit: 'g', category: 'vegetable' },
      { id: 'mi-4', name: 'رب گوجه‌فرنگی و پودر آویشن', amount: 4, unit: 'tbsp', category: 'liquid' },
      { id: 'mi-5', name: 'سیب‌زمینی ورقه با کنجد برای ته‌دیگ', amount: 2, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه ماکارونی', instruction: 'پیاز را تفت دهید، گوشت چرخ‌کرده را اضافه کرده و سرخ کنید. رب گوجه، فلفل دلمه، قارچ، نمک، فلفل سیاه و آویشن را افزوده و با نصف لیوان آب اجازه دهید روغن بیندازد.', durationMinutes: 20 },
      { stepNumber: 2, title: 'آبکش کردن اسپاگتی', instruction: 'ماکارونی را در آب در حال جوش با نمک فراوان بجوشانید. وقتی مغز آن نرم شد ولی له نشد آبکش کرده و یک بار با آب ولرم بشویید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'چیدن ته‌دیگ و دم گذاشتن', instruction: 'کف قابلمه روغن داغ ریخته، کنجد بپاشید و ورقه‌های سیب‌زمینی را بچینید. ماکارونی و مایه را لایه‌لایه ریخته و ۴۰ دقیقه با شعله ملایم دم بگذارید.', durationMinutes: 40, hasTimer: true }
    ],
    goldenTips: [
      'یک قاشق چای‌خوری پودر آویشن به همراه زردچوبه در مایه گوشت، همان عطر نوستالژیک ماکارونی‌های مادرانه را به غذا می‌بخشد.'
    ]
  },

  // 33. چیکن استروگانف رستورانی
  {
    id: 'chicken-stroganoff',
    title: 'چیکن استروگانف رستورانی با فیله مرغ، سس قارچ و چیپس خلالی',
    persianSubtitle: 'بافت لطیف فیله در سس خامه و شیر غلیظ با ترشی ملایم خردل',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop&q=80',
    description: 'غذای بین‌المللی کاملاً بومی‌شده در کافه‌ها و رستوران‌های ایران؛ خلال‌های نواری فیله مرغ تفت‌خورده در کره، قارچ ورقه‌ای فراوان، سس بشامل خامه‌ای و تزیین با سیب‌زمینی خلالی برشته.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 490,
    proteinGrams: 36,
    carbsGrams: 26,
    fatGrams: 26,
    dietaryTags: ['high_protein'],
    allergens: ['lactose', 'gluten'],
    originRegion: 'تهران و رستوران‌های ایران',
    ingredients: [
      { id: 'cs-1', name: 'فیله یا سینه مرغ نواری باریک', amount: 500, unit: 'g', category: 'protein' },
      { id: 'cs-2', name: 'قارچ تازه ورقه‌شده اسلایس', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'cs-3', name: 'خامه صبحانه و شیر ولرم', amount: 200, unit: 'g', category: 'dairy' },
      { id: 'cs-4', name: 'آرد گندم و کره حیوانی', amount: 30, unit: 'g', category: 'dairy' },
      { id: 'cs-5', name: 'سیب‌زمینی سرخ‌کرده بسیار نازک خلالی (چیپسی)', amount: 150, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت سریع فیله مرغ', instruction: 'فیله‌های نواری را در تابه بسیار داغ با کره و فلفل سیاه تفت سریع دهید تا آب نیندازد و لطیف بماند سپس کنار بگذارید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'تفت قارچ و ساخت سس', instruction: 'قارچ‌ها را با کمی آبلیمو تفت دهید تا سیاه نشوند. سپس آرد را با کره تفت کوتاه داده، شیر را آرام اضافه کنید تا غلیظ شود و در آخر خامه را بیفزایید.', durationMinutes: 12 },
      { stepNumber: 3, title: 'ترکیب و سرو با چیپس', instruction: 'مرغ را به سس گرم اضافه کنید و ۲ دقیقه حرارت دهید. در ظرف کشیده و با تپه‌ای از سیب‌زمینی‌های خلالی ترد سرو نمایید.', durationMinutes: 8 }
    ],
    goldenTips: [
      'فیله مرغ را هرگز نباید بیش از حد تفت داد تا خشک نشود؛ چند قطره آبلیمو روی قارچ مانع از تیره شدن رنگ سس کرمی استروگانف می‌شود.'
    ]
  },

  // 34. سوپ جو با شیر و قارچ (سوپ سفید)
  {
    id: 'soup-jo-sefid',
    title: 'سوپ جو با شیر و قارچ (سوپ سفید مجلسی رستورانی)',
    persianSubtitle: 'سوپ خامه‌ای مخملی با جو پرک لعاب‌دار، هویج نگینی و آب مرغ تازه',
    category: 'iranian_local',
    categoryNameFa: 'غذاهای محلی و سنتی',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    description: 'شیک‌ترین پیش‌غذای تالارها و مهمانی‌های مجلسی ایران؛ سوپ سفید لطیف با جو پوست‌کنده یا پرک، قارچ ورقه‌ای تفت‌خورده در کره، شیر گرم، خامه و جعفری تازه.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 60,
    baseServings: 6,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 220,
    proteinGrams: 8,
    carbsGrams: 24,
    fatGrams: 10,
    dietaryTags: ['vegetarian'],
    allergens: ['lactose', 'gluten'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'sj-1', name: 'جو پوست‌کنده یا پرک پخته و لعاب‌انداخته', amount: 200, unit: 'g', category: 'flour_grain' },
      { id: 'sj-2', name: 'شیر تازه پرچرب ولرم', amount: 800, unit: 'ml', category: 'dairy' },
      { id: 'sj-3', name: 'قارچ اسلایس تفت‌خورده با کره', amount: 200, unit: 'g', category: 'vegetable' },
      { id: 'sj-4', name: 'هویج نگینی بسیار ریز و آب مرغ غلیظ', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'sj-5', name: 'خامه صبحانه و جعفری خردشده', amount: 60, unit: 'g', category: 'dairy' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت جو و هویج با آب مرغ', instruction: 'جو را با آب مرغ و هویج نگینی بپزید تا کاملاً شکفته شده و لعاب بیندازد.', durationMinutes: 40 },
      { stepNumber: 2, title: 'افزودن شیر گرم', instruction: 'شیر را حتماً گرم کرده و کم‌کم به سوپ اضافه کنید تا نبرد. سپس قارچ‌های تفت‌خورده در کره را اضافه نمایید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'خامه‌زدن در انتهای پخت', instruction: 'شعله را خاموش کرده، کمی از سوپ را با خامه رقیق کنید و به قابلمه برگردانید و با جعفری تزیین کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'شیر باید حتماً ولرم یا داغ باشد؛ اضافه کردن شیر سرد به سوپ داغ باعث بریده‌بریده شدن بافت سوپ می‌شود.'
    ]
  },

  // 35. کاچی سنتی زعفرانی
  {
    id: 'kachi-zaferani',
    title: 'کاچی سنتی زعفرانی با آرد برنج، روغن حیوانی و چهارمغز',
    persianSubtitle: 'معجون گرم و مقوی نیاکان ایران با نبات، هل، دارچین و گلاب کاشان',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop&q=80',
    description: 'دسر اصیل و دارویی فرهنگ غذایی ایران با طبع بسیار گرم؛ آرد برنج و گندم تفت‌خورده در روغن زرد حیوانی، شربت زعفران غلیظ با گلاب و هل و مغز گردو و پسته کوبیده.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 340,
    proteinGrams: 5,
    carbsGrams: 46,
    fatGrams: 16,
    dietaryTags: ['vegetarian'],
    allergens: ['lactose', 'nuts'],
    originRegion: 'کرمان و اصفهان',
    ingredients: [
      { id: 'kc-1', name: 'آرد گندم یا مخلوط آرد برنج و گندم', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'kc-2', name: 'روغن حیوانی اعلا یا کره محلی', amount: 100, unit: 'g', category: 'oil_fat' },
      { id: 'kc-3', name: 'نبات یا شکر با زعفران غلیظ دم‌کرده', amount: 180, unit: 'g', category: 'sweetener' },
      { id: 'kc-4', name: 'گلاب کاشان، پودر هل و چوب دارچین', amount: 50, unit: 'ml', category: 'liquid' },
      { id: 'kc-5', name: 'مغز گردو و خلال پسته و بادام', amount: 50, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی شربت کاچی', instruction: 'نبات یا شکر را با ۲ لیوان آب، زعفران، هل و گلاب بجوشانید تا حل شود ولی غلیظ نشود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'بو دادن آرد در روغن حیوانی', instruction: 'آرد را در روغن حیوانی با شعله ملایم تفت دهید تا بوی خامی آن گرفته و به رنگ طلایی روشن درآید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'افزودن شربت و دم کشیدن', instruction: 'شهد ولرم را آرام به آرد افزوده و سریع با همزن دستی هم بزنید تا گلوله نشود. ۱۰ دقیقه دم‌کنی بگذارید تا کاچی به روغن بیفتد.', durationMinutes: 10 }
    ],
    goldenTips: [
      'آرد کاچی نباید مثل حلوا تیره شود؛ رنگ کاچی اصیل باید زرد زعفرانی درخشان بماند.'
    ]
  },

  // 36. حلیم بادمجان اصیل اصفهان
  {
    id: 'halim-bademjan',
    title: 'حلیم بادمجان اصیل اصفهان با گوشت گردن و کشک سابیده',
    persianSubtitle: 'غذای فوق‌العاده کشدار سنتی با بادمجان سرخ‌شده، عدس، پیازداغ و نعناع',
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
    description: 'شاهکار غذاهای سنتی اصفهان و شیراز با بافت بی‌نهایت کشدار؛ ترکیب گوشت گردن گوسفندی کوبیده، بادمجان‌های سرخ‌شده، عدس، کشک محلی ترش و نعناداغ و گردو.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 120,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'دشوار / حرفه‌ای',
    caloriesPerServing: 480,
    proteinGrams: 32,
    carbsGrams: 30,
    fatGrams: 26,
    dietaryTags: ['high_protein'],
    allergens: ['lactose', 'nuts'],
    originRegion: 'اصفهان و شیراز',
    ingredients: [
      { id: 'hb-1', name: 'گوشت گردن یا سردست گوسفندی پخته و ریش‌شده', amount: 400, unit: 'g', category: 'protein' },
      { id: 'hb-2', name: 'بادمجان سرخ‌شده و کوبیده‌شده', amount: 5, unit: 'pcs', unitWeightInGrams: 150, category: 'vegetable' },
      { id: 'hb-3', name: 'عدس یا برنج پخته و کاملاً له‌شده', amount: 120, unit: 'g', category: 'flour_grain' },
      { id: 'hb-4', name: 'کشک سنتی غلیظ جوشانده‌شده', amount: 200, unit: 'g', category: 'dairy' },
      { id: 'hb-5', name: 'پیازداغ، سیرداغ، نعناداغ و گردوی نگینی', amount: 80, unit: 'g', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت گوشت با پیاز و زردچوبه', instruction: 'گوشت گردن را با پیاز و زردچوبه بپزید تا کاملاً نرم شود، سپس آن را ریش‌ریش کرده و با گوشت‌کوب بکوبید تا کش بیاید.', durationMinutes: 90 },
      { stepNumber: 2, title: 'کوبیدن بادمجان و عدس', instruction: 'بادمجان‌های سرخ‌شده را همراه عدس پخته خوب بکوبید و به گوشت کوبیده‌شده اضافه نمایید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'ترکیب کشک و جاافتادن', instruction: 'کشک، پیازداغ و سیرداغ را افزوده و با گوشت‌کوب برقی یا دستی مداوم بکوبید تا کشدار شود و ۲۰ دقیقه با شعله بسیار کم جا بیفتد.', durationMinutes: 25 }
    ],
    goldenTips: [
      'استفاده از گوشت گردن گوسفندی به دلیل بافت رشته‌ای و کوبیدن مدام با گوشت‌کوب دستی، عامل اصلی کشدار شدن حلیم بادمجان است.'
    ]
  },

  // 37. نان پنجره‌ای سنتی ترد
  {
    id: 'nan-panjerehi',
    title: 'نان پنجره‌ای سنتی ترد و طلایی با پودر قند و هل',
    persianSubtitle: 'شیرینی شادمانی‌های سنتی ایران با نشاسته گل، گلاب و قالب فلزی نقش‌دار',
    category: 'pastry_dry',
    categoryNameFa: 'شیرینی و قنادی',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description: 'شیرینی ظریف و بسیار خاطره‌انگیز ایرانی با بافت توری ترد و شکننده؛ تهیه شده از نشاسته گندم، گلاب، تخم‌مرغ و آرد با غوطه‌ور کردن قالب داغ در روغن و پاشیدن پودر قند هل‌دار.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    baseServings: 6,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 160,
    proteinGrams: 3,
    carbsGrams: 24,
    fatGrams: 6,
    dietaryTags: ['vegetarian'],
    allergens: ['egg', 'gluten'],
    originRegion: 'یزد و اصفهان',
    ingredients: [
      { id: 'np-1', name: 'نشاسته گل (گندم)', amount: 100, unit: 'g', category: 'flour_grain' },
      { id: 'np-2', name: 'گلاب ناب کاشان و شیر', amount: 120, unit: 'ml', category: 'liquid' },
      { id: 'np-3', name: 'تخم‌مرغ تازه', amount: 3, unit: 'pcs', unitWeightInGrams: 55, category: 'protein' },
      { id: 'np-4', name: 'آرد سفید قنادی الک‌شده', amount: 100, unit: 'g', category: 'flour_grain' },
      { id: 'np-5', name: 'پودر قند و پودر هل سابیده برای تزیین', amount: 80, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'حل کردن نشاسته در گلاب', instruction: 'نشاسته را در مخلوط گلاب و شیر حل کنید تا کاملاً یکدست شود بدون هیچ گلوله‌ای.', durationMinutes: 8 },
      { stepNumber: 2, title: 'افزودن تخم‌مرغ و آرد', instruction: 'تخم‌مرغ‌ها را یکی‌یکی اضافه کرده و هم بزنید، سپس آرد را ریخته و از صافی رد کنید تا مایه‌ای شبیه ماست رقیق به دست آید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'قالب زدن در روغن داغ', instruction: 'قالب مخصوص را در روغن داغ گرم کنید، تا لبه در مایه بزنید (روی قالب نرود) و در روغن تکان دهید تا شیرینی جدا شده و طلایی شود.', durationMinutes: 20 }
    ],
    goldenTips: [
      'قالب نباید بیش از حد داغ باشد که مایه روی آن ببندد و نه سرد باشد که مایه نچسبد؛ لبه بالای قالب نباید وارد مایه شود تا شیرینی به راحتی در روغن رها شود.'
    ]
  }
];
