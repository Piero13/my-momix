import Modal from "react-bootstrap/Modal";

import {
  AppButton,
} from "@/components/ui";

import {
  CONTACT_MESSAGE_STATUS,
} from "@/constants/contact";

import styles from "./ContactMessageModal.module.scss";

export default function ContactMessageModal({
  show,
  message,
  onClose,
  onArchive,
  onRestore,
  onDelete,
}) {
  if (!message) {
    return null;
  }

  const {
    name,
    email,
    subject,
    message: content,
    status,
    created_at,
  } = message;

  const formattedDate =
    new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle: "long",
        timeStyle: "short",
      }
    ).format(
      new Date(created_at)
    );

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Message de {name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className={styles.meta}>
          <div>
            <span className={styles.label}>
              Email
            </span>

            <a
              href={`mailto:${email}`}
              className={styles.value}
            >
              {email}
            </a>
          </div>

          <div>
            <span className={styles.label}>
              Sujet
            </span>

            <span className={styles.value}>
              {subject}
            </span>
          </div>

          <div>
            <span className={styles.label}>
              Reçu le
            </span>

            <span className={styles.value}>
              {formattedDate}
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.label}>
            Message
          </span>

          <p>
            {content}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {status ===
        CONTACT_MESSAGE_STATUS.ARCHIVED ? (
          <AppButton
            type="button"
            variant="outline-primary"
            onClick={() =>
              onRestore?.(message.id)
            }
          >
            Restaurer
          </AppButton>
        ) : (
          <AppButton
            type="button"
            variant="outline-secondary"
            onClick={() =>
              onArchive?.(message.id)
            }
          >
            Archiver
          </AppButton>
        )}

        <AppButton
          type="button"
          variant="outline-danger"
          onClick={() =>
            onDelete?.(message)
          }
        >
          Supprimer
        </AppButton>

        <AppButton
          type="button"
          variant="primary"
          onClick={onClose}
        >
          Fermer
        </AppButton>
      </Modal.Footer>
    </Modal>
  );
}