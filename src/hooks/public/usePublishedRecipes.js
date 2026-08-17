import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";

import {
  DEFAULT_RECIPE_SORT,
} from "@/constants";

import {
  getPublishedRecipes,
  getPublicCategories,
} from "@/services";

import { useFavorites } from "../favorites";

export function usePublishedRecipes({
  initialPage = 1,
  initialPageSize = 10,
} = {}) {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [recipes, setRecipes] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [totalRecipes, setTotalRecipes] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(true);
  
  const [error, setError] = useState(null);
  
  const {
    favoriteIds,
  } = useFavorites();

  const favoritesOnly = searchParams.get("favorites") === "1";

  const hasActiveFavorites = favoritesOnly;

  const [
    isLoadingCategories,
    setIsLoadingCategories,
  ] = useState(true);

  const requestIdRef =
    useRef(0);

  const searchQuery =
    searchParams.get("search") ?? "";

  const categorySlug =
    searchParams.get("category") ?? "";

  const difficultySlug =
    searchParams.get("difficulty") ?? "";

  const maxTimeParam =
    searchParams.get("maxTime");

  const maxTime =
    maxTimeParam
      ? Number(maxTimeParam)
      : null;

  const sort =
    searchParams.get("sort") ??
    DEFAULT_RECIPE_SORT;

  const currentPage =
    Math.max(
      1,
      Number(
        searchParams.get("page")
      ) || initialPage
    );

  const pageSize =
    Math.max(
      1,
      Number(
        searchParams.get("pageSize")
      ) || initialPageSize
    );

  const categoryId = useMemo(() => {
    if (!categorySlug) {
      return "";
    }

    return (
      categories.find(
        (category) =>
          category.slug ===
          categorySlug
      )?.id ?? ""
    );
  }, [
    categories,
    categorySlug,
  ]);

  const hasActiveSearch =
    Boolean(searchQuery.trim());

  const hasActiveCategory =
    Boolean(categorySlug);

  const hasActiveDifficulty =
    Boolean(difficultySlug);

  const hasActiveMaxTime =
    Number.isFinite(maxTime) &&
    maxTime > 0;

  const hasActiveFilters =
    hasActiveSearch ||
    hasActiveCategory ||
    hasActiveDifficulty ||
    hasActiveMaxTime ||
    hasActiveFavorites;

  useEffect(() => {
    let isCancelled = false;

    getPublicCategories()
      .then((data) => {
        if (isCancelled) {
          return;
        }

        setCategories(data ?? []);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load public categories:",
          error
        );

        setCategories([]);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoadingCategories(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (
      categorySlug &&
      isLoadingCategories
    ) {
      return;
    }

    const requestId =
      ++requestIdRef.current;

    let isCancelled = false;

    getPublishedRecipes({
      page: currentPage,
      pageSize,

      search:
        searchQuery,

      categoryId,

      difficulty:
        difficultySlug,

      maxTime:
        hasActiveMaxTime
          ? maxTime
          : null,

      sort,

      favoriteIds:
        favoritesOnly
          ? favoriteIds
          : null,
    })
      .then(({ data, count }) => {
        if (
          isCancelled ||
          requestId !==
            requestIdRef.current
        ) {
          return;
        }

        setRecipes(data ?? []);
        setTotalRecipes(count ?? 0);
        setError(null);
      })
      .catch((loadError) => {
        if (
          isCancelled ||
          requestId !==
            requestIdRef.current
        ) {
          return;
        }

        console.error(
          "Unable to load published recipes:",
          loadError
        );

        setRecipes([]);
        setTotalRecipes(0);
        setError(loadError);
      })
      .finally(() => {
        if (
          !isCancelled &&
          requestId ===
            requestIdRef.current
        ) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [
    currentPage,
    pageSize,
    searchQuery,
    categorySlug,
    categoryId,
    difficultySlug,
    maxTime,
    hasActiveMaxTime,
    sort,
    isLoadingCategories,
    favoriteIds,
    favoritesOnly,
  ]);

  const handlePageChange = (
    nextPage
  ) => {
    setIsLoading(true);

    const nextSearchParams =
      new URLSearchParams(
        searchParams
      );

    if (nextPage <= 1) {
      nextSearchParams.delete(
        "page"
      );
    } else {
      nextSearchParams.set(
        "page",
        String(nextPage)
      );
    }

    setSearchParams(
      nextSearchParams
    );
  };

  const handlePageSizeChange = (
    nextPageSize
  ) => {
    setIsLoading(true);

    const nextSearchParams =
      new URLSearchParams(
        searchParams
      );

    nextSearchParams.set(
      "pageSize",
      String(nextPageSize)
    );

    nextSearchParams.delete(
      "page"
    );

    setSearchParams(
      nextSearchParams
    );
  };

  return {
    recipes,
    categories,

    searchQuery,
    categorySlug,
    difficultySlug,
    maxTime,
    sort,

    hasActiveSearch,
    hasActiveCategory,
    hasActiveDifficulty,
    hasActiveMaxTime,
    hasActiveFilters,
    hasActiveFavorites,

    totalRecipes,

    currentPage,
    pageSize,

    isLoading,
    isLoadingCategories,

    error,

    handlePageChange,
    handlePageSizeChange,
  };
}