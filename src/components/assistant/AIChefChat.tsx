import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Send, ChefHat, User, ArrowRight, CornerDownLeft,
  Clock, Trash2, BookOpen, Layers, X, ShieldAlert, CheckCircle2
} from 'lucide-react';
import { 
  askSmartChef, 
  ChatMessage, 
  getChatMemoryLogs, 
  clearChatMemoryLogs 
} from '../../services/aiChefService';
import { AIPageContext, ChatMemoryLogEntry } from '../../types';

interface AIChefChatProps {
  pageContext?: AIPageContext;
  onNavigate: (tab: string, recipeId?: string) => void;
  onClose?: () => void;
}

export const AIChefChat: React.FC<AIChefChatProps> = ({ pageContext, onNavigate, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    let welcome = `سلام! من «سرآشپز ارشد هوشمند» هستم. 👨‍🍳\nاستاد تمام آشپزی اصیل ایرانی و محلی ۳۱ استان، آشپزی بین‌المللی (ایتالیایی، فرانسوی، آسیایی، مکزیکی)، مهندسی و طراحی رسپی‌های نوین، قنادی و رژیم سلامت.\n`;
    if (pageContext?.activeRecipe) {
      welcome += `\n📍 **هم‌اکنون در صفحه پخت «${pageContext.activeRecipe.title}» هستید.**\nمن تمام مواد و مراحل و نکات این دستور را با جزئیات کامل می‌دانم. هر سوالی دارید بفرمایید!`;
    } else if (pageContext?.healthData) {
      welcome += `\n📍 **در صفحه سلامت و رژیم هستید.**\nاطلاعات وزن شما (${pageContext.healthData.weightKg} kg) و کالری روزانه (${pageContext.healthData.dailyCalories} kcal) پیش روی من است.`;
    } else {
      welcome += `\nچه سوالی درباره پخت، طراحی یک غذای جدید یا دستورهای بین‌المللی دارید؟`;
    }

    return [{
      id: 'init-1',
      sender: 'assistant',
      text: welcome,
      timestamp: 'اکنون'
    }];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [memoryLogs, setMemoryLogs] = useState<ChatMemoryLogEntry[]>(getChatMemoryLogs());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate contextual quick prompt chips based on current page
  const getContextualPrompts = (): string[] => {
    if (pageContext?.activeRecipe) {
      const title = pageContext.activeRecipe.title;
      return [
        'آیا این رسپی و مقادیرش درسته؟',
        'نکته طلایی و فوت کوزه‌گری این دستور چیه؟',
        'زمان دقیق و دمای پخت چقدره؟',
        'اگر ماده‌ای نداشته باشم چی جایگزین کنم؟'
      ];
    }

    if (pageContext?.healthData) {
      return [
        'کالری مجاز روزانه من چقدره و چطور مصرف کنم؟',
        'برای کاهش وزن چه ترفندهایی قبل از غذا داری؟',
        'آیا مطابق خط سیر مطلوب پیش می‌رم؟'
      ];
    }

    return [
      '💡 یک غذای جدید و خلاقانه با مرغ و قارچ و اسفناج برام طراحی کن',
      '🌍 دستور پخت بیف استروگانف فرانسوی اصیل با چیپس خلال',
      '🍣 طرز تهیه سوشی سالمون و کالیفرنیا رول ژاپنی',
      '🍝 راز سس پاستا فتوچینی آلفردو اصیل ایتالیایی',
      '🥘 قورمه‌سبزی رو چطور یشمی تیره کنم و روغن بندازم؟',
      '🎂 چرا وسط کیک اسفنجی پف نمی‌کنه و می‌خوابه؟'
    ];
  };

  const quickPrompts = getContextualPrompts();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await askSmartChef(text, messages, pageContext);
      setMessages(prev => [...prev, reply]);
      setMemoryLogs(getChatMemoryLogs());
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'متاسفانه در برقراری ارتباط خطایی رخ داد؛ لطفاً دوباره امتحان کنید.',
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (onClose) onClose();

    if (action.type === 'open_calculator') {
      onNavigate('pastry');
    } else if (action.type === 'open_recipe' && action.targetId) {
      onNavigate('recipes', action.targetId);
    } else if (action.type === 'open_substitutes') {
      onNavigate('fridge');
    } else if (action.type === 'open_health') {
      onNavigate('health');
    }
  };

  const handleClearMemory = () => {
    clearChatMemoryLogs();
    setMemoryLogs([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9.5rem)] max-w-md mx-auto px-3 pt-2">
      {/* Top Context & Memory Bar */}
      <div className="mb-2 p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[11px] text-slate-300 font-medium truncate">
            {pageContext?.activeRecipe 
              ? `📍 زمینه: ${pageContext.activeRecipe.title}`
              : `📍 موقعیت: ${pageContext?.pageTitleFa || 'عمومی'}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowMemoryModal(true)}
            title="سوابق خلاصه چت‌ها و حافظه هوش مصنوعی"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 text-[10px] font-bold transition"
          >
            <Clock className="w-3 h-3 text-amber-400" />
            <span>حافظه ({memoryLogs.length})</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-3 pr-1">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-amber-500/10">
                <ChefHat className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-amber-400 text-slate-950 font-medium rounded-tl-sm shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tr-sm shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line">
                {msg.text}
              </div>

              {msg.suggestedAction && (
                <button
                  onClick={() => handleActionClick(msg.suggestedAction)}
                  className="mt-2 w-full py-2 px-3 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-bold text-[11px] flex items-center justify-between transition active:scale-98"
                >
                  <span>{msg.suggestedAction.labelFa}</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              )}

              <span className={`text-[10px] block text-left ${msg.sender === 'user' ? 'text-slate-800 font-mono' : 'text-slate-500 font-mono'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-xs text-amber-400 bg-slate-900 border border-slate-800 p-3 rounded-2xl w-fit">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>سرآشپز در حال تحلیل داده‌های زمینه و پاسخگویی تخصصی...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-amber-400 hover:border-amber-400/60 transition active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="relative shrink-0 pt-1 pb-1">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={pageContext?.activeRecipe ? `سوال از دستور «${pageContext.activeRecipe.title}»...` : "سوال از سرآشپز هوشمند (مثلاً: سبزی چقدر تفت بخوره؟)..."}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-amber-400 text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition shadow-sm"
        >
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </div>

      {/* Memory Log Modal */}
      {showMemoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-3.5 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">لاگ سوابق و حافظه هوش مصنوعی</h3>
              </div>
              <button
                onClick={() => setShowMemoryModal(false)}
                className="text-slate-400 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              تمامی سوال‌ها و خلاصه‌های گفتگوی شما در این حافظه ثبت شده و در هر بار فراخوانی، همراه با زمینه صفحه برای هوش مصنوعی ارسال می‌شود تا همه چیز را به یاد داشته باشد.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
              {memoryLogs.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 text-center text-xs text-slate-500">
                  هنوز سابقه‌ای ثبت نشده است. با ارسال اولین پیام، حافظه فعال خواهد شد.
                </div>
              ) : (
                memoryLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-amber-400 font-mono">
                      <span>{log.sourceContext}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <div className="text-slate-200 font-medium">
                      ❓ {log.userQuery}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      💡 {log.aiSummary}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              {memoryLogs.length > 0 && (
                <button
                  onClick={handleClearMemory}
                  className="flex-1 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>پاک کردن حافظه</span>
                </button>
              )}
              <button
                onClick={() => setShowMemoryModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
