/**
 * Reusable category navigation card.
 */

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/ui";
import { getRecipesByCategoryPath } from "@/constants";

import styles from "./CategoryCard.module.scss";

export default function CategoryCard({ category }) {
  const {
    name,
    slug,
    description,
    icon: Icon,
    recipeCount,
  } = category;

  const hasRecipeCount =
    typeof recipeCount === "number" && recipeCount >= 0;

  return (
    <article className={styles.article}>
      <AppCard
        className={styles.card}
        hoverable
        padding="none"
      >
        <Link
          to={getRecipesByCategoryPath(slug)}
          className={styles.link}
          aria-label={`Découvrir les recettes de la catégorie ${name}`}
        >
          <div className={styles.iconWrapper}>
            {Icon ? (
              <Icon
                className={styles.icon}
                aria-hidden="true"
              />
            ) : null}
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>
              {name}
            </h3>

            {description ? (
              <p className={styles.description}>
                {description}
              </p>
            ) : null}

            <div className={styles.footer}>
              {hasRecipeCount ? (
                <span className={styles.count}>
                  {recipeCount}{" "}
                  {recipeCount > 1 ? "recettes" : "recette"}
                </span>
              ) : (
                <span className={styles.count}>
                  Découvrir
                </span>
              )}

              <FiArrowRight
                className={styles.arrow}
                aria-hidden="true"
              />
            </div>
          </div>
        </Link>
      </AppCard>
    </article>
  );
}