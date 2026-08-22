import {
  useState,
} from "react";

import Form from "react-bootstrap/Form";

import {
  FiSend,
} from "react-icons/fi";

import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import {
  AppButton,
  AppCard,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import {
  createContactMessage,
} from "@/services/contact";

import {
  CONTACT_SUBJECT_OPTIONS,
  CONTACT_VALIDATION,
} from "@/validators";

import styles from "./ContactForm.module.scss";

export default function ContactForm() {
  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit =
    async (values) => {
      setSubmitError("");

      try {
        await createContactMessage(
          values
        );

        reset();

        toast.success(
          "Votre message a bien été envoyé."
        );
      } catch (error) {
        console.error(
          "Unable to send contact message:",
          error
        );

        setSubmitError(
          "Impossible d’envoyer votre message pour le moment."
        );

        toast.error(
          "Impossible d’envoyer votre message."
        );
      }
    };

  return (
    <Section
      spacing="large"
      labelledBy="contact-form-title"
    >
      <PageContainer>
        <SectionHeader
          headingId="contact-form-title"
          eyebrow="Nous écrire"
          title="Envoyer un message"
          description="Remplissez le formulaire ci-dessous et votre message sera transmis à l’équipe MyMomix."
        />

        <AppCard
          className={
            styles.card
          }
        >
          <Form
            noValidate
            onSubmit={
              handleSubmit(
                onSubmit
              )
            }
            className={
              styles.form
            }
          >
            <Form.Group
              controlId="contact-name"
            >
              <Form.Label>
                Nom
              </Form.Label>

              <Form.Control
                type="text"
                autoComplete="name"
                isInvalid={
                  Boolean(
                    errors.name
                  )
                }
                {...register(
                  "name",
                  CONTACT_VALIDATION.name
                )}
              />

              <Form.Control.Feedback type="invalid">
                {
                  errors.name
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="contact-email"
            >
              <Form.Label>
                Email
              </Form.Label>

              <Form.Control
                type="email"
                autoComplete="email"
                isInvalid={
                  Boolean(
                    errors.email
                  )
                }
                {...register(
                  "email",
                  CONTACT_VALIDATION.email
                )}
              />

              <Form.Control.Feedback type="invalid">
                {
                  errors.email
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="contact-subject"
            >
              <Form.Label>
                Sujet
              </Form.Label>

              <Form.Select
                isInvalid={
                  Boolean(
                    errors.subject
                  )
                }
                {...register(
                  "subject",
                  CONTACT_VALIDATION.subject
                )}
              >
                <option value="">
                  Sélectionnez un sujet
                </option>

                {
                  CONTACT_SUBJECT_OPTIONS.map(
                    ({
                      value,
                      label,
                    }) => (
                      <option
                        key={
                          value
                        }
                        value={
                          value
                        }
                      >
                        {
                          label
                        }
                      </option>
                    )
                  )
                }
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {
                  errors.subject
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="contact-message"
            >
              <Form.Label>
                Message
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={6}
                isInvalid={
                  Boolean(
                    errors.message
                  )
                }
                {...register(
                  "message",
                  CONTACT_VALIDATION.message
                )}
              />

              <Form.Control.Feedback type="invalid">
                {
                  errors.message
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>

            {submitError ? (
              <p
                className={
                  styles.submitError
                }
                role="alert"
              >
                {submitError}
              </p>
            ) : null}

            <div
              className={
                styles.actions
              }
            >
              <AppButton
                type="submit"
                variant="primary"
                icon={
                  <FiSend />
                }
                iconPosition="end"
                disabled={
                  isSubmitting
                }
              >
                {
                  isSubmitting
                    ? "Envoi..."
                    : "Envoyer le message"
                }
              </AppButton>
            </div>
          </Form>
        </AppCard>
      </PageContainer>
    </Section>
  );
}