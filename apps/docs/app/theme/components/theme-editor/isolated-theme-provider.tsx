"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { googleFonts } from "../../lib/fonts";
import { useThemeStore } from "../../lib/stores/theme-store";
import { AnimatedBackground } from "./animated-background";

export function IsolatedThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeThemeData } = useThemeStore();
  const { theme, systemTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme changes from Fumadocs/next-themes
  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";
    setIsDarkMode(isDark);
  }, [theme, systemTheme]);

  // Also listen for manual class changes on html element (fallback)
  useEffect(() => {
    const handleChange = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Listen for class changes on html element
    const observer = new MutationObserver(handleChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Load Google Fonts dynamically using proper import URLs
    const loadGoogleFont = (fontName: string) => {
      const font = googleFonts.find((f) => f.name === fontName);
      if (!font) return;

      // Check if font is already loaded
      const existingLink = document.querySelector(
        `link[href*="${font.importUrl}"]`
      );
      if (existingLink) return;

      // Create new link element
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.importUrl;
      document.head.appendChild(link);
    };

    // Load both display and text fonts
    loadGoogleFont(activeThemeData.fonts.displayFont);
    if (activeThemeData.fonts.textFont !== activeThemeData.fonts.displayFont) {
      loadGoogleFont(activeThemeData.fonts.textFont);
    }
  }, [activeThemeData.fonts.displayFont, activeThemeData.fonts.textFont]);

  // Create CSS variables as a style object for this isolated theme
  const createThemeStyles = () => {
    const colorVars = isDarkMode
      ? activeThemeData.cssVariables.dark
      : activeThemeData.cssVariables.light;

    const styleVars: Record<string, string> = {};

    // Apply color variables
    Object.entries(colorVars).forEach(([key, value]) => {
      styleVars[`--${key}`] = value;
    });

    // Apply fonts
    styleVars["--font-display"] =
      `"${activeThemeData.fonts.displayFont}", sans-serif`;
    styleVars["--font-text"] =
      `"${activeThemeData.fonts.textFont}", sans-serif`;

    // Apply font weights
    styleVars["--font-display-weight"] =
      activeThemeData.fonts.displayWeight.toString();
    styleVars["--font-text-weight"] =
      activeThemeData.fonts.textWeight.toString();

    // Apply radius
    styleVars["--radius"] = activeThemeData.cssVariables.light.radius;

    // Apply animation speeds
    styleVars["--animation-duration"] =
      `${activeThemeData.styles.animationSpeed}ms`;
    styleVars["--fade-duration"] =
      `${activeThemeData.styles.fadeSpeed || 500}ms`;
    styleVars["--scale-duration"] =
      `${activeThemeData.styles.scaleSpeed || 300}ms`;
    styleVars["--slide-duration"] =
      `${activeThemeData.styles.slideSpeed || 500}ms`;
    styleVars["--marquee-duration"] =
      `${activeThemeData.styles.marqueeSpeed || 20}s`;
    styleVars["--shine-duration"] =
      `${activeThemeData.styles.shineSpeed || 8}s`;
    styleVars["--animation-curve"] =
      activeThemeData.styles.animationCurve || "ease";

    return styleVars;
  };

  const themeStyles = createThemeStyles();

  return (
    <div className="relative min-h-screen bg-background" style={themeStyles}>
      {/* Animated Background */}
      <AnimatedBackground />
      <div className="relative z-10">
        <div
          className="font-[var(--font-text)]"
          style={{
            fontFamily: `"${activeThemeData.fonts.textFont}", sans-serif`,
            fontWeight: activeThemeData.fonts.textWeight,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
