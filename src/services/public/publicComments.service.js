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

export async function createPublicComment({
  recipeId,
  authorName,
  email,
  content,
  rating,
}) {
  const payload = {
    recipe_id: recipeId,
    author_name: authorName.trim(),
    email:
      email?.trim() || null,
    content: content.trim(),
    rating:
      Number.isFinite(
        Number(rating)
      )
        ? Number(rating)
        : null,

    approved: false,
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(payload)

  if (error) {
    throw error;
  }

  return data;
}