"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Close sidebar on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 5) return;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-sidebar-background text-sidebar-text"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* ===== Header (same as navbar) ===== */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-divider">
              <h1 className="text-lg font-bold">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Crimson Cart
                </Link>
              </h1>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md hover:bg-sidebar-hover"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* ===== Navigation Links ===== */}
            <nav className="flex flex-col items-center justify-center h-[80%]">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="space-y-15 text-xl font-medium text-center"
              >
                {navLinks.map((item) => (
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }} key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-accent-text transition lg:text-2xl"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* ===== Footer ===== */}
            <div className="absolute bottom-6 w-full text-center text-sm text-sidebar-muted">
              © {new Date().getFullYear()} Tipotek
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <motion.header initial={{ opacity: 0, y: -60 }}
        animate={{
          opacity: showNavbar ? 1 : 0,
          y: showNavbar ? 0 : -80,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          type: "spring",
          stiffness: 80,
          damping: 12,
        }} className="fixed z-20 flex items-center justify-between border-b border-divider bg-tertiary/60 px-4 py-3 shadow-md dark:bg-black top-4 left-4 right-4 rounded-xl backdrop-blur-md">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 text-secondary focus:outline-none focus:ring-2 focus:ring-[rgba(163,22,33,0.5)]"
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
        {/* <nav className="hidden tablet:visible">
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
        </nav> */}

        {/* Auth Button */}

        <Link
          href="/signin"
          className="inline-block rounded-lg bg-primary-button px-4 py-2 text-xs font-bold text-tertiary transition hover:opacity-90"
        >
          Sign in
        </Link>
      </motion.header>
    </>
  );
}
