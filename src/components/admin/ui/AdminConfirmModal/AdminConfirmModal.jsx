/**
 * Generic confirmation modal for administration actions.
 */

import { Modal } from "react-bootstrap";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

import { AppButton } from "@/components/ui";
import { classNames } from "@/utils";

import styles from "./AdminConfirmModal.module.scss";

const VARIANT_CONFIG = {
  danger: {
    icon: FiAlertTriangle,
    confirmVariant: "danger",
  },
  warning: {
    icon: FiAlertTriangle,
    confirmVariant: "warning",
  },
  success: {
    icon: FiCheckCircle,
    confirmVariant: "success",
  },
  default: {
    icon: FiInfo,
    confirmVariant: "primary",
  },
};

export default function AdminConfirmModal({
  show,
  title = "Confirmer l’action",
  message,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "default",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  const config =
    VARIANT_CONFIG[variant] ??
    VARIANT_CONFIG.default;

  const Icon = config.icon;

  return (
    <Modal
      show={show}
      centered
      backdrop={isLoading ? "static" : true}
      keyboard={!isLoading}
      onHide={isLoading ? undefined : onCancel}
      aria-labelledby="admin-confirm-modal-title"
      aria-describedby={
        description
          ? "admin-confirm-modal-description"
          : undefined
      }
    >
      <Modal.Header
        closeButton={!isLoading}
        className={styles.header}
      >
        <Modal.Title
          id="admin-confirm-modal-title"
          className={styles.title}
        >
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <span
          className={classNames(
            styles.icon,
            styles[variant]
          )}
          aria-hidden="true"
        >
          <Icon />
        </span>

        <div className={styles.content}>
          {message ? (
            <p className={styles.message}>
              {message}
            </p>
          ) : null}

          {description ? (
            <p
              id="admin-confirm-modal-description"
              className={styles.description}
            >
              {description}
            </p>
          ) : null}
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <AppButton
          variant="outline-secondary"
          disabled={isLoading}
          onClick={onCancel}
        >
          {cancelLabel}
        </AppButton>

        <AppButton
          variant={config.confirmVariant}
          disabled={isLoading}
          onClick={onConfirm}
        >
          {isLoading
            ? "Traitement..."
            : confirmLabel}
        </AppButton>
      </Modal.Footer>
    </Modal>
  );
}