import { useState } from "react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

export function useTipsFieldArray() {
  const { control } = useFormContext();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "tips",
  });

  const [lastAddedIndex, setLastAddedIndex] =
    useState(null);

  const handleAdd = () => {
    const nextIndex = fields.length;

    append({
      type: "tip",
      content: "",
    });

    setLastAddedIndex(nextIndex);
  };

  const handleRemove = (index) => {
    remove(index);
    setLastAddedIndex(null);
  };

  return {
    fields,
    lastAddedIndex,
    handleAdd,
    handleRemove,
  };
}