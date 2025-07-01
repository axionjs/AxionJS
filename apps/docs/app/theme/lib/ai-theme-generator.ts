import { GoogleGenAI } from "@google/genai";
import type { ThemeData } from "../lib/stores/theme-store";
import { googleFonts, getSortedFonts } from ".././lib/fonts";

// Enhanced color parsing functions
function parseColorFromText(text: string): string | null {
  const lowerText = text.toLowerCase();

  // Hex color pattern (#fff, #ffffff, #123abc)
  const hexMatch = text.match(/#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})\b/);
  if (hexMatch) {
    const hex = hexMatch[1];
    return hex.length === 3
      ? `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
      : `#${hex}`;
  }

  // RGB pattern (rgb(255, 0, 0) or rgb(255,0,0))
  const rgbMatch = text.match(/rgb\s*$$\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$$/i);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return rgbToHex(Number.parseInt(r), Number.parseInt(g), Number.parseInt(b));
  }

  // RGBA pattern (rgba(255, 0, 0, 0.5))
  const rgbaMatch = text.match(
    /rgba\s*$$\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*$$/i
  );
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch;
    return rgbToHex(Number.parseInt(r), Number.parseInt(g), Number.parseInt(b));
  }

  // HSL pattern (hsl(120, 100%, 50%))
  const hslMatch = text.match(
    /hsl\s*$$\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*$$/i
  );
  if (hslMatch) {
    const [, h, s, l] = hslMatch;
    return hslToHex(Number.parseInt(h), Number.parseInt(s), Number.parseInt(l));
  }

  // Named colors
  const namedColors: Record<string, string> = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    orange: "#f97316",
    purple: "#a855f7",
    pink: "#ec4899",
    brown: "#a3a3a3",
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280",
    grey: "#6b7280",
    cyan: "#06b6d4",
    magenta: "#d946ef",
    lime: "#84cc16",
    navy: "#1e40af",
    teal: "#14b8a6",
    olive: "#84cc16",
    maroon: "#dc2626",
    silver: "#e5e7eb",
    gold: "#f59e0b",
    coral: "#fb7185",
    salmon: "#fda4af",
    crimson: "#dc2626",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    turquoise: "#06b6d4",
    emerald: "#10b981",
    ruby: "#dc2626",
    sapphire: "#3b82f6",
    amber: "#f59e0b",
    jade: "#10b981",
  };

  for (const [name, hex] of Object.entries(namedColors)) {
    if (lowerText.includes(name)) {
      return hex;
    }
  }

  return null;
}

// Parse radius from text
function parseRadiusFromText(text: string): string | null {
  const lowerText = text.toLowerCase();

  // Direct radius values (8px, 0.5rem, 12px, etc.)
  const radiusMatch =
    text.match(/(\d+(?:\.\d+)?)(px|rem|em)\s*radius/i) ||
    text.match(/radius\s*(?:of\s*)?(\d+(?:\.\d+)?)(px|rem|em)/i) ||
    text.match(/(\d+(?:\.\d+)?)(px|rem|em)\s*(?:border\s*)?radius/i);

  if (radiusMatch) {
    const [, value, unit] = radiusMatch;
    const numValue = Number.parseFloat(value);

    if (unit === "px") {
      // Convert px to rem (assuming 16px = 1rem)
      const remValue = numValue / 16;
      return `${remValue}rem`;
    }
    return `${value}${unit}`;
  }

  // Named radius styles
  if (
    lowerText.includes("sharp") ||
    lowerText.includes("no radius") ||
    lowerText.includes("square")
  ) {
    return "0rem";
  }
  if (lowerText.includes("slight") || lowerText.includes("small radius")) {
    return "0.125rem";
  }
  if (lowerText.includes("medium radius") || lowerText.includes("moderate")) {
    return "0.375rem";
  }
  if (lowerText.includes("smooth") || lowerText.includes("rounded")) {
    return "0.5rem";
  }
  if (
    lowerText.includes("curved") ||
    lowerText.includes("very rounded") ||
    lowerText.includes("pill")
  ) {
    return "1rem";
  }

  return null;
}

