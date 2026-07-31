/**
 * Reusable empty state displayed when no content is available.
 */

import { FiInbox } from "react-icons/fi";

import { classNames } from "@/utils";

import styles from "./EmptyState.module.scss";

export default function EmptyState({
  title,
  description,
  icon: Icon = FiInbox,
  action,
  className,
}) {
  return (
    <div
      className={classNames(styles.emptyState, className)}
      role="status"
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon />
      </span>

      <h3 className={styles.title}>{title}</h3>

      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}

      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}