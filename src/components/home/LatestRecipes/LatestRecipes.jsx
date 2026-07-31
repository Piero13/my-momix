/**
 * Displays the latest recipes on the public home page.
 */

import { Col, Row } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { RecipeCard } from "@/components/recipe";
import {
  AppButton,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";
import { ROUTES } from "@/constants";

import { LATEST_RECIPES } from "./latestRecipes.data";
import styles from "./LatestRecipes.module.scss";

export default function LatestRecipes() {
  return (
    <Section
      spacing="large"
      labelledBy="latest-recipes-title"
      className={styles.section}
    >
      <PageContainer>
        <SectionHeader
          headingId="latest-recipes-title"
          eyebrow="Nouveautés"
          title="Les dernières recettes"
          description="Découvrez les recettes récemment ajoutées à MyMomix."
          action={
            <AppButton
              as={Link}
              to={ROUTES.BROWSE}
              variant="outline-primary"
              icon={<FiArrowRight />}
              iconPosition="right"
            >
              Voir toutes les recettes
            </AppButton>
          }
        />

        <Row className="g-4">
          {LATEST_RECIPES.map((recipe) => (
            <Col
              key={recipe.id}
              xs={12}
              md={6}
              lg={4}
            >
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </PageContainer>
    </Section>
  );
}