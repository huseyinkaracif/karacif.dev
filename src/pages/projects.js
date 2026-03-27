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
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all opacity-80 hover:opacity-100 font-label text-sm uppercase font-bold tracking-widest" href="#">Twitter</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all opacity-80 hover:opacity-100 font-label text-sm uppercase font-bold tracking-widest" href="#">LinkedIn</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all opacity-80 hover:opacity-100 font-label text-sm uppercase font-bold tracking-widest" href="#">Read.cv</a>
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
      </div>
    </div>
  );
}
