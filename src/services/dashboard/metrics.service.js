/**
 * Dashboard metrics service.
 */

import { supabase } from "@/lib";

import { getPendingCommentsCount } from "./comments.service";

/**
 * Counts rows from a Supabase table.
 *
 * @param {string} table
 * @param {(query: object) => object} [applyFilters]
 * @returns {Promise<number>}
 */
async function getCount(table, applyFilters) {
  let query = supabase
    .from(table)
    .select("*", {
      count: "exact",
      head: true,
    });

  if (applyFilters) {
    query = applyFilters(query);
  }

  const { count, error } = await query;

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function getRecipesCount() {
  return getCount("recipes");
}

export async function getPublishedRecipesCount() {
  return getCount(
    "recipes",
    (query) => query.eq("status", "published")
  );
}

export async function getDraftRecipesCount() {
  return getCount(
    "recipes",
    (query) => query.eq("status", "draft")
  );
}

export async function getArchivedRecipesCount() {
  return getCount(
    "recipes",
    (query) => query.eq("status", "archived")
  );
}

export async function getCategoriesCount() {
  return getCount("categories");
}

export async function getApprovedCommentsCount() {
  const { count, error } = await supabase
    .from("comments")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("approved", true);

  if (error) {
    throw error;
  }

  return count ?? 0;
}

/**
 * Returns all main dashboard metrics.
 *
 * @returns {Promise<object>}
 */
export async function getDashboardMetrics() {
  const [
    recipes,
    publishedRecipes,
    draftRecipes,
    archivedRecipes,
    categories,
    pendingComments,
    approvedComments,
  ] = await Promise.all([
    getRecipesCount(),
    getPublishedRecipesCount(),
    getDraftRecipesCount(),
    getArchivedRecipesCount(),
    getCategoriesCount(),
    getPendingCommentsCount(),
    getApprovedCommentsCount(),
  ]);

  return {
    recipes,
    publishedRecipes,
    draftRecipes,
    archivedRecipes,
    categories,
    pendingComments,
    approvedComments,
  };
}