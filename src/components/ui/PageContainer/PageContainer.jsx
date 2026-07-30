/**
 * Reusable page container.
 */

import Container from "react-bootstrap/Container";

import { classNames } from "@/utils";

import styles from "./PageContainer.module.scss";

export default function PageContainer({
  children,
  as = "div",
  className,
  fluid = false,
}) {
  return (
    <Container
      as={as}
      fluid={fluid}
      className={classNames(styles.container, className)}
    >
      {children}
    </Container>
  );
}