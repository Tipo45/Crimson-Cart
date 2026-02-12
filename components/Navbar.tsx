"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed left-0 top-0 z-40 h-full w-72 bg-sidebar-background text-sidebar-text lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {/* Sidebar Header */}
              <div className="border-b border-divider px-4 py-3">
                <h1 className="text-lg font-bold">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    Crimson Cart
                  </Link>
                </h1>
              </div>

              {/* Sidebar Navigation */}
              <nav className="px-4 py-8">
                <ul className="space-y-2 text-lg">
                  {navLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-md px-3 py-2 hover:bg-sidebar-hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 w-full border-t border-divider px-4 py-3 text-center text-sm text-sidebar-muted">
                © {new Date().getFullYear()} Tipotek
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-divider bg-tertiary px-4 py-3 shadow-md dark:bg-black">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="lg:hidden rounded-md p-2 text-secondary focus:outline-none focus:ring-2 focus:ring-[rgba(163,22,33,0.5)]"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <IoMdMenu size={20} />
          </button>

          <h1 className="text-lg font-bold tracking-tight text-secondary lg:text-2xl">
            <Link href="/" className="py-4">Crimson Cart</Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-sidebar-hover hover:text-secondary-button"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Button */}
        <button className="rounded-lg bg-primary-button px-4 py-2 text-xs font-bold text-tertiary transition hover:opacity-90">
          Sign in
        </button>
      </header>
    </>
  );
}
