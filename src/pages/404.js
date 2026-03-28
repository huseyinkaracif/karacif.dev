import React from "react";
import { Link } from "gatsby";

export const Head = () => (
  <>
    <title>Sayfa Bulunamadı | Hüseyin Karacif</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);

export default function NotFoundPage() {
  return (
    <div className="bg-background font-body text-on-background antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(109,94,0,0.08)] dark:shadow-none">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-yellow-500 transition-colors font-headline" href="/">
            Karacif.dev
          </Link>
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
            <Link className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" to="/">Anasayfa</Link>
            <Link className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" to="/projeler">Projeler</Link>
            <Link className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" to="/yazilar">Yazılar</Link>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1" href="https://www.linkedin.com/in/huseyin-karacif" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center pt-20 pb-24 px-6 text-center">
        <div className="inline-block bg-primary-container px-4 py-1 rounded-full mb-6">
          <span className="text-xs font-black font-label tracking-[0.2em] text-on-primary-container uppercase">HATA 404</span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black font-headline tracking-tighter leading-none text-on-background mb-4">
          Kayıp <span className="text-primary italic">Sayfa</span>
        </h1>
        <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
          Aradığınız sayfa bulunamadı ya da taşınmış olabilir.
        </p>
        <Link to="/" className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 bg-primary-container text-on-primary-container rounded-xl font-black font-headline text-base md:text-lg active:scale-95 transition-all">
          Anasayfaya Dön
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-950 w-full pt-4 md:pt-6 px-6 pb-24 md:pb-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-black text-zinc-900 dark:text-zinc-50 font-headline text-xl">Karacif.dev</span>
            <p className="font-['Inter'] text-sm tracking-wide text-zinc-500 dark:text-zinc-400">© 2026 Hüseyin Karacif. Kıdemli Yazılım Geliştirici.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex justify-around items-center p-4">
        <Link className="flex flex-col items-center gap-1 text-zinc-500" to="/">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-black uppercase">Anasayfa</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-zinc-500" to="/projeler">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-black uppercase">Projeler</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-zinc-500" to="/yazilar">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[10px] font-black uppercase">Yazılar</span>
        </Link>
        <a className="flex flex-col items-center gap-1 text-zinc-500" href="https://github.com/huseyinkaracif" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined">code</span>
          <span className="text-[10px] font-black uppercase">GitHub</span>
        </a>
      </div>
    </div>
  );
}
