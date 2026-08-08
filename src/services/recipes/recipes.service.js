import { supabase } from "@/lib";

const RECIPE_SELECT = `
  id,
  title,
  slug,
  description,
  image_path,
  status,
  difficulty,
  preparation_time,
  cooking_time,
  total_time,
  servings,
  average_rating,
  ratings_count,
  meta_title,
  meta_description,
  published_at,
  created_by,
  created_at,
  updated_at,
  category_id,
  categories (
    id,
    name,
    slug
  )
`;

export async function getRecipeById(recipeId) {
  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_SELECT)
    .eq("id", recipeId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createRecipe(payload) {
  const { data, error } = await supabase
    .from("recipes")
    .insert(payload)
    .select(RECIPE_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateRecipe(
  recipeId,
  payload
) {
  const { data, error } = await supabase
    .from("recipes")
    .update(payload)
    .eq("id", recipeId)
    .select(RECIPE_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteRecipe(recipeId) {
  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);

  if (error) {
    throw error;
  }
}