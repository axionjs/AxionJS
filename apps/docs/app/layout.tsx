import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import "./global.css";
import { AccessibilityProvider } from "@/registry/new-york/ui/AccessibilityProvider";
import { AccessibilityTool } from "@/registry/new-york/ui/AccessibilityTool";
import { AccessibilityTrigger } from "@/registry/new-york/ui/AccessibilityTrigger";
import { ToastProvider, ToastViewport } from "@/registry/new-york/ui/toast";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <AccessibilityProvider>
            <ToastProvider>
              {children}
              <ToastViewport />
            </ToastProvider>
            <AccessibilityTrigger />
            <AccessibilityTool />
          </AccessibilityProvider>
        </RootProvider>
      </body>
    </html>
  );
}
