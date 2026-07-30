/**
 * Reusable content section.
 */

import { classNames } from "@/utils";

import styles from "./Section.module.scss";

export default function Section({
  children,
  as: Component = "section",
  className,
  spacing = "default",
  labelledBy,
}) {
  return (
    <Component
      className={classNames(
        styles.section,
        styles[spacing],
        className
      )}
      aria-labelledby={labelledBy}
    >
      {children}
    </Component>
  );
}