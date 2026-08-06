/**
 * Public navigation.
 */
import {
  FiLogIn,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

import Nav from "react-bootstrap/Nav";

import { NavLink, useNavigate } from "react-router-dom";

import { NAVIGATION_ITEMS, ROUTES } from "@/constants";

import { useAuth } from "@/hooks";

import { classNames } from "@/utils";

import styles from "./Navigation.module.scss";

export default function Navigation({ onNavigate }) {
  const {
    isAuthenticated,
    isAdmin,
    isLoading,
    signOut,
  } = useAuth();

  const navigate = useNavigate();

  const getLinkClassName = ({ isActive }) =>
    classNames(
      styles.linkButton,
      isActive && styles.active
    );

  const handleLinkClick = () => {
    onNavigate?.();
  };

  const handleSignOut = async () => {
    try {
      await signOut();

      onNavigate?.();

      navigate(ROUTES.HOME, {
        replace: true,
      });
    } catch (error) {
      console.error("Navbar sign out failed:", error);
    }
  };

  return (
    <Nav className={classNames(styles.navigation, "ms-auto")}>
      {NAVIGATION_ITEMS.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            classNames(
              styles.link,
              isActive && styles.active
            )
          }
        >
          {label}
        </NavLink>
      ))}

      {isAuthenticated && isAdmin ? (
        <NavLink
          to={ROUTES.DASHBOARD}
          className={getLinkClassName}
          onClick={handleLinkClick}
        >
          <FiSettings className={styles.linkIcon} aria-hidden="true" />
          <span>Admin</span>
        </NavLink>
      ) : null}

      {!isAuthenticated ? (
        <NavLink
          to={ROUTES.LOGIN}
          className={getLinkClassName}
          onClick={handleLinkClick}
        >
          <FiLogIn className={styles.loginIcon} aria-hidden="true" />
          <span>Se connecter</span>
        </NavLink>
      ) : (
        <button
          type="button"
          className={classNames(
            styles.linkButton,
            styles.logoutButton
          )}
          disabled={isLoading}
          onClick={handleSignOut}
        >
          <FiLogOut className={styles.logoutIcon} aria-hidden="true" />
          <span>Déconnexion</span>
        </button>
      )}
    </Nav>
  );
}