import { Form } from "react-bootstrap";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";

import styles from "./SeoSettingsCard.module.scss";

const META_TITLE_MAX = 60;
const META_DESCRIPTION_MAX = 160;

export default function SeoSettingsCard() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [
    appName,
    appDescription,
    publicUrl,
    metaTitle,
    metaDescription,
  ] = useWatch({
    control,
    name: [
      "appName",
      "appDescription",
      "publicUrl",
      "metaTitle",
      "metaDescription",
    ],
  });

  const previewTitle =
    metaTitle?.trim() ||
    appName?.trim() ||
    "MyMomix";

  const previewDescription =
    metaDescription?.trim() ||
    appDescription?.trim() ||
    "Mes recettes Thermomix.";

  const previewUrl =
    publicUrl?.trim() ||
    "https://my-momix.netlify.app";

  const metaTitleLength =
    metaTitle?.length ?? 0;

  const metaDescriptionLength =
    metaDescription?.length ?? 0;

  return (
    <section
      className={styles.card}
      aria-labelledby="settings-seo-title"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          Référencement
        </p>

        <h2
          id="settings-seo-title"
          className={styles.title}
        >
          SEO global
        </h2>

        <p className={styles.description}>
          Configurez les métadonnées utilisées comme
          valeurs par défaut dans l’application.
        </p>
      </header>

      <div className={styles.fields}>
        <Form.Group controlId="settings-meta-title">
          <div className={styles.labelRow}>
            <Form.Label>
              Meta title global
            </Form.Label>

            <span className={styles.counter}>
              {metaTitleLength}/{META_TITLE_MAX}
            </span>
          </div>

          <Form.Control
            type="text"
            maxLength={META_TITLE_MAX}
            placeholder="Laissez vide pour utiliser le nom de l’application."
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

        <Form.Group controlId="settings-meta-description">
          <div className={styles.labelRow}>
            <Form.Label>
              Meta description globale
            </Form.Label>

            <span className={styles.counter}>
              {metaDescriptionLength}/
              {META_DESCRIPTION_MAX}
            </span>
          </div>

          <Form.Control
            as="textarea"
            rows={4}
            maxLength={
              META_DESCRIPTION_MAX
            }
            placeholder="Laissez vide pour utiliser la description de l’application."
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
            {previewUrl}
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