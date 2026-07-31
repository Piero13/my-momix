import fondantChocolateImage from "@/assets/images/recipes/fondant-chocolat.webp";
import mushroomRisottoImage from "@/assets/images/recipes/risotto-champignons.webp";
import zucchiniSoupImage from "@/assets/images/recipes/veloute-courgettes.webp";

export const LATEST_RECIPES = [
  {
    id: "recipe-1",
    title: "Velouté de courgettes",
    slug: "veloute-de-courgettes",
    imageUrl: zucchiniSoupImage,
    category: "Soupes",
    totalTime: 35,
    servings: 4,
    difficulty: "Facile",
  },
  {
    id: "recipe-2",
    title: "Risotto crémeux aux champignons",
    slug: "risotto-cremeux-aux-champignons",
    imageUrl: mushroomRisottoImage,
    category: "Plats",
    totalTime: 45,
    servings: 4,
    difficulty: "Intermédiaire",
  },
  {
    id: "recipe-3",
    title: "Fondant au chocolat",
    slug: "fondant-au-chocolat",
    imageUrl: fondantChocolateImage,
    category: "Desserts",
    totalTime: 30,
    servings: 6,
    difficulty: "Facile",
  },
];