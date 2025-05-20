"use client";

import { useTheme } from "./theme-provider";
import { useEffect } from "react";

/**
 * A utility to manually sync themes with Fumadocs by directly setting
 * the data-theme attribute on the document element
 */
export function ThemeSync() {
  const { resolvedTheme } = useTheme();

  // This effect runs when the component mounts and when the resolved theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    // Ensure both class and data-theme are set
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.setAttribute("data-theme", resolvedTheme);

    // Debug output to help diagnose issues
    console.debug(`ThemeSync: Setting theme to ${resolvedTheme}`);
  }, [resolvedTheme]);

  return null;
}

/**
 * A function to force theme sync, can be used in toggle functions
 */
export function forceThemeSync(theme: "light" | "dark" | "system") {
  if (typeof window === "undefined") return;

  const root = window.document.documentElement;

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    root.classList.remove("light", "dark");
    root.classList.add(systemTheme);
    root.setAttribute("data-theme", systemTheme);

    console.debug(`forceThemeSync: Setting system theme to ${systemTheme}`);
  } else {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);

    console.debug(`forceThemeSync: Setting explicit theme to ${theme}`);
  }
}

/**
 * A hook that returns the current theme from localStorage to check what's stored
 */
export function useStoredTheme(storageKey = "axionjs-theme") {
  useEffect(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return;

    const storedTheme = localStorage.getItem(storageKey);
    console.debug(
      `Current theme in localStorage (${storageKey}): ${storedTheme}`
    );
  }, [storageKey]);

  return null;
}
