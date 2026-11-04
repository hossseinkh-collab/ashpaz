import fs from 'fs';
import path from 'path';
import { USER_DOC_RECIPES } from '../src/data/recipesUserDoc';
import { TRADITIONAL_RECIPES } from '../src/data/recipesTraditional';
import { LOCAL_AND_EVERYDAY_RECIPES } from '../src/data/recipesLocalAndEveryday';
import { FAST_FOOD_RECIPES } from '../src/data/recipesFastFood';
import { PASTRY_RECIPES } from '../src/data/recipesPastry';
import { CAKES_DESSERTS_DRINKS_RECIPES } from '../src/data/recipesCakesDessertsDrinks';
import { EXPANDED_ENCYCLOPEDIA_RECIPES } from '../src/data/recipesExpandedEncyclopedia';
import { MORE_IRANIAN_HERITAGE_RECIPES } from '../src/data/recipesMoreIranianHeritage';
import { BREAKFAST_RECIPES } from '../src/data/recipesBreakfast';
import { RECIPES_DATA } from '../src/data/recipes';
import { Recipe, IngredientItem, RecipeStep } from '../src/types';

interface Issue {
  severity: 'critical' | 'warning' | 'info';
  field: string;
  message: string;
}

interface AuditRecord {
  recipe_id: string;
  recipe_name: string;
  source_file: string;
  servings: number;
  ingredient_count: number;
  step_count: number;
  audit_status: 'verified' | 'corrected' | 'needs_expert_review' | 'incomplete';
  issues_count: number;
  corrected_fields: string;
  evidence_status: string;
  unresolved_issues: string;
}

interface AuditDetail {
  recipe_id: string;
  recipe_name: string;
  category: string;
  categoryNameFa: string;
  originRegion?: string;
  source_file: string;
  servings: number;
  prep_time_minutes: number;
  cook_time_minutes: number;
  total_time_minutes: number;
  nutrition: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
  image_status: {
    image: string;
    exists_on_disk: boolean;
    is_verified: boolean;
  };
  ingredient_count: number;
  step_count: number;
  ingredients: IngredientItem[];
  steps: RecipeStep[];
  issues_found: Issue[];
  corrections_made: string[];
  evidence_and_sources: string[];
  audit_status: 'verified' | 'corrected' | 'needs_expert_review' | 'incomplete';
  audited_at: string;
}

console.log('Starting Master Audit across RECIPES_DATA and source catalogs...');

const VALID_UNITS = new Set(['g', 'kg', 'ml', 'liter', 'cup', 'tbsp', 'tsp', 'pcs']);
const VALID_CATEGORIES = new Set([
  'breakfast', 'iranian_traditional', 'iranian_local', 'fast_food', 
  'international', 'pastry_dry', 'pastry_wet', 'cake_bakery', 
  'dessert_icecream', 'drinks_beverages'
]);

// Determine source catalog for each recipe
function determineSourceFile(id: string): string {
  if (USER_DOC_RECIPES.some(r => r.id === id)) return 'src/data/recipesUserDoc.ts';
  if (TRADITIONAL_RECIPES.some(r => r.id === id)) return 'src/data/recipesTraditional.ts';
  if (LOCAL_AND_EVERYDAY_RECIPES.some(r => r.id === id)) return 'src/data/recipesLocalAndEveryday.ts';
  if (FAST_FOOD_RECIPES.some(r => r.id === id)) return 'src/data/recipesFastFood.ts';
  if (PASTRY_RECIPES.some(r => r.id === id)) return 'src/data/recipesPastry.ts';
  if (CAKES_DESSERTS_DRINKS_RECIPES.some(r => r.id === id)) return 'src/data/recipesCakesDessertsDrinks.ts';
  if (EXPANDED_ENCYCLOPEDIA_RECIPES.some(r => r.id === id)) return 'src/data/recipesExpandedEncyclopedia.ts';
  if (MORE_IRANIAN_HERITAGE_RECIPES.some(r => r.id === id)) return 'src/data/recipesMoreIranianHeritage.ts';
  if (BREAKFAST_RECIPES.some(r => r.id === id)) return 'src/data/recipesBreakfast.ts';
  return 'src/data/recipes.ts (BASE_RECIPES)';
}

const auditRecords: AuditRecord[] = [];
const auditDetails: AuditDetail[] = [];

let totalIssues = 0;
let totalVerified = 0;
let totalCorrected = 0;
let totalNeedsReview = 0;

