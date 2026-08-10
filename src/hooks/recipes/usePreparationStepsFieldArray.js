import { useState } from "react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

export function usePreparationStepsFieldArray() {
  const { control } = useFormContext();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const [lastAddedIndex, setLastAddedIndex] =
    useState(null);

  const handleAdd = () => {
    const nextIndex = fields.length;

    append({
      instruction: "",
      hasThermomixSettings: false,
      duration: "",
      temperature: "",
      speed: "",
      reverse: false,
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