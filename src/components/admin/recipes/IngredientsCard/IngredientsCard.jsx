import {
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";

import { AppButton } from "@/components/ui";
import { useIngredientsFieldArray } from "@/hooks";

import IngredientList from "../IngredientList";

import styles from "./IngredientsCard.module.scss";

export default function IngredientsCard() {
  const {
    fields,
    handleAdd,
    handleRemove,
    lastAddedIndex,
  } = useIngredientsFieldArray();

  const hasIngredients =
    fields.length > 0;

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-ingredients-editor-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Composition
          </p>

          <h2
            id="recipe-ingredients-editor-title"
            className={styles.title}
          >
            Ingrédients
          </h2>

          <p className={styles.description}>
            Ajoutez les ingrédients nécessaires
            à la réalisation de la recette.
          </p>
        </div>
      </header>

      {hasIngredients ? (
        <>
          <IngredientList
            fields={fields}
            onRemove={handleRemove}
            lastAddedIndex={
              lastAddedIndex
            }
          />

          <div className={styles.addAction}>
            <AppButton
              type="button"
              variant="outline-primary"
              icon={<FiPlus />}
              onClick={handleAdd}
            >
              Ajouter un ingrédient
            </AppButton>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <span
            className={styles.emptyIcon}
            aria-hidden="true"
          >
            <FiShoppingBag />
          </span>

          <div>
            <p className={styles.emptyTitle}>
              Ajoutez les ingrédients
            </p>

            <p
              className={
                styles.emptyDescription
              }
            >
              Commencez par ajouter le premier
              ingrédient de votre recette.
            </p>
          </div>

          <AppButton
            type="button"
            variant="primary"
            icon={<FiPlus />}
            onClick={handleAdd}
          >
            Ajouter un ingrédient
          </AppButton>
        </div>
      )}
    </section>
  );
}