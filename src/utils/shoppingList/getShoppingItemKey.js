export function getShoppingItemKey({
  ingredientId,
  unit,
}) {
  return `${ingredientId}::${unit ?? ""}`;
}