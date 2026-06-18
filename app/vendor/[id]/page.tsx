"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuBadgeCheck } from "react-icons/lu";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Navbar from "@/components/Navbar";
import SellerDashboard from "@/components/vendor/Dashboard";
import Settings from "@/components/vendor/Settings";
import SellerProducts from "@/components/vendor/Products";
import SellerOrders from "@/components/vendor/Orders";

export default function SellerDashboardPage() {
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
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-tertiary text-2xl font-semibold">
                SA
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Steven Azebi</h2>

                <p className="text-secondary-text text-sm">
                  tipo4542@gmail.com
                </p>

                <p className="text-muted text-xs mt-1">
                  Member since February 2026
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">Vendor</span>

                  <span className="rounded-full">
                    <LuBadgeCheck size={25} className="text-green-500" />
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
                {[
                  { value: "dashboard", label: "Dashboard" },
                  { value: "products", label: "Products" },
                  { value: "orders", label: "Orders" },
                  { value: "settings", label: "Settings" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="relative flex-1 rounded-lg px-4 py-2 text-xs lg:text-sm font-medium text-secondary-text cursor-pointer transition-colors data-[state=active]:text-tertiary"
                  >
                    {activeTab === tab.value && (
                      <motion.div
                        layoutId="activeSellerTab"
                        className="absolute inset-0 bg-secondary rounded-lg z-0"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">{tab.label}</span>
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