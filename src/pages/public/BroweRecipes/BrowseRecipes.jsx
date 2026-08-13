/**
 * Public recipe browsing page.
 */

import {
  RecipeFilters,
  RecipeGrid,
  RecipeSort,
  AppPagination,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components";

import {
  usePublishedRecipes,
} from "@/hooks";

import {
  mapPublicRecipe,
} from "@/utils";

import styles from "./BrowseRecipes.module.scss";

export default function BrowseRecipes() {
  const {
    categories,

    searchQuery,
    categorySlug,
    difficultySlug,
    maxTime,

    hasActiveSearch,
    hasActiveCategory,
    hasActiveDifficulty,
    hasActiveMaxTime,
    hasActiveFilters,

    recipes,
    totalRecipes,

    currentPage,
    pageSize,

    isLoading,

    handlePageChange,
    handlePageSizeChange,
  } = usePublishedRecipes();

  const mappedRecipes =
    recipes.map(
      mapPublicRecipe
    );

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

        {hasActiveFilters ? (
          <div
            className={styles.activeContext}
            aria-live="polite"
          >
            {hasActiveSearch ? (
              <p className={styles.contextItem}>
                Recherche :{" "}
                <strong>
                  {searchQuery}
                </strong>
              </p>
            ) : null}

            {hasActiveCategory ? (
              <p className={styles.contextItem}>
                Catégorie :{" "}
                <strong>
                  {categorySlug}
                </strong>
              </p>
            ) : null}

            {hasActiveDifficulty ? (
              <p className={styles.contextItem}>
                Difficulté :{" "}
                <strong>
                  {difficultySlug}
                </strong>
              </p>
            ) : null}

            {hasActiveMaxTime ? (
              <p className={styles.contextItem}>
                Durée maximum :{" "}
                <strong>
                  {maxTime} min
                </strong>
              </p>
            ) : null}
          </div>
        ) : null}

        <div className={styles.content}>
          <aside
            className={styles.filters}
            aria-label="Filtres des recettes"
          >
            <RecipeFilters 
              categories={categories}
            />
          </aside>

          <div className={styles.results}>
            <div
              className={
                styles.resultsToolbar
              }
            >
              <p
                className={
                  styles.resultsCount
                }
                aria-live="polite"
              >
                {isLoading
                  ? "Chargement des recettes…"
                  : (
                    <>
                      {totalRecipes}{" "}
                      {totalRecipes > 1
                        ? "recettes trouvées"
                        : "recette trouvée"}
                    </>
                  )}
              </p>

              <RecipeSort />
            </div>

            <RecipeGrid
              recipes={mappedRecipes}
              loading={isLoading}
            />

            {!isLoading &&
            totalRecipes > 0 ? (
              <AppPagination
                currentPage={
                  currentPage
                }
                totalItems={
                  totalRecipes
                }
                pageSize={
                  pageSize
                }
                onPageChange={
                  handlePageChange
                }
                onPageSizeChange={
                  handlePageSizeChange
                }
              />
            ) : null}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}