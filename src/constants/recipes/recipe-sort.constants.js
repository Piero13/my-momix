/**
 * Public recipe sorting configuration.
 */

export const RECIPE_SORT = {
  DATE_DESC: "date-desc",
  DATE_ASC: "date-asc",
  TITLE_ASC: "title-asc",
  TITLE_DESC: "title-desc",
  TIME_ASC: "time-asc",
  TIME_DESC: "time-desc",
  DIFFICULTY_ASC: "difficulty-asc",
  DIFFICULTY_DESC: "difficulty-desc",
};

export const DEFAULT_RECIPE_SORT = RECIPE_SORT.DATE_DESC;

export const RECIPE_SORT_OPTIONS = [
  {
    value: RECIPE_SORT.DATE_DESC,
    label: "Plus récentes",
  },
  {
    value: RECIPE_SORT.DATE_ASC,
    label: "Plus anciennes",
  },
  {
    value: RECIPE_SORT.TITLE_ASC,
    label: "Titre : A à Z",
  },
  {
    value: RECIPE_SORT.TITLE_DESC,
    label: "Titre : Z à A",
  },
  {
    value: RECIPE_SORT.TIME_ASC,
    label: "Durée : la plus courte",
  },
  {
    value: RECIPE_SORT.TIME_DESC,
    label: "Durée : la plus longue",
  },
  {
    value: RECIPE_SORT.DIFFICULTY_ASC,
    label: "Difficulté : croissante",
  },
  {
    value: RECIPE_SORT.DIFFICULTY_DESC,
    label: "Difficulté : décroissante",
  },
];

export const RECIPE_SORT_VALUES = RECIPE_SORT_OPTIONS.map(
  ({ value }) => value
);