"use client";

import React, { useEffect } from "react";
import {
  useAccessibilityStore,
  FeatureIntensity,
  ContrastMode,
} from "@/registry/new-york/ui/accessibility/lib/accessibility-store";
import screenReaderService from "@/registry/new-york/ui/accessibility/lib/screen-reader-service";

import { Button } from "@/registry/new-york/ui/button";
import { Switch } from "@/registry/new-york/ui/switch";
import { Slider } from "@/registry/new-york/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

import {
  LucideEye,
  LucideMaximize,
  LucideText,
  LucideUnderline,
  LucideVolume2,
  LucideRefreshCw,
  LucideX,
  LucideLineChart,
  LucideInfo,
  LucidePalette,
  LucideMousePointer2,
  LucideBookText,
  LucideHand,
  LucideZap,
  LucidePersonStanding,
} from "lucide-react";

// Inlined AccessibilitySlider component
interface AccessibilitySliderProps {
  value: FeatureIntensity | ContrastMode;
  onChange: (value: FeatureIntensity | ContrastMode) => void;
  label: string;
  icon: React.ReactNode;
  options?: { value: string; label: string }[];
}

function AccessibilitySlider({
  value,
  onChange,
  label,
  icon,
  options,
}: AccessibilitySliderProps) {
  const defaultOptions = [
    { value: "default", label: "Default" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const currentOptions = options || defaultOptions;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <Tabs
        value={value}
        onValueChange={(v) => onChange(v as FeatureIntensity | ContrastMode)}
        className="w-full"
      >
        <TabsList
          className={`grid w-full gap-2`}
          style={{
            gridTemplateColumns: `repeat(${currentOptions.length}, 1fr)`,
          }}
        >
          {currentOptions.map((option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              className="text-xs"
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

// Combined AccessibilityUI component
export function AccessibilityUI({ children }: { children: React.ReactNode }) {
  const {
    isOpen,
    toggleOpen,
    contrast,
    setContrast,
    highlightLinks,
    setHighlightLinks,
    textSize,
    setTextSize,
    textSpacing,
    setTextSpacing,
    hideImages,
    toggleHideImages,
    dyslexiaFriendly,
    toggleDyslexiaFriendly,
    lineHeight,
    setLineHeight,
    saturation,
    setSaturation,
    cursorSize,
    setCursorSize,
    screenReader,
    toggleScreenReader,
    setScreenReaderSpeed,
    setScreenReaderVolume,
    resetAll,
  } = useAccessibilityStore();

  // Initialize and clean up screen reader service
  useEffect(() => {
    screenReaderService.initialize(
      screenReader.enabled,
      screenReader.speed,
      screenReader.volume,
    );
    return () => {
      screenReaderService.cleanup();
    };
  }, [screenReader.enabled, screenReader.speed, screenReader.volume]);

  // Apply all accessibility settings to the HTML element (moved from AccessibilityProvider)
  useEffect(() => {
    const html = document.documentElement;

    const classesToRemove = [
      "contrast-medium",
      "contrast-high",
      "contrast-windows-inverted",
      "contrast-windows-dark",
      "contrast-windows-light",
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
      "cursor-medium",
      "cursor-high",
    ];

    html.classList.remove(...classesToRemove);

    if (contrast === "medium") {
      html.classList.add("contrast-medium");
    } else if (contrast === "high") {
      html.classList.add("contrast-high");
    } else if (contrast === "inverted") {
      html.classList.add("contrast-windows-inverted");
    } else if (contrast === "dark") {
      html.classList.add("contrast-windows-dark");
    } else if (contrast === "light") {
      html.classList.add("contrast-windows-light");
    }

    if (highlightLinks === "medium") {
      html.classList.add("highlight-links-medium");
    } else if (highlightLinks === "high") {
      html.classList.add("highlight-links-high");
    }

    if (textSize === "medium") {
      html.classList.add("text-size-medium");
    } else if (textSize === "high") {
      html.classList.add("text-size-high");
    }

    if (textSpacing === "medium") {
      html.classList.add("text-spacing-medium");
    } else if (textSpacing === "high") {
      html.classList.add("text-spacing-high");
    }

    if (hideImages) {
      html.classList.add("hide-images");
    }

    if (dyslexiaFriendly) {
      html.classList.add("dyslexia-friendly");
    }

    if (lineHeight === "medium") {
      html.classList.add("line-height-medium");
    } else if (lineHeight === "high") {
      html.classList.add("line-height-high");
    }

    if (saturation === "medium") {
      html.classList.add("saturation-medium");
    } else if (saturation === "high") {
      html.classList.add("saturation-high");
    }

    if (cursorSize === "medium") {
      html.classList.add("cursor-medium");
    } else if (cursorSize === "high") {
      html.classList.add("cursor-high");
    }

    if (screenReader.enabled) {
      html.setAttribute("data-screen-reader", "enabled");
    } else {
      html.removeAttribute("data-screen-reader");
    }
  }, [
    contrast,
    highlightLinks,
    textSize,
    textSpacing,
    hideImages,
    dyslexiaFriendly,
    lineHeight,
    saturation,
    cursorSize,
    screenReader,
  ]);

  // Event listener for the custom toggle event (for the floating button AND keyboard shortcut)
  // This listener now also handles the Ctrl+U keyboard shortcut (moved from AccessibilityProvider)
  useEffect(() => {
    const handleToggleEvent = () => {
      toggleOpen();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "u") {
        event.preventDefault();
        toggleOpen(); // Directly toggle the state
      }
    };

    document.addEventListener("toggleAccessibilityPanel", handleToggleEvent);
    document.addEventListener("keydown", handleKeyDown); // Listen for keyboard shortcut

    return () => {
      document.removeEventListener(
        "toggleAccessibilityPanel",
        handleToggleEvent,
      );
      document.removeEventListener("keydown", handleKeyDown); // Clean up keyboard listener
    };
  }, [toggleOpen]);

  const contrastOptions = [
    { value: "default", label: "Default" },
    { value: "inverted", label: "Inverted" },
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <>
      {children}

      {/* Accessibility Trigger (Floating Button) */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="fixed bottom-4 right-4 z-[9998] rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/85 flex items-center justify-center accessibility-trigger"
              aria-label="Open Accessibility Menu"
              onClick={toggleOpen}
            >
              <div className="relative">
                <LucidePersonStanding className="w-6 h-6 text-secondary" />
                {screenReader.enabled && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white dark:border animate-pulse" />
                )}
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Accessibility Menu</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9997] transition-opacity duration-300"
          onClick={toggleOpen}
          aria-hidden="true"
        />
      )}

      {/* Accessibility Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-background text-foreground shadow-xl z-[9999] transition-transform duration-300 ease-in-out border-l
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full sm:w-[35vw] md:w-[30vw] lg:w-[25vw] min-w-[350px] max-w-[450px]
        `}
        aria-label="Accessibility Settings"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-background flex-shrink-0">
          <h2 className="text-lg font-semibold text-foreground">
            Accessibility Settings
          </h2>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close Accessibility Menu"
            className="text-muted-foreground hover:text-foreground"
            onClick={toggleOpen}
          >
            <LucideX className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100vh-140px)] overflow-hidden">
          <Tabs
            defaultValue="vision"
            className="p-4 flex-grow flex flex-col overflow-hidden"
          >
            <TabsList className="grid grid-cols-4 w-full mb-4 flex-shrink-0">
              <TabsTrigger value="vision" className="text-xs">
                <LucideEye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Vision</span>
                <span className="sm:hidden">V</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="text-xs">
                <LucideBookText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Content</span>
                <span className="sm:hidden">C</span>
              </TabsTrigger>
              <TabsTrigger value="interaction" className="text-xs">
                <LucideHand className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Interaction</span>
                <span className="sm:hidden">I</span>
              </TabsTrigger>
              <TabsTrigger value="screen-reader" className="text-xs">
                <LucideVolume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Reader</span>
                <span className="sm:hidden">R</span>
              </TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto flex-grow pr-2 pb-2">
              <TabsContent value="vision" className="space-y-6">
                <AccessibilitySlider
                  label="Contrast"
                  value={contrast}
                  onChange={setContrast}
                  icon={<LucidePalette className="h-4 w-4" />}
                  options={contrastOptions}
                />

                <AccessibilitySlider
                  label="Highlight Links"
                  value={highlightLinks}
                  onChange={setHighlightLinks}
                  icon={<LucideUnderline className="h-4 w-4" />}
                />

                <AccessibilitySlider
                  label="Saturation"
                  value={saturation}
                  onChange={setSaturation}
                  icon={<LucideLineChart className="h-4 w-4" />}
                />

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="hide-images"
                      className="text-sm font-medium"
                    >
                      Hide Images
                    </label>
                    <p className="text-muted-foreground text-sm">
                      Removes all images from the page.
                    </p>
                  </div>
                  <Switch
                    id="hide-images"
                    checked={hideImages}
                    onCheckedChange={toggleHideImages}
                  />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <AccessibilitySlider
                  label="Text Size"
                  value={textSize}
                  onChange={setTextSize}
                  icon={<LucideText className="h-4 w-4" />}
                />

                <AccessibilitySlider
                  label="Text Spacing"
                  value={textSpacing}
                  onChange={setTextSpacing}
                  icon={<LucideMaximize className="h-4 w-4" />}
                />

                <AccessibilitySlider
                  label="Line Height"
                  value={lineHeight}
                  onChange={setLineHeight}
                  icon={<LucideLineChart className="h-4 w-4 rotate-90" />}
                />

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="dyslexia-friendly"
                      className="text-sm font-medium"
                    >
                      Dyslexia Friendly Font
                    </label>
                    <p className="text-muted-foreground text-sm">
                      Changes text to a font optimized for dyslexia.
                    </p>
                  </div>
                  <Switch
                    id="dyslexia-friendly"
                    checked={dyslexiaFriendly}
                    onCheckedChange={toggleDyslexiaFriendly}
                  />
                </div>
              </TabsContent>

              <TabsContent value="interaction" className="space-y-6">
                <AccessibilitySlider
                  label="Cursor Size"
                  value={cursorSize}
                  onChange={setCursorSize}
                  icon={<LucideMousePointer2 className="h-4 w-4" />}
                />

                <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <LucideInfo className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">
                        Keyboard Shortcuts
                      </h4>
                      <ul className="text-xs space-y-1 mt-1">
                        <li>
                          <kbd className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            Ctrl
                          </kbd>{" "}
                          +{" "}
                          <kbd className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            U
                          </kbd>
                          : Toggle Accessibility Panel
                        </li>
                        <li>
                          <kbd className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            Tab
                          </kbd>
                          : Navigate through elements
                        </li>
                        <li>
                          <kbd className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            Enter
                          </kbd>
                          : Activate focused element
                        </li>
                        <li>
                          <kbd className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            Esc
                          </kbd>
                          : Close dialogs or menus
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="screen-reader" className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="screen-reader-toggle"
                      className="text-sm font-medium"
                    >
                      Enable Screen Reader
                    </label>
                    <p className="text-muted-foreground text-sm">
                      Reads content aloud as you hover or focus.
                    </p>
                  </div>
                  <Switch
                    id="screen-reader-toggle"
                    checked={screenReader.enabled}
                    onCheckedChange={toggleScreenReader}
                  />
                </div>

                {screenReader.enabled && (
                  <>
                    <AccessibilitySlider
                      label="Speech Speed"
                      value={
                        screenReader.speed === "slow" ? "medium" : "default"
                      }
                      onChange={(val) =>
                        setScreenReaderSpeed(
                          val === "medium" ? "slow" : "normal",
                        )
                      }
                      icon={<LucideZap className="h-4 w-4" />}
                      options={[
                        { value: "default", label: "Normal" },
                        { value: "medium", label: "Slow" },
                      ]}
                    />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <LucideVolume2 className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">Volume</span>
                      </div>
                      <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[screenReader.volume]}
                        onValueChange={(val) => setScreenReaderVolume(val[0])}
                        className="w-full"
                      />
                      <p className="text-right text-xs text-muted-foreground">
                        {(screenReader.volume * 100).toFixed(0)}%
                      </p>
                    </div>
                  </>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-background flex-shrink-0 sticky bottom-0">
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="flex items-center gap-1"
            >
              <LucideRefreshCw className="h-3.5 w-3.5" />
              Reset All
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
              onClick={toggleOpen}
            >
              <LucideX className="h-3.5 w-3.5" />
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
