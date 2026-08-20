/**
 * Reusable configurable pagination.
 */

import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

import { PAGINATION } from "@/constants/ui";

import styles from "./AppPagination.module.scss";

export default function AppPagination({
  currentPage,
  totalItems,
  pageSize,
  pageSizeOptions = PAGINATION.PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const firstItem =
    totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const lastItem = Math.min(
    currentPage * pageSize,
    totalItems
  );

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (event) => {
    onPageSizeChange(Number(event.target.value));
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.summary} aria-live="polite">
        {firstItem}–{lastItem} sur {totalItems} recettes
      </p>

      <div className={styles.controls}>
        <Form.Group
          className={styles.pageSize}
          controlId="recipe-page-size"
        >
          <Form.Label>Par page</Form.Label>

          <Form.Select
            value={pageSize}
            onChange={handlePageSizeChange}
            aria-label="Nombre de recettes par page"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Pagination className={styles.pagination}>
          <Pagination.Prev
            disabled={!canGoPrevious}
            onClick={handlePrevious}
            aria-label="Page précédente"
          >Précédent</Pagination.Prev>

          <Pagination.Item active>
            {currentPage}
          </Pagination.Item>

          <Pagination.Next
            disabled={!canGoNext}
            onClick={handleNext}
            aria-label="Page suivante"
          />
        </Pagination>
      </div>
    </div>
  );
}