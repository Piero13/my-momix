import {
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";

import { SectionHeader } from "@/components";

import {
  formatRelativeDate,
} from "@/utils";

import styles from "./RecipeComments.module.scss";

export default function RecipeComments({
  comments = [],
}) {
  return (
    <section
      className={styles.section}
      aria-labelledby="recipe-comments-title"
    >
        <SectionHeader
            headingId="comments-title"
            eyebrow="Avis"
            title="Commentaires"
            description="Les avis laissés par les personnes ayant testé cette recette."
        />

      {comments.length === 0 ? (
        <div className={styles.empty}>
          <FiMessageCircle
            aria-hidden="true"
          />

          <p>
            Aucun commentaire pour le moment.
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {comments.map(
            (comment) => (
              <li
                key={comment.id}
                className={styles.item}
              >
                <div
                  className={
                    styles.itemHeader
                  }
                >
                  <div>
                    <strong
                      className={
                        styles.author
                      }
                    >
                      {comment.author_name}
                    </strong>

                    <span
                      className={
                        styles.date
                      }
                    >
                      {formatRelativeDate(
                        comment.created_at
                      )}
                    </span>
                  </div>

                  {comment.rating ? (
                    <span
                      className={
                        styles.rating
                      }
                      aria-label={`Note ${comment.rating} sur 5`}
                    >
                      <FiStar
                        aria-hidden="true"
                      />

                      {comment.rating}/5
                    </span>
                  ) : null}
                </div>

                <p
                  className={
                    styles.content
                  }
                >
                  {comment.content}
                </p>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}