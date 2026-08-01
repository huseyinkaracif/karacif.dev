import React from "react";
import "./src/styles/global.css";
import { SiteProvider } from "./src/context/SiteContext";

export const wrapRootElement = ({ element }) => (
  <SiteProvider>{element}</SiteProvider>
);

// Language switch navigates to the same page in the other language —
// keep the scroll position so it feels like an instant in-place swap.
export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.state && location.state.preserveScroll) return false;
  return true;
};
