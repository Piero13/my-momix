/**
 * Displays recipe tips, variants and conservation advice.
 */

import { getTipLabels } from "@/utils";

import styles from "./RecipeTips.module.scss";

export default function RecipeTips({ tips = [] }) {
  if (tips.length === 0) {
    return null;
  }

  const formattedTips = getTipLabels(tips);

  return (
    <section
      className={styles.section}
      aria-labelledby="recipe-tips-title"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>Astuces</p>

        <h2
          id="recipe-tips-title"
          className={styles.title}
        >
          Conseils et variantes
        </h2>

        <p className={styles.description}>
          Quelques idées pour adapter la recette, la conserver
          ou lui apporter une touche différente.
        </p>
      </header>

      <ul className={styles.list}>
        {formattedTips.map(
          ({
            id,
            text,
            displayLabel,
            icon: Icon,
          }) => (
            <li
              key={id}
              className={styles.item}
            >
              <span
                className={styles.icon}
                aria-hidden="true"
              >
                <Icon />
              </span>

              <div className={styles.content}>
                <span className={styles.number}>
                  {displayLabel}
                </span>

                <p>{text}</p>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}