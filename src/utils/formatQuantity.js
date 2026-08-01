/**
 * Formats an ingredient quantity for display.
 *
 * Examples:
 * 1      -> "1"
 * 0.5    -> "0,5"
 * 1.25   -> "1,25"
 * 12.333 -> "12,33"
 *
 * @param {number|null|undefined} quantity
 * @returns {string}
 */
export function formatQuantity(quantity) {
  if (
    quantity === null ||
    quantity === undefined ||
    !Number.isFinite(Number(quantity))
  ) {
    return "";
  }

  const roundedQuantity =
    Math.round((Number(quantity) + Number.EPSILON) * 100) / 100;

  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(roundedQuantity);
}