import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, navigate } from "gatsby";
import { translations } from "../translations";

export default function Search({ lang = "tr" }) {
  const t = (translations[lang] || translations.tr).search;
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);
  const indexRef = useRef(null);
  const inputRef = useRef(null);

  const loadIndex = useCallback(async () => {
    if (indexRef.current) return indexRef.current;
    const res = await fetch(`/search-${lang}.json`);
    indexRef.current = res.ok ? await res.json() : [];
    return indexRef.current;
  }, [lang]);

  const runSearch = useCallback(async (q) => {
    const needle = q.trim().toLocaleLowerCase(locale);
    if (needle.length < 2) { setResults([]); return; }
    const index = await loadIndex();
    const tokens = needle.split(/\s+/).filter((w) => w.length >= 2);
    const scored = [];
    for (const post of index) {
      const title = post.t.toLocaleLowerCase(locale);
      const excerpt = post.e.toLocaleLowerCase(locale);
      let score = 0;
      let matchedAll = true;
      for (const token of tokens) {
        let tokenScore = 0;
        if (title.includes(token)) tokenScore += 6;
        if (post.k.includes(token)) tokenScore += 3;
        if (excerpt.includes(token)) tokenScore += 2;
        if (post.b.includes(token)) tokenScore += 1;
        if (tokenScore === 0) { matchedAll = false; break; }
        score += tokenScore;
      }
      if (matchedAll) scored.push([score, post]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    setResults(scored.slice(0, 8).map(([, p]) => p));
    setSelected(0);
  }, [loadIndex, locale]);

  useEffect(() => { runSearch(query); }, [query, runSearch]);

  // ⌘K / Ctrl+K opens, Esc closes
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setResults([]);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && results[selected]) { setOpen(false); navigate(results[selected].u); }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t.label}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-background hover:bg-surface-container-high transition-all duration-200 active:scale-90"
      >
        <span className="material-symbols-outlined text-[22px]">search</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm flex items-start justify-center px-4 pt-[12vh]"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label={t.label}
        >
          <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-outline-variant/15">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={t.placeholder}
                className="w-full py-4 bg-transparent text-on-background text-base focus:outline-none placeholder:text-on-surface-variant/60"
              />
              <kbd className="hidden md:block text-[10px] font-bold text-on-surface-variant border border-outline-variant/30 rounded px-1.5 py-0.5 shrink-0">ESC</kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto">
              {query.trim().length >= 2 && results.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-on-surface-variant">{t.empty}</p>
              )}
              {results.map((post, i) => (
                <Link
                  key={post.u}
                  to={post.u}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setSelected(i)}
                  className={`block px-5 py-3.5 border-b border-outline-variant/10 last:border-0 transition-colors ${i === selected ? "bg-primary-container/40" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-headline font-bold text-sm text-on-background leading-snug">{post.t}</p>
                    <span className="text-[10px] font-black font-label tracking-widest uppercase text-primary shrink-0">{post.c}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mt-1">{post.e}</p>
                </Link>
              ))}
              {query.trim().length < 2 && (
                <p className="px-5 py-8 text-center text-sm text-on-surface-variant/70">{t.hint}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
