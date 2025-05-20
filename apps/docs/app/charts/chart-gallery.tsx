"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { ThemeSync, forceThemeSync, useStoredTheme } from "./theme-sync-utils";
import { ChartCard } from "./chart-card";
import { ThemeBar } from "./themebar";
import { ChartThemeProvider } from "./chart-theme-utils";

// Import chart components data from the separate file
import { chartComponents } from "./chart-metadeta";

// Component to filter charts by category
function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("all")}
      >
        All Charts
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

function ChartsPageContent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  // Debug utility
  useStoredTheme();

  // Only run this effect on the client side
  useEffect(() => {
    setMounted(true);

    // Force sync on initial load
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      // Check if the current class matches the resolved theme
      if (!root.classList.contains(resolvedTheme)) {
        forceThemeSync(theme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    console.log(`Toggling theme from ${resolvedTheme} to ${newTheme}`);
    setTheme(newTheme);

    // Force immediate DOM update
    setTimeout(() => {
      forceThemeSync(newTheme);
    }, 0);
  };

  // Extract unique categories
  const categories = Array.from(
    new Set(chartComponents.map((chart) => chart.category))
  ).sort();

  // Filter charts based on search term and category
  const filteredCharts = chartComponents.filter((chart) => {
    const matchesSearch = chart.displayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || chart.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Component to sync themes */}
      <ThemeSync />

      <div className="container mx-auto py-10 mt-24 mb-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className=" text-3xl sm:text-4xl font-bold">
              Chart Components Gallery
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              A growing collection of beautiful chart components built with
              React and Recharts
            </p>
          </div>
        </div>

        {/* Theme Bar */}
        <ThemeBar />

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search charts..."
              className="w-full rounded-md border pl-10 py-2 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCharts.map((chart) => (
            <ChartCard key={chart.name} chartInfo={chart} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function ChartsPage() {
  return (
    <ChartThemeProvider>
      <ChartsPageContent />
    </ChartThemeProvider>
  );
}
