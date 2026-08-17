import {
  Form,
} from "react-bootstrap";
import {
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";

import {
  AppButton,
  SectionHeader,
} from "@/components/ui";

import {
  createPublicComment,
} from "@/services";

import styles from "./RecipeCommentForm.module.scss";

const DEFAULT_VALUES = {
  authorName: "",
  email: "",
  content: "",
  rating: "",
};

export default function RecipeCommentForm({
  recipeId,
}) {
  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues:
      DEFAULT_VALUES,
    mode: "onBlur",
  });

  const onSubmit = async (
    values
  ) => {
    if (!recipeId) {
      return;
    }

    try {
      await createPublicComment({
        recipeId,
        ...values,
      });

      reset();

      toast.success(
        "Merci pour votre commentaire. Il sera visible après modération."
      );
    } catch (error) {
      console.error(
        "Unable to submit comment:",
        error
      );

      toast.error(
        "Impossible d’envoyer votre commentaire."
      );
    }
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="recipe-comment-form-title"
    >
      <SectionHeader
        headingId="recipe-comment-form-title"
        eyebrow="Votre avis"
        title="Laisser un commentaire"
        description="Partagez votre retour sur cette recette. Votre commentaire sera publié après modération."
      />

      <Form
        className={styles.form}
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
      >
        <div className={styles.row}>
          <Form.Group controlId="comment-author-name">
            <Form.Label>
              Nom
            </Form.Label>

            <Form.Control
              type="text"
              autoComplete="name"
              isInvalid={Boolean(
                errors.authorName
              )}
              {...register(
                "authorName",
                {
                  required:
                    "Votre nom est obligatoire.",
                  minLength: {
                    value: 2,
                    message:
                      "Votre nom doit contenir au moins 2 caractères.",
                  },
                }
              )}
            />

            <Form.Control.Feedback type="invalid">
              {errors.authorName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="comment-email">
            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              type="email"
              autoComplete="email"
              placeholder="Facultatif"
              isInvalid={Boolean(
                errors.email
              )}
              {...register(
                "email",
                {
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "L’adresse email n’est pas valide.",
                  },
                }
              )}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <Form.Group controlId="comment-rating">
          <Form.Label>
            Note
          </Form.Label>

          <Form.Select
            isInvalid={Boolean(
              errors.rating
            )}
            {...register(
              "rating",
              {
                valueAsNumber: true,
              }
            )}
          >
            <option value="">
              Sans note
            </option>

            <option value="5">
              5 — Excellent
            </option>

            <option value="4">
              4 — Très bon
            </option>

            <option value="3">
              3 — Bon
            </option>

            <option value="2">
              2 — Moyen
            </option>

            <option value="1">
              1 — Décevant
            </option>
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            {errors.rating?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="comment-content">
          <Form.Label>
            Commentaire
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Partagez votre expérience avec cette recette..."
            isInvalid={Boolean(
              errors.content
            )}
            {...register(
              "content",
              {
                required:
                  "Le commentaire est obligatoire.",

                minLength: {
                  value: 10,
                  message:
                    "Le commentaire doit contenir au moins 10 caractères.",
                },

                maxLength: {
                  value: 1000,
                  message:
                    "Le commentaire ne doit pas dépasser 1000 caractères.",
                },
              }
            )}
          />

          <Form.Control.Feedback type="invalid">
            {errors.content?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className={styles.actions}>
          <AppButton
            type="submit"
            variant="primary"
            disabled={
              isSubmitting
            }
          >
            {isSubmitting
              ? "Envoi…"
              : "Publier mon commentaire"}
          </AppButton>
        </div>
      </Form>
    </section>
  );
}