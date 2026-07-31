/**
 * Returns the public URL for a recipe details page.
 *
 * @param {string} slug - Recipe slug.
 * @returns {string}
 */
export function getRecipeDetailsPath(slug) {
  return `/recette/${encodeURIComponent(slug)}`;
}