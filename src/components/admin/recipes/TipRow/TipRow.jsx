import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

import { AdminIconAction } from "@/components/admin";
import { RECIPE_TIP_TYPES } from "@/constants";

import styles from "./TipRow.module.scss";

export default function TipRow({
  index,
  autoFocus = false,
  onRemove,
}) {
  const contentRef = useRef(null);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const tipErrors =
    errors.tips?.[index];

  const contentRegister = register(
    `tips.${index}.content`,
    {
      required:
        "Le contenu de l’astuce est obligatoire.",
      minLength: {
        value: 3,
        message:
          "L’astuce doit contenir au moins 3 caractères.",
      },
    }
  );

  useEffect(() => {
    if (autoFocus) {
      contentRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <article className={styles.tip}>
      <div className={styles.header}>
        <strong>
          Astuce {index + 1}
        </strong>

        <AdminIconAction
          icon={FiTrash2}
          label={`Supprimer l’astuce ${index + 1}`}
          variant="danger"
          onClick={() => onRemove(index)}
        />
      </div>

      <div className={styles.fields}>
        <Form.Group
          controlId={`recipe-tip-${index}-type`}
        >
          <Form.Label>Type</Form.Label>

          <Form.Select
            {...register(
              `tips.${index}.type`
            )}
          >
            {RECIPE_TIP_TYPES.map(
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
        </Form.Group>

        <Form.Group
          controlId={`recipe-tip-${index}-content`}
        >
          <Form.Label>
            Contenu
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ajoutez votre conseil..."
            isInvalid={Boolean(
              tipErrors?.content
            )}
            {...contentRegister}
            ref={(element) => {
              contentRegister.ref(element);
              contentRef.current = element;
            }}
          />

          <Form.Control.Feedback type="invalid">
            {tipErrors?.content?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </article>
  );
}