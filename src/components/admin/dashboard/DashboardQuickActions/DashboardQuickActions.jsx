/**
 * Displays the main administration shortcuts.
 */

import {
  FiFolder,
  FiMessageSquare,
  FiPlus,
  FiSettings,
} from "react-icons/fi";

import { ROUTES } from "@/constants";

import QuickActionCard from "./QuickActionCard";
import styles from "./DashboardQuickActions.module.scss";

export default function DashboardQuickActions({
  pendingCommentsCount = 0,
}) {
  const actions = [
    {
      key: "new-recipe",
      title: "Nouvelle recette",
      description: "Créer une nouvelle recette.",
      icon: FiPlus,
      to: ROUTES.NEW_RECIPE,
      variant: "primary",
    },
    {
      key: "comments",
      title: "Commentaires",
      description: "Gérer la modération.",
      icon: FiMessageSquare,
      to: ROUTES.COMMENTS,
      variant:
        pendingCommentsCount > 0
          ? "warning"
          : "default",
      badgeCount: pendingCommentsCount,
    },
    {
      key: "categories",
      title: "Catégories",
      description: "Organiser les recettes.",
      icon: FiFolder,
      to: ROUTES.CATEGORIES,
      variant: "default",
    },
    {
      key: "settings",
      title: "Paramètres",
      description: "Configurer MyMomix.",
      icon: FiSettings,
      to: ROUTES.SETTINGS,
      variant: "default",
    },
  ];

  return (
    <section
      className={styles.section}
      aria-labelledby="dashboard-actions-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Accès direct
          </p>

          <h2
            id="dashboard-actions-title"
            className={styles.title}
          >
            Actions rapides
          </h2>
        </div>
      </header>

      <div className={styles.grid}>
        {actions.map((action) => (
          <QuickActionCard
            key={action.key}
            {...action}
          />
        ))}
      </div>
    </section>
  );
}