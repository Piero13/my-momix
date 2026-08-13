import { Form } from "react-bootstrap";
import {
  useFormContext,
} from "react-hook-form";

import styles from "./GeneralSettingsCard.module.scss";

export default function GeneralSettingsCard() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section
      className={styles.card}
      aria-labelledby="settings-general-title"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          Application
        </p>

        <h2
          id="settings-general-title"
          className={styles.title}
        >
          Paramètres généraux
        </h2>

        <p className={styles.description}>
          Configurez les informations principales
          utilisées par MyMomix.
        </p>
      </header>

      <div className={styles.fields}>
        <Form.Group controlId="settings-app-name">
          <Form.Label>
            Nom de l’application
          </Form.Label>

          <Form.Control
            type="text"
            isInvalid={Boolean(
              errors.appName
            )}
            {...register("appName", {
              required:
                "Le nom de l’application est obligatoire.",
              minLength: {
                value: 2,
                message:
                  "Le nom doit contenir au moins 2 caractères.",
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.appName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="settings-app-description">
          <Form.Label>
            Description courte
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Décrivez brièvement l’application..."
            {...register(
              "appDescription"
            )}
          />
        </Form.Group>

        <Form.Group controlId="settings-public-url">
          <Form.Label>
            URL publique
          </Form.Label>

          <Form.Control
            type="url"
            placeholder="https://..."
            isInvalid={Boolean(
              errors.publicUrl
            )}
            {...register("publicUrl", {
              validate: (value) => {
                if (!value) {
                  return true;
                }

                try {
                  new URL(value);
                  return true;
                } catch {
                  return "L’URL saisie n’est pas valide.";
                }
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.publicUrl?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </section>
  );
}