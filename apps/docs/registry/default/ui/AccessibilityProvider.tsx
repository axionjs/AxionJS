"use client";

import React, { useEffect } from "react";
import { useAccessibilityStore } from "@/registry/default/lib/accessibility-store";

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isOpen,
    toggleOpen,
    highContrast,
    highlightLinks,
    biggerText,
    textSpacing,
    hideImages,
    dyslexiaFriendly,
    lineHeight,
    saturation,
  } = useAccessibilityStore();

  // Listen for Ctrl + U to open or close the accessibility menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if ctrlKey (or metaKey for Mac) + key "u"
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "u") {
        event.preventDefault();
        toggleOpen();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleOpen]);

  // We can dynamically add classes to the <html> or <body> based on toggles:
  useEffect(() => {
    const html = document.documentElement;

    // High Contrast
    if (highContrast) {
      html.classList.add("high-contrast");
    } else {
      html.classList.remove("high-contrast");
    }

    // Highlight Links
    if (highlightLinks) {
      html.classList.add("highlight-links");
    } else {
      html.classList.remove("highlight-links");
    }

    // Bigger Text
    if (biggerText) {
      html.classList.add("text-xl");
    } else {
      html.classList.remove("text-xl");
    }

    // Text Spacing
    if (textSpacing) {
      html.classList.add("text-spacing");
    } else {
      html.classList.remove("text-spacing");
    }

    // Hide Images
    if (hideImages) {
      html.classList.add("hide-images");
    } else {
      html.classList.remove("hide-images");
    }

    // Dyslexia Friendly
    if (dyslexiaFriendly) {
      html.classList.add("dyslexia-friendly");
    } else {
      html.classList.remove("dyslexia-friendly");
    }

    // Increased Line Height
    if (lineHeight) {
      html.classList.add("increased-line-height");
    } else {
      html.classList.remove("increased-line-height");
    }

    // Reduced/Grayscale Saturation
    if (saturation) {
      html.classList.add("low-saturation");
    } else {
      html.classList.remove("low-saturation");
    }
  }, [
    highContrast,
    highlightLinks,
    biggerText,
    textSpacing,
    hideImages,
    dyslexiaFriendly,
    lineHeight,
    saturation,
  ]);

  return <>{children}</>;
}
