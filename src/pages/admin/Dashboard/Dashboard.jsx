/**
 * Administration dashboard page.
 */

import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  DashboardActivity,
  DashboardKpis,
  DashboardQuickActions,
} from "@/components/admin";

import {
  getDashboardMetrics,
  getRecentActivity,
} from "@/services/dashboard";

import styles from "./Dashboard.module.scss";

const INITIAL_METRICS = {
  recipes: 0,
  publishedRecipes: 0,
  draftRecipes: 0,
  archivedRecipes: 0,
  categories: 0,
  pendingComments: 0,
  approvedComments: 0,
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState(
    INITIAL_METRICS
  );

  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    Promise.all([
      getDashboardMetrics(),
      getRecentActivity(5),
    ])
      .then(([metricsData, activityData]) => {
        if (isCancelled) {
          return;
        }

        setMetrics(metricsData);
        setActivities(activityData);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load dashboard data:",
          error
        );

        toast.error(
          "Impossible de charger les données du Dashboard."
        );
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardKpis
        metrics={metrics}
        loading={isLoading}
      />


        <DashboardQuickActions
          pendingCommentsCount={
            metrics.pendingComments
          }
        />

        <DashboardActivity
          activities={activities}
          loading={isLoading}
        />
    </div>
  );
}