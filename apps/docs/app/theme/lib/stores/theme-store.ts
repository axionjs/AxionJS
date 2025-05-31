"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { presetThemes } from "../../lib/theme-presets";

// Helper function to adjust hue
function adjustHue(hex: string, adjustment: number): string {
  const hsl = hexToHSL(hex);
  const [h, s, l] = hsl.split(" ").map((val, i) => {
    if (i === 0) return (Number.parseInt(val) + adjustment) % 360;
    return Number.parseInt(val.replace("%", ""));
  });
  return hslToHex(h, s, l);
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export type ThemeData = {
  name: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    destructive: string;
    muted: string;
    border: string;
    [key: string]: string;
  };
  fonts: {
    displayFont: string;
    textFont: string;
    displayWeight: number;
    textWeight: number;
  };
  styles: {
    radius: string;
    shadow: string;
    animationSpeed: number;
    fadeSpeed: number;
    scaleSpeed: number;
    slideSpeed: number;
    marqueeSpeed: number;
    shineSpeed: number;
    animationCurve: string;
  };
  cssVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

type ThemeStore = {
  activeTheme: string;
  customTheme: ThemeData | null;
  activeThemeData: ThemeData;
  isExportPanelOpen: boolean;
  isAiPanelOpen: boolean;
  setActiveTheme: (themeId: string) => void;
  updateThemeColor: (key: string, value: string) => void;
  updateThemeFont: (key: string, value: string | number) => void;
  updateThemeRadius: (value: string) => void;
  updateThemeShadow: (value: string) => void;
  updateThemeAnimation: (value: number) => void;
  createCustomTheme: (theme: ThemeData) => void;
  setExportPanelOpen: (isOpen: boolean) => void;
  setAiPanelOpen: (isOpen: boolean) => void;
  loadThemeFromStorage: () => void;
  updateFadeSpeed: (value: number) => void;
  updateScaleSpeed: (value: number) => void;
  updateSlideSpeed: (value: number) => void;
  updateMarqueeSpeed: (value: number) => void;
  updateShineSpeed: (value: number) => void;
  updateAnimationCurve: (value: string) => void;
};

// Helper function to convert hex to HSL
function hexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Helper function to generate chart colors based on primary color
function generateChartColors(primaryColor: string): Record<string, string> {
  const primaryHSL = hexToHSL(primaryColor);
  const [h, s, l] = primaryHSL.split(" ").map((val, i) => {
    if (i === 0) return Number.parseInt(val);
    return Number.parseInt(val.replace("%", ""));
  });

  // Generate 6 chart colors based on primary color
  const chartColors = {
    "chart-1": hexToHSL(primaryColor), // Primary color
    "chart-2": `${(h + 60) % 360} ${Math.max(50, s)}% ${Math.min(70, l + 10)}%`, // Complementary
    "chart-3": `${(h + 120) % 360} ${Math.max(45, s - 10)}% ${Math.min(65, l + 5)}%`, // Triadic
    "chart-4": `${(h + 180) % 360} ${Math.max(55, s + 5)}% ${Math.min(75, l + 15)}%`, // Opposite
    "chart-5": `${(h + 240) % 360} ${Math.max(50, s)}% ${Math.min(70, l + 10)}%`, // Split complementary
    "chart-6": `${(h + 300) % 360} ${Math.max(45, s - 5)}% ${Math.min(65, l + 5)}%`, // Split complementary 2
  };

  return chartColors;
}

// Helper function to generate CSS variables from theme colors
function generateCSSVariables(colors: Record<string, string>): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  // Generate chart colors based on primary color
  const chartColors = generateChartColors(colors.primary || "#0070f3");

  // Helper function to darken a color for dark mode
  function darkenForDarkMode(hex: string, amount = 30): string {
    const hsl = hexToHSL(hex);
    const [h, s, l] = hsl.split(" ").map((val, i) => {
      if (i === 0) return Number.parseInt(val);
      return Number.parseInt(val.replace("%", ""));
    });

    // For dark mode, we want darker backgrounds and lighter text
    const newL = Math.max(10, l - amount);
    return `${h} ${s}% ${newL}%`;
  }

  // Helper function to lighten a color for dark mode text
  function lightenForDarkMode(hex: string, amount = 40): string {
    const hsl = hexToHSL(hex);
    const [h, s, l] = hsl.split(" ").map((val, i) => {
      if (i === 0) return Number.parseInt(val);
      return Number.parseInt(val.replace("%", ""));
    });

    // If the color is very dark (lightness < 20%), use white or very light color
    if (l < 20) {
      return "0 0% 98%"; // Almost white
    }

    // If the color is already light (lightness > 70%), darken it instead
    if (l > 70) {
      const newL = Math.max(20, l - amount);
      return `${h} ${s}% ${newL}%`;
    }

    // For medium colors, lighten them
    const newL = Math.min(90, l + amount);
    return `${h} ${s}% ${newL}%`;
  }

  const light = {
    background: hexToHSL(colors.background || "#ffffff"),
    foreground: "0 0% 3.9%",
    card: hexToHSL(colors.background || "#ffffff"),
    "card-foreground": "0 0% 3.9%",
    popover: hexToHSL(colors.background || "#ffffff"),
    "popover-foreground": "0 0% 3.9%",
    primary: hexToHSL(colors.primary || "#000000"),
    "primary-foreground": "0 0% 98%",
    secondary: hexToHSL(colors.secondary || "#f1f5f9"),
    "secondary-foreground": "0 0% 9%",
    tertiary: "240 8% 95%",
    "tertiary-foreground": "240 8% 20%",
    neutral: "240 5% 90%",
    "neutral-foreground": "240 5% 15%",
    muted: hexToHSL(colors.muted || "#f1f5f9"),
    "muted-foreground": "0 0% 45.1%",
    accent: hexToHSL(colors.accent || "#f1f5f9"),
    "accent-foreground": "0 0% 9%",
    destructive: hexToHSL(colors.destructive || "#ef4444"),
    "destructive-foreground": "0 0% 100%",
    border: hexToHSL(colors.border || "#e2e8f0"),
    input: hexToHSL(colors.border || "#e2e8f0"),
    ring: hexToHSL(colors.primary || "#000000"),
    shadow: "0 10px 50px rgba(0, 0, 0, 0.1)",
    "gradient-start": "220 50% 40%",
    "gradient-end": "280 40% 30%",
    ...chartColors, // Use generated chart colors
    radius: "0.5rem",
  };

  // Generate dark mode variables based on the light mode colors
  const dark = {
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    card: "240 10% 3.9%",
    "card-foreground": "0 0% 98%",
    popover: "240 10% 3.9%",
    "popover-foreground": "0 0% 98%",
    // Use the improved lightenForDarkMode function
    primary: lightenForDarkMode(colors.primary || "#000000"),
    "primary-foreground": "240 5.9% 10%",
    secondary: "240 3.7% 15.9%",
    "secondary-foreground": "0 0% 98%",
    tertiary: "240 8% 15%",
    "tertiary-foreground": "240 8% 80%",
    neutral: "240 5% 20%",
    "neutral-foreground": "240 5% 85%",
    muted: "240 3.7% 15.9%",
    "muted-foreground": "240 5% 64.9%",
    accent: darkenForDarkMode(colors.accent || "#f1f5f9", 60),
    "accent-foreground": "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "0 0% 98%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: lightenForDarkMode(colors.primary || "#000000"),
    // Use adapted chart colors for dark mode
    "chart-1": lightenForDarkMode(colors.primary || "#0070f3"),
    "chart-2": chartColors["chart-2"],
    "chart-3": chartColors["chart-3"],
    "chart-4": chartColors["chart-4"],
    "chart-5": chartColors["chart-5"],
    "chart-6": chartColors["chart-6"],
  };

  return { light, dark };
}

