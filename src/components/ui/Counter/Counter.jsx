/**
 * Reusable numeric counter.
 */

import { FiMinus, FiPlus } from "react-icons/fi";

import styles from "./Counter.module.scss";

export default function Counter({
  value,
  min = 1,
  max = 99,
  step = 1,
  label = "Quantité",
  decrementLabel = "Diminuer",
  incrementLabel = "Augmenter",
  disabled = false,
  onChange,
}) {
  const canDecrement = !disabled && value - step >= min;
  const canIncrement = !disabled && value + step <= max;

  const handleDecrement = () => {
    if (canDecrement) {
      onChange?.(value - step);
    }
  };

  const handleIncrement = () => {
    if (canIncrement) {
      onChange?.(value + step);
    }
  };

  return (
    <div
      className={styles.counter}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={styles.button}
        aria-label={decrementLabel}
        disabled={!canDecrement}
        onClick={handleDecrement}
      >
        <FiMinus aria-hidden="true" />
      </button>

      <output
        className={styles.value}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </output>

      <button
        type="button"
        className={styles.button}
        aria-label={incrementLabel}
        disabled={!canIncrement}
        onClick={handleIncrement}
      >
        <FiPlus aria-hidden="true" />
      </button>
    </div>
  );
}