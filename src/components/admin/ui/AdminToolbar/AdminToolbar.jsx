/**
 * Generic administration toolbar.
 */

import { classNames } from "@/utils";

import styles from "./AdminToolbar.module.scss";

export default function AdminToolbar({
  title,
  description,
  action,
  children,
  className,
}) {
  return (
    <section
      className={classNames(
        styles.toolbar,
        className
      )}
      aria-labelledby="admin-toolbar-title"
    >
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2
            id="admin-toolbar-title"
            className={styles.title}
          >
            {title}
          </h2>

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

      {children ? (
        <div className={styles.controls}>
          {children}
        </div>
      ) : null}
    </section>
  );
}