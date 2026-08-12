import { supabase } from "@/lib";

export async function getAdminComments({
  page = 1,
  pageSize = 10,
  search = "",
  status = "all",
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("comments")
    .select(
      `
        id,
        recipe_id,
        author_name,
        email,
        content,
        rating,
        approved,
        created_at,
        updated_at,
        recipes (
          id,
          title,
          slug
        )
      `,
      {
        count: "exact",
      }
    );

  const normalizedSearch = search.trim();

  if (normalizedSearch) {
    query = query.or(
      `author_name.ilike.%${normalizedSearch}%,email.ilike.%${normalizedSearch}%,content.ilike.%${normalizedSearch}%`
    );
  }

  if (status === "pending") {
    query = query.eq("approved", false);
  }

  if (status === "approved") {
    query = query.eq("approved", true);
  }

  query = query
    .order("created_at", {
      ascending: false,
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

export async function approveComment(
  commentId
) {
  const { data, error } = await supabase
    .from("comments")
    .update({
      approved: true,
    })
    .eq("id", commentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function unapproveComment(
  commentId
) {
  const { data, error } = await supabase
    .from("comments")
    .update({
      approved: false,
    })
    .eq("id", commentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteComment(
  commentId
) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw error;
  }
}

