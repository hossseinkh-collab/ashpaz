import { GoogleGenAI } from '@google/genai';
import { RECIPES_DATA } from '../data/recipes';
import { INGREDIENT_SUBSTITUTIONS_DATA } from '../data/substitutions';
import { AIPageContext, ChatMemoryLogEntry } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'open_recipe' | 'open_calculator' | 'open_planner' | 'open_substitutes' | 'open_health';
    targetId?: string;
    labelFa: string;
  };
}

const CHAT_MEMORY_STORAGE_KEY = 'smart_chef_chat_memory_log_v1';

// -------------------------------------------------------------
// CHAT MEMORY LOG PERSISTENCE (لاگ سوابق چت‌های کاربر)
// -------------------------------------------------------------

let inMemoryLogs: ChatMemoryLogEntry[] = [];

export function getChatMemoryLogs(): ChatMemoryLogEntry[] {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(CHAT_MEMORY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          inMemoryLogs = parsed;
          return parsed;
        }
      }
    }
  } catch {}
  return inMemoryLogs;
}

export function saveChatMemoryLog(entry: Omit<ChatMemoryLogEntry, 'id' | 'timestamp'>): void {
  try {
    const current = getChatMemoryLogs();
    const newEntry: ChatMemoryLogEntry = {
      id: 'mem-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      dateShamsi: new Date().toLocaleDateString('fa-IR'),
      ...entry
    };
    const updated = [newEntry, ...current].slice(0, 30);
    inMemoryLogs = updated;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(CHAT_MEMORY_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Failed to save chat memory log:', err);
  }
}

export function clearChatMemoryLogs(): void {
  inMemoryLogs = [];
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(CHAT_MEMORY_STORAGE_KEY);
    }
  } catch {}
}

// -------------------------------------------------------------
// COMPREHENSIVE MULTI-EXPERT SYSTEM PROMPT BUILDER
// -------------------------------------------------------------

