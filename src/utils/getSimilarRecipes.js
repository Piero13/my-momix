/**
 * Returns recipes related to the current recipe.
 *
 * Same-category recipes are prioritized, then the result
 * is completed with other available recipes.
 *
 * @param {object} currentRecipe
 * @param {Array<object>} recipes
 * @param {number} limit
 * @returns {Array<object>}
 */
export function getSimilarRecipes(
  currentRecipe,
  recipes = [],
  limit = 3
) {
  if (!currentRecipe || limit <= 0) {
    return [];
  }

  const currentCategory =
    typeof currentRecipe.category === "object"
      ? currentRecipe.category?.slug
      : currentRecipe.category;

  const availableRecipes = recipes.filter(
    (recipe) => recipe.id !== currentRecipe.id
  );

  const sameCategoryRecipes = availableRecipes.filter(
    (recipe) => {
      const recipeCategory =
        typeof recipe.category === "object"
          ? recipe.category?.slug
          : recipe.category;

      return (
        currentCategory &&
        recipeCategory === currentCategory
      );
    }
  );

  const otherRecipes = availableRecipes.filter(
    (recipe) => !sameCategoryRecipes.includes(recipe)
  );

  return [
    ...sameCategoryRecipes,
    ...otherRecipes,
  ].slice(0, limit);
}