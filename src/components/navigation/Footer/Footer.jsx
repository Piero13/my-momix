/**
 * Public application footer.
 */

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import { NAVIGATION_ITEMS, ROUTES } from "@/constants";
import Logo from "../Logo";

import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>

        <div className={styles.top}>

          <Logo />

          <Nav className={styles.navigation} as="nav">

            {NAVIGATION_ITEMS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={styles.link}
              >
                {label}
              </NavLink>
            ))}

          </Nav>

        </div>

        <hr className={styles.separator} />

        <div className={styles.bottom}>

          <p className={styles.copy}>
            © {currentYear} MyMomix
          </p>

          <Nav className={styles.legal}>

            <NavLink
              to={ROUTES.PRIVACY}
              className={styles.link}
            >
              Confidentialité
            </NavLink>

            <NavLink
              to={ROUTES.TERMS}
              className={styles.link}
            >
              Mentions légales
            </NavLink>

          </Nav>

        </div>

      </Container>
    </footer>
  );
}