/**
 * Displays a responsive grid of recipe cards.
 */

import { Col, Row } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

import { EmptyState } from "@/components/ui";

import RecipeCard from "../RecipeCard";

import styles from "./RecipeGrid.module.scss";

export default function RecipeGrid({ recipes }) {
  if (!recipes.length) {
    return (
      <EmptyState
        icon={FiSearch}
        title="Aucune recette trouvée"
        description="Essayez de modifier votre recherche ou vos filtres."
      />
    );
  }

  return (
    <Row className={styles.grid}>
      {recipes.map((recipe) => (
        <Col
          key={recipe.id}
          xs={12}
          md={6}
          xl={4}
        >
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}