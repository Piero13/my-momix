import fondantChocolateImage from "@/assets/images/recipes/fondant-chocolat.webp";
import mushroomRisottoImage from "@/assets/images/recipes/risotto-champignons.webp";
import zucchiniSoupImage from "@/assets/images/recipes/veloute-courgettes.webp";

const BASE_RECIPES = [
  {
    title: "Velouté de courgettes",
    slug: "veloute-de-courgettes",
    imageUrl: zucchiniSoupImage,
    category: "soupes",
    totalTime: 35,
    servings: 4,
    difficulty: "Facile",
  },
  {
    title: "Risotto crémeux aux champignons",
    slug: "risotto-cremeux-aux-champignons",
    imageUrl: mushroomRisottoImage,
    category: "plats",
    totalTime: 45,
    servings: 4,
    difficulty: "Intermédiaire",
  },
  {
    title: "Fondant au chocolat",
    slug: "fondant-au-chocolat",
    imageUrl: fondantChocolateImage,
    category: "desserts",
    totalTime: 30,
    servings: 6,
    difficulty: "Facile",
  },
];

export const BROWSE_RECIPES = Array.from(
  { length: 36 },
  (_, index) => {
    const recipe = BASE_RECIPES[index % BASE_RECIPES.length];
    const iteration = Math.floor(index / BASE_RECIPES.length) + 1;

    return {
      ...recipe,
      id: `recipe-${index + 1}`,
      title:
        iteration === 1
          ? recipe.title
          : `${recipe.title} ${iteration}`,
      slug:
        iteration === 1
          ? recipe.slug
          : `${recipe.slug}-${iteration}`,
    };
  }
);