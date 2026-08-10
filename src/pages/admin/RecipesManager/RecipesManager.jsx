import { useState } from "react";
import toast from "react-hot-toast";

import {
  FiActivity,
  FiEdit3,
  FiFolder,
  FiPlus,
  FiImage,
  FiStar,
  FiEye,
  FiTrash2
} from "react-icons/fi";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  AdminConfirmModal,
  AdminDataTable,
  AdminFilterSelect,
  AdminPageLayout,
  AdminPagination,
  AdminSearchInput,
  AdminToolbar,
  AdminStatusBadge,
  AdminIconAction,
} from "@/components/admin";
import { AppButton } from "@/components/ui";

import {
  PAGINATION,
  RECIPE_STATUS_LABELS,
  RECIPE_STATUS_OPTIONS,
  RECIPE_STATUS_VARIANTS,
  ROUTES,
  getEditRecipePath,
  getRecipeDetailsPath,
} from "@/constants";

import {
  useRecipesManager,
} from "@/hooks";

import {
  formatRelativeDate,
} from "@/utils";

import { getRecipeImageUrl } from "@/services";

import styles from "./RecipesManager.module.scss";

export default function RecipesManager() {
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  
  const navigate = useNavigate();

  const {
    recipes,
    categories,

    search,
    category,
    status,

    page,
    pageSize,
    totalItems,

    isLoading,
    isLoadingCategories,
    isDeleting,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handleCategoryChange,
    handleStatusChange,
    handlePageSizeChange,

    removeRecipe,
  } = useRecipesManager();

  const columns = [
    {
      key: "image",
      label: "",
      width: "72px",
      render: (recipe) => {
        const imageUrl = recipe.image_path
          ? getRecipeImageUrl(recipe.image_path)
          : null;

        return (
          <div className={styles.thumbnail}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt=""
                className={styles.thumbnailImage}
              />
            ) : (
              <span
                className={styles.thumbnailPlaceholder}
              >
                <FiImage aria-hidden="true" />
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "title",
      label: "Titre",
      render: (recipe) => (
        <strong>
          {recipe.title}
        </strong>
      ),
    },
    {
      key: "rating",
      label: "Note",
      render: (recipe) => {
        const hasRating =
          recipe.ratings_count > 0 &&
          recipe.average_rating > 0;

        if (!hasRating) {
          return "—";
        }

        return (
          <span className={styles.rating}>
            <FiStar aria-hidden="true" />

            <span>
              {Number(
                recipe.average_rating
              ).toFixed(1)}
            </span>

            <span className={styles.ratingCount}>
              ({recipe.ratings_count})
            </span>
          </span>
        );
      },
    },
    {
      key: "category",
      label: "Catégorie",
      render: (recipe) =>
        recipe.categories?.name ?? "—",
    },
    {
      key: "status",
      label: "Statut",
      render: (recipe) => (
        <AdminStatusBadge
          label={
            RECIPE_STATUS_LABELS[recipe.status] ??
            recipe.status
          }
          variant={
            RECIPE_STATUS_VARIANTS[recipe.status] ??
            "default"
          }
        />
      )
    },
    {
      key: "updatedAt",
      label: "Modification",
      render: (recipe) =>
        formatRelativeDate(
          recipe.updated_at
        ),
    },
    {
      key: "actions",
      label: "",
      width: "160px",
      align: "right",
      render: (recipe) => (
        <div
          className={styles.actions}
          onDoubleClick={(event) => {
            event.stopPropagation();
          }}
        >
          {recipe.status === "published" ? (
            <AdminIconAction
              icon={FiEye}
              label="Voir la recette"
              to={getRecipeDetailsPath(recipe.slug)}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            />
          ) : null}

          <AdminIconAction
            icon={FiEdit3}
            label="Modifier la recette"
            to={getEditRecipePath(recipe.id)}
            variant="primary"
          />

          <AdminIconAction
            icon={FiTrash2}
            label="Supprimer la recette"
            variant="danger"
            onClick={() =>
              setRecipeToDelete(recipe)
            }
          />
        </div>
      ),
    }
  ];

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) {
      return;
    }

    try {
      await removeRecipe(
        recipeToDelete.id
      );

      toast.success(
        "Recette supprimée."
      );

      setRecipeToDelete(null);
    } catch (error) {
      console.error(
        "Unable to delete recipe:",
        error
      );

      toast.error(
        "Impossible de supprimer la recette."
      );
    }
  };

  return (
    <AdminPageLayout>
      <AdminToolbar
        title="Recettes"
        description="Gérez l’ensemble des recettes de MyMomix."
        action={
          <AppButton
            as={Link}
            to={ROUTES.NEW_RECIPE}
            variant="primary"
            icon={<FiPlus />}
          >
            Nouvelle recette
          </AppButton>
        }
      >
        <AdminSearchInput
          id="recipes-search"
          label="Rechercher une recette"
          placeholder="Titre..."
          value={search}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
        />

        <AdminFilterSelect
          id="recipes-category-filter"
          label="Catégorie"
          icon={FiFolder}
          value={category}
          options={categories}
          placeholder="Toutes les catégories"
          disabled={isLoadingCategories}
          onChange={handleCategoryChange}
        />

        <AdminFilterSelect
          id="recipes-status-filter"
          label="Statut"
          icon={FiActivity}
          value={status}
          options={RECIPE_STATUS_OPTIONS}
          placeholder="Tous les statuts"
          onChange={handleStatusChange}
        />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={recipes}
        loading={isLoading}
        emptyTitle="Aucune recette"
        emptyDescription={
          search || category || status
            ? "Aucune recette ne correspond à vos critères."
            : "Créez votre première recette pour commencer."
        }
        emptyAction={
          !search &&
          !category &&
          !status ? (
            <AppButton
              as={Link}
              to={ROUTES.NEW_RECIPE}
              variant="primary"
              icon={<FiPlus />}
            >
              Nouvelle recette
            </AppButton>
          ) : undefined
        }
        rowProps={(recipe) => ({
          onDoubleClick: () =>
            navigate(
              getEditRecipePath(recipe.id)
            ),
        })}
      />

      <AdminPagination
        id="recipes-pagination"
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        pageSizeOptions={PAGINATION.PAGE_SIZE_OPTIONS}
        onPageChange={setPage}
        onPageSizeChange={
          handlePageSizeChange
        }
      />

      <AdminConfirmModal
        show={Boolean(recipeToDelete)}
        title="Supprimer la recette ?"
        message={recipeToDelete?.title}
        description="Cette action est définitive. La recette et les données qui lui sont associées seront supprimées."
        confirmLabel="Supprimer"
        variant="danger"
        isLoading={isDeleting}
        onCancel={() =>
          setRecipeToDelete(null)
        }
        onConfirm={handleConfirmDelete}
      />
    </AdminPageLayout>
  );
}