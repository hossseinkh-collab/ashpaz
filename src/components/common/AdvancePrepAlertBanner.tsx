import React, { useState, useEffect } from 'react';
import { 
  Bell, BellRing, Check, Clock, AlertTriangle, Sparkles, ChevronDown, 
  ChevronUp, ExternalLink, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { 
  AdvancePrepTask, 
  getActiveAdvancePrepReminders, 
  markPrepTaskDone, 
  resetPrepTaskDone,
  requestNotificationPermission,
  sendMobilePushNotification,
  getNotificationPermissionState
} from '../../services/prepReminderService';

interface AdvancePrepAlertBannerProps {
  onOpenRecipe?: (recipeId: string) => void;
  compact?: boolean;
}

export const AdvancePrepAlertBanner: React.FC<AdvancePrepAlertBannerProps> = ({ 
  onOpenRecipe, 
  compact = false 
}) => {
  const [reminders, setReminders] = useState<AdvancePrepTask[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<string>('default');
  const [testNotificationSent, setTestNotificationSent] = useState<boolean>(false);

  const loadReminders = () => {
    const list = getActiveAdvancePrepReminders();
    setReminders(list);
    setPermissionState(getNotificationPermissionState());
  };

  useEffect(() => {
    loadReminders();
    // Refresh every minute in case meal plan or day updates
    const interval = setInterval(loadReminders, 60000);
    return () => clearInterval(interval);
  }, []);

  if (reminders.length === 0) return null;

  const handleMarkDone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markPrepTaskDone(id);
    loadReminders();
  };

  const handleUndoDone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    resetPrepTaskDone(id);
    loadReminders();
  };

  const handleEnableNotifications = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const granted = await requestNotificationPermission();
    setPermissionState(getNotificationPermissionState());
    if (granted && reminders.length > 0) {
      const first = reminders[0];
      sendMobilePushNotification(
        `یادآور پیش‌پخت: ${first.dishNameFa}`,
        `${first.taskTitle} - ${first.timingLabelFa}`
      );
      setTestNotificationSent(true);
      setTimeout(() => setTestNotificationSent(false), 4000);
    }
  };

  const handleSendTestNotification = (task: AdvancePrepTask, e: React.MouseEvent) => {
    e.stopPropagation();
    if (Notification.permission !== 'granted') {
      handleEnableNotifications(e);
      return;
    }
    const success = sendMobilePushNotification(
      `سرآشپز هوشمند: ${task.taskTitle}`,
      `برای وعده ${task.mealType === 'lunch' ? 'ناهار' : 'شام'} ${task.targetDayFa}: ${task.taskInstruction.slice(0, 90)}...`
    );
    if (success) {
      setTestNotificationSent(true);
      setTimeout(() => setTestNotificationSent(false), 4000);
    }
  };

  const pendingReminders = reminders.filter(r => !r.isDone);
  const completedReminders = reminders.filter(r => r.isDone);

  return (
    <div className="w-full space-y-2">
      {/* Active High-Priority Alert Cards */}
      {pendingReminders.map(task => {
        const isExpanded = expandedId === task.id;
        return (
          <div
            key={task.id}
            onClick={() => setExpandedId(isExpanded ? null : task.id)}
            className="rounded-2xl p-3 bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 border border-amber-500/40 shadow-lg cursor-pointer transition hover:border-amber-400"
          >
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-amber-400/20">
                  <BellRing className="w-4 h-4 animate-bounce" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      یادآور پیش‌نیاز {task.mealType === 'lunch' ? 'ناهار' : 'شام'} {task.targetDayFa}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      زمان اقدام: {task.timingLabelFa}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{task.taskTitle}</span>
                    <span className="text-amber-400 text-[11px]">({task.dishNameFa})</span>
                  </h3>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleMarkDone(task.id, e)}
                  className="px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1 transition"
                  title="علامت‌گذاری به عنوان انجام شده"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>انجام شد</span>
                </button>
              </div>
            </div>

            {/* Instruction snippet */}
            <p className={`text-[11px] text-slate-300 leading-relaxed mt-2 ${isExpanded ? '' : 'line-clamp-2'}`}>
              {task.taskInstruction}
            </p>

            {/* Expanded actions & Notification test */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                {permissionState !== 'granted' ? (
                  <button
                    onClick={handleEnableNotifications}
                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline"
                  >
                    <Bell className="w-3 h-3" />
                    <span>فعال‌سازی نوتیفیکیشن در صفحه گوشی</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleSendTestNotification(task, e)}
                    className="text-[10px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{testNotificationSent ? 'نوتیفیکیشن ارسال شد!' : 'ارسال اعلان تست به گوشی'}</span>
                  </button>
                )}
              </div>

              {onOpenRecipe && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenRecipe(task.recipeId);
                  }}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>مشاهده رسپی</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Show completed count with toggle */}
      {completedReminders.length > 0 && (
        <div className="text-[10px] text-slate-500 flex items-center justify-between px-2 pt-1">
          <span>{completedReminders.length} کار پیش‌نیاز قبلاً انجام و ثبت شده است</span>
          <button
            onClick={() => {
              completedReminders.forEach(r => resetPrepTaskDone(r.id));
              loadReminders();
            }}
            className="text-amber-400/80 hover:text-amber-300 underline"
          >
            بازنشانی همه
          </button>
        </div>
      )}
    </div>
  );
};
