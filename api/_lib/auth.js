const crypto = require("crypto");

const COOKIE_NAME = "hk_admin";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD env is not configured");
  return secret;
}

function sign(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function createToken() {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${sign(exp)}`;
}

function verifyToken(token) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((c) => c.trim().split("="))
      .filter((p) => p.length === 2)
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function isAuthenticated(req) {
  return verifyToken(parseCookies(req)[COOKIE_NAME]);
}

function requireAuth(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Yetkisiz. Lütfen giriş yapın." });
    return false;
  }
  return true;
}

function checkPassword(input) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

function authCookie(token) {
  const maxAge = Math.floor(TOKEN_TTL_MS / 1000);
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

function clearCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

module.exports = { createToken, isAuthenticated, requireAuth, checkPassword, authCookie, clearCookie };
