import { InventoryItem, MeasurementUnit } from '../types';

const INVENTORY_STORAGE_KEY = 'smart_chef_pantry_v1';

export const INITIAL_PANTRY_ITEMS: InventoryItem[] = [
  { id: 'inv-1', name: 'برنج ایرانی طارم', amount: 5, unit: 'kg', category: 'غلات', storageLocation: 'pantry', storageLocationFa: 'کابینت و انبار', expirationDate: '2026-12-01' },
  { id: 'inv-2', name: 'سینه مرغ تازه', amount: 1200, unit: 'g', category: 'پروتئین', storageLocation: 'freezer', storageLocationFa: 'فریزر', expirationDate: '2026-11-20' },
  { id: 'inv-3', name: 'پیاز زرد', amount: 3, unit: 'kg', category: 'صیفی‌جات', storageLocation: 'pantry', storageLocationFa: 'کابینت و انبار', expirationDate: '2026-10-30' },
  { id: 'inv-4', name: 'تخم‌مرغ محلی', amount: 15, unit: 'pcs', category: 'لبنیات و تخم‌مرغ', storageLocation: 'refrigerator', storageLocationFa: 'یخچال', expirationDate: '2026-10-25' },
  { id: 'inv-5', name: 'ماست پرچرب چکیده', amount: 800, unit: 'g', category: 'لبنیات', storageLocation: 'refrigerator', storageLocationFa: 'یخچال', expirationDate: '2026-10-18' },
  { id: 'inv-6', name: 'آرد نول قنادی سه صفر', amount: 2, unit: 'kg', category: 'آرد و پودر', storageLocation: 'pantry', storageLocationFa: 'کابینت و انبار', expirationDate: '2027-02-15' },
  { id: 'inv-7', name: 'زعفران قائنات', amount: 10, unit: 'g', category: 'ادویه', storageLocation: 'pantry', storageLocationFa: 'کابینت و انبار', expirationDate: '2027-06-01' },
  { id: 'inv-8', name: 'رب گوجه‌فرنگی غلیظ', amount: 800, unit: 'g', category: 'چاشنی', storageLocation: 'refrigerator', storageLocationFa: 'یخچال', expirationDate: '2026-12-10' },
  { id: 'inv-9', name: 'روغن سرخ‌کردنی کانولا', amount: 1500, unit: 'ml', category: 'روغن و چربی', storageLocation: 'pantry', storageLocationFa: 'کابینت و انبار', expirationDate: '2027-04-10' },
  { id: 'inv-10', name: 'کره پاستوریزه', amount: 200, unit: 'g', category: 'لبنیات', storageLocation: 'refrigerator', storageLocationFa: 'یخچال', expirationDate: '2026-10-22' }
];

export function getPantryItems(): InventoryItem[] {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(INITIAL_PANTRY_ITEMS));
      return INITIAL_PANTRY_ITEMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PANTRY_ITEMS;
  }
}

export function savePantryItems(items: InventoryItem[]): void {
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(items));
}

export function addPantryItem(item: Omit<InventoryItem, 'id'>): InventoryItem {
  const current = getPantryItems();
  const newItem: InventoryItem = {
    ...item,
    id: 'inv-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
  };
  const updated = [newItem, ...current];
  savePantryItems(updated);
  return newItem;
}

export function deletePantryItem(id: string): void {
  const current = getPantryItems();
  const updated = current.filter(i => i.id !== id);
  savePantryItems(updated);
}

export function updatePantryItem(updatedItem: InventoryItem): void {
  const current = getPantryItems();
  const updated = current.map(i => i.id === updatedItem.id ? updatedItem : i);
  savePantryItems(updated);
}

export function getExpiryStatus(expirationDate: string): { status: 'expired' | 'expiring_soon' | 'safe'; daysLeft: number; labelFa: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);

  const diffTime = exp.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { status: 'expired', daysLeft, labelFa: `منقضی شده (${Math.abs(daysLeft)} روز پیش)` };
  } else if (daysLeft <= 3) {
    return { status: 'expiring_soon', daysLeft, labelFa: `نزدیک انقضا (${daysLeft} روز مانده)` };
  } else {
    return { status: 'safe', daysLeft, labelFa: `${daysLeft} روز اعتبار` };
  }
}
