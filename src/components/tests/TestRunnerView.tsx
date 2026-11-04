import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Play, RefreshCw, AlertTriangle, Layers } from 'lucide-react';
import { runAllMandatoryTests } from '../../services/testRunner';
import { TestExecutionResult } from '../../types';

export const TestRunnerView: React.FC = () => {
  const [results, setResults] = useState<TestExecutionResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runAllMandatoryTests();
      setResults(res);
      setIsRunning(false);
    }, 400);
  };

  useEffect(() => {
    runTests();
  }, []);

  const passedCount = results.filter(r => r.status === 'passed').length;
  const failedCount = results.filter(r => r.status === 'failed').length;

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">سامانه اعتبارسنجی و آزمون‌های اجباری</h2>
              <p className="text-[11px] text-slate-400">بررسی خودکار دقت محاسبات، قوانین مقیاس و PWA</p>
            </div>
          </div>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs active:scale-95 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>اجرای آزمون‌ها</span>
          </button>
        </div>

        {/* Scorecard */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block">تعداد آزمون‌ها:</span>
            <span className="text-sm font-bold text-white font-mono">{results.length}</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 block">موفق (Passed):</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{passedCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/30">
            <span className="text-[10px] text-red-400 block">شکست (Failed):</span>
            <span className="text-sm font-bold text-red-400 font-mono">{failedCount}</span>
          </div>
        </div>
      </div>

      {/* Tests Results List */}
      <div className="space-y-2.5">
        {results.map((test, idx) => (
          <div
            key={test.testId || idx}
            className={`p-3.5 rounded-2xl border transition space-y-1.5 ${
              test.status === 'passed'
                ? 'bg-slate-900 border-emerald-900/40'
                : 'bg-red-950/30 border-red-800/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {test.status === 'passed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span className="font-bold text-slate-200">{test.title}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {test.executionTimeMs} ms • {test.assertionsCount} شرط
              </span>
            </div>

            <p className="text-[11px] text-slate-400 pr-6 leading-relaxed">
              {test.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
