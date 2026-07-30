/**
 * Public navigation.
 */

import Nav from "react-bootstrap/Nav";

import { NavLink } from "react-router-dom";

import { NAVIGATION_ITEMS } from "@/constants";

import { classNames } from "@/utils";

import styles from "./Navigation.module.scss";

export default function Navigation({ onNavigate }) {
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
    </Nav>
  );
}