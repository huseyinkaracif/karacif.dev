const { requireAuth } = require("./_lib/auth");
const { getFile, listDir, putFile, deleteFile } = require("./_lib/github");
const { parse, serialize, validSlug, validLang } = require("./_lib/markdown");

const BLOG_DIR = "src/content/blog";

function filePath(lang, slug) {
  return `${BLOG_DIR}/${lang}/${slug}.md`;
}

module.exports = async (req, res) => {
  if (!requireAuth(req, res)) return;

  try {
    if (req.method === "GET") {
      const { slug, lang } = req.query;

      // Single post
      if (slug && lang) {
        if (!validSlug(slug) || !validLang(lang)) return res.status(400).json({ error: "Geçersiz slug/lang" });
        const file = await getFile(filePath(lang, slug));
        if (!file) return res.status(404).json({ error: "Yazı bulunamadı" });
        const { frontmatter, content } = parse(file.content);
        return res.status(200).json({ slug, lang, ...frontmatter, tags: frontmatter.tags || [], content });
      }

      // List all posts (both languages, grouped by slug)
      const [trFiles, enFiles] = await Promise.all([listDir(`${BLOG_DIR}/tr`), listDir(`${BLOG_DIR}/en`)]);
      const bySlug = {};
      const collect = (files, lang) => {
        files
          .filter((f) => f.name.endsWith(".md"))
          .forEach((f) => {
            const slug = f.name.replace(/\.md$/, "");
            bySlug[slug] = bySlug[slug] || { slug, langs: [] };
            bySlug[slug].langs.push(lang);
          });
      };
      collect(trFiles, "tr");
      collect(enFiles, "en");

      // fetch TR (or EN) frontmatter for listing metadata
      const posts = await Promise.all(
        Object.values(bySlug).map(async (entry) => {
          const lang = entry.langs.includes("tr") ? "tr" : "en";
          const file = await getFile(filePath(lang, entry.slug));
          const { frontmatter } = file ? parse(file.content) : { frontmatter: {} };
          return {
            slug: entry.slug,
            langs: entry.langs,
            title: frontmatter.title || entry.slug,
            date: frontmatter.date || "",
            category: frontmatter.category || "",
            coverImage: frontmatter.coverImage || "",
          };
        })
      );
      posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      return res.status(200).json(posts);
    }

    if (req.method === "POST" || req.method === "PUT") {
      const { slug, lang, content, ...frontmatter } = req.body || {};
      if (!validSlug(slug) || !validLang(lang)) return res.status(400).json({ error: "Geçersiz slug/lang" });
      if (!frontmatter.title) return res.status(400).json({ error: "title zorunlu" });

      const path = filePath(lang, slug);
      const existing = await getFile(path);
      if (req.method === "POST" && existing) return res.status(409).json({ error: "Bu yazı zaten mevcut" });
      if (req.method === "PUT" && !existing) return res.status(404).json({ error: "Yazı bulunamadı" });

      const fm = { ...frontmatter, slug, lang };
      delete fm.langs;
      const raw = serialize(fm, content);
      const action = req.method === "POST" ? "add" : "update";
      await putFile(path, raw, `content: ${action} ${slug} (${lang}) via admin`, existing ? existing.sha : undefined);
      return res.status(req.method === "POST" ? 201 : 200).json({ ok: true, slug, lang });
    }

    if (req.method === "DELETE") {
      const { slug, lang } = req.query;
      if (!validSlug(slug) || !validLang(lang)) return res.status(400).json({ error: "Geçersiz slug/lang" });
      const path = filePath(lang, slug);
      const existing = await getFile(path);
      if (!existing) return res.status(404).json({ error: "Yazı bulunamadı" });
      await deleteFile(path, `content: delete ${slug} (${lang}) via admin`, existing.sha);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
