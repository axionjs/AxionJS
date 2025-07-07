"use client";

import { useState, useEffect } from "react";
import { useThemeStore } from "../../lib/stores/theme-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/registry/new-york/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { Button } from "@/registry/new-york/ui/button";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";
import { Highlight, themes } from "prism-react-renderer";
import {
  Check,
  Copy,
  FileCode2,
  FileText,
  Info,
  Palette,
  Sparkles,
  Type,
  Zap,
  Code2,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getFontImportUrl, getAvailableWeights } from "../../lib/fonts";

// Code block component with syntax highlighting
function CodeBlock({
  code,
  language = "css",
  onCopy,
  copied,
  fileName,
  showLineNumbers = true,
}: {
  code: string;
  language?: string;
  onCopy: () => void;
  copied: boolean;
  fileName?: string;
  showLineNumbers?: boolean;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden border border-border bg-card w-full">
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border text-xs font-mono text-muted-foreground">
          <FileCode2 className="h-3.5 w-3.5" />
          {fileName}
        </div>
      )}
      <div className="relative w-full">
        <div className="max-h-[300px] overflow-auto w-full">
          <Highlight
            theme={isDark ? themes.oneDark : themes.oneLight}
            code={code.trim()}
            language={language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(className, "p-4 text-sm w-full overflow-x-auto")}
                style={{
                  ...style,
                  backgroundColor: "transparent",
                  margin: 0,
                  minWidth: "100%",
                }}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="min-h-[1.5rem] whitespace-pre"
                  >
                    {showLineNumbers && (
                      <span className="mr-4 text-muted-foreground/50 select-none inline-block w-8 text-right">
                        {i + 1}
                      </span>
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 h-8 gap-1.5 text-xs shadow-sm bg-background/80 backdrop-blur-sm"
          onClick={onCopy}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// Font weight mapping
const weightLabels: Record<number, string> = {
  100: "Thin",
  200: "ExtraLight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
  800: "ExtraBold",
  900: "Black",
};

export default function ThemeExportPanel() {
  const { isExportPanelOpen, setExportPanelOpen, activeThemeData } =
    useThemeStore();
  const [activeTab, setActiveTab] = useState("colors");
  const [activeColorTab, setActiveColorTab] = useState("tailwind-v3");
  const [isNextJs, setIsNextJs] = useState(true);
  const [isTailwindV4, setIsTailwindV4] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Reset copied states when panel opens/closes
  useEffect(() => {
    setCopiedStates({});
  }, [isExportPanelOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  // Generate CSS variables with HSL values (no hsl() wrapper)
  const cssVariables = `
/* Light mode variables */
:root {
  /* Colors */
  --background: ${activeThemeData.cssVariables.light.background};
  --foreground: ${activeThemeData.cssVariables.light.foreground};
  --card: ${activeThemeData.cssVariables.light.card};
  --card-foreground: ${activeThemeData.cssVariables.light["card-foreground"]};
  --popover: ${activeThemeData.cssVariables.light.popover};
  --popover-foreground: ${activeThemeData.cssVariables.light["popover-foreground"]};
  --primary: ${activeThemeData.cssVariables.light.primary};
  --primary-foreground: ${activeThemeData.cssVariables.light["primary-foreground"]};
  --secondary: ${activeThemeData.cssVariables.light.secondary};
  --secondary-foreground: ${activeThemeData.cssVariables.light["secondary-foreground"]};
  --tertiary: ${activeThemeData.cssVariables.light.tertiary || "240 8% 95%"};
  --tertiary-foreground: ${activeThemeData.cssVariables.light["tertiary-foreground"] || "240 8% 20%"};
  --neutral: ${activeThemeData.cssVariables.light.neutral || "240 5% 90%"};
  --neutral-foreground: ${activeThemeData.cssVariables.light["neutral-foreground"] || "240 5% 15%"};
  --muted: ${activeThemeData.cssVariables.light.muted};
  --muted-foreground: ${activeThemeData.cssVariables.light["muted-foreground"]};
  --accent: ${activeThemeData.cssVariables.light.accent};
  --accent-foreground: ${activeThemeData.cssVariables.light["accent-foreground"]};
  --destructive: ${activeThemeData.cssVariables.light.destructive};
  --destructive-foreground: ${activeThemeData.cssVariables.light["destructive-foreground"]};
  --border: ${activeThemeData.cssVariables.light.border};
  --input: ${activeThemeData.cssVariables.light.input};
  --ring: ${activeThemeData.cssVariables.light.ring};
  --shadow: ${activeThemeData.cssVariables.light.shadow || "0 10px 50px rgba(0, 0, 0, 0.1)"};
  --gradient-start: ${activeThemeData.cssVariables.light["gradient-start"] || "220 50% 40%"};
  --gradient-end: ${activeThemeData.cssVariables.light["gradient-end"] || "280 40% 30%"};
  --chart-1: ${activeThemeData.cssVariables.light["chart-1"]};
  --chart-2: ${activeThemeData.cssVariables.light["chart-2"]};
  --chart-3: ${activeThemeData.cssVariables.light["chart-3"]};
  --chart-4: ${activeThemeData.cssVariables.light["chart-4"]};
  --chart-5: ${activeThemeData.cssVariables.light["chart-5"]};
  --chart-6: ${activeThemeData.cssVariables.light["chart-6"] || "300 70% 50%"};
  --radius: ${activeThemeData.styles.radius};

  /* Typography */
  --font-display: "${activeThemeData.fonts.displayFont}", sans-serif;
  --font-text: "${activeThemeData.fonts.textFont}", sans-serif;
  --font-display-weight: ${activeThemeData.fonts.displayWeight};
  --font-text-weight: ${activeThemeData.fonts.textWeight};
}

/* Dark mode variables */
.dark {
  --background: ${activeThemeData.cssVariables.dark.background};
  --foreground: ${activeThemeData.cssVariables.dark.foreground};
  --card: ${activeThemeData.cssVariables.dark.card};
  --card-foreground: ${activeThemeData.cssVariables.dark["card-foreground"]};
  --popover: ${activeThemeData.cssVariables.dark.popover};
  --popover-foreground: ${activeThemeData.cssVariables.dark["popover-foreground"]};
  --primary: ${activeThemeData.cssVariables.dark.primary};
  --primary-foreground: ${activeThemeData.cssVariables.dark["primary-foreground"]};
  --secondary: ${activeThemeData.cssVariables.dark.secondary};
  --secondary-foreground: ${activeThemeData.cssVariables.dark["secondary-foreground"]};
  --tertiary: ${activeThemeData.cssVariables.dark.tertiary || "240 8% 15%"};
  --tertiary-foreground: ${activeThemeData.cssVariables.dark["tertiary-foreground"] || "240 8% 80%"};
  --neutral: ${activeThemeData.cssVariables.dark.neutral || "240 5% 20%"};
  --neutral-foreground: ${activeThemeData.cssVariables.dark["neutral-foreground"] || "240 5% 85%"};
  --muted: ${activeThemeData.cssVariables.dark.muted};
  --muted-foreground: ${activeThemeData.cssVariables.dark["muted-foreground"]};
  --accent: ${activeThemeData.cssVariables.dark.accent};
  --accent-foreground: ${activeThemeData.cssVariables.dark["accent-foreground"]};
  --destructive: ${activeThemeData.cssVariables.dark.destructive};
  --destructive-foreground: ${activeThemeData.cssVariables.dark["destructive-foreground"]};
  --border: ${activeThemeData.cssVariables.dark.border};
  --input: ${activeThemeData.cssVariables.dark.input};
  --ring: ${activeThemeData.cssVariables.dark.ring};
  --chart-1: ${activeThemeData.cssVariables.dark["chart-1"]};
  --chart-2: ${activeThemeData.cssVariables.dark["chart-2"]};
  --chart-3: ${activeThemeData.cssVariables.dark["chart-3"]};
  --chart-4: ${activeThemeData.cssVariables.dark["chart-4"]};
  --chart-5: ${activeThemeData.cssVariables.dark["chart-5"]};
  --chart-6: ${activeThemeData.cssVariables.dark["chart-6"]};
}
`;

  // Add helper function to convert HSL to OKLCH
  function hslToOklch(hsl: string): string {
    // This is a simplified conversion - in production you'd want a proper color conversion library
    const [h, s, l] = hsl.split(" ").map((val, i) => {
      if (i === 0) return Number.parseInt(val);
      return Number.parseInt(val.replace("%", ""));
    });

    // Simplified OKLCH conversion (this would need a proper color space conversion in production)
    const lightness = l / 100;
    const chroma = (s / 100) * 0.4; // Simplified chroma calculation
    const hue = h;

    return `${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue}`;
  }

  // Generate OKLCH CSS variables for Tailwind v4
  const cssVariablesV4 = `
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --font-display: var(--display-family);
  --font-text: var(--text-family);
}

:root {
  --radius: ${activeThemeData.styles.radius};
  --background: oklch(${hslToOklch(activeThemeData.cssVariables.light.background)});
  --foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light.foreground)});
  --card: oklch(${hslToOklch(activeThemeData.cssVariables.light.card)});
  --card-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["card-foreground"])});
  --popover: oklch(${hslToOklch(activeThemeData.cssVariables.light.popover)});
  --popover-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["popover-foreground"])});
  --primary: oklch(${hslToOklch(activeThemeData.cssVariables.light.primary)});
  --primary-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["primary-foreground"])});
  --secondary: oklch(${hslToOklch(activeThemeData.cssVariables.light.secondary)});
  --secondary-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["secondary-foreground"])});
  --muted: oklch(${hslToOklch(activeThemeData.cssVariables.light.muted)});
  --muted-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["muted-foreground"])});
  --accent: oklch(${hslToOklch(activeThemeData.cssVariables.light.accent)});
  --accent-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["accent-foreground"])});
  --destructive: oklch(${hslToOklch(activeThemeData.cssVariables.light.destructive)});
  --destructive-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.light["destructive-foreground"])});
  --border: oklch(${hslToOklch(activeThemeData.cssVariables.light.border)});
  --input: oklch(${hslToOklch(activeThemeData.cssVariables.light.input)});
  --ring: oklch(${hslToOklch(activeThemeData.cssVariables.light.ring)});
  --chart-1: oklch(${hslToOklch(activeThemeData.cssVariables.light["chart-1"])});
  --chart-2: oklch(${hslToOklch(activeThemeData.cssVariables.light["chart-2"])});
  --chart-3: oklch(${hslToOklch(activeThemeData.cssVariables.light["chart-3"])});
  --chart-4: oklch(${hslToOklch(activeThemeData.cssVariables.light["chart-4"])});
  --chart-5: oklch(${hslToOklch(activeThemeData.cssVariables.light["chart-5"])});
  --font-display: "${activeThemeData.fonts.displayFont}";
  --font-text: "${activeThemeData.fonts.textFont}";
}

.dark {
  --background: oklch(${hslToOklch(activeThemeData.cssVariables.dark.background)});
  --foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark.foreground)});
  --card: oklch(${hslToOklch(activeThemeData.cssVariables.dark.card)});
  --card-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["card-foreground"])});
  --popover: oklch(${hslToOklch(activeThemeData.cssVariables.dark.popover)});
  --popover-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["popover-foreground"])});
  --primary: oklch(${hslToOklch(activeThemeData.cssVariables.dark.primary)});
  --primary-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["primary-foreground"])});
  --secondary: oklch(${hslToOklch(activeThemeData.cssVariables.dark.secondary)});
  --secondary-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["secondary-foreground"])});
  --muted: oklch(${hslToOklch(activeThemeData.cssVariables.dark.muted)});
  --muted-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["muted-foreground"])});
  --accent: oklch(${hslToOklch(activeThemeData.cssVariables.dark.accent)});
  --accent-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["accent-foreground"])});
  --destructive: oklch(${hslToOklch(activeThemeData.cssVariables.dark.destructive)});
  --destructive-foreground: oklch(${hslToOklch(activeThemeData.cssVariables.dark["destructive-foreground"])});
  --border: oklch(${hslToOklch(activeThemeData.cssVariables.dark.border)});
  --input: oklch(${hslToOklch(activeThemeData.cssVariables.dark.input)});
  --ring: oklch(${hslToOklch(activeThemeData.cssVariables.dark.ring)});
  --chart-1: oklch(${hslToOklch(activeThemeData.cssVariables.dark["chart-1"])});
  --chart-2: oklch(${hslToOklch(activeThemeData.cssVariables.dark["chart-2"])});
  --chart-3: oklch(${hslToOklch(activeThemeData.cssVariables.dark["chart-3"])});
  --chart-4: oklch(${hslToOklch(activeThemeData.cssVariables.dark["chart-4"])});
  --chart-5: oklch(${hslToOklch(activeThemeData.cssVariables.dark["chart-5"])});
}
`;

  // Generate Tailwind config v3 with animations
  const tailwindConfigV3 = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 2px)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        text: ["var(--font-text)", "sans-serif"],
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        fadeIn: "fadeIn ${activeThemeData.styles.fadeSpeed || 500}ms ${activeThemeData.styles.animationCurve || "ease"}",
        fadeOut: "fadeOut ${activeThemeData.styles.fadeSpeed || 500}ms ${activeThemeData.styles.animationCurve || "ease"}",
        scaleUp: "scaleUp ${activeThemeData.styles.scaleSpeed || 300}ms ${activeThemeData.styles.animationCurve || "ease"}",
        scaleDown: "scaleDown ${activeThemeData.styles.scaleSpeed || 300}ms ${activeThemeData.styles.animationCurve || "ease"}",
        slideIn: "slideIn ${activeThemeData.styles.slideSpeed || 500}ms ${activeThemeData.styles.animationCurve || "ease"}",
        slideOut: "slideOut ${activeThemeData.styles.slideSpeed || 500}ms ${activeThemeData.styles.animationCurve || "ease"}",
        shine: "shine ${activeThemeData.styles.shineSpeed || 8}s ${activeThemeData.styles.animationCurve || "ease"} infinite",
        marquee: "marquee ${activeThemeData.styles.marqueeSpeed || 20}s linear infinite",
        "marquee-vertical": "marquee-vertical ${activeThemeData.styles.marqueeSpeed || 20}s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
`;

  // Typography configurations
  const nextjsLayoutCodeV4 = `import { ${activeThemeData.fonts.displayFont.replace(/\s+/g, "_").replace(/\+/g, "_")}, ${activeThemeData.fonts.textFont.replace(/\s+/g, "_").replace(/\+/g, "_")} } from 'next/font/google';

const ${activeThemeData.fonts.displayFont.toLowerCase().replace(/\s+/g, "").replace(/\+/g, "")} = ${activeThemeData.fonts.displayFont.replace(/\s+/g, "_").replace(/\+/g, "_")}({
  subsets: ['latin'],
  weight: ['${activeThemeData.fonts.displayWeight}'],
  variable: '--display-family',
});

const ${activeThemeData.fonts.textFont.toLowerCase().replace(/\s+/g, "").replace(/\+/g, "")} = ${activeThemeData.fonts.textFont.replace(/\s+/g, "_").replace(/\+/g, "_")}({
  subsets: ['latin'],
  weight: ['${activeThemeData.fonts.textWeight}'],
  variable: '--text-family',
});

export default function RootLayout({ 
    children 
  }: { 
    children: React.ReactNode
  }) {
  return (
    <html lang="en" className={\`\${${activeThemeData.fonts.displayFont.toLowerCase().replace(/\s+/g, "").replace(/\+/g, "")}.variable} \${${activeThemeData.fonts.textFont.toLowerCase().replace(/\s+/g, "").replace(/\+/g, "")}.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`;

  const nextjsGlobalsV4 = `:root {
  --display-weight: ${activeThemeData.fonts.displayWeight};
  --text-weight: ${activeThemeData.fonts.textWeight};
}

@theme inline {
  --font-display: var(--display-family);
  --font-text: var(--text-family);
}

@layer base {
  .font-display {
    font-weight: var(--display-weight);
  }
  .font-text {
    font-weight: var(--text-weight);
  }
}`;

  const standaloneV4Code = `@import url('${getFontImportUrl(activeThemeData.fonts.displayFont)}');
@import url('${getFontImportUrl(activeThemeData.fonts.textFont)}');

:root {
  --display-family: "${activeThemeData.fonts.displayFont}", "sans-serif";
  --display-weight: ${activeThemeData.fonts.displayWeight};
  --text-family: "${activeThemeData.fonts.textFont}", "sans-serif";
  --text-weight: ${activeThemeData.fonts.textWeight};
}

@theme inline {
  --font-display: var(--display-family);
  --font-text: var(--text-family);
}

@layer base {
  .font-display {
    font-weight: var(--display-weight);
  }
  .font-text {
    font-weight: var(--text-weight);
  }
}`;

  const tailwindConfigV3Only = `{
  fontFamily: {
    display: ['${activeThemeData.fonts.displayFont}', ...fontFamily.sans],
    text: ['${activeThemeData.fonts.textFont}', ...fontFamily.sans],
  },
}`;

  const tailwindV3GlobalsCode = `@import url('${getFontImportUrl(activeThemeData.fonts.displayFont)}');
@import url('${getFontImportUrl(activeThemeData.fonts.textFont)}');

:root {
  --display-weight: ${activeThemeData.fonts.displayWeight};
  --text-weight: ${activeThemeData.fonts.textWeight};
}

@layer base {
  .font-display {
    font-weight: var(--display-weight);
  }
  .font-text {
    font-weight: var(--text-weight);
  }
}`;

  const cssOnlyCode = `@import url('${getFontImportUrl(activeThemeData.fonts.displayFont)}');
@import url('${getFontImportUrl(activeThemeData.fonts.textFont)}');

:root {
  --display-family: "${activeThemeData.fonts.displayFont}", "sans-serif";
  --display-weight: ${activeThemeData.fonts.displayWeight};
  --text-family: "${activeThemeData.fonts.textFont}", "sans-serif";
  --text-weight: ${activeThemeData.fonts.textWeight};
}

.font-display {
  font-family: var(--display-family);
  font-weight: var(--display-weight);
}
.font-text {
  font-family: var(--text-family);
  font-weight: var(--text-weight);
}`;

  return (
    <Sheet open={isExportPanelOpen} onOpenChange={setExportPanelOpen}>
      <SheetContent
        side="right"
        className="w-full sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1100px] sm:max-w-none p-0 flex flex-col h-full overflow-hidden"
      >
        <SheetHeader className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <SheetTitle>Export Theme</SheetTitle>
          </div>
          <SheetDescription>
            Export your theme configuration for use in your projects
          </SheetDescription>
        </SheetHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col min-h-0 overflow-hidden"
        >
          <div className="border-b bg-background/95 shrink-0">
            <div className="px-6">
              <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0">
                <TabsTrigger
                  value="colors"
                  className={cn(
                    "relative rounded-none border-b-2 border-transparent pb-3 pt-2 font-medium flex items-center gap-1.5",
                    activeTab === "colors" && "border-primary text-primary"
                  )}
                >
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger
                  value="typography"
                  className={cn(
                    "relative rounded-none border-b-2 border-transparent pb-3 pt-2 font-medium flex items-center gap-1.5",
                    activeTab === "typography" && "border-primary text-primary"
                  )}
                >
                  <Type className="h-4 w-4" />
                  Typography
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-8">
                <TabsContent value="colors" className="mt-0 space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">
                        Color Configuration
                      </h3>
                    </div>

                    {/* Nested tabs for Tailwind versions */}
                    <Tabs
                      value={activeColorTab}
                      onValueChange={setActiveColorTab}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="tailwind-v3"
                          className="flex items-center gap-2"
                        >
                          <Palette className="h-4 w-4" />
                          Tailwind v3 (HSL)
                        </TabsTrigger>
                        <TabsTrigger
                          value="tailwind-v4"
                          className="flex items-center gap-2"
                        >
                          <Zap className="h-4 w-4" />
                          Tailwind v4 (OKLCH)
                        </TabsTrigger>
                      </TabsList>

                      <div className="mt-6 space-y-6">
                        <TabsContent value="tailwind-v3" className="space-y-6">
                          <Alert className="bg-primary/5 border-primary/20">
                            <Info className="h-4 w-4 text-primary" />
                            <AlertDescription className="text-sm">
                              This configuration uses HSL color format and
                              includes animations. Copy both the CSS variables
                              and Tailwind config for complete setup.
                            </AlertDescription>
                          </Alert>

                          {/* CSS Variables Section */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <h4 className="text-base font-medium">
                                CSS Variables
                              </h4>
                            </div>
                            <CodeBlock
                              code={cssVariables}
                              language="css"
                              onCopy={() => handleCopy(cssVariables, "css-v3")}
                              copied={!!copiedStates["css-v3"]}
                              fileName="globals.css"
                            />
                          </div>

                          {/* Tailwind Config Section */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileCode2 className="h-4 w-4 text-primary" />
                              <h4 className="text-base font-medium">
                                Tailwind Configuration
                              </h4>
                            </div>
                            <CodeBlock
                              code={tailwindConfigV3}
                              language="javascript"
                              onCopy={() =>
                                handleCopy(tailwindConfigV3, "tailwind-v3")
                              }
                              copied={!!copiedStates["tailwind-v3"]}
                              fileName="tailwind.config.js"
                            />
                          </div>

                          <Card className="bg-secondary/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">
                                📋 Implementation Steps
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="text-sm space-y-2 text-muted-foreground">
                                <li>
                                  <strong>1. Add CSS variables</strong> - Copy
                                  the CSS variables above to your{" "}
                                  <code>globals.css</code> file
                                </li>
                                <li>
                                  <strong>2. Replace tailwind.config.js</strong>{" "}
                                  - Copy the Tailwind configuration above
                                </li>
                                <li>
                                  <strong>3. Install dependencies</strong> - Run{" "}
                                  <code>npm install tailwindcss-animate</code>
                                </li>
                                <li>
                                  <strong>4. Use color classes</strong> - Apply
                                  colors with{" "}
                                  <code>bg-primary text-foreground</code>
                                </li>
                                <li>
                                  <strong>5. Use animations</strong> - Apply
                                  animations with{" "}
                                  <code>animate-fadeIn animate-scaleUp</code>
                                </li>
                              </ol>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="tailwind-v4" className="space-y-6">
                          <Alert className="bg-primary/5 border-primary/20">
                            <Info className="h-4 w-4 text-primary" />
                            <AlertDescription className="text-sm">
                              This configuration uses OKLCH color format with
                              @theme inline directive. Compatible with Tailwind
                              CSS v4.x (beta). OKLCH provides better color
                              accuracy and perceptual uniformity.
                            </AlertDescription>
                          </Alert>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <h4 className="text-base font-medium">
                                OKLCH CSS Variables
                              </h4>
                            </div>
                            <CodeBlock
                              code={cssVariablesV4}
                              language="css"
                              onCopy={() =>
                                handleCopy(cssVariablesV4, "tailwind-v4")
                              }
                              copied={!!copiedStates["tailwind-v4"]}
                              fileName="globals.css"
                            />
                          </div>

                          <Card className="bg-secondary/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">
                                📋 Implementation Steps
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="text-sm space-y-2 text-muted-foreground">
                                <li>
                                  <strong>1. Install Tailwind v4</strong> - Run{" "}
                                  <code>
                                    npm install tailwindcss@next
                                    @tailwindcss/vite@next
                                  </code>
                                </li>
                                <li>
                                  <strong>2. Add @theme directive</strong> -
                                  Copy the configuration above to{" "}
                                  <code>globals.css</code>
                                </li>
                                <li>
                                  <strong>3. Remove tailwind.config.js</strong>{" "}
                                  - Not needed with @theme inline
                                </li>
                                <li>
                                  <strong>4. Use OKLCH colors</strong> - Colors
                                  are automatically available with better
                                  accuracy
                                </li>
                                <li>
                                  <strong>5. Apply classes</strong> - Use{" "}
                                  <code>bg-primary text-foreground</code> as
                                  usual
                                </li>
                              </ol>
                            </CardContent>
                          </Card>

                          <Card className="bg-primary/5 border-primary/20">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">
                                🎨 OKLCH Benefits
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="text-sm space-y-2 text-muted-foreground">
                                <li>
                                  ✅ <strong>Perceptual uniformity</strong> -
                                  Colors appear more consistent to the human eye
                                </li>
                                <li>
                                  ✅ <strong>Better color mixing</strong> -
                                  Gradients and transitions look more natural
                                </li>
                                <li>
                                  ✅ <strong>Wider gamut support</strong> -
                                  Access to more vibrant colors on modern
                                  displays
                                </li>
                                <li>
                                  ✅ <strong>Future-proof</strong> - Modern
                                  color space standard
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="mt-0 space-y-6">
                  <div className="space-y-6">
                    {/* Font Preview Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Type className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">
                          Typography Configuration
                        </h3>
                      </div>

                      {/* Font Preview Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Display Font */}
                        <Card className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Type className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-muted-foreground">
                                Display Font
                              </span>
                            </div>
                            <h2
                              className="text-2xl font-bold truncate"
                              style={{
                                fontFamily: `"${activeThemeData.fonts.displayFont}", sans-serif`,
                                fontWeight: activeThemeData.fonts.displayWeight,
                              }}
                            >
                              {activeThemeData.fonts.displayFont}
                            </h2>
                            <div className="flex flex-wrap gap-1">
                              {getAvailableWeights(
                                activeThemeData.fonts.displayFont
                              )
                                .slice(0, 4)
                                .map((weight) => (
                                  <Badge
                                    key={weight}
                                    variant={
                                      weight ===
                                      activeThemeData.fonts.displayWeight
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {weight}
                                  </Badge>
                                ))}
                              {getAvailableWeights(
                                activeThemeData.fonts.displayFont
                              ).length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +
                                  {getAvailableWeights(
                                    activeThemeData.fonts.displayFont
                                  ).length - 4}{" "}
                                  more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Card>

                        {/* Text Font */}
                        <Card className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-muted-foreground">
                                Text Font
                              </span>
                            </div>
                            <h2
                              className="text-2xl font-bold truncate"
                              style={{
                                fontFamily: `"${activeThemeData.fonts.textFont}", sans-serif`,
                                fontWeight: activeThemeData.fonts.textWeight,
                              }}
                            >
                              {activeThemeData.fonts.textFont}
                            </h2>
                            <div className="flex flex-wrap gap-1">
                              {getAvailableWeights(
                                activeThemeData.fonts.textFont
                              )
                                .slice(0, 4)
                                .map((weight) => (
                                  <Badge
                                    key={weight}
                                    variant={
                                      weight ===
                                      activeThemeData.fonts.textWeight
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {weight}
                                  </Badge>
                                ))}
                              {getAvailableWeights(
                                activeThemeData.fonts.textFont
                              ).length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +
                                  {getAvailableWeights(
                                    activeThemeData.fonts.textFont
                                  ).length - 4}{" "}
                                  more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>

                    {/* Configuration Options */}
                    <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                      <div className="space-y-4">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Configuration Options
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Framework Toggle */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Framework
                            </Label>
                            <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border">
                              <Code2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Next.js</span>
                              <Switch
                                checked={isNextJs}
                                onCheckedChange={setIsNextJs}
                                className="data-[state=checked]:bg-primary"
                              />
                              <span className="text-sm">Standalone</span>
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>

                          {/* Tailwind Version Toggle */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Tailwind Version
                            </Label>
                            <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border">
                              <span className="text-sm font-medium text-blue-600">
                                v3
                              </span>
                              <Switch
                                checked={isTailwindV4}
                                onCheckedChange={setIsTailwindV4}
                                className="data-[state=checked]:bg-primary"
                              />
                              <span className="text-sm font-medium text-purple-600">
                                v4
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                Beta
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Dynamic Content Based on Selections */}
                    <div className="space-y-6">
                      {isNextJs ? (
                        // Next.js Configuration
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <Code2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800 dark:text-green-200">
                              Next.js + Google Fonts Configuration
                            </span>
                          </div>

                          {/* Layout Configuration */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileCode2 className="h-4 w-4 text-primary" />
                              <h4 className="text-base font-medium">
                                app/layout.tsx
                              </h4>
                            </div>
                            <CodeBlock
                              code={
                                isTailwindV4
                                  ? nextjsLayoutCodeV4
                                  : nextjsLayoutCodeV4
                              }
                              language="typescript"
                              onCopy={() =>
                                handleCopy(
                                  isTailwindV4
                                    ? nextjsLayoutCodeV4
                                    : nextjsLayoutCodeV4,
                                  "nextjs-layout"
                                )
                              }
                              copied={!!copiedStates["nextjs-layout"]}
                              fileName="app/layout.tsx"
                            />
                          </div>

                          {/* Globals CSS */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <h4 className="text-base font-medium">
                                app/globals.css
                              </h4>
                            </div>
                            <CodeBlock
                              code={
                                isTailwindV4
                                  ? nextjsGlobalsV4
                                  : tailwindV3GlobalsCode
                              }
                              language="css"
                              onCopy={() =>
                                handleCopy(
                                  isTailwindV4
                                    ? nextjsGlobalsV4
                                    : tailwindV3GlobalsCode,
                                  "nextjs-globals"
                                )
                              }
                              copied={!!copiedStates["nextjs-globals"]}
                              fileName="app/globals.css"
                            />
                          </div>

                          {!isTailwindV4 && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Settings className="h-4 w-4 text-primary" />
                                <h4 className="text-base font-medium">
                                  tailwind.config.ts (fontFamily section)
                                </h4>
                              </div>
                              <CodeBlock
                                code={tailwindConfigV3Only}
                                language="javascript"
                                onCopy={() =>
                                  handleCopy(
                                    tailwindConfigV3Only,
                                    "tailwind-config-fonts"
                                  )
                                }
                                copied={!!copiedStates["tailwind-config-fonts"]}
                                fileName="tailwind.config.ts"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        // Standalone Configuration
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                              {isTailwindV4
                                ? "Tailwind v4 Configuration"
                                : "CSS Only Configuration"}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <h4 className="text-base font-medium">
                                globals.css
                              </h4>
                            </div>
                            <CodeBlock
                              code={
                                isTailwindV4 ? standaloneV4Code : cssOnlyCode
                              }
                              language="css"
                              onCopy={() =>
                                handleCopy(
                                  isTailwindV4 ? standaloneV4Code : cssOnlyCode,
                                  "standalone-css"
                                )
                              }
                              copied={!!copiedStates["standalone-css"]}
                              fileName="globals.css"
                            />
                          </div>
                        </div>
                      )}

                      {/* Usage Examples */}
                      <Card className="bg-secondary/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Usage Examples
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">
                                Apply Display Font:
                              </h5>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                className="font-display text-2xl font-bold"
                              </code>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">
                                Apply Text Font:
                              </h5>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                className="font-text text-base"
                              </code>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">
                                Custom Font Weights:
                              </h5>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                className="font-display font-display-normal"
                              </code>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Implementation Steps */}
                      <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">
                            📋 Implementation Steps
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ol className="text-sm space-y-2 text-muted-foreground">
                            {isNextJs ? (
                              <>
                                <li>
                                  <strong>1. Install Next.js fonts</strong> -
                                  Google Fonts are built into Next.js
                                </li>
                                <li>
                                  <strong>2. Update layout.tsx</strong> - Copy
                                  the layout configuration above
                                </li>
                                <li>
                                  <strong>
                                    3.{" "}
                                    {isTailwindV4
                                      ? "Add CSS configuration"
                                      : "Update Tailwind config"}
                                  </strong>{" "}
                                  - Copy the{" "}
                                  {isTailwindV4 ? "CSS" : "JavaScript"}{" "}
                                  configuration
                                </li>
                                <li>
                                  <strong>4. Add global styles</strong> - Copy
                                  the CSS globals for font utilities
                                </li>
                                <li>
                                  <strong>5. Use font classes</strong> - Apply{" "}
                                  <code>font-display</code> and{" "}
                                  <code>font-text</code> classes
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  <strong>1. Import Google Fonts</strong> - Add
                                  font imports to your CSS
                                </li>
                                <li>
                                  <strong>
                                    2.{" "}
                                    {isTailwindV4
                                      ? "Configure CSS variables"
                                      : "Update Tailwind config"}
                                  </strong>{" "}
                                  - Set up font families in{" "}
                                  {isTailwindV4 ? "CSS" : "config"}
                                </li>
                                <li>
                                  <strong>3. Add font utilities</strong> - Copy
                                  the CSS utilities for font classes
                                </li>
                                <li>
                                  <strong>4. Apply globally</strong> - Set
                                  default fonts for body and headings
                                </li>
                                <li>
                                  <strong>5. Use font classes</strong> - Apply{" "}
                                  <code>font-display</code> and{" "}
                                  <code>font-text</code> classes
                                </li>
                              </>
                            )}
                          </ol>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
