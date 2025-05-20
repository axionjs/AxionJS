"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "axionjs-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (typeof localStorage !== "undefined" &&
        (localStorage.getItem(storageKey) as Theme)) ||
      defaultTheme
  );

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  // Function to get the resolved theme (either explicit or system-derived)
  const getResolvedTheme = (themeValue: Theme): "dark" | "light" => {
    if (themeValue === "system") {
      return typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return themeValue;
  };

  // Initialize and update the theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const resolved = getResolvedTheme(theme);
    setResolvedTheme(resolved);

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);

    // Set data-theme attribute for Fumadocs and other libraries
    root.setAttribute("data-theme", resolved);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";
      setResolvedTheme(resolved);

      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);

      root.setAttribute("data-theme", resolved);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (themeValue: Theme) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, themeValue);
      }
      setTheme(themeValue);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
