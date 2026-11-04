/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, Cloud, Check, AlertCircle, ExternalLink, 
  Trash2, RefreshCw, Database, ShoppingCart, 
  FileCode, CheckCircle2, LogOut, Download
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  googleSignIn, 
  initAuth, 
  logout, 
  getAccessToken, 
  backupMasterRecipesToDrive, 
  backupShoppingListToDrive, 
  uploadHtmlToDrive, 
  listAppDriveFiles, 
  deleteDriveFile, 
  DriveFileItem 
} from '../../services/googleDriveService';
import { RECIPES_DATA } from '../../data/recipes';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        fetchFiles();
      },
      () => {
        setUser(null);
        setToken(null);
        setDriveFiles([]);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  const fetchFiles = async () => {
    setIsRefreshing(true);
    try {
      const files = await listAppDriveFiles();
      setDriveFiles(files);
    } catch (err) {
      console.error('Error fetching drive files:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoading(true);
    setActionMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setActionMessage({ type: 'success', text: `خوش‌آمدید ${res.user.displayName || 'کاربر گرامی'}! اتصال به گوگل‌درایو برقرار شد.` });
        fetchFiles();
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'خطا در اتصال به گوگل درایو.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm('آیا مایل به خروج از حساب گوگل درایو هستید؟')) {
      await logout();
      setUser(null);
      setToken(null);
      setDriveFiles([]);
      setActionMessage(null);
    }
  };

  const handleBackupRecipes = async () => {
    if (!confirm(`آیا مایل به ذخیره‌سازی فایل جامع ۳۷۴ رسپی در گوگل درایو خود هستید؟`)) return;

    setIsLoading(true);
    setActionMessage(null);
    try {
      const file = await backupMasterRecipesToDrive();
      setActionMessage({ 
        type: 'success', 
        text: `بانک اطلاعاتی ۳۷۴ رسپی با موفقیت در گوگل درایو شما ذخیره شد: "${file.name}"` 
      });
      fetchFiles();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'خطا در ذخیره‌سازی رسپی‌ها.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupShoppingList = async () => {
    if (!confirm('آیا از ذخیره لیست خرید هوشمند روز در گوگل درایو اطمینان دارید؟')) return;

    setIsLoading(true);
    setActionMessage(null);
    try {
      const file = await backupShoppingListToDrive();
      setActionMessage({ 
        type: 'success', 
        text: `فهرست خرید روز با قیمت‌های اکالا در گوگل درایو شما ذخیره شد: "${file.name}"` 
      });
      fetchFiles();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'خطا در ذخیره لیست خرید.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupAppLauncher = async () => {
    if (!confirm('آیا مایل به ذخیره پکیج تحت وب اپلیکیشن در گوگل درایو هستید؟')) return;

    setIsLoading(true);
    setActionMessage(null);
    try {
      const htmlContent = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>سرآشپز هوشمند | Smart Chef Iran</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding: 40px 20px; }
    .card { max-width: 480px; margin: 0 auto; background: #1e293b; border-radius: 24px; padding: 30px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    h1 { color: #f59e0b; font-size: 24px; margin-bottom: 12px; }
    p { font-size: 14px; color: #94a3b8; line-height: 1.6; }
    .btn { display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 14px 28px; border-radius: 9999px; text-decoration: none; margin-top: 20px; font-size: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>👨‍🍳 سرآشپز هوشمند</h1>
    <p>بانک جامع ۳۷۴ رسپی اصیل ایرانی، قنادی و شیرینی همراه با محاسبه دقیق مقادیر و قیمت‌های روز اکالا</p>
    <a href="https://ais-dev-frkyg7yg6wotbqhdnun3uv-282889047607.us-west2.run.app" target="_blank" class="btn">ورود به برنامه آنلاین</a>
  </div>
</body>
</html>`;

      const file = await uploadHtmlToDrive(
        'SmartChef_Web_Launcher.html',
        htmlContent,
        'فایل میانبر وب و اجرای مستقیم سرآشپز هوشمند'
      );
      setActionMessage({ 
        type: 'success', 
        text: `فایل میانبر در گوگل درایو ذخیره شد: "${file.name}"` 
      });
      fetchFiles();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'خطا در ذخیره فایل.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async (file: DriveFileItem) => {
    const confirmed = confirm(
      `آیا از حذف فایل "${file.name}" از گوگل درایو اطمینان دارید؟ این عملیات قابل بازگشت نیست.`
    );
    if (!confirmed) return;

    try {
      await deleteDriveFile(file.id);
      setActionMessage({ type: 'success', text: `فایل "${file.name}" از گوگل درایو حذف شد.` });
      fetchFiles();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'خطا در حذف فایل.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>ذخیره‌سازی روی گوگل درایو</span>
                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Google Drive
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">انتقال و پشتیبان‌گیری مستقیم از برنامه روی حساب شما</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">

          {/* Action Message Alert */}
          {actionMessage && (
            <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2 ${
              actionMessage.type === 'success' 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {actionMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              )}
              <span className="leading-tight">{actionMessage.text}</span>
            </div>
          )}

          {/* User Auth Section */}
          {!user ? (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-300">
                جهت ذخیره مستقیم فایل‌ها روی گوگل درایو شخصی، ابتدا با حساب گوگل خود متصل شوید:
              </p>

              {/* Official Google Sign-In Button */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-medium text-xs py-2.5 px-4 rounded-xl shadow-md transition active:scale-98 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{isLoading ? 'در حال برقراری اتصال...' : 'ورود با حساب گوگل (Sign in with Google)'}</span>
              </button>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-blue-500/40" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-white block">{user.displayName || 'کاربر متصل'}</span>
                  <span className="text-[10px] text-slate-400 block font-mono">{user.email}</span>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                title="خروج از حساب"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Upload Action Buttons */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 px-1">عملیات ذخیره‌سازی در Google Drive:</h3>

            {/* 1. Backup Master Recipes (374 dishes) */}
            <button
              onClick={handleBackupRecipes}
              disabled={!user || isLoading}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-right transition disabled:opacity-50 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-105 transition">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">ذخیره بانک کامل ۳۷۴ رسپی</span>
                  <span className="text-[10px] text-slate-400">تمام دستورهای غذایی تفکیک‌شده و قیمت‌های اکالا (JSON)</span>
                </div>
              </div>
              <Cloud className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
            </button>

            {/* 2. Backup Shopping List */}
            <button
              onClick={handleBackupShoppingList}
              disabled={!user || isLoading}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-right transition disabled:opacity-50 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">ذخیره فهرست خرید روز</span>
                  <span className="text-[10px] text-slate-400">اقلام تفکیک‌شده سبد خرید با قیمت‌های روز اکالا</span>
                </div>
              </div>
              <Cloud className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
            </button>

            {/* 3. Upload Web Launcher */}
            <button
              onClick={handleBackupAppLauncher}
              disabled={!user || isLoading}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-right transition disabled:opacity-50 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-105 transition">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">ذخیره میانبر آنلاین برنامه در درایو</span>
                  <span className="text-[10px] text-slate-400">فایل HTML وب جهت باز کردن مستقیم سرآشپز از داخل Google Drive</span>
                </div>
              </div>
              <Cloud className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
            </button>

            {/* 4. Direct Full App ZIP Download */}
            <a
              href="/smart_chef_iran.zip"
              download="smart_chef_iran.zip"
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between text-right transition group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">دانلود پکیج کامل برنامه (ZIP ۵۳ مگابایت)</span>
                  <span className="text-[10px] text-slate-400">شامل تمامی ۳۷۴ رسپی، تصاویر و استایل‌ها جهت آرشیو در درایو</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
            </a>
          </div>

          {/* User's Google Drive Files List */}
          {user && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-300">فایل‌های شما در گوگل درایو:</span>
                <button
                  onClick={fetchFiles}
                  disabled={isRefreshing}
                  className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>بروزرسانی</span>
                </button>
              </div>

              {driveFiles.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
                  <p className="text-xs text-slate-500">هنوز فایلی توسط این برنامه در گوگل‌درایو ذخیره نشده است.</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                  {driveFiles.map(file => (
                    <div
                      key={file.id}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition"
                    >
                      <div className="truncate max-w-[220px]">
                        <span className="font-medium text-slate-200 block truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(file.createdTime).toLocaleDateString('fa-IR')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-slate-800 transition"
                            title="مشاهده در گوگل درایو"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteFile(file)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                          title="حذف از گوگل درایو"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