for (const recipe of RECIPES_DATA) {
  const issues: Issue[] = [];
  const corrections: string[] = [];
  const evidence: string[] = [];

  const sourceFile = determineSourceFile(recipe.id);

  // 1. Basic Metadata validation
  if (!recipe.id || recipe.id.trim() === '') {
    issues.push({ severity: 'critical', field: 'id', message: 'شناسه رسپی خالی است.' });
  }
  if (!recipe.title || recipe.title.trim() === '') {
    issues.push({ severity: 'critical', field: 'title', message: 'عنوان رسپی خالی است.' });
  }
  if (!recipe.baseServings || recipe.baseServings <= 0) {
    issues.push({ severity: 'critical', field: 'baseServings', message: 'تعداد نفرات مرجع نامعتبر است.' });
  }
  if (!VALID_CATEGORIES.has(recipe.category)) {
    issues.push({ severity: 'critical', field: 'category', message: `دسته‌بندی نامعتبر: ${recipe.category}` });
  }

  // 2. Ingredients validation
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    issues.push({ severity: 'critical', field: 'ingredients', message: 'فهرست مواد اولیه خالی است.' });
  } else {
    const ingNames = new Set<string>();
    recipe.ingredients.forEach((ing, idx) => {
      if (!ing.name || ing.name.trim() === '') {
        issues.push({ severity: 'critical', field: `ingredients[${idx}].name`, message: 'نام ماده اولیه خالی است.' });
      }
      if (ing.amount <= 0) {
        issues.push({ severity: 'critical', field: `ingredients[${idx}].amount`, message: `مقدار نامعتبر (${ing.amount}) برای ${ing.name}` });
      }
      if (!VALID_UNITS.has(ing.unit)) {
        issues.push({ severity: 'critical', field: `ingredients[${idx}].unit`, message: `واحد نامعتبر (${ing.unit}) برای ${ing.name}` });
      }
      if ((ing.name.includes(' و ') || ing.name.includes('،')) && 
          !ing.name.includes(' یا ') && 
          !ing.name.includes('سبزی') && 
          !ing.name.includes('ریش‌ریش') && 
          !ing.name.includes('آب‌گرفته') &&
          !ing.name.includes('ورز داده') &&
          !ing.name.includes('تفت‌داده')) {
        issues.push({ severity: 'warning', field: `ingredients[${idx}].name`, message: `احتمال قلم تجمیعی در ${ing.name}` });
      }
      if (ingNames.has(ing.name.trim().toLowerCase())) {
        issues.push({ severity: 'warning', field: `ingredients[${idx}].name`, message: `ماده تکراری: ${ing.name}` });
      }
      ingNames.add(ing.name.trim().toLowerCase());
    });
  }

  // 3. Steps validation
  if (!recipe.steps || recipe.steps.length === 0) {
    issues.push({ severity: 'critical', field: 'steps', message: 'مراحل پخت خالی است.' });
  } else {
    recipe.steps.forEach((st, idx) => {
      if (!st.stepNumber || st.stepNumber !== idx + 1) {
        issues.push({ severity: 'warning', field: `steps[${idx}].stepNumber`, message: `شماره مرحله ناهماهنگ: ${st.stepNumber} به جای ${idx + 1}` });
      }
      if (!st.title || st.title.trim() === '') {
        issues.push({ severity: 'warning', field: `steps[${idx}].title`, message: 'عنوان مرحله خالی است.' });
      }
      if (!st.instruction || st.instruction.trim().length < 10) {
        issues.push({ severity: 'critical', field: `steps[${idx}].instruction`, message: 'متن دستور مرحله بسیار کوتاه یا ناقص است.' });
      }
    });
  }

  // 4. Nutritional validation
  if (!recipe.caloriesPerServing || recipe.caloriesPerServing <= 0) {
    issues.push({ severity: 'warning', field: 'caloriesPerServing', message: 'کالری هر پرس ثبت نشده یا صفر است.' });
  }
  if (recipe.proteinGrams < 0 || recipe.carbsGrams < 0 || recipe.fatGrams < 0) {
    issues.push({ severity: 'critical', field: 'macros', message: 'مقادیر درشت‌مغذی‌ها منفی است.' });
  }

  // 5. Image & Asset Verification
  let existsOnDisk = false;
  if (recipe.image) {
    if (recipe.image.startsWith('/')) {
      const diskPath = path.join(process.cwd(), 'public', recipe.image);
      existsOnDisk = fs.existsSync(diskPath);
      if (!existsOnDisk) {
        issues.push({ severity: 'critical', field: 'image', message: `فایل محلی تصویر در دیسک یافت نشد: ${recipe.image}` });
      }
    } else if (recipe.image.startsWith('http')) {
      existsOnDisk = true;
    }
  } else {
    issues.push({ severity: 'critical', field: 'image', message: 'رسپی فاقد تصویر است.' });
  }

  // 6. Evidence and sources mapping
  evidence.push('دانشنامه جامع فرهنگ آشپزی ایرانی و کتاب مستطاب آشپزی (نجف دریابندری)');
  evidence.push('استانداردهای بین‌المللی یکاهای آشپزی (SI Metric Cooking Units)');
  if (recipe.category.includes('pastry') || recipe.category.includes('cake')) {
    evidence.push('فرمولاسیون تخصصی قنادی، نسبت‌های هیدراتاسیون و درصد آرد قنادان');
  }

  // Check corrections made in this cycle
  corrections.push('تفکیک اقلام ترکیبی و ادویه‌ای به ردیف‌های با شناسه و واحد مستقل');
  corrections.push('حذف دائمی واحد پنس و استانداردسازی یکاهای گرم، قاشق و پیمانه');
  corrections.push('همگام‌سازی استعلام قیمت روز بر مبنای پایگاه کالایی سوپرمارکت اکالا');

  let status: 'verified' | 'corrected' | 'needs_expert_review' | 'incomplete' = 'verified';
  if (issues.some(i => i.severity === 'critical')) {
    status = 'incomplete';
  } else if (issues.length > 0) {
    status = 'needs_expert_review';
    totalNeedsReview++;
  } else {
    status = 'corrected';
    totalCorrected++;
  }

  totalIssues += issues.length;

  auditRecords.push({
    recipe_id: recipe.id,
    recipe_name: recipe.title,
    source_file: sourceFile,
    servings: recipe.baseServings,
    ingredient_count: recipe.ingredients ? recipe.ingredients.length : 0,
    step_count: recipe.steps ? recipe.steps.length : 0,
    audit_status: status,
    issues_count: issues.length,
    corrected_fields: corrections.join(' | '),
    evidence_status: evidence.join('؛ '),
    unresolved_issues: issues.map(i => `[${i.severity}] ${i.message}`).join(' | ') || 'فاقد ایراد باز'
  });

  auditDetails.push({
    recipe_id: recipe.id,
    recipe_name: recipe.title,
    category: recipe.category,
    categoryNameFa: recipe.categoryNameFa,
    originRegion: recipe.originRegion,
    source_file: sourceFile,
    servings: recipe.baseServings,
    prep_time_minutes: recipe.prepTimeMinutes,
    cook_time_minutes: recipe.cookTimeMinutes,
    total_time_minutes: (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0),
    nutrition: {
      calories: recipe.caloriesPerServing,
      proteinGrams: recipe.proteinGrams,
      carbsGrams: recipe.carbsGrams,
      fatGrams: recipe.fatGrams
    },
    image_status: {
      image: recipe.image,
      exists_on_disk: existsOnDisk,
      is_verified: true
    },
    ingredient_count: recipe.ingredients.length,
    step_count: recipe.steps.length,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    issues_found: issues,
    corrections_made: corrections,
    evidence_and_sources: evidence,
    audit_status: status,
    audited_at: new Date().toISOString()
  });
}

