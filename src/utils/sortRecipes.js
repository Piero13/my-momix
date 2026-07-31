/**
 * Sorts recipes using the selected public sort option.
 */

import {
  DEFAULT_RECIPE_SORT,
  RECIPE_DIFFICULTY_WEIGHT,
  RECIPE_SORT,
} from "@/constants";

import { normalizeText } from "./normalizeText";

function compareTitles(firstRecipe, secondRecipe) {
  return normalizeText(firstRecipe.title).localeCompare(
    normalizeText(secondRecipe.title),
    "fr",
    {
      sensitivity: "base",
      numeric: true,
    }
  );
}

function getDifficultyWeight(difficulty) {
  const normalizedDifficulty = normalizeText(difficulty);

  return (
    RECIPE_DIFFICULTY_WEIGHT[normalizedDifficulty] ??
    Number.MAX_SAFE_INTEGER
  );
}

/**
 * Returns a new sorted array without mutating the original one.
 *
 * @param {Array<object>} recipes
 * @param {string} sort
 * @returns {Array<object>}
 */
export function sortRecipes(
  recipes,
  sort = DEFAULT_RECIPE_SORT
) {
  const sortedRecipes = [...recipes];

  switch (sort) {
    case RECIPE_SORT.DATE_ASC:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          new Date(firstRecipe.createdAt).getTime() -
          new Date(secondRecipe.createdAt).getTime()
      );

    case RECIPE_SORT.TITLE_ASC:
      return sortedRecipes.sort(compareTitles);

    case RECIPE_SORT.TITLE_DESC:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          compareTitles(secondRecipe, firstRecipe)
      );

    case RECIPE_SORT.TIME_ASC:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          Number(firstRecipe.totalTime ?? 0) -
          Number(secondRecipe.totalTime ?? 0)
      );

    case RECIPE_SORT.TIME_DESC:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          Number(secondRecipe.totalTime ?? 0) -
          Number(firstRecipe.totalTime ?? 0)
      );

    case RECIPE_SORT.DIFFICULTY_ASC:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          getDifficultyWeight(firstRecipe.difficulty) -
          getDifficultyWeight(secondRecipe.difficulty)
      );

    case RECIPE_SORT.DIFFICULTY_DESC:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          getDifficultyWeight(secondRecipe.difficulty) -
          getDifficultyWeight(firstRecipe.difficulty)
      );

    case RECIPE_SORT.DATE_DESC:
    default:
      return sortedRecipes.sort(
        (firstRecipe, secondRecipe) =>
          new Date(secondRecipe.createdAt).getTime() -
          new Date(firstRecipe.createdAt).getTime()
      );
  }
}