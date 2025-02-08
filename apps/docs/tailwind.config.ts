// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import { createPreset as createFumadocsPreset } from "fumadocs-ui/tailwind-plugin";
import tailwindAnimate from "tailwindcss-animate";
import shadcnPreset from "./tailwind.shadcn";
import { createPreset } from "fumadocs-ui/tailwind-plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./**/*.tsx",
    "./app/**/*.tsx",
    "./src/**/*.tsx",
    "./content/**/*.mdx",
    "./content/**/*.tsx",
    "./mdx-components.tsx",
    "../../node_modules/fumadocs-ui/dist/**/*.js",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  fontFamily: {
    sans: ["var(--font-geist-sans)"],
    mono: ["var(--font-geist-mono)"],
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  presets: [
    sharedConfig,
    createFumadocsPreset({
      layoutWidth: "1600px",
    }),
    createPreset({
      preset: "neutral",
    }),
    shadcnPreset,
  ],
  plugins: [tailwindAnimate],
};

export default config;
