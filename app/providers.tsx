"use client"

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {

  const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true
    })

  return (
    <AnimatePresence mode="wait">
      <motion.div
      ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={ isInView ? {opacity: 1, y: 0}:{opacity: 0, y: 50} }
        transition={{ duration: 0.5 }}>
        {children}
    </motion.div>
    </AnimatePresence>
  )
}