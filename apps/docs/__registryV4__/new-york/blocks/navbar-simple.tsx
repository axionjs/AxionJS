"use client";

import { Button } from "@/registry/new-york/ui/button";
import { SunIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function NavbarSimple() {
  const [isOpen, setIsOpen] = useState(false);

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
        className="h-6 w-6"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span className="font-bold text-lg">Axion</span>
    </div>
  );

  // Navigation menu component
  const NavMenu = ({ className = "" }) => (
    <div className={className}>
      <ul className="flex space-x-8">
        {["Features", "Pricing", "Blog", "About"].map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
                {["Features", "Pricing", "Blog", "About"].map((item) => (
                  <motion.li
                    key={item}
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
                      {item}
                    </Link>
                  </motion.li>
                ))}
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

  return (
    <div className="min-h-screen bg-muted">
      <motion.nav
        className="h-16 bg-background border-b"
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
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ rotate: 180 }}
            >
              <Button size="icon" variant="outline">
                <SunIcon />
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
