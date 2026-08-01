import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

export const Head = () => (
  <>
    <title>Sayfa Bulunamadı | Hüseyin Karacif</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);

export default function NotFoundPage({ location }) {
  const isEn = location && location.pathname.startsWith("/en/");
  const lang = isEn ? "en" : "tr";

  return (
    <Layout lang={lang} altPath={isEn ? "/" : "/en/"}>
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center min-h-[70vh]">
        <div className="inline-block bg-primary-container px-4 py-1 rounded-full mb-6">
          <span className="text-xs font-black font-label tracking-[0.2em] text-on-primary-container uppercase">{isEn ? "ERROR 404" : "HATA 404"}</span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black font-headline tracking-tighter leading-none text-on-background mb-4">
          {isEn ? <>Lost <span className="text-primary italic">Page</span></> : <>Kayıp <span className="text-primary italic">Sayfa</span></>}
        </h1>
        <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
          {isEn ? "The page you are looking for doesn't exist or may have moved." : "Aradığınız sayfa bulunamadı ya da taşınmış olabilir."}
        </p>
        <Link to={isEn ? "/en/" : "/"} className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 bg-primary-container text-on-primary-container rounded-xl font-black font-headline text-base md:text-lg active:scale-95 transition-all">
          {isEn ? "Back to Home" : "Anasayfaya Dön"}
        </Link>
      </main>
    </Layout>
  );
}
