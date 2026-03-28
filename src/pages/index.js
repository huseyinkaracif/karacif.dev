import React from "react";
import { graphql } from "gatsby";

export default function Home({ data }) {
  const latestPosts = data.allMarkdownRemark.nodes;
  const featuredProjects = data.allProjectsJson.nodes.filter((p) => p.featured);

  return (
    <div className="bg-background font-body text-on-background antialiased">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(109,94,0,0.08)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-yellow-500 transition-colors font-headline" href="/">
            Karacif.dev
          </a>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/">Anasayfa</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/projects">Projeler</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/blog">Yazılar</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-24 pb-24 md:pb-0">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-8 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-5 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant/15">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest font-label uppercase">Lokasyon: İstanbul, Türkiye</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] text-on-background">
              Hüseyin Karacif <span className="text-primary italic">Kıdemli Yazılım Geliştirici.</span>
            </h1>
            <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
              Hassasiyet, performans ve amaca uygun yüksek kaliteli dijital ürünler geliştiriyorum. Sadece çalışan değil, mükemmelliği sunan deneyimler üretiyorum.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="/projects" className="bg-primary-container text-on-primary-container px-8 py-4 md:px-10 md:py-5 rounded-xl text-lg md:text-xl font-headline font-extrabold shadow-[0_20px_40px_rgba(109,94,0,0.15)] active:scale-95 transition-all inline-block">
                Çalışmalarımı İncele
              </a>
            </div>
          </div>
          <div className="md:col-span-5 relative mt-4 md:mt-0">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-primary shadow-2xl rotate-3 translate-x-4">
              <img alt="Professional Portrait" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrOdEuc_6J0ImQ9cEjrmHswhd182_Fl1EywXcMk4bPd7nTuUo0dHXA4GE11QleXoXqBxVyAavcWhIGFJ_jcxXDwUkJS5vYZHR228uJCuNsFtNJ6zV0Avc6NR9u-7nJrgD4tEdjJo9m672iFGpvz0sLpgJx0xHRtnUG3nCM8jRtCEXlmuTUfjcp61OxqCA5SkyV2gsLy0mdM0Ta8QaUHmquuqD6rWUezX2KPB_h7MvafIontphvBrdj2644j2guoGoMl3tmYcpkbBQ" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-surface-bright p-5 md:p-6 rounded-xl shadow-xl -rotate-2 border border-outline-variant/10">
              <p className="font-headline font-black text-2xl md:text-3xl leading-none">10+ Yıl</p>
              <p className="text-sm font-bold text-on-surface-variant tracking-wider uppercase mt-1">Deneyim</p>
            </div>
          </div>
        </section>

        {/* About / Skills */}
        <section className="bg-surface-container-low py-14 md:py-24" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="md:w-1/3">
                <h2 className="text-4xl font-black font-headline tracking-tight uppercase md:sticky md:top-32">Karakter</h2>
              </div>
              <div className="md:w-2/3 space-y-8 md:space-y-12">
                <p className="text-2xl md:text-3xl font-headline leading-tight text-on-background">
                  Durağanlığı reddediyorum. Çalışmalarım sürekli öğrenmenin <span className="bg-primary-container px-2">kinetik enerjisinden</span> ilham alıyor—her zaman gelişiyor, her zaman üretiyor, asla "yeterince iyi" çözümlerle yetinmiyorum.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4" data-icon="strategy">strategy</span>
                    <h3 className="text-xl font-bold font-headline mb-2">Mimari</h3>
                    <p className="text-on-surface-variant">Ölçeklenebilen sistem tasarımı ve yazılım mimarisi. Sadece özellikleri teslim eden değil, kalıcı olan temeller inşa etmek.</p>
                  </div>
                  <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4" data-icon="brush">brush</span>
                    <h3 className="text-xl font-bold font-headline mb-2">Zanaat</h3>
                    <p className="text-on-surface-variant">Temiz kod, özenle düşünülmüş API'ler ve göründüğü kadar iyi performans gösteren arayüzler.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Projects Teaser */}
        <section className="max-w-7xl mx-auto px-6 py-14 md:py-24" id="projects">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">Quick Projects</h2>
              <p className="text-on-surface-variant mt-2">Recent snapshots of curated impact.</p>
            </div>
            <a className="font-headline font-bold flex items-center gap-2 group" href="/projects">
              View All <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {featuredProjects.slice(0, 3).map((project, index) => {
              if (project.colSpan === 12) {
                return (
                  <div key={project.id} className="md:col-span-12 group cursor-pointer">
                    <div className="bg-surface-container p-8 md:p-12 rounded-xl flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between group-hover:bg-primary-container transition-colors">
                      <div className="max-w-md">
                        <h3 className="text-3xl font-black font-headline mb-3 md:mb-4">{project.title}</h3>
                        <p className="text-on-surface-variant group-hover:text-on-primary-container">{project.description}</p>
                      </div>
                      <span className="material-symbols-outlined text-6xl group-hover:rotate-45 transition-transform">travel_explore</span>
                    </div>
                  </div>
                );
              }
              const isWide = project.colSpan >= 7;
              return (
                <div key={project.id} className={`${isWide ? "md:col-span-8" : "md:col-span-4"} group cursor-pointer`}>
                  <div className={`relative overflow-hidden rounded-xl ${isWide ? "aspect-video" : "h-full min-h-[240px] md:min-h-[300px]"} ${!project.image ? "bg-primary" : "bg-zinc-200"}`}>
                    {project.image && (
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={project.image}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold font-headline">{project.title}</h3>
                        <p className="text-zinc-300">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Writing / Latest Thoughts */}
        <section className="bg-on-background text-surface py-14 md:py-24" id="writing">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-3 md:gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary">Latest Thoughts</h2>
                <p className="text-zinc-400 mt-2">Notes from the road and the design studio.</p>
              </div>
              <a className="font-headline font-bold flex items-center gap-2 group text-primary" href="/blog">
                Read Journal <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {latestPosts.slice(0, 3).map((post) => (
                <a key={post.fields.slug} className="group relative flex flex-col h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transition-all hover:border-primary/50" href={post.fields.slug}>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="mb-3 text-zinc-500 text-xs font-bold font-label uppercase tracking-widest">
                      {new Date(post.frontmatter.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-primary text-on-primary text-[10px] font-black tracking-widest uppercase font-label rounded-full">{post.frontmatter.category}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black font-headline text-white mb-3 leading-tight group-hover:text-primary transition-colors">{post.frontmatter.title}</h3>
                    <p className="text-zinc-400 font-body text-sm line-clamp-3 mb-6">{post.frontmatter.excerpt}</p>
                    <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                      Read Post <span className="material-symbols-outlined text-sm">north_east</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 md:py-12 px-6 pb-24 md:pb-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</span>
            <p className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2026 Hüseyin Karacif. Senior Software Developer.</p>
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
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center p-4">
        <a className="flex flex-col items-center gap-1 text-zinc-900 border-b-4 border-yellow-400 pb-1" href="/">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-black uppercase">Anasayfa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/projects">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-black uppercase">Projeler</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/blog">
          <span className="material-symbols-outlined">edit_note</span>
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
  query HomePageQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 3) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
          category
          excerpt
        }
      }
    }
    allProjectsJson(filter: { featured: { eq: true } }) {
      nodes {
        id
        title
        category
        year
        description
        image
        featured
        colSpan
        link
      }
    }
  }
`;
