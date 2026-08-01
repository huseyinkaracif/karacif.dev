const express = require("express");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const slugify = require("slugify");

const app = express();
const PORT = 3001;

const ROOT = path.resolve(__dirname, "..");
const PROJECTS_FILE = path.join(ROOT, "src", "data", "projects.json");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

app.use(express.json({ limit: "5mb" }));
app.use(express.static(path.join(__dirname, "public")));

// --- Projects API ---

app.get("/api/projects", (_req, res) => {
  const data = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
  res.json(data);
});

app.post("/api/projects", (req, res) => {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
  const project = req.body;
  if (!project.id || !project.title) {
    return res.status(400).json({ error: "id ve title zorunlu" });
  }
  if (projects.some((p) => p.id === project.id)) {
    return res.status(409).json({ error: "Bu id zaten mevcut" });
  }
  const newProject = {
    id: project.id,
    title: project.title || "",
    title_en: project.title_en || "",
    category: project.category || "",
    category_en: project.category_en || "",
    year: project.year || new Date().getFullYear().toString(),
    description: project.description || "",
    description_en: project.description_en || "",
    image: project.image || "",
    featured: project.featured || false,
    colSpan: parseInt(project.colSpan) || 6,
    link: project.link || "#",
  };
  projects.push(newProject);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  res.status(201).json(newProject);
});

app.put("/api/projects/:id", (req, res) => {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Proje bulunamadı" });
  projects[idx] = { ...projects[idx], ...req.body, id: req.params.id };
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  res.json(projects[idx]);
});

app.delete("/api/projects/:id", (req, res) => {
  let projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Proje bulunamadı" });
  projects.splice(idx, 1);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  res.json({ success: true });
});

// Reorder projects
app.put("/api/projects-reorder", (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: "ids array gerekli" });
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
  const map = Object.fromEntries(projects.map((p) => [p.id, p]));
  const reordered = ids.map((id) => map[id]).filter(Boolean);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(reordered, null, 2), "utf-8");
  res.json(reordered);
});

// --- Blog Posts API ---

function safeSlug(name) {
  return slugify(name, { lower: true, strict: true, locale: "tr" });
}

function validateSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function readPost(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".md");
  return { slug, ...data, content: content.trim() };
}

function writePost(slug, frontmatter, content) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(BLOG_DIR))) {
    throw new Error("Geçersiz dosya yolu");
  }
  const fm = { ...frontmatter };
  delete fm.slug;
  delete fm.content;
  const fileContent = matter.stringify(content || "", fm);
  fs.writeFileSync(filePath, fileContent, "utf-8");
}

app.get("/api/posts", (_req, res) => {
  if (!fs.existsSync(BLOG_DIR)) return res.json([]);
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) => {
    const post = readPost(path.join(BLOG_DIR, f));
    delete post.content;
    return post;
  });
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(posts);
});

app.get("/api/posts/:slug", (req, res) => {
  const slug = req.params.slug;
  if (!validateSlug(slug)) return res.status(400).json({ error: "Geçersiz slug" });
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Yazı bulunamadı" });
  res.json(readPost(filePath));
});

app.post("/api/posts", (req, res) => {
  const { title, title_en, date, category, category_en, excerpt, excerpt_en, readTime, coverImage, content } = req.body;
  if (!title) return res.status(400).json({ error: "title zorunlu" });
  const slug = safeSlug(title);
  if (!slug) return res.status(400).json({ error: "Geçerli bir slug oluşturulamadı" });
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) return res.status(409).json({ error: "Bu slug zaten mevcut" });
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
  const frontmatter = {
    title: title || "",
    title_en: title_en || "",
    date: date || new Date().toISOString().split("T")[0],
    category: category || "",
    category_en: category_en || "",
    excerpt: excerpt || "",
    excerpt_en: excerpt_en || "",
    readTime: readTime || "5",
    coverImage: coverImage || "",
  };
  writePost(slug, frontmatter, content || "");
  res.status(201).json({ slug, ...frontmatter });
});

app.put("/api/posts/:slug", (req, res) => {
  const slug = req.params.slug;
  if (!validateSlug(slug)) return res.status(400).json({ error: "Geçersiz slug" });
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Yazı bulunamadı" });
  const existing = readPost(filePath);
  const updated = { ...existing, ...req.body };
  const { content, slug: _s, ...frontmatter } = updated;
  writePost(slug, frontmatter, content || "");
  res.json({ slug, ...frontmatter });
});

app.delete("/api/posts/:slug", (req, res) => {
  const slug = req.params.slug;
  if (!validateSlug(slug)) return res.status(400).json({ error: "Geçersiz slug" });
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(BLOG_DIR))) {
    return res.status(400).json({ error: "Geçersiz dosya yolu" });
  }
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Yazı bulunamadı" });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

// --- Stats ---
app.get("/api/stats", (_req, res) => {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
  const posts = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")) : [];
  res.json({
    projectCount: projects.length,
    featuredCount: projects.filter((p) => p.featured).length,
    postCount: posts.length,
  });
});

// SPA fallback
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`\n  Admin Panel: http://localhost:${PORT}\n`);
});
