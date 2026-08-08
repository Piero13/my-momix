/**
 * Generic pagination for administration lists.
 */

import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { classNames } from "@/utils";

import styles from "./AdminPagination.module.scss";

function getVisiblePages(
  currentPage,
  totalPages
) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const pages = [1];

  if (currentPage > 4) {
    pages.push("start-ellipsis");
  }

  const start = Math.max(
    2,
    currentPage - 1
  );

  const end = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("end-ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

export default function AdminPagination({
  page = 1,
  pageSize = 10,
  totalItems = 0,
  pageSizeOptions = [10, 20, 30, 50],
  disabled = false,
  className,
  onPageChange,
  onPageSizeChange,
  id = "admin-pagination",
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const firstItem =
    totalItems === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const lastItem = Math.min(
    page * pageSize,
    totalItems
  );

  const visiblePages =
    getVisiblePages(page, totalPages);

  const handlePageChange = (nextPage) => {
    if (
      disabled ||
      nextPage < 1 ||
      nextPage > totalPages ||
      nextPage === page
    ) {
      return;
    }

    onPageChange?.(nextPage);
  };

  const handlePageSizeChange = (event) => {
    const nextPageSize = Number(
      event.target.value
    );

    onPageSizeChange?.(nextPageSize);
  };

  if (
    totalItems === 0 &&
    pageSizeOptions.length === 0
  ) {
    return null;
  }

  return (
    <nav
      className={classNames(
        styles.pagination,
        className
      )}
      aria-label="Pagination"
    >
      <div className={styles.pageSize}>
        <label
          htmlFor={`${id}-page-size`}
          className={styles.pageSizeLabel}
        >
          Par page
        </label>

        <select
          id={`${id}-page-size`}
          value={pageSize}
          className={styles.pageSizeSelect}
          disabled={disabled}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navigationButton}
          aria-label="Page précédente"
          disabled={
            disabled ||
            page <= 1 ||
            totalItems === 0
          }
          onClick={() =>
            handlePageChange(page - 1)
          }
        >
          <FiChevronLeft aria-hidden="true" />
        </button>

        {visiblePages.map((item) => {
          if (
            item === "start-ellipsis" ||
            item === "end-ellipsis"
          ) {
            return (
              <span
                key={item}
                className={styles.ellipsis}
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          return (
            <button
              key={item}
              type="button"
              className={classNames(
                styles.pageButton,
                item === page &&
                  styles.active
              )}
              aria-label={`Page ${item}`}
              aria-current={
                item === page
                  ? "page"
                  : undefined
              }
              disabled={disabled}
              onClick={() =>
                handlePageChange(item)
              }
            >
              {item}
            </button>
          );
        })}

        <button
          type="button"
          className={styles.navigationButton}
          aria-label="Page suivante"
          disabled={
            disabled ||
            page >= totalPages ||
            totalItems === 0
          }
          onClick={() =>
            handlePageChange(page + 1)
          }
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className={styles.summary}>
        {totalItems > 0 ? (
          <span>
            {firstItem}–{lastItem} sur{" "}
            {totalItems}
          </span>
        ) : (
          <span>Aucun résultat</span>
        )}
      </div>
    </nav>
  );
}