import React from "react";

export default function Projects() {
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
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/projects">Projects</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/blog">Writing</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://linkedin.com/in/huseyinkaracif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <button className="hidden md:block bg-primary-container text-on-primary-container font-headline font-bold px-6 py-2 rounded-xl active:scale-95 duration-200 ease-in-out hover:bg-zinc-100 transition-all">
            Let's Talk
          </button>
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
          {/* Project 1 */}
          <div className="md:col-span-8 group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low mb-5 md:mb-6 aspect-[16/10]">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8FDu3zQmlaVTaOwbpva9uzrykC_XeJQ8YCGxvgj_18CpJvjdQ-EwlL6UNneg7mN9O1MS2TCfh9h96IlJyf9Yv_1srAwKujsuwYa7Hp71GPS_4gaKWpLjw0j4_yje7uSOqksQGEjhp2IF4MmqpKdGnE409Ovakj0ETQR7Tn9alNOJbECZC5KbbvNqzah8oBnx5vzvtNRnOGIMusZpeeZKYka_5pKqVffBdjEU9_F7s-A_badKAKi88ndtIdloPizOjihMApvOZNWU" alt="NomadFlow OS" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4">
              <div>
                <div className="flex gap-2 mb-2 md:mb-3">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">Product Design</span>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">2024</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">NomadFlow OS</h3>
                <p className="text-on-surface-variant mt-2 max-w-md">The world's first productivity suite optimized for asynchronous deep work across timezones.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-headline underline decoration-4 decoration-primary-container underline-offset-4">View Case</span>
                <span className="material-symbols-outlined text-primary">arrow_outward</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="md:col-span-4 group cursor-pointer md:mt-12">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low mb-5 md:mb-6 aspect-[4/5]">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWK5uGTMtxujwshZX1OsxNqW8AYxJ5qA4gpXOn0YHOxeRq8I0JpFmqBZuVjw8BrJj2JcOI_lk0HMq14PsG2kSbuc9rhjjtOTOSbPJVuaCJDoNWZEJAegZoGs6KY-BA-brI50xNrcNHHIoRbt0PQObmy8rsZQf1AayKLDQNytPZTNOX-XBU7Awrfl9fZpCY_hzjoTz7tB1wSiNlC0-YX1eSlNi1qr9BWq8_8B0YfTyrAQ7aYP3dTwS3iu4jMtbhlHcug7jnuyR6v68" alt="Kinetic Shapes" />
            </div>
            <div>
              <div className="flex gap-2 mb-2 md:mb-3">
                <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">3D Visuals</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">Kinetic Shapes</h3>
              <p className="text-on-surface-variant mt-2">Exploring the tension between static geometry and digital momentum.</p>
            </div>
          </div>

          {/* Project 3 */}
          <div className="md:col-span-5 group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low mb-5 md:mb-6 aspect-square">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg6tUJTwPQDb6wWCl74kdjfI9yQOgVwyw1RKdvJa-pVETqDvtsvW0CO1hR2RpBsFZ5CTUg7ykkrXCLPrtIg8uJg5tKUBiXB5WlvBLLdKN6_4sGD2094Rd7_swWHwhQ80-T3srCFoCrtPAgNP_wMLNB1o64_inkmzEtgBTjIiKiB2xJK6oUmvu1ozsmqwQfBf6Y2Xofa3JeSu3TLgezt54QWiDEEGmBY1t3wmY0vCmtuFSVIeOCkOIsTMH6EOjo8BawzU0gC8QkZ2c" alt="Atlas Identity" />
            </div>
            <div>
              <div className="flex gap-2 mb-2 md:mb-3">
                <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">Branding</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">Atlas Identity</h3>
              <p className="text-on-surface-variant mt-2">A heritage-inspired brand system for a modern travel tech startup.</p>
            </div>
          </div>

          {/* Project 4 */}
          <div className="md:col-span-7 group cursor-pointer md:mt-12">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low mb-5 md:mb-6 aspect-[16/11]">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhF28JFtB9skUuCGa95Yk2kL1chiKZhpjm_KCNIxWT175CZx0aQCZS9aA84knqZ7pdwg5lDb2aMMPs3wOD7CgINe7L5YgWWiFD9LL8PcP744ZdxEqOYCLyWfvlrpqDidV7MCr6Yt6fyFvQuzarZZsLsqySH-cPMqoYoGqAJFnpG9V2HqJMoRDFahO3MgxFISOTr7ZJVYKyO4oipe75sfO4f5mnUX0DHoFJ4RlG996dvE51SmPuva33_r2bxzmVch79KS3zzw9NEo9Q" alt="DASH_V3" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4">
              <div>
                <div className="flex gap-2 mb-2 md:mb-3">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-1 rounded">UI Design</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">DASH_V3</h3>
                <p className="text-on-surface-variant mt-2 max-w-sm">Reimagining financial analytics for the crypto-native generation.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-headline underline decoration-4 decoration-primary-container underline-offset-4">View Case</span>
                <span className="material-symbols-outlined text-primary">arrow_outward</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mt-20 md:mt-32 mb-8 md:mb-16 bg-on-background rounded-xl p-8 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-4xl md:text-7xl font-black font-headline tracking-tighter text-white mb-6 md:mb-8">
              Let's build the <span className="text-primary-container">Next Big Thing</span> together.
            </h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              <a className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 bg-primary-container text-on-primary-container rounded-xl font-black font-headline text-base md:text-lg active:scale-95 transition-all w-full md:w-auto" href="#">
                Get in Touch
              </a>
              <a className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 border border-white/20 text-white rounded-xl font-bold font-headline text-base md:text-lg hover:bg-white/10 transition-all w-full md:w-auto" href="#">
                Download Portfolio
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
            <p className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2024 Hüseyin Karacif. Senior Software Developer.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="#">Twitter</a>
            <a className="text-[#0077B5] hover:text-[#005582] flex items-center gap-2 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="https://linkedin.com/in/huseyinkaracif" target="_blank" rel="noopener noreferrer">
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
          <span className="text-[10px] font-black uppercase">Projects</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/blog">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[10px] font-black uppercase">Writing</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">code</span>
          <span className="text-[10px] font-black uppercase">GitHub</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="https://linkedin.com/in/huseyinkaracif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">work</span>
          <span className="text-[10px] font-black uppercase">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
