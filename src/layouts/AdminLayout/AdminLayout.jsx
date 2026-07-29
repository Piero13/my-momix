/**
 * Administration layout.
 */

import { Outlet } from "react-router-dom";

import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}