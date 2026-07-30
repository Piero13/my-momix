/**
 * Generic application card.
 */

import Card from "react-bootstrap/Card";

import { classNames } from "@/utils";

import styles from "./AppCard.module.scss";

export default function AppCard({
  children,
  as,
  className,
  hoverable = false,
  padding = "default",
  ...props
}) {
  return (
    <Card
      as={as}
      className={classNames(
        styles.card,
        styles[padding],
        hoverable && styles.hoverable,
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}