/**
 * Formats a date for compact administration activity displays.
 *
 * @param {string|Date} value
 * @param {Date} [referenceDate]
 * @returns {string}
 */
export function formatRelativeDate(
  value,
  referenceDate = new Date()
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const startOfReferenceDay = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffInDays = Math.round(
    (startOfReferenceDay - startOfDate) /
      (1000 * 60 * 60 * 24)
  );

  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  if (diffInDays === 0) {
    return `Aujourd’hui à ${time}`;
  }

  if (diffInDays === 1) {
    return `Hier à ${time}`;
  }

  if (diffInDays > 1 && diffInDays <= 6) {
    return `Il y a ${diffInDays} jours`;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}