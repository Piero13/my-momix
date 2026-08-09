import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import { classNames } from "@/utils";

import styles from "./AdminIconAction.module.scss";

export default function AdminIconAction({
  icon: Icon,
  label,
  to,
  variant = "default",
  disabled = false,
  onClick,
  target,
  rel,
}) {
  const content = (
    <>
      <Icon aria-hidden="true" />
      <span className={styles.srOnly}>
        {label}
      </span>
    </>
  );

  const commonProps = {
    className: classNames(
      styles.action,
      styles[variant]
    ),
    "aria-label": label,
  };

  const element = to ? (
    <Link
      {...commonProps}
      to={to}
      target={target}
      rel={rel}
    >
      {content}
    </Link>
  ) : (
    <button
      {...commonProps}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          {label}
        </Tooltip>
      }
    >
      {element}
    </OverlayTrigger>
  );
}