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
      id,
      category_id,
      image_path,
      published_at,
      categories (
        id,
        name,
        slug,
        description,
        display_order
      )
    `)
    .eq("status", "published")
    .not("category_id", "is", null)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  const categoriesMap = new Map();

  for (const item of data ?? []) {
    const category =
      item.categories;

    if (!category) {
      continue;
    }

    const current =
      categoriesMap.get(
        category.id
      );

    if (!current) {
      categoriesMap.set(
        category.id,
        {
          ...category,

          recipeCount: 1,

          latestRecipeImagePath:
            item.image_path ?? null,

          latestRecipePublishedAt:
            item.published_at ?? null,
        }
      );

      continue;
    }

    current.recipeCount += 1;
  }

  return [
    ...categoriesMap.values(),
  ]
    .sort(
      (first, second) =>
        second.recipeCount -
        first.recipeCount
    )
    .slice(0, limit);
}