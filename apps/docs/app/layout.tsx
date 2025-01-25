import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import "./global.css";
import { AccessibilityProvider } from "@/app/components/AccessibilityProvider";
import { AccessibilityTool } from "@/app/components/AccessibilityTool";
import { AccessibilityTriggerAvatar } from "@/app/components/AccessibilityTriggerAvatar";

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
