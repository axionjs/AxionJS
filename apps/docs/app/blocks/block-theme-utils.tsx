"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme as useAppTheme } from "./theme-provider";

// Primary color themes (only these colors will change)
// Modified to align with your global CSS for dark mode
export const primaryColorThemes = {
  default: {
    name: "Default",
    light: {
      "--primary": "0 0% 9%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "0 0% 98%", // dark background
      "--primary-foreground": "240 5.9% 10%", // light text
    },
  },

  red: {
    name: "Red",
    light: {
      "--primary": "0 84% 50%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "0 84% 60%",
      "--primary-foreground": "240 5.9% 10%",
    },
  },
  rose: {
    name: "Rose",
    light: {
      "--primary": "347 77% 50%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "347 77% 60%",
      "--primary-foreground": "240 5.9% 10%",
    },
  },
  orange: {
    name: "Orange",
    light: {
      "--primary": "24 95% 54%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "24 95% 64%",
      "--primary-foreground": "240 5.9% 10%",
    },
  },
  green: {
    name: "Green",
    light: {
      "--primary": "142 76% 36%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "142 76% 46%",
      "--primary-foreground": "240 5.9% 10%",
    },
  },
  blue: {
    name: "Blue",
    light: {
      "--primary": "217 91% 60%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "217 91% 70%",
      "--primary-foreground": "240 5.9% 10%",
    },
  },
  yellow: {
    name: "Yellow",
    light: {
      "--primary": "47 100% 50%",
      "--primary-foreground": "0 0% 10%",
    },
    dark: {
      "--primary": "47 100% 60%",
      "--primary-foreground": "0 0% 10%",
    },
  },
  violet: {
    name: "Violet",
    light: {
      "--primary": "270 94% 50%",
      "--primary-foreground": "0 0% 98%",
    },
    dark: {
      "--primary": "270 94% 60%",
      "--primary-foreground": "240 5.9% 10%",
    },
  },
};

export const radiusOptions = [
  { name: "0", value: "0rem" },
  { name: "0.3", value: "0.3rem" },
  { name: "0.5", value: "0.5rem" },
  { name: "1.0", value: "1rem" },
  { name: "2.0", value: "2rem" },
];

// Block Theme context
type BlockThemeContextType = {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  selectedRadius: string;
  setSelectedRadius: (radius: string) => void;
  getThemeCSS: () => string;
};

const BlockThemeContext = createContext<BlockThemeContextType>({
  currentTheme: "default",
  setCurrentTheme: () => {},
  selectedRadius: "0.5rem",
  setSelectedRadius: () => {},
  getThemeCSS: () => "",
});

export function BlockThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useAppTheme();
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [selectedRadius, setSelectedRadius] = useState<string>("0.5rem");

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("primary-color-theme");
      if (savedTheme && primaryColorThemes[savedTheme]) {
        setCurrentTheme(savedTheme);
      }

      const savedRadius = localStorage.getItem("theme-radius");
      if (savedRadius) {
        setSelectedRadius(savedRadius);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("primary-color-theme", currentTheme);
    }
  }, [currentTheme]);

  // Save radius to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-radius", selectedRadius);
    }
  }, [selectedRadius]);

  // Apply theme and radius immediately
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply radius
      document.documentElement.style.setProperty("--radius", selectedRadius);
      // Apply theme colors
      applyTheme(currentTheme);
    }
  }, [currentTheme, selectedRadius, resolvedTheme]);

  const applyTheme = (themeKey: string) => {
    const theme = primaryColorThemes[themeKey];
    if (!theme) return;

    // Apply only primary and primary-foreground colors
    const isDark = resolvedTheme === "dark";
    const colors = isDark ? theme.dark : theme.light;

    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  // Get CSS for current theme
  const getThemeCSS = () => {
    const theme = primaryColorThemes[currentTheme];
    if (!theme) return "";

    return `:root {
  --primary: ${theme.light["--primary"]};
  --primary-foreground: ${theme.light["--primary-foreground"]};
  --radius: ${selectedRadius};
}

.dark {
  --primary: ${theme.dark["--primary"]};
  --primary-foreground: ${theme.dark["--primary-foreground"]};
}`;
  };

  return (
    <BlockThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        selectedRadius,
        setSelectedRadius,
        getThemeCSS,
      }}
    >
      {children}
    </BlockThemeContext.Provider>
  );
}

export function useBlockTheme() {
  const context = useContext(BlockThemeContext);
  if (context === undefined) {
    throw new Error("useBlockTheme must be used within a BlockThemeProvider");
  }
  return context;
}
