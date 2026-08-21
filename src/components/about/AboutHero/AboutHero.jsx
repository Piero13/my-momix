import {
  PageContainer,
  Section,
} from "@/components/ui";

import styles from "./AboutHero.module.scss"

export default function AboutHero() {
    return (
        <Section
            className={styles.section}
            spacing="large"
            labelledBy="about-title"
        >
            <div
                className={styles.decorativeShape}
                aria-hidden="true"
            />
            
            <PageContainer>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>
                        À propos de MyMomix
                    </p>

                    <h1 
                        id="about-title" 
                        className={styles.title}
                    >
                        MyMomix, vos recettes organisées à votre façon
                    </h1>

                    <p className={styles.description}>
                        MyMomix est né d&apos;une idée simple : retrouver facilement
                        ses recettes Thermomix préférées sans perdre de temps à
                        chercher, noter ou réorganiser ses informations à chaque
                        utilisation.
                    </p>

                    <p className={styles.description}>
                        Recettes, favoris, avis et liste de courses sont réunis dans
                        une application claire et pensée pour accompagner la cuisine
                        du quotidien.
                    </p>
                </div>
            </PageContainer>
        </Section>
    );
}