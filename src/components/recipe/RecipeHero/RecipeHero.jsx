/**
 * Main presentation header for a public recipe details page.
 */

import {
  FiBarChart2,
  FiClock,
  FiDownload,
  FiHeart,
  FiShare2,
  FiStar,
  FiThermometer,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { AppButton } from "@/components/ui";
import { getRecipesByCategoryPath } from "@/constants";
import { classNames, formatDuration } from "@/utils";

import styles from "./RecipeHero.module.scss";

function RecipeMetaItem({ icon: Icon, label, value }) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <li className={styles.metaItem}>
      <span className={styles.metaIcon} aria-hidden="true">
        <Icon />
      </span>

      <div>
        <span className={styles.metaLabel}>{label}</span>
        <span className={styles.metaValue}>{value}</span>
      </div>
    </li>
  );
}

export default function RecipeHero({
  recipe,
  servings = recipe.servings,
  isFavorite = false,
  onFavoriteToggle,
  onShare,
  onDownloadPdf,
}) {
  const {
    title,
    description,
    imageUrl,
    category,
    difficulty,
    preparationTime,
    cookingTime,
    totalTime,
    averageRating,
    ratingsCount,
  } = recipe;

  const hasRating =
    typeof averageRating === "number" && averageRating > 0;

  const servingsLabel =
    typeof servings === "number"
      ? `${servings} ${
          servings > 1 ? "personnes" : "personne"
        }`
      : null;

  const handleFavoriteClick = () => {
    onFavoriteToggle?.(recipe);
  };

  const handleShareClick = () => {
    onShare?.(recipe);
  };

  const handleDownloadPdf = () => {
    onDownloadPdf?.(recipe);
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt={title}
              className={styles.image}
            />

            {difficulty ? (
              <span className={styles.difficultyBadge}>
                <FiBarChart2 aria-hidden="true" />
                <span>{difficulty}</span>
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles.content}>
          {category ? (
            <Link
              to={getRecipesByCategoryPath(category.slug)}
              className={styles.category}
            >
              {category.name}
            </Link>
          ) : null}

          <h1 id="recipe-title" className={styles.title}>
            {title}
          </h1>

          {description ? (
            <p className={styles.description}>
              {description}
            </p>
          ) : null}

          {hasRating ? (
            <div
              className={styles.rating}
              aria-label={`Note moyenne : ${averageRating} sur 5`}
            >
              <FiStar
                className={styles.ratingIcon}
                aria-hidden="true"
              />

              <strong>{averageRating.toFixed(1)}</strong>

              <span className={styles.ratingMaximum}>
                / 5
              </span>

              {typeof ratingsCount === "number" ? (
                <span className={styles.ratingCount}>
                  ({ratingsCount}{" "}
                  {ratingsCount > 1 ? "avis" : "avis"})
                </span>
              ) : null}
            </div>
          ) : null}

          <ul
            className={styles.metadata}
            aria-label="Informations principales de la recette"
          >
            <RecipeMetaItem
              icon={FiClock}
              label="Préparation"
              value={
                preparationTime
                  ? formatDuration(preparationTime)
                  : null
              }
            />

            <RecipeMetaItem
              icon={FiThermometer}
              label="Cuisson"
              value={
                cookingTime
                  ? formatDuration(cookingTime)
                  : null
              }
            />

            <RecipeMetaItem
              icon={FiClock}
              label="Temps total"
              value={
                totalTime
                  ? formatDuration(totalTime)
                  : null
              }
            />

            <RecipeMetaItem
              icon={FiUsers}
              label="Portions"
              value={servingsLabel}
            />
          </ul>
        </div>
      </div>

      <div className={styles.actions}>
        <AppButton
          variant={isFavorite ? "primary" : "outline-primary"}
          icon={<FiHeart />}
          aria-pressed={isFavorite}
          className={classNames(
            styles.actionButton,
            isFavorite && styles.favoriteActive
          )}
          onClick={handleFavoriteClick}
        >
          {isFavorite
            ? "Retirer des favoris"
            : "Ajouter aux favoris"}
        </AppButton>

        <AppButton
          variant="outline-secondary"
          icon={<FiShare2 />}
          className={styles.actionButton}
          onClick={handleShareClick}
        >
          Partager la recette
        </AppButton>

        <AppButton
          variant="outline-secondary"
          icon={<FiDownload />}
          className={styles.actionButton}
          onClick={handleDownloadPdf}
        >
          Exporter en PDF
        </AppButton>
      </div>      
    </div>

  );
}