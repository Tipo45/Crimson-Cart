"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuBadgeCheck } from "react-icons/lu";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Navbar from "@/components/Navbar";
import SellerDashboard from "@/components/vendor/Dashboard";
import Settings from "@/components/vendor/Settings";
import SellerProducts from "@/components/vendor/Products";
import SellerOrders from "@/components/vendor/Orders";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FaTimes } from "react-icons/fa";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type TabItem = {
  id: string;
  label: string;
};

export default function SellerDashboardPage() {

  const tabs: TabItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" },
    { id: "settings", label: "Settings" },
  ]

  const router = useRouter();
  const { user } = useUser();
  const vendor = useQuery(api.user.getVendor);

  useEffect(() => {
    if (vendor === undefined) return;

    if (!vendor) {
      router.replace("/vendor/registration");
    }
  }, [vendor, router]);

  const [activeTab, setActiveTab] = useState("dashboard");

  const tabContent = {
    dashboard: <SellerDashboard />,
    products: <SellerProducts />,
    orders: <SellerOrders />,
    settings: <Settings />,
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-tertiary text-primary-text mt-20">
        {/* ================= HEADER ================= */}
        <div className="border-b border-divider">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold capitalize">
                {vendor?.businessName?.charAt(0)}
              </div>

              <div>
                <h2 className="text-2xl font-semibold capitalize">{vendor?.businessName}</h2>

                <p className="text-secondary-text text-sm">
                  {vendor?.businessEmail}
                </p>

                <p className="text-muted text-xs mt-1">
                  {vendor?._creationTime ? `Member since ${new Date(vendor._creationTime).toLocaleDateString()}` : "New Member"}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">{vendor && (<>Vendor</>)}</span>

                  <span className="rounded-full">
                    {vendor?.approved === "approved" ? (
                      <div>
                        <HoverCard>
                          <HoverCardTrigger><LuBadgeCheck size={25} className="text-green-500" /></HoverCardTrigger>
                          <HoverCardContent className="flex w-32 flex-col gap-1">
                            <span>verified</span>
                          </HoverCardContent>
                        </HoverCard>
                      </div>) :
                      (<div>
                        <HoverCard>
                          <HoverCardTrigger><FaTimes size={25} className="text-red-600" /></HoverCardTrigger>
                          <HoverCardContent className="flex w-32 flex-col gap-1">
                            <span>unverified</span>
                          </HoverCardContent>
                        </HoverCard>
                      </div>)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="bg-muted-section min-h-[70vh] py-10">
          <div className="max-w-6xl mx-auto px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="relative flex bg-tertiary border border-border rounded-xl p-1 w-full mb-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="relative flex-1 rounded-lg px-4 py-2 text-xs lg:text-sm font-medium text-black cursor-pointer transition-colors"
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeSellerTab"
                        className="absolute inset-0 bg-secondary text-tertiary rounded-lg z-0"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className={`relative z-10 ${activeTab === tab.id ? 'text-tertiary' : 'text-primary-text'}`}>
                      {tab.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {tabContent[activeTab as keyof typeof tabContent]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}