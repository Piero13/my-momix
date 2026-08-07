import { useEffect } from "react";

import {
  getDashboardMetrics,
  getPendingCommentsCount,
  getRecentActivity,
} from "@/services";

export default function Dashboard() {
  useEffect(() => {
    async function testDashboardServices() {
      try {
        const [
          metrics,
          pendingComments,
          activity,
        ] = await Promise.all([
          getDashboardMetrics(),
          getPendingCommentsCount(),
          getRecentActivity(),
        ]);

        console.log("Dashboard metrics:", metrics);
        console.log(
          "Pending comments:",
          pendingComments
        );
        console.log(
          "Recent activity:",
          activity
        );
      } catch (error) {
        console.error(
          "Dashboard service test failed:",
          error
        );
      }
    }

    void testDashboardServices();
  }, []);

  return (
    <section>
      <h2>Dashboard</h2>
    </section>
  );
}