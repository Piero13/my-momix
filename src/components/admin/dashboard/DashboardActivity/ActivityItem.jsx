/**
 * Displays one dashboard activity item.
 */

import {
  FiArchive,
  FiBookOpen,
  FiCheckCircle,
  FiEdit3,
  FiMessageSquare,
  FiXCircle,
} from "react-icons/fi";

import { classNames, formatRelativeDate } from "@/utils";

import styles from "./DashboardActivity.module.scss";

function getActivityPresentation(activity) {
  if (activity.type === "comment") {
    switch (activity.status) {
      case "approved":
        return {
          icon: FiCheckCircle,
          variant: "success",
        };

      case "rejected":
        return {
          icon: FiXCircle,
          variant: "danger",
        };

      case "pending":
      default:
        return {
          icon: FiMessageSquare,
          variant: "warning",
        };
    }
  }

  switch (activity.status) {
    case "published":
      return {
        icon: FiCheckCircle,
        variant: "success",
      };

    case "archived":
      return {
        icon: FiArchive,
        variant: "muted",
      };

    case "draft":
      return {
        icon: FiEdit3,
        variant: "primary",
      };

    default:
      return {
        icon: FiBookOpen,
        variant: "default",
      };
  }
}

export default function ActivityItem({ activity }) {
  const {
    icon: Icon,
    variant,
  } = getActivityPresentation(activity);

  return (
    <li className={styles.item}>
      <div
        className={classNames(
          styles.icon,
          styles[variant]
        )}
        aria-hidden="true"
      >
        <Icon />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h3 className={styles.itemTitle}>
            {activity.title}
          </h3>

          <time
            className={styles.date}
            dateTime={activity.date}
          >
            {formatRelativeDate(activity.date)}
          </time>
        </div>

        <p className={styles.description}>
          {activity.description}
        </p>
      </div>
    </li>
  );
}