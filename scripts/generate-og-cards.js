/**
 * Her blog yazısı için 1200×630 sosyal paylaşım kartı (PNG) üretir.
 * Çıktı: static/images/og/<lang>-<slug>.png  (repoya commit edilir)
 * Yeni yazı ekledikten sonra çalıştır: node scripts/generate-og-cards.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const BLOG = path.join(ROOT, "src/content/blog");
const OUT = path.join(ROOT, "static/images/og");

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  m[1].split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([A-Za-z_]+):\s*"?(.*?)"?\s*$/);
    if (kv) fm[kv[1]] = kv[2];
  });
  return fm;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapTitle(title, maxChars = 24) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  if (lines.length > 3) {
    lines.length = 3;
    lines[2] = lines[2].replace(/\s*\S*$/, "") + "…";
  }
  return lines;
}

function cardSvg({ title, category, lang }) {
  const lines = wrapTitle(title);
  const fontSize = lines.length === 1 ? 78 : lines.length === 2 ? 68 : 58;
  const lineHeight = fontSize * 1.18;
  const blockH = lines.length * lineHeight;
  const firstY = 315 - blockH / 2 + fontSize * 0.8;
  const titleText = lines
    .map((l, i) => `<text x="80" y="${(firstY + i * lineHeight).toFixed(0)}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="900" fill="#FAFAF8">${esc(l)}</text>`)
    .join("\n  ");
  const label = lang === "tr" ? "YAZI" : "ARTICLE";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#18181B"/>
  <circle cx="1120" cy="80" r="300" fill="#EAB308" opacity="0.07"/>
  <circle cx="1120" cy="80" r="180" fill="#EAB308" opacity="0.06"/>
  <text x="80" y="110" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="6" fill="#EAB308">${esc((category || label).toLocaleUpperCase(lang === "tr" ? "tr-TR" : "en-US"))}</text>
  ${titleText}
  <text x="80" y="545" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#A1A1AA">Hüseyin Karacif</text>
  <text x="1120" y="545" text-anchor="end" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#EAB308">huseyinkaracif.com</text>
  <rect x="0" y="595" width="1200" height="35" fill="#EAB308"/>
</svg>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let made = 0, skipped = 0;
  for (const lang of ["tr", "en"]) {
    const dir = path.join(BLOG, lang);
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const fm = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
      const slug = fm.slug || file.replace(/\.md$/, "");
      if (!fm.title) continue;
      const dest = path.join(OUT, `${lang}-${slug}.png`);
      if (process.argv.includes("--force") === false && fs.existsSync(dest)) { skipped++; continue; }
      const svg = cardSvg({ title: fm.title, category: fm.category, lang });
      await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(dest);
      made++;
    }
  }
  console.log(`og cards: ${made} generated, ${skipped} already existed → static/images/og/`);
})();
