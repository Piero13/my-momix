import IngredientRow from "../IngredientRow";

import styles from "./IngredientList.module.scss";

export default function IngredientList({
  fields,
  onRemove,
  lastAddedIndex,
}) {
  return (
    <div className={styles.list}>
      {fields.map((field, index) => (
        <IngredientRow
          key={field.id}
          index={index}
          autoFocus={
            index === lastAddedIndex
          }
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}