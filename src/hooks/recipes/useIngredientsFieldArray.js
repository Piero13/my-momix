import { useState } from "react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

export function useIngredientsFieldArray() {
  const { control } = useFormContext();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [lastAddedIndex, setLastAddedIndex] =
    useState(null);

  const handleAdd = () => {
    const nextIndex = fields.length;

    append({
      ingredientId: "",
      name: "",
      quantity: "",
      unit: "",
    });

    setLastAddedIndex(nextIndex);
  };

  const handleRemove = (index) => {
    remove(index);
    setLastAddedIndex(null);
  };

  return {
    fields,
    handleAdd,
    handleRemove,
    lastAddedIndex,
  };
}