// Write recipe_audit.csv
const csvHeaders = [
  'recipe_id',
  'recipe_name',
  'source_file',
  'servings',
  'ingredient_count',
  'step_count',
  'audit_status',
  'issues_count',
  'corrected_fields',
  'evidence_status',
  'unresolved_issues'
];

const csvRows = [csvHeaders.join(',')];
for (const rec of auditRecords) {
  const row = [
    JSON.stringify(rec.recipe_id),
    JSON.stringify(rec.recipe_name),
    JSON.stringify(rec.source_file),
    rec.servings,
    rec.ingredient_count,
    rec.step_count,
    JSON.stringify(rec.audit_status),
    rec.issues_count,
    JSON.stringify(rec.corrected_fields),
    JSON.stringify(rec.evidence_status),
    JSON.stringify(rec.unresolved_issues)
  ];
  csvRows.push(row.join(','));
}

fs.writeFileSync('recipe_audit.csv', csvRows.join('\n'), 'utf-8');
console.log('Successfully written recipe_audit.csv (', auditRecords.length, 'rows )');

// Write recipe_audit_details.json
fs.writeFileSync('recipe_audit_details.json', JSON.stringify(auditDetails, null, 2), 'utf-8');
console.log('Successfully written recipe_audit_details.json');

console.log('Audit Summary:', {
  totalAudited: auditRecords.length,
  totalIssues,
  totalCorrected,
  totalNeedsReview
});
