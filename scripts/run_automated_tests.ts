import { RECIPES_DATA } from '../src/data/recipes';
import { normalizeToGramsOrMl, formatMeasurement, scaleRecipeByServings, calculateCakeDimensions } from '../src/services/calculationEngine';
import { getOkalaPriceDetails } from '../src/services/okalaPricingService';
import fs from 'fs';

interface TestResult {
  suite: string;
  testName: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function assert(suite: string, name: string, condition: boolean, message: string) {
  results.push({
    suite,
    testName: name,
    passed: !!condition,
    message: condition ? 'PASSED: ' + message : 'FAILED: ' + message
  });
}

console.log('Running Smart Chef Comprehensive Automated Test Suite...');

// 1. DATA INTEGRITY SUITE
assert('Data Integrity', 'Total Recipe Count', RECIPES_DATA.length >= 350, `Found ${RECIPES_DATA.length} active recipes`);
assert('Data Integrity', 'No Duplicate IDs', new Set(RECIPES_DATA.map(r => r.id)).size === RECIPES_DATA.length, 'All recipe IDs are strictly unique');

let hasMissingImage = false;
let hasMissingSteps = false;
let hasMissingIngredients = false;
let hasPinchUnit = false;

for (const r of RECIPES_DATA) {
  if (!r.image || r.image.trim() === '') hasMissingImage = true;
  if (!r.steps || r.steps.length === 0) hasMissingSteps = true;
  if (!r.ingredients || r.ingredients.length === 0) hasMissingIngredients = true;
  for (const ing of r.ingredients) {
    if ((ing.unit as any) === 'pinch' || ing.name.includes('پنس')) hasPinchUnit = true;
  }
}

assert('Data Integrity', 'All Recipes Have Images', !hasMissingImage, '100% of recipes have assigned image assets');
assert('Data Integrity', 'All Recipes Have Steps', !hasMissingSteps, '100% of recipes have step-by-step instructions');
assert('Data Integrity', 'All Recipes Have Ingredients', !hasMissingIngredients, '100% of recipes have discrete ingredient lists');
assert('Data Integrity', 'Pinch Unit Elimination', !hasPinchUnit, 'Zero occurrences of "پنس" or "pinch" in recipe database');

// 2. CALCULATION ENGINE SUITE
const garlicWeight = normalizeToGramsOrMl(3, 'pcs', undefined, 'سیر تازه حبه‌شده');
assert('Calculation Engine', 'Garlic Clove Weight Normalization', garlicWeight.value === 18, `3 cloves of garlic normalized to ${garlicWeight.value}g (expected 18g)`);

const flourCupWeight = normalizeToGramsOrMl(2, 'cup', undefined, 'آرد سفید قنادی');
assert('Calculation Engine', 'Flour Cup Density Normalization', flourCupWeight.value === 250, `2 cups flour normalized to ${flourCupWeight.value}g (expected 250g)`);

const sugarCupWeight = normalizeToGramsOrMl(1, 'cup', undefined, 'شکر سفید');
assert('Calculation Engine', 'Sugar Cup Density Normalization', sugarCupWeight.value === 200, `1 cup sugar normalized to ${sugarCupWeight.value}g (expected 200g)`);

const scaled = scaleRecipeByServings(RECIPES_DATA[0], 8);
assert('Calculation Engine', 'Servings Scaling Factor', scaled.scaleFactor === 2, `Scaling 4 to 8 servings yields factor ${scaled.scaleFactor}`);

const cakeCalc = calculateCakeDimensions({
  cakeType: 'sponge',
  calculationMode: 'by_weight',
  targetWeightKg: 1.5,
  servingsCount: 12,
  panShape: 'round',
  panDiameterCm: 22,
  panHeightCm: 7,
  layersCount: 2,
  frostingPreference: 'medium'
});
assert('Calculation Engine', 'Cake Pan Geometry Scaling', cakeCalc.recommendedPanDiameterCm > 0, `Recommended pan diameter: ${cakeCalc.recommendedPanDiameterCm}cm`);

// 3. OKALA PRICING ENGINE SUITE
const eggPrice = getOkalaPriceDetails('تخم‌مرغ', 4, 'pcs');
assert('Pricing Engine', 'Egg Pricing Accuracy', eggPrice.hasPrice && eggPrice.priceToman === 18000, `4 eggs priced at ${eggPrice.priceToman} Toman (4 * 4500)`);

const chickenBreastPrice = getOkalaPriceDetails('سینه مرغ پاک‌شده', 500, 'g');
assert('Pricing Engine', 'Chicken Breast Pricing Accuracy', chickenBreastPrice.hasPrice && chickenBreastPrice.priceToman === 87500, `500g chicken breast priced at ${chickenBreastPrice.priceToman} Toman`);

const waterPrice = getOkalaPriceDetails('آب جوش', 2, 'cup');
assert('Pricing Engine', 'Free Home Water Exclusion', !waterPrice.hasPrice && waterPrice.priceToman === null, 'Boiling water correctly marked as free household resource without fake price');

const muttonPrice = getOkalaPriceDetails('گوشت گوسفندی بدون چربی', 1000, 'g');
assert('Pricing Engine', 'Mutton Pricing Accuracy', muttonPrice.hasPrice && muttonPrice.priceToman === 680000, `1kg mutton priced at ${muttonPrice.priceToman} Toman`);

// Summary
const passedCount = results.filter(r => r.passed).length;
const failedCount = results.filter(r => !r.passed).length;

console.log('\n=== TEST RUN RESULTS ===');
results.forEach(r => console.log(`${r.passed ? '✓' : '✗'} [${r.suite}] ${r.testName}: ${r.message}`));
console.log(`\nTOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('ALL AUTOMATED TEST SUITES PASSED CLEANLY (100% SUCCESS)');
}
