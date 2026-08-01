import React, { createContext, useContext, useState, useEffect } from "react";

const SiteContext = createContext({});

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("hk_theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
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
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <SiteContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context || Object.keys(context).length === 0) {
    return { theme: "light", toggleTheme: () => {} };
  }
  return context;
};
