import React from 'react';
import { Scale, Info, CheckCircle2, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

interface BmiCalculatorCardProps {
  heightCm: number;
  weightKg: number;
  onHeightChange: (h: number) => void;
  onWeightChange: (w: number) => void;
  editable?: boolean;
}

export const BmiCalculatorCard: React.FC<BmiCalculatorCardProps> = ({
  heightCm,
  weightKg,
  onHeightChange,
  onWeightChange,
  editable = true
}) => {
  const heightM = Math.max(0.5, heightCm / 100);
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  // Ideal weight range for this height (BMI 18.5 to 24.9)
  const minNormalWeight = Number((18.5 * heightM * heightM).toFixed(1));
  const maxNormalWeight = Number((24.9 * heightM * heightM).toFixed(1));
  const idealMidWeight = Number((22.0 * heightM * heightM).toFixed(1));

  let categoryFa = 'وزن طبیعی و ایده‌آل';
  let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
  let barPercent = 50;
  let diffMessage = 'وزن شما در محدوده سلامت استاندارد سازمان بهداشت جهانی (WHO) قرار دارد.';

  if (bmi < 18.5) {
    categoryFa = 'کمبود وزن (لاغر)';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    barPercent = Math.max(8, (bmi / 18.5) * 25);
    const diff = Number((minNormalWeight - weightKg).toFixed(1));
    diffMessage = `برای رسیدن به مرز وزن نرمال، نیاز به حداقل ${diff} کیلوگرم افزایش وزن دارید.`;
  } else if (bmi >= 18.5 && bmi < 25) {
    categoryFa = 'وزن طبیعی و متناسب';
    badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    barPercent = 25 + ((bmi - 18.5) / 6.5) * 25;
    diffMessage = `وزن فعلی در محدوده سلامت کامل است (وزن ایده‌آل شما: حدود ${idealMidWeight} کیلوگرم).`;
  } else if (bmi >= 25 && bmi < 30) {
    categoryFa = 'اضافه وزن ملایم';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    barPercent = 50 + ((bmi - 25) / 5) * 25;
    const diff = Number((weightKg - maxNormalWeight).toFixed(1));
    diffMessage = `برای رسیدن به سقف وزن نرمال، به ${diff} کیلوگرم کاهش وزن نیاز دارید.`;
  } else {
    categoryFa = 'چاقی (نیازمند اصلاح برنامه)';
    badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    barPercent = Math.min(96, 75 + ((bmi - 30) / 10) * 25);
    const diff = Number((weightKg - maxNormalWeight).toFixed(1));
    diffMessage = `اضافه وزن شما نسبت به وزن استاندارد ${diff} کیلوگرم است (وزن ایده‌آل: ${idealMidWeight} kg).`;
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100">سنجش دقیق قد، وزن و شاخص BMI</h3>
            <span className="text-[10px] text-slate-400">مبنای استانداردهای ارزیابی بین‌المللی WHO</span>
          </div>
        </div>

        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
          {categoryFa}
        </span>
      </div>

      {/* Prominent Height & Weight Inputs */}
      {editable && (
        <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
          {/* Height Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">قد (سانتی‌متر):</span>
              <span className="font-bold text-amber-400 text-sm">{heightCm} cm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onHeightChange(Math.max(100, heightCm - 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center active:scale-95 transition"
              >
                -
              </button>
              <input
                type="number"
                value={heightCm}
                onChange={e => onHeightChange(Math.max(100, Math.min(230, Number(e.target.value) || 170)))}
                className="w-full text-center bg-slate-850 border border-slate-700 rounded-lg py-1 text-sm font-bold text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => onHeightChange(Math.min(230, heightCm + 1))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center active:scale-95 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">وزن (کیلوگرم):</span>
              <span className="font-bold text-emerald-400 text-sm">{weightKg} kg</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onWeightChange(Math.max(30, Number((weightKg - 0.5).toFixed(1))))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center active:scale-95 transition"
              >
                -
              </button>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={e => onWeightChange(Math.max(30, Math.min(250, Number(e.target.value) || 70)))}
                className="w-full text-center bg-slate-850 border border-slate-700 rounded-lg py-1 text-sm font-bold text-slate-100 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={() => onWeightChange(Math.min(250, Number((weightKg + 0.5).toFixed(1))))}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center active:scale-95 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visual Spectrum Gauge - Correct RTL Alignment */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400">شاخص توده بدنی شما (BMI):</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-black ${bmi >= 18.5 && bmi < 25 ? 'text-emerald-400' : 'text-slate-100'}`}>
              {bmi}
            </span>
            <span className="text-[10px] text-slate-400">kg/m²</span>
          </div>
        </div>

        {/* Color Bar Spectrum (در حالت راست‌به‌چپ: راست=کم‌وزن، وسط-راست=ایده‌آل سبز، وسط-چپ=اضافه‌وزن، چپ=چاقی) */}
        <div className="relative h-3.5 rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
          <div className="h-full bg-amber-400/85 w-[25%]" title="کمبود وزن (< 18.5)" />
          <div className="h-full bg-emerald-500 w-[25%] shadow-[0_0_12px_rgba(16,185,129,0.4)]" title="وزن نرمال و ایده‌آل (18.5 - 24.9)" />
          <div className="h-full bg-amber-500/85 w-[25%]" title="اضافه وزن (25 - 29.9)" />
          <div className="h-full bg-rose-500/85 w-[25%]" title="چاقی (>= 30)" />
        </div>

        {/* Indicator Marker (تنظیم دقیق موقعیت راست‌به‌چپ با کاهش وزن به سمت سبز و چپ‌به‌راست با افزایش وزن) */}
        <div className="relative h-5 -mt-2.5">
          <div
            className="absolute top-0 translate-x-1/2 flex flex-col items-center transition-all duration-300 z-10"
            style={{ right: `${barPercent}%` }}
          >
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white" />
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-lg border ${
              bmi >= 18.5 && bmi < 25 
                ? 'bg-emerald-500 text-slate-950 border-emerald-300' 
                : 'bg-white text-slate-950 border-slate-300'
            }`}>
              {bmi}
            </span>
          </div>
        </div>

        {/* Spectrum Labels (راست به چپ متناظر با رنگ‌ها) */}
        <div className="grid grid-cols-4 text-[9px] text-slate-400 text-center pt-1 border-t border-slate-800/40">
          <div>کم‌وزن (&lt;۱۸.۵)</div>
          <div className="text-emerald-400 font-bold flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>ایده‌آل (۱۸.۵-۲۴.۹)</span>
          </div>
          <div>اضافه‌وزن (۲۵-۲۹.۹)</div>
          <div>چاق (&ge;۳۰)</div>
        </div>
      </div>

      {/* بخش اختصاصی وزن ایده‌آل (سبز شدن کامل بخش وزن ایده‌آل طبق خواسته کاربر) */}
      <div className="bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 rounded-2xl p-3.5 border border-emerald-500/40 text-xs space-y-2.5 shadow-md shadow-emerald-950/30">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-emerald-300 text-xs">محدوده وزن ایده‌آل و سلامت کامل</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-black font-mono text-xs">
            {idealMidWeight} kg
          </span>
        </div>

        <div className="flex items-start gap-2 text-slate-200 text-[11px] leading-relaxed">
          <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <p>{diffMessage}</p>
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-emerald-500/15">
          <span className="text-slate-400">بازه استاندارد برای قد {heightCm} سانتی‌متر:</span>
          <span className="text-emerald-400 font-bold font-mono text-xs">
            {minNormalWeight} الی {maxNormalWeight} کیلوگرم
          </span>
        </div>
      </div>
    </div>
  );
};
