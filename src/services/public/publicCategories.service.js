import { supabase } from "@/lib";

export async function getPublicCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      description,
      display_order
    `)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}