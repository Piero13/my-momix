import {
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import {
  RECIPE_FORM_DEFAULT_VALUES,
} from "@/constants";
import { useAuth } from "@/hooks";

import {
  createRecipe,
  getRecipeById,
  getRecipeIngredients,
  getRecipeSteps,
  getRecipeTips,
  replaceRecipeIngredients,
  replaceRecipeSteps,
  replaceRecipeTips,
  updateRecipe,
  getAppSettings,
} from "@/services";

import {
  mapRecipeFormToPayload,
  mapRecipeToFormValues,
} from "@/utils";

import {
  validateRecipePublication,
} from "@/validators/recipe/validateRecipePublication";

export function useRecipeForm({
  mode = "create",
  recipeId = null,
} = {}) {
  const { user } = useAuth();

  const [isLoadingRecipe, setIsLoadingRecipe] =
    useState(true);

  const [existingRecipe, setExistingRecipe] =
    useState(null);

  const form = useForm({
    defaultValues:
      RECIPE_FORM_DEFAULT_VALUES,
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
    let isCancelled = false;

    if (mode === "create") {
      getAppSettings()
        .then((settings) => {
          if (isCancelled) {
            return;
          }

          const createDefaults = {
            ...RECIPE_FORM_DEFAULT_VALUES,

            servings:
              settings?.default_servings ??
              RECIPE_FORM_DEFAULT_VALUES.servings,

            difficulty:
              settings?.default_difficulty ??
              RECIPE_FORM_DEFAULT_VALUES.difficulty,

            status:
              settings?.default_recipe_status ??
              RECIPE_FORM_DEFAULT_VALUES.status,
          };

          reset(createDefaults);
        })
        .catch((error) => {
          if (isCancelled) {
            return;
          }

          console.error(
            "Unable to load recipe defaults:",
            error
          );

          /*
          * We keep the static fallback values.
          */
          reset(
            RECIPE_FORM_DEFAULT_VALUES
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
    }

    if (
      mode !== "edit" ||
      !recipeId
    ) {
      return;
    }

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

          setExistingRecipe(recipe);

          reset(
            mapRecipeToFormValues(
              recipe,
              recipeIngredients,
              recipeSteps,
              recipeTips
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

    /*
     * Validate publication before writing
     * anything to Supabase.
     */
    const publicationErrors =
      validateRecipePublication(values);

    if (publicationErrors.length > 0) {
      throw new Error(
        publicationErrors.join(" ")
      );
    }

    const payload =
      mapRecipeFormToPayload(
        values,
        user.id,
        existingRecipe
      );

    /*
     * Defensive filtering of dynamic fields.
     */
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

    const validTips =
      (values.tips ?? []).filter(
        (tip) =>
          typeof tip.content === "string" &&
          tip.content.trim()
      );

    let savedRecipe;

    if (
      mode === "edit" &&
      recipeId
    ) {
      savedRecipe =
        await updateRecipe(
          recipeId,
          payload
        );
    } else {
      savedRecipe =
        await createRecipe(payload);
    }

    /*
     * Keep the latest persisted recipe in memory.
     *
     * This is especially important for published_at:
     * a second save must preserve the first
     * publication date.
     */
    setExistingRecipe(savedRecipe);

    await replaceRecipeIngredients(
      savedRecipe.id,
      validIngredients
    );

    await replaceRecipeSteps(
      savedRecipe.id,
      validSteps
    );

    await replaceRecipeTips(
      savedRecipe.id,
      validTips
    );

    reset(values);

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