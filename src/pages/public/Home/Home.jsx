/**
 * Public home page.
 */

import { 
  Hero, 
  QuickSearch,
  LatestRecipes,
  PopularCategories
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <LatestRecipes />
      <PopularCategories />
    </>
  );
}