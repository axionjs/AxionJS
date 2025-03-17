"use client";

import React, { useEffect } from "react";
import { useAccessibilityStore } from "@/registry/new-york/lib/accessibility-store";

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    contrast,
    highlightLinks,
    textSize,
    textSpacing,
    hideImages,
    dyslexiaFriendly,
    lineHeight,
    saturation,
    screenReader,
  } = useAccessibilityStore();

  // Apply all accessibility settings to the HTML element
  useEffect(() => {
    const html = document.documentElement;

    // Remove all potential classes first
    const classesToRemove = [
      "contrast-medium",
      "contrast-high",
      "highlight-links-medium",
      "highlight-links-high",
      "text-size-medium",
      "text-size-high",
      "text-spacing-medium",
      "text-spacing-high",
      "hide-images",
      "dyslexia-friendly",
      "line-height-medium",
      "line-height-high",
      "saturation-medium",
      "saturation-high",
    ];

    html.classList.remove(...classesToRemove);

    // Apply contrast settings
    if (contrast === "medium") {
      html.classList.add("contrast-medium");
    } else if (contrast === "high") {
      html.classList.add("contrast-high");
    }

    // Apply highlight links settings
    if (highlightLinks === "medium") {
      html.classList.add("highlight-links-medium");
    } else if (highlightLinks === "high") {
      html.classList.add("highlight-links-high");
    }

    // Apply text size settings
    if (textSize === "medium") {
      html.classList.add("text-size-medium");
    } else if (textSize === "high") {
      html.classList.add("text-size-high");
    }

    // Apply text spacing settings
    if (textSpacing === "medium") {
      html.classList.add("text-spacing-medium");
    } else if (textSpacing === "high") {
      html.classList.add("text-spacing-high");
    }

    // Apply hide images setting
    if (hideImages) {
      html.classList.add("hide-images");
    }

    // Apply dyslexia-friendly setting
    if (dyslexiaFriendly) {
      html.classList.add("dyslexia-friendly");
    }

    // Apply line height settings
    if (lineHeight === "medium") {
      html.classList.add("line-height-medium");
    } else if (lineHeight === "high") {
      html.classList.add("line-height-high");
    }

    // Apply saturation settings
    if (saturation === "medium") {
      html.classList.add("saturation-medium");
    } else if (saturation === "high") {
      html.classList.add("saturation-high");
    }

    // Add data attribute for screen reader enabled state
    // This allows for potential CSS targeting if needed
    if (screenReader.enabled) {
      html.setAttribute("data-screen-reader", "enabled");
    } else {
      html.removeAttribute("data-screen-reader");
    }

    // Listen for Ctrl + U to open or close the accessibility menu
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if ctrlKey (or metaKey for Mac) + key "u"
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "u") {
        event.preventDefault();
        // We can't directly call toggleOpen here because of the dependency array
        // Instead, dispatch a custom event that will be caught elsewhere
        document.dispatchEvent(new CustomEvent("toggleAccessibilityPanel"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    contrast,
    highlightLinks,
    textSize,
    textSpacing,
    hideImages,
    dyslexiaFriendly,
    lineHeight,
    saturation,
    screenReader.enabled,
  ]);

  return <>{children}</>;
}
