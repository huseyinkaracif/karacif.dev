import React from "react";
import "./src/styles/global.css";
import { SiteProvider } from "./src/context/SiteContext";

export const wrapRootElement = ({ element }) => (
  <SiteProvider>{element}</SiteProvider>
);
