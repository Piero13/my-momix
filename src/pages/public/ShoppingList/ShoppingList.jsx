import { FiShoppingCart } from "react-icons/fi";

import { useState } from "react";

import { Link } from "react-router-dom";

import {
  AppButton,
  EmptyState,
  PageContainer,
  Section,
  SectionHeader,
  ShoppingListItem,
  AdminConfirmModal,
} from "@/components";

import {
  ROUTES,
} from "@/constants";

import { useShoppingList } from "@/hooks/shoppingList";

import styles from "./ShoppingList.module.scss";

export default function ShoppingList() {
    const {
        items,
        remainingItems,
        checkedItems,
        remainingItemsCount,
        checkedItemsCount,

        toggleItem,
        removeItem,
        removeCheckedItems,
        clearList,
    } = useShoppingList();

    const [
        showClearConfirm,
        setShowClearConfirm,
    ] = useState(false);

    const sortedCheckedItems = [
        ...checkedItems,
    ].sort((a, b) =>
        a.name.localeCompare(
            b.name,
            "fr"
        )
    );

    const sortedRemainingItems = [
        ...remainingItems,
    ].sort((a, b) =>
        a.name.localeCompare(
            b.name,
            "fr"
        )
    );

    if (items.length === 0) {
        return (
        <Section
            className={styles.section}
            spacing="large"
            labelledBy="shopping-list-title"
        >
            <PageContainer>
                <EmptyState
                    icon={FiShoppingCart}
                    title="Votre liste de courses est vide"
                    description="Ajoutez les ingrédients d’une recette pour préparer facilement vos prochaines courses."
                    action={
                        <AppButton
                            as={Link}
                            to={ROUTES.BROWSE}
                            variant="primary"
                        >
                            Explorer les recettes
                        </AppButton>
                    }
                />
            </PageContainer>
        </Section>
        );
    }

    return (
        <Section
            className={styles.section}
            spacing="large"
            labelledBy="shopping-list-title"
        >
            <PageContainer>
                <SectionHeader
                    headingId="shopping-list-title"
                    eyebrow="Organisation"
                    title="Ma liste de courses"
                    description="Retrouvez ici les ingrédients ajoutés depuis vos recettes."
                />

                <div className={styles.summary}>
                    <span>
                        <strong>
                            {remainingItemsCount}
                        </strong>{" "}
                        {remainingItemsCount > 1
                            ? "articles à acheter"
                            : "article à acheter"}
                    </span>

                    {checkedItemsCount > 0 ? (
                        <span>
                            <strong>
                                {checkedItemsCount}
                            </strong>{" "}
                            {checkedItemsCount > 1
                                ? "articles achetés"
                                : "article acheté"}
                        </span>
                    ) : null}
                </div>

                <div className={styles.actions}>
                    {checkedItemsCount > 0 ? (
                        <AppButton
                            type="button"
                            variant="outline-secondary"
                            onClick={
                                removeCheckedItems
                            }
                        >
                            Supprimer les articles cochés
                        </AppButton>
                    ) : null}

                    <AppButton
                        type="button"
                        variant="outline-danger"
                        onClick={() =>
                            setShowClearConfirm(true)
                        }
                    >
                        Vider la liste
                    </AppButton>
                </div>

                {sortedRemainingItems.length > 0 ? (
                    <section
                        className={styles.group}
                        aria-labelledby="shopping-list-remaining-title"
                    >
                        <h2
                            id="shopping-list-remaining-title"
                            className={styles.groupTitle}
                        >
                            À acheter
                        </h2>

                        <ul className={styles.list}>
                            {sortedRemainingItems.map(
                                (item) => (
                                <ShoppingListItem
                                    key={item.id}
                                    item={item}
                                    onToggle={toggleItem}
                                    onRemove={removeItem}
                                />
                                )
                            )}
                        </ul>
                    </section>
                ) : null}

                {sortedCheckedItems.length > 0 ? (
                    <section
                        className={styles.group}
                        aria-labelledby="shopping-list-checked-title"
                    >
                        <h2
                            id="shopping-list-checked-title"
                            className={styles.groupTitle}
                        >
                            Déjà achetés
                        </h2>

                        <ul className={styles.list}>
                            {sortedCheckedItems.map(
                                (item) => (
                                    <ShoppingListItem
                                        key={item.id}
                                        item={item}
                                        onToggle={toggleItem}
                                        onRemove={removeItem}
                                    />
                                )
                            )}
                        </ul>
                    </section>
                ) : null}
            </PageContainer>

            <AdminConfirmModal
                show={showClearConfirm}
                title="Vider la liste de courses ?"
                description="Tous les articles seront supprimés. Cette action est définitive."
                confirmLabel="Vider la liste"
                cancelLabel="Annuler"
                variant="danger"
                onCancel={() =>
                    setShowClearConfirm(false)
                }
                onConfirm={() => {
                    clearList();
                    setShowClearConfirm(false);
                }}
            />
        </Section>
    );
}