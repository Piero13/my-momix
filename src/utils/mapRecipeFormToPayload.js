export function mapRecipeFormToPayload(
  values,
  userId
) {
  const status = values.status ?? "draft";

  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    description:
      values.description?.trim() || null,

    category_id:
      values.categoryId || null,

    difficulty: values.difficulty,

    preparation_time:
      values.preparationTime === ""
        ? null
        : Number(values.preparationTime),

    cooking_time:
      values.cookingTime === ""
        ? null
        : Number(values.cookingTime),

    total_time:
      values.totalTime === ""
        ? null
        : Number(values.totalTime),

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