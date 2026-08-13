import {
  FiAlertTriangle,
  FiThermometer,
  FiZap,
} from "react-icons/fi";

export const RECIPE_TIP_TYPE = {
  TIP: "tip",
  WARNING: "warning",
  COOKING: "cooking",
};

export const RECIPE_TIP_TYPES = [
  {
    value: RECIPE_TIP_TYPE.TIP,
    label: "Astuce",
  },
  {
    value: RECIPE_TIP_TYPE.WARNING,
    label: "Attention",
  },
  {
    value: RECIPE_TIP_TYPE.COOKING,
    label: "Cuisson",
  },
];

export const RECIPE_TIP_TYPE_CONFIG = {
  [RECIPE_TIP_TYPE.TIP]: {
    label: "Astuce",
    icon: FiZap,
  },

  [RECIPE_TIP_TYPE.WARNING]: {
    label: "Attention",
    icon: FiAlertTriangle,
  },

  [RECIPE_TIP_TYPE.COOKING]: {
    label: "Cuisson",
    icon: FiThermometer,
  },
};