import { useParams } from "react-router-dom";

import { RecipeEditor } from "@/components/admin";

export default function RecipeEdit() {
  const { recipeId } = useParams();

  return (
    <RecipeEditor
      mode="edit"
      recipeId={recipeId}
    />
  );
}