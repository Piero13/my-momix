import { supabase } from "@/lib";
import { normalizeIngredientName } from "@/utils";

const DEFAULT_SEARCH_LIMIT = 8;

export async function createIngredient(name) {
  const normalizedName =
    normalizeIngredientName(name);

  if (!normalizedName) {
    throw new Error(
      "Ingredient name is required."
    );
  }

  const { data, error } = await supabase
    .from("ingredients")
    .insert({
      name: normalizedName,
    })
    .select(`
      id,
      name
    `)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

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

export async function findIngredientByName(
  name
) {
  const normalizedName =
    normalizeIngredientName(name);

  if (!normalizedName) {
    return null;
  }

  const { data, error } = await supabase
    .from("ingredients")
    .select(`
      id,
      name
    `)
    .ilike("name", normalizedName)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Returns a paginated ingredient list for administration.
 */
export async function getAdminIngredients({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "name",
  sortDirection = "asc",
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("ingredients")
    .select(
      `
        id,
        name,
        created_at,
        updated_at
      `,
      {
        count: "exact",
      }
    );

  const normalizedSearch = search.trim();

  if (normalizedSearch) {
    query = query.ilike(
      "name",
      `%${normalizedSearch}%`
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

export async function updateIngredient(
  ingredientId,
  values
) {
  const normalizedName =
    normalizeIngredientName(
      values.name
    );

  if (!normalizedName) {
    throw new Error(
      "Ingredient name is required."
    );
  }

  const { data, error } = await supabase
    .from("ingredients")
    .update({
      name: normalizedName,
    })
    .eq("id", ingredientId)
    .select(`
      id,
      name,
      created_at,
      updated_at
    `)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteIngredient(
  ingredientId
) {
  const { error } = await supabase
    .from("ingredients")
    .delete()
    .eq("id", ingredientId);

  if (error) {
    throw error;
  }
}