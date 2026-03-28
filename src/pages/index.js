import React, { useEffect, useRef } from "react";
import { graphql } from "gatsby";

export default function Home({ data }) {
  const latestPosts = data.allMarkdownRemark.nodes;
  const featuredProjects = data.allProjectsJson.nodes.filter((p) => p.featured);

  const projectsRef = useRef(null);
  const writingRef = useRef(null);

  const scrollCarousel = (ref, dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.offsetWidth * 0.82), behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant/15">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest font-label uppercase">Lokasyon: İstanbul, Türkiye</span>
            </div>
            <h1 className="hero-title text-4xl md:text-6xl font-black font-headline tracking-tighter leading-[0.9] text-on-background">
              Hüseyin Karacif <span className="text-primary italic">Kıdemli Yazılım Geliştirici.</span>
            </h1>
            <p className="hero-subtitle text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Hassasiyet, performans ve amaca uygun yüksek kaliteli dijital ürünler geliştiriyorum. Sadece çalışan değil, mükemmelliği sunan deneyimler üretiyorum.
            </p>
            <div className="hero-cta flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="/projects" className="bg-primary-container text-on-primary-container px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-headline font-extrabold shadow-[0_20px_40px_rgba(109,94,0,0.15)] hover:shadow-[0_28px_56px_rgba(109,94,0,0.28)] hover:scale-[1.03] active:scale-95 transition-all duration-200 inline-block">
                Çalışmalarımı İncele
              </a>
            </div>
          </div>
          <div className="hero-photo md:col-span-5 relative mt-4 md:mt-0">
            <div className="photo-float aspect-[4/5] rounded-xl overflow-hidden bg-primary shadow-2xl">
              <img alt="Professional Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 mix-blend-multiply opacity-90 contrast-125 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrOdEuc_6J0ImQ9cEjrmHswhd182_Fl1EywXcMk4bPd7nTuUo0dHXA4GE11QleXoXqBxVyAavcWhIGFJ_jcxXDwUkJS5vYZHR228uJCuNsFtNJ6zV0Avc6NR9u-7nJrgD4tEdjJo9m672iFGpvz0sLpgJx0xHRtnUG3nCM8jRtCEXlmuTUfjcp61OxqCA5SkyV2gsLy0mdM0Ta8QaUHmquuqD6rWUezX2KPB_h7MvafIontphvBrdj2644j2guoGoMl3tmYcpkbBQ" />
            </div>
            <div className="hero-exp absolute -bottom-6 -left-6 bg-surface-bright p-5 md:p-6 rounded-xl shadow-xl -rotate-2 border border-outline-variant/10">
              <p className="font-headline font-black text-xl md:text-2xl leading-none">10+ Yıl</p>
              <p className="text-sm font-bold text-on-surface-variant tracking-wider uppercase mt-1">Deneyim</p>
            </div>
          </div>
        </section>

        {/* About / Skills */}
        <section className="bg-surface-container-low py-14 md:py-24" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="md:w-1/3 reveal">
                <h2 className="text-3xl font-black font-headline tracking-tight uppercase md:sticky md:top-32">Karakter</h2>
              </div>
              <div className="md:w-2/3 space-y-8 md:space-y-12">
                <p className="reveal text-xl md:text-2xl font-headline leading-tight text-on-background">
                  Durağanlığı reddediyorum. Çalışmalarım sürekli öğrenmenin <span className="bg-primary-container px-2">kinetik enerjisinden</span> ilham alıyor—her zaman gelişiyor, her zaman üretiyor, asla "yeterince iyi" çözümlerle yetinmiyorum.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="reveal reveal-d1 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl text-primary mb-3" data-icon="groups">groups</span>
                    <h3 className="text-base font-bold font-headline mb-2">Mühendislik Yönetimi</h3>
                    <p className="text-on-surface-variant text-sm">Ekiplerin karmaşık zorlukları aşan mühendislik projelerini hayata geçirmesine yardımcı oluyorum.</p>
                  </div>
                  <div className="reveal reveal-d2 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl text-primary mb-3" data-icon="code">code</span>
                    <h3 className="text-base font-bold font-headline mb-2">Yazılım Geliştirme</h3>
                    <p className="text-on-surface-variant text-sm">İddialı hedefleri ölçeklenebilir çözümlere dönüştüren web uygulamaları tasarlıyor ve geliştiriyorum.</p>
                  </div>
                  <div className="reveal reveal-d3 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl text-primary mb-3" data-icon="autorenew">autorenew</span>
                    <h3 className="text-base font-bold font-headline mb-2">Süreç Otomasyonu</h3>
                    <p className="text-on-surface-variant text-sm">Ekiplerin temel işlerine ve stratejik hedeflerine odaklanmasını sağlayan otomasyon araçları uyguluyorum.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects Carousel ─────────────────────────────── */}
        <section className="py-14 md:py-24 overflow-hidden" id="projects">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-8 md:mb-10 reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter">Projeler</h2>
              <p className="text-on-surface-variant mt-1 text-sm">Seçilmiş dijital ürünler.</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <a className="hidden md:flex font-headline font-bold items-center gap-1.5 group text-sm" href="/projects">
                Tümünü Gör <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(projectsRef, -1)}
                  className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
                  aria-label="Önceki"
                >
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button
                  onClick={() => scrollCarousel(projectsRef, 1)}
                  className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
                  aria-label="Sonraki"
                >
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Track */}
          <div
            ref={projectsRef}
            className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6"
          >
            {featuredProjects.filter(p => p.image).map((project, i) => (
              <a
                key={project.id}
                href={project.link || "/projects"}
                className="group snap-start shrink-0 w-[82vw] md:w-[42vw] lg:w-[36vw] max-w-[600px] cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface-container mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Number */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-black font-headline text-zinc-900">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {/* Hover CTA */}
                  <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-full text-xs font-black font-label tracking-wider uppercase translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    İncele <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </div>
                </div>
                {/* Meta */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex gap-2 mb-1.5">
                      <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{project.category}</span>
                      <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{project.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black font-headline tracking-tight group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="w-9 h-9 shrink-0 rounded-full border-2 border-outline-variant/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary-container transition-all duration-300 mt-1">
                    <span className="material-symbols-outlined text-base group-hover:text-on-primary-container transition-colors duration-200">north_east</span>
                  </div>
                </div>
              </a>
            ))}
            {/* "View All" card */}
            <a
              href="/projects"
              className="snap-start shrink-0 w-[60vw] md:w-[22vw] lg:w-[18vw] max-w-[280px] cursor-pointer group"
            >
              <div className="h-full min-h-[200px] rounded-2xl bg-surface-container border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center gap-3 group-hover:bg-primary-container group-hover:border-transparent transition-all duration-300 p-6 aspect-[4/3]">
                <div className="w-12 h-12 rounded-full bg-surface-container-high group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl text-primary">grid_view</span>
                </div>
                <div className="text-center">
                  <p className="font-headline font-black text-sm">Tüm Projeler</p>
                  <p className="text-on-surface-variant text-xs mt-0.5 group-hover:text-on-primary-container transition-colors duration-300">{featuredProjects.length}+ çalışma</p>
                </div>
              </div>
            </a>
          </div>

          {/* Mobile "View All" */}
          <div className="md:hidden px-6 mt-6">
            <a href="/projects" className="flex items-center justify-center gap-2 w-full py-3 border border-outline-variant/30 rounded-xl font-headline font-bold text-sm hover:bg-surface-container transition-colors">
              Tüm Projeleri Gör <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </section>

        {/* ── Writing Carousel ──────────────────────────────── */}
        <section className="bg-on-background py-14 md:py-24 overflow-hidden" id="writing">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-8 md:mb-10 reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter text-primary">Son Yazılar</h2>
              <p className="text-zinc-500 mt-1 text-sm">Notlar, fikirler ve derin okumalar.</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <a className="hidden md:flex font-headline font-bold items-center gap-1.5 group text-sm text-zinc-400 hover:text-primary transition-colors duration-200" href="/blog">
                Tüm Yazılar <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(writingRef, -1)}
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-primary-container hover:text-on-primary-container text-zinc-300 flex items-center justify-center transition-all duration-200 active:scale-90"
                  aria-label="Önceki"
                >
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button
                  onClick={() => scrollCarousel(writingRef, 1)}
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-primary-container hover:text-on-primary-container text-zinc-300 flex items-center justify-center transition-all duration-200 active:scale-90"
                  aria-label="Sonraki"
                >
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Track */}
          <div
            ref={writingRef}
            className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6"
          >
            {latestPosts.map((post, i) => (
              <a
                key={post.fields.slug}
                href={post.fields.slug}
                className="group snap-start shrink-0 w-[82vw] md:w-[38vw] lg:w-[30vw] max-w-[520px] bg-zinc-900 border border-zinc-800 hover:border-primary/40 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary font-label bg-primary/10 px-3 py-1 rounded-full">
                    {post.frontmatter.category}
                  </span>
                  <span className="text-zinc-600 font-headline font-black text-2xl select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-black font-headline text-white leading-tight mb-3 group-hover:text-primary transition-colors duration-200 flex-grow">
                  {post.frontmatter.title}
                </h3>

                {/* Excerpt */}
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.frontmatter.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                  <span className="text-zinc-600 text-xs font-label">
                    {new Date(post.frontmatter.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <div className="flex items-center gap-1.5 text-primary text-xs font-bold font-headline uppercase tracking-wider">
                    Oku
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                  </div>
                </div>
              </a>
            ))}

            {/* "View All" card */}
            <a
              href="/blog"
              className="snap-start shrink-0 w-[60vw] md:w-[20vw] lg:w-[16vw] max-w-[240px] group cursor-pointer"
            >
              <div className="h-full min-h-[200px] rounded-2xl border-2 border-dashed border-zinc-700 group-hover:border-primary/50 group-hover:bg-zinc-900/60 flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl text-primary">edit_note</span>
                </div>
                <div className="text-center">
                  <p className="font-headline font-black text-sm text-white">Tüm Yazılar</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{latestPosts.length}+ makale</p>
                </div>
              </div>
            </a>
          </div>

          {/* Mobile "View All" */}
          <div className="md:hidden px-6 mt-6">
            <a href="/blog" className="flex items-center justify-center gap-2 w-full py-3 border border-zinc-700 rounded-xl font-headline font-bold text-sm text-white hover:border-primary/50 transition-colors">
              Tüm Yazıları Gör <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
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
