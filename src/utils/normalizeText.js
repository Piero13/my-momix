/**
 * Normalizes a text value for comparisons and searches.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}