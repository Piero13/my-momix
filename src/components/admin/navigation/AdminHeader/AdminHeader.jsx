/**
 * Administration header.
 */

import {
  FiMenu,
  FiUser,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

import { ADMIN_NAVIGATION_ITEMS } from "@/constants";
import { useAuth } from "@/hooks";

import styles from "./AdminHeader.module.scss";

function getCurrentPageTitle(pathname) {
  const currentItem = ADMIN_NAVIGATION_ITEMS.find(
    ({ path }) =>
      pathname === path ||
      pathname.startsWith(`${path}/`)
  );

  return currentItem?.label ?? "Administration";
}

export default function AdminHeader({
  onMenuToggle,
}) {
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle = getCurrentPageTitle(
    location.pathname
  );

  return (
    <header className={styles.header}>
      <div className={styles.leading}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Ouvrir la navigation de l’administration"
          onClick={onMenuToggle}
        >
          <FiMenu aria-hidden="true" />
        </button>

        <div className={styles.pageInfo}>
          <p className={styles.eyebrow}>
            Administration
          </p>

          <h1 className={styles.title}>
            {pageTitle}
          </h1>
        </div>
      </div>

      <div className={styles.user}>
        <span
          className={styles.userIcon}
          aria-hidden="true"
        >
          <FiUser />
        </span>

        <div className={styles.userContent}>
          <span className={styles.userLabel}>
            Administrateur
          </span>

          <span className={styles.userEmail}>
            {user?.email ?? "Compte connecté"}
          </span>
        </div>
      </div>
    </header>
  );
}