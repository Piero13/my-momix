/**
 * Global loading screen.
 */

import Spinner from "react-bootstrap/Spinner";

import styles from "./LoadingScreen.module.scss";

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
    </div>
  );
}