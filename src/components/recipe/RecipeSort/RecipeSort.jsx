/**
 * Recipe sorting control synchronized with URL parameters.
 */

import Form from "react-bootstrap/Form";
import { FiSliders } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import {
  DEFAULT_RECIPE_SORT,
  RECIPE_SORT_OPTIONS,
  RECIPE_SORT_VALUES,
} from "@/constants";

import styles from "./RecipeSort.module.scss";

export default function RecipeSort() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedSort = searchParams.get("sort");

  const currentSort = RECIPE_SORT_VALUES.includes(requestedSort)
    ? requestedSort
    : DEFAULT_RECIPE_SORT;

  const handleSortChange = (event) => {
    const nextSort = event.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextSort === DEFAULT_RECIPE_SORT) {
      nextSearchParams.delete("sort");
    } else {
      nextSearchParams.set("sort", nextSort);
    }

    // A sorting change must always restart on the first page.
    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  return (
    <div className={styles.wrapper}>
      <FiSliders
        className={styles.icon}
        aria-hidden="true"
      />

      <Form.Group
        className={styles.group}
        controlId="recipe-sort"
      >
        <Form.Label className={styles.label}>
          Trier par
        </Form.Label>

        <Form.Select
          value={currentSort}
          aria-label="Trier les recettes"
          onChange={handleSortChange}
        >
          {RECIPE_SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
}