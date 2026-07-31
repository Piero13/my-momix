/**
 * Manages public recipe browsing:
 * URL parameters, filtering, sorting and pagination.
 */

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  DEFAULT_RECIPE_SORT,
  PAGINATION,
  RECIPE_SORT_VALUES,
} from "@/constants";
import { normalizeText, sortRecipes } from "@/utils";

function getPositiveInteger(value, fallback) {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
}

/**
 * @param {Array<object>} recipes
 * @returns {object}
 */
export function useRecipeBrowser(recipes = []) {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ==========================================================================
     URL parameters
     ========================================================================== */

  const searchQuery = searchParams.get("search")?.trim() ?? "";
  const categorySlug = searchParams.get("category")?.trim() ?? "";
  const difficultySlug =
    searchParams.get("difficulty")?.trim() ?? "";

  const requestedMaxTime = Number(searchParams.get("maxTime"));

  const maxTime =
    Number.isFinite(requestedMaxTime) && requestedMaxTime > 0
      ? requestedMaxTime
      : null;

  const requestedSort = searchParams.get("sort");

  const currentSort = RECIPE_SORT_VALUES.includes(requestedSort)
    ? requestedSort
    : DEFAULT_RECIPE_SORT;

  const requestedPage = getPositiveInteger(
    searchParams.get("page"),
    PAGINATION.DEFAULT_PAGE
  );

  const requestedPageSize = Number(searchParams.get("pageSize"));

  const pageSize = PAGINATION.PAGE_SIZE_OPTIONS.includes(
    requestedPageSize
  )
    ? requestedPageSize
    : PAGINATION.DEFAULT_PAGE_SIZE;

  /* ==========================================================================
     Active filter states
     ========================================================================== */

  const hasActiveSearch = Boolean(searchQuery);
  const hasActiveCategory = Boolean(categorySlug);
  const hasActiveDifficulty = Boolean(difficultySlug);
  const hasActiveMaxTime = Boolean(maxTime);

  const hasActiveFilters =
    hasActiveSearch ||
    hasActiveCategory ||
    hasActiveDifficulty ||
    hasActiveMaxTime;

  /* ==========================================================================
     Filtering
     ========================================================================== */

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);
    const normalizedCategory = normalizeText(categorySlug);
    const normalizedDifficulty = normalizeText(difficultySlug);

    return recipes.filter((recipe) => {
      const searchableContent = normalizeText(
        [
          recipe.title,
          recipe.category,
          recipe.difficulty,
        ]
          .filter(Boolean)
          .join(" ")
      );

      const matchesSearch =
        !normalizedSearch ||
        searchableContent.includes(normalizedSearch);

      const matchesCategory =
        !normalizedCategory ||
        normalizeText(recipe.category) === normalizedCategory;

      const matchesDifficulty =
        !normalizedDifficulty ||
        normalizeText(recipe.difficulty) ===
          normalizedDifficulty;

      const matchesMaxTime =
        !maxTime || Number(recipe.totalTime) <= maxTime;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesMaxTime
      );
    });
  }, [
    recipes,
    searchQuery,
    categorySlug,
    difficultySlug,
    maxTime,
  ]);

  /* ==========================================================================
     Sorting
     ========================================================================== */

  const sortedRecipes = useMemo(
    () => sortRecipes(filteredRecipes, currentSort),
    [filteredRecipes, currentSort]
  );

  /* ==========================================================================
     Pagination
     ========================================================================== */

  const totalRecipes = sortedRecipes.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalRecipes / pageSize)
  );

  const currentPage = Math.min(requestedPage, totalPages);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedRecipes = sortedRecipes.slice(
    startIndex,
    startIndex + pageSize
  );

  /* ==========================================================================
     Pagination handlers
     ========================================================================== */

  const handlePageChange = (nextPage) => {
    const normalizedPage = Math.min(
      Math.max(nextPage, PAGINATION.DEFAULT_PAGE),
      totalPages
    );

    const nextSearchParams = new URLSearchParams(searchParams);

    if (normalizedPage === PAGINATION.DEFAULT_PAGE) {
      nextSearchParams.delete("page");
    } else {
      nextSearchParams.set("page", String(normalizedPage));
    }

    setSearchParams(nextSearchParams);
  };

  const handlePageSizeChange = (nextPageSize) => {
    if (!PAGINATION.PAGE_SIZE_OPTIONS.includes(nextPageSize)) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextPageSize === PAGINATION.DEFAULT_PAGE_SIZE) {
      nextSearchParams.delete("pageSize");
    } else {
      nextSearchParams.set("pageSize", String(nextPageSize));
    }

    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  return {
    // URL values
    searchQuery,
    categorySlug,
    difficultySlug,
    maxTime,
    currentSort,

    // Active states
    hasActiveSearch,
    hasActiveCategory,
    hasActiveDifficulty,
    hasActiveMaxTime,
    hasActiveFilters,

    // Recipes
    recipes: paginatedRecipes,
    totalRecipes,

    // Pagination
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  };
}