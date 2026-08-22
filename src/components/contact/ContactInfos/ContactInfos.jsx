import {
  FiClock,
  FiLock,
  FiMessageCircle,
} from "react-icons/fi";

import {
  AppCard,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import styles from "./ContactInfos.module.scss";

const CONTACT_INFOS = [
  {
    id: "response",
    title: "Une réponse dès que possible",
    description:
      "Chaque message est consulté afin de pouvoir vous répondre au mieux.",
    icon: FiClock,
  },
  {
    id: "topics",
    title: "Toutes vos idées sont les bienvenues",
    description:
      "Question, suggestion, problème technique ou remarque sur une recette : n’hésitez pas à nous écrire.",
    icon: FiMessageCircle,
  },
  {
    id: "privacy",
    title: "Vos informations restent confidentielles",
    description:
      "Les informations transmises via ce formulaire sont utilisées uniquement pour traiter votre demande.",
    icon: FiLock,
  },
];

export default function ContactInfos() {
  return (
    <Section
      spacing="large"
      labelledBy="contact-infos-title"
    >
      <PageContainer>
        <SectionHeader
          headingId="contact-infos-title"
          eyebrow="À savoir"
          title="Avant de nous écrire"
        />

        <div className={styles.grid}>
          {CONTACT_INFOS.map(
            ({
              id,
              title,
              description,
              icon: Icon,
            }) => (
              <AppCard
                key={id}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <span
                    className={styles.iconWrapper}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>

                  <h3 className={styles.title}>
                    {title}
                  </h3>

                  <p className={styles.description}>
                    {description}
                  </p>
                </div>
              </AppCard>
            )
          )}
        </div>
      </PageContainer>
    </Section>
  );
}