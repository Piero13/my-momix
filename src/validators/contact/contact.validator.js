export const CONTACT_SUBJECT_OPTIONS = [
  {
    value: "general",
    label: "Question générale",
  },
  {
    value: "suggestion",
    label: "Suggestion",
  },
  {
    value: "technical",
    label: "Problème technique",
  },
  {
    value: "recipe",
    label: "Recette / contenu",
  },
  {
    value: "other",
    label: "Autre",
  },
];

export const CONTACT_VALIDATION = {
  name: {
    required:
      "Votre nom est requis.",

    minLength: {
      value: 2,
      message:
        "Votre nom doit contenir au moins 2 caractères.",
    },

    maxLength: {
      value: 80,
      message:
        "Votre nom ne peut pas dépasser 80 caractères.",
    },
  },

  email: {
    required:
      "Votre adresse email est requise.",

    pattern: {
      value:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message:
        "Veuillez saisir une adresse email valide.",
    },
  },

  subject: {
    required:
      "Veuillez sélectionner un sujet.",
  },

  message: {
    required:
      "Votre message est requis.",

    minLength: {
      value: 10,
      message:
        "Votre message doit contenir au moins 10 caractères.",
    },

    maxLength: {
      value: 2000,
      message:
        "Votre message ne peut pas dépasser 2000 caractères.",
    },
  },
};