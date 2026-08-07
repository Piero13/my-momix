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

import { AppButton } from "@/components/ui";

import { useAuth } from "@/hooks";

import { classNames } from "@/utils";

import styles from "./Navigation.module.scss";

export default function Navigation({ onNavigate }) {
  const {
    isAuthenticated,
    isAdmin,
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
        <AppButton
          as={NavLink}
          to={ROUTES.LOGIN}
          variant="outline-primary"
          icon={<FiLogIn />}
        >
          Se connecter
        </AppButton>
      ) : (
        <AppButton
          variant="outline-danger"
          icon={<FiLogOut />}
          onClick={handleSignOut}
        >
          Déconnexion
        </AppButton>
      )}
    </Nav>
  );
}