/**
 * Application router.
 */

import { Suspense, lazy } from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoadingScreen from "@/components/feedback/LoadingScreen";

import {
  AdminLayout,
  AuthLayout,
  PublicLayout,
} from "@/layouts";

import ProtectedAdminRoute from "../ProtectedAdminRoute";

import ScrollToTop from "../ScrollToTop";

import { ROUTES } from "@/constants";

const Home = lazy(() => import("@/pages/public/Home"));
const BrowseRecipes = lazy(() => import("@/pages/public/BroweRecipes"));
const RecipeDetails = lazy(() => import("@/pages/public/RecipeDetails"));

const About = lazy(() => import("@/pages/public/About"));
const Contact = lazy(() => import("@/pages/public/Contact"));
const Privacy = lazy(() => import("@/pages/public/Privacy"));
const Terms = lazy(() => import("@/pages/public/Terms"));

const NotFound = lazy(() => import("@/pages/public/NotFound"));

const Login = lazy(() => import("@/pages/admin/Login"));

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const RecipesManager = lazy(() => import("@/pages/admin/RecipesManager"));
const CategoriesManager = lazy(() => import("@/pages/admin/CategoriesManager"));
const IngredientsManager = lazy(() => import("@/pages/admin/IngredientsManager"));
const CommentsManager = lazy(() => import("@/pages/admin/CommentsManager"));
const Settings = lazy(() => import("@/pages/admin/Settings"));

export default function AppRouter() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Suspense fallback={<LoadingScreen />}>

        <Routes>

          {/* PUBLIC */}

          <Route element={<PublicLayout />}>

            <Route
              path={ROUTES.HOME}
              element={<Home />}
            />

            <Route
              path={ROUTES.BROWSE}
              element={<BrowseRecipes />}
            />

            <Route
              path={ROUTES.RECIPE_DETAILS}
              element={<RecipeDetails />}
            />

            <Route
              path={ROUTES.ABOUT}
              element={<About />}
            />

            <Route
              path={ROUTES.CONTACT}
              element={<Contact />}
            />

            <Route
              path={ROUTES.PRIVACY}
              element={<Privacy />}
            />

            <Route
              path={ROUTES.TERMS}
              element={<Terms />}
            />

          </Route>

          {/* LOGIN */}

          <Route element={<AuthLayout />}>

            <Route
              path={ROUTES.LOGIN}
              element={<Login />}
            />

          </Route>

          {/* ADMIN */}

          <Route element={<ProtectedAdminRoute />}>

            <Route element={<AdminLayout />}>

              <Route
                path={ROUTES.DASHBOARD}
                element={<Dashboard />}
              />

              <Route
                path={ROUTES.RECIPES}
                element={<RecipesManager />}
              />

              <Route
                path={ROUTES.CATEGORIES}
                element={<CategoriesManager />}
              />

              <Route
                path={ROUTES.INGREDIENTS}
                element={<IngredientsManager />}
              />

              <Route
                path={ROUTES.COMMENTS}
                element={<CommentsManager />}
              />

              <Route
                path={ROUTES.SETTINGS}
                element={<Settings />}
              />

            </Route>

          </Route>

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

          {/* REDIRECTION */}

          <Route
            path=""
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}