import React, { useEffect, useRef } from "react";
import { graphql } from "gatsby";
import { useSite } from "../context/SiteContext";
import { translations } from "../translations";
import Controls from "../components/Controls";

export default function Home({ data }) {
  const { lang } = useSite();
  const t = translations[lang] || translations.tr;
  const latestPosts = data.allMarkdownRemark.nodes;
  const featuredProjects = data.allProjectsJson.nodes.filter((p) => p.featured);

  const projectsRef = useRef(null);
  const writingRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const didDrag = useRef(false);

  const scrollCarousel = (ref, dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.offsetWidth * 0.82), behavior: "smooth" });
  };

  const dragStart = (ref) => (e) => {
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.pageX - ref.current.getBoundingClientRect().left;
    dragScrollLeft.current = ref.current.scrollLeft;
  };
  const dragMove = (ref) => (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.getBoundingClientRect().left;
    const walk = (x - dragStartX.current) * 1.4;
    if (Math.abs(walk) > 4) didDrag.current = true;
    ref.current.scrollLeft = dragScrollLeft.current - walk;
  };
  const dragEnd = () => { isDragging.current = false; };
  const blockIfDrag = (e) => { if (didDrag.current) e.preventDefault(); };

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
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/">{t.nav.home}</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/projeler">{t.nav.projects}</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/yazilar">{t.nav.blog}</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-24 pb-24 md:pb-0">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-8 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-5 md:space-y-8">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant/15">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest font-label uppercase">{t.locationHero}</span>
            </div>
            <h1 className="hero-title text-4xl md:text-6xl font-black font-headline tracking-tighter leading-[0.9] text-on-background">
              {t.hero.title} <span className="text-primary italic">{t.hero.sub}</span>
            </h1>
            <p className="hero-subtitle text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              {t.hero.body}
            </p>
            <div className="hero-cta flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="/projeler" className="bg-primary-container text-on-primary-container px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-headline font-extrabold shadow-[0_20px_40px_rgba(109,94,0,0.15)] hover:shadow-[0_28px_56px_rgba(109,94,0,0.28)] hover:scale-[1.03] active:scale-95 transition-all duration-200 inline-block">
                {t.hero.cta}
              </a>
            </div>
          </div>
          <div className="hero-photo md:col-span-5 relative mt-4 md:mt-0">
            <div className="photo-float aspect-[4/5] rounded-xl overflow-hidden bg-primary shadow-2xl">
              <img alt="Professional Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 mix-blend-multiply opacity-90 contrast-125 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrOdEuc_6J0ImQ9cEjrmHswhd182_Fl1EywXcMk4bPd7nTuUo0dHXA4GE11QleXoXqBxVyAavcWhIGFJ_jcxXDwUkJS5vYZHR228uJCuNsFtNJ6zV0Avc6NR9u-7nJrgD4tEdjJo9m672iFGpvz0sLpgJx0xHRtnUG3nCM8jRtCEXlmuTUfjcp61OxqCA5SkyV2gsLy0mdM0Ta8QaUHmquuqD6rWUezX2KPB_h7MvafIontphvBrdj2644j2guoGoMl3tmYcpkbBQ" />
            </div>
            <div className="hero-exp absolute -bottom-6 -left-6 bg-surface-bright p-5 md:p-6 rounded-xl shadow-xl -rotate-2 border border-outline-variant/10">
              <p className="font-headline font-black text-xl md:text-2xl leading-none">{t.hero.exp}</p>
              <p className="text-sm font-bold text-on-surface-variant tracking-wider uppercase mt-1">{t.hero.expLabel}</p>
            </div>
          </div>
        </section>

        {/* About / Skills */}
        <section className="bg-surface-container-low py-14 md:py-24" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="md:w-1/3 reveal">
                <h2 className="text-3xl font-black font-headline tracking-tight uppercase md:sticky md:top-32">{t.about.title}</h2>
              </div>
              <div className="md:w-2/3 space-y-8 md:space-y-12">
                <p className="reveal text-xl md:text-2xl font-headline leading-tight text-on-background">
                  {lang === "tr" ? (
                    <>Durağanlığı reddediyorum. Çalışmalarım sürekli öğrenmenin <span className="bg-primary-container px-2">kinetik enerjisinden</span> ilham alıyor—her zaman gelişiyor, her zaman üretiyor, asla "yeterince iyi" çözümlerle yetinmiyorum.</>
                  ) : (
                    <>I reject stagnation. My work draws inspiration from the <span className="bg-primary-container px-2">kinetic energy</span> of continuous learning — always evolving, always building, never settling for "good enough".</>
                  )}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {t.about.cards.map((card, i) => (
                    <div key={i} className={`reveal reveal-d${i + 1} bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 hover:-translate-y-1 hover:shadow-md transition-all duration-300`}>
                      <span className="material-symbols-outlined text-3xl text-primary mb-3">{card.icon}</span>
                      <h3 className="text-base font-bold font-headline mb-2">{card.title}</h3>
                      <p className="text-on-surface-variant text-sm">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects Carousel ─────────────────────────────── */}
        <section className="py-14 md:py-24 overflow-hidden" id="projects">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-8 md:mb-10 reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter">{t.projects.sectionTitle}</h2>
              <p className="text-on-surface-variant mt-1 text-sm">{t.projects.sectionSub}</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <a className="hidden md:flex font-headline font-bold items-center gap-1.5 group text-sm" href="/projeler">
                {t.projects.viewAll} <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </a>
              <div className="flex gap-2">
                <button onClick={() => scrollCarousel(projectsRef, -1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label="Önceki">
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel(projectsRef, 1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label="Sonraki">
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div
            ref={projectsRef}
            onMouseDown={dragStart(projectsRef)}
            onMouseMove={dragMove(projectsRef)}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 select-none"
          >
            {featuredProjects.filter(p => p.image).map((project, i) => (
              <a
                key={project.id}
                href={project.link || "/projeler"}
                onClick={blockIfDrag}
                draggable={false}
                className="group snap-start shrink-0 w-[82vw] md:w-[42vw] lg:w-[36vw] max-w-[600px]"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface-container mb-4">
                  <img src={project.image} alt={lang === "en" ? (project.title_en || project.title) : project.title} draggable={false} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-black font-headline text-zinc-900">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-full text-xs font-black font-label tracking-wider uppercase translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {lang === "en" ? "View" : "İncele"} <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex gap-2 mb-1.5">
                      <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{lang === "en" ? (project.category_en || project.category) : project.category}</span>
                      <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{project.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black font-headline tracking-tight group-hover:text-primary transition-colors duration-200">{lang === "en" ? (project.title_en || project.title) : project.title}</h3>
                    <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{lang === "en" ? (project.description_en || project.description) : project.description}</p>
                  </div>
                  <div className="w-9 h-9 shrink-0 rounded-full border-2 border-outline-variant/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary-container transition-all duration-300 mt-1">
                    <span className="material-symbols-outlined text-base group-hover:text-on-primary-container transition-colors duration-200">north_east</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Writing Carousel ──────────────────────────────── */}
        <section className="bg-surface-container-low py-14 md:py-24 overflow-hidden" id="writing">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-8 md:mb-10 reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter text-primary">{t.blog.sectionTitle}</h2>
              <p className="text-on-surface-variant mt-1 text-sm">{t.blog.sectionSub}</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <a className="hidden md:flex font-headline font-bold items-center gap-1.5 group text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="/yazilar">
                {t.blog.viewAll} <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </a>
              <div className="flex gap-2">
                <button onClick={() => scrollCarousel(writingRef, -1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label="Önceki">
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel(writingRef, 1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label="Sonraki">
                  <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div
            ref={writingRef}
            onMouseDown={dragStart(writingRef)}
            onMouseMove={dragMove(writingRef)}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 select-none"
          >
            {latestPosts.map((post, i) => (
              <a
                key={post.fields.slug}
                href={post.fields.slug}
                onClick={blockIfDrag}
                draggable={false}
                className="group snap-start shrink-0 w-[82vw] md:w-[38vw] lg:w-[30vw] max-w-[500px] bg-surface-container border border-outline-variant/15 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                  {post.frontmatter.coverImage ? (
                    <img
                      src={post.frontmatter.coverImage}
                      alt={lang === "en" ? (post.frontmatter.title_en || post.frontmatter.title) : post.frontmatter.title}
                      draggable={false}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-highest" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-black tracking-[0.18em] uppercase text-primary font-label bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/25">
                    {lang === "en" ? (post.frontmatter.category_en || post.frontmatter.category) : post.frontmatter.category}
                  </span>
                  <span className="absolute top-3 right-4 text-on-surface-variant/60 font-headline font-black text-xl select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-black font-headline text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                    {lang === "en" ? (post.frontmatter.title_en || post.frontmatter.title) : post.frontmatter.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {lang === "en" ? (post.frontmatter.excerpt_en || post.frontmatter.excerpt) : post.frontmatter.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15">
                    <span className="text-on-surface-variant text-xs font-label">
                      {new Date(post.frontmatter.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <div className="flex items-center gap-1 text-primary text-xs font-bold font-headline uppercase tracking-wider">
                      {t.blog.read} <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile "View All" */}
          <div className="md:hidden px-6 mt-6">
            <a href="/yazilar" className="flex items-center justify-center gap-2 w-full py-3 border border-outline-variant rounded-xl font-headline font-bold text-sm text-on-surface hover:border-primary/50 transition-colors">
              {t.blog.viewAllMobile} <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full pt-4 md:pt-6 px-6 pb-32 md:pb-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</span>
            <p className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">{t.footer.copy}</p>
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
        <a className="flex flex-col items-center gap-1 text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.home}</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400" href="/projeler">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.projects}</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400" href="/yazilar">
          <span className="material-symbols-outlined">edit_note</span>
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
    <title>Hüseyin Karacif | Solution Expert</title>
    <meta name="description" content="Hüseyin Karacif - Çözüm Uzmanı (Solution Expert) & Kıdemli Yazılım Geliştirici. Hassasiyetle hazırlanmış yüksek kaliteli dijital ürünler, yazılım mimarisi ve teknoloji çözümleri üretiyorum." />
    <meta property="og:title" content="Hüseyin Karacif | Solution Expert" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </>
);

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 3) {
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
          coverImage
        }
      }
    }
    allProjectsJson(filter: { featured: { eq: true } }) {
      nodes {
        id
        title
        title_en
        category
        category_en
        year
        description
        description_en
        image
        featured
        colSpan
        link
      }
    }
  }
`;