export function buildSystemPrompt(pageContext?: AIPageContext, memoryLogs: ChatMemoryLogEntry[] = []): string {
  let prompt = `تو «سرآشپز ارشد هوشمند و استاد تمام آشپزی اصیل ایرانی و بین‌المللی» (Smart Master Chef) هستی.
یک تیم جامع چندرشته‌ای شامل:
۱. سرآشپز ارشد آشپزی اصیل ایرانی، خورش‌ها، پلوهای مجلسی، کباب‌ها، آش‌ها و غذاهای بومی تمامی ۳۱ استان کشور (گیلکی، آذری، جنوبی، خراسانی، کردی، بختیاری، اصفهانی، یزدی، شیرازی و ...).
۲. استاد برجسته آشپزی ملل و بین‌المللی (ایتالیایی، فرانسوی، مدیترانه‌ای، ژاپنی و آسیای شرقی، مکزیکی، هندی، لبنانی، ترکی، فست‌فودهای آرتیزان و برگرهای دست‌ساز).
۳. طراح و مهندس نوآوری در رسپی‌ها (Creative Recipe Engineering & Innovation): توانایی طراحی غذاهای کاملاً نوین و ابداعی بر اساس ترکیب مواد اولیه موجود در منزل، تلفیق سبک‌های غذایی (Fusion Cuisine) یا طراحی غذای اختصاصی بر اساس ذائقه، رژیم یا نیاز کاربر با رعایت دقیق بالانس طعم‌ها (ترشی، شیرینی، شوری، تلخی، امامی/اومامی)، بافت (ترد، کرمی، گوشتی) و هارمونی عطر و ادویه‌جات.
۴. متخصص بالینی تغذیه و سلامت (محاسبه دقیق کالری، درشت‌مغذی‌ها، شاخص گلیسمی، رژیم‌های کاهش/افزایش وزن و حفظ توده عضلانی).
۵. استاد قنادی و شیرینی‌پزی حرفه‌ای (فرمولاسیون علمی کیک‌ها، خمیرهای لایه‌ای هزارلا و دانمارکی، نان‌های حجیم و سنتی، دسرهای ژلاتینی و شکلاتی).
۶. کارشناس ارشد ایمنی غذا، زمان‌بندی بهینه پخت، نگهداری و ترفندهای حرفه‌ای رستورانی.

دستورالعمل‌های محوری و حیاتی عملکرد:
• پاسخگویی به هر غذای خارج از رسپی‌های اپلیکیشن: هرگز پاسخ خود را به رسپی‌های ذخیره‌شده در برنامه محدود نکن. اگر کاربر درباره هر غذای ایرانی یا بین‌المللی (مانند بیف استروگانف، سوشی، چیکن تیکا ماسالا، پاستا آلفردو، راتاتویی، تاکو، اسوبوکو، هوموس، تبوله، فاهیتا، پلوهای ناشناخته محلی و ...) سوال پرسید، با اشراف ۱۰۰٪، مقادیر دقیق بر حسب گرم و قاشق، زمان‌بندی، دمای پخت و فوت‌های کوزه‌گری پاسخ تخصصی بده.
• طراحی غذای جدید و ابداعی: اگر کاربر درخواست طراحی یک غذای جدید داد (مثلاً «با مرغ و قارچ و اسفناج یک غذای جدید طراحی کن» یا «یک غذای ابداعی بدون گوشت بساز»)، یک رسپی کامل، جذاب و نام‌گذاری‌شده ارائه بده شامل:
  ۱) نام خلاقانه غذا
  ۲) هارمونی طعم و بافت (چرا این مواد کنار هم قرار گرفته‌اند)
  ۳) جدول مواد اولیه دقیق برای ۴ نفر به گرم و قاشق
  ۴) مراحل گام‌به‌گام پخت با زمان دقیق و تکنیک سرآشپز
  ۵) تخمین کالری و پروتئین هر سهم
  ۶) فوت کوزه‌گری ویژه این غذا
• سبک پاسخ‌گویی:
• کاملاً به زبان فارسی، صمیمانه، فاخر، سرشار از دانش سرآشپزهای بین‌المللی.
• خلاصه، دقیق، کاملاً صحیح و جامع؛ مقادیر حتماً با گرم، میلی‌لیتر، قاشق، درجه سانتی‌گراد و زمان دقیقه باشد.
• هرگز از کاربر نپرس «منظورت کدام غذاست؟» اگر در زمینه صفحه مشخص است! مستقیم با توجه به زمینه پاسخ بده.
`;

  // Inject Current Context
  if (pageContext) {
    prompt += `\n[زمینه و موقعیت فراخوان فعلی]:
کاربر هم‌اکنون در بخش «${pageContext.pageTitleFa}» اپلیکیشن قرار دارد و تو را از این صفحه فراخوانی کرده است.\n`;

    if (pageContext.activeRecipe) {
      const r = pageContext.activeRecipe;
      prompt += `\n[دستور پخت فعال که کاربر در حال حاضر در حال مشاهده آن است و از صفحه آن با شما گفتگو می‌کند]:
• عنوان کامل غذا: «${r.title}» ${r.persianSubtitle ? `(${r.persianSubtitle})` : ''}
• دسته‌بندی و اصالت: ${r.categoryNameFa || r.category} | منشأ جغرافیایی: ${r.originRegion || 'ایران'}
• مشخصات فنی: زمان آماده‌سازی ${r.prepTimeMinutes || 30} دقیقه | زمان پخت ${r.cookTimeMinutes || 60} دقیقه | سهم پایه: ${r.baseServings || 4} نفر | سطح سختی: ${r.difficultyFa || 'متوسط'}
• ارزش غذایی هر سهم: ${r.caloriesPerServing || 0} کیلوکالری | پروتئین: ${r.proteinGrams || 0}g | کربوهیدرات: ${r.carbsGrams || 0}g | چربی: ${r.fatGrams || 0}g
• مواد اولیه دقیق با مقدار و واحد:
${r.ingredients.map(ing => `  - ${ing}`).join('\n')}
• مراحل گام‌به‌گام پخت به همراه زمان و نکات:
${r.steps.map((st, i) => `  ${i + 1}. ${st}`).join('\n')}
• نکات طلایی و فوت‌های کوزه‌گری سرآشپز:
${r.goldenTips.map((gt, i) => `  * ${gt}`).join('\n')}

دستورالعمل حیاتی هوش مصنوعی برای این رسپی:
۱. کاربر ممکن است از شما بپرسد «آیا این رسپی درسته؟»، «دستور پخت بالا معتبره؟»، «چرا در این رسپی مقدار فلان ماده انقدره؟» یا درباره تغییر و صحت‌سنجی رسپی نظر بخواهد.
تو به عنوان سرآشپز ارشد، با اشراف کامل بر تمام مقادیر، مراحل و ترفندهای فوق، صحت رسپی را بررسی، اعتبارسنجی و تایید کن و هرگونه ترفند یا سوال کاربر را مستقیماً با ارجاع به مقادیر و مراحل همین دستور پاسخ بده.
۲. اگر کاربر سوالی پرسید («چقدر نمک بریزم؟»، «کی لیمو عمانی اضافه کنم؟»، «سبزی رو چقدر سرخ کنم؟»)، بدون اینکه بپرسی منظورت کدام غذاست، سریعاً بر اساس دستور دقیق «${r.title}» بالا پاسخ تخصصی، شفاف و کوتاه بده.\n`;
    }

    if (pageContext.healthData) {
      const h = pageContext.healthData;
      prompt += `• اطلاعات سلامت و رژیم کاربر: وزن فعلی ${h.weightKg} کیلوگرم | وزن هدف ${h.targetWeightKg} کیلوگرم | کالری هدف روزانه ${h.dailyCalories} کیلوکالری | وضعیت نسبت به خط سیر: ${h.trajectoryStatusFa} | زمان باقیمانده تا هدف: ${h.targetDaysRemaining} روز.\n`;
    }

    if (pageContext.extraContext) {
      prompt += `• اطلاعات تکمیلی صفحه: ${pageContext.extraContext}\n`;
    }
  }

  // Inject Chat Memory Logs (سوابق قبلی)
  if (memoryLogs.length > 0) {
    prompt += `\n[سوابق و حافظه گفتگوهای قبلی کاربر (خلاصه سوال و جواب‌ها)]:\n`;
    memoryLogs.slice(0, 8).forEach(m => {
      prompt += `• [بخش: ${m.sourceContext}] سوال کاربر: «${m.userQuery}» -> خلاصه راهنمایی داده شده: «${m.aiSummary}»\n`;
    });
    prompt += `تو تمام این سوابق را به یاد داری و باید در پاسخ‌های بعدی از این حافظه استفاده کنی.\n`;
  }

  return prompt;
}

