import {
  FiArchive,
  FiRefreshCw,
  FiStar,
  FiZap,
} from "react-icons/fi";

export const RECIPE_TIP_TYPES = {
  TIP: "astuce",
  VARIANT: "variante",
  CONSERVATION: "conservation",
  EXTRA: "petit-plus",
};

export const RECIPE_TIP_TYPE_CONFIG = {
  [RECIPE_TIP_TYPES.TIP]: {
    label: "Astuce",
    icon: FiZap,
  },
  [RECIPE_TIP_TYPES.VARIANT]: {
    label: "Variante",
    icon: FiRefreshCw,
  },
  [RECIPE_TIP_TYPES.CONSERVATION]: {
    label: "Conservation",
    icon: FiArchive,
  },
  [RECIPE_TIP_TYPES.EXTRA]: {
    label: "Petit plus",
    icon: FiStar,
  },
};