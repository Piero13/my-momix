/**
 * Joins CSS class names while ignoring falsy values.
 *
 * @param  {...string} classes
 * @returns {string}
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}