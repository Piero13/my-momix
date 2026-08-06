/**
 * Returns the current authentication context.
 */

import { useContext } from "react";

import { AuthContext } from "@/contexts";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}