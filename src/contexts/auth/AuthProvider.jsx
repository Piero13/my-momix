/**
 * Provides the current Supabase authentication state.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/lib";
import {
  getCurrentAdminStatus,
  getCurrentSession,
  signInWithEmail,
  signOutCurrentUser,
} from "@/services";

import { AuthContext } from "./AuthContext";

const INITIAL_AUTH_STATE = {
  session: null,
  isAdmin: false,
  isLoading: true,
  error: null,
};

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(
    INITIAL_AUTH_STATE
  );

  /**
   * Resolves both the authenticated session and the
   * application-level administrator permission.
   */
  const resolveSession = useCallback(async (session) => {
    if (!session) {
      setAuthState({
        session: null,
        isAdmin: false,
        isLoading: false,
        error: null,
      });

      return;
    }

    try {
      const isAdmin = await getCurrentAdminStatus();

      setAuthState({
        session,
        isAdmin,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(
        "Unable to resolve administrator status:",
        error
      );

      setAuthState({
        session,
        isAdmin: false,
        isLoading: false,
        error,
      });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const session = await getCurrentSession();

        if (isMounted) {
          await resolveSession(session);
        }
      } catch (error) {
        console.error(
          "Unable to restore authentication session:",
          error
        );

        if (isMounted) {
          setAuthState({
            session: null,
            isAdmin: false,
            isLoading: false,
            error,
          });
        }
      }
    }

    void initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        /*
         * Keep the Supabase callback synchronous.
         * The asynchronous work is deliberately delegated.
         */
        if (isMounted) {
          void resolveSession(session);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [resolveSession]);

  const signIn = useCallback(async (credentials) => {
    setAuthState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
    }));

    try {
      const data = await signInWithEmail(credentials);

      /*
       * onAuthStateChange will receive SIGNED_IN and perform
       * the administrator lookup.
       */
      return data;
    } catch (error) {
      setAuthState((currentState) => ({
        ...currentState,
        isLoading: false,
        error,
      }));

      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
    }));

    try {
      await signOutCurrentUser();

      /*
       * onAuthStateChange will receive SIGNED_OUT and clear
       * the state.
       */
    } catch (error) {
      setAuthState((currentState) => ({
        ...currentState,
        isLoading: false,
        error,
      }));

      throw error;
    }
  }, []);

  const value = useMemo(() => {
    const user = authState.session?.user ?? null;

    return {
      session: authState.session,
      user,
      isAuthenticated: Boolean(user),
      isAdmin: authState.isAdmin,
      isLoading: authState.isLoading,
      authError: authState.error,
      signIn,
      signOut,
    };
  }, [
    authState,
    signIn,
    signOut,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}