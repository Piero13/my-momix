import {
  getShoppingItemKey,
} from "./getShoppingItemKey";

/**
 * Merges shopping list items by ingredient + unit.
 *
 * @param {Array<object>} existingItems
 * @param {Array<object>} incomingItems
 * @returns {Array<object>}
 */
export function mergeShoppingItems(
  existingItems = [],
  incomingItems = []
) {
  const itemsMap = new Map();

  const allItems = [
    ...existingItems,
    ...incomingItems,
  ];

  for (const item of allItems) {
    const key =
      item.id ??
      getShoppingItemKey({
        ingredientId:
          item.ingredientId,
        unit:
          item.unit,
      });

    const current =
      itemsMap.get(key);

    if (!current) {
      itemsMap.set(
        key,
        {
          ...item,

          id: key,

          quantity:
            Number(
              item.quantity ?? 0
            ),

          sourceRecipeIds: [
            ...new Set(
              item.sourceRecipeIds ?? []
            ),
          ],

          sourceRecipes:
            deduplicateSourceRecipes(
              item.sourceRecipes ?? []
            ),
        }
      );

      continue;
    }

    const mergedQuantity =
      Number(
        current.quantity ?? 0
      ) +
      Number(
        item.quantity ?? 0
      );

    const mergedSourceRecipeIds = [
      ...new Set([
        ...(
          current.sourceRecipeIds ??
          []
        ),
        ...(
          item.sourceRecipeIds ??
          []
        ),
      ]),
    ];

    const mergedSourceRecipes =
      deduplicateSourceRecipes([
        ...(
          current.sourceRecipes ??
          []
        ),
        ...(
          item.sourceRecipes ??
          []
        ),
      ]);

    itemsMap.set(
      key,
      {
        ...current,

        quantity:
          mergedQuantity,

        sourceRecipeIds:
          mergedSourceRecipeIds,

        sourceRecipes:
          mergedSourceRecipes,

        /*
         * If an existing line was checked,
         * adding more quantity should make
         * it active again.
         */
        checked: false,
      }
    );
  }

  return [
    ...itemsMap.values(),
  ];
}

function deduplicateSourceRecipes(
  recipes = []
) {
  const recipesMap =
    new Map();

  for (const recipe of recipes) {
    if (!recipe?.id) {
      continue;
    }

    recipesMap.set(
      recipe.id,
      recipe
    );
  }

  return [
    ...recipesMap.values(),
  ];
}