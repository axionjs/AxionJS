"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { googleFonts } from "../../lib/fonts";
import { useThemeStore } from "../../lib/stores/theme-store";
import { AnimatedBackground } from "./animated-background";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

    // Apply CSS variables to the document
    const root = document.documentElement;

    // Apply colors based on current theme mode
    const colorVars = isDarkMode
      ? activeThemeData.cssVariables.dark
      : activeThemeData.cssVariables.light;
    Object.entries(colorVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply fonts with fallbacks
    root.style.setProperty(
      "--font-display",
      `"${activeThemeData.fonts.displayFont}", sans-serif`
    );
    root.style.setProperty(
      "--font-text",
      `"${activeThemeData.fonts.textFont}", sans-serif`
    );

    // Apply font weights
    root.style.setProperty(
      "--font-display-weight",
      activeThemeData.fonts.displayWeight.toString()
    );
    root.style.setProperty(
      "--font-text-weight",
      activeThemeData.fonts.textWeight.toString()
    );

    // Apply radius
    root.style.setProperty(
      "--radius",
      activeThemeData.cssVariables.light.radius
    );

    // Apply animation speeds
    root.style.setProperty(
      "--animation-duration",
      `${activeThemeData.styles.animationSpeed}ms`
    );
    root.style.setProperty(
      "--fade-duration",
      `${activeThemeData.styles.fadeSpeed || 500}ms`
    );
    root.style.setProperty(
      "--scale-duration",
      `${activeThemeData.styles.scaleSpeed || 300}ms`
    );
    root.style.setProperty(
      "--slide-duration",
      `${activeThemeData.styles.slideSpeed || 500}ms`
    );
    root.style.setProperty(
      "--marquee-duration",
      `${activeThemeData.styles.marqueeSpeed || 20}s`
    );
    root.style.setProperty(
      "--shine-duration",
      `${activeThemeData.styles.shineSpeed || 8}s`
    );
    root.style.setProperty(
      "--animation-curve",
      activeThemeData.styles.animationCurve || "ease"
    );
  }, [activeThemeData, isDarkMode]);

  return (
    <div className="relative min-h-screen bg-background">
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
