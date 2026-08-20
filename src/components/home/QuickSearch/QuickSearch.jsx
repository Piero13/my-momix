/**
 * Quick recipe search displayed on the public home page.
 */

import { useForm, useWatch } from "react-hook-form";
import { FiFilter, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  AppCard,
  PageContainer,
  SearchInput,
  Section,
  SectionHeader,
} from "@/components/ui";

import { ROUTES } from "@/constants";

import styles from "./QuickSearch.module.scss";

const QUICK_SEARCH_SUGGESTIONS = [
    "Dessert",
    "Soupe",
    "Poulet",
    "Végétarien",
];

export default function QuickSearch() {
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        resetField,
        setValue,
    } = useForm({
        defaultValues: {
        search: "",
        },
    });

    const searchValue = useWatch({
        control,
        name: "search",
        defaultValue: "",
    });

    const navigateToSearch = (searchTerm) => {
        const normalizedSearch = searchTerm.trim();

        if (!normalizedSearch) {
        navigate(ROUTES.BROWSE);
        return;
        }

        const searchParams = new URLSearchParams({
        search: normalizedSearch,
        });

        navigate(`${ROUTES.BROWSE}?${searchParams.toString()}`);
    };

    const handleSearchSubmit = ({ search }) => {
        navigateToSearch(search);
    };

    const handleSuggestionClick = (suggestion) => {
        setValue("search", suggestion, {
        shouldDirty: true,
        shouldTouch: true,
        });

        navigateToSearch(suggestion);
    };

    const handleSearchClear = () => {
        resetField("search");
    };

    return (
        <Section
            className={styles.section}
            spacing="large"
            labelledBy="quick-search-title"
        >
            <PageContainer>
                <AppCard className={styles.card}>
                    <SectionHeader
                        headingId="quick-search-title"
                        title="Que souhaitez-vous cuisiner ?"
                        description="Recherchez une recette par nom, ingrédient ou type de plat."
                        align="center"
                    />

                    <form
                        className={styles.form}
                        role="search"
                        onSubmit={handleSubmit(handleSearchSubmit)}
                    >
                        <SearchInput
                            {...register("search")}
                            id="home-recipe-search"
                            value={searchValue}
                            placeholder="Ex. velouté de courgettes, chocolat, poulet..."
                            ariaLabel="Rechercher une recette"
                            showSubmitButton
                            submitLabel="Rechercher"
                            onClear={handleSearchClear}
                        />
                    </form>

                    <div className={styles.suggestions}>
                        <div className={styles.suggestionsLabel}>
                            <FiFilter aria-hidden="true" />

                            <span>Suggestions :</span>
                        </div>

                        <div
                            className={styles.suggestionsList}
                            aria-label="Suggestions de recherche"
                        >
                        {QUICK_SEARCH_SUGGESTIONS.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                className={styles.suggestion}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <FiSearch aria-hidden="true" />
                                <span>{suggestion}</span>
                            </button>
                        ))}
                        </div>
                    </div>
                </AppCard>
            </PageContainer>
        </Section>
    );
}