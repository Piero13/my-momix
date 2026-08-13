/**
 * Public home page.
 */

import {
  Hero,
  LatestRecipes,
  PopularCategories,
  QuickSearch,
} from "@/components/home";

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
  } = useHomeData();

  const mappedLatestRecipes =
    latestRecipes.map(
      mapPublicRecipe
    );

  return (
    <>
      <Hero />

      <QuickSearch />

      <LatestRecipes
        recipes={
          mappedLatestRecipes
        }
        loading={
          isLoading
        }
      />

      <PopularCategories
        categories={
          popularCategories
        }
        loading={
          isLoading
        }
      />
    </>
  );
}