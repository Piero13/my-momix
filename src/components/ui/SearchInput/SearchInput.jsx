/**
 * Reusable search input with optional submit and clear actions.
 */

import { forwardRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

import { classNames } from "@/utils";

import styles from "./SearchInput.module.scss";

const SearchInput = forwardRef(function SearchInput(
  {
    id,
    name = "search",
    value,
    defaultValue,
    placeholder = "Rechercher...",
    ariaLabel = "Rechercher",
    className,
    inputClassName,
    disabled = false,
    required = false,
    autoComplete = "off",
    showSubmitButton = false,
    submitLabel = "Rechercher",
    onChange,
    onClear,
    ...props
  },
  ref
) {
  const hasValue =
    typeof value === "string"
      ? value.trim().length > 0
      : typeof defaultValue === "string" &&
        defaultValue.trim().length > 0;

  const handleClear = () => {
    if (disabled) {
      return;
    }

    onClear?.();
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.field}>
        <FiSearch
          className={styles.searchIcon}
          aria-hidden="true"
        />

        <input
            {...props}
            ref={ref}
            id={id}
            name={name}
            type="search"
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-label={ariaLabel}
            autoComplete={autoComplete}
            disabled={disabled}
            required={required}
            className={classNames(styles.input, inputClassName)}
            onChange={onChange}
        />

        {hasValue && onClear ? (
          <button
            type="button"
            className={styles.clearButton}
            aria-label="Effacer la recherche"
            disabled={disabled}
            onClick={handleClear}
          >
            <FiX aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {showSubmitButton ? (
        <button
          type="submit"
          className={styles.submitButton}
          disabled={disabled}
        >
          <FiSearch aria-hidden="true" />
          <span>{submitLabel}</span>
        </button>
      ) : null}
    </div>
  );
});

export default SearchInput;