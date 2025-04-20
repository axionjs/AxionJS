"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/registry/default/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";
import { Button } from "@/registry/default/ui/button";
import { Switch } from "@/registry/default/ui/switch";
import { Slider } from "@/registry/default/ui/slider";
import {
  FeatureIntensity,
  useAccessibilityStore,
} from "@/registry/default/lib/accessibility-store";
import { AccessibilitySlider } from "@/registry/default/ui/AccessibilitySlider";
import screenReaderService from "@/registry/default/lib/screen-reader-service";

import {
  LucideContrast,
  LucideEye,
  LucideMaximize,
  LucideText,
  LucideImageOff,
  LucideType,
  LucideUnderline,
  LucideVolume2,
  LucideRefreshCw,
  LucideX,
  LucideLineChart,
  LucideInfo,
  LucideUser,
  LucideZap,
} from "lucide-react";

export function AccessibilityTool() {
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

    screenReader,
    toggleScreenReader,
    setScreenReaderSpeed,
    setScreenReaderVolume,

    resetAll,
  } = useAccessibilityStore();

  // Initialize screen reader
  useEffect(() => {
    // When enabled, initialize the service
    if (screenReader.enabled) {
      console.log("Initializing screen reader");
      screenReaderService.initialize();
      screenReaderService.setSpeed(screenReader.speed);
      screenReaderService.setVolume(screenReader.volume);
    } else {
      // When disabled, clean up the service
      console.log("Cleaning up screen reader");
      screenReaderService.cleanup();
    }

    // Always clean up on component unmount
    return () => {
      console.log("Component unmounting, cleaning up screen reader");
      screenReaderService.cleanup();
    };
  }, [screenReader.enabled, screenReader.speed, screenReader.volume]);

  // Handle screen reader toggle with proper cleanup
  const handleScreenReaderToggle = () => {
    if (screenReader.enabled) {
      // If currently enabled, clean up before toggling state
      screenReaderService.cleanup();
    }
    toggleScreenReader();
  };

  const readPageContent = () => {
    if (screenReader.enabled) {
      screenReaderService.readPage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="h-[85vh] max-w-md w-full overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl flex items-center gap-2">
            <LucideZap className="h-6 w-6 text-blue-500" />
            Accessibility Panel
          </DialogTitle>
          <DialogDescription>
            Customize your browsing experience to match your needs
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
          </TabsList>

          {/* Visual Tab */}
          <TabsContent value="visual" className="space-y-6">
            <div className="grid gap-6">
              <AccessibilitySlider
                value={contrast}
                onChange={setContrast}
                label="Contrast"
                icon={<LucideContrast className="h-4 w-4" />}
              />

              <AccessibilitySlider
                value={saturation}
                onChange={setSaturation}
                label="Color Saturation"
                icon={<LucideEye className="h-4 w-4" />}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LucideImageOff className="h-4 w-4" />
                  <span className="text-sm font-medium">Hide Images</span>
                </div>
                <Switch
                  checked={hideImages}
                  onCheckedChange={toggleHideImages}
                />
              </div>
            </div>
          </TabsContent>

          {/* Reading Tab */}
          <TabsContent value="reading" className="space-y-6">
            <div className="grid gap-6">
              <AccessibilitySlider
                value={textSize}
                onChange={setTextSize}
                label="Text Size"
                icon={<LucideMaximize className="h-4 w-4" />}
              />

              <AccessibilitySlider
                value={textSpacing}
                onChange={setTextSpacing}
                label="Text Spacing"
                icon={<LucideText className="h-4 w-4" />}
              />

              <AccessibilitySlider
                value={lineHeight}
                onChange={setLineHeight}
                label="Line Height"
                icon={<LucideLineChart className="h-4 w-4" />}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LucideType className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Dyslexia Friendly Font
                  </span>
                </div>
                <Switch
                  checked={dyslexiaFriendly}
                  onCheckedChange={toggleDyslexiaFriendly}
                />
              </div>

              <div className="space-y-4 border p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LucideVolume2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Screen Reader</span>
                  </div>
                  <Switch
                    checked={screenReader.enabled}
                    onCheckedChange={toggleScreenReader}
                  />
                </div>

                {screenReader.enabled && (
                  <div className="pt-2 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs">Reading Speed</span>
                        <span className="text-xs font-medium">
                          {screenReader.speed === "normal" ? "Normal" : "Slow"}
                        </span>
                      </div>
                      <Tabs
                        value={screenReader.speed}
                        onValueChange={(v) =>
                          setScreenReaderSpeed(v as "normal" | "slow")
                        }
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-2 w-full">
                          <TabsTrigger value="normal" className="text-xs">
                            Normal
                          </TabsTrigger>
                          <TabsTrigger value="slow" className="text-xs">
                            Slow
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs">Volume</span>
                        <span className="text-xs font-medium">
                          {Math.round(screenReader.volume * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[screenReader.volume * 100]}
                        min={0}
                        max={100}
                        step={10}
                        onValueChange={(value) =>
                          setScreenReaderVolume(value[0] / 100)
                        }
                      />
                    </div>

                    <Button
                      onClick={readPageContent}
                      className="w-full"
                      variant="outline"
                    >
                      Read Page Content
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <div className="grid gap-6">
              <AccessibilitySlider
                value={highlightLinks}
                onChange={setHighlightLinks}
                label="Highlight Links"
                icon={<LucideUnderline className="h-4 w-4" />}
              />

              <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <LucideInfo className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Keyboard Shortcuts</h4>
                    <ul className="text-xs space-y-1 mt-1">
                      <li>Ctrl + U: Toggle Accessibility Panel</li>
                      <li>Tab: Navigate through elements</li>
                      <li>Enter: Activate focused element</li>
                      <li>Esc: Close dialogs or menus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6 pt-4 border-t">
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
            onClick={toggleOpen}
            className="flex items-center gap-1"
          >
            <LucideX className="h-3.5 w-3.5" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
