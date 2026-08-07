/**
 * Administration dashboard page.
 */

import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { DashboardKpis } from "@/components/admin";
import { getDashboardMetrics } from "@/services";

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    getDashboardMetrics()
      .then((data) => {
        if (isCancelled) {
          return;
        }

        setMetrics(data);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error(
          "Unable to load dashboard metrics:",
          error
        );

        toast.error(
          "Impossible de charger les indicateurs du Dashboard."
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
    </div>
  );
}