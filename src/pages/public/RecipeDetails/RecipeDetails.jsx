/**
 * Public recipe details page.
 */

import {
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiSearch,
} from "react-icons/fi";
import {
  Link,
  useParams,
} from "react-router-dom";

import {
  RecipeHero,
  RecipeIngredients,
  RecipeSteps,
  RecipeTips,
  SimilarRecipes,
  AppButton,
  EmptyState,
  LoadingScreen,
  PageContainer,
  Section,
  RecipeComments,
  RecipeCommentForm,
} from "@/components";

import {
  generateRecipePdf,
  shareContent,
} from "@/services";

import {
  mapPublicRecipe,
  mapPublicRecipeDetails,
} from "@/utils";

import {
  ROUTES,
} from "@/constants";

import {
  usePublishedRecipeDetails,
  useFavorites,
} from "@/hooks";

import styles from "./RecipeDetails.module.scss";

function RecipeDetailsContent({
  recipe,
  comments,
  similarRecipes,
  isFavorite,
  onFavoriteToggle,
}) {

  const [
    selectedServings,
    setSelectedServings,
  ] = useState(
    recipe.servings
  );

  const handleShare = async () => {
    const result =
      await shareContent({
        title:
          recipe.title,

        text:
          recipe.description,

        url:
          window.location.href,
      });

    switch (result.status) {
      case "shared":
        toast.success(
          "Recette partagée."
        );
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

      toast.success(
        "Le PDF a été généré."
      );
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

  const handleServingsChange = (
    nextServings
  ) => {
    setSelectedServings(
      nextServings
    );
  };

  return (
    <article className={styles.page}>
      <Section
        className={styles.heroSection}
        spacing="large"
        labelledBy="recipe-title"
      >
        <PageContainer>
          <nav
            className={
              styles.backNavigation
            }
            aria-label="Navigation de retour"
          >
            <Link
              to={ROUTES.BROWSE}
              className={
                styles.backLink
              }
            >
              <FiArrowLeft
                aria-hidden="true"
              />

              <span>
                Retour aux recettes
              </span>
            </Link>
          </nav>

          <RecipeHero
            recipe={recipe}
            servings={selectedServings}
            isFavorite={isFavorite}
            onFavoriteToggle={
              onFavoriteToggle
            }
            onShare={handleShare}
            onDownloadPdf={handleDownloadPdf}
          />

          <div
            className={
              styles.recipeContent
            }
          >
            <RecipeIngredients
              ingredients={
                recipe.ingredients
              }
              originalServings={
                recipe.servings
              }
              selectedServings={
                selectedServings
              }
              onServingsChange={
                handleServingsChange
              }
            />

            <RecipeSteps
              steps={
                recipe.steps
              }
            />

            <RecipeTips
              tips={
                recipe.tips
              }
            />

            <RecipeCommentForm
              recipeId={recipe.id}
            />

            <RecipeComments
              comments={comments}
            />

            <SimilarRecipes
              recipes={
                similarRecipes
              }
            />
          </div>
        </PageContainer>
      </Section>
    </article>
  );
}

export default function RecipeDetails() {
  const {
    slug,
  } = useParams();

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const {
    recipe,
    ingredients,
    steps,
    tips,
    comments,
    similarRecipes,

    isLoading,
    error,
  } = usePublishedRecipeDetails(
    slug
  );

  const mappedRecipe =
    useMemo(() => {
      if (!recipe) {
        return null;
      }

      return mapPublicRecipeDetails({
        recipe,
        ingredients,
        steps,
        tips,
      });
    }, [
      recipe,
      ingredients,
      steps,
      tips,
    ]);

  const mappedSimilarRecipes =
    useMemo(
      () =>
        (similarRecipes ?? []).map(
          mapPublicRecipe
        ),
      [
        similarRecipes,
      ]
    );

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  const isNotFound =
    !mappedRecipe &&
    !error;

  if (
    isNotFound ||
    error
  ) {
    return (
      <Section
        className={
          styles.notFoundSection
        }
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
                icon={
                  <FiArrowLeft />
                }
              >
                Retour aux recettes
              </AppButton>
            }
          />
        </PageContainer>
      </Section>
    );
  }

  const handleFavoriteToggle = () => {
    if (!mappedRecipe) {
      return;
    }

    const nextIsFavorite =
      toggleFavorite(
        mappedRecipe.id
      );

    toast.success(
      nextIsFavorite
        ? "Recette ajoutée aux favoris."
        : "Recette retirée des favoris."
    );
  };

  return (
    <RecipeDetailsContent
      key={mappedRecipe.id}
      recipe={mappedRecipe}
      comments={comments}
      similarRecipes={
        mappedSimilarRecipes
      }
      isFavorite={
        isFavorite(
          mappedRecipe.id
        )
      }
      onFavoriteToggle={
        handleFavoriteToggle
      }
    />
  );
}