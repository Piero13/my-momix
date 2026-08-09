/**
 * Formats a duration expressed in minutes.
 *
 * Examples:
 * 0   -> "0 min"
 * 45  -> "45 min"
 * 60  -> "1 h"
 * 75  -> "1 h 15 min"
 * 120 -> "2 h"
 *
 * @param {number|string|null|undefined} value
 * @returns {string}
 */
export function formatDuration(value) {
  const totalMinutes = Number(value);

  if (
    !Number.isFinite(totalMinutes) ||
    totalMinutes < 0
  ) {
    return "";
  }

  const minutes = Math.round(totalMinutes);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${remainingMinutes} min`;
}