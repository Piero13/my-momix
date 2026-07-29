/**
 * Public application layout.
 */

import { Outlet } from "react-router-dom";

import styles from "./PublicLayout.module.scss";

export default function PublicLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}