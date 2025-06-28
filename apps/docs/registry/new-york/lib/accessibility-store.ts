"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define types for feature intensity levels
export type FeatureIntensity = "default" | "medium" | "high";
export type ContrastMode = "default" | "inverted" | "dark" | "light"; // New contrast modes

interface AccessibilityState {
  isOpen: boolean;
  toggleOpen: () => void;

  // Accessibility features with intensity levels
  contrast: ContrastMode; // Changed to ContrastMode
  setContrast: (level: ContrastMode) => void; // Changed to ContrastMode

  highlightLinks: FeatureIntensity;
  setHighlightLinks: (level: FeatureIntensity) => void;

  textSize: FeatureIntensity;
  setTextSize: (level: FeatureIntensity) => void;

  textSpacing: FeatureIntensity;
  setTextSpacing: (level: FeatureIntensity) => void;

  hideImages: boolean;
  toggleHideImages: () => void;

  dyslexiaFriendly: boolean;
  toggleDyslexiaFriendly: () => void;

  lineHeight: FeatureIntensity;
  setLineHeight: (level: FeatureIntensity) => void;

  saturation: FeatureIntensity;
  setSaturation: (level: FeatureIntensity) => void;

  // New: Cursor Size
  cursorSize: FeatureIntensity;
  setCursorSize: (level: FeatureIntensity) => void;

  // Screen reader
  screenReader: {
    enabled: boolean;
    speed: "normal" | "slow";
    volume: number; // 0 to 1
  };
  toggleScreenReader: () => void;
  setScreenReaderSpeed: (speed: "normal" | "slow") => void;
  setScreenReaderVolume: (volume: number) => void;

  // Reset function
  resetAll: () => void;
}

const initialState: AccessibilityState = {
  isOpen: false,
  toggleOpen: () => {},

  contrast: "default",
  setContrast: () => {},

  highlightLinks: "default",
  setHighlightLinks: () => {},

  textSize: "default",
  setTextSize: () => {},

  textSpacing: "default",
  setTextSpacing: () => {},

  hideImages: false,
  toggleHideImages: () => {},

  dyslexiaFriendly: false,
  toggleDyslexiaFriendly: () => {},

  lineHeight: "default",
  setLineHeight: () => {},

  saturation: "default",
  setSaturation: () => {},

  cursorSize: "default", // Initialize cursor size
  setCursorSize: () => {},

  screenReader: {
    enabled: false,
    speed: "normal",
    volume: 0.8,
  },
  toggleScreenReader: () => {},
  setScreenReaderSpeed: () => {},
  setScreenReaderVolume: () => {},

  resetAll: () => {},
};

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      ...initialState, // Spread the initial state

      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

      setContrast: (level) => set(() => ({ contrast: level })),
      setHighlightLinks: (level) => set(() => ({ highlightLinks: level })),
      setTextSize: (level) => set(() => ({ textSize: level })),
      setTextSpacing: (level) => set(() => ({ textSpacing: level })),
      toggleHideImages: () =>
        set((state) => ({ hideImages: !state.hideImages })),
      toggleDyslexiaFriendly: () =>
        set((state) => ({ dyslexiaFriendly: !state.dyslexiaFriendly })),
      setLineHeight: (level) => set(() => ({ lineHeight: level })),
      setSaturation: (level) => set(() => ({ saturation: level })),

      // New: Set Cursor Size
      setCursorSize: (level) => set(() => ({ cursorSize: level })),

      toggleScreenReader: () =>
        set((state) => ({
          screenReader: {
            ...state.screenReader,
            enabled: !state.screenReader.enabled,
          },
        })),
      setScreenReaderSpeed: (speed) =>
        set((state) => ({
          screenReader: {
            ...state.screenReader,
            speed,
          },
        })),
      setScreenReaderVolume: (volume) =>
        set((state) => ({
          screenReader: {
            ...state.screenReader,
            volume,
          },
        })),

      resetAll: () => {
        // Reset to initial values (excluding isOpen, as that's managed by toggleOpen)
        set({
          contrast: "default",
          highlightLinks: "default",
          textSize: "default",
          textSpacing: "default",
          hideImages: false,
          dyslexiaFriendly: false,
          lineHeight: "default",
          saturation: "default",
          cursorSize: "default",
          screenReader: {
            enabled: false,
            speed: "normal",
            volume: 0.8,
          },
        });
      },
    }),
    {
      name: "accessibility-storage", // unique name
      getStorage: () => localStorage,
    }
  )
);
