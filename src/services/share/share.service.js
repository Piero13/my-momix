/**
 * Shares a recipe using the Web Share API when available.
 * Falls back to copying the URL into the clipboard.
 */

export async function shareContent({
  title,
  text,
  url,
}) {
  const shareData = {
    title,
    text,
    url,
  };

  if (
    navigator.share &&
    navigator.canShare?.(shareData)
  ) {
    try {
      await navigator.share(shareData);

      return {
        status: "shared",
      };
    } catch (error) {
      if (error?.name === "AbortError") {
        return {
          status: "cancelled",
        };
      }
    }
  }

  try {
    await navigator.clipboard.writeText(url);

    return {
      status: "copied",
    };
  } catch {
    return {
      status: "error",
    };
  }
}