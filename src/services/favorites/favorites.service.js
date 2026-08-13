/**
 * Local persistence service for favorite recipes.
 */

const FAVORITES_STORAGE_KEY =
  "mymomix:favorites";

/**
 * Returns all favorite recipe IDs.
 *
 * @returns {string[]}
 */
export function getFavoriteRecipeIds() {
  try {
    const storedValue =
      localStorage.getItem(
        FAVORITES_STORAGE_KEY
      );

    if (!storedValue) {
      return [];
    }

    const parsedValue =
      JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (recipeId) =>
        typeof recipeId === "string"
    );
  } catch (error) {
    console.error(
      "Unable to read favorite recipes:",
      error
    );

    return [];
  }
}

/**
 * Persists favorite recipe IDs.
 *
 * @param {string[]} recipeIds
 * @returns {string[]}
 */
export function saveFavoriteRecipeIds(
  recipeIds
) {
  const normalizedRecipeIds = [
    ...new Set(recipeIds),
  ];

  try {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(
        normalizedRecipeIds
      )
    );
  } catch (error) {
    console.error(
      "Unable to save favorite recipes:",
      error
    );

    throw error;
  }

  return normalizedRecipeIds;
}

/**
 * Checks whether a recipe is a favorite.
 *
 * @param {string} recipeId
 * @returns {boolean}
 */
export function isFavoriteRecipe(
  recipeId
) {
  if (!recipeId) {
    return false;
  }

  return getFavoriteRecipeIds()
    .includes(recipeId);
}

/**
 * Adds a recipe to favorites.
 *
 * @param {string} recipeId
 * @returns {string[]}
 */
export function addFavoriteRecipe(
  recipeId
) {
  if (!recipeId) {
    return getFavoriteRecipeIds();
  }

  const favoriteIds =
    getFavoriteRecipeIds();

  if (
    favoriteIds.includes(recipeId)
  ) {
    return favoriteIds;
  }

  return saveFavoriteRecipeIds([
    ...favoriteIds,
    recipeId,
  ]);
}

/**
 * Removes a recipe from favorites.
 *
 * @param {string} recipeId
 * @returns {string[]}
 */
export function removeFavoriteRecipe(
  recipeId
) {
  if (!recipeId) {
    return getFavoriteRecipeIds();
  }

  const favoriteIds =
    getFavoriteRecipeIds();

  return saveFavoriteRecipeIds(
    favoriteIds.filter(
      (favoriteId) =>
        favoriteId !== recipeId
    )
  );
}

/**
 * Toggles a recipe favorite state.
 *
 * @param {string} recipeId
 * @returns {{ favoriteIds: string[], isFavorite: boolean }}
 */
export function toggleFavoriteRecipe(
  recipeId
) {
  const favoriteIds =
    getFavoriteRecipeIds();

  const isFavorite =
    favoriteIds.includes(recipeId);

  if (isFavorite) {
    return {
      favoriteIds:
        removeFavoriteRecipe(
          recipeId
        ),

      isFavorite: false,
    };
  }

  return {
    favoriteIds:
      addFavoriteRecipe(
        recipeId
      ),

    isFavorite: true,
  };
}