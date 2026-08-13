import { supabase } from "@/lib";

export async function getLatestPublishedRecipes(
  limit = 3
) {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      id,
      title,
      slug,
      description,
      image_path,
      difficulty,
      servings,
      preparation_time,
      cooking_time,
      total_time,
      average_rating,
      ratings_count,
      published_at,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPopularCategories(
  limit = 4
) {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      category_id,
      categories (
        id,
        name,
        slug,
        description,
        display_order
      )
    `)
    .eq("status", "published")
    .not("category_id", "is", null);

  if (error) {
    throw error;
  }

  const counts = new Map();

  for (const item of data ?? []) {
    const category =
      item.categories;

    if (!category) {
      continue;
    }

    const current =
      counts.get(category.id);

    counts.set(
      category.id,
      {
        ...category,
        recipeCount:
          (current?.recipeCount ?? 0) + 1,
      }
    );
  }

  return [...counts.values()]
    .sort(
      (first, second) =>
        second.recipeCount -
        first.recipeCount
    )
    .slice(0, limit);
}