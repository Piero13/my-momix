/**
 * IngredientsManager page.
 */

import { useState } from "react";
import toast from "react-hot-toast";

import styles from "./IngredientsManager.module.scss"

import {
  FiEdit3,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import {
  AdminDataTable,
  AdminIconAction,
  AdminPageLayout,
  AdminPagination,
  AdminSearchInput,
  AdminToolbar,
} from "@/components/admin";

import { 
  AppButton,
  IngredientFormModal,
  AdminConfirmModal,
 } from "@/components";

import {
  PAGINATION,
} from "@/constants";

import {
  useIngredientsManager,
} from "@/hooks";

import {
  formatRelativeDate,
} from "@/utils";

import {
  createIngredient,
  findIngredientByName,
  updateIngredient,
  deleteIngredient,
} from "@/services";

export default function IngredientsManager() {
  const [
    showIngredientModal,
    setShowIngredientModal,
  ] = useState(false);

  const [
    isSavingIngredient,
    setIsSavingIngredient,
  ] = useState(false);

  const [
    ingredientToEdit,
    setIngredientToEdit,
  ] = useState(null);

  const [
    ingredientToDelete,
    setIngredientToDelete,
  ] = useState(null);

  const [
    isDeletingIngredient,
    setIsDeletingIngredient,
  ] = useState(false);

  const {
    ingredients,

    search,

    page,
    pageSize,
    totalItems,

    isLoading,

    setPage,

    handleSearchChange,
    handleSearchClear,
    handlePageSizeChange,

    refreshIngredients,
  } = useIngredientsManager();

  const columns = [
    {
      key: "name",
      label: "Ingrédient",
      render: (ingredient) => (
        <strong>
          {ingredient.name}
        </strong>
      ),
    },
    {
      key: "updatedAt",
      label: "Modification",
      render: (ingredient) =>
        formatRelativeDate(
          ingredient.updated_at
        ),
    },
    {
      key: "actions",
      label: "",
      width: "96px",
      align: "right",
      render: (ingredient) => (
        <div className={styles.actions}>
          <AdminIconAction
            icon={FiEdit3}
            label="Modifier l’ingrédient"
            variant="primary"
            onClick={() =>
              setIngredientToEdit(ingredient)
            }
          />

          <AdminIconAction
            icon={FiTrash2}
            label="Supprimer l’ingrédient"
            variant="danger"
            onClick={() =>
              setIngredientToDelete(
                ingredient
              )
            }
          />
        </div>
      ),
    },
  ];

  const handleCreateIngredient =
    async ({ name }) => {
      try {
        setIsSavingIngredient(true);

        const existingIngredient =
          await findIngredientByName(
            name
          );

        if (existingIngredient) {
          toast.error(
            "Cet ingrédient existe déjà."
          );

          return;
        }

        await createIngredient(name);

        await refreshIngredients();

        toast.success(
          "Ingrédient créé."
        );

        setShowIngredientModal(false);
      } catch (error) {
        console.error(
          "Unable to create ingredient:",
          error
        );

        toast.error(
          "Impossible de créer l’ingrédient."
        );
      } finally {
        setIsSavingIngredient(false);
      }
    };
  
  const handleUpdateIngredient =
    async ({ name }) => {
      if (!ingredientToEdit) {
        return;
      }

      try {
        setIsSavingIngredient(true);

        const existingIngredient =
          await findIngredientByName(
            name
          );

        if (
          existingIngredient &&
          existingIngredient.id !==
            ingredientToEdit.id
        ) {
          toast.error(
            "Un autre ingrédient utilise déjà ce nom."
          );

          return;
        }

        await updateIngredient(
          ingredientToEdit.id,
          {
            name,
          }
        );

        await refreshIngredients();

        toast.success(
          "Ingrédient modifié."
        );

        setIngredientToEdit(null);
      } catch (error) {
        console.error(
          "Unable to update ingredient:",
          error
        );

        toast.error(
          "Impossible de modifier l’ingrédient."
        );
      } finally {
        setIsSavingIngredient(false);
      }
    };

  const handleDeleteIngredient =
    async () => {
      if (!ingredientToDelete) {
        return;
      }

      try {
        setIsDeletingIngredient(true);

        await deleteIngredient(
          ingredientToDelete.id
        );

        await refreshIngredients();

        toast.success(
          "Ingrédient supprimé."
        );

        setIngredientToDelete(null);
      } catch (error) {

        if (error?.code === "23503") {
          toast.error(
            "Cet ingrédient est utilisé dans une ou plusieurs recettes et ne peut pas être supprimé."
          );

          return;
        }

        console.error(
          "Unable to delete ingredient:",
          error
        );

        toast.error(
          "Impossible de supprimer cet ingrédient."
        );
      } finally {
        setIsDeletingIngredient(false);
      }
    };

  return (
    <AdminPageLayout>
      <AdminToolbar
        title="Ingrédients"
        description="Gérez le catalogue d’ingrédients utilisé dans les recettes."
        action={
          <AppButton
            type="button"
            variant="primary"
            icon={<FiPlus />}
            onClick={() => {
              setShowIngredientModal(true)
            }}
          >
            Nouvel ingrédient
          </AppButton>
        }
      >
        <AdminSearchInput
          id="ingredients-search"
          label="Rechercher un ingrédient"
          placeholder="Nom..."
          value={search}
          onChange={
            handleSearchChange
          }
          onClear={
            handleSearchClear
          }
        />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={ingredients}
        loading={isLoading}
        emptyTitle="Aucun ingrédient"
        emptyDescription={
          search
            ? "Aucun ingrédient ne correspond à votre recherche."
            : "Le catalogue d’ingrédients est vide."
        }
      />

      <AdminPagination
        id="ingredients-pagination"
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

      <IngredientFormModal
        show={
          showIngredientModal ||
          Boolean(ingredientToEdit)
        }
        mode={
          ingredientToEdit
            ? "edit"
            : "create"
        }
        ingredient={ingredientToEdit}
        isSubmitting={
          isSavingIngredient
        }
        onSubmit={
          ingredientToEdit
            ? handleUpdateIngredient
            : handleCreateIngredient
        }
        onClose={() => {
          setShowIngredientModal(false);
          setIngredientToEdit(null);
        }}
      />

      <AdminConfirmModal
        show={Boolean(
          ingredientToDelete
        )}
        title="Supprimer l’ingrédient ?"
        message={
          ingredientToDelete?.name
        }
        description="Cet ingrédient sera supprimé du catalogue."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        isLoading={
          isDeletingIngredient
        }
        onCancel={() =>
          setIngredientToDelete(null)
        }
        onConfirm={
          handleDeleteIngredient
        }
      />
    </AdminPageLayout>
  );
}