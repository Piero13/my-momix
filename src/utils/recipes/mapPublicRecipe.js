import {
  RECIPE_DIFFICULTY_OPTIONS,
} from "@/constants";

import {
  getRecipeImageUrl,
} from "@/services";

function getDifficultyLabel(
  difficulty
) {
  return (
    RECIPE_DIFFICULTY_OPTIONS.find(
      (option) =>
        option.value === difficulty
    )?.label ?? difficulty
  );
}

export function mapPublicRecipe(
  recipe
) {
  return {
    id:
      recipe.id,

    title:
      recipe.title,

    slug:
      recipe.slug,

    description:
      recipe.description ?? "",

    imageUrl:
      recipe.image_path
        ? getRecipeImageUrl(
            recipe.image_path
          )
        : null,

    category:
      recipe.categories?.name ?? "",

    categoryId:
      recipe.categories?.id ?? "",

    categorySlug:
      recipe.categories?.slug ?? "",

    difficulty:
      getDifficultyLabel(
        recipe.difficulty
      ),

    servings:
      recipe.servings,

    preparationTime:
      recipe.preparation_time,

    cookingTime:
      recipe.cooking_time,

    totalTime:
      recipe.total_time,

    averageRating:
      Number(
        recipe.average_rating ?? 0
      ),

    ratingsCount:
      Number(
        recipe.ratings_count ?? 0
      ),

    publishedAt:
      recipe.published_at,
  };
}