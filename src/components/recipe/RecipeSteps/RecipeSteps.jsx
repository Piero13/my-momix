/**
 * Displays the ordered preparation steps of a recipe.
 */

import { FiList } from "react-icons/fi";

import RecipeStepItem from "./RecipeStepItem";
import styles from "./RecipeSteps.module.scss";

export default function RecipeSteps({ steps = [] }) {
  const sortedSteps = [...steps].sort(
    (firstStep, secondStep) =>
      firstStep.order - secondStep.order
  );

  return (
    <section
      className={styles.section}
      aria-labelledby="recipe-steps-title"
    >
      <header className={styles.header}>
        <span
          className={styles.headingIcon}
          aria-hidden="true"
        >
          <FiList />
        </span>

        <div>
          <p className={styles.eyebrow}>
            Cuisson guidée
          </p>

          <h2
            id="recipe-steps-title"
            className={styles.title}
          >
            Étapes de préparation
          </h2>
        </div>
      </header>

      <ol className={styles.list}>
        {sortedSteps.map((step) => (
          <RecipeStepItem
            key={step.id}
            step={step}
          />
        ))}
      </ol>
    </section>
  );
}