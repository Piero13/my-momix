import {
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import styles from "./AboutJourney.module.scss";

const JOURNEY_STEPS = [
  "Je cherche",
  "Je choisis",
  "J’ajoute aux favoris si elle me plaît",
  "J’ajoute les ingrédients à ma liste",
  "Je cuisine",
  "Je laisse éventuellement mon avis",
];

export default function AboutJourney() {
    return (
        <Section
            spacing="large"
            labelledBy="about-journey-title"
        >
            <PageContainer>
                <SectionHeader
                    headingId="about-journey-title"
                    eyebrow="Au quotidien"
                    title="De la recette à la liste de courses"
                    description="MyMomix accompagne le parcours complet autour d’une recette."
                />

                <ol className={styles.journey}>
                {JOURNEY_STEPS.map(
                    (step) => (
                    <li 
                        key={step}
                        className={styles.item}
                    >
                        {step}
                    </li>
                    )
                )}
                </ol>
            </PageContainer>
        </Section>
    );
}