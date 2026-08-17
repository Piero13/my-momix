/**
 * Public home page.
 */

import { FiAlertCircle } from "react-icons/fi";

import {
  Hero,
  LatestRecipes,
  PopularCategories,
  QuickSearch,
  EmptyState,
} from "@/components";

import {
  useHomeData,
} from "@/hooks";

import {
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

  return (
    <>
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
            categories={popularCategories}
            loading={isLoading}
          />
        </>
      )}
    </>
  );
}