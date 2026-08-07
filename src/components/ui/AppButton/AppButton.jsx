/**
 * Generic application button.
 */

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { classNames } from "@/utils";

import styles from "./AppButton.module.scss";

export default function AppButton({
  children,
  className,
  icon,
  iconPosition = "start",
  isLoading = false,
  loadingLabel = "Chargement...",
  disabled,
  type = "button",
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={classNames(styles.button, className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            aria-hidden="true"
            className={styles.spinner}
          />

          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "start" ? (
            <span className={styles.iconStart} aria-hidden="true">
              {icon}
            </span>
          ) : null}

          <span className={styles.label}>{children}</span>

          {icon && iconPosition === "end" ? (
            <span className={styles.iconEnd} aria-hidden="true">
              {icon}
            </span>
          ) : null}
        </>
      )}
    </Button>
  );
}