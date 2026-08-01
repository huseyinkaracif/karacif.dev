import React from "react";
import { SITE_URL, LOCALES, OG_LOCALES } from "../i18n/routes";

const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Hüseyin Karacif",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero.jpg`,
  jobTitle: "Solution Expert & Senior Software Developer",
  worksFor: { "@type": "Organization", name: "OBilet" },
  address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
  sameAs: [
    "https://medium.com/@hsynkrcf",
    "https://github.com/huseyinkaracif",
    "https://www.linkedin.com/in/huseyin-karacif",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents",
    "Model Context Protocol",
    "Software Architecture",
    "Web Development",
    ".NET",
    "JavaScript",
  ],
};

export default function Seo({
  lang = "tr",
  title,
  description,
  pathname = "/",
  trPath,
  enPath,
  image,
  article, // { publishedTime, modifiedTime, tags, category, readTime }
  noindex = false,
  children,
}) {
  const url = `${SITE_URL}${pathname}`;
  // Social crawlers don't render SVG previews — fall back to the raster default
  const rasterImage = image && !image.endsWith(".svg") ? image : "/images/og-default.png";
  const ogImage = `${SITE_URL}${rasterImage}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Hüseyin Karacif",
      inLanguage: [LOCALES.tr, LOCALES.en],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    { "@context": "https://schema.org", ...PERSON },
  ];

  if (article) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      image: ogImage,
      url,
      inLanguage: LOCALES[lang],
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: (article.tags || []).join(", "),
      articleSection: article.category,
      timeRequired: article.readTime ? `PT${article.readTime}M` : undefined,
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "tr" ? "Anasayfa" : "Home",
          item: lang === "tr" ? SITE_URL : `${SITE_URL}/en/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: lang === "tr" ? "Yazılar" : "Writing",
          item: lang === "tr" ? `${SITE_URL}/yazilar/` : `${SITE_URL}/en/writing/`,
        },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    });
  }

  return (
    <>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Hüseyin Karacif" />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {trPath && <link rel="alternate" hrefLang="tr" href={`${SITE_URL}${trPath}`} />}
      {enPath && <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />}
      {trPath && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${trPath}`} />}

      <meta property="og:site_name" content="Hüseyin Karacif" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={OG_LOCALES[lang]} />
      {lang === "tr" && enPath && <meta property="og:locale:alternate" content={OG_LOCALES.en} />}
      {lang === "en" && trPath && <meta property="og:locale:alternate" content={OG_LOCALES.tr} />}
      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article && article.category && <meta property="article:section" content={article.category} />}
      {article &&
        (article.tags || []).map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      {children}
    </>
  );
}