// Parse font requests from text
function parseFontFromText(
  text: string
): { displayFont?: string; textFont?: string } | null {
  const lowerText = text.toLowerCase();
  const result: { displayFont?: string; textFont?: string } = {};

  // Check for specific font mentions
  for (const font of googleFonts) {
    const fontLower = font.name.toLowerCase();
    if (lowerText.includes(fontLower)) {
      // Determine if it's for display or text
      if (
        lowerText.includes(`${fontLower} for heading`) ||
        lowerText.includes(`${fontLower} for title`) ||
        lowerText.includes(`heading font ${fontLower}`) ||
        lowerText.includes(`display font ${fontLower}`)
      ) {
        result.displayFont = font.name;
      } else if (
        lowerText.includes(`${fontLower} for body`) ||
        lowerText.includes(`${fontLower} for text`) ||
        lowerText.includes(`body font ${fontLower}`) ||
        lowerText.includes(`text font ${fontLower}`)
      ) {
        result.textFont = font.name;
      } else {
        // If not specified, use for both
        result.displayFont = font.name;
        result.textFont = font.name;
      }
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

// Helper function to convert RGB to Hex
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Helper function to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  h = h % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return rgbToHex(r, g, b);
}

// Helper function to convert hex to HSL
function hexToHSL(hex: string): string {
  hex = hex.replace(/^#/, "");
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

// Helper function to adjust hue
function adjustHue(hex: string, adjustment: number): string {
  const hsl = hexToHSL(hex);
  const [h, s, l] = hsl.split(" ").map((val, i) => {
    if (i === 0) return (Number.parseInt(val) + adjustment) % 360;
    return Number.parseInt(val.replace("%", ""));
  });
  return hslToHex(h, s, l);
}

// Helper function to adjust brightness
function adjustBrightness(hex: string, adjustment: number): string {
  const hsl = hexToHSL(hex);
  const [h, s, l] = hsl.split(" ").map((val, i) => {
    if (i === 2)
      return Math.max(
        0,
        Math.min(100, Number.parseInt(val.replace("%", "")) + adjustment)
      );
    if (i === 0) return Number.parseInt(val);
    return Number.parseInt(val.replace("%", ""));
  });
  return hslToHex(h, s, l);
}

// Helper function to create very light accent color
function createLightAccent(primaryHex: string): string {
  const hsl = hexToHSL(primaryHex);
  const [h, s, l] = hsl.split(" ").map((val, i) => {
    if (i === 0) return Number.parseInt(val);
    return Number.parseInt(val.replace("%", ""));
  });

  // Create very light accent: keep hue, reduce saturation, increase lightness significantly
  const lightAccentH = (h + 30) % 360; // Slight hue shift
  const lightAccentS = Math.max(10, s * 0.3); // Much lower saturation
  const lightAccentL = Math.max(90, 95); // Very high lightness (90-95%)

  return hslToHex(lightAccentH, lightAccentS, lightAccentL);
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
    secondary: "240 4.8% 95.9%", // Keep secondary fixed
    "secondary-foreground": "240 5.9% 10%", // Keep secondary foreground fixed
    tertiary: "240 8% 95%",
    "tertiary-foreground": "240 8% 20%",
    neutral: "240 5% 90%",
    "neutral-foreground": "240 5% 15%",
    muted: hexToHSL(colors.muted || "#f1f5f9"),
    "muted-foreground": "240 3.8% 46.1%",
    accent: hexToHSL(colors.accent || "#f1f5f9"),
    "accent-foreground": "240 5.9% 10%",
    destructive: "0 84.2% 60.2%", // Keep destructive fixed
    "destructive-foreground": "0 0% 98%", // Keep destructive foreground fixed
    border: hexToHSL(colors.border || "#e2e8f0"),
    input: hexToHSL(colors.border || "#e2e8f0"),
    ring: hexToHSL(colors.primary || "#000000"),
    shadow: "0 10px 50px rgba(0, 0, 0, 0.1)",
    "gradient-start": "220 50% 40%",
    "gradient-end": "280 40% 30%",
    ...chartColors, // Use generated chart colors
    radius: "0.5rem",
  };

  const dark = {
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    card: "240 10% 3.9%",
    "card-foreground": "0 0% 98%",
    popover: "240 10% 3.9%",
    "popover-foreground": "0 0% 98%",
    primary: lightenForDarkMode(colors.primary || "#ffffff"),
    "primary-foreground": "240 5.9% 10%",
    secondary: "240 3.7% 15.9%", // Keep secondary fixed
    "secondary-foreground": "0 0% 98%", // Keep secondary foreground fixed
    tertiary: "240 8% 15%",
    "tertiary-foreground": "240 8% 80%",
    neutral: "240 5% 20%",
    "neutral-foreground": "240 5% 85%",
    muted: "240 3.7% 15.9%",
    "muted-foreground": "240 5% 64.9%",
    accent: darkenForDarkMode(colors.accent || "#f1f5f9", 60),
    "accent-foreground": "0 0% 98%",
    destructive: "0 62.8% 30.6%", // Keep destructive fixed
    "destructive-foreground": "0 0% 98%", // Keep destructive foreground fixed
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: lightenForDarkMode(colors.primary || "#ffffff"),
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

export async function generateThemeFromPrompt(
  name: string,
  description: string
): Promise<ThemeData> {
  // Parse specific requests from the description
  const parsedColor = parseColorFromText(description);
  const parsedRadius = parseRadiusFromText(description);
  const parsedFonts = parseFontFromText(description);

  // --- Enhanced cultural and brand inference ---
  let inferredTheme = inferThemeFromDescription(description);

  try {
    // Try to use Gemini API if available
    const apiKey =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Validate API key format (Gemini API keys start with "AIza")
      if (!apiKey.startsWith("AIza")) {
        throw new Error("Invalid API key format");
      }

      const ai = new GoogleGenAI({ apiKey });

      // Get available fonts for the prompt
      const availableFonts = getSortedFonts()
        .map((f) => `${f.name} (${f.category})`)
        .join(", ");

      const prompt = `
        You are an expert UI/UX designer with deep knowledge of brand identities, cultural aesthetics, and design systems.
        
        Create a theme based on: "${description}"
        
        ACCURATE BRAND COLORS - USE THESE EXACT COLORS (when mentioned):
        - Vercel: Black (#000000) primary, minimal design, Inter font
        - Next.js: Black (#000000) primary, clean tech aesthetic, Inter font
        - React: Blue (#61DAFB) primary, modern web framework
        - Vue: Green (#4FC08D) primary, progressive framework
        - Svelte: Orange (#FF3E00) primary, modern compiler
        - Angular: Red (#DD0031) primary, enterprise framework
        - Tailwind CSS: Blue (#06B6D4) primary, utility-first CSS
        - Supabase: Green (#3ECF8E) primary, database platform
        - Prisma: Dark blue (#2D3748) primary, database toolkit
        - Planetscale: Purple (#6366F1) primary, database platform
        - Railway: Purple (#8B5CF6) primary, deployment platform
        - Render: Blue (#0066CC) primary, cloud platform
        - Netlify: Teal (#00C7B7) primary, web platform
        - Cloudflare: Orange (#F48120) primary, web infrastructure
        - Uber: Black (#000000) primary, clean sans-serif fonts like Inter/Roboto
        - Material UI: Blue (#1976d2) primary, Roboto font family
        - Apple: Blue (#007AFF) primary, SF Pro fonts (use Inter as substitute)
        - Airbnb: Coral/pink (#FF5A5F) primary, Circular fonts (use Nunito as substitute)
        - Stripe: Purple (#635bff) primary, Inter font
        - GitHub: Dark gray (#24292e) primary, monospace accents
        - Netflix: Red (#e50914) primary, custom fonts (use Bebas Neue for display)
        - Spotify: Green (#1db954) primary, Circular fonts (use Montserrat)
        - Discord: Purple (#5865F2) primary, modern chat platform
        - Slack: Purple (#4A154B) primary, workplace messaging
        - Microsoft: Blue (#0078D4) primary, Segoe UI fonts (use Inter)
        - Google: Blue (#4285F4) primary, Google Sans fonts (use Inter)
        - Amazon: Orange (#FF9900) primary, Amazon Ember fonts (use Inter)
        - Facebook/Meta: Blue (#1877F2) primary, modern social platform
        - Twitter/X: Black (#000000) primary, social media platform
        - LinkedIn: Blue (#0077B5) primary, professional network
        - YouTube: Red (#FF0000) primary, video platform
        - Instagram: Pink gradient (#E4405F) primary, photo sharing
        - TikTok: Black (#000000) primary, short video platform
        - Pinterest: Red (#BD081C) primary, visual discovery
        - Reddit: Orange (#FF4500) primary, social news
        - Twitch: Purple (#9146FF) primary, live streaming
        
        IMPORTANT INSTRUCTIONS:
        
        1. IF A BRAND IS LISTED ABOVE: Use the exact colors and fonts specified.
        
        2. IF A BRAND IS NOT LISTED ABOVE: Use your extensive knowledge of brand identities to determine:
           - Their official primary brand color
           - Appropriate fonts that match their design language
           - Their overall aesthetic and design philosophy
           
        3. FOR UNKNOWN BRANDS OR GENERAL THEMES: Create appropriate themes based on:
           - Industry context (tech, finance, fashion, etc.)
           - Cultural context (Japanese, Scandinavian, etc.)
           - Style descriptions (minimalist, playful, corporate, etc.)
           - Color preferences mentioned in the description
        
        EXAMPLES OF YOUR KNOWLEDGE USAGE:
        - Tesla: Use their minimalist black/white aesthetic with clean fonts
        - McDonald's: Use their red and yellow branding
        - Coca-Cola: Use their classic red branding
        - IBM: Use their corporate blue branding
        - Samsung: Use their blue corporate identity
        - Nike: Use their bold black branding with dynamic fonts
        - Adidas: Use their black and white minimalist approach
        - Ferrari: Use their iconic red branding
        - BMW: Use their blue and white corporate colors
        - Any other brand: Apply your knowledge of their visual identity
        
        CULTURAL AND STYLE THEMES:
        - Islamic: Deep green (#006847), gold accents, Arabic fonts like Amiri/Noto Sans Arabic
        - Japanese: Red (#dc143c), minimalist, clean fonts like Noto Serif JP
        - Chinese: Red (#dc143c), traditional, Noto Serif SC fonts
        - Indian: Saffron (#ff6600), warm colors, Devanagari fonts (use Mukti/Hind)
        - Scandinavian: Blue (#4682b4), clean modern fonts like Montserrat
        - Korean: Red (#cd2e3a), modern, Noto Sans KR fonts
        - Minimalist: Gray (#374151), clean, Inter font
        - Dark theme: Dark gray (#1f2937), gothic, Oswald font
        - Gaming: Purple (#8b5cf6), futuristic, Orbitron font
        - Retro: Red (#dc2626), vintage, Bebas Neue font
        - Corporate: Navy blue (#1e40af), professional, Montserrat font
        - Healthcare: Green (#059669), trustworthy, Inter font
        - Finance: Dark green (#065f46), secure, Inter font
        - Education: Blue (#2563eb), academic, Merriweather font
        - Food: Orange (#ea580c), appetizing, Playfair Display font
        - Fashion: Dark gray (#1f2937), elegant, Playfair Display font
        - Travel: Cyan (#0891b2), adventurous, Montserrat font
        
        CONSTRAINTS:
        - Background is ALWAYS white (#ffffff) - DO NOT CHANGE
        - Only customize: primary color, accent color (light tint), fonts
        - Choose fonts ONLY from available library
        - Accent must be very light (90%+ lightness)
        
        ${parsedColor ? `USER SPECIFIED COLOR: ${parsedColor}` : ""}
        ${parsedFonts?.displayFont ? `USER SPECIFIED DISPLAY FONT: ${parsedFonts.displayFont}` : ""}
        ${parsedFonts?.textFont ? `USER SPECIFIED TEXT FONT: ${parsedFonts.textFont}` : ""}
        
        AVAILABLE FONTS: ${availableFonts}
        
        CRITICAL: 
        - Use your vast knowledge of brands, companies, and visual identities
        - If you recognize a brand not in the predefined list, apply their actual brand colors
        - Be creative and accurate based on real-world brand knowledge
        - Explain your reasoning for color and font choices
        
        RESPONSE FORMAT (JSON only):
        {
          "primaryColor": "#000000",
          "accentColor": "#f5f5f5",
          "displayFont": "Inter",
          "textFont": "Inter",
          "displayWeight": 600,
          "textWeight": 400,
          "borderRadius": "0.5rem",
          "reasoning": "Detailed explanation of why you chose these specific colors and fonts based on brand knowledge or theme context"
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are an expert UI/UX designer with extensive knowledge of global brands, companies, and design systems. When a brand is mentioned that's not in the predefined list, use your knowledge of their actual brand colors and design language. Always respond with valid JSON only.",
          maxOutputTokens: 800,
        },
      });

      const aiResponseText = response.text;

      // Parse AI response
      const cleanResponse = aiResponseText
        .replace(/```json\s*|\s*```/g, "")
        .trim();
      const aiResponse = JSON.parse(cleanResponse);

      // Use AI suggestions or parsed values, with fallbacks
      const primaryColor =
        parsedColor || aiResponse.primaryColor || inferredTheme.primaryColor;
      const accentColor = createLightAccent(primaryColor);

      // Validate fonts exist in our library
      const displayFont =
        parsedFonts?.displayFont ||
        googleFonts.find((f) => f.name === aiResponse.displayFont)?.name ||
        inferredTheme.displayFont;
      const textFont =
        parsedFonts?.textFont ||
        googleFonts.find((f) => f.name === aiResponse.textFont)?.name ||
        inferredTheme.textFont;

      const colors = {
        background: "#ffffff", // Always white
        primary: primaryColor,
        secondary: "#f1f5f9",
        accent: accentColor,
        destructive: "#ef4444",
        muted: "#f1f5f9",
        border: "#e2e8f0",
      };

      return {
        name,
        colors,
        fonts: {
          displayFont,
          textFont,
          displayWeight: aiResponse.displayWeight || 600,
          textWeight: aiResponse.textWeight || 400,
        },
        styles: {
          radius: parsedRadius || aiResponse.borderRadius || "0.5rem",
          shadow: "md",
          animationSpeed: 200,
          fadeSpeed: 500,
          scaleSpeed: 300,
          slideSpeed: 500,
          marqueeSpeed: 20,
          shineSpeed: 8,
          animationCurve: "ease",
        },
        cssVariables: generateCSSVariables(colors),
      };
    }
  } catch (error) {
    // Silently fall back to rule-based generation on any error
  }

  // Enhanced fallback with better inference
  return generateThemeFromRules(
    name,
    description,
    parsedColor || inferredTheme.primaryColor,
    parsedRadius,
    parsedFonts || {
      displayFont: inferredTheme.displayFont,
      textFont: inferredTheme.textFont,
    }
  );
}

// New function to infer theme from description using knowledge base
function inferThemeFromDescription(description: string): {
  primaryColor: string;
  displayFont: string;
  textFont: string;
} {
  const desc = description.toLowerCase();

  // Tech/Development brands - Updated with correct colors
  if (desc.includes("vercel")) {
    return { primaryColor: "#000000", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("next.js") || desc.includes("nextjs")) {
    return { primaryColor: "#000000", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("react")) {
    return { primaryColor: "#61DAFB", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("vue")) {
    return { primaryColor: "#4FC08D", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("svelte")) {
    return { primaryColor: "#FF3E00", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("angular")) {
    return { primaryColor: "#DD0031", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("tailwind")) {
    return { primaryColor: "#06B6D4", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("supabase")) {
    return { primaryColor: "#3ECF8E", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("prisma")) {
    return { primaryColor: "#2D3748", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("planetscale")) {
    return { primaryColor: "#6366F1", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("railway")) {
    return { primaryColor: "#8B5CF6", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("render")) {
    return { primaryColor: "#0066CC", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("netlify")) {
    return { primaryColor: "#00C7B7", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("cloudflare")) {
    return { primaryColor: "#F48120", displayFont: "Inter", textFont: "Inter" };
  }

  // Existing brand themes
  if (desc.includes("uber")) {
    return { primaryColor: "#000000", displayFont: "Inter", textFont: "Inter" };
  }
  if (
    desc.includes("material ui") ||
    desc.includes("material design") ||
    desc.includes("google")
  ) {
    return {
      primaryColor: "#1976d2",
      displayFont: "Roboto",
      textFont: "Roboto",
    };
  }
  if (desc.includes("airbnb")) {
    return {
      primaryColor: "#FF5A5F",
      displayFont: "Nunito",
      textFont: "Nunito",
    };
  }
  if (desc.includes("stripe")) {
    return { primaryColor: "#635bff", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("apple") || desc.includes("ios")) {
    return { primaryColor: "#007AFF", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("netflix")) {
    return {
      primaryColor: "#e50914",
      displayFont: "Bebas Neue",
      textFont: "Roboto",
    };
  }
  if (desc.includes("github")) {
    return { primaryColor: "#24292e", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("spotify")) {
    return {
      primaryColor: "#1db954",
      displayFont: "Montserrat",
      textFont: "Open Sans",
    };
  }
  if (desc.includes("discord")) {
    return { primaryColor: "#5865F2", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("slack")) {
    return { primaryColor: "#4A154B", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("facebook") || desc.includes("meta")) {
    return {
      primaryColor: "#1877f2",
      displayFont: "Roboto",
      textFont: "Roboto",
    };
  }
  if (desc.includes("twitter") || desc.includes("x")) {
    return { primaryColor: "#000000", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("linkedin")) {
    return { primaryColor: "#0077B5", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("youtube")) {
    return {
      primaryColor: "#FF0000",
      displayFont: "Roboto",
      textFont: "Roboto",
    };
  }
  if (desc.includes("instagram")) {
    return { primaryColor: "#E4405F", displayFont: "Inter", textFont: "Inter" };
  }

  // Cultural themes
  if (
    desc.includes("islamic") ||
    desc.includes("arabic") ||
    desc.includes("muslim")
  ) {
    return {
      primaryColor: "#006847",
      displayFont: "Amiri",
      textFont: "Noto Sans Arabic",
    };
  }
  if (desc.includes("japanese") || desc.includes("japan")) {
    return {
      primaryColor: "#dc143c",
      displayFont: "Noto Serif JP",
      textFont: "Noto Sans JP",
    };
  }
  if (desc.includes("chinese") || desc.includes("china")) {
    return {
      primaryColor: "#dc143c",
      displayFont: "Noto Serif SC",
      textFont: "Noto Sans SC",
    };
  }
  if (
    desc.includes("indian") ||
    desc.includes("india") ||
    desc.includes("hindi")
  ) {
    return { primaryColor: "#ff6600", displayFont: "Mukta", textFont: "Hind" };
  }
  if (
    desc.includes("scandinavian") ||
    desc.includes("nordic") ||
    desc.includes("swedish")
  ) {
    return {
      primaryColor: "#4682b4",
      displayFont: "Montserrat",
      textFont: "Open Sans",
    };
  }
  if (desc.includes("korean") || desc.includes("korea")) {
    return {
      primaryColor: "#cd2e3a",
      displayFont: "Noto Serif KR",
      textFont: "Noto Sans KR",
    };
  }

  // Industry themes
  if (
    desc.includes("business") ||
    desc.includes("corporate") ||
    desc.includes("professional")
  ) {
    return {
      primaryColor: "#1e40af",
      displayFont: "Montserrat",
      textFont: "Open Sans",
    };
  }
  if (
    desc.includes("finance") ||
    desc.includes("banking") ||
    desc.includes("fintech")
  ) {
    return { primaryColor: "#065f46", displayFont: "Inter", textFont: "Inter" };
  }
  if (
    desc.includes("tech") ||
    desc.includes("startup") ||
    desc.includes("saas")
  ) {
    return { primaryColor: "#3b82f6", displayFont: "Inter", textFont: "Inter" };
  }
  if (desc.includes("gaming") || desc.includes("esports")) {
    return {
      primaryColor: "#8b5cf6",
      displayFont: "Orbitron",
      textFont: "Roboto",
    };
  }
  if (desc.includes("healthcare") || desc.includes("medical")) {
    return { primaryColor: "#059669", displayFont: "Inter", textFont: "Inter" };
  }
  if (
    desc.includes("education") ||
    desc.includes("learning") ||
    desc.includes("academic")
  ) {
    return {
      primaryColor: "#2563eb",
      displayFont: "Merriweather",
      textFont: "Open Sans",
    };
  }
  if (
    desc.includes("food") ||
    desc.includes("restaurant") ||
    desc.includes("culinary")
  ) {
    return {
      primaryColor: "#ea580c",
      displayFont: "Playfair Display",
      textFont: "Lato",
    };
  }
  if (
    desc.includes("fashion") ||
    desc.includes("luxury") ||
    desc.includes("elegant")
  ) {
    return {
      primaryColor: "#1f2937",
      displayFont: "Playfair Display",
      textFont: "Lora",
    };
  }
  if (desc.includes("travel") || desc.includes("tourism")) {
    return {
      primaryColor: "#0891b2",
      displayFont: "Montserrat",
      textFont: "Open Sans",
    };
  }

  // Style themes
  if (
    desc.includes("minimalist") ||
    desc.includes("clean") ||
    desc.includes("simple")
  ) {
    return { primaryColor: "#374151", displayFont: "Inter", textFont: "Inter" };
  }
  if (
    desc.includes("playful") ||
    desc.includes("fun") ||
    desc.includes("colorful")
  ) {
    return {
      primaryColor: "#ec4899",
      displayFont: "Fredoka One",
      textFont: "Nunito",
    };
  }
  if (
    desc.includes("dark") ||
    desc.includes("gothic") ||
    desc.includes("black")
  ) {
    return {
      primaryColor: "#1f2937",
      displayFont: "Oswald",
      textFont: "Roboto",
    };
  }
  if (desc.includes("retro") || desc.includes("vintage")) {
    return {
      primaryColor: "#dc2626",
      displayFont: "Bebas Neue",
      textFont: "Roboto",
    };
  }
  if (desc.includes("modern") || desc.includes("contemporary")) {
    return {
      primaryColor: "#3b82f6",
      displayFont: "Poppins",
      textFont: "Inter",
    };
  }

  // Default fallback
  return { primaryColor: "#3b82f6", displayFont: "Inter", textFont: "Inter" };
}

// Enhanced fallback rule-based generation
function generateThemeFromRules(
  name: string,
  description: string,
  parsedColor?: string | null,
  parsedRadius?: string | null,
  parsedFonts?: { displayFont?: string; textFont?: string } | null
): ThemeData {
  const isDark =
    description.toLowerCase().includes("dark") ||
    description.toLowerCase().includes("night") ||
    description.toLowerCase().includes("black");

  const isVibrant =
    description.toLowerCase().includes("vibrant") ||
    description.toLowerCase().includes("colorful") ||
    description.toLowerCase().includes("bright") ||
    description.toLowerCase().includes("neon");

  const isMinimal =
    description.toLowerCase().includes("minimal") ||
    description.toLowerCase().includes("clean") ||
    description.toLowerCase().includes("simple");

  // Use inferred theme if no parsed values
  const inferredTheme = inferThemeFromDescription(description);

  // Use parsed color or inferred color
  let primaryColor = parsedColor || inferredTheme.primaryColor;

  if (!parsedColor) {
    if (description.toLowerCase().includes("red")) {
      primaryColor = isVibrant ? "#ef4444" : "#dc2626";
    } else if (description.toLowerCase().includes("blue")) {
      primaryColor = isVibrant ? "#3b82f6" : "#1d4ed8";
    } else if (description.toLowerCase().includes("green")) {
      primaryColor = isVibrant ? "#22c55e" : "#16a34a";
    } else if (description.toLowerCase().includes("purple")) {
      primaryColor = isVibrant ? "#a855f7" : "#7c3aed";
    } else if (description.toLowerCase().includes("orange")) {
      primaryColor = isVibrant ? "#f97316" : "#ea580c";
    } else if (description.toLowerCase().includes("pink")) {
      primaryColor = isVibrant ? "#ec4899" : "#db2777";
    } else if (description.toLowerCase().includes("yellow")) {
      primaryColor = isVibrant ? "#eab308" : "#ca8a04";
    } else if (description.toLowerCase().includes("teal")) {
      primaryColor = isVibrant ? "#14b8a6" : "#0d9488";
    } else if (description.toLowerCase().includes("cyan")) {
      primaryColor = isVibrant ? "#06b6d4" : "#0891b2";
    }
  }

  // Generate other colors
  const accentColor = createLightAccent(primaryColor);
  const mutedColor = isDark ? "#1a1a1a" : "#f1f5f9";
  const borderColor = isDark ? "#333333" : "#e2e8f0";

  const colors = {
    background: "#ffffff", // Always white
    primary: primaryColor,
    secondary: "#f1f5f9",
    accent: accentColor,
    destructive: "#ef4444",
    muted: mutedColor,
    border: borderColor,
  };

  // Use parsed fonts or inferred fonts
  let displayFont = parsedFonts?.displayFont || inferredTheme.displayFont;
  let textFont = parsedFonts?.textFont || inferredTheme.textFont;

  // Fallback font selection if not inferred
  if (
    !parsedFonts?.displayFont &&
    !parsedFonts?.textFont &&
    !inferredTheme.displayFont
  ) {
    const sansSerifFonts = googleFonts
      .filter((f) => f.category === "sans-serif")
      .map((f) => f.name);
    const serifFonts = googleFonts
      .filter((f) => f.category === "serif")
      .map((f) => f.name);
    const fancyFonts = googleFonts
      .filter((f) => f.category === "fancy")
      .map((f) => f.name);
    const comicFonts = googleFonts
      .filter((f) => f.category === "comic")
      .map((f) => f.name);
    const displayFonts = googleFonts
      .filter((f) => f.category === "display")
      .map((f) => f.name);

    if (
      description.toLowerCase().includes("gaming") ||
      description.toLowerCase().includes("tech")
    ) {
      displayFont = getRandomItem([
        "Orbitron",
        "Bebas Neue",
        "Russo One",
        "Space Grotesk",
      ]);
      textFont = getRandomItem(["Inter", "Roboto", "Open Sans"]);
    } else if (
      description.toLowerCase().includes("elegant") ||
      description.toLowerCase().includes("luxury")
    ) {
      displayFont = getRandomItem([
        "Playfair Display",
        "Cormorant Garamond",
        "EB Garamond",
      ]);
      textFont = getRandomItem([
        "Lora",
        "Source Serif Pro",
        "Libre Baskerville",
        "Merriweather",
      ]);
    } else if (
      description.toLowerCase().includes("fun") ||
      description.toLowerCase().includes("playful")
    ) {
      displayFont = getRandomItem(comicFonts.slice(0, 5));
      textFont = getRandomItem(["Comic Neue", "Quicksand", "Nunito"]);
    } else if (
      description.toLowerCase().includes("fancy") ||
      description.toLowerCase().includes("script")
    ) {
      displayFont = getRandomItem(fancyFonts.slice(0, 10));
      textFont = getRandomItem(["Lora", "Open Sans", "Source Sans Pro"]);
    } else if (
      description.toLowerCase().includes("bold") ||
      description.toLowerCase().includes("strong")
    ) {
      displayFont = getRandomItem(displayFonts);
      textFont = getRandomItem(["Inter", "Open Sans", "Roboto"]);
    } else if (
      description.toLowerCase().includes("modern") ||
      description.toLowerCase().includes("clean")
    ) {
      displayFont = getRandomItem([
        "Inter",
        "Montserrat",
        "Poppins",
        "Work Sans",
      ]);
      textFont = getRandomItem([
        "Inter",
        "Open Sans",
        "Roboto",
        "Source Sans Pro",
      ]);
    } else if (
      description.toLowerCase().includes("corporate") ||
      description.toLowerCase().includes("business")
    ) {
      displayFont = getRandomItem([
        "Montserrat",
        "Work Sans",
        "IBM Plex Sans",
        "Open Sans",
      ]);
      textFont = getRandomItem([
        "Open Sans",
        "Source Sans Pro",
        "Lato",
        "Roboto",
      ]);
    } else {
      displayFont = getRandomItem(sansSerifFonts.slice(0, 20));
      textFont = getRandomItem(sansSerifFonts.slice(0, 20));
    }
  }

  const displayWeight = isMinimal ? 600 : 700;
  const textWeight = 400;

  // Use parsed radius or generate based on description
  let radius = parsedRadius || "0.375rem";

  if (!parsedRadius) {
    if (
      description.toLowerCase().includes("sharp") ||
      description.toLowerCase().includes("angular")
    ) {
      radius = "0rem";
    } else if (
      description.toLowerCase().includes("rounded") ||
      description.toLowerCase().includes("soft")
    ) {
      radius = "0.5rem";
    } else if (
      description.toLowerCase().includes("pill") ||
      description.toLowerCase().includes("circular")
    ) {
      radius = "1rem";
    }
  }

  let shadow = "md";
  if (description.toLowerCase().includes("flat")) {
    shadow = "none";
  } else if (
    description.toLowerCase().includes("shadow") ||
    description.toLowerCase().includes("depth")
  ) {
    shadow = "lg";
  }

  let animationSpeed = 200;
  if (
    description.toLowerCase().includes("fast") ||
    description.toLowerCase().includes("quick")
  ) {
    animationSpeed = 150;
  } else if (
    description.toLowerCase().includes("slow") ||
    description.toLowerCase().includes("smooth")
  ) {
    animationSpeed = 300;
  }

  return {
    name,
    colors,
    fonts: {
      displayFont,
      textFont,
      displayWeight,
      textWeight,
    },
    styles: {
      radius,
      shadow,
      animationSpeed,
      fadeSpeed: 500,
      scaleSpeed: 300,
      slideSpeed: 500,
      marqueeSpeed: 20,
      shineSpeed: 8,
      animationCurve: "ease",
    },
    cssVariables: generateCSSVariables(colors),
  };
}

// Helper functions
function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
