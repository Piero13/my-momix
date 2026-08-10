import {
  FiList,
  FiPlus,
} from "react-icons/fi";

import { AppButton } from "@/components/ui";
import { usePreparationStepsFieldArray } from "@/hooks";

import PreparationStepList from "../PreparationStepList";

import styles from "./PreparationStepsCard.module.scss";

export default function PreparationStepsCard() {
  const {
    fields,
    lastAddedIndex,
    handleAdd,
    handleRemove,
  } = usePreparationStepsFieldArray();

  const hasSteps = fields.length > 0;

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-steps-editor-title"
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Préparation
          </p>

          <h2
            id="recipe-steps-editor-title"
            className={styles.title}
          >
            Étapes
          </h2>

          <p className={styles.description}>
            Décrivez la préparation étape par étape,
            dans l’ordre d’exécution.
          </p>
        </div>
      </header>

      {hasSteps ? (
        <>
          <PreparationStepList
            fields={fields}
            lastAddedIndex={
              lastAddedIndex
            }
            onRemove={handleRemove}
          />

          <div className={styles.addAction}>
            <AppButton
              type="button"
              variant="outline-primary"
              icon={<FiPlus />}
              onClick={handleAdd}
            >
              Ajouter une étape
            </AppButton>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <span
            className={styles.emptyIcon}
            aria-hidden="true"
          >
            <FiList />
          </span>

          <div>
            <p className={styles.emptyTitle}>
              Ajoutez les étapes
            </p>

            <p
              className={
                styles.emptyDescription
              }
            >
              Commencez par décrire la première
              étape de préparation.
            </p>
          </div>

          <AppButton
            type="button"
            variant="primary"
            icon={<FiPlus />}
            onClick={handleAdd}
          >
            Ajouter une étape
          </AppButton>
        </div>
      )}
    </section>
  );
}