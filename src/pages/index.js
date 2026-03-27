import React from "react";

export default function Home() {
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
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/projects">Projects</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/blog">Writing</a>
          </div>
          <button className="hidden md:block bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-headline font-bold active:scale-95 duration-200 ease-in-out">
            Let's Talk
          </button>
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
              I'm Hüseyin Karacif, a <span className="text-primary italic">Senior Software</span> Developer.
            </h1>
            <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
              Building high-quality digital products with precision, performance, and purpose. I craft experiences that don't just work—they excel.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="/projects" className="bg-primary-container text-on-primary-container px-8 py-4 md:px-10 md:py-5 rounded-xl text-lg md:text-xl font-headline font-extrabold shadow-[0_20px_40px_rgba(109,94,0,0.15)] active:scale-95 transition-all inline-block">
                View My Work
              </a>
            </div>
          </div>
          <div className="md:col-span-5 relative mt-4 md:mt-0">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-primary shadow-2xl rotate-3 translate-x-4">
              <img alt="Professional Portrait" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrOdEuc_6J0ImQ9cEjrmHswhd182_Fl1EywXcMk4bPd7nTuUo0dHXA4GE11QleXoXqBxVyAavcWhIGFJ_jcxXDwUkJS5vYZHR228uJCuNsFtNJ6zV0Avc6NR9u-7nJrgD4tEdjJo9m672iFGpvz0sLpgJx0xHRtnUG3nCM8jRtCEXlmuTUfjcp61OxqCA5SkyV2gsLy0mdM0Ta8QaUHmquuqD6rWUezX2KPB_h7MvafIontphvBrdj2644j2guoGoMl3tmYcpkbBQ" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-surface-bright p-5 md:p-6 rounded-xl shadow-xl -rotate-2 border border-outline-variant/10">
              <p className="font-headline font-black text-2xl md:text-3xl leading-none">10+ Years</p>
              <p className="text-sm font-bold text-on-surface-variant tracking-wider uppercase mt-1">Experience</p>
            </div>
          </div>
        </section>

        {/* About / Skills */}
        <section className="bg-surface-container-low py-14 md:py-24" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="md:w-1/3">
                <h2 className="text-4xl font-black font-headline tracking-tight uppercase md:sticky md:top-32">The Persona</h2>
              </div>
              <div className="md:w-2/3 space-y-8 md:space-y-12">
                <p className="text-2xl md:text-3xl font-headline leading-tight text-on-background">
                  I reject the static. My work is inspired by the <span className="bg-primary-container px-2">kinetic energy</span> of constant learning—always evolving, always shipping, never settling for "good enough" solutions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4" data-icon="strategy">strategy</span>
                    <h3 className="text-xl font-bold font-headline mb-2">Architecture</h3>
                    <p className="text-on-surface-variant">System design and software architecture that scales. Building foundations that last, not just features that ship.</p>
                  </div>
                  <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4" data-icon="brush">brush</span>
                    <h3 className="text-xl font-bold font-headline mb-2">Craft</h3>
                    <p className="text-on-surface-variant">Clean code, thoughtful APIs, and interfaces that feel as good as they perform.</p>
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
            {/* Project 1 */}
            <div className="md:col-span-8 group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-video bg-zinc-200">
                <img alt="Fintech Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy4pqqUK_CIdsuoEvPjPoDCIPb3IZnnhQlh2nsXyE8jTN9WJtXMoPY_qGm70Hu2fWCVhkAwaF9qhqw2_I-FKpTD3YLuQx_YKMm-0Zz84BAQFH2NBq6uiNGS-4RjTt9BUzbTZ2y-eo60znzjczado4S8SakXUCuEAHtq0Net96zdnwOx8hKPSNGhur7Om7EKArQooj3o8JZcA2urloj6m6oXhRDojmYQLSotHsfzUs5_5o4ZEHJ1omGWBTC9y_yd-Gt2OUDXDko_eA" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold font-headline">Vela Financial</h3>
                    <p className="text-zinc-300">Identity & Dashboard Design</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Project 2 */}
            <div className="md:col-span-4 group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl h-full min-h-[240px] md:min-h-[300px] bg-primary">
                <img alt="Editorial Layout" className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5NaKtorwT2kPKxm3WUgZO70WA_UdYKOdghqYWaIVmcP9r-U-cnUT9QN3tCidV30ZMalP6yEbgEYY2Lv9KAXoPIHlMR0rplIB4dMWj7Rco2zJaXREqY37I3r8edFBsfcABNMTHrpAwD4MFx1LxlD8sf2XAYkirJp2knmhqJsurI7w-YSRdh8USDJgbhRkZwS-OAa2DiPy6A4hcYO9OtA_1bWvO5Y7FpSioT5nGlk_TlqiutGWEsbjL7wRhWJHuhMsIQ5hRAFVmM6U" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-on-primary-container">
                  <h3 className="text-2xl font-black font-headline">Filtresiz</h3>
                  <p className="font-bold opacity-80">Content Strategy</p>
                </div>
              </div>
            </div>
            {/* Project 3 */}
            <div className="md:col-span-12 group cursor-pointer">
              <div className="bg-surface-container p-8 md:p-12 rounded-xl flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between group-hover:bg-primary-container transition-colors">
                <div className="max-w-md">
                  <h3 className="text-3xl font-black font-headline mb-3 md:mb-4">Nomad OS</h3>
                  <p className="text-on-surface-variant group-hover:text-on-primary-container">A bespoke Notion system for digital nomads to track client work, flights, and local coffee haunts.</p>
                </div>
                <span className="material-symbols-outlined text-6xl group-hover:rotate-45 transition-transform">travel_explore</span>
              </div>
            </div>
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
              <a className="group relative flex flex-col h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transition-all hover:border-primary/50" href="/blog">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img alt="Workspace" className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRQo_75hC65ux5Q5ibyxjfOWdCzDfB3xXNVZQ2tEd35ofZPbMkkYd3LML47PWr-9RwDy6nmzgCmAn3eo-2mkEs7UigLJQ6JrQrLGwQWMmxvHri8fCmRD-7VgHZPzFniws_ZiRPHkqNilKx7vlUygrCrApTAjOX7SUBSKcnCIbaL6jnq-zN5y9fMJml_yytSamylFvRGAQbIBoZ7zK1HF5zA7527Oq7T8JTYl1KUvZSVnt8RZvAVeFruY-KFsGnZacveMzJHD-Z5Hk" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-on-primary text-[10px] font-black tracking-widest uppercase font-label rounded-full">Development</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="mb-3 text-zinc-500 text-xs font-bold font-label uppercase tracking-widest">Mar 24, 2024</div>
                  <h3 className="text-xl md:text-2xl font-black font-headline text-white mb-3 leading-tight group-hover:text-primary transition-colors">Kendi Yapay Zeka Ekibinizi Nasıl Kurarsınız?</h3>
                  <p className="text-zinc-400 font-body text-sm line-clamp-3 mb-6">Modern yazılım dünyasında otonom agent'lar ve AI asistanlarıyla nasıl senkronize çalışılır.</p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                    Read Post <span className="material-symbols-outlined text-sm">north_east</span>
                  </div>
                </div>
              </a>
              <a className="group relative flex flex-col h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transition-all hover:border-primary/50" href="/blog">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img alt="Movement" className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARSstzxb15tvI7hvhF6ej7dQr2yJjhFhhdFm2ojzWJ2lPnOqS8jHF-Vvp0vIN50XUiHGw6nMh6-hMHzazfLBViQj8_Y85Gj36d6aPw0soHHGw-GCP8kCFdzq-bL4J7BfVNp09vnyIxUxY4zfmMknp-ts1UWIQ_0h_qh8dh2goYk6UUTO0zcpG7VmtC1b7CIhA7nWZ9HH2vxOT-nlJf4nBgAlCgXOiC63_XuArf_mQ6dk1iwqVchHDHqkPgqxCQid5gACDhLMxaFTs" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-on-primary text-[10px] font-black tracking-widest uppercase font-label rounded-full">Engineering</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="mb-3 text-zinc-500 text-xs font-bold font-label uppercase tracking-widest">Feb 12, 2024</div>
                  <h3 className="text-xl md:text-2xl font-black font-headline text-white mb-3 leading-tight group-hover:text-primary transition-colors">SOLID Nedir?</h3>
                  <p className="text-zinc-400 font-body text-sm line-clamp-3 mb-6">Yazılım mimarisinin beş temel prensibi ve kodunuzun neden kırılgan olduğu.</p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                    Read Post <span className="material-symbols-outlined text-sm">north_east</span>
                  </div>
                </div>
              </a>
              <a className="group relative flex flex-col h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transition-all hover:border-primary/50" href="/blog">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img alt="Clean Code" className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEwq3P95nd6MfojVuiUAeJQ9tFPI9gDY7DP-Yu_JlmQ1yc803biyXBKPIOfEP0H-aRtnNkShw-u4QeNGgeUatkTEP5aSg_eeuOm3CRoLMJCylJGLskJ7OFxshsAgAVuifKdJhShr-1aweDpstiBZVS-DWVN-S_dYgkXSmL1f6qXZqEGaIvmc6gfN_nDITk4j4_U3IzVnHHdxCo2V0h6PFXXVZ-FQS6o8LFPA5ehKobAfjyn_wZqf2VBBBaKG7cM-ce17X4LNO4rG8" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-on-primary text-[10px] font-black tracking-widest uppercase font-label rounded-full">Design</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="mb-3 text-zinc-500 text-xs font-bold font-label uppercase tracking-widest">Jan 05, 2024</div>
                  <h3 className="text-xl md:text-2xl font-black font-headline text-white mb-3 leading-tight group-hover:text-primary transition-colors">Clean Code Prensipleri</h3>
                  <p className="text-zinc-400 font-body text-sm line-clamp-3 mb-6">Okunabilir ve sürdürülebilir kod yazmanın incelikleri.</p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                    Read Post <span className="material-symbols-outlined text-sm">north_east</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 md:py-12 px-6 pb-24 md:pb-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</span>
            <p className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2024 Hüseyin Karacif. Senior Software Developer.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="#">Twitter</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="#">LinkedIn</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all text-sm font-['Inter'] tracking-wide" href="#">Read.cv</a>
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
