import {
  useEffect,
  useState,
} from "react";

import {
  getPublishedRecipeBySlug,
  getPublishedRecipeIngredients,
  getPublishedRecipeSteps,
  getPublishedRecipeTips,
  getSimilarPublishedRecipes,
} from "@/services";

export function usePublishedRecipeDetails(
  slug
) {
  const [recipe, setRecipe] =
    useState(null);

  const [ingredients, setIngredients] =
    useState([]);

  const [steps, setSteps] =
    useState([]);

  const [tips, setTips] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [
    similarRecipes,
    setSimilarRecipes,
  ] = useState([]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let isCancelled = false;

    getPublishedRecipeBySlug(slug)
      .then(async (recipeData) => {
        if (isCancelled) {
          return;
        }

        if (!recipeData) {
          throw new Error(
            "Recipe not found."
          );
        }

        const [
          recipeIngredients,
          recipeSteps,
          recipeTips,
          similarRecipesData,
        ] = await Promise.all([
          getPublishedRecipeIngredients(
            recipeData.id
          ),
          getPublishedRecipeSteps(
            recipeData.id
          ),
          getPublishedRecipeTips(
            recipeData.id
          ),
          getSimilarPublishedRecipes({
            recipeId:
              recipeData.id,

            categoryId:
              recipeData.categories?.id,

            limit: 3,
          }),
        ]);

        if (isCancelled) {
          return;
        }

        setRecipe(recipeData);
        setIngredients(
          recipeIngredients
        );
        setSteps(recipeSteps);
        setTips(recipeTips);
        setSimilarRecipes(similarRecipesData)
      })
      .catch((loadError) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load recipe details:",
          loadError
        );

        setError(loadError);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  return {
    recipe,
    ingredients,
    steps,
    tips,
    similarRecipes,

    isLoading,
    error,
  };
}