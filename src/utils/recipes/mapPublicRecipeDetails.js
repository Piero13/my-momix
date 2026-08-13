import {
  RECIPE_DIFFICULTY_OPTIONS,
  RECIPE_TIP_TYPES,
} from "@/constants";

import {
  getRecipeImageUrl,
} from "@/services";

import {
  formatDurationSeconds,
} from "@/utils";

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

export function mapPublicRecipeDetails({
  recipe,
  ingredients = [],
  steps = [],
  tips = [],
}) {
  if (!recipe) {
    return null;
  }

  return {
    id: recipe.id,

    title: recipe.title,
    slug: recipe.slug,
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

    metaTitle:
      recipe.meta_title ?? "",

    metaDescription:
      recipe.meta_description ?? "",

    ingredients:
      ingredients.map(
        (item) => ({
          id: item.id,

          name:
            item.ingredients?.name ??
            "",

          quantity:
            item.quantity,

          unit:
            item.unit ?? "",
        })
      ),

    steps:
        steps.map((step) => {
            return {
            id: step.id,

            order:
                (step.position ?? 0) + 1,

            description:
                step.instruction ?? "",

            duration:
                formatDurationSeconds(
                    step.duration_seconds
                ),

            temperature:
                step.temperature ?? null,

            speed:
                step.speed ?? null,

            reverse:
                Boolean(step.reverse),
            };
        }),

    tips:
        tips.map((tip) => ({
            id: tip.id,

            type:
            tip.type ??
            RECIPE_TIP_TYPES.TIP,

            text:
            tip.content ?? "",
        })),

            nutrition: {}
        };
}