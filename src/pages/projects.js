import React from "react";
import { graphql } from "gatsby";

export default function Projects({ data }) {
  const projects = data.allProjectsJson.nodes;

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
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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

      <main className="pt-20 md:pt-28 pb-24 md:pb-16 px-6 max-w-7xl mx-auto">
        {/* Hero */}
        <header className="mb-10 md:mb-16">
          <div className="inline-block bg-primary-container px-4 py-1 rounded-full mb-4 md:mb-6">
            <span className="text-xs font-black font-label tracking-[0.2em] text-on-primary-container uppercase">Selected Works</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] text-on-background mb-5 md:mb-8">
            Hüseyin <span className="text-primary italic">Karacif</span><br />Senior Dev.
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
            A collection of digital products, engineering solutions, and technical experiments crafted with precision.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const isWide = project.colSpan >= 7;
            const isFullWidth = project.colSpan === 12;

            if (isFullWidth) {
              return (
                <div key={project.id} className="md:col-span-12 group cursor-pointer">
                  <a href={project.link || "#"} className="block bg-surface-container p-8 md:p-12 rounded-xl flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between group-hover:bg-primary-container transition-colors">
                    <div className="max-w-md">
                      <div className="flex gap-2 mb-3">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">{project.category}</span>
                        <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">{project.year}</span>
                      </div>
                      <h3 className="text-3xl font-black font-headline mb-3 md:mb-4">{project.title}</h3>
                      <p className="text-on-surface-variant group-hover:text-on-primary-container">{project.description}</p>
                    </div>
                    <span className="material-symbols-outlined text-6xl group-hover:rotate-45 transition-transform">travel_explore</span>
                  </a>
                </div>
              );
            }

            return (
              <div
                key={project.id}
                className={`${isWide ? "md:col-span-8" : "md:col-span-4"} group cursor-pointer ${index % 2 === 1 && isWide ? "" : index % 2 === 1 ? "md:mt-12" : ""}`}
              >
                {project.image ? (
                  <>
                    <div className={`relative overflow-hidden rounded-xl bg-surface-container-low mb-5 md:mb-6 ${isWide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={project.image}
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className={`flex ${isWide ? "flex-col md:flex-row md:items-end justify-between" : "flex-col"} gap-3 md:gap-4`}>
                      <div>
                        <div className="flex gap-2 mb-2 md:mb-3">
                          <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">{project.category}</span>
                          <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">{project.year}</span>
                        </div>
                        <h3 className={`${isWide ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} font-black font-headline tracking-tight group-hover:text-primary transition-colors`}>{project.title}</h3>
                        <p className="text-on-surface-variant mt-2 max-w-md">{project.description}</p>
                      </div>
                      {isWide && (
                        <a href={project.link || "#"} className="flex items-center gap-2">
                          <span className="text-sm font-bold font-headline underline decoration-4 decoration-primary-container underline-offset-4">View Case</span>
                          <span className="material-symbols-outlined text-primary">arrow_outward</span>
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-surface-container p-8 rounded-xl group-hover:bg-primary-container transition-colors h-full flex flex-col justify-between min-h-[200px]">
                    <div>
                      <div className="flex gap-2 mb-3">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">{project.category}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-on-surface-variant mt-2">{project.description}</p>
                    </div>
                    <a href={project.link || "#"} className="mt-6 inline-flex items-center gap-2 font-headline font-bold text-sm">
                      View Project <span className="material-symbols-outlined text-primary">arrow_outward</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <section className="mt-20 md:mt-32 mb-8 md:mb-16 bg-on-background rounded-xl p-8 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-4xl md:text-7xl font-black font-headline tracking-tighter text-white mb-6 md:mb-8">
              Let's build the <span className="text-primary-container">Next Big Thing</span> together.
            </h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              <a className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 bg-primary-container text-on-primary-container rounded-xl font-black font-headline text-base md:text-lg active:scale-95 transition-all w-full md:w-auto" href="mailto:karacif.dev@gmail.com">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-950 w-full py-8 md:py-12 px-6 pb-24 md:pb-8">
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
