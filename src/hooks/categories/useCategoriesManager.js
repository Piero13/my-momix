import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { PAGINATION } from "@/constants";
import { getAdminCategories } from "@/services";

export function useCategoriesManager() {
  const [categories, setCategories] =
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

    getAdminCategories({
      page,
      pageSize,
      search,
    })
      .then(({ data, count }) => {
        if (isCancelled) {
          return;
        }

        setCategories(data);
        setTotalItems(count);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load categories:",
          error
        );

        toast.error(
          "Impossible de charger les catégories."
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

  const refreshCategories = async () => {
    const {
      data,
      count,
    } = await getAdminCategories({
      page,
      pageSize,
      search,
    });

    setCategories(data);
    setTotalItems(count);

    return {
      data,
      count,
    };
  };

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
    categories,

    search,

    page,
    pageSize,
    totalItems,

    isLoading,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handlePageSizeChange,

    refreshCategories,
  };
}