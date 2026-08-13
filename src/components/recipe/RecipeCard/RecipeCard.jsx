/**
 * Reusable public recipe preview card.
 */

import {
  FiClock,
  FiHeart,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/ui";
import {
  getRecipeDetailsPath,
} from "@/constants";

import styles from "./RecipeCard.module.scss";

export default function RecipeCard({
  recipe,
  isFavorite = false,
  onFavoriteToggle,
}) {
  const {
    title,
    slug,
    imageUrl,
    category,
    totalTime,
    servings,
    difficulty,
  } = recipe;

  const handleFavoriteClick = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    onFavoriteToggle?.(recipe);
  };

  return (
    <article className={styles.article}>
      <AppCard
        className={styles.card}
        hoverable
        padding="none"
      >
        <Link
          to={getRecipeDetailsPath(slug)}
          className={styles.link}
          aria-label={`Voir la recette ${title}`}
        >
          <div
            className={
              styles.imageWrapper
            }
          >
            <img
              src={imageUrl}
              alt=""
              className={styles.image}
              loading="lazy"
            />

            {category ? (
              <span
                className={
                  styles.category
                }
              >
                {category}
              </span>
            ) : null}
          </div>

          <div
            className={styles.content}
          >
            <div
              className={
                styles.titleRow
              }
            >
              <h3
                className={
                  styles.title
                }
              >
                {title}
              </h3>

              {onFavoriteToggle ? (
                <button
                  type="button"
                  className={
                    styles.favoriteButton
                  }
                  aria-label={
                    isFavorite
                      ? `Retirer ${title} des favoris`
                      : `Ajouter ${title} aux favoris`
                  }
                  aria-pressed={
                    isFavorite
                  }
                  onClick={
                    handleFavoriteClick
                  }
                >
                  <FiHeart
                    aria-hidden="true"
                    className={
                      isFavorite
                        ? styles.favoriteIconActive
                        : undefined
                    }
                  />
                </button>
              ) : null}
            </div>

            <div
              className={
                styles.metadata
              }
            >
              {totalTime ? (
                <span
                  className={
                    styles.metadataItem
                  }
                >
                  <FiClock
                    aria-hidden="true"
                  />

                  <span>
                    {totalTime} min
                  </span>
                </span>
              ) : null}

              {servings ? (
                <span
                  className={
                    styles.metadataItem
                  }
                >
                  <FiUsers
                    aria-hidden="true"
                  />

                  <span>
                    {servings}{" "}
                    {servings > 1
                      ? "personnes"
                      : "personne"}
                  </span>
                </span>
              ) : null}
            </div>

            {difficulty ? (
              <span
                className={
                  styles.difficulty
                }
              >
                {difficulty}
              </span>
            ) : null}
          </div>
        </Link>
      </AppCard>
    </article>
  );
}