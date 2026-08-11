import { splitDurationSeconds } from "./splitDurationSeconds";

export function formatDurationSeconds(value) {
  const {
    hours,
    minutes,
    seconds,
  } = splitDurationSeconds(value);

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} h`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} min`);
  }

  if (seconds > 0) {
    parts.push(`${seconds} s`);
  }

  return parts.length
    ? parts.join(" ")
    : "0 s";
}