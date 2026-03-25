// 
"use client";

import Image from "next/image";
import Link from "next/link";
import Heroimg from "../public/images/hero2.png";
import { motion } from "framer-motion";

export default function Hero() {

  
  return (
    <section className="w-full px-4 tablet:px-8 xl:px-16 py-12">
      <div className="grid grid-cols-1 tablet:grid-cols-2 items-center gap-10">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          {/* Top Links */}
          <div className="space-y-4">
            
            {/* Logo */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold tracking-wide text-primary"
            >
              Crimson Cart
            </motion.h2>

            {/* Links (staggered) */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="flex gap-4 text-sm lg:text-base"
            >
              {[
                { name: "What's New", href: "/whats-new" },
                { name: "New Offers", href: "/new-offers" },
              ].map((item) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Main Content */}
          <div className="space-y-4">

            {/* Heading (scale + slide) */}
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl tablet:text-4xl xl:text-5xl font-extrabold leading-tight text-primary-text"
            >
              Shop Smarter with Crimson Cart
            </motion.h1>

            {/* Paragraph (fade + blur effect) */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base tablet:text-lg text-primary-text/80 max-w-lg"
            >
              Discover unbeatable deals, trending products, and exclusive
              offers tailored just for you. Elevate your shopping experience
              today.
            </motion.p>

            {/* Buttons (spring pop-in) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="flex gap-4 pt-2"
            >
              <motion.button
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 200 },
                  },
                }}
                className="bg-primary-button text-tertiary font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition"
              >
                Shop Now
              </motion.button>

              <motion.button
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 200 },
                  },
                }}
                className="border border-primary-button text-primary-button font-semibold rounded-lg px-6 py-3 hover:bg-primary-button hover:text-tertiary transition"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[300px] tablet:h-[400px] xl:h-[500px]"
        >
          <Image
            src={Heroimg}
            alt="Crimson Cart Shopping"
            fill
            priority
            className="object-cover rounded-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}