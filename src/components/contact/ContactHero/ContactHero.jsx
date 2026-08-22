import {
  FiMail,
} from "react-icons/fi";

import {
  PageContainer,
  Section,
} from "@/components/ui";

import styles from "./ContactHero.module.scss";

export default function ContactHero() {
  return (
    <Section
      className={styles.section}
      spacing="large"
      labelledBy="contact-title"
    >
      <PageContainer>
        <div className={styles.content}>
          <span
            className={styles.iconWrapper}
            aria-hidden="true"
          >
            <FiMail />
          </span>

          <p className={styles.eyebrow}>
            Contact
          </p>

          <h1
            id="contact-title"
            className={styles.title}
          >
            Une question, une suggestion ?
          </h1>

          <p className={styles.description}>
            Vous avez remarqué un problème,
            souhaitez proposer une amélioration
            ou simplement poser une question
            concernant MyMomix ?
          </p>

          <p className={styles.description}>
            Utilisez le formulaire ci-dessous
            pour nous envoyer votre message.
          </p>
        </div>
      </PageContainer>
    </Section>
  );
}