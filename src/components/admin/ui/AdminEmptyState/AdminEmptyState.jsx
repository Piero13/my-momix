/**
 * Generic empty state for administration pages.
 */

import { FiInbox } from "react-icons/fi";

import { classNames } from "@/utils";

import styles from "./AdminEmptyState.module.scss";

export default function AdminEmptyState({
  icon: Icon = FiInbox,
  title = "Aucune donnée",
  description = "Aucun élément à afficher pour le moment.",
  action,
  compact = false,
  className,
}) {
  return (
    <div
      className={classNames(
        styles.emptyState,
        compact && styles.compact,
        className
      )}
    >
      {Icon ? (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          <Icon />
        </span>
      ) : null}

      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>

        {description ? (
          <p className={styles.description}>
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className={styles.action}>
          {action}
        </div>
      ) : null}
    </div>
  );
}