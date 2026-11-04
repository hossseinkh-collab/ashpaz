import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Check, Trash2, X, AlertCircle, 
  Sparkles, CheckCircle2, DollarSign, PackageCheck, ExternalLink
} from 'lucide-react';
import { 
  getStoredShoppingList, 
  toggleItemPurchasedStatus, 
  removeShoppingListItem, 
  clearPurchasedShoppingListItems, 
  clearAllShoppingList 
} from '../../services/shoppingService';
import { ShoppingListItem } from '../../types';
import { formatMeasurement } from '../../services/calculationEngine';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setItems(getStoredShoppingList());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    const updated = toggleItemPurchasedStatus(id);
    setItems(updated);
  };

  const handleDelete = (id: string) => {
    const updated = removeShoppingListItem(id);
    setItems(updated);
  };

  const handleClearPurchased = () => {
    const updated = clearPurchasedShoppingListItems();
    setItems(updated);
  };

  const handleClearAll = () => {
    if (confirm('آیا از پاک کردن کل لیست خرید اطمینان دارید؟')) {
      const updated = clearAllShoppingList();
      setItems(updated);
    }
  };

  const purchasedCount = items.filter(i => i.purchased).length;
  const verifiedItems = items.filter(i => i.isRealOkalaPrice && i.okalaPriceToman);
  const totalVerifiedOkalaCost = verifiedItems.reduce((acc, curr) => acc + (curr.okalaPriceToman || 0), 0);
  const unpricedCount = items.length - verifiedItems.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-500/20 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>فهرست خرید هوشمند</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  {items.length} قلم
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">اقلام تجمیع‌شده از رسپی‌ها و برنامه هفتگی</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls & Total */}
        {items.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>تکمیل‌شده:</span>
              <span className="font-mono font-bold text-emerald-400">{purchasedCount} از {items.length}</span>
            </div>

            <div className="flex items-center gap-2">
              {purchasedCount > 0 && (
                <button
                  onClick={handleClearPurchased}
                  className="text-[11px] text-slate-400 hover:text-amber-400 transition"
                >
                  حذف خریده‌شده‌ها
                </button>
              )}
              <button
                onClick={handleClearAll}
                className="text-[11px] text-rose-400 hover:text-rose-300 transition"
              >
                پاک‌سازی کل
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <PackageCheck className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300">لیست خرید شما خالی است</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                می‌توانید از صفحه هر رسپی دکمه «افزودن مواد به سبد خرید» را بزنید یا از تب «برنامه غذایی» فهرست خرید هفتگی صادر کنید.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  item.purchased
                    ? 'bg-slate-950/40 border-slate-800/40 opacity-60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                      item.purchased
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                        : 'border-slate-700 bg-slate-900'
                    }`}
                  >
                    {item.purchased && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <span className={`text-xs font-medium block ${item.purchased ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.name}
                    </span>
                    {item.neededForRecipes && item.neededForRecipes.length > 0 && (
                      <span className="text-[10px] text-slate-500 block truncate max-w-[180px]">
                        برای: {item.neededForRecipes.join('، ')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left font-mono">
                    <span className="text-xs font-bold text-amber-400 block">
                      {formatMeasurement(item.amount ?? item.toBuyAmount ?? 0, item.unit)}
                    </span>
                    {item.isRealOkalaPrice && item.okalaPriceToman ? (
                      <span className="text-[10px] text-emerald-400 font-bold block" title={item.okalaBenchmarkLabel || 'قیمت روز اکالا'}>
                        {item.okalaPriceToman.toLocaleString('fa-IR')} ت <span className="text-[9px] text-slate-400 font-normal font-sans">(اکالا)</span>
                      </span>
                    ) : (
                      <a
                        href={item.okalaSearchUrl || `https://okala.com/search?q=${encodeURIComponent(item.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-amber-400/90 hover:text-amber-300 hover:underline flex items-center gap-0.5 justify-end mt-0.5 font-sans"
                        title="برای این کالا قیمت قطعی در دیتابیس اکالا ثبت نشده؛ لمس برای استعلام زنده"
                      >
                        <span>استعلام اکالا</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Cost Footer */}
        {totalVerifiedOkalaCost > 0 && (
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-300 block font-medium">مجموع بر اساس قیمت روز اکالا:</span>
              <span className="text-[10px] text-slate-500 block">
                {verifiedItems.length} قلم با قیمت قطعی
                {unpricedCount > 0 ? ` (${unpricedCount} قلم نیازمند استعلام)` : ''}
              </span>
            </div>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              {totalVerifiedOkalaCost.toLocaleString('fa-IR')} تومان
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
