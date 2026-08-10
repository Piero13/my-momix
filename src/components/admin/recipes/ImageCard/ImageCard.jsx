import {
  useRef,
  useState,
} from "react";
import { 
    useFormContext,
    useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiImage,
  FiRefreshCw,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";

import { AppButton } from "@/components/ui";
import {
  deleteRecipeImage,
  getRecipeImageUrl,
  uploadRecipeImage,
} from "@/services";
import { compressRecipeImage } from "@/utils";

import styles from "./ImageCard.module.scss";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 8 * 1024 * 1024;

export default function ImageCard() {
    const inputRef = useRef(null);

    const {
        control,
        setValue,
        getValues,
    } = useFormContext();

    const imagePath = useWatch({
        control,
        name: "imagePath",
    });

    const previewUrl = imagePath
    ? getRecipeImageUrl(imagePath)
    : null;

    const [isProcessing, setIsProcessing] =  useState(false);

    const handleChooseImage = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) {
        return;
        }

        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast.error(
            "Format non pris en charge. Utilisez JPG, PNG ou WebP."
        );
        return;
        }

        if (file.size > MAX_FILE_SIZE) {
        toast.error(
            "L’image ne doit pas dépasser 8 Mo."
        );
        return;
        }

        const previousPath =
        getValues("imagePath");

        try {
        setIsProcessing(true);

        const compressedFile =
            await compressRecipeImage(file);

        const nextPath =
            await uploadRecipeImage(
            compressedFile
            );

        setValue("imagePath", nextPath, {
            shouldDirty: true,
        });

        if (
            previousPath &&
            previousPath !== nextPath
        ) {
            try {
            await deleteRecipeImage(
                previousPath
            );
            } catch (cleanupError) {
            console.error(
                "Unable to delete previous recipe image:",
                cleanupError
            );
            }
        }

        toast.success("Image ajoutée.");
        } catch (error) {
        console.error(
            "Unable to upload recipe image:",
            error
        );

        toast.error(
            "Impossible d’ajouter l’image."
        );
        } finally {
        setIsProcessing(false);
        }
    };

    const handleRemoveImage = async () => {
        const currentPath =
        getValues("imagePath");

        if (!currentPath) {
        return;
        }

        try {
        setIsProcessing(true);

        await deleteRecipeImage(
            currentPath
        );

        setValue("imagePath", "", {
            shouldDirty: true,
        });

        toast.success("Image supprimée.");
        } catch (error) {
        console.error(
            "Unable to delete recipe image:",
            error
        );

        toast.error(
            "Impossible de supprimer l’image."
        );
        } finally {
        setIsProcessing(false);
        }
    };

    return (
        <section
        className={styles.card}
        aria-labelledby="recipe-image-title"
        >
        <header className={styles.header}>
            <div>
            <p className={styles.eyebrow}>
                Visuel
            </p>

            <h2
                id="recipe-image-title"
                className={styles.title}
            >
                Image principale
            </h2>
            </div>
        </header>

        <div className={styles.content}>
            <div className={styles.preview}>
            {previewUrl ? (
                <img
                src={previewUrl}
                alt=""
                className={styles.image}
                />
            ) : (
                <div
                className={styles.placeholder}
                >
                <FiImage aria-hidden="true" />

                <span>
                    Aucune image
                </span>
                </div>
            )}
            </div>

            <div className={styles.actions}>
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={styles.fileInput}
                disabled={isProcessing}
                onChange={handleFileChange}
            />

            <AppButton
                type="button"
                variant={
                previewUrl
                    ? "outline-primary"
                    : "primary"
                }
                icon={
                previewUrl ? (
                    <FiRefreshCw />
                ) : (
                    <FiUploadCloud />
                )
                }
                disabled={isProcessing}
                onClick={handleChooseImage}
            >
                {isProcessing
                ? "Traitement..."
                : previewUrl
                    ? "Remplacer l’image"
                    : "Choisir une image"}
            </AppButton>

            {previewUrl ? (
                <AppButton
                type="button"
                variant="outline-danger"
                icon={<FiTrash2 />}
                disabled={isProcessing}
                onClick={handleRemoveImage}
                >
                Supprimer
                </AppButton>
            ) : null}
            </div>

            <p className={styles.helper}>
            JPG, PNG ou WebP. L’image sera automatiquement
            optimisée avant l’envoi.
            </p>
        </div>
        </section>
    );
}