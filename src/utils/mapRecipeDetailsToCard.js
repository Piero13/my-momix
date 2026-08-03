/**
 * Maps a detailed recipe to the structure expected by RecipeCard.
 *
 * @param {object} recipe
 * @returns {object}
 */
export function mapRecipeDetailsToCard(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    slug: recipe.slug,
    imageUrl: recipe.imageUrl,
    category:
      typeof recipe.category === "object"
        ? recipe.category?.name
        : recipe.category,
    totalTime: recipe.totalTime,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
  };
}