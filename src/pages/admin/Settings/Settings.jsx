/**
 * Settings page.
 */

import {
  FormProvider,
} from "react-hook-form";

import toast from "react-hot-toast";

import {
  AdminPageLayout,
  AdminToolbar,
  GeneralSettingsCard,
  RecipeSettingsCard,
  SeoSettingsCard,
  AppButton,
  LoadingScreen,
} from "@/components";

import {
  useAppSettingsForm,
} from "@/hooks/settings";

import styles from "./Settings.module.scss";

export default function Settings() {
  const {
    form,
    saveSettings,
    resetSettings,

    isLoading,
    isSubmitting,
    isDirty,
  } = useAppSettingsForm();

  const {
    handleSubmit,
  } = form;

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleSave = async (values) => {
    try {
      await saveSettings(values);
    } catch (error) {
      console.error(
        "Unable to save settings:",
        error
      );

      toast.error(
        "Impossible d’enregistrer les paramètres."
      );
    }
  };

  return (
    <AdminPageLayout>
      <AdminToolbar
        title="Paramètres"
        description="Configurez les préférences générales de MyMomix."
      />

      <FormProvider {...form}>
        <form
          className={styles.form}
          onSubmit={
            handleSubmit(
              handleSave
            )
          }
        >
          <GeneralSettingsCard />

          <RecipeSettingsCard />

          <SeoSettingsCard />

          <div className={styles.saveArea}>
            <p
              className={styles.saveStatus}
              aria-live="polite"
            >
              {isDirty
                ? "Modifications non enregistrées"
                : "Toutes les modifications sont enregistrées"}
            </p>

            <div className={styles.actions}>
              <AppButton
                type="button"
                variant="outline-secondary"
                disabled={
                  isSubmitting ||
                  !isDirty
                }
                onClick={resetSettings}
              >
                Annuler les modifications
              </AppButton>

              <AppButton
                type="submit"
                variant="primary"
                disabled={
                  isSubmitting ||
                  !isDirty
                }
              >
                {isSubmitting
                  ? "Enregistrement…"
                  : "Enregistrer"}
              </AppButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </AdminPageLayout>
  );
}