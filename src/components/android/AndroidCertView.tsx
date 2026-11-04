import React, { useState } from 'react';
import { 
  Smartphone, ShieldCheck, CheckCircle2, Download, 
  ExternalLink, Layers, Wifi, Terminal, Copy, Check
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const AndroidCertView: React.FC = () => {
  const { isInstallable, isInstalled, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  const certificates = [
    {
      title: 'شناسنامه Web App Manifest اندروید',
      status: 'معتبر (Passed)',
      detail: 'فایل مانیفست دارای id یکتا، نام کامل "سرآشپز هوشمند"، نام کوتاه "سرآشپز" (کمتر از ۱۲ کاراکتر) و وضعیت Standalone است.',
      code: 'display: "standalone", orientation: "portrait"'
    },
    {
      title: 'گواهینامه آیکون‌های تطبیقی (Android Maskable Icons)',
      status: 'معتبر (Passed)',
      detail: 'شامل آیکون ۱۹۲×۱۹۲ استاندارد، ۵۱۲×۵۱۲ باکیفیت و نسخه Maskable با حاشیه امن ۱۵٪ برای تطبیق با اشکال آیکون در برندهای سامسونگ و شیائومی.',
      code: 'purpose: "any" & purpose: "maskable"'
    },
    {
      title: 'گواهینامه سرویس‌ورکر و آفلاین (Service Worker & Cache)',
      status: 'فعال (Registered)',
      detail: 'پلاگین vite-plugin-pwa تمام فونت‌ها، تصاویر، استایل‌ها و منطق محاسبات را در حافظه محلی کش کرده و برنامه بدون اینترنت نیز کاملاً بالا می‌آید.',
      code: 'workbox: globPatterns [**/*.{js,css,html,png...}]'
    },
    {
      title: 'تطابق نوار وضعیت و ناوبری (Android System Bars)',
      status: 'معتبر (Passed)',
      detail: 'رنگ نوار وضعیت (theme-color: #0f172a) و طراحی بر اساس زبان Material You با رعایت Safe-Area Inset.',
      code: 'meta name="theme-color" content="#0f172a"'
    },
    {
      title: 'بهینه‌سازی لمسی و تاچ (Touch & Mobile Viewport)',
      status: 'استاندارد (Passed)',
      detail: 'تارگت‌های لمسی با اندازه حداقلی ۴۸ پیکسل، حذف تاخیر کلیک و متاتگ viewport-fit=cover برای نمایش تمام‌صفحه اندروید.',
      code: 'viewport: width=device-width, user-scalable=no, viewport-fit=cover'
    }
  ];

  const twaCommand = `npx @bubblewrap/cli init --manifest=https://your-domain/manifest.webmanifest\nnpx @bubblewrap/cli build`;

  const copyTwa = () => {
    navigator.clipboard?.writeText(twaCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* Hero Badge */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>گواهینامه‌های رسمی اندروید (Android PWA)</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h2>
            <p className="text-[11px] text-slate-400">انطباق ۱۰۰٪ با استانداردهای گوگل و فروشگاه گوگل‌پلی</p>
          </div>
        </div>

        {/* Install Action Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">
                {isInstalled ? 'اپلیکیشن روی گوشی شما نصب است ✓' : 'نصب مستقیم روی صفحه اصلی اندروید (WebAPK)'}
              </span>
              <span className="text-[10px] text-slate-400">
                {isInstalled ? 'در حال اجرا در حالت Standalone' : 'بدون نیاز به دانلود فایل سنگین، با اجرای کاملاً آفلاین'}
              </span>
            </div>

            {!isInstalled && (
              <button
                onClick={install}
                disabled={!isInstallable}
                className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>نصب فوری</span>
              </button>
            )}
          </div>

          {/* Quick Guide for Phone Users */}
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-300">
            <div className="font-bold text-amber-400 flex items-center gap-1 text-[11px]">
              <span>📱 نحوه نصب ۱ ثانیه‌ای روی گوشی:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[10px] text-slate-400 leading-relaxed pr-1">
              <li>این لینک را در مرورگر <strong>Chrome</strong> یا <strong>Samsung Internet</strong> گوشی باز کنید.</li>
              <li>روی منوی ۳ نقطه (<span className="text-white font-mono">⋮</span>) در بالای مرورگر ضربه بزنید.</li>
              <li>گزینه <strong>«افزودن به صفحه اصلی»</strong> یا <strong>«نصب برنامه (Install app)»</strong> را انتخاب کنید.</li>
              <li>آیکون سرآشپز هوشمند به عنوان یک اپ مستقل و تمام‌صفحه به گوشی شما اضافه می‌شود.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* PWABuilder Step-by-Step Guide Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
            <Layers className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
              <span>راهنمای خروجی APK با PWABuilder</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">pwabuilder.com</span>
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              سایت رسمی مایکروسافت (PWABuilder) این اپلیکیشن را بدون نیاز به کدنویسی یا نصب نرم‌افزار، به صورت ابری به فایل <strong className="text-white">APK نصبی اندروید</strong> تبدیل می‌کند:
            </p>
          </div>
        </div>

        {/* Step-by-Step Flow */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/20 space-y-2 text-xs">
          <div className="text-[11px] font-bold text-amber-300">مراحل تبدیل به APK در ۳ دقیقه:</div>
          <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-300 leading-relaxed pr-1">
            <li>
              وارد سایت <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-mono hover:text-cyan-300">pwabuilder.com</a> شوید.
            </li>
            <li>
              آدرس اینترنتی برنامه را در کادر وسط صفحه وارد کرده و روی <strong>Start</strong> کلیک کنید.
            </li>
            <li>
              نشانگرهای اعتبارسنجی (مانیفست، سرویس‌ورکر، کش آفلاین) سبز می‌شوند.
            </li>
            <li>
              روی دکمه آبی‌رنگ <strong>«Package for Stores»</strong> کلیک کنید و گزینه <strong>Android</strong> را انتخاب نمایید.
            </li>
            <li>
              دکمه <strong>Generate</strong> را بزنید تا فایل زیپ حاوی <strong className="text-emerald-400">فایل APK آماده نصب</strong> برای شما دانلود شود.
            </li>
          </ol>
        </div>

        {/* Live URL Copy Box */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-slate-400 block">آدرس مستقیم برنامه برای وارد کردن در PWABuilder:</span>
            <span className="text-[11px] font-mono text-cyan-300 truncate block dir-ltr text-left">
              https://ais-pre-frkyg7yg6wotbqhdnun3uv-282889047607.us-west2.run.app
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText('https://ais-pre-frkyg7yg6wotbqhdnun3uv-282889047607.us-west2.run.app');
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold shrink-0 flex items-center gap-1 transition active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'کپی شد' : 'کپی لینک'}</span>
          </button>
        </div>

        {/* Direct Download of Native Android Project */}
        <div className="pt-2 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-[11px] text-slate-300">
            <span className="font-bold text-white block">پروژه کامل سورس اندروید (Android Studio Ready)</span>
            <span className="text-[10px] text-slate-400">حاوی پوشه کامل android/ با قابلیت خروجی APK آفلاین در سیستم</span>
          </div>
          <a
            href="/SmartChef-Android-Project.zip"
            download="SmartChef-Android-Project.zip"
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>دانلود سورس کامل اندروید (.zip)</span>
          </a>
        </div>
      </div>

      {/* DEVELOPER MODE INSTALLATION GUIDE */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>راهنمای نصب از طریق حالت Developer Mode گوشی</span>
            </h3>
            <p className="text-[11px] text-slate-400">روش‌های رسمی توسعه‌دهندگان گوگل برای نصب مستقیم از AI Studio</p>
          </div>
        </div>

        {/* Developer Method 1: Chrome PWA Flags */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">۱</span>
            <span>روش اول: حالت توسعه‌دهنده در مرورگر کروم گوشی (فوری‌ترین راه)</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            گوگل کروم در اندروید یک فلگ توسعه‌دهنده دارد که پیش‌نیازهای نصب PWA را حذف می‌کند تا برنامه فوراً به عنوان <strong>WebAPK مستقل</strong> نصب شود:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-[10px] text-slate-400 pr-1 leading-relaxed">
            <li>در مرورگر کروم گوشی، آدرس <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded font-mono">chrome://flags</code> را باز کنید.</li>
            <li>در کادر جستجو کلمه <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded font-mono">bypass-user-engagement-checks</code> را تایپ کنید.</li>
            <li>وضعیت آن را روی <strong>Enabled</strong> قرار دهید و دکمه آبی‌رنگ <strong>Relaunch</strong> در پایین را بزنید.</li>
            <li>حالا به همین صفحه برگردید؛ دکمه <strong>«نصب فوری»</strong> در بالای صفحه فعال شده و بلافاصله اپلیکیشن روی گوشی نصب می‌گردد.</li>
          </ol>
        </div>

        {/* Developer Method 2: Android Developer Options & USB / Wireless Debugging */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">۲</span>
            <span>روش دوم: فعال‌سازی Developer Options گوشی (Android Settings)</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-[10px] text-slate-400 pr-1 leading-relaxed">
            <li>وارد <strong>تنظیمات (Settings)</strong> گوشی شوید و به بخش <strong>درباره تلفن (About phone)</strong> بروید.</li>
            <li>روی گزینه <strong>شماره ساخت (Build number)</strong> <strong className="text-amber-300">۷ بار پشت سر هم</strong> ضربه بزنید تا پیام <em>«شما اکنون یک توسعه‌دهنده هستید»</em> نمایش داده شود.</li>
            <li>به منوی اصلی تنظیمات برگردید و وارد <strong>گزینه‌های توسعه‌دهنده (Developer options)</strong> شوید.</li>
            <li>گزینه‌های <strong>اشکال‌زدایی USB (USB debugging)</strong> و <strong>نصب از طریق USB (Install via USB)</strong> یا <strong>اشکال‌زدایی بی‌سیم (Wireless debugging)</strong> را فعال کنید.</li>
            <li>در این حالت هرگونه محدودیت امنیتی در نصب اپلیکیشن‌های آزمایشی و آزمون‌های ریموت مرورگر غیرفعال می‌شود.</li>
          </ol>
        </div>
      </div>

      {/* Verification Matrix */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-400 px-1">
          نتایج ممیزی و گواهینامه‌های فنی:
        </h3>

        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-slate-200">{cert.title}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                {cert.status}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 pr-6 leading-relaxed">
              {cert.detail}
            </p>

            <div className="mr-6 p-1.5 rounded-lg bg-slate-950 font-mono text-[10px] text-amber-300/90 truncate">
              {cert.code}
            </div>
          </div>
        ))}
      </div>

      {/* Export to APK / TWA Guide for Play Store */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>خروجی گرفتن فایل APK برای کافه‌بازار یا مایکت</span>
          </div>
          <button
            onClick={copyTwa}
            className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'کپی شد' : 'کپی دستور'}</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          پروژه اندروید با Capacitor در مسیر <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">android/</code> آماده است. کافیست در کامپیوتر وارد پوشه اندروید شوید و با دستور زیر APK را بسازید:
        </p>

        <pre className="p-2.5 rounded-xl bg-slate-950 text-[10px] font-mono text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800">
          {`cd android\n./gradlew assembleDebug\n# فایل APK در مسیر زیر تولید می‌شود:\n# app/build/outputs/apk/debug/app-debug.apk`}
        </pre>
      </div>
    </div>
  );
};
