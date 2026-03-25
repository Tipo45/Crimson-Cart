"use client";

import { AnimatePresence, motion } from "framer-motion";
import Bestdeals from "@/components/Bestdeals";
import Deals from "@/components/Deals";
import FAQs from "@/components/FAQs";
import FloatingCart from "@/components/Floatingcart";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Popularcategories from "@/components/Popularcategories";
import Promo from "@/components/Promo";
import Providers from "./providers";



export default function Home() {
  return (
    <Providers>
      <div className="min-h-screen bg-primary font-sans dark:bg-black">

        <Navbar />

        <FloatingCart />

        <div className="relative">

          {/* MAIN CONTENT */}
          <main className="relative z-10 bg-primary pt-20 px-6 lg:px-10">
            <Hero />
            <Bestdeals />
            <Popularcategories />
            <Promo />
            <Deals />
            <Newsletter />
            <FAQs />
          </main>

          {/* FOOTER WRAPPER */}
          {/* <div className="relative h-[500px]">
            <Footer />
          </div> */}

        </div>

        {/* <main className="pt-20 px-6 lg:px-10">
          <div>
            <Hero />
          </div>

          <div>
            <Bestdeals />
          </div>

          <div>
            <Popularcategories />
          </div>

          <div>
            <Promo />
          </div>

          <div>
            <Deals />
          </div>

          <div>
            <Newsletter />
          </div>

          <div>
            <FAQs />
          </div>
        </main> */}

        <Footer />
      </div>
    </Providers>
  );
}
