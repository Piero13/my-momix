/**
 * Splits total seconds into hours, minutes and seconds.
 */
export function splitDurationSeconds(value) {
  const totalSeconds = Math.max(
    0,
    Number(value) || 0
  );

  return {
    hours: Math.floor(
      totalSeconds / 3600
    ),

    minutes: Math.floor(
      (totalSeconds % 3600) / 60
    ),

    seconds:
      totalSeconds % 60,
  };
}