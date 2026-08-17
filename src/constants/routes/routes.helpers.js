import { ROUTES } from "./routes.constants";

/**
 * Returns the public URL for a recipe details page.
 *
 * @param {string} slug - Recipe slug.
 * @returns {string}
 */
export function getRecipeDetailsPath(slug) {
  return `/recette/${encodeURIComponent(slug)}`;
}

/**
 * Returns the public recipes URL filtered by category.
 *
 * @param {string} categorySlug - Category slug.
 * @returns {string}
 */
export function getRecipesByCategoryPath(categorySlug) {
  const searchParams = new URLSearchParams({
    category: categorySlug,
  });

  return `${ROUTES.BROWSE}?${searchParams.toString()}`;
}

export function getEditRecipePath(
  recipeId
) {
  return ROUTES.EDIT_RECIPE.replace(
    ":recipeId",
    recipeId
  );
}

export function getFavoriteRecipesPath() {
  return `${ROUTES.BROWSE}?favorites=1`;
}