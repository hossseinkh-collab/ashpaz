import React, { useState } from 'react';
import { 
  Refrigerator, Search, Check, AlertCircle, Sparkles, 
  Plus, Trash2, Calendar, Clock, Layers, ArrowLeft
} from 'lucide-react';
import { RECIPES_DATA } from '../../data/recipes';
import { INGREDIENT_SUBSTITUTIONS_DATA } from '../../data/substitutions';
import { 
  addPantryItem, 
  deletePantryItem, 
  getExpiryStatus, 
  getPantryItems, 
  updatePantryItem 
} from '../../services/inventoryService';
import { InventoryItem, MeasurementUnit } from '../../types';
import { formatMeasurement } from '../../services/calculationEngine';

const COMMON_PANTRY_ITEMS = [
  'پیاز', 'مرغ', 'گوشت گوسفندی', 'برنج', 'تخم‌مرغ',
  'ماست', 'آرد نول', 'سیب‌زمینی', 'گوجه‌فرنگی', 'رب گوجه‌فرنگی',
  'لوبیا قرمز', 'قارچ', 'پنیر موزارلا', 'کره', 'زعفران',
  'شیر', 'شکر', 'سبزی قورمه', 'لیمو عمانی', 'بکینگ‌پودر'
];

export const FridgeChef: React.FC<{ onOpenRecipe: (id: string) => void }> = ({ onOpenRecipe }) => {
  const [subTab, setSubTab] = useState<'matcher' | 'inventory' | 'substitutes'>('matcher');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['پیاز', 'برنج', 'مرغ', 'ماست']);
  const [pantryItems, setPantryItems] = useState<InventoryItem[]>(getPantryItems());
  const [searchSub, setSearchSub] = useState('');

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState<number>(1);
  const [newItemUnit, setNewItemUnit] = useState<MeasurementUnit>('kg');
  const [newItemLocation, setNewItemLocation] = useState<'refrigerator' | 'freezer' | 'pantry'>('refrigerator');
  const [newItemExpiry, setNewItemExpiry] = useState<string>('2026-11-01');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleSelectIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  // Recipe match calculation
  const recipeMatches = RECIPES_DATA.map(recipe => {
    let matchedCount = 0;
    const missingIngredients: string[] = [];

    recipe.ingredients.forEach(ing => {
      const isMatched = selectedIngredients.some(sel =>
        ing.name.includes(sel) || sel.includes(ing.name)
      );
      if (isMatched) {
        matchedCount++;
      } else {
        missingIngredients.push(ing.name);
      }
    });

    const matchPercentage = Math.round((matchedCount / recipe.ingredients.length) * 100);

    return {
      recipe,
      matchPercentage,
      matchedCount,
      totalCount: recipe.ingredients.length,
      missingIngredients
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const handleCreatePantryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const locMap = {
      refrigerator: 'یخچال',
      freezer: 'فریزر',
      pantry: 'کابینت و انبار'
    };

    addPantryItem({
      name: newItemName.trim(),
      amount: newItemAmount,
      unit: newItemUnit,
      category: 'مواد غذایی',
      storageLocation: newItemLocation,
      storageLocationFa: locMap[newItemLocation],
      expirationDate: newItemExpiry
    });

    setPantryItems(getPantryItems());
    setNewItemName('');
    setShowAddForm(false);
  };

  const handleDeleteItem = (id: string) => {
    deletePantryItem(id);
    setPantryItems(getPantryItems());
  };

  const filteredSubs = INGREDIENT_SUBSTITUTIONS_DATA.filter(s =>
    !searchSub.trim() ||
    s.originalIngredient.includes(searchSub.trim()) ||
    s.substituteIngredient.includes(searchSub.trim())
  );

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
        <button
          onClick={() => setSubTab('matcher')}
          className={`py-2 px-1 rounded-xl font-medium transition active:scale-95 text-center ${
            subTab === 'matcher' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          چی بپزم؟ (پیشنهاد)
        </button>
        <button
          onClick={() => setSubTab('inventory')}
          className={`py-2 px-1 rounded-xl font-medium transition active:scale-95 text-center ${
            subTab === 'inventory' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          موجودی انبار و تاریخ
        </button>
        <button
          onClick={() => setSubTab('substitutes')}
          className={`py-2 px-1 rounded-xl font-medium transition active:scale-95 text-center ${
            subTab === 'substitutes' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          جایگزینی مواد
        </button>
      </div>

      {/* 1. چی بپزم؟ (Fridge Matcher) */}
      {subTab === 'matcher' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Refrigerator className="w-4 h-4 text-amber-400" />
                مواد موجود در خانه را انتخاب کنید:
              </h3>
              <span className="text-[11px] text-amber-400 font-mono">
                {selectedIngredients.length} ماده انتخاب شده
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {COMMON_PANTRY_ITEMS.map(item => {
                const isSelected = selectedIngredients.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleSelectIngredient(item)}
                    className={`px-2.5 py-1 rounded-full text-xs transition active:scale-95 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700'
                    }`}
                  >
                    {item} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 px-1">
              پیشنهادهای آشپزی با بیشترین تطابق ({recipeMatches.length} مورد):
            </h4>

            {recipeMatches.map(({ recipe, matchPercentage, matchedCount, totalCount, missingIngredients }) => (
              <div
                key={recipe.id}
                onClick={() => onOpenRecipe(recipe.id)}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-100">{recipe.title}</h5>
                      <span className="text-[10px] text-slate-400">{recipe.categoryNameFa} • {recipe.cookTimeMinutes} دقیقه</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <div
                      className={`text-sm font-bold font-mono px-2 py-0.5 rounded-lg inline-block ${
                        matchPercentage >= 70
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : matchPercentage >= 40
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {matchPercentage}% تطابق
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {matchedCount} از {totalCount} ماده
                    </span>
                  </div>
                </div>

                {missingIngredients.length > 0 && (
                  <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-1">
                    <span className="text-amber-400 font-bold shrink-0">کسری:</span>
                    <span className="truncate">
                      {missingIngredients.slice(0, 3).join('، ')}
                      {missingIngredients.length > 3 ? ` و ${missingIngredients.length - 3} مورد دیگر` : ''}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. مدیریت موجودی انبار و تاریخ انقضا (Inventory Manager) */}
      {subTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">اقلام انبار و تاریخ انقضا ({pantryItems.length})</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold active:scale-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>افزودن کالا</span>
            </button>
          </div>

          {/* Add Item Form */}
          {showAddForm && (
            <form onSubmit={handleCreatePantryItem} className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
              <h4 className="text-xs font-bold text-amber-400">ثبت ماده جدید در انبار:</h4>
              <input
                type="text"
                placeholder="نام کالا (مثلاً: فیله مرغ، برنج، زعفران)"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="مقدار"
                  value={newItemAmount}
                  onChange={e => setNewItemAmount(Number(e.target.value))}
                  min="0.1"
                  step="0.1"
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                />
                <select
                  value={newItemUnit}
                  onChange={e => setNewItemUnit(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none"
                >
                  <option value="kg">کیلوگرم</option>
                  <option value="g">گرم</option>
                  <option value="liter">لیتر</option>
                  <option value="ml">میلی‌لیتر</option>
                  <option value="pcs">عدد</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <select
                  value={newItemLocation}
                  onChange={e => setNewItemLocation(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                >
                  <option value="refrigerator">یخچال</option>
                  <option value="freezer">فریزر</option>
                  <option value="pantry">کابینت و انبار</option>
                </select>
                <input
                  type="date"
                  value={newItemExpiry}
                  onChange={e => setNewItemExpiry(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  ذخیره کالا
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="py-2 px-3 rounded-xl bg-slate-800 text-slate-400 text-xs"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}

          {/* Items list */}
          <div className="space-y-2">
            {pantryItems.map(item => {
              const exp = getExpiryStatus(item.expirationDate);
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.storageLocationFa}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-mono text-amber-400">
                        {formatMeasurement(item.amount, item.unit)}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          exp.status === 'expired'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : exp.status === 'expiring_soon'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {exp.labelFa}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 active:scale-95 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. جایگزینی مواد (Substitutions Database) */}
      {subTab === 'substitutes' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جست‌وجوی ماده (خامه، کره، تخم‌مرغ، ژلاتین...)"
              value={searchSub}
              onChange={e => setSearchSub(e.target.value)}
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-3">
            {filteredSubs.map((sub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="font-bold text-amber-400">{sub.originalIngredient}</span>
                  <span className="text-[11px] text-slate-400">جایگزین با: {sub.substituteIngredient}</span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="text-amber-200/90 font-medium">
                    نسبت دقیق: {sub.ratioDescription}
                  </div>
                  <div>
                    <span className="text-slate-400">تأثیر بر بافت: </span>
                    {sub.textureEffectFa}
                  </div>
                  <div>
                    <span className="text-slate-400">تأثیر بر پخت: </span>
                    {sub.bakingEffectFa}
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">محدودیت: </span>
                    {sub.limitationsFa}
                  </div>
                </div>

                {sub.allergenAlertFa && (
                  <div className="pt-1.5 text-[10px] text-emerald-400">
                    ✓ {sub.allergenAlertFa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