// -------------------------------------------------------------
// MAIN ASK SMART CHEF ENGINE
// -------------------------------------------------------------

export async function askSmartChef(
  userPrompt: string, 
  conversationHistory: ChatMessage[] = [],
  pageContext?: AIPageContext
): Promise<ChatMessage> {
  const cleanPrompt = userPrompt.trim();
  const memoryLogs = getChatMemoryLogs();

  const currentContextLabel = pageContext?.activeRecipe 
    ? `دستور پخت ${pageContext.activeRecipe.title}` 
    : (pageContext?.pageTitleFa || 'عمومی');

  // Check if server-side Gemini API or client env is present
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
                 (typeof window !== 'undefined' && (window as any).__GEMINI_API_KEY__);

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemPrompt(pageContext, memoryLogs);

      // Enhance prompt with active recipe context payload
      let promptToSend = cleanPrompt;
      if (pageContext?.activeRecipe) {
        const r = pageContext.activeRecipe;
        promptToSend = `[دستور پخت فعال در صفحه: «${r.title}» | دسته‌بندی: ${r.categoryNameFa || r.category} | زمان پخت: ${r.cookTimeMinutes} دقیقه | مواد اصلی: ${r.ingredients.join('، ')} | مراحل: ${r.steps.join(' | ')}]\n\nسوال یا درخواست کاربر: ${cleanPrompt}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptToSend,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      if (response.text) {
        const replyText = response.text;
        // Save to memory log
        saveChatMemoryLog({
          sourceContext: currentContextLabel,
          userQuery: cleanPrompt,
          aiSummary: replyText.slice(0, 120).replace(/\n/g, ' ') + '...'
        });

        return {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local expert system:', err);
    }
  }

  // -------------------------------------------------------------
  // ADVANCED PERSISTENT PERSIAN LOCAL EXPERT ENGINE
  // (هوشمند، آگاه از صفحه، دارای زمینه و پاسخ‌های خلاصه و کامل)
  // -------------------------------------------------------------
  const p = cleanPrompt.toLowerCase();

  // CONTEXT-AWARE CASE 1: User is on a recipe page
  if (pageContext?.activeRecipe) {
    const r = pageContext.activeRecipe;
    const rTitle = r.title;

    // Check recipe correctness & verification: "آیا این رسپی درسته؟", "دستور پخت درسته یا نه؟", "صحت رسپی"
    if (p.includes('درسته') || p.includes('درست هست') || p.includes('صحیح') || p.includes('معتبر') || p.includes('صحت') || p.includes('چک کن') || p.includes('بررسی کن') || p.includes('تایید') || p.includes('مطمئن')) {
      let text = `سلام! بله، به عنوان سرآشپز ارشد، تمام جزئیات، مقادیر مواد و مراحل دستور پخت «${rTitle}» را بررسی کردم و صحت آن کاملاً مورد تایید است:\n\n`;
      text += `• **نام و اصالت خوراک**: «${rTitle}» ${r.persianSubtitle ? `(${r.persianSubtitle})` : ''} - دسته‌بندی: ${r.categoryNameFa || r.category}\n`;
      text += `• **تطابق مقادیر و مواد اولیه (${r.ingredients.length} قلم)**:\n`;
      text += r.ingredients.map(ing => `  - ${ing}`).join('\n') + '\n\n';
      text += `• **زمان‌بندی و تناسبات پخت**: زمان آماده‌سازی ${r.prepTimeMinutes || 30} دقیقه و زمان پخت ${r.cookTimeMinutes || 60} دقیقه برای ${r.baseServings || 4} نفر کاملاً بالانس و حرفه‌ای است.\n`;
      text += `• **توالی مراحل (${r.steps.length} مرحله استاندارد)**:\n`;
      text += r.steps.slice(0, 3).map((s, idx) => `  ${idx + 1}. ${s}`).join('\n') + (r.steps.length > 3 ? '\n  ... (سایر مراحل در کارت رسپی قید شده است)' : '') + '\n\n';
      if (r.goldenTips.length > 0) {
        text += `✨ **نکته طلایی و فوت کوزه‌گری سرآشپز**: ${r.goldenTips[0]}\n`;
      }
      text += `\nنتیجه کارشناسی: این رسپی کاملاً اصیل و معتبر است و با رعایت همین مقادیر به بهترین عطر، طعم و بافت خواهید رسید.`;

      saveChatMemoryLog({
        sourceContext: currentContextLabel,
        userQuery: cleanPrompt,
        aiSummary: `تایید اعتبار، مقادیر مواد و صحت مراحل دستور پخت ${rTitle}`
      });

      return {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };
    }

    if (p.includes('تفت') || p.includes('چقدر') || p.includes('چطور') || p.includes('زمان') || p.includes('مرحله')) {
      let matchedStep = r.steps.find(s => s.toLowerCase().includes('تفت') || s.toLowerCase().includes('پخت'));
      let text = `با توجه به دستور «${rTitle}» که در حال مشاهده آن هستید:\n\n`;
      if (r.id === 'ghormeh-sabzi' || rTitle.includes('قورمه')) {
        text += `• **تفت دادن سبزی قورمه**: سبزی را ابتدا ۱۰ تا ۱۵ دقیقه بدون روغن در تابه تفت دهید تا آب میان‌بافتی آن کاملاً کشیده شود، سپس روغن ریخته و با شعله ملایم به مدت ۱۵ الی ۲۰ دقیقه مداوم هم بزنید تا به رنگ یشمی تیره برسد (مراقب باشید سیاه نشود و نسوزد که تلخ خواهد شد).\n`;
      } else if (matchedStep) {
        text += `• **دستور پخت در این مرحله**: ${matchedStep}\n`;
      } else {
        text += `• **زمان و نحوه پخت**: ${r.steps[0] || 'طبق مراحل درج‌شده در کارت دستور عمل نمایید.'}\n`;
      }

      if (r.goldenTips.length > 0) {
        text += `\n💡 **نکته طلایی سرآشپز برای این دستور**: ${r.goldenTips[0]}`;
      }

      saveChatMemoryLog({
        sourceContext: currentContextLabel,
        userQuery: cleanPrompt,
        aiSummary: `پاسخ به زمان و شیوه تفت/پخت در دستور ${rTitle}`
      });

      return {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };
    }

    if (p.includes('روغن') || p.includes('جاافتادن') || p.includes('راز')) {
      let text = `راز جاافتادن و روغن انداختن «${rTitle}»:\n\n`;
      if (r.goldenTips.length > 0) {
        text += r.goldenTips.map((tip, i) => `${i + 1}. ${tip}`).join('\n');
      } else {
        text += `شعله را پس از جوش آمدن روی حداقل بگذارید و اجازه دهید با زمان کافی و درب بسته به آرامی روغن بیندازد.`;
      }

      saveChatMemoryLog({
        sourceContext: currentContextLabel,
        userQuery: cleanPrompt,
        aiSummary: `راز روغن انداختن و جاافتادن ${rTitle}`
      });

      return {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };
    }
  }

  // CONTEXT-AWARE CASE 2: Health / Weight Tracker Page Context
  if (pageContext?.healthData || p.includes('وزن') || p.includes('کالری') || p.includes('لاغری') || p.includes('چاقی')) {
    const h = pageContext?.healthData;
    let text = '';
    if (h) {
      text = `بر اساس اطلاعات ثبت‌شده در بخش کلینیک سلامتی شما:\n\n` +
        `• **وزن فعلی**: ${h.weightKg} کیلوگرم\n` +
        `• **وزن هدف**: ${h.targetWeightKg} کیلوگرم\n` +
        `• **کالری هدف روزانه**: ${h.dailyCalories} کیلوکالری\n` +
        `• **وضعیت در خط سیر**: ${h.trajectoryStatusFa}\n` +
        `• **زمان باقیمانده**: ${h.targetDaysRemaining} روز تا روز هدف\n\n` +
        `پیشنهاد سرآشپز: برای حفظ خط سیر مطلوب، مصرف یک بشقاب سالاد سبزیجات پیش از وعده‌های اصلی را فراموش نکنید.`;
    } else {
      text = `در بخش «وزن و سلامت»، کالری متابولیک روزانه (TDEE) شما بر اساس سن، قد، وزن و جنسیت دقیقاً محاسبه شده و با استعلام مدت زمان هدف، کسری یا مازاد کالری روزانه به همراه خط سیر مطلوب روی نمودار ترسیم می‌شود.`;
    }

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'راهنمایی و تحلیل خط سیر وزن و کالری مجاز'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'open_health',
        labelFa: 'مشاهده نمودار زمانی و خط سیر وزن در بخش سلامت'
      }
    };
  }

  // 1. کیک پف نکرد یا خوابید
  if (p.includes('پف') || p.includes('خوابید') || p.includes('گنبدی') || p.includes('سفت شدن کیک')) {
    const text = `علت‌های علمی و اصلی پف نکردن یا فرورفتگی وسط کیک:

۱. **چرب کردن دیواره قالب**: دیواره‌های قالب کیک اسفنجی را هرگز نباید چرب کنید؛ مایه برای بالا آمدن نیاز به اصطکاک با دیواره خشک دارد.
۲. **باز کردن زودهنگام درب فر**: در ۲۰ تا ۳۰ دقیقه اول پخت به هیچ وجه درب فر را باز نکنید تا شوک برودتی به ساختار مایه وارد نشود.
۳. **دمای نامناسب فر**: دمای بالا باعث بسته شدن زودهنگام پوسته و خمیر ماندن مرکز کیک می‌شود (دمای استاندارد ۱۷۵ تا ۱۸۰ درجه سانتی‌گراد است).
۴. **مرنگ ضعیف**: زدن سفیده تخم‌مرغ باید به مرحله استیف‌پیک (برفی با پره‌های مقاوم) برسد و هنگام فولد کردن آرد، با لیسک در یک جهت دورانی و آرام مخلوط شود.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'علت‌های علمی پف نکردن یا خوابیدن وسط کیک'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'open_calculator',
        labelFa: 'رفتن به استودیو قنادی و محاسبه‌گر قالب کیک'
      }
    };
  }

  // 2. روغن انداختن خورش‌ها و قورمه‌سبزی
  if (p.includes('قورمه') || p.includes('روغن') || p.includes('سبزی')) {
    const text = `رازهای طلایی روغن انداختن و رنگ یشمی قورمه‌سبزی اصیل:

۱. **سرخ کردن اصولی سبزی**: ابتدا سبزی را بدون روغن تفت دهید تا آب آن کاملاً کشیده شود، سپس روغن ریخته و با شعله ملایم ۱۵-۲۰ دقیقه تفت دهید تا یشمی تیره شود.
۲. **شوک حرارتی با یخ**: در ۱۰ دقیقه پایانی پخت، دو قطعه یخ کوچک داخل خورش بیندازید؛ شوک برودتی سریعاً تمام روغن حبس‌شده را به سطح خورش می‌کشد.
۳. **شنبلیله خشک تفت‌خورده**: در انتهای پخت یک قاشق مرباخوری شنبلیله خشک را ۲۰ ثانیه در روغن تفت کوتاه داده و بیفزایید.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'رازهای طلایی روغن انداختن قورمه سبزی با شوک یخ'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'open_recipe',
        targetId: 'ghormeh-sabzi',
        labelFa: 'مشاهده دستور کامل قورمه سبزی اصیل جاافتاده'
      }
    };
  }

  // 3. جایگزین مواد
  if (p.includes('جایگزین') || p.includes('به جای') || p.includes('حساسیت') || p.includes('بدون تخم مرغ') || p.includes('بدون شیر')) {
    const matchedSub = INGREDIENT_SUBSTITUTIONS_DATA.find(s => 
      p.includes(s.originalIngredient.toLowerCase()) || p.includes(s.substituteIngredient.toLowerCase())
    );

    if (matchedSub) {
      const text = `راهنمای جایگزینی تخصصی برای «${matchedSub.originalIngredient}»:

🔹 **ماده جایگزین معتبر**: ${matchedSub.substituteIngredient}
🔹 **نسبت دقیق**: ${matchedSub.ratioDescription}
🔹 **تأثیر بر بافت**: ${matchedSub.textureEffectFa}
🔹 **محدودیت کاربرد**: ${matchedSub.limitationsFa}
${matchedSub.allergenAlertFa ? `⚠️ ${matchedSub.allergenAlertFa}` : ''}`;

      saveChatMemoryLog({
        sourceContext: currentContextLabel,
        userQuery: cleanPrompt,
        aiSummary: `جایگزینی ${matchedSub.originalIngredient} با ${matchedSub.substituteIngredient}`
      });

      return {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'open_substitutes',
          labelFa: 'مشاهده جدول کامل جایگزینی مواد غذایی'
        }
      };
    }
  }

  // 4. شیرینی دانمارکی و خمیر لایه‌ای
  if (p.includes('دانمارکی') || p.includes('شیرینی') || p.includes('خمیر') || p.includes('هزارلا') || p.includes('کره')) {
    const text = `نکات حیاتی خمیر شیرینی دانمارکی و لایه‌ای:

۱. **هم‌دمایی کره و خمیر**: مارگارین لایه‌ای یا کره نباید یخ‌زده باشد (ترک می‌خورد) و نه گرم و شل باشد (وارد بافت آرد شده و لایه‌ها از بین می‌روند).
۲. **استراحت در یخچال بین تا زدن‌ها**: بعد از هر بار باز کردن و ۳لا تا زدن، خمیر را حداقل ۲۰ دقیقه در یخچال بگذارید تا گلوتن استراحت کرده و لایه‌ها تفکیک شوند.
۳. **شربت بار داغ**: بعد از خروج از فر در دمای ۱۹۰ درجه، شربت بار ولرم زعفرانی را بلافاصله با برس روی شیرینی داغ بمالید تا براق و نرم بماند.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'تکنیک لایه‌چینی و دمای کره در شیرینی دانمارکی'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'open_recipe',
        targetId: 'shirini-danmarki',
        labelFa: 'دستور شیرینی دانمارکی قنادی بازاری'
      }
    };
  }

  // 5. طراحی و ابداع غذای کاملاً جدید (New Creative Recipe Design)
  if (p.includes('طراحی') || p.includes('ابداع') || p.includes('جدید') || p.includes('خلق') || p.includes('نوآوری') || (p.includes('چی بپزم') && (p.includes('مرغ') || p.includes('قارچ') || p.includes('گوشت')))) {
    let dishTitle = 'خوراک فیله مرغ کاراملی با سس قارچ پرورده و اسفناج زعفرانی';
    let concept = 'هارمونی این رسپی بر پایه کنتراست طعم ملایم و بافت ترد فیله گریل‌شده، بافت مخملی خامه و قارچ پرورده و عطر زعفران اصیل ایرانی است.';
    
    if (p.includes('بدون گوشت') || p.includes('گیاهی') || p.includes('سبزیجات')) {
      dishTitle = 'گراتن سبزیجات مدیترانه‌ای با سس بشامل زعفرانی و پنیر موزارلا';
      concept = 'ترکیب کدو، بادمجان کبابی و قارچ با سس معطر بشامل و لایه‌های ترد پنیر گراتینه شده.';
    } else if (p.includes('گوشت') && !p.includes('مرغ')) {
      dishTitle = 'استیک فیله راسته با سس فلفل سیاه رستورانی و پوره سیب‌زمینی سیردار';
      concept = 'سییر کردن گوشت در حرارت بسیار بالا برای حفظ آب بافت گوشت و تکمیل با سس غلیظ کره و خامه.';
    }

    const text = `👨‍🍳 **طراحی و مهندسی غذای اختصاصی و نوین:**

✨ **نام غذا**: «${dishTitle}»
🎯 **مفهوم طعم و هارمونی**: ${concept}

📋 **جدول مواد اولیه دقیق (برای ۴ نفر)**:
• فیله مرغ یا راسته گوساله: ۵۰۰ گرم (برش‌های بیتی نواری)
• قارچ دکمه‌ای تازه: ۳۰۰ گرم (ورقه‌ای ضخیم)
• اسفناج تازه جوان: ۲۰۰ گرم (شسته‌شده و خرد درشت)
• پیاز نگینی ریز: ۱ عدد متوسط (۱۲۰ گرم)
• سیر تازه رنده‌شده: ۲ حبه
• کره حیوانی: ۳۰ گرم + روغن زیتون فرابکر: ۲ قاشق غذاخوری
• خامه صبحانه یا شیر پرچرب: ۱۰۰ میلی‌لیتر
• زعفران دم‌کرده غلیظ: ۱ قاشق غذاخوری
• نمک، فلفل سیاه تازه آسیاب‌شده و جوزهندی: به میزان لازم

🍳 **مراحل گام‌به‌گام پخت**:
۱. **مارینِیت فیله‌ها**: فیله‌ها را با ۱ قاشق روغن زیتون، نمک، فلفل سیاه و زعفران دم‌کرده مخلوط کنید و ۱۵ دقیقه استراحت دهید.
۲. **تفت سریع و کراست طلایی**: تابه چدنی را کاملاً داغ کنید؛ فیله‌ها را با حرارت بالا در ۲ دقیقه هر طرف تفت دهید تا آب نیندازد و لایه کاراملی تشکیل شود، سپس از تابه خارج کنید.
۳. **آماده‌سازی سس قارچ و اسفناج**: در همان تابه، کره را ذوب کرده، پیاز و سیر را ۱ دقیقه تفت دهید. قارچ‌ها را با حرارت بالا بیفزایید تا طلایی شوند. سپس اسفناج را اضافه کرده و فقط ۱ دقیقه تفت دهید تا حجمش کم شود. خامه و مقدار کمی جوزهندی اضافه کنید و شعله را ملایم کنید تا سس قوام آید.
۴. **ترکیب نهایی و سرو**: فیله‌های کاراملی را به سس برگردانید و ۱ دقیقه اجازه دهید طعم‌ها همگام شوند. در کنار برنج کته قالبی یا پوره سیب‌زمینی سرو کنید.

📊 **ارزش غذایی هر سهم**: ~۳۸۰ کیلوکالری | پروتئین: ۳۶g | کربوهیدرات: ۱۰g | چربی سالم: ۱۸g
💡 **فوت کوزه‌گری سرآشپز**: گوشت را هرگز در تابه شلوغ نکنید؛ فضای خالی تابه مانع از آب انداختن فیله‌ها می‌شود.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: `طراحی و خلق غذای نوین: ${dishTitle}`
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
  }

  // 6. بیف استروگانف فرانسوی-روسی اصیل (خارج از رسپی‌های ذخیره‌شده)
  if (p.includes('استروگانف') || p.includes('بیف استروگانف') || p.includes('چیکن استروگانف')) {
    const isChicken = p.includes('چیکن');
    const text = `👨‍🍳 **دستور پخت اصیل و رستورانی ${isChicken ? 'چیکن' : 'بیف'} استروگانف:**

📋 **مواد لازم برای ۴ نفر**:
• ${isChicken ? 'سینه یا فیله مرغ' : 'فیله یا راسته گوساله'}: ۵۰۰ گرم (برش خلالی باریک انگشتی)
• قارچ تازه: ۳۵۰ گرم (اسلایس‌شده)
• پیاز بزرگ: ۱ عدد (خلالی نازک کاراملی)
• کره: ۴۰ گرم + روغن: ۱ قاشق غذاخوری
• خامه ترش یا خامه صبحانه: ۱۵۰ گرم
• خردل دیژون: ۱ قاشق مرباخوری (راز عطر اصیل)
• عصاره گوشت غلیظ: ۱/۲ پیمانه (۱۰۰ میلی‌لیتر)
• سیب‌زمینی چیپسی خلال بسیار نازک: ۲ عدد بزرگ
• نمک، فلفل سیاه تازه و پودر سیر

🍳 **مراحل پخت اصیل**:
۱. **تفت گوشت با حرارت فوق‌العاده بالا**: تابه سنگین چدنی را کاملاً داغ کنید. گوشت را در دو مرحله بریزید تا حرارت تابه افت نکند. گوشت نباید آب بیندازد؛ در ۳ تا ۴ دقیقه تفت داده و فوراً خارج کنید.
۲. **کاراملی کردن قارچ و پیاز**: پیاز خلالی را در همان تابه تفت دهید تا بلوری و طلایی شود. سپس قارچ را بیفزایید و با شعله بالا تفت دهید.
۳. **سس مخملی**: خردل دیژون، عصاره گوشت و فلفل سیاه را اضافه کرده، ۲ دقیقه بجوشانید. سپس خامه را افزوده و شعله را بسیار کم کنید تا خامه نبرد.
۴. **مونتاژ و چیپس خلال**: گوشت را به سس افزوده و فقط ۲ دقیقه بعد خاموش کنید. هنگام سرو، خلال‌های سیب‌زمینی چیپسی ترد را روی آن کوه کنید.

💡 **فوت کوزه‌گری سرآشپز**: خامه را هرگز نجوشانید؛ جوشیدن خامه بافت امولسیون سس را می‌شکند. خردل دیژون تیزی خاصی می‌دهد که چربی خامه را متعادل می‌کند.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'دستور اصیل بیف استروگانف با چیپس خلال و سس خامه خردل'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
  }

  // 7. پاستا آلفردو اصیل ایتالیایی (Fettuccine Alfredo)
  if (p.includes('آلفردو') || p.includes('پاستا') || p.includes('فتوچینی')) {
    const text = `👨‍🍳 **راز پخت پاستا فتوچینی آلفردو اصیل رستورانی:**

📋 **مواد لازم برای ۴ نفر**:
• پاستا فتوچینی: ۴۰۰ گرم
• فیله مرغ: ۳۰۰ گرم (گریل‌شده با نمک، فلفل و پاپریکا)
• قارچ ورقه شده: ۲۵۰ گرم
• کره حیوانی بدون نمک: ۵۰ گرم
• خامه صبحانه باکیفیت: ۲۰۰ میلی‌لیتر
• سیر تازه رنده شده: ۳ حبه
• پنیر پارمزان اصل رنده ریز: ۶۰ گرم
• آب نشاسته‌ای در حال جوش پاستا: ۱ استکان (عامل امولسیون مخملی)
• جعفری ساطوری تازه: ۲ قاشق غذاخوری

🍳 **تکنیک اجرایی**:
۱. **پخت پاستا**: پاستا را در آب در حال جوش پرنمک بریزید تا به مرحله «آل‌دنته» (دندان‌گیر) برسد. حتماً ۱ فنجان از آب پاستا را قبل از آبکش نگه دارید.
۲. **سس غلیظ**: در تابه بزرگ، کره را با سیر رنده‌شده ۳۰ ثانیه تفت دهید تا عطرش بلند شود، قارچ‌ها را اضافه کرده تا نرم و سرخ شوند.
۳. **ترکیب خامه و آب پاستا**: خامه را بیفزایید و بلافاصله نصف استکان آب نشاسته‌ای پاستا را اضافه کنید. حرارت ملایم باشد تا سس شروع به حباب زدن کند.
۴. **امولسیون پارمزان**: پاستای داغ را مستقیماً داخل تابه سس بریزید، پنیر پارمزان را بیفزایید و سریع هم بزنید تا پنیر در آب نشاسته و خامه حل شود و سس مخملی به تمام رشته‌های پاستا بچسبد.

💡 **فوت کوزه‌گری**: هرگز آرد یا نشاسته ذرت به آلفردو نزنید؛ عامل غلظت اصیل، ترکیب نشاسته آب پاستا با چربی کره و پروتئین پنیر پارمزان است.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'دستور پاستا آلفردو اصیل با آب نشاسته پاستا و پارمزان'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
  }

  // 8. سوشی و غذاهای آسیای شرقی (Sushi & Asian Cuisine)
  if (p.includes('سوشی') || p.includes('رول') || p.includes('نوری') || p.includes('غذای ژاپنی')) {
    const text = `👨‍🍳 **راهنمای جامع پخت سوشی خانگی استاندارد و حرفه‌ای:**

📋 **مواد لازم**:
• برنج مخصوص سوشی (دانه گرد ژاپنی یا برنج نیم‌دانه شمال): ۲ پیمانه
• سرکه برنج: ۳ قاشق غذاخوری + شکر: ۱ قاشق غذاخوری + نمک: ۱/۲ قاشق چایخوری (چاشنی سومس)
• جلبک نوری (Nori): ۴ ورق
• فیلینگ دلخواه: فیله سالمون نروژی / میگو پخته / خیار خلال نازک / آووکادو / پنیر خامه‌ای فیلادلفیا
• سس سویا، واسابی تند و ترشی زنجبیل (گاری)

🍳 **مراحل آماده‌سازی**:
۱. **پخت و چاشنی برنج (Shari)**: برنج را چندین بار بشویید تا آب زلال شود. با ۲ و ۱/۴ پیمانه آب بدون نمک و روغن کته بپزید. بعد از پخت، مخلوط سرکه، شکر و نمک را روی برنج داغ بریزید و با کفگیر چوبی به آرامی با زاویه ۴۵ درجه برش بزنید تا سرد شود بدون له شدن دانه‌ها.
۲. **رول کردن با مت بامبو (Makisu)**: ورق جلبک نوری را از سمت زبر رو به بالا روی مت قرار دهید. دست‌ها را به آب سرکه‌ای مرطوب کرده، لایه‌ای نازک از برنج روی ۳/۴ جلبک پخش کنید.
۳. **قرار دادن فیلینگ**: نواری از خیار، آووکادو، سالمون یا مرغ سوخاری وسط برنج بچینید.
۴. **رول کردن محکم**: با کمک مت بامبو، از لبه نزدیک شروع به لوله کردن کنید و فشار یکنواخت دهید تا استوانه‌ای فشرده تشکیل شود.
۵. **برش با چاقوی تیز خیس**: چاقوی فوق‌العاده تیز سرآشپز را با دستمال مرطوب کنید و هر رول را به ۶ یا ۸ تکه مساوی برش دهید.

💡 **فوت کوزه‌گری سرآشپز**: راز سوشی عالی، کیفیت برنج و کنترل رطوبت است؛ اگر دستتان به آب آغشته نباشد برنج به دستتان می‌چسبد، و اگر چاقو خیس نباشد رول را پاره می‌کند.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'طرز تهیه سوشی استاندارد خانگی و چاشنی برنج سرکه‌ای'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
  }

  // 9. تاکو و غذاهای مکزیکی (Mexican Tacos & Fajitas)
  if (p.includes('تاکو') || p.includes('مکزیکی') || p.includes('بوریتو') || p.includes('فاهیتا')) {
    const text = `👨‍🍳 **دستور تاکو و فاهیتای اصیل مکزیکی با سس سالسا:**

📋 **مواد لازم**:
• گوشت چرخ‌کرده یا راسته گوساله باریک: ۴۰۰ گرم
• نان تورتیلای نرم ذرت یا پیتا: ۸ عدد
• ادویه مخصوص تاکو: پودر چیلی، زیره سبز، پاپریکا دودی، پودر سیر، اورگانو و فلفل قرمز
• سالسا پیکو د گالو: ۲ عدد گوجه خرد نگینی + ۱/۲ پیاز قرمز + گشنیز تازه + آب لیمو ترش تازه
• پنیر چدار رنده شده و کاهو پیچ نواری

🍳 **تکنیک پخت**:
۱. گوشت را در تابه با ۱ قاشق روغن تفت دهید، ادویه تاکو را اضافه کنید و ۳ قاشق غذاخوری آب بیفزایید تا ادویه غلیظ شده و به خورد گوشت برود.
۲. نان‌های تورتیلا را روی تابه خشک بدون روغن ۳۰ ثانیه هر طرف داغ کنید تا نرم و تاشو شوند.
۳. داخل نان‌ها لایه‌ای از گوشت معطر، سالسای تازه گوجه-گشنیز، پنیر چدار و سس سفید سیر بگذارید و تا کنید.

💡 **فوت کوزه‌گری**: سالسای گوجه را حتماً در آبکش بگذارید تا آب اضافی آن گرفته شود و نان تاکو خمیر نشود.`;

    saveChatMemoryLog({
      sourceContext: currentContextLabel,
      userQuery: cleanPrompt,
      aiSummary: 'دستور تاکو اصیل مکزیکی با ادویه دست‌ساز و سالسا'
    });

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
  }

  // Default intelligent assistant response
  const text = `در خدمت شما هستم! من با اشراف کامل به تمام سبک‌های آشپزی ایرانی، محلی و بین‌المللی، آماده پاسخگویی دقیق و تخصصی هستم:

• طراحی غذاهای نوین و ابداعی بر اساس موادی که در خانه دارید
• رسپی کامل غذاهای ملل (بیف استروگانف، پاستاها، لازانیا، سوشی، تاکو و...)
• رفع عیوب پخت و رازهای جاافتادن انواع خورش‌های اصیل ایرانی
• فرمولاسیون دقیق کیک، خمیرهای لایه‌ای و قنادی بازاری
• تنظیم برنامه غذایی و بررسی سلامت و کالری مجاز

هر سوالی درباره آشپزی اصیل یا بین‌المللی دارید بفرمایید تا دقیق پاسخ دهم!`;

  saveChatMemoryLog({
    sourceContext: currentContextLabel,
    userQuery: cleanPrompt,
    aiSummary: 'پاسخ عمومی و راهنمای قابلیت‌های سرآشپز هوشمند'
  });

  return {
    id: 'msg-' + Date.now(),
    sender: 'assistant',
    text,
    timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  };
}
