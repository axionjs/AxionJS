"use client";

import { useState } from "react";
import { useThemeStore } from "../../lib/stores/theme-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/registry/new-york/ui/sheet";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import { Separator } from "@/registry/new-york/ui/separator";
import {
  Loader2,
  Sparkles,
  Palette,
  Type,
  Radius,
  Zap,
  Info,
  Lightbulb,
} from "lucide-react";
import { generateThemeFromPrompt } from "../../lib/ai-theme-generator";

export default function AiGeneratePanel() {
  const { isAiPanelOpen, setAiPanelOpen, createCustomTheme } = useThemeStore();

  const [themeName, setThemeName] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!themeName.trim()) {
      setError("Please enter a theme name");
      return;
    }

    if (!themeDescription.trim()) {
      setError("Please describe your theme");
      return;
    }

    try {
      setError("");
      setIsGenerating(true);

      // Generate theme using AI (now with improved context-aware color/font inference)
      const generatedTheme = await generateThemeFromPrompt(
        themeName,
        themeDescription,
        {
          inferCulture: true, // <--- NEW: always infer culture/colors/fonts from prompt
          inferFonts: true,
          fallback: {
            // fallback to modern blue if nothing found, but prefer context
            primary: "#3b82f6",
            displayFont: "Inter",
            textFont: "Inter",
          },
        }
      );

      // Create custom theme with generated data
      createCustomTheme({
        name: themeName,
        ...generatedTheme,
      });

      // Close the panel
      setAiPanelOpen(false);

      // Reset form
      setThemeName("");
      setThemeDescription("");
    } catch (err) {
      console.error("Error generating theme:", err);
      setError("Failed to generate theme. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Sheet open={isAiPanelOpen} onOpenChange={setAiPanelOpen}>
      <SheetContent
        side="right"
        className="w-[600px] sm:max-w-none p-0 flex flex-col h-full"
      >
        <SheetHeader className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <SheetTitle>AI Theme Generator</SheetTitle>
          </div>
          <SheetDescription>
            Generate a custom theme using AI based on your description
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Form Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  placeholder="e.g., Neon Cyberpunk"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme-description">Describe Your Theme</Label>
                <Textarea
                  id="theme-description"
                  placeholder="Describe the style, mood, colors, fonts, and purpose of your theme..."
                  rows={4}
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Theme...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Theme
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Comprehensive Guide */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">
                  How to Use AI Theme Generator
                </h3>
              </div>

              {/* Colors Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Colors
                  </CardTitle>
                  <CardDescription>
                    Specify colors in multiple formats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      Supported Color Formats:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          Hex
                        </Badge>
                        <span className="text-muted-foreground">
                          #3b82f6, #f00
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          RGB
                        </Badge>
                        <span className="text-muted-foreground">
                          rgb(59, 130, 246)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          HSL
                        </Badge>
                        <span className="text-muted-foreground">
                          hsl(217, 91%, 60%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          Named
                        </Badge>
                        <span className="text-muted-foreground">
                          blue, coral, emerald, crimson
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Prompts:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• "Modern dashboard with primary color #3b82f6"</li>
                      <li>• "Gaming theme with rgb(0, 255, 136)"</li>
                      <li>• "Elegant design using coral color"</li>
                      <li>• "Corporate theme with hsl(217, 91%, 60%)"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Fonts Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Typography
                  </CardTitle>
                  <CardDescription>
                    Request specific fonts or font styles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Font Categories:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Modern</Badge>
                        <span className="text-muted-foreground text-xs">
                          Inter, Poppins
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Serif</Badge>
                        <span className="text-muted-foreground text-xs">
                          Playfair, Lora
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Monospace</Badge>
                        <span className="text-muted-foreground text-xs">
                          JetBrains Mono
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Display</Badge>
                        <span className="text-muted-foreground text-xs">
                          Oswald, Raleway
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Prompts:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• "Use Inter for headings and Open Sans for body"</li>
                      <li>• "Modern theme with Montserrat font"</li>
                      <li>• "Elegant design with serif fonts"</li>
                      <li>• "Gaming UI with monospace typography"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Border Radius Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Radius className="h-4 w-4" />
                    Border Radius
                  </CardTitle>
                  <CardDescription>
                    Control the roundness of elements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Radius Options:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Sharp</Badge>
                        <span className="text-muted-foreground text-xs">
                          0px, square
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Slight</Badge>
                        <span className="text-muted-foreground text-xs">
                          2px, subtle
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Medium</Badge>
                        <span className="text-muted-foreground text-xs">
                          6px, balanced
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Smooth</Badge>
                        <span className="text-muted-foreground text-xs">
                          8px, rounded
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Curved</Badge>
                        <span className="text-muted-foreground text-xs">
                          16px, pill-like
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Custom</Badge>
                        <span className="text-muted-foreground text-xs">
                          8px, 0.5rem
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Prompts:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• "Dashboard with 8px border radius"</li>
                      <li>• "Sharp, angular design with no rounded corners"</li>
                      <li>• "Smooth, rounded interface"</li>
                      <li>• "Modern design with 0.5rem radius"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Style & Mood Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Style & Mood
                  </CardTitle>
                  <CardDescription>
                    Describe the overall feel and purpose
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Style Keywords:</h4>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "Modern",
                        "Minimal",
                        "Corporate",
                        "Gaming",
                        "Creative",
                        "Elegant",
                        "Playful",
                        "Dark",
                        "Light",
                        "Vibrant",
                        "Muted",
                        "Professional",
                        "Casual",
                        "Luxury",
                      ].map((style) => (
                        <Badge
                          key={style}
                          variant="secondary"
                          className="text-xs"
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Purpose Keywords:</h4>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "Dashboard",
                        "E-commerce",
                        "Blog",
                        "Portfolio",
                        "SaaS",
                        "Landing Page",
                        "Admin Panel",
                        "Mobile App",
                        "Website",
                        "Documentation",
                      ].map((purpose) => (
                        <Badge
                          key={purpose}
                          variant="outline"
                          className="text-xs"
                        >
                          {purpose}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Complete Examples */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Complete Example Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-background rounded-md border">
                      <p className="font-medium mb-1">Advanced Example:</p>
                      <p className="text-muted-foreground italic">
                        "Create a modern SaaS dashboard theme with primary color
                        #3b82f6, Inter font for headings, Open Sans for body
                        text, 8px border radius, and clean minimal design"
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md border">
                      <p className="font-medium mb-1">Gaming Theme:</p>
                      <p className="text-muted-foreground italic">
                        "Gaming interface with neon green rgb(0, 255, 136),
                        sharp angular corners, Orbitron font, dark background,
                        and futuristic feel"
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md border">
                      <p className="font-medium mb-1">Elegant Portfolio:</p>
                      <p className="text-muted-foreground italic">
                        "Elegant portfolio theme with coral color hsl(16, 100%,
                        66%), Playfair Display for headings, smooth rounded
                        edges, and luxury feel"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tips */}
              <Card className="bg-secondary/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">💡 Pro Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>
                      • <strong>Be specific:</strong> Include exact colors,
                      fonts, and measurements
                    </li>
                    <li>
                      • <strong>Mention purpose:</strong> Describe what the
                      theme will be used for
                    </li>
                    <li>
                      • <strong>Set the mood:</strong> Use descriptive words
                      like "elegant", "modern", "playful"
                    </li>
                    <li>
                      • <strong>Reference brands:</strong> "Like Apple's design"
                      or "Similar to Stripe's interface"
                    </li>
                    <li>
                      • <strong>Combine elements:</strong> Mix colors, fonts,
                      and styles in one prompt
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
