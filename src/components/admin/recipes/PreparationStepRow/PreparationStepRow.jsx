/**
 * Single preparation step editor.
 */

import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { 
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

import { AdminIconAction } from "@/components/admin";
import { AppButton } from "@/components/ui";

import { 
  THERMOMIX_SPEED_OPTIONS, 
  THERMOMIX_TEMPERATURE_OPTIONS,
} from "@/constants";

import styles from "./PreparationStepRow.module.scss";

export default function PreparationStepRow({
  index,
  autoFocus = false,
  onRemove,
}) {
  const instructionRef = useRef(null);

  const {
    control,
    register,
    setValue,
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

  const hasThermomixSettings = useWatch({
    control,
    name: `steps.${index}.hasThermomixSettings`,
  });

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

        <div className={styles.thermomixToggle}>
          <AppButton
            type="button"
            variant="outline-secondary"
            onClick={() => {
              setValue(
                `steps.${index}.hasThermomixSettings`,
                !hasThermomixSettings,
                {
                  shouldDirty: true,
                }
              );
            }}
          >
            {hasThermomixSettings
              ? "Masquer les paramètres Thermomix"
              : "Ajouter des paramètres Thermomix"}
          </AppButton>
        </div>

        {hasThermomixSettings ? (
          <div className={styles.thermomixSettings}>
            <div className={styles.durationFields}>
              <Form.Group
                controlId={`recipe-step-${index}-duration-hours`}
              >
                <Form.Label>
                  Heures
                </Form.Label>

                <Form.Control
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  {...register(
                    `steps.${index}.durationHours`,
                    {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message:
                          "La durée ne peut pas être négative.",
                      },
                    }
                  )}
                />
              </Form.Group>

              <Form.Group
                controlId={`recipe-step-${index}-duration-minutes`}
              >
                <Form.Label>
                  Minutes
                </Form.Label>

                <Form.Control
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  inputMode="numeric"
                  {...register(
                    `steps.${index}.durationMinutes`,
                    {
                      valueAsNumber: true,
                      min: 0,
                      max: {
                        value: 59,
                        message:
                          "Les minutes doivent être comprises entre 0 et 59.",
                      },
                    }
                  )}
                />
              </Form.Group>

              <Form.Group
                controlId={`recipe-step-${index}-duration-seconds`}
              >
                <Form.Label>
                  Secondes
                </Form.Label>

                <Form.Control
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  inputMode="numeric"
                  {...register(
                    `steps.${index}.durationSeconds`,
                    {
                      valueAsNumber: true,
                      min: 0,
                      max: {
                        value: 59,
                        message:
                          "Les secondes doivent être comprises entre 0 et 59.",
                      },
                    }
                  )}
                />
              </Form.Group>
            </div>

            <Form.Group
              controlId={`recipe-step-${index}-temperature`}
            >
              <Form.Label>Température</Form.Label>

              <Form.Select
                {...register(
                  `steps.${index}.temperature`
                )}
              >
                {THERMOMIX_TEMPERATURE_OPTIONS.map(
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
              controlId={`recipe-step-${index}-speed`}
            >
              <Form.Label>Vitesse</Form.Label>

              <Form.Select
                {...register(
                  `steps.${index}.speed`
                )}
              >
                {THERMOMIX_SPEED_OPTIONS.map(
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
              controlId={`recipe-step-${index}-reverse`}
              className={styles.reverseField}
            >
              <Form.Check
                type="switch"
                label="Sens inverse"
                {...register(
                  `steps.${index}.reverse`
                )}
              />
            </Form.Group>
          </div>
        ) : null}

        <Form.Control.Feedback type="invalid">
          {stepErrors?.instruction?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </article>
  );
}