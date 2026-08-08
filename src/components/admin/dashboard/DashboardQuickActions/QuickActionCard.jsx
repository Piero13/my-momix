/**
 * Displays one quick administration action.
 */

import { Link } from "react-router-dom";

import { classNames } from "@/utils";

import styles from "./DashboardQuickActions.module.scss";

export default function QuickActionCard({
  to,
  icon: Icon,
  title,
  description,
  badgeCount = 0,
  variant = "default",
}) {
  return (
    <Link
      to={to}
      className={classNames(
        styles.card,
        styles[variant]
      )}
    >
      {badgeCount > 0 ? (
        <span
          className={styles.badge}
          aria-label={`${badgeCount} élément${
            badgeCount > 1 ? "s" : ""
          } en attente`}
        >
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      ) : null}

      <span
        className={styles.icon}
        aria-hidden="true"
      >
        <Icon />
      </span>

      <div className={styles.content}>
        <h3 className={styles.cardTitle}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>
      </div>
    </Link>
  );
}