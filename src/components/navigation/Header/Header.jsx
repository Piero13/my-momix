/**
 * Public application header.
 */

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Logo from "../Logo";
import Navigation from "../Navigation";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <Navbar
      expand="lg"
      className={styles.header}
      sticky="top"
    >
      <Container>
        <Logo />

        <Navbar.Toggle aria-controls="main-navigation" />

        <Navbar.Collapse id="main-navigation">
          <Navigation />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}