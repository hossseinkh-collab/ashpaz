import { Recipe } from '../types';

export const EXPANDED_ENCYCLOPEDIA_RECIPES: Recipe[] = [
  // 1. چلوکباب کوبیده سنتی زعفرانی
  {
    id: 'chelo-kabab-koobideh',
    title: 'چلوکباب کوبیده سنتی زعفرانی با برنج دودی و کره محلی',
    persianSubtitle: 'شاهکار کباب ایرانی با گوشت قلوه‌گاه گوسفندی و راسته گوساله، آب پیاز کشیده و کباب سیخ‌گرفته حرفه‌ای',
    canonical_name: 'کباب کوبیده',
    alternate_names: ['چلوکباب کوبیده', 'کباب کوبیده بازاری', 'کوبیده مجلسی'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'تهران و سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-koobideh-1',
        recipe_id: 'chelo-kabab-koobideh',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'تصویر اختصاصی سیخ کباب ذغالی با گوجه کبابی و بافت گوشت چرخ‌کرده اصیل',
        alt_text: 'چلوکباب کوبیده سنتی ایرانی روی زغال همراه گوجه فرنگی کبابی',
        is_active: true
      }
    ],
    description: 'کباب کوبیده سنتی با نسبت طلایی ۶۰ درصد قلوه‌گاه گوسفندی و ۴۰ درصد راسته گوساله. گوشت دو بار چرخ شده، پیاز آب‌گرفته، زعفران غلیظ و ورز دادن تا رسیدن به چسبندگی کامل بدون نیاز به جوش‌شیرین یا آرد.',
    prepTimeMinutes: 45,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'سخت / نیازمند مهارت',
    caloriesPerServing: 620,
    proteinGrams: 42,
    carbsGrams: 36,
    fatGrams: 34,
    dietaryTags: ['high_protein', 'gluten_free'],
    isGlutenFree: true,
    allergens: [],
    source_references: ['کتاب مستطاب آشپزی نجف دریابندری', 'اصول کباب‌پزی سنتی تهران'],
    ingredients: [
      { id: 'kb-1', name: 'قلوه‌گاه گوسفندی چرب و لطیف', amount: 500, unit: 'g', approxCostPer100g: 80000, category: 'protein' },
      { id: 'kb-2', name: 'راسته یا مغز ران گوساله بدون چربی', amount: 400, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'kb-3', name: 'پیاز سفید رنده‌شده با آب کاملاً گرفته', amount: 300, unit: 'g', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'kb-4', name: 'زعفران دم‌کرده غلیظ', amount: 2, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kb-5a', name: 'نمک دریا', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'kb-5b', name: 'فلفل سیاه تازه', amount: 0.5, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'kb-5c', name: 'سماق قرمز تبریزی', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kb-6a', name: 'گوجه‌فرنگی متوسط برای کباب', amount: 4, unit: 'pcs', unitWeightInGrams: 80, category: 'vegetable' },
      { id: 'kb-6b', name: 'فلفل سبز قلمی کبابی', amount: 4, unit: 'pcs', unitWeightInGrams: 20, category: 'vegetable' },
      { id: 'kb-7', name: 'برنج ایرانی دم‌کشیده با زعفران و کره محلی', amount: 400, unit: 'g', category: 'flour_grain' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی پیاز و گرفتن آب', instruction: 'پیازها را با رنده متوسط رنده کرده و در تنظیف کاملاً فشار دهید تا تفاله پیاز خشک شود. آب پیاز را کنار بگذارید و تفاله را نیم ساعت در یخچال استراحت دهید.', durationMinutes: 15 },
      { stepNumber: 2, title: 'چرخ کردن دونوبته گوشت', instruction: 'گوشت گوسفند و گوساله را قطعه‌قطعه کرده و یک بار با دنده درشت و بار دوم همراه تفاله پیاز و نمک و فلفل با دنده ریز چرخ‌گوشت رد کنید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'ورز دادن حیاتی و شوک سرما', instruction: 'مایه گوشت را دست‌کم ۱۵ دقیقه پیوسته ورز دهید تا سفید شده و دانه‌های چربی یکدست محو شوند. سپس روی ظرف سلفون کشیده و ۲ ساعت در یخچال بگذارید تا دمای آن به زیر ۴ درجه برسد.', durationMinutes: 20 },
      { stepNumber: 4, title: 'سیخ گرفتن کباب', instruction: 'دست خود را در آب ولرم یا آب پیاز زده، به اندازه یک پرتقال متوسط (۱۰۰ تا ۱۱۰ گرم) گوشت برداشته، روی سیخ پهن پهن کنید و با دو انگشت شیارهای سنتی کباب را ایجاد کنید. سر و ته کباب را با فشار انگشت قفل کنید.', durationMinutes: 15 },
      { stepNumber: 5, title: 'کباب کردن روی منقل زغال سرخ', instruction: 'منقل باید کاملاً یکدست و زغال‌ها گداخته بدون شعله باشند. سیخ‌ها را چیده و در ۲۰ ثانیه اول مکرراً بچرخانید تا هر دو طرف گوشت خودش را بگیرد و نریزد، سپس با حرارت ملایم مغزپخت کنید.', durationMinutes: 10, hasTimer: true }
    ],
    goldenTips: [
      'علت اصلی ریختن کوبیده از سیخ، گرم بودن دمای گوشت هنگام سیخ‌گیری یا باقی ماندن آب پیاز در مایه است.',
      'در ثانیه‌های اول کباب کردن روی زغال، حتماً هر ۳ تا ۵ ثانیه سیخ را برگردانید تا پروتئین گوشت سریع منعقد شود.',
      'برای براق شدن کباب، بلافاصله پس از برداشتن از روی آتش، با برس روی آن کره آب‌شده زعفرانی بمالید.'
    ]
  },

  // 2. جوجه‌کباب اصیل زعفرانی
  {
    id: 'joojeh-kabab-zaferani',
    title: 'جوجه‌کباب اصیل زعفرانی رستورانی با کره محلی و لیموترش تازه',
    persianSubtitle: 'گوشت سینه و فیله مرغ بی‌استخوان فوق‌العاده نرم با مرینیت پیاز خلالی، ماست چکیده و زعفران اعلا',
    canonical_name: 'جوجه کباب زعفرانی',
    alternate_names: ['جوجه کباب', 'جوجه کباب بدون استخوان', 'جوجه کباب رستورانی'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-joojeh-1',
        recipe_id: 'joojeh-kabab-zaferani',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'تصویر مرغ گریل زعفرانی با بافت طلایی و گوجه کبابی',
        alt_text: 'جوجه کباب زعفرانی زغالی طلایی آبدار با کره',
        is_active: true
      }
    ],
    description: 'جوجه‌کباب مجلسی با تکنیک مرینیت سه‌مرحله‌ای رستورانی: ابتدا پوشش زعفران برای جذب رنگ، سپس روغن مایع برای بستن بافت، و در نهایت پیاز خلالی و آبلیموی تازه جهت لطافت بی‌نظیر بدون سفت شدن مرغ.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 510,
    proteinGrams: 48,
    carbsGrams: 6,
    fatGrams: 22,
    dietaryTags: ['high_protein', 'gluten_free', 'keto'],
    isGlutenFree: true,
    allergens: ['lactose'],
    source_references: ['استاندارد کباب‌های ملی ایران'],
    ingredients: [
      { id: 'jk-1', name: 'سینه و فیله مرغ خردشده یکدست', amount: 800, unit: 'g', approxCostPer100g: 32000, category: 'protein' },
      { id: 'jk-2', name: 'زعفران دم‌کرده غلیظ با یخ', amount: 3, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'jk-3', name: 'پیاز سفید بزرگ خلال‌شده درشت', amount: 2, unit: 'pcs', unitWeightInGrams: 150, category: 'vegetable' },
      { id: 'jk-4', name: 'ماست چکیده پرچرب سنتی', amount: 2, unit: 'tbsp', unitWeightInGrams: 40, category: 'dairy' },
      { id: 'jk-5', name: 'آب لیموترش شیرازی تازه', amount: 3, unit: 'tbsp', category: 'liquid' },
      { id: 'jk-6', name: 'روغن مایع یا زیتون بدون بو', amount: 3, unit: 'tbsp', category: 'oil_fat' },
      { id: 'jk-7', name: 'کره حیوانی برای رومال نهایی', amount: 50, unit: 'g', category: 'dairy' }
    ],
    steps: [
      { stepNumber: 1, title: 'مرحله اول: نفوذ رنگ زعفران', instruction: 'تکه‌های مرغ را داخل کاسه ریخته و ابتدا فقط زعفران دم‌کرده را اضافه کنید و خوب مالش دهید تا گوشت کاملاً زرد پررنگ شود. نیم ساعت استراحت دهید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'مرحله دوم: روغن برای محافظت از بافت', instruction: 'روغن مایع را به مرغ افزوده و مخلوط کنید تا یک لایه نازک چربی دور بافت مرغ ایجاد شود. این کار مانع از خشک شدن مرغ در تماس با آبلیمو می‌شود.', durationMinutes: 5 },
      { stepNumber: 3, title: 'مرحله سوم: پیاز، ماست و چاشنی‌ها', instruction: 'پیازهای خلالی درشت، ماست چکیده، آبلیمو، نمک و فلفل سیاه را اضافه کرده، زیر و رو کنید و حداقل ۶ تا ۱۲ ساعت در یخچال مرینیت کنید.', durationMinutes: 10 },
      { stepNumber: 4, title: 'سیخ‌کشی یکنواخت', instruction: 'تکه‌های مرغ را بر اساس ضخامت یکدست به سیخ بکشید تا همگی در یک زمان کباب شوند. پیازهای چسبیده به مرغ را جدا کنید تا نسوزند.', durationMinutes: 10 },
      { stepNumber: 5, title: 'کباب کردن و کره زعفرانی', instruction: 'سیخ‌ها را روی زغال ملایم قرار داده و پس از پخت دو طرف، سریعاً درون دیس چیده و کره داغ و زعفران روی آن بمالید.', durationMinutes: 15, hasTimer: true }
    ],
    goldenTips: [
      'هرگز پیاز را رنده نکنید؛ تفاله پیاز به گوشت چسبیده و روی منقل می‌سوزد و ظاهر کباب را تلخ و تیره می‌کند.',
      'آبلیمو را هرگز همان ابتدا به مرغ نزنید چون اسید بافت پروتئین را سفت می‌کند؛ روغن حائل مانع این اتفاق است.'
    ]
  },

  // 3. کباب تابه‌ای نوستالژیک خانگی
  {
    id: 'kebab-tabei',
    title: 'کباب تابه‌ای نوستالژیک خانگی با سس گوجه‌فرنگی غلیظ و برنج کته',
    persianSubtitle: 'راحت‌ترین و لذیذترین غذای سنتی ایرانی با گوشت چرخ‌کرده، پیازداغ و سماق تبریزی',
    canonical_name: 'کباب تابه ای',
    alternate_names: ['کباب دیگی', 'کباب تابه ای با گوجه', 'کباب خانگی'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-tabei-1',
        recipe_id: 'kebab-tabei',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'کباب تابه‌ای برشته با گوجه فرنگی سرخ‌شده',
        alt_text: 'کباب تابه‌ای گوشت چرخ‌کرده خانگی با سس گوجه و پیاز',
        is_active: true
      }
    ],
    description: 'کباب تابه‌ای خاطره‌انگیز ایرانی تهیه شده از گوشت مخلوط گوسفند و گوساله، پیاز رنده شده و سماق. سرخ‌شده با حرارت ملایم در روغن و کره همراه با گوجه‌فرنگی‌های حلقه‌ای نرم.',
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 480,
    proteinGrams: 36,
    carbsGrams: 10,
    fatGrams: 28,
    dietaryTags: ['high_protein', 'gluten_free', 'low_calorie'],
    isGlutenFree: true,
    allergens: [],
    ingredients: [
      { id: 'kt-1', name: 'گوشت چرخ‌کرده مخلوط گوسفند و گوساله', amount: 500, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'kt-2', name: 'پیاز متوسط رنده شده و نیمه‌آب‌گرفته', amount: 2, unit: 'pcs', unitWeightInGrams: 110, category: 'vegetable' },
      { id: 'kt-3', name: 'گوجه‌فرنگی رسیده حلقه شده', amount: 3, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'kt-4', name: 'سماق قهوه‌ای یا قرمز مرغوب', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kt-5', name: 'زعفران دم‌کرده غلیظ', amount: 1.5, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'kt-6', name: 'رب گوجه‌فرنگی تفت‌داده با کره', amount: 1, unit: 'tbsp', category: 'vegetable' }
    ],
    steps: [
      { stepNumber: 1, title: 'ورز دادن مایه کباب', instruction: 'گوشت، پیاز رنده شده نیمه‌آب‌گرفته، نمک، فلفل سیاه، سماق و زعفران را به مدت ۵ دقیقه ورز دهید تا یکدست و منسجم شود.', durationMinutes: 10 },
      { stepNumber: 2, title: 'پهن کردن در تابه', instruction: 'کف یک تابه نچسب را کمی چرب کرده، مایه کباب را به ضخامت یکنواخت ۱ سانتیمتر کف تابه پهن و صاف کنید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'برش و پخت اولیه', instruction: 'با کفگیر خطوط طولی روی گوشت بکشید تا به نوارهای کباب کوبیده تقسیم شود. درب تابه را گذاشته و با شعله ملایم بگذارید گوشت آب بیندازد و جمع شود.', durationMinutes: 15, hasTimer: true },
      { stepNumber: 4, title: 'برگرداندن و اضافه کردن گوجه', instruction: 'نوارهای کباب را برگردانید، حلقه‌های گوجه و سس رب رقیق‌شده با زعفران و کمی آب را دور کباب‌ها بچینید تا غلیظ و براق شود.', durationMinutes: 15, hasTimer: true }
    ],
    goldenTips: [
      'یک قاشق سماق داخل مایه کباب طعم رستورانی و خوشایندی به آن می‌دهد و بوی زهم گوشت را کاملاً می‌گیرد.'
    ]
  },

  // 4. آش رشته اصیل تهرانی
  {
    id: 'ash-reshteh',
    title: 'آش رشته اصیل مجلسی تهرانی با کشک سابیده، نعناداغ و پیازداغ چیپسی',
    persianSubtitle: 'نماد بی‌بدیل سفره‌های ایرانی با رشته اعلا، حبوبات چهارگانه، سبزی آشی معطر و سیرداغ فراوان',
    canonical_name: 'آش رشته',
    alternate_names: ['اش رشته', 'آش رشته نذری', 'آش رشته مجلسی'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'تهران و سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-ash-reshteh-1',
        recipe_id: 'ash-reshteh',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'تصویر اختصاصی کاسه آش رشته با خطوط کشک، نعناداغ و پیازداغ طلایی',
        alt_text: 'کاسه آش رشته سنتی اصیل ایرانی تزیین شده با کشک و نعناع داغ',
        is_active: true
      }
    ],
    description: 'معروف‌ترین و کهن‌ترین آش سنتی ایران با تلفیق نخود، لوبیا چیتی، عدس، سبزی آش (تره، جعفری، گشنیز، اسفناج)، رشته آشی لعاب‌دار، و تزیین هنرمندانه با کشک، نعناداغ و پیازداغ عسلی.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 150,
    baseServings: 6,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 420,
    proteinGrams: 19,
    carbsGrams: 58,
    fatGrams: 14,
    dietaryTags: ['vegetarian', 'high_protein'],
    isVegetarian: true,
    allergens: ['gluten', 'lactose'],
    ingredients: [
      { id: 'ar-1', name: 'رشته آشی مرغوب بدون شوری زیاد', amount: 300, unit: 'g', approxCostPer100g: 8000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'ar-2', name: 'سبزی آش (اسفناج، تره، جعفری، گشنیز و شوید)', amount: 700, unit: 'g', approxCostPer100g: 11000, category: 'vegetable' },
      { id: 'ar-3', name: 'نخود و لوبیای چیتی خیس‌خورده و پخته', amount: 200, unit: 'g', category: 'flour_grain' },
      { id: 'ar-4', name: 'عدس مرغوب خیس‌خورده', amount: 150, unit: 'g', category: 'flour_grain' },
      { id: 'ar-5', name: 'پیاز داغ چیپسی طلایی و سیر داغ', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'ar-6', name: 'نعناع داغ معطر با روغن ملایم', amount: 4, unit: 'tbsp', category: 'oil_fat' },
      { id: 'ar-7', name: 'کشک غلیظ جوشانده شده سنتی', amount: 250, unit: 'g', category: 'dairy', allergens: ['lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت حبوبات و عدس', instruction: 'نخود و لوبیا را که از روز قبل خیسانده‌اید بپزید. عدس را در قابلمه اصلی ریخته و با آب قلم یا آب جوش بگذارید نیم‌پز شود.', durationMinutes: 40 },
      { stepNumber: 2, title: 'افزودن سبزی و حبوبات پخته', instruction: 'سبزی آش درشت خردشده را همراه با نخود و لوبیای پخته و نیمی از پیازداغ و سیرداغ به قابلمه اضافه کنید و بگذارید سبزی بپزد و رنگ یشمی بگیرد.', durationMinutes: 35 },
      { stepNumber: 3, title: 'اضافه کردن رشته و لعاب‌گیری', instruction: 'رشته‌های آشی را از وسط دو نیم کرده و کم‌کم به آش در حال جوش بیفزایید. به آرامی هم بزنید تا رشته‌ها به هم نچسبند و باز شوند.', durationMinutes: 20, hasTimer: true },
      { stepNumber: 4, title: 'جاافتادن نهایی و سرو', instruction: 'کمی از کشک را داخل آش ریخته تا مزه‌دار شود، نمک را پس از چشیدن رشته تنظیم کنید، سپس در کاسه کشیده و با کشک، نعناداغ و پیازداغ تزیین کنید.', durationMinutes: 15 }
    ],
    goldenTips: [
      'چون رشته آشی خودش نمک دارد، حتماً اضافه کردن نمک را به بعد از ریختن و پختن رشته موکول کنید تا آش شور نشود.',
      'اسفناج فراوان در سبزی آش باعث لعاب طبیعی فوق‌العاده و رنگ سبز زنده آش می‌شود.'
    ]
  },

  // 5. حلیم گندم سنتی با گوشت و دارچین
  {
    id: 'halim-gandom',
    title: 'حلیم گندم سنتی صبحانه با گوشت بوقلمون و گوسفندی، دارچین و روغن حیوانی',
    persianSubtitle: 'صبحانه اصیل کشدار و پرانرژی با گندم پوست‌کنده کامل و تکنیک گوشت‌کوبیدن مداوم',
    canonical_name: 'حلیم گندم',
    alternate_names: ['حلیم صبحانه', 'حلیم معجون', 'حلیم بوقلمون'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'تهران، قزوین و خراسان',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-halim-gandom-1',
        recipe_id: 'halim-gandom',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'تصویر حلیم سنتی داغ با دارچین، کنجد و روغن حیوانی طلایی',
        alt_text: 'کاسه حلیم گندم و گوشت سنتی ایرانی با دارچین و کره',
        is_active: true
      }
    ],
    description: 'حلیم اصیل ایرانی با گندم پوست‌کنده لعاب‌دار، گوشت ریش‌ریش کشدار بوقلمون یا سرسینه‌ گوسفند. پخت آرام‌ریز ۸ ساعته تا محو شدن دانه‌های گندم و سرو با روغن دنبه یا حیوانی و پودر دارچین اعلا.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 240,
    baseServings: 6,
    difficulty: 'hard',
    difficultyFa: 'سخت / نیازمند هم‌زدن مداوم',
    caloriesPerServing: 380,
    proteinGrams: 26,
    carbsGrams: 48,
    fatGrams: 10,
    dietaryTags: ['high_protein'],
    allergens: ['gluten'],
    ingredients: [
      { id: 'hg-1', name: 'گندم پوست‌کنده مرغوب خیسانده ۱۲ ساعته', amount: 500, unit: 'g', approxCostPer100g: 6000, category: 'flour_grain' },
      { id: 'hg-2', name: 'گوشت سینه بوقلمون یا سردست گوسفندی', amount: 400, unit: 'g', approxCostPer100g: 65000, category: 'protein' },
      { id: 'hg-3', name: 'کره یا روغن حیوانی اعلا', amount: 60, unit: 'g', category: 'dairy' },
      { id: 'hg-4', name: 'پودر دارچین هندی، کنجد و شکر یا نمک برای سرو', amount: 20, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت گندم تا شکفتن کامل', instruction: 'گندم خیس‌خورده را با ۸ برابر آب روی شعله ملایم بگذارید تا ساعت‌ها بجوشد و کاملاً پخته و شکفته شود. در قابلمه را نیمه‌باز بگذارید تا سر نرود.', durationMinutes: 180 },
      { stepNumber: 2, title: 'پخت جداگانه گوشت با پیاز و دارچین', instruction: 'گوشت را با یک عدد پیاز و چوب دارچین در قابلمه‌ای دیگر بپزید تا کاملاً نرم و از هم پاشیده شود. سپس آب گوشت را صاف کرده و گوشت را ریش‌ریش کنید.', durationMinutes: 120 },
      { stepNumber: 3, title: 'پوره کردن گندم و مخلوط گوشت', instruction: 'گندم پخته‌شده را با گوشت‌کوب برقی یا سنتی میکس کنید تا یکدست شود، سپس گوشت ریش‌شده و آب گوشت را افزوده و با قاشق چوبی مرتب هم بزنید تا کش بیاید.', durationMinutes: 45, hasTimer: true },
      { stepNumber: 4, title: 'سرو با روغن و دارچین', instruction: 'حلیم را در کاسه کشیده، روغن حیوانی داغ، خطوط دارچین و کمی کنجد روی آن بریزید و بنا به سلیقه با نمک یا شکر میل کنید.', durationMinutes: 10 }
    ],
    goldenTips: [
      'گوشت حلیم را هرگز با مخلوط‌کن یا بلندر پوره نکنید؛ فقط با دست ریش‌ریش کرده و با گوشت‌کوب بکوبید تا کشش طبیعی بافت حفظ شود.'
    ]
  },

  // 6. بریانی اصیل اصفهان
  {
    id: 'beryani-isfahan',
    title: 'بریانی اصیل مجلسی اصفهان با گوشت سردست گوسفندی، چادر دنبه و نان سنگک',
    persianSubtitle: 'معروف‌ترین خوراک پایتخت صفوی با گوشت کوبیده دارچینی، کفگیر مسی، زعفران و خلال بادام',
    canonical_name: 'بریانی اصفهان',
    alternate_names: ['بریونی', 'بریانی سنتی اصفهان'],
    category: 'iranian_local',
    categoryNameFa: 'غذاهای محلی ایران',
    originProvince: 'اصفهان',
    originRegion: 'اصفهان',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-beryani-1',
        recipe_id: 'beryani-isfahan',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'گوشت بریانی کوبیده و تفت‌داده با نعناع و نان سنتی',
        alt_text: 'بریانی اصیل اصفهانی همراه با نان سنگک و آب‌گوشت مخصوص',
        is_active: true
      }
    ],
    description: 'غذای شاهانه اصفهان شامل گوشت سر دست و گردن گوسفندی پخته و چرخ‌شده با دنبه، ادویه اصفهانی (نعناع خشک، دارچین، فلفل، زعفران)، سرخ‌شده در کفگیر مخصوص با شعله مستقیم و سرو روی نان سنگک چرب‌شده با آب‌گوشت غلیظ.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 150,
    baseServings: 4,
    difficulty: 'hard',
    difficultyFa: 'سخت / نیازمند کفگیر مخصوص بریانی',
    caloriesPerServing: 680,
    proteinGrams: 44,
    carbsGrams: 28,
    fatGrams: 46,
    dietaryTags: ['high_protein'],
    allergens: ['nuts'],
    ingredients: [
      { id: 'br-1', name: 'گوشت سردست یا گردن گوسفندی چرب', amount: 600, unit: 'g', approxCostPer100g: 80000, category: 'protein' },
      { id: 'br-2', name: 'دنبه گوسفندی تازه', amount: 100, unit: 'g', approxCostPer100g: 40000, category: 'oil_fat' },
      { id: 'br-3', name: 'جگر سفید (شش) گوسفندی چرخ‌شده و پخته (آشام)', amount: 150, unit: 'g', approxCostPer100g: 25000, category: 'protein' },
      { id: 'br-4', name: 'پودر دارچین، نعناع خشک، فلفل سیاه و زعفران', amount: 15, unit: 'g', category: 'spice_seasoning' },
      { id: 'br-5', name: 'نان سنگک تازه و خلال بادام/گردو', amount: 2, unit: 'pcs', category: 'flour_grain' }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت گوشت با دنبه و پیاز', instruction: 'گوشت، دنبه و پیاز را با زردچوبه و آب بپزید تا کاملاً نرم شود. آب گوشت را نگه دارید زیرا برای چرب کردن نان سنگک الزامی است.', durationMinutes: 120 },
      { stepNumber: 2, title: 'چرخ کردن با ادویه‌ها', instruction: 'گوشت و دنبه پخته را یک بار چرخ کنید و با نمک، فلفل، دارچین، زعفران و نعناع خشک مخلوط و ورز دهید.', durationMinutes: 15 },
      { stepNumber: 3, title: 'تفت دادن در کفگیر مسی', instruction: 'کفگیر بریانی یا تابه کوچک را چرب کرده، مقداری خلال بادام و دارچین ته آن پاشیده، تکه‌ای از گوشت چرخ‌شده را روی آن پهن کرده و روی شعله گاز نگه دارید تا برشته شود.', durationMinutes: 10, hasTimer: true },
      { stepNumber: 4, title: 'برگرداندن روی نان سنگک', instruction: 'یک تکه نان سنگک را با آب گوشت چرب کرده، کفگیر را روی نان برگردانید و کنار آن شش پخته (آشام) و ریحان تازه سرو کنید.', durationMinutes: 5 }
    ],
    goldenTips: [
      'راز طعم مست‌کننده بریانی، نعناع خشک و دارچین اصل است که هنگام سرخ شدن در روغن آزاد می‌شود.'
    ]
  },

  // 7. بزقرمه اصیل کرمانی
  {
    id: 'boz-ghormeh-kerman',
    title: 'بزقرمه اصیل سنتی کرمان با گوشت گوسفندی، نخود، کشک فراوان و سیرداغ',
    persianSubtitle: 'غذای تاریخی استان کرمان با بافت پوره‌ای کشدار و طعم ترش و دلچسب کشک سنتی',
    canonical_name: 'بزقرمه',
    alternate_names: ['بزقرمه کرمانی', 'خوراک بز قرمه'],
    category: 'iranian_local',
    categoryNameFa: 'غذاهای محلی ایران',
    originProvince: 'کرمان',
    originRegion: 'کرمان',
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-boz-ghormeh-1',
        recipe_id: 'boz-ghormeh-kerman',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'بزقرمه اصیل کرمانی با تزیین کشک، نعناع و مغز گردو',
        alt_text: 'بزقرمه سنتی کرمانی با کشک و نعناع داغ',
        is_active: true
      }
    ],
    description: 'غذای معروف کرمان که در گذشته از گوشت بزغاله تهیه می‌شده و اکنون با گوشت گوسفندی بدون چربی، نخود خیس‌خورده، پیازداغ و سیرداغ فراوان و کشک محلی ساییده شده به آرامی پخته و کوبیده می‌شود.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 180,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 520,
    proteinGrams: 38,
    carbsGrams: 28,
    fatGrams: 26,
    dietaryTags: ['high_protein', 'gluten_free'],
    isGlutenFree: true,
    allergens: ['lactose', 'nuts'],
    ingredients: [
      { id: 'bq-1', name: 'گوشت ماهیچه یا سرسینه‌ گوسفندی', amount: 500, unit: 'g', approxCostPer100g: 78000, category: 'protein' },
      { id: 'bq-2', name: 'نخود پوست‌گرفته خیس‌خورده', amount: 150, unit: 'g', approxCostPer100g: 14000, category: 'flour_grain' },
      { id: 'bq-3', name: 'کشک غلیظ سنتی محلی', amount: 200, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'bq-4', name: 'سیر تازه کوبیده و پیاز نگینی', amount: 6, unit: 'pcs', category: 'vegetable' },
      { id: 'bq-5', name: 'نعناع داغ و مغز گردوی خردشده', amount: 4, unit: 'tbsp', category: 'oil_fat' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت پیاز و گوشت', instruction: 'پیاز را با زردچوبه و سیر تفت دهید تا طلایی شود، سپس گوشت را اضافه کرده و تفت دهید تا تغییر رنگ دهد.', durationMinutes: 15 },
      { stepNumber: 2, title: 'پخت کامل گوشت و نخود', instruction: 'نخود خیس‌خورده را به همراه آب جوش بیفزایید و اجازه دهید با حرارت ملایم به مدت ۳ ساعت بپزد تا کاملاً له شود.', durationMinutes: 150, hasTimer: true },
      { stepNumber: 3, title: 'کوبیدن و افزودن کشک', instruction: 'استخوان‌های گوشت را جدا کرده و مواد را با گوشت‌کوب بکوبید. سپس کشک و زعفران را اضافه کرده و ۱۰ دقیقه دیگر بجوشانید تا جا بیفتد.', durationMinutes: 20 }
    ],
    goldenTips: [
      'گرفتن پوست نخود پس از خیساندن باعث لطافت مخملی بافت بزقرمه می‌شود.'
    ]
  },

  // 8. فلافل ترد بازاری آبادان
  {
    id: 'falafel-abadani-crispy',
    title: 'فلافل ترد و پوک بازاری آبادان با سس انبه تند و ادویه مخصوص جنوبی',
    persianSubtitle: 'ساندویچ خیابانی افسانه‌ای جنوب با نخود خیسانده، سیر، گشنیز، زیره و بکینگ‌پودر',
    canonical_name: 'فلافل آبادانی',
    alternate_names: ['فلافل', 'فلافل ترد خوزستان', 'ساندویچ فلافل'],
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و غذاهای بین‌المللی',
    originProvince: 'خوزستان',
    originRegion: 'خوزستان (آبادان و اهواز)',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-falafel-1',
        recipe_id: 'falafel-abadani-crispy',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'قرص‌های فلافل داغ سرخ‌شده با سس تند انبه',
        alt_text: 'فلافل ترد سنتی آبادانی با ترشی بندری و سس انبه',
        is_active: true
      }
    ],
    description: 'فلافل اصیل آبادانی بدون استفاده از نان باگت خیسانده یا سیب‌زمینی پخته؛ تنها از نخود خیس‌خورده ۲۴ ساعته چرخ‌شده با دانه زبر، سیر تازه، تخم گشنیز، پودر انبه و ادویه کاری مخصوص جنوب تهیه می‌شود.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 390,
    proteinGrams: 16,
    carbsGrams: 42,
    fatGrams: 18,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: [],
    ingredients: [
      { id: 'fa-1', name: 'نخود خیس‌خورده ۲۴ ساعته (آب پیاپی تعویض‌شده)', amount: 500, unit: 'g', approxCostPer100g: 13000, category: 'flour_grain' },
      { id: 'fa-2', name: 'سیر تازه حبه شده', amount: 6, unit: 'pcs', category: 'vegetable' },
      { id: 'fa-3', name: 'پیاز سفید متوسط', amount: 1, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'fa-4', name: 'پودر تخم گشنیز و زیره سبز آسیاب‌شده', amount: 1.5, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'fa-5', name: 'پودر فلفل قرمز تند و زردچوبه اعلا', amount: 1, unit: 'tbsp', category: 'spice_seasoning' },
      { id: 'fa-6', name: 'بکینگ‌پودر (جهت پوک شدن)', amount: 1, unit: 'tsp', category: 'spice_seasoning' },
      { id: 'fa-7', name: 'پودر انبه اصل آبادان و سرکه سفید برای سس', amount: 2, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'چرخ کردن نخود با دنده متوسط', instruction: 'نخود خیس‌خورده را به همراه پیاز و سیر یک بار با دنده متوسط چرخ کنید. بافت نخود نباید خمیری و له شود بلکه باید دانه‌ریز بماند.', durationMinutes: 15 },
      { stepNumber: 2, title: 'ادویه‌زنی و استراحت', instruction: 'تخم گشنیز، زیره، فلفل قرمز، نمک و ادویه کاری را به مایه افزوده و به مدت ۵ دقیقه ورز دهید. ۱ ساعت در یخچال بگذارید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'افزودن بکینگ‌پودر و قالب‌زنی', instruction: 'پیش از سرخ کردن، بکینگ‌پودر و ۲ قاشق آب سرد بیفزایید. قالب فلافل را در آب بزنید، مایه را در قالب پر کرده و با چنگال سوراخ ریزی وسط آن ایجاد کنید.', durationMinutes: 10 },
      { stepNumber: 4, title: 'سرخ کردن غوطه‌ور', instruction: 'قرص‌های فلافل را درون روغن داغ شناور سرخ کنید تا پوسته بیرونی ترد و طلایی و مغز آن کاملاً پخته شود.', durationMinutes: 15, hasTimer: true }
    ],
    goldenTips: [
      'نخود را هرگز نپزید؛ فلافل منحصراً با نخود خام خیسانده درست می‌شود تا روی روغن وانرود.',
      'افزودن تخم گشنیز و پودر انبه بوی مطبوع بازارهای فلافل اهواز و آبادان را پدید می‌آورد.'
    ]
  },

  // 9. سمبوسه جنوبی ترد با گوشت و سیب‌زمینی
  {
    id: 'sambuseh-jonoobi',
    title: 'سمبوسه ترد و برشته جنوبی با نان لواش، سیب‌زمینی معطر و گوشت چرخ‌کرده تند',
    persianSubtitle: 'پیچیدن اصیل مثلثی نان لواش با فیلینگ جعفری تازه، گشنیز، فلفل قرمز و سس انبه',
    canonical_name: 'سمبوسه',
    alternate_names: ['سمبوسه جنوبی', 'سمبوسه گوشت و سیب زمینی', 'سمبوسه ابادانی'],
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و غذاهای بین‌المللی',
    originProvince: 'خوزستان',
    originRegion: 'خوزستان و بوشهر',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-sambuseh-1',
        recipe_id: 'sambuseh-jonoobi',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'سمبوسه‌های ترد طلایی مثلثی سرخ‌شده',
        alt_text: 'سمبوسه مثلثی ترد و طلایی تند جنوبی با نان لواش',
        is_active: true
      }
    ],
    description: 'سمبوسه نوستالژیک خوزستانی با ترکیب سیب‌زمینی آبپز پوره‌شده، گوشت چرخ‌کرده، پیاز تفت‌داده، گشنیز و تره و جعفری معطر فراوان که در نان لواش نازک مثلثی پیچیده و طلایی سرخ می‌شود.',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 410,
    proteinGrams: 18,
    carbsGrams: 46,
    fatGrams: 18,
    dietaryTags: ['high_protein'],
    allergens: ['gluten'],
    ingredients: [
      { id: 'sm-1', name: 'سیب‌زمینی آبپز نگینی یا کوبیده', amount: 3, unit: 'pcs', unitWeightInGrams: 120, category: 'vegetable' },
      { id: 'sm-2', name: 'گوشت چرخ‌کرده تفت‌داده با پیاز', amount: 200, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'sm-3', name: 'جعفری، تره و گشنیز تازه ساطوری', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'sm-4', name: 'نان لواش نرم و تازه برش خورده به نوارهای طولی', amount: 8, unit: 'pcs', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'sm-5', name: 'فلفل قرمز تند، پودر تخم گشنیز و زردچوبه', amount: 15, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی مایه فیلینگ', instruction: 'پیاز را تفت داده، گوشت را بیفزایید تا بپزد، سپس سیب‌زمینی، سبزیجات تازه ساطوری و ادویه‌های تند را اضافه کرده و بگذارید خنک شود.', durationMinutes: 15 },
      { stepNumber: 2, title: 'برش و پیچیدن مثلثی نان لواش', instruction: 'نان لواش را به نوارهای ۱۰ در ۳۰ سانت ببرید. یک قاشق مایه گوشه نان گذاشته و به شکل متوالی مثلثی تا بزنید تا لبه آخر درون پاکت فرو رود.', durationMinutes: 15 },
      { stepNumber: 3, title: 'سرخ کردن ترد در روغن داغ', instruction: 'سمبوسه‌ها را در روغن داغ و نیمه‌عمیق قرار دهید تا دو طرف آن طلایی و کاملاً چیپسی شود، سپس روی دستمال روغن‌گیر بگذارید.', durationMinutes: 10, hasTimer: true }
    ],
    goldenTips: [
      'نان لواش باید حتماً نرم و تازه باشد؛ نان خشک هنگام تا زدن می‌شکند و مواد بیرون می‌ریزد.'
    ]
  },

  // 10. پیتزا مخلوط ایرانی نوستالژیک
  {
    id: 'pizza-makhloot-nostalgic',
    title: 'پیتزا مخلوط ایرانی نوستالژیک دهه شصت و هفتاد با خمیر ضخیم و کش پنیر فراوان',
    persianSubtitle: 'طعم اصیل پیتزافروشی‌های قدیمی تهران با کالباس خشک، سوسیس آلمانی، قارچ، فلفل دلمه‌ای و آویشن',
    canonical_name: 'پیتزا مخلوط ایرانی',
    alternate_names: ['پیتزا مخلوط', 'پیتزا نوستالژیک', 'پیتزا دهه شصت'],
    category: 'fast_food',
    categoryNameFa: 'فست‌فود و غذاهای بین‌المللی',
    originProvince: 'تهران',
    originRegion: 'تهران و سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-pizza-makhloot-1',
        recipe_id: 'pizza-makhloot-nostalgic',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'تصویر پیتزای مخلوط ضخیم ایرانی با پنیر فراوان و فلفل دلمه‌ای نگینی',
        alt_text: 'پیتزا مخلوط اصیل ایرانی با پنیر پیتزا کشدار و آویشن فراوان',
        is_active: true
      }
    ],
    description: 'پیتزای خاطره‌انگیز ایرانی با خمیر تپل تخمیری نرم، سس کچاپ سیردار، کالباس مرغوب خردشده، سوسیس، گوشت چرخ‌کرده تفت‌داده، قارچ ورقه، فلفل دلمه‌ای سبز نگینی و لایه ضخیم پنیر موزارلای کشدار با عطر آویشن شیرازی.',
    prepTimeMinutes: 40,
    cookTimeMinutes: 25,
    baseServings: 3,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 650,
    proteinGrams: 28,
    carbsGrams: 55,
    fatGrams: 36,
    dietaryTags: ['high_protein'],
    allergens: ['gluten', 'lactose'],
    ingredients: [
      { id: 'pm-1', name: 'خمیر پیتزای ضخیم تخمیری ایرانی', amount: 350, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'pm-2', name: 'کالباس و سوسیس مرغوب نگینی ریز', amount: 200, unit: 'g', approxCostPer100g: 35000, category: 'protein' },
      { id: 'pm-3', name: 'گوشت چرخ‌کرده تفت‌داده با پیاز', amount: 120, unit: 'g', approxCostPer100g: 75000, category: 'protein' },
      { id: 'pm-4', name: 'قارچ تازه ورقه‌شده و تفت‌داده بدون آب', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'pm-5', name: 'فلفل دلمه‌ای سبز نگینی معطر', amount: 1, unit: 'pcs', unitWeightInGrams: 80, category: 'vegetable' },
      { id: 'pm-6', name: 'پنیر پیتزا مطهر یا موزارلا و چدار کشدار', amount: 250, unit: 'g', category: 'dairy', allergens: ['lactose'] },
      { id: 'pm-7', name: 'پودر آویشن شیرازی اصل برای روی پیتزا', amount: 1, unit: 'tbsp', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'پهن کردن خمیر و سس', instruction: 'قالب پیتزا را چرب کرده، خمیر را با ضخامت ۸ میلی‌متر پهن کنید. سس گوجه معطر به آویشن را روی خمیر بمالید و کمی پنیر بپاشید.', durationMinutes: 10 },
      { stepNumber: 2, title: 'لایه‌چینی مواد گوشتی و قارچ', instruction: 'مخلوط کالباس، سوسیس، گوشت چرخ‌کرده و قارچ‌های تفت‌داده بدون آب را به صورت یکنواخت روی خمیر پخش کنید.', durationMinutes: 10 },
      { stepNumber: 3, title: 'پوشش پنیر و تزیین', instruction: 'لایه فراوان پنیر پیتزا را بریزید، روی آن فلفل دلمه‌ای نگینی و چند حلقه قارچ و کمی ذرت بچینید و پودر آویشن بپاشید.', durationMinutes: 5 },
      { stepNumber: 4, title: 'پخت در فر داغ', instruction: 'در فر از قبل گرم‌شده با دمای ۲۰۰ درجه سانتی‌گراد به مدت ۲۵ دقیقه قرار دهید تا نان بپزد و پنیر طلایی و حباب‌دار شود.', durationMinutes: 25, hasTimer: true, temperatureC: 200 }
    ],
    goldenTips: [
      'قارچ‌ها را حتماً پیش از قرار دادن روی پیتزا در تابه خشک کمی تفت دهید تا حین پخت آب نیندازد و پیتزا خمیر نشود.'
    ]
  },

  // 11. نان سنگک سنتی کنجدی داغ
  {
    id: 'nan-sangak-sonnati',
    title: 'نان سنگک سنتی کنجدی داغ تنوری روی سنگریزه با آرد سبوس‌دار کامل',
    persianSubtitle: 'سلطان نان‌های ایرانی با تخمیر طولانی ترش، عطر گندم کامل و کنجد برشته',
    canonical_name: 'نان سنگک',
    alternate_names: ['سنگک', 'نان سنگک دو رو کنجد'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-sangak-1',
        recipe_id: 'nan-sangak-sonnati',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'تصویر نان تخت سبوس‌دار سنتی با کنجد برشته',
        alt_text: 'نان سنگک سنتی سبوس‌دار داغ دو رو کنجد ایرانی',
        is_active: true
      }
    ],
    description: 'دستور نان سنگک خانگی با خمیر ترش اصیل و آرد سبوس‌دار کامل گندم، پخت روی سینی پر از قلوه‌سنگ‌های ریز رودخانه‌ای داغ در فر با حرارت بالا برای ایجاد حفره‌های مشخص سنگک.',
    prepTimeMinutes: 60,
    cookTimeMinutes: 15,
    baseServings: 6,
    difficulty: 'hard',
    difficultyFa: 'سخت / نیازمند سنگریزه و خمیر شل',
    caloriesPerServing: 210,
    proteinGrams: 8,
    carbsGrams: 42,
    fatGrams: 2,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'sesame'],
    ingredients: [
      { id: 'ns-1', name: 'آرد گندم سبوس‌دار کامل سنگک', amount: 500, unit: 'g', approxCostPer100g: 5000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'ns-2', name: 'خمیر ترش طبیعی یا مخمر فعال', amount: 10, unit: 'g', category: 'flour_grain' },
      { id: 'ns-3', name: 'کنجد سفید و سیاه بو داده', amount: 40, unit: 'g', category: 'spice_seasoning', allergens: ['sesame'] },
      { id: 'ns-4', name: 'آب ولرم برای خمیر نسبتاً شل و چسبنده', amount: 420, unit: 'ml', category: 'liquid' }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی خمیر شل و کشسان', instruction: 'آرد، آب ولرم و خمیرترش را مخلوط کرده و با دست ۱۰ دقیقه بزنید تا خمیری چسبنده، کشسان و مایع‌مانند حاصل شود. ۲ ساعت استراحت دهید.', durationMinutes: 20 },
      { stepNumber: 2, title: 'داغ کردن قلوه‌سنگ‌ها در فر', instruction: 'سنگریزه‌های تمیز را کف سینی فر چیده و فر را با بالاترین دمای ممکن (۲۵۰ درجه سانتی‌گراد) نیم ساعت داغ کنید.', durationMinutes: 30, temperatureC: 250 },
      { stepNumber: 3, title: 'پهن کردن روی پارو و پخت', instruction: 'دست را خیس کرده، خمیر را روی تخته مرطوب پهن و کشیده کنید، کنجد فراوان بپاشید و سریع روی سنگ‌های داغ فر سر دهید.', durationMinutes: 10, hasTimer: true }
    ],
    goldenTips: [
      'سنگ‌ها باید کاملاً داغ باشند تا خمیر سریع خود را بگیرد و به سنگ‌ها نچسبد.'
    ]
  },

  // 12. نان بربری طلایی با رومال مخصوص
  {
    id: 'nan-barbari-sonnati',
    title: 'نان بربری طلایی سنتی با رومال آردی مخصوص، کنجد و سیاه‌دانه',
    persianSubtitle: 'نان صبحانه محبوب با پوسته برشته شیاردار، بافت اسفنجی سبک و عطر جوش‌شیرین سنتی',
    canonical_name: 'نان بربری',
    alternate_names: ['بربری', 'نان بربری کنجدی'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'آذربایجان، تهران و سراسر ایران',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-barbari-1',
        recipe_id: 'nan-barbari-sonnati',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'نان بربری با شیارهای سنتی طلایی و کنجد',
        alt_text: 'نان بربری سنتی داغ طلایی با رومال مخصوص و کنجد',
        is_active: true
      }
    ],
    description: 'نان صبحانه نمادین با خمیر تخمیرشده، شیارهای انگشتی سنتی و راز طلایی بودن و براقیت پوسته: رومال غلیظ جوشانده آرد و آب و روغن که پیش از فر روی نان مالیده می‌شود.',
    prepTimeMinutes: 45,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'medium',
    difficultyFa: 'متوسط',
    caloriesPerServing: 240,
    proteinGrams: 7,
    carbsGrams: 49,
    fatGrams: 2,
    dietaryTags: ['vegetarian'],
    isVegetarian: true,
    allergens: ['gluten', 'sesame'],
    ingredients: [
      { id: 'nb-1', name: 'آرد نان فانتزی یا ستاره مرغوب', amount: 500, unit: 'g', approxCostPer100g: 6000, category: 'flour_grain', allergens: ['gluten'] },
      { id: 'nb-2', name: 'مخمر خشک فوری و شکر', amount: 10, unit: 'g', category: 'flour_grain' },
      { id: 'nb-3', name: 'رومال سنتی (آرد تفت‌داده با آب جوش و شیره)', amount: 60, unit: 'ml', category: 'sweetener' },
      { id: 'nb-4', name: 'کنجد سفید و سیاه‌دانه معطر', amount: 30, unit: 'g', category: 'spice_seasoning', allergens: ['sesame'] }
    ],
    steps: [
      { stepNumber: 1, title: 'آماده‌سازی خمیر و تخمیر', instruction: 'آرد، آب ولرم، مخمر و نمک را ورز دهید تا خمیر لطیفی به دست آید. ۱ ساعت در جای گرم استراحت دهید تا حجم آن دو برابر شود.', durationMinutes: 20 },
      { stepNumber: 2, title: 'رومال مخصوص بربری', instruction: '۱ قاشق آرد را با نصف لیوان آب و ۱ قاشق شکر روی گاز هم بزنید تا مثل فرنی غلیظ شود. این راز رنگ طلایی و درخشش نان بربری است.', durationMinutes: 10 },
      { stepNumber: 3, title: 'شیار زدن و پخت در فر', instruction: 'خمیر را به شکل بیضی باز کنید، رومال فراوان بمالید، با نوک انگشتان شیارهای عمیق طولی ایجاد کنید، کنجد بپاشید و در دمای ۲۳۰ درجه به مدت ۱۸ دقیقه بپزید.', durationMinutes: 20, hasTimer: true, temperatureC: 230 }
    ],
    goldenTips: [
      'قرار دادن یک کاسه آب جوش کف فر رطوبت لازم برای برشته و پفکی شدن بربری را تأمین می‌کند.'
    ]
  },

  // 13. املت قهوه‌خانه‌ای نوستالژیک
  {
    id: 'omelette-gojeh-irani',
    title: 'املت قهوه‌خانه‌ای نوستالژیک با رب گوجه سرخ‌شده، گوجه رنده‌شده و روغن فراوان',
    persianSubtitle: 'صبحانه بی‌رقیب بازاری با تخم‌مرغ عسلی، فلفل سیاه تازه، پیاز و نان سنگک داغ',
    canonical_name: 'املت گوجه فرنگی',
    alternate_names: ['املت قهوه خانه ای', 'املت بازاری', 'املت ربی'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-omelette-1',
        recipe_id: 'omelette-gojeh-irani',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'املت گوجه‌فرنگی و تخم‌مرغ سرخ‌شده در تابه روحی',
        alt_text: 'املت گوجه‌فرنگی قهوه‌خانه‌ای ایرانی با رب تفت‌داده و نان سنگک',
        is_active: true
      }
    ],
    description: 'راز املت قهوه‌خانه‌ای اصل: ابتدا تفت دادن سنگین رب گوجه در روغن مایع یا کره تا رنگ باز کند، سپس پوره گوجه رنده شده تا به روغن بیفتد، و در آخر شکستن تخم‌مرغ‌ها بدون هم‌زدن سریع تا تکه‌های لذیذ تخم‌مرغ در سس غلیظ شکل بگیرد.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    baseServings: 2,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 280,
    proteinGrams: 14,
    carbsGrams: 8,
    fatGrams: 22,
    dietaryTags: ['high_protein', 'vegetarian', 'keto', 'gluten_free'],
    isVegetarian: true,
    isGlutenFree: true,
    allergens: ['egg'],
    ingredients: [
      { id: 'om-1', name: 'تخم‌مرغ تازه مزرعه', amount: 4, unit: 'pcs', unitWeightInGrams: 60, category: 'protein', allergens: ['egg'] },
      { id: 'om-2', name: 'گوجه‌فرنگی فیله و رنده‌شده رسیده', amount: 3, unit: 'pcs', unitWeightInGrams: 100, category: 'vegetable' },
      { id: 'om-3', name: 'رب گوجه‌فرنگی مرغوب', amount: 1.5, unit: 'tbsp', category: 'vegetable' },
      { id: 'om-4', name: 'روغن مایع و کره محلی', amount: 40, unit: 'ml', category: 'oil_fat' },
      { id: 'om-5', name: 'فلفل سیاه تازه آسیاب‌شده و نمک دریا', amount: 6, unit: 'g', category: 'spice_seasoning' }
    ],
    steps: [
      { stepNumber: 1, title: 'تفت دادن رب در روغن فراوان', instruction: 'روغن را در تابه داغ کرده، رب را به مدت ۳ دقیقه تفت دهید تا رنگ آن باز شود و به قرمزی درخشان برسد.', durationMinutes: 5 },
      { stepNumber: 2, title: 'افزودن پوره گوجه و تبخیر آب', instruction: 'گوجه‌های رنده‌شده را افزوده و با حرارت بالا تفت دهید تا آب گوجه کاملاً کشیده شود و روغن روی سطح تابه کف کند.', durationMinutes: 7 },
      { stepNumber: 3, title: 'شکستن تخم‌مرغ‌ها و فرم‌گیری', instruction: 'تخم‌مرغ‌ها را مستقیم روی سس شکسته، ۱ دقیقه دست نزنید تا سفیده ببندد، سپس به آرامی زرده‌ها را باز کرده و فلفل سیاه بپاشید.', durationMinutes: 5, hasTimer: true }
    ],
    goldenTips: [
      'شعله تابه باید تند باشد و آب گوجه باید کاملاً تبخیر شود؛ در غیر این صورت املت شل و بدطعم می‌شود.'
    ]
  },

  // 14. سالاد ماکارونی مجلسی مهمانی
  {
    id: 'salad-macaroni-majlesi',
    title: 'سالاد ماکارونی مجلسی مهمانی با پاستا فرمی، ژامبون، ذرت و سس خردل مایونز',
    persianSubtitle: 'پیش‌غذای سرد محبوب تولدها با خیارشور نگینی، هویج، نخودفرنگی و شوید تازه',
    canonical_name: 'سالاد ماکارونی',
    alternate_names: ['سالاد پاستا', 'سالاد ماکارونی با مرغ', 'سالاد ماکارونی با ژامبون'],
    category: 'iranian_traditional',
    categoryNameFa: 'غذاهای اصیل ایرانی',
    originProvince: 'تهران',
    originRegion: 'سرتاسر ایران',
    image: 'https://images.unsplash.com/photo-1621996346565-e325d60bbf12?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-salad-macaroni-1',
        recipe_id: 'salad-macaroni-majlesi',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1621996346565-e325d60bbf12?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'سالاد ماکارونی سرد مخلوط با سس سفید و سبزیجات',
        alt_text: 'سالاد ماکارونی مجلسی مهمانی با سس مخصوص و شوید',
        is_active: true
      }
    ],
    description: 'سالاد پاستای سرد سنتی مهمانی‌های ایرانی با پاستای فرمی فیزیلی یا پروانه‌ای، خیارشور نگینی ریز بدون آب اضافی، ژامبون مرغوب ۹۰٪، ذرت شیرین، نخودفرنگی و سس خامه‌ای مایونز با آبلیمو و پودر آویشن.',
    prepTimeMinutes: 25,
    cookTimeMinutes: 15,
    baseServings: 6,
    difficulty: 'easy',
    difficultyFa: 'آسان',
    caloriesPerServing: 360,
    proteinGrams: 12,
    carbsGrams: 42,
    fatGrams: 16,
    dietaryTags: [],
    allergens: ['gluten', 'egg', 'lactose'],
    ingredients: [
      { id: 'smc-1', name: 'پاستا فرمی پخته و آبکش‌شده با آب سرد', amount: 300, unit: 'g', category: 'flour_grain', allergens: ['gluten'] },
      { id: 'smc-2', name: 'ژامبون مرغوب یا سینه مرغ ریش‌شده', amount: 200, unit: 'g', approxCostPer100g: 38000, category: 'protein' },
      { id: 'smc-3', name: 'خیارشور نگینی شسته‌شده و آب‌کشیده', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'smc-4', name: 'کنسرو ذرت شیرین و نخودفرنگی', amount: 150, unit: 'g', category: 'vegetable' },
      { id: 'smc-5', name: 'سس مایونز، ماست چکیده و سس خردل ملایم', amount: 180, unit: 'g', category: 'dairy', allergens: ['egg', 'lactose'] }
    ],
    steps: [
      { stepNumber: 1, title: 'پخت پاستا', instruction: 'پاستا را در آب جوش پرنمک بپزید (۱ دقیقه بیشتر از زمان معمول تا در سرما سفت نشود) سپس با آب سرد آبکش کرده و بگذارید کاملاً خنک شود.', durationMinutes: 12 },
      { stepNumber: 2, title: 'آماده‌سازی سس مخصوص', instruction: 'سس مایونز را با ماست چکیده، کمی آبلیموی تازه، سس خردل، روغن زیتون، نمک و آویشن مخلوط کنید.', durationMinutes: 5 },
      { stepNumber: 3, title: 'ترکیب و استراحت در یخچال', instruction: 'تمام مواد نگینی را با پاستای خنک و سس مخلوط کنید و حداقل ۲ ساعت در یخچال بگذارید تا طعم‌ها به خورد پاستا برود.', durationMinutes: 10 }
    ],
    goldenTips: [
      'خیارشورها را حتماً در آبکش بریزید تا آب اضافی پس ندهد و سس سالاد شل نشود.'
    ]
  },

  // 15. چای ایرانی اصیل سرگل لاهیجان با زعفران و هل
  {
    id: 'chai-irani-zaferani',
    title: 'چای سرگل بهاره لاهیجان دم‌کشیده با دانه هل، گل سرخ و نبات زعفرانی',
    persianSubtitle: 'نوشیدنی ملی و سنتی در قوری چینی با حرارت سماور، رنگ آلبالویی زلال و عطر مزارع شمال',
    canonical_name: 'چای ایرانی',
    alternate_names: ['چای زعفرانی', 'چای لاهیجان', 'چای سنتی'],
    category: 'drinks_beverages',
    categoryNameFa: 'نوشیدنی‌ها و شربت‌ها',
    originProvince: 'گیلان',
    originRegion: 'گیلان (لاهیجان) و سراسر ایران',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    image_verification_status: 'verified',
    recipe_quality_status: 'culinary_approved',
    image_assets: [
      {
        asset_id: 'img-chai-1',
        recipe_id: 'chai-irani-zaferani',
        image_role: 'primary',
        source_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
        source_name: 'Unsplash Verified Food Archive',
        license: 'Unsplash Free Commercial License',
        verification_status: 'verified',
        verification_notes: 'استکان کمر باریک چای زلال ایرانی با نبات زعفرانی',
        alt_text: 'استکان چای سرگل ایرانی زلال زعفرانی با گل سرخ و نبات',
        is_active: true
      }
    ],
    description: 'چای سرگل اصیل گیلان بدون هیچ اسانس شیمیایی، دم‌کشیده با آب تصفیه سبک در قوری چینی روی بخار ملایم سماور به مدت ۲۰ دقیقه تا رسیدن به رنگ یاقوتی زلال با عطر هل شکسته و غنچه گل سرخ کاشان.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 20,
    baseServings: 4,
    difficulty: 'easy',
    difficultyFa: 'آسان / نیازمند صبوری در دم‌کشیدن',
    caloriesPerServing: 2,
    proteinGrams: 0,
    carbsGrams: 0,
    fatGrams: 0,
    dietaryTags: ['vegetarian', 'gluten_free', 'low_calorie'],
    isVegetarian: true,
    isGlutenFree: true,
    allergens: [],
    ingredients: [
      { id: 'ch-1', name: 'چای خشک سرگل بهاره دست‌چین لاهیجان', amount: 3, unit: 'tbsp', approxCostPer100g: 22000, category: 'flour_grain' },
      { id: 'ch-2', name: 'دانه هل سبز شکسته و غنچه گل سرخ کاشان', amount: 4, unit: 'pcs', category: 'spice_seasoning' },
      { id: 'ch-3', name: 'آب جوش سبک و تازه جوشیده', amount: 800, unit: 'ml', category: 'liquid' },
      { id: 'ch-4', name: 'نبات کاسه‌ای زعفرانی اصیل برای سرو', amount: 4, unit: 'pcs', category: 'sweetener' }
    ],
    steps: [
      { stepNumber: 1, title: 'گرم کردن قوری و شستن چای', instruction: 'قوری چینی را با آب جوش گرم کنید. چای خشک را در قوری ریخته و یک بار با کمی آب سرد شستشو دهید و خالی کنید تا خاکه آن جدا شود.', durationMinutes: 3 },
      { stepNumber: 2, title: 'دم‌کشیدن با بخار سماور', instruction: 'آب جوش تازه را داخل قوری ریخته، هل شکسته و گل سرخ را اضافه کرده و قوری را روی سماور یا کتری با شعله کم بگذارید تا ۲۰ دقیقه با بخار ملایم دم بکشد.', durationMinutes: 20, hasTimer: true },
      { stepNumber: 3, title: 'سرو در استکان کمرباریک', instruction: 'چای را درون استکان‌های کمرباریک ریخته و همراه نبات زعفرانی و توت خشک سرو نمایید.', durationMinutes: 2 }
    ],
    goldenTips: [
      'چای طبیعی ایرانی بر خلاف چای خارجی رنگ مصنوعی ندارد و حداقل ۱۵ تا ۲۰ دقیقه زمان می‌برد تا رنگ یاقوتی و عطر اصیل خود را نشان دهد.'
    ]
  }
];
