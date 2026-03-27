import React from "react";

export default function Blog() {
  return (
    <div className="bg-background text-on-background font-body antialiased">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(109,94,0,0.08)] dark:shadow-none">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-yellow-500 transition-colors font-headline" href="/">
            Karacif.dev
          </a>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/">Anasayfa</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/projects">Projects</a>
            <a className="text-zinc-900 dark:text-white border-b-4 border-yellow-400 pb-1" href="/blog">Writing</a>
          </div>
          <button className="hidden md:block bg-primary-container text-on-primary-container font-headline font-bold px-6 py-2.5 rounded-xl active:scale-95 duration-200 ease-in-out">
            Let's Talk
          </button>
        </div>
      </nav>

      <main className="pt-20 md:pt-28 pb-24 md:pb-16 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold font-label uppercase tracking-widest text-on-surface-variant">Latest Thoughts</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter text-on-background leading-tight">
            Curated <span className="text-primary">Insights</span> & Dev Notes.
          </h1>
          <p className="mt-5 md:mt-8 text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Exploring the intersection of software craftsmanship, artificial intelligence, and modern engineering practices.
          </p>
        </header>

        {/* Bento Layout for Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Featured Post */}
          <article className="md:col-span-8 group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-6 md:p-8 h-full flex flex-col justify-end min-h-[360px] md:min-h-[500px] transition-all hover:shadow-[0_32px_64px_rgba(109,94,0,0.12)]">
              <div className="absolute inset-0 z-0">
                <img className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" data-alt="abstract neural network visualization with flowing golden light particles on a dark sophisticated background representing artificial intelligence" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ84lgnaQ7fE3tsAMryzudtrGrVBTHnvwgCbzK4LjVIOG1p09KMivpcyiy4z7GWVKXj77r5Y-VWys2MKRTOsgWOdueLGLza9LsEk1WPLeazKfSf-SPSCr7YsCQMSZnvZfdXTqVgYJsIoiSD9m6mW7xiqZfLvchH1JLlZTL0A94ScqMgxITTuxzUtftEQirFGVsSeK9CbKYjc1Xc9uxjYNGm-r6o5ErdsSQ9t-rExDH1GurDD3hyryTyQy87Isl9dvsMqvdy1p6FMw" alt="" />
              </div>
              <div className="relative z-10">
                <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                  <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-md text-xs font-bold font-label">AI & FUTURE</span>
                  <span className="text-on-surface-variant text-xs font-medium font-label self-center">12 Min Read</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tight text-on-background group-hover:text-primary transition-colors">
                  Kendi Yapay Zeka Ekibinizi Nasıl Kurarsınız?
                </h2>
                <p className="mt-3 md:mt-4 text-on-surface-variant text-base md:text-lg max-w-xl">
                  Modern yazılım dünyasında tek kişilik dev kadrolar dönemi kapandı. Artık otonom agent'lar ve AI asistanlarıyla nasıl senkronize çalışılacağını öğrenme vakti.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar Post 1 */}
          <article className="md:col-span-4 group cursor-pointer">
            <div className="bg-surface-container-highest rounded-xl p-6 md:p-8 h-full flex flex-col transition-all hover:bg-primary-container/20">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-on-primary-container text-3xl" data-icon="architecture">architecture</span>
              </div>
              <span className="text-primary font-bold font-label text-xs tracking-widest uppercase mb-2">Development</span>
              <h2 className="text-2xl font-headline font-extrabold tracking-tight text-on-background mb-3 md:mb-4">
                SOLID Nedir?
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Yazılım mimarisinin beş temel prensibi. Kodunuzun neden kırılgan olduğunu ve bunu nasıl düzeltebileceğinizi derinlemesine inceliyoruz.
              </p>
              <div className="mt-auto flex items-center text-primary font-bold text-sm">
                Read Article <span className="material-symbols-outlined ml-2 text-sm" data-icon="arrow_forward">arrow_forward</span>
              </div>
            </div>
          </article>

          {/* Recent Stories Carousel Section */}
          <div className="md:col-span-12 mt-6 md:mt-12">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-2xl font-headline font-black tracking-tight">
                Recent Stories
              </h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-surface-container hover:bg-primary-container transition-colors group">
                  <span className="material-symbols-outlined text-on-surface" data-icon="chevron_left">chevron_left</span>
                </button>
                <button className="p-2 rounded-full bg-surface-container hover:bg-primary-container transition-colors group">
                  <span className="material-symbols-outlined text-on-surface" data-icon="chevron_right">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="flex gap-5 md:gap-8 overflow-x-auto pb-6 md:pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
              {/* Carousel Card 1 */}
              <article className="min-w-[280px] md:min-w-[480px] snap-start group cursor-pointer">
                <div className="relative h-[320px] md:h-[400px] rounded-xl overflow-hidden bg-surface-container-low p-6 md:p-8 flex flex-col justify-end transition-all hover:shadow-[0_24px_48px_rgba(109,94,0,0.1)]">
                  <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" data-alt="futuristic digital interface with glowing neon elements" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcYP76IefkjGglVv87PV2xoxVuZLNnmrmvDdEYw7Dvm5GFc35siEDTMwpuuLWt2ZuibP4_wp34K_PtSAd-gAlVPBse6lX4Dkga-vaIqX3ODP_OXM10nL_NLAbSYezro3PKz6riJwcKXIXBfdqxAdVPpAlW3DKnLG2LUpogQPPb-p84Et-ilq9EV7MeSW52sFmdaNlSFodcE-aeYhTnngSG5kO-IrTznEM3NuoU4wAu4-CR_HnC0hzGxaPnDo8pZDj4-ykYP7q5E7c" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-3 md:gap-4 mb-3">
                      <span className="text-primary font-bold font-label text-[10px] tracking-widest uppercase">Technology</span>
                      <span className="text-on-surface-variant text-[10px] font-medium font-label">June 14, 2024</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-headline font-black tracking-tight text-on-background group-hover:text-primary transition-colors mb-3 md:mb-4">Yapay Zeka ile Devrim</h4>
                    <p className="text-on-surface-variant line-clamp-2">Teknoloji dünyasındaki en son değişimler ve adaptasyon süreçleri.</p>
                  </div>
                </div>
              </article>
              {/* Carousel Card 2 */}
              <article className="min-w-[280px] md:min-w-[480px] snap-start group cursor-pointer">
                <div className="relative h-[320px] md:h-[400px] rounded-xl overflow-hidden bg-surface-container-low p-6 md:p-8 flex flex-col justify-end transition-all hover:shadow-[0_24px_48px_rgba(109,94,0,0.1)]">
                  <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" data-alt="minimalist nomad workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpdRI1H25K4VW-g_bqMdkIVRd3zMu5coerdJtQhnTqZUKM2r-LBHH9BL-RYSwXTCKu3Cjce-ebeDaRF4sBzCoSiW2wMuYTFgBABSG2b7oU1tRJL2czSmaKbsh-j4IYNSlEPi8DgJhyXarW8FQLGFmaWUQWSSKFMO4d6x_fs7-M0xB1r-j6WkTPS0F7sgR2SZJtwKeu1n2daZvEzfycBLimcLrIYT5rA2TT46fqNElJHDj1S-xqHA9-BmX9NlR4OfwvuDAxdiFNfc8" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-3 md:gap-4 mb-3">
                      <span className="text-primary font-bold font-label text-[10px] tracking-widest uppercase">Lifestyle</span>
                      <span className="text-on-surface-variant text-[10px] font-medium font-label">May 28, 2024</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-headline font-black tracking-tight text-on-background group-hover:text-primary transition-colors mb-3 md:mb-4">Digital Nomad Olmak</h4>
                    <p className="text-on-surface-variant line-clamp-2">Ofisten bağımsız yaşamanın getirdiği özgürlük ve sorumluluklar.</p>
                  </div>
                </div>
              </article>
              {/* Carousel Card 3 */}
              <article className="min-w-[280px] md:min-w-[480px] snap-start group cursor-pointer">
                <div className="relative h-[320px] md:h-[400px] rounded-xl overflow-hidden bg-surface-container-low p-6 md:p-8 flex flex-col justify-end transition-all hover:shadow-[0_24px_48px_rgba(109,94,0,0.1)]">
                  <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" data-alt="clean code lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOrn-DlNyDYTf82A8mMZ9BW-QKhL-4ws_1C0Tuhn7Mz73JDMEOodDIKJ2MP2quBMgAryyPj8u4PZ4-WxbG4CSlGzsgRhe1sVAti1GbmtdBefiCK8rChYqgAfg6seq6_rh0v8I1nSD6H_vn5aa2NvXnYx8NEo0Pre39cStB1sUaCua0GsFXENYk6uYQNvPgTwa64hGQRAS9gg8Ew5JBtac6OlQuOjq0oXJJhII1pefJhKsQmpcv8lYOJQ77C9jXVViwnSEL3HghWLw" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-3 md:gap-4 mb-3">
                      <span className="text-primary font-bold font-label text-[10px] tracking-widest uppercase">Engineering</span>
                      <span className="text-on-surface-variant text-[10px] font-medium font-label">May 12, 2024</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-headline font-black tracking-tight text-on-background group-hover:text-primary transition-colors mb-3 md:mb-4">Clean Code Prensipleri</h4>
                    <p className="text-on-surface-variant line-clamp-2">Okunabilir ve sürdürülebilir kod yazmanın incelikleri.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="w-full py-8 md:py-12 px-6 pb-24 md:pb-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</div>
            <div className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2024 Hüseyin Karacif. Senior Software Developer.</div>
          </div>
          <div className="flex gap-8">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all opacity-80 hover:opacity-100 font-['Inter'] text-sm tracking-wide" href="#">Twitter</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all opacity-80 hover:opacity-100 font-['Inter'] text-sm tracking-wide" href="#">LinkedIn</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-yellow-500 underline decoration-2 underline-offset-4 transition-all opacity-80 hover:opacity-100 font-['Inter'] text-sm tracking-wide" href="#">Read.cv</a>
          </div>
        </div>
      </footer>

      {/* Nomad Badge — desktop only */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 bg-white/70 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-[0_8px_32px_rgba(109,94,0,0.12)] border border-white/20 items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-xs font-bold font-label text-on-background">Currently in Istanbul</span>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center p-4">
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-black uppercase">Anasayfa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="/#projects">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-black uppercase">Projects</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-zinc-900 border-b-4 border-yellow-400 pb-1" href="/blog">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
          <span className="text-[10px] font-black uppercase">Writing</span>
        </a>
      </div>
    </div>
  );
}
