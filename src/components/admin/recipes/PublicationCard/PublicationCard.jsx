/**
 * Recipe publication settings.
 */

import { Form } from "react-bootstrap";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  FiCheckCircle,
  FiEye,
  FiFileText,
} from "react-icons/fi";

import {
  RECIPE_STATUS_OPTIONS,
} from "@/constants";

import styles from "./PublicationCard.module.scss";

export default function PublicationCard() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const status = useWatch({
    control,
    name: "status",
  });

  const isPublished =
    status === "published";

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-publication-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Visibilité
          </p>

          <h2
            id="recipe-publication-title"
            className={styles.title}
          >
            Publication
          </h2>

          <p className={styles.description}>
            Choisissez si la recette reste en brouillon
            ou devient visible publiquement.
          </p>
        </div>
      </header>

      <div className={styles.content}>
        <Form.Group controlId="recipe-status">
          <Form.Label>
            Statut
          </Form.Label>

          <Form.Select
            isInvalid={Boolean(errors.status)}
            {...register("status", {
              required:
                "Le statut est obligatoire.",
            })}
          >
            {RECIPE_STATUS_OPTIONS.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )
            )}
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            {errors.status?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className={styles.statusPreview}>
          <span
            className={styles.statusIcon}
            aria-hidden="true"
          >
            {isPublished ? (
              <FiEye />
            ) : (
              <FiFileText />
            )}
          </span>

          <div>
            <span className={styles.statusLabel}>
              État actuel
            </span>

            <strong className={styles.statusValue}>
              {isPublished
                ? "Visible publiquement"
                : status === "archived"
                  ? "Archivée"
                  : "Brouillon"}
            </strong>
          </div>
        </div>

        {isPublished ? (
          <div className={styles.notice}>
            <FiCheckCircle aria-hidden="true" />

            <p>
              La recette sera accessible depuis la partie
              publique de MyMomix.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}