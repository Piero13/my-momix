/**
 * Generic KPI card for administration dashboards.
 */

import { classNames } from "@/utils";

import styles from "./AdminKpiCard.module.scss";

export default function AdminKpiCard({
  title,
  value,
  icon: Icon,
  helper,
  variant = "default",
  loading = false,
}) {
  return (
    <article
      className={classNames(
        styles.card,
        styles[variant]
      )}
    >
      <div className={styles.header}>
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {Icon ? <Icon /> : null}
        </span>

        <span className={styles.title}>
          {title}
        </span>
      </div>

      {loading ? (
        <div
          className={styles.skeleton}
          aria-hidden="true"
        >
          <span className={styles.skeletonValue} />
          <span className={styles.skeletonHelper} />
        </div>
      ) : (
        <>
          <strong className={styles.value}>
            {value}
          </strong>

          {helper ? (
            <p className={styles.helper}>
              {helper}
            </p>
          ) : null}
        </>
      )}
    </article>
  );
}