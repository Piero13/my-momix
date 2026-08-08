import { useState } from "react";
import { FiActivity, FiFolder, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  AdminFilterSelect,
  AdminSearchInput,
  AdminToolbar,
  AdminDataTable,
  AdminPageLayout,
  AdminPagination,
} from "@/components/admin";
import { AppButton } from "@/components/ui";
import { 
  ROUTES,
  PAGINATION,
} from "@/constants";

const STATUS_OPTIONS = [
  {
    value: "draft",
    label: "Brouillons",
  },
  {
    value: "published",
    label: "Publiées",
  },
  {
    value: "archived",
    label: "Archivées",
  },
];

const CATEGORY_OPTIONS = [
  {
    value: "soupes",
    label: "Soupes",
  },
  {
    value: "plats",
    label: "Plats",
  },
  {
    value: "desserts",
    label: "Desserts",
  },
];

export default function RecipesManager() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(
    PAGINATION.DEFAULT_PAGE_SIZE
  );

  const TEST_RECIPES = [
    {
      id: "1",
      title: "Velouté de courgettes",
      category: "Soupes",
      status: "Publiée",
      updatedAt: "08/08/2026",
    },
    {
      id: "2",
      title: "Risotto aux champignons",
      category: "Plats",
      status: "Brouillon",
      updatedAt: "07/08/2026",
    },
  ];

  const columns = [
    {
      key: "title",
      label: "Titre",
    },
    {
      key: "category",
      label: "Catégorie",
    },
    {
      key: "status",
      label: "Statut",
    },
    {
      key: "updatedAt",
      label: "Modification",
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (recipe) => (
        <AppButton
          variant="outline-primary"
          size="sm"
          onClick={() =>
            console.log(recipe.id)
          }
        >
          Modifier
        </AppButton>
      ),
    },
  ];

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
          placeholder="Titre, catégorie..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          onClear={() => setSearch("")}
        />

        <AdminFilterSelect
          id="recipes-category-filter"
          label="Catégorie"
          icon={FiFolder}
          value={category}
          options={CATEGORY_OPTIONS}
          placeholder="Toutes les catégories"
          onChange={(event) =>
            setCategory(event.target.value)
          }
        />

        <AdminFilterSelect
          id="recipes-status-filter"
          label="Statut"
          icon={FiActivity}
          value={status}
          options={STATUS_OPTIONS}
          placeholder="Tous les statuts"
          onChange={(event) =>
            setStatus(event.target.value)
          }
        />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={TEST_RECIPES}
        emptyTitle="Aucune recette"
        emptyDescription="Créez votre première recette pour commencer."
      />

      <AdminPagination
        page={page}
        pageSize={pageSize}
        totalItems={36}
        pageSizeOptions={PAGINATION.PAGE_SIZE_OPTIONS}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
      />
    </AdminPageLayout>

  );
}