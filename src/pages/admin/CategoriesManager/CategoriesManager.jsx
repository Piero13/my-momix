/**
 * CategoriesManager page.
 */

// import styles from "./CategoriesManager.module.scss";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  FiArrowDown,
  FiArrowUp,
  FiEdit3,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

import {
  AdminDataTable,
  AdminIconAction,
  AdminPageLayout,
  AdminPagination,
  AdminSearchInput,
  AdminToolbar,
  AppButton,
  CategoryFormModal,
  AdminConfirmModal
} from "@/components";

import { 
  findCategoryBySlug, 
  createCategory,
  updateCategory,
  moveCategory,
  deleteCategory,
} from "@/services";

import { PAGINATION } from "@/constants";
import { useCategoriesManager } from "@/hooks";
import { formatRelativeDate } from "@/utils";

import styles from "./CategoriesManager.module.scss"

export default function CategoriesManager() {
  const [
    showCategoryModal,
    setShowCategoryModal,
  ] = useState(false);

  const [
    categoryToEdit,
    setCategoryToEdit,
  ] = useState(null);

  const [
    isSavingCategory,
    setIsSavingCategory,
  ] = useState(false);

  const [
    isReordering,
    setIsReordering,
  ] = useState(false);

  const [
    categoryToDelete,
    setCategoryToDelete,
  ] = useState(null);

  const [
    isDeletingCategory,
    setIsDeletingCategory,
  ] = useState(false);

  const {
    categories,

    search,

    page,
    pageSize,
    totalItems,

    isLoading,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handlePageSizeChange,

    refreshCategories,
  } = useCategoriesManager();

  const columns = [
    {
      key: "name",
      label: "Catégorie",
      render: (category) => (
        <strong>
          {category.name}
        </strong>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      render: (category) =>
        category.slug || "—",
    },
    {
      key: "description",
      label: "Description",
      render: (category) => (
        <span>
          {category.description || "—"}
        </span>
      ),
    },
    {
      key: "order",
      label: "Ordre",
      render: (category) =>
        category.display_order ?? "—",
    },
    {
      key: "updatedAt",
      label: "Modification",
      render: (category) =>
        formatRelativeDate(
          category.updated_at
        ),
    },
    {
      key: "actions",
      label: "",
      width: "96px",
      align: "right",
      render: (category) => {
        const isFirst =
          category.display_order === 1;

        const isLast =
          category.display_order ===
          totalItems;

        return (
          <div className={styles.actions}>
            <AdminIconAction
              icon={FiArrowUp}
              label="Monter la catégorie"
              variant="secondary"
              disabled={
                isFirst ||
                isReordering
              }
              onClick={() =>
                handleMoveCategory(
                  category,
                  "up"
                )
              }
            />

            <AdminIconAction
              icon={FiArrowDown}
              label="Descendre la catégorie"
              variant="secondary"
              disabled={
                isLast ||
                isReordering
              }
              onClick={() =>
                handleMoveCategory(
                  category,
                  "down"
                )
              }
            />

            <AdminIconAction
              icon={FiEdit3}
              label="Modifier la catégorie"
              variant="primary"
              disabled={isReordering}
              onClick={() =>
                setCategoryToEdit(
                  category
                )
              }
            />

            <AdminIconAction
              icon={FiTrash2}
              label="Supprimer la catégorie"
              variant="danger"
              disabled={isReordering}
              onClick={() =>
                setCategoryToDelete(category)
              }
            />
          </div>
        );
      },
    },
  ];

  const handleCreateCategory =
    async (values) => {
      try {
        setIsSavingCategory(true);

        const existing =
          await findCategoryBySlug(
            values.slug
          );

        if (existing) {
          toast.error(
            "Une catégorie utilise déjà ce slug."
          );

          return;
        }

        await createCategory(values);

        await refreshCategories();

        toast.success(
          "Catégorie créée."
        );

        setShowCategoryModal(false);
      } catch (error) {
        console.error(
          "Unable to create category:",
          error
        );

        toast.error(
          "Impossible de créer la catégorie."
        );
      } finally {
        setIsSavingCategory(false);
      }
    };

  const handleUpdateCategory =
    async (values) => {
      if (!categoryToEdit) {
        return;
      }

      try {
        setIsSavingCategory(true);

        const existing =
          await findCategoryBySlug(
            values.slug
          );

        if (
          existing &&
          existing.id !==
            categoryToEdit.id
        ) {
          toast.error(
            "Une autre catégorie utilise déjà ce slug."
          );

          return;
        }

        await updateCategory(
          categoryToEdit.id,
          values
        );

        await refreshCategories();

        toast.success(
          "Catégorie modifiée."
        );

        setCategoryToEdit(null);
      } catch (error) {
        console.error(
          "Unable to update category:",
          error
        );

        toast.error(
          "Impossible de modifier la catégorie."
        );
      } finally {
        setIsSavingCategory(false);
      }
    };

  const handleMoveCategory =
    async (
        category,
        direction
      ) => {
        try {
          setIsReordering(true);

          const moved =
            await moveCategory(
              category.id,
              direction
            );

          if (!moved) {
            return;
          }

          await refreshCategories();
        } catch (error) {
          console.error(
            "Unable to reorder category:",
            error
          );

          toast.error(
            "Impossible de modifier l’ordre des catégories."
          );
        } finally {
          setIsReordering(false);
        }
    };

  const handleDeleteCategory =
    async () => {
      if (!categoryToDelete) {
        return;
      }

      try {
        setIsDeletingCategory(true);

        await deleteCategory(
          categoryToDelete.id
        );

        await refreshCategories();

        toast.success(
          "Catégorie supprimée."
        );

        setCategoryToDelete(null);
      } catch (error) {
        console.error(
          "Unable to delete category:",
          error
        );

        if (error?.code === "23503") {
          toast.error(
            "Cette catégorie est utilisée par une ou plusieurs recettes et ne peut pas être supprimée."
          );

          return;
        }

        toast.error(
          "Impossible de supprimer la catégorie."
        );
      } finally {
        setIsDeletingCategory(false);
      }
    };

  return (
    <AdminPageLayout>
      <AdminToolbar
        title="Catégories"
        description="Gérez les catégories utilisées pour organiser les recettes."
        action={
          <AppButton
            type="button"
            variant="primary"
            icon={<FiPlus />}
            onClick={() =>
              setShowCategoryModal(true)
            }
          >
            Nouvelle catégorie
          </AppButton>
        }
      >
        <AdminSearchInput
          id="categories-search"
          label="Rechercher une catégorie"
          placeholder="Nom ou slug..."
          value={search}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
        />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={categories}
        loading={isLoading}
        emptyTitle="Aucune catégorie"
        emptyDescription={
          search
            ? "Aucune catégorie ne correspond à votre recherche."
            : "Aucune catégorie n’a encore été créée."
        }
      />

      <AdminPagination
        id="categories-pagination"
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

      <CategoryFormModal
        show={
          showCategoryModal ||
          Boolean(categoryToEdit)
        }
        mode={
          categoryToEdit
            ? "edit"
            : "create"
        }
        category={categoryToEdit}
        isSubmitting={
          isSavingCategory
        }
        onSubmit={
          categoryToEdit
            ? handleUpdateCategory
            : handleCreateCategory
        }
        onClose={() => {
          setShowCategoryModal(false);
          setCategoryToEdit(null);
        }}
      />

      <AdminConfirmModal
        show={Boolean(categoryToDelete)}
        title="Supprimer la catégorie ?"
        message={categoryToDelete?.name}
        description="Cette action est définitive. La catégorie sera supprimée du catalogue si elle n’est utilisée par aucune recette."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        isLoading={isDeletingCategory}
        onCancel={() =>
          setCategoryToDelete(null)
        }
        onConfirm={handleDeleteCategory}
      />
    </AdminPageLayout>
  );
}