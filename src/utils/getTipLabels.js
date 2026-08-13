import {
  RECIPE_TIP_TYPE,
  RECIPE_TIP_TYPE_CONFIG,
} from "@/constants";

export function getTipLabels(tips = []) {
  const typeTotals = tips.reduce(
    (totals, tip) => {
      const type =
        tip.type ??
        RECIPE_TIP_TYPE.TIP;

      totals[type] =
        (totals[type] ?? 0) + 1;

      return totals;
    },
    {}
  );

  const typePositions = {};

  return tips.map((tip) => {
    const type =
      tip.type ??
      RECIPE_TIP_TYPE.TIP;

    const config =
      RECIPE_TIP_TYPE_CONFIG[type] ??
      RECIPE_TIP_TYPE_CONFIG[
        RECIPE_TIP_TYPE.TIP
      ];

    typePositions[type] =
      (typePositions[type] ?? 0) + 1;

    const shouldNumber =
      typeTotals[type] > 1;

    return {
      ...tip,
      type,

      icon:
        config.icon,

      displayLabel:
        shouldNumber
          ? `${config.label} ${typePositions[type]}`
          : config.label,
    };
  });
}