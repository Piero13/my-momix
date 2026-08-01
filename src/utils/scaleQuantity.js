/**
 * Scales an ingredient quantity according to the selected servings.
 *
 * @param {number|null|undefined} quantity
 * @param {number} originalServings
 * @param {number} selectedServings
 * @returns {number|null}
 */
export function scaleQuantity(
  quantity,
  originalServings,
  selectedServings
) {
  if (
    quantity === null ||
    quantity === undefined ||
    !Number.isFinite(Number(quantity))
  ) {
    return null;
  }

  if (
    !Number.isFinite(originalServings) ||
    originalServings <= 0 ||
    !Number.isFinite(selectedServings) ||
    selectedServings <= 0
  ) {
    return Number(quantity);
  }

  return (
    Number(quantity) *
    (selectedServings / originalServings)
  );
}