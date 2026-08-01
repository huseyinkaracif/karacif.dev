import React, { useCallback, useEffect, useState } from "react";

export const Head = () => (
  <>
    <title>Admin | Hüseyin Karacif</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);

const EMPTY_POST = {
  title: "",
  date: new Date().toISOString().split("T")[0],
  category: "",
  excerpt: "",
  readTime: "5",
  coverImage: "",
  mediumUrl: "",
  tags: [],
  content: "",
};

const api = async (path, options = {}) => {
  const res = await fetch(`/api${path}`, {
    credentials: "same-origin",
    headers: options.body ? { "Content-Type": "application/json" } : {},
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Hata (${res.status})`);
  return data;
};

const inputCls =
  "w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm text-on-background focus:outline-none focus:border-primary/60 transition-colors";
const labelCls = "block text-[11px] font-black font-label tracking-widest uppercase text-on-surface-variant mb-1.5";
const btnPrimary =
  "bg-primary-container text-on-primary-container px-5 py-2.5 rounded-xl font-headline font-extrabold text-sm active:scale-95 transition-all disabled:opacity-50";
const btnGhost =
  "border border-outline-variant/30 text-on-surface-variant hover:text-on-background hover:border-primary/50 px-4 py-2 rounded-xl font-headline font-bold text-sm transition-colors";

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl shadow-2xl text-sm font-bold ${toast.error ? "bg-red-600 text-white" : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"}`}>
      {toast.message}
    </div>
  );
}

