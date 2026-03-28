import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { useSite } from "../context/SiteContext";
import { translations } from "../translations";
import Controls from "../components/Controls";

export default function Blog({ data }) {
  const { lang } = useSite();
  const t = translations[lang] || translations.tr;
  const posts = data.allMarkdownRemark.nodes;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen flex flex-col">
      {/* Top Navigation */}
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

      <main className="flex-grow pt-20 md:pt-28 pb-8 md:pb-0 max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <header className="mb-10 md:mb-14 pt-6 md:pt-8 reveal">
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
        </header>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <section className="pb-12 md:pb-20">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {posts.map((post, i) => (
                <a
                  key={post.fields.slug}
                  href={post.fields.slug}
                  className="reveal group flex flex-col rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container hover:shadow-[0_20px_48px_rgba(109,94,0,0.12)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                    {post.frontmatter.coverImage ? (
                      <img
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-highest" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-black tracking-[0.18em] uppercase text-primary font-label bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/25">
                      {lang === "en" ? (post.frontmatter.category_en || post.frontmatter.category) : post.frontmatter.category}
                    </span>
                    {/* Number */}
                    <span className="absolute top-3 right-4 text-white/60 font-headline font-black text-lg select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-black font-headline leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                      {lang === "en" ? (post.frontmatter.title_en || post.frontmatter.title) : post.frontmatter.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 flex-grow">
                      {lang === "en" ? (post.frontmatter.excerpt_en || post.frontmatter.excerpt) : post.frontmatter.excerpt}
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
                </a>
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

      {/* Footer */}
      <footer className="w-full pt-4 md:pt-6 px-6 pb-32 md:pb-8 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</div>
            <div className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">{t.footer.copy}</div>
          </div>
          <div className="flex gap-8">
            <a className="text-[#0077B5] hover:text-[#005582] flex items-center gap-2 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a className="text-[#333] dark:text-white hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-2 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a className="text-[#EA4335] hover:text-[#C5221F] flex items-center gap-2 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="mailto:karacif.dev@gmail.com">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              Gmail
            </a>
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

export const Head = () => (
  <>
    <title>Yazılar | Hüseyin Karacif</title>
    <meta name="description" content="Yazılım zanaatkarlığı, yapay zeka ve modern mühendislik pratiklerinin kesişimini keşfedin. Hüseyin Karacif'ten son düşünceler ve notlar." />
    <meta name="keywords" content="Blog, Yazılım, Yapay Zeka, AI, Mühendislik, Teknoloji, Makaleler" />
    <meta property="og:title" content="Yazılar | Hüseyin Karacif" />
    <meta property="og:description" content="Yazılım zanaatkarlığı, yapay zeka ve modern mühendislik pratiklerinin kesişimini keşfedin." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Yazılar | Hüseyin Karacif" />
    <meta name="twitter:description" content="Yazılım zanaatkarlığı, yapay zeka ve modern mühendislik pratiklerinin kesişimini keşfedin." />
  </>
);

export const query = graphql`
  query BlogListQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          title_en
          date
          category
          category_en
          excerpt
          excerpt_en
          readTime
          coverImage
        }
      }
    }
  }
`;
