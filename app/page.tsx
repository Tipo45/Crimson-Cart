"use client";

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



export default function Home() {
  return (
    <div className="min-h-screen bg-primary font-sans dark:bg-black">
      <Navbar />

      <FloatingCart />

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

        <div>
          <Deals />
        </div>

        <div>
          <Newsletter />
        </div>

        <div>
          <FAQs />
        </div>
      </main>

      <Footer />
    </div>
  );
}
