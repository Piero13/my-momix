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

/**
 * Returns a paginated list of recipes for administration.
 *
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.pageSize
 * @param {string} params.search
 * @param {string} params.categoryId
 * @param {string} params.status
 * @param {string} params.sortBy
 * @param {"asc"|"desc"} params.sortDirection
 * @returns {Promise<{ data: Array, count: number }>}
 */
export async function getAdminRecipes({
  page = 1,
  pageSize = 10,
  search = "",
  categoryId = "",
  status = "",
  sortBy = "updated_at",
  sortDirection = "desc",
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
        image_path,
        status,
        difficulty,
        updated_at,
        category_id,
        categories (
          id,
          name,
          slug
        )
      `,
      {
        count: "exact",
      }
    );

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

  if (status) {
    query = query.eq(
      "status",
      status
    );
  }

  query = query
    .order(sortBy, {
      ascending: sortDirection === "asc",
    })
    .range(from, to);

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