"use client";

import { create } from "zustand";

interface AccessibilityState {
  isOpen: boolean;
  toggleOpen: () => void;

  // Accessibility toggles
  highContrast: boolean;
  toggleHighContrast: () => void;

  highlightLinks: boolean;
  toggleHighlightLinks: () => void;

  biggerText: boolean;
  toggleBiggerText: () => void;

  textSpacing: boolean;
  toggleTextSpacing: () => void;

  hideImages: boolean;
  toggleHideImages: () => void;

  dyslexiaFriendly: boolean;
  toggleDyslexiaFriendly: () => void;

  lineHeight: boolean;
  toggleLineHeight: () => void;

  saturation: boolean;
  toggleSaturation: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set) => ({
  isOpen: false,
  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  // Accessibility toggles
  highContrast: false,
  toggleHighContrast: () =>
    set((state) => ({
      highContrast: !state.highContrast,
    })),

  highlightLinks: false,
  toggleHighlightLinks: () =>
    set((state) => ({
      highlightLinks: !state.highlightLinks,
    })),

  biggerText: false,
  toggleBiggerText: () =>
    set((state) => ({
      biggerText: !state.biggerText,
    })),

  textSpacing: false,
  toggleTextSpacing: () =>
    set((state) => ({
      textSpacing: !state.textSpacing,
    })),

  hideImages: false,
  toggleHideImages: () =>
    set((state) => ({
      hideImages: !state.hideImages,
    })),

  dyslexiaFriendly: false,
  toggleDyslexiaFriendly: () =>
    set((state) => ({
      dyslexiaFriendly: !state.dyslexiaFriendly,
    })),

  lineHeight: false,
  toggleLineHeight: () =>
    set((state) => ({
      lineHeight: !state.lineHeight,
    })),

  saturation: false,
  toggleSaturation: () =>
    set((state) => ({
      saturation: !state.saturation,
    })),
}));
