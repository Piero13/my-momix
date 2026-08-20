/**
 * Public home page.
 */

import { FiAlertCircle } from "react-icons/fi";

import {
  Hero,
  LatestRecipes,
  PopularCategories,
  QuickSearch,
} from "@/components/home";

import { 
  PageSeo
} from "@/components/seo";

import { 
  EmptyState
} from "@/components/ui"

import {
  useHomeData,
} from "@/hooks/public";

import {
  mapPublicCategory,
  mapPublicRecipe,
} from "@/utils";

export default function Home() {
  const {
    latestRecipes,
    popularCategories,
    isLoading,
    error,
  } = useHomeData();

  const mappedLatestRecipes =
    latestRecipes.map(
      mapPublicRecipe
    );

  const mappedPopularCategories =
    popularCategories.map(
      mapPublicCategory
    );

  return (
    <>
      <PageSeo
        title="Accueil | MyMomix"
        description="Découvrez toutes les recettes MyMomix et filtrez-les selon vos envies, votre temps et votre niveau."
      />

      <Hero />

      <QuickSearch />

      {error ? (
        <EmptyState
          icon={FiAlertCircle}
          title="Impossible de charger les contenus"
          description="Les recettes et catégories ne sont pas disponibles pour le moment."
        />
      ) : (
        <>
          <LatestRecipes
            recipes={mappedLatestRecipes}
            loading={isLoading}
          />

          <PopularCategories
            categories={mappedPopularCategories}
            loading={isLoading}
          />
        </>
      )}
    </>
  );
}