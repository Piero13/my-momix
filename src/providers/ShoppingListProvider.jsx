import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  addShoppingListItems,
  clearShoppingList,
  getShoppingListItems,
  removeCheckedShoppingListItems,
  removeShoppingListItem,
  toggleShoppingListItem,
  updateShoppingListItem,
} from "@/services/shoppingList";

import {
  ShoppingListContext,
} from "@/contexts";

export default function ShoppingListProvider({
  children,
}) {
  const [
    items,
    setItems,
  ] = useState(
    () => getShoppingListItems()
  );

  const addItems = useCallback(
    (incomingItems) => {
      const nextItems =
        addShoppingListItems(
          incomingItems
        );

      setItems(nextItems);

      return nextItems;
    },
    []
  );

  const updateItem = useCallback(
    (
      itemId,
      updates
    ) => {
      const nextItems =
        updateShoppingListItem(
          itemId,
          updates
        );

      setItems(nextItems);

      return nextItems;
    },
    []
  );

  const toggleItem = useCallback(
    (itemId) => {
      const nextItems =
        toggleShoppingListItem(
          itemId
        );

      setItems(nextItems);

      return nextItems;
    },
    []
  );

  const removeItem = useCallback(
    (itemId) => {
      const nextItems =
        removeShoppingListItem(
          itemId
        );

      setItems(nextItems);

      return nextItems;
    },
    []
  );

  const removeCheckedItems =
    useCallback(() => {
      const nextItems =
        removeCheckedShoppingListItems();

      setItems(nextItems);

      return nextItems;
    }, []);

  const clearList = useCallback(
    () => {
      const nextItems =
        clearShoppingList();

      setItems(nextItems);

      return nextItems;
    },
    []
  );

  const totalItems =
    items.length;

  const checkedItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.checked
        ),
      [items]
    );

  const remainingItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            !item.checked
        ),
      [items]
    );

  const value =
    useMemo(
      () => ({
        items,

        totalItems,

        checkedItems,
        checkedItemsCount:
          checkedItems.length,

        remainingItems,
        remainingItemsCount:
          remainingItems.length,

        addItems,
        updateItem,
        toggleItem,
        removeItem,
        removeCheckedItems,
        clearList,
      }),
      [
        items,
        totalItems,
        checkedItems,
        remainingItems,
        addItems,
        updateItem,
        toggleItem,
        removeItem,
        removeCheckedItems,
        clearList,
      ]
    );

  return (
    <ShoppingListContext.Provider
      value={value}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}