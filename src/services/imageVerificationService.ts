import { Recipe, RecipeCategory, ProvinceCoverageItem, CategoryCoverageItem, RecipeImageAsset } from '../types';

export interface ImageAuditReport {
  totalRecipes: number;
  totalUniqueImages: number;
  duplicateCount: number;
  duplicatesList: { url: string; dishes: string[] }[];
  verifiedCount: number;
  provisionalCount: number;
  needsReviewCount: number;
  brokenUrlCount: number;
  categoryStats: CategoryCoverageItem[];
  provinceStats: ProvinceCoverageItem[];
}

// 31 Iranian Provinces Master Directory
export const IRAN_31_PROVINCES: { id: string; nameFa: string; centerFa: string }[] = [
  { id: 'tehran', nameFa: 'تهران', centerFa: 'تهران' },
  { id: 'isfahan', nameFa: 'اصفهان', centerFa: 'اصفهان' },
  { id: 'fars', nameFa: 'فارس', centerFa: 'شیراز' },
  { id: 'gilan', nameFa: 'گیلان', centerFa: 'رشت' },
  { id: 'mazandaran', nameFa: 'مازندران', centerFa: 'ساری' },
  { id: 'east_azerbaijan', nameFa: 'آذربایجان شرقی', centerFa: 'تبریز' },
  { id: 'west_azerbaijan', nameFa: 'آذربایجان غربی', centerFa: 'ارومیه' },
  { id: 'khorasan_razavi', nameFa: 'خراسان رضوی', centerFa: 'مشهد' },
  { id: 'khuzestan', nameFa: 'خوزستان', centerFa: 'اهواز' },
  { id: 'kermanshah', nameFa: 'کرمانشاه', centerFa: 'کرمانشاه' },
  { id: 'yazd', nameFa: 'یزد', centerFa: 'یزد' },
  { id: 'qazvin', nameFa: 'قزوین', centerFa: 'قزوین' },
  { id: 'ardabil', nameFa: 'اردبیل', centerFa: 'اردبیل' },
  { id: 'bushehr', nameFa: 'بوشهر', centerFa: 'بوشهر' },
  { id: 'hormozgan', nameFa: 'هرمزگان', centerFa: 'بندرعباس' },
  { id: 'kerman', nameFa: 'کرمان', centerFa: 'کرمان' },
  { id: 'kurdistan', nameFa: 'کردستان', centerFa: 'سنندج' },
  { id: 'lorestan', nameFa: 'لرستان', centerFa: 'خرم‌آباد' },
  { id: 'sistan_baluchestan', nameFa: 'سیستان و بلوچستان', centerFa: 'زاهدان' },
  { id: 'zanjan', nameFa: 'زنجان', centerFa: 'زنجان' },
  { id: 'hamedan', nameFa: 'همدان', centerFa: 'همدان' },
  { id: 'markazi', nameFa: 'مرکزی', centerFa: 'اراک' },
  { id: 'qom', nameFa: 'قم', centerFa: 'قم' },
  { id: 'semnan', nameFa: 'سمنان', centerFa: 'سمنان' },
  { id: 'golestan', nameFa: 'گلستان', centerFa: 'گرگان' },
  { id: 'chaharmahal_bakhtiari', nameFa: 'چهارمحال و بختیاری', centerFa: 'شهرکرد' },
  { id: 'kohgiluyeh_boyer_ahmad', nameFa: 'کهگیلویه و بویراحمد', centerFa: 'یاسوج' },
  { id: 'ilam', nameFa: 'ایلام', centerFa: 'ایلام' },
  { id: 'south_khorasan', nameFa: 'خراسان جنوبی', centerFa: 'بیرجند' },
  { id: 'north_khorasan', nameFa: 'خراسان شمالی', centerFa: 'بجنورد' },
  { id: 'alborz', nameFa: 'البرز', centerFa: 'کرج' }
];

