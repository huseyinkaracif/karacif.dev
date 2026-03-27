import React, { useEffect } from "react";

// /home → redirect to /
export default function HomeLegacy() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}
