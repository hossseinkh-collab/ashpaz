import React, { useState, useMemo } from 'react';
import { Cake, Sliders, Search, Clock, Flame, Sparkles, ChefHat, Heart, Utensils } from 'lucide-react';
import { RECIPES_DATA } from '../../data/recipes';
import { Recipe } from '../../types';
import { CakeCalculator } from './CakeCalculator';
import { DishImage } from '../common/DishImage';

interface PastryStudioViewProps {
  onSelectRecipe: (recipeId: string) => void;
}

type PastryFilterCategory = 'all' | 'cakes' | 'traditional_sweets' | 'wet_pastry' | 'icecream' | 'halva_traditional' | 'desserts_modern';

export const PastryStudioView: React.FC<PastryStudioViewProps> = ({ onSelectRecipe }) => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'calculator'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PastryFilterCategory>('all');

  // Filter all pastry, sweets, cakes, and confectionery recipes (strictly exclude soups & ashs)
  const allPastryRecipes = useMemo(() => {
    return RECIPES_DATA.filter(r => {
      if (r.title.includes('سوپ') || r.title.includes('آش') || r.category === 'soup_ash') return false;
      if (['cake_bakery', 'pastry_dry', 'pastry_wet', 'icecream', 'halva_traditional', 'dessert_modern', 'dessert_icecream'].includes(r.category)) return true;
      return (
        r.title.includes('کیک') ||
        r.title.includes('شیرینی') ||
        r.title.includes('باقلوا') ||
        r.title.includes('قطاب') ||
        r.title.includes('سوهان') ||
        r.title.includes('گز') ||
        r.title.includes('تارت') ||
        r.title.includes('دونات') ||
        r.title.includes('پیراشکی') ||
        r.title.includes('کوکی') ||
        r.title.includes('رولت') ||
        r.title.includes('براونی') ||
        r.title.includes('چیزکیک') ||
        r.title.includes('مافین') ||
        r.title.includes('نان خامه‌ای') ||
        r.title.includes('حلوا') ||
        r.title.includes('رنگینک') ||
        r.title.includes('مسقطی') ||
        r.title.includes('فرنی') ||
        r.title.includes('شله‌زرد') ||
        r.title.includes('بستنی') ||
        r.title.includes('فالوده') ||
        r.title.includes('یخ در بهشت')
      );
    });
  }, []);

  const categories: { id: PastryFilterCategory; labelFa: string; count: number }[] = useMemo(() => {
    const isCake = (r: Recipe) =>
      r.category === 'cake_bakery' ||
      r.title.includes('کیک') ||
      r.title.includes('چیزکیک') ||
      r.title.includes('براونی') ||
      r.title.includes('کاپ‌کیک') ||
      r.title.includes('مافین');

    const isTradSweet = (r: Recipe) =>
      r.category === 'pastry_dry' ||
      r.title.includes('باقلوا') ||
      r.title.includes('قطاب') ||
      r.title.includes('سوهان') ||
      r.title.includes('گز') ||
      r.title.includes('نخودچی') ||
      r.title.includes('نان برنجی') ||
      r.title.includes('قرابیه') ||
      r.title.includes('پشمک') ||
      r.title.includes('نوقا') ||
      r.title.includes('کشمشی') ||
      r.title.includes('نارگیلی');

    const isWetPastry = (r: Recipe) =>
      r.category === 'pastry_wet' ||
      r.title.includes('دانمارکی') ||
      r.title.includes('ناپلئونی') ||
      r.title.includes('رولت') ||
      r.title.includes('نان خامه‌ای') ||
      r.title.includes('دونات') ||
      r.title.includes('تارت') ||
      r.title.includes('پیراشکی') ||
      r.title.includes('ایکلر') ||
      r.title.includes('کروسان');

    const isIceCream = (r: Recipe) =>
      r.category === 'icecream' ||
      ((r.title.includes('بستنی') || r.title.includes('فالوده') || r.title.includes('یخ در بهشت') || r.id.startsWith('bastani-')) &&
        !r.title.includes('حلوا') &&
        !r.title.includes('شله‌زرد') &&
        !r.title.includes('سوپ') &&
        !r.title.includes('آش'));

    const isHalvaTrad = (r: Recipe) =>
      r.category === 'halva_traditional' ||
      r.title.includes('حلوا') ||
      r.title.includes('شله‌زرد') ||
      r.title.includes('مسقطی') ||
      r.title.includes('رنگینک') ||
      r.title.includes('فرنی') ||
      r.title.includes('سمنو') ||
      r.title.includes('شیربرنج');

    const isModernDessert = (r: Recipe) =>
      r.category === 'dessert_modern' ||
      r.title.includes('ژله') ||
      r.title.includes('پاناکوتا') ||
      r.title.includes('تیرامیسو') ||
      r.title.includes('بروله') ||
      r.title.includes('موس') ||
      r.title.includes('کاستارد') ||
      r.title.includes('سالاد میوه');

    return [
      { id: 'all', labelFa: 'همه شیرینی و دسرها', count: allPastryRecipes.length },
      { id: 'icecream', labelFa: '🍦 فقط بستنی و فالوده', count: allPastryRecipes.filter(isIceCream).length },
      { id: 'halva_traditional', labelFa: '🍯 حلوا و دسر سنتی', count: allPastryRecipes.filter(isHalvaTrad).length },
      { id: 'desserts_modern', labelFa: '🍮 ژله و دسر مدرن', count: allPastryRecipes.filter(isModernDessert).length },
      { id: 'cakes', labelFa: 'کیک و کاپ‌کیک', count: allPastryRecipes.filter(isCake).length },
      { id: 'traditional_sweets', labelFa: 'شیرینی سنتی و عید', count: allPastryRecipes.filter(isTradSweet).length },
      { id: 'wet_pastry', labelFa: 'شیرینی تر و خمیری', count: allPastryRecipes.filter(isWetPastry).length }
    ];
  }, [allPastryRecipes]);

  const filteredRecipes = useMemo(() => {
    return allPastryRecipes.filter(r => {
      if (selectedCategory === 'icecream') {
        const match =
          r.category === 'icecream' ||
          ((r.title.includes('بستنی') || r.title.includes('فالوده') || r.title.includes('یخ در بهشت') || r.id.startsWith('bastani-')) &&
            !r.title.includes('حلوا') &&
            !r.title.includes('شله‌زرد') &&
            !r.title.includes('سوپ') &&
            !r.title.includes('آش'));
        if (!match) return false;
      } else if (selectedCategory === 'halva_traditional') {
        const match =
          r.category === 'halva_traditional' ||
          r.title.includes('حلوا') ||
          r.title.includes('شله‌زرد') ||
          r.title.includes('مسقطی') ||
          r.title.includes('رنگینک') ||
          r.title.includes('فرنی') ||
          r.title.includes('سمنو') ||
          r.title.includes('شیربرنج');
        if (!match) return false;
      } else if (selectedCategory === 'desserts_modern') {
        const match =
          r.category === 'dessert_modern' ||
          r.title.includes('ژله') ||
          r.title.includes('پاناکوتا') ||
          r.title.includes('تیرامیسو') ||
          r.title.includes('بروله') ||
          r.title.includes('موس') ||
          r.title.includes('کاستارد') ||
          r.title.includes('سالاد میوه');
        if (!match) return false;
      } else if (selectedCategory === 'cakes') {
        const match =
          r.category === 'cake_bakery' ||
          r.title.includes('کیک') ||
          r.title.includes('چیزکیک') ||
          r.title.includes('براونی') ||
          r.title.includes('کاپ‌کیک') ||
          r.title.includes('مافین');
        if (!match) return false;
      } else if (selectedCategory === 'traditional_sweets') {
        const match =
          r.category === 'pastry_dry' ||
          r.title.includes('باقلوا') ||
          r.title.includes('قطاب') ||
          r.title.includes('سوهان') ||
          r.title.includes('گز') ||
          r.title.includes('نخودچی') ||
          r.title.includes('نان برنجی') ||
          r.title.includes('قرابیه') ||
          r.title.includes('پشمک') ||
          r.title.includes('نوقا') ||
          r.title.includes('کشمشی') ||
          r.title.includes('نارگیلی');
        if (!match) return false;
      } else if (selectedCategory === 'wet_pastry') {
        const match =
          r.category === 'pastry_wet' ||
          r.title.includes('دانمارکی') ||
          r.title.includes('ناپلئونی') ||
          r.title.includes('رولت') ||
          r.title.includes('نان خامه‌ای') ||
          r.title.includes('دونات') ||
          r.title.includes('تارت') ||
          r.title.includes('پیراشکی') ||
          r.title.includes('ایکلر') ||
          r.title.includes('کروسان');
        if (!match) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = r.title.toLowerCase().includes(q);
        const inSubtitle = r.persianSubtitle?.toLowerCase().includes(q);
        const inIngredients = r.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!inTitle && !inSubtitle && !inIngredients) return false;
      }

      return true;
    });
  }, [allPastryRecipes, selectedCategory, searchQuery]);

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4 font-['Vazirmatn',sans-serif]">
      {/* Top Header Mode Segmented Switcher */}
      <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-2 gap-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('recipes')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 ${
            activeTab === 'recipes'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Cake className="w-4 h-4" />
          <span>رسپی‌های قنادی و شیرینی ({allPastryRecipes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 ${
            activeTab === 'calculator'
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>محاسبه‌گر قالب و وزن کیک</span>
        </button>
      </div>

      {/* VIEW 1: COMPLETE PASTRY & SWEETS RECIPE DIRECTORY */}
      {activeTab === 'recipes' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Hero Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-400 text-slate-950">
                  <Cake className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-white">دانشنامه جامع قنادی و شیرینی‌پزی</h2>
              </div>
              <p className="text-[11px] text-slate-400">
                دستورهای اصیل کیک، شیرینی‌های عید، شیرینی تر و دسرها با عکس واقعی
              </p>
            </div>
            <span className="text-xs font-black font-mono text-amber-400 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 shrink-0">
              {allPastryRecipes.length} رسپی
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جست‌وجوی کیک، شیرینی سنتی، دونات، خامه، زعفران..."
              className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-200"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Category Filter Horizontal Slider */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full font-medium transition active:scale-95 text-[11px] flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>{cat.labelFa}</span>
                  <span className={`text-[10px] px-1 rounded-full ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Recipe List Counter */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>نمایش {filteredRecipes.length} دستور پخت شیرینی و قنادی</span>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-amber-400 hover:underline"
              >
                نمایش همه
              </button>
            )}
          </div>

          {/* Recipe Cards Grid */}
          <div className="space-y-3">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe.id)}
                className="group rounded-3xl bg-slate-900 border border-slate-800/80 overflow-hidden hover:border-amber-500/40 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99]"
              >
                <div className="relative">
                  <DishImage
                    recipe={recipe}
                    className="w-full h-40"
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Title and Badge on Image */}
                  <div className="absolute bottom-2.5 right-3 left-3 text-right">
                    <span className="text-[10px] font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-500/30 inline-block mb-1">
                      {recipe.categoryNameFa}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
                      {recipe.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle & Specs */}
                <div className="p-3.5 space-y-2">
                  <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                    {recipe.persianSubtitle || recipe.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{recipe.cookTimeMinutes} دقیقه</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>{recipe.caloriesPerServing} kcal</span>
                    </div>

                    <span className="text-emerald-400 font-medium">
                      {recipe.difficultyFa || 'متوسط'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredRecipes.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Utensils className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs font-bold">هیچ شیرینی یا کیکی با این عنوان یافت نشد.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-amber-400 hover:underline"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CAKE CALCULATOR FORMULATION STUDIO */}
      {activeTab === 'calculator' && (
        <div className="animate-in fade-in duration-200 -mx-4 -mt-2">
          <CakeCalculator />
        </div>
      )}
    </div>
  );
};
