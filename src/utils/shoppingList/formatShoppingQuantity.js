export function formatShoppingQuantity(
  value
) {
  const quantity =
    Number(value);

  if (!Number.isFinite(quantity)) {
    return "";
  }

  if (Number.isInteger(quantity)) {
    return String(quantity);
  }

  return String(
    Math.round(
      quantity * 100
    ) / 100
  );
}