/**
 * Temporary detailed recipe data.
 *
 * This file will be replaced by the Supabase recipe service.
 */

import fondantChocolateImage from "@/assets/images/recipes/fondant-chocolat.webp";
import mushroomRisottoImage from "@/assets/images/recipes/risotto-champignons.webp";
import zucchiniSoupImage from "@/assets/images/recipes/veloute-courgettes.webp";

export const RECIPE_DETAILS_DATA = [
  {
    id: "recipe-1",
    title: "Velouté de courgettes",
    slug: "veloute-de-courgettes",
    description:
      "Un velouté doux et onctueux, simple à préparer au Thermomix et idéal pour un repas léger.",
    imageUrl: zucchiniSoupImage,
    category: {
      name: "Soupes",
      slug: "soupes",
    },
    difficulty: "Facile",
    preparationTime: 10,
    cookingTime: 25,
    totalTime: 35,
    servings: 4,
    averageRating: 4.9,
    ratingsCount: 18,
    createdAt: "2026-07-31T12:00:00.000Z",
    ingredients: [
      {
        id: "ingredient-1",
        quantity: 600,
        unit: "g",
        name: "courgettes",
      },
      {
        id: "ingredient-2",
        quantity: 1,
        unit: "",
        name: "oignon",
      },
      {
        id: "ingredient-3",
        quantity: 500,
        unit: "g",
        name: "eau",
      },
      {
        id: "ingredient-4",
        quantity: 1,
        unit: "",
        name: "cube de bouillon de légumes",
      },
      {
        id: "ingredient-5",
        quantity: 80,
        unit: "g",
        name: "crème fraîche",
      },
      {
        id: "ingredient-6",
        quantity: null,
        unit: "",
        name: "sel et poivre",
      },
    ],
    steps: [
      {
        id: "step-1",
        order: 1,
        description:
          "Éplucher l’oignon, le couper en deux et le placer dans le bol.",
        duration: 5,
        speed: 5,
        temperature: null,
      },
      {
        id: "step-2",
        order: 2,
        description:
          "Ajouter les courgettes coupées en morceaux, l’eau et le cube de bouillon.",
        duration: null,
        speed: null,
        temperature: null,
      },
      {
        id: "step-3",
        order: 3,
        description:
          "Faire cuire les légumes.",
        duration: 20,
        speed: 1,
        temperature: 100,
      },
      {
        id: "step-4",
        order: 4,
        description:
          "Ajouter la crème fraîche, puis mixer progressivement jusqu’à obtenir une texture lisse.",
        duration: 1,
        speed: 10,
        temperature: null,
      },
      {
        id: "step-5",
        order: 5,
        description:
          "Rectifier l’assaisonnement et servir immédiatement.",
        duration: null,
        speed: null,
        temperature: null,
      },
    ],
    tips: [
      {
        id: "tip-1",
        type: "variante",
        text: "Remplacez la crème fraîche par du fromage frais pour une texture différente.",
      },
      {
        id: "tip-2",
        type: "astuce",
        text: "Ajoutez quelques feuilles de basilic avant le mixage pour parfumer le velouté.",
      },
    ],
    nutrition: {
      calories: 145,
      proteins: 4.2,
      carbohydrates: 10.5,
      fats: 8.6,
      fiber: 3.1,
    },
  },

  {
    id: "recipe-2",
    title: "Risotto crémeux aux champignons",
    slug: "risotto-cremeux-aux-champignons",
    description:
      "Un risotto crémeux aux champignons préparé simplement au Thermomix, parfait pour un repas convivial.",
    imageUrl: mushroomRisottoImage,
    category: {
      name: "Plats",
      slug: "plats",
    },
    difficulty: "Intermédiaire",
    preparationTime: 15,
    cookingTime: 30,
    totalTime: 45,
    servings: 4,
    averageRating: 4.7,
    ratingsCount: 26,
    createdAt: "2026-07-30T12:00:00.000Z",
    ingredients: [
      {
        id: "ingredient-1",
        quantity: 300,
        unit: "g",
        name: "riz à risotto",
      },
      {
        id: "ingredient-2",
        quantity: 250,
        unit: "g",
        name: "champignons de Paris",
      },
      {
        id: "ingredient-3",
        quantity: 1,
        unit: "",
        name: "échalote",
      },
      {
        id: "ingredient-4",
        quantity: 700,
        unit: "g",
        name: "bouillon de légumes",
      },
      {
        id: "ingredient-5",
        quantity: 60,
        unit: "g",
        name: "parmesan râpé",
      },
      {
        id: "ingredient-6",
        quantity: 20,
        unit: "g",
        name: "huile d’olive",
      },
    ],
    steps: [
      {
        id: "step-1",
        order: 1,
        description:
          "Placer l’échalote dans le bol et la hacher.",
        duration: 5,
        speed: 5,
        temperature: null,
      },
      {
        id: "step-2",
        order: 2,
        description:
          "Ajouter l’huile et les champignons émincés, puis faire revenir.",
        duration: 5,
        speed: 1,
        temperature: 120,
      },
      {
        id: "step-3",
        order: 3,
        description:
          "Ajouter le riz et le faire nacrer.",
        duration: 3,
        speed: 1,
        temperature: 120,
      },
      {
        id: "step-4",
        order: 4,
        description:
          "Verser le bouillon et poursuivre la cuisson sans le gobelet doseur.",
        duration: 18,
        speed: 1,
        temperature: 100,
      },
      {
        id: "step-5",
        order: 5,
        description:
          "Ajouter le parmesan et mélanger délicatement avant de servir.",
        duration: 30,
        speed: 1,
        temperature: null,
      },
    ],
    tips: [
      "Servez immédiatement afin de conserver toute l’onctuosité du risotto.",
      "Vous pouvez remplacer une partie des champignons par des cèpes.",
    ],
    nutrition: {
      calories: 485,
      proteins: 14.8,
      carbohydrates: 69.4,
      fats: 15.2,
      fiber: 4.7,
    },
  },

  {
    id: "recipe-3",
    title: "Fondant au chocolat",
    slug: "fondant-au-chocolat",
    description:
      "Un fondant au chocolat intense, rapide à préparer et irrésistiblement moelleux.",
    imageUrl: fondantChocolateImage,
    category: {
      name: "Desserts",
      slug: "desserts",
    },
    difficulty: "Facile",
    preparationTime: 10,
    cookingTime: 20,
    totalTime: 30,
    servings: 6,
    averageRating: 4.8,
    ratingsCount: 42,
    createdAt: "2026-07-29T12:00:00.000Z",
    ingredients: [
      {
        id: "ingredient-1",
        quantity: 200,
        unit: "g",
        name: "chocolat noir",
      },
      {
        id: "ingredient-2",
        quantity: 120,
        unit: "g",
        name: "beurre",
      },
      {
        id: "ingredient-3",
        quantity: 100,
        unit: "g",
        name: "sucre",
      },
      {
        id: "ingredient-4",
        quantity: 50,
        unit: "g",
        name: "farine",
      },
      {
        id: "ingredient-5",
        quantity: 3,
        unit: "",
        name: "œufs",
      },
    ],
    steps: [
      {
        id: "step-1",
        order: 1,
        description:
          "Préchauffer le four à 180 °C et beurrer un moule.",
        duration: null,
        speed: null,
        temperature: null,
      },
      {
        id: "step-2",
        order: 2,
        description:
          "Placer le chocolat dans le bol et le réduire en morceaux.",
        duration: 10,
        speed: 9,
        temperature: null,
      },
      {
        id: "step-3",
        order: 3,
        description:
          "Ajouter le beurre et faire fondre le mélange.",
        duration: 3,
        speed: 2,
        temperature: 50,
      },
      {
        id: "step-4",
        order: 4,
        description:
          "Ajouter le sucre, la farine et les œufs, puis mélanger.",
        duration: 30,
        speed: 4,
        temperature: null,
      },
      {
        id: "step-5",
        order: 5,
        description:
          "Verser dans le moule et cuire pendant environ 20 minutes.",
        duration: null,
        speed: null,
        temperature: null,
      },
    ],
    tips: [
      "Réduisez légèrement la cuisson pour obtenir un cœur plus coulant.",
      "Servez avec une boule de glace à la vanille ou une crème anglaise.",
    ],
    nutrition: {
      calories: 410,
      proteins: 6.5,
      carbohydrates: 36.2,
      fats: 26.1,
      fiber: 3.8,
    },
  },
];