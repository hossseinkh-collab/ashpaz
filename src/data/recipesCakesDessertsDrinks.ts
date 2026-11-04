import { Recipe } from '../types';

export const CAKES_DESSERTS_DRINKS_RECIPES: Recipe[] = [
  // 1. کیک شکلاتی خیس (Wet Chocolate Cake)
  {
    id: 'cake-chocolate-fudge',
    title: 'کیک شکلاتی خیس (فاج براونی) با سس گاناش براق',
    persianSubtitle: 'بافت مخملی شکلاتی مرطوب، با پودر کاکائو هلندی تیره و قهوه اسپرسو',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و شیرینی‌پزی',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    description: 'کیک شکلاتی خیس فوق‌العاده پرطرفدار کافی‌شاپی با سس شکلاتی مخصوص که پس از پخت داخل بافت داغ کیک تزریق می‌شود.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 40,
    baseServings: 8,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 390,
    proteinGrams: 6,
    carbsGrams: 52,
    fatGrams: 18,
    allergens: ['gluten', 'egg', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'cc-1', name: 'آرد سفید قنادی', amount: 250, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cc-2', name: 'پودر کاکائو مرغوب هلندی تلخ', amount: 60, unit: 'g', category: 'flour_grain' },
      { id: 'cc-3', name: 'شکر سفید دانه‌ریز', amount: 220, unit: 'g', category: 'sweetener' },
      { id: 'cc-4', name: 'تخم‌مرغ هم‌دمای محیط', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'cc-5', name: 'شیر پرچرب و روغن مایع', amount: 200, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'cc-6', name: 'سس شکلاتی خیس (شیر، شکر، کاکائو، شکلات تخته‌ای)', amount: 250, unit: 'ml', category: 'sweetener', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه کیک', instruction: 'تخم‌مرغ و شکر و وانیل را ۵ دقیقه با دور تند بزنید تا کشدار و کرم‌رنگ شود، شیر و روغن را اضافه کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پخت در فر ۱۷۵ درجه', instruction: 'آرد و پودر کاکائو و بکینگ‌پودر الک‌شده را به آرامی فولد کرده و ۴۰ دقیقه در فر ۱۷۵ درجه بپزید.', durationMinutes: 40, hasTimer: true, temperatureC: 175 },
      { stepNumber: 3, title: 'سوراخ کردن و تزریق سس گرم', instruction: 'کیک داغ را با خلال چوبی سوراخ کرده و سس شکلاتی ولرم را روی آن بریزید تا کامل جذب شود.', durationMinutes: 10 }
    ],
    goldenTips: [
      'یک قاشق چای‌خوری قهوه اسپرسو فوری طعم شکلات را دو برابر عمیق‌تر و لذیذتر می‌کند.'
    ]
  },

  // 2. کیک شیفون وانیلی نرم و سبک پایه تولد
  {
    id: 'cake-chiffon-vanilla',
    title: 'کیک شیفون وانیلی پایه‌ای نرم و ابرمانند برای خامه‌کشی',
    persianSubtitle: 'بافت اسفنجی الاستیک بدون خشک شدن در یخچال، مناسب کیک تولد',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و شیرینی‌پزی',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    description: 'کیک شیفون حرفه‌ای قنادی با زرده و روغن مایع، مرنگ سفت سفیده تخم‌مرغ و قابلیت نگهداری وزن خامه بدون فشرده شدن.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    baseServings: 10,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 280,
    proteinGrams: 6,
    carbsGrams: 38,
    fatGrams: 11,
    allergens: ['gluten', 'egg', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'ch-1', name: 'آرد قنادی سه بار الک‌شده', amount: 200, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'ch-2', name: 'تخم‌مرغ درشت زرده و سفیده جدا', amount: 5, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'ch-3', name: 'شکر سفید (تقسیم بین زرده و سفیده)', amount: 160, unit: 'g', category: 'sweetener' },
      { id: 'ch-4a', name: 'روغن مایع پخت‌وپز', amount: 60, unit: 'ml', category: 'oil_fat' },
      { id: 'ch-4b', name: 'شیر ولرم', amount: 60, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'ch-5', name: 'کرم تارتار یا آبلیمو تازه', amount: 0.5, unit: 'tsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'فرم دادن مرنگ سفیده', instruction: 'سفیده را با کرم تارتار و نیمی از شکر بزنید تا قله‌های تیز (Stiff Peaks) تشکیل شود و از کاسه نریزد.', durationMinutes: 10 },
      { stepNumber: 2, title: 'مخلوط زرده و روغن', instruction: 'زرده را با باقیمانده شکر، روغن، شیر و آرد مخلوط کنید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'فولد کردن دورانی و پخت', instruction: 'سفیده را در ۳ مرحله با لیسک دورانی به زرده فولد کنید. در فر ۱۶۰ درجه ۴۵ دقیقه بپزید و قالب را وارونه خنک کنید.', durationMinutes: 45, hasTimer: true, temperatureC: 160 }
    ],
    goldenTips: [
      'قالب کیک شیفون را هرگز چرب نکنید تا مایه بتواند از دیواره بالا برود و پف کند.'
    ]
  },

  // 3. کیک ردولوت مخملی با کرم پنیر
  {
    id: 'cake-red-velvet',
    title: 'کیک ردولوت (مخمل قرمز) اصیل با کرم پنیر خامه‌ای',
    persianSubtitle: 'رنگ یاقوتی مخملی با عطر باترمیلک و سرکه سفید و کاکائو',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و شیرینی‌پزی',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80',
    description: 'کیک رمانتیک آمریکایی با بافت لطیف مخملی حاصل از واکنش سرکه با جوش شیرین، باترمیلک تازه و فیلینگ پنیر ماسکارپونه.',
    prepTimeMinutes: 35,
    cookTimeMinutes: 35,
    baseServings: 10,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 370,
    proteinGrams: 5,
    carbsGrams: 46,
    fatGrams: 19,
    allergens: ['gluten', 'egg', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'rv-1', name: 'آرد سفید قنادی', amount: 260, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'rv-2', name: 'باترمیلک خانگی (شیر + ۱ قاشق سرکه)', amount: 240, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'rv-3', name: 'شکر و کره نرم', amount: 200, unit: 'g', category: 'sweetener' },
      { id: 'rv-4', name: 'پودر کاکائو و رنگ خوراکی قرمز ژله‌ای', amount: 20, unit: 'g', category: 'flour_grain' },
      { id: 'rv-5', name: 'کرم چیز (پنیر خامه‌ای ویلی + کره + پودر قند)', amount: 350, unit: 'g', category: 'dairy', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه مایه قرمز مخملی', instruction: 'کره و شکر را زده، تخم‌مرغ‌ها را افزوده، باترمیلک قرمز را با آرد به تناوب بیفزایید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'واکنش سرکه و جوش شیرین', instruction: 'در آخرین لحظه سرکه را با جوش شیرین ترکیب کرده تا کف کند و به مایه اضافه نمایید و فوری در قالب بریزید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'پخت و فیلینگ کرم چیز', instruction: 'در فر ۱۷۵ درجه ۳۵ دقیقه پخته، برش زده و با کرم پنیر لطیف لایه‌چینی کنید.', durationMinutes: 35, hasTimer: true, temperatureC: 175 }
    ],
    goldenTips: [
      'باترمیلک راز نرمی فوق‌العاده و اسیدیته ملایم بافت ردولوت است.'
    ]
  },

  // 4. کیک عصرانه هل و گلاب و زعفران
  {
    id: 'cake-asreaneh-zaferani',
    title: 'کیک عصرانه سنتی زعفرانی با هل، گلاب و کنجد',
    persianSubtitle: 'عطر بی‌نظیر نذری و چای عصرگاهی با بافت پنبه‌ای طلایی',
    category: 'cake_bakery',
    categoryNameFa: 'کیک و شیرینی‌پزی',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description: 'کیک خانگی پرطرفدار ایرانی با عطر مست‌کننده زعفران سرگل، گلاب اعلای کاشان، هل ساییده و روکش کنجد بوداده.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    baseServings: 8,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 290,
    proteinGrams: 5,
    carbsGrams: 42,
    fatGrams: 11,
    allergens: ['gluten', 'egg', 'lactose', 'sesame'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'kz-1', name: 'آرد سفید قنادی', amount: 280, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'kz-2', name: 'شکر سفید', amount: 180, unit: 'g', category: 'sweetener' },
      { id: 'kz-3', name: 'تخم‌مرغ تازه', amount: 3, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'kz-4', name: 'ماست شیرین پرچرب یا شیر', amount: 120, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'kz-5', name: 'زعفران دم‌کرده غلیظ و گلاب اعلا', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kz-6', name: 'پودر هل سبز و کنجد بوداده', amount: 20, unit: 'g', category: 'spice_seasoning', allergens: ['sesame'] }
    ],
    steps: [
      { stepNumber: 1, title: 'زدن تخم‌مرغ با هل و شکر', instruction: 'تخم‌مرغ‌ها را با شکر و هل سبز به مدت ۶ دقیقه بزنید تا کشدار و کرمی شود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'افزودن زعفران و گلاب', instruction: 'روغن، ماست، زعفران دم‌کرده و گلاب را اضافه کرده و هم بزنید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'کنجدپاشی و پخت', instruction: 'آرد و بکینگ‌پودر را الک کرده و مخلوط کنید. قالب را چرب کرده، کنجد بپاشید و در فر ۱۸۰ درجه ۴۰ دقیقه بپزید.', durationMinutes: 40, hasTimer: true, temperatureC: 180 }
    ],
    goldenTips: [
      'استفاده از ماست به جای شیر بافت این کیک را به مراتب مرطوب‌تر و پرحجم‌تر می‌کند.'
    ]
  },

  // 5. حلوا زعفرانی مجلسی کشدار با قیف
  {
    id: 'halva-zaferani',
    title: 'حلوا زعفرانی مجلسی کشدار با آرد گندم و کره حیوانی',
    persianSubtitle: 'قابلیت بی‌نظیر ماسوره زدن گل رز با عطر هل و گلاب کاشان',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و شیرینی سنتی',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop&q=80',
    description: 'حلوای اصیل ایرانی مجلسی با بو دادن ملایم آرد سبوس‌دار، شربت قوام‌آمده زعفران و روغن حیوانی با بافت نرم و لطیف.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    baseServings: 10,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 310,
    proteinGrams: 4,
    carbsGrams: 45,
    fatGrams: 14,
    allergens: ['gluten', 'lactose'],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'hl-1', name: 'آرد گندم سبوس‌دار یا سنگک', amount: 300, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'hl-2', name: 'روغن حیوانی یا کره و روغن مایع', amount: 200, unit: 'ml', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'hl-3', name: 'شکر سفید برای شربت', amount: 250, unit: 'g', category: 'sweetener' },
      { id: 'hl-4', name: 'گلاب دو آتیشه و هل و زعفران دم‌کرده', amount: 150, unit: 'ml', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت دادن آرد', instruction: 'آرد را بدون روغن با شعله بسیار ملایم ۳۰ دقیقه تفت دهید تا بوی خامی آن گرفته و کرم‌رنگ شود، سپس الک کنید.', durationMinutes: 30 },
      { stepNumber: 2, title: 'افزودن روغن و شهد', instruction: 'روغن را اضافه کرده و تفت دهید. شهد داغ زعفرانی را در دو مرحله ریخته و سریع هم بزنید تا حلوا جمع شود.', durationMinutes: 10 },
      { stepNumber: 3, title: 'گهواره کردن حلوا', instruction: 'قابلمه را به طرفین تکان دهید (گهواره کردن) تا حلوا به روغن بیفتد و براق شود.', durationMinutes: 5 }
    ],
    goldenTips: [
      'شهد حلوا نباید بجوشد و قوام مربا بگیرد، همین که شکر در آب و گلاب حل شود کافی است.'
    ]
  },

  // 6. رنگینک بوشهری سنتی با خرما و گردو
  {
    id: 'ranginak-booshehri',
    title: 'رنگینک مجلسی اصیل بوشهری با خرما و دارچین',
    persianSubtitle: 'خرمای فشرده مغزدار گردو با آرد طلایی بو داده در کره و پودر پسته',
    category: 'dessert_icecream',
    categoryNameFa: 'دسرها و شیرینی سنتی',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    description: 'دسر سنتی جنوب ایران بسیار مقوی و اعیانی با رطب کبکاب تازه، مغز گردو، آرد تفت‌داده شده در کره محلی و پودر هل و دارچین.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    baseServings: 8,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 320,
    proteinGrams: 4,
    carbsGrams: 48,
    fatGrams: 14,
    allergens: ['gluten', 'lactose', 'nuts'],
    originRegion: 'بوشهر و خوزستان',
    ingredients: [
      { id: 'rg-1', name: 'رطب یا خرمای نرم هسته‌گرفته', amount: 400, unit: 'g', category: 'sweetener' },
      { id: 'rg-2', name: 'مغز گردوی تازه', amount: 120, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'rg-3', name: 'آرد گندم سبوس‌دار تفت‌خورده', amount: 200, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'rg-4', name: 'کره حیوانی ذوب‌شده', amount: 150, unit: 'g', category: 'oil_fat', allergens: ['lactose'] },
      { id: 'rg-5', name: 'پودر هل سبز، دارچین و پودر پسته', amount: 30, unit: 'g', category: 'spice_seasoning', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'هسته‌گیری و مغزگذاری خرما', instruction: 'هسته خرما را درآورده و درون هر خرما نصف مغز گردو قرار دهید و در ظرف فشرده کنار هم بچینید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'تفت آرد با کره', instruction: 'آرد را تفت دهید تا طلایی شود، کره را اضافه کنید تا سس روان و خوش‌عطری شود، هل و دارچین را اضافه کنید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'پوشاندن خرماها و تزئین', instruction: 'مایه داغ آرد و کره را روی خرماها بریزید تا کامل پوشانده شوند. با پودر قند و پسته تزئین و خنک سرو کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'استفاده از رطب نرم دشتستان بهترین کیفیت و نرمی را به رنگینک می‌دهد.'
    ]
  },

  // 7. معجون و شیرپسته مخصوص ویتامینه
  {
    id: 'majoon-shirpesteh',
    title: 'معجون شیرپسته غلیظ ویتامینه بازاری با بستنی سنتی',
    persianSubtitle: 'پسته تازه قزوینی با شیر پرچرب سرد، بستنی زعفرانی، عسل و خامه',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80',
    description: 'نوشیدنی انرژی‌بخش سنتی با پودر پسته فراوان، بستنی سنتی خامه‌دار، موز، عسل طبیعی و ثعلب با غلظت کشدار.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 480,
    proteinGrams: 14,
    carbsGrams: 58,
    fatGrams: 22,
    allergens: ['lactose', 'nuts'],
    originRegion: 'تهران و سراسر ایران',
    ingredients: [
      { id: 'mp-1', name: 'مغز پسته خام اعلا', amount: 80, unit: 'g', category: 'sweetener', allergens: ['nuts'] },
      { id: 'mp-2', name: 'شیر محلی پرچرب بسیار سرد', amount: 300, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'mp-3', name: 'بستنی سنتی زعفرانی اعلا', amount: 200, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'mp-4', name: 'موز یخ‌زده اسلایس', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'mp-5', name: 'عسل طبیعی و گلاب اعلا', amount: 2, unit: 'tbsp', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'میکس در بلندر قدرتمند', instruction: 'پسته، شیر سرد، موز یخ‌زده، عسل و گلاب را در مخلوط‌کن با دور تند بزنید تا پسته خرد شود.', durationMinutes: 3 },
      { stepNumber: 2, title: 'افزودن بستنی', instruction: 'بستنی سنتی را اضافه کرده و فقط چند پالس کوتاه بزنید تا غلظت حفظ شود. در لیوان کشیده و روی آن خلال پسته فراوان بریزید.', durationMinutes: 2 }
    ],
    goldenTips: [
      'شیر باید نزدیک به نقطه انجماد (تگری) باشد تا معجون شل نشود.'
    ]
  },

  // 8. شربت سکنجبین و خیار سنتی
  {
    id: 'sharbat-sekanjebin-khiar',
    title: 'شربت سکنجبین و خیار سنتی با نعناع تازه و لیمو',
    persianSubtitle: 'اکسیر خنک‌کننده ضد عطش تابستان با عسل و سرکه طبیعی',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    description: 'شربت گوارای اصیل ایرانی با شربت سکنجبین پخته‌شده با نعنای تازه، خیار بوته‌ای رنده‌شده و قطعات یخ شفاف.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 120,
    proteinGrams: 1,
    carbsGrams: 30,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'low_calorie'],
    allergens: [],
    originRegion: 'اصفهان و شیراز',
    ingredients: [
      { id: 'sk-1', name: 'شکر سفید یا عسل طبیعی', amount: 250, unit: 'g', category: 'sweetener' },
      { id: 'sk-2', name: 'سرکه انگور طبیعی سفید', amount: 50, unit: 'ml', category: 'liquid' },
      { id: 'sk-3', name: 'دسته نعناع تازه شسته', amount: 100, unit: 'g', category: 'vegetable' },
      { id: 'sk-4', name: 'خیار بوته‌ای قلمی رنده‌شده ریز', amount: 2, unit: 'pcs', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت شربت سکنجبین', instruction: 'شکر و آب را بجوشانید، نعناع را با نخ بسته درون آن بگذارید تا عطر دهد، در انتها سرکه را اضافه و پس از چند جوش خاموش کنید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'سرو با خیار و یخ', instruction: 'در هر لیوان ۲ قاشق شربت خنک ریخته، خیار رنده‌شده و آب خنک و یخ بریزید و هم بزنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'خیار را با پوست رنده ریز کنید تا عطر خیار تازه مستقیماً وارد شربت شود.'
    ]
  },

  // 9. شربت زعفران و گلاب نذری با تخم شربتی
  {
    id: 'sharbat-zaferan-tokhmeshirbatee',
    title: 'شربت زعفران و گلاب نذری با تخم شربتی و خاکشیر',
    persianSubtitle: 'نوشیدنی شاهانه سنتی با زعفران اعلا، گلاب کاشان و هل',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80',
    description: 'شربت طلایی باشکوه نذری و مجلسی با زعفران قائنات دم‌کرده، گلاب ناب، تخم شربتی خیسانده ژله‌ای و یخ.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 110,
    proteinGrams: 1,
    carbsGrams: 28,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'low_calorie'],
    allergens: [],
    originRegion: 'سرتاسر ایران',
    ingredients: [
      { id: 'sz-1', name: 'زعفران دم‌کرده غلیظ با یخ', amount: 3, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'sz-2', name: 'گلاب اعلای دوآتشه', amount: 4, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'sz-3', name: 'تخم شربتی خیس‌خورده و حجیم‌شده', amount: 3, unit: 'tbsp', category: 'flour_grain' },
      { id: 'sz-4', name: 'شکر یا نبات حل‌شده', amount: 150, unit: 'g', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه شهد زعفرانی', instruction: 'شکر را در آب جوش حل کرده، زعفران غلیظ و گلاب را اضافه کرده و بگذارید در یخچال کاملاً خنک شود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'ترکیب با تخم شربتی', instruction: 'تخم شربتی را شسته تا ژله‌ای شود، به شهد اضافه کرده و با یخ سرو نمایید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'دم کردن زعفران با یخ رنگ نارنجی یاقوتی شفاف و بی‌نظیری در شربت ایجاد می‌کند.'
    ]
  },

  // 10. موهیتو طبیعی خنک بدون الکل
  {
    id: 'mojito-classic-virgin',
    title: 'موهیتو دست‌ساز خنک با لیمو ترش تازه، نعنا و سودا',
    persianSubtitle: 'کوبیدن لیمو و برگ نعنا تازه با شربت شکر و آب گازدار یخ‌زده',
    category: 'drinks_beverages',
    categoryNameFa: 'دسرها و نوشیدنی‌ها',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=80',
    description: 'نوشیدنی بین‌المللی با برگ‌های تازه نعنای کوبیده‌شده با لیمو سنگی، شربت شکر، سودای گازدار خنک و یخ فراوان.',
    prepTimeMinutes: 8,
    cookTimeMinutes: 0,
    baseServings: 1,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 85,
    proteinGrams: 0,
    carbsGrams: 22,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'low_calorie'],
    allergens: [],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'mj-1', name: 'لیمو ترش تازه چهارقاچ', amount: 1, unit: 'pcs', category: 'vegetable' },
      { id: 'mj-2', name: 'برگ نعناع تازه و باطراوت', amount: 12, unit: 'pcs', category: 'vegetable' },
      { id: 'mj-3', name: 'سیروپ شکر ساده', amount: 2, unit: 'tbsp', category: 'sweetener' },
      { id: 'mj-4', name: 'آب گازدار (سودا) یا اسپرایت بسیار خنک', amount: 200, unit: 'ml', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'کوبیدن ملایم (Muddle)', instruction: 'لیمو و نعنا و شربت را ته لیوان با هاون چوبی فشار ملایم دهید تا اسانس پوست لیمو و عطر نعنا آزاد شود (له نکنید تا تلخ نشود).', durationMinutes: 2 },
      { stepNumber: 2, title: 'یخ خردشده و سودا', instruction: 'لیوان را از یخ خردشده پر کرده و سودای گازدار ریخته و به آرامی هم بزنید.', durationMinutes: 2 }
    ],
    goldenTips: [
      'نعنا را له و پاره نکنید؛ فقط فشار ملایم دهید تا عطر روغن نعناع آزاد شود بدون اینکه تلخ شود.'
    ]
  },

  // 11. کیک شربتی (باقلوایی) اصیل سنتی قزوین و شیراز
  {
    id: 'cake-zaferani-sharbati',
    title: 'کیک شربتی (باقلوایی) اصیل سنتی با هل، گلاب کاشان و شهد زعفرانی',
    persianSubtitle: 'کیک لوزی برش‌خورده عصرانه با مغز بادام، بافت مرطوب شربتی و پودر پسته فراوان',
    canonical_name: 'کیک شربتی',
    alternate_names: ['کیک باقلوایی', 'کیک باقلوا زعفرانی'],
    category: 'cake_bakery',
    categoryNameFa: 'کیک، شیفون و عصرانه',
    originProvince: 'قزوین',
    originRegion: 'قزوین، یزد و شیراز',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    description: 'کیک باقلوایی سنتی بسیار پرطرفدار با پخت طلایی، برش‌های لوزی اصیل، شهد غلیظ جوشانده زعفران و گلاب و تزیین لوکس با پودر پسته و خلال بادام.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    baseServings: 12,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 280,
    proteinGrams: 5,
    carbsGrams: 42,
    fatGrams: 10,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'egg', 'lactose', 'nuts'],
    ingredients: [
      { id: 'cs-1', name: 'آرد سفید قنادی الک‌شده سه باره', amount: 250, unit: 'g', approxCostPer100g: 5000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cs-2', name: 'تخم‌مرغ درشت هم‌دمای محیط', amount: 4, unit: 'pcs', unitWeightInGrams: 60, category: 'protein', allergens: ['egg'] },
      { id: 'cs-3', name: 'ماست شیرین پرچرب هم‌زده', amount: 150, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'cs-4', name: 'روغن مایع خوراکی', amount: 120, unit: 'ml', category: 'oil_fat' },
      { id: 'cs-5', name: 'پودر هل سبز اعلا', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'cs-6', name: 'شهد غلیظ زعفرانی (شکر، آب، گلاب و زعفران)', amount: 250, unit: 'ml', category: 'sweetener' },
      { id: 'cs-7', name: 'پودر پسته و پودر نارگیل برای تزیین لوزی‌ها', amount: 40, unit: 'g', category: 'sweetener', allergens: ['nuts'] }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی شهد زعفرانی', instruction: 'شکر، آب، زعفران و هل را ۵ دقیقه بجوشانید، در آخر گلاب را اضافه کرده و بگذارید کاملاً خنک شود (شهد باید ولرم رو به سرد باشد).', durationMinutes: 10 },
      { stepNumber: 2, title: 'زدن مایه کیک و پخت', instruction: 'تخم‌مرغ و شکر و هل را بزنید تا کرمی شود، ماست و روغن را اضافه کنید و سپس آرد و بکینگ‌پودر را بیفزایید. در قالب مستطیل در فر ۱۸۰ درجه ۳۰ دقیقه بپزید.', durationMinutes: 30, hasTimer: true, temperatureC: 180 },
      { stepNumber: 3, title: 'برش لوزی و ریختن شهد', instruction: 'کیک را پس از پخت به شکل لوزی برش دهید، شهد خنک را آرام‌آرام روی کیک گرم بریزید تا جذب شود و روی هر لوزی پودر پسته بپاشید.', durationMinutes: 15 }
    ],
    goldenTips: [
      'قانون طلایی کیک شربتی: کیک گرم و شربت خنک؛ اگر هر دو داغ باشند کیک خمیر می‌شود و اگر هر دو سرد باشند شربت جذب نمی‌شود.'
    ]
  }
];
