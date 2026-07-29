/**
 * Protect administration routes.
 */

import { Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  /**
   * TODO
   * Check Supabase session.
   */

  return <Outlet />;
}