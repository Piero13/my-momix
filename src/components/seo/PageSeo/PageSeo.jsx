import { Helmet } from "react-helmet-async";

export default function PageSeo({
  title,
  description,
  image,
  url,
  canonicalUrl,
  type = "website",
  structuredData = null,
}) {
  const resolvedCanonical =
    canonicalUrl || url || null;

  return (
    <Helmet>
      {title ? (
        <>
          <title>{title}</title>

          <meta
            property="og:title"
            content={title}
          />
        </>
      ) : null}

      {description ? (
        <>
          <meta
            name="description"
            content={description}
          />

          <meta
            property="og:description"
            content={description}
          />
        </>
      ) : null}

      <meta
        property="og:type"
        content={type}
      />

      {image ? (
        <meta
          property="og:image"
          content={image}
        />
      ) : null}

      {url ? (
        <meta
          property="og:url"
          content={url}
        />
      ) : null}

      {resolvedCanonical ? (
        <link
          rel="canonical"
          href={resolvedCanonical}
        />
      ) : null}

      {structuredData ? (
        <script
          type="application/ld+json"
        >
          {JSON.stringify(
            structuredData
          )}
        </script>
      ) : null}
    </Helmet>
  );
}