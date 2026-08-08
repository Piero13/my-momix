/**
 * Generic select filter for administration toolbars.
 */

import { Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";

import { classNames } from "@/utils";

import styles from "./AdminFilterSelect.module.scss";

export default function AdminFilterSelect({
  id,
  label,
  value,
  options = [],
  placeholder = "Tous",
  icon: Icon = FiFilter,
  disabled = false,
  className,
  onChange,
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
        {Icon ? (
          <Icon aria-hidden="true" />
        ) : null}

        <span>{label}</span>
      </label>

      <Form.Select
        id={id}
        value={value}
        disabled={disabled}
        className={styles.select}
        onChange={onChange}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}