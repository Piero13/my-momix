import { classNames } from "@/utils";

import styles from "./AdminStatusBadge.module.scss";

export default function AdminStatusBadge({
  label,
  variant = "default",
}) {
  return (
    <span
      className={classNames(
        styles.badge,
        styles[variant]
      )}
    >
      {label}
    </span>
  );
}