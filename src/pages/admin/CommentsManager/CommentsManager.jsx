/**
 * CommentsManager page.
 */

import styles from "./CommentsManager.module.scss";

import { useState } from "react";

import toast from "react-hot-toast";

import {
  FiCheck,
  FiEyeOff,
  FiMessageSquare,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

import {
  AdminDataTable,
  AdminFilterSelect,
  AdminIconAction,
  AdminPageLayout,
  AdminPagination,
  AdminSearchInput,
  AdminStatusBadge,
  AdminToolbar,
  AdminConfirmModal,
  CommentDetailsModal,
} from "@/components";

import {
  COMMENT_STATUS_OPTIONS,
  PAGINATION,
} from "@/constants";

import {
  useCommentsManager,
} from "@/hooks/comments";

import {
  approveComment,
  deleteComment,
  unapproveComment,
} from "@/services/comments";

import {
  formatRelativeDate,
} from "@/utils";

export default function CommentsManager() {
  const [
    commentToDelete,
    setCommentToDelete,
  ] = useState(null);

  const [
    isUpdatingComment,
    setIsUpdatingComment,
  ] = useState(false);

  const [
    isDeletingComment,
    setIsDeletingComment,
  ] = useState(false);

  const [
    selectedComment,
    setSelectedComment,
  ] = useState(null);

  const {
    comments,

    search,
    status,

    page,
    pageSize,
    totalItems,

    isLoading,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handleStatusChange,
    handlePageSizeChange,

    refreshComments,
  } = useCommentsManager();

  const columns = [
    {
      key: "author",
      label: "Auteur",
      render: (comment) => (
        <div className={styles.author}>
          <strong>
            {comment.author_name || "Anonyme"}
          </strong>

          {comment.email ? (
            <span className={styles.email}>
              {comment.email}
            </span>
          ) : null}
        </div>
      ),
    },

    {
      key: "recipe",
      label: "Recette",
      render: (comment) => (
        <span className={styles.recipe}>
          {comment.recipes?.title ?? "—"}
        </span>
      ),
    },

    {
      key: "content",
      label: "Commentaire",
      render: (comment) => (
        <span className={styles.content}>
          {comment.content || "—"}
        </span>
      ),
    },

    {
      key: "rating",
      label: "Note",
      width: "90px",
      render: (comment) => (
        <span className={styles.rating}>
          {comment.rating
            ? `${comment.rating}/5`
            : "—"}
        </span>
      ),
    },

    {
      key: "status",
      label: "Statut",
      width: "120px",
      render: (comment) => (
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
      ),
    },

    {
      key: "createdAt",
      label: "Date",
      render: (comment) =>
        formatRelativeDate(
          comment.created_at
        ),
    },

    {
      key: "actions",
      label: "",
      width: "150px",
      align: "right",
      render: (comment) => (
        <div className={styles.actions}>
          {!comment.approved ? (
            <AdminIconAction
              icon={FiCheck}
              label="Approuver le commentaire"
              variant="primary"
              disabled={
                isUpdatingComment ||
                isDeletingComment
              }
              onClick={() =>
                handleApproveComment(
                  comment
                )
              }
            />
          ) : (
            <AdminIconAction
              icon={FiEyeOff}
              label="Retirer l’approbation"
              variant="secondary"
              disabled={
                isUpdatingComment ||
                isDeletingComment
              }
              onClick={() =>
                handleUnapproveComment(
                  comment
                )
              }
            />
          )}

          <AdminIconAction
            icon={FiEye}
            label="Voir le commentaire"
            variant="secondary"
            onClick={() =>
              setSelectedComment(comment)
            }
          />

          <AdminIconAction
            icon={FiTrash2}
            label="Supprimer le commentaire"
            variant="danger"
            disabled={
              isUpdatingComment ||
              isDeletingComment
            }
            onClick={() =>
              setCommentToDelete(comment)
            }
          />
        </div>
      ),
    },
  ];

  const handleApproveComment = async (
  comment
) => {
  try {
    setIsUpdatingComment(true);

    await approveComment(
      comment.id
    );

    setSelectedComment((current) =>
      current?.id === comment.id
        ? {
            ...current,
            approved: true,
          }
        : current
    );

    await refreshComments();

    toast.success(
      "Commentaire approuvé."
    );
  } catch (error) {
    console.error(
      "Unable to approve comment:",
      error
    );

    toast.error(
      "Impossible d’approuver le commentaire."
    );
  } finally {
    setIsUpdatingComment(false);
  }
};

const handleUnapproveComment =
  async (comment) => {
    try {
      setIsUpdatingComment(true);

      await unapproveComment(
        comment.id
      );

      await refreshComments();

      toast.success(
        "Approbation retirée."
      );

      setSelectedComment((current) =>
        current?.id === comment.id
          ? {
              ...current,
              approved: false,
            }
          : current
      );
    } catch (error) {
      console.error(
        "Unable to unapprove comment:",
        error
      );

      toast.error(
        "Impossible de modifier le commentaire."
      );
    } finally {
      setIsUpdatingComment(false);
    }
  };

const handleDeleteComment = async () => {
    if (!commentToDelete) {
      return;
    }

    try {
      setIsDeletingComment(true);

      await deleteComment(
        commentToDelete.id
      );

      await refreshComments();

      toast.success(
        "Commentaire supprimé."
      );

      setCommentToDelete(null);
    } catch (error) {
      console.error(
        "Unable to delete comment:",
        error
      );

      toast.error(
        "Impossible de supprimer le commentaire."
      );
    } finally {
      setIsDeletingComment(false);
    }
  };

  return (
    <AdminPageLayout>
      <AdminToolbar
        title="Commentaires"
        description="Modérez les commentaires et avis laissés sur les recettes."
      >
        <AdminSearchInput
          id="comments-search"
          label="Rechercher un commentaire"
          placeholder="Auteur, email, contenu..."
          value={search}
          onChange={
            handleSearchChange
          }
          onClear={
            handleSearchClear
          }
        />

        <AdminFilterSelect
          id="comments-status-filter"
          label="Statut"
          icon={FiMessageSquare}
          value={status}
          options={
            COMMENT_STATUS_OPTIONS
          }
          onChange={
            handleStatusChange
          }
        />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={comments}
        loading={isLoading}
        emptyTitle="Aucun commentaire"
        emptyDescription={
          search ||
          status !== "all"
            ? "Aucun commentaire ne correspond à vos critères."
            : "Aucun commentaire n’a encore été publié."
        }
      />

      <AdminPagination
        id="comments-pagination"
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        pageSizeOptions={
          PAGINATION.PAGE_SIZE_OPTIONS
        }
        onPageChange={setPage}
        onPageSizeChange={
          handlePageSizeChange
        }
      />

      <AdminConfirmModal
        show={Boolean(commentToDelete)}
        title="Supprimer le commentaire ?"
        message={
          commentToDelete?.author_name
            ? `Commentaire de ${commentToDelete.author_name}`
            : "Commentaire"
        }
        description="Cette action est définitive. Le commentaire sera supprimé de la recette."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        isLoading={isDeletingComment}
        onCancel={() =>
          setCommentToDelete(null)
        }
        onConfirm={handleDeleteComment}
      />

      <CommentDetailsModal
        show={Boolean(selectedComment)}
        comment={selectedComment}
        isUpdating={isUpdatingComment}
        isDeleting={isDeletingComment}
        onClose={() =>
          setSelectedComment(null)
        }
        onApprove={
          handleApproveComment
        }
        onUnapprove={
          handleUnapproveComment
        }
        onDelete={(comment) => {
          setSelectedComment(null);
          setCommentToDelete(comment);
        }}
      />
    </AdminPageLayout>
  );
}