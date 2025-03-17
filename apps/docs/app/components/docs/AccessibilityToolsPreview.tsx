"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import { Switch } from "@/registry/new-york/ui/switch";
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

export function AccessibilityToolsPreview() {
  // Mock state to simulate accessibility features
  const [features, setFeatures] = React.useState({
    contrast: "default",
    textSize: "default",
    highlightLinks: "default",
    textSpacing: "default",
    dyslexiaFriendly: false,
    hideImages: false,
    screenReaderEnabled: false,
  });

  // Function to toggle boolean features
  const toggleFeature = (feature) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  // Function to set level-based features
  const setFeatureLevel = (feature, level) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: level,
    }));
  };

  // Simulated panel open/close state
  const [isOpen, setIsOpen] = React.useState(false);

  // Classes to apply based on selected features
  const getContentClasses = () => {
    const classes = ["transition-all"];

    // Add contrast classes
    if (features.contrast === "medium") classes.push("filter contrast-125");
    if (features.contrast === "high") classes.push("filter contrast-150");

    // Add text size classes
    if (features.textSize === "medium") classes.push("text-lg");
    if (features.textSize === "high") classes.push("text-xl");

    // Add link highlighting classes
    if (features.highlightLinks === "medium")
      classes.push("demo-highlight-links-medium");
    if (features.highlightLinks === "high")
      classes.push("demo-highlight-links-high");

    // Add text spacing classes
    if (features.textSpacing === "medium")
      classes.push("tracking-wide space-x-0.5");
    if (features.textSpacing === "high")
      classes.push("tracking-wider space-x-1");

    // Add dyslexia font classes
    if (features.dyslexiaFriendly) classes.push("font-mono");

    return classes.join(" ");
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Accessibility feature demo content */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={getContentClasses()}>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Sample Content</h3>

              <p>
                This text demonstrates the accessibility features. The style
                will change based on the selected options in the panel.
              </p>

              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 underline">
                  This is a sample link
                </a>
                <a href="#" className="text-blue-600 underline">
                  Another sample link
                </a>
              </div>

              {!features.hideImages && (
                <div className="grid grid-cols-2 gap-2 py-2">
                  <div className="bg-blue-200 h-20 rounded-md flex items-center justify-center">
                    Image 1
                  </div>
                  <div className="bg-green-200 h-20 rounded-md flex items-center justify-center">
                    Image 2
                  </div>
                </div>
              )}

              <div className="border p-4 rounded-md">
                <p className="text-sm">
                  This is smaller text that might be more difficult to read
                  without accessibility features enabled.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Toggle options in the panel below to see the changes
          </p>
        </CardFooter>
      </Card>

      {/* Accessibility Panel UI */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <AccessibilityIcon className="h-5 w-5" />
              Enhanced Accessibility Tools
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Close Panel" : "Open Panel"}
            </Button>
          </div>
        </CardHeader>

        {isOpen && (
          <CardContent className="pt-6">
            <Tabs defaultValue="visual" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="visual">Visual</TabsTrigger>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
              </TabsList>

              <TabsContent value="visual" className="space-y-6">
                <div className="space-y-4">
                  {/* Contrast Feature */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ContrastIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Contrast</span>
                    </div>
                    <Tabs
                      value={features.contrast}
                      onValueChange={(v) => setFeatureLevel("contrast", v)}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="default" className="text-xs">
                          Default
                        </TabsTrigger>
                        <TabsTrigger value="medium" className="text-xs">
                          Medium
                        </TabsTrigger>
                        <TabsTrigger value="high" className="text-xs">
                          High
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Hide Images Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Hide Images</span>
                    </div>
                    <Switch
                      checked={features.hideImages}
                      onCheckedChange={() => toggleFeature("hideImages")}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reading" className="space-y-6">
                <div className="space-y-4">
                  {/* Text Size Feature */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TextIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Text Size</span>
                    </div>
                    <Tabs
                      value={features.textSize}
                      onValueChange={(v) => setFeatureLevel("textSize", v)}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="default" className="text-xs">
                          Default
                        </TabsTrigger>
                        <TabsTrigger value="medium" className="text-xs">
                          Medium
                        </TabsTrigger>
                        <TabsTrigger value="high" className="text-xs">
                          High
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Text Spacing Feature */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <SpacingIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Text Spacing</span>
                    </div>
                    <Tabs
                      value={features.textSpacing}
                      onValueChange={(v) => setFeatureLevel("textSpacing", v)}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="default" className="text-xs">
                          Default
                        </TabsTrigger>
                        <TabsTrigger value="medium" className="text-xs">
                          Medium
                        </TabsTrigger>
                        <TabsTrigger value="high" className="text-xs">
                          High
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Dyslexia Friendly Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Dyslexia Friendly Font
                      </span>
                    </div>
                    <Switch
                      checked={features.dyslexiaFriendly}
                      onCheckedChange={() => toggleFeature("dyslexiaFriendly")}
                    />
                  </div>

                  {/* Screen Reader Toggle */}
                  <div className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SpeakerIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Screen Reader
                        </span>
                      </div>
                      <Switch
                        checked={features.screenReaderEnabled}
                        onCheckedChange={() =>
                          toggleFeature("screenReaderEnabled")
                        }
                      />
                    </div>

                    {features.screenReaderEnabled && (
                      <Button className="w-full" variant="outline" size="sm">
                        Read Page Content
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="navigation" className="space-y-6">
                <div className="space-y-4">
                  {/* Highlight Links Feature */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Highlight Links
                      </span>
                    </div>
                    <Tabs
                      value={features.highlightLinks}
                      onValueChange={(v) =>
                        setFeatureLevel("highlightLinks", v)
                      }
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="default" className="text-xs">
                          Default
                        </TabsTrigger>
                        <TabsTrigger value="medium" className="text-xs">
                          Medium
                        </TabsTrigger>
                        <TabsTrigger value="high" className="text-xs">
                          High
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Keyboard Shortcuts Info */}
                  <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                    <div className="flex items-start gap-2">
                      <InfoIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">
                          Keyboard Shortcuts
                        </h4>
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
                onClick={() => {
                  setFeatures({
                    contrast: "default",
                    textSize: "default",
                    highlightLinks: "default",
                    textSpacing: "default",
                    dyslexiaFriendly: false,
                    hideImages: false,
                    screenReaderEnabled: false,
                  });
                }}
                className="flex items-center gap-1"
              >
                <ResetIcon className="h-3.5 w-3.5" />
                Reset All
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1"
              >
                <CloseIcon className="h-3.5 w-3.5" />
                Close
              </Button>
            </div>
          </CardContent>
        )}

        {!isOpen && (
          <CardContent className="pt-4">
            <p className="text-center text-sm">
              This panel demonstrates the UI of the Enhanced Accessibility
              Tools.
              <br />
              Click "Open Panel" to see the full interface.
            </p>
          </CardContent>
        )}

        <style jsx global>{`
          /* Demo-only styles for link highlighting */
          .demo-highlight-links-medium a {
            outline: 2px solid #facc15;
            text-decoration: underline !important;
            text-decoration-thickness: 0.15em !important;
            text-underline-offset: 0.2em !important;
          }

          .demo-highlight-links-high a {
            outline: 3px solid #facc15;
            background-color: #facc15;
            color: black !important;
            text-decoration: underline !important;
            text-decoration-thickness: 0.2em !important;
            text-underline-offset: 0.3em !important;
            padding: 0 0.15em;
          }
        `}</style>
      </Card>

      {/* Accessibility Trigger Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="fixed bottom-4 right-4 z-50">
              <Button
                variant="default"
                size="lg"
                className="rounded-full w-16 h-16 shadow-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                onClick={() => setIsOpen(true)}
                aria-label="Open Accessibility Menu"
              >
                <div className="relative">
                  <AccessibilityIcon className="w-8 h-8 text-white" />
                  {features.screenReaderEnabled && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse" />
                  )}
                </div>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Accessibility Options (Ctrl+U)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Icons */}
    </div>
  );
}

// Icons
function AccessibilityIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5 5" />
      <path d="M6 17a3 3 0 1 0 6 0v-5H6v5Z" />
    </svg>
  );
}

function ContrastIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
    </svg>
  );
}

function TextIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    </svg>
  );
}

function SpacingIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 7 6.5 7" />
      <path d="M18 11 6.5 11" />
      <path d="M15 15 6.5 15" />
      <path d="M3 7 3 17" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" y1="3" x2="21" y2="21" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function TypeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}

function SpeakerIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 14.959V9.04C2 8.466 2.466 8 3.041 8h3.917a1 1 0 0 0 .707-.293l4.042-4.042A1 1 0 0 1 13.125 4v16a1 1 0 0 1-1.707.707l-4.042-4.042a1 1 0 0 0-.707-.293H3.041A1.041 1.041 0 0 1 2 14.959z" />
      <path d="M18 7c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2" />
      <path d="M16 10c.5 0 1 .5 1 1v2c0 .5-.5 1-1 1" />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function ResetIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
