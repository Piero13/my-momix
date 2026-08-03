/**
 * Public recipe details page.
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  RecipeHero,
  RecipeIngredients,
  RecipeSteps,
  RecipeTips,
  RecipeNutrition,
  SimilarRecipes,
} from "@/components/recipe";

import {
  AppButton,
  EmptyState,
  PageContainer,
  Section,
} from "@/components/ui";

import { 
  shareContent,
  generateRecipePdf,
} from "@/services";

import {
  getSimilarRecipes,
  mapRecipeDetailsToCard,
} from "@/utils";

import { ROUTES } from "@/constants";

import { useRecipeDetails } from "@/hooks";

import { RECIPE_DETAILS_DATA } from "./recipeDetails.data";

import styles from "./RecipeDetails.module.scss";

function RecipeDetailsContent({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedServings, setSelectedServings] = useState(
    recipe.servings
  );

  const handleFavoriteToggle = () => {
    const nextIsFavorite = !isFavorite;

    setIsFavorite(nextIsFavorite);

    toast.success(
      nextIsFavorite
        ? "Recette ajoutée aux favoris."
        : "Recette retirée des favoris."
    );
  };

  const handleShare = async () => {
    const result = await shareContent({
      title: recipe.title,
      text: recipe.description,
      url: window.location.href,
    });

    switch (result.status) {
      case "shared":
        toast.success("Recette partagée.");
        break;

      case "copied":
        toast.success(
          "Lien copié dans le presse-papiers."
        );
        break;

      case "error":
        toast.error(
          "Impossible de partager cette recette."
        );
        break;

      default:
        break;
    }
  };

  const handleDownloadPdf = () => {
    try {
      generateRecipePdf({
        recipe,
        selectedServings,
      });

      toast.success("Le PDF a été généré.");
    } catch (error) {
      console.error(
        "Recipe PDF generation failed:",
        error
      );

      toast.error(
        "Impossible de générer le PDF."
      );
    }
  };

  const handleServingsChange = (nextServings) => {
    setSelectedServings(nextServings);
  };

  const similarRecipes = getSimilarRecipes(
    recipe,
    RECIPE_DETAILS_DATA,
    3
  ).map(mapRecipeDetailsToCard);

  return (
    <article className={styles.page}>
      <Section
        className={styles.heroSection}
        spacing="large"
        labelledBy="recipe-title"
      >
        <PageContainer>
          <nav
            className={styles.backNavigation}
            aria-label="Navigation de retour"
          >
            <Link
              to={ROUTES.BROWSE}
              className={styles.backLink}
            >
              <FiArrowLeft aria-hidden="true" />
              <span>Retour aux recettes</span>
            </Link>
          </nav>

          <RecipeHero
            recipe={recipe}
            servings={selectedServings}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
            onShare={handleShare}
            onDownloadPdf={handleDownloadPdf}
          />

          <div className={styles.recipeContent}>
            <RecipeIngredients
              ingredients={recipe.ingredients}
              originalServings={recipe.servings}
              selectedServings={selectedServings}
              onServingsChange={handleServingsChange}
            />

            <RecipeSteps steps={recipe.steps} />

            <RecipeTips tips={recipe.tips} />

            <RecipeNutrition nutrition={recipe.nutrition} />

            <SimilarRecipes recipes={similarRecipes} />
          </div>
        </PageContainer>
      </Section>
    </article>
  );
}

export default function RecipeDetails() {
  const {
    recipe,
    isNotFound,
  } = useRecipeDetails(RECIPE_DETAILS_DATA);

  if (isNotFound) {
    return (
      <Section
        className={styles.notFoundSection}
        spacing="large"
        labelledBy="recipe-not-found-title"
      >
        <PageContainer>
          <EmptyState
            icon={FiSearch}
            title="Recette introuvable"
            description="Cette recette n’existe pas ou n’est plus disponible."
            action={
              <AppButton
                as={Link}
                to={ROUTES.BROWSE}
                variant="primary"
                icon={<FiArrowLeft />}
              >
                Retour aux recettes
              </AppButton>
            }
          />
        </PageContainer>
      </Section>
    );
  }

  return (
    <RecipeDetailsContent
      key={recipe.id}
      recipe={recipe}
    />
  );
}