export const CATEGORY_NAMES_FA: Record<RecipeCategory, string> = {
  breakfast: 'صبحانه‌های سنتی و فرنگی محبوب',
  iranian_traditional: 'خورش‌ها و پلوهای اصیل ایرانی',
  iranian_local: 'غذاهای محلی و سنتی استان‌ها',
  soup_ash: 'سوپ‌ها و آش‌های اصیل سنتی',
  fast_food: 'فست‌فود، پیتزا و برگر',
  international: 'غذاهای بین‌المللی محبوب',
  pastry_dry: 'شیرینی‌های خشک و سنتی عید',
  pastry_wet: 'شیرینی‌های تر، خردلی و ناپلئونی',
  cake_bakery: 'کیک، شیفون و عصرانه',
  icecream: 'انواع بستنی، فالوده و خوراکی‌های یخی',
  halva_traditional: 'حلوا، شله‌زرد و دسرهای سنتی و نذری',
  dessert_modern: 'ژله، کرم، پاناکوتا و دسرهای مدرن',
  dessert_icecream: 'دسر و بستنی',
  drinks_beverages: 'شربت‌های گیاهی و نوشیدنی‌ها'
};

export function getProvinceCoverage(recipes: Recipe[]): ProvinceCoverageItem[] {
  return IRAN_31_PROVINCES.map(prov => {
    const matched = recipes.filter(r => {
      const reg = (r.originProvince || r.originRegion || '').toLowerCase();
      return reg.includes(prov.nameFa.toLowerCase()) || reg.includes(prov.centerFa.toLowerCase());
    });

    const total = matched.length;
    let status: 'covered' | 'in_progress' | 'planned' = 'planned';
    if (total >= 2) status = 'covered';
    else if (total === 1) status = 'in_progress';

    return {
      id: prov.id,
      nameFa: prov.nameFa,
      centerFa: prov.centerFa,
      totalDishes: total,
      sampleDishes: matched.slice(0, 3).map(r => r.title),
      status
    };
  });
}

export function getCategoryCoverage(recipes: Recipe[]): CategoryCoverageItem[] {
  const categories: RecipeCategory[] = [
    'breakfast',
    'iranian_traditional',
    'iranian_local',
    'soup_ash',
    'fast_food',
    'international',
    'pastry_dry',
    'pastry_wet',
    'cake_bakery',
    'icecream',
    'halva_traditional',
    'dessert_modern',
    'drinks_beverages'
  ];

  return categories.map(cat => {
    const matched = recipes.filter(r => r.category === cat);
    const verified = matched.filter(r => r.image_verification_status !== 'needs_review');
    const total = matched.length;
    const verifiedCount = verified.length;
    const pct = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;

    return {
      category: cat,
      categoryNameFa: CATEGORY_NAMES_FA[cat] || cat,
      totalRecipes: total,
      verifiedImagesCount: verifiedCount,
      coveragePercentage: pct,
      status: pct >= 80 ? 'complete' : pct >= 50 ? 'in_progress' : 'planned'
    };
  });
}

export function auditAllRecipeImages(recipes: Recipe[]): ImageAuditReport {
  const imageCounts: Record<string, string[]> = {};
  let brokenUrlCount = 0;
  let verifiedCount = 0;
  let provisionalCount = 0;
  let needsReviewCount = 0;

  recipes.forEach(r => {
    if (!r.image || !r.image.startsWith('http')) {
      brokenUrlCount++;
    }

    if (!imageCounts[r.image]) {
      imageCounts[r.image] = [];
    }
    imageCounts[r.image].push(r.title);

    const status = r.image_verification_status || 'verified';
    if (status === 'verified') verifiedCount++;
    else if (status === 'provisional') provisionalCount++;
    else needsReviewCount++;
  });

  const duplicatesList = Object.entries(imageCounts)
    .filter(([_, list]) => list.length > 1)
    .map(([url, dishes]) => ({ url, dishes }));

  return {
    totalRecipes: recipes.length,
    totalUniqueImages: Object.keys(imageCounts).length,
    duplicateCount: duplicatesList.length,
    duplicatesList,
    verifiedCount,
    provisionalCount,
    needsReviewCount,
    brokenUrlCount,
    categoryStats: getCategoryCoverage(recipes),
    provinceStats: getProvinceCoverage(recipes)
  };
}
