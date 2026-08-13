/**
 * Displays one recipe preparation step.
 */

import {
  FiClock,
  FiSettings,
  FiThermometer,
} from "react-icons/fi";

import StepMeta from "./StepMeta";
import styles from "./RecipeSteps.module.scss";

export default function RecipeStepItem({ step }) {
  const {
    order,
    description,
    duration,
    speed,
    temperature,
  } = step;

  const hasMetadata =
    duration !== null ||
    speed !== null ||
    temperature !== null;

  return (
    <li className={styles.step}>
      <div
        className={styles.stepBadge}
        aria-hidden="true"
      >
        {order}
      </div>

      <div className={styles.stepContent}>
        <p className={styles.stepLabel}>
          Étape {order}
        </p>

        <p className={styles.stepDescription}>
          {description}
        </p>

        {hasMetadata ? (
          <div
            className={styles.metadata}
            aria-label={`Paramètres de l’étape ${order}`}
          >
            <StepMeta
              icon={FiClock}
              label="Durée"
              value={duration ?? null}
            />

            <StepMeta
              icon={FiThermometer}
              label="Température"
              value={
                temperature !== null
                  ? `${temperature} °C`
                  : null
              }
            />

            <StepMeta
              icon={FiSettings}
              label="Vitesse"
              value={
                speed !== null
                  ? speed
                  : null
              }
            />
          </div>
        ) : null}
      </div>
    </li>
  );
}