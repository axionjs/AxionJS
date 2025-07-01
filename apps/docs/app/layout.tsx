import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import "./global.css";
import { AccessibilityUI } from "@/registry/new-york/ui/accessibility/components/AccessibilityUI";
import { ToastProvider, ToastViewport } from "@/registry/new-york/ui/toast";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <AccessibilityUI>
            <ToastProvider>
              {children}
              <ToastViewport />
            </ToastProvider>
          </AccessibilityUI>
        </RootProvider>
      </body>
    </html>
  );
}
