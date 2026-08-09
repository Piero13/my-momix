import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  PAGINATION,
} from "@/constants";
import {
  getAdminRecipes,
  getCategoryOptions,
} from "@/services";

export function useRecipesManager() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(PAGINATION.DEFAULT_PAGE_SIZE);

  const [totalItems, setTotalItems] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState(true);

  useEffect(() => {
    let isCancelled = false;

    getCategoryOptions()
      .then((data) => {
        if (!isCancelled) {
          setCategories(data);
        }
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load recipe categories:",
          error
        );

        toast.error(
          "Impossible de charger les catégories."
        );
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
    let isCancelled = false;

    getAdminRecipes({
      page,
      pageSize,
      search,
      categoryId: category,
      status,
    })
      .then(({ data, count }) => {
        if (isCancelled) {
          return;
        }

        setRecipes(data);
        setTotalItems(count);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load admin recipes:",
          error
        );

        toast.error(
          "Impossible de charger les recettes."
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
    category,
    status,
  ]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSearchClear = () => {
    setSearch("");
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handlePageSizeChange = (
    nextPageSize
  ) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  return {
    recipes,
    categories,

    search,
    category,
    status,

    page,
    pageSize,
    totalItems,

    isLoading,
    isLoadingCategories,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handleCategoryChange,
    handleStatusChange,
    handlePageSizeChange,
  };
}