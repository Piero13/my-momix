import {
  NavLink,
} from "react-router-dom";

import {
  FiArrowRight,
} from "react-icons/fi";

import {
  AppButton,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import {
  ROUTES,
} from "@/constants";

import styles from "./AboutCTA.module.scss"

export default function AboutCTA() {
    return (
        <Section
            spacing="large"
            labelledBy="about-cta-title"
        >
            <PageContainer>
                <div className={styles.content}>
                    <SectionHeader
                        headingId="about-cta-title"
                        eyebrow="À vous de jouer"
                        title="Et si on passait en cuisine ?"
                        description="Parcourez les recettes MyMomix et trouvez la prochaine à préparer."
                    />

                    <div className={styles.action}>
                        <AppButton
                            as={NavLink}
                            to={ROUTES.BROWSE}
                            variant="primary"
                            icon={<FiArrowRight />}
                            iconPosition="end"
                        >
                            Explorer les recettes
                        </AppButton>
                    </div>
                </div>
            </PageContainer>
        </Section>
    );
}