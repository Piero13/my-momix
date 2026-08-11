import { supabase } from "@/lib";
import { durationToSeconds } from "@/utils";

export async function getRecipeSteps(
  recipeId
) {
  const { data, error } = await supabase
    .from("recipe_steps")
    .select(`
      id,
      instruction,
      position,
      duration_seconds,
      temperature,
      speed,
      reverse
    `)
    .eq("recipe_id", recipeId)
    .order("position", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function replaceRecipeSteps(
  recipeId,
  steps
) {
  const { error: deleteError } = await supabase
    .from("recipe_steps")
    .delete()
    .eq("recipe_id", recipeId);

  if (deleteError) {
    throw deleteError;
  }

  if (!steps.length) {
    return [];
  }

  const payload = steps.map(
    (step, index) => {
        const hasThermomixSettings =
            Boolean(
            step.hasThermomixSettings
            );

        const durationSeconds =
            durationToSeconds({
                hours:
                step.durationHours,
                minutes:
                step.durationMinutes,
                seconds:
                step.durationSeconds,
            });

        return {
            recipe_id: recipeId,

            instruction:
                step.instruction.trim(),

            position: index,

            duration_seconds:
                hasThermomixSettings &&
                durationSeconds > 0
                    ? durationSeconds
                    : null,

            temperature:
                hasThermomixSettings &&
                step.temperature
                    ? step.temperature
                    : null,

            speed:
                hasThermomixSettings &&
                step.speed
                    ? step.speed
                    : null,

            reverse:
                hasThermomixSettings
                    ? Boolean(step.reverse)
                    : false,
        };
    }
  );

  const { data, error } = await supabase
    .from("recipe_steps")
    .insert(payload)
    .select(`
      id,
      instruction,
      position,
      duration_seconds,
      temperature,
      speed,
      reverse
    `)
    .order("position", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}