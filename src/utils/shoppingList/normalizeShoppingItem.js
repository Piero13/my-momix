import { getShoppingItemKey } from "./getShoppingItemKey";

export function normalizeShoppingItem({
  ingredientId,
  name,
  quantity,
  unit,
  recipeId,
  recipeTitle,
}) {
  const normalizedUnit =
    unit?.trim() ?? "";

  return {
    id: getShoppingItemKey({
      ingredientId,
      unit: normalizedUnit,
    }),

    ingredientId,

    name:
      name?.trim() ?? "",

    quantity:
      Number(quantity) || 0,

    unit:
      normalizedUnit,

    checked:
      false,

    sourceRecipeIds:
      recipeId
        ? [recipeId]
        : [],

    sourceRecipes:
      recipeId
        ? [
            {
              id: recipeId,
              title:
                recipeTitle ?? "",
            },
          ]
        : [],
  };
}