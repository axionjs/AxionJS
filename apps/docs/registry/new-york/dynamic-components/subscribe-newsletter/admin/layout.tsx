import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Mail } from "lucide-react";
import { Toaster } from "@/registry/new-york/ui/toaster";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Admin dashboard for managing contact messages and other admin tasks.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="font-bold">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6">
            <nav className="flex flex-col gap-2">
              <Link
                href="/admin"
                className="w-auto flex items-center justify-start gap-2 rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 text-muted-foreground hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/newsletter"
                className="w-auto flex items-center justify-start gap-2 rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                Newsletter
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
