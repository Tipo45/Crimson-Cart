"use client";

import Bestdeals from "@/components/Bestdeals";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Popularcategories from "@/components/Popularcategories";
import Promo from "@/components/Promo";



export default function Home() {
  return (
    <div className="min-h-screen bg-tertiary font-sans dark:bg-black">
      <Navbar />

      <main className="pt-20 px-6 lg:px-10">
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

        <div className="py-6">
          sokuso
        </div>

        <div>
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
