import React from 'react';
import { Sparkles, Heart, ChefHat, Check } from 'lucide-react';

interface OpeningDedicationScreenProps {
  onStart: () => void;
}

export const OpeningDedicationScreen: React.FC<OpeningDedicationScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 overflow-y-auto selection:bg-amber-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Calligraphy Card */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
        
        {/* Ornate Corner Accents */}
        <div className="absolute top-3 right-3 text-amber-500/40 text-xs font-serif">❖</div>
        <div className="absolute top-3 left-3 text-amber-500/40 text-xs font-serif">❖</div>
        <div className="absolute bottom-3 right-3 text-amber-500/40 text-xs font-serif">❖</div>
        <div className="absolute bottom-3 left-3 text-amber-500/40 text-xs font-serif">❖</div>

        {/* 1. BISMILLAH IN CLASSICAL PERSIAN CALLIGRAPHY */}
        <div className="space-y-2 pt-2">
          <div className="text-3xl sm:text-4xl font-bold font-['Katibeh',serif] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)] py-1">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِیمِ
          </div>
          
          {/* Persian Ornamental Divider */}
          <div className="flex items-center justify-center gap-2 text-amber-500/60 text-xs">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-sm">✦ ⚜ ✦</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        {/* 2. DEDICATION (تقدیم‌نامه) */}
        <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-inner">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold font-['Katibeh',serif]">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>« تـقـدیـم‌نـامـه »</span>
          </div>

          <p className="text-slate-200 text-sm sm:text-base font-['Katibeh',serif] leading-loose text-justify text-center sm:text-center sm:leading-relaxed">
            با تمام عشق، مهر و احترام بی‌پایان
            <br />
            تقدیم به همسر دلسوز و مهربانم <strong className="text-amber-300 font-bold text-lg font-['Katibeh',serif]">«مهتاب»</strong>
            <br />
            و دختر یکی‌یک‌دانه و نازنینم <strong className="text-amber-300 font-bold text-lg font-['Katibeh',serif]">«النا»</strong>
            <br />
            <span className="text-slate-300 text-xs sm:text-sm">
              که حضور پرمهرشان، گرمابخش و روشنایی کانون زندگی‌مان است.
            </span>
          </p>

          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              و با افتخار تقدیم به تمامی همراهان، مادران و همسران گرامی
              که با عشق و هنر، عطر دل‌انگیز زندگی و سلامتی را بر سفره‌های پربرکت ایرانی جاری می‌سازند.
            </p>
          </div>
        </div>

        {/* 3. APP BRAND & BADGE */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ChefHat className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-300">سرآشپز هوشمند ایران</span>
          <span>•</span>
          <span className="text-[11px] text-amber-400/80">نسخه جامع خانواده</span>
        </div>

        {/* 4. START BUTTON */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onStart}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>شروع و ورود به برنامه</span>
          </button>

          <p className="text-[10px] text-slate-500">
            با ورود به برنامه، این پیام بسته شده و در طول استفاده روزمره نمایش داده نخواهد شد.
          </p>
        </div>

      </div>
    </div>
  );
};
