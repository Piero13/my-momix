/**
 * Login form validation rules.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LOGIN_VALIDATION = {
  email: {
    required: "L’adresse e-mail est obligatoire.",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Saisissez une adresse e-mail valide.",
    },
  },

  password: {
    required: "Le mot de passe est obligatoire.",
    minLength: {
      value: 8,
      message:
        "Le mot de passe doit contenir au moins 8 caractères.",
    },
  },
};