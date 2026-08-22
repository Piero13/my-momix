/**
 * Administration navigation items.
 */

import {
  FiBookOpen,
  FiGrid,
  FiMessageSquare,
  FiSettings,
  FiTag,
  FiMail,
} from "react-icons/fi";

import { ROUTES } from "@/constants/routes";

export const ADMIN_NAVIGATION_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: FiGrid,
  },
  {
    key: "recipes",
    label: "Recettes",
    path: ROUTES.RECIPES,
    icon: FiBookOpen,
  },
  {
    key: "categories",
    label: "Catégories",
    path: ROUTES.CATEGORIES,
    icon: FiTag,
  },
  {
    key: "ingredients",
    label: "Ingrédients",
    path: ROUTES.INGREDIENTS,
    icon: FiTag,
  },
  {
    key: "comments",
    label: "Commentaires",
    path: ROUTES.COMMENTS,
    icon: FiMessageSquare,
    badgeKey: "pendingComments",
  },
  {
    key: "messages",
    label: "Messagerie",
    path: ROUTES.CONTACT_MESSAGES,
    icon: FiMail,
    badgeKey: "pendingMessages",
  },
  {
    key: "settings",
    label: "Paramètres",
    path: ROUTES.SETTINGS,
    icon: FiSettings,
  },
];