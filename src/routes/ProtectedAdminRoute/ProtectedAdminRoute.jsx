/**
 * Restricts a route to active administrators.
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";

export default function ProtectedAdminRoute() {
  const {
    isAuthenticated,
    isAdmin,
    isLoading,
  } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
      >
        Chargement de votre session…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to={ROUTES.UNAUTHORIZED}
        replace
      />
    );
  }

  return <Outlet />;
}