import { Recipe, ShoppingListItem } from '../types';
import { getOkalaPriceDetails } from './okalaPricingService';

const SHOPPING_LIST_STORAGE_KEY = 'iranian_chef_shopping_list_v1';

export function getStoredShoppingList(): ShoppingListItem[] {
  try {
    const raw = localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Ensure each item has verified Okala pricing metadata
        return parsed.map(item => {
          const okala = getOkalaPriceDetails(item.name, item.amount ?? item.toBuyAmount ?? 0, item.unit);
          return {
            ...item,
            estimatedCostToman: okala.hasPrice ? (okala.priceToman ?? undefined) : undefined,
            okalaPriceToman: okala.priceToman,
            isRealOkalaPrice: okala.hasPrice,
            okalaBenchmarkLabel: okala.baseBenchmarkText,
            okalaSearchUrl: okala.okalaSearchUrl
          };
        });
      }
    }
  } catch {}
  return [];
}

export function saveStoredShoppingList(items: ShoppingListItem[]): void {
  try {
    localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function addRecipeIngredientsToShoppingList(recipe: Recipe, servings: number): { addedCount: number; list: ShoppingListItem[] } {
  const currentList = getStoredShoppingList();
  const scale = servings / recipe.baseServings;
  let addedCount = 0;

  const updatedList = [...currentList];

  recipe.ingredients.forEach(ing => {
    const scaledAmount = Number((ing.amount * scale).toFixed(1));
    // Check if ingredient with same name and unit already exists
    const existingIdx = updatedList.findIndex(
      item => item.name.trim().toLowerCase() === ing.name.trim().toLowerCase() && item.unit === ing.unit
    );

    if (existingIdx >= 0) {
      const cur = updatedList[existingIdx];
      const curAmount = cur.amount || cur.toBuyAmount || 0;
      const newAmount = Number((curAmount + scaledAmount).toFixed(1));
      cur.amount = newAmount;
      cur.toBuyAmount = newAmount;
      cur.neededAmount = (cur.neededAmount || 0) + scaledAmount;
      if (cur.neededForRecipes && !cur.neededForRecipes.includes(recipe.title)) {
        cur.neededForRecipes.push(recipe.title);
      }

      // Re-evaluate authentic Okala price for the accumulated amount
      const okala = getOkalaPriceDetails(cur.name, newAmount, cur.unit);
      cur.estimatedCostToman = okala.hasPrice ? (okala.priceToman ?? undefined) : undefined;
      cur.okalaPriceToman = okala.priceToman;
      cur.isRealOkalaPrice = okala.hasPrice;
      cur.okalaBenchmarkLabel = okala.baseBenchmarkText;
      cur.okalaSearchUrl = okala.okalaSearchUrl;

      addedCount++;
    } else {
      const okala = getOkalaPriceDetails(ing.name, scaledAmount, ing.unit);

      updatedList.push({
        id: 'shop-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        name: ing.name,
        amount: scaledAmount,
        neededAmount: scaledAmount,
        inStockAmount: 0,
        toBuyAmount: scaledAmount,
        unit: ing.unit,
        category: ing.category || 'general',
        neededForRecipes: [recipe.title],
        purchased: false,
        estimatedCostToman: okala.hasPrice ? (okala.priceToman ?? undefined) : undefined,
        okalaPriceToman: okala.priceToman,
        isRealOkalaPrice: okala.hasPrice,
        okalaBenchmarkLabel: okala.baseBenchmarkText,
        okalaSearchUrl: okala.okalaSearchUrl
      });
      addedCount++;
    }
  });

  saveStoredShoppingList(updatedList);
  return { addedCount, list: updatedList };
}

export function toggleItemPurchasedStatus(itemId: string): ShoppingListItem[] {
  const currentList = getStoredShoppingList();
  const updated = currentList.map(item => 
    item.id === itemId ? { ...item, purchased: !item.purchased } : item
  );
  saveStoredShoppingList(updated);
  return updated;
}

export function removeShoppingListItem(itemId: string): ShoppingListItem[] {
  const currentList = getStoredShoppingList();
  const updated = currentList.filter(item => item.id !== itemId);
  saveStoredShoppingList(updated);
  return updated;
}

export function clearPurchasedShoppingListItems(): ShoppingListItem[] {
  const currentList = getStoredShoppingList();
  const updated = currentList.filter(item => !item.purchased);
  saveStoredShoppingList(updated);
  return updated;
}

export function clearAllShoppingList(): ShoppingListItem[] {
  saveStoredShoppingList([]);
  return [];
}
