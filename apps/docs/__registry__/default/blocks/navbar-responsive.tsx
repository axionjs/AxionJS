"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/registry/default/ui/sheet";
import {
  Search,
  Menu,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";

export default function NavbarResponsive() {
  const [theme, setTheme] = useState("light");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    {
      name: "Resources",
      href: "#resources",
      children: [
        { name: "Documentation", href: "#documentation" },
        { name: "Tutorials", href: "#tutorials" },
        { name: "Blog", href: "#blog" },
      ],
    },
    { name: "About", href: "#about" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="hidden font-bold sm:inline-block">Axion</span>
            </Link>

            <div className="hidden md:flex md:gap-6">
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.name} className="relative">
                      <button
                        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border bg-background shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="py-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] pl-8 md:w-[200px] lg:w-[280px]"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
            <Button variant="outline" className="hidden md:inline-flex">
              Log In
            </Button>
            <Button>Sign Up</Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span className="font-bold">Axion</span>
                  </Link>

                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8"
                    />
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => {
                      if (item.children) {
                        return (
                          <div key={item.name} className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Link
                                href={item.href}
                                className="text-base font-medium text-foreground"
                              >
                                {item.name}
                              </Link>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="ml-4 space-y-3 border-l pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-foreground"
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                      {theme === "light" ? (
                        <Moon className="h-5 w-5" />
                      ) : (
                        <Sun className="h-5 w-5" />
                      )}
                    </Button>
                    <span className="text-sm">
                      Switch to {theme === "light" ? "dark" : "light"} mode
                    </span>
                  </div>

                  <div className="grid gap-2 pt-4">
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                    <Button className="w-full">Sign Up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
