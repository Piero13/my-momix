/**
 * Application logo.
 */

import { Link } from "react-router-dom";

import { ROUTES } from "@/constants";

import styles from "./Logo.module.scss";

export default function Logo() {
    return (
        <Link
            to={ROUTES.HOME}
            className={styles.logo}
            aria-label="Retour à l'accueil"
        >
            <span className={styles.text}>
                <span>My</span>
                <span className={styles.highlight}>Momix</span>
            </span>
        </Link>
    );
}