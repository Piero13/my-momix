import { RECIPE_FORM_DEFAULT_VALUES } from "@/constants";

export function mapRecipeToFormValues(
  recipe,
  recipeIngredients = []
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
  };
}