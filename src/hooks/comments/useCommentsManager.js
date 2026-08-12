import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { PAGINATION } from "@/constants";
import { getAdminComments } from "@/services";

export function useCommentsManager() {
  const [comments, setComments] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("pending");

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

    getAdminComments({
      page,
      pageSize,
      search,
      status,
    })
      .then(({ data, count }) => {
        if (isCancelled) {
          return;
        }

        setComments(data);
        setTotalItems(count);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load comments:",
          error
        );

        toast.error(
          "Impossible de charger les commentaires."
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
    status,
  ]);

  const refreshComments = async () => {
    const {
      data,
      count,
    } = await getAdminComments({
      page,
      pageSize,
      search,
      status,
    });

    setComments(data);
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
    comments,

    search,
    status,

    page,
    pageSize,
    totalItems,

    isLoading,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handleStatusChange,
    handlePageSizeChange,

    refreshComments,
  };
}