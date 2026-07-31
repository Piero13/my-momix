/**
 * Public home page.
 */

import { 
  Hero, 
  QuickSearch,
  LatestRecipes,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <LatestRecipes />
    </>
  );
}