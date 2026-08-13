import {
  useEffect,
  useState,
} from "react";

import {
  getLatestPublishedRecipes,
  getPopularCategories,
} from "@/services";

export function useHomeData() {
  const [latestRecipes, setLatestRecipes] =
    useState([]);

  const [
    popularCategories,
    setPopularCategories,
  ] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    let isCancelled = false;

    Promise.all([
      getLatestPublishedRecipes(3),
      getPopularCategories(4),
    ])
      .then(
        ([
          recipes,
          categories,
        ]) => {
          if (isCancelled) {
            return;
          }

          setLatestRecipes(
            recipes
          );

          setPopularCategories(
            categories
          );
        }
      )
      .catch((loadError) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load home data:",
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
  }, []);

  return {
    latestRecipes,
    popularCategories,
    isLoading,
    error,
  };
}