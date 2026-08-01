/**
 * Retrieves a recipe from a local collection using its URL slug.
 *
 * This hook will later delegate data loading to the Supabase service.
 */

import { useMemo } from "react";
import { useParams } from "react-router-dom";

/**
 * @param {Array<object>} recipes
 * @returns {{
 *   slug: string,
 *   recipe: object | null,
 *   isNotFound: boolean
 * }}
 */
export function useRecipeDetails(recipes = []) {
  const { slug = "" } = useParams();

  const recipe = useMemo(
    () => recipes.find((item) => item.slug === slug) ?? null,
    [recipes, slug]
  );

  return {
    slug,
    recipe,
    isNotFound: !recipe,
  };
}