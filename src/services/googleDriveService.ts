/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { RECIPES_DATA } from '../data/recipes';
import { getStoredShoppingList } from './shoppingService';

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.file'
];

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.file');

// In-memory token management
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('توکن دسترسی گوگل از سامانه احراز هویت دریافت نشد.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  size?: string;
  webViewLink?: string;
}

/**
 * Uploads a JSON file to Google Drive using multipart upload
 */
export async function uploadJsonToDrive(
  fileName: string,
  data: any,
  description: string
): Promise<DriveFileItem> {
  const token = await getAccessToken();
  if (!token) throw new Error('برای ذخیره‌سازی، لطفاً ابتدا وارد حساب گوگل خود شوید.');

  const metadata = {
    name: fileName,
    mimeType: 'application/json',
    description: description
  };

  const fileContent = JSON.stringify(data, null, 2);
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelim = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    fileContent +
    closeDelim;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,createdTime', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`خطا در آپلود به گوگل درایو: ${res.statusText} (${errorText})`);
  }

  return await res.json();
}

/**
 * Uploads an HTML/Standalone app file to Google Drive
 */
export async function uploadHtmlToDrive(
  fileName: string,
  htmlContent: string,
  description: string
): Promise<DriveFileItem> {
  const token = await getAccessToken();
  if (!token) throw new Error('برای ذخیره‌سازی، لطفاً ابتدا وارد حساب گوگل خود شوید.');

  const metadata = {
    name: fileName,
    mimeType: 'text/html',
    description: description
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelim = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/html; charset=UTF-8\r\n\r\n' +
    htmlContent +
    closeDelim;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,createdTime', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`خطا در آپلود به گوگل درایو: ${res.statusText} (${errorText})`);
  }

  return await res.json();
}

/**
 * List files created by this app in Google Drive
 */
export async function listAppDriveFiles(): Promise<DriveFileItem[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const res = await fetch(
    'https://www.googleapis.com/drive/v3/files?pageSize=30&fields=files(id,name,mimeType,webViewLink,createdTime,size)&q=trashed=false&orderBy=createdTime desc',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.files || [];
}

/**
 * Delete a file in Google Drive
 */
export async function deleteDriveFile(fileId: string): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) throw new Error('نشست نامعتبر است.');

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.ok;
}

/**
 * Shortcut: Upload complete 374 recipes master catalog to Google Drive
 */
export async function backupMasterRecipesToDrive(): Promise<DriveFileItem> {
  const payload = {
    exportedAt: new Date().toISOString(),
    appName: 'سرآشپز هوشمند | Smart Chef Iran',
    version: '2.5.0',
    totalRecipes: RECIPES_DATA.length,
    recipes: RECIPES_DATA
  };

  return await uploadJsonToDrive(
    `SmartChef_Master_Recipes_${RECIPES_DATA.length}_Dishes.json`,
    payload,
    'بانک اطلاعاتی جامع ۳۷۴ رسپی اصیل ایرانی، قنادی و فست‌فود همراه با مواد تفکیک‌شده و قیمت‌های روز اکالا'
  );
}

/**
 * Shortcut: Upload shopping list to Google Drive
 */
export async function backupShoppingListToDrive(): Promise<DriveFileItem> {
  const items = getStoredShoppingList();
  const payload = {
    exportedAt: new Date().toISOString(),
    appName: 'سرآشپز هوشمند | Smart Chef Iran',
    totalItems: items.length,
    shoppingList: items
  };

  return await uploadJsonToDrive(
    `SmartChef_ShoppingList_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.json`,
    payload,
    'فهرست خرید هوشمند روز با قیمت‌های تاییدشده اکالا'
  );
}
