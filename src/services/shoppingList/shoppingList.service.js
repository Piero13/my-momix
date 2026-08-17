import {
  SHOPPING_LIST_STORAGE_KEY,
} from "@/constants";

import {
  mergeShoppingItems,
} from "@/utils";

/**
 * Reads the persisted shopping list.
 *
 * @returns {Array<object>}
 */
export function getShoppingListItems() {
  try {
    const storedValue =
      localStorage.getItem(
        SHOPPING_LIST_STORAGE_KEY
      );

    if (!storedValue) {
      return [];
    }

    const parsedValue =
      JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue;
  } catch (error) {
    console.error(
      "Unable to read shopping list:",
      error
    );

    return [];
  }
}

/**
 * Persists the complete shopping list.
 *
 * @param {Array<object>} items
 * @returns {Array<object>}
 */
export function saveShoppingListItems(
  items
) {
  const normalizedItems =
    Array.isArray(items)
      ? items
      : [];

  try {
    localStorage.setItem(
      SHOPPING_LIST_STORAGE_KEY,
      JSON.stringify(
        normalizedItems
      )
    );
  } catch (error) {
    console.error(
      "Unable to save shopping list:",
      error
    );

    throw error;
  }

  return normalizedItems;
}

/**
 * Adds items to the current shopping list
 * and merges compatible ingredients.
 *
 * @param {Array<object>} incomingItems
 * @returns {Array<object>}
 */
export function addShoppingListItems(
  incomingItems = []
) {
  if (
    !Array.isArray(incomingItems) ||
    incomingItems.length === 0
  ) {
    return getShoppingListItems();
  }

  const existingItems =
    getShoppingListItems();

  const mergedItems =
    mergeShoppingItems(
      existingItems,
      incomingItems
    );

  return saveShoppingListItems(
    mergedItems
  );
}

/**
 * Updates one shopping item.
 *
 * @param {string} itemId
 * @param {Partial<object>} updates
 * @returns {Array<object>}
 */
export function updateShoppingListItem(
  itemId,
  updates = {}
) {
  if (!itemId) {
    return getShoppingListItems();
  }

  const items =
    getShoppingListItems();

  const nextItems =
    items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            ...updates,
          }
        : item
    );

  return saveShoppingListItems(
    nextItems
  );
}

/**
 * Toggles the checked state of one item.
 *
 * @param {string} itemId
 * @returns {Array<object>}
 */
export function toggleShoppingListItem(
  itemId
) {
  const items =
    getShoppingListItems();

  const targetItem =
    items.find(
      (item) =>
        item.id === itemId
    );

  if (!targetItem) {
    return items;
  }

  return updateShoppingListItem(
    itemId,
    {
      checked:
        !targetItem.checked,
    }
  );
}

/**
 * Removes one item from the list.
 *
 * @param {string} itemId
 * @returns {Array<object>}
 */
export function removeShoppingListItem(
  itemId
) {
  if (!itemId) {
    return getShoppingListItems();
  }

  const items =
    getShoppingListItems();

  const nextItems =
    items.filter(
      (item) =>
        item.id !== itemId
    );

  return saveShoppingListItems(
    nextItems
  );
}

/**
 * Removes all checked items.
 *
 * @returns {Array<object>}
 */
export function removeCheckedShoppingListItems() {
  const items =
    getShoppingListItems();

  const nextItems =
    items.filter(
      (item) =>
        !item.checked
    );

  return saveShoppingListItems(
    nextItems
  );
}

/**
 * Clears the complete shopping list.
 *
 * @returns {Array<object>}
 */
export function clearShoppingList() {
  try {
    localStorage.removeItem(
      SHOPPING_LIST_STORAGE_KEY
    );
  } catch (error) {
    console.error(
      "Unable to clear shopping list:",
      error
    );

    throw error;
  }

  return [];
}