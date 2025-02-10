"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog";
import { useAccessibilityStore } from "@/registry/new-york/lib/accessibility-store";
import { Switch } from "@/registry/new-york/ui/switch";
import {
  LucideContrast,
  LucideEye,
  LucideMaximize,
  LucideText,
  LucideImageOff,
  LucideUnderline,
  LucideType,
} from "lucide-react";
// Import any icons you like from lucide-react

export function AccessibilityTool() {
  const {
    isOpen,
    toggleOpen,
    highContrast,
    toggleHighContrast,
    highlightLinks,
    toggleHighlightLinks,
    biggerText,
    toggleBiggerText,
    textSpacing,
    toggleTextSpacing,
    hideImages,
    toggleHideImages,
    dyslexiaFriendly,
    toggleDyslexiaFriendly,
    lineHeight,
    toggleLineHeight,
    saturation,
    toggleSaturation,
  } = useAccessibilityStore();

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className=" h-[70vh] w-80 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Accessibility Tools</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideContrast className="w-5 h-5" />
              <span>High Contrast</span>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideUnderline className="w-5 h-5" />
              <span>Highlight Links</span>
            </div>
            <Switch
              checked={highlightLinks}
              onCheckedChange={toggleHighlightLinks}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideMaximize className="w-5 h-5" />
              <span>Bigger Text</span>
            </div>
            <Switch checked={biggerText} onCheckedChange={toggleBiggerText} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideText className="w-5 h-5" />
              <span>Text Spacing</span>
            </div>
            <Switch checked={textSpacing} onCheckedChange={toggleTextSpacing} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideImageOff className="w-5 h-5" />
              <span>Hide Images</span>
            </div>
            <Switch checked={hideImages} onCheckedChange={toggleHideImages} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideType className="w-5 h-5" />
              <span>Dyslexia Friendly</span>
            </div>
            <Switch
              checked={dyslexiaFriendly}
              onCheckedChange={toggleDyslexiaFriendly}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideType className="w-5 h-5" />
              <span>Line Height</span>
            </div>
            <Switch checked={lineHeight} onCheckedChange={toggleLineHeight} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideEye className="w-5 h-5" />
              <span>Low Saturation</span>
            </div>
            <Switch checked={saturation} onCheckedChange={toggleSaturation} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
