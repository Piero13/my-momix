import { supabase } from "@/lib";

import { generateSlug } from "@/utils";

export async function getCategoryOptions() {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name
    `)
    .order("display_order", {
      ascending: true,
    })
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }));
}

export async function getAdminCategories({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "display_order",
  sortDirection = "asc",
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("categories")
    .select(
      `
        id,
        name,
        slug,
        description,
        display_order,
        created_at,
        updated_at
      `,
      {
        count: "exact",
      }
    );

  const normalizedSearch = search.trim();

  if (normalizedSearch) {
    query = query.or(
      `name.ilike.%${normalizedSearch}%,slug.ilike.%${normalizedSearch}%,description.ilike.%${normalizedSearch}%`
    );
  }

  query = query
    .order(sortBy, {
      ascending: sortDirection === "asc",
    })
    .order("name", {
      ascending: true,
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

export async function findCategoryBySlug(
  slug
) {
  const normalizedSlug =
    generateSlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug
    `)
    .eq("slug", normalizedSlug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createCategory(values) {
  const displayOrder =
    await getNextCategoryDisplayOrder();

  const payload = {
    name: values.name.trim(),
    slug: generateSlug(values.slug),
    description:
      values.description?.trim() || null,
    display_order: displayOrder,
  };

  const { data, error } = await supabase
    .from("categories")
    .insert(payload)
    .select(`
      id,
      name,
      slug,
      description,
      display_order,
      created_at,
      updated_at
    `)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCategory(
  categoryId,
  values
) {
  const payload = {
    name: values.name.trim(),
    slug: generateSlug(values.slug),
    description:
      values.description?.trim() || null,
  };

  const { data, error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", categoryId)
    .select(`
      id,
      name,
      slug,
      description,
      created_at,
      updated_at
    `)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getNextCategoryDisplayOrder() {
  const { data, error } = await supabase
    .from("categories")
    .select("display_order")
    .order("display_order", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (
    Number(data?.display_order ?? 0) + 1
  );
}

export async function moveCategory(
  categoryId,
  direction
) {
  if (
    !categoryId ||
    !["up", "down"].includes(direction)
  ) {
    throw new Error(
      "Invalid category move request."
    );
  }

  const {
    data: currentCategory,
    error: currentError,
  } = await supabase
    .from("categories")
    .select(`
      id,
      display_order
    `)
    .eq("id", categoryId)
    .single();

  if (currentError) {
    throw currentError;
  }

  const neighborQuery = supabase
    .from("categories")
    .select(`
      id,
      display_order
    `);

  const {
    data: neighbor,
    error: neighborError,
  } =
    direction === "up"
      ? await neighborQuery
          .lt(
            "display_order",
            currentCategory.display_order
          )
          .order("display_order", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle()
      : await neighborQuery
          .gt(
            "display_order",
            currentCategory.display_order
          )
          .order("display_order", {
            ascending: true,
          })
          .limit(1)
          .maybeSingle();

  if (neighborError) {
    throw neighborError;
  }

  if (!neighbor) {
    return false;
  }

  const temporaryOrder =
    Math.max(
      currentCategory.display_order,
      neighbor.display_order
    ) + 1000;

  const { error: temporaryError } =
    await supabase
      .from("categories")
      .update({
        display_order: temporaryOrder,
      })
      .eq(
        "id",
        currentCategory.id
      );

  if (temporaryError) {
    throw temporaryError;
  }

  const {
    error: neighborUpdateError,
  } = await supabase
    .from("categories")
    .update({
      display_order:
        currentCategory.display_order,
    })
    .eq(
      "id",
      neighbor.id
    );

  if (neighborUpdateError) {
    throw neighborUpdateError;
  }

  const {
    error: currentUpdateError,
  } = await supabase
    .from("categories")
    .update({
      display_order:
        neighbor.display_order,
    })
    .eq(
      "id",
      currentCategory.id
    );

  if (currentUpdateError) {
    throw currentUpdateError;
  }

  return true;
}

export async function deleteCategory(
  categoryId
) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw error;
  }
}