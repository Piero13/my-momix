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
  updateRecipe,
} from "@/services/recipes";
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

    getRecipeById(recipeId)
      .then((recipe) => {
        if (isCancelled) {
          return;
        }

        if (!recipe) {
          throw new Error(
            "Recipe not found."
          );
        }

        reset(
          mapRecipeToFormValues(recipe)
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

    const payload = mapRecipeFormToPayload(
      values,
      user.id
    );

    if (
      mode === "edit" &&
      recipeId
    ) {
      return updateRecipe(
        recipeId,
        payload
      );
    }

    return createRecipe(payload);
  };

  return {
    form,
    saveRecipe,
    isLoadingRecipe,
    isSubmitting,
    isDirty,
  };
}