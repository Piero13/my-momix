import { supabase } from "@/lib";

const DEFAULT_SEARCH_LIMIT = 8;

export async function searchIngredients(
  search,
  limit = DEFAULT_SEARCH_LIMIT
) {
  const normalizedSearch = search.trim();

  if (normalizedSearch.length < 2) {
    return [];
  }

  const { data, error } = await supabase
    .from("ingredients")
    .select(`
      id,
      name
    `)
    .ilike(
      "name",
      `%${normalizedSearch}%`
    )
    .order("name", {
      ascending: true,
    })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getIngredientById(
  ingredientId
) {
  const { data, error } = await supabase
    .from("ingredients")
    .select(`
      id,
      name
    `)
    .eq("id", ingredientId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}