/**
 * About page.
 */

import { useAuth } from "@/hooks";

import styles from "./About.module.scss";

// Constants

// Hooks

// Local state

// Memoized values

// Handlers

export default function About() {

   const {
    signIn,
    signOut,
    isAuthenticated,
    isAdmin,
    isLoading,
  } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn({
        email: "pf.devweb13@gmail.com",
        password: "Scafe1981#Ange#Alexis",
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Chargement…</p>;
  }

  return (
    <main className={styles.page}>
      <h1>About</h1>

      <div>
      <p>
        Session : {isAuthenticated ? "active" : "inactive"}
      </p>

      <p>
        Admin : {isAdmin ? "oui" : "non"}
      </p>

      {isAuthenticated ? (
        <button type="button" onClick={signOut}>
          Déconnexion
        </button>
      ) : (
        <button type="button" onClick={handleSignIn}>
          Connexion temporaire
        </button>
      )}
    </div>
    </main>
  );
}