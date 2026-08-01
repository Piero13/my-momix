/**
 * Displays one Thermomix step metadata item.
 */

import styles from "./RecipeSteps.module.scss";

export default function StepMeta({
  icon: Icon,
  label,
  value,
}) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  return (
    <span className={styles.meta}>
      <span
        className={styles.metaIcon}
        aria-hidden="true"
      >
        <Icon />
      </span>

      <span className={styles.metaContent}>
        <span className={styles.metaLabel}>
          {label}
        </span>

        <strong className={styles.metaValue}>
          {value}
        </strong>
      </span>
    </span>
  );
}