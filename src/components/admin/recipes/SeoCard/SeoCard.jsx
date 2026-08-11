/**
 * Recipe SEO metadata editor.
 */

import { Form } from "react-bootstrap";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";

import styles from "./SeoCard.module.scss";

const META_TITLE_MAX = 60;
const META_DESCRIPTION_MAX = 160;

export default function SeoCard() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [
    title,
    description,
    metaTitle,
    metaDescription,
  ] = useWatch({
    control,
    name: [
      "title",
      "description",
      "metaTitle",
      "metaDescription",
    ],
  });

  const previewTitle =
    metaTitle?.trim() ||
    title?.trim() ||
    "Titre de la recette";

  const previewDescription =
    metaDescription?.trim() ||
    description?.trim() ||
    "Description de la recette.";

  const metaTitleLength =
    metaTitle?.length ?? 0;

  const metaDescriptionLength =
    metaDescription?.length ?? 0;

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-seo-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Référencement
          </p>

          <h2
            id="recipe-seo-title"
            className={styles.title}
          >
            SEO
          </h2>

          <p className={styles.description}>
            Personnalisez les informations utilisées
            par les moteurs de recherche.
          </p>
        </div>
      </header>

      <div className={styles.fields}>
        <Form.Group controlId="recipe-meta-title">
          <div className={styles.labelRow}>
            <Form.Label>
              Meta title
            </Form.Label>

            <span className={styles.counter}>
              {metaTitleLength}/{META_TITLE_MAX}
            </span>
          </div>

          <Form.Control
            type="text"
            placeholder="Laissez vide pour utiliser le titre de la recette."
            maxLength={META_TITLE_MAX}
            isInvalid={Boolean(
              errors.metaTitle
            )}
            {...register("metaTitle", {
              maxLength: {
                value: META_TITLE_MAX,
                message:
                  `Le meta title ne doit pas dépasser ${META_TITLE_MAX} caractères.`,
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.metaTitle?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="recipe-meta-description">
          <div className={styles.labelRow}>
            <Form.Label>
              Meta description
            </Form.Label>

            <span className={styles.counter}>
              {metaDescriptionLength}/
              {META_DESCRIPTION_MAX}
            </span>
          </div>

          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Laissez vide pour utiliser la description de la recette."
            maxLength={
              META_DESCRIPTION_MAX
            }
            isInvalid={Boolean(
              errors.metaDescription
            )}
            {...register(
              "metaDescription",
              {
                maxLength: {
                  value:
                    META_DESCRIPTION_MAX,
                  message:
                    `La meta description ne doit pas dépasser ${META_DESCRIPTION_MAX} caractères.`,
                },
              }
            )}
          />

          <Form.Control.Feedback type="invalid">
            {errors.metaDescription?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className={styles.preview}>
        <p className={styles.previewLabel}>
          Aperçu
        </p>

        <div className={styles.previewCard}>
          <p className={styles.previewUrl}>
            mymomix.app/recette/...
          </p>

          <p className={styles.previewTitle}>
            {previewTitle}
          </p>

          <p className={styles.previewDescription}>
            {previewDescription}
          </p>
        </div>
      </div>
    </section>
  );
}