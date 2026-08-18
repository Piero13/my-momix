import {
  useEffect,
  useState,
} from "react";

import {
  getAppSettings,
} from "@/services";

export function usePublicSeoSettings() {
  const [settings, setSettings] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    let isCancelled = false;

    getAppSettings()
      .then((data) => {
        if (isCancelled) {
          return;
        }

        setSettings(data);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load public SEO settings:",
          error
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
  }, []);

  return {
    settings,
    isLoading,
  };
}