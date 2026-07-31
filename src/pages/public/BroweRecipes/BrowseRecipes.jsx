/**
 * Public recipe browsing page.
 */

import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import { 
  RecipeFilters,
  RecipeGrid
} from "@/components/recipe";

import {
  PageContainer,
  Section,
  SectionHeader,
  AppPagination,
} from "@/components/ui";

import { PAGINATION } from "@/constants";
import { BROWSE_RECIPES } from "./browseRecipes.data";

import { normalizeText } from "@/utils";

import styles from "./BrowseRecipes.module.scss";

export default function BrowseRecipes() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim() ?? "";
  const categorySlug =
    searchParams.get("category")?.trim() ?? "";

  const hasActiveSearch = Boolean(searchQuery);
  const hasActiveCategory = Boolean(categorySlug);

  const difficultySlug =
    searchParams.get("difficulty")?.trim() ?? "";

  const requestedMaxTime = Number(
    searchParams.get("maxTime")
  );

  const maxTime =
    Number.isFinite(requestedMaxTime) &&
    requestedMaxTime > 0
      ? requestedMaxTime
      : null;

  const hasActiveDifficulty = Boolean(difficultySlug);
  const hasActiveMaxTime = Boolean(maxTime);

  const requestedPage = Number(searchParams.get("page"));
  const requestedPageSize = Number(searchParams.get("pageSize"));

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : PAGINATION.DEFAULT_PAGE;

  const pageSize = PAGINATION.PAGE_SIZE_OPTIONS.includes(
    requestedPageSize
  )
    ? requestedPageSize
    : PAGINATION.DEFAULT_PAGE_SIZE;

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery);
    const normalizedCategory = normalizeText(categorySlug);
    const normalizedDifficulty = normalizeText(difficultySlug);

    return BROWSE_RECIPES.filter((recipe) => {
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
        normalizeText(recipe.difficulty) === normalizedDifficulty;

      const matchesMaxTime =
        !maxTime ||
        recipe.totalTime <= maxTime;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesMaxTime
      );
    });
  }, [
    searchQuery,
    categorySlug,
    difficultySlug,
    maxTime,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / pageSize)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * pageSize;

  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (nextPage) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextPage <= PAGINATION.DEFAULT_PAGE) {
      nextSearchParams.delete("page");
    } else {
      nextSearchParams.set("page", String(nextPage));
    }

    setSearchParams(nextSearchParams);
  };

  const handlePageSizeChange = (nextPageSize) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextPageSize === PAGINATION.DEFAULT_PAGE_SIZE) {
      nextSearchParams.delete("pageSize");
    } else {
      nextSearchParams.set("pageSize", String(nextPageSize));
    }

    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  return (
    <Section
      className={styles.section}
      spacing="large"
      labelledBy="browse-recipes-title"
    >
      <PageContainer>
        <SectionHeader
          headingId="browse-recipes-title"
          eyebrow="Toutes les recettes"
          title="Trouvez votre prochaine recette"
          description="Recherchez et filtrez les recettes selon vos envies, votre temps et votre niveau."
        />

        {(
          hasActiveSearch ||
          hasActiveCategory ||
          hasActiveDifficulty ||
          hasActiveMaxTime
        ) && (
          <div
            className={styles.activeContext}
            aria-live="polite"
          >
            {hasActiveSearch ? (
              <p className={styles.contextItem}>
                Recherche : <strong>{searchQuery}</strong>
              </p>
            ) : null}

            {hasActiveCategory ? (
              <p className={styles.contextItem}>
                Catégorie : <strong>{categorySlug}</strong>
              </p>
            ) : null}

            {hasActiveDifficulty ? (
              <p className={styles.contextItem}>
                Difficulté : <strong>{difficultySlug}</strong>
              </p>
            ) : null}

            {hasActiveMaxTime ? (
              <p className={styles.contextItem}>
                Durée maximum : <strong>{maxTime} min</strong>
              </p>
            ) : null}
          </div>
        )}

        <div className={styles.content}>
          <aside
            className={styles.filters}
            aria-label="Filtres des recettes"
          >
            <RecipeFilters />
          </aside>

          <div className={styles.results}>
            <RecipeGrid recipes={paginatedRecipes} />

            <AppPagination
              currentPage={safeCurrentPage}
              totalItems={filteredRecipes.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}