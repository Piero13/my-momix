/**
 * Prevents an authenticated administrator from reopening
 * the login page.
 */

import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";

export default function ProtectedGuestRoute() {
  const {
    isAuthenticated,
    isAdmin,
    isLoading,
  } = useAuth();

  console.log("ProtectedGuestRoute", {
    isAuthenticated,
    isAdmin,
    isLoading,
  });

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

  if (isAuthenticated && isAdmin) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return <Outlet />;
}