/**
 * Displays the nutritional values of a recipe per serving.
 */

import {
  FiActivity,
  FiBarChart2,
  FiDroplet,
  FiLayers,
  FiZap,
} from "react-icons/fi";

import NutritionItem from "./NutritionItem";
import styles from "./RecipeNutrition.module.scss";

const NUTRITION_ITEMS = [
  {
    key: "calories",
    label: "Énergie",
    unit: "kcal",
    icon: FiZap,
    featured: true,
  },
  {
    key: "proteins",
    label: "Protéines",
    unit: "g",
    icon: FiActivity,
  },
  {
    key: "carbohydrates",
    label: "Glucides",
    unit: "g",
    icon: FiBarChart2,
  },
  {
    key: "fats",
    label: "Lipides",
    unit: "g",
    icon: FiDroplet,
  },
  {
    key: "fiber",
    label: "Fibres",
    unit: "g",
    icon: FiLayers,
  },
];

export default function RecipeNutrition({
  nutrition,
}) {
  if (!nutrition) {
    return null;
  }

  const availableItems = NUTRITION_ITEMS.filter(
    ({ key }) =>
      nutrition[key] !== null &&
      nutrition[key] !== undefined &&
      nutrition[key] !== ""
  );

  if (availableItems.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="recipe-nutrition-title"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <span
            className={styles.headingIcon}
            aria-hidden="true"
          >
            <FiActivity />
          </span>

          <div>
            <p className={styles.eyebrow}>
              Repères nutritionnels
            </p>

            <h2
              id="recipe-nutrition-title"
              className={styles.title}
            >
              Valeurs nutritionnelles
            </h2>
          </div>
        </div>

        <p className={styles.servingReference}>
          Valeurs moyennes pour une portion
        </p>
      </header>

      <ul className={styles.grid}>
        {availableItems.map(
          ({
            key,
            label,
            unit,
            icon,
            featured,
          }) => (
            <NutritionItem
              key={key}
              icon={icon}
              label={label}
              value={nutrition[key]}
              unit={unit}
              featured={featured}
            />
          )
        )}
      </ul>

      <p className={styles.disclaimer}>
        Ces informations sont données à titre indicatif et
        peuvent varier selon les ingrédients et les marques
        utilisés.
      </p>
    </section>
  );
}