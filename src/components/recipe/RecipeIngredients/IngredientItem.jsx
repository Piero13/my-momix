/**
 * Displays one scaled recipe ingredient.
 */

import {
  formatQuantity,
  scaleQuantity,
} from "@/utils";

import styles from "./RecipeIngredients.module.scss";

export default function IngredientItem({
  ingredient,
  originalServings,
  selectedServings,
}) {
  const scaledQuantity = scaleQuantity(
    ingredient.quantity,
    originalServings,
    selectedServings
  );

  const formattedQuantity = formatQuantity(scaledQuantity);

  const amount = [formattedQuantity, ingredient.unit]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={styles.ingredient}>
      {amount ? (
        <span className={styles.amount}>
          {amount}
        </span>
      ) : (
        <span
          className={styles.amountPlaceholder}
          aria-hidden="true"
        />
      )}

      <span className={styles.ingredientName}>
        {ingredient.name}
      </span>
    </li>
  );
}