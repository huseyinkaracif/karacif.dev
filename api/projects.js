const { requireAuth } = require("./_lib/auth");
const { getFile, putFile } = require("./_lib/github");

const PROJECTS_PATH = "src/data/projects.json";

module.exports = async (req, res) => {
  if (!requireAuth(req, res)) return;

  try {
    if (req.method === "GET") {
      const file = await getFile(PROJECTS_PATH);
      return res.status(200).json(file ? JSON.parse(file.content) : []);
    }

    if (req.method === "PUT") {
      const projects = req.body;
      if (!Array.isArray(projects)) return res.status(400).json({ error: "Dizi bekleniyor" });
      for (const p of projects) {
        if (!p.id || !p.title) return res.status(400).json({ error: "Her projede id ve title zorunlu" });
      }
      const existing = await getFile(PROJECTS_PATH);
      await putFile(
        PROJECTS_PATH,
        JSON.stringify(projects, null, 2) + "\n",
        "content: update projects via admin",
        existing ? existing.sha : undefined
      );
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
