import { supabase } from "@/lib";

export async function getRecipeIngredients(
  recipeId
) {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .select(`
      id,
      quantity,
      unit,
      position,
      ingredient_id,
      ingredients (
        id,
        name
      )
    `)
    .eq("recipe_id", recipeId)
    .order("position", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function replaceRecipeIngredients(
  recipeId,
  ingredients
) {
  const { error: deleteError } = await supabase
    .from("recipe_ingredients")
    .delete()
    .eq("recipe_id", recipeId);

  if (deleteError) {
    throw deleteError;
  }

  if (!ingredients.length) {
    return [];
  }

  const payload = ingredients.map(
    (ingredient, index) => ({
      recipe_id: recipeId,
      ingredient_id:
        ingredient.ingredientId,
      quantity:
        ingredient.quantity === "" ||
        ingredient.quantity === null ||
        ingredient.quantity === undefined
          ? null
          : Number(ingredient.quantity),
      unit: ingredient.unit || null,
      position: index,
    })
  );

  const { data, error } = await supabase
    .from("recipe_ingredients")
    .insert(payload)
    .select(`
      id,
      quantity,
      unit,
      position,
      ingredient_id,
      ingredients (
        id,
        name
      )
    `)
    .order("position", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}