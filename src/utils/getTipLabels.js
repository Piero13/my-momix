import { RECIPE_TIP_TYPE_CONFIG } from "@/constants";

/**
 * Builds display labels for recipe tips.
 * A type is numbered only when it appears more than once.
 *
 * @param {Array<object>} tips
 * @returns {Array<object>}
 */
export function getTipLabels(tips = []) {
  const typeTotals = tips.reduce((totals, tip) => {
    const type = tip.type ?? "astuce";

    totals[type] = (totals[type] ?? 0) + 1;

    return totals;
  }, {});

  const typePositions = {};

  return tips.map((tip) => {
    const type = tip.type ?? "astuce";
    const config =
      RECIPE_TIP_TYPE_CONFIG[type] ??
      RECIPE_TIP_TYPE_CONFIG.astuce;

    typePositions[type] = (typePositions[type] ?? 0) + 1;

    const shouldNumber = typeTotals[type] > 1;

    return {
      ...tip,
      type,
      icon: config.icon,
      displayLabel: shouldNumber
        ? `${config.label} ${typePositions[type]}`
        : config.label,
    };
  });
}