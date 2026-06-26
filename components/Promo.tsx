import Image from "next/image";
import Promoimg from "../public/images/hero.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.8, 1]);

  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative h-[60vh] min-h-100 rounded-2xl overflow-hidden tablet:w-screen tablet:left-1/2 tablet:right-1/2 tablet:ml-[-50vw] tablet:mr-[-50vw]"
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          scale,
          y,
        }}
      >
        <Image
          src={Promoimg}
          alt="Crimson Cart Shopping"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content with Animations */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 lg:px-10">
          <div className="max-w-2xl">
            <motion.h2
              className="text-xl tablet:text-2xl xl:text-3xl font-extrabold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Shop Smarter with Crimson Cart
            </motion.h2>

            <motion.p
              className="mt-4 text-xs tablet:text-lg text-white/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Discover unbeatable deals, trending products, and exclusive
              offers tailored just for you. Elevate your shopping experience today.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}