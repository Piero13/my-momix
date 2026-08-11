import {
  useEffect,
  useRef,
} from "react";
import {
  Form,
  Modal,
} from "react-bootstrap";
import {
  useForm,
  useWatch,
} from "react-hook-form";

import { AppButton } from "@/components/ui";
import { generateSlug } from "@/utils";

import styles from "./CategoryFormModal.module.scss";

export default function CategoryFormModal({
  show,
  mode = "create",
  category = null,
  isSubmitting = false,
  onSubmit,
  onClose,
}) {
  const slugEditedRef =
    useRef(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
    mode: "onBlur",
  });

  const name = useWatch({
    control,
    name: "name",
  });

  useEffect(() => {
    if (!show) {
      return;
    }

    slugEditedRef.current =
      mode === "edit";

    reset({
      name:
        category?.name ?? "",
      slug:
        category?.slug ?? "",
      description:
        category?.description ?? "",
    });
  }, [
    show,
    mode,
    category,
    reset,
  ]);

  useEffect(() => {
    if (
      !show ||
      slugEditedRef.current
    ) {
      return;
    }

    setValue(
      "slug",
      generateSlug(name ?? ""),
      {
        shouldDirty: false,
        shouldValidate: true,
      }
    );
  }, [
    show,
    name,
    setValue,
  ]);

  const slugRegister = register(
    "slug",
    {
      required:
        "Le slug est obligatoire.",
      pattern: {
        value:
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        message:
          "Utilisez uniquement des lettres minuscules, chiffres et tirets.",
      },
    }
  );

  return (
    <Modal
      show={show}
      centered
      backdrop={
        isSubmitting
          ? "static"
          : true
      }
      keyboard={!isSubmitting}
      onHide={
        isSubmitting
          ? undefined
          : onClose
      }
    >
      <Form
        onSubmit={
          handleSubmit(onSubmit)
        }
      >
        <Modal.Header
          closeButton={!isSubmitting}
        >
          <Modal.Title>
            {mode === "edit"
              ? "Modifier la catégorie"
              : "Nouvelle catégorie"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.fields}>
            <Form.Group controlId="category-name">
              <Form.Label>
                Nom
              </Form.Label>

              <Form.Control
                type="text"
                autoComplete="off"
                autoFocus
                isInvalid={Boolean(
                  errors.name
                )}
                {...register("name", {
                  required:
                    "Le nom est obligatoire.",
                  minLength: {
                    value: 2,
                    message:
                      "Le nom doit contenir au moins 2 caractères.",
                  },
                })}
              />

              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="category-slug">
              <Form.Label>
                Slug
              </Form.Label>

              <Form.Control
                type="text"
                autoComplete="off"
                isInvalid={Boolean(
                  errors.slug
                )}
                {...slugRegister}
                onChange={(event) => {
                  slugEditedRef.current =
                    true;

                  slugRegister.onChange(
                    event
                  );
                }}
              />

              <Form.Control.Feedback type="invalid">
                {errors.slug?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="category-description">
              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description facultative..."
                {...register(
                  "description"
                )}
              />
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer
          className={styles.footer}
        >
          <AppButton
            type="button"
            variant="outline-secondary"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Annuler
          </AppButton>

          <AppButton
            type="submit"
            variant="primary"
            disabled={
              isSubmitting ||
              (
                mode === "edit" &&
                !isDirty
              )
            }
          >
            {isSubmitting
              ? "Enregistrement…"
              : mode === "edit"
                ? "Enregistrer"
                : "Créer"}
          </AppButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}