/**
 * IngredientsManager page.
 */

import {
  FiEdit3,
  FiPlus,
} from "react-icons/fi";

import {
  AdminDataTable,
  AdminIconAction,
  AdminPageLayout,
  AdminPagination,
  AdminSearchInput,
  AdminToolbar,
} from "@/components/admin";

import { AppButton } from "@/components/ui";

import {
  PAGINATION,
} from "@/constants";

import {
  useIngredientsManager,
} from "@/hooks";

import {
  formatRelativeDate,
} from "@/utils";

export default function IngredientsManager() {
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
        <div>
          <AdminIconAction
            icon={FiEdit3}
            label="Modifier l’ingrédient"
            onClick={() => {
              console.log(
                "Edit ingredient:",
                ingredient
              );
            }}
            variant="primary"
          />
        </div>
      ),
    },
  ];

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
              console.log(
                "Create ingredient"
              );
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
    </AdminPageLayout>
  );
}