import {
  FiCheck,
  FiEyeOff,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import {
  Modal,
} from "react-bootstrap";

import {
  AdminIconAction,
  AdminStatusBadge,
} from "@/components/admin";

import {
  formatRelativeDate,
} from "@/utils";

import styles from "./CommentDetailsModal.module.scss";

export default function CommentDetailsModal({
  show,
  comment,
  isUpdating = false,
  isDeleting = false,
  onClose,
  onApprove,
  onUnapprove,
  onDelete,
}) {
  if (!comment) {
    return null;
  }

  return (
    <Modal
      show={show}
      centered
      size="lg"
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Détail du commentaire
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className={styles.meta}>
          <div>
            <span className={styles.label}>
              Auteur
            </span>

            <strong>
              {comment.author_name || "Anonyme"}
            </strong>

            {comment.email ? (
              <span className={styles.secondary}>
                {comment.email}
              </span>
            ) : null}
          </div>

          <div>
            <span className={styles.label}>
              Recette
            </span>

            <strong>
              {comment.recipes?.title ?? "—"}
            </strong>
          </div>

          <div>
            <span className={styles.label}>
              Note
            </span>

            <span className={styles.rating}>
              <FiStar aria-hidden="true" />

              {comment.rating
                ? `${comment.rating}/5`
                : "—"}
            </span>
          </div>

          <div>
            <span className={styles.label}>
              Statut
            </span>

            <AdminStatusBadge
              label={
                comment.approved
                  ? "Approuvé"
                  : "À modérer"
              }
              variant={
                comment.approved
                  ? "success"
                  : "warning"
              }
            />
          </div>

          <div>
            <span className={styles.label}>
              Date
            </span>

            <span>
              {formatRelativeDate(
                comment.created_at
              )}
            </span>
          </div>
        </div>

        <div className={styles.contentBlock}>
          <span className={styles.label}>
            Commentaire
          </span>

          <p className={styles.content}>
            {comment.content}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <div className={styles.moderationActions}>
          {!comment.approved ? (
            <AdminIconAction
              icon={FiCheck}
              label="Approuver le commentaire"
              variant="primary"
              disabled={
                isUpdating ||
                isDeleting
              }
              onClick={() =>
                onApprove?.(comment)
              }
            />
          ) : (
            <AdminIconAction
              icon={FiEyeOff}
              label="Retirer l’approbation"
              variant="secondary"
              disabled={
                isUpdating ||
                isDeleting
              }
              onClick={() =>
                onUnapprove?.(comment)
              }
            />
          )}

          <AdminIconAction
            icon={FiTrash2}
            label="Supprimer le commentaire"
            variant="danger"
            disabled={
              isUpdating ||
              isDeleting
            }
            onClick={() =>
              onDelete?.(comment)
            }
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}