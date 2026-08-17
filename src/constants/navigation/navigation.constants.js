/**
 * Public navigation items.
 */

import { ROUTES } from "@/constants";

export const NAVIGATION_ITEMS = [
  {
    id: "home",
    label: "Accueil",
    path: ROUTES.HOME,
  },
  {
    id: "recipes",
    label: "Recettes",
    path: ROUTES.BROWSE,
  },
  {
    id: "shopping-list",
    label: "Liste de courses",
    path: ROUTES.SHOPPING_LIST,
  },
  {
    id: "about",
    label: "À propos",
    path: ROUTES.ABOUT,
  },
  {
    id: "contact",
    label: "Contact",
    path: ROUTES.CONTACT,
  },
];