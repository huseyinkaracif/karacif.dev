import React from "react";
import { graphql } from "gatsby";

export default function Blog({ data }) {
  const posts = data.allMarkdownRemark.nodes;
  const featured = posts[0];
  const sidebarPost = posts[1];
  const carouselPosts = posts.slice(2);

  return (
    <div className="bg-background text-on-background font-body antialiased">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(109,94,0,0.08)] dark:shadow-none">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-yellow-500 transition-colors font-headline" href="/">
            Karacif.dev
          </a>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/">Anasayfa</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/projects">Projeler</a>
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/blog">Yazılar</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://linkedin.com/in/huseyinkaracif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-28 pb-24 md:pb-16 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold font-label uppercase tracking-widest text-on-surface-variant">Son Düşünceler</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter text-on-background leading-tight">
            Özenle Seçilmiş <span className="text-primary">İçgörüler</span> ve Notlar.
          </h1>
          <p className="mt-5 md:mt-8 text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Yazılım zanaatkarlığı, yapay zeka ve modern mühendislik pratiklerinin kesişimini keşfedin.
          </p>
        </header>

        {/* Bento Layout for Blog Posts */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Featured Post */}
            {featured && (
              <article className="md:col-span-8 group cursor-pointer">
                <a href={featured.fields.slug} className="block relative overflow-hidden rounded-xl bg-surface-container-low p-6 md:p-8 h-full flex flex-col justify-end min-h-[360px] md:min-h-[500px] transition-all hover:shadow-[0_32px_64px_rgba(109,94,0,0.12)]">
                  <div className="relative z-10">
                    <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                      <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-md text-xs font-bold font-label">{featured.frontmatter.category.toUpperCase()}</span>
                      <span className="text-on-surface-variant text-xs font-medium font-label self-center">{featured.frontmatter.readTime} Dk Okuma</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tight text-on-background group-hover:text-primary transition-colors">
                      {featured.frontmatter.title}
                    </h2>
                    <p className="mt-3 md:mt-4 text-on-surface-variant text-base md:text-lg max-w-xl">
                      {featured.frontmatter.excerpt}
                    </p>
                  </div>
                </a>
              </article>
            )}

            {/* Sidebar Post */}
            {sidebarPost && (
              <article className="md:col-span-4 group cursor-pointer">
                <a href={sidebarPost.fields.slug} className="block bg-surface-container-highest rounded-xl p-6 md:p-8 h-full flex flex-col transition-all hover:bg-primary-container/20">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-on-primary-container text-3xl">architecture</span>
                  </div>
                  <span className="text-primary font-bold font-label text-xs tracking-widest uppercase mb-2">{sidebarPost.frontmatter.category}</span>
                  <h2 className="text-2xl font-headline font-extrabold tracking-tight text-on-background mb-3 md:mb-4">
                    {sidebarPost.frontmatter.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {sidebarPost.frontmatter.excerpt}
                  </p>
                  <div className="mt-auto flex items-center text-primary font-bold text-sm">
                    Yazıyı Oku <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </div>
                </a>
              </article>
            )}

            {/* Recent Stories Carousel Section */}
            {carouselPosts.length > 0 && (
              <div className="md:col-span-12 mt-6 md:mt-12">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h3 className="text-2xl font-headline font-black tracking-tight">
                    Recent Stories
                  </h3>
                </div>
                <div className="flex gap-5 md:gap-8 overflow-x-auto pb-6 md:pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
                  {carouselPosts.map((post) => (
                    <article key={post.fields.slug} className="min-w-[280px] md:min-w-[480px] snap-start group cursor-pointer">
                      <a href={post.fields.slug} className="block relative h-[320px] md:h-[400px] rounded-xl overflow-hidden bg-surface-container-low p-6 md:p-8 flex flex-col justify-end transition-all hover:shadow-[0_24px_48px_rgba(109,94,0,0.1)]">
                        <div className="relative z-10">
                          <div className="flex gap-3 md:gap-4 mb-3">
                            <span className="text-primary font-bold font-label text-[10px] tracking-widest uppercase">{post.frontmatter.category}</span>
                            <span className="text-on-surface-variant text-[10px] font-medium font-label">
                              {new Date(post.frontmatter.date).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
                            </span>
                          </div>
                          <h4 className="text-2xl md:text-3xl font-headline font-black tracking-tight text-on-background group-hover:text-primary transition-colors mb-3 md:mb-4">{post.frontmatter.title}</h4>
                          <p className="text-on-surface-variant line-clamp-2">{post.frontmatter.excerpt}</p>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-24 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 block">edit_note</span>
            <p className="text-xl font-headline font-bold">Henüz yazı yok. Yakında!</p>
          </div>
        )}
      </main>

      {/* Footer Shell */}
      <footer className="w-full py-8 md:py-12 px-6 pb-24 md:pb-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</div>
            <div className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2026 Hüseyin Karacif. Senior Software Developer.</div>
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

      {/* Nomad Badge — desktop only */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 bg-white/70 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-[0_8px_32px_rgba(109,94,0,0.12)] border border-white/20 items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-xs font-bold font-label text-on-background">Şu anda İstanbul'da</span>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center p-4">
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-black uppercase">Anasayfa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/projects">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-black uppercase">Projeler</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-900 border-b-4 border-yellow-400 pb-1" href="/blog">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
          <span className="text-[10px] font-black uppercase">Yazılar</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">code</span>
          <span className="text-[10px] font-black uppercase">GitHub</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">work</span>
          <span className="text-[10px] font-black uppercase">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export const query = graphql`
  query BlogListQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
        }
      }
    }
  }
`;
