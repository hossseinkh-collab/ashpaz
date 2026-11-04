import React, { useState } from 'react';
import { Clock, Flame, Users, Search, Sparkles, Filter, ChefHat } from 'lucide-react';
import { RECIPES_DATA } from '../../data/recipes';
import { Recipe, RecipeCategory } from '../../types';
import { DishImage } from '../common/DishImage';

interface RecipeListProps {
  onSelectRecipe: (recipeId: string) => void;
}

type FilterCategory = RecipeCategory | 'all' | 'pastry_all';

export const RecipeList: React.FC<RecipeListProps> = ({ onSelectRecipe }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [quickFilter, setQuickFilter] = useState<'all' | 'quick' | 'low_cal' | 'high_prot' | 'gluten_free'>('all');

  const categories: { id: FilterCategory; labelFa: string }[] = [
    { id: 'all', labelFa: 'همه رسپی‌ها' },
    { id: 'soup_ash', labelFa: '🍲 سوپ و آش' },
    { id: 'icecream', labelFa: '🍦 بستنی و فالوده' },
    { id: 'halva_traditional', labelFa: '🍯 حلوا و دسر سنتی' },
    { id: 'dessert_modern', labelFa: '🍮 ژله و دسر مدرن' },
    { id: 'pastry_all', labelFa: '🧁 شیرینی و کیک' },
    { id: 'breakfast', labelFa: '🍳 صبحانه (ایرانی و فرنگی)' },
    { id: 'iranian_traditional', labelFa: 'اصیل ایرانی' },
    { id: 'iranian_local', labelFa: 'سنتی و محلی' },
    { id: 'fast_food', labelFa: 'فست‌فود و برگر' },
    { id: 'international', labelFa: 'بین‌المللی' },
    { id: 'drinks_beverages', labelFa: 'شیک و نوشیدنی' }
  ];

  const filteredRecipes = RECIPES_DATA.filter(recipe => {
    // Category match
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'soup_ash') {
        const isSoupOrAsh = recipe.category === 'soup_ash' || recipe.title.includes('سوپ') || recipe.title.includes('آش');
        if (!isSoupOrAsh) return false;
      } else if (selectedCategory === 'icecream') {
        const isIceCreamOnly =
          recipe.category === 'icecream' ||
          ((recipe.title.includes('بستنی') || recipe.title.includes('فالوده') || recipe.id.startsWith('bastani-')) &&
            !recipe.title.includes('سوپ') &&
            !recipe.title.includes('آش') &&
            !recipe.title.includes('حلوا') &&
            !recipe.title.includes('شله‌زرد'));
        if (!isIceCreamOnly) return false;
      } else if (selectedCategory === 'halva_traditional') {
        const isHalvaOrTrad =
          recipe.category === 'halva_traditional' ||
          recipe.title.includes('حلوا') ||
          recipe.title.includes('شله‌زرد') ||
          recipe.title.includes('مسقطی') ||
          recipe.title.includes('رنگینک') ||
          recipe.title.includes('سمنو') ||
          recipe.title.includes('فرنی') ||
          recipe.title.includes('شیربرنج');
        if (!isHalvaOrTrad) return false;
      } else if (selectedCategory === 'dessert_modern') {
        const isModern =
          recipe.category === 'dessert_modern' ||
          recipe.title.includes('ژله') ||
          recipe.title.includes('پاناکوتا') ||
          recipe.title.includes('تیرامیسو') ||
          recipe.title.includes('بروله') ||
          recipe.title.includes('موس') ||
          recipe.title.includes('کاستارد');
        if (!isModern) return false;
      } else if (selectedCategory === 'pastry_all') {
        // Exclude soups and ice creams from bakery/pastry
        if (recipe.title.includes('سوپ') || recipe.title.includes('آش') || recipe.category === 'soup_ash' || recipe.category === 'icecream' || recipe.title.includes('بستنی')) {
          return false;
        }
        const isPastry =
          ['pastry_dry', 'pastry_wet', 'cake_bakery'].includes(recipe.category) ||
          recipe.title.includes('کیک') ||
          recipe.title.includes('شیرینی') ||
          recipe.title.includes('باقلوا') ||
          recipe.title.includes('قطاب') ||
          recipe.title.includes('سوهان') ||
          recipe.title.includes('گز') ||
          recipe.title.includes('تارت') ||
          recipe.title.includes('دونات') ||
          recipe.title.includes('پیراشکی') ||
          recipe.title.includes('کوکی') ||
          recipe.title.includes('رولت');
        if (!isPastry) return false;
      } else if (recipe.category !== selectedCategory) {
        return false;
      }
    }

    // Quick filter match
    if (quickFilter === 'quick' && recipe.cookTimeMinutes > 30) return false;
    if (quickFilter === 'low_cal' && recipe.caloriesPerServing > 400) return false;
    if (quickFilter === 'high_prot' && recipe.proteinGrams < 30) return false;
    if (quickFilter === 'gluten_free' && (recipe.allergens.includes('gluten') || !recipe.isGlutenFree)) return false;

    // Search query match (title, subtitle, description, ingredients)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = recipe.title.toLowerCase().includes(q);
      const inSubtitle = recipe.persianSubtitle.toLowerCase().includes(q);
      const inIng = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
      if (!inTitle && !inSubtitle && !inIng) return false;
    }

    return true;
  });

  return (
    <div className="pb-24 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* Android Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="جست‌وجوی غذا، شیرینی یا مواد اولیه..."
          className="w-full pl-4 pr-11 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
          >
            پاک کردن
          </button>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition active:scale-95 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/80'
              }`}
            >
              {cat.labelFa}
            </button>
          );
        })}
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] text-slate-400 py-0.5">
        <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <button
          onClick={() => setQuickFilter(quickFilter === 'quick' ? 'all' : 'quick')}
          className={`whitespace-nowrap px-2 py-0.5 rounded-md border transition ${
            quickFilter === 'quick' ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold' : 'border-slate-700 text-slate-400'
          }`}
        >
          سریع (&lt;۳۰ دقیقه)
        </button>
        <button
          onClick={() => setQuickFilter(quickFilter === 'low_cal' ? 'all' : 'low_cal')}
          className={`whitespace-nowrap px-2 py-0.5 rounded-md border transition ${
            quickFilter === 'low_cal' ? 'border-rose-400 bg-rose-400/10 text-rose-300 font-bold' : 'border-slate-700 text-slate-400'
          }`}
        >
          کم‌کالری (&lt;۴۰۰)
        </button>
        <button
          onClick={() => setQuickFilter(quickFilter === 'high_prot' ? 'all' : 'high_prot')}
          className={`whitespace-nowrap px-2 py-0.5 rounded-md border transition ${
            quickFilter === 'high_prot' ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300 font-bold' : 'border-slate-700 text-slate-400'
          }`}
        >
          پروتئین بالا (&gt;۳۰g)
        </button>
        <button
          onClick={() => setQuickFilter(quickFilter === 'gluten_free' ? 'all' : 'gluten_free')}
          className={`whitespace-nowrap px-2 py-0.5 rounded-md border transition ${
            quickFilter === 'gluten_free' ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold' : 'border-slate-700 text-slate-400'
          }`}
        >
          بدون گلوتن
        </button>
      </div>

      {/* Recipe List Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
        <span>نمایش {filteredRecipes.length} دستور پخت</span>
        <span className="text-[11px] text-amber-400/90 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          فرمولاسیون دقیق قنادی و آشپزی
        </span>
      </div>

      {/* Recipe Cards Grid */}
      <div className="space-y-3.5">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe.id)}
            className="group bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition active:scale-[0.99] cursor-pointer"
          >
            {/* Card Image with Verified Authenticity Badge */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-800">
              <DishImage
                recipe={recipe}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                showBadge={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Category Badge */}
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  {recipe.categoryNameFa}
                </span>
              </div>

              {/* Difficulty & Region */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700">
                  {recipe.difficultyFa}
                </span>
              </div>

              {/* Title & Subtitle overlay at bottom */}
              <div className="absolute bottom-2.5 right-3 left-3 text-right">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition leading-snug">
                  {recipe.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {recipe.persianSubtitle}
                </p>
              </div>
            </div>

            {/* Card Details Footer */}
            <div className="p-3 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{recipe.cookTimeMinutes} دقیقه پخت</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>پایه {recipe.baseServings} نفره</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono">
                  {recipe.proteinGrams}g پرو
                </span>
                <div className="flex items-center gap-1 text-amber-400 font-mono">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{recipe.caloriesPerServing} kcal</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 px-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <ChefHat className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">دستوری با این مشخصات یافت نشد</h4>
            <p className="text-xs text-slate-500">
              می‌توانید عبارت جست‌وجو را تغییر دهید یا فیلترها را پاک کنید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
