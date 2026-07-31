/**
 * Reusable section header.
 */

import { classNames } from "@/utils";

import styles from "./SectionHeader.module.scss";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  headingId,
  className,
}) {
  return (
    <header
      className={classNames(
        styles.header,
        styles[`align-${align}`],
        className
      )}
    >
      <div className={styles.content}>
        {eyebrow ? (
          <p className={styles.eyebrow}>
            {eyebrow}
          </p>
        ) : null}

        <h2
          id={headingId}
          className={styles.title}
        >
          {title}
        </h2>

        {description ? (
          <p className={styles.description}>
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className={styles.action}>
          {action}
        </div>
      ) : null}
    </header>
  );
}