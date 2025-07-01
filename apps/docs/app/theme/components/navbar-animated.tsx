"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { Moon, Sun, Search, Bell, Menu } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/registry/new-york/ui/sheet";
import { Logo } from "@/registry/new-york/ui/logo";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Components", href: "/components" },
  { name: "Theme Editor", href: "/theme-editor" },
  { name: "Documentation", href: "/docs" },
];

export default function NavbarAnimated() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Theme Editor is active
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchInputId = useId();

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    // Initialize active indicator position
    requestAnimationFrame(() => {
      const firstElement = tabRefs.current[activeIndex];
      if (firstElement) {
        const { offsetLeft, offsetWidth } = firstElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, [activeIndex]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="hidden font-bold sm:inline-block">Axion</span>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-6">
                  <Link href="/" className="flex items-center mb-6">
                    <Logo className="mr-2" />
                    <span className="font-bold">Axion</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="px-3 py-2 text-base font-medium rounded-md hover:bg-muted"
                        onClick={() => setActiveIndex(index)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center">
              <div className="relative">
                {/* Hover Highlight */}
                <div
                  className="absolute h-[30px] transition-all duration-300 ease-out bg-muted dark:bg-muted rounded-md flex items-center"
                  style={{
                    ...hoverStyle,
                    opacity: hoveredIndex !== null ? 1 : 0,
                  }}
                />

                {/* Active Indicator */}
                <div
                  className="absolute bottom-[-18px] h-[2px] bg-foreground dark:bg-foreground transition-all duration-300 ease-out"
                  style={activeStyle}
                />

                {/* Navigation Items */}
                <div className="relative flex space-x-1 items-center">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      ref={(el) => (tabRefs.current[index] = el)}
                      className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                        index === activeIndex
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={(e) => {
                        if (item.href === "/theme-editor") {
                          e.preventDefault(); // Don't navigate if already on theme editor
                        }
                        setActiveIndex(index);
                      }}
                    >
                      <div className="text-sm font-medium whitespace-nowrap flex items-center justify-center h-full">
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:gap-4">
              <div className="relative">
                <label htmlFor={searchInputId} className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <Input
                    id={searchInputId}
                    type="search"
                    placeholder="Search..."
                    className="peer ps-9 w-[200px] md:w-[200px] lg:w-[280px]"
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <Search size={16} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/diverse-avatars.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
    </div>
  );
}
