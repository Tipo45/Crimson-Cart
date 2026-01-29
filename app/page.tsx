"use client"

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Footer";
import { IoMdMenu } from "react-icons/io";
import Bestdeals from "@/components/Bestdeals";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-primary font-sans dark:bg-black">
      
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
            <motion.div
              className="fixed left-0 top-0 z-40 h-full w-72 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <Navbar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-divider shadow-md bg-primary px-4 py-3 dark:bg-black">

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
            <Link href="/">E-Commerce</Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Categories", href: "/categories" },
              { name: "Brands", href: "/brands" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-sidebar-hover hover:text-secondary-button focus:outline-none focus:ring-2 focus:ring-[rgba(163,22,33,0.5)]"
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

      {/* Page Content */}
      <main className="pt-20 px-6 lg:px-10">
        <Bestdeals />
      </main>
      <Footer />
    </div>
  );
}
