/**
 * Displays popular recipe categories on the public home page.
 */

import { Col, Row } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { CategoryCard } from "@/components/category";
import {
  AppButton,
  PageContainer,
  Section,
  SectionHeader,
} from "@/components/ui";
import { ROUTES } from "@/constants";

import { POPULAR_CATEGORIES } from "./popularCategories.data";
import styles from "./PopularCategories.module.scss";

export default function PopularCategories() {
  return (
    <Section
      className={styles.section}
      spacing="large"
      labelledBy="popular-categories-title"
    >
      <PageContainer>
        <SectionHeader
          headingId="popular-categories-title"
          eyebrow="Inspiration"
          title="Explorez les catégories"
          description="Trouvez rapidement une recette adaptée à vos envies."
          action={
            <AppButton
              as={Link}
              to={ROUTES.BROWSE}
              variant="outline-primary"
              icon={<FiArrowRight />}
              iconPosition="right"
            >
              Parcourir les recettes
            </AppButton>
          }
        />

        <Row className="g-4">
          {POPULAR_CATEGORIES.map((category) => (
            <Col
              key={category.id}
              xs={12}
              sm={6}
              lg={3}
            >
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </PageContainer>
    </Section>
  );
}