/**
 * Public application header.
 */
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Logo from "../Logo";
import Navigation from "../Navigation";

import styles from "./Header.module.scss";

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  function handleNavigate() {
    setExpanded(false);
  }

  return (
    <Navbar
      expand="lg"
      className={styles.header}
      expanded={expanded}
      sticky="top"
      onToggle={setExpanded}
    >
      <Container>
        <Logo />

        <Navbar.Toggle aria-controls="main-navigation" />

        <Navbar.Collapse id="main-navigation">
          <Navigation onNavigate={handleNavigate}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}