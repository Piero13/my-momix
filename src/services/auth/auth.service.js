/**
 * Supabase authentication service.
 */

import { supabase } from "@/lib";

/**
 * Signs in an existing user with email and password.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<import("@supabase/supabase-js").AuthResponse["data"]>}
 */
export async function signInWithEmail({
  email,
  password,
}) {
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Signs out the current browser session.
 *
 * @returns {Promise<void>}
 */
export async function signOutCurrentUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/**
 * Returns the locally available Supabase session.
 *
 * @returns {Promise<import("@supabase/supabase-js").Session|null>}
 */
export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}

/**
 * Checks whether the authenticated user has an active
 * administrator record.
 *
 * RLS ensures that the user can only read their own record.
 *
 * @returns {Promise<boolean>}
 */
export async function getCurrentAdminStatus() {
  const { data, error } = await supabase
    .from("admins")
    .select("is_active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.is_active === true;
}