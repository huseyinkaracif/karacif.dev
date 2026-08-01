import React, { useMemo, useState } from "react";
import { graphql, Link } from "gatsby";
import { translations } from "../translations";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { SITE_URL, LOCALES } from "../i18n/routes";

export default function BlogList({ data, pageContext }) {
  const { lang, altPath } = pageContext;
  const t = translations[lang] || translations.tr;
  const posts = data.allMarkdownRemark.nodes;
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.frontmatter.category).filter(Boolean));
    return [...set];
  }, [posts]);

  const visible = activeCategory
    ? posts.filter((p) => p.frontmatter.category === activeCategory)
    : posts;

  return (
    <Layout lang={lang} active="blog" altPath={altPath}>
      <main className="pt-20 md:pt-24 pb-8 md:pb-0 max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <header className="mb-6 md:mb-10 pt-4 md:pt-6 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold font-label uppercase tracking-widest text-on-surface-variant">{t.blog.pageLabel}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-black tracking-tighter text-on-background leading-tight">
            {t.blog.pageHeadStart} <span className="text-primary">{t.blog.pageHeadHighlight}</span> {t.blog.pageHeadEnd}
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            {t.blog.pageSub}
          </p>

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-6">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-black font-label tracking-widest uppercase transition-all duration-200 ${!activeCategory ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"}`}
              >
                {t.blog.all}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black font-label tracking-widest uppercase transition-all duration-200 ${activeCategory === cat ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Posts Grid */}
        {visible.length > 0 ? (
          <section className="pb-8 md:pb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {visible.map((post, i) => (
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  className="reveal visible group flex flex-col rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container hover:shadow-[0_20px_48px_rgba(109,94,0,0.12)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                    {post.frontmatter.coverImage ? (
                      <img
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        loading={i > 3 ? "lazy" : undefined}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-highest" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-black tracking-[0.18em] uppercase text-primary font-label bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/25">
                      {post.frontmatter.category}
                    </span>
                    <span className="absolute top-3 right-4 text-white/60 font-headline font-black text-lg select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-black font-headline leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 flex-grow">
                      {post.frontmatter.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/10">
                      <span className="text-on-surface-variant text-xs font-label">
                        {new Date(post.frontmatter.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric" })}
                        {post.frontmatter.readTime && ` · ${post.frontmatter.readTime} ${t.blog.min}`}
                      </span>
                      <div className="flex items-center gap-1 text-primary text-xs font-bold font-headline uppercase tracking-wider">
                        {t.blog.read} <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">edit_note</span>
            <p className="text-lg font-headline font-bold">{t.blog.empty}</p>
          </div>
        )}
      </main>
    </Layout>
  );
}

export const Head = ({ data, pageContext }) => {
  const { lang, trPath, enPath } = pageContext;
  const title = lang === "tr" ? "Yazılar | Hüseyin Karacif" : "Writing | Hüseyin Karacif";
  const description = lang === "tr"
    ? "Yapay zeka, yazılım mimarisi ve modern mühendislik pratikleri üzerine makaleler. MCP, AI agent'lar, SOLID prensipleri ve daha fazlası."
    : "Articles on AI, software architecture and modern engineering practice. MCP, AI agents, SOLID principles and more.";
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: title,
    url: `${SITE_URL}${lang === "tr" ? trPath : enPath}`,
    inLanguage: LOCALES[lang],
    author: { "@id": `${SITE_URL}/#person` },
    blogPost: data.allMarkdownRemark.nodes.slice(0, 30).map((p) => ({
      "@type": "BlogPosting",
      headline: p.frontmatter.title,
      url: `${SITE_URL}${p.fields.slug}`,
      datePublished: p.frontmatter.date,
    })),
  };
  return (
    <Seo
      lang={lang}
      title={title}
      description={description}
      pathname={lang === "tr" ? trPath : enPath}
      trPath={trPath}
      enPath={enPath}
    >
      <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
    </Seo>
  );
};

export const query = graphql`
  query BlogListQuery($lang: String!) {
    allMarkdownRemark(
      filter: { fields: { lang: { eq: $lang } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
          category
          excerpt
          readTime
          coverImage
        }
      }
    }
  }
`;
