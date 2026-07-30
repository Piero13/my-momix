/**
 * Main hero section displayed on the public home page.
 */

import { FiArrowRight, FiBookmark, FiClock, FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { AppButton, AppCard, PageContainer, Section } from "@/components/ui";
import { ROUTES } from "@/constants";

import styles from "./Hero.module.scss";

const HERO_BENEFITS = [
  {
    id: "search",
    label: "Recherche rapide",
    icon: FiSearch,
  },
  {
    id: "favorites",
    label: "Recettes favorites",
    icon: FiBookmark,
  },
  {
    id: "organization",
    label: "Organisation simplifiée",
    icon: FiClock,
  },
];

export default function Hero() {
  return (
    <Section
      className={styles.hero}
      spacing="large"
      labelledBy="home-hero-title"
    >
      <PageContainer>
        <div className={styles.layout}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>
              Votre compagnon culinaire
            </p>

            <h1 id="home-hero-title" className={styles.title}>
              Toutes vos recettes Thermomix,
              <span className={styles.highlight}>
                {" "}
                organisées simplement.
              </span>
            </h1>

            <p className={styles.description}>
              Retrouvez rapidement vos recettes, organisez vos favoris et
              préparez vos repas plus sereinement grâce à une application
              claire, moderne et pensée pour la cuisine du quotidien.
            </p>

            <div className={styles.actions}>
              <AppButton
                as={NavLink}
                to={ROUTES.BROWSE}
                variant="primary"
                icon={<FiSearch />}
              >
                Explorer les recettes
              </AppButton>

              <AppButton
                as={NavLink}
                to={ROUTES.ABOUT}
                variant="outline-primary"
                icon={<FiArrowRight />}
                iconPosition="end"
              >
                Découvrir MyMomix
              </AppButton>
            </div>

            <ul
              className={styles.benefits}
              aria-label="Avantages de MyMomix"
            >
              {HERO_BENEFITS.map(({ id, label, icon: Icon }) => (
                <li key={id} className={styles.benefit}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    <Icon />
                  </span>

                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.decorativeCircle} />

            <AppCard className={styles.recipeCard} padding="none">
              <div className={styles.recipeImage}>
                <span className={styles.recipeEmoji}>🥕</span>

                <span className={styles.recipeBadge}>
                  Facile
                </span>
              </div>

              <div className={styles.recipeContent}>
                <div>
                  <p className={styles.recipeCategory}>
                    Plat principal
                  </p>

                  <p className={styles.recipeTitle}>
                    Velouté de légumes
                  </p>
                </div>

                <div className={styles.recipeMeta}>
                  <span>
                    <FiClock />
                    35 min
                  </span>

                  <span>
                    ★ 4,9
                  </span>
                </div>
              </div>
            </AppCard>

            <AppCard className={styles.searchCard} padding="compact">
              <span className={styles.searchIcon}>
                <FiSearch />
              </span>

              <div>
                <span className={styles.searchLabel}>
                  Recherche rapide
                </span>

                <span className={styles.searchValue}>
                  Soupe, dessert, saison…
                </span>
              </div>
            </AppCard>

            <AppCard className={styles.favoriteCard} padding="compact">
              <span className={styles.favoriteIcon}>
                <FiBookmark />
              </span>

              <div>
                <span className={styles.favoriteValue}>24</span>
                <span className={styles.favoriteLabel}>
                  recettes favorites
                </span>
              </div>
            </AppCard>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}