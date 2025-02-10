import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import "./global.css";
import { AccessibilityProvider } from "@/registry/new-york/ui/AccessibilityProvider";
import { AccessibilityTool } from "@/registry/new-york/ui/AccessibilityTool";
import { AccessibilityTriggerAvatar } from "@/registry/new-york/ui/AccessibilityTriggerAvatar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <AccessibilityProvider>
            {children}
            <AccessibilityTriggerAvatar />
            <AccessibilityTool />
          </AccessibilityProvider>
        </RootProvider>
      </body>
    </html>
  );
}
