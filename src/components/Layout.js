import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { translations } from "../translations";
import { ROUTES } from "../i18n/routes";
import Controls from "./Controls";
import Search from "./Search";

const SOCIALS = (
  <>
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
  </>
);

export default function Layout({ lang = "tr", active, altPath, showProgress = false, children }) {
  const t = translations[lang] || translations.tr;
  const r = ROUTES[lang];
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (showProgress) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLink = (key) =>
    active === key
      ? "text-on-background border-b-4 border-primary pb-1"
      : "text-on-surface-variant hover:text-on-background transition-colors";

  const mobileLink = (key) =>
    active === key
      ? "flex flex-col items-center gap-1 text-on-background border-b-4 border-primary pb-1"
      : "flex flex-col items-center gap-1 text-on-surface-variant";

  return (
    <div className="bg-background font-body text-on-background antialiased min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-surface/95 shadow-[0_1px_20px_rgba(109,94,0,0.10)]" : "bg-surface/70 shadow-none"}`}>
        {showProgress && <div className="scroll-progress-bar" style={{ width: `${scrollPct}%` }} />}
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link className="text-2xl font-black tracking-tighter text-on-background hover:text-primary transition-colors font-headline" to={r.home}>
            Karacif.dev
          </Link>
          <div className="flex items-center gap-3 md:gap-8">
            <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
              <Link className={navLink("home")} to={r.home}>{t.nav.home}</Link>
              <Link className={navLink("projects")} to={r.projects}>{t.nav.projects}</Link>
              <Link className={navLink("blog")} to={r.blog}>{t.nav.blog}</Link>
              <a className="text-on-surface-variant hover:text-on-background transition-colors" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="text-on-surface-variant hover:text-on-background transition-colors" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <Search lang={lang} />
          </div>
        </div>
      </nav>

      <div className="flex-grow">{children}</div>

      {/* Footer */}
      <footer className="w-full pt-6 md:pt-8 px-6 pb-32 md:pb-8 bg-surface-container-low border-t border-outline-variant/15">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-black text-on-background font-headline text-xl">Karacif.dev</span>
            <p className="font-['Inter'] text-sm tracking-wide text-on-surface-variant">{t.footer.copy}</p>
          </div>
          <div className="flex gap-8">{SOCIALS}</div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-surface-container-high/90 border border-outline-variant/20 backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center p-4">
        <Link className={mobileLink("home")} to={r.home}>
          <span className="material-symbols-outlined" style={active === "home" ? { fontVariationSettings: "'FILL' 1" } : undefined}>home</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.home}</span>
        </Link>
        <Link className={mobileLink("projects")} to={r.projects}>
          <span className="material-symbols-outlined" style={active === "projects" ? { fontVariationSettings: "'FILL' 1" } : undefined}>grid_view</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.projects}</span>
        </Link>
        <Link className={mobileLink("blog")} to={r.blog}>
          <span className="material-symbols-outlined" style={active === "blog" ? { fontVariationSettings: "'FILL' 1" } : undefined}>edit_note</span>
          <span className="text-[10px] font-black uppercase">{t.mobileNav.blog}</span>
        </Link>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">code</span>
          <span className="text-[10px] font-black uppercase">GitHub</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">work</span>
          <span className="text-[10px] font-black uppercase">LinkedIn</span>
        </a>
      </div>

      <Controls lang={lang} altPath={altPath} />
    </div>
  );
}
