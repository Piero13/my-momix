import { supabase } from "@/lib";

export async function getPublishedRecipes({
  page = 1,
  pageSize = 10,

  search = "",
  categoryId = "",
  difficulty = "",
  maxTime = null,
  sort = "",
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("recipes")
    .select(
      `
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
        published_at,
        average_rating,
        ratings_count,
        categories (
          id,
          name,
          slug
        )
      `,
      {
        count: "exact",
      }
    )
    .eq("status", "published");

  const normalizedSearch = search.trim();

  if (normalizedSearch) {
    query = query.ilike(
      "title",
      `%${normalizedSearch}%`
    );
  }

  if (categoryId) {
    query = query.eq(
      "category_id",
      categoryId
    );
  }

  if (difficulty) {
    query = query.eq(
      "difficulty",
      difficulty
    );
  }

  if (
    Number.isFinite(maxTime) &&
    maxTime > 0
  ) {
    query = query.lte(
      "total_time",
      maxTime
    );
  }

  switch (sort) {
    case "oldest":
      query = query.order(
        "published_at",
        {
          ascending: true,
        }
      );
      break;

    case "title-asc":
      query = query.order(
        "title",
        {
          ascending: true,
        }
      );
      break;

    case "title-desc":
      query = query.order(
        "title",
        {
          ascending: false,
        }
      );
      break;

    case "rating":
      query = query.order(
        "average_rating",
        {
          ascending: false,
        }
      );
      break;

    case "newest":
    default:
      query = query.order(
        "published_at",
        {
          ascending: false,
        }
      );
  }

  query = query.range(
    from,
    to
  );

  const {
    data,
    count,
    error,
  } = await query;

  if (error) {
    throw error;
  }

  return {
    data: data ?? [],
    count: count ?? 0,
  };
}

export async function getPublishedRecipeBySlug(
  slug
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
      published_at,
      meta_title,
      meta_description,
      average_rating,
      ratings_count,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublishedRecipeIngredients(
  recipeId
) {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .select(`
      id,
      quantity,
      unit,
      position,
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

export async function getPublishedRecipeSteps(
  recipeId
) {
  const { data, error } = await supabase
    .from("recipe_steps")
    .select(`
      id,
      instruction,
      position,
      duration_seconds,
      temperature,
      speed,
      reverse
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

export async function getPublishedRecipeTips(
  recipeId
) {
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