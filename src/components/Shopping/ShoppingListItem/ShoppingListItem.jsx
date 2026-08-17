/**
 * Displays one shopping list item.
 */

import {
  FiCheckCircle,
  FiCircle,
  FiTrash2,
} from "react-icons/fi";

import { AppButton } from "@/components/ui";

import { formatShoppingQuantity } from "@/utils";

import styles from "./ShoppingListItem.module.scss";

export default function ShoppingListItem({
  item,
  onToggle,
  onRemove,
}) {
    const {
        id,
        name,
        quantity,
        unit,
        checked,
        sourceRecipes = [],
    } = item;

    const hasSources =
        sourceRecipes.length > 0;

    const formattedQuantity =
        formatShoppingQuantity(
            quantity
        );

    return (
        <li
            className={[
                styles.item,
                checked
                ? styles.checked
                : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <button
                type="button"
                className={styles.statusButton}
                aria-label={
                    checked
                        ? `Marquer ${name} comme à acheter`
                        : `Marquer ${name} comme acheté`
                }
                aria-pressed={checked}
                onClick={() =>
                onToggle?.(id)
                }
            >
                {checked ? (
                    <FiCheckCircle />
                ) : (
                    <FiCircle />
                )}
            </button>

        <div className={styles.content}>
            <div className={styles.main}>
                <div className={styles.quantity}>
                    {formattedQuantity ? (
                        <span>
                            {formattedQuantity}
                            {unit ? ` ${unit}` : ""}
                        </span>
                    ) : null}
                </div>

                <strong className={styles.name}>
                    {name}
                </strong>
            </div>

            {hasSources ? (
            <div className={styles.sources}>
                <span
                    className={
                        styles.sourcesLabel
                    }
                >
                    Pour :
                </span>

                <span>
                {sourceRecipes
                    .map(
                    (recipe) =>
                        recipe.title
                    )
                    .filter(Boolean)
                    .join(" · ")}
                </span>
            </div>
            ) : null}
        </div>

            <AppButton
                type="button"
                variant="outline-danger"
                icon={<FiTrash2 />}
                iconPosition="center"
                aria-label={`Supprimer ${name} de la liste`}
                onClick={() =>
                onRemove?.(id)
                }
            />
        </li>
    );
}