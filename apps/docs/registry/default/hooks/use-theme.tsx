"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

/**
 * A hook for managing theme with system preference detection
 * @param defaultTheme The default theme
 * @returns Theme state and actions
 */
export function useTheme(defaultTheme: Theme = "system") {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

  // Use localStorage to persist theme preference
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []);

  // Update localStorage and document class when theme changes
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("theme", theme);

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen for system theme changes
  React.useEffect(() => {
    if (typeof window === "undefined" || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = React.useCallback((theme: Theme) => {
    setThemeState(theme);
  }, []);

  return { theme, setTheme };
}
