import {
  FiCheckCircle,
  FiLayers,
  FiZap,
} from "react-icons/fi";

import {
  AppCard,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

import styles from "./AboutPrinciples.module.scss"

const PRINCIPLES = [
  {
    id: "simple",
    title: "Simple",
    description:
      "Une interface claire pour aller rapidement à l’essentiel.",
    icon: FiZap,
  },
  {
    id: "organized",
    title: "Organisé",
    description:
      "Recettes, catégories, favoris et liste de courses restent faciles à retrouver.",
    icon: FiLayers,
  },
  {
    id: "practical",
    title: "Pratique",
    description:
      "Recherche, filtres et outils utiles accompagnent la préparation au quotidien.",
    icon: FiCheckCircle,
  },
];

export default function AboutPrinciples() {
    return (
        <Section
            spacing="large"
            labelledBy="about-principles-title"
        >
            <PageContainer>
                <SectionHeader
                    headingId="about-principles-title"
                    eyebrow="L’idée derrière MyMomix"
                    title="Pensé pour simplifier le quotidien"
                    description="Quand les recettes s’accumulent, retrouver celle que l’on cherche ou préparer les ingrédients nécessaires peut vite devenir fastidieux."
                />

                <div className={styles.grid}>
                {PRINCIPLES.map(
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
                    </AppCard>
                ))}
                </div>
            </PageContainer>
        </Section>
    );
}