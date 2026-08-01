const { checkPassword, createToken, authCookie } = require("./_lib/auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { password } = req.body || {};
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 600));
    return res.status(401).json({ error: "Hatalı şifre" });
  }
  res.setHeader("Set-Cookie", authCookie(createToken()));
  res.status(200).json({ ok: true });
};
