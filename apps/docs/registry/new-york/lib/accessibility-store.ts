"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define types for feature intensity levels
export type FeatureIntensity = "default" | "medium" | "high";

interface AccessibilityState {
  isOpen: boolean;
  toggleOpen: () => void;

  // Accessibility features with intensity levels
  contrast: FeatureIntensity;
  setContrast: (level: FeatureIntensity) => void;

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

  // Screen reader
  screenReader: {
    enabled: boolean;
    speed: "normal" | "slow";
    volume: number; // 0 to 1
  };
  toggleScreenReader: () => void;
  setScreenReaderSpeed: (speed: "normal" | "slow") => void;
  setScreenReaderVolume: (volume: number) => void;

  // Reset all settings
  resetAll: () => void;
}

// Default state to use when resetting
const defaultState = {
  isOpen: false,
  contrast: "default" as FeatureIntensity,
  highlightLinks: "default" as FeatureIntensity,
  textSize: "default" as FeatureIntensity,
  textSpacing: "default" as FeatureIntensity,
  hideImages: false,
  dyslexiaFriendly: false,
  lineHeight: "default" as FeatureIntensity,
  saturation: "default" as FeatureIntensity,
  screenReader: {
    enabled: false,
    speed: "normal" as "normal" | "slow",
    volume: 0.8,
  },
};

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      ...defaultState,

      toggleOpen: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),

      // Feature setters with intensity levels
      setContrast: (level) =>
        set(() => ({
          contrast: level,
        })),

      setHighlightLinks: (level) =>
        set(() => ({
          highlightLinks: level,
        })),

      setTextSize: (level) =>
        set(() => ({
          textSize: level,
        })),

      setTextSpacing: (level) =>
        set(() => ({
          textSpacing: level,
        })),

      toggleHideImages: () =>
        set((state) => ({
          hideImages: !state.hideImages,
        })),

      toggleDyslexiaFriendly: () =>
        set((state) => ({
          dyslexiaFriendly: !state.dyslexiaFriendly,
        })),

      setLineHeight: (level) =>
        set(() => ({
          lineHeight: level,
        })),

      setSaturation: (level) =>
        set(() => ({
          saturation: level,
        })),

      // Screen reader controls
      toggleScreenReader: () =>
        set((state) => {
          // Create a clean toggle without side effects - the component will handle cleanup
          return {
            screenReader: {
              ...state.screenReader,
              enabled: !state.screenReader.enabled,
            },
          };
        }),

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

      // Reset all settings to default
      resetAll: () => set(defaultState),
    }),
    {
      name: "accessibility-storage", // localStorage key
    }
  )
);
