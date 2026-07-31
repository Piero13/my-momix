/**
 * Public recipe browsing page.
 */

import { useSearchParams } from "react-router-dom";

import { RecipeFilters } from "@/components/recipe";
import {
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import styles from "./BrowseRecipes.module.scss";

export default function BrowseRecipes() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim() ?? "";
  const categorySlug =
    searchParams.get("category")?.trim() ?? "";

  const hasActiveSearch = Boolean(searchQuery);
  const hasActiveCategory = Boolean(categorySlug);

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

        {(hasActiveSearch || hasActiveCategory) && (
          <div
            className={styles.activeContext}
            aria-live="polite"
          >
            {hasActiveSearch && (
              <p className={styles.contextItem}>
                Recherche : <strong>{searchQuery}</strong>
              </p>
            )}

            {hasActiveCategory && (
              <p className={styles.contextItem}>
                Catégorie : <strong>{categorySlug}</strong>
              </p>
            )}
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
            <p className={styles.placeholder}>
              La grille des recettes sera ajoutée à la prochaine étape.
            </p>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}