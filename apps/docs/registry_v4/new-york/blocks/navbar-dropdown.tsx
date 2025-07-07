"use client";

import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import {
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Logo component
  const Logo = () => (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18Z" />
        <path d="M12 2c5.5 0 10 4.5 10 10" />
      </svg>
      <span className="font-bold text-lg">Quantum</span>
    </div>
  );

  // Navigation menu component with dropdowns
  const NavMenu = ({ className = "" }) => (
    <div className={className}>
      <ul className="flex space-x-8">
        <li>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Products <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Our Products</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Analytics</DropdownMenuItem>
              <DropdownMenuItem>Automation</DropdownMenuItem>
              <DropdownMenuItem>Commerce</DropdownMenuItem>
              <DropdownMenuItem>AI Assistant</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Resources <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Tutorials</DropdownMenuItem>
              <DropdownMenuItem>Blog</DropdownMenuItem>
              <DropdownMenuItem>Community</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </li>
      </ul>
    </div>
  );

  // Mobile navigation sheet
  const NavigationSheet = () => (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <motion.ul
                className="flex flex-col space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="#"
                    className="text-xl font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <div className="text-xl font-medium">Products</div>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Analytics
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Automation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Commerce
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        AI Assistant
                      </Link>
                    </li>
                  </ul>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <div className="text-xl font-medium">Resources</div>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Tutorials
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-base hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Community
                      </Link>
                    </li>
                  </ul>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="#"
                    className="text-xl font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                </motion.li>
              </motion.ul>
              <div className="mt-12 flex flex-col space-y-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Sign In
                </Button>
                <Button onClick={() => setIsOpen(false)}>Sign Up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // User dropdown menu
  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen bg-muted">
      <motion.nav
        className="h-16 bg-background border-b sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:block"
            >
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button>Sign Up</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden sm:block"
            >
              <UserMenu />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ rotate: 180 }}
            >
              <Button
                size="icon"
                variant="outline"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
