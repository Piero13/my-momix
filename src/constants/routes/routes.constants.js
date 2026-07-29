/**
 * Application routes.
 * Centralized to avoid hardcoded paths.
 */

export const ROUTES = {
  // Public
  HOME: "/",
  BROWSE: "/recettes",
  RECIPE: "/recette/:slug",
  ABOUT: "/a-propos",
  CONTACT: "/contact",
  PRIVACY: "/confidentialite",
  TERMS: "/mentions-legales",

  // Admin
  LOGIN: "/connexion",
  DASHBOARD: "/admin/dashboard",
  RECIPES: "/admin/recipes",
  CATEGORIES: "/admin/categories",
  INGREDIENTS: "/admin/ingredients",
  COMMENTS: "/admin/comments",
  SETTINGS: "/admin/settings",

  // Fallback
  NOT_FOUND: "*",
};