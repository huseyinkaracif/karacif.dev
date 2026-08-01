const API = "https://api.github.com";

function config() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "master";
  if (!token || !repo) throw new Error("GITHUB_TOKEN / GITHUB_REPO env is not configured");
  return { token, repo, branch };
}

async function gh(path, options = {}) {
  const { token } = config();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function getFile(filePath) {
  const { repo, branch } = config();
  const data = await gh(`/repos/${repo}/contents/${encodeURI(filePath)}?ref=${branch}`);
  if (!data) return null;
  return {
    sha: data.sha,
    content: Buffer.from(data.content, "base64").toString("utf-8"),
  };
}

async function listDir(dirPath) {
  const { repo, branch } = config();
  const data = await gh(`/repos/${repo}/contents/${encodeURI(dirPath)}?ref=${branch}`);
  if (!data) return [];
  return data.filter((f) => f.type === "file").map((f) => ({ name: f.name, sha: f.sha }));
}

async function putFile(filePath, content, message, sha) {
  const { repo, branch } = config();
  return gh(`/repos/${repo}/contents/${encodeURI(filePath)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf-8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

async function deleteFile(filePath, message, sha) {
  const { repo, branch } = config();
  return gh(`/repos/${repo}/contents/${encodeURI(filePath)}`, {
    method: "DELETE",
    body: JSON.stringify({ message, branch, sha }),
  });
}

module.exports = { getFile, listDir, putFile, deleteFile };
