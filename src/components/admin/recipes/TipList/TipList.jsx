import TipRow from "../TipRow";

import styles from "./TipList.module.scss";

export default function TipList({
  fields,
  lastAddedIndex,
  onRemove,
}) {
  return (
    <div className={styles.list}>
      {fields.map((field, index) => (
        <TipRow
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