/**
 * Application routes.
 * Centralized to avoid hardcoded paths.
 */

export const ROUTES = {
  // Public
  HOME: "/",
  BROWSE: "/recettes",
  RECIPE_DETAILS: "/recette/:slug",
  ABOUT: "/a-propos",
  CONTACT: "/contact",
  PRIVACY: "/confidentialite",
  TERMS: "/mentions-legales",

  // Authentication
  LOGIN: "/connexion",
  UNAUTHORIZED: "/access-refuse",

  // Admin routes
  ADMIN: "/admin",
  DASHBOARD: "/admin/dashboard",
  RECIPES: "/admin/recettes",
  NEW_RECIPE: "/admin/recettes/nouvelle",
  EDIT_RECIPE: "/admin/recettes/:recipeId/modifier",
  CATEGORIES: "/admin/categories",
  INGREDIENTS: "/admin/ingredients",
  COMMENTS: "/admin/commentaires",
  SETTINGS: "/admin/parametres",

  // Fallback
  NOT_FOUND: "*",
};