import React, { useState } from 'react';
import { Cake, Scale, Check, AlertCircle, Info, Sparkles, Sliders } from 'lucide-react';
import { CakeCalculationInput } from '../../types';
import { calculateCakeDimensions } from '../../services/calculationEngine';

export const CakeCalculator: React.FC = () => {
  const [cakeType, setCakeType] = useState<'sponge' | 'chiffon' | 'chocolate' | 'carrot' | 'red_velvet'>('sponge');
  const [mode, setMode] = useState<'by_weight' | 'by_servings' | 'by_pan_size'>('by_weight');
  const [targetWeightKg, setTargetWeightKg] = useState<number>(1.5);
  const [servingsCount, setServingsCount] = useState<number>(12);
  const [panDiameterCm, setPanDiameterCm] = useState<number>(22);
  const [frostingPreference, setFrostingPreference] = useState<'light' | 'medium' | 'heavy'>('medium');

  const input: CakeCalculationInput = {
    cakeType,
    calculationMode: mode,
    targetWeightKg,
    servingsCount,
    panShape: 'round',
    panDiameterCm,
    panHeightCm: 8,
    layersCount: 3,
    frostingPreference
  };

  const result = calculateCakeDimensions(input);

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-5">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="p-1.5 rounded-xl bg-amber-400 text-slate-950">
            <Cake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">استودیو قنادی و محاسبه‌گر کیک</h2>
            <p className="text-[11px] text-slate-400">فرمولاسیون علمی وزن هدف، اندازه قالب و لایه‌چینی</p>
          </div>
        </div>
      </div>

      {/* Cake Type Selection */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 block">انتخاب رسپی پایه کیک:</label>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'sponge', labelFa: 'اسفنجی پایه' },
            { id: 'chiffon', labelFa: 'شیفون نرم' },
            { id: 'chocolate', labelFa: 'شکلاتی خیس' },
            { id: 'carrot', labelFa: 'هویج و گردو' },
            { id: 'red_velvet', labelFa: 'ردولوت مخملی' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setCakeType(c.id as any)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition active:scale-95 ${
                cakeType === c.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c.labelFa}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
        <button
          onClick={() => setMode('by_weight')}
          className={`py-2 px-1 rounded-xl font-medium transition active:scale-95 text-center ${
            mode === 'by_weight'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          وزن هدف کیک
        </button>
        <button
          onClick={() => setMode('by_servings')}
          className={`py-2 px-1 rounded-xl font-medium transition active:scale-95 text-center ${
            mode === 'by_servings'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          تعداد مهمانان
        </button>
        <button
          onClick={() => setMode('by_pan_size')}
          className={`py-2 px-1 rounded-xl font-medium transition active:scale-95 text-center ${
            mode === 'by_pan_size'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          اندازه قالب فر
        </button>
      </div>

      {/* Input Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        {mode === 'by_weight' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">وزن تحویلی کیک با خامه و فیلینگ:</span>
              <span className="font-mono text-sm font-bold text-amber-400">{targetWeightKg} کیلوگرم</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.25"
              value={targetWeightKg}
              onChange={e => setTargetWeightKg(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.5 kg (کوچک)</span>
              <span>1.5 kg (تولد خانوادگی)</span>
              <span>3.0 kg (مجلسی)</span>
              <span>5.0 kg</span>
            </div>
          </div>
        )}

        {mode === 'by_servings' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">تعداد مهمانان (برش‌ها):</span>
              <span className="font-mono text-sm font-bold text-amber-400">{servingsCount} نفر</span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              step="2"
              value={servingsCount}
              onChange={e => setServingsCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۴ نفر</span>
              <span>۱۲ نفر</span>
              <span>۲۴ نفر</span>
              <span>۴۰ نفر</span>
            </div>
          </div>
        )}

        {mode === 'by_pan_size' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">قطر قالب گرد فر:</span>
              <span className="font-mono text-sm font-bold text-amber-400">{panDiameterCm} سانتی‌متر</span>
            </div>
            <input
              type="range"
              min="15"
              max="32"
              step="1"
              value={panDiameterCm}
              onChange={e => setPanDiameterCm(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15 cm</span>
              <span>20 cm (استاندارد)</span>
              <span>26 cm</span>
              <span>32 cm</span>
            </div>
          </div>
        )}

        {/* Frosting Level */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            میزان خامه و فیلینگ در کیک:
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { id: 'light', labelFa: 'کم‌خامه (عصرانه/رژیمی)' },
              { id: 'medium', labelFa: 'متوسط (قنادی استاندارد)' },
              { id: 'heavy', labelFa: 'پرخامه (تولد و مجلسی)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFrostingPreference(f.id as any)}
                className={`py-1.5 px-2 rounded-xl text-[11px] border transition ${
                  frostingPreference === f.id
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {f.labelFa}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Physics & Weight Breakdown Result Card */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
        <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
          <Scale className="w-4 h-4" />
          <span>تفکیک فیزیکی وزن و خروجی نهایی</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block">وزن کل نهایی:</span>
            <span className="text-sm font-bold text-white font-mono">
              {result.totalFinishedWeightGrams.toLocaleString('fa-IR')} گرم
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block">تعداد مهمانان:</span>
            <span className="text-sm font-bold text-amber-300 font-mono">
              ~ {result.servingsCount} نفر
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block">اسفنج پخته (خالص):</span>
            <span className="text-xs font-bold text-slate-200 font-mono">
              {result.bakedSpongeWeightGrams} گرم
            </span>
            <span className="text-[10px] text-slate-500 block">(مایه خام: {result.rawBatterWeightGrams}g)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block">خامه و فیلینگ میانی:</span>
            <span className="text-xs font-bold text-slate-200 font-mono">
              {result.creamFillingWeightGrams} گرم
            </span>
            <span className="text-[10px] text-slate-500 block">(فرم‌گرفته)</span>
          </div>
        </div>

        {/* Pan and Oven Parameters */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-center justify-between text-xs">
          <div>
            <span className="text-[11px] text-slate-400 block">قالب پیشنهادی:</span>
            <span className="font-bold text-amber-300">
              قالب گرد قطر {result.recommendedPanDiameterCm} سانتی‌متر
            </span>
          </div>
          <div className="text-left">
            <span className="text-[11px] text-slate-400 block">دمای فر و زمان:</span>
            <span className="font-bold text-white font-mono">
              {result.recommendedBakeTempC}°C — {result.recommendedBakeTimeMinutes} دقیقه
            </span>
          </div>
        </div>
      </div>

      {/* Calculated Ingredients Table with Baker's Percentage */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            فرمولاسیون و مقدار دقیق مواد
          </h3>
          <span className="text-[11px] text-slate-400">
            ضریب مقیاس: {result.scaleFactor.toFixed(2)}x
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80 text-xs">
          {result.ingredients.map((ing, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-800/40 transition">
              <div>
                <span className="text-slate-200 font-medium">{ing.name}</span>
                {ing.bakersPercentage && (
                  <span className="text-[10px] text-amber-400/80 mr-1.5">
                    (درصد نانوایی: {ing.bakersPercentage}%)
                  </span>
                )}
              </div>
              <span className="font-bold text-amber-400 font-mono">
                {ing.amount} {ing.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Notes & Warnings */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
        <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-400" />
          توصیه‌های فنی قناد ارشد
        </h4>
        <ul className="space-y-1.5 text-[11px] text-slate-400 pr-3 list-disc">
          {result.notes.map((n, idx) => (
            <li key={idx} className="leading-relaxed">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
