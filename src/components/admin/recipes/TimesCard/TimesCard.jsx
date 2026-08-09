/**
 * Recipe timing and servings fields.
 */

import { Form, InputGroup } from "react-bootstrap";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  FiClock,
  FiThermometer,
  FiUsers,
} from "react-icons/fi";

import { formatDuration } from "@/utils";

import styles from "./TimesCard.module.scss";

function getNumericValue(value) {
  const number = Number(value);

  return Number.isFinite(number) && number >= 0
    ? number
    : 0;
}

export default function TimesCard() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const [
    preparationTime,
    cookingTime,
  ] = useWatch({
    control,
    name: [
      "preparationTime",
      "cookingTime",
    ],
  });

  const totalTime =
    getNumericValue(preparationTime) +
    getNumericValue(cookingTime);

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-times-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Durée & quantité
          </p>

          <h2
            id="recipe-times-title"
            className={styles.title}
          >
            Temps et portions
          </h2>
        </div>
      </header>

      <div className={styles.fields}>
        <Form.Group controlId="recipe-preparation-time">
          <Form.Label>
            <FiClock aria-hidden="true" />
            <span>Préparation</span>
          </Form.Label>

          <InputGroup hasValidation>
            <Form.Control
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="0"
              isInvalid={Boolean(
                errors.preparationTime
              )}
              {...register(
                "preparationTime",
                {
                  min: {
                    value: 0,
                    message:
                      "Le temps ne peut pas être négatif.",
                  },
                }
              )}
            />

            <InputGroup.Text>
              min
            </InputGroup.Text>

            <Form.Control.Feedback type="invalid">
              {errors.preparationTime?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="recipe-cooking-time">
          <Form.Label>
            <FiThermometer aria-hidden="true" />
            <span>Cuisson</span>
          </Form.Label>

          <InputGroup hasValidation>
            <Form.Control
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="0"
              isInvalid={Boolean(
                errors.cookingTime
              )}
              {...register(
                "cookingTime",
                {
                  min: {
                    value: 0,
                    message:
                      "Le temps ne peut pas être négatif.",
                  },
                }
              )}
            />

            <InputGroup.Text>
              min
            </InputGroup.Text>

            <Form.Control.Feedback type="invalid">
              {errors.cookingTime?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="recipe-servings">
          <Form.Label>
            <FiUsers aria-hidden="true" />
            <span>Portions</span>
          </Form.Label>

          <Form.Control
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            isInvalid={Boolean(
              errors.servings
            )}
            {...register("servings", {
              required:
                "Le nombre de portions est obligatoire.",
              valueAsNumber: true,
              min: {
                value: 1,
                message:
                  "Le nombre de portions doit être supérieur à zéro.",
              },
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.servings?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className={styles.total}>
          <span
            className={styles.totalIcon}
            aria-hidden="true"
          >
            <FiClock />
          </span>

          <div>
            <span className={styles.totalLabel}>
              Temps total
            </span>

            <output
              className={styles.totalValue}
              aria-live="polite"
            >
              {formatDuration(totalTime)}
            </output>
          </div>
        </div>
      </div>
    </section>
  );
}