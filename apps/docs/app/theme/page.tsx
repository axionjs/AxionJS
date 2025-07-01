"use client";

import { useEffect } from "react";
import { useThemeStore } from "./lib/stores/theme-store";
import ThemePreview from "./components/theme-editor/theme-preview";
import ThemeExportPanel from "./components/theme-editor/theme-export-panel";
import AiGeneratePanel from "./components/theme-editor/ai-generate-panel";
import ThemeControls from "./components/theme-editor/theme-controls";
import ThemeBottomNav from "./components/theme-editor/theme-bottom-nav";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { ThemeProvider } from "./components/theme-editor/theme-provider";

export default function ThemeEditorPage() {
  const { isExportPanelOpen, isAiPanelOpen, loadThemeFromStorage } =
    useThemeStore();

  useEffect(() => {
    // Load theme from localStorage on initial render
    loadThemeFromStorage();
  }, [loadThemeFromStorage]);

  return (
    <HomeLayout {...baseOptions}>
      <ThemeProvider>
        <div className="flex overflow-hidden pt-4">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="mx-4 md:ml-16 md:mr-8">
              <ThemePreview />
            </div>
          </div>

          {/* Right Sidebar - Theme Controls */}
          <div className="w-6 md:w-72 mr-12 border-l border-border overflow-y-auto">
            <ThemeControls />
          </div>

          {/* Bottom Navigation */}
          <ThemeBottomNav />

          {/* Export Theme Panel */}
          {isExportPanelOpen && <ThemeExportPanel />}

          {/* AI Generate Panel */}
          {isAiPanelOpen && <AiGeneratePanel />}
        </div>
      </ThemeProvider>
    </HomeLayout>
  );
}
