import React from "react";
import { SiteProvider } from "./src/context/SiteContext";

export const wrapRootElement = ({ element }) => (
  <SiteProvider>{element}</SiteProvider>
);

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var t = localStorage.getItem('hk_theme');
              if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        `,
      }}
    />,
  ]);
};
