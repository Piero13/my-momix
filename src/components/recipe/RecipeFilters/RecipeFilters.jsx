/**
 * Recipe filters synchronized with the URL search parameters.
 */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchInput } from "@/components/ui";

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

    setSearchParams(nextSearchParams);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClear = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    setSearchValue("");
    nextSearchParams.delete("search");

    setSearchParams(nextSearchParams);
  };

  return (
    <form
      className={styles.form}
      role="search"
      onSubmit={handleSubmit}
    >
      <div className={styles.group}>
        <label
          htmlFor="recipe-search"
          className={styles.label}
        >
          Rechercher une recette
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

export default function RecipeFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get("search") ?? "";

  return (
    <RecipeSearchForm
      key={searchParam}
      initialSearchValue={searchParam}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}