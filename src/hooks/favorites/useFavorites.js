import {
  useCallback,
  useState,
} from "react";

import {
  getFavoriteRecipeIds,
  toggleFavoriteRecipe,
} from "@/services";

/**
 * Manages favorite recipes persisted
 * in localStorage.
 */
export function useFavorites() {
  const [
    favoriteIds,
    setFavoriteIds,
  ] = useState(
    () => getFavoriteRecipeIds()
  );

  /**
   * Checks whether a recipe
   * is currently a favorite.
   */
  const isFavorite = useCallback(
    (recipeId) => {
      if (!recipeId) {
        return false;
      }

      return favoriteIds.includes(
        recipeId
      );
    },
    [favoriteIds]
  );

  /**
   * Toggles the favorite state
   * of a recipe.
   */
  const toggleFavorite =
    useCallback(
      (recipeId) => {
        if (!recipeId) {
          return false;
        }

        const result =
          toggleFavoriteRecipe(
            recipeId
          );

        setFavoriteIds(
          result.favoriteIds
        );

        return result.isFavorite;
      },
      []
    );

  return {
    favoriteIds,
    favoriteCount:
      favoriteIds.length,

    isFavorite,
    toggleFavorite,
  };
}