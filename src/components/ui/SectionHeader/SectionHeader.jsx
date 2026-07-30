/**
 * Reusable section heading.
 */

import { classNames } from "@/utils";

import styles from "./SectionHeader.module.scss";

export default function SectionHeader({
  title,
  description,
  action,
  headingId,
  align = "start",
  className,
}) {
  return (
    <header
      className={classNames(
        styles.header,
        styles[align],
        className
      )}
    >
      <div className={styles.content}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>

        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
      </div>

      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
}