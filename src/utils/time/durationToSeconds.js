/**
 * Converts hours, minutes and seconds to total seconds.
 */
export function durationToSeconds({
  hours = 0,
  minutes = 0,
  seconds = 0,
} = {}) {
  const safeHours = Number(hours) || 0;
  const safeMinutes = Number(minutes) || 0;
  const safeSeconds = Number(seconds) || 0;

  return (
    safeHours * 3600 +
    safeMinutes * 60 +
    safeSeconds
  );
}