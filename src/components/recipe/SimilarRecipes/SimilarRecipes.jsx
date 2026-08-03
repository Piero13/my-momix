/**
 * Displays recipes related to the current one.
 */

import { Col, Row } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AppButton, SectionHeader } from "@/components/ui";
import { ROUTES } from "@/constants";

import RecipeCard from "../RecipeCard";

import styles from "./SimilarRecipes.module.scss";

export default function SimilarRecipes({
  recipes = [],
}) {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="similar-recipes-title"
    >
      <SectionHeader
        headingId="similar-recipes-title"
        eyebrow="À découvrir"
        title="Recettes similaires"
        description="Continuez votre exploration avec des recettes proches de celle-ci."
        action={
          <AppButton
            as={Link}
            to={ROUTES.BROWSE}
            variant="outline-primary"
            icon={<FiArrowRight />}
            iconPosition="end"
          >
            Voir toutes les recettes
          </AppButton>
        }
      />

      <Row className="g-4">
        {recipes.map((recipe) => (
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
    </section>
  );
}