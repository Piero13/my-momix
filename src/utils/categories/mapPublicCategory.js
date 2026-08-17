import {
  getRecipeImageUrl,
} from "@/services";

export function mapPublicCategory(
  category
) {
  return {
    id:
      category.id,

    name:
      category.name,

    slug:
      category.slug,

    description:
      category.description ?? "",

    recipeCount:
      category.recipeCount ?? 0,

    imageUrl:
      category.latestRecipeImagePath
        ? getRecipeImageUrl(
            category.latestRecipeImagePath
          )
        : null,
  };
}