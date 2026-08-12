import { supabase } from "@/lib";

const APP_SETTINGS_SELECT = `
  id,
  app_name,
  app_description,
  public_url,
  default_servings,
  default_difficulty,
  default_recipe_status,
  meta_title,
  meta_description,
  created_at,
  updated_at
`;

export async function getAppSettings() {
  const { data, error } = await supabase
    .from("app_settings")
    .select(APP_SETTINGS_SELECT)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateAppSettings(
  settingsId,
  values
) {
  if (!settingsId) {
    throw new Error(
      "Settings id is required."
    );
  }

  const payload = {
    app_name:
      values.appName.trim(),

    app_description:
      values.appDescription?.trim() ||
      null,

    public_url:
      values.publicUrl?.trim() ||
      null,

    default_servings:
      Number(values.defaultServings) ||
      4,

    default_difficulty:
      values.defaultDifficulty,

    default_recipe_status:
      values.defaultRecipeStatus,

    meta_title:
      values.metaTitle?.trim() ||
      null,

    meta_description:
      values.metaDescription?.trim() ||
      null,
  };

  const { data, error } = await supabase
    .from("app_settings")
    .update(payload)
    .eq("id", settingsId)
    .select(APP_SETTINGS_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return data;
}