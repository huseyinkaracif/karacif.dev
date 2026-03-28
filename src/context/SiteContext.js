import React, { createContext, useContext, useState, useEffect } from "react";

const SiteContext = createContext({});

export function SiteProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Init language
    const savedLang = localStorage.getItem("hk_lang") || "tr";
    setLang(savedLang);
    // Init theme
    const savedTheme = localStorage.getItem("hk_theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      if (initial === "dark") document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("hk_theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const switchLang = (l) => {
    setLang(l);
    localStorage.setItem("hk_lang", l);
  };

  return (
    <SiteContext.Provider value={{ lang, theme, toggleTheme, switchLang }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context || Object.keys(context).length === 0) {
    return { lang: "tr", theme: "light", toggleTheme: () => {}, switchLang: () => {} };
  }
  return context;
};
