import React from "react";
import { graphql } from "gatsby";
import { translations } from "../translations";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

function Tags({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {tags.map((tag) => (
        <span key={tag} className="text-[10px] font-bold font-label tracking-wider uppercase bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Projects({ data, pageContext }) {
  const { lang, altPath } = pageContext;
  const t = translations[lang] || translations.tr;
  const projects = data.allProjectsJson.nodes;
  const products = projects.filter((p) => p.kind !== "oss");
  const oss = projects.filter((p) => p.kind === "oss");
  const [showcase, ...restProducts] = products;

  const L = (p, key) => (lang === "en" ? (p[`${key}_en`] || p[key]) : p[key]);

  return (
    <Layout lang={lang} active="projects" altPath={altPath}>
      <main className="pt-20 md:pt-24 pb-8 md:pb-0 max-w-7xl mx-auto px-6 w-full">
        {/* Hero */}
        <header className="mb-8 md:mb-12 pt-4 md:pt-6 reveal">
          <div className="inline-block bg-primary-container px-4 py-1 rounded-full mb-4">
            <span className="text-xs font-black font-label tracking-[0.2em] text-on-primary-container uppercase">{t.projects.pageLabel}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-headline tracking-tighter leading-[0.9] text-on-background mb-4">
            Hüseyin <span className="text-primary italic">Karacif</span><br />{t.projects.pageTitle}
          </h1>
          <p className="text-base md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            {t.projects.pageSub}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            {[
              [products.length, t.projects.statProducts],
              [oss.length, t.projects.statOss],
              ["7+", t.projects.statYears],
            ].map(([num, label]) => (
              <div key={label} className="border-l-4 border-primary/60 pl-4">
                <p className="text-2xl md:text-3xl font-black font-headline leading-none">{num}</p>
                <p className="text-[11px] font-bold font-label tracking-widest uppercase text-on-surface-variant mt-1">{label}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── Products & Platforms ── */}
        <section className="pb-10 md:pb-16">
          <h2 className="text-2xl md:text-3xl font-black font-headline tracking-tighter mb-6 reveal">
            {t.projects.productsTitle} <span className="text-primary">.</span>
          </h2>

          {/* Showcase card */}
          {showcase && (
            <a
              href={showcase.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container hover:shadow-[0_24px_56px_rgba(109,94,0,0.14)] hover:-translate-y-1 transition-all duration-300 mb-6 md:mb-8"
            >
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[380px]">
                <img
                  src={showcase.image}
                  alt={L(showcase, "title")}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-primary-container text-on-primary-container px-2.5 py-1 rounded">{L(showcase, "category")}</span>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2.5 py-1 rounded text-on-surface-variant">{showcase.year}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black font-headline tracking-tight group-hover:text-primary transition-colors duration-200 mb-3">
                  {L(showcase, "title")}
                </h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                  {L(showcase, "description")}
                </p>
                <Tags tags={showcase.tags} />
                <div className="flex items-center gap-1.5 mt-6 text-sm font-bold font-headline text-primary">
                  {t.projects.viewProject}
                  <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                </div>
              </div>
            </a>
          )}

          {/* Rest of products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {restProducts.map((project, i) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex flex-col rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container hover:shadow-[0_20px_48px_rgba(109,94,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/3] shrink-0">
                  <img
                    src={project.image}
                    alt={L(project, "title")}
                    loading={i > 1 ? "lazy" : undefined}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[11px] font-black font-headline text-zinc-900">{String(i + 2).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{L(project, "category")}</span>
                    <span className="text-[10px] font-black tracking-widest uppercase bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">{project.year}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black font-headline tracking-tight group-hover:text-primary transition-colors duration-200 mb-2">
                    {L(project, "title")}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                    {L(project, "description")}
                  </p>
                  <Tags tags={project.tags} />
                  <div className="flex items-center gap-1 mt-4 pt-4 border-t border-outline-variant/10 text-sm font-bold font-headline group-hover:text-primary transition-colors duration-200">
                    {t.projects.viewProject}
                    <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">north_east</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Open Source ── */}
        {oss.length > 0 && (
          <section className="pb-10 md:pb-16">
            <div className="flex items-end justify-between mb-6 reveal">
              <div>
                <h2 className="text-2xl md:text-3xl font-black font-headline tracking-tighter">
                  {t.projects.ossTitle} <span className="text-primary">.</span>
                </h2>
                <p className="text-on-surface-variant text-sm mt-1">{t.projects.ossSub}</p>
              </div>
              <a
                href="https://github.com/huseyinkaracif?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 font-headline font-bold text-sm text-on-surface-variant hover:text-primary transition-colors group"
              >
                GitHub <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {oss.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal group flex flex-col rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-[2/1] shrink-0 bg-surface-container-highest">
                    <img
                      src={repo.image}
                      alt={L(repo, "title")}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-black font-headline tracking-tight group-hover:text-primary transition-colors duration-200">
                        {L(repo, "title")}
                      </h3>
                      <svg className="w-4 h-4 fill-current text-on-surface-variant group-hover:text-primary transition-colors shrink-0" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">
                      {L(repo, "description")}
                    </p>
                    <Tags tags={repo.tags} />
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile GitHub link */}
            <a
              href="https://github.com/huseyinkaracif?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex items-center justify-center gap-2 w-full py-3 mt-6 border border-outline-variant rounded-xl font-headline font-bold text-sm text-on-surface hover:border-primary/50 transition-colors"
            >
              GitHub <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </section>
        )}

        {/* CTA */}
        <section className="mb-8 md:mb-12 reveal">
          <div className="bg-zinc-950 dark:bg-zinc-900 rounded-2xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-black font-headline tracking-tighter text-white mb-5 md:mb-8">
                {lang === "tr" ? (
                  <>Birlikte <span className="text-primary-container">büyük bir şey</span> inşa edelim.</>
                ) : (
                  <>{"Let's build the "}<span className="text-primary-container">{"next big thing"}</span>{" together."}</>
                )}
              </h2>
              <a className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 bg-primary-container text-on-primary-container rounded-xl font-black font-headline text-sm md:text-base active:scale-95 transition-all" href="mailto:karacif.dev@gmail.com">
                {t.projects.ctaBtn}
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const Head = ({ pageContext }) => {
  const { lang, trPath, enPath } = pageContext;
  const title = lang === "tr" ? "Projeler | Hüseyin Karacif" : "Projects | Hüseyin Karacif";
  const description = lang === "tr"
    ? "Biletleme platformundan depo yönetim sistemine, MCP sunucularından mobil uygulamalara: Hüseyin Karacif'in ürünleri ve açık kaynak projeleri."
    : "From ticketing platforms to warehouse management, MCP servers to mobile apps: products and open-source projects by Hüseyin Karacif.";
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
  query ProjectsListQuery {
    allProjectsJson {
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
        kind
        tags
      }
    }
  }
`;
