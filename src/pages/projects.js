import React, { useEffect, useRef } from "react";
import { graphql } from "gatsby";

export default function Projects({ data }) {
  const projects = data.allProjectsJson.nodes;

  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const didDrag = useRef(false);

  const scrollCarousel = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.offsetWidth * 0.82), behavior: "smooth" });
  };

  const dragStart = (e) => {
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.pageX - carouselRef.current.getBoundingClientRect().left;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
  };
  const dragMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.getBoundingClientRect().left;
    const walk = (x - dragStartX.current) * 1.4;
    if (Math.abs(walk) > 4) didDrag.current = true;
    carouselRef.current.scrollLeft = dragScrollLeft.current - walk;
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
    <div className="bg-background font-body text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(109,94,0,0.08)] dark:shadow-none">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-yellow-500 transition-colors font-headline" href="/">
            Karacif.dev
          </a>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/">Anasayfa</a>
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/projects">Projeler</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/blog">Yazılar</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>

      {/* Location Badge */}
      <div className="fixed bottom-8 right-8 z-40 hidden lg:flex items-center gap-3 bg-surface-bright/70 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/15 shadow-lg">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-xs font-bold font-label tracking-widest text-on-surface uppercase">Lokasyon: İstanbul, TR</span>
      </div>

      <main className="pt-20 md:pt-28 pb-8 md:pb-0">
        {/* Hero */}
        <header className="max-w-7xl mx-auto px-6 mb-10 md:mb-14 pt-6 md:pt-8">
          <div className="inline-block bg-primary-container px-4 py-1 rounded-full mb-4">
            <span className="text-xs font-black font-label tracking-[0.2em] text-on-primary-container uppercase">Seçilmiş Çalışmalar</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-headline tracking-tighter leading-[0.9] text-on-background mb-4">
            Hüseyin <span className="text-primary italic">Karacif</span><br />Senior Dev.
          </h1>
          <p className="text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Hassasiyet ile hayata geçirilmiş dijital ürünler, mühendislik çözümleri ve teknik deneyler.
          </p>
        </header>

        {/* ── Projects Carousel ─────────────────────────────── */}
        <section className="overflow-hidden py-6 md:py-10">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-6 md:mb-8 reveal">
            <div>
              <h2 className="text-2xl md:text-3xl font-black font-headline tracking-tighter">Tüm Projeler</h2>
              <p className="text-on-surface-variant mt-1 text-sm">Sürükle veya ok tuşlarını kullan.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(-1)}
                className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
                aria-label="Önceki"
              >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90"
                aria-label="Sonraki"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Track */}
          <div
            ref={carouselRef}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 select-none pb-4"
          >
            {projects.map((project, i) => (
              project.image ? (
                <a
                  key={project.id}
                  href={project.link || "#"}
                  onClick={blockIfDrag}
                  draggable={false}
                  className="group snap-start shrink-0 w-[82vw] md:w-[42vw] lg:w-[36vw] max-w-[600px]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface-container mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-xs font-black font-headline text-zinc-900">{String(i + 1).padStart(2, "0")}</span>
                    </div>
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
              ) : (
                /* Text-only card for projects without an image */
                <a
                  key={project.id}
                  href={project.link || "#"}
                  onClick={blockIfDrag}
                  draggable={false}
                  className="group snap-start shrink-0 w-[82vw] md:w-[36vw] lg:w-[28vw] max-w-[480px] bg-surface-container hover:bg-primary-container/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[260px] transition-all duration-300 border border-outline-variant/10"
                >
                  <div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{project.category}</span>
                      <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{project.year}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center mb-4">
                      <span className="text-xs font-black font-headline text-on-primary-container">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors duration-200 mb-2">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-6 font-headline font-bold text-sm group-hover:text-primary transition-colors duration-200">
                    Projeyi Gör <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                  </div>
                </a>
              )
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 mt-10 md:mt-20 mb-8 md:mb-16">
          <div className="bg-on-background rounded-2xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-black font-headline tracking-tighter text-white mb-5 md:mb-8">
                Birlikte <span className="text-primary-container">büyük bir şey</span> inşa edelim.
              </h2>
              <a className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 bg-primary-container text-on-primary-container rounded-xl font-black font-headline text-sm md:text-base active:scale-95 transition-all" href="mailto:karacif.dev@gmail.com">
                İletişime Geç
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-950 w-full py-8 md:py-12 px-6 pb-32 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</span>
            <p className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2026 Hüseyin Karacif. Senior Software Developer.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-[#0077B5] hover:text-[#005582] flex items-center gap-2 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a className="text-[#333] dark:text-white hover:text-gray-600 flex items-center gap-2 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
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
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-black uppercase">Anasayfa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-900 border-b-4 border-yellow-400 pb-1" href="/projects">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
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
  query ProjectsListQuery {
    allProjectsJson {
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
