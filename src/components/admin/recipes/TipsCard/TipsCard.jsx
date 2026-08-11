import {
  FiPlus,
  FiZap,
} from "react-icons/fi";

import { AppButton } from "@/components/ui";
import { useTipsFieldArray } from "@/hooks";

import TipList from "../TipList";

import styles from "./TipsCard.module.scss";

export default function TipsCard() {
  const {
    fields,
    lastAddedIndex,
    handleAdd,
    handleRemove,
  } = useTipsFieldArray();

  const hasTips = fields.length > 0;

  return (
    <section
      className={styles.card}
      aria-labelledby="recipe-tips-editor-title"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          Conseils
        </p>

        <h2
          id="recipe-tips-editor-title"
          className={styles.title}
        >
          Astuces
        </h2>

        <p className={styles.description}>
          Ajoutez des conseils utiles, avertissements ou
          informations de cuisson.
        </p>
      </header>

      {hasTips ? (
        <>
          <TipList
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
              Ajouter une astuce
            </AppButton>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <span
            className={styles.emptyIcon}
            aria-hidden="true"
          >
            <FiZap />
          </span>

          <p className={styles.emptyTitle}>
            Aucune astuce
          </p>

          <p className={styles.emptyDescription}>
            Ajoutez un conseil si cette recette en a besoin.
          </p>

          <AppButton
            type="button"
            variant="primary"
            icon={<FiPlus />}
            onClick={handleAdd}
          >
            Ajouter une astuce
          </AppButton>
        </div>
      )}
    </section>
  );
}