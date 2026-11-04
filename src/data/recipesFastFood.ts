import { Recipe } from '../types';

export const FAST_FOOD_RECIPES: Recipe[] = [
  // 1. چیزبرگر کلاسیک با پنیر چدار آب‌شده
  {
    id: 'cheeseburger-classic',
    title: 'چیزبرگر کلاسیک دست‌ساز با پنir چدار و نان بریوش',
    persianSubtitle: 'گوشت ۸۰/۲۰ چرخ‌کرده قلوه‌گاه و گردن با پیاز کاراملی و سس مخصوص',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    description: 'برگر آبدار با گوشت خالص تازه، پنیر چدار زرد آب‌شده روی گریل، خیارشور ترد، گوجه، کاهو و نان بریوش کره‌ای تست‌شده.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 680,
    proteinGrams: 42,
    carbsGrams: 48,
    fatGrams: 36,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'cb-1', name: 'گوشت تازه گوساله و گوسفندی (نسبت ۸۰ به ۲۰)', amount: 320, unit: 'g', category: 'protein' },
      { id: 'cb-2', name: 'پنیر چدار ورقه‌ای مرغوب', amount: 4, unit: 'pcs', category: 'dairy', allergens: ['lactose'] },
      { id: 'cb-3', name: 'نان همبرگر بریوش کره‌ای', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cb-4', name: 'سس برگر (مایونز، خردل، سس کچاپ، رلیش خیارشور)', amount: 40, unit: 'g', category: 'oil_fat' },
      { id: 'cb-5a', name: 'خیارشور اسلایس', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'cb-5b', name: 'گوجه‌فرنگی اسلایس', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'cb-5c', name: 'کاهو پیچ', amount: 50, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'فرم‌دهی پتی بدون ورز دادن زیاد', instruction: 'گوشت را به دو چانه ۱۶۰ گرمی تقسیم کنید. فقط به آرامی فرم دایره‌ای داده و وسط آن را با انگشت کمی گود کنید تا موقع پخت پف نکند.', durationMinutes: 5 },
      { stepNumber: 2, title: 'گریل کردن گوشت', instruction: 'تابه چدنی را به شدت داغ کنید. پتی را بدون روغن انداخته، نمک و فلفل سیاه تازه بپاشید و ۳ دقیقه هر طرف بپزید. ورقه چدار را گذاشته و ۱ دقیقه درب بگذارید تا ذوب شود.', durationMinutes: 7 },
      { stepNumber: 3, title: 'تست نان و اسمبل', instruction: 'نان را با کره تست کرده، سس مالیده و کاهو، گوجه، برگر پنیری و خیارشور را بچینید.', durationMinutes: 3 }
    ],
    goldenTips: [
      'گوشت برگر را هرگز ورز ندهید تا بافت آن مانند کباب کوبیده فشرده نشود؛ چربی ۲۰٪ راز آبدار بودن برگر است.'
    ]
  },

  // 2. اسماش‌برگر دوبل کرانچی
  {
    id: 'smash-burger-double',
    title: 'اسماش‌برگر دوبل لبه کرانچی با پنیر چدار دوبل',
    persianSubtitle: 'تکنیک پرس حرارتی قوی روی چدن داغ با پوسته کاراملی مایلارد',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    description: 'سبک برگر محبوب آمریکایی که گوشت روی تابه داغ به شدت پرس و نازک می‌شود تا لبه‌های قهوه‌ای برشته و مغز آبدار داشته باشد.',
    prepTimeMinutes: 15,
    cookTimeMinutes: 6,
    baseServings: 1,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 720,
    proteinGrams: 46,
    carbsGrams: 42,
    fatGrams: 42,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'آمریکا',
    ingredients: [
      { id: 'sb-1', name: 'گلوله گوشت چرخ‌کرده پرچربی سرد', amount: 2, unit: 'pcs', unitWeightInGrams: 80, category: 'protein' },
      { id: 'sb-2', name: 'پنیر چدار ورقه‌ای آمریکایی', amount: 2, unit: 'pcs', category: 'dairy', allergens: ['lactose'] },
      { id: 'sb-3', name: 'نان همبرگر گرد نرم', amount: 1, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sb-4', name: 'پیاز سفید خیلی نازک خلالی', amount: 50, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'اسمش و پرس شدید', instruction: 'گلوله گوشت را روی تابه چدنی فوق‌العاده داغ گذاشته، با کاردک سنگین محکم فشار دهید تا کاملاً نازک شود.', durationMinutes: 2 },
      { stepNumber: 2, title: 'برگرداندن و پنیر', instruction: 'وقتی لبه‌ها قهوه‌ای و سوخته شدند، با کاردک تیز بتراشید و برگردانید. بلافاصله پنیر را گذاشته و روی هم سوار کنید.', durationMinutes: 2 }
    ],
    goldenTips: [
      'چدن باید قبل از انداختن گوشت کاملاً دود کند تا واکنش مایلارد (پوسته برشته کرانچی) شکل بگیرد.'
    ]
  },

  // 3. ساندویچ مرغ گریل با سس خردل و قارچ
  {
    id: 'chicken-sandwich-grilled',
    title: 'ساندویچ فیله مرغ گریل با قارچ و سس خردل دیژون',
    persianSubtitle: 'غذای رژیمی سالم ورزشکاری با نان جو یا چاباتا و پنیر موزارلا کم‌چرب',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80',
    description: 'ساندویچ سبک و سرشار از پروتئین با فیله مرغ خوابانده در رزماری و لیمو، قارچ بلانچ‌شده و سبزیجات تازه.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 12,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 420,
    proteinGrams: 44,
    carbsGrams: 36,
    fatGrams: 10,
    dietaryTags: ['high_protein', 'low_calorie'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'cs-1', name: 'سینه مرغ بی‌استخوان پاک‌شده', amount: 350, unit: 'g', category: 'protein' },
      { id: 'cs-2', name: 'قارچ تازه ورقه‌ای تفت‌داده بدون روغن', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'cs-3', name: 'نان باگت سبوس‌دار یا چاباتا', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'cs-4', name: 'سس ماست و خردل دیژون با آبلیمو تازه', amount: 30, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'مرینیت و گریل مرغ', instruction: 'سینه مرغ را با پاپریکا، سیر، لیمو و فلفل سیاه نیم ساعت بخوابانید. روی تابه شیاردار گریل کنید تا خطوط طلایی بیفتد.', durationMinutes: 10 },
      { stepNumber: 2, title: 'اسمبل ساندویچ', instruction: 'مرغ را اسلایس اریب زده، درون نان به همراه قارچ، سس خردل، گوجه و کاهو بچینید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'مرغ را بیش از حد روی گریل نگذارید تا آبدار و نرم بماند.'
    ]
  },

  // 4. ساندویچ استیک گوشت با پنیر و پیاز کاراملی (فیلادلفیا)
  {
    id: 'steak-sandwich-philly',
    title: 'ساندویچ فیلی چیز استیک با پنیر کش‌دار و فلفل دلمه‌ای',
    persianSubtitle: 'اسلایس‌های باریک راسته گوساله تفت‌خورده در کره با پیاز کاراملی',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=800&auto=format&fit=crop&q=80',
    description: 'ساندویچ معروف فیلادلفیا با گوشت ورقه نازک نواری، پیاز کاراملی طلایی، فلفل دلمه رنگی و پنیر ذوب‌شده داغ.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 590,
    proteinGrams: 45,
    carbsGrams: 40,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'st-1', name: 'راسته یا فیله گوساله نازک ورقه شده', amount: 350, unit: 'g', category: 'protein' },
      { id: 'st-2a', name: 'پیاز خلالی تفت‌خورده', amount: 100, unit: 'g', category: 'vegetable' },
      { id: 'st-2b', name: 'فلفل دلمه‌ای خلالی تفت‌خورده', amount: 100, unit: 'g', category: 'vegetable' },
      { id: 'st-3', name: 'پنیر پروولون یا موزارلا', amount: 120, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'st-4', name: 'نان باگت فرانسوی تازه', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت سریع گوشت', instruction: 'گوشت را به ضخامت کاغذ برش دهید. در تابه داغ با کره و فلفل سیاه ۲ دقیقه تفت سریع دهید.', durationMinutes: 5 },
      { stepNumber: 2, title: 'ترکیب با پیاز و ذوب پنیر', instruction: 'پیاز کاراملی را با گوشت مخلوط کرده، پنیر را روی آن بگذارید تا با حرارت ذوب شود و با کفگیر داخل باگت بگذارید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'گوشت را قبل از برش ۳۰ دقیقه در فریزر بگذارید تا نیمه‌منجمد شده و بتوانید ورقه‌های بسیار نازک ببرید.'
    ]
  },

  // 5. پیتزای مرغ و قارچ رستورانی
  {
    id: 'pizza-chicken-mushroom',
    title: 'پیتزا مرغ و قارچ رستورانی با سس مخصوص و پنیر دوبل',
    persianSubtitle: 'تکه‌های سینه مرغ زعفرانی، قارچ تفت‌داده شده با کره و پنیر موزارلا کش‌دار',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و پیتزا',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    description: 'محبوب‌ترین پیتزای منوی فست‌فودهای ایران با مرغ طعم‌دارشده، قارچ بلانچ شده، ذرت شیرین، زیتون سیاه و سس گوجه معطر ایتالیایی.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 590,
    proteinGrams: 38,
    carbsGrams: 58,
    fatGrams: 24,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'pcm-1', name: 'خمیر پیتزا با هیدراتاسیون ۶۲٪', amount: 280, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'pcm-2', name: 'سینه مرغ پخته و ریش‌ریش یا نگینی', amount: 200, unit: 'g', category: 'protein' },
      { id: 'pcm-3', name: 'قارچ ورقه‌ای تفت‌داده با آبلیمو', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'pcm-4', name: 'پنیر موزارلا رنده‌شده پرچرب', amount: 240, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'pcm-5a', name: 'فلفل دلمه‌ای نگینی', amount: 30, unit: 'g', category: 'vegetable' },
      { id: 'pcm-5b', name: 'ذرت شیرین', amount: 30, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'پهن کردن خمیر و سس', instruction: 'خمیر را باز کرده، لبه‌ها را ضخیم‌تر بگذارید. سس گوجه با اورگانو را مالیده و مقداری پنیر بپاشید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'چیدن مواد و پخت', instruction: 'مرغ، قارچ بدون آب، فلفل دلمه و باقیمانده پنیر را پخش کنید. در فر داغ ۲۲۰ درجه ۱۵ دقیقه بپزید.', durationMinutes: 15, hasTimer: true, temperatureC: 220 }
    ],
    goldenTips: [
      'قارچ را حتماً قبلاً تفت دهید و آب آن را بگیرید تا پیتزا آب نیندازد و خمیر نرم نشود.'
    ]
  },

  // 6. پیتزا پپرونی تند ایتالیایی
  {
    id: 'pizza-pepperoni',
    title: 'پیتزا پپرونی با پنیر دوبل و سس گوجه معطر',
    persianSubtitle: 'اسلایس‌های برشته و تند پپرونی، روغن چکیده و پنیر موزارلا کش‌دار',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و پیتزا',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80',
    description: 'پیتزا پپرونی کلاسیک با سس پیتزای دست‌ساز گوجه و ریحان، پپرونی باکیفیت گوشت گوساله و پنیر موزارلای چرب.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 14,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 640,
    proteinGrams: 30,
    carbsGrams: 65,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    ingredients: [
      { id: 'pp-1', name: 'خمیر پیتزای ناپولی آماده یا دست‌ساز', amount: 260, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'pp-2', name: 'سوسیس پپرونی تند ورقه شده', amount: 120, unit: 'g', category: 'protein' },
      { id: 'pp-3', name: 'پنیر موزارلا پرچرب رنده‌شده', amount: 220, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'pp-4', name: 'سس پیتزا با اورگانو و سیر', amount: 70, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'باز کردن خمیر و چیدن تاپینگ', instruction: 'خمیر را باز کرده، سس و نیمی از پنیر را ریخته، پپرونی‌ها را چیده و مابقی پنیر را اضافه کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پخت در فر داغ', instruction: 'در فر ۲۳۰ درجه به مدت ۱۲ تا ۱۴ دقیقه بپزید تا لبه‌های پپرونی جمع و برشته شوند.', durationMinutes: 14, hasTimer: true, temperatureC: 230 }
    ],
    goldenTips: [
      'دمای فر باید بسیار داغ باشد تا پپرونی‌ها قبل از سوختن نان ترد شوند.'
    ]
  },

  // 7. ناگت مرغ خانگی ترد و پفکی
  {
    id: 'chicken-nuggets-crispy',
    title: 'ناگت مرغ خانگی بازاری ترد بدون مواد نگهدارنده',
    persianSubtitle: 'گوشت مرغ چرخ‌شده با نان تست، سیر و روکش پانکو طلایی',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و سوخاری',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80',
    description: 'ناگت مرغ سالم و بی‌نهایت خوشمزه برای کودکان و مهمانی‌ها با بافت پوک اسفنجی درون و پوسته به شدت کرانچی بیرونی.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 390,
    proteinGrams: 32,
    carbsGrams: 28,
    fatGrams: 16,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'egg'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'ng-1', name: 'سینه و ران مرغ بدون استخوان چرخ‌شده', amount: 500, unit: 'g', category: 'protein' },
      { id: 'ng-2', name: 'نان تست نرم خیسانده در شیر', amount: 3, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'ng-3', name: 'پودر سوخاری پانکو درشت', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'ng-4', name: 'تخم‌مرغ زده شده', amount: 2, unit: 'pcs', category: 'protein', allergens: ['egg'] },
      { id: 'ng-5', name: 'پودر پیاز، پاپریکا، سیر و پنیر پیتزا رنده', amount: 50, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'میکس مواد ناگت', instruction: 'مرغ، نان تست آب‌گرفته، پنیر و ادویه‌ها را در غذاساز میکس کنید تا خمیر چسبنده و یکدستی به دست آید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'فرم دادن و استراحت', instruction: 'خمیر را باز کرده، قالب بزنید و ۳۰ دقیقه در فریزر بگذارید تا خودش را بگیرد.', durationMinutes: 30 },
      { stepNumber: 3, title: 'سوخاری کردن', instruction: 'در آرد، سپس تخم‌مرغ و در نهایت پودر پانکو بغلتانید و در روغن داغ سرخ کنید تا طلایی شود.', durationMinutes: 15 }
    ],
    goldenTips: [
      'استراحت ناگت‌ها در فریزر قبل از سرخ کردن مانع از وا رفتن شکل هندسی آنها در روغن داغ می‌شود.'
    ]
  },

  // 8. قارچ سوخاری پولکی رستورانی
  {
    id: 'fried-mushrooms-crispy',
    title: 'قارچ سوخاری پولکی رستورانی با دیپ سس تارتار',
    persianSubtitle: 'قارچ درسته آبدار با روکش کرانچی ترد و بدون خمیر شدن پوسته',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و سوخاری',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&auto=format&fit=crop&q=80',
    description: 'پیش‌غذای لذیذ با قارچ دکمه‌ای درسته، روکش پولکی ادویه‌دار و بافت ترد که هنگام گاز زدن آب قارچ به بیرون تراوش می‌کند.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    baseServings: 3,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 320,
    proteinGrams: 8,
    carbsGrams: 36,
    fatGrams: 16,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'egg'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'fm-1', name: 'قارچ دکمه‌ای سفید متوسط و سفت', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'fm-2', name: 'آرد سفید قنادی طعم‌دار با ادویه', amount: 200, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'fm-3', name: 'تخم‌مرغ و شیر برای مرطوب کردن', amount: 2, unit: 'pcs', category: 'dairy', allergens: ['egg', 'lactose'] },
      { id: 'fm-4', name: 'پودر سوخاری طلایی', amount: 150, unit: 'g', category: 'flour_grain', allergens: ['gluten'] }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی قارچ', instruction: 'قارچ‌ها را سریع شسته و کاملاً خشک کنید. هرگز نباید خیس باشند.', durationMinutes: 10 },
      { stepNumber: 2, title: 'کاورینگ دو مرحله‌ای', instruction: 'در آرد، تخم‌مرغ و پودر سوخاری غلتانده و مجدد این کار را تکرار کنید تا روکش ضخیم شود.', durationMinutes: 10 },
      { stepNumber: 3, title: 'سرخ کردن سریع', instruction: 'در روغن داغ و غوطه‌ور به مدت ۴ دقیقه سرخ کنید تا طلایی شود.', durationMinutes: 5 }
    ],
    goldenTips: [
      'روغن باید به اندازه کافی داغ باشد؛ حرارت کم باعث خروج آب قارچ و نرم شدن روکش می‌شود.'
    ]
  },

  // 9. لازانیا گوشت و پنیر لایه‌ای
  {
    id: 'lasagna-bolognese',
    title: 'لازانیا گوشت و پنیر مجلسی با سس بشامل کرمی',
    persianSubtitle: 'لایه‌های ورقه لازانیا، گوشت چرخ‌کرده قارچ و پنیر طلایی کش‌دار',
    category: 'international',
    categoryNameFa: 'غذاهای بین‌المللی',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    description: 'لازانیا کلاسیک ایتالیایی با سس بلونز گوشت چرخ‌کرده، سس سفید بشامل کره‌ای و پنیر موزارلا کش‌دار.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 40,
    baseServings: 6,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 620,
    proteinGrams: 36,
    carbsGrams: 52,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    ingredients: [
      { id: 'ls-1', name: 'ورقه لازانیا پیش‌پخت یا معمولی', amount: 300, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'ls-2', name: 'گوشت چرخ‌کرده مخلوط', amount: 400, unit: 'g', category: 'protein' },
      { id: 'ls-3', name: 'قارچ و فلفل دلمه نگینی', amount: 250, unit: 'g', category: 'vegetable' },
      { id: 'ls-4', name: 'سس بشامل (شیر، کره، آرد و جوز هندی)', amount: 400, unit: 'ml', category: 'dairy', allergens: ['gluten', 'lactose'] },
      { id: 'ls-5', name: 'پنیر پیتزا موزارلا', amount: 300, unit: 'g', category: 'dairy', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'مایه گوشت و سس بشامل', instruction: 'مایه گوشتی را با رب و قارچ تفت دهید. سس سفید بشامل را با آرد، کره و شیر آماده کنید.', durationMinutes: 25 },
      { stepNumber: 2, title: 'لایه‌چینی ظرف پیرکس', instruction: 'کف ظرف سس سفید بمالید، ورقه لازانیا، مایه گوشت، سس بشامل و پنیر بریزید و این لایه‌ها را تا انتها تکرار کنید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'پخت و گریل فر', instruction: 'در فر ۱۸۰ درجه ۳۰ دقیقه بپزید و ۵ دقیقه گریل کنید تا روی پنیر طلایی و حباب‌دار شود.', durationMinutes: 35, hasTimer: true, temperatureC: 180 }
    ],
    goldenTips: [
      'استفاده از سس بشامل بین لایه‌ها باعث می‌شود لازانیا خشک نشود و بافتی نرم و خامه‌ای داشته باشد.'
    ]
  },

  // 10. سالاد سزار اصیل با مرغ گریل
  {
    id: 'caesar-salad-original',
    title: 'سالاد سزار اصیل با مرغ گریل و سس سزار دست‌ساز',
    persianSubtitle: 'کاهو پیچ خنک، نان کروتان برشته سیردار و پنیر پارمزان ورقی',
    category: 'international',
    categoryNameFa: 'غذاهای بین‌المللی',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80',
    description: 'سالاد سزار معتبر با سس مخصوص (زرده تخم‌مرغ، خردل، آنچوی یا بالزامیک، سیر و لیمو ترش)، فیله مرغ گریل شده و نان کروتان.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 380,
    proteinGrams: 34,
    carbsGrams: 18,
    fatGrams: 20,
    dietaryTags: ['high_protein', 'low_calorie'],
    allergens: ['gluten', 'lactose', 'egg'],
    ingredients: [
      { id: 'csz-1', name: 'کاهو پیچ تازه خنک شسته و خشک‌شده', amount: 400, unit: 'g', category: 'vegetable' },
      { id: 'csz-2', name: 'فیله مرغ گریل شده طعم‌دار با سیر', amount: 300, unit: 'g', category: 'protein' },
      { id: 'csz-3', name: 'نان تست مکعبی برشته سیر و روغن زیتون (کروتان)', amount: 60, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'csz-4', name: 'پنیر پارمزان ورقی یا پودری', amount: 40, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'csz-5', name: 'سس سزار دست‌ساز', amount: 60, unit: 'ml', category: 'oil_fat', allergens: ['egg'] }
    ],
    steps: [
      { stepNumber: 1, title: 'گریل فیله مرغ', instruction: 'فیله‌ها را با سیر، زیتون و نمک مزه‌دار کرده و گریل نمایید، سپس اسلایس‌های قطری بزنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'تهیه کروتان و سس', instruction: 'نان تست را با سیر و روغن زیتون در فر تست کنید. کاهو را خرد کرده و با سس سزار مخلوط کنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'اسمبل و سرو', instruction: 'کاهو را در ظرف کشیده، مرغ اسلایس، نان کروتان و ورقه‌های پارمزان را رویش قرار دهید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'کاهو قبل از مخلوط شدن با سس باید کاملاً خشک و خنک باشد تا تردی خود را از دست ندهد.'
    ]
  },

  // 11. فلافل ترد و پوک بازاری اهواز
  {
    id: 'falafel-ahvazi',
    title: 'فلافل ترد و پوک بازاری اهواز با ترشی و سس انبه',
    persianSubtitle: 'نخود چرخ‌شده بدون آرد با عطر گشنیز، پودر زیره و بیکینگ‌پودر',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و ساندویچ',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=800&auto=format&fit=crop&q=80',
    description: 'فلافل اصیل لشکرآباد اهواز فقط با نخود خیس‌خورده، پیاز، سیر، ادویه مخصوص فلافل و بافت پوک طلایی بدون جذب روغن اضافی.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 340,
    proteinGrams: 16,
    carbsGrams: 45,
    fatGrams: 12,
    fiberGrams: 9,
    dietaryTags: ['vegetarian', 'high_protein', 'low_calorie'],
    isVegetarian: true,
    allergens: [],
    originRegion: 'خوزستان و اهواز',
    ingredients: [
      { id: 'fl-1', name: 'نخود خیسانده ۴۸ ساعته چرخ‌شده', amount: 500, unit: 'g', category: 'flour_grain' },
      { id: 'fl-2', name: 'پیاز متوسط و سیر تازه', amount: 2, unit: 'pcs', category: 'vegetable' },
      { id: 'fl-3', name: 'ادویه فلافل (زیره، تخم گشنیز، پاپریکا، انبه)', amount: 15, unit: 'g', category: 'spice_seasoning' },
      { id: 'fl-4', name: 'بکینگ‌پودر (راز پفکی شدن)', amount: 1, unit: 'tsp', category: 'flour_grain' },
      { id: 'fl-5', name: 'آب یخ برای تنظیم بافت چرخ‌کرده', amount: 4, unit: 'tbsp', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'چرخ کردن نخود', instruction: 'نخود خیس‌خورده را با پیاز و سیر چرخ کنید (دانه دانه باشد و نباید تبدیل به پوره نرم شود).', durationMinutes: 15 },
      { stepNumber: 2, title: 'افزودن ادویه و استراحت', instruction: 'ادویه‌ها، بکینگ‌پودر و کمی آب یخ افزوده و ورز دهید تا مایه سبک شود.', durationMinutes: 10 },
      { stepNumber: 3, title: 'قالب زدن و سرخ کردن', instruction: 'با قالب فلافل زن در روغن داغ و شناور با حرارت ملایم سرخ کنید تا مغزپخت و طلایی شود.', durationMinutes: 15 }
    ],
    goldenTips: [
      'نخود را بیش از حد چرخ نکنید؛ زبری ملایم بافت نخود راز تردی و وا نرفتن فلافل است.'
    ]
  },

  // 12. ماشروم برگر آبدار رستورانی
  {
    id: 'burger-mushroom',
    title: 'ماشروم برگر مخصوص با سس قارچ کاراملی و پنیر سوئیسی',
    persianSubtitle: 'گوشت گوساله آبدار گریل‌شده با سس خامه و قارچ اسلایسی معطر',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و برگر',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=800&auto=format&fit=crop&q=80',
    description: 'برگر مجلل با سس قارچ تفت‌خورده در کره حیوانی، عصاره گوشت، خامه غلیظ، پنیر آب‌شده سوئیسی و نان بریوش کنجدی.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 710,
    proteinGrams: 44,
    carbsGrams: 42,
    fatGrams: 39,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'mb-1', name: 'گوشت چرخ‌کرده قلوه‌گاه و گردن تازه', amount: 320, unit: 'g', category: 'protein' },
      { id: 'mb-2', name: 'قارچ دکمه‌ای سفید اسلایس‌شده', amount: 250, unit: 'g', category: 'vegetable' },
      { id: 'mb-3', name: 'خامه صبحانه غلیظ یا سس بشامل', amount: 60, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'mb-4', name: 'پنیر گودا یا سوئیسی ورقه‌ای', amount: 4, unit: 'pcs', category: 'dairy', allergens: ['lactose'] },
      { id: 'mb-5', name: 'نان همبرگر تازه', amount: 2, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] }
    ],
    steps: [
      { stepNumber: 1, title: 'تهیه سس قارچ', instruction: 'قارچ‌ها را در تابه داغ با کره و فلفل سیاه تفت دهید تا آب آن کشیده و طلایی شود، خامه را افزوده و بگذارید غلیظ شود.', durationMinutes: 8 },
      { stepNumber: 2, title: 'پخت گوشت و ذوب پنیر', instruction: 'برگرها را در تابه چدنی داغ گریل کنید، در دقیقه آخر پنیر را روی برگرها بگذارید تا کاملاً ذوب شود.', durationMinutes: 5 },
      { stepNumber: 3, title: 'اسمبل با سس قارچ داغ', instruction: 'نان را با کره برشته کنید، پتی پنیری را قرار دهید و سس قارچ داغ را روی آن سرازیر کنید.', durationMinutes: 2 }
    ],
    goldenTips: [
      'قارچ را در تابه خیلی داغ بدون نمک تفت دهید تا آب نیندازد و قهوه‌ای براق شود، نمک را در پایان بیفزایید.'
    ]
  },

  // 13. سیب‌زمینی سوخاری کریسپی ویژه با دیپ چدار
  {
    id: 'french-fries-special',
    title: 'سیب‌زمینی سرخ‌کرده کریسپی ویژه با دیپ پنیر چدار',
    persianSubtitle: 'روش ۲ مرحله‌ای بلانچ و فریز برای بافت شیشه‌ای ترد بیرون و پوره نرم داخل',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و پیش‌غذا',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80',
    description: 'سیب‌زمینی‌های خلالی ترد بازاری با پاپریکا دودی، پودر سیر، نمک دریایی و سس دست‌ساز چدار داغ و کش‌دار.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 15,
    baseServings: 3,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 380,
    proteinGrams: 7,
    carbsGrams: 52,
    fatGrams: 18,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['lactose'],
    originRegion: 'بین‌المللی',
    ingredients: [
      { id: 'ff-1', name: 'سیب‌زمینی استخوانی نشاسته‌دار درشت', amount: 600, unit: 'g', category: 'vegetable' },
      { id: 'ff-2', name: 'پنیر چدار رنده‌شده', amount: 150, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'ff-3', name: 'شیر و کره برای سس پنیر', amount: 100, unit: 'ml', category: 'dairy', allergens: ['lactose'] },
      { id: 'ff-4', name: 'ادویه مخصوص (پاپریکا دودی، پودر سیر، آویشن)', amount: 10, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'بلانچ و نشاسته‌زدایی', instruction: 'خلال‌های سیب‌زمینی را ۵ دقیقه در آب جوش با نمک و سرکه نیم‌پز کرده، سپس با آب یخ شوک داده و کاملاً خشک کنید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'سرخ کردن مرحله‌ای', instruction: 'مرحله اول در روغن با دمای ۱۳۰ درجه ۵ دقیقه سرخ کنید، سپس بیرون آورده و در روغن داغ ۱۸۰ درجه طلایی و فوق‌العاده کریسپی کنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'تهیه سس پنیر چدار', instruction: 'کره و شیر را گرم کرده، پنیر چدار را کم‌کم اضافه کنید تا سس کرمی یکدست شود و روی سیب‌زمینی‌ها بریزید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'افزودن یک قاشق سرکه به آب جوش مانع از له شدن خلال‌های سیب‌زمینی در حین بلانچ می‌شود.'
    ]
  },

  // 14. پیتزا مخلوط نوستالژیک ویژه
  {
    id: 'pizza-makhloot',
    title: 'پیتزا مخلوط ویژه با پنیر فراوان و خمیر خانگی',
    persianSubtitle: 'طعم نوستالژیک پیتزاهای کلاسیک ایرانی با گوشت، قارچ، فلفل دلمه‌ای و آویشن',
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و پیتزا',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80',
    description: 'پیتزای اصیل و پرطرفدار مخلوط با خمیر نان نرم و برشته، سس گوجه رزماری، گوشت چرخ‌کرده تفت‌داده با پیاز، قارچ تازه، زیتون سیاه و پنیر موزارلای کش‌دار.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 3,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 620,
    proteinGrams: 32,
    carbsGrams: 58,
    fatGrams: 28,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    originRegion: 'ایران',
    ingredients: [
      { id: 'pm-1', name: 'خمیر پیتزا ورآمده با آرد قنادی', amount: 280, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'pm-2', name: 'پنیر پیتزا موزارلا رنده‌شده پرچرب', amount: 250, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'pm-3', name: 'گوشت چرخ‌کرده تفت‌خورده با فلفل', amount: 150, unit: 'g', category: 'protein' },
      { id: 'pm-4', name: 'قارچ اسلایس‌شده و فلفل دلمه‌ای نگینی', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'pm-5', name: 'سس پیتزا و آویشن کوهی', amount: 40, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پهن کردن خمیر و سس', instruction: 'خمیر را با دست به قطر ۲۸ سانتیمتر باز کرده، سس گوجه و نیمی از پنیر را روی سطح پخش کنید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'چیدن تاپینگ‌ها', instruction: 'گوشت، قارچ، فلفل دلمه‌ای و باقیمانده پنیر را به طور یکنواخت پخش کرده و روی آن آویشن بپاشید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'پخت در فر داغ', instruction: 'در فر داغ با دمای ۲۲۰ درجه سانتیگراد به مدت ۱۵ الی ۱۸ دقیقه بپزید تا نان طلایی و پنیر حباب بزند.', durationMinutes: 18 }
    ],
    goldenTips: [
      'قارچ‌ها را قبل از گذاشتن روی پیتزا در تابه داغ چند ثانیه تفت دهید تا روی پیتزا آب نیندازند.'
    ]
  }
];
