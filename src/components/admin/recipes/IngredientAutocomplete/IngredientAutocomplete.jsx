import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiCheck,
  FiSearch,
} from "react-icons/fi";

import { searchIngredients } from "@/services";
import { classNames } from "@/utils";

import styles from "./IngredientAutocomplete.module.scss";

const SEARCH_DELAY = 300;

export default function IngredientAutocomplete({
  id,
  value = "",
  selectedId = "",
  invalid = false,
  disabled = false,
  inputRef,
  onChange,
  onSelect,
  onCreateRequested,
  onBlur,
}) {
    const containerRef = useRef(null);

    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const normalizedValue = value.trim();

        if (
            normalizedValue.length < 2 ||
            selectedId
        ) {
            return;
        }

        let isCancelled = false;

        const timeout = window.setTimeout(() => {
            setIsSearching(true);

            searchIngredients(normalizedValue)
            .then((data) => {
                if (isCancelled) {
                return;
                }

                setResults(data);
                setIsOpen(true);
            })
            .catch((error) => {
                if (isCancelled) {
                return;
                }

                console.error(
                "Unable to search ingredients:",
                error
                );
            })
            .finally(() => {
                if (!isCancelled) {
                setIsSearching(false);
                }
            });
        }, SEARCH_DELAY);

        return () => {
            isCancelled = true;
            window.clearTimeout(timeout);
        };
    }, [value, selectedId]);

    useEffect(() => {
        const handlePointerDown = (event) => {
        if (
            !containerRef.current?.contains(
            event.target
            )
        ) {
            setIsOpen(false);
        }
        };

        document.addEventListener(
        "pointerdown",
        handlePointerDown
        );

        return () => {
        document.removeEventListener(
            "pointerdown",
            handlePointerDown
        );
        };
    }, []);

    const handleInputChange = (event) => {
        const nextValue = event.target.value;

        onChange?.(nextValue);

        if (nextValue.trim().length < 2) {
            setResults([]);
            setIsOpen(false);
            setIsSearching(false);

            return;
        }

        setIsOpen(true);
    };

    const handleSelect = (ingredient) => {
        setResults([]);
        setIsOpen(false);

        onSelect?.(ingredient);
    };

    return (
        <div
            ref={containerRef}
            className={styles.autocomplete}
        >
        <div className={styles.inputWrapper}>
            <FiSearch
                className={styles.searchIcon}
                aria-hidden="true"
            />

            <input
                ref={inputRef}
                id={id}
                type="text"
                value={value}
                autoComplete="off"
                disabled={disabled}
                className={classNames(
                    styles.input,
                    invalid && styles.invalid
                )}
                placeholder="Rechercher un ingrédient..."
                aria-autocomplete="list"
                aria-expanded={isOpen}
                aria-controls={`${id}-results`}
                onChange={handleInputChange}
                onFocus={() => {
                    if (results.length > 0) {
                    setIsOpen(true);
                    }
                }}
                onBlur={onBlur}
            />
        </div>

        {isOpen ? (
            <div
                id={`${id}-results`}
                className={styles.dropdown}
                role="listbox"
            >
            {isSearching ? (
                <p className={styles.state}>
                    Recherche…
                </p>
            ) : results.length > 0 ? (
                results.map((ingredient) => (
                <button
                    key={ingredient.id}
                    type="button"
                    role="option"
                    aria-selected={
                    ingredient.id === selectedId
                    }
                    className={styles.option}
                    onClick={() =>
                    handleSelect(ingredient)
                    }
                >
                    <span>{ingredient.name}</span>

                    {ingredient.id === selectedId ? (
                    <FiCheck aria-hidden="true" />
                    ) : null}
                </button>
                ))
            ) : results.length === 0 &&
            value.trim().length >= 2 ? (
            <div className={styles.empty}>
                <p className={styles.state}>
                Aucun ingrédient trouvé.
                </p>

                {onCreateRequested ? (
                <button
                    type="button"
                    className={styles.createOption}
                    onClick={() =>
                    onCreateRequested(
                        value.trim()
                    )
                    }
                >
                    Créer « {value.trim()} »
                </button>
                ) : null}
            </div>
            ) : null}
            </div>
        ) : null}
        </div>
    );
}