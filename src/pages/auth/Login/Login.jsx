/**
 * Administrator login page.
 */

import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiMail,
} from "react-icons/fi";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  AppButton,
  PageContainer,
  Section,
} from "@/components/ui";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";
import { LOGIN_VALIDATION } from "@/validators";

import styles from "./Login.module.scss";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    signIn,
    isLoading,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const destination =
    location.state?.from?.pathname ??
    ROUTES.ADMIN_DASHBOARD;

  const handleTogglePassword = () => {
    setShowPassword((currentValue) => !currentValue);
  };

  const handleLogin = async (formData) => {
    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });

      toast.success("Connexion réussie.");

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      console.error("Login failed:", error);

      toast.error(
        "Adresse e-mail ou mot de passe incorrect."
      );
    }
  };

  const isFormBusy = isSubmitting || isLoading;

  return (
    <Section
      className={styles.section}
      spacing="large"
      labelledBy="login-title"
    >
      <PageContainer>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <header className={styles.header}>
              <span
                className={styles.headerIcon}
                aria-hidden="true"
              >
                <FiLock />
              </span>

              <div>
                <p className={styles.eyebrow}>
                  Administration
                </p>

                <h1
                  id="login-title"
                  className={styles.title}
                >
                  Se connecter
                </h1>
              </div>
            </header>

            <p className={styles.description}>
              Connectez-vous pour gérer les recettes et les contenus de
              MyMomix.
            </p>

            <Form
              noValidate
              onSubmit={handleSubmit(handleLogin)}
            >
              <Form.Group
                className={styles.group}
                controlId="login-email"
              >
                <Form.Label>
                  Adresse e-mail
                </Form.Label>

                <div className={styles.field}>
                  <FiMail
                    className={styles.fieldIcon}
                    aria-hidden="true"
                  />

                  <Form.Control
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    disabled={isFormBusy}
                    isInvalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "login-email-error"
                        : undefined
                    }
                    {...register(
                      "email",
                      LOGIN_VALIDATION.email
                    )}
                  />
                </div>

                <Form.Control.Feedback
                  id="login-email-error"
                  type="invalid"
                >
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className={styles.group}
                controlId="login-password"
              >
                <Form.Label>
                  Mot de passe
                </Form.Label>

                <div className={styles.field}>
                  <FiLock
                    className={styles.fieldIcon}
                    aria-hidden="true"
                  />

                  <Form.Control
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    placeholder="Votre mot de passe"
                    disabled={isFormBusy}
                    isInvalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "login-password-error"
                        : undefined
                    }
                    className={styles.passwordInput}
                    {...register(
                      "password",
                      LOGIN_VALIDATION.password
                    )}
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    aria-pressed={showPassword}
                    disabled={isFormBusy}
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <FiEyeOff aria-hidden="true" />
                    ) : (
                      <FiEye aria-hidden="true" />
                    )}
                  </button>
                </div>

                <Form.Control.Feedback
                  id="login-password-error"
                  type="invalid"
                >
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <AppButton
                type="submit"
                icon={<FiLogIn />}
                className={styles.submitButton}
                disabled={isFormBusy}
              >
                {isFormBusy
                  ? "Connexion en cours…"
                  : "Se connecter"}
              </AppButton>
            </Form>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}