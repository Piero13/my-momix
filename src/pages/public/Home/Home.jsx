import { Button } from "react-bootstrap";

import {
  AppButton,
  AppCard,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function Home() {
  return (
    <>
      <Section spacing="large" labelledBy="ui-library-title">
        <PageContainer>
          <SectionHeader
            headingId="ui-library-title"
            title="Bibliothèque UI MyMomix"
            description="Socle visuel réutilisable de l'application."
          />

          <AppCard hoverable className="mb-4">
            <h3>Une carte générique</h3>
            <p>
              Ce composant servira de fondation aux cartes de recettes,
              aux statistiques et aux blocs d'information.
            </p>

            <AppButton variant="primary">
              Action principale
            </AppButton>
          </AppCard>

          <Button variant="secondary">
            Contrôle Bootstrap
          </Button>
        </PageContainer>
      </Section>
    </>
  );
}