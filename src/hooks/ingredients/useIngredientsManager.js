import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  PAGINATION,
} from "@/constants";

import {
  getAdminIngredients,
} from "@/services";

export function useIngredientsManager() {
  const [ingredients, setIngredients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(
      PAGINATION.DEFAULT_PAGE_SIZE
    );

  const [totalItems, setTotalItems] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    let isCancelled = false;

    getAdminIngredients({
      page,
      pageSize,
      search,
    })
      .then(({ data, count }) => {
        if (isCancelled) {
          return;
        }

        setIngredients(data);
        setTotalItems(count);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load ingredients:",
          error
        );

        toast.error(
          "Impossible de charger les ingrédients."
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
  }, [
    page,
    pageSize,
    search,
  ]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSearchClear = () => {
    setSearch("");
    setPage(1);
  };

  const handlePageSizeChange = (
    nextPageSize
  ) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  return {
    ingredients,

    search,

    page,
    pageSize,
    totalItems,

    isLoading,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handlePageSizeChange,
  };
}