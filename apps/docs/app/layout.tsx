import type { Metadata } from "next";

import { META_THEME_COLORS, siteConfig } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { LayoutProvider } from "@/hooks/use-layout";
// import { ActiveThemeProvider } from "@/components/active-theme";
import { Analytics } from "@/app/components/docs/analytics";
import { TailwindIndicator } from "@/app/components/docs/tailwind-indicator";
import { ThemeProvider } from "@/app/components/docs/theme-provider";
import { Toaster } from "@/registry/new-york/ui/sonner";
import { AccessibilityUI } from "@/registry/new-york/ui/accessibility/components/AccessibilityUI";
import { SiteFooter } from "@/app/components/docs/site-footer";
import { SiteHeader } from "@/app/components/docs/site-header";

import "./global.css";
import { docs } from "@/source.config";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "axionjs",
    "fullstack",
    "shadcn/ui",
    "shadcn",
    "UI Components",
    "UI Library",
    "axionjs/ui",
    "axionjs/components",
    "axionjs docs",
  ],
  authors: [
    {
      name: "axion / js",
      url: "https://axionjs.com",
    },
  ],
  creator: "axionjs",
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@axionjs",
  },
  verification: {
    google: "K1mjmukGl6iM9PYr8lZ9XoLMWyc5v94Ms8UMo78-2qg",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <ThemeProvider>
          <LayoutProvider>
            <SiteHeader />
            <AccessibilityUI>{children}</AccessibilityUI>
            <SiteFooter />
            <TailwindIndicator />
            <Toaster />
            <Analytics />
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
