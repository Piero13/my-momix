/**
 * Displays one nutrition metric.
 */

import styles from "./RecipeNutrition.module.scss";

export default function NutritionItem({
  icon: Icon,
  label,
  value,
  unit,
  featured = false,
}) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const formattedValue = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1,
  }).format(Number(value));

  return (
    <li
      className={
        featured
          ? `${styles.item} ${styles.featured}`
          : styles.item
      }
    >
      <span
        className={styles.itemIcon}
        aria-hidden="true"
      >
        <Icon />
      </span>

      <div className={styles.itemContent}>
        <span className={styles.itemLabel}>
          {label}
        </span>

        <span className={styles.itemValue}>
          <strong>{formattedValue}</strong>

          <span className={styles.itemUnit}>
            {unit}
          </span>
        </span>
      </div>
    </li>
  );
}