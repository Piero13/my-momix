/**
 * Displays recipe ingredients with adjustable servings.
 */

import { FiShoppingBag, FiUsers } from "react-icons/fi";

import { Counter } from "@/components/ui";

import IngredientItem from "./IngredientItem";
import styles from "./RecipeIngredients.module.scss";

export default function RecipeIngredients({
  ingredients = [],
  originalServings,
  selectedServings,
  minServings = 1,
  maxServings = 20,
  onServingsChange,
}) {
  return (
    <section
      className={styles.section}
      aria-labelledby="recipe-ingredients-title"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.headingIcon} aria-hidden="true">
            <FiShoppingBag />
          </span>

          <div>
            <p className={styles.eyebrow}>
              Préparation
            </p>

            <h2
              id="recipe-ingredients-title"
              className={styles.title}
            >
              Ingrédients
            </h2>
          </div>
        </div>

        <div className={styles.servingsControl}>
          <span className={styles.servingsLabel}>
            <FiUsers aria-hidden="true" />
            <span>Portions</span>
          </span>

          <Counter
            value={selectedServings}
            min={minServings}
            max={maxServings}
            label="Nombre de portions"
            decrementLabel="Diminuer le nombre de portions"
            incrementLabel="Augmenter le nombre de portions"
            onChange={onServingsChange}
          />
        </div>
      </header>

      <p className={styles.helperText}>
        Les quantités sont calculées pour{" "}
        <strong>
          {selectedServings}{" "}
          {selectedServings > 1 ? "personnes" : "personne"}
        </strong>
        .
      </p>

      <ul className={styles.list}>
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient.id}
            ingredient={ingredient}
            originalServings={originalServings}
            selectedServings={selectedServings}
          />
        ))}
      </ul>
    </section>
  );
}