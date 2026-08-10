import imageCompression from "browser-image-compression";

const RECIPE_IMAGE_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
  fileType: "image/webp",
};

export async function compressRecipeImage(file) {
  return imageCompression(
    file,
    RECIPE_IMAGE_OPTIONS
  );
}