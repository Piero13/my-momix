/**
 * General recipe information fields.
 */

import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

// import { RECIPE_STATUS_OPTIONS } from "@/constants";

import styles from "./GeneralInformationCard.module.scss";

export default function GeneralInformationCard({
  categories = [],
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-general-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Recette
          </p>

          <h2
            id="recipe-general-title"
            className={styles.title}
          >
            Informations générales
          </h2>
        </div>
      </header>

      <div className={styles.fields}>
        <Form.Group controlId="recipe-title">
          <Form.Label>
            Titre
          </Form.Label>

          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="Ex. Velouté de courgettes"
            isInvalid={Boolean(errors.title)}
            {...register("title", {
              required:
                "Le titre est obligatoire.",
              minLength: {
                value: 3,
                message:
                  "Le titre doit contenir au moins 3 caractères.",
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="recipe-slug">
          <Form.Label>
            Slug
          </Form.Label>

          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="veloute-de-courgettes"
            isInvalid={Boolean(errors.slug)}
            {...register("slug", {
              required:
                "Le slug est obligatoire.",
              pattern: {
                value:
                  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message:
                  "Utilisez uniquement des lettres minuscules, chiffres et tirets.",
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.slug?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="recipe-description"
          className={styles.fullWidth}
        >
          <Form.Label>
            Description
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Décrivez brièvement la recette."
            isInvalid={Boolean(
              errors.description
            )}
            {...register("description", {
              maxLength: {
                value: 500,
                message:
                  "La description ne doit pas dépasser 500 caractères.",
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="recipe-category">
          <Form.Label>
            Catégorie
          </Form.Label>

          <Form.Select
            isInvalid={Boolean(
              errors.categoryId
            )}
            {...register("categoryId")}
          >
            <option value="">
              Aucune catégorie
            </option>

            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
              >
                {category.label}
              </option>
            ))}
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="recipe-difficulty">
          <Form.Label>
            Difficulté
          </Form.Label>

          <Form.Select
            isInvalid={Boolean(
              errors.difficulty
            )}
            {...register("difficulty", {
              required:
                "La difficulté est obligatoire.",
            })}
          >
            <option value="easy">
              Facile
            </option>

            <option value="medium">
              Intermédiaire
            </option>

            <option value="hard">
              Difficile
            </option>
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            {errors.difficulty?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="recipe-servings">
          <Form.Label>
            Portions
          </Form.Label>

          <Form.Control
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            isInvalid={Boolean(
              errors.servings
            )}
            {...register("servings", {
              required:
                "Le nombre de portions est obligatoire.",
              valueAsNumber: true,
              min: {
                value: 1,
                message:
                  "Le nombre de portions doit être supérieur à zéro.",
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.servings?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </section>
  );
}