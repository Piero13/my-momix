/**
 * Single ingredient editor row.
 */

import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

import { 
  AdminIconAction, 
  IngredientAutocomplete,
} from "@/components/admin";
import { INGREDIENT_UNITS } from "@/constants";

import styles from "./IngredientRow.module.scss";

export default function IngredientRow({
  index,
  onRemove,
  autoFocus = false,
}) {
  const nameInputRef = useRef(null);

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const ingredientId = useWatch({
    control,
    name: `ingredients.${index}.ingredientId`,
  })

  const ingredientName = useWatch({
    control,
    name: `ingredients.${index}.name`,
  });

  const ingredientErrors =
    errors.ingredients?.[index];

  useEffect(() => {
    if (autoFocus) {
      nameInputRef.current?.focus();
    }
  }, [autoFocus]);

  const nameRegister = register(
    `ingredients.${index}.name`,
    {
      required:
        "Sélectionnez un ingrédient.",
    }
  );

  register(
    `ingredients.${index}.ingredientId`,
    {
      required:
        "Sélectionnez un ingrédient du catalogue.",
    }
  );

  const hasSelectedIngredient =
    typeof ingredientId === "string" &&
    ingredientId.length > 0;

  return (
    <article className={styles.row}>
      <div className={styles.main}>
        <Form.Group
          controlId={`ingredient-${index}-name`}
          className={styles.nameField}
        >
          <Form.Label>
            Ingrédient
          </Form.Label>

          <IngredientAutocomplete
            id={`ingredient-${index}-name`}
            value={ingredientName ?? ""}
            selectedId={ingredientId ?? ""}
            invalid={Boolean(
              ingredientErrors?.name ||
              ingredientErrors?.ingredientId
            )}
            inputRef={nameInputRef}
            onBlur={nameRegister.onBlur}
            onChange={(value) => {
              setValue(
                `ingredients.${index}.name`,
                value,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              );

              setValue(
                `ingredients.${index}.ingredientId`,
                "",
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              );
            }}
            onSelect={(ingredient) => {
              setValue(
                `ingredients.${index}.ingredientId`,
                ingredient.id,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              );

              setValue(
                `ingredients.${index}.name`,
                ingredient.name,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              );
            }}
          />

          {ingredientErrors?.ingredientId ? (
            <div className={styles.error}>
              {ingredientErrors.ingredientId.message}
            </div>
          ) : null}

          <Form.Control.Feedback type="invalid">
            {ingredientErrors?.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {hasSelectedIngredient ? (
          <div className={styles.details}>
            <Form.Group
              controlId={`ingredient-${index}-quantity`}
            >
              <Form.Label>
                Quantité
              </Form.Label>

              <Form.Control
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="0"
                isInvalid={Boolean(
                  ingredientErrors?.quantity
                )}
                {...register(
                  `ingredients.${index}.quantity`,
                  {
                    min: {
                      value: 0,
                      message:
                        "La quantité ne peut pas être négative.",
                    },
                  }
                )}
              />

              <Form.Control.Feedback type="invalid">
                {
                  ingredientErrors?.quantity
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId={`ingredient-${index}-unit`}
            >
              <Form.Label>
                Unité
              </Form.Label>

              <Form.Select
                {...register(
                  `ingredients.${index}.unit`
                )}
              >
                <option value="">
                  Sans unité
                </option>

                {INGREDIENT_UNITS.map(
                  (unit) => (
                    <option
                      key={unit.value}
                      value={unit.value}
                    >
                      {unit.label}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
          </div>
        ) : null}
      </div>

      <div className={styles.remove}>
        <AdminIconAction
          icon={FiTrash2}
          label={`Supprimer l’ingrédient ${
            index + 1
          }`}
          variant="danger"
          onClick={() => onRemove(index)}
        />
      </div>
    </article>
  );
}