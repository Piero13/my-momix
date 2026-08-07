/**
 * Comment moderation service.
 */

import { supabase } from "@/lib";

/**
 * Returns the number of comments waiting for moderation.
 *
 * @returns {Promise<number>}
 */
export async function getPendingCommentsCount() {
  const { count, error } = await supabase
    .from("comments")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "pending");

  if (error) {
    throw error;
  }

  return count ?? 0;
}