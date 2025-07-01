"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the available chart themes
export const chartThemes = {
  default: {
    name: "Default",
    light: {
      chart1: "173 58% 39%",
      chart2: "12 76% 61%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
    dark: {
      chart1: "220 70% 50%",
      chart2: "340 75% 55%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "160 60% 45%",
    },
    icon: "🎨",
  },
  monochrome: {
    name: "Monochrome",
    light: {
      chart1: "347 77% 50%",
      chart2: "352 83% 91%",
      chart3: "350 80% 72%",
      chart4: "351 83% 82%",
      chart5: "349 77% 62%",
    },
    dark: {
      chart1: "347 77% 50%",
      chart2: "349 77% 62%",
      chart3: "350 80% 72%",
      chart4: "351 83% 82%",
      chart5: "352 83% 91%",
    },
    icon: "🔴",
  },
  blues: {
    name: "Blues",
    light: {
      chart1: "217 91% 60%",
      chart2: "213 94% 68%",
      chart3: "202 80% 74%",
      chart4: "199 89% 77%",
      chart5: "188 100% 86%",
    },
    dark: {
      chart1: "217 91% 60%",
      chart2: "213 94% 68%",
      chart3: "202 80% 74%",
      chart4: "199 89% 77%",
      chart5: "188 100% 86%",
    },
    icon: "🔵",
  },
  greens: {
    name: "Greens",
    light: {
      chart1: "142 76% 36%",
      chart2: "141 84% 42%",
      chart3: "141 79% 54%",
      chart4: "142 77% 73%",
      chart5: "143 94% 86%",
    },
    dark: {
      chart1: "142 76% 36%",
      chart2: "141 84% 42%",
      chart3: "141 79% 54%",
      chart4: "142 77% 73%",
      chart5: "143 94% 86%",
    },
    icon: "🟢",
  },
  purples: {
    name: "Purples",
    light: {
      chart1: "270 94% 30%",
      chart2: "269 80% 44%",
      chart3: "269 68% 59%",
      chart4: "268 75% 70%",
      chart5: "267 100% 87%",
    },
    dark: {
      chart1: "270 94% 30%",
      chart2: "269 80% 44%",
      chart3: "269 68% 59%",
      chart4: "268 75% 70%",
      chart5: "267 100% 87%",
    },
    icon: "🟣",
  },
  oranges: {
    name: "Oranges",
    light: {
      chart1: "14 100% 30%",
      chart2: "18 97% 40%",
      chart3: "20 94% 54%",
      chart4: "25 90% 67%",
      chart5: "30 96% 80%",
    },
    dark: {
      chart1: "14 100% 30%",
      chart2: "18 97% 40%",
      chart3: "20 94% 54%",
      chart4: "25 90% 67%",
      chart5: "30 96% 80%",
    },
    icon: "🟠",
  },
  grays: {
    name: "Grays",
    light: {
      chart1: "209 24% 13%",
      chart2: "210 22% 26%",
      chart3: "209 18% 40%",
      chart4: "210 16% 60%",
      chart5: "209 15% 80%",
    },
    dark: {
      chart1: "209 24% 13%",
      chart2: "210 22% 26%",
      chart3: "209 18% 40%",
      chart4: "210 16% 60%",
      chart5: "209 15% 80%",
    },
    icon: "⚫",
  },
  rainbow: {
    name: "Rainbow",
    light: {
      chart1: "1 80% 50%",
      chart2: "125 80% 50%",
      chart3: "250 80% 50%",
      chart4: "60 80% 50%",
      chart5: "300 80% 50%",
    },
    dark: {
      chart1: "1 80% 50%",
      chart2: "125 80% 50%",
      chart3: "250 80% 50%",
      chart4: "60 80% 50%",
      chart5: "300 80% 50%",
    },
    icon: "🌈",
  },
  pastels: {
    name: "Pastels",
    light: {
      chart1: "20 80% 85%",
      chart2: "150 80% 85%",
      chart3: "200 80% 85%",
      chart4: "275 80% 85%",
      chart5: "330 80% 85%",
    },
    dark: {
      chart1: "20 60% 70%",
      chart2: "150 60% 70%",
      chart3: "200 60% 70%",
      chart4: "275 60% 70%",
      chart5: "330 60% 70%",
    },
    icon: "🍭",
  },
  jewels: {
    name: "Jewels",
    light: {
      chart1: "350 90% 50%", // Ruby
      chart2: "120 90% 40%", // Emerald
      chart3: "210 90% 50%", // Sapphire
      chart4: "40 90% 50%", // Topaz
      chart5: "280 90% 50%", // Amethyst
    },
    dark: {
      chart1: "350 90% 60%",
      chart2: "120 90% 50%",
      chart3: "210 90% 60%",
      chart4: "40 90% 60%",
      chart5: "280 90% 60%",
    },
    icon: "💎",
  },
};

// Chart theme context
type ChartThemeContextType = {
  chartTheme: string;
  setChartTheme: (theme: string) => void;
  getChartThemeCSS: () => string;
};

const ChartThemeContext = createContext<ChartThemeContextType>({
  chartTheme: "default",
  setChartTheme: () => {},
  getChartThemeCSS: () => "",
});

export function ChartThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chartTheme, setChartTheme] = useState<string>("default");

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("chart-color-theme");
      if (savedTheme && chartThemes[savedTheme]) {
        setChartTheme(savedTheme);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chart-color-theme", chartTheme);
    }
  }, [chartTheme]);

  // Apply theme to CSS variables
  useEffect(() => {
    if (typeof window !== "undefined") {
      applyChartTheme(chartTheme);
    }
  }, [chartTheme]);

  // Function to apply the chart theme
  const applyChartTheme = (themeName: string) => {
    const theme = chartThemes[themeName];
    if (!theme) return;

    const isDark = document.documentElement.classList.contains("dark");
    const colors = isDark ? theme.dark : theme.light;

    // Apply CSS variables
    document.documentElement.style.setProperty("--chart-1", colors.chart1);
    document.documentElement.style.setProperty("--chart-2", colors.chart2);
    document.documentElement.style.setProperty("--chart-3", colors.chart3);
    document.documentElement.style.setProperty("--chart-4", colors.chart4);
    document.documentElement.style.setProperty("--chart-5", colors.chart5);
  };

  // Get CSS for current theme
  const getChartThemeCSS = () => {
    const theme = chartThemes[chartTheme];
    if (!theme) return "";

    return `:root {
  --chart-1: ${theme.light.chart1};
  --chart-2: ${theme.light.chart2};
  --chart-3: ${theme.light.chart3};
  --chart-4: ${theme.light.chart4};
  --chart-5: ${theme.light.chart5};
}
.dark {
  --chart-1: ${theme.dark.chart1};
  --chart-2: ${theme.dark.chart2};
  --chart-3: ${theme.dark.chart3};
  --chart-4: ${theme.dark.chart4};
  --chart-5: ${theme.dark.chart5};
}`;
  };

  return (
    <ChartThemeContext.Provider
      value={{ chartTheme, setChartTheme, getChartThemeCSS }}
    >
      {children}
    </ChartThemeContext.Provider>
  );
}

export function useChartTheme() {
  const context = useContext(ChartThemeContext);
  if (context === undefined) {
    throw new Error("useChartTheme must be used within a ChartThemeProvider");
  }
  return context;
}
