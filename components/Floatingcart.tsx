"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function FloatingCart() {
  const cartItems = useQuery(api.user.getCart);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const currentUser = useQuery(api.user.getCurrentUser);

  const goToCartPage = () => {
  if (!currentUser) return;

  router.push(`/cart/${currentUser._id}`);
};

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // const itemCount =
  // cartItems
  //   ? cartItems.reduce((t, i) => t + i.quantity, 0)
  //   : 0;

  const itemCount =
  cartItems?.reduce((t, i) => t + (i?.quantity ?? 0), 0) ?? 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-secondary text-2xl text-tertiary rounded-full p-4 shadow-lg flex items-center justify-center group relative cursor-pointer"
              onClick={goToCartPage}
            >
              <MdOutlineShoppingCart />
              
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 text-secondary text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}

              <span className="absolute right-16 bg-charcoal text-secondary text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                View Cart
              </span>
            </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}