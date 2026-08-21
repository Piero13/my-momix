import {
  FiHeart,
  FiMessageCircle,
  FiSearch,
  FiShoppingCart,
} from "react-icons/fi";

import {
  AppCard,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import styles from "./AboutFeatures.module.scss";

const FEATURES = [
  {
    id: "search",
    title: "Trouver une recette",
    description:
      "Recherchez et filtrez les recettes pour retrouver rapidement celle qui correspond à votre envie.",
    icon: FiSearch,
  },
  {
    id: "favorites",
    title: "Garder ses favorites",
    description:
      "Enregistrez les recettes que vous aimez pour les retrouver en quelques secondes.",
    icon: FiHeart,
  },
  {
    id: "shopping",
    title: "Préparer ses courses",
    description:
      "Ajoutez les ingrédients d’une recette à votre liste de courses et cochez-les au fur et à mesure.",
    icon: FiShoppingCart,
  },
  {
    id: "reviews",
    title: "Partager son avis",
    description:
      "Notez les recettes et partagez votre expérience après les avoir préparées.",
    icon: FiMessageCircle,
  },
];

export default function AboutFeatures() {
  return (
    <Section
      spacing="large"
      labelledBy="about-features-title"
    >
      <PageContainer>
        <SectionHeader
          headingId="about-features-title"
          eyebrow="Fonctionnalités"
          title="Tout ce qu’il faut pour cuisiner plus simplement"
        />

        <div className={styles.grid}>
          {FEATURES.map(
            ({
              id,
              title,
              description,
              icon: Icon,
            }) => (
              <AppCard
                key={id}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <span
                    className={styles.iconWrapper}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>

                  <h3 className={styles.title}>
                    {title}
                  </h3>

                  <p className={styles.description}>
                    {description}
                  </p>
                </div>
              </AppCard>
            )
          )}
        </div>
      </PageContainer>
    </Section>
  );
}