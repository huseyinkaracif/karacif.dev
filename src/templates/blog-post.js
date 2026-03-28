import React from "react";
import { graphql } from "gatsby";
import { useSite } from "../context/SiteContext";
import { translations } from "../translations";
import Controls from "../components/Controls";

export default function BlogPost({ data }) {
  const { lang } = useSite();
  const t = translations[lang] || translations.tr;

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <div className="bg-background font-body text-on-background antialiased">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(109,94,0,0.08)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-yellow-500 transition-colors font-headline" href="/">
            Karacif.dev
          </a>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/">{t.nav.home}</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/projeler">{t.nav.projects}</a>
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/yazilar">{t.nav.blog}</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-24 md:pb-16 px-6 max-w-3xl mx-auto">
        {/* Back link */}
        <a href="/yazilar" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-background transition-colors font-label font-bold text-sm mb-10 md:mb-14 group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          {t.post.back}
        </a>

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
          <time className="text-on-surface-variant text-sm font-label">
            {new Date(frontmatter.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </header>

        {/* Article Body */}
        <article
          className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-headline prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:text-lg
            prose-li:text-on-surface-variant prose-li:text-lg
            prose-strong:text-on-background prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-outline-variant/20 flex justify-between items-center">
          <a href="/yazilar" className="inline-flex items-center gap-2 font-headline font-bold hover:text-primary transition-colors group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            {t.post.allPosts}
          </a>
          <a href="/" className="font-headline font-bold hover:text-primary transition-colors">
            {t.post.home}
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 pb-24 md:pb-8 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1">
            <span className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</span>
            <p className="text-sm tracking-wide text-zinc-500 dark:text-zinc-400">{t.footer.copy}</p>
          </div>
          <div className="flex gap-6">
            <a className="text-[#0077B5] hover:text-[#005582] flex items-center gap-2 text-sm font-['Inter']" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-2 text-sm font-['Inter']" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-[#EA4335] hover:text-[#C5221F] flex items-center gap-2 text-sm font-['Inter']" href="mailto:karacif.dev@gmail.com">Gmail</a>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center p-4">
        <a className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400" href="/">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.home}</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400" href="/projeler">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.projects}</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/yazilar">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.blog}</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">code</span>
          <span className="text-[10px] font-black uppercase">GitHub</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">work</span>
          <span className="text-[10px] font-black uppercase">LinkedIn</span>
        </a>
      </div>

      <Controls />
    </div>
  );
}

export const Head = ({ data }) => {
  const { frontmatter, excerpt } = data.markdownRemark;
  return (
    <>
      <title>{frontmatter.title} | Hüseyin Karacif</title>
      <meta name="description" content={frontmatter.excerpt || excerpt || "Hüseyin Karacif'ten bir makale."} />
      <meta property="og:title" content={`${frontmatter.title} | Hüseyin Karacif`} />
      <meta property="og:description" content={frontmatter.excerpt || excerpt} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${frontmatter.title} | Hüseyin Karacif`} />
      <meta name="twitter:description" content={frontmatter.excerpt || excerpt} />
    </>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
        excerpt
        readTime
      }
    }
  }
`;
