import { FiSearch } from "react-icons/fi";

import { SearchInput } from "@/components/ui";
import { classNames } from "@/utils";

import styles from "./AdminSearchInput.module.scss";

export default function AdminSearchInput({
  id = "admin-search",
  label = "Rechercher",
  placeholder = "Rechercher...",
  value,
  onChange,
  onClear,
  className,
  disabled = false,
}) {
  return (
    <div
      className={classNames(
        styles.wrapper,
        className
      )}
    >
      <label
        htmlFor={id}
        className={styles.label}
      >
        <FiSearch aria-hidden="true" />
        <span>{label}</span>
      </label>

      <SearchInput
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onClear={onClear}
      />
    </div>
  );
}