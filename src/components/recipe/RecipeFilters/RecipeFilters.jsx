/**
 * Recipe filters synchronized with the URL search parameters.
 */

import { useState } from "react";
import Form from "react-bootstrap/Form";
import { FiRotateCcw } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import {
  AppButton,
  SearchInput,
} from "@/components/ui";
import {
  RECIPE_DIFFICULTY_OPTIONS,
  RECIPE_MAX_TIME_OPTIONS,
} from "@/constants";

import styles from "./RecipeFilters.module.scss";

function RecipeSearchForm({
  initialSearchValue,
  searchParams,
  setSearchParams,
}) {
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedSearch = searchValue.trim();
    const nextSearchParams = new URLSearchParams(searchParams);

    if (normalizedSearch) {
      nextSearchParams.set("search", normalizedSearch);
    } else {
      nextSearchParams.delete("search");
    }

    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClear = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    setSearchValue("");

    nextSearchParams.delete("search");
    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  return (
    <form
      className={styles.searchForm}
      role="search"
      onSubmit={handleSubmit}
    >
      <div className={styles.group}>
        <label
          htmlFor="recipe-search"
          className={styles.label}
        >
          Rechercher
        </label>

        <SearchInput
          id="recipe-search"
          name="search"
          value={searchValue}
          placeholder="Nom, ingrédient..."
          ariaLabel="Rechercher une recette"
          showSubmitButton
          submitLabel="Rechercher"
          layout="stacked"
          onChange={handleChange}
          onClear={handleClear}
        />
      </div>
    </form>
  );
}

export default function RecipeFilters({
  categories = [],
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const difficultyParam = searchParams.get("difficulty") ?? "";
  const maxTimeParam = searchParams.get("maxTime") ?? "";

  const hasActiveFilters = Boolean(
    searchParam ||
    categoryParam ||
    difficultyParam ||
    maxTimeParam
  );

  const updateFilter = (name, value) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (value) {
      nextSearchParams.set(name, value);
    } else {
      nextSearchParams.delete(name);
    }

    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  const handleCategoryChange = (event) => {
    updateFilter("category", event.target.value);
  };

  const handleDifficultyChange = (event) => {
    updateFilter("difficulty", event.target.value);
  };

  const handleMaxTimeChange = (event) => {
    updateFilter("maxTime", event.target.value);
  };

  const handleReset = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.delete("search");
    nextSearchParams.delete("category");
    nextSearchParams.delete("difficulty");
    nextSearchParams.delete("maxTime");
    nextSearchParams.delete("page");

    setSearchParams(nextSearchParams);
  };

  return (
    <div className={styles.filters}>
      <RecipeSearchForm
        key={searchParam}
        initialSearchValue={searchParam}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className={styles.separator} />

      <Form.Group
        className={styles.group}
        controlId="recipe-category-filter"
      >
        <Form.Label className={styles.label}>
          Catégorie
        </Form.Label>

        <Form.Select
          value={categoryParam}
          onChange={handleCategoryChange}
        >
          <option value="">
            Toutes les catégories
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group
        className={styles.group}
        controlId="recipe-difficulty-filter"
      >
        <Form.Label className={styles.label}>
          Difficulté
        </Form.Label>

        <Form.Select
          value={difficultyParam}
          onChange={handleDifficultyChange}
        >
          {RECIPE_DIFFICULTY_OPTIONS.map(({ value, label }) => (
            <option key={value || "all"} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group
        className={styles.group}
        controlId="recipe-time-filter"
      >
        <Form.Label className={styles.label}>
          Durée maximale
        </Form.Label>

        <Form.Select
          value={maxTimeParam}
          onChange={handleMaxTimeChange}
        >
          {RECIPE_MAX_TIME_OPTIONS.map(({ value, label }) => (
            <option key={value || "all"} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {hasActiveFilters ? (
        <AppButton
          variant="outline-secondary"
          icon={<FiRotateCcw />}
          className={styles.resetButton}
          onClick={handleReset}
        >
          Réinitialiser les filtres
        </AppButton>
      ) : null}
    </div>
  );
}