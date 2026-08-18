/**
 * Public recipe browsing page.
 */

import { 
  FiHeart,
  FiAlertCircle,
} from "react-icons/fi";

import {
  RecipeFilters,
  RecipeGrid,
  RecipeSort,
  AppPagination,
  PageContainer,
  Section,
  SectionHeader,
  EmptyState,
} from "@/components";

import {usePublishedRecipes} from "@/hooks/public";
import { useFavorites } from "@/hooks/favorites";

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
    favoritesOnly,

    recipes,
    totalRecipes,

    currentPage,
    pageSize,

    isLoading,

    error,

    handlePageChange,
    handlePageSizeChange,
  } = usePublishedRecipes();

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const mappedRecipes =
    recipes.map(
      mapPublicRecipe
    );

  const handleFavoriteToggle = (
    recipe
  ) => {
    toggleFavorite(recipe.id);
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

            {error ? (
              <EmptyState
                icon={FiAlertCircle}
                title="Impossible de charger les recettes"
                description="Une erreur est survenue lors du chargement des recettes."
              />
            ) : !isLoading &&
            favoritesOnly &&
            mappedRecipes.length === 0 ? (
              <EmptyState
                icon={FiHeart}
                title={"Aucune recette favorite"}
                description={"Ajoutez des recettes à vos favoris pour les retrouver facilement ici."}
              />
            ) : (
              <RecipeGrid
                recipes={mappedRecipes}
                isFavorite={isFavorite}
                onFavoriteToggle={
                  handleFavoriteToggle
                }
              />
            )}

            {!isLoading &&
            !error &&
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