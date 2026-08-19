"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Bestdeals from "@/components/Bestdeals";
import Deals from "@/components/Deals";
import FAQs from "@/components/FAQs";
import FloatingCart from "@/components/Floatingcart";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Popularcategories from "@/components/Popularcategories";
import Promo from "@/components/Promo";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Vendoralert from "@/components/vendor/Vendoralert";

export default function Home() {
  const { scrollYProgress } = useScroll();
   const storeUser = useMutation(api.user.store);
  const searchParams = useSearchParams();
  const { isSignedIn, isLoaded } = useUser();
  const vendor = useQuery(api.user.getVendor);
    
    useEffect(() => {
    if (isLoaded && isSignedIn) {
      storeUser({});
    }
  }, [isLoaded, isSignedIn, storeUser]);

  const hasShownToast = useRef(false);

  useEffect(() => {
    const logout = searchParams.get("logout");

    if (logout === "success" && !hasShownToast.current) {
      toast.success("Logged out successfully!");
      hasShownToast.current = true;
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-primary font-sans dark:bg-black">
      
      {!vendor ? (<div className="pwa:hidden">
        <FloatingCart />
      </div>) : (null)}

      <div className="relative">
        {/* MAIN CONTENT */}
        <main className="relative z-10 bg-primary pt-20 pwa:pt-0 px-6 lg:px-10">
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0.8, 1], [1, 0.95]),
            }}
          >
            <Hero />
            <Bestdeals />
            <Popularcategories />
            <Promo />
            <Vendoralert />
            <Deals />
            <Newsletter />
            <FAQs />
          </motion.div>
        </main>
      </div>

    </div>
  );
}