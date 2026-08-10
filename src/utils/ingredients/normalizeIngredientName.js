/**
 * Normalizes an ingredient name for catalog insertion.
 *
 * @param {string} value
 * @returns {string}
 */
export function normalizeIngredientName(value) {
  const normalized = value
    .trim()
    .replace(/\s+/g, " ");

  if (!normalized) {
    return "";
  }

  return (
    normalized.charAt(0).toUpperCase() +
    normalized.slice(1)
  );
}