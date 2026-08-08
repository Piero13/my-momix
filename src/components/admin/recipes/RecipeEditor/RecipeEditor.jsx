import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useNavigate,
} from "react-router-dom";

import { AppButton } from "@/components/ui";
import { ROUTES } from "@/constants";
import { useRecipeForm } from "@/hooks";

import styles from "./RecipeEditor.module.scss";

export default function RecipeEditor({
  mode = "create",
  recipeId = null,
}) {
  const navigate = useNavigate();

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
          <section>
            <h2>
              Informations générales
            </h2>

            <p>
              Le formulaire sera construit dans les prochaines étapes.
            </p>
          </section>
        </div>

        <aside className={styles.sideColumn}>
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