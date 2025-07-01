"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextProps {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
  children,
}: {
  attribute: string;
  defaultTheme: "system" | "light" | "dark";
  enableSystem: boolean;
  disableTransitionOnChange: boolean;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(defaultTheme);

  useEffect(() => {
    if (enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }
  }, [enableSystem]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.setAttribute(attribute, theme);
  }, [attribute, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
