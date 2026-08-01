// Minimal frontmatter parser/serializer for the site's flat frontmatter format
// (string fields + a flat tags array). Matches files under src/content/blog/.

const FIELD_ORDER = [
  "title",
  "slug",
  "lang",
  "date",
  "category",
  "excerpt",
  "readTime",
  "coverImage",
  "mediumUrl",
  "tags",
];

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { frontmatter: {}, content: raw.trim() };
  const frontmatter = {};
  m[1].split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) return;
    const key = kv[1];
    let value = kv[2].trim();
    if (value.startsWith("[")) {
      try {
        frontmatter[key] = JSON.parse(value.replace(/'/g, '"'));
      } catch (e) {
        frontmatter[key] = [];
      }
      return;
    }
    value = value.replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
    frontmatter[key] = value;
  });
  return { frontmatter, content: m[2].replace(/^\s*\n/, "").trim() };
}

function serialize(frontmatter, content) {
  const esc = (s) => String(s).replace(/"/g, '\\"');
  const lines = ["---"];
  const keys = [
    ...FIELD_ORDER.filter((k) => frontmatter[k] !== undefined && frontmatter[k] !== ""),
    ...Object.keys(frontmatter).filter(
      (k) => !FIELD_ORDER.includes(k) && frontmatter[k] !== undefined && frontmatter[k] !== ""
    ),
  ];
  keys.forEach((key) => {
    const value = frontmatter[key];
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => `"${esc(v)}"`).join(", ")}]`);
    } else {
      lines.push(`${key}: "${esc(value)}"`);
    }
  });
  lines.push("---", "", (content || "").trim(), "");
  return lines.join("\n");
}

function validSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function validLang(lang) {
  return lang === "tr" || lang === "en";
}

module.exports = { parse, serialize, validSlug, validLang };
