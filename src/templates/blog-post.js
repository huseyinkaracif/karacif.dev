import React from "react";
import { graphql, Link } from "gatsby";
import { translations } from "../translations";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { SITE_URL } from "../i18n/routes";

export default function BlogPost({ data, pageContext }) {
  const { lang, altPath } = pageContext;
  const t = translations[lang] || translations.tr;
  const { frontmatter, html, fields } = data.markdownRemark;
  const all = data.allPosts.nodes;

  const idx = all.findIndex((p) => p.fields.slug === fields.slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;
  const related = all
    .filter((p) => p.fields.slug !== fields.slug && p.frontmatter.category === frontmatter.category)
    .slice(0, 2);

  const shareUrl = `${SITE_URL}${fields.slug}`;
  const shareText = encodeURIComponent(frontmatter.title);

  return (
    <Layout lang={lang} active="blog" altPath={altPath} showProgress>
      <main className="pt-24 pb-24 md:pb-16 px-6 max-w-3xl mx-auto w-full">
        {/* Back link */}
        <Link to={lang === "tr" ? "/yazilar/" : "/en/writing/"} className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-background transition-colors font-label font-bold text-sm mb-10 md:mb-14 group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          {t.post.back}
        </Link>

        {/* Article Header */}
        <header className="mb-10 md:mb-14">
          <div className="flex gap-3 flex-wrap mb-5">
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-black font-label tracking-widest uppercase">
              {frontmatter.category}
            </span>
            <span className="text-on-surface-variant text-xs font-medium font-label self-center">{frontmatter.readTime} {t.post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tight leading-tight text-on-background mb-5">
            {frontmatter.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <time dateTime={frontmatter.date} className="text-on-surface-variant text-sm font-label">
              {new Date(frontmatter.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            {frontmatter.mediumUrl && (
              <a
                href={frontmatter.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold font-label text-on-surface-variant hover:text-on-background border border-outline-variant/30 hover:border-primary/50 rounded-full px-3 py-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM21 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42C19.49 5.58 21 8.46 21 12zm3 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                {t.post.onMedium}
              </a>
            )}
          </div>
        </header>

        {/* Article Body */}
        <article
          className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-headline prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:text-lg
            prose-li:text-on-surface-variant prose-li:text-lg
            prose-strong:text-on-background prose-strong:font-bold
            prose-img:rounded-xl prose-img:shadow-lg
            prose-a:text-primary prose-a:decoration-primary/40 hover:prose-a:decoration-primary
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-bold font-label tracking-wider uppercase bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mt-10 pt-8 border-t border-outline-variant/20 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold font-headline text-on-surface-variant">{t.post.share}</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
            className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <button
            onClick={() => navigator.clipboard && navigator.clipboard.writeText(shareUrl)}
            aria-label={t.post.copyLink}
            className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            <span className="material-symbols-outlined text-base">link</span>
          </button>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link to={prev.fields.slug} className="group p-5 rounded-2xl border border-outline-variant/15 hover:border-primary/40 bg-surface-container transition-all duration-300 hover:-translate-y-0.5">
                <span className="text-[10px] font-black font-label tracking-widest uppercase text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span> {t.post.prev}
                </span>
                <p className="mt-2 font-headline font-bold leading-snug group-hover:text-primary transition-colors">{prev.frontmatter.title}</p>
              </Link>
            ) : <div />}
            {next && (
              <Link to={next.fields.slug} className="group p-5 rounded-2xl border border-outline-variant/15 hover:border-primary/40 bg-surface-container transition-all duration-300 hover:-translate-y-0.5 md:text-right">
                <span className="text-[10px] font-black font-label tracking-widest uppercase text-on-surface-variant flex items-center gap-1 md:justify-end">
                  {t.post.next} <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
                <p className="mt-2 font-headline font-bold leading-snug group-hover:text-primary transition-colors">{next.frontmatter.title}</p>
              </Link>
            )}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-black font-headline tracking-tight mb-5">{t.post.related}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link key={p.fields.slug} to={p.fields.slug} className="group flex gap-4 items-center p-4 rounded-2xl border border-outline-variant/15 hover:border-primary/40 bg-surface-container transition-all duration-300 hover:-translate-y-0.5">
                  {p.frontmatter.coverImage && (
                    <img src={p.frontmatter.coverImage} alt={p.frontmatter.title} loading="lazy" className="w-20 h-14 object-cover rounded-lg shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
                  )}
                  <div>
                    <p className="font-headline font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">{p.frontmatter.title}</p>
                    <span className="text-on-surface-variant text-xs font-label">{p.frontmatter.readTime} {t.blog.min}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}

export const Head = ({ data, pageContext }) => {
  const { lang, trPath, enPath } = pageContext;
  const { frontmatter, fields, excerpt } = data.markdownRemark;
  return (
    <Seo
      lang={lang}
      title={`${frontmatter.title} | Hüseyin Karacif`}
      description={frontmatter.excerpt || excerpt}
      pathname={fields.slug}
      trPath={trPath}
      enPath={enPath}
      image={frontmatter.coverImage}
      article={{
        publishedTime: frontmatter.date,
        tags: frontmatter.tags || [],
        category: frontmatter.category,
        readTime: frontmatter.readTime,
      }}
    />
  );
};

export const query = graphql`
  query BlogPostQuery($postSlug: String!, $lang: String!) {
    markdownRemark(
      fields: { postSlug: { eq: $postSlug }, lang: { eq: $lang } }
    ) {
      html
      excerpt(pruneLength: 160)
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
        mediumUrl
        tags
      }
    }
    allPosts: allMarkdownRemark(
      filter: { fields: { lang: { eq: $lang } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          category
          readTime
          coverImage
        }
      }
    }
  }
`;
