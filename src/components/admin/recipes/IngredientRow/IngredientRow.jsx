/**
 * Single ingredient editor row.
 */

import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

import {
  AdminConfirmModal,
  AdminIconAction, 
  IngredientAutocomplete,
} from "@/components/admin";

import { INGREDIENT_UNITS } from "@/constants";

import {
  createIngredient,
  findIngredientByName,
} from "@/services";

import {
  normalizeIngredientName,
} from "@/utils";

import styles from "./IngredientRow.module.scss";

export default function IngredientRow({
  index,
  onRemove,
  autoFocus = false,
}) {
  const nameInputRef = useRef(null);

  const [
    pendingIngredientName,
    setPendingIngredientName,
  ] = useState("");

  const [
    isCreatingIngredient,
    setIsCreatingIngredient,
  ] = useState(false);

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
  
  const selectIngredient = (ingredient) => {
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
  };

  const handleCreateIngredient = async () => {
    if (!pendingIngredientName) {
      return;
    }

    try {
      setIsCreatingIngredient(true);

      const existingIngredient =
        await findIngredientByName(
          pendingIngredientName
        );

      if (existingIngredient) {
        selectIngredient(
          existingIngredient
        );

        toast.success(
          "Cet ingrédient existe déjà et a été sélectionné."
        );

        setPendingIngredientName("");

        return;
      }

      const ingredient =
        await createIngredient(
          pendingIngredientName
        );

      selectIngredient(ingredient);

      toast.success(
        "Ingrédient ajouté au catalogue."
      );

      setPendingIngredientName("");
    } catch (error) {
      console.error(
        "Unable to create ingredient:",
        error
      );

      toast.error(
        "Impossible de créer l’ingrédient."
      );
    } finally {
      setIsCreatingIngredient(false);
    }
  };

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
            onSelect={selectIngredient}
            onCreateRequested={(name) => {
              setPendingIngredientName(
                normalizeIngredientName(name)
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

      <AdminConfirmModal
        show={Boolean(
          pendingIngredientName
        )}
        title="Créer cet ingrédient ?"
        message={pendingIngredientName}
        description="L’ingrédient sera ajouté au catalogue et immédiatement sélectionné."
        confirmLabel="Créer"
        variant="default"
        isLoading={isCreatingIngredient}
        onCancel={() =>
          setPendingIngredientName("")
        }
        onConfirm={
          handleCreateIngredient
        }
      />
    </article>
  );
}