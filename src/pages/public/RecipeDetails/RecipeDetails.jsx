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
  RecipeComments,
  RecipeCommentForm,
} from "@/components/recipe";

import { PageSeo } from "@/components/seo";

import { LoadingScreen } from "@/components/feedback"
  
import {
  PageContainer,
  Section,
  AppButton,
  EmptyState,
} from "@/components/ui"

import {
  shareContent,
} from "@/services/share";

import {
  mapPublicRecipe,
  mapPublicRecipeDetails,
  normalizeShoppingItem,
} from "@/utils";

import {
  ROUTES,
} from "@/constants";

import { useShoppingList } from "@/hooks/shoppingList";
import { useFavorites } from "@/hooks/favorites";
import { usePublishedRecipeDetails } from "@/hooks/public";

import styles from "./RecipeDetails.module.scss";

function RecipeDetailsContent({
  recipe,
  comments,
  similarRecipes,
  isFavorite,
  onFavoriteToggle,
  structureData,
}) {

  const [
    selectedServings,
    setSelectedServings,
  ] = useState(
    recipe.servings
  );

  const {
    addItems,
  } = useShoppingList();

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

  const handleDownloadPdf =
    async () => {
      try {
        const {
          generateRecipePdf,
        } = await import(
          "@/services/pdf/recipe-pdf.service"
        );

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

  const handleAddToShoppingList = () => {
    if (
      !recipe?.ingredients?.length ||
      !recipe.servings ||
      !selectedServings
    ) {
      toast.error(
        "Impossible d’ajouter les ingrédients à la liste."
      );

      return;
    }

    const ratio =
      selectedServings /
      recipe.servings;

    const shoppingItems =
      recipe.ingredients.map(
        (ingredient) =>
          normalizeShoppingItem({
            ingredientId:
              ingredient.ingredientId ??
              ingredient.id,

            name:
              ingredient.name,

            quantity:
              Number(
                ingredient.quantity ?? 0
              ) * ratio,

            unit:
              ingredient.unit,

            recipeId:
              recipe.id,

            recipeTitle:
              recipe.title,
          })
      );

    addItems(
      shoppingItems
    );

    toast.success(
      "Ingrédients ajoutés à la liste de courses."
    );
  };

  return (
    <>
      <PageSeo
        title={
          recipe.metaTitle ||
          `${recipe.title} | MyMomix`
        }
        description={
          recipe.metaDescription ||
          recipe.description ||
          ""
        }
        image={recipe.imageUrl}
        url={window.location.href}
        type="article"
        structuredData={
          structureData
        }
      />

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
              onAddToShoppingList={handleAddToShoppingList}
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
    </>

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
  
  const recipeStructuredData =
    useMemo(() => {
      if (!mappedRecipe) {
        return null;
      }

      return {
        "@context":
          "https://schema.org",

        "@type":
          "Recipe",

        name:
          mappedRecipe.title,

        description:
          mappedRecipe.metaDescription ||
          mappedRecipe.description ||
          undefined,

        image:
          mappedRecipe.imageUrl
            ? [mappedRecipe.imageUrl]
            : undefined,

        recipeYield:
          mappedRecipe.servings
            ? `${mappedRecipe.servings} personnes`
            : undefined,

        recipeCategory:
          mappedRecipe.category ||
          undefined,

        aggregateRating:
          mappedRecipe.ratingsCount > 0
            ? {
                "@type":
                  "AggregateRating",

                ratingValue:
                  mappedRecipe.averageRating,

                ratingCount:
                  mappedRecipe.ratingsCount,

                bestRating: 5,
                worstRating: 1,
              }
            : undefined,

        recipeIngredient:
          mappedRecipe.ingredients
            ?.map((ingredient) => {
              const quantity =
                ingredient.quantity ?? "";

              const unit =
                ingredient.unit ?? "";

              const name =
                ingredient.name ?? "";

              return [
                quantity,
                unit,
                name,
              ]
                .filter(
                  (value) =>
                    value !== ""
                )
                .join(" ");
            })
            .filter(Boolean),

        recipeInstructions:
          mappedRecipe.steps
            ?.map((step) => ({
              "@type":
                "HowToStep",

              position:
                step.order,

              text:
                step.description,
            }))
            .filter(
              (step) =>
                step.text
            ),
      };
    }, [mappedRecipe]);

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
      structureData={
        recipeStructuredData
      }
    />
  );
}