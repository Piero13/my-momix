import { supabase } from "@/lib";

/**
 * Returns all tips associated with a recipe,
 * ordered by their display position.
 */
export async function getRecipeTips(recipeId) {
  const { data, error } = await supabase
    .from("recipe_tips")
    .select(`
      id,
      type,
      content,
      position
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

/**
 * Replaces all tips associated with a recipe.
 *
 * The current list is removed before inserting
 * the new ordered list.
 */
export async function replaceRecipeTips(
  recipeId,
  tips
) {
  const { error: deleteError } = await supabase
    .from("recipe_tips")
    .delete()
    .eq("recipe_id", recipeId);

  if (deleteError) {
    throw deleteError;
  }

  if (!tips.length) {
    return [];
  }

  const payload = tips.map(
    (tip, index) => ({
      recipe_id: recipeId,
      type: tip.type || "tip",
      content: tip.content.trim(),
      position: index,
    })
  );

  const { data, error } = await supabase
    .from("recipe_tips")
    .insert(payload)
    .select(`
      id,
      type,
      content,
      position
    `)
    .order("position", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}