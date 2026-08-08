import { supabase } from "@/lib";

export async function getCategoryOptions() {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name
    `)
    .order("display_order", {
      ascending: true,
    })
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }));
}