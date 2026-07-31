import {
  FiCoffee,
  FiHeart,
  FiSun,
  FiZap,
} from "react-icons/fi";

export const POPULAR_CATEGORIES = [
  {
    id: "category-starters",
    name: "Entrées",
    slug: "entrees",
    description:
      "Des idées légères et gourmandes pour commencer le repas.",
    icon: FiSun,
    recipeCount: 12,
  },
  {
    id: "category-main-courses",
    name: "Plats",
    slug: "plats",
    description:
      "Des recettes complètes pour les repas du quotidien.",
    icon: FiZap,
    recipeCount: 28,
  },
  {
    id: "category-desserts",
    name: "Desserts",
    slug: "desserts",
    description:
      "Gâteaux, crèmes et douceurs préparés au Thermomix.",
    icon: FiHeart,
    recipeCount: 19,
  },
  {
    id: "category-soups",
    name: "Soupes",
    slug: "soupes",
    description:
      "Des veloutés réconfortants pour toutes les saisons.",
    icon: FiCoffee,
    recipeCount: 9,
  },
];