function Login({ onSuccess, notify }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/login", { method: "POST", body: JSON.stringify({ password }) });
      onSuccess();
    } catch (err) {
      notify(err.message, true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-surface-container rounded-2xl border border-outline-variant/15 p-8 shadow-xl">
        <h1 className="font-headline font-black text-2xl tracking-tight mb-1">Admin Panel</h1>
        <p className="text-on-surface-variant text-sm mb-6">Karacif.dev yönetim paneli</p>
        <label className={labelCls} htmlFor="admin-password">Şifre</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
          autoFocus
        />
        <button type="submit" disabled={busy || !password} className={`${btnPrimary} w-full mt-5`}>
          {busy ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

function PostEditor({ slug, initialLang, onClose, notify }) {
  const [lang, setLang] = useState(initialLang || "tr");
  const [exists, setExists] = useState({ tr: false, en: false });
  const [form, setForm] = useState(EMPTY_POST);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (l) => {
    setLoading(true);
    try {
      const data = await api(`/posts?slug=${slug}&lang=${l}`);
      setForm({ ...EMPTY_POST, ...data, tags: data.tags || [] });
      setExists((e) => ({ ...e, [l]: true }));
    } catch (err) {
      setForm((prev) => ({ ...EMPTY_POST, title: prev.title, date: prev.date, coverImage: prev.coverImage, mediumUrl: prev.mediumUrl, tags: prev.tags }));
      setExists((e) => ({ ...e, [l]: false }));
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { load(lang); }, [lang, load]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setBusy(true);
    try {
      const payload = { ...form, slug, lang, tags: Array.isArray(form.tags) ? form.tags : String(form.tags).split(",").map((t) => t.trim()).filter(Boolean) };
      delete payload.langs;
      await api("/posts", { method: exists[lang] ? "PUT" : "POST", body: JSON.stringify(payload) });
      setExists((e) => ({ ...e, [lang]: true }));
      notify("Kaydedildi ✓ — deploy tetiklendi, ~2 dk içinde yayında");
    } catch (err) {
      notify(err.message, true);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`${slug} (${lang.toUpperCase()}) silinsin mi? Bu işlem repo'ya commit olarak gider.`)) return;
    setBusy(true);
    try {
      await api(`/posts?slug=${slug}&lang=${lang}`, { method: "DELETE" });
      notify("Silindi ✓");
      onClose(true);
    } catch (err) {
      notify(err.message, true);
      setBusy(false);
    }
  };

  return (
    <div className="bg-surface-container rounded-2xl border border-outline-variant/15 p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => onClose(false)} className={btnGhost} aria-label="Geri">←</button>
          <div>
            <h2 className="font-headline font-black text-lg leading-tight">{form.title || slug}</h2>
            <code className="text-xs text-on-surface-variant">{slug}</code>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["tr", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-2 rounded-xl text-xs font-black font-label tracking-widest uppercase transition-all ${lang === l ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant"}`}
            >
              {l.toUpperCase()} {exists[l] ? "" : "∅"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-on-surface-variant text-sm py-10 text-center">Yükleniyor...</p>
      ) : (
        <>
          {!exists[lang] && (
            <p className="mb-4 text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg px-3 py-2">
              Bu yazının {lang.toUpperCase()} sürümü henüz yok — kaydettiğinde oluşturulacak.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className={labelCls}>Başlık</label>
              <input className={inputCls} value={form.title} onChange={set("title")} />
            </div>
            <div>
              <label className={labelCls}>Tarih</label>
              <input className={inputCls} type="date" value={form.date} onChange={set("date")} />
            </div>
            <div>
              <label className={labelCls}>Kategori</label>
              <input className={inputCls} value={form.category} onChange={set("category")} placeholder={lang === "tr" ? "Yapay Zeka" : "AI"} />
            </div>
            <div>
              <label className={labelCls}>Okuma Süresi (dk)</label>
              <input className={inputCls} value={form.readTime} onChange={set("readTime")} />
            </div>
            <div>
              <label className={labelCls}>Kapak Görseli</label>
              <input className={inputCls} value={form.coverImage} onChange={set("coverImage")} placeholder="/images/blog/.../cover.jpg" />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Özet</label>
              <textarea className={`${inputCls} h-20`} value={form.excerpt} onChange={set("excerpt")} />
            </div>
            <div>
              <label className={labelCls}>Medium URL</label>
              <input className={inputCls} value={form.mediumUrl} onChange={set("mediumUrl")} />
            </div>
            <div>
              <label className={labelCls}>Etiketler (virgülle)</label>
              <input
                className={inputCls}
                value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>İçerik (Markdown)</label>
              <textarea
                className={`${inputCls} h-[28rem] font-mono text-xs leading-relaxed`}
                value={form.content}
                onChange={set("content")}
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <button onClick={save} disabled={busy || !form.title} className={btnPrimary}>
              {busy ? "Kaydediliyor..." : exists[lang] ? "Kaydet" : `${lang.toUpperCase()} Sürümünü Oluştur`}
            </button>
            {exists[lang] && (
              <button onClick={remove} disabled={busy} className="text-red-600 dark:text-red-400 text-sm font-bold hover:underline">
                Bu sürümü sil
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function NewPost({ onCreated, notify }) {
  const [slug, setSlug] = useState("");
  const clean = slug
    .toLowerCase()
    .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİI]/g, "i")
    .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <div className="bg-surface-container rounded-2xl border border-outline-variant/15 p-6 mb-6">
      <h3 className="font-headline font-black text-base mb-3">Yeni Yazı</h3>
      <div className="flex gap-3 flex-wrap items-end">
        <div className="flex-grow min-w-[240px]">
          <label className={labelCls}>Slug (URL)</label>
          <input className={inputCls} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ornek-yazi-basligi" />
          {clean && clean !== slug && <p className="text-xs text-on-surface-variant mt-1">Kullanılacak: <code>{clean}</code></p>}
        </div>
        <button
          className={btnPrimary}
          disabled={!clean}
          onClick={() => { onCreated(clean); setSlug(""); }}
        >
          Editörü Aç
        </button>
      </div>
    </div>
  );
}

function Posts({ notify }) {
  const [posts, setPosts] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    try {
      setPosts(await api("/posts"));
    } catch (err) {
      notify(err.message, true);
      setPosts([]);
    }
  }, [notify]);

  useEffect(() => { load(); }, [load]);

  if (editing) {
    return (
      <PostEditor
        slug={editing}
        initialLang="tr"
        notify={notify}
        onClose={(changed) => { setEditing(null); if (changed) load(); }}
      />
    );
  }

  return (
    <>
      <NewPost notify={notify} onCreated={(slug) => setEditing(slug)} />
      {posts === null ? (
        <p className="text-on-surface-variant text-sm py-10 text-center">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {posts.map((p) => (
            <button
              key={p.slug}
              onClick={() => setEditing(p.slug)}
              className="text-left bg-surface-container hover:bg-surface-container-high border border-outline-variant/15 hover:border-primary/40 rounded-2xl p-4 flex items-center gap-4 transition-all"
            >
              {p.coverImage ? (
                <img src={p.coverImage} alt="" className="w-16 h-11 object-cover rounded-lg shrink-0" />
              ) : (
                <div className="w-16 h-11 rounded-lg bg-surface-container-highest shrink-0" />
              )}
              <div className="flex-grow min-w-0">
                <p className="font-headline font-bold text-sm leading-snug truncate">{p.title}</p>
                <p className="text-xs text-on-surface-variant">{p.date} · {p.category}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                {["tr", "en"].map((l) => (
                  <span key={l} className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${p.langs.includes(l) ? "bg-primary-container text-on-primary-container" : "bg-surface-container-highest text-on-surface-variant/50"}`}>
                    {l}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Projects({ notify }) {
  const [projects, setProjects] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/projects").then(setProjects).catch((err) => { notify(err.message, true); setProjects([]); });
  }, [notify]);

  const set = (i, key) => (e) => {
    const value = key === "featured" ? e.target.checked : e.target.value;
    setProjects((list) => list.map((p, j) => (j === i ? { ...p, [key]: value } : p)));
  };

  const move = (i, dir) => {
    setProjects((list) => {
      const next = [...list];
      const j = i + dir;
      if (j < 0 || j >= next.length) return list;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const add = () => {
    const id = `proje-${Date.now()}`;
    setProjects((list) => [
      { id, title: "", title_en: "", category: "", category_en: "", year: String(new Date().getFullYear()), description: "", description_en: "", image: "", featured: false, colSpan: 6, link: "" },
      ...list,
    ]);
  };

  const removeAt = (i) => {
    if (!window.confirm("Proje silinsin mi?")) return;
    setProjects((list) => list.filter((_, j) => j !== i));
  };

  const save = async () => {
    setBusy(true);
    try {
      await api("/projects", { method: "PUT", body: JSON.stringify(projects) });
      notify("Kaydedildi ✓ — deploy tetiklendi");
    } catch (err) {
      notify(err.message, true);
    } finally {
      setBusy(false);
    }
  };

  if (projects === null) return <p className="text-on-surface-variant text-sm py-10 text-center">Yükleniyor...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={add} className={btnGhost}>+ Yeni Proje</button>
        <button onClick={save} disabled={busy} className={btnPrimary}>{busy ? "Kaydediliyor..." : "Tümünü Kaydet"}</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((p, i) => (
          <div key={p.id} className="bg-surface-container border border-outline-variant/15 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <code className="text-xs text-on-surface-variant">{p.id}</code>
              <div className="flex gap-1">
                <button onClick={() => move(i, -1)} className={btnGhost} aria-label="Yukarı">↑</button>
                <button onClick={() => move(i, 1)} className={btnGhost} aria-label="Aşağı">↓</button>
                <button onClick={() => removeAt(i)} className="text-red-600 dark:text-red-400 text-xs font-bold px-3">Sil</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className={labelCls}>Başlık (TR)</label><input className={inputCls} value={p.title} onChange={set(i, "title")} /></div>
              <div><label className={labelCls}>Title (EN)</label><input className={inputCls} value={p.title_en || ""} onChange={set(i, "title_en")} /></div>
              <div><label className={labelCls}>Kategori (TR)</label><input className={inputCls} value={p.category || ""} onChange={set(i, "category")} /></div>
              <div><label className={labelCls}>Category (EN)</label><input className={inputCls} value={p.category_en || ""} onChange={set(i, "category_en")} /></div>
              <div className="md:col-span-2"><label className={labelCls}>Açıklama (TR)</label><textarea className={`${inputCls} h-16`} value={p.description || ""} onChange={set(i, "description")} /></div>
              <div className="md:col-span-2"><label className={labelCls}>Description (EN)</label><textarea className={`${inputCls} h-16`} value={p.description_en || ""} onChange={set(i, "description_en")} /></div>
              <div><label className={labelCls}>Görsel URL</label><input className={inputCls} value={p.image || ""} onChange={set(i, "image")} /></div>
              <div><label className={labelCls}>Link</label><input className={inputCls} value={p.link || ""} onChange={set(i, "link")} /></div>
              <div><label className={labelCls}>Yıl</label><input className={inputCls} value={p.year || ""} onChange={set(i, "year")} /></div>
              <div className="flex items-center gap-2 pt-5">
                <input id={`featured-${p.id}`} type="checkbox" checked={Boolean(p.featured)} onChange={set(i, "featured")} className="w-4 h-4 accent-yellow-500" />
                <label htmlFor={`featured-${p.id}`} className="text-sm font-bold">Öne çıkan (anasayfa)</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(null);
  const [tab, setTab] = useState("posts");
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, error = false) => {
    setToast({ message, error });
    setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    api("/me").then((d) => setAuthed(d.authenticated)).catch(() => setAuthed(false));
  }, []);

  const logout = async () => {
    await api("/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
  };

  if (authed === null) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant font-body">Yükleniyor...</div>;
  }

  if (!authed) {
    return (
      <div className="bg-background font-body text-on-background antialiased">
        <Login onSuccess={() => setAuthed(true)} notify={notify} />
        <Toast toast={toast} />
      </div>
    );
  }

  return (
    <div className="bg-background font-body text-on-background antialiased min-h-screen">
      <header className="border-b border-outline-variant/15 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-headline font-black text-lg tracking-tight">Karacif.dev <span className="text-primary">Admin</span></span>
            <nav className="flex gap-1">
              {[["posts", "Yazılar"], ["projects", "Projeler"]].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-headline font-bold transition-all ${tab === key ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:text-on-background"}`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className={btnGhost}>Siteyi Gör</a>
            <button onClick={logout} className={btnGhost}>Çıkış</button>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        {tab === "posts" ? <Posts notify={notify} /> : <Projects notify={notify} />}
      </main>
      <Toast toast={toast} />
    </div>
  );
}
