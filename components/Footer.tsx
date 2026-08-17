"use client"

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky bottom-0 w-full bg-secondary text-primary"
    >
      <div className="mx-auto max-w-7xl px-4 py-14">

        {/* TOP SECTION */}
        <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[1fr_2fr]">

          {/* BRAND + SOCIALS */}
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <a href="/">Crimson Cart</a>
            </h1>

            <p className="mt-4 max-w-sm text-sm text-primary/80">
              A trusted marketplace for quality products, seamless shopping,
              and fast delivery — all in one place.
            </p>

            {/* Socials */}
            <div className="mt-6">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide">
                Follow us
              </h2>

              <ul className="flex gap-4">
                {[
                  {
                    Icon: FaFacebook,
                    label: "Facebook",
                    href: "#",
                    hoverColor: "hover:text-[#1877F2]" // Facebook Blue
                  },
                  {
                    Icon: FaTiktok,
                    label: "TikTok",
                    href: "#",
                    hoverColor: "hover:text-[#69C9D0]" // TikTok Cyan
                  },
                  {
                    Icon: FaXTwitter,
                    label: "Twitter / X",
                    href: "#",
                    hoverColor: "hover:text-black dark:hover:text-white" // Twitter/X Black/White
                  },
                  {
                    Icon: FaInstagram,
                    label: "Instagram",
                    href: "#",
                    hoverColor: "hover:text-[#E4405F]" // Instagram Pink/Red
                  },
                ].map(({ Icon, label, href, hoverColor }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ y: -4, scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`inline-flex items-center justify-center rounded-full p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                    >
                      <Icon className="text-lg" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LINKS */}
          <div className="grid gap-10 grid-cols-2 lg:grid-cols-3">

            {/* Shop */}
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide">
                Shop
              </h2>
              <ul className="space-y-2 text-sm text-primary/80">
                <li className="hover:text-tertiary cursor-pointer"><a href="/products">All Products</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/products/electronics">Electronics</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/products/fashion">Fashion</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/products/home-living">Home & Living</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide">
                Company
              </h2>
              <ul className="space-y-2 text-sm text-primary/80">
                <li className="hover:text-tertiary cursor-pointer"><a href="/about">About Us</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/careers">Careers</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/blog">Blog</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/press">Press</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide">
                Support
              </h2>
              <ul className="space-y-2 text-sm text-primary/80">
                <li className="hover:text-tertiary cursor-pointer"><a href="/contact">Contact Us</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/faqs">FAQs</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/shipping-delivery">Shipping & Delivery</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/orders-returns">Orders & Returns</a></li>
                <li className="hover:text-tertiary cursor-pointer"><a href="/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-primary/20 pt-6 text-center">
          <p className="text-xs text-primary/70">
            &copy; {new Date().getFullYear()} Tipotek. All rights reserved.
          </p>
        </div>

      </div>
    </motion.footer>
  );
}
