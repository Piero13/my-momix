import { STORAGE_BUCKETS } from "@/constants";
import { supabase } from "@/lib";

function createRecipeImagePath(file) {
  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase() || "webp";

  return `recipes/${crypto.randomUUID()}.${extension}`;
}

export async function uploadRecipeImage(file) {
  const path = createRecipeImagePath(file);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.RECIPE_IMAGES)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return path;
}

export async function deleteRecipeImage(path) {
  if (!path) {
    return;
  }

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.RECIPE_IMAGES)
    .remove([path]);

  if (error) {
    throw error;
  }
}

export function getRecipeImageUrl(path) {
  if (!path) {
    return null;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKETS.RECIPE_IMAGES)
    .getPublicUrl(path);

  return data.publicUrl;
}