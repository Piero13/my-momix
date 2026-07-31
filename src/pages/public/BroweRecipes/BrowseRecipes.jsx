/**
 * Public recipe browsing page.
 */

import {
  RecipeFilters,
  RecipeGrid,
  RecipeSort,
} from "@/components/recipe";
import {
  AppPagination,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";
import { useRecipeBrowser } from "@/hooks";

import { BROWSE_RECIPES } from "./browseRecipes.data";
import styles from "./BrowseRecipes.module.scss";

export default function BrowseRecipes() {
  const {
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
    handlePageChange,
    handlePageSizeChange,
  } = useRecipeBrowser(BROWSE_RECIPES);

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
        ) : null}

        <div className={styles.content}>
          <aside
            className={styles.filters}
            aria-label="Filtres des recettes"
          >
            <RecipeFilters />
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsToolbar}>
              <p
                className={styles.resultsCount}
                aria-live="polite"
              >
                {totalRecipes}{" "}
                {totalRecipes > 1
                  ? "recettes trouvées"
                  : "recette trouvée"}
              </p>

              <RecipeSort />
            </div>

            <RecipeGrid recipes={recipes} />

            <AppPagination
              currentPage={currentPage}
              totalItems={totalRecipes}
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