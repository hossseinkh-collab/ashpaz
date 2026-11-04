import React, { useEffect, useState } from 'react';
import { ChefHat, Download, WifiOff, ArrowRight, ShoppingCart, Cloud } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { getStoredShoppingList } from '../../services/shoppingService';

interface HeaderProps {
  currentTab: string;
  activeRecipeId: string | null;
  onBack: () => void;
  onOpenAndroidInfo?: () => void;
  onOpenAuditModal?: () => void;
  onOpenCoverageModal?: () => void;
  onOpenShoppingModal?: () => void;
  onOpenDedication?: () => void;
  onOpenDriveModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeRecipeId,
  onBack,
  onOpenShoppingModal,
  onOpenDedication,
  onOpenDriveModal
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getTabTitle = () => {
    if (activeRecipeId) return 'دستور پخت و محاسبات';
    switch (currentTab) {
      case 'recipes': return 'بانک دستور پخت و رسپی‌ها';
      case 'pastry': return 'استودیو قنادی و شیرینی';
      case 'health': return 'کالری‌شمار و کلینیک سلامتی';
      case 'planner': return 'برنامه‌ریز هفتگی و خرید';
      case 'fridge': return 'سرآشپز یخچالی و موجودی';
      case 'assistant': return 'دستیار هوشمند سرآشپز';
      case 'tests': return 'آزمون‌های سیستم و اعتبارسنجی';
      case 'android': return 'شناسنامه اندروید و PWA';
      default: return 'سرآشپز هوشمند';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      {/* Android Top App Bar */}
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {activeRecipeId ? (
            <button
              onClick={onBack}
              aria-label="بازگشت"
              className="p-1.5 -mr-1.5 rounded-full hover:bg-slate-800 text-amber-400 active:scale-95 transition"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-sm shadow-amber-500/20">
              <ChefHat className="w-5 h-5" />
            </div>
          )}

          <div>
            <h1 className="text-base font-bold leading-tight flex items-center gap-1.5">
              {activeRecipeId ? getTabTitle() : 'سرآشپز هوشمند'}
              {!activeRecipeId && (
                <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  اندروید
                </span>
              )}
            </h1>
            {!activeRecipeId && (
              <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                {getTabTitle()}
              </p>
            )}
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {!isOnline && (
            <div className="flex items-center gap-1 bg-red-950/80 border border-red-800/80 text-red-300 text-[11px] px-2 py-0.5 rounded-full">
              <WifiOff className="w-3 h-3 text-red-400" />
              <span>آفلاین</span>
            </div>
          )}

          {isInstallable && !isInstalled && (
            <button
              onClick={install}
              className="flex items-center gap-1 text-[11px] font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow-sm active:scale-95 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>نصب برنامه</span>
            </button>
          )}

          {onOpenDriveModal && (
            <button
              onClick={onOpenDriveModal}
              title="ذخیره‌سازی روی گوگل درایو (Google Drive)"
              aria-label="گوگل درایو"
              className="w-8 h-8 rounded-full border border-blue-500/40 bg-blue-500/15 flex items-center justify-center text-blue-300 hover:text-blue-100 hover:bg-blue-500/25 active:scale-95 transition"
            >
              <Cloud className="w-4 h-4" />
            </button>
          )}

          {onOpenShoppingModal && (
            <button
              onClick={onOpenShoppingModal}
              title="فهرست خرید هوشمند"
              aria-label="فهرست خرید هوشمند"
              className="relative w-8 h-8 rounded-full border border-slate-700/80 bg-slate-800/60 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 active:scale-95 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              {getStoredShoppingList().length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-bold font-mono flex items-center justify-center">
                  {getStoredShoppingList().length}
                </span>
              )}
            </button>
          )}

          {onOpenDedication && (
            <button
              onClick={onOpenDedication}
              title="مشاهده مجدد تقدیم‌نامه و بسم‌الله"
              aria-label="تقدیم‌نامه"
              className="w-8 h-8 rounded-full border border-rose-500/30 bg-rose-500/10 flex items-center justify-center text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 active:scale-95 transition"
            >
              <span className="text-xs">❤️</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
