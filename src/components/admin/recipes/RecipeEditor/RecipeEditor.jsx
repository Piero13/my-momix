import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useNavigate,
} from "react-router-dom";

import {
  AdminConfirmModal,
  GeneralInformationCard,
  TimesCard,
  ImageCard,
  IngredientsCard,
  PreparationStepsCard,
  TipsCard,
  SeoCard,
  PublicationCard,
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

  const [
    showLeaveConfirmation,
    setShowLeaveConfirmation,
  ] = useState(false);

  const [categories, setCategories] = useState([]);

  const {
    form,
    saveRecipe,
    isLoadingRecipe,
    isSubmitting,
    isDirty,
  } = useRecipeForm({
    mode,
    recipeId,
  });

  useEffect(() => {
    if (!isDirty || isSubmitting) {
      return;
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();

      // Required for older browser behavior.
      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [
    isDirty,
    isSubmitting,
  ]);  

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

  const handleCancel = () => {
    if (isSubmitting) {
      return;
    }

    if (isDirty) {
      setShowLeaveConfirmation(true);
      return;
    }

    navigate(ROUTES.RECIPES);
  };

  const handleConfirmLeave = () => {
    setShowLeaveConfirmation(false);

    navigate(ROUTES.RECIPES);
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

          <SeoCard />
        </div>

        <aside className={styles.sideColumn}>
          <ImageCard />

          <PublicationCard />

          <div className={styles.actions}>
            <AppButton
              type="button"
              variant="outline-secondary"
              disabled={isSubmitting}
              onClick={handleCancel}
            >
              Annuler
            </AppButton>

            <AppButton
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enregistrement…"
                : "Enregistrer"}
            </AppButton>
          </div>

          <p
            className={styles.saveStatus}
            aria-live="polite"
          >
            {isDirty
              ? "Modifications non enregistrées"
              : "Toutes les modifications sont enregistrées"}
          </p>
        </aside>
      </form>

      <AdminConfirmModal
        show={showLeaveConfirmation}
        title="Quitter sans enregistrer ?"
        message="Des modifications non enregistrées seront perdues."
        description="Voulez-vous vraiment revenir à la liste des recettes ?"
        confirmLabel="Quitter"
        cancelLabel="Rester"
        variant="warning"
        isLoading={false}
        onCancel={() =>
          setShowLeaveConfirmation(false)
        }
        onConfirm={handleConfirmLeave}
      />
    </FormProvider>
  );
}