import PreparationStepRow from "../PreparationStepRow";

import styles from "./PreparationStepList.module.scss";

export default function PreparationStepList({
  fields,
  lastAddedIndex,
  onRemove,
}) {
  return (
    <div className={styles.list}>
      {fields.map((field, index) => (
        <PreparationStepRow
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