export function mapAppSettingsToFormValues(
  settings
) {
  return {
    appName:
      settings?.app_name ?? "MyMomix",

    appDescription:
      settings?.app_description ?? "",

    publicUrl:
      settings?.public_url ?? "",

    defaultServings:
      settings?.default_servings ?? 4,

    defaultDifficulty:
      settings?.default_difficulty ??
      "easy",

    defaultRecipeStatus:
      settings?.default_recipe_status ??
      "draft",

    metaTitle:
      settings?.meta_title ?? "",

    metaDescription:
      settings?.meta_description ?? "",
  };
}