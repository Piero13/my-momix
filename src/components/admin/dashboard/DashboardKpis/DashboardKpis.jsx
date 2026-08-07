/**
 * Displays the main administration dashboard metrics.
 */

import {
  FiBookOpen,
  FiCheckCircle,
  FiEdit3,
  FiFolder,
  FiMessageSquare,
} from "react-icons/fi";

import AdminKpiCard from "../AdminKpiCard";

import styles from "./DashboardKpis.module.scss";

function getPublishedPercentage(
  publishedRecipes,
  totalRecipes
) {
  if (!totalRecipes) {
    return 0;
  }

  return Math.round(
    (publishedRecipes / totalRecipes) * 100
  );
}

export default function DashboardKpis({
  metrics,
  loading = false,
}) {
  const {
    recipes = 0,
    publishedRecipes = 0,
    draftRecipes = 0,
    categories = 0,
    pendingComments = 0,
  } = metrics ?? {};

  const publishedPercentage =
    getPublishedPercentage(
      publishedRecipes,
      recipes
    );

  const kpis = [
    {
      key: "recipes",
      title: "Recettes",
      value: recipes,
      icon: FiBookOpen,
      variant: "default",
      helper:
        recipes > 1
          ? `${recipes} recettes enregistrées`
          : `${recipes} recette enregistrée`,
    },
    {
      key: "published",
      title: "Publiées",
      value: publishedRecipes,
      icon: FiCheckCircle,
      variant: "success",
      helper: `${publishedPercentage} % des recettes`,
    },
    {
      key: "drafts",
      title: "Brouillons",
      value: draftRecipes,
      icon: FiEdit3,
      variant: "primary",
      helper:
        draftRecipes > 0
          ? "En attente de finalisation"
          : "Aucun brouillon",
    },
    {
      key: "categories",
      title: "Catégories",
      value: categories,
      icon: FiFolder,
      variant: "primary",
      helper:
        categories > 1
          ? `${categories} catégories disponibles`
          : `${categories} catégorie disponible`,
    },
    {
      key: "comments",
      title: "À modérer",
      value: pendingComments,
      icon: FiMessageSquare,
      variant:
        pendingComments > 0
          ? "warning"
          : "success",
      helper:
        pendingComments > 0
          ? `${pendingComments} commentaire${
              pendingComments > 1 ? "s" : ""
            } en attente`
          : "Modération à jour",
    },
  ];

  return (
    <section
      className={styles.section}
      aria-labelledby="dashboard-kpis-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Vue d’ensemble
          </p>

          <h2
            id="dashboard-kpis-title"
            className={styles.title}
          >
            Indicateurs principaux
          </h2>
        </div>
      </header>

      <div className={styles.grid}>
        {kpis.map((kpi) => (
          <AdminKpiCard
            key={kpi.key}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            variant={kpi.variant}
            helper={kpi.helper}
            loading={loading}
          />
        ))}
      </div>
    </section>
  );
}