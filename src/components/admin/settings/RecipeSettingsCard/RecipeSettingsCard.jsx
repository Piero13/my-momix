import { Form } from "react-bootstrap";
import {
  useFormContext,
} from "react-hook-form";

import {
  RECIPE_DIFFICULTY_OPTIONS,
  RECIPE_STATUS_OPTIONS,
} from "@/constants";

import styles from "./RecipeSettingsCard.module.scss";

export default function RecipeSettingsCard() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section
      className={styles.card}
      aria-labelledby="settings-recipes-title"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          Recettes
        </p>

        <h2
          id="settings-recipes-title"
          className={styles.title}
        >
          Valeurs par défaut
        </h2>

        <p className={styles.description}>
          Définissez les valeurs proposées lors de la
          création d’une nouvelle recette.
        </p>
      </header>

      <div className={styles.fields}>
        <Form.Group controlId="settings-default-servings">
          <Form.Label>
            Portions par défaut
          </Form.Label>

          <Form.Control
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            isInvalid={Boolean(
              errors.defaultServings
            )}
            {...register(
              "defaultServings",
              {
                valueAsNumber: true,
                required:
                  "Le nombre de portions est obligatoire.",
                min: {
                  value: 1,
                  message:
                    "Le nombre de portions doit être supérieur à 0.",
                },
              }
            )}
          />

          <Form.Control.Feedback type="invalid">
            {errors.defaultServings?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="settings-default-difficulty">
          <Form.Label>
            Difficulté par défaut
          </Form.Label>

          <Form.Select
            isInvalid={Boolean(
              errors.defaultDifficulty
            )}
            {...register(
              "defaultDifficulty",
              {
                required:
                  "La difficulté est obligatoire.",
              }
            )}
          >
            {RECIPE_DIFFICULTY_OPTIONS.map(
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
            {errors.defaultDifficulty?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="settings-default-status">
          <Form.Label>
            Statut initial
          </Form.Label>

          <Form.Select
            isInvalid={Boolean(
              errors.defaultRecipeStatus
            )}
            {...register(
              "defaultRecipeStatus",
              {
                required:
                  "Le statut par défaut est obligatoire.",
              }
            )}
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
            {errors.defaultRecipeStatus?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </section>
  );
}