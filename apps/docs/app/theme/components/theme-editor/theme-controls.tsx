"use client";

import { useThemeStore } from "../..//lib/stores/theme-store";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { Slider } from "@/registry/new-york/ui/slider";
import {
  getSortedFonts,
  getAvailableWeights,
  fontCategories,
} from "../../lib/fonts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/new-york/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Button } from "@/registry/new-york/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Check,
  ChevronsUpDown,
  Palette,
  Copy,
  RotateCcw,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Color conversion utilities
const colorUtils = {
  // Convert hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  },

  // Convert RGB to hex
  rgbToHex: (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  // Convert hex to HSL
  hexToHsl: (hex: string): { h: number; s: number; l: number } => {
    const { r, g, b } = colorUtils.hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  },

  // Convert HSL to hex
  hslToHex: (h: number, s: number, l: number): string => {
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

    return colorUtils.rgbToHex(r, g, b);
  },

  // Convert hex to OKLCH (simplified approximation)
  hexToOklch: (hex: string): { l: number; c: number; h: number } => {
    const { r, g, b } = colorUtils.hexToRgb(hex);

    // Simplified OKLCH conversion (for display purposes)
    // In production, you'd want a proper color space conversion library
    const rLinear = Math.pow(r / 255, 2.2);
    const gLinear = Math.pow(g / 255, 2.2);
    const bLinear = Math.pow(b / 255, 2.2);

    const l = Math.pow(
      0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear,
      1 / 2.2
    );

    // Simplified chroma and hue calculation
    const { h: hslH, s } = colorUtils.hexToHsl(hex);
    const c = (s / 100) * 0.4; // Simplified chroma

    return {
      l: Math.round(l * 100) / 100,
      c: Math.round(c * 1000) / 1000,
      h: hslH,
    };
  },

  // Convert OKLCH to hex (simplified)
  oklchToHex: (l: number, c: number, h: number): string => {
    // Simplified conversion - convert through HSL
    const s = Math.min(100, c * 250); // Simplified saturation
    const lightness = Math.min(100, l * 100); // Convert to percentage

    return colorUtils.hslToHex(h, s, lightness);
  },

  // Validate hex color
  isValidHex: (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  },

  // Parse color input
  parseColorInput: (
    input: string,
    format: "hex" | "rgb" | "hsl" | "oklch"
  ): string | null => {
    const cleanInput = input.trim();

    switch (format) {
      case "hex":
        if (colorUtils.isValidHex(cleanInput)) {
          return cleanInput.length === 4
            ? `#${cleanInput[1]}${cleanInput[1]}${cleanInput[2]}${cleanInput[2]}${cleanInput[3]}${cleanInput[3]}`
            : cleanInput;
        }
        break;

      case "rgb":
        const rgbMatch = cleanInput.match(
          /rgb\s*$$\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$$/
        );
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch;
          return colorUtils.rgbToHex(
            Number.parseInt(r),
            Number.parseInt(g),
            Number.parseInt(b)
          );
        }
        break;

      case "hsl":
        const hslMatch = cleanInput.match(
          /hsl\s*$$\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*$$/
        );
        if (hslMatch) {
          const [, h, s, l] = hslMatch;
          return colorUtils.hslToHex(
            Number.parseInt(h),
            Number.parseInt(s),
            Number.parseInt(l)
          );
        }
        break;

      case "oklch":
        const oklchMatch = cleanInput.match(
          /oklch\s*$$\s*([\d.]+)\s+([\d.]+)\s+(\d+)\s*$$/
        );
        if (oklchMatch) {
          const [, l, c, h] = oklchMatch;
          return colorUtils.oklchToHex(
            Number.parseFloat(l),
            Number.parseFloat(c),
            Number.parseInt(h)
          );
        }
        break;
    }

    return null;
  },
};

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Enhanced Color Picker Component
function EnhancedColorPicker({
  value,
  onChange,
  label = "Color",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState<
    "hex" | "rgb" | "hsl" | "oklch"
  >("hex");
  const [inputValue, setInputValue] = useState(value);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the input value to prevent excessive updates
  const debouncedInputValue = useDebounce(inputValue, 300);

  // Memoized color conversions
  const colorFormats = useMemo(() => {
    if (!colorUtils.isValidHex(value)) return null;

    const rgb = colorUtils.hexToRgb(value);
    const hsl = colorUtils.hexToHsl(value);
    const oklch = colorUtils.hexToOklch(value);

    return {
      hex: value,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      oklch: `oklch(${oklch.l} ${oklch.c} ${oklch.h})`,
    };
  }, [value]);

  // Update input value when external value changes (but not when user is typing)
  useEffect(() => {
    if (!isInputFocused && colorFormats) {
      setInputValue(colorFormats[activeFormat]);
    }
  }, [value, activeFormat, isInputFocused, colorFormats]);

  // Handle debounced input changes
  useEffect(() => {
    if (
      isInputFocused &&
      debouncedInputValue !== (colorFormats?.[activeFormat] || "")
    ) {
      const parsedColor = colorUtils.parseColorInput(
        debouncedInputValue,
        activeFormat
      );
      if (parsedColor && parsedColor !== value) {
        onChange(parsedColor);
      }
    }
  }, [
    debouncedInputValue,
    activeFormat,
    isInputFocused,
    onChange,
    value,
    colorFormats,
  ]);

  // Handle input change
  const handleInputChange = useCallback((newValue: string) => {
    setInputValue(newValue);
  }, []);

  // Handle format change
  const handleFormatChange = useCallback(
    (format: "hex" | "rgb" | "hsl" | "oklch") => {
      setActiveFormat(format);
      if (colorFormats) {
        setInputValue(colorFormats[format]);
      }
    },
    [colorFormats]
  );

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (colorFormats) {
      try {
        await navigator.clipboard.writeText(colorFormats[activeFormat]);
      } catch (err) {
        console.error("Failed to copy color:", err);
      }
    }
  }, [colorFormats, activeFormat]);

  // Preset colors
  const presetColors = useMemo(
    () => [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#22c55e",
      "#14b8a6",
      "#06b6d4",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
      "#64748b",
      "#6b7280",
      "#374151",
      "#1f2937",
      "#111827",
    ],
    []
  );

  if (!colorFormats) return null;

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-10 px-3"
          >
            <div
              className="w-6 h-6 rounded-md border-2 border-white shadow-sm shrink-0"
              style={{ backgroundColor: value }}
            />
            <span className="font-mono text-sm truncate">
              {colorFormats[activeFormat]}
            </span>
            <Palette className="w-4 h-4 ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0" side="left" align="start">
          <div className="p-4 space-y-4">
            {/* Color Preview */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-white shadow-lg"
                style={{ backgroundColor: value }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium">Current Color</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {value}
                </div>
              </div>
            </div>

            {/* Format Tabs */}
            <Tabs value={activeFormat} onValueChange={handleFormatChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hex" className="text-xs">
                  HEX
                </TabsTrigger>
                <TabsTrigger value="rgb" className="text-xs">
                  RGB
                </TabsTrigger>
                <TabsTrigger value="hsl" className="text-xs">
                  HSL
                </TabsTrigger>
                <TabsTrigger value="oklch" className="text-xs">
                  OKLCH
                </TabsTrigger>
              </TabsList>

              <div className="mt-3 space-y-3">
                {/* Color Input */}
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="font-mono text-sm"
                    placeholder={`Enter ${activeFormat.toUpperCase()} value...`}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                {/* Format Examples */}
                <TabsContent value="hex" className="mt-2">
                  <div className="text-xs text-muted-foreground">
                    Examples: #ff0000, #f00, #3b82f6
                  </div>
                </TabsContent>

                <TabsContent value="rgb" className="mt-2">
                  <div className="text-xs text-muted-foreground">
                    Examples: rgb(255, 0, 0), rgb(59, 130, 246)
                  </div>
                </TabsContent>

                <TabsContent value="hsl" className="mt-2">
                  <div className="text-xs text-muted-foreground">
                    Examples: hsl(0, 100%, 50%), hsl(217, 91%, 60%)
                  </div>
                </TabsContent>

                <TabsContent value="oklch" className="mt-2">
                  <div className="text-xs text-muted-foreground">
                    Examples: oklch(0.7 0.15 180), oklch(0.6 0.2 240)
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            {/* Native Color Picker */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Visual Picker</Label>
              <Input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 w-full rounded-lg border-2 cursor-pointer"
              />
            </div>

            {/* Preset Colors */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Preset Colors</Label>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onChange(color)}
                    className={cn(
                      "w-8 h-8 rounded-md border-2 transition-all hover:scale-110",
                      value === color
                        ? "border-foreground shadow-md"
                        : "border-white shadow-sm"
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange("#3b82f6")}
              className="w-full gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Animation curve visualization component
function AnimationCurve({
  type,
  isActive,
}: {
  type: string;
  isActive: boolean;
}) {
  const curves = {
    linear: "M 20 80 L 80 20",
    ease: "M 20 80 C 20 80, 25 25, 80 20",
    "ease-in": "M 20 80 C 20 80, 80 80, 80 20",
    "ease-out": "M 20 80 C 20 20, 80 20, 80 20",
    "ease-in-out": "M 20 80 C 20 60, 80 40, 80 20",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs font-medium">{type}</div>
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="border rounded bg-gray-50"
      >
        <defs>
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <path
          d={curves[type as keyof typeof curves]}
          stroke={isActive ? "#3b82f6" : "#6b7280"}
          strokeWidth="2"
          fill="none"
        />
        <circle cx="20" cy="80" r="2" fill={isActive ? "#3b82f6" : "#6b7280"} />
        <circle cx="80" cy="20" r="2" fill={isActive ? "#3b82f6" : "#6b7280"} />
      </svg>
      <div
        className={`w-6 h-6 rounded ${isActive ? "bg-blue-500" : "bg-gray-800"} transition-all duration-300`}
        style={{
          animation: isActive ? `demo-${type} 2s infinite` : "none",
        }}
      />
    </div>
  );
}

// Font Combobox Component
function FontCombobox({
  value,
  onValueChange,
  placeholder = "Select font...",
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const sortedFonts = getSortedFonts();

  // Group fonts by category
  const fontsByCategory = sortedFonts.reduce(
    (acc, font) => {
      if (!acc[font.category]) {
        acc[font.category] = [];
      }
      acc[font.category].push(font);
      return acc;
    },
    {} as Record<string, typeof sortedFonts>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8 text-xs"
        >
          {value ? (
            <span
              style={{ fontFamily: `"${value}", sans-serif` }}
              className="truncate"
            >
              {value}
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" side="left" align="start">
        <Command>
          <CommandInput placeholder="Search fonts..." className="h-9" />
          <CommandEmpty>No font found.</CommandEmpty>
          <CommandList className="max-h-[300px]">
            {Object.entries(fontsByCategory).map(([category, fonts]) => (
              <CommandGroup
                key={category}
                heading={
                  fontCategories[category as keyof typeof fontCategories]
                }
              >
                {fonts.map((font) => (
                  <CommandItem
                    key={font.name}
                    value={font.name}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === font.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span
                        style={{ fontFamily: `"${font.name}", sans-serif` }}
                        className="text-sm truncate"
                        title={font.name}
                      >
                        {font.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">
                      {
                        fontCategories[
                          font.category as keyof typeof fontCategories
                        ]
                      }
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Controls Content Component (extracted for reusability)
function ThemeControlsContent() {
  const {
    activeThemeData,
    updateThemeColor,
    updateThemeFont,
    updateThemeRadius,
    updateThemeShadow,
    updateThemeAnimation,
    updateFadeSpeed,
    updateScaleSpeed,
    updateSlideSpeed,
    updateMarqueeSpeed,
    updateShineSpeed,
    updateAnimationCurve,
  } = useThemeStore();

  const [selectedAnimationType, setSelectedAnimationType] = useState(
    activeThemeData.styles.animationCurve || "ease"
  );
  const [displayFontWeights, setDisplayFontWeights] = useState<number[]>([]);
  const [textFontWeights, setTextFontWeights] = useState<number[]>([]);

  // Update available weights when fonts change
  useEffect(() => {
    setDisplayFontWeights(
      getAvailableWeights(activeThemeData.fonts.displayFont)
    );
    setTextFontWeights(getAvailableWeights(activeThemeData.fonts.textFont));
  }, [activeThemeData.fonts.displayFont, activeThemeData.fonts.textFont]);

  // Update animation curve when selected
  useEffect(() => {
    if (selectedAnimationType !== activeThemeData.styles.animationCurve) {
      updateAnimationCurve(selectedAnimationType);
    }
  }, [selectedAnimationType, updateAnimationCurve]);

  const handleDisplayFontChange = useCallback(
    (fontName: string) => {
      updateThemeFont("displayFont", fontName);
      const availableWeights = getAvailableWeights(fontName);
      // Set to a safe weight that exists for this font
      const currentWeight = activeThemeData.fonts.displayWeight;
      if (!availableWeights.includes(currentWeight)) {
        updateThemeFont(
          "displayWeight",
          availableWeights.includes(600)
            ? 600
            : availableWeights[Math.floor(availableWeights.length / 2)]
        );
      }
    },
    [updateThemeFont, activeThemeData.fonts.displayWeight]
  );

  const handleTextFontChange = useCallback(
    (fontName: string) => {
      updateThemeFont("textFont", fontName);
      const availableWeights = getAvailableWeights(fontName);
      // Set to a safe weight that exists for this font
      const currentWeight = activeThemeData.fonts.textWeight;
      if (!availableWeights.includes(currentWeight)) {
        updateThemeFont(
          "textWeight",
          availableWeights.includes(400) ? 400 : availableWeights[0]
        );
      }
    },
    [updateThemeFont, activeThemeData.fonts.textWeight]
  );

  const handlePrimaryColorChange = useCallback(
    (color: string) => {
      updateThemeColor("primary", color);
    },
    [updateThemeColor]
  );

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Primary Color Picker */}
      <EnhancedColorPicker
        value={activeThemeData.colors.primary || "#3b82f6"}
        onChange={handlePrimaryColorChange}
        label="Primary Color"
      />

      {/* Typography */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Typography</h4>

        <div className="space-y-2">
          <Label className="text-xs">Display Font</Label>
          <FontCombobox
            value={activeThemeData.fonts.displayFont}
            onValueChange={handleDisplayFontChange}
            placeholder="Select display font..."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Display Weight</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-8 text-xs"
              >
                {activeThemeData.fonts.displayWeight} -{" "}
                {activeThemeData.fonts.displayWeight === 300
                  ? "Light"
                  : activeThemeData.fonts.displayWeight === 400
                    ? "Regular"
                    : activeThemeData.fonts.displayWeight === 500
                      ? "Medium"
                      : activeThemeData.fonts.displayWeight === 600
                        ? "Semi Bold"
                        : activeThemeData.fonts.displayWeight === 700
                          ? "Bold"
                          : activeThemeData.fonts.displayWeight === 800
                            ? "Extra Bold"
                            : "Black"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" side="left">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {displayFontWeights.map((weight) => (
                      <CommandItem
                        key={weight}
                        value={weight.toString()}
                        onSelect={() =>
                          updateThemeFont("displayWeight", weight)
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            activeThemeData.fonts.displayWeight === weight
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {weight} -{" "}
                        {weight === 300
                          ? "Light"
                          : weight === 400
                            ? "Regular"
                            : weight === 500
                              ? "Medium"
                              : weight === 600
                                ? "Semi Bold"
                                : weight === 700
                                  ? "Bold"
                                  : weight === 800
                                    ? "Extra Bold"
                                    : "Black"}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Text Font</Label>
          <FontCombobox
            value={activeThemeData.fonts.textFont}
            onValueChange={handleTextFontChange}
            placeholder="Select text font..."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Text Weight</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-8 text-xs"
              >
                {activeThemeData.fonts.textWeight} -{" "}
                {activeThemeData.fonts.textWeight === 300
                  ? "Light"
                  : activeThemeData.fonts.textWeight === 400
                    ? "Regular"
                    : activeThemeData.fonts.textWeight === 500
                      ? "Medium"
                      : activeThemeData.fonts.textWeight === 600
                        ? "Semi Bold"
                        : activeThemeData.fonts.textWeight === 700
                          ? "Bold"
                          : "Extra Bold"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" side="left">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {textFontWeights.map((weight) => (
                      <CommandItem
                        key={weight}
                        value={weight.toString()}
                        onSelect={() => updateThemeFont("textWeight", weight)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            activeThemeData.fonts.textWeight === weight
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {weight} -{" "}
                        {weight === 300
                          ? "Light"
                          : weight === 400
                            ? "Regular"
                            : weight === 500
                              ? "Medium"
                              : weight === 600
                                ? "Semi Bold"
                                : weight === 700
                                  ? "Bold"
                                  : "Extra Bold"}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Border Radius</Label>
        <RadioGroup
          value={activeThemeData.styles.radius}
          onValueChange={(value) => updateThemeRadius(value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0rem" id="sharp" />
            <Label htmlFor="sharp" className="text-xs">
              Sharp
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0.125rem" id="slight" />
            <Label htmlFor="slight" className="text-xs">
              Slight
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0.375rem" id="medium" />
            <Label htmlFor="medium" className="text-xs">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0.5rem" id="smooth" />
            <Label htmlFor="smooth" className="text-xs">
              Smooth
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1rem" id="curved" />
            <Label htmlFor="curved" className="text-xs">
              Curved
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Shadow */}
      <div className="space-y-2">
        <Label className="text-xs">Shadow</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-8 text-xs"
            >
              {activeThemeData.styles.shadow === "none"
                ? "None"
                : activeThemeData.styles.shadow === "sm"
                  ? "Small"
                  : activeThemeData.styles.shadow === "md"
                    ? "Medium"
                    : activeThemeData.styles.shadow === "lg"
                      ? "Large"
                      : "Extra Large"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px] p-0" side="left">
            <Command>
              <CommandList>
                <CommandGroup>
                  {["none", "sm", "md", "lg", "xl"].map((shadow) => (
                    <CommandItem
                      key={shadow}
                      value={shadow}
                      onSelect={() => updateThemeShadow(shadow)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          activeThemeData.styles.shadow === shadow
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {shadow === "none"
                        ? "None"
                        : shadow === "sm"
                          ? "Small"
                          : shadow === "md"
                            ? "Medium"
                            : shadow === "lg"
                              ? "Large"
                              : "Extra Large"}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Animation Controls */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Animations</h4>

        {/* Animation Type Selector */}
        <div className="space-y-3">
          <Label className="text-xs">Animation Curve</Label>
          <div className="grid grid-cols-3 gap-2">
            {["linear", "ease", "ease-in"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedAnimationType(type)}
                className={`p-1 rounded border transition-colors ${
                  selectedAnimationType === type
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <AnimationCurve
                  type={type}
                  isActive={selectedAnimationType === type}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Individual Animation Sliders */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Fade Duration</Label>
              <span className="text-xs text-muted-foreground">
                {activeThemeData.styles.fadeSpeed}ms
              </span>
            </div>
            <Slider
              min={100}
              max={1000}
              step={50}
              value={[activeThemeData.styles.fadeSpeed || 500]}
              onValueChange={(value) => updateFadeSpeed(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Scale Duration</Label>
              <span className="text-xs text-muted-foreground">
                {activeThemeData.styles.scaleSpeed}ms
              </span>
            </div>
            <Slider
              min={100}
              max={800}
              step={50}
              value={[activeThemeData.styles.scaleSpeed || 300]}
              onValueChange={(value) => updateScaleSpeed(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Slide Duration</Label>
              <span className="text-xs text-muted-foreground">
                {activeThemeData.styles.slideSpeed}ms
              </span>
            </div>
            <Slider
              min={200}
              max={1000}
              step={50}
              value={[activeThemeData.styles.slideSpeed || 500]}
              onValueChange={(value) => updateSlideSpeed(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Marquee Speed</Label>
              <span className="text-xs text-muted-foreground">
                {activeThemeData.styles.marqueeSpeed}s
              </span>
            </div>
            <Slider
              min={5}
              max={60}
              step={5}
              value={[activeThemeData.styles.marqueeSpeed || 20]}
              onValueChange={(value) => updateMarqueeSpeed(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Shine Duration</Label>
              <span className="text-xs text-muted-foreground">
                {activeThemeData.styles.shineSpeed}s
              </span>
            </div>
            <Slider
              min={2}
              max={20}
              step={1}
              value={[activeThemeData.styles.shineSpeed || 8]}
              onValueChange={(value) => updateShineSpeed(value[0])}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeControls() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (md and up) */}
      <div className="hidden md:block w-0 lg:w-72 border-l border-border">
        <ThemeControlsContent />
      </div>

      {/* Mobile Settings Button (below md) */}
      <Button
        onClick={() => setIsSheetOpen(true)}
        className="md:hidden fixed top-[10%] right-[5%] z-50 h-10 w-10 p-0 rounded-full shadow-lg"
        size="sm"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {/* Mobile Sheet (below md) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>Theme Settings</SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSheetOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-80px)]">
            <ThemeControlsContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