// Add debounce utility for performance
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => {
      // Create debounced update functions for animations
      const debouncedAnimationUpdate = debounce(
        (key: string, value: number) => {
          const currentTheme = get().activeThemeData;
          const updatedStyles = { ...currentTheme.styles, [key]: value };
          const updatedTheme = { ...currentTheme, styles: updatedStyles };

          set({ activeThemeData: updatedTheme });

          if (get().activeTheme === "custom") {
            set({ customTheme: updatedTheme });
          } else {
            set({
              customTheme: {
                ...updatedTheme,
                name: `Custom ${currentTheme.name}`,
              },
              activeTheme: "custom",
            });
          }
        },
        16
      ); // 16ms for smooth 60fps updates

      return {
        activeTheme: "default-shadcn",
        customTheme: null,
        activeThemeData:
          presetThemes.find((theme) => theme.id === "default-shadcn") ||
          presetThemes[0],
        isExportPanelOpen: false,
        isAiPanelOpen: false,

        setActiveTheme: (themeId) => {
          set({ activeTheme: themeId });

          // Update active theme data
          if (themeId === "custom" && get().customTheme) {
            set({ activeThemeData: get().customTheme! });
          } else {
            const theme = presetThemes.find((theme) => theme.id === themeId);
            if (theme) {
              set({ activeThemeData: theme });
            }
          }
        },

        updateThemeColor: (key, value) => {
          if (key !== "primary") return; // Only allow primary color changes

          const currentTheme = get().activeThemeData;

          // Auto-generate other colors based on primary
          const updatedColors = {
            ...currentTheme.colors,
            primary: value,
            // Keep background white and auto-generate others
            background: "#ffffff",
            secondary: "#f8fafc",
            accent: adjustHue(value, 30),
            destructive: "#ef4444",
            muted: "#f1f5f9",
            border: "#e2e8f0",
          };

          const cssVariables = generateCSSVariables(updatedColors);

          const updatedTheme = {
            ...currentTheme,
            colors: updatedColors,
            cssVariables,
          };

          // Immediate update for color changes (no debounce)
          set({ activeThemeData: updatedTheme });

          // If we're editing a custom theme, update it
          if (get().activeTheme === "custom") {
            set({ customTheme: updatedTheme });
          } else {
            // Create a new custom theme based on the current theme
            set({
              customTheme: {
                ...updatedTheme,
                name: `Custom ${currentTheme.name}`,
              },
              activeTheme: "custom",
            });
          }
        },

        updateThemeFont: (key, value) => {
          const currentTheme = get().activeThemeData;
          const updatedFonts = { ...currentTheme.fonts, [key]: value };
          const updatedTheme = { ...currentTheme, fonts: updatedFonts };

          set({ activeThemeData: updatedTheme });

          // If we're editing a custom theme, update it
          if (get().activeTheme === "custom") {
            set({ customTheme: updatedTheme });
          } else {
            // Create a new custom theme based on the current theme
            set({
              customTheme: {
                ...updatedTheme,
                name: `Custom ${currentTheme.name}`,
              },
              activeTheme: "custom",
            });
          }
        },

        updateThemeRadius: (value) => {
          const currentTheme = get().activeThemeData;
          const updatedStyles = { ...currentTheme.styles, radius: value };
          const updatedCSSVariables = {
            ...currentTheme.cssVariables,
            light: { ...currentTheme.cssVariables.light, radius: value },
            dark: { ...currentTheme.cssVariables.dark, radius: value },
          };
          const updatedTheme = {
            ...currentTheme,
            styles: updatedStyles,
            cssVariables: updatedCSSVariables,
          };

          set({ activeThemeData: updatedTheme });

          // If we're editing a custom theme, update it
          if (get().activeTheme === "custom") {
            set({ customTheme: updatedTheme });
          } else {
            // Create a new custom theme based on the current theme
            set({
              customTheme: {
                ...updatedTheme,
                name: `Custom ${currentTheme.name}`,
              },
              activeTheme: "custom",
            });
          }
        },

        updateThemeShadow: (value) => {
          const currentTheme = get().activeThemeData;
          const updatedStyles = { ...currentTheme.styles, shadow: value };
          const updatedTheme = { ...currentTheme, styles: updatedStyles };

          set({ activeThemeData: updatedTheme });

          // If we're editing a custom theme, update it
          if (get().activeTheme === "custom") {
            set({ customTheme: updatedTheme });
          } else {
            // Create a new custom theme based on the current theme
            set({
              customTheme: {
                ...updatedTheme,
                name: `Custom ${currentTheme.name}`,
              },
              activeTheme: "custom",
            });
          }
        },

        updateThemeAnimation: (value) => {
          debouncedAnimationUpdate("animationSpeed", value);
        },

        updateFadeSpeed: (value) => {
          debouncedAnimationUpdate("fadeSpeed", value);
        },

        updateScaleSpeed: (value) => {
          debouncedAnimationUpdate("scaleSpeed", value);
        },

        updateSlideSpeed: (value) => {
          debouncedAnimationUpdate("slideSpeed", value);
        },

        updateMarqueeSpeed: (value) => {
          debouncedAnimationUpdate("marqueeSpeed", value);
        },

        updateShineSpeed: (value) => {
          debouncedAnimationUpdate("shineSpeed", value);
        },

        updateAnimationCurve: (value) => {
          const currentTheme = get().activeThemeData;
          const updatedStyles = {
            ...currentTheme.styles,
            animationCurve: value,
          };
          const updatedTheme = { ...currentTheme, styles: updatedStyles };

          set({ activeThemeData: updatedTheme });

          // If we're editing a custom theme, update it
          if (get().activeTheme === "custom") {
            set({ customTheme: updatedTheme });
          } else {
            // Create a new custom theme based on the current theme
            set({
              customTheme: {
                ...updatedTheme,
                name: `Custom ${currentTheme.name}`,
              },
              activeTheme: "custom",
            });
          }
        },

        createCustomTheme: (theme) => {
          // Regenerate CSS variables with updated chart colors
          const updatedTheme = {
            ...theme,
            cssVariables: generateCSSVariables(theme.colors),
          };

          set({
            customTheme: updatedTheme,
            activeTheme: "custom",
            activeThemeData: updatedTheme,
          });
        },

        setExportPanelOpen: (isOpen) => {
          set({ isExportPanelOpen: isOpen });
        },

        setAiPanelOpen: (isOpen) => {
          set({ isAiPanelOpen: isOpen });
        },

        loadThemeFromStorage: () => {
          // This function is called on initial load
          // The persist middleware will handle loading from localStorage
          // We just need to make sure activeThemeData is set correctly
          const { activeTheme, customTheme } = get();

          if (activeTheme === "custom" && customTheme) {
            set({ activeThemeData: customTheme });
          } else {
            const theme = presetThemes.find(
              (theme) => theme.id === activeTheme
            );
            if (theme) {
              set({ activeThemeData: theme });
            }
          }
        },
      };
    },
    {
      name: "axion-theme-storage",
      partialize: (state) => ({
        activeTheme: state.activeTheme,
        customTheme: state.customTheme,
      }),
    }
  )
);
