import { supabase } from "@/lib";

export async function getPublishedRecipeComments(
  recipeId
) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      author_name,
      content,
      rating,
      created_at
    `)
    .eq("recipe_id", recipeId)
    .eq("approved", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}