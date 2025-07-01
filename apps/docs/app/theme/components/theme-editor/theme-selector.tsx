"use client";

import { useThemeStore } from "../../lib/stores/theme-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import { Input } from "@/registry/new-york/ui/input";
import { cn } from "@/lib/utils";
import { presetThemes, themeCategories } from "../../lib/theme-presets";
import { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { activeTheme, setActiveTheme, customTheme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter themes based on search and category
  const filteredThemes = useMemo(() => {
    let themes = presetThemes;

    if (searchQuery) {
      themes = themes.filter(
        (theme) =>
          theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          theme.category.some((cat) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory) {
      themes = themes.filter((theme) =>
        theme.category.includes(selectedCategory)
      );
    }

    return themes;
  }, [searchQuery, selectedCategory]);

  const handleThemeSelect = (themeId: string) => {
    setActiveTheme(themeId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose Your Theme
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full min-h-0">
          {/* Search and Filters */}
          <div className="px-6 pb-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {themeCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Themes Grid */}
          <ScrollArea className="flex-1 px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-6">
              {/* Custom Theme (if exists) */}
              {customTheme && (
                <div className="space-y-3 md:col-span-3 lg:col-span-4 xl:col-span-5">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Custom
                  </h3>
                  <button
                    className={cn(
                      "w-full p-3 rounded-lg border-2 transition-all hover:scale-105",
                      activeTheme === "custom"
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleThemeSelect("custom")}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-center gap-1">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: customTheme.colors.primary,
                          }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: customTheme.colors.secondary,
                          }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: customTheme.colors.accent }}
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="font-medium text-xs">
                          {customTheme.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Custom Theme
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Preset Themes */}
              {filteredThemes.length > 0 && (
                <div className="space-y-3 md:col-span-3 lg:col-span-4 xl:col-span-5">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Preset Themes ({filteredThemes.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filteredThemes.map((theme) => (
                      <button
                        key={theme.id}
                        className={cn(
                          "w-full p-3 rounded-lg border-2 transition-all hover:scale-105",
                          activeTheme === theme.id
                            ? "border-primary bg-primary/5 shadow-lg"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-center gap-1">
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{
                                backgroundColor: theme.colors.secondary,
                              }}
                            />
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: theme.colors.accent }}
                            />
                          </div>
                          <div className="text-center">
                            <h4 className="font-medium text-xs">
                              {theme.name}
                            </h4>
                            <div className="flex flex-wrap justify-center gap-1 mt-1">
                              {theme.category.map((cat) => (
                                <Badge
                                  key={cat}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {themeCategories.find((c) => c.id === cat)
                                    ?.name || cat}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredThemes.length === 0 && !customTheme && (
                <div className="md:col-span-3 lg:col-span-4 xl:col-span-5 text-center py-12">
                  <p className="text-muted-foreground">
                    No themes found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
