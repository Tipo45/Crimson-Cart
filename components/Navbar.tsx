"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
// import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const currentUser = useQuery(api.user.getCurrentUser);
  const vendor = useQuery(api.user.getVendor);
  const router= useRouter();

  const goToUserPage = () => {
    if (vendor) {
      router.push(`/vendor/${currentUser?._id}`)
    } else{
      if (!currentUser) return;

  router.push(`/user/${currentUser._id}`);}
  
};

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Hide on scroll down, show on scroll up
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
    { name: "Categories", href: "/#categories" },
    { name: "Brands", href: "/brands" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <>
      {/* ===== MOBILE FULLSCREEN MENU ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-sidebar-background text-sidebar-text"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-divider">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Crimson Cart
              </Link>

              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center h-[80%]">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="space-y-10 text-xl text-center"
              >
                {navLinks.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}

                {/* ===== AUTH SECTION (MOBILE) ===== */}
                <li className="pt-6">
                  <Unauthenticated>
                    <SignInButton mode="modal">
                      <button className="bg-primary-button px-6 py-3 rounded-lg text-tertiary font-semibold cursor-pointer">
                        Sign In
                      </button>
                    </SignInButton>
                  </Unauthenticated>

                  <Authenticated>
                    <div className="flex flex-col items-center gap-4">
                      <button onClick={goToUserPage}>
                        <FaRegUserCircle size={40} className="text-primary cursor-pointer" />
                      </button>
                      {/* <UserButton /> */}
                    </div>
                  </Authenticated>
                </li>
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NAVBAR ===== */}
      <motion.header
        initial={{ opacity: 0, y: -60 }}
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
        }}
        className="fixed z-20 flex items-center justify-between border-b border-divider bg-tertiary/60 px-4 py-3 shadow-md top-4 left-4 right-4 rounded-xl backdrop-blur-md"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="text-secondary cursor-pointer">
            <IoMdMenu size={20} />
          </button>

          <Link href="/" className="font-bold text-secondary">
            Crimson Cart
          </Link>
        </div>

        {/* RIGHT (AUTH AWARE) */}
        <div className="flex items-center gap-3">

          <Unauthenticated>
            <SignInButton mode="modal">
              <button className="rounded-lg bg-primary-button px-4 py-2 text-xs font-bold text-tertiary cursor-pointer">
                Sign in
              </button>
            </SignInButton>
          </Unauthenticated>

          <Authenticated>
            <button onClick={goToUserPage}>
              <FaRegUserCircle size={25} className="text-secondary cursor-pointer" />
            </button>
            {/* <UserButton /> */}
          </Authenticated>

        </div>
      </motion.header>
    </>
  );
}