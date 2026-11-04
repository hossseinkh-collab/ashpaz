const FAVORITES_STORAGE_KEY = 'iranian_chef_favorites_v1';

export function getFavoriteRecipeIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function isRecipeFavorite(recipeId: string): boolean {
  const list = getFavoriteRecipeIds();
  return list.includes(recipeId);
}

export function toggleFavoriteRecipe(recipeId: string): { isFav: boolean; favorites: string[] } {
  const list = getFavoriteRecipeIds();
  let updated: string[];
  let isFav = false;

  if (list.includes(recipeId)) {
    updated = list.filter(id => id !== recipeId);
    isFav = false;
  } else {
    updated = [...list, recipeId];
    isFav = true;
  }

  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  return { isFav, favorites: updated };
}
