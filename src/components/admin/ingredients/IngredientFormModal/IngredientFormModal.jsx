import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { AppButton } from "@/components/ui";
import { normalizeIngredientName } from "@/utils";

import styles from "./IngredientFormModal.module.scss";

export default function IngredientFormModal({
  show,
  mode = "create",
  ingredient = null,
  isSubmitting = false,
  onSubmit,
  onClose,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!show) {
      return;
    }

    reset({
      name:
        mode === "edit"
          ? ingredient?.name ?? ""
          : "",
    });
  }, [
    show,
    mode,
    ingredient,
    reset,
  ]);

  const submitForm = (values) => {
    const normalizedName =
      normalizeIngredientName(
        values.name
      );

    onSubmit?.({
      name: normalizedName,
    });
  };

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
          handleSubmit(submitForm)
        }
      >
        <Modal.Header
          closeButton={!isSubmitting}
        >
          <Modal.Title>
            {mode === "edit"
              ? "Modifier l’ingrédient"
              : "Nouvel ingrédient"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="ingredient-name">
            <Form.Label>
              Nom
            </Form.Label>

            <Form.Control
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Ex. Pâte miso"
              isInvalid={Boolean(
                errors.name
              )}
              {...register("name", {
                required:
                  "Le nom est obligatoire.",
                validate: (value) =>
                  normalizeIngredientName(
                    value
                  ).length >= 2 ||
                  "Le nom doit contenir au moins 2 caractères.",
              })}
            />

            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
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