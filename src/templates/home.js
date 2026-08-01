import React, { useEffect, useRef } from "react";
import { graphql, Link } from "gatsby";
import { translations } from "../translations";
import { ROUTES } from "../i18n/routes";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const HERO_FALLBACK = "https://lh3.googleusercontent.com/aida-public/AB6AXuDrOdEuc_6J0ImQ9cEjrmHswhd182_Fl1EywXcMk4bPd7nTuUo0dHXA4GE11QleXoXqBxVyAavcWhIGFJ_jcxXDwUkJS5vYZHR228uJCuNsFtNJ6zV0Avc6NR9u-7nJrgD4tEdjJo9m672iFGpvz0sLpgJx0xHRtnUG3nCM8jRtCEXlmuTUfjcp61OxqCA5SkyV2gsLy0mdM0Ta8QaUHmquuqD6rWUezX2KPB_h7MvafIontphvBrdj2644j2guoGoMl3tmYcpkbBQ";

export default function Home({ data, pageContext }) {
  const { lang, altPath } = pageContext;
  const t = translations[lang] || translations.tr;
  const r = ROUTES[lang];
  const expYears = parseInt(t.hero.exp, 10) || 7;
  const latestPosts = data.allMarkdownRemark.nodes;
  const featuredProjects = data.allProjectsJson.nodes.filter((p) => p.featured && p.image);
  // Each list is rendered twice for the seamless infinite marquee
  const projectLoop = [...featuredProjects, ...featuredProjects];
  const postLoop = [...latestPosts, ...latestPosts];

  const projectsRef = useRef(null);
  const writingRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const didDrag = useRef(false);

  const photoWrapRef = useRef(null);
  const counterRef = useRef(null);
  const ctaRef = useRef(null);

  // Content is rendered twice; wrapping at the halfway point makes the loop seamless
  const wrap = (el, value) => {
    const half = el.scrollWidth / 2;
    if (half <= el.clientWidth) return value;
    if (value >= half) return value - half;
    if (value < 0) return value + half;
    return value;
  };

  const scrollCarousel = (ref, dir) => {
    const el = ref.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || Math.round(el.offsetWidth * 0.82);
    const scrollAmount = cardWidth + 20;
    const half = el.scrollWidth / 2;
    if (half > el.clientWidth) {
      if (dir === 1 && el.scrollLeft + scrollAmount >= half) el.scrollLeft -= half / 2;
      if (dir === -1 && el.scrollLeft - scrollAmount < 0) el.scrollLeft += half / 2;
    }
    el.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  };

  // ── Infinite autoplay marquee ────────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups = [projectsRef, writingRef].map((ref) => {
      const el = ref.current;
      if (!el) return () => {};
      let raf = null;
      let paused = false;
      let pos = el.scrollLeft;
      const step = () => {
        if (!paused && !isDragging.current && el.scrollWidth / 2 > el.clientWidth) {
          // scrollLeft rounds to integers — keep the fractional position ourselves,
          // resyncing when the user scrolled by other means (drag, buttons, touch)
          if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
          pos = wrap(el, pos + 0.6);
          el.scrollLeft = pos;
        }
        raf = requestAnimationFrame(step);
      };
      const pause = () => { paused = true; };
      const resume = () => { paused = false; };
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
      el.addEventListener("touchstart", pause, { passive: true });
      el.addEventListener("touchend", resume);
      raf = requestAnimationFrame(step);
      return () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
        el.removeEventListener("touchstart", pause);
        el.removeEventListener("touchend", resume);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const dragStart = (ref) => (e) => {
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.pageX - ref.current.getBoundingClientRect().left;
    dragScrollLeft.current = ref.current.scrollLeft;
  };
  const dragMove = (ref) => (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = ref.current;
    const x = e.pageX - el.getBoundingClientRect().left;
    const walk = (x - dragStartX.current) * 1.4;
    if (Math.abs(walk) > 4) didDrag.current = true;
    const next = wrap(el, dragScrollLeft.current - walk);
    dragScrollLeft.current += next - (dragScrollLeft.current - walk);
    el.scrollLeft = next;
  };
  const dragEnd = () => { isDragging.current = false; };
  const blockIfDrag = (e) => { if (didDrag.current) e.preventDefault(); };

  // ── Counter animation for experience badge ───────────────────
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const run = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        // round, not floor — flooring stalls one short of the target for most of the run
        el.textContent = Math.round(eased * expYears) + "+";
        if (p < 1) requestAnimationFrame(run);
      };
      el.textContent = "0+";
      requestAnimationFrame(run);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [expYears]);

  // ── Mouse parallax on hero photo (desktop only, rAF-smoothed) ─
  useEffect(() => {
    let rafId = null;
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      const wrap = photoWrapRef.current;
      if (wrap) wrap.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };
    const schedule = () => { if (rafId === null) rafId = requestAnimationFrame(tick); };
    const onMove = (e) => {
      if (window.innerWidth < 768) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * 18;
      targetY = (e.clientY / window.innerHeight - 0.5) * 12;
      schedule();
    };
    const onLeave = () => { targetX = 0; targetY = 0; schedule(); };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── Magnetic CTA button ──────────────────────────────────────
  const handleMagnet = (e) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = "transform 0.1s cubic-bezier(0.22,1,0.36,1)";
  };
  const resetMagnet = () => {
    const btn = ctaRef.current;
    if (!btn) return;
    btn.style.transform = "";
    btn.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
  };

  // ── 3D tilt for cards ────────────────────────────────────────
  const handleTilt = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    el.style.transition = "transform 0.1s cubic-bezier(0.22,1,0.36,1)";
  };
  const resetTilt = (el) => {
    el.style.transform = "";
    el.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <Layout lang={lang} active="home" altPath={altPath} showProgress>
      <main className="pt-20 md:pt-24 pb-5 md:pb-0">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
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
              <Link innerRef={ctaRef} to={r.projects} onMouseMove={handleMagnet} onMouseLeave={resetMagnet} className="bg-primary-container text-on-primary-container px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-headline font-extrabold shadow-[0_20px_40px_rgba(109,94,0,0.15)] hover:shadow-[0_28px_56px_rgba(109,94,0,0.28)] active:scale-95 transition-shadow duration-200 inline-block will-change-transform">
                {t.hero.cta}
              </Link>
            </div>
          </div>
          <div className="hero-photo group md:col-span-5 relative mt-4 md:mt-0">
            {/* The photo drifts with the cursor, so a glow and a frame stay behind it
                instead of leaving bare page background at the edges */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-5 md:-inset-8 rounded-[2.5rem] bg-primary/25 dark:bg-primary/15 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl border-2 border-primary/30 [transform:rotate(3deg)_translateX(1rem)_scale(1.05)]" />
            <div ref={photoWrapRef} className="relative will-change-transform">
              <div className="photo-float isolate aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-high shadow-[0_30px_70px_-25px_rgb(var(--primary)/0.5),0_10px_28px_-14px_rgba(0,0,0,0.35)]">
                <img
                  alt={lang === "tr" ? "Hüseyin Karacif — gün batımında İstanbul sahilinde" : "Hüseyin Karacif — at the Istanbul seaside at sunset"}
                  className="w-full h-full object-cover brightness-110 saturate-[.85] dark:brightness-95 dark:saturate-100 group-hover:saturate-100 dark:group-hover:saturate-[1.15] transition-[filter] duration-700"
                  src="/images/hero.jpg"
                  onError={(e) => {
                    if (e.currentTarget.src !== HERO_FALLBACK) e.currentTarget.src = HERO_FALLBACK;
                  }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-primary/5 to-transparent mix-blend-soft-light" />
                <div aria-hidden="true" className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
              </div>
              <div className="hero-exp absolute -bottom-6 -left-6 bg-surface-bright p-5 md:p-6 rounded-xl shadow-xl -rotate-2 border border-outline-variant/10">
                <p className="font-headline font-black text-xl md:text-2xl leading-none">
                  <span ref={counterRef}>{expYears}+</span> {lang === "tr" ? "Yıl" : "Years"}
                </p>
                <p className="text-sm font-bold text-on-surface-variant tracking-wider uppercase mt-1">{t.hero.expLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About / Skills */}
        <section className="bg-surface-container-low py-10 md:py-16" id="about">
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
                    <div
                      key={i}
                      onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                      onMouseLeave={(e) => resetTilt(e.currentTarget)}
                      className={`reveal reveal-d${i + 1} bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 transition-colors duration-300 will-change-transform`}
                    >
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
        <section className="py-10 md:py-16 overflow-hidden" id="projects">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-6 md:mb-8 reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter">{t.projects.sectionTitle}</h2>
              <p className="text-on-surface-variant mt-1 text-sm">{t.projects.sectionSub}</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Link className="hidden md:flex font-headline font-bold items-center gap-1.5 group text-sm" to={r.projects}>
                {t.projects.viewAll} <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </Link>
              <div className="flex gap-2">
                <button onClick={() => scrollCarousel(projectsRef, -1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label={lang === "tr" ? "Önceki" : "Previous"}>
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel(projectsRef, 1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label={lang === "tr" ? "Sonraki" : "Next"}>
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
            className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 select-none"
          >
            {projectLoop.map((project, idx) => {
              const i = idx % featuredProjects.length;
              const clone = idx >= featuredProjects.length;
              return (
              <a
                key={`${project.id}-${clone ? "b" : "a"}`}
                href={project.link || r.projects}
                onClick={blockIfDrag}
                draggable={false}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
                onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                onMouseLeave={(e) => resetTilt(e.currentTarget)}
                className="group shrink-0 w-[calc(100vw-3rem)] md:w-[42vw] lg:w-[36vw] max-w-[600px] will-change-transform"
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
              );
            })}
          </div>
        </section>

        {/* ── Writing Carousel ──────────────────────────────── */}
        <section className="bg-surface-container-low py-10 md:py-16 overflow-hidden" id="writing">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center mb-6 md:mb-8 reveal">
            <div>
              <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter text-primary">{t.blog.sectionTitle}</h2>
              <p className="text-on-surface-variant mt-1 text-sm">{t.blog.sectionSub}</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Link className="hidden md:flex font-headline font-bold items-center gap-1.5 group text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" to={r.blog}>
                {t.blog.viewAll} <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </Link>
              <div className="flex gap-2">
                <button onClick={() => scrollCarousel(writingRef, -1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label={lang === "tr" ? "Önceki" : "Previous"}>
                  <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel(writingRef, 1)} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-all duration-200 active:scale-90" aria-label={lang === "tr" ? "Sonraki" : "Next"}>
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
            className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 select-none"
          >
            {postLoop.map((post, idx) => {
              const i = idx % latestPosts.length;
              const clone = idx >= latestPosts.length;
              return (
              <Link
                key={`${post.fields.slug}-${clone ? "b" : "a"}`}
                to={post.fields.slug}
                onClick={blockIfDrag}
                draggable={false}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
                onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                onMouseLeave={(e) => resetTilt(e.currentTarget)}
                className="group shrink-0 w-[calc(100vw-3rem)] md:w-[32vw] lg:w-[25vw] max-w-[420px] bg-surface-container border border-outline-variant/15 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col will-change-transform"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                  {post.frontmatter.coverImage ? (
                    <img
                      src={post.frontmatter.coverImage}
                      alt={post.frontmatter.title}
                      draggable={false}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-highest" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-black tracking-[0.18em] uppercase text-primary font-label bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/25">
                    {post.frontmatter.category}
                  </span>
                  <span className="absolute top-3 right-4 text-on-surface-variant/60 font-headline font-black text-xl select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-base font-bold font-headline text-on-surface leading-snug mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2 mb-3 flex-grow">
                    {post.frontmatter.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/15">
                    <span className="text-on-surface-variant text-[10px] font-label">
                      {new Date(post.frontmatter.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <div className="flex items-center gap-1 text-primary text-xs font-bold font-headline uppercase tracking-wider">
                      {t.blog.read} <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                    </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>

          {/* Mobile "View All" */}
          <div className="md:hidden px-6 mt-6">
            <Link to={r.blog} className="flex items-center justify-center gap-2 w-full py-3 border border-outline-variant rounded-xl font-headline font-bold text-sm text-on-surface hover:border-primary/50 transition-colors">
              {t.blog.viewAllMobile} <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const Head = ({ pageContext }) => {
  const { lang, trPath, enPath } = pageContext;
  const title = lang === "tr"
    ? "Hüseyin Karacif | Solution Expert & Kıdemli Yazılım Geliştirici"
    : "Hüseyin Karacif | Solution Expert & Senior Software Developer";
  const description = lang === "tr"
    ? "Hüseyin Karacif - Çözüm Uzmanı (Solution Expert) & Kıdemli Yazılım Geliştirici. Yapay zeka, yazılım mimarisi ve modern mühendislik pratikleri üzerine üretiyor ve yazıyorum."
    : "Hüseyin Karacif - Solution Expert & Senior Software Developer in Istanbul. I build high-quality digital products and write about AI, software architecture and modern engineering practice.";
  return (
    <Seo
      lang={lang}
      title={title}
      description={description}
      pathname={lang === "tr" ? trPath : enPath}
      trPath={trPath}
      enPath={enPath}
    />
  );
};

export const query = graphql`
  query HomePageQuery($lang: String!) {
    allMarkdownRemark(
      filter: { fields: { lang: { eq: $lang } } }
      sort: { frontmatter: { date: DESC } }
      limit: 6
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
