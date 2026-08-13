/**
 * Dashboard recent activity service.
 */

import { supabase } from "@/lib";

const DEFAULT_ACTIVITY_LIMIT = 5;

export async function getRecentRecipes(
  limit = DEFAULT_ACTIVITY_LIMIT
) {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      id,
      title,
      slug,
      status,
      updated_at,
      categories (
        id,
        name,
        slug
      )
    `)
    .order("updated_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getRecentComments(
  limit = DEFAULT_ACTIVITY_LIMIT
) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      author_name,
      content,
      approved,
      created_at,
      recipes (
        id,
        title,
        slug
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

function mapRecipeActivity(recipe) {
  return {
    id: `recipe-${recipe.id}`,
    type: "recipe",
    entityId: recipe.id,
    title: recipe.title,
    description:
      recipe.status === "published"
        ? "Recette publiée ou modifiée"
        : "Recette modifiée",
    status: recipe.status,
    date: recipe.updated_at,
    category: recipe.categories ?? null,
  };
}

function mapCommentActivity(comment) {
  return {
    id: `comment-${comment.id}`,
    type: "comment",
    entityId: comment.id,
    title: comment.author_name,
    description: comment.recipes?.title
      ? `Nouveau commentaire sur « ${comment.recipes.title} »`
      : "Nouveau commentaire",
    status: comment.approved,
    date: comment.created_at,
    recipe: comment.recipes ?? null,
  };
}

/**
 * Returns a unified list of the latest dashboard activities.
 *
 * @param {number} limit
 * @returns {Promise<Array<object>>}
 */
export async function getRecentActivity(
  limit = DEFAULT_ACTIVITY_LIMIT
) {
  const [recipes, comments] = await Promise.all([
    getRecentRecipes(limit),
    getRecentComments(limit),
  ]);

  return [
    ...recipes.map(mapRecipeActivity),
    ...comments.map(mapCommentActivity),
  ]
    .sort(
      (firstItem, secondItem) =>
        new Date(secondItem.date) -
        new Date(firstItem.date)
    )
    .slice(0, limit);
}