/**
 * Displays the latest administration activity.
 */

import { FiActivity } from "react-icons/fi";

import ActivityItem from "./ActivityItem";
import styles from "./DashboardActivity.module.scss";

const SKELETON_ITEMS = 5;

export default function DashboardActivity({
  activities = [],
  loading = false,
}) {
  return (
    <section
      className={styles.section}
      aria-labelledby="dashboard-activity-title"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <span
            className={styles.headingIcon}
            aria-hidden="true"
          >
            <FiActivity />
          </span>

          <div>
            <p className={styles.eyebrow}>
              Suivi
            </p>

            <h2
              id="dashboard-activity-title"
              className={styles.title}
            >
              Activité récente
            </h2>
          </div>
        </div>
      </header>

      {loading ? (
        <ul
          className={styles.list}
          aria-hidden="true"
        >
          {Array.from({
            length: SKELETON_ITEMS,
          }).map((_, index) => (
            <li
              key={index}
              className={styles.skeletonItem}
            >
              <span className={styles.skeletonIcon} />

              <div className={styles.skeletonContent}>
                <span className={styles.skeletonTitle} />
                <span className={styles.skeletonText} />
              </div>
            </li>
          ))}
        </ul>
      ) : activities.length > 0 ? (
        <ul className={styles.list}>
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>
            Aucune activité récente
          </p>

          <p className={styles.emptyDescription}>
            Les nouvelles recettes et les commentaires
            apparaîtront ici.
          </p>
        </div>
      )}
    </section>
  );
}