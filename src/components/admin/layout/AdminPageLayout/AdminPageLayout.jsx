/**
 * Generic vertical layout for administration pages.
 */

import { classNames } from "@/utils";

import styles from "./AdminPageLayout.module.scss";

export default function AdminPageLayout({
  children,
  className,
}) {
  return (
    <div
      className={classNames(
        styles.page,
        className
      )}
    >
      {children}
    </div>
  );
}