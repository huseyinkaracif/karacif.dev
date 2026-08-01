const SITE_URL = "https://huseyinkaracif.com";

const ROUTES = {
  tr: {
    home: "/",
    projects: "/projeler/",
    blog: "/yazilar/",
    post: (slug) => `/yazilar/${slug}/`,
  },
  en: {
    home: "/en/",
    projects: "/en/projects/",
    blog: "/en/writing/",
    post: (slug) => `/en/writing/${slug}/`,
  },
};

const LOCALES = { tr: "tr-TR", en: "en-US" };
const OG_LOCALES = { tr: "tr_TR", en: "en_US" };

module.exports = { SITE_URL, ROUTES, LOCALES, OG_LOCALES };
