import { 
  RECIPE_FORM_DEFAULT_VALUES,
} from "@/constants";

import { splitDurationSeconds } from "./time";

export function mapRecipeToFormValues(
  recipe,
  recipeIngredients = [],
  recipeSteps = [],
  recipeTips= []
) {
  if (!recipe) {
    return RECIPE_FORM_DEFAULT_VALUES;
  }

  return {
    ...RECIPE_FORM_DEFAULT_VALUES,

    title: recipe.title ?? "",
    slug: recipe.slug ?? "",
    description: recipe.description ?? "",

    categoryId: recipe.category_id ?? "",
    difficulty:
      recipe.difficulty ?? "easy",

    preparationTime:
      recipe.preparation_time ?? "",
    cookingTime:
      recipe.cooking_time ?? "",

    servings:
      recipe.servings ?? 4,

    imagePath:
      recipe.image_path ?? "",

    status:
      recipe.status ?? "draft",

    metaTitle:
      recipe.meta_title ?? "",
    metaDescription:
      recipe.meta_description ?? "",

    ingredients:
      recipeIngredients.map((item) => ({
        ingredientId:
          item.ingredient_id ?? "",
        name:
          item.ingredients?.name ?? "",
        quantity:
          item.quantity ?? "",
        unit:
          item.unit ?? "",
      })),

    steps: recipeSteps.map((step) => {
      const duration =
        splitDurationSeconds(
          step.duration_seconds
        );

      const hasThermomixSettings =
        step.duration_seconds !== null ||
        Boolean(step.temperature) ||
        Boolean(step.speed) ||
        Boolean(step.reverse);

      return {
        instruction:
          step.instruction ?? "",

        hasThermomixSettings,

        durationHours:
          duration.hours,

        durationMinutes:
          duration.minutes,

        durationSeconds:
          duration.seconds,

        temperature:
          step.temperature ?? "",

        speed:
          step.speed ?? "",

        reverse:
          Boolean(step.reverse),
      };
    }),
    
    tips: recipeTips.map((tip) => ({
      type: tip.type ?? "tip",
      content: tip.content ?? "",
    })),
  };
}