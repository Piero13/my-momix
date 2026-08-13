import {
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  getAppSettings,
  updateAppSettings,
} from "@/services";

import {
  mapAppSettingsToFormValues,
} from "@/utils";

const SETTINGS_DEFAULT_VALUES = {
  appName: "MyMomix",
  appDescription: "",
  publicUrl: "",

  defaultServings: 4,
  defaultDifficulty: "easy",
  defaultRecipeStatus: "draft",

  metaTitle: "",
  metaDescription: "",
};

export function useAppSettingsForm() {
  const [
    settingsId,
    setSettingsId,
  ] = useState(null);

  const [
    savedValues,
    setSavedValues,
  ] = useState(
    SETTINGS_DEFAULT_VALUES
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const form = useForm({
    defaultValues:
      SETTINGS_DEFAULT_VALUES,
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

    getAppSettings()
      .then((settings) => {
        if (isCancelled) {
          return;
        }

        if (!settings) {
          throw new Error(
            "App settings not found."
          );
        }

        const formValues =
          mapAppSettingsToFormValues(
            settings
          );

        setSettingsId(
          settings.id
        );

        setSavedValues(
          formValues
        );

        reset(
          formValues
        );
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load app settings:",
          error
        );

        toast.error(
          "Impossible de charger les paramètres."
        );
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [reset]);

  const saveSettings =
    async (values) => {
      if (!settingsId) {
        throw new Error(
          "Settings id is required."
        );
      }

      const updatedSettings =
        await updateAppSettings(
          settingsId,
          values
        );

      const formValues =
        mapAppSettingsToFormValues(
          updatedSettings
        );

      setSavedValues(
        formValues
      );

      reset(
        formValues
      );

      toast.success(
        "Paramètres enregistrés."
      );

      return updatedSettings;
    };

  const resetSettings = () => {
    reset(
      savedValues
    );
  };

  return {
    form,
    saveSettings,
    resetSettings,

    isLoading,
    isSubmitting,
    isDirty,
  };
}