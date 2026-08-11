import {
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { RECIPE_FORM_DEFAULT_VALUES } from "@/constants";
import { useAuth } from "@/hooks";
import {
  createRecipe,
  getRecipeById,
  getRecipeIngredients,
  getRecipeSteps,
  replaceRecipeIngredients,
  replaceRecipeSteps,
  updateRecipe,
  getRecipeTips,
  replaceRecipeTips,
} from "@/services";
import {
  mapRecipeFormToPayload,
  mapRecipeToFormValues,
} from "@/utils";

export function useRecipeForm({
  mode = "create",
  recipeId = null,
} = {}) {
  const { user } = useAuth();

  const [isLoadingRecipe, setIsLoadingRecipe] =
    useState(mode === "edit");

  const form = useForm({
    defaultValues: RECIPE_FORM_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const {
    reset,
    formState: {
      isSubmitting,
      isDirty,
    },
  } = form;

  useEffect(() => {
    if (
      mode !== "edit" ||
      !recipeId
    ) {
      return;
    }

    let isCancelled = false;

    Promise.all([
      getRecipeById(recipeId),
      getRecipeIngredients(recipeId),
      getRecipeSteps(recipeId),
      getRecipeTips(recipeId),
    ])
      .then(
        ([
          recipe,
          recipeIngredients,
          recipeSteps,
          recipeTips,
        ]) => {
          if (isCancelled) {
            return;
          }

          if (!recipe) {
            throw new Error(
              "Recipe not found."
            );
          }

          reset(
            mapRecipeToFormValues(
              recipe,
              recipeIngredients,
              recipeSteps,
              recipeTips,
            )
          );
        }
      )
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load recipe:",
          error
        );
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoadingRecipe(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [
    mode,
    recipeId,
    reset,
  ]);

  const saveRecipe = async (values) => {
    if (!user?.id) {
      throw new Error(
        "An authenticated user is required."
      );
    }

    const payload =
      mapRecipeFormToPayload(
        values,
        user.id
      );

    let savedRecipe;

    if (
      mode === "edit" &&
      recipeId
    ) {
      savedRecipe = await updateRecipe(
        recipeId,
        payload
      );
    } else {
      savedRecipe =
        await createRecipe(payload);
    }

    await replaceRecipeIngredients(
      savedRecipe.id,
      values.ingredients ?? []
    );

    const validIngredients =
      (values.ingredients ?? []).filter(
        (ingredient) =>
          ingredient.ingredientId
      );

    const validSteps =
      (values.steps ?? []).filter(
        (step) =>
          step.instruction?.trim()
      );

    await replaceRecipeIngredients(
      savedRecipe.id,
      validIngredients
    );

    await replaceRecipeSteps(
      savedRecipe.id,
      validSteps
    );

    const validTips =
      (values.tips ?? []).filter(
        (tip) =>
          typeof tip.content === "string" &&
          tip.content.trim()
      );

    await replaceRecipeTips(
      savedRecipe.id,
      validTips
    );

    return savedRecipe;
  };

  return {
    form,
    saveRecipe,
    isLoadingRecipe,
    isSubmitting,
    isDirty,
  };
}