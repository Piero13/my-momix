/**
 * Single preparation step editor.
 */

import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

import { AdminIconAction } from "@/components/admin";

import styles from "./PreparationStepRow.module.scss";

export default function PreparationStepRow({
  index,
  autoFocus = false,
  onRemove,
}) {
  const instructionRef = useRef(null);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const stepErrors =
    errors.steps?.[index];

  const instructionRegister = register(
    `steps.${index}.instruction`,
    {
      required:
        "La description de l’étape est obligatoire.",
      minLength: {
        value: 3,
        message:
          "L’étape doit contenir au moins 3 caractères.",
      },
    }
  );

  useEffect(() => {
    if (autoFocus) {
      instructionRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <article className={styles.step}>
      <div className={styles.header}>
        <div className={styles.stepNumber}>
          <span>Étape</span>
          <strong>{index + 1}</strong>
        </div>

        <AdminIconAction
          icon={FiTrash2}
          label={`Supprimer l’étape ${index + 1}`}
          variant="danger"
          onClick={() => onRemove(index)}
        />
      </div>

      <Form.Group
        controlId={`recipe-step-${index}-instruction`}
      >
        <Form.Label>
          Instructions
        </Form.Label>

        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Décrivez cette étape de préparation..."
          isInvalid={Boolean(
            stepErrors?.instruction
          )}
          {...instructionRegister}
          ref={(element) => {
            instructionRegister.ref(element);
            instructionRef.current = element;
          }}
        />

        <Form.Control.Feedback type="invalid">
          {stepErrors?.instruction?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </article>
  );
}