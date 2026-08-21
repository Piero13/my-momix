import {
  AboutCTA,
  AboutFeatures,
  AboutHero,
  AboutJourney,
  AboutPrinciples,
} from "@/components/about";

import {
  PageSeo,
} from "@/components/seo";

export default function About() {
  return (
    <>
      <PageSeo
        title="À propos | MyMomix"
        description="Découvrez MyMomix, une application pensée pour organiser vos recettes, favoris, avis et listes de courses simplement."
      />

      <AboutHero />
      <AboutPrinciples />
      <AboutFeatures />
      <AboutJourney />
      <AboutCTA />
    </>
  );
}