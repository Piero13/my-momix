export function validateRecipePublication(values) {
  if (values.status !== "published") {
    return [];
  }

  const errors = [];

  if (!values.title?.trim()) {
    errors.push("Le titre est obligatoire.");
  }

  if (!values.slug?.trim()) {
    errors.push("Le slug est obligatoire.");
  }

  if (!values.description?.trim()) {
    errors.push(
      "La description est obligatoire."
    );
  }

  if (!values.imagePath) {
    errors.push(
      "Une image principale est obligatoire."
    );
  }

  if (
    !Array.isArray(values.ingredients) ||
    values.ingredients.length === 0
  ) {
    errors.push(
      "Ajoutez au moins un ingrédient."
    );
  }

  if (
    !Array.isArray(values.steps) ||
    values.steps.length === 0
  ) {
    errors.push(
      "Ajoutez au moins une étape."
    );
  }

  return errors;
}