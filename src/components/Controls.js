import React from "react";
import { useSite } from "../context/SiteContext";

export default function Controls() {
  const { theme, toggleTheme, lang, switchLang } = useSite();
  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-[5.5rem] md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-2 items-end">
      {/* Theme + Lang pill */}
      <div className="flex items-center gap-1 bg-surface-container-high/90 dark:bg-surface-container/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-outline-variant/20 p-1.5">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-primary-container hover:text-on-primary-container active:scale-90 text-on-surface-variant"
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-outline-variant/30" />

        {/* Language switcher */}
        <div className="flex items-center gap-0.5 px-0.5">
          <button
            onClick={() => switchLang("tr")}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black font-label tracking-widest uppercase transition-all duration-200 active:scale-90 ${
              lang === "tr"
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => switchLang("en")}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-black font-label tracking-widest uppercase transition-all duration-200 active:scale-90 ${
              lang === "en"
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
