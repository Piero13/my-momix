import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useNavigate,
} from "react-router-dom";

import {
  GeneralInformationCard,
  TimesCard,
  ImageCard,
  IngredientsCard,
  PreparationStepsCard,
  TipsCard,
} from "@/components/admin";

import { AppButton } from "@/components/ui";
import { ROUTES } from "@/constants";
import { useRecipeForm } from "@/hooks";

import { getCategoryOptions } from "@/services";

import styles from "./RecipeEditor.module.scss";

export default function RecipeEditor({
  mode = "create",
  recipeId = null,
}) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const {
    form,
    saveRecipe,
    isLoadingRecipe,
    isSubmitting,
  } = useRecipeForm({
    mode,
    recipeId,
  });

  const {
    handleSubmit,
  } = form;

  const handleSave = async (values) => {
    try {
      const recipe =
        await saveRecipe(values);

      toast.success(
        mode === "edit"
          ? "Recette mise à jour."
          : "Recette créée."
      );

      navigate(ROUTES.RECIPES, {
        replace: true,
      });

      return recipe;
    } catch (error) {
      console.error(
        "Unable to save recipe:",
        error
      );

      toast.error(
        "Impossible d’enregistrer la recette."
      );
    }
  };

  useEffect(() => {
    let isCancelled = false;

    getCategoryOptions()
      .then((data) => {
        if (!isCancelled) {
          setCategories(data);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          console.error(
            "Unable to load recipe categories:",
            error
          );
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoadingRecipe) {
    return (
      <div
        role="status"
        aria-live="polite"
      >
        Chargement de la recette…
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        className={styles.editor}
        noValidate
        onSubmit={handleSubmit(handleSave)}
      >
        <div className={styles.mainColumn}>
          <GeneralInformationCard
            categories={categories}
          />

          <TimesCard />

          <IngredientsCard />

          <PreparationStepsCard />

          <TipsCard />
        </div>

        <aside className={styles.sideColumn}>
          <ImageCard />

          <AppButton
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Enregistrement…"
              : "Enregistrer"}
          </AppButton>
        </aside>
      </form>
    </FormProvider>
  );
}