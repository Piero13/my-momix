export function mapRecipeFormToPayload(
  values,
  userId
) {
  const status = values.status ?? "draft";

  function toNullableNumber(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return null;
    }

    const number = Number(value);

    return Number.isFinite(number)
      ? number
      : null;
  }

  const preparationTime =
    toNullableNumber(
      values.preparationTime
    );

  const cookingTime =
    toNullableNumber(
      values.cookingTime
    );

  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    description:
      values.description?.trim() || null,

    category_id:
      values.categoryId || null,

    difficulty: values.difficulty,

    preparation_time: preparationTime,
    cooking_time: cookingTime,

    total_time:
      preparationTime !== null ||
      cookingTime !== null
        ? (preparationTime ?? 0) +
          (cookingTime ?? 0)
        : null,

    servings: Number(values.servings),

    image_path:
      values.imagePath || null,

    status,

    meta_title:
      values.metaTitle?.trim() || null,

    meta_description:
      values.metaDescription?.trim() || null,

    published_at:
      status === "published"
        ? new Date().toISOString()
        : null,

    created_by: userId,
  };
}